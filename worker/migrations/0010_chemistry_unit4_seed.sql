-- ============================================================
-- Chemistry Content Seed Data — Unit 4: Periodicity, Bonding & Materials
-- Syllabus: S3.1, S2.1, S2.2, S2.3, S2.4, AHL Resonance & Formal Charge
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('S3.1 Periodic Table & Periodicity', '#2563EB'),
  ('S3.1 Periodic Trends', '#7C3AED'),
  ('S3.1 Group Trends & Oxides', '#0891B2'),
  ('S3.1 Oxidation States', '#D97706'),
  ('S2.1 Ionic Bonding', '#DC2626'),
  ('S2.2 Covalent Bonding', '#059669'),
  ('S2.2 Resonance & Formal Charge (AHL)', '#6366F1'),
  ('S2.3 Metallic Bonding', '#E11D48'),
  ('S2.4 Bonding Triangle, Alloys & Materials', '#9333EA');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT OR IGNORE INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('s3-1-periodic-table', 'S3.1.1–3.1.2 — Structure of the Periodic Table', '#2563EB', '4', 18),
  ('s3-1-periodic-trends', 'S3.1.3 — Periodic Trends', '#7C3AED', '4', 19),
  ('s3-1-group-oxides', 'S3.1.4–3.1.5 — Group Trends & Oxides', '#0891B2', '4', 20),
  ('s3-1-oxidation-states', 'S3.1.6 — Oxidation States', '#D97706', '4', 21),
  ('s2-1-ionic-bonding', 'S2.1 — Ionic Bonding', '#DC2626', '4', 22),
  ('s2-2-covalent-bonding', 'S2.2 — Covalent Bonding', '#059669', '4', 23),
  ('s2-2-resonance-fc', 'AHL — Resonance & Formal Charge', '#6366F1', '4', 24),
  ('s2-3-metallic-bonding', 'S2.3 — Metallic Bonding', '#E11D48', '4', 25),
  ('s2-4-bonding-triangle', 'S2.4 — Bonding Triangle, Alloys & Materials', '#9333EA', '4', 26);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- S3.1.1–3.1.2 Structure of the Periodic Table
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-periodic-table', 'Identify the positions of metals, metalloids, and non-metals', 1),
  ('s3-1-periodic-table', 'Label the s, p, d, and f blocks on a blank periodic table', 2),
  ('s3-1-periodic-table', 'Know the period number = outer energy level occupied by electrons', 3),
  ('s3-1-periodic-table', 'Know that elements in a group share the same number of valence electrons', 4),
  ('s3-1-periodic-table', 'Deduce electron configurations up to Z = 36 from position and vice versa', 5),
  ('s3-1-periodic-table', 'Identify alkali metals, alkaline earth metals, transition metals, halogens, and noble gases', 6);

-- S3.1.3 Periodic Trends
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-periodic-trends', 'Define periodicity and explain why trends repeat across periods', 1),
  ('s3-1-periodic-trends', 'Explain the trend in atomic radius across a period (decreasing) and down a group (increasing)', 2),
  ('s3-1-periodic-trends', 'Explain the trend in ionic radius, including comparison of cations vs anions', 3),
  ('s3-1-periodic-trends', 'Explain the trend in first ionisation energy across a period and down a group', 4),
  ('s3-1-periodic-trends', 'Explain anomalies in ionisation energy (e.g. Al vs Mg, S vs P)', 5),
  ('s3-1-periodic-trends', 'Explain the trend in electron affinity across a period and down a group', 6),
  ('s3-1-periodic-trends', 'Explain the trend in electronegativity using nuclear charge and atomic radius', 7),
  ('s3-1-periodic-trends', 'Understand why d-block elements have relatively constant atomic radii and ionisation energies', 8);

-- S3.1.4–3.1.5 Group Trends & Oxides
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-group-oxides', 'Describe increasing metallic character down Group 1 (reactions with water)', 1),
  ('s3-1-group-oxides', 'Describe decreasing non-metallic character down Group 17 (displacement reactions)', 2),
  ('s3-1-group-oxides', 'Write equations for Group 1/2 metal oxide reactions with water (basic solutions)', 3),
  ('s3-1-group-oxides', 'Write equations for non-metal oxide reactions with water (acidic solutions, e.g. CO₂, SO₂, SO₃)', 4),
  ('s3-1-group-oxides', 'Understand the continuum from basic → amphoteric → acidic oxides across Period 3', 5),
  ('s3-1-group-oxides', 'Classify Period 3 oxides (Na₂O, MgO, Al₂O₃, SiO₂, P₄O₁₀, SO₃, Cl₂O₇)', 6);

