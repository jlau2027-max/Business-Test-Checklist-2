-- ============================================================
-- Chemistry Content Seed Data — Unit 7: Covalency & Unsolved Mysteries
-- Syllabus: S2.2.4, S2.2.6, S2.2.8–10, S2.2.12–16 (AHL)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('S2.2.12 Benzene & Resonance (AHL)', '#7C3AED'),
  ('S2.2.15 Sigma & Pi Bonds (AHL)', '#2563EB'),
  ('S2.2.16 Hybridisation (AHL)', '#0891B2'),
  ('S2.2.4/13 VSEPR Theory', '#DC2626'),
  ('S2.2.6 Molecular Polarity', '#F97316'),
  ('S2.2.8-9 Intermolecular Forces', '#059669'),
  ('S2.2.10 Chromatography', '#D97706');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('s2-2-12-benzene', 'S2.2.12 — Benzene & Resonance (AHL)', '#7C3AED', '7', 38),
  ('s2-2-15-sigma-pi', 'S2.2.15 — Sigma & Pi Bonds (AHL)', '#2563EB', '7', 39),
  ('s2-2-16-hybrid', 'S2.2.16 — Hybridisation (AHL)', '#0891B2', '7', 40),
  ('s2-2-4-vsepr', 'S2.2.4/13 — VSEPR Theory', '#DC2626', '7', 41),
  ('s2-2-6-polarity', 'S2.2.6 — Molecular Polarity', '#F97316', '7', 42),
  ('s2-2-8-imf', 'S2.2.8–9 — Intermolecular Forces', '#059669', '7', 43),
  ('s2-2-10-chrom', 'S2.2.10 — Chromatography', '#D97706', '7', 44);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- S2.2.12 Benzene & Resonance (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-12-benzene', 'State the molecular formula of benzene (C6H6) and describe its 1:1 C:H ratio', 1),
  ('s2-2-12-benzene', 'Explain why the Kekule structure (cyclohexatriene) is inconsistent with experimental evidence', 2),
  ('s2-2-12-benzene', 'Cite evidence: all C-C bond lengths in benzene are equal (X-ray diffraction)', 3),
  ('s2-2-12-benzene', 'Cite evidence: benzene is more stable than expected (enthalpy of hydrogenation is -207 kJ/mol, not -360 kJ/mol)', 4),
  ('s2-2-12-benzene', 'Draw both resonance structures of benzene and the delocalised model (circle in hexagon)', 5),
  ('s2-2-12-benzene', 'Explain that benzene undergoes substitution (not addition) reactions, supporting delocalisation', 6),
  ('s2-2-12-benzene', 'Estimate the C-C bond length in benzene as between a single and double bond', 7),
  ('s2-2-12-benzene', 'Calculate the resonance stabilisation energy of benzene (approx 153 kJ/mol)', 8);

-- S2.2.15 Sigma & Pi Bonds (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-15-sigma-pi', 'Define a sigma bond as head-on overlap of orbitals with electron density along the bond axis', 1),
  ('s2-2-15-sigma-pi', 'Define a pi bond as lateral/sideways overlap of p-orbitals with electron density above and below the bond axis', 2),
  ('s2-2-15-sigma-pi', 'Draw the three types of sigma overlap: s-s, s-p, and p-p (head-on)', 3),
  ('s2-2-15-sigma-pi', 'Draw the formation of a pi bond from parallel p-orbitals', 4),
  ('s2-2-15-sigma-pi', 'State that a single bond = 1 sigma; a double bond = 1 sigma + 1 pi; a triple bond = 1 sigma + 2 pi', 5),
  ('s2-2-15-sigma-pi', 'Count sigma and pi bonds in any given molecule (e.g. ethene, ethyne, HCN)', 6),
  ('s2-2-15-sigma-pi', 'Explain why free rotation occurs around sigma bonds but not pi bonds', 7);

-- S2.2.16 Hybridisation (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-16-hybrid', 'Define hybridisation as the mixing of atomic orbitals to form new hybrid orbitals for bonding', 1),
  ('s2-2-16-hybrid', 'Link sp hybridisation to 2 electron domains, linear geometry, 180 degrees', 2),
  ('s2-2-16-hybrid', 'Link sp2 hybridisation to 3 electron domains, trigonal planar geometry, 120 degrees', 3),
  ('s2-2-16-hybrid', 'Link sp3 hybridisation to 4 electron domains, tetrahedral geometry, 109.5 degrees', 4),
  ('s2-2-16-hybrid', 'Deduce the hybridisation of a central atom from its Lewis structure', 5),
  ('s2-2-16-hybrid', 'Explain hybridisation in benzene (sp2 carbon, unhybridised p-orbitals form delocalised pi system)', 6),
  ('s2-2-16-hybrid', 'Explain hybridisation in methane (sp3), ethene (sp2), and ethyne (sp)', 7);

-- S2.2.4/13 VSEPR Theory
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-4-vsepr', 'State VSEPR theory: electron domains repel and arrange to minimise repulsion', 1),
  ('s2-2-4-vsepr', 'Define an electron domain (lone pair, single bond, double bond, or triple bond)', 2),
  ('s2-2-4-vsepr', 'Distinguish electron domain geometry from molecular geometry', 3),
  ('s2-2-4-vsepr', 'Predict shapes for 2-4 electron domains (linear, trigonal planar, tetrahedral + variants)', 4),
  ('s2-2-4-vsepr', 'Predict shapes for 5-6 electron domains (trigonal bipyramidal, octahedral + variants) [AHL]', 5),
  ('s2-2-4-vsepr', 'Explain that lone pairs repel more than bonding pairs, reducing bond angles by approx 2.5 degrees each', 6),
  ('s2-2-4-vsepr', 'Draw Lewis structures for expanded octets (e.g. PCl5, SF6, XeF4)', 7),
  ('s2-2-4-vsepr', 'Name all molecular geometries: linear, bent, trigonal planar, pyramidal, tetrahedral, see-saw, T-shaped, square planar, square pyramidal, octahedral', 8);

-- S2.2.6 Molecular Polarity
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-6-polarity', 'Explain that molecular polarity depends on both bond polarity and molecular geometry', 1),
  ('s2-2-6-polarity', 'Deduce bond polarity from electronegativity differences', 2),
  ('s2-2-6-polarity', 'Explain why symmetrical molecules (e.g. CO2, BF3, CH4, SF6) are non-polar despite polar bonds', 3),
  ('s2-2-6-polarity', 'Explain why asymmetrical molecules (e.g. H2O, NH3, CHCl3) have a net dipole moment', 4),
  ('s2-2-6-polarity', 'Draw dipole arrows and deduce net dipole moments', 5);

-- S2.2.8-9 Intermolecular Forces
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-8-imf', 'Distinguish intramolecular bonds from intermolecular forces', 1),
  ('s2-2-8-imf', 'Describe London dispersion forces (instantaneous dipole-induced dipole)', 2),
  ('s2-2-8-imf', 'Explain that LDF strength increases with molar mass / number of electrons / surface area', 3),
  ('s2-2-8-imf', 'Describe dipole-dipole forces between permanent dipoles in polar molecules', 4),
  ('s2-2-8-imf', 'Describe dipole-induced dipole forces between polar and non-polar molecules', 5),
  ('s2-2-8-imf', 'Define hydrogen bonding: occurs when H is bonded to N, O, or F and interacts with a lone pair on N, O, or F', 6),
  ('s2-2-8-imf', 'Rank IMF strength: LDF < dipole-dipole < hydrogen bonding (for comparable molar mass)', 7),
  ('s2-2-8-imf', 'Explain boiling point trends of Group 15, 16, 17 hydrides using hydrogen bonding', 8),
  ('s2-2-8-imf', 'Explain physical properties (volatility, conductivity, solubility) in terms of IMFs', 9),
  ('s2-2-8-imf', 'Explain ''like dissolves like'' using polarity and IMFs', 10),
  ('s2-2-8-imf', 'Identify IMFs in biological systems (DNA base pairing, protein folding, cellulose)', 11);

-- S2.2.10 Chromatography
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-10-chrom', 'Explain that chromatography separates mixtures based on different attractions to mobile and stationary phases', 1),
  ('s2-2-10-chrom', 'Identify mobile and stationary phases in paper chromatography and TLC', 2),
  ('s2-2-10-chrom', 'Calculate Rf = distance travelled by component / distance travelled by solvent front', 3),
  ('s2-2-10-chrom', 'Interpret chromatograms to identify substances using Rf values', 4),
  ('s2-2-10-chrom', 'Explain why different components travel different distances (polarity and IMF arguments)', 5),
  ('s2-2-10-chrom', 'Explain why a substance with Rf = 0 has strong attraction to the stationary phase', 6);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u7-key-defs', 'Unit 7 — Key Definitions', '#7C3AED', '7', 35),
  ('chem-u7-quick-recall', 'Unit 7 — Quick Recall', '#2563EB', '7', 36);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Key Definitions (18 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u7-key-defs', 'What is VSEPR Theory?', 'Electron pairs in the valence shell repel each other and arrange themselves to minimise repulsion, determining molecular shape.', NULL, 1),
  ('chem-u7-key-defs', 'What is an electron domain?', 'A region of electron density in the valence shell: a lone pair, single bond, double bond, or triple bond each count as one domain.', NULL, 2),
  ('chem-u7-key-defs', 'What is electron domain geometry?', 'The 3D arrangement of ALL electron domains (bonding + lone pairs) around a central atom.', NULL, 3),
  ('chem-u7-key-defs', 'What is molecular geometry?', 'The 3D arrangement of only the BONDED ATOMS around a central atom (ignores lone pairs).', NULL, 4),
  ('chem-u7-key-defs', 'What is a sigma bond?', 'A bond formed by head-on overlap of atomic orbitals; electron density is concentrated along the bond axis.', NULL, 5),
  ('chem-u7-key-defs', 'What is a pi bond?', 'A bond formed by lateral/sideways overlap of p-orbitals; electron density is above and below the bond axis.', NULL, 6),
  ('chem-u7-key-defs', 'What is hybridisation?', 'The concept of mixing atomic orbitals to form new, equivalent hybrid orbitals for bonding.', NULL, 7),
  ('chem-u7-key-defs', 'What is electronegativity?', 'The ability of an atom to attract a bonding pair of electrons in a covalent bond.', NULL, 8),
  ('chem-u7-key-defs', 'What is a dipole?', 'A molecule with an uneven partial charge distribution, having partial positive and partial negative ends.', NULL, 9),
  ('chem-u7-key-defs', 'What are London dispersion forces?', 'Weak intermolecular forces caused by instantaneous dipole-induced dipole interactions; present in ALL molecules.', NULL, 10),
  ('chem-u7-key-defs', 'What are dipole-dipole forces?', 'Intermolecular forces between the permanent dipoles of polar molecules.', NULL, 11),
  ('chem-u7-key-defs', 'What is a dipole-induced dipole force?', 'An intermolecular force where a polar molecule induces a temporary dipole in a neighbouring non-polar molecule.', NULL, 12),
  ('chem-u7-key-defs', 'What is hydrogen bonding?', 'A strong dipole-dipole force occurring when H bonded to N, O, or F interacts with a lone pair on another N, O, or F atom.', NULL, 13),
  ('chem-u7-key-defs', 'What are resonance structures?', 'Two or more valid Lewis structures for a molecule that differ only in electron distribution; the actual structure is a hybrid.', NULL, 14),
  ('chem-u7-key-defs', 'What is the Rf value?', 'Retardation factor = distance travelled by component / distance travelled by solvent front.', NULL, 15),
  ('chem-u7-key-defs', 'What is the stationary phase?', 'The phase that remains fixed (e.g. paper in paper chromatography, silica gel in TLC).', NULL, 16),
  ('chem-u7-key-defs', 'What is the mobile phase?', 'The phase that moves over the stationary phase, carrying components of the sample at different rates.', NULL, 17),
  ('chem-u7-key-defs', 'What is a chromatogram?', 'The pattern of spots/bands formed after chromatographic separation of a mixture.', NULL, 18);

-- Quick Recall (19 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u7-quick-recall', 'sp hybridisation: how many domains, shape, angle?', '2 domains -> linear -> 180 degrees', NULL, 1),
  ('chem-u7-quick-recall', 'sp2 hybridisation: how many domains, shape, angle?', '3 domains -> trigonal planar -> 120 degrees', NULL, 2),
  ('chem-u7-quick-recall', 'sp3 hybridisation: how many domains, shape, angle?', '4 domains -> tetrahedral -> 109.5 degrees', NULL, 3),
  ('chem-u7-quick-recall', 'Single bond = ?', '1 sigma bond', NULL, 4),
  ('chem-u7-quick-recall', 'Double bond = ?', '1 sigma + 1 pi bond', NULL, 5),
  ('chem-u7-quick-recall', 'Triple bond = ?', '1 sigma + 2 pi bonds', NULL, 6),
  ('chem-u7-quick-recall', 'IMF strength order (comparable Mr)?', 'LDF < dipole-dipole < hydrogen bonding', NULL, 7),
  ('chem-u7-quick-recall', 'What is the hybridisation of carbon in benzene?', 'Each C is sp2 hybridised; unhybridised p-orbitals overlap to form delocalised pi system above and below ring.', NULL, 8),
  ('chem-u7-quick-recall', 'Why does benzene undergo substitution rather than addition?', 'Delocalised pi system is very stable; addition would break the delocalisation, so substitution is preferred to preserve it.', NULL, 9),
  ('chem-u7-quick-recall', 'Kekule predicted enthalpy of hydrogenation of benzene?', '3 x (-120) = -360 kJ/mol', NULL, 10),
  ('chem-u7-quick-recall', 'Actual benzene enthalpy of hydrogenation?', '-207 kJ/mol (153 kJ/mol more stable due to resonance)', NULL, 11),
  ('chem-u7-quick-recall', 'Effect of lone pair on bond angle?', 'Lone pairs repel more than bonding pairs -> reduce bond angle by approx 2.5 degrees per lone pair', NULL, 12),
  ('chem-u7-quick-recall', 'What is the shape of XeF4?', 'Square planar (6 electron domains: 4 bonding + 2 lone pairs)', NULL, 13),
  ('chem-u7-quick-recall', 'What is the shape of SF4?', 'See-saw (5 electron domains: 4 bonding + 1 lone pair)', NULL, 14),
  ('chem-u7-quick-recall', 'Why is CO2 non-polar despite having polar bonds?', 'Linear shape -> bond dipoles cancel exactly -> no net dipole.', NULL, 15),
  ('chem-u7-quick-recall', 'Why is H2O polar?', 'Bent shape -> bond dipoles do not cancel -> net dipole moment.', NULL, 16),
  ('chem-u7-quick-recall', 'Why does graphite conduct electricity?', 'sp2 C atoms have delocalised p-electrons free to move between layers.', NULL, 17),
  ('chem-u7-quick-recall', 'Why do boiling points of alkanes increase with chain length?', 'Longer chains -> more electrons -> stronger London dispersion forces.', NULL, 18),
  ('chem-u7-quick-recall', 'Why is the HF boiling point anomalously high?', 'Hydrogen bonding between H (bonded to F) and lone pairs on F of adjacent molecules.', NULL, 19);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u7-mcq-01', 'S2.2.12 Benzene & Resonance (AHL)', 'HL', '7',
   'All carbon-carbon bond lengths in benzene are equal. This is best explained by:',
   'Alternating single and double bonds in the Kekule structure',
   'Delocalisation of pi electrons over all six carbon atoms',
   'sp3 hybridisation of all carbon atoms',
   'Strong sigma bonds between all carbon atoms',
   1, 'The six p-orbital electrons are delocalised across the ring, giving all C-C bonds the same intermediate length.', 106),

  ('chem-u7-mcq-02', 'S2.2.12 Benzene & Resonance (AHL)', 'HL', '7',
   'The experimental enthalpy of hydrogenation of benzene is -207 kJ/mol. The predicted value based on the Kekule structure is -360 kJ/mol. The difference of 153 kJ/mol is best described as:',
   'The bond dissociation energy of benzene',
   'The lattice energy of benzene',
   'The resonance/delocalisation stabilisation energy',
   'The activation energy for hydrogenation',
   2, 'Benzene is 153 kJ/mol more stable than the hypothetical cyclohexatriene due to electron delocalisation.', 107),

  ('chem-u7-mcq-03', 'S2.2.15 Sigma & Pi Bonds (AHL)', 'HL', '7',
   'How many sigma and pi bonds are present in one molecule of ethyne (C2H2)?',
   '2 sigma and 2 pi',
   '3 sigma and 2 pi',
   '3 sigma and 3 pi',
   '5 sigma and 0 pi',
   1, 'Each C-H bond is 1 sigma, the triple bond is 1 sigma + 2 pi, giving 3 sigma + 2 pi total.', 108),

  ('chem-u7-mcq-04', 'S2.2.16 Hybridisation (AHL)', 'HL', '7',
   'What is the hybridisation of the carbon atom in methanal (H2CO)?',
   'sp',
   'sp2',
   'sp3',
   'sp3d',
   1, 'Carbon has 3 electron domains (2 C-H bonds + 1 C=O bond), so it is sp2 hybridised.', 109),

  ('chem-u7-mcq-05', 'S2.2.4/13 VSEPR Theory', 'HL', '7',
   'Which species has a bond angle of approximately 90 degrees?',
   'PCl4+',
   'PCl5',
   'BF3',
   'CH4',
   1, 'PCl5 has a trigonal bipyramidal shape with 90 degree angles between axial and equatorial positions.', 110),

  ('chem-u7-mcq-06', 'S2.2.4/13 VSEPR Theory', 'HL', '7',
   'What is the molecular geometry of XeF4?',
   'Tetrahedral',
   'Square planar',
   'See-saw',
   'Octahedral',
   1, 'Xe has 6 electron domains (4 bonding + 2 lone pairs) giving an octahedral e.d. geometry but square planar molecular geometry.', 111),

  ('chem-u7-mcq-07', 'S2.2.6 Molecular Polarity', 'SL/HL', '7',
   'Which molecule is polar?',
   'CO2',
   'BF3',
   'CHCl3',
   'CCl4',
   2, 'CHCl3 (tetrahedral with different substituents) has an asymmetric charge distribution, giving a net dipole.', 112),

  ('chem-u7-mcq-08', 'S2.2.4/13 VSEPR Theory', 'SL/HL', '7',
   'Which substance is most similar in shape to NH3?',
   'BF3',
   'GaI3',
   'PBr3',
   'FeCl3',
   2, 'PBr3 has 4 electron domains (3 bonding + 1 lone pair), giving a trigonal pyramidal shape like NH3.', 113),

  ('chem-u7-mcq-09', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', '7',
   'Which correctly ranks intermolecular forces from weakest to strongest (for comparable molar mass)?',
   'Hydrogen bonding < dipole-dipole < London dispersion',
   'London dispersion < hydrogen bonding < dipole-dipole',
   'Dipole-dipole < London dispersion < hydrogen bonding',
   'London dispersion < dipole-dipole < hydrogen bonding',
   3, 'For molecules of similar size: LDF < dipole-dipole < hydrogen bonding.', 114),

  ('chem-u7-mcq-10', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', '7',
   'Water (H2O, Mr = 18) is a liquid at room temperature while nitrosyl fluoride (ONF, Mr = 49) is a gas. This is best explained by:',
   'Water has stronger London dispersion forces due to more electrons',
   'Water molecules form hydrogen bonds; ONF can only form dipole-dipole forces',
   'Water has a higher molar mass than ONF',
   'ONF is non-polar so has no intermolecular forces',
   1, 'Water forms strong hydrogen bonds (H bonded to O with lone pairs on O), giving it a much higher boiling point despite lower molar mass.', 115),

  ('chem-u7-mcq-11', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', '7',
   'The boiling points of the hydrogen halides increase from HCl to HI (except HF which is anomalously high). The general increase from HCl to HI is due to:',
   'Increasing hydrogen bond strength',
   'Increasing dipole-dipole forces',
   'Increasing London dispersion forces with more electrons',
   'Increasing bond polarity',
   2, 'From HCl to HI, molar mass and electron count increase, strengthening London dispersion forces.', 116),

  ('chem-u7-mcq-12', 'S2.2.10 Chromatography', 'SL/HL', '7',
   'In paper chromatography, a component with an Rf value of 0.95 is best described as having:',
   'Strong attraction to the stationary phase',
   'Strong attraction to the mobile phase',
   'No intermolecular forces',
   'Equal attraction to both phases',
   1, 'A high Rf means the substance travelled nearly as far as the solvent front, indicating strong affinity for the mobile phase.', 117),

  ('chem-u7-mcq-13', 'S2.2.4/13 VSEPR Theory', 'HL', '7',
   'What is the electron domain geometry and molecular geometry of SF4?',
   'Tetrahedral; tetrahedral',
   'Trigonal bipyramidal; see-saw',
   'Trigonal bipyramidal; T-shaped',
   'Octahedral; square planar',
   1, 'SF4 has 5 electron domains (4 bonding + 1 lone pair). E.D. geometry = trigonal bipyramidal; molecular geometry = see-saw.', 118),

  ('chem-u7-mcq-14', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', '7',
   'Which of the following molecules can form hydrogen bonds with water?',
   'CH4',
   'CH3OCH3',
   'CCl4',
   'C2H6',
   1, 'Dimethyl ether has lone pairs on oxygen which can form hydrogen bonds with the H atoms in water.', 119),

  ('chem-u7-mcq-15', 'S2.2.12 Benzene & Resonance (AHL)', 'HL', '7',
   'In the benzene molecule, each carbon atom is:',
   'sp hybridised with 2 unhybridised p-orbitals',
   'sp2 hybridised with 1 unhybridised p-orbital',
   'sp3 hybridised with 0 unhybridised p-orbitals',
   'sp3d hybridised with 1 unhybridised p-orbital',
   1, 'Each C in benzene uses sp2 hybrid orbitals for sigma bonds; the remaining p-orbital forms the delocalised pi system.', 120),

  ('chem-u7-mcq-16', 'S2.2.4/13 VSEPR Theory', 'HL', '7',
   'How many non-bonding pairs and bonding pairs of electrons surround xenon in XeF4?',
   '0 non-bonding, 4 bonding',
   '2 non-bonding, 4 bonding',
   '4 non-bonding, 8 bonding',
   '0 non-bonding, 8 bonding',
   1, 'Xe has 8 valence electrons; 4 are used in bonds to F, leaving 2 lone pairs. So 2 non-bonding pairs and 4 bonding pairs.', 121),

  ('chem-u7-mcq-17', 'S2.2.15 Sigma & Pi Bonds (AHL)', 'HL', '7',
   'Which of the following species contains both sigma and pi bonds?',
   'H2O',
   'NH3',
   'C2H4',
   'CH4',
   2, 'Ethene has a C=C double bond (1 sigma + 1 pi) and C-H single bonds (sigma only).', 122),

  ('chem-u7-mcq-18', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', '7',
   'Which compound has the highest boiling point?',
   'CH3CH2CH3 (propane)',
   'CH3OCH3 (dimethyl ether)',
   'CH3CH2OH (ethanol)',
   'CH3CH3 (ethane)',
   2, 'Ethanol can form hydrogen bonds (O-H group), giving it the highest boiling point of the group.', 123),

  ('chem-u7-mcq-19', 'S2.2.16 Hybridisation (AHL)', 'SL/HL', '7',
   'Diamond and graphite are both allotropes of carbon. Which statement explains why graphite conducts electricity but diamond does not?',
   'Graphite has ionic bonds between layers',
   'Graphite has delocalised electrons between layers that are free to move',
   'Diamond has a lower melting point',
   'Graphite is a molecular substance',
   1, 'In graphite, each C is sp2 hybridised; the unhybridised p-electrons form a delocalised system allowing electron mobility.', 124),

  ('chem-u7-mcq-20', 'S2.2.10 Chromatography', 'SL/HL', '7',
   'The Rf value in chromatography is calculated as:',
   'Distance travelled by solvent front / distance by component',
   'Distance travelled by component / distance by solvent front',
   'Mass of component / mass of solvent',
   'Time for component to travel / total time',
   1, 'Rf = distance travelled by the substance / distance travelled by the solvent front.', 125);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u7-wr-01', 'S2.2.12 Benzene & Resonance (AHL)', 'HL', 'short_answer', '7', 6,
   'Discuss the structure of benzene from physical and chemical evidence. [6]',
   'X-ray diffraction shows all six C-C bond lengths are equal/intermediate between single and double bond length [1]\nThis is inconsistent with the Kekule structure which would have alternating long and short bonds [1]\nThe enthalpy of hydrogenation of benzene (-207 kJ/mol) is less exothermic than 3x cyclohexene (-360 kJ/mol) [1]\nBenzene is 153 kJ/mol more stable than predicted -> evidence for resonance/delocalisation stabilisation [1]\nBenzene undergoes substitution rather than addition reactions, suggesting it resists breaking its delocalised pi system [1]\nThe actual structure is a resonance hybrid with delocalised electrons above and below the plane of the ring [1]',
   68),

  ('chem-u7-wr-02', 'S2.2.16 Hybridisation (AHL)', 'HL', 'short_answer', '7', 4,
   'Explain the meaning of the term hybridisation. Identify the hybridisation of the carbon atom in HCN and state the number of sigma and pi bonds in the C≡N bond. [4]',
   'Hybridisation is the mixing/combining of atomic orbitals to form new hybrid orbitals for bonding [1]\nCarbon in HCN is sp hybridised (2 electron domains: one C-H bond + one C≡N triple bond) [1]\nThe C≡N triple bond contains 1 sigma bond [1]\nThe C≡N triple bond contains 2 pi bonds [1]',
   69),

  ('chem-u7-wr-03', 'S2.2.15 Sigma & Pi Bonds (AHL)', 'HL', 'short_answer', '7', 4,
   'Describe how sigma and pi bonds form. Include a description of the orbital overlap in each case. [4]',
   'Sigma bonds form by head-on/axial overlap of atomic orbitals [1]\nElectron density in a sigma bond is concentrated along/between the bond axis / between the two nuclei [1]\nPi bonds form by lateral/sideways overlap of parallel p-orbitals [1]\nElectron density in a pi bond is concentrated above and below the bond axis (on opposite sides) [1]',
   70),

  ('chem-u7-wr-04', 'S2.2.4/13 VSEPR Theory', 'SL/HL', 'short_answer', '7', 8,
   'Draw Lewis structures for CO2 and H2S. State the shape of each molecule and explain using VSEPR theory. State and explain whether each molecule is polar or non-polar. [8]',
   'CO2 Lewis structure: O=C=O with two lone pairs on each O [1]\nCO2 has 2 electron domains -> linear shape -> bond angle 180 degrees [1]\nCO2 is non-polar: linear geometry means the two C=O bond dipoles cancel out [1]\nSymmetrical arrangement of identical bonds leads to zero net dipole [1]\nH2S Lewis structure: H-S-H with two lone pairs on S [1]\nH2S has 4 electron domains (2 bonding + 2 lone pairs) -> bent/V-shaped -> bond angle <109.5 degrees [1]\nH2S is polar: bent shape means bond dipoles do not cancel -> net dipole moment exists [1]\nLone pairs reduce the bond angle from the ideal tetrahedral 109.5 degrees [1]',
   71),

  ('chem-u7-wr-05', 'S2.2.4/13 VSEPR Theory', 'HL', 'short_answer', '7', 4,
   'Apply VSEPR theory to deduce the shape of XeF4. Draw the Lewis structure, name the shape, and state the bond angle(s). [4]',
   'Xe has 8 valence electrons; 4 bonds to F use 4 electrons; 4 electrons remain as 2 lone pairs -> 6 total electron domains [1]\nElectron domain geometry is octahedral [1]\nWith 2 lone pairs in opposite (trans) positions, molecular geometry is square planar [1]\nBond angles are 90 degrees between adjacent F-Xe-F bonds [1]',
   72),

  ('chem-u7-wr-06', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', 'short_answer', '7', 6,
   'There are three main types of intermolecular forces. Using a named example for each, explain how each type of force arises. [6]',
   'London dispersion forces (e.g. Br2): arise from temporary fluctuations in electron distribution creating an instantaneous dipole [1]\nThis instantaneous dipole induces a dipole in a neighbouring molecule, creating a short-lived attraction [1]\nDipole-dipole forces (e.g. HCl): arise between molecules with permanent dipoles due to differences in electronegativity [1]\nThe partial positive end of one molecule is attracted to the partial negative end of another molecule [1]\nHydrogen bonding (e.g. H2O or HF): occurs when H is bonded to N, O, or F [1]\nThe very electronegative atom creates a highly partial positive hydrogen that is attracted to a lone pair on N, O, or F of another molecule [1]',
   73),

  ('chem-u7-wr-07', 'S2.2.8-9 Intermolecular Forces', 'SL/HL', 'short_answer', '7', 6,
   'For each pair, state which substance has the higher boiling point and explain your answer: (a) HCl and HBr; (b) HF and HCl; (c) CH3OH and CH3Cl. [6]',
   '(a) HBr has a higher boiling point than HCl [1]\nHBr has more electrons/greater molar mass -> stronger London dispersion forces [1]\n(b) HF has a higher boiling point than HCl [1]\nHF can form hydrogen bonds (H bonded to F); HCl cannot form hydrogen bonds (Cl is not sufficiently electronegative) [1]\n(c) CH3OH has a higher boiling point than CH3Cl [1]\nCH3OH can form hydrogen bonds through the O-H group; CH3Cl can only form dipole-dipole and LDF [1]',
   74),

  ('chem-u7-wr-08', 'S2.2.16 Hybridisation (AHL)', 'HL', 'short_answer', '7', 6,
   'State the hybridisation of the nitrogen atoms in N2, N2H2, and N2H4. For N2H2, describe how the sigma and pi bonds form. [6]',
   'N2: each N is sp hybridised (2 electron domains: triple bond + lone pair) [1]\nN2H2: each N is sp2 hybridised (3 electron domains: N=N double bond + N-H bond + lone pair) [1]\nN2H4: each N is sp3 hybridised (4 electron domains: N-N bond + 2 N-H bonds + lone pair) [1]\nIn N2H2, the sigma bond between the two N atoms forms by head-on overlap of sp2 hybrid orbitals [1]\nThe pi bond forms by sideways/lateral overlap of the unhybridised p-orbitals on each N atom [1]\nA single bond contains only a sigma bond; a double bond contains one sigma and one pi bond [1]',
   75),

  ('chem-u7-wr-09', 'S2.2.10 Chromatography', 'SL/HL', 'short_answer', '7', 4,
   'Explain why the Rf value of a substance depends on the intermolecular forces between the substance and the mobile and stationary phases. A substance has an Rf value of 0.10. What does this suggest? [4]',
   'Substances with stronger attraction/IMFs to the mobile phase travel further -> higher Rf [1]\nSubstances with stronger attraction/IMFs to the stationary phase travel less far -> lower Rf [1]\nAn Rf of 0.10 means the substance barely moved -> strong attraction to the stationary phase / weak attraction to the mobile phase [1]\nThis suggests the substance is more polar (if the stationary phase is polar) and interacts strongly via hydrogen bonding or dipole-dipole forces with the stationary phase [1]',
   76),

  ('chem-u7-wr-10', 'S2.2.16 Hybridisation (AHL)', 'SL/HL', 'short_answer', '7', 6,
   'Explain how the structures of diamond and graphite influence their physical properties, including melting point, electrical conductivity, and hardness. [6]',
   'Diamond: each C is sp3 hybridised and bonded to 4 other C atoms in a tetrahedral arrangement forming a giant covalent network [1]\nVery high melting point because many strong covalent bonds must be broken; very hard due to rigid 3D structure [1]\nDiamond does not conduct electricity because all valence electrons are localised in sigma bonds / no free electrons [1]\nGraphite: each C is sp2 hybridised and bonded to 3 other C atoms in hexagonal layers [1]\nVery high melting point due to strong covalent bonds within layers; soft because layers are held by weak London dispersion forces and can slide over each other [1]\nGraphite conducts electricity because the unhybridised p-electrons are delocalised across the layers and free to move [1]',
   77);
