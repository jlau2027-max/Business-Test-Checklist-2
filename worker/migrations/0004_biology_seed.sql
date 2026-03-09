-- ============================================================
-- Biology Content Seed Data — Unit 3 & Unit 4
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO biology_category_colors (category, color) VALUES
  ('A2.1 Origins of Cells', '#7C3AED'),
  ('A2.2 Cell Structure', '#2563EB'),
  ('B2.2 Organelles', '#0891B2'),
  ('B2.1 Membranes', '#059669'),
  ('D2.3 Water Potential', '#0D9488'),
  ('B2.3 Cell Specialization', '#DC2626'),
  ('C4.2 Energy & Matter', '#D97706'),
  ('C1.3 Photosynthesis', '#16A34A'),
  ('C1.2 Cell Respiration', '#E11D48');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────

-- Unit 3 sections
INSERT OR IGNORE INTO biology_checklist_sections (id, title, color, sort_order) VALUES
  ('a2-1-origins', 'A2.1 — Origins of Cells (AHL)', '#7C3AED', 1),
  ('a2-2-cell-structure', 'A2.2 — Cell Structure', '#2563EB', 2),
  ('b2-2-organelles', 'B2.2 — Organelles & Compartmentalization', '#0891B2', 3),
  ('b2-1-membranes', 'B2.1 — Membranes & Membrane Transport', '#059669', 4),
  ('d2-3-water-potential', 'D2.3 — Water Potential', '#0D9488', 5),
  ('b2-3-specialization', 'B2.3 — Cell Specialization', '#DC2626', 6);

-- Unit 4 sections
INSERT OR IGNORE INTO biology_checklist_sections (id, title, color, sort_order) VALUES
  ('c4-2-energy-matter', 'C4.2 — Transfers of Energy & Matter', '#D97706', 7),
  ('c1-3-photosynthesis', 'C1.3 — Photosynthesis', '#16A34A', 8),
  ('c1-2-respiration', 'C1.2 — Cell Respiration', '#E11D48', 9);


-- ─── CHECKLIST ITEMS ─────────────────────────────────────────
-- Clear existing items to prevent duplicates (autoincrement table)
DELETE FROM biology_checklist_items;

-- A2.1 Origins of Cells
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('a2-1-origins', 'Describe conditions on early Earth: lack of free O₂/ozone, high CO₂/CH₄, high UV, higher temperatures', 1),
  ('a2-1-origins', 'Explain why early conditions allowed spontaneous formation of carbon compounds', 2),
  ('a2-1-origins', 'Define self-sustaining life and distinguish living from non-living (e.g. viruses are non-living)', 3),
  ('a2-1-origins', 'Explain the challenge of spontaneous origin of cells: cells are complex, only from pre-existing cells', 4),
  ('a2-1-origins', 'State that catalysis, self-replication, self-assembly, and compartmentalization were needed for first cells', 5),
  ('a2-1-origins', 'Describe the Miller-Urey experiment and evaluate its evidence for origin of carbon compounds', 6),
  ('a2-1-origins', 'Explain spontaneous vesicle formation by fatty acids coalescing into spherical bilayers', 7),
  ('a2-1-origins', 'Explain why RNA is presumed to have been the first genetic material (ribozymes, self-replication)', 8),
  ('a2-1-origins', 'Describe evidence for LUCA: universal genetic code and shared genes', 9),
  ('a2-1-origins', 'Outline approaches to estimate dates of first living cells (fossil record, molecular clocks)', 10),
  ('a2-1-origins', 'State evidence for LUCA near hydrothermal vents: fossilized precipitates, conserved genomic sequences', 11);

-- A2.2 Cell Structure
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('a2-2-cell-structure', 'State the three tenets of cell theory', 1),
  ('a2-2-cell-structure', 'Perform microscopy calculations: magnification = image size / actual size', 2),
  ('a2-2-cell-structure', 'Convert between mm, µm, nm and relate to cell and organelle sizes', 3),
  ('a2-2-cell-structure', 'Compare resolution of unaided eye (0.1 mm), light microscope (0.2 µm), electron microscope (1 nm)', 4),
  ('a2-2-cell-structure', 'Describe structures common to all cells: plasma membrane, cytoplasm, DNA', 5),
  ('a2-2-cell-structure', 'Draw and label a prokaryotic cell: nucleoid, ribosomes, cell wall, plasma membrane, flagella, fimbriae', 6),
  ('a2-2-cell-structure', 'Describe eukaryote-distinguishing features: nucleus, 80S ribosomes, mitochondria', 7),
  ('a2-2-cell-structure', 'List the seven processes of life using MRS HENG', 8),
  ('a2-2-cell-structure', 'Compare cell structures between animal, fungal, and plant cells', 9),
  ('a2-2-cell-structure', 'Explain atypical cell structures: red blood cells (no nucleus), skeletal muscle (multinucleate)', 10),
  ('a2-2-cell-structure', 'Identify prokaryotic vs. eukaryotic cells in light and electron micrographs', 11),
  ('a2-2-cell-structure', '[AHL] Explain endosymbiotic theory for origin of eukaryotes', 12),
  ('a2-2-cell-structure', '[AHL] Define cell differentiation and link to gene expression', 13),
  ('a2-2-cell-structure', '[AHL] Outline advantages of multicellularity: specialization, larger size, longer lifespan', 14);

-- B2.2 Organelles
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('b2-2-organelles', 'Define organelle; classify by membrane type (none, single, double)', 1),
  ('b2-2-organelles', 'Explain advantage of nucleus/cytoplasm separation: gene regulation, transcription/translation uncoupled', 2),
  ('b2-2-organelles', 'State advantages of cytoplasmic compartmentalization: localize reactions, different pH, protective', 3),
  ('b2-2-organelles', '[AHL] Describe mitochondrion structure/function/adaptation: outer membrane, inner membrane, cristae, matrix', 4),
  ('b2-2-organelles', '[AHL] Describe chloroplast structure/function/adaptation: double membrane, thylakoids/grana, stroma', 5),
  ('b2-2-organelles', '[AHL] Explain functional benefits of the double nuclear membrane', 6),
  ('b2-2-organelles', '[AHL] Describe free ribosomes (cytoplasmic proteins) vs. RER-bound ribosomes (secretory proteins)', 7),
  ('b2-2-organelles', '[AHL] Describe Golgi apparatus: processes/modifies/packages proteins from RER', 8),
  ('b2-2-organelles', '[AHL] Describe vesicle structure and function in cells', 9);

-- B2.1 Membranes
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('b2-1-membranes', 'Explain how amphipathic phospholipids form bilayers spontaneously in water', 1),
  ('b2-1-membranes', 'Explain lipid bilayer as a barrier to large molecules, hydrophilic particles, ions, polar molecules', 2),
  ('b2-1-membranes', 'Describe simple diffusion of O₂ and CO₂ between phospholipids down concentration gradient', 3),
  ('b2-1-membranes', 'Distinguish integral proteins (embedded) from peripheral proteins (surface)', 4),
  ('b2-1-membranes', 'Define osmosis; explain role of aquaporins in facilitating water movement', 5),
  ('b2-1-membranes', 'Explain facilitated diffusion through channel proteins (selective, passive, down gradient)', 6),
  ('b2-1-membranes', 'Explain active transport via pump proteins using ATP, against concentration gradient', 7),
  ('b2-1-membranes', 'Describe selectivity in membrane permeability: size and hydrophobic/hydrophilic properties', 8),
  ('b2-1-membranes', 'Describe glycoproteins and glycolipids: location on extracellular side, role in cell adhesion and recognition', 9),
  ('b2-1-membranes', 'Draw and label the fluid mosaic model', 10),
  ('b2-1-membranes', '[AHL] Explain relationship between unsaturated/saturated fatty acids and membrane fluidity', 11),
  ('b2-1-membranes', '[AHL] Describe cholesterol as modulator of membrane fluidity in animal cells', 12),
  ('b2-1-membranes', '[AHL] Explain endocytosis and exocytosis; describe role of membrane fluidity in vesicle fusion', 13),
  ('b2-1-membranes', '[AHL] Describe gated ion channels: voltage-gated and neurotransmitter-gated', 14),
  ('b2-1-membranes', '[AHL] Describe Na⁺/K⁺ pump as exchange transporter; role in membrane potential', 15),
  ('b2-1-membranes', '[AHL] Explain Na⁺-dependent glucose cotransport (secondary active transport)', 16),
  ('b2-1-membranes', '[AHL] Describe cell adhesion molecules (CAMs) and their role in tissue formation', 17);

-- D2.3 Water Potential
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('d2-3-water-potential', 'Define solvation; describe how water dissolves ionic and hydrophilic substances', 1),
  ('d2-3-water-potential', 'State direction of water movement: from less concentrated to more concentrated solution', 2),
  ('d2-3-water-potential', 'Predict direction of osmosis into/out of cells based on external solution concentration', 3),
  ('d2-3-water-potential', 'Describe changes in plant tissue in hypotonic (turgid) and hypertonic (plasmolysed) solutions', 4),
  ('d2-3-water-potential', 'Explain effects of osmosis on animal cells: lysis in hypotonic, crenation in hypertonic', 5),
  ('d2-3-water-potential', 'Explain why plant cells do not burst in hypotonic solutions (cell wall provides back-pressure)', 6),
  ('d2-3-water-potential', 'Describe medical applications of isotonic solutions for organ preservation and IV fluids', 7),
  ('d2-3-water-potential', '[AHL] Define water potential (Ψ) as potential energy of water per unit volume; units = MPa', 8),
  ('d2-3-water-potential', '[AHL] State: water moves from higher Ψ to lower Ψ', 9),
  ('d2-3-water-potential', '[AHL] Use equation: Ψ = Ψs + Ψp (solute potential + pressure potential)', 10),
  ('d2-3-water-potential', '[AHL] Calculate and interpret water potential changes when plant cells gain/lose water', 11);

-- B2.3 Cell Specialization
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('b2-3-specialization', 'Describe how fertilized egg produces unspecialized cells that differentiate via gene expression', 1),
  ('b2-3-specialization', 'State properties of stem cells: undifferentiated, self-renewing, able to differentiate', 2),
  ('b2-3-specialization', 'Describe location and function of stem cell niches in adult humans', 3),
  ('b2-3-specialization', 'Distinguish totipotent, pluripotent, and multipotent stem cells by developmental potential', 4),
  ('b2-3-specialization', 'Explain how cell size relates to specialization and function', 5),
  ('b2-3-specialization', 'Calculate and interpret surface area-to-volume ratios and explain constraints on cell size', 6),
  ('b2-3-specialization', '[AHL] Describe adaptations to increase SA:Vol ratio (microvilli, flattened shape, elongation)', 7),
  ('b2-3-specialization', '[AHL] Compare type I and type II pneumocytes: gas exchange vs. surfactant secretion', 8),
  ('b2-3-specialization', '[AHL] Describe adaptations of cardiac muscle cells and striated muscle fibres', 9),
  ('b2-3-specialization', '[AHL] Describe adaptations of sperm and egg cells', 10);

