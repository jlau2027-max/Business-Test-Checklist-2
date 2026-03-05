#!/usr/bin/env node
// worker/seed.js
// Run:  node worker/seed.js > worker/seed.sql
// Then: wrangler d1 execute CONTENT_DB --local --file=worker/seed.sql
//   or: wrangler d1 execute CONTENT_DB --remote --file=worker/seed.sql
//
// This script extracts hardcoded data from the React source files and
// generates SQL INSERT statements for the D1 database.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── SQL helper ──────────────────────────────────────────────────────────────

function esc(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}

// ─── Source file extraction ──────────────────────────────────────────────────
// We extract JS constant definitions from the .jsx files and eval them.
// This avoids duplicating thousands of lines of data.

function extractConst(source, name) {
  // Find `const NAME = [` or `const NAME = {` and extract through the matching closer
  const re = new RegExp(`(?:^|\\n)(?:const|let|var)\\s+${name}\\s*=\\s*`);
  const match = re.exec(source);
  if (!match) throw new Error(`Could not find const ${name} in source`);

  const startIdx = match.index + match[0].length;
  const opener = source[startIdx];

  // Handle template literal strings (backtick)
  if (opener === "`") {
    let escaped = false;
    let templateDepth = 0;
    let endIdx = -1;
    for (let i = startIdx + 1; i < source.length; i++) {
      const ch = source[i];
      if (escaped) { escaped = false; continue; }
      if (ch === "\\") { escaped = true; continue; }
      if (ch === "$" && i + 1 < source.length && source[i + 1] === "{") {
        templateDepth++;
        i++;
        continue;
      }
      if (ch === "}" && templateDepth > 0) {
        templateDepth--;
        continue;
      }
      if (ch === "`" && templateDepth === 0) {
        endIdx = i + 1;
        break;
      }
    }
    if (endIdx === -1) throw new Error(`Could not find closing backtick for const ${name}`);
    const expr = source.slice(startIdx, endIdx);
    try {
      return eval(`(${expr})`);
    } catch (e) {
      throw new Error(`Failed to eval const ${name}: ${e.message}`);
    }
  }

  const closer = opener === "[" ? "]" : opener === "{" ? "}" : null;
  if (!closer) throw new Error(`Unexpected opener '${opener}' for const ${name}`);

  // State machine: code / string_dq / string_sq / template / line_comment / block_comment
  let depth = 0;
  let state = "code";
  let tplDepth = 0;
  let endIdx = -1;

  for (let i = startIdx; i < source.length; i++) {
    const ch = source[i];
    const next = i + 1 < source.length ? source[i + 1] : "";

    switch (state) {
      case "code":
        // Check for comments first
        if (ch === "/" && next === "/") { state = "line_comment"; i++; break; }
        if (ch === "/" && next === "*") { state = "block_comment"; i++; break; }
        if (ch === '"') { state = "string_dq"; break; }
        if (ch === "'") { state = "string_sq"; break; }
        if (ch === "`") { state = "template"; tplDepth = 0; break; }
        if (ch === opener) { depth++; break; }
        if (ch === closer) {
          depth--;
          if (depth === 0) { endIdx = i + 1; }
          break;
        }
        break;

      case "line_comment":
        if (ch === "\n") { state = "code"; }
        break;

      case "block_comment":
        if (ch === "*" && next === "/") { state = "code"; i++; }
        break;

      case "string_dq":
        if (ch === "\\") { i++; break; } // skip escaped char
        if (ch === '"') { state = "code"; }
        break;

      case "string_sq":
        if (ch === "\\") { i++; break; } // skip escaped char
        if (ch === "'") { state = "code"; }
        break;

      case "template":
        if (ch === "\\") { i++; break; } // skip escaped char
        if (ch === "`" && tplDepth === 0) { state = "code"; break; }
        if (ch === "$" && next === "{") { tplDepth++; i++; break; }
        if (ch === "}" && tplDepth > 0) { tplDepth--; break; }
        break;
    }

    if (endIdx !== -1) break;
  }

  if (endIdx === -1) throw new Error(`Could not find closing '${closer}' for const ${name}`);

  const expr = source.slice(startIdx, endIdx);
  // eval in a safe-ish context
  try {
    return eval(`(${expr})`);
  } catch (e) {
    throw new Error(`Failed to eval const ${name}: ${e.message}`);
  }
}

