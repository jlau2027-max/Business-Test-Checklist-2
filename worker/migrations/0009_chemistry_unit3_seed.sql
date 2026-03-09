-- ============================================================
-- Chemistry Content Seed Data — Unit 3: Reaction Kinetics
-- Syllabus: R2.2.1–R2.2.13 (SL & AHL)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO chemistry_category_colors (category, color) VALUES
  ('R2.2 Rates & Collision Theory', '#2563EB'),
  ('R2.2 Activation Energy & M-B Distributions', '#7C3AED'),
  ('R2.2 Catalysts', '#059669'),
  ('R2.2 Mechanisms & Molecularity (AHL)', '#D97706'),
  ('R2.2 Rate Equations & Order (AHL)', '#E11D48'),
  ('R2.2 Arrhenius Equation (AHL)', '#6366F1');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT OR IGNORE INTO chemistry_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('r2-2-rates-collision', 'R2.2.1–R2.2.3 — Rates & Collision Theory', '#2563EB', '3', 13),
  ('r2-2-ea-mb', 'R2.2.4–R2.2.5 — Activation Energy, M–B Distributions & Catalysts', '#7C3AED', '3', 14),
  ('r2-2-mechanisms', 'R2.2.6–R2.2.8 — Mechanisms & Molecularity (AHL)', '#D97706', '3', 15),
  ('r2-2-rate-equations', 'R2.2.9–R2.2.11 — Rate Equations, Order & Rate Constant (AHL)', '#E11D48', '3', 16),
  ('r2-2-arrhenius', 'R2.2.12–R2.2.13 — Arrhenius Equation (AHL)', '#6366F1', '3', 17);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- R2.2.1–R2.2.3 Rates & Collision Theory
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-2-rates-collision', 'Define rate of reaction as the change in concentration of reactant/product per unit time', 1),
  ('r2-2-rates-collision', 'State the units of rate of reaction (mol dm⁻³ s⁻¹)', 2),
  ('r2-2-rates-collision', 'Explain how to measure rate from a concentration–time graph (gradient/tangent)', 3),
  ('r2-2-rates-collision', 'Calculate initial rate by drawing a tangent at t = 0', 4),
  ('r2-2-rates-collision', 'State the two conditions for a successful collision (sufficient energy + correct orientation)', 5),
  ('r2-2-rates-collision', 'Explain the relationship between kinetic energy of particles and temperature in kelvin', 6),
  ('r2-2-rates-collision', 'Explain the role of collision geometry (orientation) in determining reaction rate', 7),
  ('r2-2-rates-collision', 'List the 5 factors affecting rate: concentration, pressure, surface area, temperature, catalyst', 8),
  ('r2-2-rates-collision', 'Explain how increasing concentration increases rate (more particles per unit volume → more frequent collisions)', 9),
  ('r2-2-rates-collision', 'Explain how increasing pressure increases rate for gaseous reactions (same as concentration effect)', 10),
  ('r2-2-rates-collision', 'Explain how increasing surface area increases rate (more exposed particles available for collision)', 11),
  ('r2-2-rates-collision', 'Explain how increasing temperature increases rate (greater proportion of particles exceed Ea)', 12),
  ('r2-2-rates-collision', 'Describe experimental methods for monitoring rate: mass change, gas volume, colorimetry, conductivity, pH', 13),
  ('r2-2-rates-collision', 'Identify appropriate independent, dependent, and controlled variables for a kinetics investigation', 14);

-- R2.2.4–R2.2.5 Activation Energy, M–B Distributions & Catalysts
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-2-ea-mb', 'Define activation energy (Ea) as the minimum energy colliding particles need for a successful collision', 1),
  ('r2-2-ea-mb', 'Sketch a Maxwell–Boltzmann distribution curve and label: most probable energy, average energy, Ea', 2),
  ('r2-2-ea-mb', 'State that no particles have zero kinetic energy and the curve never touches the x-axis on the right', 3),
  ('r2-2-ea-mb', 'Explain why the area under the M–B curve represents the total number of particles', 4),
  ('r2-2-ea-mb', 'Draw two M–B curves at different temperatures on the same axes (T2 > T1: peak lower, shifted right, same area)', 5),
  ('r2-2-ea-mb', 'Explain using the M–B curve why increasing temperature increases rate (larger fraction exceeds Ea)', 6),
  ('r2-2-ea-mb', 'Define a catalyst as a substance that increases rate by providing an alternative pathway with lower Ea', 7),
  ('r2-2-ea-mb', 'State that a catalyst is not consumed in the overall reaction', 8),
  ('r2-2-ea-mb', 'Sketch energy profile diagrams for exothermic and endothermic reactions (with and without catalyst)', 9),
  ('r2-2-ea-mb', 'Label on energy profiles: reactants, products, ΔH, Ea (uncatalysed), Ea (catalysed), transition state', 10),
  ('r2-2-ea-mb', 'Draw a M–B curve showing the effect of a catalyst (same curve, but Ea line shifts left → more particles exceed it)', 11),
  ('r2-2-ea-mb', 'Distinguish between homogeneous catalysts (same phase) and heterogeneous catalysts (different phase)', 12);

