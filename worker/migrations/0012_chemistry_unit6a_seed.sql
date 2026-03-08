-- ============================================================
-- Chemistry Content Seed Data — Unit 6a: Redox & Transition Metals
-- Syllabus: R3.2, S3.1 (AHL), R3.4 (AHL), S3.1.10 (AHL)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('R3.2 Oxidation & Reduction', '#DC2626'),
  ('R3.2 Half-Equations', '#E11D48'),
  ('R3.2 Predicting Redox Behaviour', '#F97316'),
  ('S3.1 Transition Elements (AHL)', '#2563EB'),
  ('R3.4 Lewis Acids & Complex Ions (AHL)', '#7C3AED'),
  ('S3.1.10 Colour of Complexes (AHL)', '#0891B2'),
  ('Practical: Redox Titration', '#059669');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('r3-2-1-ox-red', 'R3.2.1 — Oxidation & Reduction Fundamentals', '#DC2626', '6a', 31),
  ('r3-2-2-half-eq', 'R3.2.2 — Half-Equations', '#E11D48', '6a', 32),
  ('r3-2-3-predict', 'R3.2.3 — Predicting Redox Behaviour', '#F97316', '6a', 33),
  ('s3-1-transition', 'S3.1.8–9 — Transition Elements (AHL)', '#2563EB', '6a', 34),
  ('r3-4-lewis-complex', 'R3.4.6–8 — Lewis Acids/Bases & Complex Ions (AHL)', '#7C3AED', '6a', 35),
  ('s3-1-10-colour', 'S3.1.10 — Colour of Complexes (AHL)', '#0891B2', '6a', 36),
  ('prac-redox-titr', 'Practical Skills — Redox Titration', '#059669', '6a', 37);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- R3.2.1 Oxidation & Reduction Fundamentals
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-2-1-ox-red', 'Define oxidation in four ways: loss of electrons, gain of oxygen, loss of hydrogen, increase in oxidation state', 1),
  ('r3-2-1-ox-red', 'Define reduction in four ways: gain of electrons, loss of oxygen, gain of hydrogen, decrease in oxidation state', 2),
  ('r3-2-1-ox-red', 'Explain that redox reactions involve simultaneous oxidation and reduction', 3),
  ('r3-2-1-ox-red', 'Distinguish between oxidation state (sign then number, e.g. +2) and ion charge (number then sign, e.g. 2+)', 4),
  ('r3-2-1-ox-red', 'Assign oxidation states to atoms in compounds and polyatomic ions using the standard rules', 5),
  ('r3-2-1-ox-red', 'Identify the oxidised species and reduced species in a reaction from oxidation-state changes', 6),
  ('r3-2-1-ox-red', 'Identify the oxidising agent (species that is itself reduced) and reducing agent (species that is itself oxidised)', 7),
  ('r3-2-1-ox-red', 'Apply redox concepts to organic chemistry: oxidation of alcohols by acidified K2Cr2O7', 8),
  ('r3-2-1-ox-red', 'Determine oxidation states of carbon in organic molecules (e.g. ethanol vs ethanoic acid)', 9);

-- R3.2.2 Half-Equations
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-2-2-half-eq', 'Write balanced half-equations showing electron loss (oxidation) or gain (reduction)', 1),
  ('r3-2-2-half-eq', 'Balance half-equations in neutral conditions (electrons, charges, atoms)', 2),
  ('r3-2-2-half-eq', 'Balance half-equations in acidic conditions using H+ and H2O', 3),
  ('r3-2-2-half-eq', 'Combine two half-equations into an overall redox equation (equalise electrons first)', 4),
  ('r3-2-2-half-eq', 'Apply half-equations to titration contexts, e.g. MnO4-/Fe2+', 5);

-- R3.2.3 Predicting Redox Behaviour
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-2-3-predict', 'Predict relative ease of oxidation of metals from their position in the periodic table (down a group = easier to oxidise)', 1),
  ('r3-2-3-predict', 'Predict relative ease of reduction of halogens (up Group 17 = stronger oxidising agent)', 2),
  ('r3-2-3-predict', 'Interpret metal/metal-ion displacement data to rank metals by reducing strength', 3),
  ('r3-2-3-predict', 'Explain how reactivity of alkali metals in water demonstrates reducing strength trends', 4),
  ('r3-2-3-predict', 'Explain how halogen/halide displacement reactions demonstrate oxidising strength trends', 5),
  ('r3-2-3-predict', 'Link ease of oxidation to ionisation energy values', 6);

