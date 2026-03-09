-- ============================================================
-- Chemistry Content Seed Data — Unit 2: Make Every Atom Count
-- Syllabus: S1.4.5, S1.4.6, S1.5.1–S1.5.4, R2.1.3–R2.1.5
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('S1.4.5 Concentration & Solutions', '#2563EB'),
  ('S1.4.6 Avogadro''s Law & Molar Volume', '#7C3AED'),
  ('S1.5 Ideal Gas Model', '#0891B2'),
  ('R2.1 Limiting Reagents & Yield', '#D97706'),
  ('Titration & Volumetric Analysis', '#059669'),
  ('Errors & Uncertainties', '#DC2626');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT OR IGNORE INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('s1-4-5-concentration', 'S1.4.5 — Concentration & Solutions', '#2563EB', '2', 6),
  ('s1-4-6-avogadro', 'S1.4.6 — Avogadro''s Law & Molar Volume', '#7C3AED', '2', 7),
  ('s1-5-ideal-gas', 'S1.5 — Ideal Gas Model', '#0891B2', '2', 8),
  ('r2-1-limiting', 'R2.1.3–R2.1.4 — Limiting & Excess Reagents', '#D97706', '2', 9),
  ('r2-1-yield', 'R2.1.5 — Percentage Yield & Atom Economy', '#E11D48', '2', 10),
  ('u2-titration', 'Titration & Volumetric Analysis', '#059669', '2', 11),
  ('u2-errors', 'Errors & Uncertainties', '#DC2626', '2', 12);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- S1.4.5 Concentration & Solutions
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-4-5-concentration', 'Define solute, solvent, and solution', 1),
  ('s1-4-5-concentration', 'Calculate molar concentration using c = n / V', 2),
  ('s1-4-5-concentration', 'Convert between cm³ and dm³ (divide by 1000)', 3),
  ('s1-4-5-concentration', 'Calculate concentration in g dm⁻³ using mass / volume', 4),
  ('s1-4-5-concentration', 'Convert between g dm⁻³ and mol dm⁻³ using molar mass', 5),
  ('s1-4-5-concentration', 'Calculate the concentration of individual ions in a solution', 6),
  ('s1-4-5-concentration', 'Calculate the mass of solute needed to prepare a standard solution', 7),
  ('s1-4-5-concentration', 'Use the dilution formula C₁V₁ = C₂V₂', 8),
  ('s1-4-5-concentration', 'Describe how to prepare a standard solution using a volumetric flask', 9),
  ('s1-4-5-concentration', 'Understand the purpose of rinsing the beaker/rod into the volumetric flask', 10);

-- S1.4.6 Avogadro's Law & Molar Volume
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-4-6-avogadro', 'State Avogadro''s law (equal volumes, same T & P, equal number of molecules)', 1),
  ('s1-4-6-avogadro', 'Know the molar volume at STP = 22.7 dm³ mol⁻¹', 2),
  ('s1-4-6-avogadro', 'Use gas volume ratios from balanced equations', 3),
  ('s1-4-6-avogadro', 'Calculate volume of gas from moles using V = n × Vₘ', 4),
  ('s1-4-6-avogadro', 'Determine leftover gases when reactants are not in stoichiometric ratio', 5);

-- S1.5 Ideal Gas Model
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s1-5-ideal-gas', 'List the assumptions of the ideal gas model (no volume, no IMFs, elastic collisions, random motion)', 1),
  ('s1-5-ideal-gas', 'Explain why real gases deviate at low T and high P', 2),
  ('s1-5-ideal-gas', 'State and use the ideal gas equation PV = nRT (R = 8.31 J K⁻¹ mol⁻¹)', 3),
  ('s1-5-ideal-gas', 'Convert units: °C to K, cm³ to m³, kPa to Pa', 4),
  ('s1-5-ideal-gas', 'Use the combined gas law P₁V₁/T₁ = P₂V₂/T₂', 5),
  ('s1-5-ideal-gas', 'Describe Boyle''s law (P ∝ 1/V at constant T)', 6),
  ('s1-5-ideal-gas', 'Describe Charles''s law (V ∝ T at constant P)', 7),
  ('s1-5-ideal-gas', 'Describe Gay-Lussac''s law (P ∝ T at constant V)', 8),
  ('s1-5-ideal-gas', 'Sketch and interpret P-V, V-T, and P-T graphs', 9);

