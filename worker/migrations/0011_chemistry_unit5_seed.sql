-- ============================================================
-- Chemistry Content Seed Data — Unit 5: Organic Chemistry & Energetics
-- Syllabus: S3.2, R1.1, R1.2, R1.3 (incl. AHL R1.2.3–R1.2.5)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('S3.2 Organic Chemistry Fundamentals', '#16A34A'),
  ('R1.1 Energy Changes', '#DC2626'),
  ('R1.2 Enthalpy Calculations', '#7C3AED'),
  ('R1.2 Enthalpy Calculations (AHL)', '#6366F1'),
  ('R1.3 Fuels & Combustion', '#D97706');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('s3-2-organic-fund', 'S3.2 — Organic Chemistry Fundamentals', '#16A34A', '5', 27),
  ('r1-1-energy-changes', 'R1.1 — Energy Changes in Reactions', '#DC2626', '5', 28),
  ('r1-2-enthalpy-calc', 'R1.2 — Enthalpy Calculations', '#7C3AED', '5', 29),
  ('r1-3-fuels-combust', 'R1.3 — Fuels and Combustion', '#D97706', '5', 30);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- S3.2 Organic Chemistry Fundamentals
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('s3-2-organic-fund', 'Represent organic compounds using empirical, molecular, condensed structural, full structural, skeletal and stereochemical formulas', 1),
  ('s3-2-organic-fund', 'Interconvert between molecular, skeletal and structural formulas', 2),
  ('s3-2-organic-fund', 'Identify functional groups: halogeno, hydroxyl, carbonyl, carboxyl, alkoxy, amino, amido, ester, phenyl', 3),
  ('s3-2-organic-fund', 'Identify homologous series: alkanes, alkenes, alkynes, halogenoalkanes, alcohols, aldehydes, ketones, carboxylic acids, ethers, amines, amides, esters', 4),
  ('s3-2-organic-fund', 'Describe the five features of a homologous series (same general formula, same functional group, differ by CH2, similar chemical properties, trend in physical properties)', 5),
  ('s3-2-organic-fund', 'Describe and explain trends in melting/boiling points within a homologous series', 6),
  ('s3-2-organic-fund', 'Apply IUPAC nomenclature to saturated/mono-unsaturated compounds (up to 6 carbons) with halogeno, hydroxyl, carbonyl, and carboxyl groups', 7),
  ('s3-2-organic-fund', 'Recognise chain, position and functional group structural isomers', 8);

-- R1.1 Energy Changes in Reactions
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-1-energy-changes', 'Understand the difference between heat (transfer of kinetic energy) and temperature (average kinetic energy)', 1),
  ('r1-1-energy-changes', 'Distinguish between system and surroundings in a chemical reaction', 2),
  ('r1-1-energy-changes', 'Classify reactions as exothermic (negative delta-H) or endothermic (positive delta-H)', 3),
  ('r1-1-energy-changes', 'Sketch and interpret energy profile diagrams labelling delta-H and Ea', 4),
  ('r1-1-energy-changes', 'Understand how a catalyst lowers Ea without changing delta-H', 5),
  ('r1-1-energy-changes', 'Apply q = mcDeltaT to calculate heat energy changes', 6),
  ('r1-1-energy-changes', 'Apply delta-H = -q/n to calculate standard enthalpy changes from calorimetry data', 7),
  ('r1-1-energy-changes', 'Understand assumptions in calorimetry (no heat loss, density/specific heat capacity of solution = water)', 8);

-- R1.2 Enthalpy Calculations
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-2-enthalpy-calc', 'Understand that bond-breaking is endothermic and bond-forming is exothermic', 1),
  ('r1-2-enthalpy-calc', 'Calculate enthalpy changes using average bond enthalpy data', 2),
  ('r1-2-enthalpy-calc', 'State Hess''s Law: the enthalpy change is independent of the pathway between initial and final states', 3),
  ('r1-2-enthalpy-calc', 'Apply Hess''s Law using enthalpy cycle diagrams', 4),
  ('r1-2-enthalpy-calc', 'Define standard enthalpy of formation and standard enthalpy of combustion', 5),
  ('r1-2-enthalpy-calc', 'Calculate delta-H using formation data: delta-H = sum(delta-Hf products) - sum(delta-Hf reactants) [AHL]', 6),
  ('r1-2-enthalpy-calc', 'Calculate delta-H using combustion data: delta-H = sum(delta-Hc reactants) - sum(delta-Hc products) [AHL]', 7),
  ('r1-2-enthalpy-calc', 'Interpret and determine values from a Born-Haber cycle for uni- and divalent ions [AHL]', 8);

