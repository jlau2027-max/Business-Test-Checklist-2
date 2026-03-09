-- Migration: 0028_business_seed_written.sql
-- Seed ALL business written questions (wr1-wr49 short_answer + wr10m-1 to wr10m-5 ten_marker)
-- Generated from src/App.jsx WRITTEN_QUESTIONS and WRITTEN_10_MARK_QUESTIONS arrays

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr1', 'Sources of Finance', 'SL', 'short_answer', 2, 'Define the term retained profit.', 'Retained profit is the surplus earnings remaining after all costs, interest, tax, and dividends have been deducted, which is reinvested back into the business rather than distributed to shareholders.

[1] for a partial definition (e.g. "profit kept in the business").
[2] for a clear and accurate definition that distinguishes retained profit from other forms of profit.
[0] if the student confuses retained profit with gross profit or revenue.', NULL, 1, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr2', 'Final Accounts', 'SL', 'short_answer', 2, 'Define the term gross profit.', 'Gross profit is the profit earned from a firm''s core trading activities, calculated by subtracting the cost of sales (direct costs of production) from sales revenue.

[1] for a partial definition (e.g. "revenue minus costs").
[2] for a clear definition that correctly identifies cost of sales as the deduction — not total costs or expenses.
[0] if the student defines net profit or profit for the period instead.', NULL, 2, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr3', 'Sources of Finance', 'SL', 'short_answer', 2, 'Define the term trade credit.', 'Trade credit is a financial arrangement that allows a business to purchase goods or services from a supplier now and defer payment to a later agreed date, typically 30–90 days.

[1] for a partial definition (e.g. "buy now, pay later").
[2] for a clear definition that identifies both the deferral of payment and the supplier relationship.', NULL, 3, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr4', 'Final Accounts', 'HL', 'short_answer', 2, 'Define the term depreciation.', 'Depreciation is the reduction in the value of a non-current (fixed) asset over time, primarily due to wear and tear through usage or obsolescence.

[1] for a partial definition (e.g. "assets losing value over time").
[2] for a clear definition that identifies non-current assets and states a cause of depreciation.
[0] if the student describes depreciation as a cash expense rather than a non-cash accounting charge.', NULL, 4, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr5', 'Ratio Analysis (HL)', 'HL', 'short_answer', 2, 'Define the term gearing ratio.', 'The gearing ratio measures the proportion of a business''s capital employed that is financed by long-term external debt (non-current liabilities), expressed as a percentage. A ratio above 50% is considered highly geared.

[1] for a partial definition (e.g. "the proportion of debt in the business").
[2] for a clear definition that references capital employed and external/long-term debt.', NULL, 5, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr6', 'Sources of Finance', 'SL', 'short_answer', 2, 'Define the term overdraft.', 'An overdraft is a short-term banking facility that allows a business (or individual) to withdraw more money from its account than is currently available, up to an agreed limit, incurring interest on the overdrawn amount.

[1] for a partial definition (e.g. "when a business spends more than it has in the bank").
[2] for a clear definition that identifies the short-term nature and that interest is charged.', NULL, 6, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr7', 'Budgets & Variance', 'SL', 'short_answer', 2, 'Define the term variance.', 'Variance is the numerical difference between a budgeted (planned) figure and the actual figure achieved for either a revenue or cost item. It can be classified as favourable (beneficial to profit) or adverse (harmful to profit).

[1] for a partial definition (e.g. "difference between actual and budgeted figures").
[2] for a clear definition that identifies both the comparison to budget and the favourable/adverse classification.', NULL, 7, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr8', 'Investment Appraisal', 'HL', 'short_answer', 2, 'Define the term net present value (NPV).', 'Net present value is an investment appraisal method that calculates the real value of an investment project by discounting all future cash flows to their present-day value and subtracting the initial capital cost. A positive NPV indicates the investment adds value.

[1] for a partial definition (e.g. "the present value of future cash flows minus the investment").
[2] for a clear definition that identifies discounting and the decision rule (positive NPV = viable).', NULL, 8, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr9', 'Ratio Analysis', 'SL', 'short_answer', 2, 'Define the term liquidity.', 'Liquidity refers to the ease and speed with which a business can convert its assets into cash without a significant loss in value, in order to meet its short-term financial obligations.

[1] for a partial definition (e.g. "how easily a business can access cash").
[2] for a clear definition that links liquidity to the ability to meet short-term debts.', NULL, 9, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10', 'Ratio Analysis', 'SL', 'short_answer', 2, 'Define the term capital employed.', 'Capital employed is the total value of long-term funds invested in a business, calculated as non-current liabilities plus equity (or equivalently, total assets minus current liabilities). It represents the financial resources used to generate profit.

[1] for a partial definition (e.g. "the total money invested in the business").
[2] for a clear definition that gives the correct formula or clearly identifies the two components.', NULL, 10, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr11', 'Costs & Revenue', 'SL', 'short_answer', 4, 'With reference to LuxCraft, a small furniture manufacturer, explain the difference between fixed costs and variable costs.', 'Fixed costs: costs that do not change with the level of output — they remain constant regardless of how many units LuxCraft produces. Examples include factory rent, equipment loan repayments, and management salaries.
[1] explanation + [1] application to LuxCraft.

Variable costs: costs that rise and fall directly in line with output — the more furniture LuxCraft produces, the higher these costs. Examples include timber, upholstery fabric, and wood stain.
[1] explanation + [1] application to LuxCraft.

[0] for a response that simply lists examples without explaining the distinction.', NULL, 11, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr12', 'Sources of Finance', 'SL', 'short_answer', 4, 'With reference to PeakFit, a chain of gym clubs, explain the difference between internal and external sources of finance.', 'Internal sources: finance generated from within the business itself, without involving a third party. For PeakFit this could include retained profit from profitable years or the sale of unused gym equipment.
[1] explanation + [1] application.

External sources: finance obtained from outside the organisation, typically involving a lender or investor. For PeakFit this could include a bank loan to fund a new branch, or crowdfunding to finance new equipment.
[1] explanation + [1] application.', NULL, 12, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr13', 'Sources of Finance', 'SL', 'short_answer', 4, 'With reference to BrewHouse, a craft beer producer, explain one advantage and one disadvantage of using loan capital to fund expansion.', 'Advantage: BrewHouse retains full ownership and control — no equity is given up, so the founders keep all profits and retain strategic decision-making authority as they expand into new markets.
[1] advantage identified + [1] applied to BrewHouse.

Disadvantage: BrewHouse must make regular interest and principal repayments regardless of trading performance. If sales disappoint during expansion, the fixed repayment obligation could cause serious cash flow problems or insolvency.
[1] disadvantage identified + [1] applied to BrewHouse.', NULL, 13, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr14', 'Final Accounts', 'SL', 'short_answer', 4, 'With reference to NovaMed, a pharmaceutical company, explain the difference between current assets and non-current assets.', 'Current assets: short-term assets expected to be converted into cash or used within 12 months of the balance sheet date. For NovaMed these would include cash, trade debtors (hospitals owing payment), and stock of medicines ready for sale.
[1] explanation + [1] application.

Non-current assets: long-term assets held and used repeatedly in the business for more than 12 months, not intended for resale in the near term. For NovaMed these would include laboratory equipment, manufacturing machinery, and owned premises.
[1] explanation + [1] application.', NULL, 14, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr15', 'Sources of Finance', 'SL', 'short_answer', 4, 'With reference to SkyRide, an electric scooter rental business, explain one advantage and one disadvantage of crowdfunding as a source of finance.', 'Advantage: crowdfunding gives SkyRide access to a large pool of small investors without requiring collateral or a strong credit history — particularly valuable for a start-up that may be rejected by commercial banks. It also generates public awareness and a customer community before launch.
[1] advantage + [1] application.

Disadvantage: crowdfunding campaigns are highly competitive and time-consuming to run successfully. If SkyRide fails to reach its funding target on a platform like Kickstarter, it may receive nothing at all (all-or-nothing model), wasting significant marketing and preparation costs.
[1] disadvantage + [1] application.', NULL, 15, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr16', 'Cash Flow', 'SL', 'short_answer', 4, 'With reference to CleanEdge, a solar panel installation firm, explain the difference between profit and cash flow.', 'Profit: the surplus of total revenue over total costs for a given period, as shown on the statement of profit or loss. CleanEdge may record profit when an installation is completed and invoiced, even if the customer has not yet paid.
[1] explanation + [1] application.

Cash flow: the actual movement of cash into and out of the business in real time. CleanEdge may be profitable on paper but experience negative cash flow if customers take 60–90 days to pay while CleanEdge must immediately pay its suppliers and installers.
[1] explanation + [1] application.