-- R2.1.3–R2.1.4 Limiting & Excess Reagents
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-1-limiting', 'Define limiting reagent and excess reagent', 1),
  ('r2-1-limiting', 'Identify the limiting reagent by comparing mole ratios', 2),
  ('r2-1-limiting', 'Calculate the theoretical yield from the limiting reagent', 3),
  ('r2-1-limiting', 'Calculate the mass of excess reagent remaining', 4),
  ('r2-1-limiting', 'Balance chemical equations', 5);

-- R2.1.5 Percentage Yield & Atom Economy
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-1-yield', 'Calculate percentage yield = (actual / theoretical) × 100', 1),
  ('r2-1-yield', 'Explain reasons why percentage yield < 100%', 2),
  ('r2-1-yield', 'Calculate atom economy = (Mᵣ desired product / Mᵣ all products) × 100', 3),
  ('r2-1-yield', 'Explain why high atom economy is important for sustainability', 4),
  ('r2-1-yield', 'Understand the difference between atom economy and percentage yield', 5);

-- Titration & Volumetric Analysis
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('u2-titration', 'Describe the procedure for an acid–base titration', 1),
  ('u2-titration', 'Calculate unknown concentrations from titration data', 2),
  ('u2-titration', 'Define primary standard and secondary standard', 3),
  ('u2-titration', 'Know what properties a primary standard must have', 4),
  ('u2-titration', 'Explain the use of indicators and the end-point vs equivalence point', 5),
  ('u2-titration', 'Calculate concordant titre values and use the mean', 6);

-- Errors & Uncertainties
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('u2-errors', 'Define random error and systematic error', 1),
  ('u2-errors', 'Define precision and accuracy', 2),
  ('u2-errors', 'Calculate percentage uncertainty from absolute uncertainty', 3),
  ('u2-errors', 'Propagate uncertainties (add % uncertainties for × and ÷)', 4),
  ('u2-errors', 'Calculate percentage error = |(theoretical − experimental) / theoretical| × 100', 5),
  ('u2-errors', 'Compare % error with total % uncertainty to evaluate methodology', 6);


-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u2-concentration', 'S1.4.5 Concentration & Solutions', '#2563EB', '2', 6),
  ('chem-u2-gas-laws', 'S1.4.6–S1.5 Gas Laws', '#7C3AED', '2', 7),
  ('chem-u2-stoich', 'R2.1 Limiting Reagents, Yield & Atom Economy', '#D97706', '2', 8),
  ('chem-u2-titration', 'Titration & Standards', '#059669', '2', 9),
  ('chem-u2-errors', 'Errors & Uncertainties', '#DC2626', '2', 10),
  ('chem-u2-conversions', 'Unit Conversions', '#6366F1', '2', 11);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Concentration & Solutions
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-concentration', 'Solute, Solvent, Solution', 'Solute = substance dissolved. Solvent = liquid it dissolves in. Solution = resulting mixture.', NULL, 1),
  ('chem-u2-concentration', 'Molar concentration', 'The amount of substance (in mol) per unit volume (in dm³) of solution.', 'c = n / V', 2),
  ('chem-u2-concentration', 'n = C × V', 'Moles = concentration (mol dm⁻³) × volume (dm³).', 'n = C × V', 3),
  ('chem-u2-concentration', 'Dilution formula', 'When diluting, moles of solute remain constant: C₁V₁ = C₂V₂.', 'C₁V₁ = C₂V₂', 4),
  ('chem-u2-concentration', 'Standard solution', 'A solution of accurately known concentration, prepared by dissolving a precisely weighed amount of solute and making up to a known volume.', NULL, 5),
  ('chem-u2-concentration', 'Primary standard', 'A substance that is highly pure (≥99.9%), stable, soluble in water, and has a high molar mass. Used to prepare standard solutions directly by weighing.', NULL, 6);