// ─── Read source files ──────────────────────────────────────────────────────

const srcDir = path.join(__dirname, "..", "src");

const appSource = fs.readFileSync(path.join(srcDir, "App.jsx"), "utf8");
const specimenSource = fs.readFileSync(path.join(srcDir, "SpecimenPage.jsx"), "utf8");
const historySource = fs.readFileSync(path.join(srcDir, "HistoryPage.jsx"), "utf8");

// ─── Extract data ───────────────────────────────────────────────────────────

const CHECKLIST_SECTIONS = extractConst(appSource, "CHECKLIST_SECTIONS");
const FLASHCARD_CATEGORIES = extractConst(appSource, "FLASHCARD_CATEGORIES");
const MCQ_QUESTIONS = extractConst(appSource, "MCQ_QUESTIONS");
const WRITTEN_QUESTIONS = extractConst(appSource, "WRITTEN_QUESTIONS");
const WRITTEN_10_MARK_QUESTIONS = extractConst(appSource, "WRITTEN_10_MARK_QUESTIONS");
const CAT_COLORS = extractConst(appSource, "CAT_COLORS");

const SPECIMEN_QUESTIONS = extractConst(specimenSource, "SPECIMEN_QUESTIONS_FALLBACK");

const LEVEL_DESCRIPTORS = extractConst(historySource, "LEVEL_DESCRIPTORS");
const LEVEL_DESCRIPTORS_P3 = extractConst(historySource, "LEVEL_DESCRIPTORS_P3");
const HISTORY_QUESTIONS = extractConst(historySource, "HISTORY_QUESTIONS_FALLBACK");
const PAPER3_QUESTIONS = extractConst(historySource, "PAPER3_QUESTIONS_FALLBACK");

// ─── Generate SQL ───────────────────────────────────────────────────────────

const stmts = [];

// Clear existing data for idempotent seeding
stmts.push(`DELETE FROM flashcards`);
stmts.push(`DELETE FROM checklist_items`);

// 1. Category colors
if (typeof CAT_COLORS === "object" && !Array.isArray(CAT_COLORS)) {
  for (const [category, color] of Object.entries(CAT_COLORS)) {
    stmts.push(
      `INSERT OR IGNORE INTO category_colors (category, color) VALUES (${esc(category)}, ${esc(color)})`
    );
  }
} else {
  // Array form (older format)
  for (const c of CAT_COLORS) {
    stmts.push(
      `INSERT OR IGNORE INTO category_colors (category, color) VALUES (${esc(c.category)}, ${esc(c.color)})`
    );
  }
}

// 2. Checklist sections and items
CHECKLIST_SECTIONS.forEach((sec, si) => {
  stmts.push(
    `INSERT OR IGNORE INTO checklist_sections (id, title, color, sort_order) VALUES (${esc(sec.id)}, ${esc(sec.title)}, ${esc(sec.color)}, ${si})`
  );
  sec.items.forEach((item, ii) => {
    stmts.push(
      `INSERT INTO checklist_items (section_id, text, sort_order) VALUES (${esc(sec.id)}, ${esc(item)}, ${ii})`
    );
  });
});

// 3. Flashcard topics and cards
FLASHCARD_CATEGORIES.forEach((cat, ci) => {
  stmts.push(
    `INSERT OR IGNORE INTO flashcard_topics (id, label, color, sort_order) VALUES (${esc(cat.id)}, ${esc(cat.label)}, ${esc(cat.color)}, ${ci})`
  );
  if (cat.cards) {
    cat.cards.forEach((card, fi) => {
      stmts.push(
        `INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES (${esc(cat.id)}, ${esc(card.term)}, ${esc(card.def)}, ${esc(card.formula)}, ${fi})`
      );
    });
  }
});

// 4. MCQ questions
MCQ_QUESTIONS.forEach((q, qi) => {
  stmts.push(
    `INSERT OR IGNORE INTO mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES (${esc(q.id)}, ${esc(q.cat)}, ${esc(q.difficulty)}, ${esc(q.q)}, ${esc(q.options[0])}, ${esc(q.options[1])}, ${esc(q.options[2])}, ${esc(q.options[3])}, ${q.answer}, ${esc(q.explanation)}, ${qi})`
  );
});