[0] for responses that treat profit and cash flow as interchangeable.', NULL, 16, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr17', 'Final Accounts', 'HL', 'short_answer', 4, 'With reference to TerraFarm, an organic food producer, explain one advantage and one disadvantage of straight-line depreciation compared to the units of production method.', 'Advantage of straight-line: it is simple to calculate and apply consistently — TerraFarm''s accountants can spread the cost of a harvesting machine evenly over its useful life each year without needing to track actual usage hours, reducing administrative complexity.
[1] + [1] application.

Disadvantage of straight-line: it assumes the asset loses value evenly each year regardless of how intensively it is used. For TerraFarm, seasonal machinery used heavily at harvest but idle for months is more accurately depreciated by the units of production method, which better reflects actual wear.
[1] + [1] application.', NULL, 17, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr18', 'Budgets & Variance', 'SL', 'short_answer', 4, 'With reference to PulseMedia, a digital advertising agency, explain one advantage and one disadvantage of zero-based budgeting compared to incremental budgeting.', 'Advantage of zero-based: every department at PulseMedia must justify all expenditure from scratch each period, eliminating wasteful legacy spending and ensuring budget allocations reflect current strategic priorities rather than historical inertia.
[1] + [1] application.

Disadvantage of zero-based: the process is extremely time-consuming and resource-intensive. PulseMedia''s managers must prepare detailed justifications for every line item — in a fast-moving agency environment this could divert management time away from client work and creative output.
[1] + [1] application.', NULL, 18, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr19', 'Ratio Analysis', 'SL', 'short_answer', 4, 'Using the data below for Volta Electronics, calculate the gross profit margin and profit margin. Show all working.

Data:
Sales revenue: $850,000
Cost of sales: $510,000
Expenses: $195,000
Interest: $18,000
Tax: $25,500', 'Gross profit = $850,000 - $510,000 = $340,000
GPM = ($340,000 / $850,000) × 100 = 40%
[1] for working + [1] for correct answer.

Profit before interest and tax = $340,000 - $195,000 = $145,000
Profit margin = ($145,000 / $850,000) × 100 = 17.06%
[1] for working + [1] for correct answer.

Own figure rule (OFR) applies — if gross profit is incorrect but carried forward correctly, award the method mark for profit margin.', NULL, 19, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr20', 'Ratio Analysis', 'SL', 'short_answer', 2, 'Using the data below for Volta Electronics, calculate the ROCE. Show all working.

Data:
Non-current liabilities: $120,000
Share capital: $200,000
Retained earnings: $155,000
Profit before interest and tax: $145,000', 'Capital employed = Non-current liabilities + Equity
= $120,000 + ($200,000 + $155,000)
= $120,000 + $355,000 = $475,000
ROCE = ($145,000 / $475,000) × 100 = 30.53%

[1] for correct capital employed + [1] for correct ROCE.
Accept $475,000 derived as total assets minus current liabilities if student shows that working.', NULL, 20, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr21', 'Ratio Analysis', 'SL', 'short_answer', 4, 'Using the data below for Volta Electronics, calculate the current ratio and acid test ratio. Show all working.

Data:
Cash: $18,000
Debtors: $62,000
Stock: $45,000
Trade creditors: $38,000
Short-term loans: $22,000', 'Current assets = $18,000 + $62,000 + $45,000 = $125,000
Current liabilities = $38,000 + $22,000 = $60,000

Current ratio = $125,000 / $60,000 = 2.08:1
[1] working + [1] answer.

Acid test = ($125,000 - $45,000) / $60,000 = $80,000 / $60,000 = 1.33:1
[1] working + [1] answer.

[1] maximum if answer not expressed as a ratio (e.g. written as just "2.08").', NULL, 21, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr22', 'Ratio Analysis (HL)', 'HL', 'short_answer', 4, 'Using the data below for MapleGrove Retail, calculate the stock turnover in days and debtor days. Show all working.

Data:
Opening stock: $40,000
Closing stock: $56,000
Cost of sales: $336,000
Debtors: $28,000
Sales revenue: $480,000', 'Average stock = ($40,000 + $56,000) / 2 = $48,000
Stock turnover (days) = ($48,000 / $336,000) × 365 = 52.1 days
[1] for average stock + [1] for correct answer.

Debtor days = ($28,000 / $480,000) × 365 = 21.3 days
[1] working + [1] correct answer.', NULL, 22, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr23', 'Final Accounts', 'HL', 'short_answer', 4, 'RidgeLine Construction purchased a crane for $180,000. It has a residual value of $12,000 and a useful life of 8 years. Using the straight-line method, calculate:
(a) the annual depreciation charge
(b) the net book value at the end of Year 3', '(a) Annual depreciation = ($180,000 - $12,000) / 8 = $168,000 / 8 = $21,000 per year
[1] formula + [1] answer.

(b) Accumulated depreciation after 3 years = $21,000 × 3 = $63,000
NBV = $180,000 - $63,000 = $117,000
[1] accumulated depreciation + [1] NBV.', NULL, 23, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr24', 'Final Accounts', 'HL', 'short_answer', 4, 'RidgeLine Construction estimates the crane will operate for a total of 42,000 hours before disposal. Using the units of production method, calculate the depreciation charge per hour and the charge for a year in which the crane is used for 6,200 hours.', 'Depreciation per hour = ($180,000 - $12,000) / 42,000 = $168,000 / 42,000 = $4.00 per hour
[1] formula + [1] answer.

Annual charge = $4.00 × 6,200 = $24,800
[1] method + [1] answer.', NULL, 24, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr25', 'Investment Appraisal', 'SL', 'short_answer', 2, 'PrimePack is considering an investment of $75,000. Net cash flows are as follows:
Year 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000
Calculate the payback period.', 'Year | NCF       | Cumulative
0    | ($75,000) | ($75,000)
1    |  $15,000  | ($60,000)
2    |  $22,000  | ($38,000)
3    |  $24,000  | ($14,000)
4    |  $20,000  |   $6,000

Remaining after Y3 = $14,000
Time in Y4 = ($14,000 / $20,000) × 12 = 8.4 months
Payback period = 3 years 8.4 months

[1] for correct cumulative cash flow table or working
[1] for correct answer expressed in years and months.', NULL, 25, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr26', 'Investment Appraisal', 'SL', 'short_answer', 2, 'Using the data from Q25, calculate the ARR for PrimePack''s investment.

Net cash flows: Year 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000
Initial investment: $75,000', 'Total returns = $15,000 + $22,000 + $24,000 + $20,000 + $18,000 = $99,000
Total profit = $99,000 - $75,000 = $24,000
Average annual profit = $24,000 / 5 = $4,800
ARR = ($4,800 / $75,000) × 100 = 6.4%

[1] for correct average annual profit + [1] for correct ARR with % sign.', NULL, 26, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr27', 'Investment Appraisal', 'HL', 'short_answer', 4, 'Using the discount factors below, calculate the NPV for PrimePack''s $75,000 investment.

Net cash flows: Year 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000

Discount factors at 8%:
Y1 = 0.9259 | Y2 = 0.8573 | Y3 = 0.7938 | Y4 = 0.7350 | Y5 = 0.6806', 'Year | NCF ($)  | Discount Factor | PV ($)
1    | 15,000   | 0.9259          | 13,888.50
2    | 22,000   | 0.8573          | 18,860.60
3    | 24,000   | 0.7938          | 19,051.20
4    | 20,000   | 0.7350          | 14,700.00
5    | 18,000   | 0.6806          | 12,250.80
                  Total PV:         78,751.10

NPV = $78,751.10 - $75,000 = $3,751.10
Positive NPV — investment adds value.

[1] correct discounting method applied to at least 3 years
[1] correct total PV
[1] deducting capital cost
[1] correct NPV with $ sign
OFR applies for arithmetic errors carried forward.', NULL, 27, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr28', 'Budgets & Variance', 'SL', 'short_answer', 4, 'Using the budget data below for CrestLine Cafe, calculate the variance for each item and state whether it is favourable (F) or adverse (A).

Data:
                          Budgeted ($)    Actual ($)
Food & beverage sales       95,000         88,500
Catering event revenue      18,000         23,000
Food costs                  34,000         31,500
Staff wages                 28,000         29,800', '                          Variance        F/A
Food & beverage sales     -$6,500         A
Catering event revenue    +$5,000         F
Food costs                -$2,500         F
Staff wages               +$1,800         A

[1] per correct variance + correct F/A label = max [4].
For revenue: actual > budgeted = F. For costs: actual < budgeted = F.', NULL, 28, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr29', 'Final Accounts', 'SL', 'short_answer', 4, 'Using the data below, construct a Statement of Profit or Loss for ArcLight Studios for the year ended 30 June.

Data:
Sales revenue: $620,000
Cost of sales: $372,000
Rent & utilities: $68,000
Marketing: $24,000
Admin & salaries: $82,000
Interest: $14,000
Tax: $18,000
Dividends: $10,000', 'ArcLight Studios — Statement of Profit or Loss, year ended 30 June

