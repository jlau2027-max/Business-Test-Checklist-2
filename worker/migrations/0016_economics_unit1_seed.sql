-- ============================================================
-- Economics Content Seed Data — Unit 1: Microeconomics
-- Syllabus: 2.1–2.12 (First Assessment 2024)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO economics_category_colors (category, color) VALUES
  ('2.1 Demand', '#2563EB'),
  ('2.2 Supply', '#059669'),
  ('2.3 Competitive Market Equilibrium', '#7C3AED'),
  ('2.4 Behavioural Economics', '#D97706'),
  ('2.5 Elasticity of Demand', '#DC2626'),
  ('2.6 Elasticity of Supply', '#0891B2'),
  ('2.7 Government Intervention', '#F97316'),
  ('2.8 Externalities & Common Pool Resources', '#4F46E5'),
  ('2.9 Public Goods', '#16A34A'),
  ('2.10 Asymmetric Information', '#9333EA'),
  ('2.11 Market Structures', '#E11D48'),
  ('2.12 Equity', '#6366F1');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-2-1-demand', '2.1 — Demand', '#2563EB', '1', 1),
  ('econ-2-2-supply', '2.2 — Supply', '#059669', '1', 2),
  ('econ-2-3-equilibrium', '2.3 — Competitive Market Equilibrium', '#7C3AED', '1', 3),
  ('econ-2-4-behavioural', '2.4 — Critique of Maximising Behaviour', '#D97706', '1', 4),
  ('econ-2-5-ped', '2.5 — Elasticity of Demand', '#DC2626', '1', 5),
  ('econ-2-6-pes', '2.6 — Elasticity of Supply', '#0891B2', '1', 6),
  ('econ-2-7-govt', '2.7 — Role of Government in Microeconomics', '#F97316', '1', 7),
  ('econ-2-8-extern', '2.8 — Market Failure: Externalities & Common Pool Resources', '#4F46E5', '1', 8),
  ('econ-2-9-public', '2.9 — Market Failure: Public Goods', '#16A34A', '1', 9),
  ('econ-2-10-asym', '2.10 — Market Failure: Asymmetric Information', '#9333EA', '1', 10),
  ('econ-2-11-power', '2.11 — Market Failure: Market Power (HL)', '#E11D48', '1', 11),
  ('econ-2-12-equity', '2.12 — The Market''s Inability to Achieve Equity', '#6366F1', '1', 12);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- 2.1 Demand
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-1-demand', 'Define demand and effective demand', 1),
  ('econ-2-1-demand', 'State and explain the law of demand', 2),
  ('econ-2-1-demand', 'Draw and label a demand curve (price on y-axis, quantity on x-axis)', 3),
  ('econ-2-1-demand', 'Distinguish between a movement along and a shift of the demand curve', 4),
  ('econ-2-1-demand', 'List and explain all non-price determinants of demand (income, preferences, substitutes, complements, demographics, expectations)', 5),
  ('econ-2-1-demand', 'Explain the difference between normal goods and inferior goods', 6),
  ('econ-2-1-demand', 'Explain the difference between substitutes and complements', 7);

-- 2.2 Supply
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-2-supply', 'Define supply', 1),
  ('econ-2-2-supply', 'State and explain the law of supply', 2),
  ('econ-2-2-supply', 'Draw and label a supply curve', 3),
  ('econ-2-2-supply', 'Distinguish between a movement along and a shift of the supply curve', 4),
  ('econ-2-2-supply', 'List and explain all non-price determinants of supply (costs, technology, government intervention, expectations, number of firms, related goods)', 5),
  ('econ-2-2-supply', 'Draw and explain the effect of a change in supply on equilibrium price and quantity', 6);

-- 2.3 Competitive Market Equilibrium
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-3-equilibrium', 'Define equilibrium price and equilibrium quantity', 1),
  ('econ-2-3-equilibrium', 'Draw and explain a supply-and-demand diagram showing equilibrium', 2),
  ('econ-2-3-equilibrium', 'Explain the concepts of excess supply (surplus) and excess demand (shortage)', 3),
  ('econ-2-3-equilibrium', 'Explain how the price mechanism allocates resources (signalling, incentives, rationing)', 4),
  ('econ-2-3-equilibrium', 'Explain consumer surplus and producer surplus on a diagram', 5),
  ('econ-2-3-equilibrium', 'Define and illustrate allocative efficiency (P = MC, or MSB = MSC)', 6),
  ('econ-2-3-equilibrium', 'Explain community (social) surplus = consumer surplus + producer surplus', 7);

