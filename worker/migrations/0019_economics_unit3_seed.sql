-- ============================================================
-- Economics Content Seed Data — Unit 3: The Global Economy
-- Syllabus: 4.1–4.10 (First Assessment 2024)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO economics_category_colors (category, color) VALUES
  ('4.1 Trade', '#2563EB'),
  ('4.2 Trade Protection', '#059669'),
  ('4.3 Trade Arguments', '#7C3AED'),
  ('4.4 Economic Integration', '#D97706'),
  ('4.5 Exchange Rates', '#DC2626'),
  ('4.6 Balance of Payments', '#0891B2'),
  ('4.7 Sustainable Development', '#F97316'),
  ('4.8 Measuring Development', '#4F46E5'),
  ('4.9 Barriers to Development', '#16A34A'),
  ('4.10 Strategies for Development', '#9333EA');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-4-1-trade', '4.1 — Benefits of International Trade', '#2563EB', '3', 31),
  ('econ-4-2-protection', '4.2 — Types of Trade Protection', '#059669', '3', 32),
  ('econ-4-3-arguments', '4.3 — Arguments For and Against Trade Protection', '#7C3AED', '3', 33),
  ('econ-4-4-integration', '4.4 — Economic Integration', '#D97706', '3', 34),
  ('econ-4-5-exchange', '4.5 — Exchange Rates', '#DC2626', '3', 35),
  ('econ-4-6-bop', '4.6 — Balance of Payments', '#0891B2', '3', 36),
  ('econ-4-7-sustainable', '4.7 — Sustainable Development', '#F97316', '3', 37),
  ('econ-4-8-measuring', '4.8 — Measuring Development', '#4F46E5', '3', 38),
  ('econ-4-9-barriers', '4.9 — Barriers to Development', '#16A34A', '3', 39),
  ('econ-4-10-strategies', '4.10 — Strategies for Development', '#9333EA', '3', 40);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- 4.1 Benefits of International Trade
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-1-trade', 'Explain the benefits of free trade (greater choice, lower prices, economies of scale, increased competition, efficient resource allocation)', 1),
  ('econ-4-1-trade', 'Define and calculate absolute advantage', 2),
  ('econ-4-1-trade', 'Define and calculate comparative advantage using opportunity cost ratios', 3),
  ('econ-4-1-trade', 'Use a numerical example to show gains from trade based on comparative advantage', 4),
  ('econ-4-1-trade', 'Draw a PPC diagram to illustrate comparative advantage and trade', 5),
  ('econ-4-1-trade', '(HL) Explain limitations of the theory of comparative advantage (transport costs, assumptions of constant costs, factor immobility, externalities)', 6);

-- 4.2 Types of Trade Protection
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-2-protection', 'Define trade protection/protectionism', 1),
  ('econ-4-2-protection', 'Draw and analyse a tariff diagram (domestic S, domestic D, world supply price, tariff effects on price, quantity, imports, welfare)', 2),
  ('econ-4-2-protection', 'Identify on the diagram: consumer surplus loss, producer surplus gain, government revenue, welfare/deadweight loss', 3),
  ('econ-4-2-protection', 'Draw and analyse a quota diagram (similar to tariff but no government revenue; quota rent)', 4),
  ('econ-4-2-protection', 'Explain the effect of a domestic production subsidy on trade (shifts domestic S right, reduces imports)', 5),
  ('econ-4-2-protection', 'Explain export subsidies and their effects', 6),
  ('econ-4-2-protection', 'Explain administrative barriers (red tape, standards, licensing requirements)', 7);

-- 4.3 Arguments For and Against Trade Protection
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-3-arguments', 'Arguments for: infant industry, national security, protection of domestic jobs, anti-dumping, revenue, strategic trade policy', 1),
  ('econ-4-3-arguments', 'Arguments against: higher prices, reduced choice, retaliation, inefficiency, rent-seeking, loss of comparative advantage', 2),
  ('econ-4-3-arguments', 'Evaluate: protection rarely achieves its goals in the long run; may be justified temporarily for infant industries', 3);

-- 4.4 Economic Integration
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-4-integration', 'Define and distinguish: preferential trade agreement, free trade area, customs union, common market, economic/monetary union', 1),
  ('econ-4-4-integration', 'Explain trade creation and trade diversion with examples', 2),
  ('econ-4-4-integration', 'Explain advantages and disadvantages of trading blocs (e.g. EU, ASEAN, USMCA)', 3),
  ('econ-4-4-integration', 'Explain the role of the WTO (principles: non-discrimination/MFN, reciprocity, transparency, dispute resolution)', 4),
  ('econ-4-4-integration', '(HL) Explain advantages and disadvantages of monetary union (e.g. Eurozone)', 5);

