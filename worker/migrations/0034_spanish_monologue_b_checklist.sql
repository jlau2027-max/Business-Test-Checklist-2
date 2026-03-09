-- Add Spanish Monologue B checklist section and items

INSERT INTO spanish_checklist_sections (id, title, color, unit, sort_order)
VALUES ('span_mono_b', 'Monologue B Checklist', '#D4915C', 'Monologue', 8);

INSERT INTO spanish_checklist_items (id, section_id, text, sort_order) VALUES
('span_mob_1', 'span_mono_b', 'Photo description — En esta foto podemos ver..', 1),
('span_mob_2', 'span_mono_b', 'Country — Creo que la foto fue tomada en…', 2),
('span_mob_3', 'span_mono_b', 'Área temática — Por eso esta foto me hace pensar en el área temática… (info at top of each photo)', 3),
('span_mob_4', 'span_mono_b', 'Tema — específicamente el tema… (info at top of each photo)', 4),
('span_mob_5', 'span_mono_b', 'References to the photo — Como vemos en la foto, como se puede ver en la foto, estas personas…', 5),
('span_mob_6', 'span_mono_b', 'Culture — Make references to a few cultural aspects', 6),
('span_mob_7', 'span_mono_b', 'Opinions — Creo que, pienso que, me parece que, desde mi perspectiva, considero que', 7),
('span_mob_8', 'span_mono_b', 'Valoraciones — me hace sentir triste que, deseo que, espero que, es injusto/horrible/conmovedor', 8),
('span_mob_9', 'span_mono_b', 'Specific vocabulary — sports, surgery, health, food, music (10 questions worth)', 9),
('span_mob_10', 'span_mono_b', 'Complex structures — presente subjuntivo, pretérito perfecto compuesto del subjuntivo, imperfecto del subjuntivo, triple verb sentences', 10);