-- 2.4 Critique of Maximising Behaviour
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-4-behavioural', 'Explain the assumptions of rational consumer choice (utility maximisation, perfect information, transitivity)', 1),
  ('econ-2-4-behavioural', 'Outline at least three behavioural economics concepts (bounded rationality, bounded self-control, bounded selfishness)', 2),
  ('econ-2-4-behavioural', 'Explain cognitive biases: anchoring, framing, availability heuristic', 3),
  ('econ-2-4-behavioural', 'Define and give examples of nudge theory', 4),
  ('econ-2-4-behavioural', 'Explain why firms may not always profit-maximise (satisficing, corporate social responsibility, revenue maximisation)', 5);

-- 2.5 Elasticity of Demand
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-5-ped', 'Define price elasticity of demand (PED) and calculate it using the formula', 1),
  ('econ-2-5-ped', 'Classify PED values: elastic (>1), inelastic (<1), unit elastic (=1), perfectly elastic, perfectly inelastic', 2),
  ('econ-2-5-ped', 'Draw PED diagrams for each classification', 3),
  ('econ-2-5-ped', 'Explain factors that determine PED (substitutes, necessity vs luxury, proportion of income, time, habit/addiction)', 4),
  ('econ-2-5-ped', 'Explain the relationship between PED and total revenue', 5),
  ('econ-2-5-ped', 'Define and calculate income elasticity of demand (YED)', 6),
  ('econ-2-5-ped', 'Distinguish normal goods (YED > 0), inferior goods (YED < 0), and luxury goods (YED > 1)', 7),
  ('econ-2-5-ped', 'Define and calculate cross-price elasticity of demand (XED)', 8),
  ('econ-2-5-ped', 'Interpret XED values: substitutes (XED > 0), complements (XED < 0)', 9);

-- 2.6 Elasticity of Supply
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-6-pes', 'Define price elasticity of supply (PES) and calculate it', 1),
  ('econ-2-6-pes', 'Explain determinants of PES (time, spare capacity, stock availability, factor mobility)', 2),
  ('econ-2-6-pes', 'Draw PES diagrams for elastic, inelastic, unit elastic, perfectly elastic, and perfectly inelastic supply', 3);

-- 2.7 Role of Government in Microeconomics
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-7-govt', 'Explain reasons for government intervention in markets', 1),
  ('econ-2-7-govt', 'Define, draw, and analyse the effects of indirect taxes (specific and ad valorem) on markets', 2),
  ('econ-2-7-govt', 'Explain tax incidence and how PED/PES affect who bears the tax burden', 3),
  ('econ-2-7-govt', 'Calculate tax revenue and welfare loss from a diagram', 4),
  ('econ-2-7-govt', 'Define, draw, and analyse subsidies and their effects on markets', 5),
  ('econ-2-7-govt', 'Explain price ceilings (maximum prices) with a diagram and their consequences (shortages, black markets, reduced quality)', 6),
  ('econ-2-7-govt', 'Explain price floors (minimum prices) with a diagram and their consequences (surpluses, inefficiency)', 7);

-- 2.8 Market Failure: Externalities & Common Pool Resources
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-8-extern', 'Define market failure', 1),
  ('econ-2-8-extern', 'Distinguish between private costs/benefits and social (external) costs/benefits', 2),
  ('econ-2-8-extern', 'Define and draw diagrams for negative externalities of production and consumption', 3),
  ('econ-2-8-extern', 'Define and draw diagrams for positive externalities of production and consumption', 4),
  ('econ-2-8-extern', 'Identify the welfare loss / gain in externality diagrams', 5),
  ('econ-2-8-extern', 'Explain government responses to externalities (taxes, subsidies, legislation, tradeable permits, education)', 6),
  ('econ-2-8-extern', 'Define common pool resources (rivalrous, non-excludable)', 7),
  ('econ-2-8-extern', 'Explain the tragedy of the commons', 8),
  ('econ-2-8-extern', 'Discuss responses to threats to common pool resources', 9);

-- 2.9 Market Failure: Public Goods
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-9-public', 'Define public goods (non-rivalrous and non-excludable)', 1),
  ('econ-2-9-public', 'Explain the free-rider problem', 2),
  ('econ-2-9-public', 'Distinguish between public goods, private goods, common pool resources, and club goods', 3),
  ('econ-2-9-public', 'Explain why the free market under-provides public goods', 4);

-- 2.10 Market Failure: Asymmetric Information
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-10-asym', 'Define asymmetric information', 1),
  ('econ-2-10-asym', 'Explain adverse selection with an example', 2),
  ('econ-2-10-asym', 'Explain moral hazard with an example', 3),
  ('econ-2-10-asym', 'Discuss government responses to asymmetric information (regulation, legislation, provision of information)', 4);

