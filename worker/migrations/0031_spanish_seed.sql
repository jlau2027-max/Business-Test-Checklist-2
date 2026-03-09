-- ============================================================
-- Spanish (Language Acquisition) – Full Seed Data
-- Two study packs:
--   1. "Ingenio Humano" (Technology, Social Media, Video Games)
--   2. "¿Cómo nos cuidamos?" (Diet, Health, Sport, Surgery)
-- ============================================================

-- ----------------------------------------------------------
-- 1. Category Colours
-- ----------------------------------------------------------
INSERT OR IGNORE INTO spanish_category_colors (category, color) VALUES
  ('Tecnología y vida',    '#3B82F6'),
  ('Redes sociales',       '#8B5CF6'),
  ('Videojuegos',          '#EF4444'),
  ('Dieta y nutrición',    '#F97316'),
  ('Vida sana e insomnio', '#10B981'),
  ('Deporte y ejercicio',  '#06B6D4'),
  ('Cirugía estética',     '#EC4899'),
  ('Gramática',            '#6366F1');

-- ----------------------------------------------------------
-- 2. Checklist Sections
-- ----------------------------------------------------------
INSERT OR IGNORE INTO spanish_checklist_sections (id, title, sort_order) VALUES
  ('span_ih_u1',  'Ingenio Humano — 1. Tecnología y vida',            1),
  ('span_ih_u2',  'Ingenio Humano — 2. Redes sociales',               2),
  ('span_ih_u3',  'Ingenio Humano — 3. Videojuegos',                  3),
  ('span_cnc_t1', '¿Cómo nos cuidamos? — 1. Dieta y nutrición',      4),
  ('span_cnc_t2', '¿Cómo nos cuidamos? — 2. Vida sana e insomnio',   5),
  ('span_cnc_t3', '¿Cómo nos cuidamos? — 3. Deporte y ejercicio',    6),
  ('span_cnc_t4', '¿Cómo nos cuidamos? — 4. Cirugía estética',       7);

-- ----------------------------------------------------------
-- 3. Checklist Items
-- ----------------------------------------------------------

