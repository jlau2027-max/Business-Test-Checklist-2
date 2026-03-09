-- ============================================================
-- 0032: Fix ESS & Spanish MCQ + Written table schemas
-- Aligns column names with the standard createSubjectHandlers format
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1) ESS MCQ — rename columns, split JSON options, add sort_order
-- ────────────────────────────────────────────────────────────

CREATE TABLE ess_mcq_questions_new (
  id           TEXT PRIMARY KEY,
  category     TEXT NOT NULL DEFAULT '',
  difficulty   TEXT NOT NULL DEFAULT '',
  unit         TEXT NOT NULL DEFAULT '',
  question_text TEXT NOT NULL,
  option_a     TEXT NOT NULL,
  option_b     TEXT NOT NULL,
  option_c     TEXT NOT NULL,
  option_d     TEXT NOT NULL,
  correct_option INTEGER NOT NULL DEFAULT 0,
  explanation  TEXT NOT NULL DEFAULT '',
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO ess_mcq_questions_new
  (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order)
SELECT
  id,
  COALESCE(category, ''),
  COALESCE(difficulty, ''),
  COALESCE(unit, ''),
  question,
  json_extract(options, '$[0]'),
  json_extract(options, '$[1]'),
  json_extract(options, '$[2]'),
  json_extract(options, '$[3]'),
  correct_answer,
  COALESCE(explanation, ''),
  ROW_NUMBER() OVER (ORDER BY id)
FROM ess_mcq_questions;

DROP TABLE ess_mcq_questions;
ALTER TABLE ess_mcq_questions_new RENAME TO ess_mcq_questions;


-- ────────────────────────────────────────────────────────────
-- 2) Spanish MCQ — same transformation
-- ────────────────────────────────────────────────────────────

CREATE TABLE spanish_mcq_questions_new (
  id           TEXT PRIMARY KEY,
  category     TEXT NOT NULL DEFAULT '',
  difficulty   TEXT NOT NULL DEFAULT '',
  unit         TEXT NOT NULL DEFAULT '',
  question_text TEXT NOT NULL,
  option_a     TEXT NOT NULL,
  option_b     TEXT NOT NULL,
  option_c     TEXT NOT NULL,
  option_d     TEXT NOT NULL,
  correct_option INTEGER NOT NULL DEFAULT 0,
  explanation  TEXT NOT NULL DEFAULT '',
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO spanish_mcq_questions_new
  (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order)
SELECT
  id,
  COALESCE(category, ''),
  COALESCE(difficulty, ''),
  COALESCE(unit, ''),
  question,
  json_extract(options, '$[0]'),
  json_extract(options, '$[1]'),
  json_extract(options, '$[2]'),
  json_extract(options, '$[3]'),
  correct_answer,
  COALESCE(explanation, ''),
  ROW_NUMBER() OVER (ORDER BY id)
FROM spanish_mcq_questions;

DROP TABLE spanish_mcq_questions;
ALTER TABLE spanish_mcq_questions_new RENAME TO spanish_mcq_questions;


-- ────────────────────────────────────────────────────────────
-- 3) ESS Written — rename columns, map type values, add sort_order
-- ────────────────────────────────────────────────────────────

CREATE TABLE ess_written_questions_new (
  id            TEXT PRIMARY KEY,
  category      TEXT NOT NULL DEFAULT '',
  difficulty    TEXT NOT NULL DEFAULT '',
  question_type TEXT NOT NULL DEFAULT 'short_answer',
  unit          TEXT NOT NULL DEFAULT '',
  marks         INTEGER,
  question_text TEXT NOT NULL,
  mark_scheme   TEXT,
  label         TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO ess_written_questions_new
  (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order)
SELECT
  id,
  COALESCE(category, ''),
  COALESCE(difficulty, ''),
  CASE
    WHEN type = 'short_answer' THEN 'short_answer'
    ELSE 'ten_marker'
  END,
  COALESCE(unit, ''),
  marks,
  question,
  mark_scheme,
  ROW_NUMBER() OVER (ORDER BY id)
FROM ess_written_questions;

DROP TABLE ess_written_questions;
ALTER TABLE ess_written_questions_new RENAME TO ess_written_questions;


-- ────────────────────────────────────────────────────────────
-- 4) Spanish Written — same transformation
-- ────────────────────────────────────────────────────────────

CREATE TABLE spanish_written_questions_new (
  id            TEXT PRIMARY KEY,
  category      TEXT NOT NULL DEFAULT '',
  difficulty    TEXT NOT NULL DEFAULT '',
  question_type TEXT NOT NULL DEFAULT 'short_answer',
  unit          TEXT NOT NULL DEFAULT '',
  marks         INTEGER,
  question_text TEXT NOT NULL,
  mark_scheme   TEXT,
  label         TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO spanish_written_questions_new
  (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order)
SELECT
  id,
  COALESCE(category, ''),
  COALESCE(difficulty, ''),
  CASE
    WHEN type = 'short_answer' THEN 'short_answer'
    ELSE 'ten_marker'
  END,
  COALESCE(unit, ''),
  marks,
  question,
  mark_scheme,
  ROW_NUMBER() OVER (ORDER BY id)
FROM spanish_written_questions;

DROP TABLE spanish_written_questions;
ALTER TABLE spanish_written_questions_new RENAME TO spanish_written_questions;
