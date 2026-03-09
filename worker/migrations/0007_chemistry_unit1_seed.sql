-- ============================================================
-- Chemistry Content Seed Data — Unit 1: Atomic Structure & Moles
-- Syllabus: S1.1, S1.2, S1.3, S1.4, R2.1 (including AHL)
-- ============================================================

-- Clear autoincrement tables to prevent duplicates on re-run
DELETE FROM chemistry_checklist_items;
DELETE FROM chemistry_flashcards;

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('S1.1 Particulate Nature of Matter', '#2563EB'),
  ('S1.2 The Nucleus', '#7C3AED'),
  ('S1.3 Electron Configuration', '#0891B2'),
  ('S1.4 The Mole', '#D97706'),
  ('R2.1 Stoichiometry', '#DC2626');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT OR IGNORE INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('s1-1-particulate', 'S1.1 — Particulate Nature of Matter', '#2563EB', '1', 1),
  ('s1-2-nucleus', 'S1.2 — The Nucleus', '#7C3AED', '1', 2),
  ('s1-3-electron-config', 'S1.3 — Electron Configuration', '#0891B2', '1', 3),
  ('s1-4-mole', 'S1.4 — The Mole', '#D97706', '1', 4),
  ('r2-1-stoichiometry', 'R2.1 — Stoichiometry', '#DC2626', '1', 5);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- S1.1 Particulate Nature of Matter
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-1-particulate', 'Define element, compound, and mixture and give examples of each', 1),
  ('s1-1-particulate', 'Distinguish between physical and chemical properties of elements, compounds, and mixtures', 2),
  ('s1-1-particulate', 'Explain kinetic molecular theory for solids, liquids, and gases', 3),
  ('s1-1-particulate', 'Describe changes of state (melting, boiling, freezing, condensation, sublimation, deposition)', 4),
  ('s1-1-particulate', 'Use state symbols (s), (l), (g), (aq) correctly in equations', 5),
  ('s1-1-particulate', 'Convert between Celsius and Kelvin (K = °C + 273.15)', 6),
  ('s1-1-particulate', 'Explain that temperature in Kelvin is a measure of average kinetic energy', 7),
  ('s1-1-particulate', 'Interpret heating/cooling curves and explain plateaux during changes of state', 8);

-- S1.2 The Nucleus
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-2-nucleus', 'Describe the structure of the atom: protons, neutrons, electrons', 1),
  ('s1-2-nucleus', 'Use nuclear notation ᴬ_Z X to find protons, neutrons, electrons', 2),
  ('s1-2-nucleus', 'Calculate protons, neutrons, and electrons for ions (cations and anions)', 3),
  ('s1-2-nucleus', 'Define isotopes and explain why isotopes have the same chemical properties', 4),
  ('s1-2-nucleus', 'Calculate relative atomic mass from isotopic masses and abundances', 5),
  ('s1-2-nucleus', '(AHL) Interpret a mass spectrum: identify isotopes and their relative abundances', 6),
  ('s1-2-nucleus', '(AHL) Calculate relative atomic mass from mass spectrum data', 7);

-- S1.3 Electron Configuration
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-3-electron-config', 'Describe emission spectra: how excited electrons emit photons', 1),
  ('s1-3-electron-config', 'Relate colour, wavelength, frequency, and energy across the EM spectrum (c = fλ, E = hf)', 2),
  ('s1-3-electron-config', 'Distinguish continuous spectrum from line spectrum', 3),
  ('s1-3-electron-config', 'Describe the hydrogen emission spectrum and the Lyman, Balmer, Paschen series', 4),
  ('s1-3-electron-config', 'Explain convergence of lines and link to ionisation', 5),
  ('s1-3-electron-config', 'State max electrons per energy level = 2n²', 6),
  ('s1-3-electron-config', 'Describe s, p, d, f sublevels and their relative energies', 7),
  ('s1-3-electron-config', 'Sketch the shapes of s and p orbitals', 8),
  ('s1-3-electron-config', 'Apply the Aufbau principle, Hund''s rule, and the Pauli exclusion principle', 9),
  ('s1-3-electron-config', 'Write full and condensed electron configurations for atoms and ions up to Z = 36', 10),
  ('s1-3-electron-config', 'Know the exceptions: Cr = [Ar] 3d⁵ 4s¹, Cu = [Ar] 3d¹⁰ 4s¹', 11),
  ('s1-3-electron-config', 'Write electron configurations for transition metal cations (remove 4s electrons first)', 12),
  ('s1-3-electron-config', '(AHL) Calculate first ionisation energy from the convergence limit (λ or f)', 13),
  ('s1-3-electron-config', '(AHL) Explain trends and discontinuities in first IE across a period', 14),
  ('s1-3-electron-config', '(AHL) Explain trend in first IE down a group', 15),
  ('s1-3-electron-config', '(AHL) Deduce group of an element from successive ionisation energy data', 16);

