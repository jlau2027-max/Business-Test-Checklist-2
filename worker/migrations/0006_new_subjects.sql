-- ============================================================
-- Add tables for Chemistry, Physics, Sports Science, Economics
-- Each subject gets 7 tables mirroring biology's schema
-- ============================================================

-- ************************************************************
-- CHEMISTRY
-- ************************************************************

CREATE TABLE IF NOT EXISTS chemistry_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#8B5CF6',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chemistry_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES chemistry_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chemistry_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#8B5CF6',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chemistry_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES chemistry_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chemistry_mcq_questions (
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

CREATE TABLE IF NOT EXISTS chemistry_written_questions (
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

CREATE TABLE IF NOT EXISTS chemistry_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);

-- ************************************************************
-- PHYSICS
-- ************************************************************

CREATE TABLE IF NOT EXISTS physics_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#F59E0B',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS physics_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES physics_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS physics_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#F59E0B',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS physics_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES physics_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS physics_mcq_questions (
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

CREATE TABLE IF NOT EXISTS physics_written_questions (
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

CREATE TABLE IF NOT EXISTS physics_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);

-- ************************************************************
-- SPORTS SCIENCE
-- ************************************************************

CREATE TABLE IF NOT EXISTS sports_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#EF4444',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sports_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES sports_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sports_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#EF4444',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sports_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES sports_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sports_mcq_questions (
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

CREATE TABLE IF NOT EXISTS sports_written_questions (
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

CREATE TABLE IF NOT EXISTS sports_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);

-- ************************************************************
-- ECONOMICS
-- ************************************************************

CREATE TABLE IF NOT EXISTS economics_checklist_sections (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#06B6D4',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS economics_checklist_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  TEXT NOT NULL REFERENCES economics_checklist_sections(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS economics_flashcard_topics (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL DEFAULT '#06B6D4',
  unit       TEXT NOT NULL DEFAULT 'A',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS economics_flashcards (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  topic_id   TEXT NOT NULL REFERENCES economics_flashcard_topics(id) ON DELETE CASCADE,
  term       TEXT NOT NULL,
  definition TEXT NOT NULL,
  formula    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS economics_mcq_questions (
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

CREATE TABLE IF NOT EXISTS economics_written_questions (
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

CREATE TABLE IF NOT EXISTS economics_category_colors (
  category TEXT PRIMARY KEY,
  color    TEXT NOT NULL
);
