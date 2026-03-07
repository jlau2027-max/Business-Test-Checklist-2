import Anthropic from "@anthropic-ai/sdk";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import {
  extractTextFromPdf,
  cleanText,
  chunkText,
  mergeGeneratedContent,
} from "./lib/pdfChunker.js";
import { processChunkWithClaude } from "./lib/claudeChunkProcessor.js";

const MAX_CHUNKS = 4;
const CHUNK_SIZE = 3000;

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
    const ext = path.extname(originalName || file.filepath || "").toLowerCase();
    let text = "";

    try {
      if (ext === ".txt") {
        const raw = await fs.promises.readFile(file.filepath, "utf-8");
        text = cleanText(raw);
      } else if (ext === ".pdf") {
        text = await extractTextFromPdf(file.filepath);
      } else {
        return res.status(400).json({
          success: false,
          error: "Unsupported file type. Use .pdf or .txt",
        });
      }
    } catch (e) {
      console.error("Extract text error:", e);
      return res.status(400).json({
        success: false,
        error: e.message || "Failed to extract text from file.",
      });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        error: "No text could be extracted from the document.",
      });
    }

    console.log("Extracted text length:", text.length);

    let chunks = chunkText(text, CHUNK_SIZE);
    if (chunks.length > MAX_CHUNKS) {
      chunks = chunks.slice(0, MAX_CHUNKS);
    }
    console.log("Chunks created:", chunks.length);

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const results = await Promise.all(
      chunks.map((chunk, i) =>
        processChunkWithClaude(chunk, i, chunks.length, subject, types, anthropic)
      )
    );

    const merged = mergeGeneratedContent(results);

    return res.status(200).json({
      success: true,
      generated: merged,
      stats: {
        chunksProcessed: chunks.length,
        textLength: text.length,
      },
    });
  } catch (e) {
    console.error("Generate-from-doc error:", e);
    return res.status(500).json({
      success: false,
      error: e.message || "AI generation failed.",
    });
  }
}