-- S1.4 The Mole
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-4-mole', 'Define the mole and state Avogadro''s constant (6.02 × 10²³ mol⁻¹)', 1),
  ('s1-4-mole', 'Convert between amount (mol), number of particles, and mass (n = m/M)', 2),
  ('s1-4-mole', 'Calculate relative formula mass Mᵣ from relative atomic masses', 3),
  ('s1-4-mole', 'Calculate percentage composition by mass of an element in a compound', 4),
  ('s1-4-mole', 'Determine empirical formula from mass or percentage composition data', 5),
  ('s1-4-mole', 'Determine molecular formula from empirical formula and molar mass', 6),
  ('s1-4-mole', 'Determine empirical formula from combustion data (indirect method)', 7),
  ('s1-4-mole', 'Find the value of n in a hydrated salt formula', 8);

-- R2.1 Stoichiometry
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-1-stoichiometry', 'Balance chemical equations including state symbols', 1),
  ('r2-1-stoichiometry', 'Use mole ratios to calculate reacting masses', 2),
  ('r2-1-stoichiometry', 'Convert between mass, moles, and number of particles in stoichiometry problems', 3);


-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u1-particulate', 'S1.1 Particulate Nature of Matter', '#2563EB', '1', 1),
  ('chem-u1-nucleus', 'S1.2 The Nucleus', '#7C3AED', '1', 2),
  ('chem-u1-electron', 'S1.3 Electron Configuration', '#0891B2', '1', 3),
  ('chem-u1-mole', 'S1.4 The Mole', '#D97706', '1', 4),
  ('chem-u1-stoich', 'R2.1 Stoichiometry', '#DC2626', '1', 5);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- S1.1 Particulate Nature of Matter
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u1-particulate', 'Element', 'A pure substance that cannot be broken down into simpler substances by chemical methods.', NULL, 1),
  ('chem-u1-particulate', 'Compound', 'A substance consisting of atoms of two or more different elements chemically bonded in a fixed ratio.', NULL, 2),
  ('chem-u1-particulate', 'Mixture', 'Two or more substances not chemically bonded, in no fixed ratio, separable by physical methods.', NULL, 3),
  ('chem-u1-particulate', 'Continuous spectrum', 'A spectrum containing all wavelengths across a range with no gaps.', NULL, 4),
  ('chem-u1-particulate', 'Line emission spectrum', 'A spectrum consisting of discrete coloured lines at specific wavelengths.', NULL, 5),
  ('chem-u1-particulate', 'K = °C + 273.15', 'Conversion from Celsius to Kelvin temperature scale.', 'K = °C + 273.15', 6),
  ('chem-u1-particulate', 'Hydrated salt', 'An ionic compound with water molecules incorporated into its crystal structure (e.g. CuSO₄·5H₂O).', NULL, 7),
  ('chem-u1-particulate', 'Anhydrous', 'A substance from which all water of crystallisation has been removed.', NULL, 8);

-- S1.2 The Nucleus
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u1-nucleus', 'Isotopes', 'Atoms of the same element with the same number of protons but different numbers of neutrons.', NULL, 1),
  ('chem-u1-nucleus', 'Relative atomic mass (Aᵣ)', 'Weighted average mass of all naturally occurring isotopes of an element relative to 1/12 the mass of carbon-12.', NULL, 2),
  ('chem-u1-nucleus', 'Atomic number (Z)', 'The number of protons in the nucleus of an atom.', NULL, 3),
  ('chem-u1-nucleus', 'Mass number (A)', 'The total number of protons and neutrons (nucleons) in the nucleus.', NULL, 4);

