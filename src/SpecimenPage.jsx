import { useState, useEffect } from "react";
import { Button, TextArea, Spinner, Skeleton, Surface } from "@heroui/react";
import { fetchWrittenQuestions } from "./api/contentApi.js";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
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

// ─── Specimen Questions Data (fallback) ─────────────────────────────────────
const SPECIMEN_QUESTIONS_FALLBACK = [
  {
    id: "spec_a",
    label: "(a)",
    question: "Define the term direct costs.",
    marks: 2,
    markscheme: `A direct cost is a cost that can be specifically traced / attributed to a particular product, department, or project.

Award [1] for a basic definition that conveys the idea of a cost linked to production.
Award [2] for a clear definition that includes the concept of traceability to a specific product/output.

Examples of direct costs include raw materials and direct labour.`,
  },
  {
    id: "spec_b",
    label: "(b)",
    question: "Explain one advantage and one disadvantage to NorthHaven Dairy (NHD) of leasing its new automated bottling machines rather than purchasing them outright.",
    marks: 4,
    markscheme: `Advantage of leasing (award up to [2]):
• Lower upfront costs — leasing allows NHD to acquire the automated bottling machines without a large capital outlay [1], preserving cash flow for other operational needs such as marketing or raw material procurement [1].
• Flexibility — leasing allows NHD to upgrade to newer technology at the end of the lease term [1], avoiding the risk of obsolescence [1].
• Tax benefits — lease payments can often be deducted as a business expense [1], reducing NHD's taxable income [1].

Disadvantage of leasing (award up to [2]):
• Higher long-term cost — while individual lease payments may be lower, the total cost over time can exceed the purchase price [1], reducing NHD's long-term profitability [1].
• No ownership — at the end of the lease, NHD does not own the machines [1], meaning they have no asset to show on their balance sheet or to resell [1].
• Restrictions — lease agreements may limit how NHD can use or modify the equipment [1], reducing operational flexibility [1].

Accept any reasonable advantage/disadvantage with appropriate application to NHD.
Award [1] for identification, [1] for explanation/development with reference to NHD.`,
  },
  {
    id: "spec_c1",
    label: "(c)(i)",
    question: `Using the financial information below, calculate the profit margin for NHD. Show your working.

Financial Information for NHD:
• Sales Revenue: $2,400,000
• Cost of Goods Sold (COGS): $1,440,000
• Operating Expenses: $600,000
• Net Profit (before tax): $360,000
• Total Assets: $3,000,000
• Total Liabilities: $1,200,000
• Capital Employed: $1,800,000`,
    marks: 2,
    markscheme: `Profit Margin = (Net Profit / Sales Revenue) × 100

Profit Margin = ($360,000 / $2,400,000) × 100 = 15%

Award [1] for correct formula or working.
Award [1] for correct answer of 15%.

If no working is shown but the answer is correct, award [2].
If the formula is correct but the answer is wrong due to arithmetic error, award [1].`,
  },
  {
    id: "spec_c2",
    label: "(c)(ii)",
    question: "Using the financial information above, calculate the return on capital employed (ROCE) for NHD. Show your working.",
    marks: 2,
    markscheme: `ROCE = (Net Profit before tax / Capital Employed) × 100

ROCE = ($360,000 / $1,800,000) × 100 = 20%

Award [1] for correct formula or working.
Award [1] for correct answer of 20%.

If no working is shown but the answer is correct, award [2].
If the formula is correct but the answer is wrong due to arithmetic error, award [1].`,
  },
  {
    id: "spec_d",
    label: "(d)",
    question: `Construct a Statement of Profit or Loss for NHD using the following additional financial information:

Additional Financial Information:
• Interest Expense: $50,000
• Tax Rate: 25%
• Sales Revenue: $2,400,000
• COGS: $1,440,000
• Operating Expenses: $600,000`,
    marks: 4,
    markscheme: `Statement of Profit or Loss for NHD:

Sales Revenue:                   $2,400,000
Less Cost of Goods Sold:        ($1,440,000)
─────────────────────────────────────────────
Gross Profit:                      $960,000
Less Operating Expenses:          ($600,000)
─────────────────────────────────────────────
Operating Profit:                  $360,000
Less Interest Expense:             ($50,000)
─────────────────────────────────────────────
Net Profit before Tax:             $310,000
Less Tax (25%):                    ($77,500)
─────────────────────────────────────────────
Net Profit after Tax:              $232,500

Award [1] for correct Gross Profit ($960,000).
Award [1] for correct Operating Profit ($360,000).
Award [1] for correct Net Profit before Tax ($310,000).
Award [1] for correct Net Profit after Tax ($232,500).

Accept alternative correct layouts. If one error carries through (own figure rule / OFR), award marks for subsequent correct calculations based on the student's own figures.`,
  },
  {
    id: "spec_e",
    label: "(e)",
    question: "Evaluate two strategies that NorthHaven Dairy (NHD) could use to improve its profit margin.",
    marks: 10,
    markscheme: `Possible strategies include but are not limited to:

1. Reducing Costs:
   • NHD could negotiate better prices with suppliers for raw milk and packaging materials to reduce COGS.
   • Investing in automation (e.g., the new bottling machines) may reduce direct labour costs in the long run.
   • Streamlining operations to reduce waste (e.g., lean production) could lower operating expenses.

2. Increasing Revenue:
   • NHD could diversify its product range (e.g., flavoured milks, cheese, yoghurt) to attract new customers and increase sales revenue.
   • Premium pricing for organic or locally sourced products could increase revenue without proportionally increasing costs.
   • Expanding distribution channels (e.g., online sales, partnerships with supermarkets) could grow the customer base.

3. Improving Efficiency:
   • Adopting new technology or processes to improve productivity and reduce per-unit costs.
   • Training employees to improve output quality and reduce defect rates.

4. Marketing and Branding:
   • Investing in branding and marketing to build customer loyalty and justify higher prices.
   • Positioning NHD as a sustainable/local brand may allow premium pricing.

Evaluation should consider:
• Short-term vs long-term impact of each strategy
• Feasibility for NHD given its size and market position
• Potential risks or trade-offs (e.g., cost-cutting may affect quality)
• Which strategy is more likely to succeed and why

LEVEL DESCRIPTORS:

Level 4 [9–10 marks]:
A balanced, well-structured response that evaluates two strategies in depth. Analysis is thorough with clear application to NHD. A well-supported conclusion or judgement is offered that considers trade-offs and context.

Level 3 [7–8 marks]:
A good response that evaluates two strategies with some depth. Analysis is mostly applied to NHD. Some attempt at a conclusion, but it may lack full justification or balance.

Level 2 [4–6 marks]:
A partial response that identifies two strategies with some explanation. Limited analysis and application to NHD. May describe rather than evaluate. Little or no conclusion.

Level 1 [1–3 marks]:
A limited response that identifies one or two strategies with little or no explanation. Largely generic with minimal reference to NHD. No evaluation or conclusion.

[0 marks]: No relevant content.`,
  },
];