-- 4.5 Exchange Rates
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-5-exchange', 'Define exchange rate (price of one currency in terms of another)', 1),
  ('econ-4-5-exchange', 'Draw a currency supply-and-demand diagram', 2),
  ('econ-4-5-exchange', 'Explain factors affecting demand and supply of a currency (trade flows, investment flows, speculation, interest rates, inflation rates, government intervention)', 3),
  ('econ-4-5-exchange', 'Explain and illustrate appreciation and depreciation of a floating exchange rate', 4),
  ('econ-4-5-exchange', 'Explain the effects of exchange rate changes on exports, imports, current account, inflation, growth, employment', 5),
  ('econ-4-5-exchange', 'Explain fixed exchange rate systems (government buys/sells currency, uses reserves, adjusts interest rates)', 6),
  ('econ-4-5-exchange', 'Explain managed (dirty) float exchange rate systems', 7),
  ('econ-4-5-exchange', 'Compare advantages and disadvantages of fixed vs floating systems', 8),
  ('econ-4-5-exchange', '(HL) Explain the Marshall-Lerner condition (PED exports + PED imports > 1 for depreciation to improve trade balance)', 9),
  ('econ-4-5-exchange', '(HL) Draw and explain the J-curve effect (trade balance initially worsens after depreciation before improving)', 10);

-- 4.6 Balance of Payments
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-6-bop', 'Define balance of payments (record of all economic transactions between residents and rest of world)', 1),
  ('econ-4-6-bop', 'Explain the current account (trade in goods, trade in services, primary income, secondary income/transfers)', 2),
  ('econ-4-6-bop', 'Explain the capital account (capital transfers, non-produced non-financial assets)', 3),
  ('econ-4-6-bop', 'Explain the financial account (FDI, portfolio investment, reserve assets, official borrowing)', 4),
  ('econ-4-6-bop', 'State that current account + capital account + financial account = 0', 5),
  ('econ-4-6-bop', 'Explain the interdependence between accounts (current account deficit financed by financial account surplus)', 6),
  ('econ-4-6-bop', 'Explain causes and implications of a persistent current account deficit', 7),
  ('econ-4-6-bop', 'Explain causes and implications of a persistent current account surplus', 8),
  ('econ-4-6-bop', 'Discuss methods to correct a persistent current account deficit (depreciation, expenditure switching, expenditure reducing, supply-side policies)', 9);

-- 4.7 Sustainable Development
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-7-sustainable', 'Define sustainable development (meeting present needs without compromising future generations)', 1),
  ('econ-4-7-sustainable', 'Explain the relationship between economic growth and environmental sustainability', 2),
  ('econ-4-7-sustainable', 'Outline the UN Sustainable Development Goals (SDGs)', 3),
  ('econ-4-7-sustainable', '(HL) Explain the relationship between sustainability and poverty (poverty traps, environmental degradation, resource depletion)', 4);

-- 4.8 Measuring Development
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-8-measuring', 'Distinguish between economic growth and economic development', 1),
  ('econ-4-8-measuring', 'Explain single indicators of development: GDP per capita (PPP), health indicators, education indicators', 2),
  ('econ-4-8-measuring', 'Explain composite indicators: HDI (health, education, income), GII, MPI', 3),
  ('econ-4-8-measuring', 'Evaluate strengths and limitations of different development measures', 4),
  ('econ-4-8-measuring', 'Explain the relationship between economic growth and economic development (growth is necessary but not sufficient)', 5);

-- 4.9 Barriers to Development
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-9-barriers', 'Explain poverty cycles/traps (low income → low savings → low investment → low growth)', 1),
  ('econ-4-9-barriers', 'Explain economic barriers: lack of capital, rising commodity dependence, unfavourable terms of trade, debt', 2),
  ('econ-4-9-barriers', 'Explain political/social barriers: corruption, weak institutions, conflict, gender inequality', 3),
  ('econ-4-9-barriers', 'Explain role of international trade barriers, brain drain, geography/climate', 4);

-- 4.10 Strategies for Development
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-4-10-strategies', 'Trade strategies: import substitution (ISI), export promotion, trade liberalisation, fair trade', 1),
  ('econ-4-10-strategies', 'Market-based strategies: trade liberalisation, privatisation, deregulation, FDI attraction', 2),
  ('econ-4-10-strategies', 'Interventionist strategies: industrial policy, investment in human capital, infrastructure, redistribution', 3),
  ('econ-4-10-strategies', 'Role of foreign aid: types (bilateral, multilateral, tied, untied), advantages and criticisms', 4),
  ('econ-4-10-strategies', 'Role of international financial institutions: IMF, World Bank (structural adjustment, conditionality)', 5),
  ('econ-4-10-strategies', 'Role of FDI: benefits (capital, technology, jobs) and costs (profit repatriation, environmental damage, exploitation)', 6),
  ('econ-4-10-strategies', 'Role of microfinance and fair trade', 7);

