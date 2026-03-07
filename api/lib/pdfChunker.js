import fs from "fs";
import path from "path";

let pdfParse;

async function loadPdfParse() {
  if (!pdfParse) {
    const mod = await import("pdf-parse");
    pdfParse = mod.default;
  }
  return pdfParse;
}

const MIN_TEXT_LENGTH = 100;
const SCANNED_ERROR =
  "PDF appears to be scanned/image-based. Please upload a text-based PDF or .txt file.";

/**
 * Extract text from a PDF file. Throws if the PDF is likely scanned (too little text).
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} Cleaned text
 */
export async function extractTextFromPdf(filePath) {
  const parse = await loadPdfParse();
  const dataBuffer = fs.readFileSync(filePath);
  const data = await parse(dataBuffer);
  const raw = (data && data.text) || "";

  if (raw.length < MIN_TEXT_LENGTH) {
    throw new Error(SCANNED_ERROR);
  }

  return cleanText(raw);
}

/**
 * Clean extracted text: collapse whitespace, remove non-printables.
 * @param {string} text
 * @returns {string}
 */
export function cleanText(text) {
  if (!text || typeof text !== "string") return "";
  let out = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, " ");
  out = out.replace(/(\n\s*){3,}/g, "\n\n");
  out = out.replace(/[ \t]+/g, " ").replace(/\n /g, "\n").replace(/ \n/g, "\n").trim();
  return out;
}

/**
 * Split text into chunks of at most maxChunkSize, at paragraph/sentence boundaries.
 * Merges tiny trailing chunks (min 500 chars) into the previous chunk.
 * @param {string} text
 * @param {number} maxChunkSize
 * @returns {string[]}
 */
export function chunkText(text, maxChunkSize = 3000) {
  const minChunkSize = 500;
  if (!text || text.length <= maxChunkSize) {
    return text ? [text.trim()] : [];
  }

  const chunks = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxChunkSize) {
      if (remaining.trim().length > 0) {
        if (chunks.length > 0 && chunks[chunks.length - 1].length < minChunkSize) {
          chunks[chunks.length - 1] = chunks[chunks.length - 1] + "\n\n" + remaining.trim();
        } else {
          chunks.push(remaining.trim());
        }
      }
      break;
    }

    const slice = remaining.slice(0, maxChunkSize);
    const breakPoints = [
      slice.lastIndexOf("\n\n"),
      slice.lastIndexOf(". "),
      slice.lastIndexOf("? "),
      slice.lastIndexOf("! "),
      slice.lastIndexOf("\n"),
      slice.lastIndexOf(" "),
    ].filter((i) => i > minChunkSize);

    const splitAt = breakPoints.length > 0 ? Math.max(...breakPoints) + 1 : maxChunkSize;
    const chunk = remaining.slice(0, splitAt).trim();
    remaining = remaining.slice(splitAt).trim();

    if (chunk.length > 0) {
      if (chunks.length > 0 && chunks[chunks.length - 1].length < minChunkSize) {
        chunks[chunks.length - 1] = chunks[chunks.length - 1] + "\n\n" + chunk;
      } else {
        chunks.push(chunk);
      }
    }
  }

  return chunks.filter(Boolean);
}

/**
 * Simple word-set similarity in [0, 1]. Used for deduplication.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function textSimilarity(a, b) {
  if (!a || !b) return 0;
  const toSet = (s) => new Set(String(s).toLowerCase().trim().split(/\s+/).filter(Boolean));
  const setA = toSet(a);
  const setB = toSet(b);
  if (setA.size === 0 && setB.size === 0) return 1;
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const w of setA) {
    if (setB.has(w)) intersection++;
  }
  return intersection / Math.max(setA.size, setB.size);
}

/**
 * Get the "question text" for similarity check per type.
 * @param {object} item
 * @param {string} type
 * @returns {string}
 */
function getCompareText(item, type) {
  if (!item) return "";
  if (type === "mcq" || type === "written") return item.question || "";
  if (type === "checklist") return item.topic || "";
  if (type === "flashcard") return item.front || "";
  return "";
}

/**
 * Deduplicate array by question text (keep first, skip if >80% similar).
 * @param {object[]} arr
 * @param {string} type
 * @returns {object[]}
 */
function dedupeBySimilarity(arr, type) {
  const out = [];
  for (const item of arr) {
    const text = getCompareText(item, type);
    const isDuplicate = out.some((existing) => textSimilarity(text, getCompareText(existing, type)) >= 0.8);
    if (!isDuplicate) out.push(item);
  }
  return out;
}

const CAPS = { mcq: 10, written: 5, checklist: 3, flashcard: 15 };

/**
 * Merge per-chunk results into one object, deduplicate, and cap counts.
 * @param {object[]} resultsArray - Array of { mcq, written, checklist, flashcard }
 * @returns {object} { mcq, written, checklist, flashcard }
 */
export function mergeGeneratedContent(resultsArray) {
  const merged = {
    mcq: [],
    written: [],
    checklist: [],
    flashcard: [],
  };

  for (const result of resultsArray || []) {
    if (Array.isArray(result.mcq)) merged.mcq.push(...result.mcq);
    if (Array.isArray(result.written)) merged.written.push(...result.written);
    if (Array.isArray(result.checklist)) merged.checklist.push(...result.checklist);
    if (Array.isArray(result.flashcard)) merged.flashcard.push(...result.flashcard);
  }

  merged.mcq = dedupeBySimilarity(merged.mcq, "mcq").slice(0, CAPS.mcq);
  merged.written = dedupeBySimilarity(merged.written, "written").slice(0, CAPS.written);
  merged.checklist = dedupeBySimilarity(merged.checklist, "checklist").slice(0, CAPS.checklist);
  merged.flashcard = dedupeBySimilarity(merged.flashcard, "flashcard").slice(0, CAPS.flashcard);

  return merged;
}