-- Section: span_ih_u1 — Tecnología y vida (15 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_ih1_v1', 'span_ih_u1', 'I can list 10+ technology-related nouns (aparato, buscador, contraseña, fibra óptica, fichero, internauta…)', 1),
  ('span_ih1_v2', 'span_ih_u1', 'I can use verbs for online actions: navegar, conectarse, descargar, subir, grabar, guardar, charlar', 2),
  ('span_ih1_v3', 'span_ih_u1', 'I can describe advantages: facilitar, mejorar, imprescindible, revolucionario, avances tecnológicos', 3),
  ('span_ih1_v4', 'span_ih_u1', 'I can describe disadvantages: amenaza, adicción, aislamiento social, estafa, dependencia, distracción', 4),
  ('span_ih1_v5', 'span_ih_u1', 'I know comparative vocabulary: países desarrollados vs. países en vías de desarrollo', 5),
  ('span_ih1_g1', 'span_ih_u1', 'I can conjugate regular -AR, -ER, -IR verbs in the IMPERFECTO (estaba, tenía, vivía…)', 6),
  ('span_ih1_g2', 'span_ih_u1', 'I know the 3 irregular imperfecto verbs: ser (era), ir (iba), ver (veía)', 7),
  ('span_ih1_g3', 'span_ih_u1', 'I can use time markers: de niño/a, a los 15 años, de joven, cuando tenía… años, en aquellos tiempos', 8),
  ('span_ih1_g4', 'span_ih_u1', 'I can form the FUTURO SIMPLE for predictions (hablaré, comerás, vivirá…)', 9),
  ('span_ih1_g5', 'span_ih_u1', 'I can contrast antes vs. ahora using imperfecto + present tense with connectors', 10),
  ('span_ih1_s1', 'span_ih_u1', 'I can write a DISCURSO (speech) of ~250 words on technology in education', 11),
  ('span_ih1_s2', 'span_ih_u1', 'I can compare how devices have changed over 25 years (aspect, size, price, use)', 12),
  ('span_ih1_s3', 'span_ih_u1', 'I can discuss technology in education: pros and cons of pizarras digitales, tabletas, clases virtuales', 13),
  ('span_ih1_s4', 'span_ih_u1', 'I can read/answer comprehension questions on texts about technology and globalisation', 14),
  ('span_ih1_s5', 'span_ih_u1', 'I can make future predictions about technology using futuro simple', 15);

-- Section: span_ih_u2 — Redes sociales (13 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_ih2_v1', 'span_ih_u2', 'I can name social media vocabulary: perfil, publicación, seguidores, pantalla, notificación, dispositivo', 1),
  ('span_ih2_v2', 'span_ih_u2', 'I can describe risks: acoso cibernético, peligro, riesgo, datos personales, desconocido, identidad', 2),
  ('span_ih2_v3', 'span_ih_u2', 'I can discuss advantages: comunicar, fomentar, establecer contacto, compartir conocimiento', 3),
  ('span_ih2_v4', 'span_ih_u2', 'I can discuss disadvantages: perder el tiempo, adicción, infoxicación, noticias falsas, privacidad en riesgo', 4),
  ('span_ih2_v5', 'span_ih_u2', 'I know expressions about phone use: sacar fotos, enviar mensajes, revisar, utilizar, funcionar', 5),
  ('span_ih2_g1', 'span_ih_u2', 'I can conjugate the PRETÉRITO INDEFINIDO for completed past actions', 6),
  ('span_ih2_g2', 'span_ih_u2', 'I can distinguish imperfecto (habitual/descriptive) from pretérito (single completed events)', 7),
  ('span_ih2_g3', 'span_ih_u2', 'I can use connectors: no sólo… sino que también, además, sin embargo, por otra parte', 8),
  ('span_ih2_g4', 'span_ih_u2', 'I know opinion phrases: para mí, en mi opinión, yo creo que, a mi entender/parecer', 9),
  ('span_ih2_s1', 'span_ih_u2', 'I can write 50+ words on ventajas y desventajas de las redes sociales with connectors', 10),
  ('span_ih2_s2', 'span_ih_u2', 'I can discuss how social media affects the brain (dopamina, serotonina, cortisol)', 11),
  ('span_ih2_s3', 'span_ih_u2', 'I can describe how social media changes relationships', 12),
  ('span_ih2_s4', 'span_ih_u2', 'I can answer IB-style comprehension: true/false, gap-fill, matching, short-answer', 13);

-- Section: span_ih_u3 — Videojuegos (5 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_ih3_1', 'span_ih_u3', 'I can list pros and cons of videojuegos (adictivo, violento, educativo, entretenido, estrategia, interactuar)', 1),
  ('span_ih3_2', 'span_ih_u3', 'I can use expresiones de tiempo con ''hacer'': hace + time + que + present; hace + time + que + pretérito', 2),
  ('span_ih3_3', 'span_ih_u3', 'I know gaming vocab: consola, mando, pantalla, jugadores, ganadores, reglas, ventas, realidad virtual', 3),
  ('span_ih3_4', 'span_ih_u3', 'I can write a blog/diary about how videojuegos have helped me personally, socially and academically', 4),
  ('span_ih3_5', 'span_ih_u3', 'I can write a carta/correo warning a friend about excessive online gaming', 5);

-- Section: span_cnc_t1 — Dieta y nutrición (23 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_cnc1_v1', 'span_cnc_t1', 'I can name common food groups in Spanish (frutas, verduras, cereales, lácteos, carne, pescado)', 1),
  ('span_cnc1_v2', 'span_cnc_t1', 'I know vocabulary for meals (desayuno, almuerzo, merienda, cena, postre)', 2),
  ('span_cnc1_v3', 'span_cnc_t1', 'I can describe food qualities (saludable, nutritivo, perjudicial, dañino, beneficioso)', 3),
  ('span_cnc1_v4', 'span_cnc_t1', 'I can use diet-related terms (dieta equilibrada, adelgazar, engordar, perder peso, sobrepeso)', 4),
  ('span_cnc1_v5', 'span_cnc_t1', 'I know health-related vocabulary (colesterol, presión arterial, cardiopatías, infarto, antioxidantes)', 5),
  ('span_cnc1_v6', 'span_cnc_t1', 'I can talk about frequency (diario, semanal, mensual, con moderación)', 6),
  ('span_cnc1_v7', 'span_cnc_t1', 'I can name key nutrients (proteínas, fibra, vitaminas, grasas, calorías, energía)', 7),
  ('span_cnc1_c1', 'span_cnc_t1', 'I can describe the Mediterranean Diet pyramid and its key principles', 8),
  ('span_cnc1_c2', 'span_cnc_t1', 'I can name countries that follow the Mediterranean Diet (España, Italia, Grecia)', 9),
  ('span_cnc1_c3', 'span_cnc_t1', 'I can explain what ''aceite de oliva'' is and why it is important in the diet', 10),
  ('span_cnc1_c4', 'span_cnc_t1', 'I can compare food trends: paleolítica, clean eating, veganismo, crudivorismo, superalimentos', 11),
  ('span_cnc1_c5', 'span_cnc_t1', 'I can describe typical breakfasts: pan con tomate (Spain), churros, arepas (Colombia)', 12),
  ('span_cnc1_c6', 'span_cnc_t1', 'I can explain what ''tapas'' are and their historical/cultural significance', 13),
  ('span_cnc1_c7', 'span_cnc_t1', 'I can discuss the concept ''¿Somos lo que comemos?'' with opinions and examples', 14),
  ('span_cnc1_g1', 'span_cnc_t1', 'I can form the present subjunctive of regular -ar, -er, -ir verbs', 15),
  ('span_cnc1_g2', 'span_cnc_t1', 'I know the 6 irregular subjunctive verbs: DISHES (dar, ir, saber, haber, estar, ser)', 16),
  ('span_cnc1_g3', 'span_cnc_t1', 'I can use the subjunctive after ''es importante que'', ''es necesario que'', ''recomiendo que''', 17),
  ('span_cnc1_g4', 'span_cnc_t1', 'I know when to use infinitive vs. subjunctive (no specific subject → infinitive)', 18),
  ('span_cnc1_g5', 'span_cnc_t1', 'I can form the Pretérito Perfecto Compuesto del Subjuntivo (haya + participio)', 19),
  ('span_cnc1_g6', 'span_cnc_t1', 'I can use ''cuando + subjuntivo'' for future time references', 20),
  ('span_cnc1_s1', 'span_cnc_t1', 'I can write a blog post with correct structure (título, fecha, autor, introducción, cuerpo, conclusión, invitación)', 21),
  ('span_cnc1_s2', 'span_cnc_t1', 'I can use consequence connectors (por esto, por tanto, en consecuencia, por consiguiente)', 22),
  ('span_cnc1_s3', 'span_cnc_t1', 'I can write 250–400 word compositions using subjunctive + varied tenses', 23);

-- Section: span_cnc_t2 — Vida sana e insomnio (7 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_cnc2_1', 'span_cnc_t2', 'I can describe steps for a healthy lifestyle (10 pasos para una vida sana)', 1),
  ('span_cnc2_2', 'span_cnc_t2', 'I understand the concept of ''la siesta'' and its cultural significance in Hispanic countries', 2),
  ('span_cnc2_3', 'span_cnc_t2', 'I can discuss causes and types of insomnia (ocasional vs. crónico)', 3),
  ('span_cnc2_4', 'span_cnc_t2', 'I know vocabulary: insomnio, sueño reparador, estrés, pastillas, pautas, hábitos', 4),
  ('span_cnc2_5', 'span_cnc_t2', 'I can identify true/false statements about insomnia from a text', 5),
  ('span_cnc2_6', 'span_cnc_t2', 'I can match questions to paragraphs in a reading comprehension', 6),
  ('span_cnc2_7', 'span_cnc_t2', 'I can write a blog post about health topics (siesta, sleep, lifestyle)', 7);

-- Section: span_cnc_t3 — Deporte y ejercicio (7 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_cnc3_1', 'span_cnc_t3', 'I know sports vocabulary (entrenamiento, calentamiento, estiramiento, enfriamiento, lesión)', 1),
  ('span_cnc3_2', 'span_cnc_t3', 'I can name types of sports (de equipo, individuales, de alto riesgo, competitivos)', 2),
  ('span_cnc3_3', 'span_cnc_t3', 'I can discuss benefits of exercise (relajar, desconectar, dormir mejor, estar en forma)', 3),
  ('span_cnc3_4', 'span_cnc_t3', 'I can express opinions about sport using different structures', 4),
  ('span_cnc3_5', 'span_cnc_t3', 'I can write and understand an interview format (preguntas del periodista + respuestas)', 5),
  ('span_cnc3_6', 'span_cnc_t3', 'I know expressions: estar en forma, ponerse cachas, marcar un gol, batir un récord', 6),
  ('span_cnc3_7', 'span_cnc_t3', 'I can describe what a sedentary lifestyle is and its consequences', 7);

-- Section: span_cnc_t4 — Cirugía estética (7 items)
INSERT OR IGNORE INTO spanish_checklist_items (id, section_id, label, sort_order) VALUES
  ('span_cnc4_1', 'span_cnc_t4', 'I know cosmetic surgery vocabulary (rinoplastia, liposucción, implantes, cirujano, quirófano)', 1),
  ('span_cnc4_2', 'span_cnc_t4', 'I can discuss reasons for/against cosmetic surgery', 2),
  ('span_cnc4_3', 'span_cnc_t4', 'I can talk about body image and societal pressure (obsesión por la belleza, aspecto físico)', 3),
  ('span_cnc4_4', 'span_cnc_t4', 'I understand the cultural context of cosmetic surgery in Venezuela', 4),
  ('span_cnc4_5', 'span_cnc_t4', 'I can use modal verbs: deber, poder, saber, soler, querer in multiple tenses', 5),
  ('span_cnc4_6', 'span_cnc_t4', 'I can conjugate modal verbs in present, preterite, imperfect, future, conditional, perfect', 6),
  ('span_cnc4_7', 'span_cnc_t4', 'I can write a formal letter, informal letter, or article giving advice about body image', 7);

-- ----------------------------------------------------------
-- 4. Flashcard Topics
-- ----------------------------------------------------------
INSERT OR IGNORE INTO spanish_flashcard_topics (id, name, description, unit, card_count, sort_order, color) VALUES
  ('span_ft_tech',     'Technology & Communication',                'Vocabulary for technology, internet, and digital communication',  'Ingenio Humano',    16, 1,  '#D4915C'),
  ('span_ft_risks',    'Risks & Problems',                         'Vocabulary for online risks and digital dangers',                'Ingenio Humano',    11, 2,  '#D4915C'),
  ('span_ft_social',   'Social Media',                             'Social media vocabulary and expressions',                       'Ingenio Humano',    12, 3,  '#D4915C'),
  ('span_ft_games',    'Video Games',                              'Gaming vocabulary and expressions',                             'Ingenio Humano',    12, 4,  '#D4915C'),
  ('span_ft_gram_ih',  'Grammar — Key Forms (Imperfecto & Futuro)','Key verb forms: imperfecto, futuro simple, time expressions',   'Ingenio Humano',    10, 5,  '#D4915C'),
  ('span_ft_food',     'Food & Nutrition Vocabulary',              'Diet, food groups, and nutrition terminology',                  'Cómo nos cuidamos', 24, 6,  '#D4915C'),
  ('span_ft_sports',   'Sports & Exercise Vocabulary',             'Sports, training, and fitness terminology',                     'Cómo nos cuidamos', 19, 7,  '#D4915C'),
  ('span_ft_surgery',  'Cosmetic Surgery Vocabulary',              'Cosmetic surgery and body image terminology',                   'Cómo nos cuidamos', 16, 8,  '#D4915C'),
  ('span_ft_health',   'Health & Lifestyle',                       'Health, sleep, and wellbeing vocabulary',                       'Cómo nos cuidamos', 10, 9,  '#D4915C'),
  ('span_ft_gram_cnc', 'Grammar — Subjunctive Forms (DISHES)',     'Key subjunctive verb forms and usage patterns',                 'Cómo nos cuidamos', 10, 10, '#D4915C');

-- ----------------------------------------------------------
-- 5. Flashcards
-- ----------------------------------------------------------

-- Topic: span_ft_tech — Technology & Communication (16 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_t1',  'span_ft_tech', 'acceso a internet',              'internet access',        1),
  ('span_fc_t2',  'span_ft_tech', 'almacenamiento',                 'storage',                2),
  ('span_fc_t3',  'span_ft_tech', 'los avances tecnológicos',       'technological advances', 3),
  ('span_fc_t4',  'span_ft_tech', 'buscador',                       'search engine',          4),
  ('span_fc_t5',  'span_ft_tech', 'ciberespacio',                   'cyberspace',             5),
  ('span_fc_t6',  'span_ft_tech', 'conectarse a internet',          'to go online',           6),
  ('span_fc_t7',  'span_ft_tech', 'contraseña',                     'password',               7),
  ('span_fc_t8',  'span_ft_tech', 'descargar / bajar',              'to download',            8),
  ('span_fc_t9',  'span_ft_tech', 'dirección de correo electrónico','email address',          9),
  ('span_fc_t10', 'span_ft_tech', 'fibra óptica',                   'optical fibre',          10),
  ('span_fc_t11', 'span_ft_tech', 'guardar',                        'to save / keep',         11),
  ('span_fc_t12', 'span_ft_tech', 'imprescindible',                 'indispensable, vital',   12),
  ('span_fc_t13', 'span_ft_tech', 'navegar por internet',           'to surf the web',        13),
  ('span_fc_t14', 'span_ft_tech', 'ordenador portátil',             'laptop',                 14),
  ('span_fc_t15', 'span_ft_tech', 'subir',                          'to upload',              15),
  ('span_fc_t16', 'span_ft_tech', 'teléfono móvil',                 'mobile phone',           16);

-- Topic: span_ft_risks — Risks & Problems (11 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_r1',  'span_ft_risks', 'adicción',              'addiction',             1),
  ('span_fc_r2',  'span_ft_risks', 'aislamiento social',    'social isolation',      2),
  ('span_fc_r3',  'span_ft_risks', 'amenaza',               'threat',                3),
  ('span_fc_r4',  'span_ft_risks', 'contenido inapropiado', 'inappropriate content', 4),
  ('span_fc_r5',  'span_ft_risks', 'dependencia',           'dependency',            5),
  ('span_fc_r6',  'span_ft_risks', 'distracción',           'distraction',           6),
  ('span_fc_r7',  'span_ft_risks', 'engañar',               'to cheat / deceive',    7),
  ('span_fc_r8',  'span_ft_risks', 'estafa',                'fraud',                 8),
  ('span_fc_r9',  'span_ft_risks', 'estar enganchado',      'to be hooked',          9),
  ('span_fc_r10', 'span_ft_risks', 'hablar con desconocidos','to talk to strangers', 10),
  ('span_fc_r11', 'span_ft_risks', 'piratería',             'piracy',                11);

-- Topic: span_ft_social — Social Media (12 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_s1',  'span_ft_social', 'acoso cibernético',       'cyberbullying',              1),
  ('span_fc_s2',  'span_ft_social', 'datos personales',        'personal information',       2),
  ('span_fc_s3',  'span_ft_social', 'dispositivo',             'device',                     3),
  ('span_fc_s4',  'span_ft_social', 'pantalla',                'screen',                     4),
  ('span_fc_s5',  'span_ft_social', 'peligroso',               'dangerous',                  5),
  ('span_fc_s6',  'span_ft_social', 'perder el tiempo',        'to waste time',              6),
  ('span_fc_s7',  'span_ft_social', 'perfil',                  'a profile',                  7),
  ('span_fc_s8',  'span_ft_social', 'publicar',                'to post',                    8),
  ('span_fc_s9',  'span_ft_social', 'redes sociales',          'social media',               9),
  ('span_fc_s10', 'span_ft_social', 'seguidores',              'followers',                  10),
  ('span_fc_s11', 'span_ft_social', 'seguridad',               'security',                   11),
  ('span_fc_s12', 'span_ft_social', 'ventaja / desventaja',    'advantage / disadvantage',   12);

-- Topic: span_ft_games — Video Games (12 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_g1',  'span_ft_games', 'adictivo',                 'addictive',           1),
  ('span_fc_g2',  'span_ft_games', 'agresividad',              'aggressiveness',      2),
  ('span_fc_g3',  'span_ft_games', 'comportamiento',           'behaviour',           3),
  ('span_fc_g4',  'span_ft_games', 'consola',                  'game console',        4),
  ('span_fc_g5',  'span_ft_games', 'educativo',                'educational',         5),
  ('span_fc_g6',  'span_ft_games', 'entretenido',              'entertaining',        6),
  ('span_fc_g7',  'span_ft_games', 'estrategia',               'strategy',            7),
  ('span_fc_g8',  'span_ft_games', 'jugadores / ganadores',    'players / winners',   8),
  ('span_fc_g9',  'span_ft_games', 'realidad virtual',         'virtual reality',     9),
  ('span_fc_g10', 'span_ft_games', 'reglas',                   'rules',               10),
  ('span_fc_g11', 'span_ft_games', 'ventas',                   'sales',               11),
  ('span_fc_g12', 'span_ft_games', 'violento',                 'violent',             12);

-- Topic: span_ft_gram_ih — Grammar Key Forms (10 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_gi1',  'span_ft_gram_ih', 'estaba / estabas / estaba',           'I was / you were / he-she was (estar, imperf.)',  1),
  ('span_fc_gi2',  'span_ft_gram_ih', 'tenía / teníamos / tenían',           'I had / we had / they had (tener, imperf.)',      2),
  ('span_fc_gi3',  'span_ft_gram_ih', 'era / eras / éramos',                 'I was / you were / we were (ser, imperf.)',       3),
  ('span_fc_gi4',  'span_ft_gram_ih', 'iba / ibas / íbamos',                 'I went / you went / we went (ir, imperf.)',       4),
  ('span_fc_gi5',  'span_ft_gram_ih', 'veía / veías / veíamos',              'I saw / you saw / we saw (ver, imperf.)',         5),
  ('span_fc_gi6',  'span_ft_gram_ih', 'de niño/a / de joven',                'as a child / as a young person',                  6),
  ('span_fc_gi7',  'span_ft_gram_ih', 'en aquellos tiempos',                 'in those times',                                  7),
  ('span_fc_gi8',  'span_ft_gram_ih', 'hace + tiempo + que + pres.',         'I have been …-ing for [time]',                    8),
  ('span_fc_gi9',  'span_ft_gram_ih', 'hablaré / comeré / viviré',           'I will speak / eat / live (futuro)',              9),
  ('span_fc_gi10', 'span_ft_gram_ih', 'tendré / podré / haré',               'I will have / be able to / do (irreg. futuro)',   10);

-- Topic: span_ft_food — Food & Nutrition Vocabulary (24 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_f1',  'span_ft_food', 'el aceite de oliva',          'olive oil',                  1),
  ('span_fc_f2',  'span_ft_food', 'adelgazar / perder peso',     'to lose weight',             2),
  ('span_fc_f3',  'span_ft_food', 'engordar',                    'to gain weight',             3),
  ('span_fc_f4',  'span_ft_food', 'una dieta equilibrada',       'a balanced diet',            4),
  ('span_fc_f5',  'span_ft_food', 'alto contenido en grasas',    'high-fat (food)',            5),
  ('span_fc_f6',  'span_ft_food', 'los antioxidantes',           'antioxidants',               6),
  ('span_fc_f7',  'span_ft_food', 'la bollería',                 'cakes, pastries, buns',      7),
  ('span_fc_f8',  'span_ft_food', 'las cardiopatías',            'heart disease',              8),
  ('span_fc_f9',  'span_ft_food', 'el colesterol',               'cholesterol',                9),
  ('span_fc_f10', 'span_ft_food', 'comida casera',               'homemade food',              10),
  ('span_fc_f11', 'span_ft_food', 'comida rápida',               'fast food',                  11),
  ('span_fc_f12', 'span_ft_food', 'dañino / perjudicial',        'damaging / harmful',         12),
  ('span_fc_f13', 'span_ft_food', 'saludable / nutritivo',       'healthy / nutritious',       13),
  ('span_fc_f14', 'span_ft_food', 'el sobrepeso',                'excess weight / overweight', 14),
  ('span_fc_f15', 'span_ft_food', 'picotear',                    'to nibble / to snack',       15),
  ('span_fc_f16', 'span_ft_food', 'los frutos secos',            'nuts',                       16),
  ('span_fc_f17', 'span_ft_food', 'las legumbres',               'pulses / legumes',           17),
  ('span_fc_f18', 'span_ft_food', 'las hortalizas / verduras',   'vegetables',                 18),
  ('span_fc_f19', 'span_ft_food', 'los lácteos',                 'dairy products',             19),
  ('span_fc_f20', 'span_ft_food', 'la presión arterial',         'blood pressure',             20),
  ('span_fc_f21', 'span_ft_food', 'un infarto',                  'a heart attack',             21),
  ('span_fc_f22', 'span_ft_food', 'ser goloso',                  'to have a sweet tooth',      22),
  ('span_fc_f23', 'span_ft_food', 'con moderación',              'in moderation',              23),
  ('span_fc_f24', 'span_ft_food', 'el valor nutritivo',          'nutritional value',          24);

-- Topic: span_ft_sports — Sports & Exercise Vocabulary (19 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_sp1',  'span_ft_sports', 'el entrenamiento',               'training',                  1),
  ('span_fc_sp2',  'span_ft_sports', 'el calentamiento',               'warm-up',                   2),
  ('span_fc_sp3',  'span_ft_sports', 'el estiramiento',                'stretching',                3),
  ('span_fc_sp4',  'span_ft_sports', 'el enfriamiento',                'cool-down',                 4),
  ('span_fc_sp5',  'span_ft_sports', 'estar en forma',                 'to be fit',                 5),
  ('span_fc_sp6',  'span_ft_sports', 'ponerse cachas',                 'to get muscly',             6),
  ('span_fc_sp7',  'span_ft_sports', 'marcar un gol',                  'to score a goal',           7),
  ('span_fc_sp8',  'span_ft_sports', 'batir un récord',                'to break a record',         8),
  ('span_fc_sp9',  'span_ft_sports', 'una lesión',                     'an injury',                 9),
  ('span_fc_sp10', 'span_ft_sports', 'el rendimiento',                 'performance',               10),
  ('span_fc_sp11', 'span_ft_sports', 'matricularse en un gimnasio',    'to sign up to the gym',     11),
  ('span_fc_sp12', 'span_ft_sports', 'deportes de equipo',             'team sports',               12),
  ('span_fc_sp13', 'span_ft_sports', 'deportes de alto riesgo',        'high-risk sports',          13),
  ('span_fc_sp14', 'span_ft_sports', 'una vida sedentaria',            'a sedentary life',          14),
  ('span_fc_sp15', 'span_ft_sports', 'el espíritu de rivalidad',       'rivalry spirit',            15),
  ('span_fc_sp16', 'span_ft_sports', 'el dopaje',                      'drug taking in sport',      16),
  ('span_fc_sp17', 'span_ft_sports', 'mantener la forma',              'to stay in shape',          17),
  ('span_fc_sp18', 'span_ft_sports', 'derrotar',                       'to defeat',                 18),
  ('span_fc_sp19', 'span_ft_sports', 'inscribir / fichar',             'to register / to sign',     19);

-- Topic: span_ft_surgery — Cosmetic Surgery Vocabulary (16 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_cs1',  'span_ft_surgery', 'la cirugía estética',            'cosmetic/plastic surgery',     1),
  ('span_fc_cs2',  'span_ft_surgery', 'el cirujano',                    'the surgeon',                  2),
  ('span_fc_cs3',  'span_ft_surgery', 'el quirófano',                   'the operating theatre',        3),
  ('span_fc_cs4',  'span_ft_surgery', 'la rinoplastia',                 'nose surgery (rhinoplasty)',   4),
  ('span_fc_cs5',  'span_ft_surgery', 'la liposucción',                 'liposuction',                  5),
  ('span_fc_cs6',  'span_ft_surgery', 'los implantes mamarios',         'breast implants',              6),
  ('span_fc_cs7',  'span_ft_surgery', 'aumento de pecho',               'breast augmentation',          7),
  ('span_fc_cs8',  'span_ft_surgery', 'las arrugas',                    'wrinkles',                     8),
  ('span_fc_cs9',  'span_ft_surgery', 'el rostro',                      'the face',                     9),
  ('span_fc_cs10', 'span_ft_surgery', 'el consentimiento paterno',      'parental consent',             10),
  ('span_fc_cs11', 'span_ft_surgery', 'someterse (a una operación)',    'to undergo (surgery)',          11),
  ('span_fc_cs12', 'span_ft_surgery', 'recurrir al bisturí',            'to resort to the scalpel/surgery', 12),
  ('span_fc_cs13', 'span_ft_surgery', 'la obsesión por la belleza',     'obsession with beauty',        13),
  ('span_fc_cs14', 'span_ft_surgery', 'las secuelas físicas',           'physical consequences',        14),
  ('span_fc_cs15', 'span_ft_surgery', 'siempre y cuando',               'as long as',                   15),
  ('span_fc_cs16', 'span_ft_surgery', 'retocarse',                      'to touch up (one''s appearance)', 16);

-- Topic: span_ft_health — Health & Lifestyle (10 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_h1',  'span_ft_health', 'el insomnio',                'insomnia',           1),
  ('span_fc_h2',  'span_ft_health', 'un sueño reparador',         'restorative sleep',  2),
  ('span_fc_h3',  'span_ft_health', 'la siesta',                  'afternoon nap',      3),
  ('span_fc_h4',  'span_ft_health', 'el estrés',                  'stress',             4),
  ('span_fc_h5',  'span_ft_health', 'las pastillas / píldoras',   'pills',              5),
  ('span_fc_h6',  'span_ft_health', 'las pautas',                 'guidelines',         6),
  ('span_fc_h7',  'span_ft_health', 'la cafeína',                 'caffeine',           7),
  ('span_fc_h8',  'span_ft_health', 'el bienestar',               'well-being',         8),
  ('span_fc_h9',  'span_ft_health', 'los hábitos alimenticios',   'eating habits',      9),
  ('span_fc_h10', 'span_ft_health', 'la anorexia / la bulimia',   'anorexia / bulimia', 10);

-- Topic: span_ft_gram_cnc — Grammar Subjunctive Forms (10 cards)
INSERT OR IGNORE INTO spanish_flashcards (id, topic_id, front, back, sort_order) VALUES
  ('span_fc_gs1',  'span_ft_gram_cnc', 'dar → dé, des, dé, demos, deis, den',                     'to give (subjunctive)',               1),
  ('span_fc_gs2',  'span_ft_gram_cnc', 'ir → vaya, vayas, vaya, vayamos, vayáis, vayan',          'to go (subjunctive)',                 2),
  ('span_fc_gs3',  'span_ft_gram_cnc', 'saber → sepa, sepas, sepa, sepamos, sepáis, sepan',       'to know (subjunctive)',               3),
  ('span_fc_gs4',  'span_ft_gram_cnc', 'haber → haya, hayas, haya, hayamos, hayáis, hayan',       'to have [aux] (subjunctive)',         4),
  ('span_fc_gs5',  'span_ft_gram_cnc', 'estar → esté, estés, esté, estemos, estéis, estén',       'to be [state] (subjunctive)',         5),
  ('span_fc_gs6',  'span_ft_gram_cnc', 'ser → sea, seas, sea, seamos, seáis, sean',               'to be [identity] (subjunctive)',      6),
  ('span_fc_gs7',  'span_ft_gram_cnc', 'Pret. Perf. Subj. = haya/hayas/... + participio',         'e.g. haya comido, hayas hecho',       7),
  ('span_fc_gs8',  'span_ft_gram_cnc', 'cuando + subjuntivo = future time',                        'Cuando llegue, cenaré.',              8),
  ('span_fc_gs9',  'span_ft_gram_cnc', 'es importante que + subjuntivo',                           'Es importante que comas bien.',       9),
  ('span_fc_gs10', 'span_ft_gram_cnc', 'recomiendo que + subjuntivo',                              'Recomiendo que hagas ejercicio.',     10);

-- ----------------------------------------------------------
-- 6. MCQ Questions
-- ----------------------------------------------------------

-- PDF 1 — Ingenio Humano (20 questions)
INSERT OR IGNORE INTO spanish_mcq_questions (id, question, options, correct_answer, explanation, category, difficulty, unit) VALUES
  ('span_mcq_ih1',
   '¿Qué significa navegar por internet?',
   '["To download files","To surf the web","To send emails","To upload photos"]',
   1,
   'Navegar por internet means to surf/browse the web.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih2',
   'La palabra contraseña se traduce como:',
   '["A username","A bank account","A password","A search engine"]',
   2,
   'Contraseña = password.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih3',
   '¿Qué es un internauta?',
   '["An astronaut","An internet user","A blogger","A hacker"]',
   1,
   'Un internauta = an internet user.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih4',
   'Estar enganchado significa:',
   '["To be angry","To be bored","To be hooked/addicted","To be connected"]',
   2,
   'Estar enganchado = to be hooked/addicted.',
   'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih5',
   '¿Qué son los países en vías de desarrollo?',
   '["Developed countries","Island nations","Developing countries","European countries"]',
   2,
   'Países en vías de desarrollo = developing countries.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih6',
   'Elige la forma correcta del imperfecto: ''Cuando yo (ser) _____ niño, no existía Internet.''',
   '["fui","era","soy","seré"]',
   1,
   'Ser in the imperfecto (yo) = era.',
   'Gramática', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih7',
   '¿Cuál es el imperfecto de ir (nosotros)?',
   '["fuimos","vamos","iremos","íbamos"]',
   3,
   'Ir in the imperfecto (nosotros) = íbamos.',
   'Gramática', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih8',
   'Completa: ''Antes la gente _____ (usar) teléfonos fijos.''',
   '["usaba","usó","usará","usa"]',
   0,
   'Imperfecto of usar (la gente) = usaba.',
   'Gramática', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih9',
   '¿Cuál es el futuro simple de tener (yo)?',
   '["tenía","tuve","tendré","tengo"]',
   2,
   'Futuro simple of tener (yo) = tendré (irregular stem).',
   'Gramática', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih10',
   '''En el futuro, los robots _____ (poder) hacer tareas domésticas.''',
   '["pudieron","pueden","podían","podrán"]',
   3,
   'Futuro simple of poder = podrán (irregular stem).',
   'Gramática', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih11',
   'Según el texto sobre tecnología y globalización, ¿qué proporciona la fibra óptica?',
   '["Cheaper internet","Ultrasonic speed","Better security","More storage"]',
   1,
   'Fibre optic provides ultrasonic/ultra-fast speed.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih12',
   'En Bolivia, el acceso a Internet es:',
   '["gratuito","el más rápido de Latinoamérica","más costoso que en otros países latinoamericanos","igual que en Europa"]',
   2,
   'In Bolivia, internet access is more expensive than in other Latin American countries.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih13',
   'Según los expertos, ¿qué neurotransmisor se libera al recibir un ''Me gusta''?',
   '["Serotonina","Cortisol","Adrenalina","Dopamina"]',
   3,
   'Dopamine is released when receiving a ''Like'' on social media.',
   'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih14',
   'Los nativos digitales tienen mayor dificultad para:',
   '["hacer varias tareas a la vez","buscar información rápidamente","distinguir fuentes fiables de las que no lo son","usar redes sociales"]',
   2,
   'Digital natives have more difficulty distinguishing reliable sources from unreliable ones.',
   'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih15',
   '¿Qué proyecto creó el primer sistema no humano capaz de componer música clásica?',
   '["E-David","Proyecto Iamus","Wow Room","Fundación Telefónica"]',
   1,
   'Proyecto Iamus created the first non-human system capable of composing classical music.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih16',
   'Acoso cibernético en inglés es:',
   '["Online dating","Cyberbullying","Identity theft","Fake news"]',
   1,
   'Acoso cibernético = cyberbullying.',
   'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih17',
   '¿Qué tipo de texto es un discurso?',
   '["A letter","A blog post","A speech","An article"]',
   2,
   'Un discurso = a speech.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih18',
   'Una desventaja de las tabletas en el aula es que:',
   '["son muy ligeras","mejoran la memoria visual","no favorecen la práctica de la escritura","permiten clases interactivas"]',
   2,
   'A disadvantage of tablets in the classroom is that they do not favour writing practice.',
   'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih19',
   '¿Qué significa entretenido?',
   '["Boring","Expensive","Violent","Entertaining"]',
   3,
   'Entretenido = entertaining.',
   'Videojuegos', 'medium', 'Ingenio Humano'),

  ('span_mcq_ih20',
   'La expresión ''Hace tres años que juego videojuegos'' significa:',
   '["I played video games three years ago","I have been playing video games for three years","I will play video games in three years","I used to play video games three years ago"]',
   1,
   'Hace + time + que + present = I have been doing something for [time].',
   'Videojuegos', 'medium', 'Ingenio Humano');

-- PDF 2 — ¿Cómo nos cuidamos? (30 questions)
INSERT OR IGNORE INTO spanish_mcq_questions (id, question, options, correct_answer, explanation, category, difficulty, unit) VALUES
  ('span_mcq_cnc1',
   '¿Cuál es el ''producto estrella'' de la Dieta Mediterránea?',
   '["La mantequilla","El aceite de oliva","La carne roja","Los cereales"]',
   1,
   'The Mediterranean Diet is centred on olive oil as its star product.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc2',
   '¿Qué tipo de alimentos son fuentes altas de antioxidantes?',
   '["La carne roja y los lácteos","Las frutas y las verduras","Los dulces y la bollería","El pan integral y los cereales"]',
   1,
   'Fruits and vegetables are high sources of antioxidants.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc3',
   '¿Qué significa ''adelgazar''?',
   '["To gain weight","To eat quickly","To lose weight","To cook"]',
   2,
   'Adelgazar = to lose weight / perder peso.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc4',
   '¿Cuántas veces al mes se debe consumir carne roja según la Dieta Mediterránea?',
   '["Todos los días","Dos veces por semana","Dos veces al mes","Nunca"]',
   2,
   'Red meat should be limited to approximately twice a month.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc5',
   '¿Qué tendencia alimentaria consiste en no consumir ningún alimento cocinado a más de 42 grados?',
   '["El veganismo","La dieta paleolítica","El crudivorismo","El clean eating"]',
   2,
   'Crudivorismo (raw foodism) means not consuming any food heated above 42°C.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc6',
   '¿Qué palabra significa ''harmful'' en español?',
   '["Beneficioso","Nutritivo","Saludable","Perjudicial"]',
   3,
   'Perjudicial = harmful / damaging.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc7',
   'La práctica de ''tapear'' se diferencia del fast food porque...',
   '["es más barata","provoca la conversación y fomenta la amistad","se hace solo en casa","usa ingredientes importados"]',
   1,
   'Tapear promotes conversation, friendship and social life, unlike fast food.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc8',
   'Las arepas colombianas se preparan con...',
   '["harina de trigo","masa de maíz","arroz integral","patata"]',
   1,
   'Arepas are made from corn (maíz) dough.',
   'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc9',
   '¿Cuánto tiempo debe durar la siesta ideal?',
   '["Entre 1 y 2 horas","Entre 10 y 20 minutos","Entre 30 minutos y 1 hora","5 minutos exactos"]',
   1,
   'The ideal nap lasts between 10 and 20 minutes.',
   'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc10',
   '¿De dónde viene la palabra ''siesta''?',
   '["De una costumbre romana de descansar a la sexta hora","De una palabra árabe","De la cultura maya","Del italiano ''sesto''"]',
   0,
   'The word ''siesta'' comes from a Roman custom of resting at the sixth hour.',
   'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc11',
   '¿Qué tipo de insomnio dura unas semanas y está causado por estrés?',
   '["Crónico","Permanente","Ocasional","Genético"]',
   2,
   'Occasional insomnia lasts a few weeks and is caused by stressful situations.',
   'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc12',
   '¿Por qué tienen las mujeres más probabilidades de sufrir insomnio?',
   '["Porque duermen menos horas","Por el ciclo menstrual, embarazo y menopausia","Porque trabajan más","Porque toman más café"]',
   1,
   'Menstrual cycle, pregnancy and menopause are key factors.',
   'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc13',
   '¿Qué efecto negativo pueden tener las pastillas para dormir?',
   '["Curan el insomnio permanentemente","Pueden producir insomnio ''de rebote''","No tienen ningún efecto","Mejoran la concentración"]',
   1,
   'Sleeping pills can cause ''rebound insomnia'' when the person stops taking them.',
   'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc14',
   'Según el estudio del profesor Timmons, ¿cuánto ejercicio intenso es suficiente?',
   '["Una hora diaria","Tres minutos cada dos días","30 minutos semanales","Dos horas al día"]',
   1,
   'The study found 3 minutes of intense exercise every 2 days can be sufficient.',
   'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc15',
   '¿Qué significa ''estar en forma''?',
   '["To be fashionable","To be fit","To be tired","To be hungry"]',
   1,
   'Estar en forma = to be fit / in good shape.',
   'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc16',
   '¿Qué deporte practica Erick Fornaris?',
   '["Natación sincronizada","Saltos sincronizados de trampolín y plataforma","Waterpolo","Buceo"]',
   1,
   'Fornaris competes in synchronized diving from springboard and platform.',
   'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc17',
   '¿Qué significa ''una vida sedentaria''?',
   '["An active lifestyle","A healthy lifestyle","An inactive/sedentary lifestyle","A social lifestyle"]',
   2,
   'Sedentaria = sedentary, inactive, lacking physical activity.',
   'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc18',
   '¿Qué opina Carmela sobre los gimnasios?',
   '["Son el mejor lugar para hacer ejercicio","Son para egocéntricos; prefiere deportes al aire libre","Son baratos y accesibles","Son necesarios para todos"]',
   1,
   'Carmela thinks gyms are for self-centred people and prefers outdoor sports.',
   'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc19',
   '¿Qué país ocupa el sexto lugar en el ranking mundial de cirugía estética?',
   '["España","Colombia","Venezuela","Argentina"]',
   2,
   'Venezuela occupies sixth place in the world ranking of cosmetic surgery.',
   'Cirugía estética', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc20',
   '¿A qué edad se operó Aitana de otoplastia?',
   '["8 años","13 años","14 años","18 años"]',
   1,
   'Aitana had ear correction surgery (otoplastia) at 13 years old.',
   'Cirugía estética', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc21',
   '¿Qué verbo modal significa ''to usually''?',
   '["Deber","Poder","Saber","Soler"]',
   3,
   'Soler = to usually do something (suelo ir = I usually go).',
   'Cirugía estética', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc22',
   '¿Qué porcentaje de los españoles se ha operado de estética?',
   '["Más del 5%","Más del 11%","Más del 25%","Más del 40%"]',
   1,
   'More than 11% of Spaniards have had cosmetic surgery.',
   'Cirugía estética', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc23',
   '¿Por qué recurrió Eugenia a la liposucción?',
   '["Por moda","Como último recurso antes de caer en una anorexia","Porque era gratis","Porque su médico lo recomendó"]',
   1,
   'Eugenia used liposuction as a last resort before doing ''anything crazy'' or developing anorexia.',
   'Cirugía estética', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc24',
   '¿Cuál es la forma correcta del subjuntivo de ''tomar'' (tú)?',
   '["tomas","tomes","toma","tomé"]',
   1,
   'For -ar verbs, subjunctive tú form ends in -es: tomes.',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc25',
   '¿Cuál es la forma del subjuntivo de ''ir'' (nosotros)?',
   '["vamos","iremos","vayamos","fuimos"]',
   2,
   'Ir is irregular: vaya, vayas, vaya, vayamos, vayáis, vayan.',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc26',
   '''Es importante que los estudiantes _____ bien.'' (descansar)',
   '["descansan","descansen","descansaron","descansar"]',
   1,
   'After ''es importante que'' we use subjunctive: descansen.',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc27',
   '¿Cuál es el Pretérito Perfecto del Subjuntivo de ''comer'' (yo)?',
   '["haya comido","he comido","había comido","hubiera comido"]',
   0,
   'Pretérito Perfecto del Subjuntivo = haya + past participle: haya comido.',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc28',
   '''Cuando _____ a casa, cenaré.'' (llegar, yo) — future time reference',
   '["llego","llegué","llegue","llegaré"]',
   2,
   'When referring to future events, ''cuando'' takes the subjunctive: cuando llegue.',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc29',
   '¿Cuál es el condicional de ''deber'' (nosotros)?',
   '["debemos","debimos","deberíamos","debíamos"]',
   2,
   'Conditional of deber (nosotros) = deberíamos (we should/ought to).',
   'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_mcq_cnc30',
   '''Me alegra que tú _____ más frutas.'' (comer) — Pret. Perf. Subj.',
   '["comes","hayas comido","has comido","comieras"]',
   1,
   'After ''me alegra que'' + past action = Pret. Perfecto del Subjuntivo: hayas comido.',
   'Gramática', 'medium', 'Cómo nos cuidamos');

-- ----------------------------------------------------------
-- 7. Written Questions
-- ----------------------------------------------------------

-- PDF 1 — Ingenio Humano (8 questions)
INSERT OR IGNORE INTO spanish_written_questions (id, question, mark_scheme, marks, type, category, difficulty, unit) VALUES
  ('span_wq_ih1',
   'Describe cómo han cambiado tres aparatos tecnológicos en los últimos 25 años. Usa el imperfecto para describir cómo eran antes y el presente para describir cómo son ahora. (6 marks: 2 per device)',
   'Award 2 marks per device (max 3 devices): 1 mark for a correct imperfect sentence describing the past + 1 mark for a correct present-tense contrast. Example answer (el teléfono): ''Antes, los teléfonos eran grandes y pesados; sólo servían para llamar. Ahora, los teléfonos inteligentes son pequeños y tienen acceso a internet.'' Accept references to: size/aspecto, price/precio, functionality/uso. Accept connectors (sin embargo, en cambio, ahora…).',
   6, 'short_answer', 'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_wq_ih2',
   'Lee el texto ''Las nuevas tecnologías nos cambian'' y responde: ¿Cuáles son las áreas de la vida más afectadas por las nuevas tecnologías? ¿Qué desventaja tiene Bolivia con el acceso a Internet? (4 marks)',
   'Area: el terreno laboral, el económico, social y personal (2 marks — at least 2 areas required for full marks). Bolivia: el acceso a Internet es más costoso que en cualquier otro país latinoamericano (2 marks — must mention cost/expense).',
   4, 'short_answer', 'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_wq_ih3',
   'Escribe un discurso de aproximadamente 250 palabras sobre: ''¿Es siempre positivo y útil la tecnología en el aula?'' Incluye ventajas, desventajas y tu opinión personal. (12 marks)',
   'Content (4 marks): Clear thesis; at least 2 advantages (e.g. clases interactivas, acceso a información, aprendizaje personalizado); at least 2 disadvantages (e.g. distracción, adicción, falta de escritura); personal opinion with justification. Language (4 marks): Range of tenses (present, imperfect for antes, future for predictions); connectors (sin embargo, además, no obstante, por otra parte); opinion phrases (en mi opinión, creo que…); vocabulary from the unit. Format (2 marks): Appropriate speech register (saludo: ''Buenos días compañeros y profesores…'', cierre); ~250 words. Accuracy (2 marks): Spelling, accents, verb conjugation accuracy.',
   12, 'extended', 'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_wq_ih4',
   'Haz cinco predicciones sobre la tecnología en el futuro usando el futuro simple. (5 marks)',
   '1 mark per correct prediction using futuro simple. Must use a different verb each time. Examples: ''Los robots reemplazarán a los trabajadores.'' / ''Los coches serán autónomos.'' / ''Los estudiantes no necesitarán libros de texto.'' Deduct if present tense or ir + a + infinitive used instead of futuro simple.',
   5, 'short_answer', 'Tecnología y vida', 'medium', 'Ingenio Humano'),

  ('span_wq_ih5',
   'Escribe un mínimo de 50 palabras sobre las ventajas y desventajas de las redes sociales. Debes usar conectores. (6 marks)',
   'Content (3 marks): At least 2 ventajas (comunicación, entretenimiento, información, contacto) + at least 2 desventajas (adicción, privacidad, infoxicación, acoso). Language (2 marks): Uses connectors (no sólo… sino que también, además, sin embargo, por otra parte, aunque). Uses relevant vocabulary from the unit. Length (1 mark): Minimum 50 words met.',
   6, 'short_answer', 'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_wq_ih6',
   'Según el texto ''¿Ha cambiado nuestro cerebro con las redes sociales?'': (a) ¿Qué efectos positivos tienen las redes sociales en el cerebro? (b) ¿Qué tres neurotransmisores se ven afectados y qué efecto tiene cada uno? (8 marks)',
   '(a) 2 marks: crear nuevas redes neuronales; los nativos digitales pueden hacer varias tareas a la vez y buscar información más rápidamente. (b) 6 marks (2 per neurotransmitter): Dopamina — se libera con un ''Me gusta'', activa centros de recompensa, sensación de felicidad. Serotonina — puede modificar comportamientos sociales, carácter más cerrado, prioridad de intereses individuales. Cortisol — altos niveles pueden afectar la fidelidad hacia las amistades.',
   8, 'short_answer', 'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_wq_ih7',
   'Escribe un texto de 250–400 palabras: ''El mundo del ocio de los jóvenes hispanohablantes es cada vez más solitario debido al uso de las redes sociales.'' Elige formato: blog, carta formal o correo electrónico. (15 marks)',
   'Content (5 marks): Addresses the prompt directly; discusses how social media leads to isolation; gives counterarguments (staying connected, information access); includes specific examples; clear conclusion. Language (5 marks): Range of tenses (present, past, conditional/future); connectors and opinion phrases; topic-specific vocabulary; varied sentence structures. Format (3 marks): Correct format features for chosen text type (blog: title + informal tone + sign-off; carta formal: greeting + usted register + despedida; correo: subject + appropriate register). Accuracy (2 marks): Spelling, accents, gender/number agreement, conjugation accuracy.',
   15, 'extended', 'Redes sociales', 'medium', 'Ingenio Humano'),

  ('span_wq_ih8',
   'Tu familia dice que pasas demasiado tiempo con los videojuegos. Escribe un texto (250–400 palabras) en un blog o diario explicando cómo te sientes y cómo los videojuegos te han ayudado en lo personal, social y académico. (15 marks)',
   'Content (5 marks): Expresses feelings about family''s attitude; explains personal benefits (e.g. estrategia, relajación); social benefits (e.g. interactuar con amigos, trabajo en equipo); academic benefits (e.g. aprender inglés, mejorar coordinación, juegos educativos). Language (5 marks): Past tenses for experiences; present tense for current habits; emotional vocabulary; connectors; expressions with ''hacer'' (hace 3 años que juego…). Format (3 marks): Blog/diary features (date, personal tone, informal register, first person). Accuracy (2 marks): Spelling, verb forms, gender/number agreement.',
   15, 'extended', 'Videojuegos', 'medium', 'Ingenio Humano');

-- PDF 2 — ¿Cómo nos cuidamos? (11 questions)
INSERT OR IGNORE INTO spanish_written_questions (id, question, mark_scheme, marks, type, category, difficulty, unit) VALUES
  ('span_wq_cnc1',
   'Completa las frases con palabras del cuadro: El consumo de _____ y _____ es muy importante si queremos estar _____ y reducir el _____ de _____. (Cuadro: frutas, verduras, sanos, riesgo, cardiopatías, engordan, perjudiciales, con moderación, alto contenido en grasas, problemas de peso, dieta equilibrada) (5 marks)',
   'frutas / verduras / sanos / riesgo / cardiopatías. 1 mark per correct word, 5 marks total. Accept any grammatically correct logical completion using the word bank.',
   5, 'short_answer', 'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc2',
   'Conjuga el verbo en Presente de Subjuntivo: (a) Es importante que _____ (tomar, tú) un desayuno nutritivo. (b) El doctor recomienda que _____ (hacer, nosotros) Educación Física. (c) Mis padres desean que _____ (ir, yo) al gimnasio. (3 marks)',
   '(a) tomes [1 mark] — regular -ar subjunctive, tú form. (b) hagamos [1 mark] — irregular yo form ''hago'' → hag- + -amos. (c) vaya [1 mark] — ir is fully irregular in the subjunctive.',
   3, 'short_answer', 'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc3',
   'Conjuga en Pretérito Perfecto Compuesto del Subjuntivo: (a) Me alegra que tú _____ (comer) más frutas. (b) No creo que nosotros _____ (descansar) lo suficiente. (c) Es probable que el médico te _____ (recomendar) cambiar tus hábitos. (3 marks)',
   '(a) hayas comido [1 mark]. (b) hayamos descansado [1 mark]. (c) haya recomendado [1 mark].',
   3, 'short_answer', 'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc4',
   'Traduce al español: (a) I doubt that they have exercised enough this week. (b) It''s good that you (plural) have eaten more vegetables. (c) I hope that I have eaten healthy during the holidays. (6 marks)',
   '(a) Dudo que (ellos) hayan hecho suficiente ejercicio esta semana. [2 marks: 1 for correct subjunctive, 1 for rest]. (b) Es bueno que (vosotros) hayáis comido más verduras. [2 marks]. (c) Espero que (yo) haya comido sano/saludable durante las vacaciones. [2 marks].',
   6, 'short_answer', 'Gramática', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc5',
   'En el texto ''De tapas por Sevilla'': (a) ¿A qué se refiere ''las mismas'' en ''el poco valor económico de las mismas''? (b) ¿Qué palabra del párrafo 3 significa ''equivocaciones''? (c) Completa: Sevilla tiene [X] restaurantes para visitar y [32] sus ''tapas''. Clasificamos los [33] según sus especialidades y su [34] en los distintos barrios. (7 marks)',
   '(a) ''las mismas'' = las tapas [1 mark]. (b) confusiones [1 mark]. (c) [X] excelentes, [32] probar, [33] restaurantes, [34] ubicación [1 mark each, 4 total]. 7 marks total.',
   7, 'short_answer', 'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc6',
   'Texto ''¡Quiero dormir!'' — Relaciona cada pregunta con su párrafo: [22] ___ [23] ___ [24] ___ [25] ___ Options: A-¿Qué puedo hacer? B-¿Qué pastillas? C-¿Hay varias clases? D-¿En qué consiste? E-¿El alcohol ayuda? F-¿Cuántas horas? G-¿Se puede curar? H-¿Igual hombres y mujeres? I-¿Qué es insomnio de rebote? (4 marks)',
   '[22] C — types of insomnia are described. [23] H — discusses gender differences. [24] G — discusses whether it can be cured. [25] A — gives practical advice/tips. 1 mark each, 4 marks total.',
   4, 'short_answer', 'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc7',
   'La OMS aconseja el consumo moderado de carnes rojas. Escribe un texto (250–400 palabras) para alertar a tus compañeros sobre los peligros de comer carnes rojas con mucha frecuencia. Formato: carta formal, diario o discurso. Requisitos: variedad de tiempos verbales, presente de subjuntivo, pretérito perfecto compuesto del subjuntivo, vocabulario de la unidad. (18 marks)',
   'Criterion A – Language (max 6): Use of complex grammar including subjunctive (present + compound perfect), modal verbs, past tenses, conditional. Rich vocabulary from the unit (colesterol, cardiopatías, perjudicial, dieta equilibrada, etc.). Accuracy of grammar and spelling. Criterion B – Message (max 6): Clear personal opinions with justifications. Reference to health data/consequences of red meat. Comparison or cultural awareness (e.g. Mediterranean diet). Persuasive tone appropriate to the chosen format. Criterion C – Format (max 6): Correct structure for chosen text type (e.g. carta formal = saludo, cuerpo, despedida). Paragraphing. Connectives throughout (sin embargo, además, por consiguiente, en conclusión). Clear introduction and conclusion.',
   18, 'extended', 'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc8',
   'Has ido a un restaurante famoso por platos hispanos. Escribe un texto (250–400 palabras) contando tu experiencia. Formato: blog, artículo o correo electrónico. Requisitos: variedad de tiempos, subjuntivo, vocabulario de la unidad. (18 marks)',
   'Criterion A – Language (max 6): Past tenses for narration (pretérito/imperfecto), subjunctive in opinions (''Me alegró que la comida haya sido…''), food vocabulary (plato principal, postre, tapas, aceite de oliva, etc.). Criterion B – Message (max 6): Describes the experience vividly. Mentions specific Hispanic dishes. Gives personal evaluation. Recommends or critiques. Criterion C – Format (max 6): Blog = title, date, author, intro, body, conclusion, invitation to comment. Article = headline, byline, structured paragraphs. Email = saludo, cuerpo, despedida.',
   18, 'extended', 'Dieta y nutrición', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc9',
   'Escribe un texto (250–400 palabras) donde expreses tu opinión sobre el tema: Los beneficios de echar la siesta, ¿sí o no? Formato: artículo, carta informal o carta formal. (18 marks)',
   'Criterion A – Language (max 6): Subjunctive (''Es posible que la siesta sea…''), modal verbs (''Se debería descansar…''), varied tenses. Health vocabulary (relajar, concentración, cerebro, estrés). Criterion B – Message (max 6): Arguments for and against. Cultural context (siesta in Hispanic countries, Roman origins). Personal opinion with justification. Reference to medical/scientific views. Criterion C – Format (max 6): Appropriate text type structure. Connectives. Clear paragraphing.',
   18, 'extended', 'Vida sana e insomnio', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc10',
   'Un deportista hispanohablante visita UWCSEA. Como representante del colegio, escribe una entrevista (250–400 palabras) para la revista escolar. (18 marks)',
   'Criterion A – Language (max 6): Interview format with P:/– markers. Sports vocabulary (entrenamiento, lesión, rendimiento, estar en forma). Varied question types (open, closed, opinion). Subjunctive in hypothetical questions (''Si pudiera…''). Criterion B – Message (max 6): Introduction of the athlete. Questions covering: career, training, diet, motivation, advice for students. Athlete''s responses show personality. Connection to health theme. Criterion C – Format (max 6): Correct interview structure: title, introduction (brief bio), Q&A format, conclusion/closing comment. Professional tone.',
   18, 'extended', 'Deporte y ejercicio', 'medium', 'Cómo nos cuidamos'),

  ('span_wq_cnc11',
   'Traduce al español: (a) I must start exercising if I want to lose weight. (b) She will have to pass a medical examination next week. (c) We should sleep at least 8 hours a day. (d) I could not get a medal because I was injured. (e) We could go to Spain in the summer to do hiking. (10 marks)',
   '(a) Debo empezar a hacer ejercicio si quiero adelgazar/perder peso. [2 marks]. (b) Ella deberá pasar un examen médico la próxima semana. [2 marks]. (c) Deberíamos dormir al menos 8 horas al día para tener suficiente energía. [2 marks]. (d) No pude conseguir una medalla porque estaba lesionado/a. [2 marks: pude = preterite, estaba = imperfect]. (e) Podríamos ir a España en verano para hacer montañismo/senderismo. [2 marks: podríamos = conditional].',
   10, 'short_answer', 'Cirugía estética', 'medium', 'Cómo nos cuidamos');
