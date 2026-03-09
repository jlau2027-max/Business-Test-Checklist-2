-- ============================================================
-- Business Management – Checklist Sections & Items (Seed)
-- ============================================================

-- ----------------------------------------------------------
-- 1. Sections
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_sections (id, title, color, sort_order) VALUES
  ('sources',    '3.1 – Sources of Finance',                'var(--accent-tertiary)', 1),
  ('costs',      '3.2 – Costs & Revenues',                  'var(--cat-costs)',       2),
  ('cashflow',   '3.3 – Cash Flow',                         'var(--cat-cashflow)',    3),
  ('accounts',   '3.4 – Final Accounts',                    'var(--cat-accounts)',    4),
  ('ratios',     '3.5 – Profitability & Liquidity Ratios',  'var(--cat-ratios)',      5),
  ('efficiency', '3.6 – Efficiency Ratios (HL Only)',       'var(--cat-budgets)',     6),
  ('investment', '3.7 – Investment Appraisal',               'var(--cat-investment)',  7),
  ('budgets',    '3.8 – Budgets & Variance Analysis',       'var(--cat-cashflow)',    8),
  ('breakeven',  '5.5 – Breakeven Analysis',                'var(--cat-breakeven)',   9),
  ('bmt',        'BMT Tools',                               'var(--cat-bmt)',        10),
  ('formulas',   'Formulas to MEMORISE (Not in Booklet)',   'var(--cat-budgets)',    11),
  ('examtips',   'Exam Technique',                          'var(--cat-costs)',      12);

-- ----------------------------------------------------------
-- 2. Items
-- ----------------------------------------------------------
-- Clear existing items to prevent duplicates (autoincrement table)
DELETE FROM checklist_items;

-- 3.1 Sources of Finance
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('sources', 'Difference between internal & external sources of finance',         1),
  ('sources', 'Short, medium & long-term finance — matched to purpose',            2),
  ('sources', 'Equity vs debt financing (pros & cons)',                             3),
  ('sources', 'Why a business chooses one source over another',                     4),
  ('sources', 'Retained profit, share capital, debentures, venture capital (HL)',   5),
  ('sources', 'Loan capital vs overdraft vs trade credit',                          6);

-- ----------------------------------------------------------
-- 3. Items – 3.2 Costs & Revenues
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('costs', 'Fixed, variable, semi-variable, direct & indirect costs',             1),
  ('costs', 'Total Revenue and Average Revenue',                                   2),
  ('costs', 'Contribution per unit = Selling Price – Variable Cost',               3),
  ('costs', 'Total Contribution = Contribution per unit x Quantity',               4),
  ('costs', 'Total Costs = Fixed Costs + Total Variable Costs',                    5),
  ('costs', 'Profit = Total Revenue – Total Costs',                                6),
  ('costs', 'Difference between profit and cash flow',                             7);

-- ----------------------------------------------------------
-- 4. Items – 3.3 Cash Flow
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('cashflow', 'Construct and interpret a cash flow forecast',                                          1),
  ('cashflow', 'Net Cash Flow = Cash Inflows – Cash Outflows',                                         2),
  ('cashflow', 'Closing Balance = Opening Balance + Net Cash Flow',                                     3),
  ('cashflow', 'Causes of cash flow problems',                                                          4),
  ('cashflow', 'Solutions: overdraft, debt factoring, sale of assets, better credit control',            5),
  ('cashflow', 'Difference between cash flow and profit (common exam trap!)',                            6);

-- ----------------------------------------------------------
-- 5. Items – 3.4 Final Accounts
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('accounts', 'Income Statement layout: Revenue -> Gross Profit -> Net Profit',                            1),
  ('accounts', 'Balance Sheet structure: Assets = Equity + Liabilities',                                    2),
  ('accounts', 'Current vs non-current assets and liabilities',                                             3),
  ('accounts', 'Straight-line depreciation = (Cost – Residual Value) / Useful Life (HL)',                   4),
  ('accounts', 'Reducing balance depreciation = Net Book Value x Rate % (HL)',                              5),
  ('accounts', 'Intangible assets: goodwill, patents, brand value (HL)',                                    6);

-- ----------------------------------------------------------
-- 6. Items – 3.5 Profitability & Liquidity Ratios
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('ratios', 'Gross Profit Margin = (Gross Profit / Revenue) x 100 -- IN BOOKLET',                            1),
  ('ratios', 'Net Profit Margin = (Net Profit / Revenue) x 100 -- IN BOOKLET',                                2),
  ('ratios', 'ROCE = (Net Profit / Capital Employed) x 100 -- IN BOOKLET',                                    3),
  ('ratios', 'Current Ratio = Current Assets / Current Liabilities (ideal ~2:1) -- IN BOOKLET',               4),
  ('ratios', 'Acid Test = (CA – Inventory) / CL (ideal ~1:1) -- IN BOOKLET',                                  5),
  ('ratios', 'Interpret ratios in context — not just calculate them!',                                         6);

-- ----------------------------------------------------------
-- 7. Items – 3.6 Efficiency Ratios (HL Only)
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('efficiency', 'Stock Turnover (times) = Cost of Sales / Average Stock -- IN BOOKLET',                      1),
  ('efficiency', 'Stock Turnover (days) = (Average Stock / Cost of Sales) x 365 -- IN BOOKLET',               2),
  ('efficiency', 'Average Stock = (Opening Stock + Closing Stock) / 2 -- IN BOOKLET',                         3),
  ('efficiency', 'Debtor Days = (Debtors / Revenue) x 365 -- IN BOOKLET',                                     4),
  ('efficiency', 'Creditor Days = (Creditors / Cost of Sales) x 365 -- IN BOOKLET',                           5),
  ('efficiency', 'Gearing = (Non-current Liabilities / Capital Employed) x 100 -- IN BOOKLET',                6),
  ('efficiency', 'High vs low gearing — implications for risk and investment',                                 7);

