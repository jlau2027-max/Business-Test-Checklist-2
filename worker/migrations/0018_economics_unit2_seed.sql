-- ============================================================
-- Economics Content Seed Data — Unit 2: Macroeconomics
-- Syllabus: 3.1–3.7 (First Assessment 2024)
-- ============================================================

-- ─── CATEGORY COLORS ─────────────────────────────────────────
INSERT OR REPLACE INTO economics_category_colors (category, color) VALUES
  ('3.1 Measuring Economic Activity', '#2563EB'),
  ('3.2 AD/AS', '#059669'),
  ('3.3 Macroeconomic Objectives', '#7C3AED'),
  ('3.4 Inequality', '#D97706'),
  ('3.5 Monetary Policy', '#DC2626'),
  ('3.6 Fiscal Policy', '#0891B2'),
  ('3.7 Supply-Side Policies', '#F97316');

-- ─── CHECKLIST SECTIONS ──────────────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-3-1-measuring', '3.1 — Measuring Economic Activity', '#2563EB', '2', 18),
  ('econ-3-2-adas', '3.2 — Aggregate Demand & Aggregate Supply', '#059669', '2', 19),
  ('econ-3-3-objectives', '3.3 — Macroeconomic Objectives', '#7C3AED', '2', 20),
  ('econ-3-4-inequality', '3.4 — Inequality and Poverty', '#D97706', '2', 21),
  ('econ-3-5-monetary', '3.5 — Monetary Policy', '#DC2626', '2', 22),
  ('econ-3-6-fiscal', '3.6 — Fiscal Policy', '#0891B2', '2', 23),
  ('econ-3-7-ssp', '3.7 — Supply-Side Policies', '#F97316', '2', 24);

-- ─── CHECKLIST ITEMS ─────────────────────────────────────────

-- 3.1 Measuring Economic Activity
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-1-measuring', 'Explain the circular flow of income model (households, firms, government, financial sector, foreign sector)', 1),
  ('econ-3-1-measuring', 'Define injections (I, G, X) and leakages/withdrawals (S, T, M)', 2),
  ('econ-3-1-measuring', 'Explain the three methods of measuring national income: output, income, expenditure', 3),
  ('econ-3-1-measuring', 'Define nominal GDP, real GDP, GDP per capita', 4),
  ('econ-3-1-measuring', 'Define GNI (Gross National Income) and explain GNI = GDP + net income from abroad', 5),
  ('econ-3-1-measuring', 'Calculate real GDP using a GDP deflator or base year prices', 6),
  ('econ-3-1-measuring', 'Explain limitations of GDP/GNI as measures of well-being (informal economy, externalities, inequality, non-market activity)', 7),
  ('econ-3-1-measuring', 'Outline alternative measures: OECD Better Life Index, Happy Planet Index, HDI', 8),
  ('econ-3-1-measuring', 'Describe and draw the business cycle (boom, recession, trough, recovery/expansion)', 9),
  ('econ-3-1-measuring', 'Distinguish between actual growth (increase in real GDP) and potential growth (increase in productive capacity)', 10);

-- 3.2 Aggregate Demand & Aggregate Supply
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-2-adas', 'Define AD and state the formula: AD = C + I + G + (X – M)', 1),
  ('econ-3-2-adas', 'Draw and explain the downward-sloping AD curve (wealth effect, interest rate effect, international trade effect)', 2),
  ('econ-3-2-adas', 'List and explain determinants/shifters of each component: C, I, G, X, M', 3),
  ('econ-3-2-adas', 'Define SRAS and explain its upward slope', 4),
  ('econ-3-2-adas', 'List determinants of SRAS (input costs, wages, commodity prices, exchange rates)', 5),
  ('econ-3-2-adas', 'Explain the neoclassical LRAS: vertical at potential output (Yf)', 6),
  ('econ-3-2-adas', 'Explain shifts of LRAS (technology, education, institutional change, resource discovery)', 7),
  ('econ-3-2-adas', 'Draw and explain the Keynesian AS curve (three sections: horizontal, upward-sloping, vertical)', 8),
  ('econ-3-2-adas', 'Draw and explain macroeconomic equilibrium using AD/AS', 9),
  ('econ-3-2-adas', 'Show inflationary gap and deflationary/recessionary gap on a diagram', 10),
  ('econ-3-2-adas', '(HL) Explain the Keynesian multiplier: k = 1/(1–MPC) = 1/MPS+MPT+MPM', 11),
  ('econ-3-2-adas', '(HL) Calculate the multiplier effect of a change in injections on national income', 12);