-- 2.11 Market Failure: Market Power (HL)
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-11-power', 'Explain revenue concepts: total revenue, average revenue, marginal revenue', 1),
  ('econ-2-11-power', 'Distinguish the four market structures: perfect competition, monopolistic competition, oligopoly, monopoly', 2),
  ('econ-2-11-power', 'Draw short-run and long-run diagrams for perfect competition', 3),
  ('econ-2-11-power', 'Draw short-run and long-run diagrams for monopolistic competition', 4),
  ('econ-2-11-power', 'Explain the kinked demand curve model for oligopoly', 5),
  ('econ-2-11-power', 'Define and explain collusion (cartels) and game theory (prisoner''s dilemma)', 6),
  ('econ-2-11-power', 'Draw and analyse monopoly diagrams (profit max at MR = MC)', 7),
  ('econ-2-11-power', 'Explain natural monopoly', 8),
  ('econ-2-11-power', 'Explain allocative and productive efficiency across market structures', 9),
  ('econ-2-11-power', 'Evaluate advantages and disadvantages of monopoly/oligopoly vs competition', 10);

-- 2.12 The Market's Inability to Achieve Equity
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-2-12-equity', 'Explain why markets may generate inequitable outcomes', 1),
  ('econ-2-12-equity', 'Discuss the role of government in promoting equity through taxation and transfer payments', 2);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO economics_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('econ-u1-key-defs', 'Core Market Concepts', '#2563EB', '1', 1),
  ('econ-u1-govt-mf', 'Government & Market Failure', '#F97316', '1', 2),
  ('econ-u1-structures', 'Market Structures & Behaviour', '#E11D48', '1', 3);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Core Market Concepts (14 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-key-defs', 'Demand', 'The willingness and ability of consumers to purchase a good or service at various prices in a given time period.', NULL, 1),
  ('econ-u1-key-defs', 'Law of demand', 'As the price of a good rises, quantity demanded falls, ceteris paribus (inverse relationship).', NULL, 2),
  ('econ-u1-key-defs', 'Supply', 'The willingness and ability of producers to offer a good or service for sale at various prices in a given time period.', NULL, 3),
  ('econ-u1-key-defs', 'Law of supply', 'As the price of a good rises, quantity supplied rises, ceteris paribus (positive relationship).', NULL, 4),
  ('econ-u1-key-defs', 'Equilibrium', 'The price and quantity where the quantity demanded equals the quantity supplied; there is no tendency for change.', NULL, 5),
  ('econ-u1-key-defs', 'Consumer surplus', 'The difference between what consumers are willing to pay and the price they actually pay. Area below demand curve, above market price.', NULL, 6),
  ('econ-u1-key-defs', 'Producer surplus', 'The difference between the market price and the minimum price producers are willing to accept. Area above supply curve, below price.', NULL, 7),
  ('econ-u1-key-defs', 'Allocative efficiency', 'Achieved when resources are allocated to produce the combination of goods most valued by society. Occurs where P = MC (or MSB = MSC).', NULL, 8),
  ('econ-u1-key-defs', 'PED formula', 'PED = (% change in quantity demanded) / (% change in price). Always negative due to the law of demand.', 'PED = %ΔQd / %ΔP', 9),
  ('econ-u1-key-defs', 'Elastic demand', '|PED| > 1. A change in price causes a proportionally larger change in quantity demanded.', NULL, 10),
  ('econ-u1-key-defs', 'Inelastic demand', '|PED| < 1. A change in price causes a proportionally smaller change in quantity demanded.', NULL, 11),
  ('econ-u1-key-defs', 'YED', 'Income elasticity of demand = (% change in Qd) / (% change in income). Positive for normal goods, negative for inferior goods.', 'YED = %ΔQd / %ΔY', 12),
  ('econ-u1-key-defs', 'XED', 'Cross-price elasticity = (% change in Qd of good X) / (% change in price of good Y). Positive = substitutes, negative = complements.', 'XED = %ΔQdX / %ΔPY', 13),
  ('econ-u1-key-defs', 'PES', 'Price elasticity of supply = (% change in Qs) / (% change in P). Always positive. Depends on time, spare capacity, factor mobility.', 'PES = %ΔQs / %ΔP', 14);

-- Government & Market Failure (14 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-govt-mf', 'Indirect tax', 'A tax imposed on expenditure (not income). Shifts supply curve left. Can be specific (fixed amount per unit) or ad valorem (percentage of price).', NULL, 1),
  ('econ-u1-govt-mf', 'Subsidy', 'A payment by the government to producers to lower costs and encourage production. Shifts supply curve right.', NULL, 2),
  ('econ-u1-govt-mf', 'Price ceiling', 'A maximum price set by the government below the equilibrium price. Leads to shortages, black markets, and reduced quality.', NULL, 3),
  ('econ-u1-govt-mf', 'Price floor', 'A minimum price set by the government above the equilibrium price. Leads to surpluses (e.g. minimum wage causing unemployment).', NULL, 4),
  ('econ-u1-govt-mf', 'Negative externality', 'A cost to a third party not involved in the transaction. MSC > MPC (production) or MSB < MPB (consumption). Leads to overproduction/consumption.', NULL, 5),
  ('econ-u1-govt-mf', 'Positive externality', 'A benefit to a third party not involved in the transaction. MSC < MPC (production) or MSB > MPB (consumption). Leads to underproduction/consumption.', NULL, 6),
  ('econ-u1-govt-mf', 'Merit good', 'A good with positive externalities of consumption that is under-consumed in a free market (e.g. education, healthcare, vaccinations).', NULL, 7),
  ('econ-u1-govt-mf', 'Demerit good', 'A good with negative externalities of consumption that is over-consumed in a free market (e.g. tobacco, alcohol, fast food).', NULL, 8),
  ('econ-u1-govt-mf', 'Common pool resource', 'A resource that is rivalrous (use reduces availability) but non-excludable (cannot prevent access). Subject to the tragedy of the commons.', NULL, 9),
  ('econ-u1-govt-mf', 'Public good', 'A good that is non-rivalrous and non-excludable (e.g. national defence, street lighting). Subject to the free-rider problem.', NULL, 10),
  ('econ-u1-govt-mf', 'Free-rider problem', 'When individuals benefit from a good without paying, so private firms have no incentive to produce it. Justifies government provision.', NULL, 11),
  ('econ-u1-govt-mf', 'Asymmetric information', 'When one party in a transaction has more or better information than the other, leading to market failure.', NULL, 12),
  ('econ-u1-govt-mf', 'Adverse selection', 'Pre-transaction problem caused by asymmetric information. The party with less information ends up selecting a worse outcome.', NULL, 13),
  ('econ-u1-govt-mf', 'Moral hazard', 'Post-transaction problem where one party takes more risks because they are protected from the consequences.', NULL, 14);

-- Market Structures & Behaviour (8 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-structures', 'Profit maximisation', 'Occurs where MR = MC. The firm produces the output at which the additional revenue from the last unit equals the additional cost.', NULL, 1),
  ('econ-u1-structures', 'Perfect competition', 'Many firms, homogeneous product, no barriers to entry/exit, perfect information. Firms are price takers (AR = MR = P).', NULL, 2),
  ('econ-u1-structures', 'Monopolistic competition', 'Many firms, differentiated products, low barriers to entry. Earns supernormal profit in SR; normal profit in LR.', NULL, 3),
  ('econ-u1-structures', 'Oligopoly', 'A few large firms dominate the market. High barriers to entry, interdependent decision-making. May collude or compete.', NULL, 4),
  ('econ-u1-structures', 'Monopoly', 'Single firm dominates the market. High barriers to entry. Price maker. Can earn supernormal profits in both SR and LR.', NULL, 5),
  ('econ-u1-structures', 'Nudge theory', 'Using choice architecture to influence behaviour in a predictable way without forbidding options or significantly changing economic incentives.', NULL, 6),
  ('econ-u1-structures', 'Bounded rationality', 'Consumers have limited cognitive ability, time, and information, so they satisfice rather than optimise.', NULL, 7),
  ('econ-u1-structures', 'Tragedy of the commons', 'The overuse and eventual depletion of a shared, non-excludable resource because individuals act in self-interest.', NULL, 8);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────

-- 2.1 Demand (Q1-2)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-01', '2.1 Demand', 'SL/HL', '1',
   'Which of the following would cause a movement along the demand curve for coffee, rather than a shift?',
   'A rise in the price of tea',
   'An increase in consumer incomes',
   'A fall in the price of coffee',
   'A successful advertising campaign for coffee',
   2, 'A change in the price of the good itself causes a movement along the demand curve. All other options are non-price determinants that shift the curve.', 1),

  ('econ-u1-mcq-02', '2.1 Demand', 'SL/HL', '1',
   'If the price of a substitute good increases, ceteris paribus, the demand curve for the original good will:',
   'Shift to the left',
   'Shift to the right',
   'Remain unchanged',
   'Become more elastic',
   1, 'When a substitute becomes more expensive, consumers switch to the original good, increasing its demand (rightward shift).', 2);

-- 2.2 Supply (Q3-5)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-03', '2.5 Elasticity of Demand', 'SL/HL', '1',
   'A good with a negative income elasticity of demand is classified as:',
   'A normal good',
   'An inferior good',
   'A luxury good',
   'A Giffen good',
   1, 'Inferior goods have YED < 0: as income rises, demand for them falls (consumers switch to higher-quality alternatives).', 3),

  ('econ-u1-mcq-04', '2.2 Supply', 'SL/HL', '1',
   'Which of the following is most likely to cause a leftward shift of the supply curve for wheat?',
   'A fall in the price of wheat',
   'An improvement in farming technology',
   'An increase in the cost of fertiliser',
   'A decrease in demand for wheat',
   2, 'Higher input costs reduce supply at every price level, shifting the supply curve to the left. A fall in price causes a movement, not a shift.', 4),

  ('econ-u1-mcq-05', '2.2 Supply', 'SL/HL', '1',
   'An improvement in technology used to produce electric vehicles will:',
   'Decrease supply and raise the equilibrium price',
   'Increase supply and lower the equilibrium price',
   'Increase demand for electric vehicles',
   'Have no effect on market equilibrium',
   1, 'Better technology lowers costs of production, shifting supply rightward, which reduces equilibrium price and increases quantity.', 5);

-- 2.3 Equilibrium (Q6-7)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-06', '2.3 Competitive Market Equilibrium', 'SL/HL', '1',
   'If the market price is above the equilibrium price, there will be:',
   'Excess demand',
   'Excess supply',
   'Allocative efficiency',
   'An increase in demand',
   1, 'When price is above equilibrium, quantity supplied exceeds quantity demanded, creating a surplus (excess supply).', 6),

  ('econ-u1-mcq-07', '2.3 Competitive Market Equilibrium', 'SL/HL', '1',
   'Consumer surplus is best defined as:',
   'The difference between total revenue and total cost',
   'The difference between what consumers are willing to pay and what they actually pay',
   'The total amount consumers spend on a good',
   'The area below the supply curve and above the price',
   1, 'Consumer surplus is the area below the demand curve and above the market price, representing the extra benefit consumers receive.', 7);