-- ----------------------------------------------------------
-- 8. Items – 3.7 Investment Appraisal
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('investment', 'Payback Period — calculate and interpret',                                                   1),
  ('investment', 'ARR = (Total Returns – Capital Cost) / Years / Capital Cost x 100 -- IN BOOKLET',           2),
  ('investment', 'NPV = Sum of discounted cash flows – Initial Investment -- IN BOOKLET (HL)',                 3),
  ('investment', 'Discount factors/tables are provided in exam',                                               4),
  ('investment', 'Compare methods: qualitative vs quantitative factors',                                       5),
  ('investment', 'Limitations of each investment appraisal method',                                            6);

-- ----------------------------------------------------------
-- 9. Items – 3.8 Budgets & Variance Analysis
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('budgets', 'Variance = Actual – Budgeted -- MEMORISE',                                                     1),
  ('budgets', 'Favourable variance: better than expected',                                                     2),
  ('budgets', 'Adverse variance: worse than expected',                                                         3),
  ('budgets', 'For costs: Actual < Budgeted = Favourable',                                                    4),
  ('budgets', 'For revenue: Actual > Budgeted = Favourable',                                                  5),
  ('budgets', 'Zero-based vs incremental budgeting (pros & cons)',                                             6),
  ('budgets', 'Limitations of budgets',                                                                        7);

-- ----------------------------------------------------------
-- 10. Items – 5.5 Breakeven Analysis
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('breakeven', 'Breakeven Output = Fixed Costs / Contribution per unit -- MEMORISE',                         1),
  ('breakeven', 'Margin of Safety = Actual Output – Breakeven Output -- MEMORISE',                            2),
  ('breakeven', 'Target Profit Output = (FC + Target Profit) / Contribution -- MEMORISE',                     3),
  ('breakeven', 'Draw and interpret breakeven charts',                                                         4),
  ('breakeven', 'Limitations of breakeven analysis',                                                           5),
  ('breakeven', 'How changes in price/costs affect the breakeven point',                                       6);

-- ----------------------------------------------------------
-- 11. Items – BMT Tools
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('bmt', 'Business Plan — components, purpose, link to securing finance',                                     1),
  ('bmt', 'Ansoff Matrix — 4 strategies, risk levels, finance implications',                                   2),
  ('bmt', 'STEEPLE — apply each factor to a business scenario',                                                3),
  ('bmt', 'Force Field Analysis — driving vs restraining forces (Lewin)',                                       4),
  ('bmt', 'Apply BMT tools to justify business decisions in context',                                           5);

-- ----------------------------------------------------------
-- 12. Items – Formulas to MEMORISE (Not in Booklet)
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('formulas', 'Contribution per unit = Selling Price – Variable Cost per unit',                               1),
  ('formulas', 'Total Contribution = Contribution per unit x Quantity',                                        2),
  ('formulas', 'Total Costs = Fixed Costs + Total Variable Costs',                                             3),
  ('formulas', 'Profit = Total Revenue – Total Costs',                                                         4),
  ('formulas', 'Breakeven Output = Fixed Costs / Contribution per unit',                                       5),
  ('formulas', 'Margin of Safety = Actual Output – Breakeven Output',                                          6),
  ('formulas', 'Target Profit Output = (FC + Target Profit) / Contribution per unit',                          7),
  ('formulas', 'Straight-line depreciation = (Cost – Residual Value) / Useful Life',                           8),
  ('formulas', 'Reducing balance = Net Book Value x Depreciation Rate %',                                      9),
  ('formulas', 'Net Cash Flow = Cash Inflows – Cash Outflows',                                                10),
  ('formulas', 'Closing Balance = Opening Balance + Net Cash Flow',                                            11),
  ('formulas', 'Variance = Actual – Budgeted',                                                                12);

-- ----------------------------------------------------------
-- 13. Items – Exam Technique
-- ----------------------------------------------------------
INSERT OR IGNORE INTO checklist_items (section_id, text, sort_order) VALUES
  ('examtips', 'Define key terms at the start of longer answers',                                              1),
  ('examtips', 'Always use the business context given — never answer generically',                             2),
  ('examtips', 'For evaluate/justify: give both sides then make a justified conclusion',                       3),
  ('examtips', 'Show ALL working in calculations — method marks are available',                                4),
  ('examtips', 'Interpret ratios — don''t just calculate, explain what it means',                              5),
  ('examtips', 'Link answers back to the specific business in the question',                                   6);

-- ----------------------------------------------------------
-- 14. Category Colors
-- ----------------------------------------------------------
INSERT OR IGNORE INTO category_colors (category, color) VALUES
  ('Costs & Revenue',        'var(--cat-costs)'),
  ('Cash Flow',              'var(--cat-cashflow)'),
  ('Final Accounts',         'var(--cat-accounts)'),
  ('Ratio Analysis',         'var(--cat-ratios)'),
  ('Ratio Analysis (HL)',    'var(--cat-ratios)'),
  ('Investment Appraisal',   'var(--cat-investment)'),
  ('Budgets & Variance',     'var(--cat-budgets)'),
  ('Breakeven',              'var(--cat-breakeven)'),
  ('BMT Tools',              'var(--cat-bmt)'),
  ('Sources of Finance',     'var(--accent-tertiary)');
