-- ============================================================
-- Chemistry Content Seed Data — Unit 8a: Equilibria & Spontaneity
-- Syllabus: R1.4.1–4, R2.3.1–7, R3.2.13–14 (AHL)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('R3.2.13-14 Spontaneity & Electrode Potentials', '#DC2626'),
  ('R1.4.1 Entropy', '#7C3AED'),
  ('R1.4.2-3 Gibbs Energy & Spontaneity', '#2563EB'),
  ('R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', '#059669'),
  ('R2.3.2-3 Equilibrium Constant Kc', '#F97316'),
  ('R2.3.5 Reaction Quotient Q (AHL)', '#D97706'),
  ('R2.3.6 ICE Tables (AHL)', '#0891B2'),
  ('R1.4.4/R2.3.7 Linking dG and K (AHL)', '#E11D48');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('r3-2-13-spont', 'R3.2.13–14 — Spontaneity & Standard Electrode Potentials', '#DC2626', '8a', 45),
  ('r1-4-1-entropy', 'R1.4.1 — Entropy', '#7C3AED', '8a', 46),
  ('r1-4-2-gibbs', 'R1.4.2–3 — Gibbs Energy & Spontaneity', '#2563EB', '8a', 47),
  ('r2-3-1-equil', 'R2.3.1/4 — Dynamic Equilibrium & Le Chatelier''s Principle', '#059669', '8a', 48),
  ('r2-3-2-kc', 'R2.3.2–3 — Equilibrium Constant Kc', '#F97316', '8a', 49),
  ('r2-3-5-q', 'R2.3.5 — Reaction Quotient Q (AHL)', '#D97706', '8a', 50),
  ('r2-3-6-ice', 'R2.3.6 — ICE Tables (AHL)', '#0891B2', '8a', 51),
  ('r1-4-4-dg-k', 'R1.4.4 / R2.3.7 — Linking dG and K (AHL)', '#E11D48', '8a', 52);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- R3.2.13-14 Spontaneity & Standard Electrode Potentials
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r3-2-13-spont', 'Calculate standard cell potential E(cell) from standard electrode potentials using the Data Booklet (Table 19)', 1),
  ('r3-2-13-spont', 'State that a positive E(cell) indicates a spontaneous reaction', 2),
  ('r3-2-13-spont', 'Predict whether a reaction is spontaneous in the forward or reverse direction from E data', 3),
  ('r3-2-13-spont', 'State and use the equation dG = -nFE(cell) and identify what n and F represent', 4),
  ('r3-2-13-spont', 'Explain why a positive E(cell) leads to a negative dG (and hence a spontaneous process)', 5),
  ('r3-2-13-spont', 'Calculate dG from E data, converting units correctly (J to kJ)', 6);

-- R1.4.1 Entropy
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-4-1-entropy', 'Define entropy (S) as a measure of the dispersal or distribution of matter and/or energy in a system', 1),
  ('r1-4-1-entropy', 'State the entropy ordering: S(gas) > S(liquid) > S(solid) under the same conditions', 2),
  ('r1-4-1-entropy', 'Predict whether a physical or chemical change increases or decreases entropy (e.g. change of state, dissolving, change in number of gas moles)', 3),
  ('r1-4-1-entropy', 'Calculate standard entropy changes dS = sum of S(products) - sum of S(reactants) using data booklet values', 4),
  ('r1-4-1-entropy', 'Understand the significance of zero entropy (perfect crystal at 0 K, Third Law of Thermodynamics)', 5);

-- R1.4.2-3 Gibbs Energy & Spontaneity
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-4-2-gibbs', 'State and use the equation dG = dH - TdS to calculate unknown values', 1),
  ('r1-4-2-gibbs', 'Convert units correctly (especially dS in J/K/mol vs dH in kJ/mol)', 2),
  ('r1-4-2-gibbs', 'State that a process is spontaneous when dG < 0, non-spontaneous when dG > 0, and at equilibrium when dG = 0', 3),
  ('r1-4-2-gibbs', 'Explain that an exothermic reaction is not always spontaneous (and vice versa) - entropy also matters', 4),
  ('r1-4-2-gibbs', 'Complete and interpret the four-case table: combinations of dH (+/-) and dS (+/-) and their effect on spontaneity at different temperatures', 5),
  ('r1-4-2-gibbs', 'Determine the temperature at which a reaction becomes spontaneous (set dG = 0, solve T = dH/dS)', 6);

