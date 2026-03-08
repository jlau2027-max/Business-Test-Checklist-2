-- ============================================================
-- Chemistry Content Seed Data — Unit 9: Further Organic Chemistry
-- Syllabus: R3.3.1–3, R3.4.1/3/4, S3.2.8–11 (AHL)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', '#7C3AED'),
  ('S3.2.8 Mass Spectrometry Fragmentation', '#2563EB'),
  ('R3.3.2-3 Free Radical Substitution', '#059669'),
  ('S3.2.9 IR Spectroscopy', '#F97316'),
  ('R3.2.9-10 Oxidation & Reduction of Alcohols', '#DC2626'),
  ('S3.2.10-11 1H NMR Spectroscopy', '#0891B2');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('r3-3-1-bond-fiss', 'R3.3.1–2 / R3.4.1/3/4 — Bond Fission, Nucleophiles, Electrophiles & Radicals', '#7C3AED', '9', 53),
  ('s3-2-8-mass-spec', 'S3.2.8 — Mass Spectrometry Fragmentation (AHL)', '#2563EB', '9', 54),
  ('r3-3-2-free-rad', 'R3.3.2–3 — Free Radical Substitution', '#059669', '9', 55),
  ('s3-2-9-ir-spec', 'S3.2.9 — Infrared Spectroscopy (AHL)', '#F97316', '9', 56),
  ('r3-2-9-ox-red', 'R3.2.9–10 — Oxidation & Reduction of Alcohols', '#DC2626', '9', 57),
  ('s3-2-10-nmr', 'S3.2.10–11 — ¹H NMR Spectroscopy (AHL)', '#0891B2', '9', 58);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- Lesson 1 – Bond Fission, Nucleophiles, Electrophiles & Radicals
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-3-1-bond-fiss', 'Define a radical and explain why radicals are highly reactive', 1),
  ('r3-3-1-bond-fiss', 'Represent radicals using dot notation (e.g. •CH₃, •Cl)', 2),
  ('r3-3-1-bond-fiss', 'Distinguish between homolytic and heterolytic fission with equations', 3),
  ('r3-3-1-bond-fiss', 'Define nucleophile: donates both bonding electrons to form a new bond', 4),
  ('r3-3-1-bond-fiss', 'Define electrophile: accepts both bonding electrons from its reaction partner', 5),
  ('r3-3-1-bond-fiss', 'Classify species as nucleophile, electrophile, radical, or none (e.g. BF₃, NH₃, CH₄)', 6),
  ('r3-3-1-bond-fiss', 'Explain why species with more available lone pairs are better nucleophiles', 7),
  ('r3-3-1-bond-fiss', 'Explain why negatively charged species are stronger nucleophiles than neutral equivalents', 8),
  ('r3-3-1-bond-fiss', 'Draw and interpret full-headed curly arrows (heterolytic, electron pair movement)', 9),
  ('r3-3-1-bond-fiss', 'Draw and interpret half-headed (fish-hook) curly arrows (homolytic, single electron movement)', 10),
  ('r3-3-1-bond-fiss', 'Predict products from given curly arrow mechanisms', 11);

-- Lesson 2 – Mass Spectrometry Fragmentation
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-2-8-mass-spec', 'Explain how a mass spectrometer ionises and fragments organic molecules', 1),
  ('s3-2-8-mass-spec', 'Identify the molecular ion peak (M⁺) as the peak with highest m/z (excluding M+1)', 2),
  ('s3-2-8-mass-spec', 'Explain the M+1 peak (due to ¹³C isotope) and use it to estimate number of carbon atoms', 3),
  ('s3-2-8-mass-spec', 'Explain how isotope patterns reveal Cl or Br: monochloroalkane M:M+2 = 3:1, monobromo = 1:1', 4),
  ('s3-2-8-mass-spec', 'Identify the base peak as the most abundant ion (100% relative abundance)', 5),
  ('s3-2-8-mass-spec', 'Write the general fragmentation equation: M⁺• → X⁺ + Y• (cation detected, radical not)', 6),
  ('s3-2-8-mass-spec', 'Identify common fragment ions: CH₃⁺ (15), C₂H₅⁺ (29), CHO⁺ (29), CH₃CO⁺ (43), C₃H₇⁺ (43)', 7),
  ('s3-2-8-mass-spec', 'Use Table 22 (data booklet) to identify fragments lost from the molecular ion', 8),
  ('s3-2-8-mass-spec', 'Deduce structural features from a given MS fragmentation pattern', 9);