-- R1.3 Fuels and Combustion
INSERT INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r1-3-fuels-combust', 'Write balanced equations for complete combustion of hydrocarbons and alcohols', 1),
  ('r1-3-fuels-combust', 'Write balanced equations for incomplete combustion (producing CO and/or C)', 2),
  ('r1-3-fuels-combust', 'Compare fossil fuels (coal, crude oil, natural gas) in terms of composition, advantages and disadvantages', 3),
  ('r1-3-fuels-combust', 'Evaluate CO2 emissions from different fuels and link to the greenhouse effect', 4),
  ('r1-3-fuels-combust', 'Explain how biofuels are produced from biological fixation of carbon via photosynthesis', 5),
  ('r1-3-fuels-combust', 'Discuss advantages and disadvantages of biofuels vs fossil fuels', 6),
  ('r1-3-fuels-combust', 'Understand why biofuels are considered more carbon-neutral than fossil fuels', 7);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u5-organic', 'S3.2 Organic Chemistry', '#16A34A', '5', 25),
  ('chem-u5-energy', 'R1.1 Energy Changes', '#DC2626', '5', 26),
  ('chem-u5-enthalpy', 'R1.2 Enthalpy Calculations', '#7C3AED', '5', 27),
  ('chem-u5-fuels', 'R1.3 Fuels & Combustion', '#D97706', '5', 28);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- S3.2 Organic Chemistry
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u5-organic', 'What is a homologous series?', 'A family of compounds with the same general formula and functional group, similar chemical properties, a trend in physical properties, and whose successive members differ by a CH2 group.', NULL, 1),
  ('chem-u5-organic', 'What is a functional group?', 'An atom or group of atoms within a compound that determines the chemical properties of that compound.', NULL, 2),
  ('chem-u5-organic', 'What are structural isomers?', 'Molecules with the same molecular formula but different structural formulas (different connectivities). Types: chain, position, and functional group isomers.', NULL, 3),
  ('chem-u5-organic', 'Name the functional group: -OH', 'Hydroxyl group. Found in alcohols. Named with suffix ''-ol''.', NULL, 4),
  ('chem-u5-organic', 'Name the functional group: -COOH', 'Carboxyl group. Found in carboxylic acids. Named with suffix ''-oic acid''.', NULL, 5),
  ('chem-u5-organic', 'Name the functional group: C=O (terminal)', 'Carbonyl group (aldehyde). Found in aldehydes. Named with suffix ''-al''.', NULL, 6),
  ('chem-u5-organic', 'Name the functional group: C=O (internal)', 'Carbonyl group (ketone). Found in ketones. Named with suffix ''-one''.', NULL, 7),
  ('chem-u5-organic', 'Name the functional group: -COO-', 'Ester linkage. Found in esters. Formed from an alcohol and carboxylic acid reacting together.', NULL, 8);

-- R1.1 Energy Changes
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u5-energy', 'Define temperature', 'The average kinetic energy of the particles in a system.', NULL, 1),
  ('chem-u5-energy', 'Define heat', 'The transfer of kinetic energy between objects at different temperatures.', NULL, 2),
  ('chem-u5-energy', 'What is an exothermic reaction?', 'A reaction where energy is released from the system to the surroundings. Delta-H is negative. The temperature of the surroundings increases.', NULL, 3),
  ('chem-u5-energy', 'What is an endothermic reaction?', 'A reaction where energy is absorbed by the system from the surroundings. Delta-H is positive. The temperature of the surroundings decreases.', NULL, 4),
  ('chem-u5-energy', 'Define enthalpy (H)', 'The total potential energy stored within the chemical bonds of a substance. More stable substances have lower enthalpy.', NULL, 5),
  ('chem-u5-energy', 'What is enthalpy change (delta-H)?', 'The net energy difference between the energy required to break bonds in reactants and the energy released when bonds form in products, measured at constant pressure.', NULL, 6),
  ('chem-u5-energy', 'Define activation energy (Ea)', 'The minimum amount of energy required for reactant particles to form an activated complex and begin reacting.', NULL, 7),
  ('chem-u5-energy', 'What is bond enthalpy?', 'The energy needed to break one mole of a specific bond in a gaseous molecule.', NULL, 8),
  ('chem-u5-energy', 'What is average bond enthalpy?', 'The energy needed to break one mole of a bond in a gaseous molecule, averaged across a range of similar chemical environments.', NULL, 9);