Sales revenue                           $620,000
Cost of sales                          ($372,000)
Gross profit                            $248,000
Expenses (68,000 + 24,000 + 82,000)   ($174,000)
Profit before interest and tax           $74,000
Interest                               ($14,000)
Profit before tax                        $60,000
Tax                                    ($18,000)
Profit for the period                    $42,000
Dividends                              ($10,000)
Retained profit                          $32,000

[4] fully correct in IB format
[3] one error/omission
[2] two errors or correct figures but wrong format
[1] partial understanding of P&L structure
OFR applies throughout.', NULL, 29, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr30', 'Final Accounts', 'SL', 'short_answer', 4, 'Using the data below, construct a Statement of Profit or Loss for DriftLine Apparel for the year ended 31 March.

Data:
Sales revenue: $1,100,000
Cost of sales: $605,000
Salaries: $180,000
Rent: $90,000
Marketing: $35,000
Depreciation: $22,000
Interest: $28,000
Tax: $42,000
Dividends: $25,000', 'DriftLine Apparel — Statement of Profit or Loss, year ended 31 March

Sales revenue                                       $1,100,000
Cost of sales                                        ($605,000)
Gross profit                                          $495,000
Expenses (180,000 + 90,000 + 35,000 + 22,000)       ($327,000)
Profit before interest and tax                        $168,000
Interest                                             ($28,000)
Profit before tax                                     $140,000
Tax                                                  ($42,000)
Profit for the period                                  $98,000
Dividends                                            ($25,000)
Retained profit                                        $73,000

[4] fully correct
[3] one error
[2] two errors or correct figures in wrong format
[1] partial understanding.
Note: depreciation is an expense, not part of cost of sales — mark down by one level if placed incorrectly.', NULL, 30, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr31', 'Final Accounts', 'SL', 'short_answer', 4, 'Using the data below, construct a Statement of Financial Position for KineticSport as at 31 December.

Data:
Property, plant & equipment: $410,000
Accumulated depreciation: $35,000
Cash: $22,000
Debtors: $48,000
Stock: $31,000
Bank overdraft: $8,000
Trade creditors: $42,000
Long-term bank loan: $95,000
Share capital: $220,000
Retained earnings: $111,000', 'KineticSport — Statement of Financial Position as at 31 December

NON-CURRENT ASSETS
Property, plant & equipment               $410,000
Accumulated depreciation                  ($35,000)
Total non-current assets                            $375,000

CURRENT ASSETS
Cash                                       $22,000
Debtors                                    $48,000
Stock                                      $31,000
Total current assets                                $101,000

Total assets                                        $476,000

CURRENT LIABILITIES
Bank overdraft                              $8,000
Trade creditors                            $42,000
Total current liabilities                            $50,000

NON-CURRENT LIABILITIES
Long-term bank loan                        $95,000
Total non-current liabilities                        $95,000

Total liabilities                                   $145,000
Net assets                                          $331,000

EQUITY
Share capital                             $220,000
Retained earnings                         $111,000
Total equity                                        $331,000

[4] fully correct, balances, correct IB format
[3] largely correct but one misclassification or arithmetic error
[2] does not balance or two classification errors
[1] demonstrates some understanding of balance sheet structure.', NULL, 31, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr32', 'Final Accounts', 'SL', 'short_answer', 4, 'Using the data below, construct a Statement of Financial Position for ClearView Optics as at 30 September.

Data:
Equipment: $185,000
Accumulated depreciation: $42,000
Cash: $9,000
Debtors: $31,000
Stock: $27,000
Short-term loans: $18,000
Trade creditors: $29,000
Long-term mortgage: $60,000
Share capital: $80,000
Retained earnings: $23,000', 'ClearView Optics — Statement of Financial Position as at 30 September

NON-CURRENT ASSETS
Equipment                                 $185,000
Accumulated depreciation                  ($42,000)
Total non-current assets                            $143,000

CURRENT ASSETS
Cash                                        $9,000
Debtors                                    $31,000
Stock                                      $27,000
Total current assets                                 $67,000

Total assets                                        $210,000

CURRENT LIABILITIES
Short-term loans                           $18,000
Trade creditors                            $29,000
Total current liabilities                            $47,000

NON-CURRENT LIABILITIES
Long-term mortgage                         $60,000
Total non-current liabilities                        $60,000

Total liabilities                                   $107,000
Net assets                                          $103,000

EQUITY
Share capital                              $80,000
Retained earnings                          $23,000
Total equity                                        $103,000

[4] fully correct and balances
[3] one error
[2] two errors or does not balance
[1] partial understanding.', NULL, 32, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr33', 'Cash Flow', 'SL', 'short_answer', 6, 'Construct a cash flow forecast for NorthStar Events for the four months January–April using the data below.

Data:
Opening balance (January): $5,500
Cash inflows:  Jan $18,000 | Feb $22,000 | Mar $31,000 | Apr $26,000
Cash outflows: Jan $21,000 | Feb $19,500 | Mar $25,000 | Apr $27,500', 'NorthStar Events — Cash Flow Forecast (Jan–Apr)

                    Jan         Feb         Mar         Apr
Cash inflows     $18,000     $22,000     $31,000     $26,000
Cash outflows    $21,000     $19,500     $25,000     $27,500
Net cash flow    ($3,000)     $2,500      $6,000     ($1,500)
Opening balance   $5,500      $2,500      $5,000     $11,000
Closing balance   $2,500      $5,000     $11,000      $9,500

[6] error-free, correct format
[4-5] one or two errors
[2-3] correct format but three or more errors
[1] some understanding of cash flow forecast structure.
OFR: if one closing balance is wrong but correctly carried to the next opening balance, only penalise once.', NULL, 33, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr34', 'Cash Flow', 'SL', 'short_answer', 6, 'Construct a cash flow forecast for PixelPrint for the three months October–December and answer the question below.

Data:
Opening balance (October): -$2,000
Cash inflows:  Oct $14,500 | Nov $19,000 | Dec $28,500
Cash outflows: Oct $16,000 | Nov $17,500 | Dec $24,000

(a) Construct the cash flow forecast. [4 marks]
(b) Comment on PixelPrint''s liquidity position over the three months. [2 marks]', '(a)
PixelPrint — Cash Flow Forecast (Oct–Dec)

                    Oct         Nov         Dec
Cash inflows     $14,500     $19,000     $28,500
Cash outflows    $16,000     $17,500     $24,000
Net cash flow    ($1,500)     $1,500      $4,500
Opening balance  ($2,000)    ($3,500)    ($2,000)
Closing balance  ($3,500)    ($2,000)     $2,500

[4] fully correct | [3] one error | [2] two errors | [1] partial understanding. OFR applies.

(b) PixelPrint''s liquidity position is poor in October and November, with negative closing balances of -$3,500 and -$2,000 respectively, suggesting the business cannot meet its short-term obligations without external support such as an overdraft. However, the positive trend is encouraging — December''s closing balance of $2,500 suggests the business is recovering, likely due to higher seasonal inflows. Management should arrange an overdraft facility to cover the October–November shortfall while trading through to December.

[2] for a comment that uses data from the forecast.', NULL, 34, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr35', 'Costs & Revenue', 'SL', 'short_answer', 3, 'A business has total fixed costs of $18,000 and produces 600 units. Total variable costs are $12,000. Calculate the average cost per unit.', 'Total Costs = TFC + TVC = $18,000 + $12,000 = $30,000.
Average cost = TC / Q = $30,000 / 600 = $50 per unit.

[1] for TC formula/calculation
[1] for correct TC = $30,000
[1] for correct AC = $50', NULL, 35, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr36', 'Cash Flow', 'SL', 'short_answer', 4, 'State two causes and two solutions to cash flow problems, using business examples.', 'Causes:
(1) Overtrading — the business expands too fast, spending on stock and wages before receiving revenue.
(2) Poor credit control — allowing debtors too long to pay (e.g., 90-day terms) means cash inflows are delayed.

Solutions:
(1) Debt factoring — selling outstanding invoices to a third party for immediate cash at a small discount.
(2) Negotiating an overdraft — provides a short-term credit facility to bridge temporary shortfalls.

[1] per cause identified (×2)
[1] per solution identified (×2)', NULL, 36, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr37', 'Final Accounts', 'HL', 'short_answer', 4, 'A machine costs $80,000, has a residual value of $8,000, and a useful life of 6 years. Calculate (a) the annual straight-line depreciation and (b) the net book value after 2 years.', '(a) Annual depreciation = (Cost − Residual value) / Useful life
= ($80,000 − $8,000) / 6 = $72,000 / 6 = $12,000 per year.

(b) Accumulated depreciation after 2 years = $12,000 × 2 = $24,000.
NBV = $80,000 − $24,000 = $56,000.