-- C4.2 Transfers of Energy & Matter
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('c4-2-energy-matter', 'C4.2.1 — Describe ecosystems as open systems where both energy and matter can enter and exit', 1),
  ('c4-2-energy-matter', 'C4.2.2 — Explain why sunlight is the principal source of energy for most ecosystems', 2),
  ('c4-2-energy-matter', 'C4.2.7 — Distinguish between photoautotrophs and chemoautotrophs', 3),
  ('c4-2-energy-matter', 'C4.2.6 — Define autotrophs as organisms using external energy to synthesise carbon compounds', 4),
  ('c4-2-energy-matter', 'C4.2.8 — Define heterotrophs as organisms obtaining carbon compounds from other organisms', 5),
  ('c4-2-energy-matter', 'C4.2.3 — Describe the flow of chemical energy through food chains', 6),
  ('c4-2-energy-matter', 'C4.2.4 — Construct and label food chains and food webs', 7),
  ('c4-2-energy-matter', 'C4.2.10 — Classify organisms into trophic levels (T1–T4)', 8),
  ('c4-2-energy-matter', 'C4.2.11 — Construct and interpret energy pyramids', 9),
  ('c4-2-energy-matter', 'C4.2.12 — Explain why energy availability decreases at each trophic level (~90% lost)', 10),
  ('c4-2-energy-matter', 'C4.2.13 — Explain heat loss to the environment via cell respiration', 11),
  ('c4-2-energy-matter', 'C4.2.14 — Explain restrictions on the number of trophic levels due to energy losses', 12),
  ('c4-2-energy-matter', 'C4.2.5 — Describe how decomposers receive energy from dead organic matter', 13),
  ('c4-2-energy-matter', 'C4.2.9 — Explain how autotrophs and heterotrophs release energy via oxidation in cell respiration', 14),
  ('c4-2-energy-matter', 'C4.2.22 — Explain how all chemical elements are recycled in ecosystems', 15),
  ('c4-2-energy-matter', 'C4.2.15 — Define primary production as accumulation of carbon compounds in autotroph biomass', 16),
  ('c4-2-energy-matter', 'C4.2.16 — Define secondary production as accumulation of carbon compounds in heterotroph biomass', 17),
  ('c4-2-energy-matter', 'C4.2.17 — Construct and label carbon cycle diagrams', 18),
  ('c4-2-energy-matter', 'C4.2.18 — Distinguish between carbon sinks and carbon sources in ecosystems', 19),
  ('c4-2-energy-matter', 'C4.2.19 — Explain CO₂ release during combustion of biomass, peat, coal, oil, and natural gas', 20),
  ('c4-2-energy-matter', 'C4.2.20 — Analyse the Keeling Curve in terms of photosynthesis, respiration, and combustion', 21),
  ('c4-2-energy-matter', 'C4.2.21 — Explain the interdependence of aerobic respiration and photosynthesis', 22);

-- C1.3 Photosynthesis
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('c1-3-photosynthesis', 'C1.3.1 — Explain transformation of light energy to chemical energy in photosynthesis', 1),
  ('c1-3-photosynthesis', 'C1.3.2 — Describe conversion of CO₂ to glucose using hydrogen from water splitting', 2),
  ('c1-3-photosynthesis', 'C1.3.3 — Identify O₂ as a by-product of photosynthesis', 3),
  ('c1-3-photosynthesis', 'C1.3.4 — Describe chromatography to separate photosynthetic pigments; calculate Rf values', 4),
  ('c1-3-photosynthesis', 'C1.3.5 — Describe absorption of specific wavelengths of light by photosynthetic pigments', 5),
  ('c1-3-photosynthesis', 'C1.3.6 — Compare and contrast absorption spectra and action spectra', 6),
  ('c1-3-photosynthesis', 'C1.3.7 — Describe techniques for investigating limiting factors: CO₂, light intensity, temperature', 7),
  ('c1-3-photosynthesis', 'C1.3.8 — Explain how FACE experiments predict future photosynthesis rates', 8),
  ('c1-3-photosynthesis', '[AHL] C1.3.9 — Describe photosystems as arrays of pigment molecules that generate excited electrons', 9),
  ('c1-3-photosynthesis', '[AHL] C1.3.10 — Explain advantages of multiple pigment types in a photosystem', 10),
  ('c1-3-photosynthesis', '[AHL] C1.3.11 — Describe photolysis of water in PSII and generation of O₂', 11),
  ('c1-3-photosynthesis', '[AHL] C1.3.12 — Explain ATP production by chemiosmosis in thylakoids', 12),
  ('c1-3-photosynthesis', '[AHL] C1.3.13 — Describe reduction of NADP by Photosystem I', 13),
  ('c1-3-photosynthesis', '[AHL] C1.3.14 — Describe thylakoids as the site of light-dependent reactions', 14),
  ('c1-3-photosynthesis', '[AHL] C1.3.15 — Explain carbon fixation by Rubisco (CO₂ + RuBP → 2 GP)', 15),
  ('c1-3-photosynthesis', '[AHL] C1.3.16 — Describe synthesis of triose phosphate using reduced NADP and ATP', 16),
  ('c1-3-photosynthesis', '[AHL] C1.3.17 — Explain regeneration of RuBP in the Calvin cycle using ATP', 17),
  ('c1-3-photosynthesis', '[AHL] C1.3.18 — Describe synthesis of carbohydrates, amino acids from Calvin cycle products', 18),
  ('c1-3-photosynthesis', '[AHL] C1.3.19 — Explain interdependence of light-dependent and light-independent reactions', 19),
  ('c1-3-photosynthesis', '[AHL] B2.2.5 — Describe adaptations of the chloroplast for photosynthesis', 20);

-- C1.2 Cell Respiration
INSERT OR IGNORE INTO biology_checklist_items (section_id, text, sort_order) VALUES
  ('c1-2-respiration', 'C1.2.1 — Describe ATP as the molecule that distributes energy within cells', 1),
  ('c1-2-respiration', 'C1.2.2 — List life processes supplied with energy by ATP', 2),
  ('c1-2-respiration', 'C1.2.3 — Explain energy transfers during interconversions between ATP and ADP', 3),
  ('c1-2-respiration', 'C1.2.4 — Describe cell respiration as a system for producing ATP from carbon compounds', 4),
  ('c1-2-respiration', 'C1.2.5 — Compare aerobic and anaerobic respiration in humans', 5),
  ('c1-2-respiration', 'C1.2.6 — Identify variables affecting the rate of cell respiration', 6),
  ('c1-2-respiration', '[AHL] C1.2.7 — Explain role of NAD as hydrogen carrier; describe oxidation by removal of hydrogen', 7),
  ('c1-2-respiration', '[AHL] C1.2.8 — Describe glycolysis: glucose → 2 pyruvate with net 2 ATP and 2 NADH', 8),
  ('c1-2-respiration', '[AHL] C1.2.9 — Explain conversion of pyruvate to lactate to regenerate NAD', 9),
  ('c1-2-respiration', '[AHL] C1.2.10 — Describe anaerobic respiration in yeast and its use in brewing/baking', 10),
  ('c1-2-respiration', '[AHL] C1.2.11 — Describe the link reaction: pyruvate → acetyl-CoA + CO₂ + NADH', 11),
  ('c1-2-respiration', '[AHL] C1.2.12 — Explain the Krebs cycle: oxidation and decarboxylation of acetyl groups', 12),
  ('c1-2-respiration', '[AHL] C1.2.13 — Explain transfer of energy by reduced NAD to the electron transport chain', 13),
  ('c1-2-respiration', '[AHL] C1.2.14 — Describe generation of proton gradient by electron flow along ETC', 14),
  ('c1-2-respiration', '[AHL] C1.2.15 — Explain chemiosmosis and ATP synthesis in the mitochondrion', 15),
  ('c1-2-respiration', '[AHL] C1.2.16 — Explain role of oxygen as terminal electron acceptor', 16),
  ('c1-2-respiration', '[AHL] C1.2.17 — Compare lipids and carbohydrates as respiratory substrates', 17),
  ('c1-2-respiration', '[AHL] B2.2.4 — Describe adaptations of the mitochondrion for ATP production', 18);


-- ─── FLASHCARD TOPICS ────────────────────────────────────────

-- Unit 3 topics
INSERT OR IGNORE INTO biology_flashcard_topics (id, label, color, sort_order) VALUES
  ('a2-1-origins-of-cells', 'A2.1 Origins of Cells', '#7C3AED', 1),
  ('a2-2-cell-structure', 'A2.2 Cell Structure', '#2563EB', 2),
  ('b2-2-organelles', 'B2.2 Organelles', '#0891B2', 3),
  ('b2-1-membranes', 'B2.1 Membranes & Transport', '#059669', 4),
  ('d2-3-water-potential', 'D2.3 Water Potential', '#0D9488', 5),
  ('b2-3-cell-specialization', 'B2.3 Cell Specialization', '#DC2626', 6);

-- Unit 4 topics
INSERT OR IGNORE INTO biology_flashcard_topics (id, label, color, sort_order) VALUES
  ('c4-2-energy-matter', 'C4.2 Energy & Matter', '#D97706', 7),
  ('c1-3-photosynthesis', 'C1.3 Photosynthesis', '#16A34A', 8),
  ('c1-2-cell-respiration', 'C1.2 Cell Respiration', '#E11D48', 9);


-- ─── FLASHCARDS ──────────────────────────────────────────────

-- A2.1 Origins of Cells
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('a2-1-origins-of-cells', 'What were the key atmospheric conditions on early Earth?', 'Lack of free O₂ and ozone; high concentrations of CO₂ and CH₄; higher temperatures; greater UV penetration.', 1),
  ('a2-1-origins-of-cells', 'Why does the absence of oxygen on early Earth matter?', 'Without O₂, there was no ozone layer, allowing UV to drive chemical reactions. Reducing conditions allowed organic molecules to accumulate without oxidation.', 2),
  ('a2-1-origins-of-cells', 'What did the Miller-Urey experiment demonstrate?', 'By simulating early Earth conditions (H₂, CH₄, NH₃, H₂O, electrical sparks), amino acids and other organic molecules were produced — evidence that carbon compounds could form abiotically.', 3),
  ('a2-1-origins-of-cells', 'What are the limitations of the Miller-Urey experiment?', 'The exact atmospheric composition is uncertain; the experiment did not produce RNA or complete cells; conditions cannot be fully replicated.', 4),
  ('a2-1-origins-of-cells', 'Why is RNA considered the first genetic molecule?', 'RNA can both store genetic information (like DNA) and catalyze reactions (ribozymes). This "RNA world" hypothesis requires only one molecule type.', 5),
  ('a2-1-origins-of-cells', 'What evidence supports a Last Universal Common Ancestor (LUCA)?', 'Universal genetic code shared by all life; conserved genes (e.g. ribosomal RNA) across all domains; molecular phylogenetics showing convergence.', 6),
  ('a2-1-origins-of-cells', 'How do vesicles form spontaneously?', 'Fatty acids are amphipathic. In water, they spontaneously coalesce into spherical bilayers (vesicles), creating a membrane-bound compartment.', 7),
  ('a2-1-origins-of-cells', 'Why do hydrothermal vents support LUCA evolution?', 'Deep-sea vents provide chemical energy gradients, mineral surfaces, warm water, and reducing conditions similar to early Earth — plus fossilized evidence of ancient vent precipitates.', 8);

