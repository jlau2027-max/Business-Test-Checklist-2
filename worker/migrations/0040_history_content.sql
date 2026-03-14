-- ============================================================
-- Add content tables for History (checklist, flashcards, MCQ, written, colors)
-- Mirrors the 7-table schema used by other factory subjects
-- ============================================================

CREATE TABLE IF NOT EXISTS history_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#C4A36A',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES history_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#C4A36A',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES history_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_mcq_questions (
  id             TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  difficulty     TEXT NOT NULL CHECK(difficulty IN ('SL','HL','SL/HL')),
  unit           TEXT NOT NULL DEFAULT 'A',
  question_text  TEXT NOT NULL,
  option_a       TEXT NOT NULL,
  option_b       TEXT NOT NULL,
  option_c       TEXT NOT NULL,
  option_d       TEXT NOT NULL,
  correct_option INTEGER NOT NULL CHECK(correct_option BETWEEN 0 AND 3),
  explanation    TEXT NOT NULL,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_written_questions (
  id             TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  difficulty     TEXT NOT NULL CHECK(difficulty IN ('SL','HL','SL/HL')),
  question_type  TEXT NOT NULL CHECK(question_type IN ('short_answer')),
  unit           TEXT NOT NULL DEFAULT 'A',
  marks          INTEGER NOT NULL,
  question_text  TEXT NOT NULL,
  mark_scheme    TEXT NOT NULL,
  label          TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS history_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);