-- Lesson 3 – Free Radical Substitution
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-3-2-free-rad', 'List three features of a homologous series', 1),
  ('r3-3-2-free-rad', 'Explain the trend in boiling points of alkanes with increasing chain length', 2),
  ('r3-3-2-free-rad', 'Explain why branched alkanes have lower boiling points than straight-chain isomers', 3),
  ('r3-3-2-free-rad', 'Explain why alkanes are generally unreactive (non-polar C–H and C–C bonds)', 4),
  ('r3-3-2-free-rad', 'State the conditions required for free radical substitution (UV light or heat)', 5),
  ('r3-3-2-free-rad', 'Write the initiation step: Cl₂ → 2Cl• (homolytic fission with fish-hook arrows)', 6),
  ('r3-3-2-free-rad', 'Write the two propagation steps for CH₄ + Cl₂ (Cl• + CH₄ → •CH₃ + HCl; •CH₃ + Cl₂ → CH₃Cl + Cl•)', 7),
  ('r3-3-2-free-rad', 'Write three termination steps (radical + radical → stable molecule)', 8),
  ('r3-3-2-free-rad', 'Explain why a mixture of products forms (further substitution of CH₃Cl, CH₂Cl₂, CHCl₃, CCl₄)', 9),
  ('r3-3-2-free-rad', 'Apply free radical mechanism to ozone depletion by CFCs', 10);

-- Lesson 4 – Infrared Spectroscopy
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-2-9-ir-spec', 'Explain that IR absorption depends on bond strength and atomic mass', 1),
  ('s3-2-9-ir-spec', 'State that stronger bonds absorb at higher wavenumber (higher frequency)', 2),
  ('s3-2-9-ir-spec', 'Describe the three types of molecular vibration: symmetric stretching, asymmetric stretching, bending', 3),
  ('s3-2-9-ir-spec', 'Explain that only vibrations causing a change in dipole moment are IR active', 4),
  ('s3-2-9-ir-spec', 'Explain why homonuclear diatomic molecules (N₂, O₂) are IR inactive', 5),
  ('s3-2-9-ir-spec', 'Use Table 20 (data booklet) to identify functional groups from IR absorption peaks', 6),
  ('s3-2-9-ir-spec', 'Identify the broad O–H absorption (~2500–3300 cm⁻¹ for COOH, ~3200–3600 cm⁻¹ for alcohol)', 7),
  ('s3-2-9-ir-spec', 'Identify the C=O absorption (~1700–1750 cm⁻¹)', 8),
  ('s3-2-9-ir-spec', 'Explain the fingerprint region (500–1500 cm⁻¹) and its use in compound identification', 9),
  ('s3-2-9-ir-spec', 'Link greenhouse gas behaviour to IR activity and change in dipole moment', 10),
  ('s3-2-9-ir-spec', 'Distinguish between alcohols, aldehydes, ketones, and carboxylic acids using IR spectra', 11);

-- Lesson 5 – Oxidation & Reduction of Alcohols
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-2-9-ox-red', 'Classify alcohols as primary (1°), secondary (2°), or tertiary (3°)', 1),
  ('r3-2-9-ox-red', 'State the oxidising agent: acidified potassium dichromate (H⁺/Cr₂O₇²⁻) – orange to green', 2),
  ('r3-2-9-ox-red', 'Write the oxidation of a 1° alcohol to an aldehyde (distillation, excess alcohol)', 3),
  ('r3-2-9-ox-red', 'Write the oxidation of a 1° alcohol to a carboxylic acid (reflux, excess oxidising agent)', 4),
  ('r3-2-9-ox-red', 'Write the oxidation of a 2° alcohol to a ketone', 5),
  ('r3-2-9-ox-red', 'Explain why tertiary alcohols resist oxidation (no H on the C bearing the OH)', 6),
  ('r3-2-9-ox-red', 'Explain why ketones resist further oxidation (would require C–C bond cleavage)', 7),
  ('r3-2-9-ox-red', 'Distinguish distillation vs reflux apparatus and when each is used', 8),
  ('r3-2-9-ox-red', 'Write the reverse reductions: carboxylic acid → aldehyde → 1° alcohol; ketone → 2° alcohol', 9),
  ('r3-2-9-ox-red', 'Use [O] and [H] as shorthand for oxidising and reducing agents', 10),
  ('r3-2-9-ox-red', 'Combine MS + IR data to identify alcohols and their oxidation products', 11);