-- A2.2 Cell Structure
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('a2-2-cell-structure', 'State the three tenets of cell theory.', '1. All living things are made of cells. 2. Cells are the basic unit of life. 3. All cells arise from pre-existing cells.', 1),
  ('a2-2-cell-structure', 'What is the formula for microscope magnification?', 'Magnification = Image size ÷ Actual size. All values must be in the same units. (M = I/A)', 2),
  ('a2-2-cell-structure', 'What are the three structures common to ALL cells?', '1. Plasma membrane. 2. Cytoplasm. 3. DNA (genetic material).', 3),
  ('a2-2-cell-structure', 'What are the unique features of prokaryotic cells?', 'No membrane-bound nucleus (nucleoid region); 70S ribosomes; cell wall (peptidoglycan); may have flagella, fimbriae; no membrane-bound organelles.', 4),
  ('a2-2-cell-structure', 'What three features distinguish eukaryotes from prokaryotes?', '1. Membrane-bound nucleus. 2. 80S ribosomes. 3. Mitochondria (and chloroplasts in plants).', 5),
  ('a2-2-cell-structure', 'What does MRS HENG stand for?', 'Metabolism, Reproduction, Sensitivity, Homeostasis, Excretion, Nutrition, Growth — the seven processes of life.', 6),
  ('a2-2-cell-structure', 'How do plant and animal cells differ structurally?', 'Plants: cell wall (cellulose), chloroplasts, large central vacuole, no centrioles. Animals: no cell wall, no chloroplasts, small/no vacuole, have centrioles.', 7),
  ('a2-2-cell-structure', 'What is an atypical eukaryotic cell? Give two examples.', 'Red blood cells: no nucleus (more room for haemoglobin). Skeletal muscle cells: multinucleate (syncytia) due to fusion of many cells.', 8),
  ('a2-2-cell-structure', '[AHL] What is endosymbiotic theory?', 'Mitochondria and chloroplasts evolved from free-living prokaryotes engulfed by a host cell. Evidence: double membrane, own circular DNA, 70S ribosomes, binary fission.', 9);

-- B2.2 Organelles
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('b2-2-organelles', 'Define organelle.', 'A discrete subunit within a cell (membrane-bound or not), adapted to perform a specific function.', 1),
  ('b2-2-organelles', 'Classify organelles by membrane type.', 'No membrane: ribosomes. Single membrane: lysosome, Golgi, vesicles, ER, vacuole. Double membrane: nucleus, mitochondria, chloroplasts.', 2),
  ('b2-2-organelles', 'Why is it advantageous to separate the nucleus from cytoplasm?', 'Allows gene regulation; mRNA can be processed before translation; protects DNA from cytoplasmic enzymes; transcription and translation are separated.', 3),
  ('b2-2-organelles', '[AHL] What are the adaptations of the mitochondrion?', 'Outer membrane: permeable to small molecules. Inner membrane (cristae): large SA for ETC. Matrix: Krebs cycle enzymes and own DNA. IMS: H⁺ accumulates.', 4),
  ('b2-2-organelles', '[AHL] What are the adaptations of the chloroplast?', 'Double membrane for compartmentalization. Thylakoids (grana): contain chlorophyll for light reactions. Stroma: RuBisCO and Calvin cycle enzymes.', 5),
  ('b2-2-organelles', '[AHL] Free vs. RER-bound ribosomes?', 'Free ribosomes produce proteins for use within the cytoplasm. RER-bound ribosomes produce proteins destined for secretion or membrane insertion.', 6),
  ('b2-2-organelles', '[AHL] What is the function of the Golgi apparatus?', 'Receives vesicles from RER; modifies, processes (glycosylation), sorts, and packages proteins into vesicles for secretion or delivery to lysosomes.', 7);

-- B2.1 Membranes & Transport
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('b2-1-membranes', 'Why do phospholipids spontaneously form bilayers?', 'Phospholipids are amphipathic: hydrophilic heads face outward (towards water); hydrophobic tails face inward. This minimizes free energy.', 1),
  ('b2-1-membranes', 'What is the fluid mosaic model?', 'The membrane is a dynamic (fluid) phospholipid bilayer with a mosaic of integral/peripheral proteins, cholesterol, glycoproteins, and glycolipids.', 2),
  ('b2-1-membranes', 'What can cross the membrane by simple diffusion?', 'Small non-polar molecules: O₂, CO₂, N₂. Small uncharged polar molecules (water slowly). Large polar molecules, ions, and glucose cannot.', 3),
  ('b2-1-membranes', 'Facilitated diffusion vs. active transport?', 'Facilitated diffusion: passive, channel proteins, down gradient, no ATP. Active transport: pump proteins, against gradient, requires ATP.', 4),
  ('b2-1-membranes', 'What is osmosis?', 'Passive movement of water across a semi-permeable membrane from lower solute concentration (higher water potential) to higher solute concentration (lower water potential).', 5),
  ('b2-1-membranes', 'What are aquaporins?', 'Integral channel proteins that span the membrane and allow rapid, facilitated movement of water molecules across the membrane.', 6),
  ('b2-1-membranes', 'What are glycoproteins and glycolipids?', 'Carbohydrate chains linked to proteins or lipids. Located on the extracellular surface. Functions: cell-cell recognition, signalling, adhesion (glycocalyx).', 7),
  ('b2-1-membranes', '[AHL] How does cholesterol affect membrane fluidity?', 'At high temps: reduces fluidity (prevents phospholipids separating). At low temps: prevents rigidity (disrupts packing). Overall: buffers fluidity changes.', 8),
  ('b2-1-membranes', '[AHL] How does fatty acid saturation affect fluidity?', 'Unsaturated: kinks from double bonds → cannot pack closely → more fluid. Saturated: pack tightly → less fluid, higher melting point.', 9),
  ('b2-1-membranes', '[AHL] How does the Na⁺/K⁺ pump work?', '3 Na⁺ bind inside; ATP phosphorylates pump → opens outward, releases 3 Na⁺. 2 K⁺ bind outside; phosphate released → opens inward, releases 2 K⁺. Net: 3 Na⁺ out, 2 K⁺ in per ATP.', 10),
  ('b2-1-membranes', '[AHL] What is secondary active transport?', 'Uses the Na⁺ gradient (from Na⁺/K⁺ pump) to drive transport of another molecule (e.g. glucose) into a cell via a cotransporter — no direct ATP used.', 11);

-- D2.3 Water Potential
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('d2-3-water-potential', 'Define water potential (Ψ).', '[AHL] Potential energy of water per unit volume relative to pure water. Units: MPa. Pure water has Ψ = 0; dissolved solutes make Ψ negative.', 1),
  ('d2-3-water-potential', 'What is the equation for water potential?', '[AHL] Ψ = Ψs + Ψp. Ψs = solute potential (always negative). Ψp = pressure potential (usually positive in turgid cells).', 2),
  ('d2-3-water-potential', 'What happens to a plant cell in a hypotonic solution?', 'Water enters by osmosis → cell swells → turgor pressure builds → cell becomes turgid. Cell wall prevents lysis.', 3),
  ('d2-3-water-potential', 'What happens to a plant cell in a hypertonic solution?', 'Water leaves by osmosis → cell shrinks → plasma membrane pulls away from cell wall (plasmolysis). Cell becomes flaccid then plasmolysed.', 4),
  ('d2-3-water-potential', 'Effect of osmosis on animal cells?', 'Hypotonic: water enters → swells → may lyse. Hypertonic: water leaves → shrinks (crenation). No cell wall to prevent extremes.', 5),
  ('d2-3-water-potential', 'Why are isotonic solutions used medically?', 'Same solute concentration as blood/cells prevents osmotic damage. Used for organ preservation, IV fluids, wound irrigation.', 6);

-- B2.3 Cell Specialization
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('b2-3-cell-specialization', 'What are stem cells?', 'Undifferentiated cells that can: (1) self-renew by division, and (2) differentiate into specialized cell types.', 1),
  ('b2-3-cell-specialization', 'Totipotent vs. pluripotent vs. multipotent?', 'Totipotent: any cell including placenta (zygote). Pluripotent: all three germ layers but not placenta (embryonic stem cells). Multipotent: limited lineage (blood stem cells).', 2),
  ('b2-3-cell-specialization', 'How does cell differentiation occur?', 'Specific genes are switched on/off in response to chemical signals (morphogens), producing proteins that give the cell its specialized structure and function.', 3),
  ('b2-3-cell-specialization', 'Why does SA:Vol ratio decrease as cells grow?', 'Volume increases as r³ but surface area as r². As r increases, SA grows slower → SA:Vol ratio falls. Small cells have proportionally more membrane for exchange.', 4),
  ('b2-3-cell-specialization', 'Why is high SA:Vol important for cells?', 'Exchange of nutrients, gases, and waste occurs across the cell surface. High SA:Vol ensures efficient diffusion. Large cells may not be supplied fast enough.', 5);

-- C4.2 Energy & Matter
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('c4-2-energy-matter', 'Open system vs. closed system?', 'Open system: both energy AND matter can enter and exit. Closed system: only energy exchange. Ecosystems are open systems.', 1),
  ('c4-2-energy-matter', 'Where does the energy for most ecosystems originate?', 'Sunlight (solar energy) — captured by photoautotrophs via photosynthesis.', 2),
  ('c4-2-energy-matter', 'Define photoautotroph.', 'An organism that uses light to synthesise organic molecules from inorganic substances (e.g. plants, algae, cyanobacteria).', 3),
  ('c4-2-energy-matter', 'Define chemoautotroph.', 'An organism that uses energy from chemical oxidation reactions (not light) to synthesise organic compounds (e.g. sulfur-oxidising bacteria at hydrothermal vents).', 4),
  ('c4-2-energy-matter', 'Define heterotroph.', 'An organism that obtains carbon compounds by consuming other organisms or organic matter. Cannot synthesise organic molecules from inorganic substances alone.', 5),
  ('c4-2-energy-matter', 'What is the 10% rule in energy transfer?', 'Only ~10% of energy at one trophic level passes to the next. ~90% is lost, primarily as heat through cellular respiration.', 6),
  ('c4-2-energy-matter', 'What is a trophic level?', 'A position in a food chain. T1 = producers, T2 = primary consumers, T3 = secondary consumers, T4 = tertiary consumers.', 7),
  ('c4-2-energy-matter', 'Why are food chains limited to 4–5 levels?', 'Energy losses (~90%) at each level mean insufficient energy remains to support organisms at higher levels.', 8),
  ('c4-2-energy-matter', 'Define primary production.', 'Accumulation of carbon compounds in biomass by autotrophs. GPP = total fixed. NPP = GPP − respiration losses.', 9),
  ('c4-2-energy-matter', 'Carbon sink vs. carbon source?', 'Sink: absorbs more carbon than it releases (e.g. tropical forest). Source: releases more than it absorbs (e.g. fossil fuel combustion).', 10),
  ('c4-2-energy-matter', 'What does the Keeling Curve show?', 'A continuous, accelerating rise in atmospheric CO₂ from ~315 ppm (1958) to over 420 ppm (2023). Seasonal dips from Northern Hemisphere photosynthesis in summer.', 11),
  ('c4-2-energy-matter', 'How are aerobic respiration and photosynthesis interdependent?', 'Respiration depends on O₂ from photosynthesis. Photosynthesis depends on CO₂ from respiration. Both cycle O₂ and CO₂.', 12);