-- S3.1.6 Oxidation States
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-1-oxidation-states', 'Define oxidation state and explain why elements in their elemental form have an oxidation state of zero', 1),
  ('s3-1-oxidation-states', 'Apply the rules for assigning oxidation states (O = −2, H = +1, etc.)', 2),
  ('s3-1-oxidation-states', 'Deduce oxidation states of atoms in compounds and polyatomic ions', 3);

-- S2.1 Ionic Bonding
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-1-ionic-bonding', 'Explain that metals lose electrons to form cations and non-metals gain electrons to form anions', 1),
  ('s2-1-ionic-bonding', 'Predict the charge of an ion from electron configuration', 2),
  ('s2-1-ionic-bonding', 'Define an ionic bond as the electrostatic attraction between oppositely charged ions', 3),
  ('s2-1-ionic-bonding', 'Deduce formulas and names of ionic compounds, including polyatomic ions', 4),
  ('s2-1-ionic-bonding', 'Name binary ionic compounds (cation first, anion with ''-ide'' suffix)', 5),
  ('s2-1-ionic-bonding', 'Describe the 3D lattice structure of ionic compounds', 6),
  ('s2-1-ionic-bonding', 'Explain the high melting points, volatility, conductivity (molten/aqueous), and solubility of ionic compounds', 7),
  ('s2-1-ionic-bonding', 'Compare melting points of NaCl vs MgO using charge and ionic radius', 8);

-- S2.2 Covalent Bonding
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-covalent-bonding', 'Define a covalent bond as the electrostatic attraction between shared electrons and nuclei', 1),
  ('s2-2-covalent-bonding', 'State and apply the octet rule (and its limitations: BF₃, SF₆, PCl₅)', 2),
  ('s2-2-covalent-bonding', 'Draw Lewis structures for molecules and ions with up to 4 electron pairs per atom', 3),
  ('s2-2-covalent-bonding', 'Understand single, double, and triple bonds and their effect on bond length and strength', 4),
  ('s2-2-covalent-bonding', 'Define and identify coordination (dative) covalent bonds (e.g. NH₄⁺, H₃O⁺, Al₂Cl₆)', 5),
  ('s2-2-covalent-bonding', 'Explain bond polarity using electronegativity differences', 6),
  ('s2-2-covalent-bonding', 'Describe covalent network structures: diamond, graphite, graphene, fullerenes, silicon, SiO₂', 7),
  ('s2-2-covalent-bonding', 'Explain properties of allotropes of carbon (hardness, conductivity, etc.)', 8);

-- AHL Resonance & Formal Charge
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-2-resonance-fc', 'Draw resonance structures for molecules/ions (O₃, NO₂⁻, CO₃²⁻, N₂O)', 1),
  ('s2-2-resonance-fc', 'Understand that the actual structure is a resonance hybrid with delocalised electrons', 2),
  ('s2-2-resonance-fc', 'Use bond length data to support the idea of intermediate bond order', 3),
  ('s2-2-resonance-fc', 'Calculate formal charge: FC = valence e⁻ – lone pair e⁻ – ½(bonding e⁻)', 4),
  ('s2-2-resonance-fc', 'Use formal charge to determine the preferred Lewis structure (lowest magnitudes preferred)', 5),
  ('s2-2-resonance-fc', 'Know that negative formal charges are best placed on more electronegative atoms', 6);

-- S2.3 Metallic Bonding
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-3-metallic-bonding', 'Define a metallic bond as the electrostatic attraction between cations and delocalised electrons', 1),
  ('s2-3-metallic-bonding', 'Explain electrical conductivity, thermal conductivity, and malleability of metals', 2),
  ('s2-3-metallic-bonding', 'Know that metallic bond strength depends on cation charge and ionic radius', 3),
  ('s2-3-metallic-bonding', 'Explain trends in melting/boiling points of s- and p-block metals across a period and down a group', 4);