-- R2.2.6–R2.2.8 Mechanisms & Molecularity (AHL)
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-2-mechanisms', 'Define reaction mechanism as the series of elementary steps making up an overall reaction', 1),
  ('r2-2-mechanisms', 'Define the rate-determining step (RDS) as the slowest elementary step', 2),
  ('r2-2-mechanisms', 'Distinguish between an intermediate (can be isolated, appears in mechanism, cancels out) and a transition state (cannot be isolated, highest energy point on profile)', 3),
  ('r2-2-mechanisms', 'Identify intermediates and transition states on multi-step energy profile diagrams', 4),
  ('r2-2-mechanisms', 'Define molecularity: unimolecular (1 particle), bimolecular (2 particles), termolecular (3 particles, very rare)', 5),
  ('r2-2-mechanisms', 'State that the elementary steps must sum to give the overall balanced equation', 6),
  ('r2-2-mechanisms', 'Evaluate a proposed mechanism: check it sums to the overall equation AND is consistent with the rate equation', 7),
  ('r2-2-mechanisms', 'Construct energy profiles for multi-step reactions showing separate Ea for each step and the RDS as the highest barrier', 8);

-- R2.2.9–R2.2.11 Rate Equations, Order & Rate Constant (AHL)
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-2-rate-equations', 'State that rate equations can only be determined experimentally (not from stoichiometry)', 1),
  ('r2-2-rate-equations', 'Write rate equations in the form: rate = k[A]^m[B]^n', 2),
  ('r2-2-rate-equations', 'Define order of reaction with respect to a reactant (exponent in the rate equation)', 3),
  ('r2-2-rate-equations', 'Define overall order of reaction (sum of individual orders)', 4),
  ('r2-2-rate-equations', 'Deduce orders from experimental data by comparing experiments where one concentration changes', 5),
  ('r2-2-rate-equations', 'Sketch and identify concentration–time graphs for zero order (linear decrease), first order (exponential decay), second order (steeper curve)', 6),
  ('r2-2-rate-equations', 'Sketch and identify rate–concentration graphs for zero order (horizontal line), first order (straight line through origin), second order (upward curve/parabola)', 7),
  ('r2-2-rate-equations', 'State that first order reactions have a constant half-life', 8),
  ('r2-2-rate-equations', 'Define the rate constant k and state it is temperature-dependent', 9),
  ('r2-2-rate-equations', 'Derive units of k from the rate equation for reactions of different overall orders', 10),
  ('r2-2-rate-equations', 'Calculate k from experimental data using the rate equation', 11),
  ('r2-2-rate-equations', 'Relate the rate equation to the RDS: species in the RDS appear in the rate equation', 12),
  ('r2-2-rate-equations', 'Explain why a reactant absent from the rate equation is not involved in the RDS', 13);