-- C1.3 Photosynthesis
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('c1-3-photosynthesis', 'Overall equation for photosynthesis?', 'CO₂ + H₂O → Glucose + O₂ (using light energy). Light energy is transformed into chemical energy stored in glucose.', 1),
  ('c1-3-photosynthesis', 'Why is O₂ a by-product of photosynthesis?', 'O₂ is released from the splitting (photolysis) of water molecules: H₂O → 2H⁺ + 2e⁻ + ½O₂. The O₂ comes from water, not CO₂.', 2),
  ('c1-3-photosynthesis', 'What is chromatography used for?', 'To separate and identify photosynthetic pigments (chlorophyll a, b, carotenoids, xanthophylls) based on different solubilities/Rf values.', 3),
  ('c1-3-photosynthesis', 'How is Rf value calculated?', 'Rf = distance travelled by pigment ÷ distance travelled by solvent front. Values range 0–1.', 4),
  ('c1-3-photosynthesis', 'Absorption spectrum vs. action spectrum?', 'Absorption: which wavelengths a pigment absorbs. Action: which wavelengths most effectively drive photosynthesis. Action spectrum matches combined absorption of all pigments.', 5),
  ('c1-3-photosynthesis', 'Three limiting factors of photosynthesis?', '1. Light intensity  2. CO₂ concentration  3. Temperature', 6),
  ('c1-3-photosynthesis', 'What are FACE experiments?', 'Free Air Carbon-dioxide Enrichment — growing plants in outdoor plots with elevated CO₂ to predict future photosynthesis rates.', 7),
  ('c1-3-photosynthesis', '[AHL] What is a photosystem?', 'An array of pigment molecules (antenna complex + reaction centre) in the thylakoid membrane that absorbs light and converts it to excited electrons.', 8),
  ('c1-3-photosynthesis', '[AHL] What happens in Photosystem II?', 'Light excites electrons in P680. Photolysis of water replaces electrons, releasing O₂, H⁺, and electrons which pass to the electron transport chain.', 9),
  ('c1-3-photosynthesis', '[AHL] What happens in Photosystem I?', 'Excited electrons at P700 are used to reduce NADP⁺ to NADPH with electrons from the ETC and H⁺ ions.', 10),
  ('c1-3-photosynthesis', '[AHL] What is Rubisco?', 'Ribulose bisphosphate carboxylase/oxygenase — catalyses carbon fixation: CO₂ + RuBP (5C) → unstable 6C → 2 GP (3C).', 11),
  ('c1-3-photosynthesis', '[AHL] What is triose phosphate (TP)?', 'A 3C sugar phosphate produced when GP is reduced using ATP and NADPH in the Calvin cycle. Building block for glucose and other organics.', 12),
  ('c1-3-photosynthesis', '[AHL] How is RuBP regenerated?', '5 molecules of TP (using ATP) regenerate 3 molecules of RuBP. Requires ATP from the light-dependent reactions.', 13);

-- C1.2 Cell Respiration
INSERT OR IGNORE INTO biology_flashcards (topic_id, term, definition, sort_order) VALUES
  ('c1-2-cell-respiration', 'What is ATP and why is it the energy currency?', 'Adenosine Triphosphate. Distributes energy within cells. Soluble, cannot pass membranes, releases manageable energy amounts, rapidly regenerated from ADP + Pi.', 1),
  ('c1-2-cell-respiration', 'How does ATP release energy?', 'ATP is hydrolysed: ATP + H₂O → ADP + Pi + energy. Energy from the terminal phosphate bond drives cellular work.', 2),
  ('c1-2-cell-respiration', 'Four life processes that use ATP?', '1. Active transport (Na⁺/K⁺ pump)  2. Biosynthesis (protein synthesis)  3. Muscle contraction  4. Cell division / DNA replication', 3),
  ('c1-2-cell-respiration', 'Aerobic vs. anaerobic respiration: products?', 'Aerobic: CO₂ + H₂O (~30–32 ATP). Anaerobic in humans: lactate. Anaerobic in yeast: ethanol + CO₂.', 4),
  ('c1-2-cell-respiration', 'Aerobic vs. anaerobic respiration: location?', 'Aerobic: cytoplasm (glycolysis) + mitochondria (link, Krebs, ETC). Anaerobic: cytoplasm only.', 5),
  ('c1-2-cell-respiration', 'Why does anaerobic yield much less ATP?', 'Only glycolysis produces ATP (net 2). Link reaction, Krebs, and ETC cannot occur without oxygen as terminal electron acceptor.', 6),
  ('c1-2-cell-respiration', '[AHL] What is NAD⁺ and its role?', 'Hydrogen carrier. Reduced to NADH by accepting H atoms during oxidation reactions (glycolysis, link, Krebs), then delivers electrons to ETC for ATP synthesis.', 7),
  ('c1-2-cell-respiration', '[AHL] What is glycolysis?', 'Breakdown of glucose (6C) to 2 pyruvate (3C) in the cytoplasm. Net yield: 2 ATP and 2 NADH per glucose.', 8),
  ('c1-2-cell-respiration', '[AHL] Describe the link reaction.', 'Pyruvate (3C) is decarboxylated and oxidised; NAD⁺ reduced to NADH. 2C acetyl group combines with CoA to form acetyl-CoA. Occurs in mitochondrial matrix.', 9),
  ('c1-2-cell-respiration', '[AHL] What is produced per turn of the Krebs cycle?', 'Per acetyl-CoA: 3 NADH, 1 FADH₂, 1 ATP, 2 CO₂. Per glucose: double these values.', 10),
  ('c1-2-cell-respiration', '[AHL] What is chemiosmosis?', 'ATP synthesis using energy from H⁺ ions flowing down their electrochemical gradient through ATP synthase, from intermembrane space into the mitochondrial matrix.', 11),
  ('c1-2-cell-respiration', '[AHL] Role of oxygen in aerobic respiration?', 'Terminal electron acceptor at end of ETC. Accepts electrons and H⁺ to form water: O₂ + 4H⁺ + 4e⁻ → 2H₂O. Without O₂, ETC stops.', 12),
  ('c1-2-cell-respiration', '[AHL] Why do lipids yield more ATP per gram?', 'Lipids have more C–H bonds and fewer oxygen atoms (more reduced). More hydrogen atoms = more electrons for ETC = more NADH = higher ATP yield per gram.', 13);


-- ─── MCQ QUESTIONS ───────────────────────────────────────────

-- A2.1 Origins of Cells
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq1', 'A2.1 Origins of Cells', 'SL/HL', 'Which condition of early Earth allowed abiotic synthesis of organic compounds?', 'High atmospheric oxygen concentration', 'Absence of free oxygen and abundant UV radiation', 'Presence of ozone blocking UV light', 'Low concentrations of carbon dioxide', 1, 'Early Earth lacked free O₂ and ozone, allowing UV radiation to drive chemical reactions and organic molecules to accumulate without being oxidised.', 1),
  ('bio_mcq2', 'A2.1 Origins of Cells', 'SL/HL', 'The Miller-Urey experiment provided evidence that:', 'RNA was the first self-replicating molecule', 'Life originated at deep-sea hydrothermal vents', 'Amino acids can form abiotically under early Earth conditions', 'Vesicles formed spontaneously from fatty acids', 2, 'Miller and Urey simulated early Earth conditions and successfully produced amino acids, demonstrating that organic molecules can form from inorganic precursors.', 2),
  ('bio_mcq3', 'A2.1 Origins of Cells', 'SL/HL', 'Which property makes RNA a candidate for the first molecule of life?', 'It is double-stranded and stable', 'It can both store information and catalyze reactions', 'It is found only in the nucleus', 'It is more stable than DNA at high temperatures', 1, 'RNA can store genetic information (like DNA) and catalyze chemical reactions (ribozymes), meaning a single molecule type could perform both functions needed for early life.', 3),
  ('bio_mcq4', 'A2.1 Origins of Cells', 'SL/HL', 'What is the most important evidence for LUCA?', 'All organisms have the same body plan', 'All organisms reproduce sexually', 'All organisms share a universal genetic code and conserved ribosomal genes', 'All organisms live in similar environments', 2, 'The universal genetic code and conserved ribosomal RNA genes across all domains of life strongly support a common ancestor.', 4),
  ('bio_mcq5', 'A2.1 Origins of Cells', 'SL/HL', 'Spontaneous vesicle formation is significant because:', 'Vesicles contain DNA and reproduce independently', 'They provide a membrane-bound compartment separating internal from external chemistry', 'They catalyze amino acid formation', 'They are identical to modern cell membranes', 1, 'Vesicles created the first compartments, a prerequisite for protocells — separating internal chemistry from the external environment.', 5),
  ('bio_mcq6', 'A2.1 Origins of Cells', 'SL/HL', 'What requirement for first cells is demonstrated by ribozymes?', 'Self-assembly', 'Compartmentalization', 'Catalysis', 'Active transport', 2, 'Ribozymes are RNA molecules that catalyze reactions, demonstrating that catalysis could occur without protein enzymes.', 6),
  ('bio_mcq7', 'A2.1 Origins of Cells', 'SL/HL', 'Which is a limitation of the Miller-Urey experiment?', 'It produced no organic molecules', 'It used modern atmospheric conditions', 'The exact composition of early Earth''s atmosphere is uncertain', 'It could only be performed once', 2, 'The main limitation is uncertainty about the exact atmospheric composition of early Earth, which may differ from what Miller and Urey used.', 7),
  ('bio_mcq8', 'A2.1 Origins of Cells', 'HL', 'Evidence for LUCA evolving near hydrothermal vents includes:', 'Fossil cells in meteorites', 'Fossilized precipitates in ancient seafloor vents and conserved genomic sequences', 'DNA extracted directly from vent rock', 'Presence of ozone in surrounding water', 1, 'Ancient hydrothermal vent precipitates contain fossilized evidence, and genomic analysis shows conserved sequences consistent with a thermophilic ancestor.', 8);

-- A2.2 Cell Structure
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq9', 'A2.2 Cell Structure', 'SL/HL', 'A cell drawn in a microscope image is 60 mm wide. The actual cell is 30 µm. What is the magnification?', '×2', '×200', '×2000', '×20', 2, 'Convert: 60 mm = 60,000 µm. Magnification = 60,000 ÷ 30 = ×2000.', 9),
  ('bio_mcq10', 'A2.2 Cell Structure', 'SL/HL', 'Which is the correct order of increasing size?', 'Protein → virus → bacterium → eukaryotic cell', 'Eukaryotic cell → bacterium → virus → protein', 'Virus → protein → bacterium → eukaryotic cell', 'Bacterium → virus → protein → eukaryotic cell', 0, 'From smallest to largest: proteins (~1–10 nm) → viruses (~20–300 nm) → bacteria (~1–5 µm) → eukaryotic cells (~10–100 µm).', 10),
  ('bio_mcq11', 'A2.2 Cell Structure', 'SL/HL', 'Which feature is present in prokaryotes but NOT eukaryotes?', 'Ribosomes', 'Plasma membrane', '70S ribosomes and nucleoid region', 'DNA', 2, 'Prokaryotes have 70S ribosomes (vs. 80S in eukaryotes) and a nucleoid region (vs. membrane-bound nucleus).', 11),
  ('bio_mcq12', 'A2.2 Cell Structure', 'SL/HL', 'Red blood cells are exceptions to cell theory because:', 'They are not made of cells', 'They arise from viruses', 'They lack a nucleus in their mature form', 'They divide by meiosis', 2, 'Mature red blood cells lack a nucleus, which is atypical for eukaryotic cells and an exception to cell theory.', 12),
  ('bio_mcq13', 'A2.2 Cell Structure', 'SL/HL', 'Which cell type has a large central vacuole, chloroplasts, and cell wall but no centrioles?', 'Fungal cell', 'Animal cell', 'Prokaryotic cell', 'Plant cell', 3, 'Plant cells uniquely have a cellulose cell wall, chloroplasts, large central vacuole, and lack centrioles.', 13),
  ('bio_mcq14', 'A2.2 Cell Structure', 'SL/HL', 'What is the maximum resolution of an electron microscope?', '0.1 mm', '0.2 µm', '1 nm', '100 nm', 2, 'Electron microscopes can resolve down to approximately 1 nm, far better than light microscopes (0.2 µm).', 14),
  ('bio_mcq15', 'A2.2 Cell Structure', 'HL', 'Which evidence most strongly supports endosymbiotic theory for mitochondria?', 'Mitochondria have a single membrane and are found only in plants', 'Mitochondria have their own circular DNA, 70S ribosomes, and divide by binary fission', 'Mitochondria are the site of protein synthesis for the entire cell', 'Mitochondria are found in prokaryotes', 1, 'The double membrane, circular DNA, 70S ribosomes, and binary fission all parallel prokaryotic features, supporting endosymbiotic origin.', 15),
  ('bio_mcq16', 'A2.2 Cell Structure', 'HL', 'What is an advantage of multicellularity?', 'Simpler organization than unicellular organisms', 'All cells perform the same function', 'Cells can specialize, allowing division of labour', 'Unicellular organisms live longer', 2, 'Multicellularity allows cell specialization and division of labour, enabling more complex and efficient organisms.', 16);