-- ─── DIAGRAM CHECKLIST SECTIONS ──────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-u3-diag-trade', 'Diagrams: Trade & Protection (4.1–4.3)', '#0284C7', '3', 41),
  ('econ-u3-diag-exchange', 'Diagrams: Exchange Rates (4.5)', '#DC2626', '3', 42),
  ('econ-u3-diag-bop', 'Diagrams: Balance of Payments (4.6)', '#0891B2', '3', 43),
  ('econ-u3-diag-dev', 'Diagrams: Development (4.7–4.10)', '#9333EA', '3', 44);

-- ─── DIAGRAM CHECKLIST ITEMS ─────────────────────────────────

-- Diagrams: Trade & Protection
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u3-diag-trade', 'PPC diagram showing comparative advantage and gains from trade', 1),
  ('econ-u3-diag-trade', 'Tariff diagram (Pw, Pw+t, domestic S/D, government revenue, deadweight loss triangles)', 2),
  ('econ-u3-diag-trade', 'Quota diagram (Pw, Pq, domestic S/D, quota rent area)', 3),
  ('econ-u3-diag-trade', 'Domestic subsidy diagram (domestic S shifts right, imports reduced)', 4),
  ('econ-u3-diag-trade', 'Export subsidy diagram', 5);

-- Diagrams: Exchange Rates
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u3-diag-exchange', 'Currency S/D diagram (floating): equilibrium exchange rate', 1),
  ('econ-u3-diag-exchange', 'Appreciation diagram (D shifts right or S shifts left)', 2),
  ('econ-u3-diag-exchange', 'Depreciation diagram (S shifts right or D shifts left)', 3),
  ('econ-u3-diag-exchange', 'Fixed exchange rate with central bank intervention', 4),
  ('econ-u3-diag-exchange', '(HL) J-curve diagram (trade balance vs time after depreciation)', 5);

-- Diagrams: Balance of Payments
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u3-diag-bop', 'Balance of payments structure diagram (current + capital + financial = 0)', 1);

