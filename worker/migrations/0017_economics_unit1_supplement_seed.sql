-- ============================================================
-- Economics Content Seed Data — Unit 1 SUPPLEMENT
-- Real-World Examples, Diagram Checklist, Formulas,
-- Exam Tips, 30 Extra Flashcards, 10 Extra MCQs
-- ============================================================

-- ─── DIAGRAM CHECKLIST SECTIONS ──────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-diag-ds', 'Diagrams: Demand & Supply (2.1–2.3)', '#0284C7', '1', 13),
  ('econ-diag-elast', 'Diagrams: Elasticity (2.5–2.6)', '#B91C1C', '1', 14),
  ('econ-diag-govt', 'Diagrams: Government Intervention (2.7)', '#EA580C', '1', 15),
  ('econ-diag-extern', 'Diagrams: Externalities & Market Failure (2.8–2.10)', '#4338CA', '1', 16),
  ('econ-diag-struct', 'Diagrams: Market Structures (2.11 HL)', '#BE185D', '1', 17);

-- ─── DIAGRAM CHECKLIST ITEMS ─────────────────────────────────

-- Diagrams: Demand & Supply
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-diag-ds', 'Demand curve (downward-sloping, with axes labelled P and Q)', 1),
  ('econ-diag-ds', 'Supply curve (upward-sloping, with axes labelled P and Q)', 2),
  ('econ-diag-ds', 'Equilibrium diagram (D and S intersecting; label Pe, Qe)', 3),
  ('econ-diag-ds', 'Shift of demand curve (leftward and rightward) vs movement along', 4),
  ('econ-diag-ds', 'Shift of supply curve (leftward and rightward) vs movement along', 5),
  ('econ-diag-ds', 'Excess demand (shortage) diagram', 6),
  ('econ-diag-ds', 'Excess supply (surplus) diagram', 7),
  ('econ-diag-ds', 'Consumer surplus and producer surplus areas on equilibrium diagram', 8);

-- Diagrams: Elasticity
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-diag-elast', 'Perfectly elastic demand (horizontal line)', 1),
  ('econ-diag-elast', 'Perfectly inelastic demand (vertical line)', 2),
  ('econ-diag-elast', 'Relatively elastic demand (shallow curve)', 3),
  ('econ-diag-elast', 'Relatively inelastic demand (steep curve)', 4),
  ('econ-diag-elast', 'Unit elastic demand (rectangular hyperbola)', 5),
  ('econ-diag-elast', 'PED and total revenue relationship diagram', 6),
  ('econ-diag-elast', 'Elastic vs inelastic supply curves', 7),
  ('econ-diag-elast', 'Perfectly elastic and perfectly inelastic supply', 8);

-- Diagrams: Government Intervention
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-diag-govt', 'Specific indirect tax: parallel upward shift of S, showing tax wedge, consumer/producer incidence, government revenue, welfare loss', 1),
  ('econ-diag-govt', 'Ad valorem tax: pivoting upward shift of S (widens with price)', 2),
  ('econ-diag-govt', 'Tax incidence with elastic demand vs inelastic demand (side-by-side comparison)', 3),
  ('econ-diag-govt', 'Per-unit subsidy: parallel downward shift of S, showing government cost, consumer/producer benefit', 4),
  ('econ-diag-govt', 'Price ceiling (below equilibrium): showing shortage, potential black market price', 5),
  ('econ-diag-govt', 'Price floor (above equilibrium): showing surplus', 6);

-- Diagrams: Externalities & Market Failure
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-diag-extern', 'Negative externality of production: MPC, MSC (above MPC), D=MSB=MPB; welfare loss triangle', 1),
  ('econ-diag-extern', 'Negative externality of consumption: D=MPB, MSB (below MPB), S=MPC=MSC; welfare loss triangle', 2),
  ('econ-diag-extern', 'Positive externality of production: MPC, MSC (below MPC), D=MSB=MPB; welfare gain triangle', 3),
  ('econ-diag-extern', 'Positive externality of consumption: D=MPB, MSB (above MPB), S=MPC=MSC; welfare gain triangle', 4),
  ('econ-diag-extern', 'Pigouvian tax correcting a negative externality (tax shifts MPC up toward MSC)', 5),
  ('econ-diag-extern', 'Subsidy correcting a positive externality (subsidy shifts curve toward optimal)', 6),
  ('econ-diag-extern', 'Tradeable permits diagram (supply of permits is vertical/perfectly inelastic)', 7);