-- R1.2 Enthalpy Calculations
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u5-enthalpy', 'State Hess''s Law', 'The enthalpy change for a reaction is independent of the route taken, provided the initial and final conditions (reactants and products) are the same.', NULL, 1),
  ('chem-u5-enthalpy', 'Define standard enthalpy of formation', 'The enthalpy change when one mole of a compound is formed from its constituent elements in their standard states, under standard conditions (298 K, 100 kPa).', NULL, 2),
  ('chem-u5-enthalpy', 'Define standard enthalpy of combustion', 'The enthalpy change when one mole of a substance undergoes complete combustion in oxygen under standard conditions.', NULL, 3),
  ('chem-u5-enthalpy', 'What is calorimetry?', 'The experimental determination of enthalpy changes using the equations q = mcDeltaT and delta-H = -q/n.', 'q = mcDeltaT; delta-H = -q/n', 4),
  ('chem-u5-enthalpy', 'Formula: delta-H from formation data?', 'delta-H = sum of delta-Hf(products) minus sum of delta-Hf(reactants).', 'delta-H = SUM(delta-Hf prod) - SUM(delta-Hf react)', 5),
  ('chem-u5-enthalpy', 'Formula: delta-H from combustion data?', 'delta-H = sum of delta-Hc(reactants) minus sum of delta-Hc(products). Note: reversed compared to formation formula.', 'delta-H = SUM(delta-Hc react) - SUM(delta-Hc prod)', 6),
  ('chem-u5-enthalpy', 'What is a Born-Haber cycle? [AHL]', 'An application of Hess''s Law used to show the energy changes in the formation of an ionic compound from its elements, via gaseous ions.', NULL, 7),
  ('chem-u5-enthalpy', 'What is lattice enthalpy? [AHL]', 'The enthalpy change when one mole of an ionic compound is formed from its gaseous ions (or the energy required to separate one mole of an ionic compound into gaseous ions).', NULL, 8),
  ('chem-u5-enthalpy', 'What is first ionisation energy? [AHL]', 'The energy required to remove one mole of electrons from one mole of gaseous atoms to form gaseous unipositive ions: M(g) -> M+(g) + e-.', NULL, 9);

