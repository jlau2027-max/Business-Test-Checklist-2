import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─── localStorage helpers ──────────────────────────────────────────────────
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST DATA
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_SECTIONS = [
  { id: "sources", title: "3.1 – Sources of Finance", color: "#4F46E5", items: ["Difference between internal & external sources of finance","Short, medium & long-term finance — matched to purpose","Equity vs debt financing (pros & cons)","Why a business chooses one source over another","Retained profit, share capital, debentures, venture capital (HL)","Loan capital vs overdraft vs trade credit"] },
  { id: "costs", title: "3.2 – Costs & Revenues", color: "#7C3AED", items: ["Fixed, variable, semi-variable, direct & indirect costs","Total Revenue and Average Revenue","Contribution per unit = Selling Price – Variable Cost","Total Contribution = Contribution per unit × Quantity","Total Costs = Fixed Costs + Total Variable Costs","Profit = Total Revenue – Total Costs","Difference between profit and cash flow"] },
  { id: "cashflow", title: "3.3 – Cash Flow", color: "#0891B2", items: ["Construct and interpret a cash flow forecast","Net Cash Flow = Cash Inflows – Cash Outflows","Closing Balance = Opening Balance + Net Cash Flow","Causes of cash flow problems","Solutions: overdraft, debt factoring, sale of assets, better credit control","Difference between cash flow and profit (common exam trap!)"] },
  { id: "accounts", title: "3.4 – Final Accounts", color: "#059669", items: ["Income Statement layout: Revenue → Gross Profit → Net Profit","Balance Sheet structure: Assets = Equity + Liabilities","Current vs non-current assets and liabilities","Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life (HL)","Reducing balance depreciation = Net Book Value × Rate % (HL)","Intangible assets: goodwill, patents, brand value (HL)"] },
  { id: "ratios", title: "3.5 – Profitability & Liquidity Ratios", color: "#D97706", items: ["Gross Profit Margin = (Gross Profit ÷ Revenue) × 100 ✦ IN BOOKLET","Net Profit Margin = (Net Profit ÷ Revenue) × 100 ✦ IN BOOKLET","ROCE = (Net Profit ÷ Capital Employed) × 100 ✦ IN BOOKLET","Current Ratio = Current Assets ÷ Current Liabilities (ideal ~2:1) ✦ IN BOOKLET","Acid Test = (CA – Inventory) ÷ CL (ideal ~1:1) ✦ IN BOOKLET","Interpret ratios in context — not just calculate them!"] },
  { id: "efficiency", title: "3.6 – Efficiency Ratios (HL Only)", color: "#DC2626", items: ["Stock Turnover (times) = Cost of Sales ÷ Average Stock ✦ IN BOOKLET","Stock Turnover (days) = (Average Stock ÷ Cost of Sales) × 365 ✦ IN BOOKLET","Average Stock = (Opening Stock + Closing Stock) ÷ 2 ✦ IN BOOKLET","Debtor Days = (Debtors ÷ Revenue) × 365 ✦ IN BOOKLET","Creditor Days = (Creditors ÷ Cost of Sales) × 365 ✦ IN BOOKLET","Gearing = (Non-current Liabilities ÷ Capital Employed) × 100 ✦ IN BOOKLET","High vs low gearing — implications for risk and investment"] },
  { id: "investment", title: "3.7 – Investment Appraisal", color: "#7C3AED", items: ["Payback Period — calculate and interpret","ARR = (Total Returns – Capital Cost) ÷ Years ÷ Capital Cost × 100 ✦ IN BOOKLET","NPV = Sum of discounted cash flows – Initial Investment ✦ IN BOOKLET (HL)","Discount factors/tables are provided in exam","Compare methods: qualitative vs quantitative factors","Limitations of each investment appraisal method"] },
  { id: "budgets", title: "3.8 – Budgets & Variance Analysis", color: "#0891B2", items: ["Variance = Actual – Budgeted ✦ MEMORISE","Favourable variance: better than expected","Adverse variance: worse than expected","⚠️ For costs: Actual < Budgeted = Favourable","⚠️ For revenue: Actual > Budgeted = Favourable","Zero-based vs incremental budgeting (pros & cons)","Limitations of budgets"] },
  { id: "breakeven", title: "5.5 – Breakeven Analysis", color: "#059669", items: ["Breakeven Output = Fixed Costs ÷ Contribution per unit ✦ MEMORISE","Margin of Safety = Actual Output – Breakeven Output ✦ MEMORISE","Target Profit Output = (FC + Target Profit) ÷ Contribution ✦ MEMORISE","Draw and interpret breakeven charts","Limitations of breakeven analysis","How changes in price/costs affect the breakeven point"] },
  { id: "bmt", title: "BMT Tools", color: "#D97706", items: ["Business Plan — components, purpose, link to securing finance","Ansoff Matrix — 4 strategies, risk levels, finance implications","STEEPLE — apply each factor to a business scenario","Force Field Analysis — driving vs restraining forces (Lewin)","Apply BMT tools to justify business decisions in context"] },
  { id: "formulas", title: "🧠 Formulas to MEMORISE (Not in Booklet)", color: "#DC2626", items: ["Contribution per unit = Selling Price – Variable Cost per unit","Total Contribution = Contribution per unit × Quantity","Total Costs = Fixed Costs + Total Variable Costs","Profit = Total Revenue – Total Costs","Breakeven Output = Fixed Costs ÷ Contribution per unit","Margin of Safety = Actual Output – Breakeven Output","Target Profit Output = (FC + Target Profit) ÷ Contribution per unit","Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life","Reducing balance = Net Book Value × Depreciation Rate %","Net Cash Flow = Cash Inflows – Cash Outflows","Closing Balance = Opening Balance + Net Cash Flow","Variance = Actual – Budgeted"] },
  { id: "examtips", title: "✍️ Exam Technique", color: "#4F46E5", items: ["Define key terms at the start of longer answers","Always use the business context given — never answer generically","For evaluate/justify: give both sides then make a justified conclusion","Show ALL working in calculations — method marks are available","Interpret ratios — don't just calculate, explain what it means","Link answers back to the specific business in the question"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD DATA
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARD_CATEGORIES = [
  { id: "costs-revenue", label: "Costs & Revenue", color: "#6366F1", cards: [
    { term: "Fixed Costs", def: "Costs that do not change with the level of output, e.g., loan repayments and management salaries.", formula: null },
    { term: "Variable Costs", def: "Costs that change with the level of output — they rise when output or sales increase, e.g., raw materials and packaging costs.", formula: null },
    { term: "Total Costs (TC)", def: "The aggregate amount of money spent on the output of a business.", formula: "TC = TFC + TVC" },
    { term: "Contribution per Unit", def: "The amount each unit sold contributes toward covering fixed costs and then profit.", formula: "Contribution per unit = Price − Variable cost per unit" },
    { term: "Total Contribution", def: "The total amount contributed toward fixed costs and profit across all units sold.", formula: "Total contribution = Contribution per unit × Output" },
    { term: "Average Costs (Unit Costs)", def: "The cost per unit of output.", formula: "AC = TC / Q" },
    { term: "Sales Revenue (Total Revenue)", def: "The money (income) received by a business from the sale of goods and/or services.", formula: "TR = P × Q" },
    { term: "Direct Costs", def: "Costs associated with the output or sale of a certain good or service — clearly identifiable output-related expenditures.", formula: null },
    { term: "Indirect Costs (Overheads)", def: "Costs not easily identifiable with the sale or output of a specific good, service, or business operation.", formula: null },
    { term: "Cost of Sales (COS)", def: "The direct costs of production.", formula: "COS = Opening stock + Purchases − Closing stock" },
  ]},
  { id: "cashflow", label: "Cash Flow", color: "#0EA5E9", cards: [
    { term: "Net Cash Flow", def: "The numerical difference between an organisation's total cash inflows and its total cash outflows, per time period.", formula: "Net cash flow = Cash inflows − Cash outflows" },
    { term: "Opening Balance", def: "The value of cash held by a business at the start of a trading period.", formula: "Opening balance = Closing balance of previous period" },
    { term: "Closing Balance", def: "The value of cash held by a business at the end of a trading period.", formula: "Closing balance = Opening balance + Net cash flow" },
    { term: "Bad Debt", def: "Occurs when a debtor is unable to pay outstanding invoices to the business, reducing cash inflows for the seller.", formula: null },
    { term: "Debt Factoring", def: "Selling outstanding invoices to a third party at a discount in exchange for immediate cash — one of the fastest solutions to cash flow problems.", formula: null },
    { term: "Cumulative Net Cash Flow", def: "The sum of an investment project's net cash flows for a particular year plus all previous years.", formula: "Cumulative NCF = NCF in previous year(s) + NCF of current year" },
  ]},
  { id: "final-accounts", label: "Final Accounts", color: "#10B981", cards: [
    { term: "Gross Profit", def: "The profit from a firm's everyday trading activities.", formula: "Gross profit = Sales revenue − Cost of Sales" },
    { term: "Gross Profit Margin (GPM)", def: "A profitability ratio measuring gross profit as a percentage of sales revenue. ✦ IN BOOKLET", formula: "GPM = (Gross profit / Sales revenue) × 100" },
    { term: "Profit Margin", def: "A profitability ratio measuring a firm's overall profit as a percentage of sales revenue. ✦ IN BOOKLET", formula: "= (Profit before interest and tax / Sales revenue) × 100" },
    { term: "Profit Before Interest and Tax", def: "The value of a firm's profit before deducting interest payments on loans and taxes.", formula: "= Gross profit − Expenses" },
    { term: "Retained Profit", def: "Earnings after all costs and dividends — reinvested into the business as an internal source of finance.", formula: "= Profit after interest and tax − Dividends" },
    { term: "Working Capital", def: "Money available for the day-to-day running of a business.", formula: "= Current assets − Current liabilities" },
    { term: "Straight-Line Depreciation", def: "Spreads the depreciation of a non-current asset evenly over its useful life — value falls by the same amount each year.", formula: "= (Purchase cost − Residual value) / Useful lifespan" },
    { term: "Net Book Value (NBV)", def: "The current value of a non-current asset after accumulated depreciation.", formula: "NBV = Original cost − Accumulated depreciation" },
    { term: "Capital Employed", def: "The value of funds used to operate the business and generate a financial return. ✦ IN BOOKLET", formula: "= Non-current liabilities + Equity" },
    { term: "Equity", def: "The value of the owners' stake in the business.", formula: "= Share capital + Retained earnings" },
  ]},
  { id: "ratios", label: "Ratio Analysis", color: "#F59E0B", cards: [
    { term: "ROCE", def: "Measures a firm's efficiency and profitability in relation to its capital employed. ✦ IN BOOKLET", formula: "ROCE = (Profit before interest and tax / Capital employed) × 100" },
    { term: "Current Ratio", def: "Measures ability to meet short-term debts. Ideal ~2:1. ✦ IN BOOKLET", formula: "= Current assets / Current liabilities" },
    { term: "Acid Test Ratio", def: "Measures ability to pay short-term debts WITHOUT selling stock. Ideal ~1:1. ✦ IN BOOKLET", formula: "= (Current assets − Stock) / Current liabilities" },
    { term: "Stock Turnover (Days) — HL", def: "Average days to sell stock. ✦ IN BOOKLET", formula: "= (Average stock / Cost of sales) × 365" },
    { term: "Stock Turnover (Times) — HL", def: "How many times stock is replaced per year. ✦ IN BOOKLET", formula: "= Cost of sales / Average stock" },
    { term: "Debtor Days — HL", def: "Average days to collect debt from customers. ✦ IN BOOKLET", formula: "= (Debtors / Total sales revenue) × 365" },
    { term: "Creditor Days — HL", def: "Average days taken to repay creditors. ✦ IN BOOKLET", formula: "= (Creditors / Cost of sales) × 365" },
    { term: "Gearing Ratio — HL", def: "The proportion of capital employed funded by external debt. Above 50% = high gearing = higher financial risk. ✦ IN BOOKLET", formula: "= (Non-current liabilities / Capital employed) × 100" },
    { term: "Average Stock", def: "Used in efficiency ratio calculations. ✦ IN BOOKLET", formula: "= (Opening stock + Closing stock) / 2" },
  ]},
  { id: "investment", label: "Investment Appraisal", color: "#8B5CF6", cards: [
    { term: "Payback Period (PBP)", def: "The time taken to recover the initial investment from the net cash flows generated.", formula: "= Investment cost / Contribution per month (if even flows)" },
    { term: "Average Rate of Return (ARR)", def: "Average annual profit as a percentage of the initial investment. ✦ IN BOOKLET", formula: "ARR = [(Total returns − Capital cost) ÷ Years] / Capital cost × 100" },
    { term: "Net Present Value (NPV) — HL", def: "Calculates the real value of an investment by discounting future cash flows. A positive NPV means the project adds value. ✦ IN BOOKLET", formula: "NPV = Sum of present values − Cost of investment" },
  ]},
  { id: "budgets", label: "Budgets & Variance", color: "#EF4444", cards: [
    { term: "Variance", def: "A discrepancy between the planned (budgeted) item and the actual amount.", formula: "Variance = Actual value − Budgeted value" },
    { term: "Favourable Variance", def: "Profits are higher than expected — due to lower costs and/or higher revenues than budgeted.", formula: null },
    { term: "Adverse Variance", def: "Profits are lower than expected — due to higher costs and/or lower revenues than budgeted.", formula: null },
    { term: "Zero-Based Budgeting", def: "All budget holders must justify each dollar of spending before funds are released — starts from zero each period.", formula: null },
    { term: "⚠️ Variance Rule — Costs", def: "For COSTS: Actual < Budgeted = FAVOURABLE (spent less than planned).", formula: null },
    { term: "⚠️ Variance Rule — Revenue", def: "For REVENUE: Actual > Budgeted = FAVOURABLE (earned more than planned).", formula: null },
  ]},
  { id: "breakeven", label: "Breakeven", color: "#14B8A6", cards: [
    { term: "Break-Even Quantity (BEQ)", def: "The quantity of sales required for a firm to reach break-even (cover all costs).", formula: "BEQ = Total fixed costs / Contribution per unit" },
    { term: "Margin of Safety", def: "The amount by which actual output exceeds the break-even quantity.", formula: "= Actual output − Break-even quantity" },
    { term: "Target Profit Quantity", def: "The output needed to achieve a specific profit target.", formula: "= (Fixed costs + Target profit) / Contribution per unit" },
    { term: "Target Price", def: "The price needed to break-even given current costs.", formula: "= AFC + AVC" },
    { term: "Break-Even Analysis", def: "A tool to determine the level of sales needed to cover all costs. Limitations: assumes constant price/costs, ignores quality, and is static.", formula: null },
  ]},
  { id: "sources", label: "Sources of Finance", color: "#F97316", cards: [
    { term: "Internal Sources of Finance", def: "Finance from within the organisation — retained profit, sale of assets, owner's savings.", formula: null },
    { term: "External Sources of Finance", def: "Finance from outside the organisation — banks, investors, government, crowdfunding.", formula: null },
    { term: "Share Capital", def: "Finance raised through issuing shares on a stock exchange. Also known as equity capital.", formula: null },
    { term: "Loan Capital", def: "Borrowed funds from financial lenders such as commercial banks. Must be repaid with interest.", formula: null },
    { term: "Trade Credit", def: "Enables a business to receive goods/services now but pay at a later date.", formula: null },
    { term: "Overdraft", def: "A banking service allowing withdrawal of more money than exists in the account — short-term finance.", formula: null },
    { term: "Crowdfunding", def: "Raising finance by getting small amounts from a large number of people, often via online platforms.", formula: null },
    { term: "Business Angels", def: "Wealthy private individuals who invest their own money in high-growth potential ventures.", formula: null },
  ]},
  { id: "bmt", label: "BMT Tools", color: "#EC4899", cards: [
    { term: "Ansoff Matrix", def: "Four growth strategies: Market Penetration (existing/existing), Market Development (existing product/new market), Product Development (new product/existing market), Diversification (new/new — highest risk).", formula: null },
    { term: "STEEPLE", def: "Framework examining external macro factors: Social, Technological, Economic, Environmental, Political, Legal, Ethical.", formula: null },
    { term: "Force Field Analysis", def: "Lewin's tool mapping driving forces (for change) vs restraining forces (against change). Change succeeds when driving forces outweigh restraining forces.", formula: null },
    { term: "Business Plan", def: "A formal document outlining objectives, strategies, and financial forecasts. Used to secure finance from investors or lenders.", formula: null },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// MCQ QUESTIONS — unique IDs, no overlap with written
// ─────────────────────────────────────────────────────────────────────────────
const MCQ_QUESTIONS = [
  { id:"mcq1", cat:"Costs & Revenue", difficulty:"SL", q:"A product sells for $80. Variable cost per unit is $30. What is the contribution per unit?", options:["$30","$80","$50","$110"], answer:2, explanation:"Contribution per unit = Selling Price − Variable Cost = $80 − $30 = $50." },
  { id:"mcq2", cat:"Cash Flow", difficulty:"SL", q:"A business has an opening balance of $4,000, cash inflows of $9,000 and cash outflows of $11,500. What is the closing balance?", options:["$1,500","$2,500","−$1,500","$4,500"], answer:0, explanation:"Net cash flow = $9,000 − $11,500 = −$2,500. Closing balance = $4,000 − $2,500 = $1,500." },
  { id:"mcq3", cat:"Final Accounts", difficulty:"SL", q:"Which of the following is a CURRENT liability?", options:["Machinery","Mortgage (10-year)","Bank overdraft","Goodwill"], answer:2, explanation:"A bank overdraft is repayable within 12 months — it is a current liability. Machinery and goodwill are assets; a mortgage is a non-current liability." },
  { id:"mcq4", cat:"Final Accounts", difficulty:"HL", q:"A machine costs $60,000, has a residual value of $6,000, and a useful life of 9 years. What is the annual straight-line depreciation?", options:["$6,000","$7,333","$6,667","$60,000"], answer:0, explanation:"= (Cost − Residual value) / Useful life = ($60,000 − $6,000) / 9 = $54,000 / 9 = $6,000 per year." },
  { id:"mcq5", cat:"Ratio Analysis", difficulty:"SL", q:"A business has sales revenue of $400,000 and gross profit of $100,000. What is the gross profit margin?", options:["25%","40%","75%","100%"], answer:0, explanation:"GPM = (Gross profit / Sales revenue) × 100 = ($100,000 / $400,000) × 100 = 25%." },
  { id:"mcq6", cat:"Ratio Analysis", difficulty:"SL", q:"Current assets = $60,000. Stock = $25,000. Current liabilities = $30,000. What is the acid test ratio?", options:["2.0","1.17","0.83","1.5"], answer:1, explanation:"Acid test = (Current assets − Stock) / Current liabilities = ($60,000 − $25,000) / $30,000 = $35,000 / $30,000 = 1.17. Above the ideal 1:1 benchmark." },
  { id:"mcq7", cat:"Ratio Analysis (HL)", difficulty:"HL", q:"Non-current liabilities = $300,000. Capital employed = $750,000. What is the gearing ratio?", options:["25%","40%","60%","75%"], answer:1, explanation:"Gearing = (Non-current liabilities / Capital employed) × 100 = ($300,000 / $750,000) × 100 = 40%. Moderate gearing — below the 50% high-gearing threshold." },
  { id:"mcq8", cat:"Investment Appraisal", difficulty:"SL", q:"Which statement about NPV is CORRECT?", options:["A negative NPV means the project is profitable","NPV ignores the time value of money","A positive NPV means the investment adds value in today's money","NPV is simpler to calculate than payback period"], answer:2, explanation:"A positive NPV means the present value of future returns exceeds the initial cost — the project adds value in real money terms. NPV explicitly accounts for the time value of money." },
  { id:"mcq9", cat:"Budgets & Variance", difficulty:"HL", q:"Budgeted revenue was $60,000. Actual revenue was $54,000. What type of variance is this?", options:["Favourable variance of $6,000","Adverse variance of $6,000","Favourable variance of $54,000","No variance"], answer:1, explanation:"Variance = Actual − Budgeted = $54,000 − $60,000 = −$6,000. For revenue, actual < budgeted = ADVERSE variance." },
  { id:"mcq10", cat:"Budgets & Variance", difficulty:"HL", q:"Budgeted costs = $40,000. Actual costs = $36,000. What type of variance is this?", options:["Adverse variance of $4,000","Favourable variance of $4,000","Adverse variance of $36,000","No variance"], answer:1, explanation:"For costs: actual < budgeted = FAVOURABLE. The business spent $4,000 less than planned, which is positive." },
  { id:"mcq11", cat:"Breakeven", difficulty:"SL", q:"Fixed costs = $15,000. Selling price = $50. Variable cost = $20. What is the breakeven output?", options:["300 units","500 units","750 units","400 units"], answer:1, explanation:"Contribution = $50 − $20 = $30. BEQ = Fixed costs / Contribution = $15,000 / $30 = 500 units." },
  { id:"mcq12", cat:"BMT Tools", difficulty:"SL/HL", q:"A business sells existing products in a brand new overseas market. Which Ansoff strategy is this?", options:["Market Penetration","Product Development","Market Development","Diversification"], answer:2, explanation:"Market Development = existing product into a new market. This is medium-risk as the product is proven but the market is unfamiliar." },
  { id:"mcq13", cat:"Sources of Finance", difficulty:"SL", q:"Which is an INTERNAL source of finance?", options:["Bank loan","Retained profit","Venture capital","Crowdfunding"], answer:1, explanation:"Retained profit is generated from within the business — it is an internal source of finance. All others require a third party." },
  { id:"mcq14", cat:"Costs & Revenue", difficulty:"SL", q:"Factory rent is $5,000 per month regardless of output. What type of cost is this?", options:["Variable cost","Direct cost","Fixed cost","Semi-variable cost"], answer:2, explanation:"Factory rent does not change with the level of output — it is a fixed cost." },
  { id:"mcq15", cat:"Ratio Analysis (HL)", difficulty:"HL", q:"A business has debtor days of 65 and the industry average is 30. What does this suggest?", options:["The business collects payments faster than rivals","The business has too much stock","The business is very slow at collecting debts — a cash flow risk","The business has high gearing"], answer:2, explanation:"High debtor days (65 vs industry 30) means customers are taking far longer than average to pay. This ties up cash and increases cash flow risk. The business should tighten credit control." },
  // NEW WORKBOOK-BASED MCQs
  { id:"mcq16", cat:"Sources of Finance", difficulty:"SL", q:"Big Deal installed solar panels on a store roof. What type of expenditure is this?", options:["Revenue expenditure","Capital expenditure","Indirect cost","Trade credit"], answer:1, explanation:"Solar panels are a fixed asset lasting more than one year — this is capital expenditure. Revenue expenditure covers day-to-day running costs." },
  { id:"mcq17", cat:"Costs & Revenue", difficulty:"SL", q:"Dunn Auto Repair pays Keith a fixed salary of $5,000/month to handle accounting. This is best classified as:", options:["A variable cost","A direct cost","A fixed indirect cost","A revenue stream"], answer:2, explanation:"Keith's salary is fixed (doesn't change with output) and indirect (not directly tied to any single repair job) — making it a fixed indirect cost/overhead." },
  { id:"mcq18", cat:"Final Accounts", difficulty:"SL", q:"Crispy Collin's has trade creditors of $35,000 and a bank overdraft of $2,500. What are its total current liabilities?", options:["$35,000","$32,500","$37,500","$2,500"], answer:2, explanation:"Current liabilities = Bank overdraft + Trade creditors + Other short-term loans = $2,500 + $35,000 + $0 = $37,500." },
  { id:"mcq19", cat:"Ratio Analysis", difficulty:"SL", q:"Cedar Hill Books had a current ratio of 1.75:1 in Year 1, falling to 1.55:1 in Year 3. What does this trend suggest?", options:["Cedar Hill is becoming more profitable","Cedar Hill's liquidity is declining","Cedar Hill is taking on more long-term debt","Cedar Hill's gross profit margin is rising"], answer:1, explanation:"A falling current ratio indicates declining short-term liquidity — the business has less current assets relative to current liabilities each year." },
  { id:"mcq20", cat:"Investment Appraisal", difficulty:"SL", q:"On Air Sports paid $6m upfront for broadcast rights generating $2m/year for 8 years. What is the payback period?", options:["2 years","3 years","4 years","6 years"], answer:1, explanation:"$2m + $2m + $2m = $6m after 3 years. Payback period = 3 years exactly." },
  { id:"mcq21", cat:"Budgets & Variance", difficulty:"HL", q:"Müller Foods budgeted advertising costs of $1,000m but actual costs were $1,039m. What is this variance?", options:["$39m favourable","$39m adverse","$961m favourable","$1,039m adverse"], answer:1, explanation:"For costs: actual ($1,039m) > budgeted ($1,000m) = ADVERSE. Müller spent more on advertising than planned, hurting profit." },
  { id:"mcq22", cat:"Ratio Analysis (HL)", difficulty:"HL", q:"Fresh Cucina has non-current liabilities of $218m and total equity of $427m. What is its gearing ratio (approximately)?", options:["51%","34%","66%","22%"], answer:1, explanation:"Capital employed = Non-current liabilities + Equity = $218m + $427m = $645m. Gearing = $218m / $645m × 100 = 33.8% ≈ 34%." },
  { id:"mcq23", cat:"Cash Flow", difficulty:"SL", q:"Which strategy provides the FASTEST solution to a cash flow crisis?", options:["Launching a new product","Debt factoring","Applying for a long-term loan","Reducing prices by 5%"], answer:1, explanation:"Debt factoring — selling outstanding invoices to a third party immediately — provides the fastest cash injection. New products, long-term loans, and price cuts all take time to generate cash." },
  { id:"mcq24", cat:"Final Accounts", difficulty:"HL", q:"Using the units of production method, a machine costs $23,500, has a residual value of $1,000 and estimated life of 45,000 hours. What is depreciation per hour?", options:["$0.25","$0.50","$0.75","$1.00"], answer:1, explanation:"= (Cost − Residual value) / Estimated total units = ($23,500 − $1,000) / 45,000 = $22,500 / 45,000 = $0.50 per hour." },
  { id:"mcq25", cat:"Sources of Finance", difficulty:"SL", q:"Manuel at Hail Cheeser! is considering selling shares to friends and family. What must he do first?", options:["Register as a sole trader","Become a private limited company","Apply for crowdfunding","Obtain microfinance"], answer:1, explanation:"To sell shares to friends and family, Manuel must incorporate as a private limited company (Ltd). Sole traders and partnerships cannot issue shares." },
];

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN QUESTIONS — unique IDs, no overlap with MCQ
// ─────────────────────────────────────────────────────────────────────────────
const WRITTEN_QUESTIONS = [
  { id:"wr1", cat:"Costs & Revenue", difficulty:"SL", marks:3, q:"A business has total fixed costs of $18,000 and produces 600 units. Total variable costs are $12,000. Calculate the average cost per unit.", modelAnswer:"Total Costs = TFC + TVC = $18,000 + $12,000 = $30,000.\nAverage cost = TC / Q = $30,000 / 600 = $50 per unit.\n\n[1] for TC formula/calculation\n[1] for correct TC = $30,000\n[1] for correct AC = $50" },
  { id:"wr2", cat:"Cash Flow", difficulty:"SL", marks:4, q:"State two causes and two solutions to cash flow problems, using business examples.", modelAnswer:"Causes:\n(1) Overtrading — the business expands too fast, spending on stock and wages before receiving revenue.\n(2) Poor credit control — allowing debtors too long to pay (e.g., 90-day terms) means cash inflows are delayed.\n\nSolutions:\n(1) Debt factoring — selling outstanding invoices to a third party for immediate cash at a small discount.\n(2) Negotiating an overdraft — provides a short-term credit facility to bridge temporary shortfalls.\n\n[1] per cause identified (×2)\n[1] per solution identified (×2)" },
  { id:"wr3", cat:"Final Accounts", difficulty:"HL", marks:4, q:"A machine costs $80,000, has a residual value of $8,000, and a useful life of 6 years. Calculate (a) the annual straight-line depreciation and (b) the net book value after 2 years.", modelAnswer:"(a) Annual depreciation = (Cost − Residual value) / Useful life\n= ($80,000 − $8,000) / 6 = $72,000 / 6 = $12,000 per year.\n\n(b) Accumulated depreciation after 2 years = $12,000 × 2 = $24,000.\nNBV = $80,000 − $24,000 = $56,000.\n\n[1] for correct formula [1] for $12,000/year\n[1] for accumulated depreciation [1] for NBV = $56,000" },
  { id:"wr4", cat:"Ratio Analysis", difficulty:"SL", marks:6, q:"A business has: Sales revenue = $500,000 | Gross profit = $200,000 | Profit before interest and tax = $75,000 | Capital employed = $600,000. Calculate (a) GPM, (b) Profit margin, (c) ROCE and briefly interpret each.", modelAnswer:"(a) GPM = ($200,000 / $500,000) × 100 = 40%\n→ The business retains 40¢ of every $1 of revenue after direct costs.\n\n(b) Profit margin = ($75,000 / $500,000) × 100 = 15%\n→ Only 15¢ of every $1 survives after all operating expenses.\n\n(c) ROCE = ($75,000 / $600,000) × 100 = 12.5%\n→ For every $1 of capital employed, the business generates 12.5¢ of profit.\n\n[1] each for correct calculation (×3)\n[1] each for relevant interpretation (×3)" },
  { id:"wr5", cat:"Investment Appraisal", difficulty:"SL", marks:6, q:"An investment costs $48,000. Net cash flows: Year 1: $10,000 | Year 2: $14,000 | Year 3: $18,000 | Year 4: $16,000. Calculate (a) the payback period and (b) the ARR.", modelAnswer:"(a) Cumulative: Y1=$10,000 | Y2=$24,000 | Y3=$42,000 | Y4=$58,000.\nRemaining after Y3 = $48,000 − $42,000 = $6,000.\nTime in Y4 = ($6,000 / $16,000) × 12 = 4.5 months.\nPayback = 3 years 4.5 months.\n\n(b) Total returns = $58,000. Total profit = $58,000 − $48,000 = $10,000.\nAverage annual profit = $10,000 / 4 = $2,500.\nARR = ($2,500 / $48,000) × 100 = 5.21%.\n\n[1] cumulative cashflow table [1] correct payback period\n[1] total profit [1] average annual profit [1] correct ARR % [1] working shown" },
  { id:"wr6", cat:"Budgets & Variance", difficulty:"HL", marks:5, q:"Budgeted sales revenue: $80,000. Actual: $72,000. Budgeted costs: $55,000. Actual costs: $51,000. Calculate both variances, state whether favourable or adverse, and evaluate the overall impact on profit.", modelAnswer:"Revenue variance = $72,000 − $80,000 = −$8,000 → ADVERSE\n(Earned $8,000 less than planned)\n\nCost variance = $51,000 − $55,000 = −$4,000 → FAVOURABLE\n(Spent $4,000 less than planned)\n\nNet impact: Revenue shortfall (−$8,000) partially offset by cost savings (+$4,000) = net adverse effect of $4,000 on profit.\n\n[1] correct revenue variance [1] adverse identified\n[1] correct cost variance [1] favourable identified\n[1] evaluation of net profit impact" },
  { id:"wr7", cat:"Breakeven", difficulty:"SL", marks:5, q:"Fixed costs = $24,000. Selling price = $60. Variable cost = $20. (a) Calculate breakeven output. (b) Calculate the margin of safety if actual output is 800 units. (c) Calculate the output needed for a target profit of $16,000.", modelAnswer:"(a) Contribution = $60 − $20 = $40.\nBEQ = $24,000 / $40 = 600 units.\n\n(b) Margin of safety = 800 − 600 = 200 units.\n\n(c) Target profit quantity = (FC + Target profit) / Contribution\n= ($24,000 + $16,000) / $40 = $40,000 / $40 = 1,000 units.\n\n[1] contribution calculation [1] BEQ\n[1] margin of safety [1] target profit formula [1] correct answer" },
  { id:"wr8", cat:"BMT Tools", difficulty:"SL/HL", marks:4, q:"Explain how a Force Field Analysis could support a business decision to relocate its production overseas.", modelAnswer:"A Force Field Analysis (Lewin) identifies and weights driving forces (for the change) vs restraining forces (against it).\n\nDriving forces: lower labour costs overseas, access to new markets, government incentives, economies of scale.\n\nRestraining forces: high relocation costs, employee resistance/redundancies, supply chain disruption, reputational risk.\n\nIf driving forces outweigh restraining forces numerically, the decision is more viable. The tool also helps managers identify which restraining forces to reduce before committing.\n\n[1] definition of FFA [1] driving forces example\n[1] restraining forces example [1] how it aids decision-making" },
  // NEW WORKBOOK-BASED WRITTEN QUESTIONS
  { id:"wr9", cat:"Sources of Finance", difficulty:"SL", marks:4, q:"With reference to Hail Cheeser!, explain one advantage and one disadvantage of Manuel using internal sources of finance to open the new waterfront location.", modelAnswer:"Advantage: Manuel would retain full control over his business and all future profits — no interest payments are required, making it the cheapest form of finance. He avoids lengthy loan applications or investor meetings.\n\nDisadvantage: Manuel's retained profits are modest (he lost money in 3 of 12 months), so he may simply not have enough to fund the $20,000–$30,000 relocation. Using personal retirement savings also incurs a 10% early withdrawal penalty, increasing the actual cost.\n\n[1] advantage identified [1] applied to Hail Cheeser!\n[1] disadvantage identified [1] applied to Hail Cheeser!" },
  { id:"wr10", cat:"Costs & Revenue", difficulty:"SL", marks:4, q:"Using the Dunn Auto Repair case, explain the difference between fixed and indirect costs. Give one example of each from the case.", modelAnswer:"Fixed costs are costs that do not vary with the level of output — they remain constant regardless of how many services DAR performs. For example, Keith's salary of $5,000/month is paid whether DAR completes 10 repairs or 500.\n\nIndirect costs (overheads) are costs not directly attributable to a specific product or service. For example, utility expenses of $500/month and marketing costs of $150/month cannot be easily assigned to any individual oil change or repair job.\n\nNote: fixed costs often overlap with indirect costs, but indirect costs can occasionally vary (e.g., utilities rising in winter).\n\n[1] definition of fixed costs [1] example from DAR\n[1] definition of indirect costs [1] example from DAR" },
  { id:"wr11", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using Crispy Collin's accounts, construct the profit and loss account for the period ended 31 July. (Sales revenue: $85,000 | Rent: $14,000 | Marketing: $2,000 | Salaries/Admin/Insurance: $20,000 | Profit before interest and tax: $6,500 | Interest: $500 | Tax: $1,750)", modelAnswer:"Crispy Collin's — Statement of Profit or Loss\n\nSales revenue:              $85,000\nCost of sales:             ($42,500)  [85,000 − 42,500]\nGross profit:               $42,500\nExpenses (14+2+20):        ($36,000)\nProfit before interest/tax:  $6,500\nInterest:                     ($500)\nProfit before tax:           $6,000\nTax:                        ($1,750)\nProfit for the period:       $4,250\n\n[4] fully correct | [3] one error | [2] two errors | [1] shows some understanding of P&L layout" },
  { id:"wr12", cat:"Ratio Analysis", difficulty:"SL", marks:6, q:"Using Cedar Hill Books' financial ratios below, analyse the business's financial performance over three years.\n\nGPM: 39.5% → 38.2% → 38.5% | Profit Margin: 9.5% → 7.9% → 7.4% | Current Ratio: 1.75:1 → 1.6:1 → 1.55:1 | Acid Test: 1.1:1 → 0.85:1 → 0.86:1 | ROCE: 12.3% → 9.4% → 9.8%", modelAnswer:"GPM has remained broadly stable (39.5% to 38.5%), suggesting Cedar Hill manages its direct costs well — the slight dip in Year 2 may reflect the fading of the hit book's contribution.\n\nProfit margin has fallen from 9.5% to 7.4%, indicating rising indirect costs (expenses) relative to revenue — possibly increased marketing or admin costs as Cedar Hill adapts to e-books and audiobooks.\n\nROCE fell sharply in Year 2 (12.3% to 9.4%) but recovered slightly (9.8%), and remains well above the 3.5–4.5% loan interest range — Cedar Hill still generates strong returns on capital.\n\nLiquidity ratios show a concerning trend: the current ratio has fallen below 2:1 in all years, and the acid test dropped sharply from 1.1 to 0.85. This suggests declining short-term liquidity, although Year 3 shows slight stabilisation.\n\nOverall, Cedar Hill remains profitable and covers its cost of borrowing, but the declining profit margin and liquidity warrant attention.\n\n[2] for correct observations with data\n[2] for application/context\n[2] for analysis (cause + effect reasoning)" },
  { id:"wr13", cat:"Ratio Analysis (HL)", difficulty:"HL", marks:4, q:"Calculate the following ratios for Fresh Cucina using its published accounts (Opening stock: $75m; Closing stock: $65m; Cost of sales: $341m; Debtors: $10m; Sales revenue: $519m; Creditors: $49m; Non-current liabilities: $218m; Total equity: $427m):\n(a) Stock turnover (times)   (b) Debtor days   (c) Creditor days   (d) Gearing ratio", modelAnswer:"(a) Average stock = (75+65)/2 = $70m\nStock turnover = $341m / $70m = 4.87 times per year\n\n(b) Debtor days = ($10m / $519m) × 365 = 7.03 days\n\n(c) Creditor days = ($49m / $341m) × 365 = 52.45 days\n\n(d) Capital employed = $218m + $427m = $645m\nGearing = ($218m / $645m) × 100 = 33.8%\n\n[1] per correct answer (×4)" },
  { id:"wr14", cat:"Investment Appraisal", difficulty:"HL", marks:4, q:"On Air Sports is considering paying $6m upfront for 8-year broadcast rights generating $2m/year. Using discount factors provided (Y1=0.9259, Y2=0.8573, Y3=0.7938, Y4=0.7350, Y5=0.6806, Y6=0.6302, Y7=0.5835, Y8=0.5403), calculate the NPV.", modelAnswer:"Present values:\nY1: 2 × 0.9259 = $1.8518m\nY2: 2 × 0.8573 = $1.7146m\nY3: 2 × 0.7938 = $1.5876m\nY4: 2 × 0.7350 = $1.470m\nY5: 2 × 0.6806 = $1.3612m\nY6: 2 × 0.6302 = $1.2604m\nY7: 2 × 0.5835 = $1.167m\nY8: 2 × 0.5403 = $1.0806m\n\nTotal PV = $11.4932m\nNPV = $11.4932m − $6m = $5.4932m ≈ $5,493,200\n\nPositive NPV → the investment adds value in real money terms.\n\n[1] for correct discounting method\n[1] for total PV\n[1] for deducting investment cost\n[1] for correct NPV with $ sign" },
  { id:"wr15", cat:"Budgets & Variance", difficulty:"HL", marks:4, q:"Kicks Soccer Club budgeted membership revenue of $35,000 but received $38,000. Rent was budgeted at $20,000 but cost $21,000. (a) Calculate each variance and state F or A. (b) Explain one benefit of variance analysis to KSC's decision-making.", modelAnswer:"(a) Membership revenue variance = $38,000 − $35,000 = $3,000 FAVOURABLE\n(Actual > budgeted revenue = good)\n\nRent variance = $21,000 − $20,000 = $1,000 ADVERSE\n(Actual > budgeted cost = bad)\n\n(b) Variance analysis helps KSC identify areas of overspending or unexpected income. For example, knowing rent exceeded budget by $1,000 allows management to renegotiate facility terms or allocate more funds to rent in the 2025 budget, improving financial control and planning accuracy.\n\n[1] correct revenue variance [1] F/A correctly identified\n[1] correct cost variance [1] F/A correctly identified\n(Benefit = up to 2 marks if writing extended answer)" },
];

const CAT_COLORS = {
  "Costs & Revenue":"#6366F1","Cash Flow":"#0EA5E9","Final Accounts":"#10B981",
  "Ratio Analysis":"#F59E0B","Ratio Analysis (HL)":"#F59E0B","Investment Appraisal":"#8B5CF6",
  "Budgets & Variance":"#EF4444","Breakeven":"#14B8A6","BMT Tools":"#EC4899",
  "Sources of Finance":"#F97316"
};

const ALL_CATS = ["All", ...Array.from(new Set([...MCQ_QUESTIONS.map(q=>q.cat), ...WRITTEN_QUESTIONS.map(q=>q.cat)]))];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ChecklistView() {
  const [checked, setChecked] = useState(() => loadLS("checklist_checked", {}));
  const [collapsed, setCollapsed] = useState(() => loadLS("checklist_collapsed", {}));
  const toggle = id => setChecked(p => { const next = { ...p, [id]: !p[id] }; saveLS("checklist_checked", next); return next; });
  const toggleSec = id => setCollapsed(p => { const next = { ...p, [id]: !p[id] }; saveLS("checklist_collapsed", next); return next; });
  const totalItems = CHECKLIST_SECTIONS.reduce((s,sec)=>s+sec.items.length,0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount/totalItems)*100);
  const progColor = progress<30?"#DC2626":progress<70?"#D97706":"#059669";

  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 0 40px"}}>
      <div style={{background:"#1C1C22",borderRadius:16,padding:"20px 24px",marginBottom:28,border:"1px solid #2A2A32"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:14,color:"#A0998F"}}>Overall Progress</span>
          <span style={{fontSize:22,fontWeight:700,color:progColor}}>{progress}%</span>
        </div>
        <div style={{background:"#2A2A32",borderRadius:99,height:10,overflow:"hidden"}}>
          <div style={{width:`${progress}%`,height:"100%",background:progColor,borderRadius:99,transition:"width 0.4s ease"}}/>
        </div>
        <div style={{marginTop:10,fontSize:13,color:"#6B6560",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{checkedCount} of {totalItems} topics covered</span><span style={{fontSize:11,color:"#3A5A3A",background:"#1A2A1A",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>✦ auto-saved</span></div>
      </div>

      {CHECKLIST_SECTIONS.map(section=>{
        const sectionChecked = section.items.filter((_,i)=>checked[`${section.id}-${i}`]).length;
        const isCollapsed = collapsed[section.id];
        const allDone = sectionChecked===section.items.length;
        return (
          <div key={section.id} style={{background:"#1C1C22",border:`1px solid ${allDone?section.color+"66":"#2A2A32"}`,borderRadius:14,marginBottom:12,overflow:"hidden",transition:"border-color 0.3s"}}>
            <div onClick={()=>toggleSec(section.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",cursor:"pointer",borderLeft:`4px solid ${section.color}`,userSelect:"none"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:32,height:32,borderRadius:8,background:section.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:section.color,fontFamily:"monospace"}}>{sectionChecked}/{section.items.length}</div>
                <span style={{fontWeight:600,fontSize:15,color:allDone?section.color:"#E8E6E0"}}>{allDone?"✓ ":""}{section.title}</span>
              </div>
              <span style={{color:"#4A4A52",fontSize:18,transform:isCollapsed?"rotate(-90deg)":"rotate(0deg)",display:"inline-block",transition:"transform 0.2s"}}>▾</span>
            </div>
            {!isCollapsed&&(
              <div style={{padding:"4px 20px 16px",borderTop:"1px solid #2A2A32"}}>
                {section.items.map((item,i)=>{
                  const key=`${section.id}-${i}`;
                  const isChecked=checked[key];
                  const isImportant=item.includes("⚠️")||item.includes("✦ MEMORISE");
                  return (
                    <div key={key} onClick={()=>toggle(key)} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"9px 4px",cursor:"pointer",borderRadius:8,transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background="#22222A"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{width:20,height:20,borderRadius:5,flexShrink:0,marginTop:1,border:`2px solid ${isChecked?section.color:"#3A3A42"}`,background:isChecked?section.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                        {isChecked&&<span style={{color:"#fff",fontSize:11,fontWeight:700}}>✓</span>}
                      </div>
                      <span style={{fontSize:14,color:isChecked?"#5A5A62":isImportant?"#F5D87A":"#C8C4BC",textDecoration:isChecked?"line-through":"none",lineHeight:1.5,transition:"color 0.2s"}}>{item}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <div style={{textAlign:"center",marginTop:24,color:"#3A3A42",fontSize:13}}>
        Click any item to mark it as revised ·{" "}
        <span style={{color:"#4F46E5",cursor:"pointer"}} onClick={()=>{ setChecked({}); saveLS("checklist_checked", {}); }}>Reset all</span>
      </div>
    </div>
  );
}

function FlashCard({card}) {
  const [flipped,setFlipped]=useState(false);
  return (
    <div onClick={()=>setFlipped(f=>!f)} style={{cursor:"pointer",perspective:"1000px",height:220,userSelect:"none"}}>
      <div style={{position:"relative",width:"100%",height:"100%",transformStyle:"preserve-3d",transform:flipped?"rotateY(180deg)":"rotateY(0deg)",transition:"transform 0.45s cubic-bezier(.4,0,.2,1)"}}>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",background:"#16161E",border:"1px solid #2C2C38",borderRadius:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}>
          <div style={{fontSize:11,letterSpacing:2,color:"#555",fontFamily:"monospace",marginBottom:14,textTransform:"uppercase"}}>TERM</div>
          <div style={{fontSize:19,fontWeight:700,color:"#F0EDE8",lineHeight:1.3}}>{card.term}</div>
          <div style={{marginTop:20,fontSize:11,color:"#404050"}}>tap to reveal →</div>
        </div>
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",transform:"rotateY(180deg)",background:"#16161E",border:"1px solid #2C2C38",borderRadius:16,display:"flex",flexDirection:"column",justifyContent:"center",padding:20,overflowY:"auto"}}>
          <div style={{fontSize:11,letterSpacing:2,color:"#555",fontFamily:"monospace",marginBottom:10,textTransform:"uppercase"}}>DEFINITION</div>
          <p style={{fontSize:13,color:"#C8C4BC",lineHeight:1.65,margin:0}}>{card.def}</p>
          {card.formula&&<div style={{marginTop:12,background:"#0D0D13",borderRadius:8,padding:"10px 14px",borderLeft:"3px solid #6366F1"}}>
            <div style={{fontSize:10,color:"#6366F1",fontFamily:"monospace",letterSpacing:1,marginBottom:4}}>FORMULA</div>
            <div style={{fontSize:12,color:"#A9E6FF",fontFamily:"monospace"}}>{card.formula}</div>
          </div>}
        </div>
      </div>
    </div>
  );
}

function FlashcardsView() {
  const [activeCat,setActiveCat]=useState(()=>loadLS("fc_cat", FLASHCARD_CATEGORIES[0].id));
  const [cardIdx,setCardIdx]=useState(0);
  const currentCat=FLASHCARD_CATEGORIES.find(c=>c.id===activeCat);
  const currentCard=currentCat.cards[cardIdx];
  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"0 0 40px"}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:24}}>
        {FLASHCARD_CATEGORIES.map(cat=>(
          <button key={cat.id} onClick={()=>{ setActiveCat(cat.id); saveLS("fc_cat", cat.id); setCardIdx(0); }} style={{background:activeCat===cat.id?cat.color:"#16161E",border:`1px solid ${activeCat===cat.id?cat.color:"#2C2C38"}`,borderRadius:99,padding:"6px 14px",color:activeCat===cat.id?"#fff":"#888",fontSize:12,cursor:"pointer",fontFamily:"monospace",transition:"all 0.2s"}}>{cat.label}</button>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{fontSize:13,color:"#444",fontFamily:"monospace"}}>{cardIdx+1} / {currentCat.cards.length} — {currentCat.label}</span>
        <div style={{background:"#16161E",borderRadius:99,height:4,width:140,overflow:"hidden"}}>
          <div style={{width:`${((cardIdx+1)/currentCat.cards.length)*100}%`,height:"100%",background:currentCat.color,transition:"width 0.3s"}}/>
        </div>
      </div>
      <FlashCard key={`${activeCat}-${cardIdx}`} card={currentCard}/>
      <div style={{display:"flex",gap:12,marginTop:16}}>
        <button onClick={()=>setCardIdx(i=>Math.max(0,i-1))} disabled={cardIdx===0} style={{flex:1,background:"#16161E",border:"1px solid #2C2C38",borderRadius:12,padding:14,color:cardIdx===0?"#333":"#888",fontSize:14,cursor:cardIdx===0?"not-allowed":"pointer"}}>← Previous</button>
        <button onClick={()=>setCardIdx(i=>Math.min(currentCat.cards.length-1,i+1))} disabled={cardIdx===currentCat.cards.length-1} style={{flex:1,background:currentCat.color,border:"none",borderRadius:12,padding:14,color:"#fff",fontSize:14,cursor:cardIdx===currentCat.cards.length-1?"not-allowed":"pointer",opacity:cardIdx===currentCat.cards.length-1?0.4:1}}>Next →</button>
      </div>
      <p style={{textAlign:"center",fontSize:12,color:"#333",marginTop:16}}>Tap any card to flip it</p>
    </div>
  );
}

function MCQItem({q, displayNum}) {
  const [selected,setSelected]=useState(null);
  const [confirmed,setConfirmed]=useState(false);
  const color=CAT_COLORS[q.cat]||"#6366F1";
  return (
    <div style={{background:"#16161E",border:"1px solid #2C2C38",borderRadius:16,overflow:"hidden",marginBottom:14}}>
      <div style={{borderLeft:`4px solid ${color}`,padding:"18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"#fff",background:color,padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>MCQ</span>
          <span style={{fontSize:10,color:color,background:color+"22",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>{q.cat}</span>
          <span style={{fontSize:10,color:"#555",background:"#22222C",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>{q.difficulty}</span>
        </div>
        <p style={{fontSize:15,color:"#E8E6E0",margin:0,lineHeight:1.6,fontWeight:600}}>Q{displayNum}. {q.q}</p>
      </div>
      <div style={{padding:"12px 20px 16px",display:"grid",gap:8}}>
        {q.options.map((opt,i)=>{
          const isSelected=selected===i;
          const isCorrect=i===q.answer;
          let bg="#1C1C22",border="#2A2A32",tc="#C8C4BC";
          if(confirmed){
            if(isCorrect){bg="#059669"+"22";border="#059669";tc="#6EE7B7";}
            else if(isSelected&&!isCorrect){bg="#DC2626"+"22";border="#DC2626";tc="#FCA5A5";}
          } else if(isSelected){bg=color+"22";border=color;tc="#F5F3EE";}
          return (
            <div key={i} onClick={()=>{if(!confirmed)setSelected(i);}} style={{background:bg,border:`1.5px solid ${border}`,borderRadius:10,padding:"11px 16px",cursor:confirmed?"default":"pointer",display:"flex",alignItems:"center",gap:12,transition:"all 0.2s"}} onMouseEnter={e=>{if(!confirmed&&!isSelected)e.currentTarget.style.borderColor=color+"66";}} onMouseLeave={e=>{if(!confirmed&&!isSelected)e.currentTarget.style.borderColor="#2A2A32";}}>
              <div style={{width:26,height:26,borderRadius:6,flexShrink:0,background:confirmed&&isCorrect?"#059669":confirmed&&isSelected&&!isCorrect?"#DC2626":isSelected?color:"#2A2A32",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontFamily:"monospace",color:"#fff",fontWeight:700}}>
                {confirmed&&isCorrect?"✓":confirmed&&isSelected&&!isCorrect?"✗":String.fromCharCode(65+i)}
              </div>
              <span style={{fontSize:14,color:tc,lineHeight:1.4}}>{opt}</span>
            </div>
          );
        })}
        {!confirmed?(
          <button onClick={()=>{if(selected!==null)setConfirmed(true);}} disabled={selected===null} style={{marginTop:4,background:selected!==null?`linear-gradient(135deg,${color},${color}bb)`:"#22222A",border:"none",borderRadius:10,padding:"11px",color:selected!==null?"#fff":"#444",fontSize:14,fontWeight:600,cursor:selected!==null?"pointer":"not-allowed",transition:"all 0.2s"}}>Check Answer</button>
        ):(
          <div style={{background:selected===q.answer?"#059669"+"11":"#DC2626"+"11",border:`1px solid ${selected===q.answer?"#059669":"#DC2626"}44`,borderRadius:10,padding:"12px 16px",marginTop:4}}>
            <div style={{fontSize:11,color:selected===q.answer?"#6EE7B7":"#FCA5A5",fontFamily:"monospace",marginBottom:6}}>{selected===q.answer?"✓ CORRECT":"✗ INCORRECT"}</div>
            <p style={{fontSize:13,color:"#A09890",lineHeight:1.6,margin:0}}>{q.explanation}</p>
            <button onClick={()=>{setSelected(null);setConfirmed(false);}} style={{marginTop:10,background:"transparent",border:"1px solid #2C2C38",borderRadius:8,color:"#555",fontSize:12,padding:"5px 14px",cursor:"pointer"}}>Try Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

function WrittenItem({q, displayNum}) {
  const [revealed,setRevealed]=useState(false);
  const color=CAT_COLORS[q.cat]||"#6366F1";
  return (
    <div style={{background:"#16161E",border:"1px solid #2C2C38",borderRadius:16,overflow:"hidden",marginBottom:14}}>
      <div style={{borderLeft:`4px solid ${color}`,padding:"18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{fontSize:10,color:"#fff",background:"#334",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>WRITTEN</span>
          <span style={{fontSize:10,color,background:color+"22",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>{q.cat}</span>
          <span style={{fontSize:10,color:"#555",background:"#22222C",padding:"2px 10px",borderRadius:99,fontFamily:"monospace"}}>{q.difficulty}</span>
          <span style={{fontSize:11,color:"#F5D87A",background:"#2A2800",padding:"2px 10px",borderRadius:99,fontFamily:"monospace",marginLeft:"auto",border:"1px solid #5A4A00"}}>[ {q.marks} marks ]</span>
        </div>
        <p style={{fontSize:15,color:"#E8E6E0",margin:0,lineHeight:1.6,fontWeight:600,whiteSpace:"pre-line"}}>Q{displayNum}. {q.q}</p>
      </div>
      {!revealed?(
        <div style={{padding:"12px 20px 16px"}}>
          <button onClick={()=>setRevealed(true)} style={{background:color+"22",border:`1px solid ${color}44`,borderRadius:8,color,fontSize:13,padding:"8px 20px",cursor:"pointer",fontFamily:"monospace"}}>Show Model Answer</button>
        </div>
      ):(
        <div style={{padding:"0 20px 18px",borderTop:"1px solid #2C2C38"}}>
          <div style={{fontSize:11,color:"#10B981",fontFamily:"monospace",letterSpacing:1,margin:"14px 0 8px"}}>✓ MODEL ANSWER</div>
          <p style={{fontSize:13,color:"#B0ADA6",lineHeight:1.7,margin:0,whiteSpace:"pre-line"}}>{q.modelAnswer}</p>
          <button onClick={()=>setRevealed(false)} style={{marginTop:12,background:"transparent",border:"1px solid #2C2C38",borderRadius:8,color:"#555",fontSize:12,padding:"6px 14px",cursor:"pointer"}}>Hide</button>
        </div>
      )}
    </div>
  );
}

function PracticeView() {
  const [filterCat,setFilterCat]=useState("All");
  const [filterType,setFilterType]=useState("All");

  const catMatchFn = (qCat, filterCat) => {
    if (filterCat === "All") return true;
    // Normalise HL suffix for matching
    const normalise = s => s.replace(" (HL)","").toLowerCase();
    return normalise(qCat) === normalise(filterCat);
  };

  const filteredMCQ = MCQ_QUESTIONS.filter(q => catMatchFn(q.cat, filterCat));
  const filteredWritten = WRITTEN_QUESTIONS.filter(q => catMatchFn(q.cat, filterCat));

  const showMCQ = filterType==="All" || filterType==="MCQ";
  const showWritten = filterType==="All" || filterType==="Written";

  // Running global counter across both sections for display numbers
  let globalCounter = 0;

  const mcqToShow = showMCQ ? filteredMCQ : [];
  const writtenToShow = showWritten ? filteredWritten : [];
  const totalShown = mcqToShow.length + writtenToShow.length;

  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Type filter */}
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {["All","MCQ","Written"].map(t=>(
          <button key={t} onClick={()=>setFilterType(t)} style={{background:filterType===t?"#F5F3EE":"#16161E",border:`1px solid ${filterType===t?"#F5F3EE":"#2C2C38"}`,borderRadius:99,padding:"6px 16px",color:filterType===t?"#0D0D13":"#888",fontSize:12,cursor:"pointer",fontFamily:"monospace",fontWeight:filterType===t?700:400,transition:"all 0.2s"}}>{t==="All"?"All Types":t==="MCQ"?"🔘 Multiple Choice":"✍️ Written"}</button>
        ))}
      </div>

      {/* Category filter */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
        {ALL_CATS.map(cat=>{
          const color=CAT_COLORS[cat]||"#6366F1";
          const active=filterCat===cat;
          return <button key={cat} onClick={()=>setFilterCat(cat)} style={{background:active?color:"#16161E",border:`1px solid ${active?color:"#2C2C38"}`,borderRadius:99,padding:"6px 14px",color:active?"#fff":"#888",fontSize:11,cursor:"pointer",fontFamily:"monospace",transition:"all 0.2s"}}>{cat}</button>;
        })}
      </div>

      {/* Summary count */}
      <div style={{marginBottom:20,fontSize:12,color:"#444",fontFamily:"monospace"}}>
        Showing {totalShown} question{totalShown!==1?"s":""}{filterCat!=="All"?` · ${filterCat}`:""}
        {filterType!=="All"?` · ${filterType}`:""}
      </div>

      {totalShown === 0 && (
        <div style={{textAlign:"center",padding:"40px 0",color:"#444",fontSize:14}}>
          No questions match this filter combination.
        </div>
      )}

      {mcqToShow.length > 0 && (
        <>
          <div style={{fontSize:11,letterSpacing:3,color:"#555",fontFamily:"monospace",marginBottom:14,textTransform:"uppercase"}}>── Multiple Choice ({mcqToShow.length})</div>
          {mcqToShow.map((q)=>{
            globalCounter++;
            return <MCQItem key={q.id} q={q} displayNum={globalCounter}/>;
          })}
        </>
      )}

      {writtenToShow.length > 0 && (
        <>
          <div style={{fontSize:11,letterSpacing:3,color:"#555",fontFamily:"monospace",marginBottom:14,marginTop:mcqToShow.length>0?24:0,textTransform:"uppercase"}}>── Written Questions ({writtenToShow.length})</div>
          {writtenToShow.map((q)=>{
            globalCounter++;
            return <WrittenItem key={q.id} q={q} displayNum={globalCounter}/>;
          })}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(() => loadLS("revision_tab", "checklist"));
  const switchTab = t => { setTab(t); saveLS("revision_tab", t); };

  const tabs = [
    { id:"checklist", label:"✅ Checklist", desc:"Track what you've revised" },
    { id:"flashcards", label:"🃏 Flashcards", desc:"Definitions & formulas" },
    { id:"practice",  label:"📝 Practice",  desc:"MCQ + written questions" },
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0F0F13",fontFamily:"'Georgia', serif",color:"#E8E6E0"}}>
      <div style={{background:"#0F0F13",borderBottom:"1px solid #1E1E26",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 16px"}}>
          <div style={{paddingTop:20,paddingBottom:12,textAlign:"center"}}>
            <div style={{display:"inline-block",background:"linear-gradient(135deg,#4F46E5,#7C3AED)",borderRadius:10,padding:"4px 16px",fontSize:10,letterSpacing:3,fontFamily:"monospace",color:"#fff",textTransform:"uppercase",marginBottom:8}}>IB HL Business Management</div>
            <h1 style={{fontSize:"clamp(20px,4vw,30px)",fontWeight:700,margin:"0 0 2px",color:"#F5F3EE",letterSpacing:-0.5}}>Finance Unit — Revision Hub</h1>
            <p style={{color:"#5A5A62",fontSize:12,margin:0}}>Units 3.1–3.9 · 5.5 Breakeven · BMT Tools · {MCQ_QUESTIONS.length} MCQs · {WRITTEN_QUESTIONS.length} Written</p>
          </div>
          <div style={{display:"flex",gap:4,paddingBottom:0}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>switchTab(t.id)} style={{flex:1,background:"transparent",border:"none",borderBottom:`3px solid ${tab===t.id?"#6366F1":"transparent"}`,padding:"10px 4px 12px",cursor:"pointer",transition:"all 0.2s",textAlign:"center"}}>
                <div style={{fontSize:13,fontWeight:600,color:tab===t.id?"#F0EDE8":"#555",transition:"color 0.2s"}}>{t.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"28px 16px"}}>
        {tab==="checklist" && <ChecklistView/>}
        {tab==="flashcards" && <FlashcardsView/>}
        {tab==="practice" && <PracticeView/>}
      </div>

       <Analytics />
    </div>
  );
}