-- 3.3 Macroeconomic Objectives
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-3-objectives', 'List the four main macroeconomic objectives (growth, low unemployment, low inflation, sustainable government debt)', 1),
  ('econ-3-3-objectives', 'Define economic growth and distinguish SR growth (AD shift) from LR growth (LRAS shift)', 2),
  ('econ-3-3-objectives', 'Explain consequences of economic growth (rising living standards, but also inequality, environmental damage)', 3),
  ('econ-3-3-objectives', 'Define unemployment rate and calculate it', 4),
  ('econ-3-3-objectives', 'Distinguish types: structural, cyclical/demand-deficient, frictional, seasonal', 5),
  ('econ-3-3-objectives', 'Explain the natural rate of unemployment (NRU) = frictional + structural + seasonal', 6),
  ('econ-3-3-objectives', 'Draw the labour market diagram showing equilibrium wage and quantity of labour', 7),
  ('econ-3-3-objectives', 'Explain costs of unemployment (individual, social, economic, government)', 8),
  ('econ-3-3-objectives', 'Define inflation, deflation, disinflation', 9),
  ('econ-3-3-objectives', 'Explain demand-pull inflation (AD shifts right) with a diagram', 10),
  ('econ-3-3-objectives', 'Explain cost-push inflation (SRAS shifts left) with a diagram', 11),
  ('econ-3-3-objectives', 'Explain how CPI is calculated (weighted basket of goods)', 12),
  ('econ-3-3-objectives', 'Discuss costs of inflation (menu costs, shoe-leather costs, uncertainty, redistribution effects)', 13),
  ('econ-3-3-objectives', 'Discuss costs of deflation (debt burden, delayed spending, reduced investment)', 14),
  ('econ-3-3-objectives', '(HL) Define government/national debt vs budget deficit', 15),
  ('econ-3-3-objectives', '(HL) Explain debt-to-GDP ratio and credit ratings', 16),
  ('econ-3-3-objectives', 'Explain potential conflicts between macroeconomic objectives (e.g. growth vs inflation, low unemployment vs inflation – Phillips curve)', 17);

-- 3.4 Inequality and Poverty
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-4-inequality', 'Distinguish between income inequality and wealth inequality', 1),
  ('econ-3-4-inequality', 'Draw and interpret a Lorenz curve', 2),
  ('econ-3-4-inequality', 'Define and calculate the Gini coefficient (0 = perfect equality, 1 = perfect inequality)', 3),
  ('econ-3-4-inequality', 'Distinguish between absolute poverty and relative poverty', 4),
  ('econ-3-4-inequality', 'Explain causes of inequality (education, discrimination, market power, globalisation, tax systems)', 5),
  ('econ-3-4-inequality', 'Explain effects of inequality (social unrest, health outcomes, reduced growth vs incentive to work)', 6),
  ('econ-3-4-inequality', 'Explain policies to reduce inequality: progressive taxation, transfer payments, minimum wages, investment in education/healthcare', 7),
  ('econ-3-4-inequality', '(HL) Calculate proportional, progressive, and regressive tax rates from data', 8);

-- 3.5 Monetary Policy
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-5-monetary', 'Define monetary policy and state its goals', 1),
  ('econ-3-5-monetary', 'Explain the role of the central bank', 2),
  ('econ-3-5-monetary', 'Explain how interest rates affect C, I, and therefore AD', 3),
  ('econ-3-5-monetary', 'Draw the money market diagram (MS/MD, interest rate on y-axis)', 4),
  ('econ-3-5-monetary', 'Explain expansionary monetary policy (lower interest rates → increase AD) with diagram', 5),
  ('econ-3-5-monetary', 'Explain contractionary monetary policy (raise interest rates → decrease AD) with diagram', 6),
  ('econ-3-5-monetary', '(HL) Explain open market operations (buying/selling government bonds)', 7),
  ('econ-3-5-monetary', '(HL) Explain minimum reserve requirements and their effect on money supply', 8),
  ('econ-3-5-monetary', '(HL) Explain quantitative easing (QE) and when it is used', 9),
  ('econ-3-5-monetary', '(HL) Explain the money multiplier: 1/reserve ratio', 10),
  ('econ-3-5-monetary', 'Evaluate strengths and weaknesses of monetary policy (time lags, liquidity trap, blunt instrument)', 11);

-- 3.6 Fiscal Policy
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-6-fiscal', 'Define fiscal policy: use of government spending (G) and taxation (T)', 1),
  ('econ-3-6-fiscal', 'Distinguish between current expenditure and capital expenditure', 2),
  ('econ-3-6-fiscal', 'Define transfer payments', 3),
  ('econ-3-6-fiscal', 'Explain expansionary fiscal policy (increase G and/or cut T → increase AD) with diagram', 4),
  ('econ-3-6-fiscal', 'Explain contractionary fiscal policy (cut G and/or raise T → decrease AD) with diagram', 5),
  ('econ-3-6-fiscal', 'Explain automatic stabilisers (progressive tax, unemployment benefits)', 6),
  ('econ-3-6-fiscal', '(HL) Calculate the Keynesian multiplier and the effect of a fiscal injection', 7),
  ('econ-3-6-fiscal', 'Explain crowding out (increased government borrowing raises interest rates, reducing private I and C)', 8),
  ('econ-3-6-fiscal', 'Evaluate strengths and weaknesses of fiscal policy (time lags, political constraints, budget deficit)', 9);