-- Gas Laws
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-gas-laws', 'Avogadro''s law', 'Equal volumes of all gases at the same temperature and pressure contain equal numbers of molecules.', NULL, 1),
  ('chem-u2-gas-laws', 'Molar volume at STP', 'The volume occupied by one mole of any ideal gas at STP (273.15 K, 100 kPa) = 22.7 dm³ mol⁻¹.', 'Vₘ = 22.7 dm³ mol⁻¹', 2),
  ('chem-u2-gas-laws', 'Ideal gas', 'A theoretical gas with particles that have no volume, no intermolecular forces, and undergo perfectly elastic collisions.', NULL, 3),
  ('chem-u2-gas-laws', 'Real gas deviation', 'Real gases deviate from ideal at low temperature (IMFs become significant) and high pressure (particle volume becomes significant).', NULL, 4),
  ('chem-u2-gas-laws', 'Ideal gas equation', 'Relates pressure, volume, moles, and temperature of an ideal gas. R = 8.31 J K⁻¹ mol⁻¹.', 'PV = nRT', 5),
  ('chem-u2-gas-laws', 'Combined gas law', 'For a fixed amount of gas, relates initial and final conditions of P, V, and T.', 'P₁V₁/T₁ = P₂V₂/T₂', 6),
  ('chem-u2-gas-laws', 'Boyle''s law', 'P ∝ 1/V at constant temperature (inverse relationship).', 'P₁V₁ = P₂V₂', 7),
  ('chem-u2-gas-laws', 'Charles''s law', 'V ∝ T at constant pressure (direct relationship).', 'V₁/T₁ = V₂/T₂', 8),
  ('chem-u2-gas-laws', 'Gay-Lussac''s law', 'P ∝ T at constant volume (direct relationship).', 'P₁/T₁ = P₂/T₂', 9);

-- Stoichiometry: Limiting, Yield, Atom Economy
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-stoich', 'Limiting reagent', 'The reactant that is completely used up first in a reaction. It determines the maximum amount of product (theoretical yield).', NULL, 1),
  ('chem-u2-stoich', 'Excess reagent', 'The reactant that is not completely used up; some remains after the reaction.', NULL, 2),
  ('chem-u2-stoich', 'Percentage yield', 'A measure of how much product was actually obtained compared to the theoretical maximum.', '% yield = (actual yield / theoretical yield) × 100', 3),
  ('chem-u2-stoich', 'Atom economy', 'A measure of how efficiently atoms in the reactants are converted into the desired product.', '% atom economy = (Mᵣ desired product / Mᵣ all products) × 100', 4),
  ('chem-u2-stoich', 'Why high atom economy matters', 'Less waste is produced, fewer resources are consumed, and the process is more sustainable (greener chemistry).', NULL, 5);

-- Titration & Standards
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-titration', 'Mole (recap)', 'A unit used to measure the number of atoms, molecules, or ions. 1 mol = 6.02 × 10²³ particles (Avogadro''s constant).', NULL, 1),
  ('chem-u2-titration', 'Molar mass (M)', 'The mass of one mole of a substance, in g mol⁻¹. Numerically equal to the relative atomic/molecular mass.', NULL, 2),
  ('chem-u2-titration', 'n = m / M', 'Moles = mass (g) / molar mass (g mol⁻¹).', 'n = m / M', 3);

-- Errors & Uncertainties
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-errors', 'Random error', 'Unpredictable variations in measurements that cause scatter. Reduced by averaging multiple trials.', NULL, 1),
  ('chem-u2-errors', 'Systematic error', 'A consistent offset in measurements caused by flawed methodology or equipment. Cannot be reduced by averaging.', NULL, 2),
  ('chem-u2-errors', 'Precision', 'How close repeated measurements are to each other (low scatter = high precision).', NULL, 3),
  ('chem-u2-errors', 'Accuracy', 'How close a measurement is to the true/accepted value.', NULL, 4),
  ('chem-u2-errors', 'Percentage error', 'Compares experimental result to the accepted/theoretical value.', '% error = |(theoretical − experimental) / theoretical| × 100', 5);