// 5. Written questions (short answer)
WRITTEN_QUESTIONS.forEach((q, qi) => {
  stmts.push(
    `INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order) VALUES (${esc(q.id)}, ${esc(q.cat)}, ${esc(q.difficulty)}, 'short_answer', ${q.marks}, ${esc(q.q)}, ${esc(q.modelAnswer)}, NULL, ${qi})`
  );
});

// 6. Written 10-mark questions
WRITTEN_10_MARK_QUESTIONS.forEach((q, qi) => {
  stmts.push(
    `INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order) VALUES (${esc(q.id)}, ${esc(q.cat)}, ${esc(q.difficulty)}, 'ten_marker', ${q.marks}, ${esc(q.q)}, ${esc(q.modelAnswer)}, NULL, ${100 + qi})`
  );
});

// 7. Specimen questions
SPECIMEN_QUESTIONS.forEach((q, qi) => {
  stmts.push(
    `INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order) VALUES (${esc(q.id)}, 'Specimen', 'SL/HL', 'specimen', ${q.marks}, ${esc(q.question)}, ${esc(q.markscheme)}, ${esc(q.label)}, ${200 + qi})`
  );
});

// 8. History Paper 2 questions
HISTORY_QUESTIONS.forEach((q, qi) => {
  // Append level descriptors to markscheme
  const fullMarkscheme = q.markscheme + "\n\n" + LEVEL_DESCRIPTORS;
  stmts.push(
    `INSERT OR IGNORE INTO history_questions (id, paper, topic, question_number, question_text, marks, mark_scheme, sort_order) VALUES (${esc(q.id)}, 'paper2', ${esc(q.topic)}, ${q.number}, ${esc(q.question)}, ${q.marks}, ${esc(fullMarkscheme)}, ${qi})`
  );
});

// 9. History Paper 3 questions
PAPER3_QUESTIONS.forEach((q, qi) => {
  const fullMarkscheme = q.markscheme + "\n\n" + LEVEL_DESCRIPTORS_P3;
  stmts.push(
    `INSERT OR IGNORE INTO history_questions (id, paper, topic, question_number, question_text, marks, mark_scheme, sort_order) VALUES (${esc(q.id)}, 'paper3', ${esc(q.topic)}, ${q.number}, ${esc(q.question)}, ${q.marks}, ${esc(fullMarkscheme)}, ${100 + qi})`
  );
});

// ─── Output ─────────────────────────────────────────────────────────────────

process.stdout.write(stmts.join(";\n") + ";\n");

// Summary to stderr so it doesn't pollute the SQL output
process.stderr.write(`\nSeed SQL generated successfully!\n`);
process.stderr.write(`  Category colors:     ${Object.keys(CAT_COLORS).length}\n`);
process.stderr.write(`  Checklist sections:  ${CHECKLIST_SECTIONS.length}\n`);
process.stderr.write(`  Checklist items:     ${CHECKLIST_SECTIONS.reduce((s, sec) => s + sec.items.length, 0)}\n`);
process.stderr.write(`  Flashcard topics:    ${FLASHCARD_CATEGORIES.length}\n`);
process.stderr.write(`  Flashcard cards:     ${FLASHCARD_CATEGORIES.reduce((s, c) => s + (c.cards ? c.cards.length : 0), 0)}\n`);
process.stderr.write(`  MCQ questions:       ${MCQ_QUESTIONS.length}\n`);
process.stderr.write(`  Written (short):     ${WRITTEN_QUESTIONS.length}\n`);
process.stderr.write(`  Written (10-mark):   ${WRITTEN_10_MARK_QUESTIONS.length}\n`);
process.stderr.write(`  Specimen questions:  ${SPECIMEN_QUESTIONS.length}\n`);
process.stderr.write(`  History Paper 2:     ${HISTORY_QUESTIONS.length}\n`);
process.stderr.write(`  History Paper 3:     ${PAPER3_QUESTIONS.length}\n`);
process.stderr.write(`  Total SQL stmts:     ${stmts.length}\n`);