-- 3.7 Supply-Side Policies
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-3-7-ssp', 'Define supply-side policies and their goal (shift LRAS right)', 1),
  ('econ-3-7-ssp', 'Distinguish market-based SSPs from interventionist SSPs', 2),
  ('econ-3-7-ssp', 'Market-based: deregulation, privatisation, trade liberalisation, labour market reforms, tax cuts', 3),
  ('econ-3-7-ssp', 'Interventionist: investment in education/training, healthcare, infrastructure, industrial policy, R&D subsidies', 4),
  ('econ-3-7-ssp', 'Draw the effect of SSPs on the neoclassical model (LRAS shifts right)', 5),
  ('econ-3-7-ssp', 'Draw the effect of SSPs on the Keynesian model (AS curve extends rightward)', 6),
  ('econ-3-7-ssp', 'Explain that SSPs may also affect AD (tax cuts increase C; government spending increases G)', 7),
  ('econ-3-7-ssp', 'Evaluate SSPs: long time lags, uncertain outcomes, inequality effects, market-based vs interventionist trade-offs', 8);

-- ─── DIAGRAM CHECKLIST SECTIONS ──────────────────────────────
INSERT INTO economics_checklist_sections (id, title, color, unit, sort_order) VALUES
  ('econ-u2-diag-natinc', 'Diagrams: National Income & Business Cycle (3.1)', '#0284C7', '2', 25),
  ('econ-u2-diag-adas', 'Diagrams: AD/AS Models (3.2)', '#059669', '2', 26),
  ('econ-u2-diag-labour', 'Diagrams: Labour Market & Unemployment (3.3)', '#7C3AED', '2', 27),
  ('econ-u2-diag-ineq', 'Diagrams: Inequality (3.4)', '#D97706', '2', 28),
  ('econ-u2-diag-policy', 'Diagrams: Policy (3.5–3.7)', '#DC2626', '2', 29),
  ('econ-u2-diag-phillips', 'Diagrams: Phillips Curve (3.3)', '#E11D48', '2', 30);

-- ─── DIAGRAM CHECKLIST ITEMS ─────────────────────────────────

-- Diagrams: National Income & Business Cycle
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-natinc', 'Circular flow model', 1),
  ('econ-u2-diag-natinc', 'Business cycle diagram', 2);

-- Diagrams: AD/AS Models
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-adas', 'Downward-sloping AD', 1),
  ('econ-u2-diag-adas', 'Shifts of AD', 2),
  ('econ-u2-diag-adas', 'Upward-sloping SRAS + shifts', 3),
  ('econ-u2-diag-adas', 'Neoclassical LRAS vertical at Yf + shift right', 4),
  ('econ-u2-diag-adas', 'Keynesian AS (3 sections)', 5),
  ('econ-u2-diag-adas', 'Macro equilibrium', 6),
  ('econ-u2-diag-adas', 'Inflationary gap', 7),
  ('econ-u2-diag-adas', 'Recessionary gap', 8),
  ('econ-u2-diag-adas', 'Demand-pull inflation (AD shifts right past Yf)', 9),
  ('econ-u2-diag-adas', 'Cost-push inflation (SRAS shifts left)', 10);

-- Diagrams: Labour Market & Unemployment
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-labour', 'Labour market equilibrium', 1),
  ('econ-u2-diag-labour', 'Structural unemployment', 2),
  ('econ-u2-diag-labour', 'Cyclical unemployment', 3),
  ('econ-u2-diag-labour', 'Minimum wage diagram', 4);

-- Diagrams: Inequality
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-ineq', 'Lorenz curve with 45° line', 1),
  ('econ-u2-diag-ineq', 'Two Lorenz curves showing different Gini coefficients', 2);

-- Diagrams: Policy
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-policy', 'Expansionary monetary policy (money market + AD/AS)', 1),
  ('econ-u2-diag-policy', 'Contractionary monetary policy', 2),
  ('econ-u2-diag-policy', 'Expansionary fiscal policy (AD shifts right)', 3),
  ('econ-u2-diag-policy', 'Contractionary fiscal policy', 4),
  ('econ-u2-diag-policy', 'Supply-side policies (LRAS shifts right neoclassical / AS extends Keynesian)', 5),
  ('econ-u2-diag-policy', 'Crowding out', 6);

-- Diagrams: Phillips Curve
INSERT INTO economics_checklist_items (section_id, text, sort_order) VALUES
  ('econ-u2-diag-phillips', 'Short-run Phillips curve', 1),
  ('econ-u2-diag-phillips', 'Long-run Phillips curve vertical at NRU', 2),
  ('econ-u2-diag-phillips', 'Shift of SRPC due to supply shock', 3);

-- ─── FLASHCARD TOPICS ────────────────────────────────────────
INSERT INTO economics_flashcard_topics (id, label, color, unit, sort_order) VALUES
  ('econ-u2-gdp-adas', 'GDP & AD/AS Framework', '#2563EB', '2', 8),
  ('econ-u2-unemp-infl', 'Unemployment & Inflation', '#7C3AED', '2', 9),
  ('econ-u2-policy', 'Macro Policy', '#DC2626', '2', 10),
  ('econ-u2-inequality', 'Inequality & Growth', '#D97706', '2', 11);

-- ─── FLASHCARDS ──────────────────────────────────────────────