[1] for correct formula [1] for $12,000/year
[1] for accumulated depreciation [1] for NBV = $56,000', NULL, 37, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr38', 'Ratio Analysis', 'SL', 'short_answer', 6, 'A business has: Sales revenue = $500,000 | Gross profit = $200,000 | Profit before interest and tax = $75,000 | Capital employed = $600,000. Calculate (a) GPM, (b) Profit margin, (c) ROCE and briefly interpret each.', '(a) GPM = ($200,000 / $500,000) × 100 = 40%
→ The business retains 40¢ of every $1 of revenue after direct costs.

(b) Profit margin = ($75,000 / $500,000) × 100 = 15%
→ Only 15¢ of every $1 survives after all operating expenses.

(c) ROCE = ($75,000 / $600,000) × 100 = 12.5%
→ For every $1 of capital employed, the business generates 12.5¢ of profit.

[1] each for correct calculation (×3)
[1] each for relevant interpretation (×3)', NULL, 38, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr39', 'Investment Appraisal', 'SL', 'short_answer', 6, 'An investment costs $48,000. Net cash flows: Year 1: $10,000 | Year 2: $14,000 | Year 3: $18,000 | Year 4: $16,000. Calculate (a) the payback period and (b) the ARR.', '(a) Cumulative: Y1=$10,000 | Y2=$24,000 | Y3=$42,000 | Y4=$58,000.
Remaining after Y3 = $48,000 − $42,000 = $6,000.
Time in Y4 = ($6,000 / $16,000) × 12 = 4.5 months.
Payback = 3 years 4.5 months.

(b) Total returns = $58,000. Total profit = $58,000 − $48,000 = $10,000.
Average annual profit = $10,000 / 4 = $2,500.
ARR = ($2,500 / $48,000) × 100 = 5.21%.

[1] cumulative cashflow table [1] correct payback period
[1] total profit [1] average annual profit [1] correct ARR % [1] working shown', NULL, 39, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr40', 'Budgets & Variance', 'HL', 'short_answer', 5, 'Budgeted sales revenue: $80,000. Actual: $72,000. Budgeted costs: $55,000. Actual costs: $51,000. Calculate both variances, state whether favourable or adverse, and evaluate the overall impact on profit.', 'Revenue variance = $72,000 − $80,000 = −$8,000 → ADVERSE
(Earned $8,000 less than planned)

Cost variance = $51,000 − $55,000 = −$4,000 → FAVOURABLE
(Spent $4,000 less than planned)

Net impact: Revenue shortfall (−$8,000) partially offset by cost savings (+$4,000) = net adverse effect of $4,000 on profit.

[1] correct revenue variance [1] adverse identified
[1] correct cost variance [1] favourable identified
[1] evaluation of net profit impact', NULL, 40, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr41', 'Breakeven', 'SL', 'short_answer', 5, 'Fixed costs = $24,000. Selling price = $60. Variable cost = $20. (a) Calculate breakeven output. (b) Calculate the margin of safety if actual output is 800 units. (c) Calculate the output needed for a target profit of $16,000.', '(a) Contribution = $60 − $20 = $40.
BEQ = $24,000 / $40 = 600 units.

(b) Margin of safety = 800 − 600 = 200 units.

(c) Target profit quantity = (FC + Target profit) / Contribution
= ($24,000 + $16,000) / $40 = $40,000 / $40 = 1,000 units.

[1] contribution calculation [1] BEQ
[1] margin of safety [1] target profit formula [1] correct answer', NULL, 41, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr42', 'BMT Tools', 'SL/HL', 'short_answer', 4, 'Explain how a Force Field Analysis could support a business decision to relocate its production overseas.', 'A Force Field Analysis (Lewin) identifies and weights driving forces (for the change) vs restraining forces (against it).

Driving forces: lower labour costs overseas, access to new markets, government incentives, economies of scale.

Restraining forces: high relocation costs, employee resistance/redundancies, supply chain disruption, reputational risk.

If driving forces outweigh restraining forces numerically, the decision is more viable. The tool also helps managers identify which restraining forces to reduce before committing.

[1] definition of FFA [1] driving forces example
[1] restraining forces example [1] how it aids decision-making', NULL, 42, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr43', 'Sources of Finance', 'SL', 'short_answer', 4, 'With reference to Hail Cheeser!, explain one advantage and one disadvantage of Manuel using internal sources of finance to open the new waterfront location.', 'Advantage: Manuel would retain full control over his business and all future profits — no interest payments are required, making it the cheapest form of finance. He avoids lengthy loan applications or investor meetings.

Disadvantage: Manuel''s retained profits are modest (he lost money in 3 of 12 months), so he may simply not have enough to fund the $20,000–$30,000 relocation. Using personal retirement savings also incurs a 10% early withdrawal penalty, increasing the actual cost.

[1] advantage identified [1] applied to Hail Cheeser!
[1] disadvantage identified [1] applied to Hail Cheeser!', NULL, 43, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr44', 'Costs & Revenue', 'SL', 'short_answer', 4, 'Using the Dunn Auto Repair case, explain the difference between fixed and indirect costs. Give one example of each from the case.', 'Fixed costs are costs that do not vary with the level of output — they remain constant regardless of how many services DAR performs. For example, Keith''s salary of $5,000/month is paid whether DAR completes 10 repairs or 500.

Indirect costs (overheads) are costs not directly attributable to a specific product or service. For example, utility expenses of $500/month and marketing costs of $150/month cannot be easily assigned to any individual oil change or repair job.

Note: fixed costs often overlap with indirect costs, but indirect costs can occasionally vary (e.g., utilities rising in winter).

[1] definition of fixed costs [1] example from DAR
[1] definition of indirect costs [1] example from DAR', NULL, 44, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr45', 'Final Accounts', 'SL', 'short_answer', 4, 'Using Crispy Collin''s accounts, construct the profit and loss account for the period ended 31 July. (Sales revenue: $85,000 | Rent: $14,000 | Marketing: $2,000 | Salaries/Admin/Insurance: $20,000 | Profit before interest and tax: $6,500 | Interest: $500 | Tax: $1,750)', 'Crispy Collin''s — Statement of Profit or Loss

Sales revenue:              $85,000
Cost of sales:             ($42,500)  [85,000 − 42,500]
Gross profit:               $42,500
Expenses (14+2+20):        ($36,000)
Profit before interest/tax:  $6,500
Interest:                     ($500)
Profit before tax:           $6,000
Tax:                        ($1,750)
Profit for the period:       $4,250

[4] fully correct | [3] one error | [2] two errors | [1] shows some understanding of P&L layout', NULL, 45, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr46', 'Ratio Analysis', 'SL', 'short_answer', 6, 'Using Cedar Hill Books'' financial ratios below, analyse the business''s financial performance over three years.

GPM: 39.5% → 38.2% → 38.5% | Profit Margin: 9.5% → 7.9% → 7.4% | Current Ratio: 1.75:1 → 1.6:1 → 1.55:1 | Acid Test: 1.1:1 → 0.85:1 → 0.86:1 | ROCE: 12.3% → 9.4% → 9.8%', 'GPM has remained broadly stable (39.5% to 38.5%), suggesting Cedar Hill manages its direct costs well — the slight dip in Year 2 may reflect the fading of the hit book''s contribution.

Profit margin has fallen from 9.5% to 7.4%, indicating rising indirect costs (expenses) relative to revenue — possibly increased marketing or admin costs as Cedar Hill adapts to e-books and audiobooks.

ROCE fell sharply in Year 2 (12.3% to 9.4%) but recovered slightly (9.8%), and remains well above the 3.5–4.5% loan interest range — Cedar Hill still generates strong returns on capital.

Liquidity ratios show a concerning trend: the current ratio has fallen below 2:1 in all years, and the acid test dropped sharply from 1.1 to 0.85. This suggests declining short-term liquidity, although Year 3 shows slight stabilisation.

Overall, Cedar Hill remains profitable and covers its cost of borrowing, but the declining profit margin and liquidity warrant attention.

[2] for correct observations with data
[2] for application/context
[2] for analysis (cause + effect reasoning)', NULL, 46, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr47', 'Ratio Analysis (HL)', 'HL', 'short_answer', 4, 'Calculate the following ratios for Fresh Cucina using its published accounts (Opening stock: $75m; Closing stock: $65m; Cost of sales: $341m; Debtors: $10m; Sales revenue: $519m; Creditors: $49m; Non-current liabilities: $218m; Total equity: $427m):
(a) Stock turnover (times)   (b) Debtor days   (c) Creditor days   (d) Gearing ratio', '(a) Average stock = (75+65)/2 = $70m
Stock turnover = $341m / $70m = 4.87 times per year

(b) Debtor days = ($10m / $519m) × 365 = 7.03 days

(c) Creditor days = ($49m / $341m) × 365 = 52.45 days

(d) Capital employed = $218m + $427m = $645m
Gearing = ($218m / $645m) × 100 = 33.8%