// ─── Single Question Component ─────────────────────────────────────────────
function SpecimenQuestion({ q }) {
  const [answer, setAnswer] = useState(() => loadLS(`spec_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`spec_grade_${q.id}`, null));
  const { recordAttempt } = useAttemptTracker(q.id, "specimen", "Specimen Exam", "business");

  useEffect(() => { saveLS(`spec_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`spec_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          studentAnswer: answer,
          expectedAnswer: q.markscheme,
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
    } catch {
      setGradeResult({ score: null, feedback: "Could not connect to grading server. Please try again later." });
    } finally {
      setGrading(false);
    }
  };

  const handleClear = () => {
    setAnswer("");
    setGradeResult(null);
    saveLS(`spec_ans_${q.id}`, "");
    saveLS(`spec_grade_${q.id}`, null);
  };

  const minRows = q.marks >= 10 ? 16 : q.marks >= 4 ? 10 : 6;

  return (
    <Surface className="rounded-2xl p-4 mb-3">
      {/* Question header */}
      <div className="flex items-start gap-2 mb-2" style={{ flexWrap: "nowrap" }}>
        <span
          className="text-sm px-2 py-1 rounded-full font-bold"
          style={{ backgroundColor: "#2DD4BF18", color: "#2DD4BF", border: "none", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {q.label}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "#8B5CF618", color: "#8B5CF6", border: "none", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {q.marks} mark{q.marks !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Question text */}
      <span className="block text-[#F0EEE8] mb-4" style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
        {q.question}
      </span>

      {/* Answer textarea */}
      <TextArea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={minRows}
        fullWidth
        className="rounded-2xl mb-2 bg-[#09090F] border border-[#252533] text-[#F0EEE8] text-sm leading-[1.7] placeholder:text-[#55556A] focus:border-[#7C6FFF] p-3"
        style={{ fontFamily: "'Inter', sans-serif", resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[#2DD4BF] text-white"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Solve"}
          </>}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setRevealed((r) => !r)}
          className={`rounded-full ${revealed ? "text-[#8B8B9E]" : "bg-[#8B5CF6] text-white"}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            variant="ghost"
            onPress={handleClear}
            className="rounded-full text-[#8B8B9E]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Clear
          </Button>
        )}

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}>
          auto-saved
        </span>
      </div>

      {/* AI Grade Result */}
      {gradeResult && (
        <Surface variant="secondary" className="rounded-2xl p-3 mt-3">
          {gradeResult.score !== null && (
            <div className="flex items-center mb-1">
              <span
                className="text-sm px-2 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D39922" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF2422" : "#EF444422",
                  color: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D399" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF24" : "#EF4444",
                  border: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {gradeResult.score} / {gradeResult.maxMarks}
              </span>
            </div>
          )}
          <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {gradeResult.feedback}
          </span>
        </Surface>
      )}

      {/* Markscheme reveal */}
      {revealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #252533" }}>
          <span className="block text-[#34D399] mb-2" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            MARKSCHEME
          </span>
          <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {q.markscheme}
          </span>
        </div>
      )}
    </Surface>
  );
}

