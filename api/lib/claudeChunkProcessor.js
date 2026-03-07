const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1500;
const RETRY_DELAY_MS = 1000;

function buildTypesDescription(types) {
  const parts = [];
  if (types.includes("mcq")) {
    parts.push("up to 3 MCQ questions (question, options array of 4 strings like 'A. ...', answer letter, explanation)");
  }
  if (types.includes("written")) {
    parts.push("up to 2 short-answer questions (question, markScheme, marks as number)");
  }
  if (types.includes("checklist")) {
    parts.push("up to 1 checklist section (topic, items array of strings)");
  }
  if (types.includes("flashcard")) {
    parts.push("up to 4 flashcards (front as key term, back as definition)");
  }
  return parts.length ? parts.join("; ") : "no content (return empty arrays).";
}

function stripMarkdownFences(str) {
  if (!str || typeof str !== "string") return str;
  let s = str.trim();
  const mdMatch = s.match(/^```(?:json)?\s*([\s\S]*?)```$/);
  if (mdMatch) s = mdMatch[1].trim();
  return s;
}

const EMPTY = { mcq: [], written: [], checklist: [], flashcard: [] };

function parseResponse(responseText) {
  const jsonStr = stripMarkdownFences(responseText || "");
  try {
    const parsed = JSON.parse(jsonStr);
    return {
      mcq: Array.isArray(parsed.mcq) ? parsed.mcq : [],
      written: Array.isArray(parsed.written) ? parsed.written : [],
      checklist: Array.isArray(parsed.checklist) ? parsed.checklist : [],
      flashcard: Array.isArray(parsed.flashcard) ? parsed.flashcard : [],
    };
  } catch (_) {
    return EMPTY;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Process a single chunk with Claude. Retries once on API throw.
 * @param {string} chunkText
 * @param {number} chunkIndex 0-based
 * @param {number} totalChunks
 * @param {string} subject
 * @param {string[]} types e.g. ["mcq", "written", "checklist", "flashcard"]
 * @param {object} anthropicClient - Anthropic SDK client
 * @returns {Promise<{ mcq, written, checklist, flashcard }>}
 */
export async function processChunkWithClaude(
  chunkText,
  chunkIndex,
  totalChunks,
  subject,
  types,
  anthropicClient
) {
  const typesDesc = buildTypesDescription(types);
  const prompt = `You are an IB ${subject} teacher. This is chunk ${chunkIndex + 1} of ${totalChunks} from a study document. Generate exam-quality content based ONLY on information present in this chunk. If the chunk doesn't contain enough information for a particular type, return an empty array for that type. Return ONLY valid JSON, no markdown, no explanation. Generate: ${typesDesc}. Chunk content:

${chunkText}`;

  const run = async () => {
    const message = await anthropicClient.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });
    const text = message.content && message.content[0] && message.content[0].text;
    return parseResponse(text);
  };

  try {
    return await run();
  } catch (err) {
    await sleep(RETRY_DELAY_MS);
    try {
      return await run();
    } catch (_) {
      return EMPTY;
    }
  }
}
