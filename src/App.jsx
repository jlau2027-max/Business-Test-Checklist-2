import { useState } from "react";

const sections = [
  {
    id: "sources",
    title: "3.1 – Sources of Finance",
    color: "#4F46E5",
    items: [
      "Difference between internal & external sources of finance",
      "Short, medium & long-term finance — matched to purpose",
      "Equity vs debt financing (pros & cons)",
      "Why a business chooses one source over another",
      "Retained profit, share capital, debentures, venture capital (HL)",
      "Loan capital vs overdraft vs trade credit",
    ],
  },
  {
    id: "costs",
    title: "3.2 – Costs & Revenues",
    color: "#7C3AED",
    items: [
      "Fixed, variable, semi-variable, direct & indirect costs",
      "Total Revenue and Average Revenue",
      "Contribution per unit = Selling Price – Variable Cost",
      "Total Contribution = Contribution per unit × Quantity",
      "Total Costs = Fixed Costs + Total Variable Costs",
      "Profit = Total Revenue – Total Costs",
      "Difference between profit and cash flow",
    ],
  },
  {
    id: "cashflow",
    title: "3.3 – Cash Flow",
    color: "#0891B2",
    items: [
      "Construct and interpret a cash flow forecast",
      "Net Cash Flow = Cash Inflows – Cash Outflows",
      "Closing Balance = Opening Balance + Net Cash Flow",
      "Causes of cash flow problems",
      "Solutions: overdraft, debt factoring, sale of assets, better credit control",
      "Difference between cash flow and profit (common exam trap!)",
    ],
  },
  {
    id: "accounts",
    title: "3.4 – Final Accounts",
    color: "#059669",
    items: [
      "Income Statement layout: Revenue → Gross Profit → Net Profit",
      "Balance Sheet structure: Assets = Equity + Liabilities",
      "Current vs non-current assets and liabilities",
      "Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life (HL)",
      "Reducing balance depreciation = Net Book Value × Rate % (HL)",
      "Intangible assets: goodwill, patents, brand value (HL)",
    ],
  },
  {
    id: "ratios",
    title: "3.5 – Profitability & Liquidity Ratios",
    color: "#D97706",
    items: [
      "Gross Profit Margin = (Gross Profit ÷ Revenue) × 100 ✦ IN BOOKLET",
      "Net Profit Margin = (Net Profit ÷ Revenue) × 100 ✦ IN BOOKLET",
      "ROCE = (Net Profit ÷ Capital Employed) × 100 ✦ IN BOOKLET",
      "Current Ratio = Current Assets ÷ Current Liabilities (ideal ~2:1) ✦ IN BOOKLET",
      "Acid Test = (CA – Inventory) ÷ CL (ideal ~1:1) ✦ IN BOOKLET",
      "Interpret ratios in context — not just calculate them!",
    ],
  },
  {
    id: "efficiency",
    title: "3.6 – Efficiency Ratios (HL Only)",
    color: "#DC2626",
    items: [
      "Stock Turnover (times) = Cost of Sales ÷ Average Stock ✦ IN BOOKLET",
      "Stock Turnover (days) = (Average Stock ÷ Cost of Sales) × 365 ✦ IN BOOKLET",
      "Average Stock = (Opening Stock + Closing Stock) ÷ 2 ✦ IN BOOKLET",
      "Debtor Days = (Debtors ÷ Revenue) × 365 ✦ IN BOOKLET",
      "Creditor Days = (Creditors ÷ Cost of Sales) × 365 ✦ IN BOOKLET",
      "Gearing = (Non-current Liabilities ÷ Capital Employed) × 100 ✦ IN BOOKLET",
      "High vs low gearing — implications for risk and investment",
    ],
  },
  {
    id: "investment",
    title: "3.7 – Investment Appraisal",
    color: "#7C3AED",
    items: [
      "Payback Period — calculate and interpret",
      "ARR = (Total Returns – Capital Cost) ÷ Years ÷ Capital Cost × 100 ✦ IN BOOKLET",
      "NPV = Sum of discounted cash flows – Initial Investment ✦ IN BOOKLET (HL)",
      "Discount factors/tables are provided in exam",
      "Compare methods: qualitative vs quantitative factors",
      "Limitations of each investment appraisal method",
    ],
  },
  {
    id: "budgets",
    title: "3.8 – Budgets & Variance Analysis",
    color: "#0891B2",
    items: [
      "Variance = Actual – Budgeted ✦ MEMORISE",
      "Favourable variance: better than expected",
      "Adverse variance: worse than expected",
      "⚠️ For costs: Actual < Budgeted = Favourable",
      "⚠️ For revenue: Actual > Budgeted = Favourable",
      "Zero-based vs incremental budgeting (pros & cons)",
      "Limitations of budgets",
    ],
  },
  {
    id: "breakeven",
    title: "5.5 – Breakeven Analysis",
    color: "#059669",
    items: [
      "Breakeven Output = Fixed Costs ÷ Contribution per unit ✦ MEMORISE",
      "Margin of Safety = Actual Output – Breakeven Output ✦ MEMORISE",
      "Target Profit Output = (FC + Target Profit) ÷ Contribution ✦ MEMORISE",
      "Draw and interpret breakeven charts",
      "Limitations of breakeven analysis",
      "How changes in price/costs affect the breakeven point",
    ],
  },
  {
    id: "bmt",
    title: "BMT Tools",
    color: "#D97706",
    items: [
      "Business Plan — components, purpose, link to securing finance",
      "Ansoff Matrix — 4 strategies, risk levels, finance implications",
      "STEEPLE — apply each factor to a business scenario",
      "Force Field Analysis — driving vs restraining forces (Lewin)",
      "Apply BMT tools to justify business decisions in context",
    ],
  },
  {
    id: "formulas",
    title: "🧠 Formulas to MEMORISE (Not in Booklet)",
    color: "#DC2626",
    items: [
      "Contribution per unit = Selling Price – Variable Cost per unit",
      "Total Contribution = Contribution per unit × Quantity",
      "Total Costs = Fixed Costs + Total Variable Costs",
      "Profit = Total Revenue – Total Costs",
      "Breakeven Output = Fixed Costs ÷ Contribution per unit",
      "Margin of Safety = Actual Output – Breakeven Output",
      "Target Profit Output = (FC + Target Profit) ÷ Contribution per unit",
      "Straight-line depreciation = (Cost – Residual Value) ÷ Useful Life",
      "Reducing balance = Net Book Value × Depreciation Rate %",
      "Net Cash Flow = Cash Inflows – Cash Outflows",
      "Closing Balance = Opening Balance + Net Cash Flow",
      "Variance = Actual – Budgeted",
    ],
  },
  {
    id: "examtips",
    title: "✍️ Exam Technique",
    color: "#4F46E5",
    items: [
      "Define key terms at the start of longer answers",
      "Always use the business context given — never answer generically",
      "For evaluate/justify: give both sides then make a justified conclusion",
      "Show ALL working in calculations — method marks are available",
      "Interpret ratios — don't just calculate, explain what it means",
      "Link answers back to the specific business in the question",
    ],
  },
];

