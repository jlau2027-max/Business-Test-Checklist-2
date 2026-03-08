-- Biology questions table (mirrors history_questions, papers 1 & 2)
CREATE TABLE IF NOT EXISTS biology_questions (
  id              TEXT PRIMARY KEY,
  paper           TEXT NOT NULL CHECK(paper IN ('paper1','paper2')),
  topic           TEXT NOT NULL,
  question_number INTEGER NOT NULL,
  question_text   TEXT NOT NULL,
  marks           INTEGER NOT NULL DEFAULT 8,
  mark_scheme     TEXT NOT NULL,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);
