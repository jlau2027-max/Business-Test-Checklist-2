-- ============================================================
-- Add unit column (A / B / C / D) to biology content tables
-- Note: ALTER TABLE ADD COLUMN removed — columns already exist
-- ============================================================

UPDATE biology_checklist_sections SET unit = SUBSTR(title, 1, 1);
UPDATE biology_flashcard_topics SET unit = SUBSTR(label, 1, 1);
UPDATE biology_mcq_questions SET unit = SUBSTR(category, 1, 1);
UPDATE biology_written_questions SET unit = SUBSTR(category, 1, 1);
