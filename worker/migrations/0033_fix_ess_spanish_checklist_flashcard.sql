-- ============================================================
-- 0033: Fix ESS & Spanish checklist + flashcard table schemas
-- Aligns with the standard createSubjectHandlers column names
-- Drop order: child tables before parents (FK constraints)
-- ============================================================

-- ──── Create all new tables first ────────────────────────────

-- 1) ESS checklist sections (parent)
CREATE TABLE ess_checklist_sections_new (
  id TEXT PRIMARY KEY, title TEXT NOT NULL,
  color TEXT DEFAULT '#10B981', unit TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2) ESS checklist items (child of sections)
CREATE TABLE ess_checklist_items_new (
  id TEXT PRIMARY KEY, section_id TEXT NOT NULL,
  text TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3) Spanish checklist sections (parent)
CREATE TABLE spanish_checklist_sections_new (
  id TEXT PRIMARY KEY, title TEXT NOT NULL,
  color TEXT DEFAULT '#D4915C', unit TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4) Spanish checklist items (child of sections)
CREATE TABLE spanish_checklist_items_new (
  id TEXT PRIMARY KEY, section_id TEXT NOT NULL,
  text TEXT NOT NULL, sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5) ESS flashcard topics (parent)
CREATE TABLE ess_flashcard_topics_new (
  id TEXT PRIMARY KEY, label TEXT NOT NULL,
  color TEXT DEFAULT '#10B981', unit TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6) ESS flashcards (child of topics)
CREATE TABLE ess_flashcards_new (
  id TEXT PRIMARY KEY, topic_id TEXT NOT NULL,
  term TEXT NOT NULL, definition TEXT NOT NULL, formula TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7) Spanish flashcard topics (parent)
CREATE TABLE spanish_flashcard_topics_new (
  id TEXT PRIMARY KEY, label TEXT NOT NULL,
  color TEXT DEFAULT '#D4915C', unit TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8) Spanish flashcards (child of topics)
CREATE TABLE spanish_flashcards_new (
  id TEXT PRIMARY KEY, topic_id TEXT NOT NULL,
  term TEXT NOT NULL, definition TEXT NOT NULL, formula TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);


-- ──── Migrate data into new tables ───────────────────────────

INSERT INTO ess_checklist_sections_new (id, title, color, unit, sort_order)
SELECT id, title, '#10B981',
  CASE WHEN id LIKE 'ess_s1_%' THEN '1' ELSE '2' END, sort_order
FROM ess_checklist_sections;

INSERT INTO ess_checklist_items_new (id, section_id, text, sort_order)
SELECT id, section_id, label, sort_order FROM ess_checklist_items;

INSERT INTO spanish_checklist_sections_new (id, title, color, unit, sort_order)
SELECT id, title, '#D4915C',
  CASE WHEN id LIKE 'span_ih_%' THEN 'Ingenio Humano' ELSE 'Cómo nos cuidamos' END, sort_order
FROM spanish_checklist_sections;

INSERT INTO spanish_checklist_items_new (id, section_id, text, sort_order)
SELECT id, section_id, label, sort_order FROM spanish_checklist_items;

INSERT INTO ess_flashcard_topics_new (id, label, color, unit, sort_order)
SELECT id, name, COALESCE(color, '#10B981'), COALESCE(unit, ''), sort_order
FROM ess_flashcard_topics;

INSERT INTO ess_flashcards_new (id, topic_id, term, definition, sort_order)
SELECT id, topic_id, front, back, sort_order FROM ess_flashcards;

INSERT INTO spanish_flashcard_topics_new (id, label, color, unit, sort_order)
SELECT id, name, COALESCE(color, '#D4915C'), COALESCE(unit, ''), sort_order
FROM spanish_flashcard_topics;

INSERT INTO spanish_flashcards_new (id, topic_id, term, definition, sort_order)
SELECT id, topic_id, front, back, sort_order FROM spanish_flashcards;


-- ──── Drop old tables: CHILDREN FIRST, then parents ──────────

DROP TABLE ess_checklist_items;
DROP TABLE ess_checklist_sections;
DROP TABLE ess_flashcards;
DROP TABLE ess_flashcard_topics;
DROP TABLE spanish_checklist_items;
DROP TABLE spanish_checklist_sections;
DROP TABLE spanish_flashcards;
DROP TABLE spanish_flashcard_topics;


-- ──── Rename new tables ──────────────────────────────────────

ALTER TABLE ess_checklist_sections_new RENAME TO ess_checklist_sections;
ALTER TABLE ess_checklist_items_new RENAME TO ess_checklist_items;
ALTER TABLE spanish_checklist_sections_new RENAME TO spanish_checklist_sections;
ALTER TABLE spanish_checklist_items_new RENAME TO spanish_checklist_items;
ALTER TABLE ess_flashcard_topics_new RENAME TO ess_flashcard_topics;
ALTER TABLE ess_flashcards_new RENAME TO ess_flashcards;
ALTER TABLE spanish_flashcard_topics_new RENAME TO spanish_flashcard_topics;
ALTER TABLE spanish_flashcards_new RENAME TO spanish_flashcards;
