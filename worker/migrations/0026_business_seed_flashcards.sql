-- ============================================================
-- Business Flashcard Seed Data
-- Topics: Costs & Revenue, Cash Flow, Final Accounts,
--         Ratio Analysis, Investment Appraisal, Budgets &
--         Variance, Breakeven, Sources of Finance, BMT Tools
-- ============================================================

-- Clear existing flashcards to prevent duplicates (autoincrement table)
DELETE FROM flashcards;

-- ─── FLASHCARD TOPICS ──────────────────────────────────────
INSERT OR IGNORE INTO flashcard_topics (id, label, color, sort_order) VALUES
  ('costs-revenue',  'Costs & Revenue',      'var(--cat-costs)',       1),
  ('cashflow',       'Cash Flow',            'var(--cat-cashflow)',    2),
  ('final-accounts', 'Final Accounts',       'var(--cat-accounts)',    3),
  ('ratios',         'Ratio Analysis',       'var(--cat-ratios)',      4),
  ('investment',     'Investment Appraisal', 'var(--cat-investment)',  5),
  ('budgets',        'Budgets & Variance',   'var(--cat-budgets)',     6),
  ('breakeven',      'Breakeven',            'var(--cat-breakeven)',   7),
  ('sources',        'Sources of Finance',   'var(--accent-tertiary)', 8),
  ('bmt',            'BMT Tools',            'var(--cat-bmt)',         9);

-- ─── 1. COSTS & REVENUE ───────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('costs-revenue', 'Fixed Costs', 'Costs that do not change with the level of output, e.g., loan repayments and management salaries.', NULL, 1),
  ('costs-revenue', 'Variable Costs', 'Costs that change with the level of output — they rise when output or sales increase, e.g., raw materials and packaging costs.', NULL, 2),
  ('costs-revenue', 'Total Costs (TC)', 'The aggregate amount of money spent on the output of a business.', 'TC = TFC + TVC', 3),
  ('costs-revenue', 'Contribution per Unit', 'The amount each unit sold contributes toward covering fixed costs and then profit.', 'Contribution per unit = Price − Variable cost per unit', 4),
  ('costs-revenue', 'Total Contribution', 'The total amount contributed toward fixed costs and profit across all units sold.', 'Total contribution = Contribution per unit × Output', 5),
  ('costs-revenue', 'Average Costs (Unit Costs)', 'The cost per unit of output.', 'AC = TC / Q', 6),
  ('costs-revenue', 'Sales Revenue (Total Revenue)', 'The money (income) received by a business from the sale of goods and/or services.', 'TR = P × Q', 7),
  ('costs-revenue', 'Direct Costs', 'Costs associated with the output or sale of a certain good or service — clearly identifiable output-related expenditures.', NULL, 8),
  ('costs-revenue', 'Indirect Costs (Overheads)', 'Costs not easily identifiable with the sale or output of a specific good, service, or business operation.', NULL, 9),
  ('costs-revenue', 'Cost of Sales (COS)', 'The direct costs of production.', 'COS = Opening stock + Purchases − Closing stock', 10);

-- ─── 2. CASH FLOW ─────────────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('cashflow', 'Net Cash Flow', 'The numerical difference between an organisation''s total cash inflows and its total cash outflows, per time period.', 'Net cash flow = Cash inflows − Cash outflows', 1),
  ('cashflow', 'Opening Balance', 'The value of cash held by a business at the start of a trading period.', 'Opening balance = Closing balance of previous period', 2),
  ('cashflow', 'Closing Balance', 'The value of cash held by a business at the end of a trading period.', 'Closing balance = Opening balance + Net cash flow', 3),
  ('cashflow', 'Bad Debt', 'Occurs when a debtor is unable to pay outstanding invoices to the business, reducing cash inflows for the seller.', NULL, 4),
  ('cashflow', 'Debt Factoring', 'Selling outstanding invoices to a third party at a discount in exchange for immediate cash — one of the fastest solutions to cash flow problems.', NULL, 5),
  ('cashflow', 'Cumulative Net Cash Flow', 'The sum of an investment project''s net cash flows for a particular year plus all previous years.', 'Cumulative NCF = NCF in previous year(s) + NCF of current year', 6);