-- GDP & AD/AS Framework (14 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u2-gdp-adas', 'GDP', 'Total monetary value of all final goods and services produced within a country''s borders in a given time period.', NULL, 1),
  ('econ-u2-gdp-adas', 'GNI', 'GDP + net factor income from abroad. Measures total income earned by a country''s citizens regardless of where they produce.', NULL, 2),
  ('econ-u2-gdp-adas', 'Real vs Nominal GDP', 'Nominal = current prices. Real = adjusted for inflation using a base year or GDP deflator. Real GDP shows true output changes.', NULL, 3),
  ('econ-u2-gdp-adas', 'GDP deflator', 'A price index used to convert nominal GDP to real GDP. Real GDP = (Nominal GDP / GDP deflator) x 100.', NULL, 4),
  ('econ-u2-gdp-adas', 'Business cycle', 'Fluctuations in real GDP over time: boom (peak), recession (contraction), trough, recovery (expansion).', NULL, 5),
  ('econ-u2-gdp-adas', 'AD formula', 'AD = C + I + G + (X – M). Consumption + Investment + Government spending + Net exports.', 'AD = C + I + G + (X – M)', 6),
  ('econ-u2-gdp-adas', 'Wealth effect', 'As price level rises, real value of wealth falls, so consumers spend less. Explains downward-sloping AD.', NULL, 7),
  ('econ-u2-gdp-adas', 'SRAS', 'Short-run aggregate supply. Upward sloping: as price level rises, firms produce more (higher profits). Shifts with input cost changes.', NULL, 8),
  ('econ-u2-gdp-adas', 'LRAS (neoclassical)', 'Vertical line at full employment output (Yf). Determined by quantity and quality of factors of production, not price level.', NULL, 9),
  ('econ-u2-gdp-adas', 'Keynesian AS', 'Three sections: horizontal (spare capacity), upward-sloping (approaching full employment), vertical (at Yf). Shows inflation only near/at capacity.', NULL, 10),
  ('econ-u2-gdp-adas', 'Inflationary gap', 'When equilibrium output exceeds potential output (Yf). AD is too high, pulling up prices.', NULL, 11),
  ('econ-u2-gdp-adas', 'Recessionary gap', 'When equilibrium output is below Yf. There is spare capacity and cyclical unemployment.', NULL, 12),
  ('econ-u2-gdp-adas', 'Keynesian multiplier (HL)', 'k = 1/(1–MPC) or 1/(MPS+MPT+MPM). Shows how an initial injection creates a larger final change in national income.', 'k = 1/(1–MPC)', 13),
  ('econ-u2-gdp-adas', 'MPC / MPS', 'MPC = marginal propensity to consume. MPS = marginal propensity to save. MPC + MPS = 1 (in simple model).', NULL, 14);

-- Unemployment & Inflation (12 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u2-unemp-infl', 'Structural unemployment', 'Caused by changes in the structure of the economy (technology, declining industries). Skills mismatch.', NULL, 1),
  ('econ-u2-unemp-infl', 'Cyclical unemployment', 'Caused by a fall in AD during a recession. Also called demand-deficient unemployment.', NULL, 2),
  ('econ-u2-unemp-infl', 'Natural rate of unemployment', 'The unemployment rate when the economy is at full employment. NRU = frictional + structural + seasonal.', NULL, 3),
  ('econ-u2-unemp-infl', 'Demand-pull inflation', 'Inflation caused by excess AD beyond the economy''s capacity. AD shifts right past Yf.', NULL, 4),
  ('econ-u2-unemp-infl', 'Cost-push inflation', 'Inflation caused by rising costs of production (wages, oil, raw materials). SRAS shifts left.', NULL, 5),
  ('econ-u2-unemp-infl', 'CPI', 'Consumer Price Index: a weighted average of prices of a basket of typical household goods and services. Used to measure inflation.', NULL, 6),
  ('econ-u2-unemp-infl', 'Deflation', 'A sustained decrease in the general price level. Increases real debt burden, delays spending, reduces investment.', NULL, 7),
  ('econ-u2-unemp-infl', 'Disinflation', 'A fall in the rate of inflation (prices still rising, but more slowly). NOT the same as deflation.', NULL, 8),
  ('econ-u2-unemp-infl', 'Phillips curve', 'Shows inverse relationship between inflation and unemployment in the short run. In the long run, the curve may be vertical at NRU.', NULL, 9),
  ('econ-u2-unemp-infl', 'Stagflation', 'Simultaneous high inflation, high unemployment, and stagnant economic growth. Caused by supply shocks (e.g. 1970s oil crisis).', NULL, 10),
  ('econ-u2-unemp-infl', 'Budget deficit vs national debt', 'Deficit = G > T in one year. National debt = accumulated total of all past deficits. Debt-to-GDP ratio measures sustainability.', NULL, 11),
  ('econ-u2-unemp-infl', 'Lorenz curve', 'A graph showing cumulative % of income/wealth vs cumulative % of population. 45° line = perfect equality. The bow = inequality.', NULL, 12);

-- Macro Policy (10 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u2-policy', 'Monetary policy', 'Central bank use of interest rates and money supply to influence AD and achieve macroeconomic objectives.', NULL, 1),
  ('econ-u2-policy', 'Open market operations (HL)', 'Central bank buying/selling government bonds to increase/decrease money supply and influence interest rates.', NULL, 2),
  ('econ-u2-policy', 'Quantitative easing (HL)', 'Large-scale purchase of financial assets by the central bank when interest rates are at/near zero. Injects liquidity into the economy.', NULL, 3),
  ('econ-u2-policy', 'Money multiplier (HL)', '1 / reserve ratio. Shows how much the money supply can expand from an initial deposit through fractional reserve banking.', '1 / reserve ratio', 4),
  ('econ-u2-policy', 'Fiscal policy', 'Government use of spending (G) and taxation (T) to influence AD and achieve macroeconomic objectives.', NULL, 5),
  ('econ-u2-policy', 'Automatic stabilisers', 'Built-in fiscal mechanisms that cushion economic fluctuations without deliberate policy action (progressive taxes, welfare payments).', NULL, 6),
  ('econ-u2-policy', 'Crowding out', 'When government borrowing raises interest rates, reducing private sector investment and consumption. Limits effectiveness of fiscal policy.', NULL, 7),
  ('econ-u2-policy', 'Transfer payments', 'Government payments to individuals with no goods/services exchanged in return (e.g. pensions, unemployment benefits, welfare).', NULL, 8),
  ('econ-u2-policy', 'Supply-side policies', 'Policies aimed at increasing the productive capacity (LRAS) of the economy by improving quality/quantity of factors of production.', NULL, 9),
  ('econ-u2-policy', 'Market-based SSPs', 'Deregulation, privatisation, trade liberalisation, labour market flexibility, tax cuts. Reduce government intervention.', NULL, 10);

-- Inequality & Growth (4 cards)
INSERT INTO economics_flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('econ-u2-inequality', 'Gini coefficient', 'A number between 0 (perfect equality) and 1 (perfect inequality). Calculated from the Lorenz curve.', NULL, 1),
  ('econ-u2-inequality', 'Absolute poverty', 'Income below a defined threshold needed to meet basic needs (World Bank: $2.15/day PPP).', NULL, 2),
  ('econ-u2-inequality', 'Relative poverty', 'Income below a certain percentage of the median income in a specific country (e.g. below 60% of median).', NULL, 3),
  ('econ-u2-inequality', 'Interventionist SSPs', 'Government investment in education, healthcare, infrastructure, R&D subsidies, industrial policy. Active government role.', NULL, 4);

-- ─── MCQ QUESTIONS ───────────────────────────────────────────

-- 3.1 Measuring Economic Activity (Q1-5)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-01', '3.1 Measuring Economic Activity', 'SL/HL', '2',
   'GDP is best defined as:',
   'The total value of all transactions in an economy',
   'The total monetary value of all final goods and services produced within a country''s borders in a given time period',
   'The total income of all citizens of a country',
   'The total value of exports minus imports',
   1, 'GDP measures final output within borders. It excludes intermediate goods to avoid double counting.', 41),

  ('econ-u2-mcq-02', '3.1 Measuring Economic Activity', 'SL/HL', '2',
   'GNI differs from GDP because GNI:',
   'Excludes government spending',
   'Includes net income from abroad',
   'Is always higher than GDP',
   'Only counts manufacturing output',
   1, 'GNI = GDP + net factor income from abroad (income earned by citizens overseas minus income sent abroad by foreign workers).', 42),

  ('econ-u2-mcq-03', '3.1 Measuring Economic Activity', 'SL/HL', '2',
   'Real GDP is calculated by:',
   'Adding inflation to nominal GDP',
   'Adjusting nominal GDP for changes in the price level',
   'Subtracting exports from nominal GDP',
   'Dividing nominal GDP by population',
   1, 'Real GDP removes the effect of inflation using a base year or GDP deflator, showing true changes in output.', 43),

  ('econ-u2-mcq-04', '3.1 Measuring Economic Activity', 'SL/HL', '2',
   'Which of the following is a leakage from the circular flow of income?',
   'Investment',
   'Government spending',
   'Savings',
   'Exports',
   2, 'Leakages (withdrawals) are S, T, M. Injections are I, G, X. Savings leave the circular flow.', 44),

  ('econ-u2-mcq-05', '3.1 Measuring Economic Activity', 'SL/HL', '2',
   'During the recovery phase of the business cycle:',
   'Real GDP is falling',
   'Unemployment is rising',
   'Real GDP is increasing from the trough',
   'Inflation is at its highest',
   2, 'Recovery/expansion follows a trough; real GDP rises, unemployment begins to fall.', 45);

-- 3.2 AD/AS (Q6-11)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-06', '3.2 AD/AS', 'SL/HL', '2',
   'The AD curve slopes downward because of:',
   'The law of demand',
   'The wealth effect, interest rate effect, and international trade effect',
   'Diminishing marginal utility',
   'Increasing opportunity cost',
   1, 'As price level rises: (1) real wealth falls (wealth effect), (2) interest rates rise reducing I and C, (3) exports become less competitive.', 46),

  ('econ-u2-mcq-07', '3.2 AD/AS', 'SL/HL', '2',
   'An increase in consumer confidence would cause:',
   'AD to shift left',
   'SRAS to shift right',
   'AD to shift right',
   'LRAS to shift right',
   2, 'Higher confidence increases consumption (C), a component of AD, shifting the AD curve rightward.', 47),

  ('econ-u2-mcq-08', '3.2 AD/AS', 'SL/HL', '2',
   'In the neoclassical model, LRAS is vertical because:',
   'The economy is always in recession',
   'In the long run, output is determined by the quantity and quality of factors of production, not the price level',
   'Prices are fixed in the long run',
   'The government controls all output',
   1, 'At full employment (Yf), increasing the price level cannot increase output further; only improvements in productive capacity shift LRAS.', 48),

  ('econ-u2-mcq-09', '3.2 AD/AS', 'SL/HL', '2',
   'The Keynesian AS curve has a horizontal section because:',
   'All resources are fully employed',
   'When there is significant spare capacity, output can increase without causing inflation',
   'Supply is perfectly inelastic',
   'The government controls prices',
   1, 'In a recession, unemployed resources mean firms can increase output without raising prices (perfectly elastic section).', 49),

  ('econ-u2-mcq-10', '3.2 AD/AS', 'SL/HL', '2',
   'A recessionary (deflationary) gap exists when:',
   'AD exceeds the full employment level of output',
   'Actual output is below potential output (Yf)',
   'Inflation is above target',
   'The government has a budget surplus',
   1, 'A recessionary gap: equilibrium output < Yf. There is spare capacity and cyclical unemployment.', 50),

  ('econ-u2-mcq-11', '3.2 AD/AS', 'HL', '2',
   '(HL) If the MPC is 0.8, the Keynesian multiplier is:',
   '0.8',
   '4',
   '5',
   '1.25',
   2, 'k = 1/(1–MPC) = 1/(1–0.8) = 1/0.2 = 5. A $1 injection leads to a $5 increase in national income.', 51);

-- 3.3 Macroeconomic Objectives (Q12-17)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-12', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'Structural unemployment is caused by:',
   'A fall in aggregate demand',
   'A mismatch between workers'' skills and available jobs',
   'Seasonal variations in demand',
   'Workers moving between jobs',
   1, 'Structural unemployment occurs when industries decline or technology changes, leaving workers with obsolete skills.', 52),

  ('econ-u2-mcq-13', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'The natural rate of unemployment includes:',
   'Only cyclical unemployment',
   'Frictional, structural, and seasonal unemployment',
   'All types of unemployment',
   'Zero unemployment',
   1, 'NRU = frictional + structural + seasonal. Cyclical unemployment is excluded (it''s caused by AD fluctuations).', 53),

  ('econ-u2-mcq-14', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'Demand-pull inflation is caused by:',
   'An increase in costs of production',
   'Excessive growth in aggregate demand beyond the economy''s capacity',
   'A decrease in the money supply',
   'A fall in government spending',
   1, 'When AD increases beyond Yf, excess demand pulls up the price level.', 54),

  ('econ-u2-mcq-15', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'Cost-push inflation is shown on an AD/AS diagram as:',
   'A rightward shift of AD',
   'A leftward shift of SRAS',
   'A rightward shift of LRAS',
   'A leftward shift of AD',
   1, 'Higher input costs (wages, oil prices, raw materials) shift SRAS left, raising the price level while reducing output.', 55),

  ('econ-u2-mcq-16', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'If the CPI was 105 last year and is 110 this year, the inflation rate is approximately:',
   '5%',
   '4.76%',
   '10%',
   '110%',
   1, 'Inflation = ((110–105)/105) x 100 = 4.76%. Always use the previous year as the base.', 56),

  ('econ-u2-mcq-17', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'Which is NOT a cost of deflation?',
   'Increased real value of debt',
   'Delayed consumer spending',
   'Lower real wages',
   'Reduced business investment',
   2, 'Deflation actually increases real wages (same nominal wage buys more). The other three are genuine costs of deflation.', 57);