-- B2.2 Organelles
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq17', 'B2.2 Organelles', 'SL/HL', 'What is the correct protein secretion pathway?', 'Golgi → RER → plasma membrane', 'RER → Golgi → vesicles → plasma membrane', 'Golgi → lysosome → RER', 'RER → lysosome → Golgi', 1, 'Proteins are synthesised on RER-bound ribosomes, transported in vesicles to the Golgi for processing, then packaged in vesicles for exocytosis.', 17),
  ('bio_mcq18', 'B2.2 Organelles', 'SL/HL', 'Which organelle has no membrane?', 'Lysosome', 'Mitochondrion', 'Ribosome', 'Vacuole', 2, 'Ribosomes are not membrane-bound. They are complex structures of rRNA and protein found free in cytoplasm or attached to RER.', 18),
  ('bio_mcq19', 'B2.2 Organelles', 'SL/HL', 'Which correctly describes Golgi and RER?', 'Golgi: ATP production. RER: protein synthesis for secretion', 'Golgi: processing of proteins. RER: synthesis of proteins for secretion', 'Golgi: protein synthesis for secretion. RER: ATP production', 'Both synthesize lipids only', 1, 'RER synthesises proteins (for secretion/membranes) and Golgi processes, modifies, sorts, and packages those proteins.', 19),
  ('bio_mcq20', 'B2.2 Organelles', 'SL/HL', 'Advantage of separating nucleus from cytoplasm in eukaryotes?', 'Allows simultaneous transcription and translation', 'Prevents any gene regulation', 'Enables mRNA processing before translation and protects DNA', 'Makes the cell smaller', 2, 'Nuclear-cytoplasmic separation allows mRNA processing (splicing, capping) before export for translation, and protects DNA from cytoplasmic enzymes.', 20),
  ('bio_mcq21', 'B2.2 Organelles', 'HL', 'The inner mitochondrial membrane is folded into cristae because:', 'It reduces surface area to minimize reactions', 'It greatly increases surface area for ETC and ATP synthase', 'It stores genetic information', 'It is the site of the Krebs cycle', 1, 'Cristae increase the surface area available for the electron transport chain complexes and ATP synthase, maximising ATP production.', 21),
  ('bio_mcq22', 'B2.2 Organelles', 'HL', 'Which organelle produces surfactant in the lungs?', 'Type I pneumocytes', 'Ribosomes in the matrix', 'Type II pneumocytes', 'Smooth ER in alveolar cells', 2, 'Type II pneumocytes secrete pulmonary surfactant which reduces surface tension in alveoli, preventing collapse during exhalation.', 22);

-- B2.1 Membranes
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq23', 'B2.1 Membranes', 'SL/HL', 'What do diffusion and osmosis have in common?', 'They only occur in living cells', 'They require membrane transport proteins', 'They are both passive processes', 'Movement is against the concentration gradient', 2, 'Both diffusion and osmosis are passive processes — they move substances down concentration gradients without requiring ATP.', 23),
  ('bio_mcq24', 'B2.1 Membranes', 'SL/HL', 'Which molecules can cross the phospholipid bilayer by simple diffusion?', 'Glucose and sodium ions', 'O₂, CO₂, and small non-polar molecules', 'Large proteins and charged ions only', 'Water can never cross by simple diffusion', 1, 'Small non-polar molecules like O₂ and CO₂ can dissolve in and pass through the hydrophobic core of the bilayer.', 24),
  ('bio_mcq25', 'B2.1 Membranes', 'SL/HL', 'Facilitated diffusion requires:', 'ATP and a concentration gradient', 'A channel protein and movement against the gradient', 'A channel or carrier protein and movement down a concentration gradient', 'ATP and a pump protein', 2, 'Facilitated diffusion is passive (no ATP), uses channel or carrier proteins, and moves substances down their concentration gradient.', 25),
  ('bio_mcq26', 'B2.1 Membranes', 'SL/HL', 'What is the main role of cholesterol in the plasma membrane?', 'To increase membrane permeability to glucose', 'To regulate membrane fluidity at varying temperatures', 'To provide structural support like a cell wall', 'To act as a receptor for hormones only', 1, 'Cholesterol acts as a fluidity buffer — restricting movement at high temps and preventing rigidity at low temps.', 26),
  ('bio_mcq27', 'B2.1 Membranes', 'SL/HL', 'Which membrane feature is responsible for cell-cell recognition?', 'Integral proteins acting as pumps', 'Phospholipid tails', 'Glycoproteins and glycolipids on the outer surface', 'Cholesterol molecules', 2, 'Glycoproteins and glycolipids on the extracellular surface form the glycocalyx, enabling cell-cell recognition and signalling.', 27),
  ('bio_mcq28', 'B2.1 Membranes', 'SL/HL', 'A vesicle fuses with the plasma membrane to release a substance. This is:', 'Endocytosis', 'Active transport', 'Phagocytosis', 'Exocytosis', 3, 'Exocytosis is the process of vesicles fusing with the plasma membrane to release contents outside the cell.', 28),
  ('bio_mcq29', 'B2.1 Membranes', 'HL', 'Which membrane would be LEAST fluid at high temperatures?', 'High unsaturated fatty acids, no cholesterol', 'High saturated fatty acids and high cholesterol', 'No cholesterol, equal saturated/unsaturated', 'Only unsaturated fatty acids', 1, 'Saturated fatty acids pack tightly and cholesterol restricts movement at high temps — both reduce fluidity.', 29),
  ('bio_mcq30', 'B2.1 Membranes', 'HL', 'In secondary active transport of glucose in the small intestine:', 'Glucose moves against its gradient powered directly by ATP', 'Glucose moves with Na⁺ down the Na⁺ gradient maintained by the Na⁺/K⁺ pump', 'Glucose moves by simple diffusion through the bilayer', 'Glucose requires aquaporins to cross', 1, 'The Na⁺ gradient (created by Na⁺/K⁺ pump using ATP) drives glucose cotransport — glucose moves with Na⁺ via SGLT.', 30);

-- D2.3 Water Potential
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq31', 'D2.3 Water Potential', 'SL/HL', 'Which term describes a solution with lower solute concentration than the cell?', 'Hypertonic', 'Isotonic', 'Hypotonic', 'Isosmotic', 2, 'A hypotonic solution has lower solute concentration (higher water potential) than the cell''s cytoplasm.', 31),
  ('bio_mcq32', 'D2.3 Water Potential', 'SL/HL', 'What happens to a red blood cell in a hypotonic solution?', 'It shrinks', 'It remains unchanged', 'It swells and may lyse', 'It becomes plasmolysed', 2, 'Water enters the RBC by osmosis (higher water potential outside). Without a cell wall, the cell swells and may burst (haemolyse).', 32),
  ('bio_mcq33', 'D2.3 Water Potential', 'SL/HL', 'Why does a plant cell not burst in a hypotonic solution?', 'The plasma membrane is too thick', 'The rigid cell wall provides back-pressure limiting further water entry', 'Aquaporins close to prevent water entry', 'The vacuole absorbs excess water', 1, 'The rigid cellulose cell wall exerts turgor pressure that opposes further water entry, preventing lysis.', 33),
  ('bio_mcq34', 'D2.3 Water Potential', 'SL/HL', 'What is plasmolysis?', 'Cell swelling in hypotonic solution', 'RBC bursting', 'Plasma membrane pulling away from the cell wall', 'Cell dividing uncontrollably', 2, 'Plasmolysis occurs when water leaves a plant cell in a hypertonic solution, causing the membrane to detach from the cell wall.', 34),
  ('bio_mcq35', 'D2.3 Water Potential', 'SL/HL', 'Why are isotonic saline solutions used in hospitals?', 'They kill bacteria', 'They match blood solute concentration and prevent osmotic damage', 'They increase blood pressure directly', 'They provide glucose for energy', 1, 'Isotonic solutions have the same water potential as blood cells, preventing osmotic stress (lysis or crenation).', 35),
  ('bio_mcq36', 'D2.3 Water Potential', 'HL', 'A cell has Ψs = –0.8 MPa and Ψp = +0.3 MPa. What is its water potential?', '+1.1 MPa', '–0.5 MPa', '–1.1 MPa', '+0.5 MPa', 1, 'Ψ = Ψs + Ψp = (–0.8) + (+0.3) = –0.5 MPa.', 36),
  ('bio_mcq37', 'D2.3 Water Potential', 'HL', 'Water always moves:', 'From lower Ψ to higher Ψ', 'From higher Ψ to lower Ψ', 'From higher solute potential to lower solute potential', 'From higher pressure potential to lower pressure potential regardless of Ψ', 1, 'Water moves from regions of higher water potential (more free water/less solute) to lower water potential.', 37);

-- B2.3 Cell Specialization
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq38', 'B2.3 Cell Specialization', 'SL/HL', 'Which stem cell type can form all cells including extraembryonic tissue?', 'Multipotent', 'Unipotent', 'Pluripotent', 'Totipotent', 3, 'Totipotent cells (e.g. zygote) can differentiate into every cell type including placental (extraembryonic) tissue.', 38),
  ('bio_mcq39', 'B2.3 Cell Specialization', 'SL/HL', 'As a cell grows larger, what happens to its SA:Vol ratio?', 'It increases', 'It stays the same', 'It decreases', 'It first increases then decreases', 2, 'Volume grows as r³ but surface area as r². So SA:Vol decreases as cells grow larger.', 39),
  ('bio_mcq40', 'B2.3 Cell Specialization', 'SL/HL', 'Why is high SA:Vol important for cells?', 'It allows cells to store more energy', 'It ensures adequate exchange of nutrients and waste across the cell surface', 'It reduces the need for organelles', 'It increases DNA replication rate', 1, 'Exchange of materials occurs across the cell surface. Higher SA:Vol ratio means more surface relative to volume for efficient exchange.', 40),
  ('bio_mcq41', 'B2.3 Cell Specialization', 'SL/HL', 'How does cell differentiation occur?', 'By gaining new DNA during development', 'By losing unwanted chromosomes', 'By selective gene expression — certain genes switched on or off', 'By random mutation', 2, 'All cells contain the same DNA. Differentiation occurs through differential gene expression — switching specific genes on/off.', 41),
  ('bio_mcq42', 'B2.3 Cell Specialization', 'HL', 'Which adaptation of type II pneumocytes prevents alveolar collapse?', 'Flattened shape for gas exchange', 'Large mitochondria for ATP production', 'Production and secretion of surfactant to reduce surface tension', 'Thin walls for rapid diffusion', 2, 'Type II pneumocytes secrete surfactant that reduces surface tension in alveoli, preventing them from collapsing during exhalation.', 42),
  ('bio_mcq43', 'B2.3 Cell Specialization', 'HL', 'Which sperm cell feature provides energy for motility?', 'Large yolk reserves', 'Numerous mitochondria in the midpiece', 'The acrosome at the head', 'Ribosomes along the flagellum', 1, 'The midpiece of sperm is packed with mitochondria that generate ATP to power the flagellum for swimming.', 43);