-- Diagrams: Development
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u3-diag-dev', 'Poverty cycle/trap diagram', 1),
  ('econ-u3-diag-dev', 'Harrod-Domar model diagram (if applicable)', 2),
  ('econ-u3-diag-dev', 'HDI components diagram', 3);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO economics_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('econ-u3-trade', 'Trade Theory & Protection', '#2563EB', '3', 12),
  ('econ-u3-integration', 'Economic Integration', '#D97706', '3', 13),
  ('econ-u3-exchange', 'Exchange Rates & BoP', '#DC2626', '3', 14),
  ('econ-u3-development', 'Development', '#9333EA', '3', 15);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- Trade Theory & Protection (8 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u3-trade', 'Absolute advantage', 'A country can produce a good using fewer resources (or more output per unit of input) than another country.', NULL, 1),
  ('econ-u3-trade', 'Comparative advantage', 'A country can produce a good at a lower opportunity cost than another country. Basis for mutually beneficial trade.', NULL, 2),
  ('econ-u3-trade', 'Tariff', 'A tax on imported goods. Raises domestic price, reduces imports, creates deadweight loss, generates government revenue.', NULL, 3),
  ('econ-u3-trade', 'Quota', 'A physical limit on the quantity of imports. Raises price, creates quota rent (not government revenue), reduces imports.', NULL, 4),
  ('econ-u3-trade', 'Export subsidy', 'Government payment to domestic firms to make exports cheaper abroad. Can lead to WTO disputes and retaliation.', NULL, 5),
  ('econ-u3-trade', 'Administrative barriers', 'Non-tariff barriers: regulations, standards, licensing, customs procedures that make importing harder without explicit tariffs.', NULL, 6),
  ('econ-u3-trade', 'Infant industry argument', 'New industries need temporary protection to achieve economies of scale before they can compete internationally.', NULL, 7),
  ('econ-u3-trade', 'Dumping', 'Selling exports below production cost or domestic price. Anti-dumping duties can be imposed as a countermeasure.', NULL, 8);

-- Economic Integration (7 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u3-integration', 'Free trade area (FTA)', 'Member countries remove tariffs between themselves but maintain independent external tariffs (e.g. original NAFTA).', NULL, 1),
  ('econ-u3-integration', 'Customs union', 'FTA + common external tariff on non-members (e.g. EU customs union, Mercosur).', NULL, 2),
  ('econ-u3-integration', 'Common market', 'Customs union + free movement of labour and capital (e.g. EU single market).', NULL, 3),
  ('econ-u3-integration', 'Economic/monetary union', 'Common market + shared economic policies and/or a common currency (e.g. Eurozone).', NULL, 4),
  ('econ-u3-integration', 'Trade creation', 'Joining a bloc shifts imports from high-cost domestic producers to lower-cost member producers. Welfare-improving.', NULL, 5),
  ('econ-u3-integration', 'Trade diversion', 'Joining a bloc shifts imports from efficient non-members to less efficient members due to the common external tariff. Welfare-reducing.', NULL, 6),
  ('econ-u3-integration', 'WTO', 'World Trade Organisation: promotes free trade, enforces trade rules, resolves disputes. Key principles: MFN, reciprocity, transparency.', NULL, 7);

-- Exchange Rates & BoP (10 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u3-exchange', 'Exchange rate', 'The price of one currency expressed in terms of another currency.', NULL, 1),
  ('econ-u3-exchange', 'Appreciation', 'An increase in the value of a currency under a floating system. Makes exports more expensive, imports cheaper.', NULL, 2),
  ('econ-u3-exchange', 'Depreciation', 'A decrease in the value of a currency under a floating system. Makes exports cheaper, imports more expensive.', NULL, 3),
  ('econ-u3-exchange', 'Devaluation/Revaluation', 'Deliberate change in a fixed exchange rate by the government. Devaluation = lowering the fixed rate.', NULL, 4),
  ('econ-u3-exchange', 'Marshall-Lerner condition (HL)', 'Depreciation improves the trade balance only if PEDx + PEDm > 1. If sum < 1, trade balance worsens.', NULL, 5),
  ('econ-u3-exchange', 'J-curve effect (HL)', 'After depreciation, the trade balance initially worsens (existing contracts, inelastic SR demand) before improving as volumes adjust.', NULL, 6),
  ('econ-u3-exchange', 'Current account', 'Records trade in goods/services, primary income (investment income), and secondary income (transfers/aid).', NULL, 7),
  ('econ-u3-exchange', 'Financial account', 'Records FDI (buying factories abroad), portfolio investment (shares/bonds), reserve assets, official borrowing.', NULL, 8),
  ('econ-u3-exchange', 'Balance of payments identity', 'Current account + Capital account + Financial account = 0. A deficit in one must be offset by surpluses in others.', NULL, 9),
  ('econ-u3-exchange', 'Terms of trade', '(Index of export prices / Index of import prices) x 100. Rising ToT = can buy more imports per unit of exports.', '(Px/Pm) x 100', 10);

-- Development (13 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u3-development', 'Sustainable development', 'Meeting present needs without compromising future generations'' ability to meet theirs (Brundtland, 1987).', NULL, 1),
  ('econ-u3-development', 'HDI', 'Human Development Index: composite of life expectancy, education (mean + expected years), and GNI per capita (PPP). Range 0–1.', NULL, 2),
  ('econ-u3-development', 'MPI', 'Multidimensional Poverty Index: measures overlapping deprivations in health, education, and living standards at household level.', NULL, 3),
  ('econ-u3-development', 'Poverty cycle/trap', 'Low income → low savings → low investment → low productivity → low income. Self-reinforcing cycle.', NULL, 4),
  ('econ-u3-development', 'ISI', 'Import Substitution Industrialisation: protecting domestic industries to replace imports. Often leads to inefficiency long-term.', NULL, 5),
  ('econ-u3-development', 'Export promotion', 'Strategy encouraging domestic firms to compete internationally through subsidies, FTZs, devaluation, and trade agreements.', NULL, 6),
  ('econ-u3-development', 'FDI', 'Foreign Direct Investment: investment by a foreign firm in productive capacity (factories, offices) in another country.', NULL, 7),
  ('econ-u3-development', 'Foreign aid', 'Transfer of resources from developed to developing countries. Can be bilateral, multilateral, tied, or untied.', NULL, 8),
  ('econ-u3-development', 'Structural adjustment (SAPs)', 'IMF/World Bank conditions for loans: austerity, privatisation, trade liberalisation. Criticised for social costs.', NULL, 9),
  ('econ-u3-development', 'Microfinance', 'Small loans and financial services to low-income individuals. E.g. Grameen Bank. Enables entrepreneurship.', NULL, 10),
  ('econ-u3-development', 'Fair trade', 'Guarantees minimum price to producers in developing countries + social premium for community development.', NULL, 11),
  ('econ-u3-development', 'Brain drain', 'Emigration of educated/skilled workers from developing to developed countries. Reduces human capital.', NULL, 12),
  ('econ-u3-development', 'Commodity dependence', 'Over-reliance on one or few primary commodities for export revenue. Vulnerable to price volatility and deteriorating ToT.', NULL, 13);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────

INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u3-mcq-01', '4.1 Trade', 'SL/HL', '3',
   'Country A can produce 10 units of cloth or 5 units of wine. Country B can produce 8 units of cloth or 8 units of wine. Which country has the comparative advantage in wine?',
   'Country A',
   'Country B',
   'Neither – they are equal',
   'Cannot be determined',
   1, 'Opportunity cost of 1 wine: A = 2 cloth, B = 1 cloth. B has lower opportunity cost for wine, so B has comparative advantage in wine.', 71),

  ('econ-u3-mcq-02', '4.1 Trade', 'SL/HL', '3',
   'The main argument for free trade based on comparative advantage is that:',
   'Every country should aim for self-sufficiency',
   'Countries should specialise in goods where they have the lowest opportunity cost',
   'Tariffs increase economic efficiency',
   'Trade only benefits developed countries',
   1, 'Comparative advantage shows mutual gains from trade when each country specialises in the good with the lowest opportunity cost.', 72),

  ('econ-u3-mcq-03', '4.2 Trade Protection', 'SL/HL', '3',
   'A tariff on imported steel will:',
   'Lower the domestic price of steel',
   'Increase the quantity of steel imported',
   'Raise the domestic price and reduce imports',
   'Eliminate all international trade in steel',
   2, 'A tariff raises the import price above the world price, increasing domestic production, reducing imports, and creating deadweight loss.', 73),

  ('econ-u3-mcq-04', '4.2 Trade Protection', 'SL/HL', '3',
   'The area on a tariff diagram representing government revenue is:',
   'The triangle between the domestic and world supply curves',
   'The rectangle between the world price and the tariff price, across the remaining import quantity',
   'The entire area below the demand curve',
   'The area above the domestic supply curve',
   1, 'Government revenue = tariff per unit x quantity of imports after tariff. It''s the rectangle between Pw and Pw+t, across import quantity.', 74),

  ('econ-u3-mcq-05', '4.2 Trade Protection', 'SL/HL', '3',
   'A quota differs from a tariff in that a quota:',
   'Always raises the price more than a tariff',
   'Does not generate government revenue (revenue goes to quota holders as quota rent)',
   'Is more transparent',
   'Is easier to administer',
   1, 'With a quota, the price rises but revenue accrues to whoever holds the import licenses (quota rent), not the government.', 75),

  ('econ-u3-mcq-06', '4.3 Trade Arguments', 'SL/HL', '3',
   'The infant industry argument for protection states that:',
   'All industries should be permanently protected',
   'New industries need temporary protection until they achieve economies of scale',
   'Only agricultural industries should be protected',
   'Free trade always harms developing countries',
   1, 'Infant industries may need temporary protection to grow and achieve competitive scale before competing internationally.', 76),

  ('econ-u3-mcq-07', '4.2 Trade Protection', 'SL/HL', '3',
   'Dumping occurs when:',
   'A country exports more than it imports',
   'A firm exports a product at a price below its production cost or domestic market price',
   'A government subsidises all exports',
   'Tariffs are set too low',
   1, 'Dumping is predatory pricing in international trade; anti-dumping duties can be imposed as a countermeasure.', 77),

  ('econ-u3-mcq-08', '4.4 Economic Integration', 'SL/HL', '3',
   'A customs union differs from a free trade area because:',
   'It has no tariffs between members',
   'Members adopt a common external tariff against non-members',
   'It allows free movement of labour',
   'It uses a single currency',
   1, 'FTA = no internal tariffs but independent external tariffs. Customs union = no internal tariffs + common external tariff.', 78),

  ('econ-u3-mcq-09', '4.4 Economic Integration', 'SL/HL', '3',
   'Trade creation occurs when:',
   'A trading bloc causes trade to shift from a more efficient to a less efficient producer',
   'Joining a trading bloc leads to imports coming from a more efficient member country instead of domestic production',
   'All trade barriers are eliminated globally',
   'A country imposes new tariffs on non-members',
   1, 'Trade creation = switching from higher-cost domestic production to lower-cost member imports. Trade diversion = switching from efficient non-member to less efficient member.', 79),

  ('econ-u3-mcq-10', '4.4 Economic Integration', 'SL/HL', '3',
   'The WTO principle of Most Favoured Nation (MFN) means:',
   'Countries must give the best trade terms to their favourite partners',
   'Any trade concession given to one WTO member must be extended to all WTO members',
   'Developing countries receive preferential treatment',
   'Tariffs must be eliminated immediately',
   1, 'MFN = non-discrimination. If you lower tariffs for one member, you must do the same for all (with exceptions for FTAs/customs unions).', 80);

INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u3-mcq-11', '4.5 Exchange Rates', 'SL/HL', '3',
   'If the demand for US dollars increases relative to the euro, the US dollar will:',
   'Depreciate against the euro',
   'Appreciate against the euro',
   'Remain unchanged',
   'Only change if the Fed intervenes',
   1, 'Higher demand for USD → USD appreciates (becomes more expensive in terms of euros).', 81),

  ('econ-u3-mcq-12', '4.5 Exchange Rates', 'SL/HL', '3',
   'A depreciation of a country''s currency is likely to:',
   'Make its exports more expensive abroad',
   'Make its imports cheaper',
   'Improve its trade balance (if Marshall-Lerner condition is met)',
   'Reduce domestic inflation',
   2, 'Depreciation makes exports cheaper and imports more expensive. If PEDx + PEDm > 1 (Marshall-Lerner), the trade balance improves.', 82),

  ('econ-u3-mcq-13', '4.5 Exchange Rates', 'SL/HL', '3',
   'Under a fixed exchange rate system, if the currency faces downward pressure, the central bank must:',
   'Print more money',
   'Buy its own currency using foreign reserves',
   'Raise tariffs on imports',
   'Devalue immediately',
   1, 'To maintain the fixed rate, the CB buys its own currency (selling foreign reserves) to increase demand and support the exchange rate.', 83),

  ('econ-u3-mcq-14', '4.5 Exchange Rates', 'HL', '3',
   '(HL) The J-curve effect shows that after a depreciation:',
   'The trade balance improves immediately',
   'The trade balance initially worsens before improving',
   'Exports always decrease',
   'The exchange rate returns to its original level',
   1, 'Short-run: existing contracts mean import spending rises before export volumes adjust. Over time, volumes adjust and the trade balance improves.', 84),

  ('econ-u3-mcq-15', '4.6 Balance of Payments', 'SL/HL', '3',
   'The current account of the balance of payments includes:',
   'Foreign direct investment',
   'Portfolio investment',
   'Trade in goods and services, primary income, and secondary income',
   'Government borrowing',
   2, 'Current account = trade balance (goods + services) + primary income (investment income, wages) + secondary income (transfers, aid).', 85),

  ('econ-u3-mcq-16', '4.6 Balance of Payments', 'SL/HL', '3',
   'A persistent current account deficit is most likely caused by:',
   'High export competitiveness',
   'A weak currency',
   'High domestic spending relative to output, overvalued currency, or low competitiveness',
   'A budget surplus',
   2, 'Current account deficits result from imports > exports, often due to high consumption, overvalued exchange rate, or lack of export competitiveness.', 86),

  ('econ-u3-mcq-17', '4.7 Sustainable Development', 'SL/HL', '3',
   'Sustainable development is best defined as:',
   'Maximising economic growth at all costs',
   'Development that meets the needs of the present without compromising the ability of future generations to meet their own needs',
   'Reducing GDP to protect the environment',
   'Eliminating all international trade',
   1, 'The Brundtland definition (1987). Balances economic, social, and environmental objectives.', 87),

  ('econ-u3-mcq-18', '4.8 Measuring Development', 'SL/HL', '3',
   'The Human Development Index (HDI) measures:',
   'Only GDP per capita',
   'Life expectancy, education (expected and mean years of schooling), and GNI per capita (PPP)',
   'Environmental sustainability',
   'Happiness and well-being',
   1, 'HDI is a composite index combining health (life expectancy), education (schooling), and standard of living (GNI per capita PPP).', 88),

  ('econ-u3-mcq-19', '4.9 Barriers to Development', 'SL/HL', '3',
   'A poverty cycle/trap occurs when:',
   'A country has too much foreign aid',
   'Low income leads to low savings, low investment, and low growth, perpetuating poverty',
   'GDP per capita is rising',
   'A country has a trade surplus',
   1, 'The vicious cycle: poverty → low savings → low investment → low productivity → low income → poverty continues.', 89),

  ('econ-u3-mcq-20', '4.10 Strategies for Development', 'SL/HL', '3',
   'Import substitution industrialisation (ISI) involves:',
   'Removing all trade barriers',
   'Protecting domestic industries to replace imported goods with domestically produced ones',
   'Encouraging exports through subsidies',
   'Joining a free trade area',
   1, 'ISI uses tariffs and quotas to protect fledgling domestic industries. Criticised for creating inefficiency and reducing competitiveness long-term.', 90);

INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u3-mcq-21', '4.10 Strategies for Development', 'SL/HL', '3',
   'Foreign Direct Investment (FDI) can benefit developing countries by:',
   'Always reducing inequality',
   'Bringing capital, technology transfer, and job creation',
   'Eliminating all poverty',
   'Replacing the need for government policy',
   1, 'FDI brings capital and technology, creates jobs, and can boost exports. However, profits may be repatriated and environmental/labour standards may suffer.', 91),

  ('econ-u3-mcq-22', '4.10 Strategies for Development', 'SL/HL', '3',
   'Structural adjustment programmes (SAPs) imposed by the IMF typically require:',
   'Increased government spending',
   'Trade liberalisation, privatisation, and reduced government intervention',
   'Higher tariffs on imports',
   'Nationalisation of industries',
   1, 'SAPs are conditions attached to IMF loans: austerity, privatisation, deregulation, trade liberalisation. Criticised for social costs and sovereignty loss.', 92),

  ('econ-u3-mcq-23', '4.10 Strategies for Development', 'SL/HL', '3',
   'Fair trade aims to:',
   'Eliminate all tariffs globally',
   'Ensure producers in developing countries receive a fair minimum price and improved working conditions',
   'Maximise profit for multinational corporations',
   'Replace international trade with domestic production',
   1, 'Fair trade guarantees a floor price to producers, funds community development, and promotes sustainable farming practices.', 93),

  ('econ-u3-mcq-24', '4.1 Trade', 'SL/HL', '3',
   'The terms of trade is calculated as:',
   '(Export volume / Import volume) x 100',
   '(Index of export prices / Index of import prices) x 100',
   'Exports minus imports',
   'GDP per capita / population',
   1, 'Terms of trade = (Px/Pm) x 100. An improvement (rise) means a country can buy more imports per unit of exports.', 94),

  ('econ-u3-mcq-25', '4.10 Strategies for Development', 'SL/HL', '3',
   'Microfinance helps development by:',
   'Providing large loans to governments',
   'Giving small loans to low-income individuals who lack access to traditional banking',
   'Replacing foreign aid entirely',
   'Encouraging capital flight',
   1, 'Microfinance (e.g. Grameen Bank) provides small loans, savings, and insurance to the poor, enabling entrepreneurship and income generation.', 95),

  ('econ-u3-mcq-26', '4.1 Trade', 'SL/HL', '3',
   'A deterioration in a country''s terms of trade means:',
   'Its export prices have risen relative to import prices',
   'Its export prices have fallen relative to import prices, so it must export more to buy the same imports',
   'Its trade balance has improved',
   'Its currency has appreciated',
   1, 'Falling ToT means each unit of exports buys fewer imports. Common for commodity-dependent developing countries when commodity prices fall.', 96),

  ('econ-u3-mcq-27', '4.9 Barriers to Development', 'SL/HL', '3',
   'Brain drain is a barrier to development because:',
   'It brings too many skilled workers into the country',
   'Educated and skilled workers emigrate, reducing human capital in the home country',
   'It increases government revenue',
   'It reduces population growth',
   1, 'Brain drain = loss of human capital. Skilled workers leave for better opportunities abroad, reducing productive capacity in developing countries.', 97),

  ('econ-u3-mcq-28', '4.5 Exchange Rates', 'SL/HL', '3',
   'Which is NOT an advantage of a floating exchange rate system?',
   'Automatic adjustment of trade imbalances',
   'Freedom for independent monetary policy',
   'Stability and predictability for international trade',
   'No need to hold large foreign currency reserves',
   2, 'Floating rates can be volatile and unpredictable, which is a disadvantage. Fixed rates provide more stability for trade.', 98),

  ('econ-u3-mcq-29', '4.10 Strategies for Development', 'SL/HL', '3',
   'Export promotion as a development strategy involves:',
   'Raising tariffs to protect domestic markets',
   'Encouraging domestic industries to compete in international markets through subsidies, devaluation, or FTZs',
   'Banning all imports',
   'Relying solely on foreign aid',
   1, 'Export promotion focuses outward: creating free trade zones, subsidising exports, devaluing currency, and investing in export industries.', 99),

  ('econ-u3-mcq-30', '4.8 Measuring Development', 'SL/HL', '3',
   'The Multidimensional Poverty Index (MPI) measures:',
   'Only income poverty',
   'Multiple deprivations across health, education, and living standards at the household level',
   'GDP growth rate',
   'Environmental sustainability',
   1, 'MPI captures overlapping deprivations: nutrition, child mortality, schooling, attendance, cooking fuel, sanitation, water, electricity, housing, assets.', 100);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

-- Q1: Trade Protection
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u3-wr-01a', '4.2 Trade Protection', 'SL/HL', 'short_answer', '3', 10,
   'Using a tariff diagram, explain the effects of a tariff on an imported good.',
   'Definition of tariff [1]
Correctly drawn tariff diagram: domestic S, domestic D, world supply (Pw), tariff-inclusive supply (Pw+t) [2–3]
Identification of effects: domestic price rises, domestic production increases, imports fall, consumer surplus decreases [2–3]
Identification of government revenue (rectangle) and deadweight loss (two triangles) [2–3]
Clear use of economic terminology throughout [1]',
   'Q1(a)', 17),

  ('econ-u3-wr-01b', '4.2 Trade Protection', 'SL/HL', 'short_answer', '3', 15,
   'Evaluate the infant industry argument as a justification for trade protection.',
   'Definition of infant industry argument [1]
Explanation: new industries lack economies of scale; temporary protection allows growth to competitive size [2–3]
Strengths: diversification, long-term comparative advantage development, employment creation [2–3]
Weaknesses: difficulty identifying genuine infant industries, protection may become permanent, retaliation risk, political capture [2–3]
Alternative: government subsidies rather than tariffs (avoid consumer price increases) [1–2]
RWEs: South Korea''s successful protection of auto/electronics industries vs failed ISI in Latin America [2]
Evaluation: success depends on government competence, sunset clauses, industry potential [2–3]',
   'Q1(b)', 18);