export default function App() {  const [checked, setChecked] = useState({});
  const [collapsed, setCollapsed] = useState({});

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (id) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const getProgressColor = () => {
    if (progress < 30) return "#DC2626";
    if (progress < 70) return "#D97706";
    return "#059669";
  };

return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#0F0F13",
      fontFamily: "'Georgia', serif",
      color: "#E8E6E0",
      boxSizing: "border-box", // Prevents padding from causing scrollbars
    }}>
      {/* Inner container centered for better laptop viewing */}
      <div style={{ 
        maxWidth: "900px", // Constrains width on large screens
        margin: "0 auto",  // Centers the container horizontally
        padding: "32px 16px",
        boxSizing: "border-box" 
      }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
            borderRadius: 12,
            padding: "6px 18px",
            fontSize: 11,
            letterSpacing: 3,
            fontFamily: "monospace",
            marginBottom: 16,
            color: "#fff",
            textTransform: "uppercase",
          }}>IB HL Business Management</div>
          <h1 style={{
            fontSize: "clamp(26px, 5vw, 38px)",
            fontWeight: 700,
            margin: "0 0 8px",
            color: "#F5F3EE",
            letterSpacing: -0.5,
          }}>Finance Unit — Test Checklist</h1>
          <p style={{ color: "#8B8680", fontSize: 14, margin: 0 }}>
            Units 3.1–3.9 · Unit 5.5 Breakeven · BMT Tools
          </p>
        </div>

        {/* --- The rest of your code remains exactly the same below here --- */}

        {/* Progress Bar */}
        <div style={{
          background: "#1C1C22",
          borderRadius: 16,
          padding: "20px 24px",
          marginBottom: 32,
          border: "1px solid #2A2A32",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: "#A0998F" }}>Overall Progress</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: getProgressColor() }}>{progress}%</span>
          </div>
          <div style={{ background: "#2A2A32", borderRadius: 99, height: 10, overflow: "hidden" }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${getProgressColor()}, ${getProgressColor()}bb)`,
              borderRadius: 99,
              transition: "width 0.4s ease",
            }} />
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: "#6B6560" }}>
            {checkedCount} of {totalItems} topics covered
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => {
          const sectionChecked = section.items.filter((_, i) =>
            checked[`${section.id}-${i}`]
          ).length;
          const isCollapsed = collapsed[section.id];
          const allDone = sectionChecked === section.items.length;

          return (
            <div key={section.id} style={{
              background: "#1C1C22",
              border: `1px solid ${allDone ? section.color + "66" : "#2A2A32"}`,
              borderRadius: 14,
              marginBottom: 14,
              overflow: "hidden",
              transition: "border-color 0.3s",
            }}>
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  cursor: "pointer",
                  borderLeft: `4px solid ${section.color}`,
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: section.color + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: section.color,
                    fontFamily: "monospace",
                  }}>
                    {sectionChecked}/{section.items.length}
                  </div>
                  <span style={{
                    fontWeight: 600, fontSize: 15,
                    color: allDone ? section.color : "#E8E6E0",
                    textDecoration: allDone ? "none" : "none",
                  }}>
                    {allDone ? "✓ " : ""}{section.title}
                  </span>
                </div>
                <span style={{ color: "#4A4A52", fontSize: 18, transition: "transform 0.2s", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>
                  ▾
                </span>
              </div>

              {/* Items */}
              {!isCollapsed && (
                <div style={{ padding: "4px 20px 16px", borderTop: "1px solid #2A2A32" }}>
                  {section.items.map((item, i) => {
                    const key = `${section.id}-${i}`;
                    const isChecked = checked[key];
                    const isImportant = item.includes("⚠️") || item.includes("✦ MEMORISE");
                    return (
                      <div
                        key={key}
                        onClick={() => toggle(key)}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 12,
                          padding: "9px 4px",
                          cursor: "pointer",
                          borderRadius: 8,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#22222A"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <div style={{
                          width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                          border: `2px solid ${isChecked ? section.color : "#3A3A42"}`,
                          background: isChecked ? section.color : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          {isChecked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{
                          fontSize: 14,
                          color: isChecked ? "#5A5A62" : isImportant ? "#F5D87A" : "#C8C4BC",
                          textDecoration: isChecked ? "line-through" : "none",
                          lineHeight: 1.5,
                          transition: "color 0.2s",
                        }}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 32, color: "#3A3A42", fontSize: 13 }}>
          Click any item to mark it as revised ·{" "}
          <span
            style={{ color: "#4F46E5", cursor: "pointer" }}
            onClick={() => setChecked({})}
          >Reset all</span>
        </div>
      </div>
    </div>
  );
}