-- Lesson 6 – ¹H NMR Spectroscopy
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-2-10-nmr', 'Explain that ¹H NMR detects different chemical environments of hydrogen atoms', 1),
  ('s3-2-10-nmr', 'State that nuclei with odd mass numbers (e.g. ¹H, ¹³C) are NMR active', 2),
  ('s3-2-10-nmr', 'Explain shielding and deshielding in terms of electron density around the nucleus', 3),
  ('s3-2-10-nmr', 'Define chemical shift (δ) in ppm relative to TMS', 4),
  ('s3-2-10-nmr', 'List reasons TMS is used as the internal standard (12 equivalent shielded H, single peak, inert, low bp, δ = 0)', 5),
  ('s3-2-10-nmr', 'Explain why deuterated solvents (CDCl₃) are used (proton-free, no unwanted absorptions)', 6),
  ('s3-2-10-nmr', 'Determine the number of non-equivalent proton environments from a structure', 7),
  ('s3-2-10-nmr', 'Use integration traces to determine the ratio of protons in each environment', 8),
  ('s3-2-10-nmr', 'Use Table 21 (data booklet) to assign chemical shift values to proton environments', 9),
  ('s3-2-10-nmr', 'Interpret low-resolution spectra: number of peaks, integration ratio, chemical shift', 10),
  ('s3-2-10-nmr', 'Distinguish isomers (e.g. C₄H₈O carbonyl compounds, esters, carboxylic acids) using NMR data', 11);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u9-key-defs', 'Key Definitions', '#7C3AED', '9', 40),
  ('chem-u9-analytical', 'Analytical Techniques', '#2563EB', '9', 41),
  ('chem-u9-reactions', 'Organic Reactions', '#059669', '9', 42);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Key Definitions (6 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u9-key-defs', 'What is a radical?', 'A molecular entity with an unpaired electron. Highly reactive. Represented with a dot, e.g. •Cl, •CH₃.', NULL, 1),
  ('chem-u9-key-defs', 'What is homolytic fission?', 'Bond breaks so each fragment gets one electron. Produces two radicals. Requires UV light or heat.', NULL, 2),
  ('chem-u9-key-defs', 'What is heterolytic fission?', 'Bond breaks so both bonding electrons go to one fragment. Produces a cation and an anion.', NULL, 3),
  ('chem-u9-key-defs', 'What is a nucleophile?', 'A species that donates an electron pair to form a new bond with an electrophile. Examples: OH⁻, NH₃, H₂O, CN⁻.', NULL, 4),
  ('chem-u9-key-defs', 'What is an electrophile?', 'A species that accepts an electron pair from a nucleophile to form a new bond. Examples: H⁺, NO₂⁺, BF₃, Br⁺.', NULL, 5),
  ('chem-u9-key-defs', 'Full curly arrow vs half curly arrow?', 'Full arrow = movement of an electron pair (heterolytic). Half arrow (fish-hook) = movement of a single electron (homolytic).', NULL, 6);

-- Analytical Techniques (16 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u9-analytical', 'What does the molecular ion peak show?', 'The m/z of the intact molecule minus one electron (M⁺•). It gives the relative molecular mass.', NULL, 1),
  ('chem-u9-analytical', 'What is the base peak?', 'The most abundant ion in the mass spectrum (set to 100% relative abundance). It is the most stable fragment.', NULL, 2),
  ('chem-u9-analytical', 'Fragmentation equation?', 'M⁺• → X⁺ (detected) + Y• (radical, not detected). Bonds break at weaker points to form stable cations.', NULL, 3),
  ('chem-u9-analytical', 'How to detect Cl from MS?', 'Monochloroalkane: M:M+2 = 3:1 (due to ³⁵Cl 75% and ³⁷Cl 25%).', NULL, 4),
  ('chem-u9-analytical', 'How to detect Br from MS?', 'Monobromoalkane: M:M+2 = 1:1 (due to ⁷⁹Br and ⁸¹Br having nearly equal abundance).', NULL, 5),
  ('chem-u9-analytical', 'What does the M+1 peak indicate?', 'Presence of ¹³C. For every 1.1% of M+1 relative to M, one carbon atom is present.', NULL, 6),
  ('chem-u9-analytical', 'What makes a molecule IR active?', 'A vibration must cause a change in dipole moment. Homonuclear diatomics (N₂, O₂) are IR inactive.', NULL, 7),
  ('chem-u9-analytical', 'O–H absorption in IR?', 'Broad absorption: ~3200–3600 cm⁻¹ (alcohol), ~2500–3300 cm⁻¹ (carboxylic acid, very broad).', NULL, 8),
  ('chem-u9-analytical', 'C=O absorption in IR?', 'Sharp, strong absorption at ~1700–1750 cm⁻¹.', NULL, 9),
  ('chem-u9-analytical', 'What is the fingerprint region?', '500–1500 cm⁻¹. Unique to each compound. Used to confirm identity by matching against a reference library.', NULL, 10),
  ('chem-u9-analytical', 'Why do stronger bonds absorb at higher wavenumber?', 'More energy needed to vibrate a stronger bond, so a higher frequency (wavenumber) of IR radiation is absorbed.', NULL, 11),
  ('chem-u9-analytical', 'What does ¹H NMR tell you?', 'Number of different H environments (number of peaks), ratio of H atoms (integration), chemical environment (chemical shift δ).', NULL, 12),
  ('chem-u9-analytical', 'Why is TMS used as a reference?', '12 equivalent, highly shielded H atoms give single peak at δ=0. Inert, non-toxic, low boiling point, easily removed.', NULL, 13),
  ('chem-u9-analytical', 'What is chemical shift (δ)?', 'Position of an NMR signal in ppm relative to TMS. Deshielded protons (near electronegative groups) appear at higher δ (downfield).', NULL, 14),
  ('chem-u9-analytical', 'Shielding vs deshielding?', 'Shielded = high electron density around H → signal upfield (low δ). Deshielded = low electron density → signal downfield (high δ).', NULL, 15),
  ('chem-u9-analytical', 'Why use deuterated solvents?', 'CDCl₃, CCl₄ etc. are proton-free, avoiding unwanted NMR absorption signals from the solvent.', NULL, 16);

-- Organic Reactions (9 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u9-reactions', 'Conditions for free radical substitution?', 'UV light (or heat) + halogen (e.g. Cl₂ or Br₂). Occurs with alkanes.', NULL, 1),
  ('chem-u9-reactions', 'Three stages of free radical substitution?', '1) Initiation: Cl₂ → 2Cl•. 2) Propagation: Cl•+CH₄→•CH₃+HCl; •CH₃+Cl₂→CH₃Cl+Cl•. 3) Termination: two radicals combine.', NULL, 2),
  ('chem-u9-reactions', 'Why does a mixture of products form?', 'The organic product (e.g. CH₃Cl) can undergo further substitution to form CH₂Cl₂, CHCl₃, CCl₄.', NULL, 3),
  ('chem-u9-reactions', 'Why are alkanes unreactive?', 'C–C and C–H bonds are strong and non-polar/weakly polar, so they are not attacked by nucleophiles or electrophiles.', NULL, 4),
  ('chem-u9-reactions', '1° alcohol + H⁺/Cr₂O₇²⁻ (distillation)?', 'Produces an aldehyde (RCHO). The aldehyde is distilled off before further oxidation. Excess alcohol used.', NULL, 5),
  ('chem-u9-reactions', '1° alcohol + H⁺/Cr₂O₇²⁻ (reflux)?', 'Produces a carboxylic acid (RCOOH). Heated under reflux with excess oxidising agent.', NULL, 6),
  ('chem-u9-reactions', '2° alcohol + H⁺/Cr₂O₇²⁻?', 'Produces a ketone (RCOR''). Ketones resist further oxidation.', NULL, 7),
  ('chem-u9-reactions', 'Why don''t tertiary alcohols oxidise?', 'No hydrogen atom on the carbon bonded to the –OH group, so no H available to be removed by the oxidising agent.', NULL, 8),
  ('chem-u9-reactions', 'Colour change for dichromate oxidation?', 'Orange (Cr₂O₇²⁻) → green (Cr³⁺).', NULL, 9);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────

-- Lesson 1: Bond Fission & Reactive Species (SL/HL) — Q1-6
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-01', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'Which of the following best describes homolytic fission?',
   'Both bonding electrons go to one fragment',
   'Each fragment receives one bonding electron',
   'Electrons are transferred to a nucleophile',
   'A bond forms by sharing electron pairs',
   1, 'In homolytic fission, the bond breaks symmetrically so each fragment receives one electron, producing two radicals.', 141),

  ('chem-u9-mcq-02', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'A nucleophile is best described as a species that:',
   'Accepts an electron pair to form a bond',
   'Donates an electron pair to form a new bond',
   'Has an unpaired electron',
   'Is always negatively charged',
   1, 'A nucleophile donates an electron pair to form a new covalent bond with an electrophile.', 142),

  ('chem-u9-mcq-03', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'Which species can act as both a nucleophile and an electrophile?',
   'BF₃',
   'NH₃',
   'H₂O',
   'CH₄',
   2, 'H₂O has lone pairs (nucleophile) and can accept electrons via the H atoms (electrophile in some contexts).', 143),

  ('chem-u9-mcq-04', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'Which of the following is a radical?',
   'Cl⁻',
   'Cl⁺',
   '•Cl',
   'Cl₂',
   2, 'A radical is a species with an unpaired electron, represented by a dot notation such as •Cl.', 144),

  ('chem-u9-mcq-05', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'In heterolytic fission of C–Cl, the most likely products are:',
   'C• and Cl•',
   'C⁺ and Cl⁻',
   'C⁻ and Cl⁺',
   'C₂ and Cl₂',
   1, 'Cl is more electronegative so retains both electrons, forming Cl⁻, while the carbon becomes C⁺.', 145),

  ('chem-u9-mcq-06', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', '9',
   'Which is the strongest nucleophile?',
   'H₂O',
   'NH₃',
   'OH⁻',
   'CH₄',
   2, 'Negative charge increases lone pair availability, making OH⁻ a stronger nucleophile than neutral species.', 146);

-- Lesson 2: Mass Spectrometry Fragmentation (HL) — Q7-11
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-07', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', '9',
   'In a mass spectrum, the molecular ion peak represents:',
   'The most stable fragment',
   'The most abundant ion',
   'The intact molecule minus one electron',
   'The base peak',
   2, 'The molecular ion peak (M⁺•) shows the intact molecule that has lost one electron during ionisation.', 147),

  ('chem-u9-mcq-08', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', '9',
   'A compound shows M:M+2 peaks in ratio 1:1. This suggests the presence of:',
   'One chlorine atom',
   'One bromine atom',
   'Two chlorine atoms',
   'No halogens',
   1, '⁷⁹Br and ⁸¹Br have approximately equal natural abundance, giving an M:M+2 ratio of about 1:1.', 148),

  ('chem-u9-mcq-09', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', '9',
   'The base peak in a mass spectrum is defined as:',
   'The peak with the highest m/z value',
   'The peak with 100% relative abundance',
   'The molecular ion peak',
   'The M+1 peak',
   1, 'The base peak is the most abundant ion, set to 100% relative abundance in the spectrum.', 149),

  ('chem-u9-mcq-10', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', '9',
   'Fragmentation of the molecular ion produces:',
   'Two radicals',
   'A cation and a radical',
   'Two cations',
   'An anion and a cation',
   1, 'The molecular ion (M⁺•) fragments into a cation (X⁺, detected) and a radical (Y•, not detected).', 150),

  ('chem-u9-mcq-11', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', '9',
   'A peak at m/z = 43 in the mass spectrum of a ketone most likely corresponds to:',
   'CHO⁺',
   'CH₃CO⁺ (acylium ion)',
   'C₃H₇⁺',
   'CO₂⁺',
   1, 'In ketones, loss of a methyl or alkyl group commonly produces the acylium ion CH₃CO⁺ at m/z = 43.', 151);

-- Lesson 3: Free Radical Substitution (SL/HL) — Q12-15
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-12', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', '9',
   'Alkanes are generally unreactive because:',
   'They have strong ionic bonds',
   'C–H and C–C bonds are non-polar or weakly polar',
   'They are unsaturated',
   'They contain lone pairs',
   1, 'The C–H and C–C bonds in alkanes are strong and non-polar/weakly polar, so they are not attacked by nucleophiles or electrophiles.', 152),

  ('chem-u9-mcq-13', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', '9',
   'Which step in free radical substitution regenerates the radical?',
   'Initiation',
   'Propagation',
   'Termination',
   'All steps',
   1, 'Propagation steps regenerate the chain-carrying radical, allowing the chain reaction to continue.', 153),

  ('chem-u9-mcq-14', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', '9',
   'In the chlorination of methane, which is a termination step?',
   'Cl₂ → 2Cl•',
   'Cl• + CH₄ → •CH₃ + HCl',
   '•CH₃ + Cl• → CH₃Cl',
   '•CH₃ + Cl₂ → CH₃Cl + Cl•',
   2, 'Two radicals combine to form a stable product, ending the chain reaction.', 154),

  ('chem-u9-mcq-15', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', '9',
   'Free radical substitution of methane with excess Cl₂ produces a mixture because:',
   'Only one C–H bond can be broken',
   'The products undergo further substitution',
   'Termination stops after one step',
   'Methane is too stable to react fully',
   1, 'The initial product CH₃Cl can undergo further substitution to form CH₂Cl₂, CHCl₃, and CCl₄.', 155);