-- 2.4 Behavioural Economics (Q8-9)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-08', '2.4 Behavioural Economics', 'SL/HL', '1',
   'Bounded rationality refers to the idea that:',
   'Consumers always maximise utility',
   'Decision-making is limited by available information, cognitive capacity and time',
   'Firms always maximise profit',
   'Governments always make optimal policy decisions',
   1, 'Bounded rationality (Herbert Simon) suggests humans have limited cognitive abilities, so they cannot fully optimise every decision.', 8),

  ('econ-u1-mcq-09', '2.4 Behavioural Economics', 'SL/HL', '1',
   'A government places fruit at eye-level in school cafeterias to encourage healthy eating. This is an example of:',
   'A subsidy',
   'A price ceiling',
   'A nudge',
   'A direct tax',
   2, 'Nudge theory uses choice architecture to influence behaviour without restricting options or changing economic incentives.', 9);

-- 2.5 Elasticity of Demand (Q10-12)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-10', '2.5 Elasticity of Demand', 'SL/HL', '1',
   'If the price of a good rises by 10% and quantity demanded falls by 5%, the PED is:',
   '-2.0',
   '-0.5',
   '-1.0',
   '-5.0',
   1, 'PED = % change in Qd / % change in P = -5% / 10% = -0.5. The good is price inelastic.', 10),

  ('econ-u1-mcq-11', '2.5 Elasticity of Demand', 'SL/HL', '1',
   'A firm sells a product with PED = -0.4. To increase total revenue, the firm should:',
   'Decrease price',
   'Increase price',
   'Keep price the same',
   'Decrease supply',
   1, 'When demand is inelastic (|PED| < 1), raising price causes a proportionally smaller fall in quantity demanded, so total revenue increases.', 11),

  ('econ-u1-mcq-12', '2.5 Elasticity of Demand', 'SL/HL', '1',
   'Cross-price elasticity of demand between goods X and Y is +2.5. This means:',
   'X and Y are complements',
   'X and Y are substitutes',
   'X is an inferior good',
   'Y is a luxury good',
   1, 'Positive XED means when the price of Y rises, demand for X also rises – indicating they are substitutes.', 12);