-- ─── 3. FINAL ACCOUNTS ────────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('final-accounts', 'Gross Profit', 'The profit from a firm''s everyday trading activities.', 'Gross profit = Sales revenue − Cost of Sales', 1),
  ('final-accounts', 'Gross Profit Margin (GPM)', 'A profitability ratio measuring gross profit as a percentage of sales revenue. ✦ IN BOOKLET', 'GPM = (Gross profit / Sales revenue) × 100', 2),
  ('final-accounts', 'Profit Margin', 'A profitability ratio measuring a firm''s overall profit as a percentage of sales revenue. ✦ IN BOOKLET', '= (Profit before interest and tax / Sales revenue) × 100', 3),
  ('final-accounts', 'Profit Before Interest and Tax', 'The value of a firm''s profit before deducting interest payments on loans and taxes.', '= Gross profit − Expenses', 4),
  ('final-accounts', 'Retained Profit', 'Earnings after all costs and dividends — reinvested into the business as an internal source of finance.', '= Profit after interest and tax − Dividends', 5),
  ('final-accounts', 'Working Capital', 'Money available for the day-to-day running of a business.', '= Current assets − Current liabilities', 6),
  ('final-accounts', 'Straight-Line Depreciation', 'Spreads the depreciation of a non-current asset evenly over its useful life — value falls by the same amount each year.', '= (Purchase cost − Residual value) / Useful lifespan', 7),
  ('final-accounts', 'Net Book Value (NBV)', 'The current value of a non-current asset after accumulated depreciation.', 'NBV = Original cost − Accumulated depreciation', 8),
  ('final-accounts', 'Capital Employed', 'The value of funds used to operate the business and generate a financial return. ✦ IN BOOKLET', '= Non-current liabilities + Equity', 9),
  ('final-accounts', 'Equity', 'The value of the owners'' stake in the business.', '= Share capital + Retained earnings', 10);

-- ─── 4. RATIO ANALYSIS ────────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('ratios', 'ROCE', 'Measures a firm''s efficiency and profitability in relation to its capital employed. ✦ IN BOOKLET', 'ROCE = (Profit before interest and tax / Capital employed) × 100', 1),
  ('ratios', 'Current Ratio', 'Measures ability to meet short-term debts. Ideal ~2:1. ✦ IN BOOKLET', '= Current assets / Current liabilities', 2),
  ('ratios', 'Acid Test Ratio', 'Measures ability to pay short-term debts WITHOUT selling stock. Ideal ~1:1. ✦ IN BOOKLET', '= (Current assets − Stock) / Current liabilities', 3),
  ('ratios', 'Stock Turnover (Days) — HL', 'Average days to sell stock. ✦ IN BOOKLET', '= (Average stock / Cost of sales) × 365', 4),
  ('ratios', 'Stock Turnover (Times) — HL', 'How many times stock is replaced per year. ✦ IN BOOKLET', '= Cost of sales / Average stock', 5),
  ('ratios', 'Debtor Days — HL', 'Average days to collect debt from customers. ✦ IN BOOKLET', '= (Debtors / Total sales revenue) × 365', 6),
  ('ratios', 'Creditor Days — HL', 'Average days taken to repay creditors. ✦ IN BOOKLET', '= (Creditors / Cost of sales) × 365', 7),
  ('ratios', 'Gearing Ratio — HL', 'The proportion of capital employed funded by external debt. Above 50% = high gearing = higher financial risk. ✦ IN BOOKLET', '= (Non-current liabilities / Capital employed) × 100', 8),
  ('ratios', 'Average Stock', 'Used in efficiency ratio calculations. ✦ IN BOOKLET', '= (Opening stock + Closing stock) / 2', 9);

-- ─── 5. INVESTMENT APPRAISAL ──────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('investment', 'Payback Period (PBP)', 'The time taken to recover the initial investment from the net cash flows generated.', '= Investment cost / Contribution per month (if even flows)', 1),
  ('investment', 'Average Rate of Return (ARR)', 'Average annual profit as a percentage of the initial investment. ✦ IN BOOKLET', 'ARR = [(Total returns − Capital cost) ÷ Years] / Capital cost × 100', 2),
  ('investment', 'Net Present Value (NPV) — HL', 'Calculates the real value of an investment by discounting future cash flows. A positive NPV means the project adds value. ✦ IN BOOKLET', 'NPV = Sum of present values − Cost of investment', 3);

