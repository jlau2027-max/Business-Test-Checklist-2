-- ============================================================
-- Flashcard Topics & Cards
-- ============================================================
CREATE TABLE IF NOT EXISTS flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#7C6FFF',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- MCQ Questions
-- ============================================================
CREATE TABLE IF NOT EXISTS mcq_questions (
  id             TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  difficulty     TEXT NOT NULL CHECK(difficulty IN ('SL','HL','SL/HL')),
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

-- ============================================================
-- Written Questions (short answer + 10 markers + specimen)
-- ============================================================
CREATE TABLE IF NOT EXISTS written_questions (
  id             TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  difficulty     TEXT NOT NULL CHECK(difficulty IN ('SL','HL','SL/HL')),
  question_type  TEXT NOT NULL CHECK(question_type IN ('short_answer','ten_marker','specimen')),
  marks          INTEGER NOT NULL,
  question_text  TEXT NOT NULL,
  mark_scheme    TEXT NOT NULL,
  label          TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- History Questions (Paper 2 + Paper 3)
-- ============================================================
CREATE TABLE IF NOT EXISTS history_questions (
  id              TEXT PRIMARY KEY,
  paper           TEXT NOT NULL CHECK(paper IN ('paper2','paper3')),
  topic           TEXT NOT NULL,
  question_number INTEGER NOT NULL,
  question_text   TEXT NOT NULL,
  marks           INTEGER NOT NULL DEFAULT 15,
  mark_scheme     TEXT NOT NULL,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- Checklist Sections & Items
-- ============================================================
CREATE TABLE IF NOT EXISTS checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#7C6FFF',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- Category Colors (shared reference)
-- ============================================================
CREATE TABLE IF NOT EXISTS category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);
