-- Spanish (Language Acquisition) tables
-- Follows the same pattern as other subjects

CREATE TABLE IF NOT EXISTS spanish_checklist_sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS spanish_checklist_items (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES spanish_checklist_sections(id),
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS spanish_flashcard_topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  unit TEXT,
  card_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  color TEXT DEFAULT '#D4915C'
);

CREATE TABLE IF NOT EXISTS spanish_flashcards (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES spanish_flashcard_topics(id),
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS spanish_mcq_questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  options TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'medium',
  unit TEXT
);

CREATE TABLE IF NOT EXISTS spanish_written_questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  mark_scheme TEXT,
  marks INTEGER,
  type TEXT DEFAULT 'short',
  category TEXT,
  difficulty TEXT DEFAULT 'medium',
  unit TEXT
);

CREATE TABLE IF NOT EXISTS spanish_category_colors (
  category TEXT PRIMARY KEY,
  color TEXT NOT NULL DEFAULT '#D4915C'
);