-- 3.4 Inequality (Q18-19)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-18', '3.4 Inequality', 'SL/HL', '2',
   'The Lorenz curve shows:',
   'The relationship between inflation and unemployment',
   'The cumulative distribution of income or wealth in a population',
   'The business cycle',
   'The multiplier effect',
   1, 'The Lorenz curve plots % of population against % of income. The further it bows from the 45° line of equality, the greater the inequality.', 58),

  ('econ-u2-mcq-19', '3.4 Inequality', 'SL/HL', '2',
   'A Gini coefficient of 0.65 indicates:',
   'Perfect equality',
   'Moderate inequality',
   'High inequality',
   'No measurable inequality',
   2, 'Gini ranges from 0 (perfect equality) to 1 (perfect inequality). 0.65 is very high – extreme income concentration.', 59);

-- 3.5 Monetary Policy (Q20-22)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-20', '3.5 Monetary Policy', 'SL/HL', '2',
   'Expansionary monetary policy involves the central bank:',
   'Raising interest rates',
   'Lowering interest rates to stimulate AD',
   'Increasing taxes',
   'Reducing government spending',
   1, 'Lower interest rates reduce the cost of borrowing, increasing C and I, shifting AD right.', 60),

  ('econ-u2-mcq-21', '3.5 Monetary Policy', 'HL', '2',
   '(HL) Open market operations where the central bank BUYS government bonds will:',
   'Decrease the money supply',
   'Increase the money supply and reduce interest rates',
   'Increase interest rates',
   'Have no effect on the economy',
   1, 'Buying bonds injects money into the banking system, increasing money supply, lowering interest rates.', 61),

  ('econ-u2-mcq-22', '3.5 Monetary Policy', 'HL', '2',
   '(HL) Quantitative easing is used when:',
   'Inflation is too high',
   'Interest rates are already near zero and conventional monetary policy is ineffective',
   'The economy is overheating',
   'The government wants to reduce its debt',
   1, 'QE = large-scale asset purchases when interest rates hit the zero lower bound (liquidity trap).', 62);