-- R2.2.12–R2.2.13 Arrhenius Equation (AHL)
INSERT OR IGNORE INTO chemistry_checklist_items (section_id, text, sort_order) VALUES
  ('r2-2-arrhenius', 'State the Arrhenius equation: k = Ae^(–Ea/RT)', 1),
  ('r2-2-arrhenius', 'Identify the terms: k = rate constant, A = Arrhenius/frequency factor, Ea = activation energy, R = 8.31 J K⁻¹ mol⁻¹, T = temperature in K', 2),
  ('r2-2-arrhenius', 'Explain qualitatively that as T increases, k increases (exponential relationship)', 3),
  ('r2-2-arrhenius', 'Write the linear form: ln k = –Ea/R × (1/T) + ln A', 4),
  ('r2-2-arrhenius', 'Identify that a plot of ln k vs 1/T gives a straight line with gradient = –Ea/R and y-intercept = ln A', 5),
  ('r2-2-arrhenius', 'Calculate Ea from the gradient of a ln k vs 1/T graph', 6),
  ('r2-2-arrhenius', 'Calculate A from the y-intercept of a ln k vs 1/T graph', 7),
  ('r2-2-arrhenius', 'Explain what the Arrhenius factor A represents (frequency of collisions with proper orientation)', 8),
  ('r2-2-arrhenius', 'Use simultaneous equations with two (k, T) data points to calculate Ea', 9),
  ('r2-2-arrhenius', 'Sketch the effect of a catalyst on a ln k vs 1/T plot (parallel line shifted up, same gradient if Ea similar, or different gradient if Ea lower)', 10);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('chem-u3-rates', 'R2.2 Rates & Collision Theory', '#2563EB', '3', 12),
  ('chem-u3-ea-mb', 'R2.2 Activation Energy & M–B Distributions', '#7C3AED', '3', 13),
  ('chem-u3-catalysts', 'R2.2 Catalysts & Energy Profiles', '#059669', '3', 14),
  ('chem-u3-mechanisms', 'R2.2 Mechanisms & Molecularity (AHL)', '#D97706', '3', 15),
  ('chem-u3-rate-eqns', 'R2.2 Rate Equations & Order (AHL)', '#E11D48', '3', 16),
  ('chem-u3-arrhenius', 'R2.2 Arrhenius Equation (AHL)', '#6366F1', '3', 17);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Rates & Collision Theory
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-rates', 'Rate of reaction', 'The change in concentration of a reactant or product per unit time. Units: mol dm⁻³ s⁻¹.', NULL, 1),
  ('chem-u3-rates', 'Two conditions for a successful collision', '1) Sufficient energy (≥ Ea). 2) Correct orientation (proper collision geometry).', NULL, 2),
  ('chem-u3-rates', '5 factors affecting rate', 'Concentration, pressure (gases), surface area, temperature, catalyst.', NULL, 3),
  ('chem-u3-rates', '↑ Concentration → rate?', 'More particles per unit volume → more frequent collisions → more successful collisions per unit time → faster rate.', NULL, 4),
  ('chem-u3-rates', '↑ Surface area → rate?', 'More particles exposed at the surface → more frequent collisions → faster rate.', NULL, 5),
  ('chem-u3-rates', 'Initial rate (how to find)', 'Draw a tangent to the concentration–time curve at t = 0. The gradient of this tangent = initial rate.', NULL, 6);

-- Activation Energy & M-B Distributions
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-ea-mb', 'Activation energy (Ea)', 'The minimum energy that colliding particles need for a successful collision leading to a reaction.', NULL, 1),
  ('chem-u3-ea-mb', 'Maxwell–Boltzmann distribution', 'A graph showing the distribution of kinetic energies among particles in a sample. Area under curve = total number of particles.', NULL, 2),
  ('chem-u3-ea-mb', 'Effect of ↑ temperature on M–B curve', 'Peak shifts right and lowers; curve broadens. Same total area. Greater fraction of particles exceed Ea → faster rate.', NULL, 3),
  ('chem-u3-ea-mb', 'Effect of catalyst on M–B curve', 'The curve stays the same, but the Ea line shifts left (lower Ea). More particles now exceed the new, lower Ea.', NULL, 4);

-- Catalysts & Energy Profiles
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-catalysts', 'Catalyst', 'A substance that increases the rate of reaction by providing an alternative pathway with lower Ea. It is not consumed overall.', NULL, 1),
  ('chem-u3-catalysts', 'Exothermic energy profile', 'Reactants higher than products. ΔH is negative. Ea measured from reactant level to peak (transition state).', NULL, 2),
  ('chem-u3-catalysts', 'Endothermic energy profile', 'Products higher than reactants. ΔH is positive. Ea measured from reactant level to peak.', NULL, 3),
  ('chem-u3-catalysts', 'Homogeneous vs heterogeneous catalyst', 'Homogeneous: same phase as reactants. Heterogeneous: different phase from reactants.', NULL, 4);

-- Mechanisms & Molecularity (AHL)
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-mechanisms', '(AHL) Reaction mechanism', 'The series of elementary steps by which a chemical reaction occurs. Steps must sum to the overall equation.', NULL, 1),
  ('chem-u3-mechanisms', '(AHL) Rate-determining step (RDS)', 'The slowest elementary step in a mechanism. It controls the overall rate of reaction.', NULL, 2),
  ('chem-u3-mechanisms', '(AHL) Intermediate vs transition state', 'Intermediate: formed in one step, consumed in another, can be isolated. Transition state: highest energy point, cannot be isolated.', NULL, 3),
  ('chem-u3-mechanisms', '(AHL) Molecularity', 'The number of reacting particles in an elementary step. Unimolecular (1), bimolecular (2), termolecular (3, very rare).', NULL, 4);