-- 2.6 Elasticity of Supply (Q13)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-13', '2.6 Elasticity of Supply', 'SL/HL', '1',
   'Price elasticity of supply is likely to be higher when:',
   'Firms have no spare capacity',
   'The time period considered is very short',
   'Factors of production can be easily switched',
   'Raw materials are scarce',
   2, 'When factors of production are mobile and can be easily redirected, firms can respond more readily to price changes, making supply more elastic.', 13);

-- 2.7 Government Intervention (Q14-17)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-14', '2.7 Government Intervention', 'SL/HL', '1',
   'The imposition of a specific indirect tax on a good will:',
   'Shift the demand curve leftward',
   'Shift the supply curve leftward (upward)',
   'Shift the supply curve rightward',
   'Increase consumer surplus',
   1, 'A specific tax adds a fixed amount to the cost per unit, effectively shifting the supply curve up/left by the amount of the tax.', 14),

  ('econ-u1-mcq-15', '2.7 Government Intervention', 'SL/HL', '1',
   'A price ceiling set below the equilibrium price is likely to result in:',
   'Excess supply',
   'A surplus of the good',
   'A shortage of the good',
   'Higher prices for consumers',
   2, 'A binding price ceiling below equilibrium means Qd > Qs, creating a shortage. This may lead to rationing or black markets.', 15),

  ('econ-u1-mcq-16', '2.7 Government Intervention', 'SL/HL', '1',
   'When the government provides a per-unit subsidy to producers, all of the following occur EXCEPT:',
   'The supply curve shifts rightward',
   'The equilibrium price falls',
   'Consumer surplus increases',
   'There is a welfare (deadweight) loss',
   3, 'Subsidies shift supply right, lower price, and increase consumer surplus. In the standard model, there is an overallocation but the net effect increases total surplus.', 16),

  ('econ-u1-mcq-17', '2.7 Government Intervention', 'SL/HL', '1',
   'The burden of an indirect tax falls more heavily on consumers when:',
   'Demand is price elastic',
   'Supply is perfectly elastic',
   'Demand is price inelastic',
   'Supply is perfectly inelastic',
   2, 'When demand is inelastic, consumers are less responsive to price changes, so they absorb a greater share of the tax.', 17);