[1] per correct answer (×4)', NULL, 47, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr48', 'Investment Appraisal', 'HL', 'short_answer', 4, 'On Air Sports is considering paying $6m upfront for 8-year broadcast rights generating $2m/year. Using discount factors provided (Y1=0.9259, Y2=0.8573, Y3=0.7938, Y4=0.7350, Y5=0.6806, Y6=0.6302, Y7=0.5835, Y8=0.5403), calculate the NPV.', 'Present values:
Y1: 2 × 0.9259 = $1.8518m
Y2: 2 × 0.8573 = $1.7146m
Y3: 2 × 0.7938 = $1.5876m
Y4: 2 × 0.7350 = $1.470m
Y5: 2 × 0.6806 = $1.3612m
Y6: 2 × 0.6302 = $1.2604m
Y7: 2 × 0.5835 = $1.167m
Y8: 2 × 0.5403 = $1.0806m

Total PV = $11.4932m
NPV = $11.4932m − $6m = $5.4932m ≈ $5,493,200

Positive NPV → the investment adds value in real money terms.

[1] for correct discounting method
[1] for total PV
[1] for deducting investment cost
[1] for correct NPV with $ sign', NULL, 48, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr49', 'Budgets & Variance', 'HL', 'short_answer', 4, 'Kicks Soccer Club budgeted membership revenue of $35,000 but received $38,000. Rent was budgeted at $20,000 but cost $21,000. (a) Calculate each variance and state F or A. (b) Explain one benefit of variance analysis to KSC''s decision-making.', '(a) Membership revenue variance = $38,000 − $35,000 = $3,000 FAVOURABLE
(Actual > budgeted revenue = good)

Rent variance = $21,000 − $20,000 = $1,000 ADVERSE
(Actual > budgeted cost = bad)

(b) Variance analysis helps KSC identify areas of overspending or unexpected income. For example, knowing rent exceeded budget by $1,000 allows management to renegotiate facility terms or allocate more funds to rent in the 2025 budget, improving financial control and planning accuracy.

[1] correct revenue variance [1] F/A correctly identified
[1] correct cost variance [1] F/A correctly identified
(Benefit = up to 2 marks if writing extended answer)', NULL, 49, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10m-1', 'Ratio Analysis', 'HL', 'ten_marker', 10, 'ZephyrTech Solutions (ZTS) is a software development company founded in 2019 by Priya Sharma in Dublin, Ireland. ZTS specialises in building custom enterprise software for mid-sized companies across Europe, charging premium prices based on its reputation for high-quality, bespoke solutions. The company currently employs 34 full-time developers, project managers, and support staff.

ZTS has experienced strong revenue growth over the past three years, but Priya has become increasingly concerned about the company''s profitability ratios, which have declined despite rising revenues. A key issue is ZTS''s cost structure: developer salaries account for approximately 58% of total revenue, and the company recently moved into a larger office space in central Dublin, significantly increasing its monthly rent. ZTS also invested €180,000 in new server infrastructure last year, financed through a long-term bank loan.

Priya is now evaluating two strategic options to address the declining profit margins:

Option 1: Transition from bespoke project work to a Software-as-a-Service (SaaS) model, offering a standardised product to a much larger customer base at a lower price point per customer. This would require an upfront investment of €250,000 in product development and would not generate significant revenue for at least 18 months.

Option 2: Reduce the workforce by 20% (approximately 7 staff members) through redundancies, focusing cuts on support roles rather than core development. Priya estimates this would reduce annual salary costs by approximately €420,000 but acknowledges it would likely reduce ZTS''s capacity to take on new projects in the short term.

Selected financial data for ZTS for the year ended 31 December 2025:

Sales revenue: $3,200k | Cost of sales: $1,856k | Gross profit: $1,344k | Expenses: $1,108k | Profit before interest and tax: $236k | Interest: $42k | Tax: $38k | Profit for the period: $156k | Capital employed: $1,850k | Industry average profit margin: 12% | Industry average ROCE: 18%

Evaluate the two strategic options available to Priya to improve ZTS''s profitability ratios.', 'Candidates should demonstrate understanding of profitability ratios and apply them to the ZTS context before evaluating the two options.

Relevant calculations (not required but rewarded if used):
• Profit margin = (236 / 3,200) × 100 = 7.375% — significantly below the industry average of 12%.
• ROCE = (236 / 1,850) × 100 = 12.76% — below the industry average of 18%.
• GPM = (1,344 / 3,200) × 100 = 42%.

The data confirms that ZTS''s profitability is below industry benchmarks, primarily driven by high expenses (€1,108,000) relative to gross profit (€1,344,000), leaving a thin margin between gross and net profit.

Option 1 — Transition to SaaS model:

Advantages:
• A SaaS model generates recurring subscription revenue, which is more predictable and scalable than one-off bespoke projects. If ZTS acquires a large enough customer base, revenue per developer could rise significantly, improving both profit margin and ROCE over time.
• The standardised nature of SaaS reduces the labour intensity per unit of revenue — developers build once and sell repeatedly, which directly addresses the core problem of salary costs at 58% of revenue.
• ZTS could retain its premium brand positioning by targeting enterprise clients with a high-quality SaaS product, differentiating itself from lower-cost competitors.

Disadvantages:
• The €250,000 upfront investment with no meaningful revenue for 18 months poses a serious cash flow risk. Given ZTS already carries a long-term bank loan for the server infrastructure, adding further financial strain could threaten liquidity — particularly if existing project revenue slows.
• The SaaS market is highly competitive, dominated by large established players. ZTS has no track record in this model, and there is no guarantee the product will attract sufficient customers to justify the investment.
• Staff skilled in bespoke development may not have the product mindset required for SaaS, potentially requiring costly retraining or new hires — further pressuring expenses in the short term.
• The transition away from bespoke work may alienate ZTS''s existing loyal client base, reducing revenue before SaaS income materialises.

Option 2 — Workforce reduction of 20%:

Advantages:
• Reducing annual salary costs by €420,000 would dramatically improve the profit margin. If all else remains equal, profit before interest and tax would rise from €236,000 to approximately €656,000, bringing the profit margin to approximately 20.5% — well above the 12% industry average.
• ROCE would also improve significantly: (€656,000 / €1,850,000) × 100 = approximately 35.5%.
• The savings are immediate and certain, unlike the speculative 18-month revenue gap in Option 1.
• Focusing cuts on support roles rather than developers minimises the impact on ZTS''s core value-creating activity and client-facing quality.

Disadvantages:
• Priya acknowledges reduced capacity for new projects — this could lead to revenue decline, partially offsetting the cost savings. If revenue falls, the improvement in profit margin may be less dramatic than the raw calculation suggests.
• Redundancies carry one-off costs (severance pay, legal fees) that will reduce profit in the year the cuts are made, potentially worsening short-term profitability before improving it.
• Staff morale and company culture may suffer significantly. In a knowledge-intensive business like software development, demotivated staff are less productive, and key developers may leave voluntarily — turning a planned 20% reduction into an uncontrolled talent exodus.
• ZTS''s reputation as a premium employer could be damaged, making future recruitment of skilled developers harder and more expensive.

Evaluation/Judgement:
Both options present credible paths to improved profitability but carry very different risk profiles. Option 2 offers faster, more certain financial improvement — the numbers clearly show profit margin could exceed industry benchmarks immediately. However, it carries significant people and capacity risk in a talent-dependent business. Option 1 is a longer-term structural solution that could fundamentally transform ZTS''s cost model, but the 18-month revenue gap and competitive uncertainty make it high-risk given ZTS''s already-below-average profitability.

A strong answer might argue that Option 2 is the more prudent immediate choice to stabilise the business financially, while Option 1 could be pursued as a medium-term strategy once profitability is restored. Alternatively, one may argue that Option 2 is a short-term tactic that does not address ZTS''s structural cost problem and that the SaaS transition, though risky, is the only path to sustainable margin improvement. Accept any substantiated judgement.

Level descriptors:
9–10: Balanced, accurate analysis of both options with integrated use of financial data, well-developed application to ZTS, and a substantiated conclusion that acknowledges limitations.
7–8: Mostly addresses both options with relevant theory and data use; some balance; conclusion present but may lack depth.
5–6: Partial analysis, mostly one-sided or lacking data integration; some application to ZTS.
3–4: Some understanding of the options but limited analysis; superficial application.
1–2: Little understanding; no real application or argument.', NULL, 50, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10m-2', 'Ratio Analysis', 'HL', 'ten_marker', 10, 'NorthHaven Dairy (NHD) is a family-owned dairy producer based in rural Canada, established in 1987. NHD produces a premium range of organic cheeses, yoghurts, and flavoured milks, which it sells through independent health food stores and a small number of regional supermarket chains. NHD''s products command a significant price premium over conventional dairy brands, justified by the company''s commitment to 100% grass-fed, certified organic farming practices.