-- Rate Equations & Order (AHL)
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-rate-eqns', '(AHL) Order of reaction (wrt a reactant)', 'The exponent to which the concentration of that reactant is raised in the experimentally determined rate equation.', NULL, 1),
  ('chem-u3-rate-eqns', '(AHL) Overall order', 'The sum of the individual orders with respect to each reactant in the rate equation.', NULL, 2),
  ('chem-u3-rate-eqns', '(AHL) Zero order: [A] vs t graph', 'Straight line with negative gradient. Rate is constant regardless of [A].', NULL, 3),
  ('chem-u3-rate-eqns', '(AHL) First order: [A] vs t graph', 'Exponential decay curve. Constant half-life. Rate ∝ [A].', NULL, 4),
  ('chem-u3-rate-eqns', '(AHL) Second order: [A] vs t graph', 'Steeper curve than first order. Rate ∝ [A]². Non-constant half-life.', NULL, 5),
  ('chem-u3-rate-eqns', '(AHL) Rate constant k', 'The proportionality constant in the rate equation. Temperature-dependent. Units depend on overall order.', NULL, 6),
  ('chem-u3-rate-eqns', '(AHL) Units of k for order 0, 1, 2, 3', '0: mol dm⁻³ s⁻¹. 1: s⁻¹. 2: mol⁻¹ dm³ s⁻¹. 3: mol⁻² dm⁶ s⁻¹.', NULL, 7),
  ('chem-u3-rate-eqns', '(AHL) Why can''t rate equations be deduced from stoichiometry?', 'Rate equations depend on the mechanism (specifically the RDS), not the overall balanced equation. They must be determined experimentally.', NULL, 8);

-- Arrhenius Equation (AHL)
INSERT OR IGNORE INTO chemistry_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('chem-u3-arrhenius', '(AHL) Arrhenius equation', 'k = Ae^(–Ea/RT). k = rate constant, A = frequency factor, Ea = activation energy, R = 8.31 J K⁻¹ mol⁻¹, T = temperature (K).', 'k = Ae^(-Ea/RT)', 1),
  ('chem-u3-arrhenius', '(AHL) Linear form of Arrhenius', 'ln k = –Ea/R × (1/T) + ln A. Plot ln k vs 1/T: gradient = –Ea/R, y-intercept = ln A.', 'ln k = -Ea/R × (1/T) + ln A', 2),
  ('chem-u3-arrhenius', '(AHL) Arrhenius factor (A)', 'The pre-exponential factor. Represents the frequency of collisions with proper orientation. Same units as k.', NULL, 3),
  ('chem-u3-arrhenius', '(AHL) How to find Ea from two (k, T) pairs', 'Use ln(k₂/k₁) = (Ea/R)(1/T₁ – 1/T₂) and solve for Ea.', 'ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)', 4);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────
