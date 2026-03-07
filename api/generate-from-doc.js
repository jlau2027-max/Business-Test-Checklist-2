import Anthropic from "@anthropic-ai/sdk";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Use dynamic import for pdf-parse (CommonJS)
let pdfParse;

async function loadPdfParse() {
  if (!pdfParse) {
    const mod = await import("pdf-parse");
    pdfParse = mod.default;
  }
  return pdfParse;
}

function extractTextFromFile(filePath, originalFilename) {
  const ext = path.extname(originalFilename || filePath || "").toLowerCase();
  if (ext === ".txt") {
    return fs.promises.readFile(filePath, "utf-8");
  }
  if (ext === ".pdf") {
    return loadPdfParse().then((parse) => {
      const dataBuffer = fs.readFileSync(filePath);
      return parse(dataBuffer).then((data) => data.text);
    });
  }
  throw new Error("Unsupported file type. Use .pdf or .txt");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      success: false,
      error: "API key not configured (ANTHROPIC_API_KEY)",
    });
  }

  let documentText = "";
  let subject = "business";
  let types = ["mcq", "written", "checklist", "flashcard"];

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024,
      maxTotalFileSize: 6 * 1024 * 1024,
    });

    const [fields, files] = await form.parse(req);

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file?.filepath) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded. Send a 'file' field with a PDF or .txt file.",
      });
    }

    const subjectField = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject;
    const typesField = Array.isArray(fields.types) ? fields.types[0] : fields.types;
    if (subjectField) subject = String(subjectField).trim() || subject;
    if (typesField) {
      try {
        const parsed = JSON.parse(typesField);
        if (Array.isArray(parsed) && parsed.length > 0) types = parsed;
      } catch (_) {}
    }

    const originalName = file.originalFilename || file.newFilename || "";
    documentText = await extractTextFromFile(file.filepath, originalName);

    if (!documentText || !documentText.trim()) {
      return res.status(400).json({
        success: false,
        error: "No text could be extracted from the document.",
      });
    }

    // Truncate if very long to stay within context limits
    const maxChars = 120000;
    if (documentText.length > maxChars) {
      documentText = documentText.slice(0, maxChars) + "\n\n[Document truncated...]";
    }
  } catch (e) {
    console.error("Parse/form error:", e);
    return res.status(400).json({
      success: false,
      error: e.message || "Failed to parse request or extract text from file.",
    });
  }

  const instructions = [];
    if (types.includes("mcq")) {
      instructions.push('- 8 MCQ questions (with 4 options A-D, correct answer letter "A"/"B"/"C"/"D", and brief explanation). Use the exact key "mcq" and array of objects with keys: "question", "options" (array of 4 strings like "A. ...", "B. ..."), "answer" (single letter), "explanation".');
    }
    if (types.includes("written")) {
      instructions.push('- 4 written/short answer questions with a mark scheme and marks value. Use the exact key "written" and array of objects with keys: "question", "markScheme", "marks" (number).');
    }
    if (types.includes("checklist")) {
      instructions.push('- 1 checklist with a topic and 8-12 bullet point items. Use the exact key "checklist" and array of one object with keys: "topic", "items" (array of strings).');
    }
    if (types.includes("flashcard")) {
      instructions.push('- 10 flashcards: key term on front, definition/explanation on back. Use the exact key "flashcard" and array of objects with keys: "front", "back".');
    }
    const keysList = types.filter((t) => ["mcq", "written", "checklist", "flashcard"].includes(t));
    const prompt = `You are an IB Business Management HL teacher. Based on the following document, generate exam-quality content. Return ONLY valid JSON with no markdown, no code blocks, and no extra text. Generate exactly:

${instructions.join("\n")}

Document content:

${documentText}

Return only the JSON object with keys: ${keysList.join(", ")}.`;

  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.content[0].text;
    let jsonStr = responseText.trim();
    const mdMatch = jsonStr.match(/^```(?:json)?\s*([\s\S]*?)```$/);
    if (mdMatch) jsonStr = mdMatch[1].trim();
    const generated = JSON.parse(jsonStr);

    // Normalize keys to match expected shape; only include requested types
    const out = {};
    if (types.includes("mcq")) {
      out.mcq = Array.isArray(generated.mcq)
        ? generated.mcq.map((q) => ({
            question: q.question,
            options: q.options || [],
            answer: q.answer,
            explanation: q.explanation,
          }))
        : [];
    }
    if (types.includes("written")) {
      out.written = Array.isArray(generated.written)
        ? generated.written.map((w) => ({
            question: w.question,
            markScheme: w.markScheme ?? w.mark_scheme,
            marks: typeof w.marks === "number" ? w.marks : 4,
          }))
        : [];
    }
    if (types.includes("checklist")) {
      out.checklist = Array.isArray(generated.checklist)
        ? generated.checklist.map((c) => ({
            topic: c.topic,
            items: Array.isArray(c.items) ? c.items : [],
          }))
        : [];
    }
    if (types.includes("flashcard")) {
      out.flashcard = Array.isArray(generated.flashcard)
        ? generated.flashcard.map((f) => ({
            front: f.front,
            back: f.back,
          }))
        : [];
    }

    return res.status(200).json({ success: true, generated: out });
  } catch (err) {
    console.error("Claude API error:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "AI generation failed.",
    });
  }
}