-- Q2: Exchange Rates
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u3-wr-02a', '4.5 Exchange Rates', 'SL/HL', 'short_answer', '3', 10,
   'Using a supply and demand diagram for a currency, explain how a floating exchange rate is determined and what might cause a depreciation.',
   'Definition of exchange rate and floating system [1–2]
Diagram: supply of currency and demand for currency; equilibrium exchange rate [2–3]
Explanation of demand (foreigners need currency to buy exports, invest) and supply (domestic residents sell currency to buy imports, invest abroad) [2–3]
Depreciation: increase in supply or decrease in demand (e.g. higher imports, capital outflows, lower interest rates) → shifts shown on diagram [2–3]',
   'Q2(a)', 19),

  ('econ-u3-wr-02b', '4.5 Exchange Rates', 'SL/HL', 'short_answer', '3', 15,
   'Evaluate the impact of a significant depreciation of a country''s currency on its economy.',
   'Positive effects on exports (cheaper abroad → more competitive → AD increases) [2–3]
Positive effects on domestic industries (imports become more expensive → import substitution) [1–2]
Negative effects: imported inflation (higher cost of imported raw materials and consumer goods) [2–3]
(HL) Marshall-Lerner condition: improvement only if PEDx + PEDm > 1 [1–2]
(HL) J-curve: short-run worsening before improvement [1–2]
Effects on FDI (country becomes cheaper for foreign investors), debt servicing (foreign debt becomes more expensive) [1–2]
RWEs: UK post-Brexit depreciation, Turkish lira crisis 2018, Japanese yen weakness 2022–23 [1–2]
Evaluation: depends on cause of depreciation, economy''s trade structure, and whether SR or LR [2–3]',
   'Q2(b)', 20);