-- Diagrams: Market Structures (HL)
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-diag-struct', 'Perfect competition SR: horizontal AR=MR=D; U-shaped MC, ATC; profit/loss shading', 1),
  ('econ-diag-struct', 'Perfect competition LR: AR=MR tangent to minimum of ATC (normal profit)', 2),
  ('econ-diag-struct', 'Monopolistic competition SR: downward-sloping AR, MR below; supernormal profit', 3),
  ('econ-diag-struct', 'Monopolistic competition LR: AR tangent to ATC (normal profit), excess capacity', 4),
  ('econ-diag-struct', 'Monopoly: downward-sloping AR, MR; profit max at MR=MC; supernormal profit shaded', 5),
  ('econ-diag-struct', 'Natural monopoly: downward-sloping LRAC with AR intersecting LRAC; regulated vs unregulated price', 6),
  ('econ-diag-struct', 'Kinked demand curve (oligopoly): kink at prevailing price; discontinuous MR curve', 7),
  ('econ-diag-struct', 'Collusive oligopoly (cartel): acts like monopoly diagram', 8);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO economics_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('econ-u1-rwe', 'Real-World Examples', '#059669', '1', 4),
  ('econ-u1-formulas', 'Key Formulas', '#D97706', '1', 5),
  ('econ-u1-exam-tips', 'Exam Technique Tips', '#DC2626', '1', 6),
  ('econ-u1-advanced', 'Advanced Concepts', '#4F46E5', '1', 7);

-- ─── FLASHCARDS: Real-World Examples (31 cards) ──────────────

INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-rwe', 'Gallium export restrictions (China)', 'China restricted exports of gallium (used in semiconductors), illustrating the rationing function of the price mechanism when supply is limited. (2.1–2.3)', NULL, 1),
  ('econ-u1-rwe', 'COVID-19 mask market', 'During the pandemic, demand for masks surged (rightward shift of D) while supply was initially constrained, leading to price spikes before new suppliers entered. (2.1–2.3)', NULL, 2),
  ('econ-u1-rwe', 'OPEC oil supply decisions', 'OPEC supply decisions shift the global supply curve, directly affecting equilibrium price and quantity of crude oil. (2.1–2.3)', NULL, 3),
  ('econ-u1-rwe', 'Cookie consent banners (choice architecture)', 'Websites display a large "Accept All" button alongside a tiny "Manage Preferences" link – a real-world example of default choice nudging. (2.4)', NULL, 4),
  ('econ-u1-rwe', 'iPhone brand loyalty (anchoring bias)', 'Many consumers never switch from iPhones to Android, even when Android offers better value, due to anchoring to their initial experience. (2.4)', NULL, 5),
  ('econ-u1-rwe', 'Global charity industry ($330B+)', 'Demonstrates bounded selfishness – consumers are not always selfish and will donate to help others. (2.4)', NULL, 6),
  ('econ-u1-rwe', 'Thaler & Sunstein cafeteria experiment', 'Placing healthier food at eye-level increased healthy choices – the foundational nudge theory example (Nobel Prize 2017). (2.4)', NULL, 7),
  ('econ-u1-rwe', 'UK pension auto-enrolment', 'Workers are enrolled by default into pension schemes; opt-out rates are far lower than opt-in rates, demonstrating default choice architecture. (2.4)', NULL, 8),
  ('econ-u1-rwe', 'Petrol/gasoline (inelastic PED)', 'Few short-run substitutes, necessity for commuters – governments raise significant tax revenue from fuel taxes because demand barely falls. (2.5)', NULL, 9),
  ('econ-u1-rwe', 'Luxury handbags (elastic PED, high YED)', 'Demand is highly responsive to price and income changes; luxury brands can increase revenue by creating perceived scarcity. (2.5)', NULL, 10),
  ('econ-u1-rwe', 'Rice in developing countries (low YED)', 'Demand changes very little with income; it is a staple good with YED between 0 and 1. (2.5)', NULL, 11),
  ('econ-u1-rwe', 'Streaming services (high XED)', 'Netflix, Disney+, and Amazon Prime are close substitutes with positive XED; a price rise in one increases demand for the others. (2.5)', NULL, 12),
  ('econ-u1-rwe', 'Cigarette taxes (specific indirect tax)', 'Most countries apply heavy specific taxes. Due to inelastic PED, consumers bear most of the burden and government revenue is high. (2.7)', NULL, 13),
  ('econ-u1-rwe', 'VAT in the EU (ad valorem tax)', 'Value Added Tax (typically 17–27%) is a percentage of the sale price; the tax rises proportionally with the price of the good. (2.7)', NULL, 14),
  ('econ-u1-rwe', 'Rent controls in Berlin/New York', 'Price ceilings below equilibrium led to housing shortages, deteriorating quality, and black market subletting. (2.7)', NULL, 15),
  ('econ-u1-rwe', 'EU Common Agricultural Policy (price floor)', 'Minimum prices for agricultural products create surpluses; the EU historically bought excess butter, wine, and grain. (2.7)', NULL, 16),
  ('econ-u1-rwe', 'EV subsidies (Luxembourg, Norway)', 'Per-unit subsidies shift supply right, reduce consumer prices, and increase electric vehicle adoption. (2.7)', NULL, 17),
  ('econ-u1-rwe', 'US Inflation Reduction Act (2022)', 'Subsidises green energy investment – addresses positive externalities of production where MSC < MPC for renewable energy. (2.8)', NULL, 18),
  ('econ-u1-rwe', 'Plain tobacco packaging (Australia, UK)', 'Nudges consumers away from smoking without banning it – addresses negative externalities of consumption. (2.8)', NULL, 19),
  ('econ-u1-rwe', 'EU Emissions Trading System (EU ETS)', 'The world''s largest carbon market; sets a cap on total CO₂ emissions and allows firms to trade permits. (2.8)', NULL, 20),
  ('econ-u1-rwe', 'Sweden carbon tax ($130+/tonne)', 'One of the highest in the world; directly internalises the negative externality of carbon emissions. (2.8)', NULL, 21),
  ('econ-u1-rwe', 'Overfishing in the North Sea', 'A classic tragedy of the commons – rivalrous, non-excludable fishing stocks depleted due to individual self-interest. (2.8)', NULL, 22),
  ('econ-u1-rwe', 'Amazon rainforest deforestation', 'Common pool resource under threat; individual farmers/loggers benefit while the cost (loss of biodiversity, carbon sink) falls on global society. (2.8)', NULL, 23),
  ('econ-u1-rwe', 'National defence & street lighting', 'Classic public goods – non-rivalrous and non-excludable; provided by governments because no private firm can profit from them. (2.9)', NULL, 24),
  ('econ-u1-rwe', 'Used car market (Akerlof ''lemons'' 1970)', 'Sellers know the quality, buyers do not – adverse selection drives down the average quality in the market. (2.10)', NULL, 25),
  ('econ-u1-rwe', 'Health insurance (adverse selection + moral hazard)', 'Higher-risk individuals seek insurance more (adverse selection). Once insured, they may take fewer precautions (moral hazard). (2.10)', NULL, 26),
  ('econ-u1-rwe', 'Agricultural markets (near-perfect competition)', 'Many small producers, homogeneous product (wheat), ease of entry/exit, very little market power. (2.11 HL)', NULL, 27),
  ('econ-u1-rwe', 'Smartphone market (monopolistic competition)', 'Many firms (Samsung, Xiaomi, OnePlus), differentiated products, low barriers to entry, heavy non-price competition. (2.11 HL)', NULL, 28),
  ('econ-u1-rwe', 'OPEC (oligopoly/cartel)', 'A small number of oil-producing nations collude to set output levels and influence global prices; subject to the prisoner''s dilemma. (2.11 HL)', NULL, 29),
  ('econ-u1-rwe', 'Google Search (near-monopoly, 90%+ share)', 'High barriers to entry (technology, data, network effects), potential for supernormal profit, argues dynamic efficiency through innovation. (2.11 HL)', NULL, 30),
  ('econ-u1-rwe', 'Pharmaceutical patents', 'Government-granted monopoly power via patents incentivises R&D but leads to higher drug prices (allocative inefficiency). (2.11 HL)', NULL, 31);