-- C4.2 Energy & Matter
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq44', 'C4.2 Energy & Matter', 'SL/HL', 'Which correctly describes an open system?', 'Energy enters and exits, but matter cannot', 'Neither energy nor matter can enter or exit', 'Both energy and matter can enter and exit freely', 'Only matter can enter or exit', 2, 'An open system allows both energy and matter to enter and exit — ecosystems are open systems.', 44),
  ('bio_mcq45', 'C4.2 Energy & Matter', 'SL/HL', 'What happens to sunlight energy entering an ecosystem?', 'It is stored permanently in biomass', 'It is transformed to chemical energy in autotrophs, then lost as heat through respiration', 'It is transferred intact through every trophic level', 'It is immediately released as heat', 1, 'Light energy is converted to chemical energy by autotrophs, then progressively lost as heat through respiration at each trophic level.', 45),
  ('bio_mcq46', 'C4.2 Energy & Matter', 'SL/HL', 'Grass (500,000 kJ) → Rabbit → Fox → Eagle. Energy available to eagle?', '5,000 kJ', '500 kJ', '50 kJ', '50,000 kJ', 1, 'Using the 10% rule: 500,000 → 50,000 → 5,000 → 500 kJ at eagle level (three 10% transfers).', 46),
  ('bio_mcq47', 'C4.2 Energy & Matter', 'SL/HL', 'Which organisms are at trophic level 1?', 'Herbivores', 'Decomposers', 'Primary consumers', 'Producers (autotrophs)', 3, 'Trophic level 1 consists of producers — autotrophs that convert light/chemical energy into organic molecules.', 47),
  ('bio_mcq48', 'C4.2 Energy & Matter', 'SL/HL', 'Iron-oxidising bacteria in mine drainage are:', 'Photoautotrophs', 'Mixotrophs', 'Chemoautotrophs', 'Heterotrophs', 2, 'These bacteria use energy from oxidation of iron compounds (not light) to synthesise organic molecules — they are chemoautotrophs.', 48),
  ('bio_mcq49', 'C4.2 Energy & Matter', 'SL/HL', 'The annual CO₂ dip in the Keeling Curve is caused by:', 'Increased fossil fuel combustion in summer', 'Increased Northern Hemisphere photosynthesis in spring/summer exceeding respiration', 'Oceans absorbing more CO₂ in summer', 'Decomposers being less active in summer', 1, 'The Northern Hemisphere has more land mass. Spring/summer photosynthesis removes more CO₂ than respiration/decomposition releases.', 49),
  ('bio_mcq50', 'C4.2 Energy & Matter', 'SL/HL', 'A tropical rainforest with high year-round photosynthesis is classified as:', 'A carbon source', 'A carbon neutral ecosystem', 'A carbon sink', 'A closed carbon system', 2, 'Tropical rainforests absorb more CO₂ than they release (net uptake), making them carbon sinks.', 50),
  ('bio_mcq51', 'C4.2 Energy & Matter', 'SL/HL', 'Food chains rarely exceed 4–5 levels because:', 'Predators always go extinct', 'Insufficient species diversity', 'Each level loses ~90% of energy to heat, leaving too little for further levels', 'Decomposers remove all carbon after level 4', 2, 'The ~90% energy loss at each trophic level means that by level 4–5, there is insufficient energy to sustain another population.', 51),
  ('bio_mcq52', 'C4.2 Energy & Matter', 'SL/HL', 'Net primary production (NPP) is:', 'Total energy absorbed by producers from sunlight', 'Gross primary production minus producers'' own respiration', 'Energy transferred from producers to primary consumers', 'Total biomass of all autotrophs', 1, 'NPP = GPP – respiration losses by producers. It represents the energy available for growth and consumers.', 52);

-- C1.3 Photosynthesis
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq53', 'C1.3 Photosynthesis', 'SL/HL', 'The overall equation for photosynthesis is:', 'Glucose + O₂ → CO₂ + H₂O + ATP', 'CO₂ + H₂O → Glucose + O₂ (using light energy)', 'Glucose → Pyruvate + 2 ATP + 2 NADH', 'CO₂ + O₂ → Glucose + H₂O', 1, 'Photosynthesis uses light energy to convert CO₂ and H₂O into glucose and oxygen.', 53),
  ('bio_mcq54', 'C1.3 Photosynthesis', 'SL/HL', 'The O₂ released in photosynthesis comes from:', 'Carbon dioxide', 'Glucose', 'Water (H₂O)', 'NADPH', 2, 'Oxygen is released from the photolysis (splitting) of water molecules, not from CO₂.', 54),
  ('bio_mcq55', 'C1.3 Photosynthesis', 'SL/HL', 'In chromatography of leaf pigments, which travels furthest?', 'Chlorophyll a', 'Chlorophyll b', 'Carotene (least polar, most soluble in solvent)', 'Xanthophyll', 2, 'Carotene is the least polar pigment and most soluble in the organic solvent, so it travels furthest up the paper.', 55),
  ('bio_mcq56', 'C1.3 Photosynthesis', 'SL/HL', 'The action spectrum most closely matches:', 'The absorption spectrum of carotene alone', 'The combined absorption spectrum of all photosynthetic pigments', 'The emission spectrum of the sun', 'The absorption spectrum of water', 1, 'The action spectrum reflects the photosynthetic activity of ALL pigments combined, not just one.', 56),
  ('bio_mcq57', 'C1.3 Photosynthesis', 'SL/HL', 'A plant in green light only would show:', 'Maximum photosynthesis rate', 'Very low rate — chlorophyll reflects green light', 'Same rate as white light', 'No effect on rate', 1, 'Chlorophyll absorbs mainly blue and red light. Green light is mostly reflected, resulting in very low photosynthesis.', 57),
  ('bio_mcq58', 'C1.3 Photosynthesis', 'HL', 'In light-dependent reactions, the source of electrons for PSII is:', 'CO₂ from the atmosphere', 'Glucose in the stroma', 'Water molecules (photolysis)', 'NADPH from PSI', 2, 'Photolysis of water provides replacement electrons for P680 in PSII: 2H₂O → 4H⁺ + 4e⁻ + O₂.', 58),
  ('bio_mcq59', 'C1.3 Photosynthesis', 'HL', 'ATP synthesis by chemiosmosis in photosynthesis occurs:', 'In the stroma', 'In the outer chloroplast membrane', 'In the thylakoid membrane via ATP synthase', 'In the cytoplasm', 2, 'H⁺ accumulates in the thylakoid lumen and flows through ATP synthase in the thylakoid membrane to produce ATP in the stroma.', 59),
  ('bio_mcq60', 'C1.3 Photosynthesis', 'HL', 'The immediate products of carbon fixation by Rubisco are:', 'Triose phosphate and RuBP', 'Two molecules of glycerate-3-phosphate (GP)', 'One molecule of glucose-6-phosphate', 'Acetyl-CoA and CO₂', 1, 'Rubisco catalyses: CO₂ + RuBP (5C) → unstable 6C → 2 GP (3C). GP is the immediate stable product.', 60),
  ('bio_mcq61', 'C1.3 Photosynthesis', 'HL', 'Which light-dependent products does the Calvin cycle need?', 'O₂ and CO₂', 'ATP and NADPH (reduced NADP)', 'Glucose and RuBP', 'Electrons and protons only', 1, 'The Calvin cycle uses ATP (for phosphorylation and RuBP regeneration) and NADPH (for reducing GP to TP).', 61),
  ('bio_mcq62', 'C1.3 Photosynthesis', 'HL', 'Multiple pigment types in a photosystem provides the advantage of:', 'Independent CO₂ fixation', 'Absorbing a broader range of wavelengths, increasing light capture efficiency', 'Preventing photobleaching by UV absorption', 'Providing structural support to thylakoids', 1, 'Different pigments absorb different wavelengths, maximising the range of the spectrum that can be harvested and funnelled to the reaction centre.', 62);

-- C1.2 Cell Respiration
INSERT OR IGNORE INTO biology_mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('bio_mcq63', 'C1.2 Cell Respiration', 'SL/HL', 'ATP in cells is best described as:', 'Long-term energy storage in muscle', 'Distributing energy within cells, coupling energy-releasing to energy-consuming reactions', 'Carrying genetic information', 'Transporting oxygen to mitochondria', 1, 'ATP is the universal energy currency — it couples exergonic reactions to endergonic reactions within cells.', 63),
  ('bio_mcq64', 'C1.2 Cell Respiration', 'SL/HL', 'When ATP is hydrolysed to ADP and Pi:', 'Energy is absorbed from surroundings', 'The phosphate bond reforms immediately', 'Energy is released for cellular work', 'CO₂ is produced', 2, 'Hydrolysis of ATP releases energy that can be used for active transport, biosynthesis, muscle contraction, etc.', 64),
  ('bio_mcq65', 'C1.2 Cell Respiration', 'SL/HL', 'Anaerobic respiration in human muscle produces:', 'Ethanol and CO₂', 'Lactate (lactic acid)', 'Acetyl-CoA', 'Citric acid', 1, 'In humans, anaerobic respiration converts pyruvate to lactate to regenerate NAD⁺ for continued glycolysis.', 65),
  ('bio_mcq66', 'C1.2 Cell Respiration', 'SL/HL', 'The main purpose of converting pyruvate to lactate is:', 'To produce extra ATP directly', 'To store energy for later', 'To regenerate NAD⁺ so glycolysis can continue', 'To export pyruvate from the cell', 2, 'NAD⁺ is regenerated from NADH during lactate formation, allowing glycolysis to continue producing ATP without oxygen.', 66),
  ('bio_mcq67', 'C1.2 Cell Respiration', 'SL/HL', 'Glycolysis takes place in the:', 'Mitochondrial matrix', 'Thylakoid membrane', 'Cytoplasm', 'Nucleus', 2, 'Glycolysis occurs in the cytoplasm of all cells — it does not require mitochondria or oxygen.', 67),
  ('bio_mcq68', 'C1.2 Cell Respiration', 'HL', 'During the link reaction, pyruvate undergoes:', 'Phosphorylation and polymerisation', 'Oxidation and decarboxylation', 'Reduction and carboxylation', 'Hydrolysis and phosphorylation', 1, 'Pyruvate is oxidised (NAD⁺ reduced to NADH) and decarboxylated (CO₂ removed) to form acetyl-CoA.', 68),
  ('bio_mcq69', 'C1.2 Cell Respiration', 'HL', 'Per glucose molecule, glycolysis produces:', '4 NADH', '1 NADH', '2 NADH', '6 NADH', 2, 'Glycolysis produces 2 NADH per glucose molecule (one per pyruvate formed).', 69),
  ('bio_mcq70', 'C1.2 Cell Respiration', 'HL', 'Oxygen''s role in the electron transport chain is:', 'Activating ATP synthase', 'Acting as the terminal electron acceptor, combining with H⁺ and electrons to form water', 'Pumping protons across the membrane', 'Directly phosphorylating ADP', 1, 'O₂ is the terminal electron acceptor: O₂ + 4H⁺ + 4e⁻ → 2H₂O. Without it, electrons cannot flow and ATP synthesis stops.', 70),
  ('bio_mcq71', 'C1.2 Cell Respiration', 'HL', 'Chemiosmosis in the mitochondrion refers to:', 'Diffusion of CO₂ from matrix to cytoplasm', 'Active pumping of H⁺ into the matrix', 'ATP synthesis as H⁺ flows through ATP synthase down their gradient', 'Transfer of electrons from NADH to oxygen', 2, 'Chemiosmosis is H⁺ flowing through ATP synthase (from intermembrane space to matrix), driving ADP + Pi → ATP.', 71),
  ('bio_mcq72', 'C1.2 Cell Respiration', 'HL', 'Fats yield more ATP per gram than carbohydrates because:', 'Fats have higher molecular mass', 'Fats contain more C–H bonds and fewer O atoms, so more electrons available for ETC', 'Fats bypass glycolysis and enter Krebs directly as glucose', 'Fats are broken down in the cytoplasm', 1, 'Lipids are more reduced (more H atoms per carbon), producing more NADH/FADH₂ and therefore more ATP via the ETC.', 72);