INSERT OR IGNORE INTO chemistry_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('chem-u3-mcq-01', 'R2.2 Rates & Collision Theory', 'SL/HL', '3',
   'Which correctly defines the rate of a chemical reaction?',
   'The time taken for a reaction to reach completion',
   'The change in concentration of a reactant or product per unit time',
   'The change in mass of a product per mole of reactant',
   'The total energy released during a reaction',
   1, 'Rate = Δ[concentration]/Δt, measured in mol dm⁻³ s⁻¹.', 36),

  ('chem-u3-mcq-02', 'R2.2 Rates & Collision Theory', 'SL/HL', '3',
   'According to collision theory, two conditions are required for a successful reaction. These are:',
   'Sufficient energy and correct temperature',
   'Sufficient energy and proper orientation',
   'High pressure and a catalyst',
   'Proper orientation and large surface area',
   1, 'Particles must collide with energy ≥ Ea and with correct geometry.', 37),

  ('chem-u3-mcq-03', 'R2.2 Activation Energy & M-B Distributions', 'SL/HL', '3',
   'An increase in temperature increases the rate of reaction primarily because:',
   'The activation energy is lowered',
   'More particles are created',
   'A greater proportion of particles have energy ≥ Ea',
   'Collisions become less frequent but more energetic',
   2, 'The M–B distribution shifts right; a larger fraction of particles exceeds Ea.', 38),

  ('chem-u3-mcq-04', 'R2.2 Activation Energy & M-B Distributions', 'SL/HL', '3',
   'On a Maxwell–Boltzmann distribution curve, which statement is correct?',
   'The most probable energy equals the average energy',
   'Some particles have zero kinetic energy',
   'The curve is symmetrical about the peak',
   'The area under the curve represents the total number of particles',
   3, 'The distribution is asymmetric; most probable energy < average energy; no particles have zero KE.', 39),

  ('chem-u3-mcq-05', 'R2.2 Catalysts', 'SL/HL', '3',
   'A catalyst increases the rate of reaction by:',
   'Increasing the kinetic energy of the reactant particles',
   'Increasing the frequency of collisions',
   'Providing an alternative pathway with a lower activation energy',
   'Shifting the Maxwell–Boltzmann distribution to the right',
   2, 'A catalyst lowers Ea via an alternative mechanism; the M–B curve itself does not change.', 40),

  ('chem-u3-mcq-06', 'R2.2 Rates & Collision Theory', 'SL/HL', '3',
   'Which of the following is NOT a factor that affects the rate of a chemical reaction?',
   'Concentration of reactants',
   'Enthalpy change of reaction',
   'Surface area of solid reactants',
   'Presence of a catalyst',
   1, 'ΔH determines whether a reaction is exo/endothermic, not the rate.', 41),

  ('chem-u3-mcq-07', 'R2.2 Catalysts', 'SL/HL', '3',
   'On an energy profile diagram for an exothermic reaction, which is true?',
   'The energy of products is higher than reactants',
   'ΔH is positive',
   'The activation energy equals ΔH',
   'The energy of products is lower than reactants and ΔH is negative',
   3, 'Exothermic: products lower than reactants, energy released, ΔH < 0.', 42),

  ('chem-u3-mcq-08', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   'For the rate equation rate = k[A]²[B], what is the overall order?',
   '1',
   '2',
   '3',
   '4',
   2, 'Overall order = 2 + 1 = 3.', 43),

  ('chem-u3-mcq-09', 'R2.2 Mechanisms & Molecularity (AHL)', 'HL', '3',
   'In a mechanism, an intermediate is best described as:',
   'The highest energy point along the reaction pathway',
   'A species formed in one step and consumed in a subsequent step that can be isolated',
   'The activated complex at the transition state',
   'A catalyst that is regenerated at the end',
   1, 'An intermediate can be isolated; it appears then is consumed. A transition state cannot be isolated.', 44),

  ('chem-u3-mcq-10', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   'The reaction A + 2B → C has the experimental rate equation: rate = k[A][B]. Which mechanism is consistent?',
   'A + 2B → C (single step)',
   'Step 1 (slow): A + B → X; Step 2 (fast): X + B → C',
   'Step 1 (slow): 2B → X; Step 2 (fast): X + A → C',
   'Step 1 (fast): A → X; Step 2 (slow): X + 2B → C',
   1, 'The RDS (slow step) involves one A and one B, giving rate = k[A][B]. Steps sum to overall equation.', 45),

  ('chem-u3-mcq-11', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   '(AHL) For a first-order reaction, a plot of concentration vs time gives:',
   'A straight line with negative gradient',
   'An exponential decay curve',
   'A horizontal line',
   'A parabolic curve',
   1, 'First order: [A] = [A]₀ e^(–kt), exponential decay with constant half-life.', 46),

  ('chem-u3-mcq-12', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   '(AHL) Doubling [A] quadruples the rate. The order with respect to A is:',
   '0',
   '1',
   '2',
   '4',
   2, 'rate ∝ [A]^n. If 2^n = 4, then n = 2.', 47),

  ('chem-u3-mcq-13', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   '(AHL) The rate constant k has units of mol⁻¹ dm³ s⁻¹. The overall order is:',
   '0',
   '1',
   '2',
   '3',
   2, 'For order n: units of k = mol^(1–n) dm^(3(n–1)) s⁻¹. For n=2: mol⁻¹ dm³ s⁻¹.', 48),

  ('chem-u3-mcq-14', 'R2.2 Arrhenius Equation (AHL)', 'HL', '3',
   '(AHL) In the Arrhenius equation k = Ae^(–Ea/RT), a plot of ln k vs 1/T gives a straight line. The activation energy is found from:',
   'The y-intercept',
   'The gradient multiplied by –R',
   'The gradient divided by R',
   'The x-intercept multiplied by R',
   1, 'ln k = –Ea/R × (1/T) + ln A. Gradient = –Ea/R, so Ea = –gradient × R.', 49),

  ('chem-u3-mcq-15', 'R2.2 Arrhenius Equation (AHL)', 'HL', '3',
   '(AHL) The Arrhenius factor A represents:',
   'The activation energy of the reaction',
   'The enthalpy change of the reaction',
   'The frequency of collisions with proper orientation',
   'The equilibrium constant at infinite temperature',
   2, 'A (pre-exponential factor) accounts for collision frequency and the fraction with correct orientation.', 50),

  ('chem-u3-mcq-16', 'R2.2 Mechanisms & Molecularity (AHL)', 'HL', '3',
   '(AHL) A bimolecular elementary step involves:',
   'One reacting particle',
   'Two reacting particles colliding',
   'Three reacting particles colliding simultaneously',
   'A catalyst and one reactant',
   1, 'Unimolecular = 1, bimolecular = 2, termolecular = 3 (extremely rare).', 51),

  ('chem-u3-mcq-17', 'R2.2 Rates & Collision Theory', 'SL/HL', '3',
   'Which method would be most suitable for monitoring the rate of: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)?',
   'Colorimetry',
   'Measuring volume of gas produced over time',
   'Measuring pH change',
   'Observing a colour change in solution',
   1, 'H₂ gas is produced; collecting gas volume over time is most practical.', 52),

  ('chem-u3-mcq-18', 'R2.2 Mechanisms & Molecularity (AHL)', 'HL', '3',
   '(AHL) For the reaction 2NO₂ + F₂ → 2NO₂F, the rate equation is rate = k[NO₂][F₂]. A valid mechanism is:',
   '2NO₂ + F₂ → 2NO₂F (single termolecular step)',
   'Step 1 (slow): NO₂ + F₂ → NO₂F + F; Step 2 (fast): NO₂ + F → NO₂F',
   'Step 1 (fast): F₂ → 2F; Step 2 (slow): 2NO₂ + 2F → 2NO₂F',
   'Step 1 (slow): 2NO₂ → N₂O₄; Step 2 (fast): N₂O₄ + F₂ → 2NO₂F',
   1, 'RDS has one NO₂ and one F₂ → rate = k[NO₂][F₂]. Steps sum correctly, F is intermediate.', 53),

  ('chem-u3-mcq-19', 'R2.2 Rate Equations & Order (AHL)', 'HL', '3',
   '(AHL) The rate equation for a reaction is rate = k[X]⁰[Y]². If [X] is tripled and [Y] is halved, the new rate is:',
   '0.75 × original rate',
   '0.25 × original rate',
   '1.5 × original rate',
   '3 × original rate',
   1, '[X]⁰ = 1, so tripling X has no effect. (0.5)² = 0.25, so rate is quartered.', 54),

  ('chem-u3-mcq-20', 'R2.2 Arrhenius Equation (AHL)', 'HL', '3',
   '(AHL) Two experiments give k = 0.015 s⁻¹ at 300 K and k = 0.45 s⁻¹ at 350 K. Which is true?',
   'The reaction has zero activation energy',
   'k is independent of temperature',
   'The activation energy can be determined using the Arrhenius equation',
   'The frequency factor must be zero',
   2, 'Two (k, T) pairs allow calculation of Ea using ln(k₂/k₁) = (Ea/R)(1/T₁ – 1/T₂).', 55);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────