Over the past two years, NHD has faced a difficult trading environment. A national cost-of-living crisis has made consumers more price sensitive, and several supermarket partners have reduced their orders or switched shelf space to cheaper own-label alternatives. As a result, NHD''s factory is currently operating at approximately 65% of full capacity. Fixed costs, including the lease on the production facility and permanent staff salaries, remain unchanged despite the lower output — significantly increasing NHD''s cost per unit and squeezing profit margins.

NHD''s head of finance, Daniel Park, has presented two options to the board:

Option 1: Launch a lower-priced, non-organic "NorthHaven Everyday" sub-brand using conventional (non-certified) milk sourced from a cheaper supplier, targeting price-sensitive consumers through mainstream supermarkets. Daniel estimates this could increase total revenue by 30% within 12 months.

Option 2: Invest $180,000 in a direct-to-consumer (DTC) e-commerce platform, allowing NHD to sell directly to customers online and bypass supermarket intermediaries entirely. This would improve NHD''s margin per unit sold but would require significant upfront marketing spend and would take at least 18 months to generate meaningful revenue.

Selected financial data for NHD for the year ended 31 January 2025:

Sales revenue: $1,500k | Cost of sales: $900k | Gross profit: $600k | Expenses: $400k | Profit before interest and tax: $200k | Interest: $50k | Tax: $40k | Profit for the period: $110k | Dividends: $40k | Retained profit: $70k | Non-current liabilities: $75k | Equity: $800k | Industry average profit margin: 9%

Evaluate the two options available to NHD''s board to improve its financial performance.', 'Candidates should demonstrate understanding of relevant financial concepts — profitability ratios, costs, revenue — and apply them to the NHD context before evaluating the two options.

Relevant calculations (not required but rewarded if used):
• Profit margin = (200 / 1,500) × 100 = 13.33% — above the 9% industry average, suggesting NHD is currently profitable relative to peers despite the difficult environment.
• ROCE = (200 / 875) × 100 = 22.86%.
• GPM = (600 / 1,500) × 100 = 40%.
Candidates with strong financial understanding may note that NHD''s margins are currently above industry average, meaning the real problem is not margin quality but volume — the factory running at 65% capacity means fixed costs are spread over fewer units, inflating cost per unit and threatening future profitability if volume continues to decline.

Option 1 — NorthHaven Everyday sub-brand:

Advantages:
• A 30% revenue increase would be transformative — adding approximately $450,000 in revenue, which at even a modest margin would significantly improve profit and ROCE. It also addresses the capacity utilisation problem directly by using the factory''s idle 35%.
• Price-sensitive consumers who currently buy competing products could be captured without cannibalising NHD''s premium customer base, if brand separation is managed well.
• Lower input costs (non-certified conventional milk) would improve the cost of sales position for the new sub-brand, potentially delivering acceptable margins even at a lower price point.

Disadvantages:
• This directly contradicts NHD''s core brand identity of 100% certified organic farming. The premium brand relies on this ethical positioning to justify its price premium — if existing loyal customers perceive that NHD has "sold out," revenue from the premium range could fall, offsetting the gains from the sub-brand.
• Supermarkets that already have own-label alternatives may not see sufficient reason to stock NorthHaven Everyday alongside their existing cheaper options, limiting distribution reach.
• Managing two brands with different supply chains, certifications, and marketing messages significantly increases operational complexity and overhead costs — which are already high at 65% capacity.
• There is reputational and regulatory risk: organic certification bodies may scrutinise NHD''s operations more closely, and any cross-contamination or labelling confusion between the organic and non-organic ranges could result in the loss of NHD''s organic certification entirely.

Option 2 — Direct-to-consumer e-commerce platform:

Advantages:
• By eliminating supermarket intermediaries, NHD captures the full retail margin rather than sharing it — this directly improves profit per unit sold without needing to raise prices or cut costs elsewhere.
• A DTC model builds a direct relationship with NHD''s most loyal, health-conscious consumers, providing valuable data on purchasing behaviour that can inform future product development.
• The DTC model is fully consistent with NHD''s premium, ethical brand — it arguably strengthens the brand narrative by emphasising the farm-to-doorstep story.

Disadvantages:
• The $180,000 investment comes at a time when NHD is already under revenue pressure. With retained profit of only $70,000, NHD would likely need to use loan capital or deplete reserves to fund this, increasing financial risk.
• The 18-month revenue lag means NHD must sustain its current financial position for over a year before DTC revenues become meaningful — if the capacity utilisation problem continues to worsen in the meantime, NHD may not survive long enough to benefit.
• Building DTC brand awareness requires significant ongoing marketing investment beyond the $180,000 platform cost. NHD has limited experience in digital marketing, and competing for consumer attention online against well-funded competitors is costly.
• DTC volumes are unlikely to fully replace supermarket channel volumes in the near term, meaning the capacity utilisation problem may persist.

Evaluation/Judgement:
Both options carry significant risk for NHD''s well-established brand. Option 1 offers faster, larger-scale revenue recovery but at potential cost to the organic brand equity that is NHD''s most valuable and irreplaceable asset — once lost, organic certification and consumer trust are extremely difficult to rebuild. Option 2 preserves brand integrity and improves unit economics but is a slow solution to what is currently an urgent capacity and fixed cost problem.

A strong answer might argue that Option 1 is too risky given NHD''s brand dependence — a decline in premium range sales could more than offset the sub-brand gains, leaving NHD worse off. Option 2 is the strategically safer choice and should be combined with aggressive short-term cost management (e.g., reducing temporary staff or renegotiating the facility lease) to bridge the 18-month gap. Alternatively, a candidate may argue that without addressing the volume problem urgently, NHD''s above-average margins are unsustainable and Option 1''s revenue boost is essential for survival. Accept any substantiated judgement. A conclusion must be present and linked to specific NHD context data to access Level 3+.

Level descriptors: Same as Q1.', NULL, 51, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10m-3', 'Ratio Analysis', 'HL', 'ten_marker', 10, 'Solaris Fitness Group (SFG) is a privately owned chain of premium gym clubs operating 12 locations across Australia. Founded in 2014 by CEO Mia Nakamura, SFG differentiates itself from budget gym competitors through high-end facilities, personalised coaching programmes, and a strong community-focused culture. Membership fees are significantly higher than the market average, but SFG has historically justified this premium through exceptional member experience and low churn rates.

Over the past 18 months, SFG has seen its financial position deteriorate. The company took on $2.4 million in long-term debt to fund the opening of four new locations in 2023, and while these locations are growing their membership bases, they have not yet reached breakeven. Meanwhile, three of SFG''s older, established locations are facing increased competition from a new budget gym chain that has opened directly nearby, resulting in membership cancellations and declining average revenue per member.

SFG''s finance director, James Okafor, is particularly concerned about the company''s gearing ratio and its impact on investor confidence. He has presented the board with two options:

Option 1: Close the two lowest-performing new locations (both opened in 2023 and both operating at a loss), crystallising a one-off write-off of approximately $320,000 in non-current assets, but reducing ongoing losses and freeing up management capacity to focus on profitable locations.

Option 2: Issue $1,000,000 in new share capital to three existing investors who have expressed interest in increasing their stakes, using the proceeds to partially repay long-term debt and fund a targeted marketing campaign to defend market share at the three threatened locations.

Selected financial data for SFG for the year ended 30 June 2025:

Sales revenue: $8,400k | Cost of sales: $2,520k | Gross profit: $5,880k | Expenses: $5,460k | Profit before interest and tax: $420k | Interest: $192k | Profit before tax: $228k | Tax: $68k | Profit for the period: $160k | Total equity: $3,200k | Non-current liabilities: $2,400k | Current assets: $620k | Stock: $85k | Current liabilities: $710k

Evaluate the two options available to SFG''s board to improve the company''s financial position.', 'Candidates should demonstrate understanding of gearing, liquidity, and profitability concepts and apply them to the SFG context.

Relevant calculations (not required but rewarded if used):
• Profit margin = (420 / 8,400) × 100 = 5% — very thin for a premium fitness business.
• ROCE: Capital employed = 2,400 + 3,200 = $5,600,000. ROCE = (420 / 5,600) × 100 = 7.5%.
• Gearing = (2,400 / 5,600) × 100 = 42.86% — approaching the high-gearing threshold of 50%.
• Current ratio = 620 / 710 = 0.87:1 — below the ideal of 2:1, indicating a liquidity problem.
• Acid test = (620 − 85) / 710 = 535 / 710 = 0.75:1 — below the 1:1 benchmark.
• Interest represents 192/420 × 100 = 45.7% of PBIT — a very high proportion, illustrating the burden of debt.

Option 1 — Close two underperforming locations:

Advantages:
• Eliminating ongoing losses from the two new locations immediately reduces cash outflows and improves net cash flow, addressing SFG''s below-ideal liquidity position (current ratio 0.87:1).
• Management focus can be redirected to the 10 remaining, more profitable locations, potentially improving service quality and defending membership at the threatened locations.
• Reduced operational scope may allow some fixed cost savings (staff, equipment leases) that improve the thin 5% profit margin going forward.
• Stopping the losses prevents further deterioration of the equity position and gearing ratio.