-- S1.3 Electron Configuration
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u1-electron', 'Electron configuration', 'The distribution of electrons among available energy levels and sublevels.', NULL, 1),
  ('chem-u1-electron', 'Convergence limit', 'The point in a line spectrum where lines merge; corresponds to ionisation energy.', NULL, 2),
  ('chem-u1-electron', 'First ionisation energy', 'Energy required to remove one mole of electrons from one mole of gaseous atoms to form 1 mol of gaseous unipositive ions.', NULL, 3),
  ('chem-u1-electron', 'Successive ionisation energies', 'Energies for removing electrons one at a time from an atom.', NULL, 4),
  ('chem-u1-electron', 'Aufbau principle', 'Electrons fill orbitals starting from the lowest energy level first.', NULL, 5),
  ('chem-u1-electron', 'Hund''s rule', 'Electrons occupy degenerate orbitals singly with parallel spins before pairing.', NULL, 6),
  ('chem-u1-electron', 'Pauli exclusion principle', 'No two electrons in an atom can have the same set of four quantum numbers; max 2 electrons per orbital with opposite spins.', NULL, 7),
  ('chem-u1-electron', 'Orbital', 'A region of space where there is a high probability of finding an electron; holds max 2 electrons.', NULL, 8),
  ('chem-u1-electron', 'Sublevel (subshell)', 'A subdivision of a main energy level (s, p, d, f) with slightly different energies.', NULL, 9),
  ('chem-u1-electron', 'Electromagnetic spectrum', 'The full range of EM radiation: radio waves, microwaves, IR, visible, UV, X-rays, gamma rays.', NULL, 10);

-- S1.4 The Mole
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u1-mole', 'Mole', 'The SI unit of amount of substance; one mole contains exactly 6.02 × 10²³ entities.', NULL, 1),
  ('chem-u1-mole', 'Avogadro constant (Nₐ)', '6.02 × 10²³ mol⁻¹; the number of entities in one mole.', 'Nₐ = 6.02 × 10²³ mol⁻¹', 2),
  ('chem-u1-mole', 'Molar mass (M)', 'The mass of one mole of a substance, in g mol⁻¹; numerically equal to Mᵣ.', NULL, 3),
  ('chem-u1-mole', 'Empirical formula', 'The simplest whole-number ratio of atoms of each element in a compound.', NULL, 4),
  ('chem-u1-mole', 'Molecular formula', 'The actual number of atoms of each element present in one molecule.', NULL, 5),
  ('chem-u1-mole', 'c = fλ', 'Speed of light = frequency × wavelength (c = 3.00 × 10⁸ m s⁻¹).', 'c = fλ', 6),
  ('chem-u1-mole', 'E = hf', 'Energy of a photon = Planck''s constant × frequency (h = 6.63 × 10⁻³⁴ J s).', 'E = hf', 7),
  ('chem-u1-mole', 'n = m / M', 'Amount in moles = mass (g) / molar mass (g mol⁻¹).', 'n = m / M', 8);


-- ─── MCQ QUESTIONS ───────────────────────────────────────────