-- R2.3.1/4 Dynamic Equilibrium & Le Chatelier's Principle
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-3-1-equil', 'Define dynamic equilibrium: closed system, forward and reverse rates equal, no net change in macroscopic properties', 1),
  ('r2-3-1-equil', 'List the five key characteristics of dynamic equilibrium', 2),
  ('r2-3-1-equil', 'Explain why a closed system is required for equilibrium', 3),
  ('r2-3-1-equil', 'State Le Chatelier''s principle in own words', 4),
  ('r2-3-1-equil', 'Predict and explain the effect of changes in concentration on the position of equilibrium', 5),
  ('r2-3-1-equil', 'Predict and explain the effect of changes in pressure/volume on equilibrium (relating to moles of gas)', 6),
  ('r2-3-1-equil', 'Predict and explain the effect of changes in temperature on equilibrium (linking to dH sign)', 7),
  ('r2-3-1-equil', 'State that a catalyst has no effect on the position of equilibrium or the value of K', 8);

-- R2.3.2-3 Equilibrium Constant Kc
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-3-2-kc', 'Write equilibrium constant expressions (Kc) from balanced equations for homogeneous reactions', 1),
  ('r2-3-2-kc', 'Explain why solids and pure liquids are excluded from Kc expressions in heterogeneous equilibria', 2),
  ('r2-3-2-kc', 'Interpret the magnitude of Kc: large K = products favoured; small K = reactants favoured', 3),
  ('r2-3-2-kc', 'State that Kc does not tell us about the rate of reaction', 4),
  ('r2-3-2-kc', 'Determine K relationships when a reaction is reversed (K'' = 1/K), doubled (K'' = K squared), halved (K'' = square root of K)', 5),
  ('r2-3-2-kc', 'State that only temperature changes the value of Kc; concentration and pressure changes do not', 6),
  ('r2-3-2-kc', 'Deduce units for Kc from the expression', 7);