-- Lesson 4: IR Spectroscopy (HL) — Q16-20
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-16', 'S3.2.9 IR Spectroscopy', 'HL', '9',
   'Which molecule is NOT infrared active?',
   'H₂O',
   'CO₂',
   'N₂',
   'N₂O',
   2, 'N₂ is homonuclear and has no change in dipole moment during vibration, making it IR inactive.', 156),

  ('chem-u9-mcq-17', 'S3.2.9 IR Spectroscopy', 'HL', '9',
   'A broad absorption at ~3300 cm⁻¹ in an IR spectrum most likely indicates:',
   'C=O bond',
   'O–H bond in an alcohol',
   'C–H bond',
   'C≡C bond',
   1, 'The broad O–H absorption in alcohols appears at ~3200–3600 cm⁻¹.', 157),

  ('chem-u9-mcq-18', 'S3.2.9 IR Spectroscopy', 'HL', '9',
   'An absorption at ~1720 cm⁻¹ indicates the presence of:',
   'O–H group',
   'C=O group',
   'N–H group',
   'C=C group',
   1, 'The C=O bond gives a sharp, strong absorption at ~1700–1750 cm⁻¹.', 158),

  ('chem-u9-mcq-19', 'S3.2.9 IR Spectroscopy', 'HL', '9',
   'The fingerprint region of an IR spectrum is found at:',
   '3500–4000 cm⁻¹',
   '2000–2500 cm⁻¹',
   '500–1500 cm⁻¹',
   '1500–2000 cm⁻¹',
   2, 'The fingerprint region (500–1500 cm⁻¹) is unique to each compound and used for identification.', 159),

  ('chem-u9-mcq-20', 'S3.2.9 IR Spectroscopy', 'HL', '9',
   'Stronger bonds absorb IR radiation at:',
   'Lower wavenumber',
   'Higher wavenumber',
   'The same wavenumber as weak bonds',
   'Only in the fingerprint region',
   1, 'More energy is needed to vibrate a stronger bond, so a higher frequency (wavenumber) of IR radiation is absorbed.', 160);

