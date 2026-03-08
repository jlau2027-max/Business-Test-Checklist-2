-- ============================================================
-- Biology Checklist Sections & Items
-- ============================================================
CREATE TABLE IF NOT EXISTS biology_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#5BA88C',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS biology_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES biology_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- Biology Flashcard Topics & Cards
-- ============================================================
CREATE TABLE IF NOT EXISTS biology_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#5BA88C',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS biology_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES biology_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- Biology MCQ Questions
-- ============================================================
CREATE TABLE IF NOT EXISTS biology_mcq_questions (
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
-- Biology Written Questions (short_answer only)
-- ============================================================
CREATE TABLE IF NOT EXISTS biology_written_questions (
  id             TEXT PRIMARY KEY,
  category       TEXT NOT NULL,
  difficulty     TEXT NOT NULL CHECK(difficulty IN ('SL','HL','SL/HL')),
  question_type  TEXT NOT NULL CHECK(question_type IN ('short_answer')),
  marks          INTEGER NOT NULL,
  question_text  TEXT NOT NULL,
  mark_scheme    TEXT NOT NULL,
  label          TEXT,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ============================================================
-- Biology Category Colors
-- ============================================================
CREATE TABLE IF NOT EXISTS biology_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);