-- 2.8 Externalities & CPR (Q18-21)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-18', '2.8 Externalities & Common Pool Resources', 'SL/HL', '1',
   'A negative externality of production occurs when:',
   'MSC > MPC',
   'MSC < MPC',
   'MSB > MPB',
   'MSB < MPB',
   0, 'With a negative production externality, there are external costs, so marginal social cost exceeds marginal private cost.', 18),

  ('econ-u1-mcq-19', '2.8 Externalities & Common Pool Resources', 'SL/HL', '1',
   'A merit good (positive externality of consumption) is likely to be:',
   'Overconsumed by the free market',
   'Under-consumed by the free market',
   'Provided at allocative efficiency',
   'A public good',
   1, 'Merit goods generate positive externalities of consumption (MSB > MPB), so the free market produces less than the socially optimal quantity.', 19),

  ('econ-u1-mcq-20', '2.8 Externalities & Common Pool Resources', 'SL/HL', '1',
   'Tradeable pollution permits aim to reduce pollution by:',
   'Banning all pollution',
   'Setting a maximum total pollution level and allowing firms to trade the right to pollute',
   'Taxing every unit of output',
   'Subsidising clean technology',
   1, 'The government sets a cap on total emissions and distributes permits. Firms that can reduce pollution cheaply sell permits to those that cannot.', 20),

  ('econ-u1-mcq-21', '2.8 Externalities & Common Pool Resources', 'SL/HL', '1',
   'The ''tragedy of the commons'' refers to:',
   'Under-provision of public goods',
   'Overuse and depletion of common pool resources',
   'The inability of monopolies to innovate',
   'Unequal distribution of income',
   1, 'Common pool resources (rivalrous, non-excludable) are overexploited because individuals acting in self-interest deplete the shared resource.', 21);

-- 2.9 Public Goods (Q22-23)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-22', '2.9 Public Goods', 'SL/HL', '1',
   'Which pair of characteristics defines a public good?',
   'Rivalrous and excludable',
   'Non-rivalrous and excludable',
   'Rivalrous and non-excludable',
   'Non-rivalrous and non-excludable',
   3, 'Public goods are non-rivalrous (one person''s use doesn''t reduce availability) and non-excludable (impossible to prevent access).', 22),

  ('econ-u1-mcq-23', '2.9 Public Goods', 'SL/HL', '1',
   'The free-rider problem exists because:',
   'Public goods are too expensive',
   'Individuals can enjoy a public good without paying for it',
   'The government taxes public goods',
   'Firms earn supernormal profit from public goods',
   1, 'Since public goods are non-excludable, people can benefit without contributing, so private firms have no incentive to provide them.', 23);

-- 2.10 Asymmetric Information (Q24-25)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-24', '2.10 Asymmetric Information', 'SL/HL', '1',
   'Adverse selection occurs when:',
   'Consumers have full information about a product',
   'One party in a transaction has more information than the other, leading to a poor outcome before the transaction',
   'Insurance companies charge the same premium to all customers',
   'Governments remove all regulations',
   1, 'Adverse selection is a pre-transaction problem where asymmetric information leads to the wrong type of buyer or seller dominating the market.', 24),

  ('econ-u1-mcq-25', '2.10 Asymmetric Information', 'SL/HL', '1',
   'Moral hazard in insurance markets refers to:',
   'Insurers setting prices too low',
   'Insured individuals taking greater risks because they are protected against loss',
   'Insurance companies having more information than consumers',
   'The government regulating insurance markets',
   1, 'Moral hazard is a post-transaction problem: once insured, individuals may behave more recklessly since they are shielded from consequences.', 25);