-- 3.6 Fiscal Policy (Q23-25)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-23', '3.6 Fiscal Policy', 'SL/HL', '2',
   'Expansionary fiscal policy involves:',
   'Cutting government spending',
   'Increasing taxes',
   'Increasing government spending and/or cutting taxes',
   'Raising interest rates',
   2, 'Expansionary fiscal policy increases G and/or cuts T to boost AD.', 63),

  ('econ-u2-mcq-24', '3.6 Fiscal Policy', 'SL/HL', '2',
   'Automatic stabilisers work by:',
   'Requiring parliamentary approval for each policy change',
   'Automatically adjusting government revenue and spending as economic conditions change',
   'Setting fixed interest rates',
   'Eliminating the budget deficit',
   1, 'Progressive taxes automatically reduce in recessions (lower income = lower tax), and welfare spending rises, cushioning the fall in AD.', 64),

  ('econ-u2-mcq-25', '3.6 Fiscal Policy', 'SL/HL', '2',
   'Crowding out occurs when:',
   'The government reduces spending',
   'Increased government borrowing raises interest rates, reducing private investment',
   'Tax cuts increase consumption',
   'Exports exceed imports',
   1, 'Government borrowing competes with private borrowers for funds, pushing up interest rates and reducing private sector I and C.', 65);