-- Unit Conversions
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u2-conversions', 'cm³ to dm³', 'Divide by 1000. E.g. 250 cm³ = 0.250 dm³.', '1 dm³ = 1000 cm³', 1),
  ('chem-u2-conversions', '°C to K', 'Add 273.15. E.g. 25°C = 298.15 K.', 'K = °C + 273.15', 2),
  ('chem-u2-conversions', 'cm³ to m³', 'Divide by 1,000,000. E.g. 500 cm³ = 5.00 × 10⁻⁴ m³.', '1 m³ = 10⁶ cm³', 3),
  ('chem-u2-conversions', 'kPa to Pa', 'Multiply by 1000. E.g. 101.3 kPa = 101300 Pa.', '1 kPa = 1000 Pa', 4);


-- ─── MCQ QUESTIONS ───────────────────────────────────────────

INSERT OR IGNORE INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u2-mcq-01', 'S1.4.5 Concentration & Solutions', 'SL/HL', '2',
   'What is the number of moles in 250 cm³ of 2.00 mol dm⁻³ NaCl solution?',
   '0.125 mol',
   '0.500 mol',
   '2.00 mol',
   '8.00 mol',
   1,
   'n = C × V = 2.00 × (250/1000) = 0.500 mol.',
   21),

  ('chem-u2-mcq-02', 'S1.5 Ideal Gas Model', 'SL/HL', '2',
   'Which of the following is NOT an assumption of the ideal gas model?',
   'Gas particles have negligible volume',
   'No intermolecular forces between particles',
   'All collisions are elastic',
   'Gas particles move at the same speed',
   3,
   'Ideal gas particles have a range of speeds (Maxwell-Boltzmann distribution). All other options are correct assumptions.',
   22),

  ('chem-u2-mcq-03', 'S1.5 Ideal Gas Model', 'SL/HL', '2',
   'Real gases deviate most from ideal behaviour under:',
   'High temperature and low pressure',
   'Low temperature and low pressure',
   'Low temperature and high pressure',
   'High temperature and high pressure',
   2,
   'At low T, particles move slowly so IMFs are significant. At high P, volume of particles is significant relative to container.',
   23),

  ('chem-u2-mcq-04', 'S1.4.6 Avogadro''s Law & Molar Volume', 'SL/HL', '2',
   'The molar volume of an ideal gas at STP (0 °C, 100 kPa) is:',
   '22.4 dm³ mol⁻¹',
   '22.7 dm³ mol⁻¹',
   '24.0 dm³ mol⁻¹',
   '24.8 dm³ mol⁻¹',
   1,
   'The IB data booklet gives Vₘ = 22.7 dm³ mol⁻¹ at STP (273.15 K, 100 kPa).',
   24),

  ('chem-u2-mcq-05', 'R2.1 Limiting Reagents & Yield', 'SL/HL', '2',
   'In the reaction N₂ + 3H₂ → 2NH₃, if 2 mol N₂ and 3 mol H₂ are mixed, the limiting reagent is:',
   'N₂',
   'H₂',
   'NH₃',
   'Neither, they are in the correct ratio',
   1,
   '2 mol N₂ requires 6 mol H₂ (1:3 ratio). Only 3 mol H₂ available, so H₂ is limiting.',
   25),

  ('chem-u2-mcq-06', 'R2.1 Limiting Reagents & Yield', 'SL/HL', '2',
   'The percentage yield of a reaction is calculated by:',
   '(theoretical yield / actual yield) × 100',
   '(actual yield / theoretical yield) × 100',
   '(actual yield − theoretical yield) × 100',
   '(Mᵣ of product / Mᵣ of reactants) × 100',
   1,
   '% yield = (actual yield / theoretical yield) × 100. Option D describes atom economy.',
   26),

  ('chem-u2-mcq-07', 'R2.1 Limiting Reagents & Yield', 'SL/HL', '2',
   'For the reaction S + O₂ → SO₂, the atom economy is:',
   '50%',
   '75%',
   '100%',
   'Cannot be determined',
   2,
   'There is only one product (SO₂), so all atoms from reactants end up in the desired product. Atom economy = 100%.',
   27),

  ('chem-u2-mcq-08', 'S1.4.5 Concentration & Solutions', 'SL/HL', '2',
   '150 cm³ of water is added to 50.0 cm³ of 2.00 mol dm⁻³ HCl. The new concentration is:',
   '0.250 mol dm⁻³',
   '0.500 mol dm⁻³',
   '1.00 mol dm⁻³',
   '1.50 mol dm⁻³',
   1,
   'C₁V₁ = C₂V₂: 2.00 × 50.0 = C₂ × 200.0. C₂ = 100/200 = 0.500 mol dm⁻³.',
   28),

  ('chem-u2-mcq-09', 'Titration & Volumetric Analysis', 'SL/HL', '2',
   '35.00 cm³ of NaOH is needed to neutralise 25.00 cm³ of 0.2000 mol dm⁻³ H₂SO₄. The concentration of NaOH is:',
   '0.1429 mol dm⁻³',
   '0.2857 mol dm⁻³',
   '0.4286 mol dm⁻³',
   '0.8571 mol dm⁻³',
   1,
   '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. n(H₂SO₄) = 0.2000 × 0.02500 = 0.005000 mol. n(NaOH) = 0.01000 mol. c(NaOH) = 0.01000/0.03500 = 0.2857 mol dm⁻³.',
   29),

  ('chem-u2-mcq-10', 'S1.4.5 Concentration & Solutions', 'SL/HL', '2',
   'The concentration of nitrate ions in 0.300 mol dm⁻³ Fe(NO₃)₃ solution is:',
   '0.300 mol dm⁻³',
   '0.450 mol dm⁻³',
   '0.600 mol dm⁻³',
   '0.900 mol dm⁻³',
   3,
   'Fe(NO₃)₃ contains 3 NO₃⁻ ions per formula unit: 0.300 × 3 = 0.900 mol dm⁻³.',
   30),

  ('chem-u2-mcq-11', 'Errors & Uncertainties', 'SL/HL', '2',
   'Repeated measurements of a quantity can reduce the effects of:',
   'Random errors only',
   'Systematic errors only',
   'Both random and systematic errors',
   'Neither random nor systematic errors',
   0,
   'Averaging reduces random error. Systematic errors shift all readings in the same direction and are not reduced by repetition.',
   31),

  ('chem-u2-mcq-12', 'Errors & Uncertainties', 'SL/HL', '2',
   'A student reads the meniscus at the top instead of the bottom. This error affects:',
   'Neither precision nor accuracy',
   'Only accuracy',
   'Only precision',
   'Both precision and accuracy',
   1,
   'Reading the top of the meniscus consistently gives systematically higher readings (less accurate), but values remain close together (still precise).',
   32),

  ('chem-u2-mcq-13', 'S1.5 Ideal Gas Model', 'SL/HL', '2',
   '10 m³ of gas expands to 20.0 m³ at constant temperature. If final pressure is 1.0 × 10⁵ Pa, the initial pressure is:',
   '0.50 × 10⁵ Pa',
   '1.0 × 10⁵ Pa',
   '2.0 × 10⁵ Pa',
   '4.0 × 10⁵ Pa',
   2,
   'Boyle''s law: P₁V₁ = P₂V₂. P₁ × 10 = 1.0 × 10⁵ × 20. P₁ = 2.0 × 10⁵ Pa.',
   33),

  ('chem-u2-mcq-14', 'S1.4.5 Concentration & Solutions', 'SL/HL', '2',
   'The volume of 0.150 mol dm⁻³ Al₂(SO₄)₃ needed to obtain 0.328 mol of sulfate ions is:',
   '0.729 dm³',
   '1.83 dm³',
   '2.19 dm³',
   '2.89 dm³',
   0,
   'Al₂(SO₄)₃ has 3 SO₄²⁻ per unit. Moles of Al₂(SO₄)₃ = 0.328/3 = 0.1093. V = n/c = 0.1093/0.150 = 0.729 dm³.',
   34),

  ('chem-u2-mcq-15', 'S1.4.5 Concentration & Solutions', 'SL/HL', '2',
   '54.2 g of Ba(OH)₂ (Mᵣ = 171) dissolved in 5.00 dm³. The molarity of OH⁻ is:',
   '0.0317 mol dm⁻³',
   '0.0634 mol dm⁻³',
   '0.127 mol dm⁻³',
   '0.634 mol dm⁻³',
   2,
   'n(Ba(OH)₂) = 54.2/171 = 0.317 mol. c(Ba(OH)₂) = 0.317/5.00 = 0.0634 mol dm⁻³. Each Ba(OH)₂ gives 2 OH⁻, so [OH⁻] = 0.0634 × 2 = 0.127 mol dm⁻³.',
   35);