INSERT OR IGNORE INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u1-mcq-01', 'S1.1 Particulate Nature of Matter', 'SL/HL', '1',
   'Which statement correctly distinguishes an element from a compound?',
   'An element contains atoms bonded in a fixed ratio.',
   'A compound can be separated by physical methods.',
   'An element cannot be broken down into simpler substances by chemical means.',
   'A compound contains only one type of atom.',
   2,
   'Elements are the simplest pure substances; compounds contain two or more elements chemically bonded in a fixed ratio.',
   1),

  ('chem-u1-mcq-02', 'S1.1 Particulate Nature of Matter', 'SL/HL', '1',
   'What is 25 °C expressed in Kelvin?',
   '248.15 K',
   '298.15 K',
   '298 K',
   '373.15 K',
   1,
   'K = °C + 273.15 = 25 + 273.15 = 298.15 K.',
   2),

  ('chem-u1-mcq-03', 'S1.2 The Nucleus', 'SL/HL', '1',
   'How many neutrons are in ⁵⁶₂₆Fe?',
   '26',
   '30',
   '56',
   '82',
   1,
   'Neutrons = mass number − atomic number = 56 − 26 = 30.',
   3),

  ('chem-u1-mcq-04', 'S1.2 The Nucleus', 'SL/HL', '1',
   'Isotopes of the same element differ in their number of:',
   'protons',
   'electrons',
   'neutrons',
   'electron shells',
   2,
   'Isotopes have the same number of protons but different numbers of neutrons.',
   4),

  ('chem-u1-mcq-05', 'S1.2 The Nucleus', 'SL/HL', '1',
   'An element has two isotopes: ⁶³X (69.2%) and ⁶⁵X (30.8%). What is the relative atomic mass?',
   '63.0',
   '63.6',
   '64.0',
   '64.4',
   1,
   'Aᵣ = (63 × 69.2 + 65 × 30.8) / 100 = (4359.6 + 2002.0) / 100 = 63.6.',
   5),

  ('chem-u1-mcq-06', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'Which colour of visible light has the highest energy per photon?',
   'Red',
   'Yellow',
   'Green',
   'Violet',
   3,
   'Violet has the shortest wavelength (≈400 nm) and therefore the highest frequency and energy (E = hf).',
   6),

  ('chem-u1-mcq-07', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'The visible lines in the hydrogen emission spectrum correspond to electron transitions down to:',
   'n = 1 (Lyman)',
   'n = 2 (Balmer)',
   'n = 3 (Paschen)',
   'n = 4 (Brackett)',
   1,
   'The Balmer series (transitions to n = 2) produces lines in the visible region.',
   7),

  ('chem-u1-mcq-08', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'What is the maximum number of electrons that can occupy the third main energy level (n = 3)?',
   '2',
   '8',
   '18',
   '32',
   2,
   'Max electrons = 2n² = 2(3)² = 18.',
   8),

  ('chem-u1-mcq-09', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'What is the electron configuration of Cr (Z = 24)?',
   '[Ar] 3d⁴ 4s²',
   '[Ar] 3d⁵ 4s¹',
   '[Ar] 3d⁶',
   '[Ar] 3d³ 4s² 4p¹',
   1,
   'Chromium is an exception: a half-filled 3d subshell (3d⁵) is energetically favourable.',
   9),

  ('chem-u1-mcq-10', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'What is the electron configuration of Fe³⁺?',
   '[Ar] 3d⁵',
   '[Ar] 3d⁶ 4s²',
   '[Ar] 3d³ 4s²',
   '[Ar] 3d⁴ 4s¹',
   0,
   'Fe is [Ar] 3d⁶ 4s². Remove 4s electrons first, then one 3d → [Ar] 3d⁵.',
   10),

  ('chem-u1-mcq-11', 'S1.4 The Mole', 'SL/HL', '1',
   'What amount of O₂ (in moles) contains 1.8 × 10²² molecules?',
   '0.0030',
   '0.030',
   '0.30',
   '3.0',
   1,
   'n = N / Nₐ = 1.8 × 10²² / 6.02 × 10²³ = 0.030 mol.',
   11),

  ('chem-u1-mcq-12', 'S1.4 The Mole', 'SL/HL', '1',
   'How many hydrogen atoms are in one mole of ethanol, C₂H₅OH?',
   '5',
   '6',
   '1.0 × 10²³',
   '3.6 × 10²⁴',
   3,
   'C₂H₅OH has 6 H atoms per molecule. 6 × 6.02 × 10²³ = 3.6 × 10²⁴.',
   12),

  ('chem-u1-mcq-13', 'S1.4 The Mole', 'SL/HL', '1',
   'How many oxygen atoms are present in 0.0500 mol of CO₂?',
   '3.01 × 10²²',
   '6.02 × 10²²',
   '6.02 × 10²³',
   '1.20 × 10²⁴',
   1,
   '0.0500 mol CO₂ = 0.100 mol O atoms. 0.100 × 6.02 × 10²³ = 6.02 × 10²².',
   13),

  ('chem-u1-mcq-14', 'S1.4 The Mole', 'SL/HL', '1',
   'Which of the following contains the greatest number of molecules?',
   '1 g of CH₃Cl (M = 50.49)',
   '1 g of CH₂Cl₂ (M = 84.93)',
   '1 g of CHCl₃ (M = 119.37)',
   '1 g of CCl₄ (M = 153.81)',
   0,
   'The lightest molecule gives the most moles per gram: 1/50.49 is the largest value.',
   14),

  ('chem-u1-mcq-15', 'S1.4 The Mole', 'SL/HL', '1',
   'The empirical formula of a compound with 40.0% C, 6.7% H, and 53.3% O is:',
   'CHO',
   'CH₂O',
   'C₂H₄O₂',
   'C₃H₆O₃',
   1,
   'C: 40.0/12.01 = 3.33; H: 6.7/1.01 = 6.63; O: 53.3/16.00 = 3.33. Ratio = 1:2:1 → CH₂O.',
   15),

  ('chem-u1-mcq-16', 'S1.4 The Mole', 'SL/HL', '1',
   'A compound has the empirical formula CH₂O and Mᵣ = 180. Its molecular formula is:',
   'C₂H₄O₂',
   'C₄H₈O₄',
   'C₆H₁₂O₆',
   'C₃H₆O₃',
   2,
   'Empirical mass = 12.01 + 2.02 + 16.00 = 30.03. 180/30.03 ≈ 6. Molecular formula = C₆H₁₂O₆.',
   16),

  ('chem-u1-mcq-17', 'R2.1 Stoichiometry', 'SL/HL', '1',
   'What mass of O₂ reacts with 192 g of Mg? (2 Mg + O₂ → 2 MgO)',
   '64 g',
   '128 g',
   '192 g',
   '256 g',
   1,
   'n(Mg) = 192/24.31 ≈ 7.90 mol. Ratio 2:1 → n(O₂) = 3.95 mol. m = 3.95 × 32.00 = 126 g ≈ 128 g.',
   17),

  ('chem-u1-mcq-18', 'S1.3 Electron Configuration', 'SL/HL', '1',
   'Which sublevel is being filled across the elements Sc to Zn?',
   '3p',
   '4s',
   '3d',
   '4p',
   2,
   'Sc to Zn are the first-row d-block elements, filling the 3d subshell.',
   18),

  ('chem-u1-mcq-19', 'S1.3 Electron Configuration', 'HL', '1',
   '(AHL) Which factor does NOT explain the general increase in first IE across a period?',
   'Increasing nuclear charge',
   'Increasing number of electron shells',
   'Electrons entering the same shell experience similar shielding',
   'Increasing effective nuclear charge',
   1,
   'The number of electron shells stays the same across a period; it increases down a group.',
   19),

  ('chem-u1-mcq-20', 'S1.3 Electron Configuration', 'HL', '1',
   '(AHL) The first IE of S (1000 kJ mol⁻¹) is less than that of P (1060 kJ mol⁻¹) because:',
   'S has more protons than P.',
   'The 3p⁴ configuration of S involves electron pairing, increasing repulsion.',
   'P has a larger atomic radius.',
   'S has fewer electrons than P.',
   1,
   'P has a half-filled 3p³ (extra stability). In S, the fourth 3p electron is paired, causing electron-electron repulsion, making it easier to remove.',
   20);


