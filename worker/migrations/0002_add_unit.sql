-- Add optional unit column to content tables for per-unit filtering.
-- Existing rows have unit NULL; when client sends ?unit=X only rows with unit = X are returned.

ALTER TABLE flashcard_topics ADD COLUMN unit TEXT;
ALTER TABLE flashcards ADD COLUMN unit TEXT;
ALTER TABLE mcq_questions ADD COLUMN unit TEXT;
ALTER TABLE written_questions ADD COLUMN unit TEXT;
ALTER TABLE checklist_sections ADD COLUMN unit TEXT;