-- Lesson 5: Oxidation & Reduction of Alcohols (SL/HL) — Q21-25
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-21', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', '9',
   'Oxidation of a primary alcohol under reflux with excess acidified dichromate produces:',
   'An aldehyde',
   'A ketone',
   'A carboxylic acid',
   'No reaction',
   2, 'Under reflux with excess oxidising agent, a primary alcohol is fully oxidised to a carboxylic acid.', 161),

  ('chem-u9-mcq-22', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', '9',
   'A secondary alcohol is oxidised to:',
   'An aldehyde',
   'A ketone',
   'A carboxylic acid',
   'A tertiary alcohol',
   1, 'Secondary alcohols are oxidised to ketones, which resist further oxidation.', 162),

  ('chem-u9-mcq-23', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', '9',
   'Tertiary alcohols resist oxidation because:',
   'They have no O–H group',
   'There is no hydrogen on the carbon bonded to OH',
   'They are too volatile',
   'They are already fully oxidised',
   1, 'Tertiary alcohols have no hydrogen on the carbon bearing the –OH group, so they cannot be oxidised.', 163),

  ('chem-u9-mcq-24', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', '9',
   'To obtain an aldehyde from a primary alcohol, the apparatus used is:',
   'Reflux',
   'Distillation',
   'Filtration',
   'Chromatography',
   1, 'The aldehyde is distilled off immediately to prevent further oxidation to a carboxylic acid.', 164),

  ('chem-u9-mcq-25', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', '9',
   'The colour change when acidified K₂Cr₂O₇ oxidises an alcohol is:',
   'Green to orange',
   'Orange to green',
   'Yellow to blue',
   'Colourless to purple',
   1, 'Dichromate ions (Cr₂O₇²⁻, orange) are reduced to Cr³⁺ ions (green) during the oxidation.', 165);