INSERT OR IGNORE INTO chemistry_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, sort_order) VALUES
  ('chem-u3-wr-01', 'R2.2 Rates & Collision Theory', 'SL/HL', 'short_answer', '3', 8,
   '(a) Define the term ''rate of reaction''. [1]\n(b) The reaction Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) was monitored by measuring the volume of hydrogen gas produced over time. Sketch a graph of volume of H₂ (y-axis) against time (x-axis). [2]\n(c) Describe how you would determine the initial rate of this reaction from your graph. [2]\n(d) Explain, using collision theory, why increasing the concentration of HCl increases the rate of this reaction. [3]',
   '1(a) Rate of reaction is the change in concentration of a reactant/product per unit time ✓ [1]\n1(b) Curve starts steep at origin and levels off to a plateau ✓; curve is smooth (not linear) with decreasing gradient ✓ [2]\n1(c) Draw a tangent to the curve at t = 0 ✓; calculate the gradient (ΔV/Δt) of this tangent ✓ [2]\n1(d) Higher concentration means more particles per unit volume ✓; this leads to a greater frequency of collisions ✓; therefore more successful collisions (with E ≥ Ea and correct orientation) per unit time, increasing the rate ✓ [3]',
   29),

  ('chem-u3-wr-02', 'R2.2 Activation Energy & M-B Distributions', 'SL/HL', 'short_answer', '3', 9,
   '(a) Define activation energy. [1]\n(b) Draw a labelled Maxwell–Boltzmann energy distribution curve for a sample of gas at temperature T₁. Label the most probable energy and the activation energy Ea. [3]\n(c) On the same axes, draw a second curve for a higher temperature T₂ (T₂ > T₁). [2]\n(d) Using your diagram, explain why increasing the temperature increases the rate of reaction. [3]',
   '2(a) The minimum energy that colliding particles need for a successful collision leading to a reaction ✓ [1]\n2(b) Curve starts at origin, rises to a peak, then tails off asymptotically to the right ✓; most probable energy labelled at the peak ✓; Ea marked on x-axis to the right of the peak with a vertical line ✓ [3]\n2(c) T₂ curve: peak is lower and shifted to the right ✓; same total area under the curve (same number of particles) ✓ [2]\n2(d) At T₂, the distribution is shifted to higher energies ✓; a greater proportion/fraction of particles have energy ≥ Ea (shown by larger shaded area to the right of Ea) ✓; this means more successful collisions per unit time, so the rate increases ✓ [3]',
   30),

  ('chem-u3-wr-03', 'R2.2 Catalysts', 'SL/HL', 'short_answer', '3', 9,
   '(a) State what is meant by a catalyst. [2]\n(b) Sketch an energy profile diagram for an exothermic reaction, showing curves for both the catalysed and uncatalysed pathways. Label: reactants, products, ΔH, Ea (uncatalysed), Ea (catalysed), and the transition state. [4]\n(c) Using a Maxwell–Boltzmann distribution, explain how a catalyst increases the rate of reaction. [3]',
   '3(a) A substance that increases the rate of a chemical reaction ✓; by providing an alternative reaction pathway with a lower activation energy / is not consumed in the overall reaction ✓ [2]\n3(b) Correct exothermic profile: products lower than reactants ✓; Ea (uncatalysed) correctly shown from reactants to peak ✓; catalysed curve shown with a lower peak (lower Ea) ✓; all labels present: reactants, products, ΔH, both Ea values, transition state at the peak ✓ [4]\n3(c) The M–B distribution of particles does not change with addition of a catalyst ✓; the catalyst lowers Ea, so the Ea line moves to the left on the distribution ✓; a greater proportion of particles now have energy ≥ the new (lower) Ea, so more successful collisions occur per unit time ✓ [3]',
   31),

  ('chem-u3-wr-04', 'R2.2 Rate Equations & Order (AHL)', 'HL', 'short_answer', '3', 9,
   '(AHL) The following data were obtained for the reaction: X + 2Y → Z\n\nExperiment | [X] / mol dm⁻³ | [Y] / mol dm⁻³ | Initial rate / mol dm⁻³ s⁻¹\n1 | 0.10 | 0.10 | 3.0 × 10⁻³\n2 | 0.20 | 0.10 | 6.0 × 10⁻³\n3 | 0.20 | 0.20 | 2.4 × 10⁻²\n\n(a) Deduce the order of reaction with respect to X and with respect to Y. [2]\n(b) Write the rate equation for the reaction. [1]\n(c) Calculate the value of the rate constant k and state its units. [2]\n(d) State the overall order of the reaction. [1]\n(e) Suggest a mechanism consistent with this rate equation. Identify the RDS and any intermediates. [3]',
   '4(a) Comparing Exp 1 and 2: [X] doubles while [Y] constant, rate doubles → first order wrt X ✓; Comparing Exp 2 and 3: [Y] doubles while [X] constant, rate quadruples (2²) → second order wrt Y ✓ [2]\n4(b) rate = k[X][Y]² ✓ [1]\n4(c) k = rate / ([X][Y]²) = 3.0 × 10⁻³ / (0.10 × 0.10²) = 3.0 ✓; units: mol⁻² dm⁶ s⁻¹ ✓ [2]\n4(d) Overall order = 1 + 2 = 3 (third order) ✓ [1]\n4(e) Step 1 (fast): 2Y → Y₂ (or Y + Y → Y₂); Step 2 (slow/RDS): X + Y₂ → Z ✓; RDS identified as Step 2 ✓; intermediate identified as Y₂ ✓ [3]\nOR Step 1 (slow/RDS): X + Y → XY; Step 2 (fast): XY + Y → Z — this gives rate = k[X][Y], only first order in Y, so this would NOT match. Accept any mechanism where the RDS is consistent with rate = k[X][Y]².',
   32),

  ('chem-u3-wr-05', 'R2.2 Arrhenius Equation (AHL)', 'HL', 'short_answer', '3', 9,
   '(AHL) (a) State the Arrhenius equation and define each term. [3]\n(b) Write the linear form of the Arrhenius equation. State the gradient and y-intercept of the corresponding straight-line graph. [2]\n(c) The following data were obtained for a reaction:\nAt T₁ = 300 K, k₁ = 2.0 × 10⁻³ s⁻¹\nAt T₂ = 350 K, k₂ = 8.0 × 10⁻² s⁻¹\nCalculate the activation energy Ea for this reaction. (R = 8.31 J K⁻¹ mol⁻¹) [3]\n(d) Explain what the Arrhenius factor A represents. [1]',
   '5(a) k = Ae^(–Ea/RT) ✓; k = rate constant, A = Arrhenius/frequency factor, Ea = activation energy, R = gas constant (8.31 J K⁻¹ mol⁻¹), T = absolute temperature in K ✓✓ [3]\n5(b) ln k = –Ea/R × (1/T) + ln A ✓; gradient = –Ea/R, y-intercept = ln A ✓ [2]\n5(c) Using ln(k₂/k₁) = (Ea/R)(1/T₁ – 1/T₂) ✓\nln(8.0×10⁻² / 2.0×10⁻³) = (Ea/8.31)(1/300 – 1/350)\nln(40) = (Ea/8.31)(4.76 × 10⁻⁴)\n3.689 = Ea × 5.73 × 10⁻⁵ ✓\nEa = 3.689 / 5.73 × 10⁻⁵ = 64,400 J mol⁻¹ ≈ 64.4 kJ mol⁻¹ ✓ [3]\n5(d) A represents the frequency of collisions with the proper orientation for reaction ✓ [1]',
   33),

  ('chem-u3-wr-06', 'R2.2 Mechanisms & Molecularity (AHL)', 'HL', 'short_answer', '3', 9,
   '(AHL) The reaction: NO₂(g) + CO(g) → NO(g) + CO₂(g) has the rate equation: rate = k[NO₂]².\n(a) State the order of reaction with respect to CO. Explain what this tells us about the mechanism. [2]\n(b) Propose a two-step mechanism that is consistent with both the rate equation and the overall equation. Identify the intermediate. [3]\n(c) Sketch a labelled energy profile for your proposed mechanism, showing two transition states, the intermediate, Ea for each step, and the overall ΔH (assume the reaction is exothermic). [4]',
   '6(a) Zero order with respect to CO ✓; CO is not involved in the rate-determining step ✓ [2]\n6(b) Step 1 (slow/RDS): NO₂ + NO₂ → NO₃ + NO ✓; Step 2 (fast): NO₃ + CO → NO₂ + CO₂ ✓; Intermediate is NO₃ ✓ [3]\n(Check: steps sum to NO₂ + CO → NO + CO₂ after cancelling NO₃ and one NO₂.)\n6(c) Energy profile shows: reactants at starting level, first hump (higher, Ea1 for RDS) with transition state 1 labelled ✓; dip to intermediate level (NO₃ labelled) ✓; second smaller hump (Ea2 for fast step) with transition state 2 labelled ✓; products lower than reactants with ΔH labelled as negative ✓ [4]',
   34),

  ('chem-u3-wr-07', 'R2.2 Rate Equations & Order (AHL)', 'HL', 'short_answer', '3', 9,
   '(AHL) For a zero-order, first-order, and second-order reaction:\n(a) Sketch the shape of the concentration–time graph for each. [3]\n(b) Sketch the shape of the rate–concentration graph for each. [3]\n(c) State which order has a constant half-life. [1]\n(d) Explain how you could experimentally distinguish between first-order and second-order kinetics using half-life data. [2]',
   '7(a) Zero order: straight line with negative gradient ✓; First order: exponential decay curve ✓; Second order: steeper curve than first order, concave up ✓ [3]\n7(b) Zero order: horizontal line (rate constant regardless of [A]) ✓; First order: straight line through origin (rate ∝ [A]) ✓; Second order: upward parabolic curve through origin (rate ∝ [A]²) ✓ [3]\n7(c) First order ✓ [1]\n7(d) Measure successive half-lives from the [A] vs t graph ✓; if t½ remains constant, the reaction is first order; if t½ increases as [A] decreases, the reaction is second order ✓ [2]',
   35);