-- Q3: Economic Development
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u3-wr-03a', '4.8 Measuring Development', 'SL/HL', 'short_answer', '3', 10,
   'Explain the difference between economic growth and economic development, and outline how development can be measured.',
   'Definition of economic growth (increase in real GDP) vs economic development (improvement in living standards, freedoms, capabilities) [2–3]
Growth is necessary but not sufficient for development [1]
Single indicators: GDP per capita (PPP), literacy rate, life expectancy, infant mortality [1–2]
Composite indicators: HDI, MPI, GII – explain at least two [2–3]
Limitations of measures: cultural bias, data reliability, what is included/excluded [1–2]',
   'Q3(a)', 21),

  ('econ-u3-wr-03b', '4.8 Measuring Development', 'SL/HL', 'short_answer', '3', 15,
   'Evaluate the role of foreign direct investment (FDI) in promoting economic development in developing countries.',
   'Benefits: capital inflow, technology transfer, job creation, export capacity, tax revenue [3–4]
Costs: profit repatriation, environmental damage, exploitation of labour, dependency, crowding out domestic firms [3–4]
Conditions for success: stable institutions, education, infrastructure, regulation [1–2]
RWEs: FDI in China''s manufacturing sector, FDI in Sub-Saharan Africa mining, Singapore as FDI success story [2]
Evaluation: FDI is neither inherently good nor bad; outcomes depend on government policy, regulation, and the type of FDI [2–3]',
   'Q3(b)', 22);