-- S2.4 Bonding Triangle, Alloys & Materials
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s2-4-bonding-triangle', 'Understand bonding as a continuum (ionic–covalent–metallic) represented by the van Arkel–Ketelaar triangle', 1),
  ('s2-4-bonding-triangle', 'Determine position on the triangle using average electronegativity and electronegativity difference', 2),
  ('s2-4-bonding-triangle', 'Predict properties of a compound from its position on the bonding triangle', 3),
  ('s2-4-bonding-triangle', 'Define alloys as mixtures of metals (or metals + non-metals) with enhanced properties', 4),
  ('s2-4-bonding-triangle', 'Explain why alloys are harder/less malleable (different-sized atoms disrupt layers)', 5);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u4-periodicity', 'S3.1 Periodic Trends', '#2563EB', '4', 18),
  ('chem-u4-group-oxides', 'S3.1 Group Trends & Oxides', '#0891B2', '4', 19),
  ('chem-u4-ionic', 'S2.1 Ionic Bonding', '#DC2626', '4', 20),
  ('chem-u4-covalent', 'S2.2 Covalent Bonding', '#059669', '4', 21),
  ('chem-u4-resonance', 'S2.2 Resonance & Formal Charge (AHL)', '#6366F1', '4', 22),
  ('chem-u4-metallic', 'S2.3 Metallic Bonding', '#E11D48', '4', 23),
  ('chem-u4-bonding-tri', 'S2.4 Bonding Triangle & Alloys', '#9333EA', '4', 24);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Periodic Trends
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-periodicity', 'Define: Atomic radius', 'Half the distance between the nuclei of two bonded atoms of the same element.', NULL, 1),
  ('chem-u4-periodicity', 'Define: Ionisation energy', 'Energy required to remove one mole of electrons from one mole of gaseous atoms to form gaseous cations.', NULL, 2),
  ('chem-u4-periodicity', 'Define: Electron affinity', 'Energy change when one mole of electrons is added to one mole of gaseous atoms to form gaseous anions.', NULL, 3),
  ('chem-u4-periodicity', 'Define: Electronegativity', 'The tendency of an atom in a covalent bond to attract the shared pair of electrons towards itself. Measured on the Pauling scale.', NULL, 4),
  ('chem-u4-periodicity', 'Atomic radius: trend across period?', 'Decreases. Increasing nuclear charge pulls electrons closer; same number of shells.', NULL, 5),
  ('chem-u4-periodicity', 'Atomic radius: trend down group?', 'Increases. Additional electron shells outweigh the increase in nuclear charge.', NULL, 6),
  ('chem-u4-periodicity', 'Ionisation energy: trend across period?', 'Generally increases (higher Zeff, smaller radius). Anomalies at Groups 13 & 16.', NULL, 7),
  ('chem-u4-periodicity', 'Why is IE of Al < Mg?', 'Al''s outer electron is in a higher-energy 3p orbital (easier to remove) vs Mg''s full 3s².', NULL, 8),
  ('chem-u4-periodicity', 'Why is IE of S < P?', 'S has a paired electron in one 3p orbital; electron-electron repulsion makes it easier to remove.', NULL, 9);

-- Group Trends & Oxides
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-group-oxides', 'Define: Oxidation state', 'A number showing the number of electrons lost, gained, or shared. The charge an atom would have if the compound were ionic.', NULL, 1),
  ('chem-u4-group-oxides', 'Define: Allotropes', 'Different structural forms of the same element in the same physical state (e.g. diamond & graphite).', NULL, 2),
  ('chem-u4-group-oxides', 'Period 3 oxides: basic to acidic?', 'Na₂O, MgO (basic) → Al₂O₃ (amphoteric) → SiO₂, P₄O₁₀, SO₃, Cl₂O₇ (acidic).', NULL, 3),
  ('chem-u4-group-oxides', 'Na₂O + H₂O equation?', 'Na₂O + H₂O → 2NaOH (strongly alkaline, pH ~14).', 'Na₂O + H₂O → 2NaOH', 4),
  ('chem-u4-group-oxides', 'SO₃ + H₂O equation?', 'SO₃ + H₂O → H₂SO₄ (strongly acidic).', 'SO₃ + H₂O → H₂SO₄', 5),
  ('chem-u4-group-oxides', 'Group 1 reactivity with water: trend?', 'Increases down the group (Li → Cs). Lower ionisation energy = easier electron loss = more vigorous reaction.', NULL, 6);

