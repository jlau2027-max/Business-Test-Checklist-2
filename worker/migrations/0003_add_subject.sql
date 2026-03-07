-- Add subject column so content can be filtered by subject (biology vs business).
-- Frontend sends subject=biology or subject=business; existing rows have subject NULL (returned when no subject filter).

ALTER TABLE flashcard_topics ADD COLUMN subject TEXT;
ALTER TABLE flashcards ADD COLUMN subject TEXT;
ALTER TABLE checklist_sections ADD COLUMN subject TEXT;