-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

INSERT OR IGNORE INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u2-wr-01', 'S1.4.5 Concentration & Solutions', 'SL/HL', 'short_answer', '2', 2,
   'Calculate the number of moles in 600.0 cm³ of 0.500 mol dm⁻³ CuSO₄ solution.',
   '[1] V = 600.0 / 1000 = 0.6000 dm³
[1] n = C × V = 0.500 × 0.6000 = 0.300 mol',
   17),

  ('chem-u2-wr-02', 'S1.4.5 Concentration & Solutions', 'SL/HL', 'short_answer', '2', 3,
   '58.5 g of gold(III) chloride (Au₂Cl₆, Mᵣ = 303.32) is dissolved in 500 cm³ of solution. (a) Calculate the concentration in g dm⁻³. [1] (b) Calculate the concentration in mol dm⁻³. [2]',
   '[1] (a) c = 58.5 / 0.500 = 117 g dm⁻³
[1] (b) n = 58.5 / 303.32 = 0.1929 mol
[1] c = 0.1929 / 0.500 = 0.386 mol dm⁻³',
   18),

  ('chem-u2-wr-03', 'R2.1 Limiting Reagents & Yield', 'SL/HL', 'short_answer', '2', 4,
   'In the reaction: 2 SO₂(g) + O₂(g) → 2 SO₃(g). (a) Calculate the maximum mass of SO₃ that can be made from 96.0 g of SO₂ with excess O₂. [3] (b) If only 90.0 g of SO₃ was obtained, calculate the percentage yield. [1]',
   '[1] (a) n(SO₂) = 96.0 / 64.07 = 1.499 mol
[1] Mole ratio SO₂:SO₃ = 1:1, so n(SO₃) = 1.499 mol
[1] m(SO₃) = 1.499 × 80.07 = 120 g
[1] (b) % yield = (90.0 / 120) × 100 = 75.0%',
   19),

  ('chem-u2-wr-04', 'R2.1 Limiting Reagents & Yield', 'SL/HL', 'short_answer', '2', 5,
   '5.00 g of iron and 5.00 g of sulfur are heated: Fe(s) + S(s) → FeS(s). (a) Identify the limiting reagent. Show your working. [3] (b) Calculate the maximum mass of FeS produced. [2]',
   '[1] (a) n(Fe) = 5.00 / 55.85 = 0.0895 mol
[1] n(S) = 5.00 / 32.07 = 0.1559 mol
[1] Mole ratio Fe:S = 1:1. Fe has fewer moles, so Fe is limiting.
[1] (b) n(FeS) = n(Fe) = 0.0895 mol
[1] m(FeS) = 0.0895 × 87.92 = 7.87 g',
   20),

  ('chem-u2-wr-05', 'R2.1 Limiting Reagents & Yield', 'SL/HL', 'short_answer', '2', 2,
   'Determine the atom economy for the extraction of iron: 2 Fe₂O₃(s) + 3 C(s) → 4 Fe(l) + 3 CO₂(g)',
   '[1] Mᵣ of desired product = 4 × 55.85 = 223.4
[1] Mᵣ of all products = 223.4 + 3 × 44.01 = 355.4. Atom economy = (223.4 / 355.4) × 100 = 62.9%',
   21),

  ('chem-u2-wr-06', 'S1.4.6 Avogadro''s Law & Molar Volume', 'SL/HL', 'short_answer', '2', 3,
   'What volume of CO₂, measured at STP, is liberated from 5.00 g of CaCO₃ by excess HCl? CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂',
   '[1] n(CaCO₃) = 5.00 / 100.09 = 0.04996 mol
[1] Mole ratio CaCO₃:CO₂ = 1:1, so n(CO₂) = 0.04996 mol
[1] V = n × Vₘ = 0.04996 × 22.7 = 1.13 dm³',
   22),

  ('chem-u2-wr-07', 'S1.5 Ideal Gas Model', 'SL/HL', 'short_answer', '2', 3,
   'Calculate the volume that 0.400 mol of an ideal gas occupies at 100 °C and 1000 kPa.',
   '[1] T = 100 + 273 = 373 K; P = 1000 × 1000 = 1.00 × 10⁶ Pa
[1] V = nRT / P = (0.400 × 8.31 × 373) / (1.00 × 10⁶)
[1] V = 1240 / 1000000 = 1.24 × 10⁻³ m³ = 1.24 dm³',
   23),

  ('chem-u2-wr-08', 'S1.5 Ideal Gas Model', 'SL/HL', 'short_answer', '2', 3,
   'At 273 K and 101000 Pa, 6.319 g of a gas occupies 2.00 dm³. Calculate the relative molecular mass.',
   '[1] V = 2.00 / 1000 = 2.00 × 10⁻³ m³
[1] n = PV / RT = (101000 × 2.00 × 10⁻³) / (8.31 × 273) = 202 / 2268.6 = 0.08905 mol
[1] Mᵣ = m / n = 6.319 / 0.08905 = 71.0 g mol⁻¹',
   24),

  ('chem-u2-wr-09', 'Titration & Volumetric Analysis', 'SL/HL', 'short_answer', '2', 3,
   '36.0 cm³ of Na₂CO₃ solution of unknown concentration reacts exactly with 25.0 cm³ of 0.200 mol dm⁻³ HNO₃. Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂. Determine the concentration of Na₂CO₃.',
   '[1] n(HNO₃) = 0.200 × 0.0250 = 0.00500 mol
[1] Mole ratio Na₂CO₃:HNO₃ = 1:2, so n(Na₂CO₃) = 0.00250 mol
[1] c(Na₂CO₃) = 0.00250 / 0.0360 = 0.0694 mol dm⁻³',
   25),

  ('chem-u2-wr-10', 'R2.1 Limiting Reagents & Yield', 'SL/HL', 'short_answer', '2', 2,
   'Explain two reasons why percentage yield in a reaction is often less than 100%.',
   '[1] Product is lost during transfer/filtration/evaporation OR the reaction is incomplete / does not go to completion / is reversible.
[1] Side reactions produce unwanted by-products OR product is left behind in apparatus (e.g. on filter paper, in beaker).',
   26),

  ('chem-u2-wr-11', 'Errors & Uncertainties', 'SL/HL', 'short_answer', '2', 2,
   'Distinguish between precision and accuracy, using an example.',
   '[1] Precision: how close repeated measurements are to each other / low scatter.
[1] Accuracy: how close a measurement is to the true/accepted value. E.g. a set of titration values all close together but all too high is precise but not accurate.',
   27),

  ('chem-u2-wr-12', 'Errors & Uncertainties', 'SL/HL', 'short_answer', '2', 3,
   'A student calculates Vₘ = 24.5 dm³ mol⁻¹ with a total % uncertainty of 3.2%. The accepted value is 22.7 dm³ mol⁻¹. (a) Calculate the percentage error. [1] (b) Comment on whether the error is due to random or systematic error. [2]',
   '[1] (a) % error = |22.7 − 24.5| / 22.7 × 100 = 7.93%
[1] (b) The % error (7.93%) is greater than the total % uncertainty (3.2%).
[1] This indicates significant systematic error beyond random uncertainty, suggesting a flaw in the methodology (e.g. gas loss, temperature not measured correctly).',
   28);