-- ─── FLASHCARDS: Key Formulas (9 cards, excluding PED/YED/XED/PES already in Pack 1) ──

INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-formulas', 'Total Revenue (TR)', 'The total income a firm receives from selling its output. Key relationship: if PED elastic, lower P raises TR; if inelastic, raise P.', 'TR = P × Q', 1),
  ('econ-u1-formulas', 'Tax Revenue', 'The total revenue the government collects from an indirect tax. Shown as a rectangular area on the diagram.', 'Tax Revenue = tax per unit × Q(after tax)', 2),
  ('econ-u1-formulas', 'Government Subsidy Cost', 'The total cost to the government of providing a per-unit subsidy. Shown as a rectangular area on the diagram.', 'Subsidy Cost = subsidy per unit × Q(after subsidy)', 3),
  ('econ-u1-formulas', 'Consumer Surplus (CS)', 'The area of the triangle below the demand curve and above the market price.', 'CS = 0.5 × Q × (max WTP − market price)', 4),
  ('econ-u1-formulas', 'Producer Surplus (PS)', 'The area of the triangle (or trapezoid) above the supply curve and below the market price.', 'PS = 0.5 × Q × (market price − min acceptable price)', 5),
  ('econ-u1-formulas', 'Welfare / Deadweight Loss', 'The loss of total surplus (CS + PS) when the market is not at allocative efficiency. Always a triangle on diagrams.', 'DWL = 0.5 × ΔQ × (tax per unit or price diff)', 6),
  ('econ-u1-formulas', 'Profit (firm)', 'Supernormal if AR > ATC. Normal if AR = ATC. Loss if AR < ATC.', 'Profit = TR − TC = (AR − ATC) × Q', 7),
  ('econ-u1-formulas', 'Marginal Revenue (MR)', 'The additional revenue from selling one more unit. For perfect competition: MR = AR = P. For monopoly: MR < AR.', 'MR = ΔTR / ΔQ', 8),
  ('econ-u1-formulas', 'Marginal Cost (MC)', 'The additional cost of producing one more unit. Profit max: produce where MR = MC (and MC is rising).', 'MC = ΔTC / ΔQ', 9);

-- ─── FLASHCARDS: Exam Technique Tips (11 cards) ─────────────

INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-exam-tips', 'Subsidy incidence: producer on top', 'When drawing subsidy incidence, the producer benefit is the TOP portion and consumer benefit is BELOW. This is the opposite of indirect tax diagrams.', NULL, 1),
  ('econ-u1-exam-tips', 'Use PED to evaluate tax/subsidy', 'For inelastic goods (cigarettes, petrol), the tax burden falls more on consumers and demand falls less – high revenue but little behaviour change. For elastic goods, tax is more effective at reducing quantity but raises less revenue.', NULL, 2),
  ('econ-u1-exam-tips', '15-mark evaluation framework', 'Structure: (1) challenges of measuring externalities, (2) degree of effectiveness of solution, (3) whether a multi-faceted approach is needed, (4) unintended consequences, (5) stakeholder impacts.', NULL, 3),
  ('econ-u1-exam-tips', 'Always identify the welfare loss triangle', 'In any externality or government intervention diagram, the examiner expects you to identify and label the welfare/deadweight loss triangle between market output and socially optimal output.', NULL, 4),
  ('econ-u1-exam-tips', 'Definitions are worth 2 marks', 'All definition questions carry 2 marks with two components. E.g. demand = willingness (1) AND ability (1) to buy at a given price. Always give both halves.', NULL, 5),
  ('econ-u1-exam-tips', 'Use ''polluter pays principle'' terminology', 'When discussing Pigouvian taxes, use this phrase – it shows the examiner you understand the aim is to internalise the externality by making the polluter pay.', NULL, 6),
  ('econ-u1-exam-tips', 'Income + substitution effect explain law of demand', 'Why demand slopes downward: (1) substitution effect – good becomes relatively cheaper vs substitutes, (2) income effect – real purchasing power increases. Also mention diminishing marginal utility.', NULL, 7),
  ('econ-u1-exam-tips', 'Paper 1(b): at least two RWEs', 'The mark scheme explicitly rewards real-world examples in part (b). Aim for at least two different, specific examples (name the country, policy, year). Generic examples score lower.', NULL, 8),
  ('econ-u1-exam-tips', 'Market structures: always state assumptions', 'Before drawing diagrams for any market structure, list key assumptions (number of firms, product homogeneity, barriers to entry, information). Easy marks.', NULL, 9),
  ('econ-u1-exam-tips', 'Don''t forget the shutdown rule', 'A loss-making firm should only continue in SR if P > AVC. If P < AVC, it should shut down. The shutdown point is where AR = minimum AVC.', NULL, 10),
  ('econ-u1-exam-tips', 'Specific vs ad valorem tax diagrams', 'Specific tax: supply curve shifts up by a CONSTANT amount (parallel shift). Ad valorem tax: supply curve PIVOTS upward from the origin, gap widens as price increases.', NULL, 11);

-- ─── FLASHCARDS: Advanced Concepts (30 cards — all verified unique vs Pack 1) ──

INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u1-advanced', 'Income effect', 'As the price of a good falls, the consumer''s real income (purchasing power) increases, so they can afford to buy more of the good.', NULL, 1),
  ('econ-u1-advanced', 'Substitution effect', 'As the price of a good falls, it becomes relatively cheaper compared to substitutes, so consumers switch to it, increasing Qd.', NULL, 2),
  ('econ-u1-advanced', 'Diminishing marginal utility', 'As a consumer consumes more units of a good, the additional satisfaction (utility) from each extra unit decreases. Explains the downward slope of demand.', NULL, 3),
  ('econ-u1-advanced', 'Satisficing', 'Choosing an option that is ''good enough'' rather than the optimal one. Contrasts with utility maximisation. Coined by Herbert Simon.', NULL, 4),
  ('econ-u1-advanced', 'Choice architecture', 'The deliberate design of how choices are presented to consumers. Includes default choices, restricted choices, and mandated choices.', NULL, 5),
  ('econ-u1-advanced', 'Default choice', 'The option that is pre-selected for consumers. People tend to stick with defaults (e.g. organ donation opt-out systems, pension auto-enrolment).', NULL, 6),
  ('econ-u1-advanced', 'Status quo bias', 'The tendency for individuals to prefer their current situation and resist change, even when switching would be beneficial.', NULL, 7),
  ('econ-u1-advanced', 'Confirmation bias', 'The tendency to seek out information that supports pre-existing beliefs and ignore contradicting evidence.', NULL, 8),
  ('econ-u1-advanced', 'Availability heuristic', 'Overestimating the probability of events that are easily recalled (e.g. overestimating plane crash risk after seeing news coverage).', NULL, 9),
  ('econ-u1-advanced', 'Framing effect', 'The way information is presented (framed) affects decision-making. E.g. ''90% fat-free'' sounds better than ''10% fat''.', NULL, 10),
  ('econ-u1-advanced', 'Pigouvian tax', 'A tax designed to correct a negative externality by making the polluter pay the social cost. Named after economist Arthur Pigou.', NULL, 11),
  ('econ-u1-advanced', 'Carbon tax', 'A specific type of Pigouvian tax on carbon emissions, forcing producers to pay per tonne of CO₂ emitted, raising MPC toward MSC.', NULL, 12),
  ('econ-u1-advanced', 'Ad valorem tax', 'An indirect tax levied as a percentage of the sale price (e.g. VAT at 20%). Supply curve pivots upward; tax amount increases with price.', NULL, 13),
  ('econ-u1-advanced', 'Specific tax', 'An indirect tax levied as a fixed amount per unit sold (e.g. $3 per packet). Supply curve shifts up in parallel by the tax amount.', NULL, 14),
  ('econ-u1-advanced', 'Polluter pays principle', 'The idea that the party responsible for pollution should bear the costs of managing it, achieved through Pigouvian taxes or permits.', NULL, 15),
  ('econ-u1-advanced', 'Welfare loss (deadweight loss)', 'The loss of total surplus (CS + PS) that occurs when the market is not at the allocatively efficient output. Shown as a triangle on diagrams.', NULL, 16),
  ('econ-u1-advanced', 'Club good (quasi-public)', 'A good that is non-rivalrous but excludable (e.g. a cinema, toll road, subscription streaming service).', NULL, 17),
  ('econ-u1-advanced', 'Goods classification: 2×2', 'Rivalrous + Excludable = Private good. Non-rivalrous + Non-excludable = Public good. Rivalrous + Non-excludable = CPR. Non-rivalrous + Excludable = Club good.', NULL, 18),
  ('econ-u1-advanced', 'X-inefficiency', 'Occurs when a firm is not producing at the lowest possible cost due to lack of competitive pressure (common in monopolies).', NULL, 19),
  ('econ-u1-advanced', 'Productive efficiency', 'Producing at the lowest point on the ATC curve (min ATC). Achieved in LR perfect competition, NOT in monopoly or monopolistic competition.', NULL, 20),
  ('econ-u1-advanced', 'Excess capacity', 'In monopolistic competition LR, firms produce below the output at min ATC. The gap between their output and min-ATC output is excess capacity.', NULL, 21),
  ('econ-u1-advanced', 'Contestable markets', 'Markets where there are low barriers to entry and exit, so even a monopoly behaves competitively due to the threat of new entrants.', NULL, 22),
  ('econ-u1-advanced', 'Natural monopoly', 'An industry where the minimum efficient scale is so large that one firm can supply the whole market at lower cost than two or more firms. LRAC is still falling at market demand.', NULL, 23),
  ('econ-u1-advanced', 'Price discrimination', 'Charging different prices to different consumers for the same product, based on willingness to pay. Requires market power and ability to segment the market.', NULL, 24),
  ('econ-u1-advanced', 'Shutdown condition', 'A firm should shut down in the short run if Price (AR) < AVC. It should exit the industry in the long run if Price < ATC.', NULL, 25),
  ('econ-u1-advanced', 'Normal profit', 'The minimum profit needed to keep a firm in the industry. TR = TC (including opportunity costs). Earned in LR perfect competition and monopolistic competition.', NULL, 26),
  ('econ-u1-advanced', 'Supernormal (abnormal) profit', 'Profit above normal profit, where TR > TC. Earned in SR by competitive firms, and in both SR and LR by monopolies and oligopolies.', NULL, 27),
  ('econ-u1-advanced', 'Prisoner''s dilemma', 'A game theory scenario where two firms would be better off cooperating (colluding) but individually have an incentive to cheat, leading to a worse outcome for both.', NULL, 28),
  ('econ-u1-advanced', 'Collusion', 'An agreement between firms to restrict competition, e.g. by fixing prices, limiting output, or dividing markets. Can be formal (cartel) or informal (tacit).', NULL, 29),
  ('econ-u1-advanced', 'Direct provision', 'Government directly provides goods/services that the free market would under-provide (e.g. public goods like defence, or merit goods like public education).', NULL, 30);

-- ─── ADDITIONAL MCQ QUESTIONS (10, sort_order 31–40) ─────────

INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u1-mcq-31', '2.1 Demand', 'SL/HL', '1',
   'The income effect of a price decrease means:',
   'The good becomes relatively cheaper than substitutes',
   'The consumer''s real purchasing power increases, so they buy more',
   'The marginal utility of the good increases',
   'The supply curve shifts rightward',
   1, 'The income effect: as price falls, real income rises, allowing consumers to purchase more. Option A describes the substitution effect.', 31),

  ('econ-u1-mcq-32', '2.9 Public Goods', 'SL/HL', '1',
   'A cinema is an example of which type of good?',
   'Public good',
   'Common pool resource',
   'Club good (quasi-public)',
   'Private good',
   2, 'A cinema is non-rivalrous (up to capacity) but excludable (you need a ticket). This makes it a club good.', 32),

  ('econ-u1-mcq-33', '2.7 Government Intervention', 'SL/HL', '1',
   'Which of the following best describes an ad valorem tax?',
   'A fixed tax of $5 per unit sold',
   'A tax calculated as a percentage of the sale price',
   'A tax levied on producers'' profits',
   'A lump-sum tax on firms',
   1, 'Ad valorem = "according to value". VAT is the most common example. The supply curve pivots upward rather than shifting in parallel.', 33),

  ('econ-u1-mcq-34', '2.11 Market Structures', 'HL', '1',
   'In the short run, a loss-making firm in perfect competition should continue producing if:',
   'Price > ATC',
   'Price > AVC',
   'Price < AVC',
   'MR > ATC',
   1, 'If P > AVC, the firm covers all variable costs and contributes toward fixed costs. Shutting down would mean losing all fixed costs. If P < AVC, it should shut down.', 34),

  ('econ-u1-mcq-35', '2.11 Market Structures', 'HL', '1',
   'X-inefficiency is most likely to occur in:',
   'Perfect competition',
   'Monopolistic competition',
   'A monopoly',
   'A contestable market',
   2, 'Without competitive pressure, monopolies lack incentive to minimise costs. This internal inefficiency above the ATC curve is called X-inefficiency.', 35),

  ('econ-u1-mcq-36', '2.11 Market Structures', 'HL', '1',
   'In the long run under monopolistic competition, firms produce with excess capacity. This means:',
   'They produce at the minimum of ATC',
   'They produce below the output at minimum ATC',
   'They earn supernormal profit',
   'They are allocatively efficient',
   1, 'The LR tangency point between AR and ATC occurs to the LEFT of minimum ATC. The gap between their output and min-ATC output is excess capacity.', 36),

  ('econ-u1-mcq-37', '2.4 Behavioural Economics', 'SL/HL', '1',
   'A government auto-enrolls citizens into organ donation unless they opt out. This is an example of:',
   'A Pigouvian tax',
   'A price floor',
   'A default choice nudge',
   'Legislation',
   2, 'Opt-out organ donation is classic nudge policy using default choice architecture – people tend to stick with the default, so more people remain donors.', 37),

  ('econ-u1-mcq-38', '2.8 Externalities & Common Pool Resources', 'SL/HL', '1',
   'Arthur Pigou argued that negative externalities should be corrected by:',
   'Nationalising the polluting industry',
   'Imposing a tax equal to the external cost',
   'Banning all production of the good',
   'Providing subsidies to affected third parties',
   1, 'A Pigouvian tax is set equal to the marginal external cost, shifting MPC up to MSC and achieving the socially optimal output.', 38),

  ('econ-u1-mcq-39', '2.11 Market Structures', 'HL', '1',
   'The prisoner''s dilemma in oligopoly theory illustrates that:',
   'Firms always collude successfully',
   'Each firm has an individual incentive to cheat on a collusive agreement',
   'Oligopolies always produce at allocative efficiency',
   'Game theory is irrelevant to economics',
   1, 'Even when collusion would maximise joint profits, each firm can increase its own profit by secretly lowering price or increasing output – leading to a Nash equilibrium where both cheat.', 39),

  ('econ-u1-mcq-40', '2.11 Market Structures', 'HL', '1',
   'A market is described as contestable when:',
   'There are many small firms',
   'There are low barriers to entry and exit',
   'Products are homogeneous',
   'The government regulates prices',
   1, 'Contestability is about the threat of entry, not the number of firms. Even a monopoly may behave competitively if new firms can easily enter and exit.', 40);