-- 3.7 Supply-Side Policies (Q26-28)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-26', '3.7 Supply-Side Policies', 'SL/HL', '2',
   'Which of the following is a market-based supply-side policy?',
   'Increased government spending on education',
   'Building new infrastructure',
   'Deregulation of industries',
   'Subsidies for R&D',
   2, 'Market-based SSPs reduce government intervention: deregulation, privatisation, labour market reforms, tax cuts. The others are interventionist.', 66),

  ('econ-u2-mcq-27', '3.7 Supply-Side Policies', 'SL/HL', '2',
   'Interventionist supply-side policies include:',
   'Privatisation of state industries',
   'Deregulation of labour markets',
   'Government investment in education, healthcare, and infrastructure',
   'Reducing the minimum wage',
   2, 'Interventionist SSPs involve active government spending to improve quality/quantity of factors of production.', 67),

  ('econ-u2-mcq-28', '3.7 Supply-Side Policies', 'SL/HL', '2',
   'Supply-side policies shift:',
   'AD to the right',
   'SRAS to the left',
   'LRAS to the right (increasing potential output)',
   'AD to the left',
   2, 'SSPs improve productive capacity, shifting LRAS right, allowing sustainable non-inflationary growth.', 68);

-- 3.3 Macroeconomic Objectives (Q29-30)
INSERT INTO economics_mcq_questions (id, category, difficulty, unit, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order) VALUES
  ('econ-u2-mcq-29', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'The Phillips curve suggests a trade-off between:',
   'Economic growth and government debt',
   'Inflation and unemployment in the short run',
   'Exports and imports',
   'Savings and investment',
   1, 'The short-run Phillips curve shows lower unemployment is associated with higher inflation, and vice versa.', 69),

  ('econ-u2-mcq-30', '3.3 Macroeconomic Objectives', 'SL/HL', '2',
   'Stagflation refers to:',
   'High growth with low inflation',
   'Falling unemployment and rising GDP',
   'Rising inflation combined with rising unemployment and stagnant growth',
   'A budget surplus during a boom',
   2, 'Stagflation (e.g. 1970s oil crisis) combines cost-push inflation with recession – the worst of both worlds.', 70);

-- ─── WRITTEN QUESTIONS ───────────────────────────────────────

-- Q1: AD/AS & Macroeconomic Equilibrium
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u2-wr-01a', '3.2 AD/AS', 'SL/HL', 'short_answer', '2', 10,
   'Using AD/AS diagrams, explain the difference between demand-pull inflation and cost-push inflation.',
   'Definition of inflation [1]
Demand-pull: diagram showing AD shifting right past Yf; price level rises from PL1 to PL2 [2–3]
Explanation: excess AD pulls up prices; caused by rising C, I, G, or net exports [1–2]
Cost-push: diagram showing SRAS shifting left; price level rises while output falls [2–3]
Explanation: rising input costs (wages, oil, raw materials) push up prices; may cause stagflation [1–2]',
   'Q1(a)', 9),

  ('econ-u2-wr-01b', '3.2 AD/AS', 'SL/HL', 'short_answer', '2', 15,
   'Evaluate the effectiveness of monetary policy in controlling inflation.',
   'Definition of monetary policy and its tools (interest rates, OMOs, reserve requirements) [1–2]
Explanation of contractionary monetary policy: raise interest rates → reduce C and I → AD shifts left → lower inflation [2–3]
Diagram showing AD shifting left, price level falling [1–2]
Strengths: independent central bank, can act quickly, effective against demand-pull inflation [2–3]
Weaknesses: time lags, blunt instrument (affects all sectors), ineffective against cost-push inflation, liquidity trap [2–3]
Real-world examples (e.g. US Fed raising rates 2022–23, ECB response to Eurozone inflation) [1–2]
Evaluation: effectiveness depends on cause of inflation, transmission mechanism, expectations, complementary fiscal policy [2–3]',
   'Q1(b)', 10);