Disadvantages:
• The $320,000 asset write-off will significantly reduce profit for the period, potentially pushing SFG into a loss for the year — this would alarm investors and lenders and could trigger loan covenant breaches.
• Closing newly opened locations sends a negative signal to the market about SFG''s strategic execution and management credibility, potentially deterring future investment.
• Members at the closed locations will be displaced and may not transfer to other SFG sites — SFG could lose those memberships entirely to competitors, reducing revenue.
• The gearing ratio is not directly improved by Option 1 — the long-term debt of $2.4 million remains, and interest payments of $192,000 per year continue to consume nearly half of PBIT.

Option 2 — Issue $1,000,000 in new share capital:

Advantages:
• If $1,000,000 in equity is raised and used to repay debt, non-current liabilities could fall from $2,400,000 to $1,400,000. New gearing = approximately 28–30%, well below the 50% danger threshold and a significant improvement.
• Reduced debt means lower annual interest payments, directly improving profit margin. If interest falls from $192,000 to approximately $112,000, profit before tax rises by $80,000 — a 35% improvement.
• The remaining proceeds invested in marketing could defend membership at the three threatened locations, protecting revenue.
• Improved gearing and profitability could restore investor confidence and improve SFG''s credit rating, lowering future borrowing costs.

Disadvantages:
• Issuing new shares to existing investors dilutes Mia Nakamura''s ownership stake, potentially reducing her control over strategic decisions — a significant concern given SFG''s culture-driven business model depends heavily on her vision.
• The investors increasing their stakes will expect a share of future profits — if SFG''s expansion succeeds, the equity cost could far exceed the interest savings in the long run.
• The marketing campaign''s effectiveness is uncertain — if competitor gyms continue to undercut SFG on price, no amount of marketing may prevent membership churn at the threatened locations.
• The share issue does not resolve the operating losses at the two new locations — SFG will continue to absorb those costs, limiting the overall improvement in financial performance.

Evaluation/Judgement:
SFG faces two simultaneous problems: a gearing/liquidity problem and an operational losses problem. Option 1 addresses operational losses but leaves the debt burden intact and creates a damaging one-off write-off. Option 2 directly addresses gearing and provides marketing resources but does not resolve the loss-making locations. A strong candidate will recognise that the two options are not mutually exclusive — ideally, SFG should close the underperforming locations AND issue new equity.

Forced to choose between the two in isolation, Option 2 is arguably the stronger strategic choice: the gearing improvement and interest saving are structural and long-lasting, whereas closing two locations is a short-term operational fix that does not address SFG''s core debt problem. However, Option 2 requires investor confidence in SFG''s future — if the marketing campaign fails to defend the threatened locations, SFG''s revenue could continue to decline, making even the improved debt position unsustainable. Accept any substantiated judgement linked to SFG''s specific data.

Level descriptors: Same as Q1.', NULL, 52, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10m-4', 'Ratio Analysis', 'HL', 'ten_marker', 10, 'Meridian Publishing House (MPH) is a medium-sized independent publisher based in Toronto, Canada. MPH publishes fiction and non-fiction books across three divisions: Adult Trade, Children''s, and Academic. The company has been in operation for 28 years and has built a respected reputation for high-quality editorial standards and author relationships. MPH is a private limited company with four shareholders, including founder and CEO Clara Bouchard, who holds a 55% majority stake.

The publishing industry has undergone significant structural change in recent years. E-book and audiobook sales have grown rapidly, while physical book sales through traditional bookstore channels have declined. MPH has been slow to adapt — its e-book catalogue covers only 40% of its titles, and it has no audiobook offering. Meanwhile, a key title in the Children''s division that accounted for 18% of total revenue for two consecutive years has now moved out of its peak sales period, and no equivalent title has emerged to replace it.

MPH''s CFO, Antoine Dupont, has identified a significant deterioration in the company''s working capital position. MPH pays its printing suppliers within 30 days but allows retail bookstores 90-day payment terms — a legacy arrangement from when MPH needed to build retail relationships. This mismatch is placing increasing pressure on cash flow.

Antoine has proposed two options to the board:

Option 1: Renegotiate payment terms with the top 20 retail bookstore accounts, reducing debtor days from the current 82 days to 45 days, offering a 1.5% early payment discount as an incentive. Antoine estimates this would free up approximately $280,000 in working capital.

Option 2: Invest $400,000 in building a full audiobook production capability, converting the entire back catalogue over 24 months and launching a subscription-based audiobook service directly to consumers. The CFO projects this would generate $350,000 in new annual revenue by Year 3, with modest cash flow in Years 1 and 2.

Selected financial data for MPH for the year ended 31 December 2024:

Sales revenue: $4,200k | Cost of sales: $2,310k | Gross profit: $1,890k | Expenses: $1,540k | Profit before interest and tax: $350k | Interest: $65k | Tax: $57k | Profit for the period: $228k | Debtors: $945k | Creditors: $193k | Cash: $48k | Stock: $310k | Current liabilities: $380k | Non-current liabilities: $520k | Total equity: $1,640k

Evaluate the two options available to MPH to improve its financial position.', 'Candidates should demonstrate understanding of working capital, liquidity, cash flow, and investment appraisal concepts, applying them to the MPH context.

Relevant calculations (not required but rewarded if used):
• Current assets = 945 + 48 + 310 = $1,303,000.
• Current ratio = 1,303 / 380 = 3.43:1 — appears healthy on the surface.
• Acid test = (1,303 − 310) / 380 = 993 / 380 = 2.61:1 — also appears strong.
• However, debtors of $945,000 represent 72.6% of current assets — the ratios are flattering but mask that most current assets are tied up in slow-paying debtors.
• Debtor days = (945 / 4,200) × 365 = 82.1 days — confirmed.
• Creditor days = (193 / 2,310) × 365 = 30.5 days — MPH pays suppliers in ~30 days but waits 82 days to collect from retailers — a significant working capital cycle mismatch.
• Gearing = 520 / (520 + 1,640) × 100 = 24.1% — low gearing, healthy.
• Profit margin = (350 / 4,200) × 100 = 8.33%.

Option 1 — Renegotiate debtor payment terms:

Advantages:
• Reducing debtor days from 82 to 45 days would unlock approximately $280,000 in working capital — equivalent to nearly 6 times MPH''s current cash balance of $48,000. This would dramatically improve MPH''s real liquidity and reduce reliance on any overdraft facility.
• New debtor days of 45 would be much more aligned with the 30-day creditor payment cycle, significantly improving the working capital cycle mismatch that is currently the root cause of cash flow stress.
• The 1.5% early payment discount is a relatively low cost for the benefit received — at $4,200,000 revenue, even if all retail accounts took the discount, the maximum annual cost is approximately $63,000, likely offset by reduced financing costs and improved cash position.
• This is a low-risk, operationally straightforward intervention — no new capabilities, staff, or technology are required.

Disadvantages:
• Bookstore accounts that have benefited from 90-day terms for years may resist the change and seek alternative publishers who maintain more favourable terms — MPH risks losing key distribution relationships at a time when physical retail is already declining.
• The 1.5% discount permanently reduces revenue per sale for accounts that take it up — if all 20 accounts claim the discount on all orders, the financial benefit of improved cash flow may be partially offset.
• This option does not address MPH''s underlying structural challenge of declining physical book sales and the absence of an audiobook offering — it is a cash flow fix, not a revenue growth strategy.

Option 2 — Invest in audiobook capability:

Advantages:
• Audiobooks are the fastest-growing format in publishing, with strong consumer adoption driven by commuting, fitness, and convenience. Entering this market positions MPH for long-term revenue diversification that reduces dependence on declining physical sales.
• A direct-to-consumer subscription service would improve MPH''s margin per unit sold compared to retail channels, and recurring subscription revenue is more predictable and financially stable than one-off book sales.
• Converting the full back catalogue creates a substantial, durable asset — once produced, audiobook files generate revenue with minimal additional cost.
• MPH''s strong author relationships and editorial reputation are genuine competitive advantages in attracting authors who want high-quality audiobook production.

Disadvantages:
• The $400,000 investment is very large relative to MPH''s current cash balance of $48,000. With low gearing (24.1%), MPH could borrow, but this would increase the interest burden on an already modest profit margin of 8.33%.
• The 24-month production timeline and 3-year revenue projection mean MPH must sustain its current financial pressure for a considerable period before the investment pays off — a significant risk given the already tight cash position.
• The audiobook subscription market is competitive, with Audible (Amazon) dominating. An independent publisher''s subscription service may struggle to achieve the marketing scale and consumer awareness needed to reach the $350,000 revenue projection.
• Production of quality audiobooks requires specialist skills (audio engineers, voice talent, project management) that MPH does not currently possess — building this capability in-house carries execution risk.