-- R1.3 Fuels & Combustion
INSERT INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u5-fuels', 'What is a biofuel?', 'A fuel produced from biological fixation of carbon over a short period of time through photosynthesis. Examples: biodiesel, bioethanol, biomethane.', NULL, 1),
  ('chem-u5-fuels', 'Why are biofuels considered carbon-neutral?', 'The CO2 released during combustion was recently absorbed by plants during photosynthesis, so no net CO2 is added to the atmosphere over the fuel''s lifecycle.', NULL, 2),
  ('chem-u5-fuels', 'What is complete combustion?', 'Combustion in excess oxygen producing only CO2 and H2O as products.', NULL, 3),
  ('chem-u5-fuels', 'What is incomplete combustion?', 'Combustion in limited oxygen producing CO (carbon monoxide) and/or C (soot/carbon) along with H2O.', NULL, 4);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u5-mcq-01', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', '5',
   'A homologous series is best described as a family of compounds that:',
   'Have the same empirical formula',
   'Differ by a CH2 unit, share a general formula and functional group, and show a trend in physical properties',
   'Are all isomers of each other',
   'Have the same boiling point',
   1, 'A homologous series has members differing by CH2, the same general formula and functional group, similar chemical properties, and a trend in physical properties.', 71),

  ('chem-u5-mcq-02', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', '5',
   'Which of the following is a correct IUPAC name?',
   '2-methylpropan-1-ol',
   '1-methylpropan-2-ol',
   '3-methylpropan-1-ol',
   'Methylpropanol',
   0, 'IUPAC rules require the longest carbon chain to be identified and numbered to give the lowest locants to substituents. 2-methylpropan-1-ol correctly names a branched 4-carbon alcohol.', 72),

  ('chem-u5-mcq-03', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', '5',
   'Butan-1-ol and ethoxyethane (diethyl ether) are examples of:',
   'Chain isomers',
   'Position isomers',
   'Functional group isomers',
   'Identical compounds',
   2, 'They share the molecular formula C4H10O but have different functional groups (alcohol vs ether), making them functional group isomers.', 73),

  ('chem-u5-mcq-04', 'R1.1 Energy Changes', 'SL/HL', '5',
   'In an exothermic reaction:',
   'The enthalpy of the products is greater than the enthalpy of the reactants',
   'Energy is absorbed from the surroundings',
   'Delta-H is negative and the temperature of the surroundings increases',
   'The activation energy is always zero',
   2, 'Exothermic reactions release energy to the surroundings (negative delta-H), causing an increase in the temperature of the surroundings.', 74),

  ('chem-u5-mcq-05', 'R1.1 Energy Changes', 'SL/HL', '5',
   'Which statement about bond enthalpies is correct?',
   'Bond breaking is exothermic and bond forming is endothermic',
   'Bond breaking is endothermic and bond forming is exothermic',
   'Both bond breaking and bond forming are exothermic',
   'Bond enthalpies cannot be used to estimate enthalpy changes',
   1, 'Energy must be supplied to break bonds (endothermic) and energy is released when new bonds form (exothermic).', 75),

  ('chem-u5-mcq-06', 'R1.1 Energy Changes', 'SL/HL', '5',
   'The equation q = mcDeltaT is used in calorimetry. What does ''c'' represent?',
   'Concentration of the solution',
   'Number of moles',
   'Specific heat capacity of the substance',
   'Speed of the reaction',
   2, 'In q = mcDeltaT, c is the specific heat capacity (J/g/K), which is the energy needed to raise 1 g of a substance by 1 K.', 76),

  ('chem-u5-mcq-07', 'R1.2 Enthalpy Calculations', 'SL/HL', '5',
   'Hess''s Law states that the enthalpy change for a reaction:',
   'Depends on the catalyst used',
   'Is always exothermic',
   'Is independent of the pathway between initial and final states',
   'Cannot be calculated from formation data',
   2, 'Hess''s Law is a consequence of the conservation of energy: enthalpy change depends only on the initial and final states, not the route taken.', 77),

  ('chem-u5-mcq-08', 'R1.2 Enthalpy Calculations', 'SL/HL', '5',
   'The standard enthalpy of formation of an element in its standard state is:',
   'Always positive',
   'Always negative',
   'Zero by definition',
   'Equal to its bond enthalpy',
   2, 'By definition, the standard enthalpy of formation of an element in its standard state is zero, since no change occurs.', 78),

  ('chem-u5-mcq-09', 'R1.2 Enthalpy Calculations (AHL)', 'HL', '5',
   'Which formula represents the calculation of delta-H using standard enthalpies of formation?',
   'delta-H = sum(delta-Hf reactants) - sum(delta-Hf products)',
   'delta-H = sum(delta-Hf products) - sum(delta-Hf reactants)',
   'delta-H = sum(delta-Hc products) - sum(delta-Hc reactants)',
   'delta-H = delta-Hf(products) x delta-Hf(reactants)',
   1, 'Using formation data: delta-H = sum(delta-Hf products) - sum(delta-Hf reactants). Note that for combustion data the formula is reversed.', 79),

  ('chem-u5-mcq-10', 'R1.3 Fuels & Combustion', 'SL/HL', '5',
   'Which of the following is an advantage of biofuels over fossil fuels?',
   'Biofuels produce no CO2 when burned',
   'Biofuels are carbon-neutral because CO2 released was recently absorbed by photosynthesis',
   'Biofuels have a higher energy density than fossil fuels',
   'Biofuels do not require land to produce',
   1, 'Biofuels are considered more carbon-neutral because the CO2 released during combustion was absorbed from the atmosphere by plants during photosynthesis over a short time period.', 80),

  ('chem-u5-mcq-11', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', '5',
   'What is the functional group present in aldehydes?',
   'A carbonyl group (C=O) at the end of a carbon chain',
   'A carboxyl group (-COOH)',
   'A hydroxyl group (-OH)',
   'A carbonyl group (C=O) between two carbon atoms',
   0, 'Aldehydes have a carbonyl group at the terminal position of the chain (-CHO). When the carbonyl is between two carbons, the compound is a ketone.', 81),

  ('chem-u5-mcq-12', 'R1.3 Fuels & Combustion', 'SL/HL', '5',
   'Incomplete combustion of hydrocarbons produces:',
   'Only CO2 and H2O',
   'CO and/or C (soot), along with H2O',
   'Only H2O',
   'NO2 and SO2',
   1, 'In limited oxygen supply, hydrocarbons undergo incomplete combustion, producing carbon monoxide (CO) and/or carbon (soot) instead of CO2.', 82),

  ('chem-u5-mcq-13', 'R1.2 Enthalpy Calculations (AHL)', 'HL', '5',
   'In a Born-Haber cycle for NaCl, which process has a positive enthalpy value?',
   'Formation of NaCl from its elements',
   'Electron affinity of chlorine',
   'First ionisation energy of sodium',
   'Lattice enthalpy of NaCl (defined as formation of lattice)',
   2, 'Ionisation energy is always positive (endothermic) as energy is required to remove an electron from a gaseous atom.', 83),

  ('chem-u5-mcq-14', 'R1.1 Energy Changes', 'SL/HL', '5',
   'What is the correct relationship between delta-H and q in calorimetry?',
   'delta-H = q/n',
   'delta-H = -q/n',
   'delta-H = q x n',
   'delta-H = mcDeltaT',
   1, 'The enthalpy change is the negative of the heat absorbed by the surroundings divided by the moles of limiting reagent: delta-H = -q/n. The negative sign reflects that if the surroundings gain heat, the system loses it.', 84),

  ('chem-u5-mcq-15', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', '5',
   'Which pair of compounds are position isomers?',
   'Butan-1-ol and butan-2-ol',
   'Butane and methylpropane',
   'Propanal and propanone',
   'Ethanol and methoxymethane',
   0, 'Butan-1-ol and butan-2-ol have the same molecular formula and functional group (-OH) but differ in the position of the hydroxyl group on the carbon chain.', 85);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u5-wr-01', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', 'short_answer', '5', 4,
   'Define the term ''homologous series'' and state three features of a homologous series. [4]',
   'A family of compounds with the same general formula and functional group [1]\nSuccessive members differ by CH2 [1]\nSimilar chemical properties [1]\nTrend/gradation in physical properties [1]',
   46),

  ('chem-u5-wr-02', 'S3.2 Organic Chemistry Fundamentals', 'SL/HL', 'short_answer', '5', 4,
   'Draw the full structural formula and give the IUPAC name for all structural isomers of C4H9Br. [4]',
   '1-bromobutane: CH3CH2CH2CH2Br [1]\n2-bromobutane: CH3CHBrCH2CH3 [1]\n1-bromo-2-methylpropane: (CH3)2CHCH2Br [1]\n2-bromo-2-methylpropane: (CH3)3CBr [1]',
   47),

  ('chem-u5-wr-03', 'R1.1 Energy Changes', 'SL/HL', 'short_answer', '5', 3,
   'Explain, with reference to enthalpy, why the combustion of methane is exothermic. [3]',
   'Energy is required to break bonds in CH4 and O2 (endothermic) [1]\nEnergy is released when bonds form in CO2 and H2O (exothermic) [1]\nMore energy is released in bond formation than is required for bond breaking, so delta-H is negative / products are more stable (lower enthalpy) than reactants [1]',
   48),

  ('chem-u5-wr-04', 'R1.1 Energy Changes', 'SL/HL', 'short_answer', '5', 4,
   'In a calorimetry experiment, 0.500 g of ethanol (C2H5OH, Mr = 46.08) was burned and the heat produced raised the temperature of 100.0 g of water by 25.0 degrees C. Calculate the experimental enthalpy of combustion of ethanol. (c = 4.18 J/g/K) [4]',
   'q = mcDeltaT = 100.0 x 4.18 x 25.0 = 10450 J = 10.45 kJ [1]\nn(ethanol) = 0.500 / 46.08 = 0.01085 mol [1]\ndelta-H = -q/n = -10.45 / 0.01085 = -963 kJ/mol [1]\nNegative sign and correct units (kJ/mol) [1]',
   49),

  ('chem-u5-wr-05', 'R1.2 Enthalpy Calculations (AHL)', 'HL', 'short_answer', '5', 4,
   'State Hess''s Law. Using the standard enthalpies of formation below, calculate the standard enthalpy change for the reaction: CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l). Data: delta-Hf[CH4] = -74.8, delta-Hf[CO2] = -393.5, delta-Hf[H2O] = -285.8 kJ/mol. [4]',
   'Hess''s Law: the enthalpy change for a reaction is independent of the route/pathway between initial and final states [1]\ndelta-H = sum(delta-Hf products) - sum(delta-Hf reactants) [1]\ndelta-H = [-393.5 + 2(-285.8)] - [-74.8 + 0] [1]\ndelta-H = -965.1 - (-74.8) = -890.3 kJ/mol [1]',
   50),

  ('chem-u5-wr-06', 'R1.3 Fuels & Combustion', 'SL/HL', 'short_answer', '5', 4,
   'Distinguish between complete and incomplete combustion of hydrocarbons. Write balanced equations for (a) the complete combustion of propane and (b) the incomplete combustion of propane producing carbon monoxide. [4]',
   'Complete combustion occurs in excess oxygen, producing CO2 and H2O only [1]\nIncomplete combustion occurs in limited oxygen, producing CO and/or C (soot) with H2O [1]\n(a) C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l) [1]\n(b) 2C3H8(g) + 7O2(g) -> 6CO(g) + 8H2O(l) [1]',
   51),

  ('chem-u5-wr-07', 'R1.1 Energy Changes', 'SL/HL', 'short_answer', '5', 2,
   'The enthalpy of combustion of propan-1-ol is -2021 kJ/mol and the enthalpy of combustion of propan-2-ol is -2006 kJ/mol. Suggest why these values are different even though they are structural isomers with the same molecular formula. [2]',
   'Although they have the same molecular formula, the bonding environments differ / the average bond enthalpies are slightly different due to different molecular structures [1]\nBranching / different position of the OH group affects intermolecular forces and the stability of the molecule [1]',
   52),

  ('chem-u5-wr-08', 'R1.1 Energy Changes', 'SL/HL', 'short_answer', '5', 5,
   'Describe how you would experimentally determine the enthalpy change of a neutralisation reaction between HCl(aq) and NaOH(aq) using a polystyrene cup calorimeter. Include key measurements and the calculation. [5]',
   'Measure a known volume of HCl(aq) using a measuring cylinder/pipette and place in polystyrene cup [1]\nRecord the initial temperature of the acid [1]\nAdd a known volume of NaOH(aq) and stir; record the maximum temperature reached [1]\nCalculate q = mcDeltaT where m = total mass of solution (assuming density = 1 g/cm3) and c = 4.18 J/g/K [1]\nCalculate delta-H = -q/n where n = moles of water formed (limiting reagent) [1]',
   53),

  ('chem-u5-wr-09', 'R1.1 Energy Changes', 'SL/HL', 'short_answer', '5', 4,
   'Explain two sources of error in a calorimetry experiment to determine the enthalpy of combustion of ethanol, and for each, state the direction of the error on the calculated delta-H value. [4]',
   'Heat loss to the surroundings (systematic error) - makes the calculated delta-H value less exothermic / smaller magnitude [2]\nIncomplete combustion of ethanol (systematic error) - less heat released, making calculated delta-H less exothermic [2]',
   54),

  ('chem-u5-wr-10', 'R1.3 Fuels & Combustion', 'SL/HL', 'short_answer', '5', 4,
   'Discuss the advantages and disadvantages of using biofuels compared to fossil fuels as a source of energy. [4]',
   'Advantage: biofuels are renewable / can be regrown [1]\nAdvantage: approximately carbon-neutral because CO2 released was recently fixed by photosynthesis [1]\nDisadvantage: large land area needed / competition with food crops [1]\nDisadvantage: lower energy density than fossil fuels / deforestation for crop land / limited supply [1]',
   55);