-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

INSERT OR IGNORE INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u1-wr-01a', 'S1.2 The Nucleus', 'SL/HL', 'short_answer', '1', 1,
   '(a) Define the term isotope.',
   '[1] Atoms of the same element with the same number of protons / atomic number but different numbers of neutrons / mass number.',
   1),

  ('chem-u1-wr-01b', 'S1.2 The Nucleus', 'SL/HL', 'short_answer', '1', 2,
   '(b) Chlorine has two isotopes: ³⁵Cl (75.77%) and ³⁷Cl (24.23%). Calculate the relative atomic mass of chlorine to two decimal places.',
   '[1] Aᵣ = (35 × 75.77 + 37 × 24.23) / 100
[1] = (2651.95 + 896.51) / 100 = 35.48',
   2),

  ('chem-u1-wr-02', 'S1.3 Electron Configuration', 'SL/HL', 'short_answer', '1', 1,
   'State how a line emission spectrum differs from a continuous spectrum.',
   '[1] A line spectrum consists of discrete / separate lines (at specific wavelengths), whereas a continuous spectrum contains all wavelengths with no gaps.',
   3),

  ('chem-u1-wr-03', 'S1.3 Electron Configuration', 'SL/HL', 'short_answer', '1', 2,
   'Explain how the formation of lines in a hydrogen emission spectrum provides evidence for the existence of discrete energy levels in atoms.',
   '[1] Electrons in excited states fall / transition to lower energy levels, emitting photons.
[1] The photons have specific / discrete frequencies/energies → only specific energy transitions are possible → energy levels are quantised.',
   4),

  ('chem-u1-wr-04', 'S1.3 Electron Configuration', 'SL/HL', 'short_answer', '1', 2,
   'Draw four lines on an energy-level diagram to represent the electron transitions that produce the four visible lines in hydrogen''s emission spectrum. Explain the difference between the transition producing a red line and a violet line.',
   '[1] Four downward arrows from n = 3, 4, 5, 6 to n = 2.
[1] The red line corresponds to a smaller energy transition (n = 3 → 2) and the violet line to a larger energy transition (n = 6 → 2). Larger ΔE → higher frequency → shorter wavelength.',
   5),

  ('chem-u1-wr-05', 'S1.3 Electron Configuration', 'HL', 'short_answer', '1', 3,
   '(AHL) The convergence limit of the Lyman series of hydrogen has a wavelength of 91.2 nm. Calculate the first ionisation energy of hydrogen in kJ mol⁻¹.',
   '[1] E = hc / λ = (6.63 × 10⁻³⁴ × 3.00 × 10⁸) / (91.2 × 10⁻⁹) = 2.18 × 10⁻¹⁸ J
[1] Convert to kJ: 2.18 × 10⁻¹⁸ / 1000 = 2.18 × 10⁻²¹ kJ
[1] Multiply by Nₐ: 2.18 × 10⁻²¹ × 6.02 × 10²³ = 1310 kJ mol⁻¹ (accept 1312)',
   6),

  ('chem-u1-wr-06', 'S1.3 Electron Configuration', 'SL/HL', 'short_answer', '1', 3,
   'State the full electron configuration of: (a) Fe (Z = 26) [1] (b) Fe³⁺ [1] (c) Cu (Z = 29) [1]',
   '[1] (a) Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²
[1] (b) Fe³⁺: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵ (remove 4s² first, then one 3d electron)
[1] (c) Cu: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s¹ (exception: full 3d preferred)',
   7),

  ('chem-u1-wr-07', 'S1.3 Electron Configuration', 'HL', 'short_answer', '1', 3,
   '(AHL) Explain why the first ionisation energy of aluminium (577 kJ mol⁻¹) is less than that of magnesium (736 kJ mol⁻¹).',
   '[1] Mg has electron configuration [Ne] 3s²; Al has [Ne] 3s² 3p¹.
[1] The outermost electron in Al is in a 3p orbital, which is higher in energy / further from the nucleus than the 3s orbital of Mg.
[1] The 3p electron in Al is shielded by the 3s² electrons, so it experiences a lower effective nuclear charge and is easier to remove.',
   8),

  ('chem-u1-wr-08', 'S1.3 Electron Configuration', 'HL', 'short_answer', '1', 3,
   '(AHL) Explain why the first ionisation energy of sulfur (1000 kJ mol⁻¹) is less than that of phosphorus (1060 kJ mol⁻¹).',
   '[1] P has electron configuration [Ne] 3s² 3p³ (half-filled p subshell); S has [Ne] 3s² 3p⁴.
[1] In S, one 3p orbital contains a pair of electrons; the electron-electron repulsion between paired electrons makes one of them easier to remove.
[1] The half-filled 3p³ configuration in P has extra stability / exchange energy.',
   9),

  ('chem-u1-wr-09', 'S1.4 The Mole', 'SL/HL', 'short_answer', '1', 2,
   'Calculate the number of moles of substance in: (a) 72.0 g of Mg [1] (b) 0.0960 g of H₂SO₄ [1]',
   '[1] (a) n = 72.0 / 24.31 = 2.96 mol
[1] (b) M(H₂SO₄) = 2(1.01) + 32.07 + 4(16.00) = 98.09; n = 0.0960 / 98.09 = 9.79 × 10⁻⁴ mol',
   10),

  ('chem-u1-wr-10', 'S1.4 The Mole', 'SL/HL', 'short_answer', '1', 4,
   '0.43 g of compound X (containing C, H, and O only) is burned in excess oxygen, producing 1.10 g of CO₂ and 0.45 g of H₂O. Determine the empirical formula of X. Given Mᵣ = 86, find its molecular formula.',
   '[1] n(CO₂) = 1.10/44.01 = 0.0250 mol → n(C) = 0.0250 mol → mass C = 0.300 g
[1] n(H₂O) = 0.45/18.02 = 0.0250 mol → n(H) = 0.0500 mol → mass H = 0.050 g
[1] Mass O = 0.43 − 0.300 − 0.050 = 0.080 g → n(O) = 0.080/16.00 = 0.0050 mol. Ratio C:H:O = 0.025:0.050:0.005 = 5:10:1. Empirical formula = C₅H₁₀O.
[1] Empirical mass = 5(12.01)+10(1.01)+16.00 = 86.15 ≈ 86 → molecular formula = C₅H₁₀O.',
   11),

  ('chem-u1-wr-11', 'R2.1 Stoichiometry', 'SL/HL', 'short_answer', '1', 2,
   'What mass of carbon dioxide is produced when 5.6 g of butene (C₄H₈) is burned? (C₄H₈ + 6O₂ → 4CO₂ + 4H₂O)',
   '[1] n(C₄H₈) = 5.6 / 56.11 = 0.100 mol. From stoichiometry: n(CO₂) = 4 × 0.100 = 0.400 mol.
[1] m(CO₂) = 0.400 × 44.01 = 17.6 g.',
   12),

  ('chem-u1-wr-12', 'S1.3 Electron Configuration', 'HL', 'short_answer', '1', 2,
   '(AHL) The successive ionisation energies of an element X (in kJ mol⁻¹) are: 578, 1817, 2745, 11578, 14831, 18378. Deduce the group of element X, explaining your reasoning.',
   '[1] There is a large jump between the 3rd and 4th ionisation energies.
[1] This indicates 3 electrons in the outermost shell → element X is in Group 13.',
   13),

  ('chem-u1-wr-13', 'S1.3 Electron Configuration', 'SL/HL', 'short_answer', '1', 2,
   'Outline the Bohr model of electron configuration deduced from the hydrogen line emission spectrum.',
   '[1] Electrons occupy discrete / quantised energy levels (n = 1, 2, 3 …).
[1] Energy levels converge at higher energies / are not equally spaced; the energy difference between successive levels decreases as n increases.',
   14),

  ('chem-u1-wr-14', 'S1.4 The Mole', 'SL/HL', 'short_answer', '1', 3,
   '4.92 g of hydrated magnesium sulfate (MgSO₄·nH₂O) gave 2.40 g of anhydrous MgSO₄ on heating to constant mass. Determine the value of n.',
   '[1] Mass of H₂O lost = 4.92 − 2.40 = 2.52 g. n(MgSO₄) = 2.40 / 120.38 = 0.01994 mol.
[1] n(H₂O) = 2.52 / 18.02 = 0.1399 mol.
[1] Ratio = 0.1399 / 0.01994 = 7.01 ≈ 7. Therefore n = 7. Formula: MgSO₄·7H₂O.',
   15),

  ('chem-u1-wr-15', 'R2.1 Stoichiometry', 'SL/HL', 'short_answer', '1', 2,
   'Write balanced symbol equations with state symbols for: (a) sulfuric acid + copper(II) oxide → copper(II) sulfate + water [1] (b) phosphoric acid + sodium carbonate → sodium phosphate + carbon dioxide + water [1]',
   '[1] (a) H₂SO₄(aq) + CuO(s) → CuSO₄(aq) + H₂O(l)
[1] (b) 2H₃PO₄(aq) + 3Na₂CO₃(aq) → 2Na₃PO₄(aq) + 3CO₂(g) + 3H₂O(l). Correct balancing and state symbols.',
   16);