-- Ionic Bonding
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-ionic', 'Define: Ionic bond', 'Electrostatic attraction between oppositely charged ions in a lattice.', NULL, 1),
  ('chem-u4-ionic', 'Properties of ionic compounds?', 'High m.p., conduct when molten/dissolved, brittle, often soluble in water, non-volatile.', NULL, 2),
  ('chem-u4-ionic', 'Why does MgO have a higher m.p. than NaCl?', 'Mg²⁺/O²⁻ have higher charges and smaller radii → much stronger electrostatic attraction.', NULL, 3);

-- Covalent Bonding
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-covalent', 'Define: Covalent bond', 'Electrostatic attraction between a shared pair of electrons and the positively charged nuclei.', NULL, 1),
  ('chem-u4-covalent', 'Define: Coordination bond', 'A covalent bond where both electrons in the shared pair come from the same atom (e.g. NH₃ → BF₃).', NULL, 2),
  ('chem-u4-covalent', 'Octet rule exceptions?', 'Electron deficient: BF₃ (6 e⁻). Expanded octet: SF₆ (12 e⁻), PCl₅ (10 e⁻). Also NO (odd electron).', NULL, 3),
  ('chem-u4-covalent', 'Bond order vs length vs strength?', 'Higher bond order = shorter bond = stronger bond. Triple < double < single in length.', NULL, 4),
  ('chem-u4-covalent', 'Diamond vs Graphite structure?', 'Diamond: each C bonded to 4 others (tetrahedral), very hard, insulator. Graphite: each C bonded to 3 (layers), delocalised e⁻, conducts, soft/slippery.', NULL, 5);

-- Resonance & Formal Charge (AHL)
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-resonance', 'What is a resonance hybrid?', 'The actual structure of a molecule, which is an average/blend of all valid resonance structures.', NULL, 1),
  ('chem-u4-resonance', 'Formal charge formula?', 'FC = (valence e⁻) – (lone pair e⁻) – ½(bonding e⁻). Preferred structure has lowest formal charges.', 'FC = V - L - B/2', 2);

-- Metallic Bonding
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-metallic', 'Define: Metallic bond', 'Electrostatic attraction between a lattice of cations and a sea of delocalised electrons.', NULL, 1),
  ('chem-u4-metallic', 'Metallic bond strength across Period 3?', 'Increases Na → Mg → Al: more delocalised electrons, higher cation charge, smaller cation radius.', NULL, 2);

