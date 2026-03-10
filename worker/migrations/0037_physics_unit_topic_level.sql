-- Change physics units from sub-topic (A.1, A.2…) to topic level (A, B, C, D, E)
-- to match the chemistry unit-splitting pattern (all, A, B, C, D, E)

UPDATE physics_checklist_sections SET unit = 'A' WHERE unit LIKE 'A.%';
UPDATE physics_checklist_sections SET unit = 'B' WHERE unit LIKE 'B.%';
UPDATE physics_checklist_sections SET unit = 'C' WHERE unit LIKE 'C.%';
UPDATE physics_checklist_sections SET unit = 'D' WHERE unit LIKE 'D.%';
UPDATE physics_checklist_sections SET unit = 'E' WHERE unit LIKE 'E.%';

UPDATE physics_flashcard_topics SET unit = 'A' WHERE unit LIKE 'A.%';
UPDATE physics_flashcard_topics SET unit = 'B' WHERE unit LIKE 'B.%';
UPDATE physics_flashcard_topics SET unit = 'C' WHERE unit LIKE 'C.%';
UPDATE physics_flashcard_topics SET unit = 'D' WHERE unit LIKE 'D.%';
UPDATE physics_flashcard_topics SET unit = 'E' WHERE unit LIKE 'E.%';