-- ─── 6. BUDGETS & VARIANCE ────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('budgets', 'Variance', 'A discrepancy between the planned (budgeted) item and the actual amount.', 'Variance = Actual value − Budgeted value', 1),
  ('budgets', 'Favourable Variance', 'Profits are higher than expected — due to lower costs and/or higher revenues than budgeted.', NULL, 2),
  ('budgets', 'Adverse Variance', 'Profits are lower than expected — due to higher costs and/or lower revenues than budgeted.', NULL, 3),
  ('budgets', 'Zero-Based Budgeting', 'All budget holders must justify each dollar of spending before funds are released — starts from zero each period.', NULL, 4),
  ('budgets', 'Variance Rule — Costs', 'For COSTS: Actual < Budgeted = FAVOURABLE (spent less than planned).', NULL, 5),
  ('budgets', 'Variance Rule — Revenue', 'For REVENUE: Actual > Budgeted = FAVOURABLE (earned more than planned).', NULL, 6);

-- ─── 7. BREAKEVEN ─────────────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('breakeven', 'Break-Even Quantity (BEQ)', 'The quantity of sales required for a firm to reach break-even (cover all costs).', 'BEQ = Total fixed costs / Contribution per unit', 1),
  ('breakeven', 'Margin of Safety', 'The amount by which actual output exceeds the break-even quantity.', '= Actual output − Break-even quantity', 2),
  ('breakeven', 'Target Profit Quantity', 'The output needed to achieve a specific profit target.', '= (Fixed costs + Target profit) / Contribution per unit', 3),
  ('breakeven', 'Target Price', 'The price needed to break-even given current costs.', '= AFC + AVC', 4),
  ('breakeven', 'Break-Even Analysis', 'A tool to determine the level of sales needed to cover all costs. Limitations: assumes constant price/costs, ignores quality, and is static.', NULL, 5);

-- ─── 8. SOURCES OF FINANCE ────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('sources', 'Internal Sources of Finance', 'Finance from within the organisation — retained profit, sale of assets, owner''s savings.', NULL, 1),
  ('sources', 'External Sources of Finance', 'Finance from outside the organisation — banks, investors, government, crowdfunding.', NULL, 2),
  ('sources', 'Share Capital', 'Finance raised through issuing shares on a stock exchange. Also known as equity capital.', NULL, 3),
  ('sources', 'Loan Capital', 'Borrowed funds from financial lenders such as commercial banks. Must be repaid with interest.', NULL, 4),
  ('sources', 'Trade Credit', 'Enables a business to receive goods/services now but pay at a later date.', NULL, 5),
  ('sources', 'Overdraft', 'A banking service allowing withdrawal of more money than exists in the account — short-term finance.', NULL, 6),
  ('sources', 'Crowdfunding', 'Raising finance by getting small amounts from a large number of people, often via online platforms.', NULL, 7),
  ('sources', 'Business Angels', 'Wealthy private individuals who invest their own money in high-growth potential ventures.', NULL, 8);

-- ─── 9. BMT TOOLS ─────────────────────────────────────────
INSERT INTO flashcards (topic_id, term, definition, formula, sort_order) VALUES
  ('bmt', 'Ansoff Matrix', 'Four growth strategies: Market Penetration (existing/existing), Market Development (existing product/new market), Product Development (new product/existing market), Diversification (new/new — highest risk).', NULL, 1),
  ('bmt', 'STEEPLE', 'Framework examining external macro factors: Social, Technological, Economic, Environmental, Political, Legal, Ethical.', NULL, 2),
  ('bmt', 'Force Field Analysis', 'Lewin''s tool mapping driving forces (for change) vs restraining forces (against change). Change succeeds when driving forces outweigh restraining forces.', NULL, 3),
  ('bmt', 'Business Plan', 'A formal document outlining objectives, strategies, and financial forecasts. Used to secure finance from investors or lenders.', NULL, 4);