-- 2.11 Market Structures (Q26-29, HL)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-26', '2.11 Market Structures', 'HL', '1',
   'In perfect competition, firms are price takers because:',
   'There are high barriers to entry',
   'Products are differentiated',
   'There are many firms selling a homogeneous product',
   'Firms collude on prices',
   2, 'With many sellers and identical products, no single firm can influence the market price; they must accept the prevailing price.', 26),

  ('econ-u1-mcq-27', '2.11 Market Structures', 'HL', '1',
   'A profit-maximising firm produces where:',
   'AR = AC',
   'MR = MC',
   'TR = TC',
   'P = AVC',
   1, 'Profit is maximised at the output level where marginal revenue equals marginal cost (MR = MC).', 27),

  ('econ-u1-mcq-28', '2.11 Market Structures', 'HL', '1',
   'In the long run under monopolistic competition, firms earn:',
   'Supernormal profits',
   'Normal profits only',
   'Losses',
   'The same profit as a monopolist',
   1, 'Low barriers to entry mean new firms enter when profits exist, shifting demand left until firms earn only normal profit (AR = AC tangency).', 28),

  ('econ-u1-mcq-29', '2.11 Market Structures', 'HL', '1',
   'The kinked demand curve model of oligopoly predicts:',
   'Frequent price changes',
   'Price rigidity',
   'Perfect competition outcomes',
   'Zero economic profit',
   1, 'The kinked demand curve explains why oligopolists tend to keep prices stable: rivals match price cuts but ignore price rises, creating a kink.', 29);

-- 2.12 Equity (Q30, SL/HL)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-30', '2.12 Equity', 'SL/HL', '1',
   'Which of the following best explains why free markets may fail to achieve equity?',
   'Markets always produce at allocative efficiency',
   'Markets distribute income based on factor ownership and productivity, not need',
   'Government intervention always worsens inequality',
   'Public goods are overproduced',
   1, 'Market outcomes depend on initial endowments and marginal productivity. Those with fewer resources earn less, leading to potentially inequitable distributions.', 30);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

-- Q1: Demand, Supply & Equilibrium
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u1-wr-01a', '2.3 Competitive Market Equilibrium', 'SL/HL', 'short_answer', '1', 10,
   'Using a diagram, explain how a market reaches equilibrium and define consumer and producer surplus.',
   '• Definition of equilibrium price and quantity (where Qd = Qs) [1–2 marks]
• Correctly drawn and labelled supply-and-demand diagram showing equilibrium [1–2 marks]
• Explanation of how excess supply pushes price down and excess demand pushes price up toward equilibrium [2–3 marks]
• Definition of consumer surplus (area below demand curve, above price) with diagram identification [1–2 marks]
• Definition of producer surplus (area above supply curve, below price) with diagram identification [1–2 marks]
• Clear linkage: the price mechanism (signalling, rationing, incentives) moves the market toward equilibrium [1 mark]',
   'Paper 1 (a)', 1),

  ('econ-u1-wr-01b', '2.7 Government Intervention', 'SL/HL', 'short_answer', '1', 15,
   'Using real-world examples, evaluate the effectiveness of a price ceiling as a form of government intervention in a market.',
   '• Definition of a price ceiling / maximum price [1 mark]
• Diagram showing price ceiling below equilibrium with shortage identified [2 marks]
• Explanation: quantity demanded > quantity supplied at the controlled price [1–2 marks]
• Analysis of consequences: shortages, rationing (queues), black/parallel markets, reduced quality, reduced investment [3–4 marks]
• At least one real-world example discussed with specifics (e.g. rent controls in New York/Berlin, price controls on staple foods) [2 marks]
• Evaluation: weighing benefits (protecting consumers, affordability) vs costs (misallocation, disincentives for suppliers) [3–4 marks]
• Balanced conclusion: effectiveness depends on the market, enforcement, time period, and availability of alternatives [1–2 marks]',
   'Paper 1 (b)', 2);

-- Q2: Externalities
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u1-wr-02a', '2.8 Externalities & Common Pool Resources', 'SL/HL', 'short_answer', '1', 10,
   'Using an appropriate diagram, explain why a negative externality of production leads to market failure.',
   '• Definition of negative externality of production and market failure [1–2 marks]