-- R2.3.5 Reaction Quotient Q (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-3-5-q', 'Define Q and explain how it differs from K (Q uses non-equilibrium concentrations)', 1),
  ('r2-3-5-q', 'Calculate Q from given concentrations', 2),
  ('r2-3-5-q', 'Predict the direction of reaction: Q < K -> forward; Q > K -> reverse; Q = K -> at equilibrium', 3);

-- R2.3.6 ICE Tables (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-3-6-ice', 'Set up an ICE table (Initial, Change, Equilibrium) for a given reaction and initial conditions', 1),
  ('r2-3-6-ice', 'Solve for equilibrium concentrations given Kc and initial amounts', 2),
  ('r2-3-6-ice', 'Calculate Kc (value and units) given equilibrium or initial data', 3),
  ('r2-3-6-ice', 'Correctly convert between moles and concentration using volume', 4);

-- R1.4.4/R2.3.7 Linking dG and K (AHL)
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-4-4-dg-k', 'State and use dG = dG_standard + RT ln Q', 1),
  ('r1-4-4-dg-k', 'Derive and use dG_standard = -RT ln K (at equilibrium, dG = 0, Q = K)', 2),
  ('r1-4-4-dg-k', 'Explain that as a reaction approaches equilibrium, dG becomes less negative and reaches zero', 3),
  ('r1-4-4-dg-k', 'Calculate K from dG_standard (and vice versa), using R = 8.31 J/K/mol', 4),
  ('r1-4-4-dg-k', 'Link negative dG_standard to K > 1 (products favoured) and positive dG_standard to K < 1 (reactants favoured)', 5);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u8a-key-defs', 'Unit 8a — Key Definitions', '#7C3AED', '8a', 37),
  ('chem-u8a-key-eqns', 'Unit 8a — Key Equations & Relationships', '#2563EB', '8a', 38),
  ('chem-u8a-spont-cond', 'Unit 8a — Spontaneity Conditions', '#DC2626', '8a', 39);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Key Definitions (10 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u8a-key-defs', 'What is dynamic equilibrium?', 'A state in a closed system where the rate of the forward reaction equals the rate of the reverse reaction; no net change in concentrations of reactants and products.', NULL, 1),
  ('chem-u8a-key-defs', 'What is entropy (S)?', 'A measure of the dispersal or distribution of matter and/or energy in a system. Related to the number of microstates.', NULL, 2),
  ('chem-u8a-key-defs', 'What is Gibbs energy change (dG)?', 'The energy from a chemical reaction that can be used to do non-mechanical work. dG = dH - TdS.', NULL, 3),
  ('chem-u8a-key-defs', 'What is a spontaneous process?', 'A process which occurs without the need for a continual input of energy from an external source. Requires dG < 0.', NULL, 4),
  ('chem-u8a-key-defs', 'What is Le Chatelier''s Principle?', 'If a system at equilibrium is disturbed, it responds to partially counteract the disturbance and restore a new equilibrium.', NULL, 5),
  ('chem-u8a-key-defs', 'What is the equilibrium constant (Kc)?', 'The ratio of product concentrations to reactant concentrations (each raised to their stoichiometric coefficients) at equilibrium.', NULL, 6),
  ('chem-u8a-key-defs', 'What is the reaction quotient (Q)?', 'Same expression as K but calculated using concentrations at any point in time (not necessarily equilibrium).', NULL, 7),
  ('chem-u8a-key-defs', 'What is a homogeneous equilibrium?', 'An equilibrium where all species are in the same phase.', NULL, 8),
  ('chem-u8a-key-defs', 'What is an ICE table?', 'A method (Initial, Change, Equilibrium) used to organise and calculate equilibrium concentrations from Kc.', NULL, 9),
  ('chem-u8a-key-defs', 'What are macroscopic properties?', 'Observable properties such as pressure, volume, density, and colour that remain constant at equilibrium.', NULL, 10);

-- Key Equations & Relationships (17 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u8a-key-eqns', 'Gibbs energy equation', 'dG_standard = dH_standard - TdS_standard', 'dG = dH - TdS', 1),
  ('chem-u8a-key-eqns', 'Gibbs energy from electrode potential', 'dG_standard = -nFE_standard(cell), where n = moles of electrons transferred, F = 9.65 x 10^4 C/mol', 'dG = -nFE', 2),
  ('chem-u8a-key-eqns', 'dG and Q relationship', 'dG = dG_standard + RT ln Q', 'dG = dG_std + RT ln Q', 3),
  ('chem-u8a-key-eqns', 'dG_standard and K relationship', 'dG_standard = -RT ln K (at equilibrium, dG = 0)', 'dG_std = -RT ln K', 4),
  ('chem-u8a-key-eqns', 'Standard entropy change', 'dS_standard = sum of S_standard(products) - sum of S_standard(reactants)', NULL, 5),
  ('chem-u8a-key-eqns', 'Entropy ordering by state', 'S(gas) > S(liquid) > S(solid)', NULL, 6),
  ('chem-u8a-key-eqns', 'Temperature of spontaneity changeover', 'T = dH_standard / dS_standard (where dG = 0)', 'T = dH/dS', 7),
  ('chem-u8a-key-eqns', 'Reversing a reaction''s effect on K', 'K(reverse) = 1 / K(forward)', NULL, 8),
  ('chem-u8a-key-eqns', 'Doubling coefficients'' effect on K', 'K(new) = K squared', NULL, 9),
  ('chem-u8a-key-eqns', 'Halving coefficients'' effect on K', 'K(new) = square root of K', NULL, 10),
  ('chem-u8a-key-eqns', 'Q < K means...', 'Reaction proceeds forward (towards products)', NULL, 11),
  ('chem-u8a-key-eqns', 'Q > K means...', 'Reaction proceeds in reverse (towards reactants)', NULL, 12),
  ('chem-u8a-key-eqns', 'Q = K means...', 'System is at equilibrium', NULL, 13),
  ('chem-u8a-key-eqns', 'Effect of catalyst on K', 'No effect. Catalyst increases rate of both forward and reverse reactions equally.', NULL, 14),
  ('chem-u8a-key-eqns', 'Only factor that changes K', 'Temperature', NULL, 15),
  ('chem-u8a-key-eqns', 'dG_standard < 0 means K is...', 'Greater than 1 (products favoured)', NULL, 16),
  ('chem-u8a-key-eqns', 'dG_standard > 0 means K is...', 'Less than 1 (reactants favoured)', NULL, 17);

-- Spontaneity Conditions (4 cards)
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u8a-spont-cond', 'dH negative (exo) and dS positive (increase): spontaneity?', 'dG is always negative -> spontaneous at ALL temperatures.', NULL, 1),
  ('chem-u8a-spont-cond', 'dH negative (exo) and dS negative (decrease): spontaneity?', 'dG is negative at low T, positive at high T -> spontaneous at LOW temperatures only.', NULL, 2),
  ('chem-u8a-spont-cond', 'dH positive (endo) and dS positive (increase): spontaneity?', 'dG is positive at low T, negative at high T -> spontaneous at HIGH temperatures only.', NULL, 3),
  ('chem-u8a-spont-cond', 'dH positive (endo) and dS negative (decrease): spontaneity?', 'dG is always positive -> NEVER spontaneous at any temperature.', NULL, 4);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u8a-mcq-01', 'R3.2.13-14 Spontaneity & Electrode Potentials', 'HL', '8a',
   'What must be true for a redox reaction to be spontaneous under standard conditions?',
   'E(cell) < 0 and dG < 0',
   'E(cell) > 0 and dG < 0',
   'E(cell) > 0 and dG > 0',
   'E(cell) < 0 and dG > 0',
   1, 'A positive E(cell) gives a negative dG via dG = -nFE(cell), which indicates spontaneity.', 126),

  ('chem-u8a-mcq-02', 'R1.4.1 Entropy', 'SL/HL', '8a',
   'Which of the following changes will always increase the entropy of a system?',
   'Freezing a liquid at its melting point',
   'Dissolving a gas in water',
   'Increasing the number of moles of gas in a reaction',
   'Compressing a gas at constant temperature',
   2, 'More gas moles = more ways to distribute energy = higher entropy.', 127),

  ('chem-u8a-mcq-03', 'R1.4.2-3 Gibbs Energy & Spontaneity', 'SL/HL', '8a',
   'A reaction has dH = +50 kJ/mol and dS = +150 J/K/mol. At what temperature does it become spontaneous?',
   'Below 333 K',
   'Above 333 K',
   'At all temperatures',
   'At no temperature',
   1, 'T = dH/dS = 50000/150 = 333 K. Since dH > 0 and dS > 0, the reaction is spontaneous above this temperature.', 128),

  ('chem-u8a-mcq-04', 'R2.3.2-3 Equilibrium Constant Kc', 'SL/HL', '8a',
   'For the equilibrium N2(g) + 3H2(g) <=> 2NH3(g), what is the correct expression for Kc?',
   'Kc = [N2][H2]^3 / [NH3]^2',
   'Kc = [NH3]^2 / [N2][H2]^3',
   'Kc = [NH3] / [N2][H2]',
   'Kc = 2[NH3] / [N2] + 3[H2]',
   1, 'Products over reactants, each raised to their stoichiometric coefficient.', 129),

  ('chem-u8a-mcq-05', 'R2.3.2-3 Equilibrium Constant Kc', 'SL/HL', '8a',
   'If Kc for a reaction is 4.0 x 10^-10, what can be concluded?',
   'The reaction is fast',
   'The equilibrium lies far to the right (products favoured)',
   'The equilibrium lies far to the left (reactants favoured)',
   'The reaction is at equilibrium',
   2, 'A very small K means reactants dominate at equilibrium. K says nothing about rate.', 130),

  ('chem-u8a-mcq-06', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', '8a',
   'For the exothermic reaction 2SO2(g) + O2(g) <=> 2SO3(g), what happens to Kc when temperature increases?',
   'Kc increases',
   'Kc decreases',
   'Kc stays the same',
   'Kc becomes zero',
   1, 'For an exothermic reaction, increasing temperature shifts equilibrium left, decreasing K.', 131),

  ('chem-u8a-mcq-07', 'R2.3.5 Reaction Quotient Q (AHL)', 'HL', '8a',
   'If Q < K for a reaction, which statement is correct?',
   'The system is at equilibrium',
   'The reaction will proceed in the reverse direction',
   'The reaction will proceed in the forward direction to produce more products',
   'More reactants will be formed',
   2, 'Q < K means the system has not yet reached equilibrium; it shifts forward to increase Q until Q = K.', 132),

  ('chem-u8a-mcq-08', 'R2.3.2-3 Equilibrium Constant Kc', 'HL', '8a',
   'For the reaction 2HI(g) <=> H2(g) + I2(g), K = 0.04. What is K for the reaction HI(g) <=> 1/2 H2(g) + 1/2 I2(g)?',
   '0.02',
   '0.20',
   '0.08',
   '25',
   1, 'Halving coefficients gives K'' = sqrt(K) = sqrt(0.04) = 0.20.', 133),

  ('chem-u8a-mcq-09', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', '8a',
   'What is the effect of adding a catalyst to a system at equilibrium?',
   'Shifts equilibrium to the right',
   'Increases the value of K',
   'Decreases the time taken to reach equilibrium but does not change K or the position',
   'Shifts equilibrium to the left',
   2, 'A catalyst speeds up both forward and reverse rates equally; no change to K or position.', 134),

  ('chem-u8a-mcq-10', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', '8a',
   'For the equilibrium N2O4(g) <=> 2NO2(g) (dH > 0), which change would increase the amount of NO2 at equilibrium?',
   'Decreasing the temperature',
   'Increasing the pressure',
   'Increasing the temperature',
   'Adding a catalyst',
   2, 'Endothermic forward reaction -> increasing temperature shifts equilibrium right, producing more NO2.', 135),

  ('chem-u8a-mcq-11', 'R1.4.4/R2.3.7 Linking dG and K (AHL)', 'HL', '8a',
   'The standard Gibbs energy change for a reaction is -40 kJ/mol at 298 K. Which is true about K?',
   'K < 1',
   'K = 1',
   'K > 1',
   'K cannot be determined without more data',
   2, 'Negative dG_standard means ln K is positive, so K > 1 (products favoured).', 136),

  ('chem-u8a-mcq-12', 'R1.4.2-3 Gibbs Energy & Spontaneity', 'SL/HL', '8a',
   'Which row correctly shows the conditions for a reaction that is spontaneous at all temperatures?',
   'dH > 0, dS > 0',
   'dH < 0, dS < 0',
   'dH < 0, dS > 0',
   'dH > 0, dS < 0',
   2, 'When dH < 0 and dS > 0, dG = dH - TdS is always negative regardless of T.', 137),

  ('chem-u8a-mcq-13', 'R2.3.2-3 Equilibrium Constant Kc', 'SL/HL', '8a',
   'In a heterogeneous equilibrium, why are solids excluded from the K expression?',
   'Solids have zero concentration',
   'The concentration (density) of a pure solid is constant and incorporated into K',
   'Solids do not participate in the reaction',
   'Solids have infinite concentration',
   1, 'The concentration of a pure solid is constant, so it is absorbed into the equilibrium constant.', 138),

  ('chem-u8a-mcq-14', 'R1.4.4/R2.3.7 Linking dG and K (AHL)', 'HL', '8a',
   'Which equation correctly relates dG_standard to the equilibrium constant?',
   'dG_standard = RT ln K',
   'dG_standard = -RT ln K',
   'dG_standard = -nFE / K',
   'dG_standard = RT / ln K',
   1, 'dG_standard = -RT ln K, derived from dG = dG_standard + RT ln Q at equilibrium where dG = 0 and Q = K.', 139),

  ('chem-u8a-mcq-15', 'R2.3.6 ICE Tables (AHL)', 'HL', '8a',
   'For the reaction A + 3B <=> C + D, if 5.00 mol A is mixed with 4.00 mol B in a 500 cm3 flask and 0.82 mol D is found at equilibrium, what is the equilibrium concentration of A?',
   '4.18 mol/dm3',
   '8.36 mol/dm3',
   '10.0 mol/dm3',
   '2.09 mol/dm3',
   1, 'Moles of A at eq = 5.00 - 0.82 = 4.18 mol. [A] = 4.18/0.500 = 8.36 mol/dm3.', 140);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u8a-wr-01', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', 'short_answer', '8a', 4,
   'Define the term dynamic equilibrium and state three characteristics of a system at dynamic equilibrium. [4]',
   'Dynamic equilibrium is a state in a closed system where the rate of the forward reaction equals the rate of the reverse reaction [1]\nMacroscopic properties (e.g. concentration, colour, pressure) remain constant [1]\nBoth forward and reverse reactions continue to occur (it is dynamic, not static) [1]\nRequires a closed system (no matter enters or leaves) [1]',
   78),

  ('chem-u8a-wr-02', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', 'short_answer', '8a', 3,
   'Explain, using Le Chatelier''s principle, the effect of increasing pressure on the equilibrium: N2(g) + 3H2(g) <=> 2NH3(g). [3]',
   'Increasing pressure causes the system to shift to the side with fewer moles of gas to reduce pressure [1]\nReactant side has 4 moles of gas (1 + 3); product side has 2 moles of gas [1]\nTherefore equilibrium shifts to the right / towards products / more NH3 is produced [1]',
   79),

  ('chem-u8a-wr-03', 'R1.4.1 Entropy', 'SL/HL', 'short_answer', '8a', 2,
   'Entropy values (S) for H2O(l) and H2O(g) at 298 K are 70 and 189 J/K/mol respectively. Explain the difference in these values. [2]',
   'Gaseous water has higher entropy than liquid water [1]\nIn the gas phase, molecules are more dispersed / have more ways to distribute energy / more microstates / greater disorder than in the liquid phase [1]',
   80),

  ('chem-u8a-wr-04', 'R2.3.1/4 Dynamic Equilibrium & Le Chatelier''s', 'SL/HL', 'short_answer', '8a', 3,
   'The decomposition of N2O4 is endothermic: N2O4(g) <=> 2NO2(g), dH = +57 kJ/mol. Predict and explain the effect of increasing temperature on the value of K for this reaction. [3]',
   'Increasing temperature shifts the equilibrium to the right (towards products) for an endothermic reaction [1]\nThis increases [NO2] and decreases [N2O4] at the new equilibrium [1]\nTherefore K = [NO2]^2/[N2O4] increases [1]',
   81),

  ('chem-u8a-wr-05', 'R2.3.2-3 Equilibrium Constant Kc', 'SL/HL', 'short_answer', '8a', 3,
   'Write the equilibrium constant expression for: 4NH3(g) + 7O2(g) <=> 4NO2(g) + 6H2O(g). Deduce the units of Kc. [3]',
   'Kc = [NO2]^4 [H2O]^6 / [NH3]^4 [O2]^7 [1]\nUnits: (mol/dm3)^10 / (mol/dm3)^11 = (mol/dm3)^-1 [1]\nSimplified: dm3/mol [1]',
   82),

  ('chem-u8a-wr-06', 'R3.2.13-14 Spontaneity & Electrode Potentials', 'HL', 'short_answer', '8a', 5,
   'Calculate the standard cell potential for a cell formed by magnesium and iron half-cells. Using E values: Mg2+/Mg = -2.37 V, Fe2+/Fe = -0.44 V. Then calculate dG in kJ for the cell reaction. [5]',
   'E(cell) = E(cathode) - E(anode) = -0.44 - (-2.37) = +1.93 V [1]\nCell reaction: Mg + Fe2+ -> Mg2+ + Fe, so n = 2 electrons transferred [1]\ndG = -nFE = -(2)(96500)(1.93) [1]\ndG = -372490 J = -372 kJ (to 3 s.f.) [1]\nPositive E(cell) confirms spontaneous reaction; negative dG is consistent [1]',
   83),

  ('chem-u8a-wr-07', 'R1.4.2-3 Gibbs Energy & Spontaneity', 'SL/HL', 'short_answer', '8a', 5,
   'A reaction has dH = -9.83 kJ/mol and dS = -35.2 J/K/mol. (a) Calculate dG at 298 K. (b) Determine the temperature at which dG = 0 and explain its significance. [5]',
   'Convert dS to kJ: dS = -0.0352 kJ/K/mol [1]\ndG = -9.83 - (298)(-0.0352) = -9.83 + 10.49 = +0.66 kJ/mol (non-spontaneous at 298 K) [1]\nAt dG = 0: T = dH/dS = -9.83/-0.0352 = 279 K (or 6 degrees C) [1]\nThis temperature is the melting/freezing point of the substance (benzene) [1]\nBelow 279 K, dG < 0 and freezing is spontaneous; above 279 K, dG > 0 and freezing is not spontaneous [1]',
   84),

  ('chem-u8a-wr-08', 'R2.3.6 ICE Tables (AHL)', 'HL', 'short_answer', '8a', 6,
   'For the reaction A + 3B <=> C + D, 5.00 mol of A is mixed with 4.00 mol of B in a 500 cm3 flask. At equilibrium, 0.820 mol of D is present. Calculate Kc with units. [6]',
   'ICE: Change in D = +0.820 mol, so change in A = -0.820, change in B = -3(0.820) = -2.46, change in C = +0.820 [1]\nEquilibrium moles: A = 4.18, B = 1.54, C = 0.820, D = 0.820 [1]\nVolume = 0.500 dm3. Equilibrium concentrations: [A] = 8.36, [B] = 3.08, [C] = 1.64, [D] = 1.64 mol/dm3 [1]\nKc = [C][D] / [A][B]^3 = (1.64)(1.64) / (8.36)(3.08)^3 [1]\nKc = 2.69 / (8.36 x 29.22) = 2.69 / 244.3 = 0.0110 [1]\nUnits: (mol/dm3)^2 / (mol/dm3)^4 = mol^-2 dm^6 (or dm^6/mol^2) [1]',
   85),

  ('chem-u8a-wr-09', 'R1.4.4/R2.3.7 Linking dG and K (AHL)', 'HL', 'short_answer', '8a', 3,
   'The Gibbs energy change for a reaction is dG = -140 kJ/mol at 298 K. Calculate the equilibrium constant K at this temperature. [3]',
   'dG = -RT ln K -> ln K = -dG / RT = -(-140000) / (8.31 x 298) = 140000 / 2476.4 [1]\nln K = 56.5 [1]\nK = e^56.5 = approx 4.4 x 10^24 (accept values in the range 3-10 x 10^24 depending on sig figs) [1]',
   86),

  ('chem-u8a-wr-10', 'R2.3.6 ICE Tables (AHL)', 'HL', 'short_answer', '8a', 4,
   'For the esterification reaction: CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O, initial moles are: CH3COOH = 1.00, C2H5OH = 1.00, ester = 0, H2O = 0 in a 1.00 dm3 flask. At equilibrium, 0.33 mol of CH3COOH remains. Calculate Kc. [4]',
   'Change: CH3COOH reacted = 1.00 - 0.33 = 0.67 mol. All species change by 0.67 mol (1:1:1:1 ratio) [1]\nEquilibrium moles: CH3COOH = 0.33, C2H5OH = 0.33, CH3COOC2H5 = 0.67, H2O = 0.67 [1]\nKc = (0.67)(0.67) / (0.33)(0.33) = 0.4489 / 0.1089 [1]\nKc = 4.1 (no units - equal moles on both sides, units cancel) [1]',
   87),

  ('chem-u8a-wr-11', 'R1.4.4/R2.3.7 Linking dG and K (AHL)', 'HL', 'short_answer', '8a', 5,
   'Consider the reaction: 4NH3(g) + 5O2(g) <=> 6H2O(g) + 4NO(g), dG = -956 kJ/mol. Calculate dG at 300 K for a mixture of 2.0 mol/dm3 NH3, 1.0 mol/dm3 O2, 1.5 mol/dm3 H2O, and 1.2 mol/dm3 NO. [5]',
   'Q = [H2O]^6 [NO]^4 / [NH3]^4 [O2]^5 = (1.5)^6 (1.2)^4 / (2.0)^4 (1.0)^5 [1]\nQ = (11.39)(2.074) / (16)(1) = 23.63 / 16 = 1.48 [1]\ndG = dG_std + RT ln Q = -956000 + (8.31)(300)(ln 1.48) [1]\ndG = -956000 + (2493)(0.392) = -956000 + 977 [1]\ndG = -955 kJ/mol (approximately). The reaction is strongly spontaneous under these conditions [1]',
   88),

  ('chem-u8a-wr-12', 'R1.4.2-3 Gibbs Energy & Spontaneity', 'SL/HL', 'short_answer', '8a', 4,
   'Explain why an endothermic reaction such as Ba(OH)2.8H2O(s) + 2NH4Cl(s) -> BaCl2.2H2O(s) + 2NH3(g) + 8H2O(l) can still be spontaneous at room temperature. [4]',
   'The reaction produces gases (NH3) and liquid (H2O) from solids, leading to a large positive dS [1]\nAlthough dH > 0 (endothermic), the TdS term is large and positive [1]\ndG = dH - TdS; the large positive TdS outweighs the positive dH [1]\nTherefore dG < 0 at room temperature, making the reaction spontaneous [1]',
   89);