-- S3.1.8-9 Transition Elements (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-transition', 'State the IUPAC definition of a transition element (incomplete d sub-shell in atom or ion)', 1),
  ('s3-1-transition', 'Explain why Sc and Zn are d-block but NOT transition elements (Sc3+ has no d electrons; Zn2+ has full d10)', 2),
  ('s3-1-transition', 'List characteristic properties: variable oxidation states, high melting points, paramagnetism, catalytic activity, coloured compounds, complex-ion formation', 3),
  ('s3-1-transition', 'Explain variable oxidation states via close successive ionisation energies', 4),
  ('s3-1-transition', 'Deduce electron configurations of first-row d-block ions (lose 4s electrons before 3d)', 5),
  ('s3-1-transition', 'Predict relative paramagnetism from number of unpaired d electrons', 6),
  ('s3-1-transition', 'Recall examples of transition-metal catalysts: Fe in Haber process, V2O5 in Contact process, Ni in hydrogenation, MnO2 in H2O2 decomposition', 7),
  ('s3-1-transition', 'Describe vanadium oxidation states: V2+ (purple), V3+ (green), VO2+ (blue), VO2+ (yellow)', 8);

-- R3.4.6-8 Lewis Acids/Bases & Complex Ions (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-4-lewis-complex', 'Define Lewis acid (electron-pair acceptor) and Lewis base (electron-pair donor)', 1),
  ('r3-4-lewis-complex', 'In complex-ion formation: metal ion = Lewis acid; ligand = Lewis base', 2),
  ('r3-4-lewis-complex', 'Define ligand: ion or molecule with a lone pair that forms a coordination (dative) bond to a metal ion', 3),
  ('r3-4-lewis-complex', 'Link nucleophile = Lewis base; electrophile = Lewis acid', 4),
  ('r3-4-lewis-complex', 'Draw Lewis diagrams showing coordination-bond formation (e.g. NH3 -> BF3)', 5),
  ('r3-4-lewis-complex', 'Deduce the charge on a complex ion from the metal-ion charge and ligand charges', 6),
  ('r3-4-lewis-complex', 'Name simple complexes: [Cu(H2O)6]2+, [CuCl4]2-, [Cu(NH3)4(H2O)2]2+', 7);

-- S3.1.10 Colour of Complexes (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-10-colour', 'Explain d-orbital splitting: in a complex ion the five d-orbitals split into two energy levels', 1),
  ('s3-1-10-colour', 'A d-d electron transition absorbs a photon of visible light whose energy equals delta-E', 2),
  ('s3-1-10-colour', 'Apply E = hf and c = f(lambda) to calculate wavelength/frequency of absorbed light', 3),
  ('s3-1-10-colour', 'Use a colour wheel to determine the complementary (observed) colour', 4),
  ('s3-1-10-colour', 'Explain why changing the ligand changes the colour (different ligand field -> different delta-E)', 5),
  ('s3-1-10-colour', 'Explain why d0 and d10 complexes are colourless (no d-d transitions possible)', 6);

-- Practical Skills - Redox Titration
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('prac-redox-titr', 'Describe the purpose and method of a redox titration using acidified KMnO4', 1),
  ('prac-redox-titr', 'Explain why KMnO4 acts as its own indicator (purple -> colourless, end point = faint pink)', 2),
  ('prac-redox-titr', 'Balance the half-equation: MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O', 3),
  ('prac-redox-titr', 'Perform stoichiometric calculations from titre data to find moles, molar mass, or water of crystallisation', 4),
  ('prac-redox-titr', 'Explain why the iron(II) salt should not be heated (to prevent oxidation to Fe3+)', 5);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u6a-redox-fund', 'R3.2 Oxidation & Reduction', '#DC2626', '6a', 29),
  ('chem-u6a-half-pred', 'R3.2 Half-Equations & Predictions', '#F97316', '6a', 30),
  ('chem-u6a-transition', 'S3.1 Transition Elements', '#2563EB', '6a', 31),
  ('chem-u6a-lewis', 'R3.4 Lewis Acids & Complex Ions', '#7C3AED', '6a', 32),
  ('chem-u6a-colour', 'S3.1.10 Colour of Complexes', '#0891B2', '6a', 33),
  ('chem-u6a-titration', 'Practical: Redox Titration', '#059669', '6a', 34);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- R3.2 Oxidation & Reduction
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-redox-fund', 'Define oxidation (4 ways)', 'Loss of electrons; gain of oxygen; loss of hydrogen; increase in oxidation state.', NULL, 1),
  ('chem-u6a-redox-fund', 'Define reduction (4 ways)', 'Gain of electrons; loss of oxygen; gain of hydrogen; decrease in oxidation state.', NULL, 2),
  ('chem-u6a-redox-fund', 'What is an oxidising agent?', 'A species that is itself reduced (gains electrons), causing another species to be oxidised.', NULL, 3),
  ('chem-u6a-redox-fund', 'What is a reducing agent?', 'A species that is itself oxidised (loses electrons), causing another species to be reduced.', NULL, 4),
  ('chem-u6a-redox-fund', 'Oxidation state vs ion charge notation?', 'Oxidation state: sign before number (+2). Ion charge: number before sign (2+).', NULL, 5),
  ('chem-u6a-redox-fund', 'Rules for assigning oxidation states', 'Elements = 0; monatomic ions = charge; O = -2 (except peroxides -1); H = +1 (except metal hydrides -1); sum in compound = 0; sum in ion = ion charge.', NULL, 6);

-- R3.2 Half-Equations & Predictions
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-half-pred', 'What is a half-equation?', 'An equation showing one half of a redox reaction — either the oxidation or the reduction process, with electrons explicitly shown.', NULL, 1),
  ('chem-u6a-half-pred', 'How to balance half-equations in acidic solution?', '1) Balance atoms other than O and H. 2) Balance O with H2O. 3) Balance H with H+. 4) Balance charge with e-.', NULL, 2),
  ('chem-u6a-half-pred', 'Reducing strength trend: Group 1 metals', 'Increases down the group (lower ionisation energy -> easier electron loss).', NULL, 3),
  ('chem-u6a-half-pred', 'Oxidising strength trend: Group 17', 'Increases up the group (higher electronegativity -> more readily gains electrons). F2 is strongest.', NULL, 4);

-- S3.1 Transition Elements
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-transition', 'IUPAC definition of transition element', 'An element whose atom has an incomplete d sub-shell, or which gives rise to cations with an incomplete d sub-shell.', NULL, 1),
  ('chem-u6a-transition', 'Why are Sc and Zn not transition elements?', 'Sc3+ has 0 d-electrons (empty d sub-shell); Zn2+ has 10 d-electrons (full d sub-shell). Neither has an incomplete d sub-shell in its common ion.', NULL, 2),
  ('chem-u6a-transition', 'Electron config rule for d-block ions?', 'Remove 4s electrons before 3d electrons. E.g. Fe = [Ar] 4s2 3d6, Fe2+ = [Ar] 3d6.', NULL, 3),
  ('chem-u6a-transition', '6 characteristic properties of transition elements', 'Variable oxidation states; high melting points; paramagnetism; catalytic activity; coloured compounds; complex-ion formation.', NULL, 4),
  ('chem-u6a-transition', 'Why do transition metals show variable oxidation states?', 'Successive ionisation energies are close in value, so multiple electrons can be removed.', NULL, 5),
  ('chem-u6a-transition', 'Vanadium oxidation-state colours', 'V2+ = purple; V3+ = green; VO2+ (V4+) = blue; VO2+ (V5+) = yellow.', NULL, 6),
  ('chem-u6a-transition', 'What causes paramagnetism?', 'Unpaired d-electrons. More unpaired electrons = stronger paramagnetism.', NULL, 7);

-- R3.4 Lewis Acids & Complex Ions
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-lewis', 'What is a Lewis acid?', 'An electron-pair acceptor.', NULL, 1),
  ('chem-u6a-lewis', 'What is a Lewis base?', 'An electron-pair donor.', NULL, 2),
  ('chem-u6a-lewis', 'What is a ligand?', 'An ion or molecule with a lone pair that forms a coordination (dative) bond to a central metal ion.', NULL, 3),
  ('chem-u6a-lewis', 'What is a coordination bond?', 'A covalent bond in which both electrons in the shared pair are donated by the same atom.', NULL, 4),
  ('chem-u6a-lewis', 'Link: nucleophile & electrophile to Lewis theory', 'Nucleophile = Lewis base (electron-pair donor); Electrophile = Lewis acid (electron-pair acceptor).', NULL, 5);

-- S3.1.10 Colour of Complexes
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-colour', 'Why are transition-metal complexes coloured?', 'd-orbitals split into two energy levels in a complex. d-d electron transitions absorb visible light; the complementary colour is observed.', NULL, 1),
  ('chem-u6a-colour', 'What determines which colour is absorbed?', 'delta-E between the split d-orbitals. E = hf and c = f(lambda) link delta-E to wavelength.', NULL, 2),
  ('chem-u6a-colour', 'Why are d0 and d10 complexes colourless?', 'No electrons available for d-d transitions (d0) or no vacancies to promote into (d10).', NULL, 3),
  ('chem-u6a-colour', 'Colour wheel: complementary of orange?', 'Blue.', NULL, 4),
  ('chem-u6a-colour', 'Colour wheel: complementary of yellow?', 'Violet.', NULL, 5);

-- Practical: Redox Titration
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u6a-titration', 'KMnO4 titration endpoint?', 'Faint persistent pink colour (excess MnO4- not reduced). KMnO4 is its own indicator.', NULL, 1),
  ('chem-u6a-titration', 'Balanced half-equation for MnO4- in acid?', 'MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O.', 'MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O', 2),
  ('chem-u6a-titration', 'Mole ratio: MnO4- to Fe2+?', '1 : 5 (MnO4- gains 5e-; each Fe2+ loses 1e-).', NULL, 3);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u6a-mcq-01', 'R3.2 Oxidation & Reduction', 'SL/HL', '6a',
   'Which statement correctly describes oxidation?',
   'Gain of electrons',
   'Decrease in oxidation state',
   'Loss of electrons',
   'Gain of hydrogen',
   2, 'Oxidation Is Loss of electrons (OIL RIG mnemonic).', 86),

  ('chem-u6a-mcq-02', 'R3.2 Oxidation & Reduction', 'SL/HL', '6a',
   'What is the oxidation state of Cr in K2Cr2O7?',
   '+3',
   '+6',
   '+7',
   '+12',
   1, '2(+1) + 2x + 7(-2) = 0, so 2 + 2x - 14 = 0, giving x = +6.', 87),

  ('chem-u6a-mcq-03', 'R3.2 Oxidation & Reduction', 'SL/HL', '6a',
   'In the reaction Zn(s) + Cu2+(aq) -> Zn2+(aq) + Cu(s), what is the reducing agent?',
   'Cu2+',
   'Zn2+',
   'Cu',
   'Zn',
   3, 'Zn is oxidised (loses electrons), so it is the reducing agent.', 88),

  ('chem-u6a-mcq-04', 'R3.2 Oxidation & Reduction', 'SL/HL', '6a',
   'Which species is the oxidising agent in: 2Al + 3F2 -> 2Al3+ + 6F-?',
   'Al',
   'F2',
   'Al3+',
   'F-',
   1, 'F2 gains electrons (is reduced), making it the oxidising agent.', 89),

  ('chem-u6a-mcq-05', 'R3.2 Predicting Redox Behaviour', 'SL/HL', '6a',
   'Going down Group 1, what happens to reducing strength of the metals?',
   'Decreases',
   'Stays the same',
   'Increases',
   'First increases then decreases',
   2, 'Lower ionisation energy down the group means electrons are lost more easily.', 90),

  ('chem-u6a-mcq-06', 'R3.2 Predicting Redox Behaviour', 'SL/HL', '6a',
   'Which halogen is the strongest oxidising agent?',
   'I2',
   'Br2',
   'Cl2',
   'F2',
   3, 'F2 has the highest electronegativity and gains electrons most readily.', 91),

  ('chem-u6a-mcq-07', 'S3.1 Transition Elements (AHL)', 'HL', '6a',
   'Why is Zn NOT classified as a transition element?',
   'It has no d electrons',
   'Its Zn2+ ion has a full d10 configuration',
   'It does not form coloured compounds only',
   'It has too many electrons',
   1, 'Zn2+ is [Ar] 3d10 — complete d sub-shell, so not a transition element.', 92),

  ('chem-u6a-mcq-08', 'S3.1 Transition Elements (AHL)', 'HL', '6a',
   'Which property is NOT characteristic of transition elements?',
   'Variable oxidation states',
   'Formation of coloured compounds',
   'Low melting points',
   'Catalytic activity',
   2, 'Transition metals typically have high melting points due to metallic bonding involving d electrons.', 93),

  ('chem-u6a-mcq-09', 'S3.1 Transition Elements (AHL)', 'HL', '6a',
   'What colour are V2+ ions in aqueous solution?',
   'Yellow',
   'Blue',
   'Green',
   'Purple',
   3, 'V2+ is purple; V3+ is green; VO2+ is blue; VO2+ is yellow.', 94),

  ('chem-u6a-mcq-10', 'R3.4 Lewis Acids & Complex Ions (AHL)', 'HL', '6a',
   'In a complex ion, the metal ion acts as a:',
   'Lewis base',
   'Lewis acid',
   'Bronsted acid',
   'Nucleophile',
   1, 'The metal ion accepts lone pairs from ligands, acting as a Lewis acid (electron-pair acceptor).', 95),

  ('chem-u6a-mcq-11', 'R3.4 Lewis Acids & Complex Ions (AHL)', 'HL', '6a',
   'What type of bond forms between a ligand and a central metal ion?',
   'Ionic bond',
   'Metallic bond',
   'Coordination (dative covalent) bond',
   'Hydrogen bond',
   2, 'The ligand donates both electrons in the bond -> coordination/dative bond.', 96),

  ('chem-u6a-mcq-12', 'R3.4 Lewis Acids & Complex Ions (AHL)', 'HL', '6a',
   'What is the charge on the complex ion formed from Fe3+ with 6 H2O ligands?',
   '0',
   '+1',
   '+2',
   '+3',
   3, 'H2O is neutral, so the complex charge equals the metal-ion charge: +3.', 97),

  ('chem-u6a-mcq-13', 'S3.1.10 Colour of Complexes (AHL)', 'HL', '6a',
   'Transition-metal complexes are coloured because:',
   'Electrons are promoted between split d-orbitals, absorbing visible light',
   'The metal reflects all visible light',
   'Ligands emit photons',
   'The d-orbitals are all degenerate',
   0, 'd-d transitions absorb specific wavelengths; the complementary colour is observed.', 98),

  ('chem-u6a-mcq-14', 'S3.1.10 Colour of Complexes (AHL)', 'HL', '6a',
   'If a complex absorbs orange light, what colour is observed?',
   'Red',
   'Yellow',
   'Blue',
   'Green',
   2, 'Orange and blue are complementary colours on the colour wheel.', 99),

  ('chem-u6a-mcq-15', 'R3.2 Half-Equations', 'SL/HL', '6a',
   'In the balanced half-equation MnO4- + 8H+ + 5e- -> Mn2+ + 4H2O, how many moles of Fe2+ react with 1 mol MnO4-?',
   '1',
   '2',
   '5',
   '8',
   2, 'Each Fe2+ loses 1 electron; MnO4- gains 5, so 5 mol Fe2+ per mol MnO4-.', 100),

  ('chem-u6a-mcq-16', 'R3.4 Lewis Acids & Complex Ions (AHL)', 'HL', '6a',
   'A nucleophile is best described as:',
   'An electron-pair acceptor',
   'An electron-pair donor that attacks an electron-deficient centre',
   'A species that gains protons',
   'A species that loses electrons to form cations',
   1, 'Nucleophile = Lewis base = electron-pair donor.', 101),

  ('chem-u6a-mcq-17', 'S3.1 Transition Elements (AHL)', 'HL', '6a',
   'Which electron configuration is correct for Fe2+?',
   '[Ar] 4s2 3d4',
   '[Ar] 3d6',
   '[Ar] 4s2 3d6',
   '[Ar] 3d5',
   1, 'Fe is [Ar] 4s2 3d6; Fe2+ loses the two 4s electrons first -> [Ar] 3d6.', 102),

  ('chem-u6a-mcq-18', 'S3.1 Transition Elements (AHL)', 'HL', '6a',
   'Why can transition metals exhibit variable oxidation states?',
   'They have full d sub-shells',
   'Their successive ionisation energies are very different',
   'Their successive ionisation energies are close in value',
   'They only lose s electrons',
   2, 'Close IEs mean multiple electrons can be removed without a huge energy jump.', 103),

  ('chem-u6a-mcq-19', 'Practical: Redox Titration', 'SL/HL', '6a',
   'In the permanganate titration, the endpoint is indicated by:',
   'A colour change from purple to blue',
   'A persistent faint pink colour in the flask',
   'A colour change from yellow to green',
   'The solution becoming colourless',
   1, 'Excess KMnO4 gives a faint pink that persists; no separate indicator needed.', 104),

  ('chem-u6a-mcq-20', 'R3.2 Oxidation & Reduction', 'SL/HL', '6a',
   'What is the oxidation state of vanadium in VO2+?',
   '+2',
   '+3',
   '+4',
   '+5',
   3, 'x + 2(-2) = +1, so x + (-4) = +1, giving x = +5.', 105);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u6a-wr-01', 'R3.2 Oxidation & Reduction', 'SL/HL', 'short_answer', '6a', 2,
   'Define oxidation and reduction in terms of electron transfer. [2]',
   'Oxidation is the loss of electrons [1]\nReduction is the gain of electrons [1]',
   56),

  ('chem-u6a-wr-02', 'R3.2 Oxidation & Reduction', 'SL/HL', 'short_answer', '6a', 2,
   'Deduce the oxidation state of Mn in KMnO4. Show your working. [2]',
   'K = +1, O = -2 [1]\n(+1) + x + 4(-2) = 0, so x = +7 [1]',
   57),

  ('chem-u6a-wr-03', 'R3.2 Oxidation & Reduction', 'SL/HL', 'short_answer', '6a', 4,
   'In the reaction: Sn2+(aq) + Ni(s) -> Sn(s) + Ni2+(aq), identify the oxidising agent and reducing agent. Justify your answer. [4]',
   'Reducing agent: Ni [1]\nNi is oxidised (loses electrons / oxidation state increases from 0 to +2) [1]\nOxidising agent: Sn2+ [1]\nSn2+ is reduced (gains electrons / oxidation state decreases from +2 to 0) [1]',
   58),

  ('chem-u6a-wr-04', 'R3.2 Half-Equations', 'SL/HL', 'short_answer', '6a', 3,
   'Balance the following half-equation in acidic solution: Cr2O7(2-) -> Cr3+. [3]',
   'Balance Cr: Cr2O7(2-) -> 2Cr3+ [1]\nBalance O with H2O, H with H+: Cr2O7(2-) + 14H+ -> 2Cr3+ + 7H2O [1]\nBalance charge with electrons: Cr2O7(2-) + 14H+ + 6e- -> 2Cr3+ + 7H2O [1]',
   59),

  ('chem-u6a-wr-05', 'R3.2 Predicting Redox Behaviour', 'SL/HL', 'short_answer', '6a', 3,
   'Explain why the reducing strength of Group 1 metals increases down the group. [3]',
   'Atomic radius increases down the group [1]\nOuter electron is further from the nucleus / more shielding [1]\nLess energy required to remove the outer electron (lower ionisation energy), so the metal is more easily oxidised / stronger reducing agent [1]',
   60),

  ('chem-u6a-wr-06', 'S3.1 Transition Elements (AHL)', 'HL', 'short_answer', '6a', 3,
   'Explain, with reference to electron configuration, why zinc is not considered a transition element. [3]',
   'Zn has electron configuration [Ar] 3d10 4s2 [1]\nZn2+ has configuration [Ar] 3d10 — a complete d sub-shell [1]\nA transition element must have an incomplete d sub-shell in the atom or a common ion; Zn2+ does not meet this criterion [1]',
   61),

  ('chem-u6a-wr-07', 'S3.1 Transition Elements (AHL)', 'HL', 'short_answer', '6a', 4,
   'Describe and explain the colour changes observed when zinc reduces a solution of ammonium vanadate(V) in acid. [4]',
   'Solution changes from yellow (VO2+, V in +5 state) [1]\nto blue (VO2+, V in +4 state) to green (V3+, V in +3 state) [1]\nto purple/violet (V2+, V in +2 state) [1]\nZinc acts as a reducing agent, donating electrons to vanadium ions which are successively reduced through each oxidation state [1]',
   62),

  ('chem-u6a-wr-08', 'R3.4 Lewis Acids & Complex Ions (AHL)', 'HL', 'short_answer', '6a', 4,
   'Explain what is meant by a Lewis acid and a Lewis base. Use the formation of [Cu(NH3)4(H2O)2]2+ to illustrate your answer. [4]',
   'Lewis acid = electron-pair acceptor [1]\nLewis base = electron-pair donor [1]\nCu2+ is the Lewis acid — it accepts lone pairs from the ligands [1]\nNH3 and H2O are Lewis bases / ligands — they donate lone pairs to form coordination bonds with Cu2+ [1]',
   63),

  ('chem-u6a-wr-09', 'S3.1.10 Colour of Complexes (AHL)', 'HL', 'short_answer', '6a', 4,
   'Explain why [Cu(H2O)6]2+ is coloured while [Zn(H2O)6]2+ is colourless. [4]',
   'In [Cu(H2O)6]2+, the d-orbitals split into two energy levels in the presence of ligands [1]\nCu2+ has a d9 configuration with an unpaired electron that can undergo a d-d transition, absorbing visible light [1]\nThe complementary colour of the absorbed light is observed [1]\nZn2+ has a d10 configuration — all d-orbitals are full, so no d-d transition is possible and no visible light is absorbed [1]',
   64),

  ('chem-u6a-wr-10', 'S3.1.10 Colour of Complexes (AHL)', 'HL', 'short_answer', '6a', 4,
   'A solution of [CuCl4]2- absorbs light of wavelength 601 nm. Calculate the energy of this transition. Deduce the colour observed. [4]',
   'f = c/lambda = (3.00 x 10^8) / (601 x 10^-9) = 4.99 x 10^14 s^-1 [1]\nE = hf = (6.63 x 10^-34)(4.99 x 10^14) = 3.31 x 10^-19 J [1]\n601 nm corresponds to orange light being absorbed [1]\nThe complementary colour (blue) is observed [1]',
   65),

  ('chem-u6a-wr-11', 'Practical: Redox Titration', 'SL/HL', 'short_answer', '6a', 6,
   'In a redox titration, 3.92 g of (NH4)2Fe(SO4)2.xH2O was dissolved and made up to 100.0 cm3. A 10.0 cm3 portion required 10.00 cm3 of 0.0200 mol/dm3 KMnO4. Determine the value of x. [6]',
   'Moles MnO4- = 0.0200 x (10.00/1000) = 2.00 x 10^-4 mol [1]\nRatio MnO4- : Fe2+ = 1 : 5, so moles Fe2+ in 10 cm3 = 5 x 2.00 x 10^-4 = 1.00 x 10^-3 mol [1]\nMoles Fe2+ in 100 cm3 = 1.00 x 10^-2 mol = moles of hydrated salt [1]\nMolar mass of hydrated salt = 3.92 / 0.0100 = 392 g/mol [1]\nM of anhydrous (NH4)2Fe(SO4)2 = 284; mass due to water = 392 - 284 = 108 g [1]\nx = 108 / 18 = 6 [1]',
   66),

  ('chem-u6a-wr-12', 'S3.1 Transition Elements (AHL)', 'HL', 'short_answer', '6a', 3,
   'Outline the role of a catalyst in the Haber process and explain how it functions at a molecular level. [3]',
   'The iron catalyst provides an alternative reaction pathway with a lower activation energy [1]\nThis increases the rate of reaction / increases the proportion of particles with energy >= Ea [1]\nThe iron is a transition metal that can use its d-orbitals / variable oxidation states to form temporary bonds with reactant molecules, weakening existing bonds [1]',
   67);