-- Lesson 6: ¹H NMR Spectroscopy (HL) — Q26-30
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u9-mcq-26', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', '9',
   'TMS is used as the internal standard in NMR because:',
   'It absorbs at a high chemical shift',
   'Its 12 equivalent protons give a single intense peak away from most organic signals',
   'It is a strong acid',
   'It has no hydrogen atoms',
   1, 'TMS has 12 equivalent, highly shielded protons producing a single peak at δ = 0, away from most organic signals.', 166),

  ('chem-u9-mcq-27', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', '9',
   'The number of peaks in a ¹H NMR spectrum indicates:',
   'The total number of hydrogen atoms',
   'The number of different chemical environments of hydrogen',
   'The molecular mass',
   'The number of carbon atoms',
   1, 'Each peak corresponds to a distinct chemical environment of hydrogen atoms in the molecule.', 167),

  ('chem-u9-mcq-28', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', '9',
   'Ethanol (CH₃CH₂OH) shows how many peaks in its low-resolution ¹H NMR spectrum?',
   '1',
   '2',
   '3',
   '4',
   2, 'Three different hydrogen environments: CH₃ (3H), CH₂ (2H), and OH (1H).', 168),

  ('chem-u9-mcq-29', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', '9',
   'A chemical shift of δ = 9–10 ppm in a ¹H NMR spectrum is characteristic of:',
   'R–CH₃ protons',
   'R–OH protons',
   'R–CHO (aldehyde) protons',
   'Ar–H protons',
   2, 'Aldehyde protons (R–CHO) are highly deshielded and resonate at δ = 9–10 ppm.', 169),

  ('chem-u9-mcq-30', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', '9',
   'Deuterated solvents are used in NMR to:',
   'Increase solubility',
   'Avoid unwanted proton signals from the solvent',
   'Reduce the boiling point',
   'Act as a reference standard',
   1, 'Deuterated solvents (e.g. CDCl₃) are proton-free, so they do not produce unwanted absorption signals.', 170);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