-- Q2: Fiscal Policy & Multiplier
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u2-wr-02a', '3.6 Fiscal Policy', 'SL/HL', 'short_answer', '2', 10,
   'Using a diagram, explain how expansionary fiscal policy can be used to close a recessionary gap.',
   'Definition of fiscal policy and recessionary gap [1–2]
AD/AS diagram showing initial equilibrium below Yf with recessionary gap identified [2–3]
Explanation: government increases G and/or cuts T → AD shifts right [1–2]
New equilibrium closer to or at Yf; output rises, unemployment falls [1–2]
(HL) Reference to multiplier effect amplifying the initial injection [1–2]',
   'Q2(a)', 11),

  ('econ-u2-wr-02b', '3.6 Fiscal Policy', 'SL/HL', 'short_answer', '2', 15,
   'Evaluate the use of fiscal policy versus supply-side policies to achieve long-term economic growth.',
   'Fiscal policy: increases AD in SR, can boost growth quickly, but may cause inflation if economy near Yf [2–3]
Risks: budget deficit, national debt, crowding out [1–2]
Supply-side policies: shift LRAS right, increase potential output, reduce inflationary pressure [2–3]
Market-based SSPs: tax cuts, deregulation (strengths and weaknesses) [1–2]
Interventionist SSPs: education, infrastructure, R&D (strengths and weaknesses) [1–2]
SSP weaknesses: long time lags, uncertain outcomes, may worsen inequality (market-based) [1–2]
Evaluation: best approach is a combination; fiscal policy for SR stabilisation, SSPs for LR growth [2–3]
Real-world examples (e.g. Singapore infrastructure investment, US tax cuts, Nordic education spending) [1–2]',
   'Q2(b)', 12);

-- Q3: Inequality & Poverty
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u2-wr-03a', '3.4 Inequality', 'SL/HL', 'short_answer', '2', 10,
   'Using a Lorenz curve diagram, explain how income inequality is measured.',
   'Definition of income inequality [1]
Lorenz curve diagram with 45° line of perfect equality, correctly labelled axes (cumulative % population, cumulative % income) [2–3]
Explanation: the further the curve bows from the 45° line, the greater the inequality [1–2]
Definition and explanation of Gini coefficient = A/(A+B) [2–3]
Distinction between 0 (perfect equality) and 1 (perfect inequality) [1]',
   'Q3(a)', 13),

  ('econ-u2-wr-03b', '3.4 Inequality', 'SL/HL', 'short_answer', '2', 15,
   'Evaluate the effectiveness of government policies to reduce poverty and inequality in a country of your choice.',
   'Progressive taxation: higher earners pay a larger % – reduces post-tax inequality [2–3]
Transfer payments: welfare, pensions, child benefits – directly raise incomes of poorest [1–2]
Minimum wage: raises income floor but may cause unemployment if set too high [1–2]
Investment in education and healthcare: long-term improvement in human capital and social mobility [2–3]
Counter-arguments: tax avoidance, brain drain, dependency culture, fiscal cost, time lags [2–3]
Real-world examples with specific data (e.g. Brazil Bolsa Familia, Scandinavian model, Singapore CPF) [2]
Evaluation: no single policy is sufficient; most effective as a package; depends on political will and economic context [1–2]',
   'Q3(b)', 14);

-- Q4: Unemployment & Supply-Side Policies
INSERT INTO economics_written_questions (id, category, difficulty, question_type, unit, marks, question_text, mark_scheme, label, sort_order) VALUES
  ('econ-u2-wr-04a', '3.7 Supply-Side Policies', 'SL/HL', 'short_answer', '2', 10,
   'Using appropriate diagrams, explain how supply-side policies can reduce the natural rate of unemployment.',
   'Definition of NRU and supply-side policies [1–2]
Labour market diagram showing shift of labour supply or demand due to SSPs [2–3]
AD/AS diagram showing LRAS shifting right, increasing Yf [2–3]
Examples: retraining reduces structural unemployment; job centres reduce frictional unemployment [1–2]
Result: NRU falls as fewer workers are structurally/frictionally unemployed [1]',
   'Q4(a)', 15),

  ('econ-u2-wr-04b', '3.7 Supply-Side Policies', 'SL/HL', 'short_answer', '2', 15,
   'Evaluate the view that market-based supply-side policies are more effective than interventionist supply-side policies in promoting economic growth.',
   'Market-based: deregulation (reduces costs), privatisation (increases efficiency), tax cuts (increase incentives) [2–3]
Strengths: encourages enterprise, reduces government burden, can be implemented relatively quickly [1–2]
Weaknesses: may worsen inequality, environmental damage, market failures remain [1–2]
Interventionist: education spending (improves human capital), infrastructure (reduces costs), R&D subsidies (innovation) [2–3]
Strengths: addresses market failure, improves equity, long-term capacity building [1–2]
Weaknesses: high fiscal cost, government failure, long time lags, political interference [1–2]
Evaluation: depends on the economy''s specific needs, institutional quality, and political context. A mixed approach is often most effective [2–3]',
   'Q4(b)', 16);
