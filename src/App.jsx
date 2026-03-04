import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Accordion, Checkbox, Button, Collapse,
  Alert, Box, Stack, Textarea, useMantineTheme,
} from "@mantine/core";
import LoginButton from "./LoginButton.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import { syncToCloud } from "./stateSync.js";

// ─── localStorage helpers ──────────────────────────────────────────────────
function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  syncToCloud(key, value);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST DATA
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_SECTIONS = [
  { id: "sources", title: "3.1 – Sources of Finance", color: "#F5A623", items: ["Difference between internal & external sources of finance","Short, medium & long-term finance — matched to purpose","Equity vs debt financing (pros & cons)","Why a business chooses one source over another","Retained profit, share capital, debentures, venture capital (HL)","Loan capital vs overdraft vs trade credit"] },
  { id: "costs", title: "3.2 – Costs & Revenues", color: "#0070F3", items: ["Fixed, variable, semi-variable, direct & indirect costs","Total Revenue and Average Revenue","Contribution per unit = Selling Price – Variable Cost","Total Contribution = Contribution per unit × Quantity","Total Costs = Fixed Costs + Total Variable Costs","Profit = Total Revenue – Total Costs","Difference between profit and cash flow"] },
  { id: "cashflow", title: "3.3 – Cash Flow", color: "#00B4D8", items: ["Construct and interpret a cash flow forecast","Net Cash Flow = Cash Inflows – Cash Outflows","Closing Balance = Opening Balance + Net Cash Flow","Causes of cash flow problems","Solutions: overdraft, debt factoring, sale of assets, better credit control","Difference between cash flow and profit (common exam trap!)"] },
  { id: "accounts", title: "3.4 – Final Accounts", color: "#34D399", items: ["Income Statement layout: Revenue → Gross Profit → Net Profit","Balance Sheet structure: Assets = Equity + Liabilities","Current vs non-current assets and liabilities","Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life (HL)","Reducing balance depreciation = Net Book Value × Rate % (HL)","Intangible assets: goodwill, patents, brand value (HL)"] },
  { id: "ratios", title: "3.5 – Profitability & Liquidity Ratios", color: "#FBBF24", items: ["Gross Profit Margin = (Gross Profit ÷ Revenue) × 100 ✦ IN BOOKLET","Net Profit Margin = (Net Profit ÷ Revenue) × 100 ✦ IN BOOKLET","ROCE = (Net Profit ÷ Capital Employed) × 100 ✦ IN BOOKLET","Current Ratio = Current Assets ÷ Current Liabilities (ideal ~2:1) ✦ IN BOOKLET","Acid Test = (CA – Inventory) ÷ CL (ideal ~1:1) ✦ IN BOOKLET","Interpret ratios in context — not just calculate them!"] },
  { id: "efficiency", title: "3.6 – Efficiency Ratios (HL Only)", color: "#F87171", items: ["Stock Turnover (times) = Cost of Sales ÷ Average Stock ✦ IN BOOKLET","Stock Turnover (days) = (Average Stock ÷ Cost of Sales) × 365 ✦ IN BOOKLET","Average Stock = (Opening Stock + Closing Stock) ÷ 2 ✦ IN BOOKLET","Debtor Days = (Debtors ÷ Revenue) × 365 ✦ IN BOOKLET","Creditor Days = (Creditors ÷ Cost of Sales) × 365 ✦ IN BOOKLET","Gearing = (Non-current Liabilities ÷ Capital Employed) × 100 ✦ IN BOOKLET","High vs low gearing — implications for risk and investment"] },
  { id: "investment", title: "3.7 – Investment Appraisal", color: "#3291FF", items: ["Payback Period — calculate and interpret","ARR = (Total Returns – Capital Cost) ÷ Years ÷ Capital Cost × 100 ✦ IN BOOKLET","NPV = Sum of discounted cash flows – Initial Investment ✦ IN BOOKLET (HL)","Discount factors/tables are provided in exam","Compare methods: qualitative vs quantitative factors","Limitations of each investment appraisal method"] },
  { id: "budgets", title: "3.8 – Budgets & Variance Analysis", color: "#00B4D8", items: ["Variance = Actual – Budgeted ✦ MEMORISE","Favourable variance: better than expected","Adverse variance: worse than expected","For costs: Actual < Budgeted = Favourable","For revenue: Actual > Budgeted = Favourable","Zero-based vs incremental budgeting (pros & cons)","Limitations of budgets"] },
  { id: "breakeven", title: "5.5 – Breakeven Analysis", color: "#00CC88", items: ["Breakeven Output = Fixed Costs ÷ Contribution per unit ✦ MEMORISE","Margin of Safety = Actual Output – Breakeven Output ✦ MEMORISE","Target Profit Output = (FC + Target Profit) ÷ Contribution ✦ MEMORISE","Draw and interpret breakeven charts","Limitations of breakeven analysis","How changes in price/costs affect the breakeven point"] },
  { id: "bmt", title: "BMT Tools", color: "#FF0080", items: ["Business Plan — components, purpose, link to securing finance","Ansoff Matrix — 4 strategies, risk levels, finance implications","STEEPLE — apply each factor to a business scenario","Force Field Analysis — driving vs restraining forces (Lewin)","Apply BMT tools to justify business decisions in context"] },
  { id: "formulas", title: "Formulas to MEMORISE (Not in Booklet)", color: "#F87171", items: ["Contribution per unit = Selling Price – Variable Cost per unit","Total Contribution = Contribution per unit × Quantity","Total Costs = Fixed Costs + Total Variable Costs","Profit = Total Revenue – Total Costs","Breakeven Output = Fixed Costs ÷ Contribution per unit","Margin of Safety = Actual Output – Breakeven Output","Target Profit Output = (FC + Target Profit) ÷ Contribution per unit","Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life","Reducing balance = Net Book Value × Depreciation Rate %","Net Cash Flow = Cash Inflows – Cash Outflows","Closing Balance = Opening Balance + Net Cash Flow","Variance = Actual – Budgeted"] },
  { id: "examtips", title: "Exam Technique", color: "#0070F3", items: ["Define key terms at the start of longer answers","Always use the business context given — never answer generically","For evaluate/justify: give both sides then make a justified conclusion","Show ALL working in calculations — method marks are available","Interpret ratios — don't just calculate, explain what it means","Link answers back to the specific business in the question"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// FLASHCARD DATA
// ─────────────────────────────────────────────────────────────────────────────
const FLASHCARD_CATEGORIES = [
  { id: "costs-revenue", label: "Costs & Revenue", color: "#0070F3", cards: [
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
  { id: "cashflow", label: "Cash Flow", color: "#00B4D8", cards: [
    { term: "Net Cash Flow", def: "The numerical difference between an organisation's total cash inflows and its total cash outflows, per time period.", formula: "Net cash flow = Cash inflows − Cash outflows" },
    { term: "Opening Balance", def: "The value of cash held by a business at the start of a trading period.", formula: "Opening balance = Closing balance of previous period" },
    { term: "Closing Balance", def: "The value of cash held by a business at the end of a trading period.", formula: "Closing balance = Opening balance + Net cash flow" },
    { term: "Bad Debt", def: "Occurs when a debtor is unable to pay outstanding invoices to the business, reducing cash inflows for the seller.", formula: null },
    { term: "Debt Factoring", def: "Selling outstanding invoices to a third party at a discount in exchange for immediate cash — one of the fastest solutions to cash flow problems.", formula: null },
    { term: "Cumulative Net Cash Flow", def: "The sum of an investment project's net cash flows for a particular year plus all previous years.", formula: "Cumulative NCF = NCF in previous year(s) + NCF of current year" },
  ]},
  { id: "final-accounts", label: "Final Accounts", color: "#34D399", cards: [
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
  { id: "ratios", label: "Ratio Analysis", color: "#FBBF24", cards: [
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
  { id: "investment", label: "Investment Appraisal", color: "#3291FF", cards: [
    { term: "Payback Period (PBP)", def: "The time taken to recover the initial investment from the net cash flows generated.", formula: "= Investment cost / Contribution per month (if even flows)" },
    { term: "Average Rate of Return (ARR)", def: "Average annual profit as a percentage of the initial investment. ✦ IN BOOKLET", formula: "ARR = [(Total returns − Capital cost) ÷ Years] / Capital cost × 100" },
    { term: "Net Present Value (NPV) — HL", def: "Calculates the real value of an investment by discounting future cash flows. A positive NPV means the project adds value. ✦ IN BOOKLET", formula: "NPV = Sum of present values − Cost of investment" },
  ]},
  { id: "budgets", label: "Budgets & Variance", color: "#F87171", cards: [
    { term: "Variance", def: "A discrepancy between the planned (budgeted) item and the actual amount.", formula: "Variance = Actual value − Budgeted value" },
    { term: "Favourable Variance", def: "Profits are higher than expected — due to lower costs and/or higher revenues than budgeted.", formula: null },
    { term: "Adverse Variance", def: "Profits are lower than expected — due to higher costs and/or lower revenues than budgeted.", formula: null },
    { term: "Zero-Based Budgeting", def: "All budget holders must justify each dollar of spending before funds are released — starts from zero each period.", formula: null },
    { term: "Variance Rule — Costs", def: "For COSTS: Actual < Budgeted = FAVOURABLE (spent less than planned).", formula: null },
    { term: "Variance Rule — Revenue", def: "For REVENUE: Actual > Budgeted = FAVOURABLE (earned more than planned).", formula: null },
  ]},
  { id: "breakeven", label: "Breakeven", color: "#00CC88", cards: [
    { term: "Break-Even Quantity (BEQ)", def: "The quantity of sales required for a firm to reach break-even (cover all costs).", formula: "BEQ = Total fixed costs / Contribution per unit" },
    { term: "Margin of Safety", def: "The amount by which actual output exceeds the break-even quantity.", formula: "= Actual output − Break-even quantity" },
    { term: "Target Profit Quantity", def: "The output needed to achieve a specific profit target.", formula: "= (Fixed costs + Target profit) / Contribution per unit" },
    { term: "Target Price", def: "The price needed to break-even given current costs.", formula: "= AFC + AVC" },
    { term: "Break-Even Analysis", def: "A tool to determine the level of sales needed to cover all costs. Limitations: assumes constant price/costs, ignores quality, and is static.", formula: null },
  ]},
  { id: "sources", label: "Sources of Finance", color: "#F5A623", cards: [
    { term: "Internal Sources of Finance", def: "Finance from within the organisation — retained profit, sale of assets, owner's savings.", formula: null },
    { term: "External Sources of Finance", def: "Finance from outside the organisation — banks, investors, government, crowdfunding.", formula: null },
    { term: "Share Capital", def: "Finance raised through issuing shares on a stock exchange. Also known as equity capital.", formula: null },
    { term: "Loan Capital", def: "Borrowed funds from financial lenders such as commercial banks. Must be repaid with interest.", formula: null },
    { term: "Trade Credit", def: "Enables a business to receive goods/services now but pay at a later date.", formula: null },
    { term: "Overdraft", def: "A banking service allowing withdrawal of more money than exists in the account — short-term finance.", formula: null },
    { term: "Crowdfunding", def: "Raising finance by getting small amounts from a large number of people, often via online platforms.", formula: null },
    { term: "Business Angels", def: "Wealthy private individuals who invest their own money in high-growth potential ventures.", formula: null },
  ]},
  { id: "bmt", label: "BMT Tools", color: "#FF0080", cards: [
    { term: "Ansoff Matrix", def: "Four growth strategies: Market Penetration (existing/existing), Market Development (existing product/new market), Product Development (new product/existing market), Diversification (new/new — highest risk).", formula: null },
    { term: "STEEPLE", def: "Framework examining external macro factors: Social, Technological, Economic, Environmental, Political, Legal, Ethical.", formula: null },
    { term: "Force Field Analysis", def: "Lewin's tool mapping driving forces (for change) vs restraining forces (against change). Change succeeds when driving forces outweigh restraining forces.", formula: null },
    { term: "Business Plan", def: "A formal document outlining objectives, strategies, and financial forecasts. Used to secure finance from investors or lenders.", formula: null },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// MCQ QUESTIONS
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
// WRITTEN QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
const WRITTEN_QUESTIONS = [
  // ── SECTION A: DEFINITIONS (2 marks each) ──────────────────────────────
  { id:"wr1", cat:"Sources of Finance", difficulty:"SL", marks:2, q:"Define the term retained profit.", modelAnswer:"Retained profit is the surplus earnings remaining after all costs, interest, tax, and dividends have been deducted, which is reinvested back into the business rather than distributed to shareholders.\n\n[1] for a partial definition (e.g. \"profit kept in the business\").\n[2] for a clear and accurate definition that distinguishes retained profit from other forms of profit.\n[0] if the student confuses retained profit with gross profit or revenue." },
  { id:"wr2", cat:"Final Accounts", difficulty:"SL", marks:2, q:"Define the term gross profit.", modelAnswer:"Gross profit is the profit earned from a firm's core trading activities, calculated by subtracting the cost of sales (direct costs of production) from sales revenue.\n\n[1] for a partial definition (e.g. \"revenue minus costs\").\n[2] for a clear definition that correctly identifies cost of sales as the deduction — not total costs or expenses.\n[0] if the student defines net profit or profit for the period instead." },
  { id:"wr3", cat:"Sources of Finance", difficulty:"SL", marks:2, q:"Define the term trade credit.", modelAnswer:"Trade credit is a financial arrangement that allows a business to purchase goods or services from a supplier now and defer payment to a later agreed date, typically 30–90 days.\n\n[1] for a partial definition (e.g. \"buy now, pay later\").\n[2] for a clear definition that identifies both the deferral of payment and the supplier relationship." },
  { id:"wr4", cat:"Final Accounts", difficulty:"HL", marks:2, q:"Define the term depreciation.", modelAnswer:"Depreciation is the reduction in the value of a non-current (fixed) asset over time, primarily due to wear and tear through usage or obsolescence.\n\n[1] for a partial definition (e.g. \"assets losing value over time\").\n[2] for a clear definition that identifies non-current assets and states a cause of depreciation.\n[0] if the student describes depreciation as a cash expense rather than a non-cash accounting charge." },
  { id:"wr5", cat:"Ratio Analysis (HL)", difficulty:"HL", marks:2, q:"Define the term gearing ratio.", modelAnswer:"The gearing ratio measures the proportion of a business's capital employed that is financed by long-term external debt (non-current liabilities), expressed as a percentage. A ratio above 50% is considered highly geared.\n\n[1] for a partial definition (e.g. \"the proportion of debt in the business\").\n[2] for a clear definition that references capital employed and external/long-term debt." },
  { id:"wr6", cat:"Sources of Finance", difficulty:"SL", marks:2, q:"Define the term overdraft.", modelAnswer:"An overdraft is a short-term banking facility that allows a business (or individual) to withdraw more money from its account than is currently available, up to an agreed limit, incurring interest on the overdrawn amount.\n\n[1] for a partial definition (e.g. \"when a business spends more than it has in the bank\").\n[2] for a clear definition that identifies the short-term nature and that interest is charged." },
  { id:"wr7", cat:"Budgets & Variance", difficulty:"SL", marks:2, q:"Define the term variance.", modelAnswer:"Variance is the numerical difference between a budgeted (planned) figure and the actual figure achieved for either a revenue or cost item. It can be classified as favourable (beneficial to profit) or adverse (harmful to profit).\n\n[1] for a partial definition (e.g. \"difference between actual and budgeted figures\").\n[2] for a clear definition that identifies both the comparison to budget and the favourable/adverse classification." },
  { id:"wr8", cat:"Investment Appraisal", difficulty:"HL", marks:2, q:"Define the term net present value (NPV).", modelAnswer:"Net present value is an investment appraisal method that calculates the real value of an investment project by discounting all future cash flows to their present-day value and subtracting the initial capital cost. A positive NPV indicates the investment adds value.\n\n[1] for a partial definition (e.g. \"the present value of future cash flows minus the investment\").\n[2] for a clear definition that identifies discounting and the decision rule (positive NPV = viable)." },
  { id:"wr9", cat:"Ratio Analysis", difficulty:"SL", marks:2, q:"Define the term liquidity.", modelAnswer:"Liquidity refers to the ease and speed with which a business can convert its assets into cash without a significant loss in value, in order to meet its short-term financial obligations.\n\n[1] for a partial definition (e.g. \"how easily a business can access cash\").\n[2] for a clear definition that links liquidity to the ability to meet short-term debts." },
  { id:"wr10", cat:"Ratio Analysis", difficulty:"SL", marks:2, q:"Define the term capital employed.", modelAnswer:"Capital employed is the total value of long-term funds invested in a business, calculated as non-current liabilities plus equity (or equivalently, total assets minus current liabilities). It represents the financial resources used to generate profit.\n\n[1] for a partial definition (e.g. \"the total money invested in the business\").\n[2] for a clear definition that gives the correct formula or clearly identifies the two components." },

  // ── SECTION B: EXPLAIN QUESTIONS (4 marks each) ────────────────────────
  { id:"wr11", cat:"Costs & Revenue", difficulty:"SL", marks:4, q:"With reference to LuxCraft, a small furniture manufacturer, explain the difference between fixed costs and variable costs.", modelAnswer:"Fixed costs: costs that do not change with the level of output — they remain constant regardless of how many units LuxCraft produces. Examples include factory rent, equipment loan repayments, and management salaries.\n[1] explanation + [1] application to LuxCraft.\n\nVariable costs: costs that rise and fall directly in line with output — the more furniture LuxCraft produces, the higher these costs. Examples include timber, upholstery fabric, and wood stain.\n[1] explanation + [1] application to LuxCraft.\n\n[0] for a response that simply lists examples without explaining the distinction." },
  { id:"wr12", cat:"Sources of Finance", difficulty:"SL", marks:4, q:"With reference to PeakFit, a chain of gym clubs, explain the difference between internal and external sources of finance.", modelAnswer:"Internal sources: finance generated from within the business itself, without involving a third party. For PeakFit this could include retained profit from profitable years or the sale of unused gym equipment.\n[1] explanation + [1] application.\n\nExternal sources: finance obtained from outside the organisation, typically involving a lender or investor. For PeakFit this could include a bank loan to fund a new branch, or crowdfunding to finance new equipment.\n[1] explanation + [1] application." },
  { id:"wr13", cat:"Sources of Finance", difficulty:"SL", marks:4, q:"With reference to BrewHouse, a craft beer producer, explain one advantage and one disadvantage of using loan capital to fund expansion.", modelAnswer:"Advantage: BrewHouse retains full ownership and control — no equity is given up, so the founders keep all profits and retain strategic decision-making authority as they expand into new markets.\n[1] advantage identified + [1] applied to BrewHouse.\n\nDisadvantage: BrewHouse must make regular interest and principal repayments regardless of trading performance. If sales disappoint during expansion, the fixed repayment obligation could cause serious cash flow problems or insolvency.\n[1] disadvantage identified + [1] applied to BrewHouse." },
  { id:"wr14", cat:"Final Accounts", difficulty:"SL", marks:4, q:"With reference to NovaMed, a pharmaceutical company, explain the difference between current assets and non-current assets.", modelAnswer:"Current assets: short-term assets expected to be converted into cash or used within 12 months of the balance sheet date. For NovaMed these would include cash, trade debtors (hospitals owing payment), and stock of medicines ready for sale.\n[1] explanation + [1] application.\n\nNon-current assets: long-term assets held and used repeatedly in the business for more than 12 months, not intended for resale in the near term. For NovaMed these would include laboratory equipment, manufacturing machinery, and owned premises.\n[1] explanation + [1] application." },
  { id:"wr15", cat:"Sources of Finance", difficulty:"SL", marks:4, q:"With reference to SkyRide, an electric scooter rental business, explain one advantage and one disadvantage of crowdfunding as a source of finance.", modelAnswer:"Advantage: crowdfunding gives SkyRide access to a large pool of small investors without requiring collateral or a strong credit history — particularly valuable for a start-up that may be rejected by commercial banks. It also generates public awareness and a customer community before launch.\n[1] advantage + [1] application.\n\nDisadvantage: crowdfunding campaigns are highly competitive and time-consuming to run successfully. If SkyRide fails to reach its funding target on a platform like Kickstarter, it may receive nothing at all (all-or-nothing model), wasting significant marketing and preparation costs.\n[1] disadvantage + [1] application." },
  { id:"wr16", cat:"Cash Flow", difficulty:"SL", marks:4, q:"With reference to CleanEdge, a solar panel installation firm, explain the difference between profit and cash flow.", modelAnswer:"Profit: the surplus of total revenue over total costs for a given period, as shown on the statement of profit or loss. CleanEdge may record profit when an installation is completed and invoiced, even if the customer has not yet paid.\n[1] explanation + [1] application.\n\nCash flow: the actual movement of cash into and out of the business in real time. CleanEdge may be profitable on paper but experience negative cash flow if customers take 60–90 days to pay while CleanEdge must immediately pay its suppliers and installers.\n[1] explanation + [1] application.\n\n[0] for responses that treat profit and cash flow as interchangeable." },
  { id:"wr17", cat:"Final Accounts", difficulty:"HL", marks:4, q:"With reference to TerraFarm, an organic food producer, explain one advantage and one disadvantage of straight-line depreciation compared to the units of production method.", modelAnswer:"Advantage of straight-line: it is simple to calculate and apply consistently — TerraFarm's accountants can spread the cost of a harvesting machine evenly over its useful life each year without needing to track actual usage hours, reducing administrative complexity.\n[1] + [1] application.\n\nDisadvantage of straight-line: it assumes the asset loses value evenly each year regardless of how intensively it is used. For TerraFarm, seasonal machinery used heavily at harvest but idle for months is more accurately depreciated by the units of production method, which better reflects actual wear.\n[1] + [1] application." },
  { id:"wr18", cat:"Budgets & Variance", difficulty:"SL", marks:4, q:"With reference to PulseMedia, a digital advertising agency, explain one advantage and one disadvantage of zero-based budgeting compared to incremental budgeting.", modelAnswer:"Advantage of zero-based: every department at PulseMedia must justify all expenditure from scratch each period, eliminating wasteful legacy spending and ensuring budget allocations reflect current strategic priorities rather than historical inertia.\n[1] + [1] application.\n\nDisadvantage of zero-based: the process is extremely time-consuming and resource-intensive. PulseMedia's managers must prepare detailed justifications for every line item — in a fast-moving agency environment this could divert management time away from client work and creative output.\n[1] + [1] application." },

  // ── SECTION C: CALCULATION QUESTIONS ────────────────────────────────────
  { id:"wr19", cat:"Ratio Analysis", difficulty:"SL", marks:4, q:"Using the data below for Volta Electronics, calculate the gross profit margin and profit margin. Show all working.\n\nData:\nSales revenue: $850,000\nCost of sales: $510,000\nExpenses: $195,000\nInterest: $18,000\nTax: $25,500", modelAnswer:"Gross profit = $850,000 - $510,000 = $340,000\nGPM = ($340,000 / $850,000) × 100 = 40%\n[1] for working + [1] for correct answer.\n\nProfit before interest and tax = $340,000 - $195,000 = $145,000\nProfit margin = ($145,000 / $850,000) × 100 = 17.06%\n[1] for working + [1] for correct answer.\n\nOwn figure rule (OFR) applies — if gross profit is incorrect but carried forward correctly, award the method mark for profit margin." },
  { id:"wr20", cat:"Ratio Analysis", difficulty:"SL", marks:2, q:"Using the data below for Volta Electronics, calculate the ROCE. Show all working.\n\nData:\nNon-current liabilities: $120,000\nShare capital: $200,000\nRetained earnings: $155,000\nProfit before interest and tax: $145,000", modelAnswer:"Capital employed = Non-current liabilities + Equity\n= $120,000 + ($200,000 + $155,000)\n= $120,000 + $355,000 = $475,000\nROCE = ($145,000 / $475,000) × 100 = 30.53%\n\n[1] for correct capital employed + [1] for correct ROCE.\nAccept $475,000 derived as total assets minus current liabilities if student shows that working." },
  { id:"wr21", cat:"Ratio Analysis", difficulty:"SL", marks:4, q:"Using the data below for Volta Electronics, calculate the current ratio and acid test ratio. Show all working.\n\nData:\nCash: $18,000\nDebtors: $62,000\nStock: $45,000\nTrade creditors: $38,000\nShort-term loans: $22,000", modelAnswer:"Current assets = $18,000 + $62,000 + $45,000 = $125,000\nCurrent liabilities = $38,000 + $22,000 = $60,000\n\nCurrent ratio = $125,000 / $60,000 = 2.08:1\n[1] working + [1] answer.\n\nAcid test = ($125,000 - $45,000) / $60,000 = $80,000 / $60,000 = 1.33:1\n[1] working + [1] answer.\n\n[1] maximum if answer not expressed as a ratio (e.g. written as just \"2.08\")." },
  { id:"wr22", cat:"Ratio Analysis (HL)", difficulty:"HL", marks:4, q:"Using the data below for MapleGrove Retail, calculate the stock turnover in days and debtor days. Show all working.\n\nData:\nOpening stock: $40,000\nClosing stock: $56,000\nCost of sales: $336,000\nDebtors: $28,000\nSales revenue: $480,000", modelAnswer:"Average stock = ($40,000 + $56,000) / 2 = $48,000\nStock turnover (days) = ($48,000 / $336,000) × 365 = 52.1 days\n[1] for average stock + [1] for correct answer.\n\nDebtor days = ($28,000 / $480,000) × 365 = 21.3 days\n[1] working + [1] correct answer." },
  { id:"wr23", cat:"Final Accounts", difficulty:"HL", marks:4, q:"RidgeLine Construction purchased a crane for $180,000. It has a residual value of $12,000 and a useful life of 8 years. Using the straight-line method, calculate:\n(a) the annual depreciation charge\n(b) the net book value at the end of Year 3", modelAnswer:"(a) Annual depreciation = ($180,000 - $12,000) / 8 = $168,000 / 8 = $21,000 per year\n[1] formula + [1] answer.\n\n(b) Accumulated depreciation after 3 years = $21,000 × 3 = $63,000\nNBV = $180,000 - $63,000 = $117,000\n[1] accumulated depreciation + [1] NBV." },
  { id:"wr24", cat:"Final Accounts", difficulty:"HL", marks:4, q:"RidgeLine Construction estimates the crane will operate for a total of 42,000 hours before disposal. Using the units of production method, calculate the depreciation charge per hour and the charge for a year in which the crane is used for 6,200 hours.", modelAnswer:"Depreciation per hour = ($180,000 - $12,000) / 42,000 = $168,000 / 42,000 = $4.00 per hour\n[1] formula + [1] answer.\n\nAnnual charge = $4.00 × 6,200 = $24,800\n[1] method + [1] answer." },
  { id:"wr25", cat:"Investment Appraisal", difficulty:"SL", marks:2, q:"PrimePack is considering an investment of $75,000. Net cash flows are as follows:\nYear 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000\nCalculate the payback period.", modelAnswer:"Year | NCF       | Cumulative\n0    | ($75,000) | ($75,000)\n1    |  $15,000  | ($60,000)\n2    |  $22,000  | ($38,000)\n3    |  $24,000  | ($14,000)\n4    |  $20,000  |   $6,000\n\nRemaining after Y3 = $14,000\nTime in Y4 = ($14,000 / $20,000) × 12 = 8.4 months\nPayback period = 3 years 8.4 months\n\n[1] for correct cumulative cash flow table or working\n[1] for correct answer expressed in years and months." },
  { id:"wr26", cat:"Investment Appraisal", difficulty:"SL", marks:2, q:"Using the data from Q25, calculate the ARR for PrimePack's investment.\n\nNet cash flows: Year 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000\nInitial investment: $75,000", modelAnswer:"Total returns = $15,000 + $22,000 + $24,000 + $20,000 + $18,000 = $99,000\nTotal profit = $99,000 - $75,000 = $24,000\nAverage annual profit = $24,000 / 5 = $4,800\nARR = ($4,800 / $75,000) × 100 = 6.4%\n\n[1] for correct average annual profit + [1] for correct ARR with % sign." },
  { id:"wr27", cat:"Investment Appraisal", difficulty:"HL", marks:4, q:"Using the discount factors below, calculate the NPV for PrimePack's $75,000 investment.\n\nNet cash flows: Year 1: $15,000 | Year 2: $22,000 | Year 3: $24,000 | Year 4: $20,000 | Year 5: $18,000\n\nDiscount factors at 8%:\nY1 = 0.9259 | Y2 = 0.8573 | Y3 = 0.7938 | Y4 = 0.7350 | Y5 = 0.6806", modelAnswer:"Year | NCF ($)  | Discount Factor | PV ($)\n1    | 15,000   | 0.9259          | 13,888.50\n2    | 22,000   | 0.8573          | 18,860.60\n3    | 24,000   | 0.7938          | 19,051.20\n4    | 20,000   | 0.7350          | 14,700.00\n5    | 18,000   | 0.6806          | 12,250.80\n                  Total PV:         78,751.10\n\nNPV = $78,751.10 - $75,000 = $3,751.10\nPositive NPV — investment adds value.\n\n[1] correct discounting method applied to at least 3 years\n[1] correct total PV\n[1] deducting capital cost\n[1] correct NPV with $ sign\nOFR applies for arithmetic errors carried forward." },
  { id:"wr28", cat:"Budgets & Variance", difficulty:"SL", marks:4, q:"Using the budget data below for CrestLine Cafe, calculate the variance for each item and state whether it is favourable (F) or adverse (A).\n\nData:\n                          Budgeted ($)    Actual ($)\nFood & beverage sales       95,000         88,500\nCatering event revenue      18,000         23,000\nFood costs                  34,000         31,500\nStaff wages                 28,000         29,800", modelAnswer:"                          Variance        F/A\nFood & beverage sales     -$6,500         A\nCatering event revenue    +$5,000         F\nFood costs                -$2,500         F\nStaff wages               +$1,800         A\n\n[1] per correct variance + correct F/A label = max [4].\nFor revenue: actual > budgeted = F. For costs: actual < budgeted = F." },

  // ── SECTION D: STATEMENT OF PROFIT OR LOSS (4 marks each) ──────────────
  { id:"wr29", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using the data below, construct a Statement of Profit or Loss for ArcLight Studios for the year ended 30 June.\n\nData:\nSales revenue: $620,000\nCost of sales: $372,000\nRent & utilities: $68,000\nMarketing: $24,000\nAdmin & salaries: $82,000\nInterest: $14,000\nTax: $18,000\nDividends: $10,000", modelAnswer:"ArcLight Studios — Statement of Profit or Loss, year ended 30 June\n\nSales revenue                           $620,000\nCost of sales                          ($372,000)\nGross profit                            $248,000\nExpenses (68,000 + 24,000 + 82,000)   ($174,000)\nProfit before interest and tax           $74,000\nInterest                               ($14,000)\nProfit before tax                        $60,000\nTax                                    ($18,000)\nProfit for the period                    $42,000\nDividends                              ($10,000)\nRetained profit                          $32,000\n\n[4] fully correct in IB format\n[3] one error/omission\n[2] two errors or correct figures but wrong format\n[1] partial understanding of P&L structure\nOFR applies throughout." },
  { id:"wr30", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using the data below, construct a Statement of Profit or Loss for DriftLine Apparel for the year ended 31 March.\n\nData:\nSales revenue: $1,100,000\nCost of sales: $605,000\nSalaries: $180,000\nRent: $90,000\nMarketing: $35,000\nDepreciation: $22,000\nInterest: $28,000\nTax: $42,000\nDividends: $25,000", modelAnswer:"DriftLine Apparel — Statement of Profit or Loss, year ended 31 March\n\nSales revenue                                       $1,100,000\nCost of sales                                        ($605,000)\nGross profit                                          $495,000\nExpenses (180,000 + 90,000 + 35,000 + 22,000)       ($327,000)\nProfit before interest and tax                        $168,000\nInterest                                             ($28,000)\nProfit before tax                                     $140,000\nTax                                                  ($42,000)\nProfit for the period                                  $98,000\nDividends                                            ($25,000)\nRetained profit                                        $73,000\n\n[4] fully correct\n[3] one error\n[2] two errors or correct figures in wrong format\n[1] partial understanding.\nNote: depreciation is an expense, not part of cost of sales — mark down by one level if placed incorrectly." },

  // ── SECTION E: BALANCE SHEETS (4 marks each) ───────────────────────────
  { id:"wr31", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using the data below, construct a Statement of Financial Position for KineticSport as at 31 December.\n\nData:\nProperty, plant & equipment: $410,000\nAccumulated depreciation: $35,000\nCash: $22,000\nDebtors: $48,000\nStock: $31,000\nBank overdraft: $8,000\nTrade creditors: $42,000\nLong-term bank loan: $95,000\nShare capital: $220,000\nRetained earnings: $111,000", modelAnswer:"KineticSport — Statement of Financial Position as at 31 December\n\nNON-CURRENT ASSETS\nProperty, plant & equipment               $410,000\nAccumulated depreciation                  ($35,000)\nTotal non-current assets                            $375,000\n\nCURRENT ASSETS\nCash                                       $22,000\nDebtors                                    $48,000\nStock                                      $31,000\nTotal current assets                                $101,000\n\nTotal assets                                        $476,000\n\nCURRENT LIABILITIES\nBank overdraft                              $8,000\nTrade creditors                            $42,000\nTotal current liabilities                            $50,000\n\nNON-CURRENT LIABILITIES\nLong-term bank loan                        $95,000\nTotal non-current liabilities                        $95,000\n\nTotal liabilities                                   $145,000\nNet assets                                          $331,000\n\nEQUITY\nShare capital                             $220,000\nRetained earnings                         $111,000\nTotal equity                                        $331,000\n\n[4] fully correct, balances, correct IB format\n[3] largely correct but one misclassification or arithmetic error\n[2] does not balance or two classification errors\n[1] demonstrates some understanding of balance sheet structure." },
  { id:"wr32", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using the data below, construct a Statement of Financial Position for ClearView Optics as at 30 September.\n\nData:\nEquipment: $185,000\nAccumulated depreciation: $42,000\nCash: $9,000\nDebtors: $31,000\nStock: $27,000\nShort-term loans: $18,000\nTrade creditors: $29,000\nLong-term mortgage: $60,000\nShare capital: $80,000\nRetained earnings: $23,000", modelAnswer:"ClearView Optics — Statement of Financial Position as at 30 September\n\nNON-CURRENT ASSETS\nEquipment                                 $185,000\nAccumulated depreciation                  ($42,000)\nTotal non-current assets                            $143,000\n\nCURRENT ASSETS\nCash                                        $9,000\nDebtors                                    $31,000\nStock                                      $27,000\nTotal current assets                                 $67,000\n\nTotal assets                                        $210,000\n\nCURRENT LIABILITIES\nShort-term loans                           $18,000\nTrade creditors                            $29,000\nTotal current liabilities                            $47,000\n\nNON-CURRENT LIABILITIES\nLong-term mortgage                         $60,000\nTotal non-current liabilities                        $60,000\n\nTotal liabilities                                   $107,000\nNet assets                                          $103,000\n\nEQUITY\nShare capital                              $80,000\nRetained earnings                          $23,000\nTotal equity                                        $103,000\n\n[4] fully correct and balances\n[3] one error\n[2] two errors or does not balance\n[1] partial understanding." },

  // ── SECTION F: CASH FLOW FORECASTS (6 marks each) ──────────────────────
  { id:"wr33", cat:"Cash Flow", difficulty:"SL", marks:6, q:"Construct a cash flow forecast for NorthStar Events for the four months January–April using the data below.\n\nData:\nOpening balance (January): $5,500\nCash inflows:  Jan $18,000 | Feb $22,000 | Mar $31,000 | Apr $26,000\nCash outflows: Jan $21,000 | Feb $19,500 | Mar $25,000 | Apr $27,500", modelAnswer:"NorthStar Events — Cash Flow Forecast (Jan–Apr)\n\n                    Jan         Feb         Mar         Apr\nCash inflows     $18,000     $22,000     $31,000     $26,000\nCash outflows    $21,000     $19,500     $25,000     $27,500\nNet cash flow    ($3,000)     $2,500      $6,000     ($1,500)\nOpening balance   $5,500      $2,500      $5,000     $11,000\nClosing balance   $2,500      $5,000     $11,000      $9,500\n\n[6] error-free, correct format\n[4-5] one or two errors\n[2-3] correct format but three or more errors\n[1] some understanding of cash flow forecast structure.\nOFR: if one closing balance is wrong but correctly carried to the next opening balance, only penalise once." },
  { id:"wr34", cat:"Cash Flow", difficulty:"SL", marks:6, q:"Construct a cash flow forecast for PixelPrint for the three months October–December and answer the question below.\n\nData:\nOpening balance (October): -$2,000\nCash inflows:  Oct $14,500 | Nov $19,000 | Dec $28,500\nCash outflows: Oct $16,000 | Nov $17,500 | Dec $24,000\n\n(a) Construct the cash flow forecast. [4 marks]\n(b) Comment on PixelPrint's liquidity position over the three months. [2 marks]", modelAnswer:"(a)\nPixelPrint — Cash Flow Forecast (Oct–Dec)\n\n                    Oct         Nov         Dec\nCash inflows     $14,500     $19,000     $28,500\nCash outflows    $16,000     $17,500     $24,000\nNet cash flow    ($1,500)     $1,500      $4,500\nOpening balance  ($2,000)    ($3,500)    ($2,000)\nClosing balance  ($3,500)    ($2,000)     $2,500\n\n[4] fully correct | [3] one error | [2] two errors | [1] partial understanding. OFR applies.\n\n(b) PixelPrint's liquidity position is poor in October and November, with negative closing balances of -$3,500 and -$2,000 respectively, suggesting the business cannot meet its short-term obligations without external support such as an overdraft. However, the positive trend is encouraging — December's closing balance of $2,500 suggests the business is recovering, likely due to higher seasonal inflows. Management should arrange an overdraft facility to cover the October–November shortfall while trading through to December.\n\n[2] for a comment that uses data from the forecast." },

  // ── ORIGINAL QUESTIONS (renumbered) ────────────────────────────────────
  { id:"wr35", cat:"Costs & Revenue", difficulty:"SL", marks:3, q:"A business has total fixed costs of $18,000 and produces 600 units. Total variable costs are $12,000. Calculate the average cost per unit.", modelAnswer:"Total Costs = TFC + TVC = $18,000 + $12,000 = $30,000.\nAverage cost = TC / Q = $30,000 / 600 = $50 per unit.\n\n[1] for TC formula/calculation\n[1] for correct TC = $30,000\n[1] for correct AC = $50" },
  { id:"wr36", cat:"Cash Flow", difficulty:"SL", marks:4, q:"State two causes and two solutions to cash flow problems, using business examples.", modelAnswer:"Causes:\n(1) Overtrading — the business expands too fast, spending on stock and wages before receiving revenue.\n(2) Poor credit control — allowing debtors too long to pay (e.g., 90-day terms) means cash inflows are delayed.\n\nSolutions:\n(1) Debt factoring — selling outstanding invoices to a third party for immediate cash at a small discount.\n(2) Negotiating an overdraft — provides a short-term credit facility to bridge temporary shortfalls.\n\n[1] per cause identified (×2)\n[1] per solution identified (×2)" },
  { id:"wr37", cat:"Final Accounts", difficulty:"HL", marks:4, q:"A machine costs $80,000, has a residual value of $8,000, and a useful life of 6 years. Calculate (a) the annual straight-line depreciation and (b) the net book value after 2 years.", modelAnswer:"(a) Annual depreciation = (Cost − Residual value) / Useful life\n= ($80,000 − $8,000) / 6 = $72,000 / 6 = $12,000 per year.\n\n(b) Accumulated depreciation after 2 years = $12,000 × 2 = $24,000.\nNBV = $80,000 − $24,000 = $56,000.\n\n[1] for correct formula [1] for $12,000/year\n[1] for accumulated depreciation [1] for NBV = $56,000" },
  { id:"wr38", cat:"Ratio Analysis", difficulty:"SL", marks:6, q:"A business has: Sales revenue = $500,000 | Gross profit = $200,000 | Profit before interest and tax = $75,000 | Capital employed = $600,000. Calculate (a) GPM, (b) Profit margin, (c) ROCE and briefly interpret each.", modelAnswer:"(a) GPM = ($200,000 / $500,000) × 100 = 40%\n→ The business retains 40¢ of every $1 of revenue after direct costs.\n\n(b) Profit margin = ($75,000 / $500,000) × 100 = 15%\n→ Only 15¢ of every $1 survives after all operating expenses.\n\n(c) ROCE = ($75,000 / $600,000) × 100 = 12.5%\n→ For every $1 of capital employed, the business generates 12.5¢ of profit.\n\n[1] each for correct calculation (×3)\n[1] each for relevant interpretation (×3)" },
  { id:"wr39", cat:"Investment Appraisal", difficulty:"SL", marks:6, q:"An investment costs $48,000. Net cash flows: Year 1: $10,000 | Year 2: $14,000 | Year 3: $18,000 | Year 4: $16,000. Calculate (a) the payback period and (b) the ARR.", modelAnswer:"(a) Cumulative: Y1=$10,000 | Y2=$24,000 | Y3=$42,000 | Y4=$58,000.\nRemaining after Y3 = $48,000 − $42,000 = $6,000.\nTime in Y4 = ($6,000 / $16,000) × 12 = 4.5 months.\nPayback = 3 years 4.5 months.\n\n(b) Total returns = $58,000. Total profit = $58,000 − $48,000 = $10,000.\nAverage annual profit = $10,000 / 4 = $2,500.\nARR = ($2,500 / $48,000) × 100 = 5.21%.\n\n[1] cumulative cashflow table [1] correct payback period\n[1] total profit [1] average annual profit [1] correct ARR % [1] working shown" },
  { id:"wr40", cat:"Budgets & Variance", difficulty:"HL", marks:5, q:"Budgeted sales revenue: $80,000. Actual: $72,000. Budgeted costs: $55,000. Actual costs: $51,000. Calculate both variances, state whether favourable or adverse, and evaluate the overall impact on profit.", modelAnswer:"Revenue variance = $72,000 − $80,000 = −$8,000 → ADVERSE\n(Earned $8,000 less than planned)\n\nCost variance = $51,000 − $55,000 = −$4,000 → FAVOURABLE\n(Spent $4,000 less than planned)\n\nNet impact: Revenue shortfall (−$8,000) partially offset by cost savings (+$4,000) = net adverse effect of $4,000 on profit.\n\n[1] correct revenue variance [1] adverse identified\n[1] correct cost variance [1] favourable identified\n[1] evaluation of net profit impact" },
  { id:"wr41", cat:"Breakeven", difficulty:"SL", marks:5, q:"Fixed costs = $24,000. Selling price = $60. Variable cost = $20. (a) Calculate breakeven output. (b) Calculate the margin of safety if actual output is 800 units. (c) Calculate the output needed for a target profit of $16,000.", modelAnswer:"(a) Contribution = $60 − $20 = $40.\nBEQ = $24,000 / $40 = 600 units.\n\n(b) Margin of safety = 800 − 600 = 200 units.\n\n(c) Target profit quantity = (FC + Target profit) / Contribution\n= ($24,000 + $16,000) / $40 = $40,000 / $40 = 1,000 units.\n\n[1] contribution calculation [1] BEQ\n[1] margin of safety [1] target profit formula [1] correct answer" },
  { id:"wr42", cat:"BMT Tools", difficulty:"SL/HL", marks:4, q:"Explain how a Force Field Analysis could support a business decision to relocate its production overseas.", modelAnswer:"A Force Field Analysis (Lewin) identifies and weights driving forces (for the change) vs restraining forces (against it).\n\nDriving forces: lower labour costs overseas, access to new markets, government incentives, economies of scale.\n\nRestraining forces: high relocation costs, employee resistance/redundancies, supply chain disruption, reputational risk.\n\nIf driving forces outweigh restraining forces numerically, the decision is more viable. The tool also helps managers identify which restraining forces to reduce before committing.\n\n[1] definition of FFA [1] driving forces example\n[1] restraining forces example [1] how it aids decision-making" },
  { id:"wr43", cat:"Sources of Finance", difficulty:"SL", marks:4, q:"With reference to Hail Cheeser!, explain one advantage and one disadvantage of Manuel using internal sources of finance to open the new waterfront location.", modelAnswer:"Advantage: Manuel would retain full control over his business and all future profits — no interest payments are required, making it the cheapest form of finance. He avoids lengthy loan applications or investor meetings.\n\nDisadvantage: Manuel's retained profits are modest (he lost money in 3 of 12 months), so he may simply not have enough to fund the $20,000–$30,000 relocation. Using personal retirement savings also incurs a 10% early withdrawal penalty, increasing the actual cost.\n\n[1] advantage identified [1] applied to Hail Cheeser!\n[1] disadvantage identified [1] applied to Hail Cheeser!" },
  { id:"wr44", cat:"Costs & Revenue", difficulty:"SL", marks:4, q:"Using the Dunn Auto Repair case, explain the difference between fixed and indirect costs. Give one example of each from the case.", modelAnswer:"Fixed costs are costs that do not vary with the level of output — they remain constant regardless of how many services DAR performs. For example, Keith's salary of $5,000/month is paid whether DAR completes 10 repairs or 500.\n\nIndirect costs (overheads) are costs not directly attributable to a specific product or service. For example, utility expenses of $500/month and marketing costs of $150/month cannot be easily assigned to any individual oil change or repair job.\n\nNote: fixed costs often overlap with indirect costs, but indirect costs can occasionally vary (e.g., utilities rising in winter).\n\n[1] definition of fixed costs [1] example from DAR\n[1] definition of indirect costs [1] example from DAR" },
  { id:"wr45", cat:"Final Accounts", difficulty:"SL", marks:4, q:"Using Crispy Collin's accounts, construct the profit and loss account for the period ended 31 July. (Sales revenue: $85,000 | Rent: $14,000 | Marketing: $2,000 | Salaries/Admin/Insurance: $20,000 | Profit before interest and tax: $6,500 | Interest: $500 | Tax: $1,750)", modelAnswer:"Crispy Collin's — Statement of Profit or Loss\n\nSales revenue:              $85,000\nCost of sales:             ($42,500)  [85,000 − 42,500]\nGross profit:               $42,500\nExpenses (14+2+20):        ($36,000)\nProfit before interest/tax:  $6,500\nInterest:                     ($500)\nProfit before tax:           $6,000\nTax:                        ($1,750)\nProfit for the period:       $4,250\n\n[4] fully correct | [3] one error | [2] two errors | [1] shows some understanding of P&L layout" },
  { id:"wr46", cat:"Ratio Analysis", difficulty:"SL", marks:6, q:"Using Cedar Hill Books' financial ratios below, analyse the business's financial performance over three years.\n\nGPM: 39.5% → 38.2% → 38.5% | Profit Margin: 9.5% → 7.9% → 7.4% | Current Ratio: 1.75:1 → 1.6:1 → 1.55:1 | Acid Test: 1.1:1 → 0.85:1 → 0.86:1 | ROCE: 12.3% → 9.4% → 9.8%", modelAnswer:"GPM has remained broadly stable (39.5% to 38.5%), suggesting Cedar Hill manages its direct costs well — the slight dip in Year 2 may reflect the fading of the hit book's contribution.\n\nProfit margin has fallen from 9.5% to 7.4%, indicating rising indirect costs (expenses) relative to revenue — possibly increased marketing or admin costs as Cedar Hill adapts to e-books and audiobooks.\n\nROCE fell sharply in Year 2 (12.3% to 9.4%) but recovered slightly (9.8%), and remains well above the 3.5–4.5% loan interest range — Cedar Hill still generates strong returns on capital.\n\nLiquidity ratios show a concerning trend: the current ratio has fallen below 2:1 in all years, and the acid test dropped sharply from 1.1 to 0.85. This suggests declining short-term liquidity, although Year 3 shows slight stabilisation.\n\nOverall, Cedar Hill remains profitable and covers its cost of borrowing, but the declining profit margin and liquidity warrant attention.\n\n[2] for correct observations with data\n[2] for application/context\n[2] for analysis (cause + effect reasoning)" },
  { id:"wr47", cat:"Ratio Analysis (HL)", difficulty:"HL", marks:4, q:"Calculate the following ratios for Fresh Cucina using its published accounts (Opening stock: $75m; Closing stock: $65m; Cost of sales: $341m; Debtors: $10m; Sales revenue: $519m; Creditors: $49m; Non-current liabilities: $218m; Total equity: $427m):\n(a) Stock turnover (times)   (b) Debtor days   (c) Creditor days   (d) Gearing ratio", modelAnswer:"(a) Average stock = (75+65)/2 = $70m\nStock turnover = $341m / $70m = 4.87 times per year\n\n(b) Debtor days = ($10m / $519m) × 365 = 7.03 days\n\n(c) Creditor days = ($49m / $341m) × 365 = 52.45 days\n\n(d) Capital employed = $218m + $427m = $645m\nGearing = ($218m / $645m) × 100 = 33.8%\n\n[1] per correct answer (×4)" },
  { id:"wr48", cat:"Investment Appraisal", difficulty:"HL", marks:4, q:"On Air Sports is considering paying $6m upfront for 8-year broadcast rights generating $2m/year. Using discount factors provided (Y1=0.9259, Y2=0.8573, Y3=0.7938, Y4=0.7350, Y5=0.6806, Y6=0.6302, Y7=0.5835, Y8=0.5403), calculate the NPV.", modelAnswer:"Present values:\nY1: 2 × 0.9259 = $1.8518m\nY2: 2 × 0.8573 = $1.7146m\nY3: 2 × 0.7938 = $1.5876m\nY4: 2 × 0.7350 = $1.470m\nY5: 2 × 0.6806 = $1.3612m\nY6: 2 × 0.6302 = $1.2604m\nY7: 2 × 0.5835 = $1.167m\nY8: 2 × 0.5403 = $1.0806m\n\nTotal PV = $11.4932m\nNPV = $11.4932m − $6m = $5.4932m ≈ $5,493,200\n\nPositive NPV → the investment adds value in real money terms.\n\n[1] for correct discounting method\n[1] for total PV\n[1] for deducting investment cost\n[1] for correct NPV with $ sign" },
  { id:"wr49", cat:"Budgets & Variance", difficulty:"HL", marks:4, q:"Kicks Soccer Club budgeted membership revenue of $35,000 but received $38,000. Rent was budgeted at $20,000 but cost $21,000. (a) Calculate each variance and state F or A. (b) Explain one benefit of variance analysis to KSC's decision-making.", modelAnswer:"(a) Membership revenue variance = $38,000 − $35,000 = $3,000 FAVOURABLE\n(Actual > budgeted revenue = good)\n\nRent variance = $21,000 − $20,000 = $1,000 ADVERSE\n(Actual > budgeted cost = bad)\n\n(b) Variance analysis helps KSC identify areas of overspending or unexpected income. For example, knowing rent exceeded budget by $1,000 allows management to renegotiate facility terms or allocate more funds to rent in the 2025 budget, improving financial control and planning accuracy.\n\n[1] correct revenue variance [1] F/A correctly identified\n[1] correct cost variance [1] F/A correctly identified\n(Benefit = up to 2 marks if writing extended answer)" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10-MARK WRITTEN QUESTIONS
// ───────────────────────���─────────────────────────────────────────────────────
const WRITTEN_10_MARK_QUESTIONS = [
  { id:"wr10m-1", cat:"Ratio Analysis", difficulty:"HL", marks:10, q:"ZephyrTech Solutions (ZTS) is a software development company founded in 2019 by Priya Sharma in Dublin, Ireland. ZTS specialises in building custom enterprise software for mid-sized companies across Europe, charging premium prices based on its reputation for high-quality, bespoke solutions. The company currently employs 34 full-time developers, project managers, and support staff.\n\nZTS has experienced strong revenue growth over the past three years, but Priya has become increasingly concerned about the company's profitability ratios, which have declined despite rising revenues. A key issue is ZTS's cost structure: developer salaries account for approximately 58% of total revenue, and the company recently moved into a larger office space in central Dublin, significantly increasing its monthly rent. ZTS also invested €180,000 in new server infrastructure last year, financed through a long-term bank loan.\n\nPriya is now evaluating two strategic options to address the declining profit margins:\n\nOption 1: Transition from bespoke project work to a Software-as-a-Service (SaaS) model, offering a standardised product to a much larger customer base at a lower price point per customer. This would require an upfront investment of €250,000 in product development and would not generate significant revenue for at least 18 months.\n\nOption 2: Reduce the workforce by 20% (approximately 7 staff members) through redundancies, focusing cuts on support roles rather than core development. Priya estimates this would reduce annual salary costs by approximately €420,000 but acknowledges it would likely reduce ZTS's capacity to take on new projects in the short term.\n\nSelected financial data for ZTS for the year ended 31 December 2025:\n\nSales revenue: $3,200k | Cost of sales: $1,856k | Gross profit: $1,344k | Expenses: $1,108k | Profit before interest and tax: $236k | Interest: $42k | Tax: $38k | Profit for the period: $156k | Capital employed: $1,850k | Industry average profit margin: 12% | Industry average ROCE: 18%\n\nEvaluate the two strategic options available to Priya to improve ZTS's profitability ratios.", modelAnswer:"Candidates should demonstrate understanding of profitability ratios and apply them to the ZTS context before evaluating the two options.\n\nRelevant calculations (not required but rewarded if used):\n• Profit margin = (236 / 3,200) × 100 = 7.375% — significantly below the industry average of 12%.\n• ROCE = (236 / 1,850) × 100 = 12.76% — below the industry average of 18%.\n• GPM = (1,344 / 3,200) × 100 = 42%.\n\nThe data confirms that ZTS's profitability is below industry benchmarks, primarily driven by high expenses (€1,108,000) relative to gross profit (€1,344,000), leaving a thin margin between gross and net profit.\n\nOption 1 — Transition to SaaS model:\n\nAdvantages:\n• A SaaS model generates recurring subscription revenue, which is more predictable and scalable than one-off bespoke projects. If ZTS acquires a large enough customer base, revenue per developer could rise significantly, improving both profit margin and ROCE over time.\n• The standardised nature of SaaS reduces the labour intensity per unit of revenue — developers build once and sell repeatedly, which directly addresses the core problem of salary costs at 58% of revenue.\n• ZTS could retain its premium brand positioning by targeting enterprise clients with a high-quality SaaS product, differentiating itself from lower-cost competitors.\n\nDisadvantages:\n• The €250,000 upfront investment with no meaningful revenue for 18 months poses a serious cash flow risk. Given ZTS already carries a long-term bank loan for the server infrastructure, adding further financial strain could threaten liquidity — particularly if existing project revenue slows.\n• The SaaS market is highly competitive, dominated by large established players. ZTS has no track record in this model, and there is no guarantee the product will attract sufficient customers to justify the investment.\n• Staff skilled in bespoke development may not have the product mindset required for SaaS, potentially requiring costly retraining or new hires — further pressuring expenses in the short term.\n• The transition away from bespoke work may alienate ZTS's existing loyal client base, reducing revenue before SaaS income materialises.\n\nOption 2 — Workforce reduction of 20%:\n\nAdvantages:\n• Reducing annual salary costs by €420,000 would dramatically improve the profit margin. If all else remains equal, profit before interest and tax would rise from €236,000 to approximately €656,000, bringing the profit margin to approximately 20.5% — well above the 12% industry average.\n• ROCE would also improve significantly: (€656,000 / €1,850,000) × 100 = approximately 35.5%.\n• The savings are immediate and certain, unlike the speculative 18-month revenue gap in Option 1.\n• Focusing cuts on support roles rather than developers minimises the impact on ZTS's core value-creating activity and client-facing quality.\n\nDisadvantages:\n• Priya acknowledges reduced capacity for new projects — this could lead to revenue decline, partially offsetting the cost savings. If revenue falls, the improvement in profit margin may be less dramatic than the raw calculation suggests.\n• Redundancies carry one-off costs (severance pay, legal fees) that will reduce profit in the year the cuts are made, potentially worsening short-term profitability before improving it.\n• Staff morale and company culture may suffer significantly. In a knowledge-intensive business like software development, demotivated staff are less productive, and key developers may leave voluntarily — turning a planned 20% reduction into an uncontrolled talent exodus.\n• ZTS's reputation as a premium employer could be damaged, making future recruitment of skilled developers harder and more expensive.\n\nEvaluation/Judgement:\nBoth options present credible paths to improved profitability but carry very different risk profiles. Option 2 offers faster, more certain financial improvement — the numbers clearly show profit margin could exceed industry benchmarks immediately. However, it carries significant people and capacity risk in a talent-dependent business. Option 1 is a longer-term structural solution that could fundamentally transform ZTS's cost model, but the 18-month revenue gap and competitive uncertainty make it high-risk given ZTS's already-below-average profitability.\n\nA strong answer might argue that Option 2 is the more prudent immediate choice to stabilise the business financially, while Option 1 could be pursued as a medium-term strategy once profitability is restored. Alternatively, one may argue that Option 2 is a short-term tactic that does not address ZTS's structural cost problem and that the SaaS transition, though risky, is the only path to sustainable margin improvement. Accept any substantiated judgement.\n\nLevel descriptors:\n9–10: Balanced, accurate analysis of both options with integrated use of financial data, well-developed application to ZTS, and a substantiated conclusion that acknowledges limitations.\n7–8: Mostly addresses both options with relevant theory and data use; some balance; conclusion present but may lack depth.\n5–6: Partial analysis, mostly one-sided or lacking data integration; some application to ZTS.\n3–4: Some understanding of the options but limited analysis; superficial application.\n1–2: Little understanding; no real application or argument." },
  { id:"wr10m-2", cat:"Ratio Analysis", difficulty:"HL", marks:10, q:"NorthHaven Dairy (NHD) is a family-owned dairy producer based in rural Canada, established in 1987. NHD produces a premium range of organic cheeses, yoghurts, and flavoured milks, which it sells through independent health food stores and a small number of regional supermarket chains. NHD's products command a significant price premium over conventional dairy brands, justified by the company's commitment to 100% grass-fed, certified organic farming practices.\n\nOver the past two years, NHD has faced a difficult trading environment. A national cost-of-living crisis has made consumers more price sensitive, and several supermarket partners have reduced their orders or switched shelf space to cheaper own-label alternatives. As a result, NHD's factory is currently operating at approximately 65% of full capacity. Fixed costs, including the lease on the production facility and permanent staff salaries, remain unchanged despite the lower output — significantly increasing NHD's cost per unit and squeezing profit margins.\n\nNHD's head of finance, Daniel Park, has presented two options to the board:\n\nOption 1: Launch a lower-priced, non-organic \"NorthHaven Everyday\" sub-brand using conventional (non-certified) milk sourced from a cheaper supplier, targeting price-sensitive consumers through mainstream supermarkets. Daniel estimates this could increase total revenue by 30% within 12 months.\n\nOption 2: Invest $180,000 in a direct-to-consumer (DTC) e-commerce platform, allowing NHD to sell directly to customers online and bypass supermarket intermediaries entirely. This would improve NHD's margin per unit sold but would require significant upfront marketing spend and would take at least 18 months to generate meaningful revenue.\n\nSelected financial data for NHD for the year ended 31 January 2025:\n\nSales revenue: $1,500k | Cost of sales: $900k | Gross profit: $600k | Expenses: $400k | Profit before interest and tax: $200k | Interest: $50k | Tax: $40k | Profit for the period: $110k | Dividends: $40k | Retained profit: $70k | Non-current liabilities: $75k | Equity: $800k | Industry average profit margin: 9%\n\nEvaluate the two options available to NHD's board to improve its financial performance.", modelAnswer:"Candidates should demonstrate understanding of relevant financial concepts — profitability ratios, costs, revenue — and apply them to the NHD context before evaluating the two options.\n\nRelevant calculations (not required but rewarded if used):\n• Profit margin = (200 / 1,500) × 100 = 13.33% — above the 9% industry average, suggesting NHD is currently profitable relative to peers despite the difficult environment.\n• ROCE = (200 / 875) × 100 = 22.86%.\n• GPM = (600 / 1,500) × 100 = 40%.\nCandidates with strong financial understanding may note that NHD's margins are currently above industry average, meaning the real problem is not margin quality but volume — the factory running at 65% capacity means fixed costs are spread over fewer units, inflating cost per unit and threatening future profitability if volume continues to decline.\n\nOption 1 — NorthHaven Everyday sub-brand:\n\nAdvantages:\n• A 30% revenue increase would be transformative — adding approximately $450,000 in revenue, which at even a modest margin would significantly improve profit and ROCE. It also addresses the capacity utilisation problem directly by using the factory's idle 35%.\n• Price-sensitive consumers who currently buy competing products could be captured without cannibalising NHD's premium customer base, if brand separation is managed well.\n• Lower input costs (non-certified conventional milk) would improve the cost of sales position for the new sub-brand, potentially delivering acceptable margins even at a lower price point.\n\nDisadvantages:\n• This directly contradicts NHD's core brand identity of 100% certified organic farming. The premium brand relies on this ethical positioning to justify its price premium — if existing loyal customers perceive that NHD has \"sold out,\" revenue from the premium range could fall, offsetting the gains from the sub-brand.\n• Supermarkets that already have own-label alternatives may not see sufficient reason to stock NorthHaven Everyday alongside their existing cheaper options, limiting distribution reach.\n• Managing two brands with different supply chains, certifications, and marketing messages significantly increases operational complexity and overhead costs — which are already high at 65% capacity.\n• There is reputational and regulatory risk: organic certification bodies may scrutinise NHD's operations more closely, and any cross-contamination or labelling confusion between the organic and non-organic ranges could result in the loss of NHD's organic certification entirely.\n\nOption 2 — Direct-to-consumer e-commerce platform:\n\nAdvantages:\n• By eliminating supermarket intermediaries, NHD captures the full retail margin rather than sharing it — this directly improves profit per unit sold without needing to raise prices or cut costs elsewhere.\n• A DTC model builds a direct relationship with NHD's most loyal, health-conscious consumers, providing valuable data on purchasing behaviour that can inform future product development.\n• The DTC model is fully consistent with NHD's premium, ethical brand — it arguably strengthens the brand narrative by emphasising the farm-to-doorstep story.\n\nDisadvantages:\n• The $180,000 investment comes at a time when NHD is already under revenue pressure. With retained profit of only $70,000, NHD would likely need to use loan capital or deplete reserves to fund this, increasing financial risk.\n• The 18-month revenue lag means NHD must sustain its current financial position for over a year before DTC revenues become meaningful — if the capacity utilisation problem continues to worsen in the meantime, NHD may not survive long enough to benefit.\n• Building DTC brand awareness requires significant ongoing marketing investment beyond the $180,000 platform cost. NHD has limited experience in digital marketing, and competing for consumer attention online against well-funded competitors is costly.\n• DTC volumes are unlikely to fully replace supermarket channel volumes in the near term, meaning the capacity utilisation problem may persist.\n\nEvaluation/Judgement:\nBoth options carry significant risk for NHD's well-established brand. Option 1 offers faster, larger-scale revenue recovery but at potential cost to the organic brand equity that is NHD's most valuable and irreplaceable asset — once lost, organic certification and consumer trust are extremely difficult to rebuild. Option 2 preserves brand integrity and improves unit economics but is a slow solution to what is currently an urgent capacity and fixed cost problem.\n\nA strong answer might argue that Option 1 is too risky given NHD's brand dependence — a decline in premium range sales could more than offset the sub-brand gains, leaving NHD worse off. Option 2 is the strategically safer choice and should be combined with aggressive short-term cost management (e.g., reducing temporary staff or renegotiating the facility lease) to bridge the 18-month gap. Alternatively, a candidate may argue that without addressing the volume problem urgently, NHD's above-average margins are unsustainable and Option 1's revenue boost is essential for survival. Accept any substantiated judgement. A conclusion must be present and linked to specific NHD context data to access Level 3+.\n\nLevel descriptors: Same as Q1." },
  { id:"wr10m-3", cat:"Ratio Analysis", difficulty:"HL", marks:10, q:"Solaris Fitness Group (SFG) is a privately owned chain of premium gym clubs operating 12 locations across Australia. Founded in 2014 by CEO Mia Nakamura, SFG differentiates itself from budget gym competitors through high-end facilities, personalised coaching programmes, and a strong community-focused culture. Membership fees are significantly higher than the market average, but SFG has historically justified this premium through exceptional member experience and low churn rates.\n\nOver the past 18 months, SFG has seen its financial position deteriorate. The company took on $2.4 million in long-term debt to fund the opening of four new locations in 2023, and while these locations are growing their membership bases, they have not yet reached breakeven. Meanwhile, three of SFG's older, established locations are facing increased competition from a new budget gym chain that has opened directly nearby, resulting in membership cancellations and declining average revenue per member.\n\nSFG's finance director, James Okafor, is particularly concerned about the company's gearing ratio and its impact on investor confidence. He has presented the board with two options:\n\nOption 1: Close the two lowest-performing new locations (both opened in 2023 and both operating at a loss), crystallising a one-off write-off of approximately $320,000 in non-current assets, but reducing ongoing losses and freeing up management capacity to focus on profitable locations.\n\nOption 2: Issue $1,000,000 in new share capital to three existing investors who have expressed interest in increasing their stakes, using the proceeds to partially repay long-term debt and fund a targeted marketing campaign to defend market share at the three threatened locations.\n\nSelected financial data for SFG for the year ended 30 June 2025:\n\nSales revenue: $8,400k | Cost of sales: $2,520k | Gross profit: $5,880k | Expenses: $5,460k | Profit before interest and tax: $420k | Interest: $192k | Profit before tax: $228k | Tax: $68k | Profit for the period: $160k | Total equity: $3,200k | Non-current liabilities: $2,400k | Current assets: $620k | Stock: $85k | Current liabilities: $710k\n\nEvaluate the two options available to SFG's board to improve the company's financial position.", modelAnswer:"Candidates should demonstrate understanding of gearing, liquidity, and profitability concepts and apply them to the SFG context.\n\nRelevant calculations (not required but rewarded if used):\n• Profit margin = (420 / 8,400) × 100 = 5% — very thin for a premium fitness business.\n• ROCE: Capital employed = 2,400 + 3,200 = $5,600,000. ROCE = (420 / 5,600) × 100 = 7.5%.\n• Gearing = (2,400 / 5,600) × 100 = 42.86% — approaching the high-gearing threshold of 50%.\n• Current ratio = 620 / 710 = 0.87:1 — below the ideal of 2:1, indicating a liquidity problem.\n• Acid test = (620 − 85) / 710 = 535 / 710 = 0.75:1 — below the 1:1 benchmark.\n• Interest represents 192/420 × 100 = 45.7% of PBIT — a very high proportion, illustrating the burden of debt.\n\nOption 1 — Close two underperforming locations:\n\nAdvantages:\n• Eliminating ongoing losses from the two new locations immediately reduces cash outflows and improves net cash flow, addressing SFG's below-ideal liquidity position (current ratio 0.87:1).\n• Management focus can be redirected to the 10 remaining, more profitable locations, potentially improving service quality and defending membership at the threatened locations.\n• Reduced operational scope may allow some fixed cost savings (staff, equipment leases) that improve the thin 5% profit margin going forward.\n• Stopping the losses prevents further deterioration of the equity position and gearing ratio.\n\nDisadvantages:\n• The $320,000 asset write-off will significantly reduce profit for the period, potentially pushing SFG into a loss for the year — this would alarm investors and lenders and could trigger loan covenant breaches.\n• Closing newly opened locations sends a negative signal to the market about SFG's strategic execution and management credibility, potentially deterring future investment.\n• Members at the closed locations will be displaced and may not transfer to other SFG sites — SFG could lose those memberships entirely to competitors, reducing revenue.\n• The gearing ratio is not directly improved by Option 1 — the long-term debt of $2.4 million remains, and interest payments of $192,000 per year continue to consume nearly half of PBIT.\n\nOption 2 — Issue $1,000,000 in new share capital:\n\nAdvantages:\n• If $1,000,000 in equity is raised and used to repay debt, non-current liabilities could fall from $2,400,000 to $1,400,000. New gearing = approximately 28–30%, well below the 50% danger threshold and a significant improvement.\n• Reduced debt means lower annual interest payments, directly improving profit margin. If interest falls from $192,000 to approximately $112,000, profit before tax rises by $80,000 — a 35% improvement.\n• The remaining proceeds invested in marketing could defend membership at the three threatened locations, protecting revenue.\n• Improved gearing and profitability could restore investor confidence and improve SFG's credit rating, lowering future borrowing costs.\n\nDisadvantages:\n• Issuing new shares to existing investors dilutes Mia Nakamura's ownership stake, potentially reducing her control over strategic decisions — a significant concern given SFG's culture-driven business model depends heavily on her vision.\n• The investors increasing their stakes will expect a share of future profits — if SFG's expansion succeeds, the equity cost could far exceed the interest savings in the long run.\n• The marketing campaign's effectiveness is uncertain — if competitor gyms continue to undercut SFG on price, no amount of marketing may prevent membership churn at the threatened locations.\n• The share issue does not resolve the operating losses at the two new locations — SFG will continue to absorb those costs, limiting the overall improvement in financial performance.\n\nEvaluation/Judgement:\nSFG faces two simultaneous problems: a gearing/liquidity problem and an operational losses problem. Option 1 addresses operational losses but leaves the debt burden intact and creates a damaging one-off write-off. Option 2 directly addresses gearing and provides marketing resources but does not resolve the loss-making locations. A strong candidate will recognise that the two options are not mutually exclusive — ideally, SFG should close the underperforming locations AND issue new equity.\n\nForced to choose between the two in isolation, Option 2 is arguably the stronger strategic choice: the gearing improvement and interest saving are structural and long-lasting, whereas closing two locations is a short-term operational fix that does not address SFG's core debt problem. However, Option 2 requires investor confidence in SFG's future — if the marketing campaign fails to defend the threatened locations, SFG's revenue could continue to decline, making even the improved debt position unsustainable. Accept any substantiated judgement linked to SFG's specific data.\n\nLevel descriptors: Same as Q1." },
  { id:"wr10m-4", cat:"Ratio Analysis", difficulty:"HL", marks:10, q:"Meridian Publishing House (MPH) is a medium-sized independent publisher based in Toronto, Canada. MPH publishes fiction and non-fiction books across three divisions: Adult Trade, Children's, and Academic. The company has been in operation for 28 years and has built a respected reputation for high-quality editorial standards and author relationships. MPH is a private limited company with four shareholders, including founder and CEO Clara Bouchard, who holds a 55% majority stake.\n\nThe publishing industry has undergone significant structural change in recent years. E-book and audiobook sales have grown rapidly, while physical book sales through traditional bookstore channels have declined. MPH has been slow to adapt — its e-book catalogue covers only 40% of its titles, and it has no audiobook offering. Meanwhile, a key title in the Children's division that accounted for 18% of total revenue for two consecutive years has now moved out of its peak sales period, and no equivalent title has emerged to replace it.\n\nMPH's CFO, Antoine Dupont, has identified a significant deterioration in the company's working capital position. MPH pays its printing suppliers within 30 days but allows retail bookstores 90-day payment terms — a legacy arrangement from when MPH needed to build retail relationships. This mismatch is placing increasing pressure on cash flow.\n\nAntoine has proposed two options to the board:\n\nOption 1: Renegotiate payment terms with the top 20 retail bookstore accounts, reducing debtor days from the current 82 days to 45 days, offering a 1.5% early payment discount as an incentive. Antoine estimates this would free up approximately $280,000 in working capital.\n\nOption 2: Invest $400,000 in building a full audiobook production capability, converting the entire back catalogue over 24 months and launching a subscription-based audiobook service directly to consumers. The CFO projects this would generate $350,000 in new annual revenue by Year 3, with modest cash flow in Years 1 and 2.\n\nSelected financial data for MPH for the year ended 31 December 2024:\n\nSales revenue: $4,200k | Cost of sales: $2,310k | Gross profit: $1,890k | Expenses: $1,540k | Profit before interest and tax: $350k | Interest: $65k | Tax: $57k | Profit for the period: $228k | Debtors: $945k | Creditors: $193k | Cash: $48k | Stock: $310k | Current liabilities: $380k | Non-current liabilities: $520k | Total equity: $1,640k\n\nEvaluate the two options available to MPH to improve its financial position.", modelAnswer:"Candidates should demonstrate understanding of working capital, liquidity, cash flow, and investment appraisal concepts, applying them to the MPH context.\n\nRelevant calculations (not required but rewarded if used):\n• Current assets = 945 + 48 + 310 = $1,303,000.\n• Current ratio = 1,303 / 380 = 3.43:1 — appears healthy on the surface.\n• Acid test = (1,303 − 310) / 380 = 993 / 380 = 2.61:1 — also appears strong.\n• However, debtors of $945,000 represent 72.6% of current assets — the ratios are flattering but mask that most current assets are tied up in slow-paying debtors.\n• Debtor days = (945 / 4,200) × 365 = 82.1 days — confirmed.\n• Creditor days = (193 / 2,310) × 365 = 30.5 days — MPH pays suppliers in ~30 days but waits 82 days to collect from retailers — a significant working capital cycle mismatch.\n• Gearing = 520 / (520 + 1,640) × 100 = 24.1% — low gearing, healthy.\n• Profit margin = (350 / 4,200) × 100 = 8.33%.\n\nOption 1 — Renegotiate debtor payment terms:\n\nAdvantages:\n• Reducing debtor days from 82 to 45 days would unlock approximately $280,000 in working capital — equivalent to nearly 6 times MPH's current cash balance of $48,000. This would dramatically improve MPH's real liquidity and reduce reliance on any overdraft facility.\n• New debtor days of 45 would be much more aligned with the 30-day creditor payment cycle, significantly improving the working capital cycle mismatch that is currently the root cause of cash flow stress.\n• The 1.5% early payment discount is a relatively low cost for the benefit received — at $4,200,000 revenue, even if all retail accounts took the discount, the maximum annual cost is approximately $63,000, likely offset by reduced financing costs and improved cash position.\n• This is a low-risk, operationally straightforward intervention — no new capabilities, staff, or technology are required.\n\nDisadvantages:\n• Bookstore accounts that have benefited from 90-day terms for years may resist the change and seek alternative publishers who maintain more favourable terms — MPH risks losing key distribution relationships at a time when physical retail is already declining.\n• The 1.5% discount permanently reduces revenue per sale for accounts that take it up — if all 20 accounts claim the discount on all orders, the financial benefit of improved cash flow may be partially offset.\n• This option does not address MPH's underlying structural challenge of declining physical book sales and the absence of an audiobook offering — it is a cash flow fix, not a revenue growth strategy.\n\nOption 2 — Invest in audiobook capability:\n\nAdvantages:\n• Audiobooks are the fastest-growing format in publishing, with strong consumer adoption driven by commuting, fitness, and convenience. Entering this market positions MPH for long-term revenue diversification that reduces dependence on declining physical sales.\n• A direct-to-consumer subscription service would improve MPH's margin per unit sold compared to retail channels, and recurring subscription revenue is more predictable and financially stable than one-off book sales.\n• Converting the full back catalogue creates a substantial, durable asset — once produced, audiobook files generate revenue with minimal additional cost.\n• MPH's strong author relationships and editorial reputation are genuine competitive advantages in attracting authors who want high-quality audiobook production.\n\nDisadvantages:\n• The $400,000 investment is very large relative to MPH's current cash balance of $48,000. With low gearing (24.1%), MPH could borrow, but this would increase the interest burden on an already modest profit margin of 8.33%.\n• The 24-month production timeline and 3-year revenue projection mean MPH must sustain its current financial pressure for a considerable period before the investment pays off — a significant risk given the already tight cash position.\n• The audiobook subscription market is competitive, with Audible (Amazon) dominating. An independent publisher's subscription service may struggle to achieve the marketing scale and consumer awareness needed to reach the $350,000 revenue projection.\n• Production of quality audiobooks requires specialist skills (audio engineers, voice talent, project management) that MPH does not currently possess — building this capability in-house carries execution risk.\n\nEvaluation/Judgement:\nThe two options address fundamentally different problems. Option 1 addresses an immediate, structural cash flow problem caused by a debtor/creditor mismatch that should arguably have been corrected years ago — it is low-risk, fast-acting, and self-funding. Option 2 addresses the longer-term strategic challenge of revenue diversification in a changing industry — it is high-risk, slow-acting, and requires significant capital that MPH does not currently have in cash.\n\nA strong answer might argue that Option 1 should be prioritised as an urgent financial necessity — with only $48,000 in cash, MPH is one large late payment from a liquidity crisis. Once working capital is stabilised, Option 2 can be pursued from a position of financial security. Candidates may also note that Option 1 could partially fund Option 2 — the $280,000 freed up from better debtor management could contribute meaningfully to the $400,000 audiobook investment.\n\nAlternatively, a candidate may argue that Option 2 is the more strategically important choice — without revenue diversification, MPH's profitability will continue to decline as physical sales shrink, and no amount of working capital management will prevent eventual financial distress. In this case, the candidate should acknowledge the need for loan capital to bridge the cash gap. Accept any substantiated judgement clearly linked to MPH's specific financial data.\n\nLevel descriptors: Same as Q1." },
  { id:"wr10m-5", cat:"Ratio Analysis", difficulty:"HL", marks:10, q:"BlueLine Logistics (BLL) is a freight and distribution company based in Manchester, United Kingdom, providing road-based logistics services to manufacturers, retailers, and e-commerce businesses. BLL operates a fleet of 85 heavy goods vehicles (HGVs) and employs 210 staff, including drivers, warehouse operatives, and administrative personnel. The company was founded in 2001 and has grown steadily, primarily through contracts with three major retail clients that together account for 71% of BLL's annual revenue.\n\nThe logistics industry in the UK is currently experiencing significant disruption. Fuel costs rose sharply over the past two years and remain elevated, directly increasing BLL's variable costs per delivery. A national shortage of qualified HGV drivers has forced BLL to offer higher wages and signing bonuses to retain and recruit drivers, significantly increasing fixed labour costs. At the same time, BLL's three major retail clients are applying downward pressure on contract renewal prices, citing competition from larger national logistics providers.\n\nBLL's CEO, Richard Fenn, has identified two priorities: reducing cost per delivery and reducing client concentration risk. He is considering the following options:\n\nOption 1: Invest $1,800,000 in replacing 25 of the oldest HGVs in the fleet with new electric vehicles (EVs). Richard estimates the EVs would reduce fuel and maintenance costs by approximately $240,000 per year once fully operational. The vehicles would be purchased using a combination of $600,000 from retained earnings and a $1,200,000 long-term loan at 5.5% interest over 8 years.\n\nOption 2: Allocate $300,000 to a dedicated sales and business development team to actively pursue contracts with e-commerce and pharmaceutical clients, targeting smaller accounts to diversify away from the three major retail clients. Richard estimates this could generate $950,000 in new annual revenue within 2 years, though this is uncertain and dependent on competitive tender outcomes.\n\nSelected financial data for BLL for the year ended 31 December 2025:\n\nSales revenue: $12,600k | Cost of sales: $8,820k | Gross profit: $3,780k | Expenses: $2,940k | Profit before interest and tax: $840k | Interest: $145k | Tax: $139k | Profit for the period: $556k | Retained earnings: $1,240k | Non-current liabilities: $980k | Total equity: $3,860k | Current assets: $1,420k | Stock: $210k | Current liabilities: $860k | Industry average profit margin: 8%\n\nEvaluate the two strategic options available to Richard to improve BLL's financial performance and reduce business risk.", modelAnswer:"Candidates should demonstrate understanding of relevant financial and business management concepts — investment appraisal, sources of finance, gearing, profitability, and risk — and apply them specifically to the BLL context.\n\nRelevant calculations (not required but rewarded if used):\n• Profit margin = (840 / 12,600) × 100 = 6.67% — below the 8% industry average.\n• GPM = (3,780 / 12,600) × 100 = 30%.\n• ROCE: Capital employed = 980 + 3,860 = $4,840,000. ROCE = (840 / 4,840) × 100 = 17.36%.\n• Current ratio = 1,420 / 860 = 1.65:1 — below ideal of 2:1.\n• Acid test = (1,420 − 210) / 860 = 1,210 / 860 = 1.41:1 — acceptable.\n• Gearing = 980 / 4,840 × 100 = 20.25% — low, significant borrowing headroom available.\n• Annual interest on new loan = $1,200,000 × 5.5% = $66,000. New total interest = approximately $211,000. New profit before tax = approximately $629,000.\n• If $240,000 cost saving is achieved, new PBIT = approximately $1,080,000, profit margin = approximately 8.57% — above industry average.\n\nOption 1 — EV fleet investment:\n\nAdvantages:\n• The $240,000 annual saving in fuel and maintenance costs directly improves BLL's cost of sales, addressing the core margin problem. If the saving is achieved, the profit margin could rise from 6.67% to approximately 8.57%, surpassing the 8% industry average.\n• Electric vehicles insulate BLL from future fuel price volatility, which has been a major source of financial unpredictability. This improves the reliability of cash flow forecasting.\n• With current gearing of only 20.25%, BLL has significant capacity to absorb the $1,200,000 additional loan without approaching high-gearing territory. New gearing = (980 + 1,200) / (4,840 + 1,200) = 2,180 / 6,040 = 36.1% — still well below 50%.\n• EV adoption may strengthen BLL's competitive positioning with environmentally conscious clients and could be a requirement for contract renewals with retailers who have net-zero commitments.\n• Using $600,000 of retained earnings reduces the loan required, limiting additional interest burden.\n\nDisadvantages:\n• The additional annual interest of $66,000 on the new loan partially offsets the $240,000 cost saving in the short term, meaning the net profit improvement is approximately $174,000 rather than the full $240,000.\n• EV HGV technology is less mature than conventional vehicles — reliability, charging infrastructure coverage on long-haul routes, and range limitations could introduce operational disruptions that offset maintenance savings.\n• The investment does not address BLL's client concentration risk — 71% revenue dependency on three clients remains, meaning a single contract loss could be devastating regardless of cost improvements.\n• Using $600,000 of retained earnings will reduce BLL's equity and worsen the current ratio from an already below-ideal 1.65:1 — liquidity could become a concern.\n\nOption 2 — Sales team and revenue diversification:\n\nAdvantages:\n• Reducing client concentration from 71% to a lower level is arguably the most important risk management priority for BLL. A single contract termination from one major retail client could eliminate 20–25% of revenue overnight — diversification directly protects long-term financial stability.\n• The pharmaceutical and e-commerce sectors offer strong growth prospects and tend to require more frequent, time-sensitive deliveries, which may support higher contract pricing and better margins than bulk retail logistics.\n• The $300,000 investment is substantially smaller than the $1,800,000 EV investment, preserving more of BLL's retained earnings and maintaining a better liquidity position.\n• A dedicated business development team builds a long-term commercial capability that continues to generate new revenue beyond the initial 2-year projection.\n\nDisadvantages:\n• The $950,000 revenue projection is highly uncertain — it depends on winning competitive tenders against established logistics providers with greater scale and potentially lower costs. BLL has no guaranteed return on the $300,000 investment.\n• Additional revenue without cost management does not directly fix the below-industry profit margin of 6.67%. If new contracts are won at thin margins (to be competitive), revenue growth may not translate into meaningful profit improvement.\n• A new sales team adds to BLL's fixed cost base — if the revenue target is not met in Year 2, BLL will have incurred $300,000 in costs with limited financial return.\n• The two-year timeline means BLL remains exposed to client concentration risk for at least another 24 months during which any of the three major clients could choose not to renew contracts.\n\nEvaluation/Judgement:\nBoth options address real and important problems at BLL, but they address different dimensions of risk. Option 1 directly improves profitability metrics — bringing the profit margin above the industry average — and hedges against fuel price risk. Option 2 addresses existential concentration risk but with uncertain financial returns. A strong candidate will recognise that BLL's low gearing (20.25%) means it has financial capacity to pursue both options simultaneously or sequentially.\n\nForced to prioritise, a candidate might argue that Option 1 should be implemented first, as the financial improvement is more predictable (the cost savings are largely within BLL's control) and the gearing implications are manageable. Option 2 can follow once the cost savings begin to flow through. However, a candidate may equally argue that concentration risk is the more urgent existential threat — if a major retail client cancels during a period when BLL is servicing a large new loan, the combination could be devastating. In that case, the lower-capital Option 2 is the more prudent immediate step.\n\nA top-band response will integrate the financial data throughout the argument, acknowledge the limitations of the available information (e.g. we do not know the contract renewal dates for the three major clients, or the detailed EV reliability data for BLL's specific routes), and arrive at a justified conclusion that explicitly references BLL's context. Accept any substantiated judgement.\n\nLevel descriptors: Same as Q1." },
];

const CAT_COLORS = {
  "Costs & Revenue":"#0070F3","Cash Flow":"#00B4D8","Final Accounts":"#00CC88",
  "Ratio Analysis":"#F5A623","Ratio Analysis (HL)":"#F5A623","Investment Appraisal":"#7928CA",
  "Budgets & Variance":"#EE0000","Breakeven":"#00CC88","BMT Tools":"#FF0080",
  "Sources of Finance":"#F5A623"
};

const ALL_CATS = ["All", ...Array.from(new Set(MCQ_QUESTIONS.map(q=>q.cat)))];

// ─────────────────────────────────────��───────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ChecklistView() {
  const [checked, setChecked] = useState(() => loadLS("checklist_checked", {}));
  const [openSections, setOpenSections] = useState(() => {
    const collapsed = loadLS("checklist_collapsed", {});
    return CHECKLIST_SECTIONS.filter(s => !collapsed[s.id]).map(s => s.id);
  });
  const toggle = id => setChecked(p => { const next = { ...p, [id]: !p[id] }; saveLS("checklist_checked", next); return next; });
  const handleAccordion = (value) => {
    setOpenSections(value);
    const collapsed = {};
    CHECKLIST_SECTIONS.forEach(s => { if (!value.includes(s.id)) collapsed[s.id] = true; });
    saveLS("checklist_collapsed", collapsed);
  };
  const totalItems = CHECKLIST_SECTIONS.reduce((s,sec)=>s+sec.items.length,0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount/totalItems)*100);
  const progColor = progress<30?"#F87171":progress<70?"#FBBF24":"#34D399";

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Progress card */}
      <Paper
        bg="#0A0A0A"
        radius="lg"
        p="xl"
        mb="xl"
        style={{
          border: "1px solid #1F1F1F",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Group justify="space-between" mb="xs">
          <Text fz="sm" c="#A1A1A1" ff="'Geist Mono', monospace">Overall Progress</Text>
          <Text fz={24} fw={800} c={progColor}>{progress}%</Text>
        </Group>
        <Progress
          value={progress}
          size="md"
          radius="xl"
          color={progColor}
          animated
          styles={{ root: { background: "#171717" } }}
        />
        <Group justify="space-between" mt="sm">
          <Text fz="xs" c="#666666">{checkedCount} of {totalItems} topics covered</Text>
          <Badge size="xs" variant="light" color="teal" ff="'Geist Mono', monospace">auto-saved</Badge>
        </Group>
      </Paper>

      {/* Sections */}
      <Accordion
        multiple
        value={openSections}
        onChange={handleAccordion}
        variant="separated"
        radius="md"
        styles={{
          item: { backgroundColor: "#0A0A0A", border: "1px solid #1F1F1F", marginBottom: 12, "&[data-active]": { borderColor: "#333333" } },
          control: { padding: "14px 20px", "&:hover": { backgroundColor: "#111111" } },
          content: { padding: "4px 20px 16px", borderTop: "1px solid #1F1F1F" },
          chevron: { color: "#666666" },
        }}
      >
        {CHECKLIST_SECTIONS.map(section => {
          const sectionChecked = section.items.filter((_,i)=>checked[`${section.id}-${i}`]).length;
          const allDone = sectionChecked===section.items.length;
          return (
            <Accordion.Item value={section.id} key={section.id} style={{ borderLeft: `4px solid ${section.color}` }}>
              <Accordion.Control>
                <Group gap="sm">
                  <Badge
                    variant="light"
                    size="sm"
                    fw={700}
                    ff="'Geist Mono', monospace"
                    style={{ backgroundColor: section.color + "22", color: section.color, border: "none" }}
                  >
                    {sectionChecked}/{section.items.length}
                  </Badge>
                  <Text fw={600} fz="sm" c={allDone ? section.color : "#EDEDED"}>
                    {allDone && "✓ "}{section.title}
                  </Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap={4}>
                  {section.items.map((item,i) => {
                    const key = `${section.id}-${i}`;
                    const isChecked = checked[key];
                    const isImportant = item.includes("MEMORISE");
                    return (
                      <Checkbox
                        key={key}
                        checked={!!isChecked}
                        onChange={() => toggle(key)}
                        label={item}
                        color={section.color}
                        radius="sm"
                        styles={{
                          root: { padding: "6px 4px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s", "&:hover": { backgroundColor: "#111111" } },
                          label: { color: isChecked ? "#666666" : isImportant ? "#FBBF24" : "#D4D4D4", textDecoration: isChecked ? "line-through" : "none", fontSize: 14, lineHeight: 1.5, cursor: "pointer" },
                          input: { cursor: "pointer" },
                        }}
                      />
                    );
                  })}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Text ta="center" mt="lg" c="#666666" fz="xs">
        Click any item to mark it as revised ·{" "}
        <Text component="span" c="#0070F3" style={{cursor:"pointer"}} onClick={()=>{ setChecked({}); saveLS("checklist_checked", {}); }}>Reset all</Text>
      </Text>
    </div>
  );
}

function FlashCard({card, catColor}) {
  const [flipped,setFlipped]=useState(false);
  return (
    <div className="flashcard-container" onClick={()=>setFlipped(f=>!f)}>
      <div className={`flashcard-inner${flipped ? " flipped" : ""}`}>
        {/* Front */}
        <Paper
          className="flashcard-face"
          bg="#111111"
          style={{
            border: "1px solid #1F1F1F",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            alignItems: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <Text fz={11} ff="'Geist Mono', monospace" c="#666666" tt="uppercase" lts={2} mb="md">TERM</Text>
          <Text fz={20} fw={700} c="#EDEDED" lh={1.3}>{card.term}</Text>
          <Text fz={11} c="#666666" mt="lg">tap to reveal</Text>
        </Paper>
        {/* Back */}
        <Paper
          className="flashcard-face flashcard-back"
          bg="#111111"
          style={{
            border: "1px solid #1F1F1F",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            padding: 20,
            overflowY: "auto",
          }}
        >
          <Text fz={11} ff="'Geist Mono', monospace" c="#666666" tt="uppercase" lts={2} mb="sm">DEFINITION</Text>
          <Text fz={13} c="#D4D4D4" lh={1.65}>{card.def}</Text>
          {card.formula && (
            <Box mt="sm" p="sm" style={{ background: "#050505", borderRadius: 8, borderLeft: `3px solid ${catColor}` }}>
              <Text fz={10} ff="'Geist Mono', monospace" c={catColor} lts={1} mb={4}>FORMULA</Text>
              <Text fz={12} ff="'Geist Mono', monospace" c="#A9E6FF">{card.formula}</Text>
            </Box>
          )}
        </Paper>
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
      {/* Category filters */}
      <Group gap={8} mb="lg" style={{flexWrap:"wrap"}}>
        {FLASHCARD_CATEGORIES.map(cat=>(
          <Button
            key={cat.id}
            size="xs"
            radius="xl"
            variant={activeCat===cat.id ? "filled" : "subtle"}
            ff="'Geist Mono', monospace"
            onClick={()=>{ setActiveCat(cat.id); saveLS("fc_cat", cat.id); setCardIdx(0); }}
            style={{
              backgroundColor: activeCat===cat.id ? cat.color : "#111111",
              color: activeCat===cat.id ? "#fff" : "#A1A1A1",
              border: `1px solid ${activeCat===cat.id ? cat.color : "#1F1F1F"}`,
            }}
          >
            {cat.label}
          </Button>
        ))}
      </Group>

      {/* Progress */}
      <Group justify="space-between" mb="md">
        <Text fz="xs" c="#666666" ff="'Geist Mono', monospace">{cardIdx+1} / {currentCat.cards.length} — {currentCat.label}</Text>
        <Box style={{background:"#111111",borderRadius:99,height:4,width:140,overflow:"hidden"}}>
          <div style={{width:`${((cardIdx+1)/currentCat.cards.length)*100}%`,height:"100%",background:currentCat.color,borderRadius:99,transition:"width 0.3s"}}/>
        </Box>
      </Group>

      {/* Card */}
      <FlashCard key={`${activeCat}-${cardIdx}`} card={currentCard} catColor={currentCat.color}/>

      {/* Navigation */}
      <Group grow gap="sm" mt="md">
        <Button
          variant="subtle"
          color="gray"
          size="md"
          radius="md"
          disabled={cardIdx===0}
          onClick={()=>setCardIdx(i=>Math.max(0,i-1))}
          styles={{ root: { backgroundColor: "#111111", border: "1px solid #1F1F1F", "&:disabled": { backgroundColor: "#0A0A0A", borderColor: "#171717" } } }}
        >
          Previous
        </Button>
        <Button
          size="md"
          radius="md"
          disabled={cardIdx===currentCat.cards.length-1}
          onClick={()=>setCardIdx(i=>Math.min(currentCat.cards.length-1,i+1))}
          style={{
            background: cardIdx===currentCat.cards.length-1 ? "#171717" : currentCat.color,
            border: "none",
          }}
        >
          Next
        </Button>
      </Group>
      <Text ta="center" fz="xs" c="#666666" mt="md">Tap any card to flip it</Text>
    </div>
  );
}

function MCQItem({q, displayNum}) {
  const [selected,setSelected]=useState(null);
  const [confirmed,setConfirmed]=useState(false);
  const color=CAT_COLORS[q.cat]||"#0070F3";
  const { recordAttempt, resetTimer } = useAttemptTracker(q.id, "mcq", q.cat, "business", q.difficulty);
  return (
    <Paper bg="#111111" radius="lg" mb="sm" style={{ border:"1px solid #1F1F1F", overflow:"hidden", transition:"all 0.2s" }}>
      <div style={{borderLeft:`4px solid ${color}`,padding:"18px 20px"}}>
        <Group gap={8} mb="sm" style={{flexWrap:"wrap"}}>
          <Badge size="xs" ff="'Geist Mono', monospace" style={{backgroundColor:color,color:"#fff"}}>MCQ</Badge>
          <Badge size="xs" variant="light" ff="'Geist Mono', monospace" style={{backgroundColor:color+"22",color:color,border:"none"}}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'Geist Mono', monospace" style={{backgroundColor:"#171717",color:"#A1A1A1",border:"none"}}>{q.difficulty}</Badge>
        </Group>
        <Text fz={15} c="#EDEDED" lh={1.6} fw={600}>Q{displayNum}. {q.q}</Text>
      </div>
      <Stack gap={8} p="md" pt="sm">
        {q.options.map((opt,i) => {
          const isSelected=selected===i;
          const isCorrect=i===q.answer;
          let bg="#0A0A0A",border="#1F1F1F",tc="#D4D4D4";
          if(confirmed){
            if(isCorrect){bg="#34D399"+"22";border="#34D399";tc="#6EE7B7";}
            else if(isSelected&&!isCorrect){bg="#F87171"+"22";border="#F87171";tc="#FCA5A5";}
          } else if(isSelected){bg=color+"22";border=color;tc="#EDEDED";}
          return (
            <Paper
              key={i}
              p="sm"
              radius="md"
              onClick={()=>{if(!confirmed)setSelected(i);}}
              style={{
                background:bg, border:`1.5px solid ${border}`,
                cursor:confirmed?"default":"pointer", transition:"all 0.2s",
                "&:hover": !confirmed && !isSelected ? {borderColor: color+"66"} : undefined,
              }}
              onMouseEnter={e=>{if(!confirmed&&!isSelected)e.currentTarget.style.borderColor=color+"66";}}
              onMouseLeave={e=>{if(!confirmed&&!isSelected)e.currentTarget.style.borderColor="#1F1F1F";}}
            >
              <Group gap="sm" wrap="nowrap">
                <Box style={{
                  width:28,height:28,borderRadius:6,flexShrink:0,
                  background:confirmed&&isCorrect?"#34D399":confirmed&&isSelected&&!isCorrect?"#F87171":isSelected?color:"#1F1F1F",
                  display:"flex",alignItems:"center",justifyContent:"center",
                }}>
                  <Text fz={11} ff="'Geist Mono', monospace" c="#fff" fw={700}>
                    {confirmed&&isCorrect?"✓":confirmed&&isSelected&&!isCorrect?"✗":String.fromCharCode(65+i)}
                  </Text>
                </Box>
                <Text fz={14} c={tc} lh={1.4}>{opt}</Text>
              </Group>
            </Paper>
          );
        })}
        {!confirmed ? (
          <Button
            mt={4}
            fullWidth
            radius="md"
            disabled={selected===null}
            onClick={()=>{if(selected!==null){setConfirmed(true);recordAttempt({userAnswer:selected,isCorrect:selected===q.answer});}}}
            style={{
              background: selected!==null ? color : "#171717",
              border: "none",
            }}
            styles={{ root: { "&:disabled": { backgroundColor: "#171717", color: "#666666" } } }}
          >
            Check Answer
          </Button>
        ) : (
          <Alert
            mt={4}
            radius="md"
            variant="light"
            color={selected===q.answer ? "green" : "red"}
            title={selected===q.answer ? "Correct!" : "Incorrect"}
            styles={{
              root: { backgroundColor: selected===q.answer ? "#34D399"+"11" : "#F87171"+"11", border: `1px solid ${selected===q.answer ? "#34D399" : "#F87171"}44` },
              title: { fontFamily: "'Geist Mono', monospace", fontSize: 12 },
            }}
          >
            <Text fz="sm" c="#A1A1A1" lh={1.6}>{q.explanation}</Text>
            <Button variant="subtle" size="xs" color="gray" mt="sm" onClick={()=>{setSelected(null);setConfirmed(false);resetTimer();}}>Try Again</Button>
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}

function PracticeView() {
  const [filterCat,setFilterCat]=useState("All");

  const catMatchFn = (qCat, fCat) => {
    if (fCat === "All") return true;
    const normalise = s => s.replace(" (HL)","").toLowerCase();
    return normalise(qCat) === normalise(fCat);
  };

  const filtered = MCQ_QUESTIONS.filter(q => catMatchFn(q.cat, filterCat));

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Category filter */}
      <Group gap={8} mb="lg" style={{flexWrap:"wrap"}}>
        {ALL_CATS.map(cat => {
          const c = CAT_COLORS[cat] || "#0070F3";
          const active = filterCat === cat;
          return (
            <Button
              key={cat}
              size="xs"
              radius="xl"
              ff="'Geist Mono', monospace"
              onClick={()=>setFilterCat(cat)}
              style={{
                backgroundColor: active ? c : "#111111",
                color: active ? "#fff" : "#A1A1A1",
                border: `1px solid ${active ? c : "#1F1F1F"}`,
                boxShadow: "none",
              }}
            >
              {cat}
            </Button>
          );
        })}
      </Group>

      {/* Summary */}
      <Text fz="xs" c="#666666" ff="'Geist Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length!==1?"s":""}{filterCat!=="All"?` · ${filterCat}`:""}
      </Text>

      {filtered.length === 0 && (
        <Text ta="center" py={40} c="#666666" fz="sm">No questions match this filter.</Text>
      )}

      {filtered.map((q, i) => (
        <MCQItem key={q.id} q={q} displayNum={i + 1} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITTEN PRACTICE (with text boxes)
// ─────────────────────────────────────────────────────────────────────────────

function WrittenPracticeItem({q, displayNum}) {
  const [answer, setAnswer] = useState(() => loadLS(`written_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`written_grade_${q.id}`, null));
  const color = CAT_COLORS[q.cat] || "#0070F3";
  const { recordAttempt } = useAttemptTracker(q.id, "written", q.cat, "business", q.difficulty);

  useEffect(() => { saveLS(`written_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`written_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.q,
          studentAnswer: answer,
          expectedAnswer: q.modelAnswer,
          marks: q.marks,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setGradeResult({ score: null, feedback: data.details || data.error });
      } else {
        setGradeResult({ score: data.score, maxMarks: data.maxMarks || q.marks, feedback: data.feedback });
        recordAttempt({ userAnswer: answer, score: data.score, maxMarks: data.maxMarks || q.marks });
      }
    } catch (err) {
      setGradeResult({ score: null, feedback: "Could not connect to grading server. Please try again later." });
    } finally {
      setGrading(false);
    }
  };

  const scorePct = gradeResult?.score != null ? gradeResult.score / (gradeResult.maxMarks || q.marks) : 0;
  const scoreColor = gradeResult?.score != null
    ? scorePct >= 0.75 ? "#34D399" : scorePct >= 0.4 ? "#FBBF24" : "#F87171"
    : "#A1A1A1";

  return (
    <Paper bg="#111111" radius="lg" mb="md" style={{border:"1px solid #1F1F1F", overflow:"hidden"}}>
      <div style={{borderLeft:`4px solid ${color}`, padding:"18px 20px"}}>
        <Group gap={8} mb="sm" style={{flexWrap:"wrap"}}>
          <Badge size="xs" ff="'Geist Mono', monospace" style={{backgroundColor:color+"22", color, border:"none"}}>{q.cat}</Badge>
          <Badge size="xs" variant="light" ff="'Geist Mono', monospace" style={{backgroundColor:"#171717", color:"#A1A1A1", border:"none"}}>{q.difficulty}</Badge>
          <Badge size="xs" ff="'Geist Mono', monospace" ml="auto" style={{backgroundColor:"#2A2800", color:"#FBBF24", border:"1px solid #5A4A00"}}>[ {q.marks} marks ]</Badge>
        </Group>
        <Text fz={15} c="#EDEDED" lh={1.6} fw={600} style={{whiteSpace:"pre-line"}}>Q{displayNum}. {q.q}</Text>
      </div>

      <div style={{padding:"12px 20px 16px"}}>
        <Textarea
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
          placeholder="Type your answer here..."
          minRows={5}
          radius="md"
          mb="sm"
          disabled={grading}
          styles={{
            input: {
              backgroundColor: "#0A0A0A",
              borderColor: "#1F1F1F",
              color: "#EDEDED",
              fontSize: 14,
              lineHeight: 1.6,
              "&:focus": { borderColor: color },
              "&::placeholder": { color: "#666666" },
            },
          }}
        />

        <Group gap="sm">
          <Button
            size="sm"
            radius="md"
            ff="'Geist Mono', monospace"
            onClick={handleSolve}
            loading={grading}
            disabled={!answer.trim() || grading}
            loaderProps={{ type: "dots" }}
            style={{
              background: answer.trim() && !grading ? "#0070F3" : "#171717",
              border: "none",
            }}
          >
            Solve
          </Button>
          <Button
            size="sm"
            radius="md"
            variant={revealed ? "subtle" : "light"}
            color={revealed ? "gray" : undefined}
            ff="'Geist Mono', monospace"
            onClick={()=>setRevealed(r=>!r)}
            style={revealed ? {} : {
              backgroundColor: color + "22",
              color: color,
              border: `1px solid ${color}44`,
            }}
          >
            {revealed ? "Hide Markscheme" : "Show Markscheme"}
          </Button>
          {answer.trim() && !grading && (
            <Button
              size="sm"
              radius="md"
              variant="subtle"
              color="gray"
              ff="'Geist Mono', monospace"
              onClick={()=>{ setAnswer(""); setGradeResult(null); saveLS(`written_ans_${q.id}`, ""); saveLS(`written_grade_${q.id}`, null); }}
            >
              Clear
            </Button>
          )}
        </Group>

        {/* AI Grade Result */}
        {gradeResult && (
          <Alert
            mt="md"
            radius="md"
            variant="light"
            color={gradeResult.score == null ? "gray" : scorePct >= 0.75 ? "green" : scorePct >= 0.4 ? "yellow" : "red"}
            title={gradeResult.score != null ? `AI Score: ${gradeResult.score}/${gradeResult.maxMarks || q.marks}` : "Grading Error"}
            styles={{
              root: {
                backgroundColor: (gradeResult.score == null ? "#A1A1A1" : scoreColor) + "11",
                border: `1px solid ${gradeResult.score == null ? "#A1A1A1" : scoreColor}44`,
              },
              title: { fontFamily: "'Geist Mono', monospace", fontSize: 12 },
            }}
          >
            {gradeResult.score != null && (
              <Progress
                value={scorePct * 100}
                color={scoreColor}
                size="sm"
                radius="xl"
                mb="sm"
                animated
                styles={{ root: { background: "#171717" } }}
              />
            )}
            <Text fz="sm" c="#A1A1A1" lh={1.6}>{gradeResult.feedback}</Text>
          </Alert>
        )}

        <Collapse in={revealed}>
          <Box mt="md" pt="md" style={{borderTop:"1px solid #1F1F1F"}}>
            <Text fz={11} ff="'Geist Mono', monospace" c="#34D399" lts={1} mb="sm">MARKSCHEME</Text>
            <Text fz={13} c="#A3A3A3" lh={1.7} style={{whiteSpace:"pre-line"}}>{q.modelAnswer}</Text>
          </Box>
        </Collapse>
      </div>
    </Paper>
  );
}

function WrittenPracticeView() {
  const [mode, setMode] = useState("short"); // "short" or "10mark"
  const [filterCat, setFilterCat] = useState("All");

  const writtenCats = ["All", ...Array.from(new Set(WRITTEN_QUESTIONS.map(q => q.cat)))];

  const catMatchFn = (qCat, fCat) => {
    if (fCat === "All") return true;
    const normalise = s => s.replace(" (HL)","").toLowerCase();
    return normalise(qCat) === normalise(fCat);
  };

  const filtered = mode === "10mark"
    ? WRITTEN_10_MARK_QUESTIONS
    : WRITTEN_QUESTIONS.filter(q => catMatchFn(q.cat, filterCat));

  return (
    <div style={{maxWidth:1060, margin:"0 auto", padding:"0 0 40px"}}>
      <Paper bg="#0A0A0A" radius="lg" p="lg" mb="xl" style={{border:"1px solid #1F1F1F"}}>
        <Text fz="sm" c="#EDEDED" fw={600} mb={4}>Written Practice</Text>
        <Text fz="xs" c="#A1A1A1" lh={1.5}>
          Answer each question in the text box, then reveal the markscheme to compare.
        </Text>
      </Paper>

      {/* Mode selector — Short Answer / 10 Marker / Specimen (link) */}
      <Group gap={10} mb="lg">
        <Button
          radius="md"
          ff="'Geist Mono', monospace"
          fw={700}
          onClick={()=>{ setMode("short"); setFilterCat("All"); }}
          style={{
            flex: 1,
            height: 48,
            backgroundColor: mode === "short" ? "#0070F3" : "#111111",
            color: mode === "short" ? "#fff" : "#A1A1A1",
            border: `2px solid ${mode === "short" ? "#0070F3" : "#1F1F1F"}`,
            fontSize: 15,
            lineHeight: 1,
            boxShadow: mode === "short" ? "0 0 16px #0070F333" : "none",
          }}
        >
          Short Answer
        </Button>
        <Button
          radius="md"
          ff="'Geist Mono', monospace"
          fw={700}
          onClick={()=>setMode("10mark")}
          style={{
            flex: 1,
            height: 48,
            backgroundColor: mode === "10mark" ? "#F87171" : "#111111",
            color: mode === "10mark" ? "#fff" : "#A1A1A1",
            border: `2px solid ${mode === "10mark" ? "#F87171" : "#1F1F1F"}`,
            fontSize: 15,
            lineHeight: 1,
            boxShadow: mode === "10mark" ? "0 0 16px #F8717133" : "none",
          }}
        >
          10 Marker
        </Button>
        <Button
          component="a"
          href="/specimen"
          radius="md"
          ff="'Geist Mono', monospace"
          fw={700}
          style={{
            flex: 1,
            height: 48,
            backgroundColor: "#111111",
            color: "#00CC88",
            border: "2px solid #00CC88",
            fontSize: 15,
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          Specimen →
        </Button>
      </Group>

      {/* Category filter — only for short answer mode */}
      {mode === "short" && (
        <Group gap={8} mb="lg" style={{flexWrap:"wrap"}}>
          {writtenCats.map(cat => {
            const c = CAT_COLORS[cat] || "#0070F3";
            const active = filterCat === cat;
            return (
              <Button
                key={cat}
                size="xs"
                radius="xl"
                ff="'Geist Mono', monospace"
                onClick={()=>setFilterCat(cat)}
                style={{
                  backgroundColor: active ? c : "#111111",
                  color: active ? "#fff" : "#A1A1A1",
                  border: `1px solid ${active ? c : "#1F1F1F"}`,
                  boxShadow: "none",
                }}
              >
                {cat}
              </Button>
            );
          })}
        </Group>
      )}

      <Text fz="xs" c="#666666" ff="'Geist Mono', monospace" mb="lg">
        Showing {filtered.length} question{filtered.length!==1?"s":""}{mode === "short" && filterCat!=="All"?` · ${filterCat}`:""}
        {mode === "10mark" ? " · 10 Markers" : ""}
      </Text>

      {filtered.length === 0 && (
        <Text ta="center" py={40} c="#666666" fz="sm">No questions match this filter.</Text>
      )}

      {filtered.map((q, i) => (
        <WrittenPracticeItem key={q.id} q={q} displayNum={i + 1} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const { user } = useAuth();
  const [tab, setTab] = useState(() => loadLS("revision_tab", "checklist"));
  const switchTab = t => { setTab(t); saveLS("revision_tab", t); };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box mih="100vh" bg="#000000" style={{fontFamily:"'Geist', sans-serif",color:"#EDEDED"}}>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <Box
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Sidebar */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : -220,
          width: 220,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "#050505",
          borderRight: "1px solid #111111",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: 8,
          transition: "left 0.25s ease",
        }}
      >
        <Text fz={11} ff="'Geist Mono', monospace" c="#666666" lts={1} mb={4} px={8}>
          SUBJECTS
        </Text>
        {[
          { label: "Business", active: true, href: "/" },
          { label: "History", active: false, href: "/history" },
          ...(user ? [{ label: "Dashboard", active: false, href: "/dashboard" }] : []),
        ].map(s => (
          <Button
            key={s.label}
            component={s.active ? "button" : "a"}
            href={s.active ? undefined : s.href}
            radius="md"
            ff="'Geist Mono', monospace"
            fw={600}
            onClick={() => setSidebarOpen(false)}
            style={{
              height: 44,
              justifyContent: "flex-start",
              paddingLeft: 14,
              fontSize: 14,
              backgroundColor: s.active ? "#0070F3" : "transparent",
              color: s.active ? "#fff" : "#A1A1A1",
              border: s.active ? "none" : "1px solid transparent",
              boxShadow: s.active ? "0 0 12px #0070F333" : "none",
              textDecoration: "none",
            }}
          >
            {s.label}
          </Button>
        ))}

        <Box style={{ flex: 1 }} />
        <Text fz={10} c="#404040" ff="'Geist Mono', monospace" ta="center">
          More subjects coming soon
        </Text>
      </Box>

      {/* Sticky header with glassmorphism */}
      <Box
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            {/* Sidebar toggle */}
            <Button
              onClick={() => setSidebarOpen(o => !o)}
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#A1A1A1",
                border: "1px solid #1F1F1F",
                padding: "4px 10px",
                minWidth: "auto",
                height: 32,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'Geist Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#0070F318", color: "#3291FF", border: "none" }}
            >
              IB HL Business Management
            </Badge>
            <LoginButton />
          </Group>
          <Text
            ta="center" fw={800}
            fz={{ base: 22, sm: 30 }}
            c="#EDEDED"
            style={{ letterSpacing: -0.5 }}
          >
            Finance Unit — Revision Hub
          </Text>
          <Text ta="center" fz="xs" c="#666666" mb="sm">
            Units 3.1–3.9 · 5.5 Breakeven · BMT Tools · {MCQ_QUESTIONS.length} MCQs · {WRITTEN_QUESTIONS.length} Written · {WRITTEN_10_MARK_QUESTIONS.length} Extended
          </Text>

          <Group gap={4} grow>
            {[
              { value: "checklist", label: "Checklist" },
              { value: "flashcards", label: "Flashcards" },
              { value: "practice", label: "Multi-Choice" },
              { value: "written", label: "Written" },
            ].map(t => (
              <Button
                key={t.value}
                onClick={() => switchTab(t.value)}
                radius={0}
                fw={600}
                ff="'Geist', sans-serif"
                style={{
                  fontSize: 13,
                  padding: "10px 4px 12px",
                  backgroundColor: "transparent",
                  color: tab === t.value ? "#EDEDED" : "#666666",
                  borderBottom: tab === t.value ? "3px solid #0070F3" : "3px solid transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                  transition: "all 0.2s",
                }}
              >
                {t.label}
              </Button>
            ))}
          </Group>
        </Container>
      </Box>

      {/* Content */}
      <Container size="lg" py="xl" px="md">
        {tab==="checklist" && <ChecklistView/>}
        {tab==="flashcards" && <FlashcardsView/>}
        {tab==="practice" && <PracticeView/>}
        {tab==="written" && <WrittenPracticeView/>}
      </Container>

      {/* Floating support button */}
      <a
        href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#0070F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(124,111,255,0.4)",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        title="Support us"
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "none"; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{transition:"fill 0.25s ease"}}/>
        </svg>
      </a>

      <Analytics />
    </Box>
  );
}