-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

-- A2.1 Origins of Cells
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr1', 'A2.1 Origins of Cells', 'SL/HL', 'short_answer', 3, 'Outline the conditions on early Earth that would have allowed the formation of organic compounds. [3 marks]', '[1] Lack of free oxygen / reducing atmosphere (no O₂)
[1] High concentrations of CO₂ / CH₄ / NH₃ / H₂; no ozone layer allowing high UV penetration (UV as energy source)
[1] Higher temperatures compared to today / volcanic activity provided energy', 1),
  ('bio_wr2', 'A2.1 Origins of Cells', 'SL/HL', 'short_answer', 4, 'Describe the Miller-Urey experiment and explain what it demonstrated about the origin of life. [4 marks]', '[1] Mixed inorganic gases (H₂O, H₂, CH₄, NH₃) to simulate early Earth atmosphere
[1] Electrical sparks simulated lightning / UV energy source
[1] After one week, organic molecules including amino acids were detected
[1] Demonstrated that organic compounds can form spontaneously (abiotically) from inorganic precursors', 2),
  ('bio_wr3', 'A2.1 Origins of Cells', 'SL/HL', 'short_answer', 3, 'Explain why RNA is considered the most likely first genetic material. [3 marks]', '[1] RNA can store genetic information (sequence-specific nucleotide bases) like DNA
[1] RNA can catalyze chemical reactions (ribozymes) — acts as both gene and enzyme
[1] A single molecule type could carry out both replication and catalysis (RNA world hypothesis)', 3),
  ('bio_wr4', 'A2.1 Origins of Cells', 'SL/HL', 'short_answer', 2, 'State two pieces of evidence for a Last Universal Common Ancestor (LUCA). [2 marks]', '[1] Universal genetic code: same codons specify same amino acids in virtually all organisms
[1] Conserved genes/sequences across all domains of life (e.g. ribosomal RNA genes)', 4);

-- A2.2 Cell Structure
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr5', 'A2.2 Cell Structure', 'SL/HL', 'short_answer', 2, 'A student observes an Amoeba and draws it 80 mm wide. The actual diameter is 200 µm. Calculate the magnification. Show working. [2 marks]', '[1] Convert: 80 mm = 80,000 µm
[1] Magnification = 80,000 ÷ 200 = ×400', 5),
  ('bio_wr6', 'A2.2 Cell Structure', 'SL/HL', 'short_answer', 3, 'Compare the structure of prokaryotic and eukaryotic cells. Include three differences. [3 marks]', '[1] Prokaryotes: no membrane-bound nucleus (nucleoid); eukaryotes: membrane-bound nucleus
[1] Prokaryotes: 70S ribosomes; eukaryotes: 80S ribosomes
[1] Prokaryotes: lack membrane-bound organelles (no mitochondria); eukaryotes: have membrane-bound organelles', 6),
  ('bio_wr7', 'A2.2 Cell Structure', 'SL/HL', 'short_answer', 4, 'Explain what is meant by atypical cell structure, using two named examples. [4 marks]', '[1] Atypical cells do not conform to standard expectations of cell theory
[1] Red blood cells: lack nucleus in mature form — allows more space for haemoglobin
[1] Skeletal muscle cells: multinucleate (syncytia) — many nuclei in continuous cytoplasm
[1] This arises from fusion of many myoblasts during development', 7),
  ('bio_wr8', 'A2.2 Cell Structure', 'HL', 'short_answer', 4, 'Explain the endosymbiotic theory for the origin of eukaryotic cells. [4 marks]', '[1] A host prokaryotic cell engulfed aerobic bacteria by phagocytosis but did not digest them → became mitochondria
[1] A second engulfment of photosynthetic cyanobacteria gave rise to chloroplasts
[1] Evidence: double membranes (outer = host membrane, inner = original prokaryote membrane)
[1] Own circular DNA, 70S ribosomes, and binary fission — all prokaryotic features', 8);

-- B2.2 Organelles
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr9', 'B2.2 Organelles', 'SL/HL', 'short_answer', 2, 'State two advantages of compartmentalization in eukaryotic cells. [2 marks]', '[1] Different pH or ionic conditions can be maintained in separate compartments (e.g. lysosomes at low pH)
[1] Incompatible reactions can be separated / reactive metabolites contained / concentration of reactants controlled locally', 9),
  ('bio_wr10', 'B2.2 Organelles', 'HL', 'short_answer', 5, 'Describe the structure of a mitochondrion and relate each feature to its function. [5 marks]', '[1] Outer membrane: smooth, permeable to small molecules via porins — allows substrates to enter
[1] Inner membrane: highly folded into cristae — greatly increases surface area for ETC and ATP synthase
[1] Intermembrane space (IMS): protons pumped here creating electrochemical gradient for ATP synthesis
[1] Cristae: folds maximize SA for oxidative phosphorylation
[1] Matrix: contains Krebs cycle enzymes, own circular DNA, and 70S ribosomes', 10),
  ('bio_wr11', 'B2.2 Organelles', 'HL', 'short_answer', 3, 'Compare the roles of free ribosomes and RER-bound ribosomes. [3 marks]', '[1] Both are sites of protein synthesis / translation of mRNA
[1] Free ribosomes: produce proteins for use within the cytoplasm (intracellular proteins)
[1] RER-bound ribosomes: produce proteins destined for secretion, membrane insertion, or delivery to lysosomes', 11);

-- B2.1 Membranes
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr12', 'B2.1 Membranes', 'SL/HL', 'short_answer', 3, 'Explain how the structure of the phospholipid bilayer makes it an effective barrier. [3 marks]', '[1] Phospholipids are amphipathic: hydrophilic heads face outward (aqueous environments)
[1] Hydrophobic fatty acid tails face inward, forming a non-polar core
[1] This hydrophobic core is impermeable to ions, polar molecules, and large molecules; only small non-polar molecules pass freely', 12),
  ('bio_wr13', 'B2.1 Membranes', 'SL/HL', 'short_answer', 4, 'Distinguish between facilitated diffusion and active transport. [4 marks]', '[1] Both use membrane proteins to move specific substances
[1] Facilitated diffusion: passive, substances move DOWN gradient, no ATP required; uses channel/carrier proteins
[1] Active transport: active, substances move AGAINST gradient, requires ATP
[1] Uses pump proteins (e.g. Na⁺/K⁺ pump) allowing cell to maintain concentration differences', 13),
  ('bio_wr14', 'B2.1 Membranes', 'SL/HL', 'short_answer', 3, 'Define osmosis and explain the role of aquaporins. [3 marks]', '[1] Osmosis: passive movement of water across a semi-permeable membrane from lower solute concentration (higher Ψ) to higher solute concentration (lower Ψ)
[1] Water can move slowly through the bilayer; aquaporins greatly increase the rate
[1] Aquaporins are integral channel proteins forming pores specifically for water — highly selective and efficient', 14),
  ('bio_wr15', 'B2.1 Membranes', 'HL', 'short_answer', 4, 'Describe how the Na⁺/K⁺ pump creates and maintains membrane potential. [4 marks]', '[1] The pump is an active transporter using ATP in the plasma membrane
[1] Pumps 3 Na⁺ OUT and 2 K⁺ IN per ATP hydrolysed
[1] Net movement: more positive charges leave → net negative charge inside (approximately –70 mV in neurons)
[1] The Na⁺ gradient also drives secondary active transport (e.g. glucose cotransport in intestine)', 15),
  ('bio_wr16', 'B2.1 Membranes', 'HL', 'short_answer', 3, 'Explain the role of cholesterol in regulating membrane fluidity. [3 marks]', '[1] Cholesterol sits between phospholipids with hydrophilic hydroxyl groups near heads
[1] At HIGH temperatures: restricts phospholipid movement → reduces fluidity
[1] At LOW temperatures: disrupts close packing of saturated tails → prevents rigidity. Acts as a fluidity buffer.', 16);

-- D2.3 Water Potential
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr17', 'D2.3 Water Potential', 'SL/HL', 'short_answer', 4, 'Outline the effects of placing plant tissue in a hypertonic solution. [4 marks]', '[1] Hypertonic solution has higher solute concentration / lower water potential than cell
[1] Water moves out of cell by osmosis (from higher Ψ inside to lower Ψ outside)
[1] Cell loses turgor / becomes flaccid
[1] With continued water loss: plasma membrane pulls away from cell wall = plasmolysis', 17),
  ('bio_wr18', 'D2.3 Water Potential', 'SL/HL', 'short_answer', 4, 'Compare the effect of osmosis on plant cells versus animal cells in a hypotonic solution. [4 marks]', '[1] Both: water enters by osmosis as external solution has higher Ψ / lower solute concentration
[1] Animal cell: no cell wall → cell swells uncontrollably → may burst (lyse)
[1] Plant cell: rigid cell wall prevents bursting; turgor pressure builds
[1] Plant cell becomes turgid — beneficial for structural support of soft tissues', 18),
  ('bio_wr19', 'D2.3 Water Potential', 'HL', 'short_answer', 3, 'A flaccid cell has Ψs = –0.7 MPa and Ψp = 0 MPa, placed in pure water (Ψ = 0). Predict water movement and final state. [3 marks]', '[1] Cell Ψ = Ψs + Ψp = –0.7 + 0 = –0.7 MPa; pure water Ψ = 0 MPa → water enters cell (higher Ψ to lower Ψ)
[1] Cell swells; turgor pressure (Ψp) increases, making Ψ less negative
[1] At equilibrium: cell Ψ = 0 MPa (Ψp = +0.7 MPa); cell is fully turgid', 19);

-- B2.3 Cell Specialization
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr20', 'B2.3 Cell Specialization', 'SL/HL', 'short_answer', 3, 'Distinguish between totipotent, pluripotent, and multipotent stem cells. [3 marks]', '[1] Totipotent: can differentiate into ALL cell types including extraembryonic (placenta); found in very early embryo
[1] Pluripotent: can form cells of all three germ layers but NOT extraembryonic tissue; e.g. embryonic stem cells
[1] Multipotent: limited to a specific tissue lineage; e.g. haematopoietic stem cells (blood cells)', 20),
  ('bio_wr21', 'B2.3 Cell Specialization', 'SL/HL', 'short_answer', 4, 'Explain why cells cannot grow beyond a certain size, using SA:Vol ratio. [4 marks]', '[1] As cell size increases, volume increases as r³ but surface area only as r²
[1] Therefore SA:Vol ratio decreases as the cell grows larger
[1] The cell membrane is responsible for exchange of gases, nutrients, and waste
[1] If too large: volume needing supplies exceeds the surface capacity → diffusion alone cannot meet metabolic demands', 21);

-- C4.2 Energy & Matter
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr22', 'C4.2 Energy & Matter', 'SL/HL', 'short_answer', 2, 'Distinguish between a carbon source and a carbon sink. Give one example of each. [2 marks]', '[1] Carbon source: releases more CO₂ than it absorbs (net release); e.g. fossil fuel combustion, deforestation
[1] Carbon sink: absorbs more CO₂ than it releases (net removal); e.g. tropical rainforest, peat bog, ocean', 22),
  ('bio_wr23', 'C4.2 Energy & Matter', 'SL/HL', 'short_answer', 3, 'Explain why food chains rarely have more than four or five trophic levels. [3 marks]', '[1] Approximately 90% of energy is lost at each trophic level (only ~10% transferred)
[1] Energy lost primarily as heat through cellular respiration / in indigestible material (faeces) / metabolic processes
[1] By level 4–5, so little energy remains that it cannot support a viable population of organisms', 23),
  ('bio_wr24', 'C4.2 Energy & Matter', 'SL/HL', 'short_answer', 4, 'Describe the role of decomposers in the carbon cycle and explain why they are essential. [4 marks]', '[1] Decomposers (bacteria and fungi) break down dead organic matter from all trophic levels
[1] They release CO₂ back into the atmosphere through their own cellular respiration
[1] They mineralise organic compounds, returning inorganic minerals/nutrients to the soil
[1] Without decomposers, nutrients would remain locked in dead matter; carbon would not be recycled; ecosystems would cease to function', 24),
  ('bio_wr25', 'C4.2 Energy & Matter', 'SL/HL', 'short_answer', 3, 'Analyse the Keeling Curve: describe the overall trend and explain seasonal fluctuations. [3 marks]', '[1] Overall trend: atmospheric CO₂ has increased from ~315 ppm (1958) to over 420 ppm; due to fossil fuel combustion / deforestation
[1] Seasonal dip: CO₂ decreases in spring/summer — Northern Hemisphere photosynthesis removes more CO₂ than respiration releases
[1] Seasonal rise: CO₂ increases in autumn/winter — decreased photosynthesis, increased decomposition/respiration adds CO₂', 25),
  ('bio_wr26', 'C4.2 Energy & Matter', 'SL/HL', 'short_answer', 2, 'Using the 10% rule, calculate energy available to tertiary consumers if producers fix 10,000,000 kJ. Show working. [2 marks]', '[1] Producers → T2: 1,000,000 kJ → T3: 100,000 kJ (each ×10%)
[1] T3 → T4 (tertiary consumers): 10% × 100,000 = 10,000 kJ', 26);

-- C1.3 Photosynthesis
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr27', 'C1.3 Photosynthesis', 'SL/HL', 'short_answer', 3, 'Explain why light intensity, CO₂ concentration, and temperature can all act as limiting factors for photosynthesis. [3 marks]', '[1] Light intensity: needed for light-dependent reactions (excite electrons, split water, produce ATP/NADPH); insufficient light limits these
[1] CO₂: substrate for carbon fixation by Rubisco in Calvin cycle; low CO₂ limits GP production
[1] Temperature: affects enzyme-catalysed reactions; too low slows them; too high denatures enzymes', 27),
  ('bio_wr28', 'C1.3 Photosynthesis', 'SL/HL', 'short_answer', 2, 'A student measures a pigment spot at 4.2 cm with solvent front at 7.0 cm. Calculate Rf and identify the pigment. [2 marks]', '[1] Rf = 4.2 ÷ 7.0 = 0.60
[1] Rf ~0.60 is consistent with chlorophyll a (typical Rf 0.59–0.65)', 28),
  ('bio_wr29', 'C1.3 Photosynthesis', 'SL/HL', 'short_answer', 3, 'Compare absorption and action spectra of chlorophyll. Explain differences. [3 marks]', '[1] Both show peaks at blue/violet (~430–450 nm) and red (~640–680 nm); both low in green region
[1] Action spectrum may show broader peaks and higher green-region values than chlorophyll absorption alone
[1] Because the action spectrum reflects ALL pigments present (carotenoids, xanthophylls, chlorophyll b also contribute)', 29),
  ('bio_wr30', 'C1.3 Photosynthesis', 'HL', 'short_answer', 4, 'Describe the light-dependent reactions from light absorption to ATP and NADPH production. [4 marks]', '[1] Light absorbed by PSII antenna pigments; energy transferred to P680, exciting electrons; photolysis of water replaces electrons, releasing O₂
[1] Excited electrons pass along the ETC (plastoquinone → cytochrome b6f → plastocyanin); energy pumps H⁺ into thylakoid lumen
[1] Light excites electrons in PSI (P700); NADP⁺ is reduced to NADPH using electrons and H⁺
[1] H⁺ gradient drives ATP synthesis via ATP synthase (chemiosmosis) as H⁺ flows from lumen to stroma', 30),
  ('bio_wr31', 'C1.3 Photosynthesis', 'HL', 'short_answer', 5, 'Describe the Calvin cycle including roles of CO₂, RuBP, ATP, and reduced NADP. Explain dependence on light reactions. [5 marks]', '[1] CO₂ fixed by Rubisco: CO₂ + RuBP (5C) → unstable 6C → 2 GP (3C)
[1] GP reduced using ATP and NADPH to produce triose phosphate (TP, 3C)
[1] Most TP (5/6) regenerates RuBP using ATP, maintaining the cycle
[1] Some TP (1/6) used to synthesise glucose, amino acids, fatty acids
[1] Calvin cycle requires ATP and NADPH from light-dependent reactions; without light, these are not replenished and the cycle stops', 31),
  ('bio_wr32', 'C1.3 Photosynthesis', 'HL', 'short_answer', 3, 'Explain how chemiosmosis produces ATP in the thylakoid membrane. [3 marks]', '[1] H⁺ accumulates in the thylakoid lumen from photolysis and ETC proton pumping
[1] This creates an electrochemical gradient (high H⁺ in lumen, low in stroma)
[1] H⁺ flows through ATP synthase from lumen to stroma; energy drives ADP + Pi → ATP', 32);

-- C1.2 Cell Respiration
INSERT OR IGNORE INTO biology_written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, sort_order) VALUES
  ('bio_wr33', 'C1.2 Cell Respiration', 'SL/HL', 'short_answer', 3, 'Explain the role of ATP in active transport across cell membranes. [3 marks]', '[1] Active transport moves substances against their concentration gradient, requiring energy
[1] ATP is hydrolysed to ADP + Pi; released energy drives conformational changes in pump proteins (e.g. Na⁺/K⁺ ATPase)
[1] This allows ions/molecules to be moved against their gradient across the membrane', 33),
  ('bio_wr34', 'C1.2 Cell Respiration', 'SL/HL', 'short_answer', 4, 'Compare aerobic and anaerobic respiration in humans: substrates, oxygen requirement, products, ATP yield. [4 marks]', '[1] Substrates: both use glucose; aerobic can also use fatty acids/amino acids
[1] Oxygen: aerobic requires O₂; anaerobic occurs without O₂
[1] Products: aerobic → CO₂ + H₂O; anaerobic → lactate
[1] ATP yield: aerobic ~30–32 per glucose; anaerobic net 2 per glucose (glycolysis only)', 34),
  ('bio_wr35', 'C1.2 Cell Respiration', 'HL', 'short_answer', 4, 'Describe glycolysis including inputs, outputs, and location. [4 marks]', '[1] Occurs in the cytoplasm of cells
[1] Glucose (6C) phosphorylated using 2 ATP (activation) and split into two 3C intermediates
[1] 3C intermediates oxidised to 2 pyruvate; 4 ATP produced (net 2 ATP per glucose)
[1] 2 NAD⁺ reduced to 2 NADH by accepting H atoms', 35),
  ('bio_wr36', 'C1.2 Cell Respiration', 'HL', 'short_answer', 3, 'Describe the link reaction and explain its significance. [3 marks]', '[1] Pyruvate (3C) moves into mitochondrial matrix; decarboxylated (CO₂ removed) and oxidised
[1] NAD⁺ reduced to NADH; 2C acetyl group combines with CoA → acetyl-CoA
[1] Significance: acetyl-CoA enters Krebs cycle; NADH carries electrons to ETC; links cytoplasmic glycolysis to mitochondrial aerobic pathways', 36),
  ('bio_wr37', 'C1.2 Cell Respiration', 'HL', 'short_answer', 5, 'Explain how the ETC and chemiosmosis produce ATP in aerobic respiration. [5 marks]', '[1] NADH and FADH₂ deliver electrons to protein complexes (I–IV) in the inner mitochondrial membrane
[1] Electrons pass along the chain from higher to lower energy; energy released pumps H⁺ from matrix to intermembrane space
[1] High H⁺ concentration builds up in IMS, creating an electrochemical gradient
[1] H⁺ flows through ATP synthase back into matrix; this drives ADP + Pi → ATP (chemiosmosis)
[1] O₂ accepts electrons and H⁺ at the end to form water; essential to keep electrons flowing', 37),
  ('bio_wr38', 'C1.2 Cell Respiration', 'HL', 'short_answer', 3, 'Explain why lipids yield more ATP per gram than carbohydrates. [3 marks]', '[1] Lipids hydrolysed to glycerol and fatty acids; fatty acids undergo beta-oxidation into acetyl-CoA units entering Krebs cycle
[1] Lipids have higher proportion of C–H bonds and fewer oxygen atoms (more reduced)
[1] More C–H bonds = more hydrogen atoms to reduce NAD⁺/FAD → more NADH/FADH₂ → more ATP via ETC per gram', 38),
  ('bio_wr39', 'C1.2 Cell Respiration', 'HL', 'short_answer', 3, 'Describe the roles of NAD⁺ in cell respiration and explain what happens when oxygen is unavailable. [3 marks]', '[1] NAD⁺ reduced to NADH during glycolysis, link reaction, and Krebs cycle by accepting H atoms from oxidation
[1] NADH donates electrons to ETC; energy drives proton pumping and ATP synthesis; NAD⁺ regenerated
[1] Without O₂: NADH cannot be oxidised (no terminal electron acceptor); NAD⁺ depleted; glycolysis stops unless NAD⁺ regenerated by converting pyruvate to lactate/ethanol', 39),
  ('bio_wr40', 'C1.2 Cell Respiration', 'HL', 'short_answer', 4, 'A student claims all ATP in aerobic respiration comes from the ETC. Evaluate this claim. [4 marks]', '[1] Glycolysis produces net 2 ATP per glucose by substrate-level phosphorylation (cytoplasm); Krebs cycle produces 2 ATP per glucose — these do NOT come from ETC
[1] However, the vast majority (~26–28 of ~30–32 total) is produced via ETC and chemiosmosis
[1] The claim is incorrect in absolute terms but correct in recognising ETC as the most productive stage
[1] Conclusion: most (not all) ATP comes from ETC; substrate-level phosphorylation contributes a small but non-zero amount', 40);
