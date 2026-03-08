-- ============================================================
-- Add unit column (A / B / C / D) to biology content tables
-- ============================================================

-- Checklist sections
ALTER TABLE biology_checklist_sections ADD COLUMN unit TEXT NOT NULL DEFAULT 'A';
UPDATE biology_checklist_sections SET unit = SUBSTR(title, 1, 1);

-- Flashcard topics
ALTER TABLE biology_flashcard_topics ADD COLUMN unit TEXT NOT NULL DEFAULT 'A';
UPDATE biology_flashcard_topics SET unit = SUBSTR(label, 1, 1);

-- MCQ questions
ALTER TABLE biology_mcq_questions ADD COLUMN unit TEXT NOT NULL DEFAULT 'A';
UPDATE biology_mcq_questions SET unit = SUBSTR(category, 1, 1);

-- Written questions
ALTER TABLE biology_written_questions ADD COLUMN unit TEXT NOT NULL DEFAULT 'A';
UPDATE biology_written_questions SET unit = SUBSTR(category, 1, 1);