-- Q4: Balance of Payments & Current Account
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u3-wr-04a', '4.6 Balance of Payments', 'SL/HL', 'short_answer', '3', 10,
   'Explain the structure of the balance of payments and the relationship between the current account and the financial account.',
   'Definition of BoP [1]
Current account components: trade in goods, trade in services, primary income, secondary income [2–3]
Financial account components: FDI, portfolio investment, reserve assets [1–2]
BoP identity: current + capital + financial = 0 [1–2]
Explanation: a current account deficit must be financed by a financial account surplus (net inflows of capital) [2–3]',
   'Q4(a)', 23),

  ('econ-u3-wr-04b', '4.6 Balance of Payments', 'SL/HL', 'short_answer', '3', 15,
   'Evaluate the policies a government could use to correct a persistent current account deficit.',
   'Expenditure-reducing policies: contractionary fiscal/monetary policy to reduce imports (but reduces growth, increases unemployment) [2–3]
Expenditure-switching policies: depreciation/devaluation, tariffs (but may cause inflation, retaliation, J-curve) [2–3]
Supply-side policies: improve competitiveness through education, infrastructure, R&D (but long time lag) [2–3]
(HL) Marshall-Lerner and J-curve implications for depreciation [1–2]
RWEs: US persistent deficit financed by capital inflows, UK post-2016 depreciation, Australia''s mining boom deficit [1–2]
Evaluation: best approach depends on cause of deficit; may require combination of policies; some deficits are sustainable if financed by strong FDI [2–3]',
   'Q4(b)', 24);