-- Bonding Triangle & Alloys
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u4-bonding-tri', 'Define: Alloy', 'A homogeneous mixture of a metal with other metals or non-metals, with enhanced properties.', NULL, 1),
  ('chem-u4-bonding-tri', 'Bonding triangle axes?', 'x-axis: average electronegativity (increases →). y-axis: electronegativity difference (increases ↑). Vertices: metallic, ionic, covalent.', NULL, 2),
  ('chem-u4-bonding-tri', 'Why are alloys harder than pure metals?', 'Different-sized atoms disrupt the regular arrangement of layers, preventing them from sliding over each other.', NULL, 3);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u4-mcq-01', 'S3.1 Periodic Trends', 'SL/HL', '4',
   'Which property generally increases across a period from left to right?',
   'Atomic radius',
   'Electronegativity',
   'Metallic character',
   'Ionic radius of cations',
   1, 'Increasing nuclear charge across a period attracts bonding electrons more strongly, increasing electronegativity. Atomic radius decreases.', 56),

  ('chem-u4-mcq-02', 'S3.1 Periodic Trends', 'SL/HL', '4',
   'Why is the first ionisation energy of aluminium (577 kJ/mol) lower than that of magnesium (736 kJ/mol)?',
   'Aluminium has more protons',
   'Aluminium''s outer electron is in a 3p subshell which is higher in energy and easier to remove',
   'Magnesium has a larger atomic radius',
   'Aluminium has a full 3s subshell',
   1, 'Al''s outer electron is in a 3p orbital, which is higher in energy and further from the nucleus than Mg''s 3s², so it requires less energy to remove.', 57),

  ('chem-u4-mcq-03', 'S2.2 Covalent Bonding', 'SL/HL', '4',
   'Which of the following correctly lists the bonds in order of increasing bond length?',
   'C≡C < C=C < C–C',
   'C–C < C=C < C≡C',
   'C=C < C≡C < C–C',
   'C≡C < C–C < C=C',
   0, 'Triple bonds are the shortest (most electron density pulling nuclei together), single bonds are the longest.', 58),

  ('chem-u4-mcq-04', 'S2.1 Ionic Bonding', 'SL/HL', '4',
   'Which substance would you expect to have the highest melting point?',
   'NaCl',
   'MgO',
   'HCl',
   'CO₂',
   1, 'MgO has Mg²⁺ and O²⁻ ions — higher charges and smaller radii than NaCl give much stronger electrostatic attraction in the lattice.', 59),

  ('chem-u4-mcq-05', 'S3.1 Oxidation States', 'SL/HL', '4',
   'What is the oxidation state of sulfur in SO₄²⁻?',
   '+4',
   '+6',
   '–2',
   '+2',
   1, 'Each O is –2 (×4 = –8). Overall charge is –2. So S + (–8) = –2, giving S = +6.', 60),

  ('chem-u4-mcq-06', 'S2.2 Covalent Bonding', 'SL/HL', '4',
   'Which is an example of a coordination (dative covalent) bond?',
   'The O–H bond in water',
   'The N–H bond in NH₃',
   'The bond between NH₃ and H⁺ to form NH₄⁺',
   'The C=O bond in CO₂',
   2, 'In NH₄⁺, the nitrogen lone pair is donated to an empty orbital on H⁺ — both electrons come from N.', 61),

  ('chem-u4-mcq-07', 'S2.2 Covalent Bonding', 'SL/HL', '4',
   'Why is graphite an electrical conductor while diamond is not?',
   'Graphite has ionic bonds between layers',
   'Each carbon in graphite forms 4 covalent bonds',
   'Graphite has delocalised electrons between its layers that can carry charge',
   'Diamond is a molecular covalent substance',
   2, 'In graphite each C bonds to 3 others, leaving one electron per atom delocalised across the layers, enabling conductivity.', 62),

  ('chem-u4-mcq-08', 'S2.4 Bonding Triangle, Alloys & Materials', 'SL/HL', '4',
   'On the van Arkel–Ketelaar bonding triangle, a compound with a high electronegativity difference and high average electronegativity would be classified as:',
   'Metallic',
   'Covalent',
   'Ionic',
   'Network covalent',
   2, 'High EN difference = large charge separation (ionic character). High average EN means both atoms are non-metal-like, but the large difference dominates → ionic.', 63),

  ('chem-u4-mcq-09', 'S2.4 Bonding Triangle, Alloys & Materials', 'SL/HL', '4',
   'Which of the following correctly describes an alloy?',
   'A pure metal with enhanced conductivity',
   'A homogeneous mixture of a metal with other metals or non-metals',
   'An ionic compound of two metals',
   'A covalent network of metal atoms',
   1, 'Alloys are homogeneous mixtures. Different-sized atoms disrupt regular packing, making them harder and less malleable.', 64),

  ('chem-u4-mcq-10', 'S2.2 Resonance & Formal Charge (AHL)', 'HL', '4',
   'What is the formal charge on nitrogen in the Lewis structure of N₂O where the arrangement is N=N=O (with no lone pairs on the central N)?',
   '–1',
   '0',
   '+1',
   '+2',
   2, 'Central N: FC = 5 – 0 – ½(8) = +1. (5 valence electrons, 0 lone pair electrons, 8 bonding electrons.)', 65),

  ('chem-u4-mcq-11', 'S2.3 Metallic Bonding', 'SL/HL', '4',
   'Which factor best explains why metallic bond strength increases from Na to Al across Period 3?',
   'Increasing atomic mass',
   'Increasing number of delocalised electrons and decreasing cation radius',
   'Decreasing electronegativity',
   'Increasing number of electron shells',
   1, 'Na⁺ has 1 delocalised e⁻, Mg²⁺ has 2, Al³⁺ has 3. Higher charge and smaller ionic radius = stronger attraction to the electron sea.', 66),

  ('chem-u4-mcq-12', 'S3.1 Group Trends & Oxides', 'SL/HL', '4',
   'Which Period 3 oxide is amphoteric?',
   'Na₂O',
   'MgO',
   'Al₂O₃',
   'SO₃',
   2, 'Al₂O₃ can react with both acids and bases, making it amphoteric. Na₂O and MgO are basic; SO₃ is acidic.', 67),

  ('chem-u4-mcq-13', 'S2.2 Resonance & Formal Charge (AHL)', 'HL', '4',
   'The bond lengths in the carbonate ion CO₃²⁻ are all equal (129 pm), which is between the values for C–O and C=O. This is best explained by:',
   'All bonds are single bonds',
   'All bonds are double bonds',
   'The ion is a resonance hybrid with delocalised electrons',
   'The ion has coordinate bonds',
   2, 'Three equivalent resonance structures distribute the double bond character equally, giving an intermediate bond order of ~1.33.', 68),

  ('chem-u4-mcq-14', 'S3.1 Periodic Trends', 'SL/HL', '4',
   'Which of these ions has the smallest ionic radius?',
   'Na⁺',
   'Mg²⁺',
   'Al³⁺',
   'O²⁻',
   2, 'Na⁺, Mg²⁺, Al³⁺ are isoelectronic (10 e⁻). Al³⁺ has 13 protons pulling on 10 electrons → smallest radius.', 69),

  ('chem-u4-mcq-15', 'S3.1 Group Trends & Oxides', 'SL/HL', '4',
   'What is the correct equation for the reaction of sodium oxide with water?',
   'Na₂O + H₂O → 2NaOH',
   'Na₂O + H₂O → NaOH + NaH',
   '2Na₂O + H₂O → 4Na + 2OH⁻',
   'Na₂O → 2Na + O',
   0, 'Group 1 metal oxides react with water to form metal hydroxides. Na₂O + H₂O → 2NaOH (alkaline solution).', 70);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT OR IGNORE INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u4-wr-01', 'S3.1 Periodic Trends', 'SL/HL', 'short_answer', '4', 3,
   'Explain why atomic radius decreases across Period 3 from sodium to chlorine. [3]',
   '✓ Increasing number of protons / increasing nuclear charge across the period [1]\n✓ Electrons are added to the same energy level / same shielding [1]\n✓ Greater effective nuclear charge pulls the electron cloud closer to the nucleus [1]',
   36),

  ('chem-u4-wr-02', 'S3.1 Periodic Trends', 'SL/HL', 'short_answer', '4', 3,
   'Explain why the first ionisation energy of sulfur (1000 kJ/mol) is less than that of phosphorus (1060 kJ/mol), despite sulfur having a higher nuclear charge. [3]',
   '✓ Phosphorus has the configuration 3p³ with one electron in each 3p orbital / all unpaired [1]\n✓ Sulfur has the configuration 3p⁴ with one orbital containing a pair of electrons [1]\n✓ The paired electrons in sulfur experience repulsion, making one easier to remove [1]',
   37),

  ('chem-u4-wr-03', 'S2.1 Ionic Bonding', 'SL/HL', 'short_answer', '4', 5,
   'Describe the structure of sodium chloride and explain why it has a high melting point but does not conduct electricity as a solid. [5]',
   '✓ NaCl forms a regular/giant 3D lattice structure of alternating Na⁺ and Cl⁻ ions [1]\n✓ Strong electrostatic attraction between oppositely charged ions (ionic bond) [1]\n✓ Large amount of energy needed to overcome the many strong ionic bonds → high m.p. [1]\n✓ In the solid state, ions are held in fixed positions within the lattice [1]\n✓ No mobile charge carriers (ions cannot move) → does not conduct; conducts when molten/dissolved because ions are free to move [1]',
   38),

  ('chem-u4-wr-04', 'S2.2 Covalent Bonding', 'SL/HL', 'short_answer', '4', 6,
   'Compare and contrast the structures and properties of diamond and graphite. Explain the differences in hardness and electrical conductivity. [6]',
   '✓ Both are allotropes of carbon / giant covalent (network) structures [1]\n✓ Diamond: each C is bonded to 4 other C atoms in a tetrahedral arrangement [1]\n✓ Graphite: each C is bonded to 3 other C atoms in flat hexagonal layers [1]\n✓ Diamond is very hard because strong covalent bonds extend in all directions with no weak points [1]\n✓ Graphite is soft/slippery because weak London dispersion forces between layers allow them to slide [1]\n✓ In graphite, the fourth electron on each C is delocalised across the layers, allowing electrical conduction; diamond has no delocalised electrons so it is an insulator [1]',
   39),

  ('chem-u4-wr-05', 'S2.2 Resonance & Formal Charge (AHL)', 'HL', 'short_answer', '4', 5,
   'Explain what is meant by a resonance structure. Draw the resonance structures of the carbonate ion (CO₃²⁻) and explain why all three C–O bond lengths are equal. [5]',
   '✓ Resonance structures are two or more valid Lewis structures for the same species, differing in the position of a multiple bond [1]\n✓ Three valid Lewis structures drawn, each showing one C=O and two C–O single bonds with the double bond on a different oxygen [1]\n✓ Formal charges correctly assigned / overall charge of 2– shown [1]\n✓ The actual structure is a resonance hybrid / the electrons are delocalised over all three C–O bonds [1]\n✓ This gives a bond order of ~1.33 for each bond, so all bond lengths are identical/intermediate between C–O and C=O [1]',
   40),

  ('chem-u4-wr-06', 'S2.2 Resonance & Formal Charge (AHL)', 'HL', 'short_answer', '4', 4,
   'Using the concept of formal charge, determine which of the three possible Lewis structures for N₂O (arrangement: N–N–O) is the most preferred. Show your working. [4]',
   '✓ Three Lewis structures identified: (A) N=N=O, (B) N≡N–O, (C) N–N≡O [1]\n✓ Formal charges correctly calculated for at least two structures using FC = V – L – B/2 [1]\n✓ Structure B preferred: FCs are 0, +1, –1 (lowest magnitudes, and negative charge on more electronegative O) [1]\n✓ Structure C rejected: has a formal charge of –2 on the terminal N, which is unfavourable [1]',
   41),

  ('chem-u4-wr-07', 'S2.3 Metallic Bonding', 'SL/HL', 'short_answer', '4', 4,
   'Explain the trend in melting points of the metals Na, Mg, and Al in Period 3. [4]',
   '✓ All three are metallic: cations in a lattice with delocalised electrons [1]\n✓ Na⁺ (1+, 102 pm), Mg²⁺ (2+, 72 pm), Al³⁺ (3+, 54 pm): increasing charge and decreasing ionic radius [1]\n✓ More delocalised electrons per atom (1, 2, 3 respectively) and higher charge density [1]\n✓ Stronger electrostatic attraction between cations and electron sea → higher melting point from Na to Al [1]',
   42),

  ('chem-u4-wr-08', 'S2.4 Bonding Triangle, Alloys & Materials', 'SL/HL', 'short_answer', '4', 3,
   'Explain why alloys are generally harder and less malleable than pure metals. Give one example of an alloy and its use. [3]',
   '✓ In a pure metal, layers of identical cations can slide over each other [1]\n✓ In an alloy, atoms of different sizes disrupt the regular arrangement/packing, preventing layers from sliding easily [1]\n✓ Example: steel (iron + carbon) used in construction; or bronze (copper + tin) used in tools/sculpture [1]',
   43),

  ('chem-u4-wr-09', 'S3.1 Group Trends & Oxides', 'SL/HL', 'short_answer', '4', 5,
   'Describe how the bonding in Period 3 oxides changes from Na₂O to Cl₂O₇ and relate this to the acid–base character of the oxides. [5]',
   '✓ Na₂O and MgO are ionic (large EN difference) and form basic solutions in water [1]\n✓ Al₂O₃ has bonding intermediate between ionic and covalent; it is amphoteric (reacts with both acids and bases) [1]\n✓ SiO₂ is a covalent network solid; insoluble in water but weakly acidic [1]\n✓ P₄O₁₀, SO₃, Cl₂O₇ are molecular covalent; they dissolve in water to form acidic solutions [1]\n✓ Trend: bonding changes from ionic → covalent as electronegativity difference decreases; oxide character changes from basic → amphoteric → acidic [1]',
   44),

  ('chem-u4-wr-10', 'S2.4 Bonding Triangle, Alloys & Materials', 'SL/HL', 'short_answer', '4', 4,
   'Explain the position of NaCl on the van Arkel–Ketelaar bonding triangle. How does its position relate to its properties? [4]',
   '✓ NaCl has a high electronegativity difference (~2.1) and moderate average electronegativity (~1.8) [1]\n✓ This places it near the ionic vertex/top of the bonding triangle [1]\n✓ Ionic position predicts: high melting point, brittle, conducts when molten, soluble in water [1]\n✓ These predicted properties match the observed properties of NaCl [1]',
   45);