Evaluation/Judgement:
The two options address fundamentally different problems. Option 1 addresses an immediate, structural cash flow problem caused by a debtor/creditor mismatch that should arguably have been corrected years ago — it is low-risk, fast-acting, and self-funding. Option 2 addresses the longer-term strategic challenge of revenue diversification in a changing industry — it is high-risk, slow-acting, and requires significant capital that MPH does not currently have in cash.

A strong answer might argue that Option 1 should be prioritised as an urgent financial necessity — with only $48,000 in cash, MPH is one large late payment from a liquidity crisis. Once working capital is stabilised, Option 2 can be pursued from a position of financial security. Candidates may also note that Option 1 could partially fund Option 2 — the $280,000 freed up from better debtor management could contribute meaningfully to the $400,000 audiobook investment.

Alternatively, a candidate may argue that Option 2 is the more strategically important choice — without revenue diversification, MPH''s profitability will continue to decline as physical sales shrink, and no amount of working capital management will prevent eventual financial distress. In this case, the candidate should acknowledge the need for loan capital to bridge the cash gap. Accept any substantiated judgement clearly linked to MPH''s specific financial data.

Level descriptors: Same as Q1.', NULL, 53, datetime('now'), datetime('now'));

INSERT OR IGNORE INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order, created_at, updated_at)
VALUES ('wr10m-5', 'Ratio Analysis', 'HL', 'ten_marker', 10, 'BlueLine Logistics (BLL) is a freight and distribution company based in Manchester, United Kingdom, providing road-based logistics services to manufacturers, retailers, and e-commerce businesses. BLL operates a fleet of 85 heavy goods vehicles (HGVs) and employs 210 staff, including drivers, warehouse operatives, and administrative personnel. The company was founded in 2001 and has grown steadily, primarily through contracts with three major retail clients that together account for 71% of BLL''s annual revenue.

The logistics industry in the UK is currently experiencing significant disruption. Fuel costs rose sharply over the past two years and remain elevated, directly increasing BLL''s variable costs per delivery. A national shortage of qualified HGV drivers has forced BLL to offer higher wages and signing bonuses to retain and recruit drivers, significantly increasing fixed labour costs. At the same time, BLL''s three major retail clients are applying downward pressure on contract renewal prices, citing competition from larger national logistics providers.

BLL''s CEO, Richard Fenn, has identified two priorities: reducing cost per delivery and reducing client concentration risk. He is considering the following options:

Option 1: Invest $1,800,000 in replacing 25 of the oldest HGVs in the fleet with new electric vehicles (EVs). Richard estimates the EVs would reduce fuel and maintenance costs by approximately $240,000 per year once fully operational. The vehicles would be purchased using a combination of $600,000 from retained earnings and a $1,200,000 long-term loan at 5.5% interest over 8 years.

Option 2: Allocate $300,000 to a dedicated sales and business development team to actively pursue contracts with e-commerce and pharmaceutical clients, targeting smaller accounts to diversify away from the three major retail clients. Richard estimates this could generate $950,000 in new annual revenue within 2 years, though this is uncertain and dependent on competitive tender outcomes.

Selected financial data for BLL for the year ended 31 December 2025:

Sales revenue: $12,600k | Cost of sales: $8,820k | Gross profit: $3,780k | Expenses: $2,940k | Profit before interest and tax: $840k | Interest: $145k | Tax: $139k | Profit for the period: $556k | Retained earnings: $1,240k | Non-current liabilities: $980k | Total equity: $3,860k | Current assets: $1,420k | Stock: $210k | Current liabilities: $860k | Industry average profit margin: 8%

Evaluate the two strategic options available to Richard to improve BLL''s financial performance and reduce business risk.', 'Candidates should demonstrate understanding of relevant financial and business management concepts — investment appraisal, sources of finance, gearing, profitability, and risk — and apply them specifically to the BLL context.

Relevant calculations (not required but rewarded if used):
• Profit margin = (840 / 12,600) × 100 = 6.67% — below the 8% industry average.
• GPM = (3,780 / 12,600) × 100 = 30%.
• ROCE: Capital employed = 980 + 3,860 = $4,840,000. ROCE = (840 / 4,840) × 100 = 17.36%.
• Current ratio = 1,420 / 860 = 1.65:1 — below ideal of 2:1.
• Acid test = (1,420 − 210) / 860 = 1,210 / 860 = 1.41:1 — acceptable.
• Gearing = 980 / 4,840 × 100 = 20.25% — low, significant borrowing headroom available.
• Annual interest on new loan = $1,200,000 × 5.5% = $66,000. New total interest = approximately $211,000. New profit before tax = approximately $629,000.
• If $240,000 cost saving is achieved, new PBIT = approximately $1,080,000, profit margin = approximately 8.57% — above industry average.

Option 1 — EV fleet investment:

Advantages:
• The $240,000 annual saving in fuel and maintenance costs directly improves BLL''s cost of sales, addressing the core margin problem. If the saving is achieved, the profit margin could rise from 6.67% to approximately 8.57%, surpassing the 8% industry average.
• Electric vehicles insulate BLL from future fuel price volatility, which has been a major source of financial unpredictability. This improves the reliability of cash flow forecasting.
• With current gearing of only 20.25%, BLL has significant capacity to absorb the $1,200,000 additional loan without approaching high-gearing territory. New gearing = (980 + 1,200) / (4,840 + 1,200) = 2,180 / 6,040 = 36.1% — still well below 50%.
• EV adoption may strengthen BLL''s competitive positioning with environmentally conscious clients and could be a requirement for contract renewals with retailers who have net-zero commitments.
• Using $600,000 of retained earnings reduces the loan required, limiting additional interest burden.

Disadvantages:
• The additional annual interest of $66,000 on the new loan partially offsets the $240,000 cost saving in the short term, meaning the net profit improvement is approximately $174,000 rather than the full $240,000.
• EV HGV technology is less mature than conventional vehicles — reliability, charging infrastructure coverage on long-haul routes, and range limitations could introduce operational disruptions that offset maintenance savings.
• The investment does not address BLL''s client concentration risk — 71% revenue dependency on three clients remains, meaning a single contract loss could be devastating regardless of cost improvements.
• Using $600,000 of retained earnings will reduce BLL''s equity and worsen the current ratio from an already below-ideal 1.65:1 — liquidity could become a concern.

Option 2 — Sales team and revenue diversification:

Advantages:
• Reducing client concentration from 71% to a lower level is arguably the most important risk management priority for BLL. A single contract termination from one major retail client could eliminate 20–25% of revenue overnight — diversification directly protects long-term financial stability.
• The pharmaceutical and e-commerce sectors offer strong growth prospects and tend to require more frequent, time-sensitive deliveries, which may support higher contract pricing and better margins than bulk retail logistics.
• The $300,000 investment is substantially smaller than the $1,800,000 EV investment, preserving more of BLL''s retained earnings and maintaining a better liquidity position.
• A dedicated business development team builds a long-term commercial capability that continues to generate new revenue beyond the initial 2-year projection.

Disadvantages:
• The $950,000 revenue projection is highly uncertain — it depends on winning competitive tenders against established logistics providers with greater scale and potentially lower costs. BLL has no guaranteed return on the $300,000 investment.
• Additional revenue without cost management does not directly fix the below-industry profit margin of 6.67%. If new contracts are won at thin margins (to be competitive), revenue growth may not translate into meaningful profit improvement.
• A new sales team adds to BLL''s fixed cost base — if the revenue target is not met in Year 2, BLL will have incurred $300,000 in costs with limited financial return.
• The two-year timeline means BLL remains exposed to client concentration risk for at least another 24 months during which any of the three major clients could choose not to renew contracts.

Evaluation/Judgement:
Both options address real and important problems at BLL, but they address different dimensions of risk. Option 1 directly improves profitability metrics — bringing the profit margin above the industry average — and hedges against fuel price risk. Option 2 addresses existential concentration risk but with uncertain financial returns. A strong candidate will recognise that BLL''s low gearing (20.25%) means it has financial capacity to pursue both options simultaneously or sequentially.

Forced to prioritise, a candidate might argue that Option 1 should be implemented first, as the financial improvement is more predictable (the cost savings are largely within BLL''s control) and the gearing implications are manageable. Option 2 can follow once the cost savings begin to flow through. However, a candidate may equally argue that concentration risk is the more urgent existential threat — if a major retail client cancels during a period when BLL is servicing a large new loan, the combination could be devastating. In that case, the lower-capital Option 2 is the more prudent immediate step.

A top-band response will integrate the financial data throughout the argument, acknowledge the limitations of the available information (e.g. we do not know the contract renewal dates for the three major clients, or the detailed EV reliability data for BLL''s specific routes), and arrive at a justified conclusion that explicitly references BLL''s context. Accept any substantiated judgement.

Level descriptors: Same as Q1.', NULL, 54, datetime('now'), datetime('now'));