• Correctly drawn diagram: MPC, MSC (above MPC), and demand/MPB=MSB curve [2 marks]
• Explanation: the divergence between MPC and MSC reflects external costs borne by third parties [1–2 marks]
• Identification of the free market output (where MPC = MPB) vs the socially optimal output (where MSC = MSB) [2 marks]
• Identification and explanation of the welfare loss triangle (deadweight loss from overproduction) [2 marks]
• Conclusion: resources are misallocated; too much of the good is produced [1 mark]',
   'Paper 1 (a)', 3),

  ('econ-u1-wr-02b', '2.8 Externalities & Common Pool Resources', 'SL/HL', 'short_answer', '1', 15,
   'Evaluate the use of a carbon tax versus tradeable pollution permits as methods to correct the market failure caused by carbon emissions.',
   '• Explanation of how a carbon tax works (tax per unit of emissions, internalises the externality, shifts MPC toward MSC) [2–3 marks]
• Advantages: revenue for government, incentive to reduce pollution, applies to all firms [1–2 marks]
• Disadvantages: difficulty setting the correct tax level, may reduce competitiveness, regressive impact [1–2 marks]
• Explanation of tradeable permits (government sets a cap, firms trade permits, market determines price of pollution) [2–3 marks]
• Advantages: guaranteed quantity of pollution, market-based efficiency, rewards clean firms [1–2 marks]
• Disadvantages: may be difficult to monitor, initial allocation controversy, volatile permit prices [1–2 marks]
• Comparative evaluation: which is more effective depends on the priority (certainty of price vs certainty of quantity), administration costs, and market conditions [2–3 marks]
• Use of real-world examples (EU ETS, carbon taxes in Sweden/Canada) strengthens analysis [1 mark]',
   'Paper 1 (b)', 4);

-- Q3: Elasticity
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u1-wr-03a', '2.5 Elasticity of Demand', 'SL/HL', 'short_answer', '1', 10,
   'Explain, using diagrams, the difference between price elastic and price inelastic demand, and outline the factors that determine PED.',
   '• Definition of PED with formula [1–2 marks]
• Diagram of elastic demand (relatively flat curve) with explanation: % change in Qd > % change in P [2 marks]
• Diagram of inelastic demand (relatively steep curve) with explanation: % change in Qd < % change in P [2 marks]
• Factors that determine PED: availability of substitutes, necessity vs luxury, proportion of income spent, time horizon, habit/addiction [3–4 marks]
• Clear distinction and correct use of economic terminology throughout [1 mark]',
   'Paper 1 (a)', 5),

  ('econ-u1-wr-03b', '2.5 Elasticity of Demand', 'SL/HL', 'short_answer', '1', 15,
   'Using real-world examples, evaluate the significance of price elasticity of demand and income elasticity of demand for firms and governments.',
   '• Significance for firms: pricing strategy – raise price if inelastic, lower if elastic, to maximise revenue [2–3 marks]
• Significance for governments: tax revenue – taxing inelastic goods (tobacco, petrol) generates more revenue with less deadweight loss [2–3 marks]
• Definition of YED and distinction between normal, inferior, and luxury goods [1–2 marks]
• Significance for firms: marketing and product range decisions based on income trends [1–2 marks]
• Significance for governments: forecasting tax revenue and planning public services as incomes change [1–2 marks]
• Real-world examples integrated (e.g. petrol taxation, luxury brands, supermarket strategies) [2 marks]
• Evaluation: elasticities are estimates, change over time, and depend on the time period and definition of the market [2–3 marks]',
   'Paper 1 (b)', 6);

-- Q4: Market Structures (HL)
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u1-wr-04a', '2.11 Market Structures', 'HL', 'short_answer', '1', 10,
   'Using diagrams, compare the short-run equilibrium of a firm in perfect competition with that of a monopolist.',
   '• Diagram for perfect competition: horizontal AR = MR = D; U-shaped MC and AC curves; profit-max at MR = MC [2–3 marks]
• Identification of supernormal profit area (or normal/loss) depending on AC position [1 mark]
• Diagram for monopoly: downward-sloping AR (demand), MR below AR, MC curve; profit-max at MR = MC, price read from AR curve [2–3 marks]
• Identification of monopoly supernormal profit area [1 mark]
• Comparison: monopolist produces lower output at a higher price; allocative inefficiency (P > MC); productive inefficiency (not at min AC) [2–3 marks]',
   'Paper 1 (a)', 7),

  ('econ-u1-wr-04b', '2.11 Market Structures', 'HL', 'short_answer', '1', 15,
   'Evaluate the view that monopoly is always harmful to consumers.',
   '• Arguments that monopoly harms consumers: higher prices, lower output, allocative inefficiency, possible X-inefficiency, restricted choice [3–4 marks]
• Arguments that monopoly may benefit consumers: economies of scale (lower AC), supernormal profits fund R&D and innovation, natural monopoly may be efficient, cross-subsidisation [3–4 marks]
• Discussion of government regulation (price regulation, antitrust law) as a tool to limit harm [2 marks]
• Real-world examples (e.g. tech monopolies, pharmaceutical patents, utility companies) [2 marks]
• Evaluation: depends on the market, contestability, regulation, and dynamic efficiency – not always harmful [2–3 marks]',
   'Paper 1 (b)', 8);