// ─── Main Specimen Page ────────────────────────────────────────────────────
export default function SpecimenPage() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchWrittenQuestions({ type: "specimen" })
      .then((data) => {
        if (cancelled) return;
        const transformed = data.map((q) => ({
          id: q.id,
          label: q.label,
          question: q.question_text,
          marks: q.marks,
          markscheme: q.mark_scheme,
        }));
        setQuestions(transformed);
      })
      .catch(() => {
        if (!cancelled) setQuestions(SPECIMEN_QUESTIONS_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const SPECIMEN_QUESTIONS = questions || SPECIMEN_QUESTIONS_FALLBACK;
  const totalMarks = SPECIMEN_QUESTIONS.reduce((sum, q) => sum + q.marks, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#09090F", fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>
      <Sidebar activeSubject="business" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(9, 9, 15, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-4xl mx-auto py-2 px-4">
          <div className="flex items-center justify-center mb-1" style={{ position: "relative" }}>
            {/* Sidebar toggle */}
            <Button
              isIconOnly
              variant="outline"
              onPress={() => setSidebarOpen(o => !o)}
              className="rounded-full bg-transparent text-[#8B8B9E] border-[#252533] min-w-[auto] h-8 px-[10px]"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
              style={{ letterSpacing: 2, backgroundColor: "#2DD4BF18", color: "#2DD4BF", border: "none", fontFamily: "'JetBrains Mono', monospace" }}
            >
              IB HL Business Management
            </span>
            <LoginButton />
          </div>
          <span
            className="text-center block font-extrabold text-[#F0EEE8]"
            style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
          >
            Specimen Paper
          </span>
          <span className="text-center block text-xs text-[#55556A] mb-2">
            Unit 3 — Finance · {totalMarks} marks total
          </span>
          <div className="flex items-center justify-center">
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button
                size="sm"
                className="rounded-full bg-[#1A1A24] text-[#8B8B9E] border border-[#252533]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ← Back to Revision Hub
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-6 px-3">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          {/* Exam info banner */}
          <Surface className="rounded-3xl p-4 mb-6">
            <span className="text-sm text-[#F0EEE8] font-semibold block" style={{ marginBottom: 4 }}>
              Unit 3 Finance Test — February 2026
            </span>
            <span className="text-xs text-[#8B8B9E] block" style={{ lineHeight: 1.6 }}>
              Answer all questions. The maximum mark for this test is {totalMarks}. Type your answers in the boxes
              below — everything auto-saves. Use "Solve" for AI grading and "Show Markscheme" to reveal the rubric.
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "#2DD4BF", fontFamily: "'JetBrains Mono', monospace" }}>
                {SPECIMEN_QUESTIONS.length} questions
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "#8B5CF6", fontFamily: "'JetBrains Mono', monospace" }}>
                {totalMarks} marks
              </span>
            </div>
          </Surface>

          {/* Case study context */}
          <Surface className="rounded-3xl p-4 mb-6" style={{ border: "1px solid #1E3A5F" }}>
            <span className="block text-[#60A5FA] mb-2" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
              CASE STUDY
            </span>
            <span className="block text-[#F0EEE8] font-semibold mb-1" style={{ fontSize: 14 }}>
              NorthHaven Dairy (NHD)
            </span>
            <span className="block text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
{`NorthHaven Dairy (NHD) is a medium-sized private limited company based in rural New Zealand. The company specialises in producing and selling a range of dairy products, including fresh milk, cream, butter, and artisan cheese. NHD sources its milk from a network of local farms and has built a strong reputation for quality and sustainability.

Recently, NHD has been considering investing in new automated bottling machines to increase efficiency and reduce labour costs. The company is evaluating whether to lease or purchase these machines outright.`}
            </span>
          </Surface>

          {/* Questions */}
          <div className="flex flex-col gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Surface key={i} className="rounded-2xl p-4 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-6 w-[50px] rounded-md" />
                      <Skeleton className="h-5 w-[70px] rounded-md" />
                    </div>
                    <Skeleton className="h-4 rounded-sm mb-1" />
                    <Skeleton className="h-4 rounded-sm mb-4 w-[80%]" />
                    <Skeleton className="h-[120px] rounded-md" />
                  </Surface>
                ))
              : SPECIMEN_QUESTIONS.map((q) => (
                  <SpecimenQuestion key={q.id} q={q} />
                ))
            }
          </div>
        </div>
      </div>

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
          backgroundColor: "#7C6FFF",
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
    </div>
  );
}