-- Bond Fission & Reactive Species (Q1-3, SL/HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-01', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', 'short_answer', '9', 4,
   'Define the terms homolytic fission and heterolytic fission. For each, draw a diagram showing the fission of a C–Cl bond, using appropriate curly arrows, and identify the products formed.',
   '• Homolytic fission: each bonding atom receives one electron [1]
• Diagram showing half-headed (fish-hook) arrows → C• and Cl• (two radicals) [1]
• Heterolytic fission: both bonding electrons go to one atom [1]
• Diagram showing full curly arrow from bond to Cl → C⁺ and Cl⁻ (cation and anion) [1]', 90),

  ('chem-u9-wr-02', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', 'short_answer', '9', 4,
   'Explain, with examples, the difference between a nucleophile and an electrophile. State one example of each and explain why it acts in that role.',
   '• Nucleophile: electron-pair donor that forms a bond with an electrophile [1]
• Example: OH⁻ – has lone pairs available to donate [1]
• Electrophile: electron-pair acceptor that forms a bond using electrons from a nucleophile [1]
• Example: H⁺/NO₂⁺ – electron-deficient / positively charged, attracted to electron-rich sites [1]', 91),

  ('chem-u9-wr-03', 'R3.3.1-2/R3.4.1/3/4 Bond Fission & Reactive Species', 'SL/HL', 'short_answer', '9', 2,
   'Explain why OH⁻ is a stronger nucleophile than H₂O.',
   '• OH⁻ has a negative charge / extra electron [1]
• Electron–electron repulsion pushes the lone pair further from the nucleus, making it more available for donation [1]', 92);

-- Mass Spectrometry (Q4-5, HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-04', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', 'short_answer', '9', 5,
   'The mass spectrum of butanone (CH₃COCH₂CH₃) shows peaks at m/z = 72, 57, 43, 29 and 15. Identify each peak and explain the fragmentation pattern.',
   '• m/z = 72: molecular ion peak M⁺• (C₄H₈O⁺•) [1]
• m/z = 57: loss of CH₃ (15) from molecular ion → C₃H₅O⁺ [1]
• m/z = 43: CH₃CO⁺ (acylium ion) – base peak – loss of C₂H₅ (29) [1]
• m/z = 29: C₂H₅⁺ or CHO⁺ [1]
• m/z = 15: CH₃⁺ [1]', 93),

  ('chem-u9-wr-05', 'S3.2.8 Mass Spectrometry Fragmentation', 'HL', 'short_answer', '9', 2,
   'A compound has a molecular ion peak at m/z = 78 with an M+2 peak of roughly equal intensity. Suggest what element is present and explain your reasoning.',
   '• Bromine is present [1]
• ⁷⁹Br and ⁸¹Br have approximately equal natural abundance, giving M:M+2 ≈ 1:1 [1]', 94);

-- Free Radical Substitution (Q6-7, SL/HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-06', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', 'short_answer', '9', 6,
   'Outline the mechanism for the free radical substitution of methane with chlorine, including initiation, propagation and termination steps. Use equations and fish-hook arrows where appropriate.',
   '• Initiation: Cl₂ → 2Cl• (UV light / homolytic fission) with fish-hook arrows [1]
• Propagation step 1: Cl• + CH₄ → •CH₃ + HCl [1]
• Propagation step 2: •CH₃ + Cl₂ → CH₃Cl + Cl• [1]
• Fish-hook arrows correctly shown in propagation [1]
• Termination: any two radicals combine, e.g. Cl• + Cl• → Cl₂ or •CH₃ + Cl• → CH₃Cl or •CH₃ + •CH₃ → C₂H₆ [1]
• Explanation that mixture of products forms due to further substitution of CH₃Cl [1]', 95),

  ('chem-u9-wr-07', 'R3.3.2-3 Free Radical Substitution', 'SL/HL', 'short_answer', '9', 3,
   'Explain why alkanes are considered to be generally unreactive.',
   '• C–C bonds are non-polar (equal electronegativity) [1]
• C–H bonds are only weakly polar [1]
• Therefore alkanes are not readily attacked by nucleophiles or electrophiles / no region of high or low electron density [1]', 96);

-- IR Spectroscopy (Q8-10, HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-08', 'S3.2.9 IR Spectroscopy', 'HL', 'short_answer', '9', 3,
   'Using water as an example, describe what happens at a molecular level during the absorption of infrared radiation.',
   '• Covalent bonds in H₂O vibrate (stretch and bend) [1]
• When the frequency of IR radiation matches the natural vibrational frequency of a bond, energy is absorbed [1]
• The vibration must cause a change in dipole moment for IR absorption to occur [1]', 97),

  ('chem-u9-wr-09', 'S3.2.9 IR Spectroscopy', 'HL', 'short_answer', '9', 3,
   'Compound B (C₃H₈O) shows a broad IR absorption at 3350 cm⁻¹. When oxidised, compound C does not show this absorption but instead absorbs at 1720 cm⁻¹. Explain what these results indicate about the structures of B and C.',
   '• Broad absorption at 3350 cm⁻¹ indicates an O–H bond / B is an alcohol [1]
• Absorption at 1720 cm⁻¹ indicates a C=O bond [1]
• B has been oxidised – the –OH group was converted to C=O / C is an aldehyde or ketone [1]', 98),

  ('chem-u9-wr-10', 'S3.2.9 IR Spectroscopy', 'HL', 'short_answer', '9', 3,
   'Explain why N₂ is IR inactive but CO₂ is IR active.',
   '• N₂ is homonuclear – symmetric stretching does not change the dipole moment (it is always zero) [1]
• CO₂: although the molecule has no permanent dipole, asymmetric stretching creates a temporary dipole moment [1]
• Only vibrations that change the dipole moment absorb IR radiation [1]', 99);

-- Oxidation & Reduction (Q11-12, SL/HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-11', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', 'short_answer', '9', 5,
   'Draw the two-step oxidation of ethanol with acidified potassium dichromate. State the conditions (apparatus) needed for each step and name all organic products.',
   '• Step 1: CH₃CH₂OH → CH₃CHO (ethanal) using H⁺/Cr₂O₇²⁻ [1]
• Apparatus: distillation (to remove aldehyde immediately) with excess ethanol [1]
• Step 2: CH₃CHO → CH₃COOH (ethanoic acid) using H⁺/Cr₂O₇²⁻ [1]
• Apparatus: reflux with excess oxidising agent [1]
• Colour change: orange dichromate to green Cr³⁺ ions [1]', 100),

  ('chem-u9-wr-12', 'R3.2.9-10 Oxidation & Reduction of Alcohols', 'SL/HL', 'short_answer', '9', 4,
   'Explain why propan-2-ol forms a ketone upon oxidation but does not oxidise further, while 2-methylpropan-2-ol does not oxidise at all under these conditions.',
   '• Propan-2-ol is a secondary alcohol; the carbon bearing –OH has one hydrogen [1]
• Oxidation removes this H and the H from –OH to form propanone (a ketone) [1]
• Ketones cannot be further oxidised without breaking a C–C bond, which these conditions cannot achieve [1]
• 2-methylpropan-2-ol is tertiary – no hydrogen on the carbon bonded to –OH, so oxidation cannot occur [1]', 101);

-- ¹H NMR Spectroscopy (Q13-15, HL)
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u9-wr-13', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', 'short_answer', '9', 3,
   'Explain what information can be obtained from a low-resolution ¹H NMR spectrum of an organic compound.',
   '• Number of peaks = number of different chemical environments of hydrogen atoms [1]
• Integration trace / relative areas under peaks = ratio of hydrogen atoms in each environment [1]
• Chemical shift (δ values) indicates the type of chemical environment (e.g. R–CH₃, R–OH, R–CHO) using data booklet Table 21 [1]', 102),

  ('chem-u9-wr-14', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', 'short_answer', '9', 3,
   'Three isomeric compounds with molecular formula C₄H₈O each show different low-resolution ¹H NMR spectra. Compound A shows 3 peaks with integration ratio 3:2:3. Compound B shows 3 peaks with ratio 6:1:1. Compound C shows 4 peaks with ratio 3:2:2:1. Identify compounds A, B and C.',
   '• A: butanone (CH₃COCH₂CH₃) – three environments: CH₃(3), CH₂(2), CH₃(3) [1]
• B: 2-methylpropanal ((CH₃)₂CHCHO) – three environments: 2×CH₃(6), CH(1), CHO(1) [1]
• C: butanal (CH₃CH₂CH₂CHO) – four environments: CH₃(3), CH₂(2), CH₂(2), CHO(1) [1]', 103),

  ('chem-u9-wr-15', 'S3.2.10-11 1H NMR Spectroscopy', 'HL', 'short_answer', '9', 4,
   'State four reasons why TMS is used as the internal standard in ¹H NMR spectroscopy.',
   '• 12 equivalent hydrogen atoms give a single, intense peak [1]
• Highly shielded H atoms – resonates upfield from almost all organic proton signals (δ = 0) [1]
• Chemically inert / non-toxic [1]
• Low boiling point so easily removed from sample after analysis [1]', 104);
