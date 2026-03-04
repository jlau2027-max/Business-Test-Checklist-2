import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Button, Box, Textarea, Collapse, Stack,
} from "@mantine/core";
import LoginButton from "./LoginButton.jsx";
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

// ─── Specimen Questions Data ───────────────────────────────────────────────
const SPECIMEN_QUESTIONS = [
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
    <Paper bg="#12121A" radius="lg" p="lg" mb="md" style={{ border: "1px solid #252533" }}>
      {/* Question header */}
      <Group mb="sm" align="flex-start" wrap="nowrap">
        <Badge
          size="lg"
          radius="md"
          ff="'JetBrains Mono', monospace"
          fw={700}
          style={{ backgroundColor: "#2DD4BF18", color: "#2DD4BF", border: "none", flexShrink: 0 }}
        >
          {q.label}
        </Badge>
        <Badge
          size="sm"
          radius="md"
          ff="'JetBrains Mono', monospace"
          fw={600}
          style={{ backgroundColor: "#8B5CF618", color: "#8B5CF6", border: "none", flexShrink: 0 }}
        >
          {q.marks} mark{q.marks !== 1 ? "s" : ""}
        </Badge>
      </Group>

      {/* Question text */}
      <Text fz={14} c="#F0EEE8" lh={1.7} mb="md" style={{ whiteSpace: "pre-line" }}>
        {q.question}
      </Text>

      {/* Answer textarea */}
      <Textarea
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
        placeholder="Type your answer here..."
        minRows={minRows}
        autosize
        radius="md"
        mb="sm"
        styles={{
          input: {
            backgroundColor: "#09090F",
            borderColor: "#252533",
            color: "#F0EEE8",
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />

      {/* Action buttons */}
      <Group gap="sm">
        <Button
          size="sm"
          radius="md"
          ff="'JetBrains Mono', monospace"
          loading={grading}
          onClick={handleSolve}
          disabled={!answer.trim()}
          style={{
            backgroundColor: "#2DD4BF22",
            color: "#2DD4BF",
            border: "1px solid #2DD4BF44",
          }}
        >
          {grading ? "Grading..." : "Solve"}
        </Button>

        <Button
          size="sm"
          radius="md"
          variant={revealed ? "subtle" : "light"}
          color={revealed ? "gray" : undefined}
          ff="'JetBrains Mono', monospace"
          onClick={() => setRevealed((r) => !r)}
          style={
            revealed
              ? {}
              : {
                  backgroundColor: "#8B5CF622",
                  color: "#8B5CF6",
                  border: "1px solid #8B5CF644",
                }
          }
        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            radius="md"
            variant="subtle"
            color="gray"
            ff="'JetBrains Mono', monospace"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}

        <Badge size="xs" variant="light" color="teal" ff="'JetBrains Mono', monospace" ml="auto">
          auto-saved
        </Badge>
      </Group>

      {/* AI Grade Result */}
      {gradeResult && (
        <Paper bg="#1A1A24" radius="md" p="md" mt="md" style={{ border: "1px solid #252533" }}>
          {gradeResult.score !== null && (
            <Group mb="xs">
              <Badge
                size="lg"
                radius="md"
                ff="'JetBrains Mono', monospace"
                fw={700}
                style={{
                  backgroundColor: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D39922" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF2422" : "#EF444422",
                  color: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "#34D399" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "#FBBF24" : "#EF4444",
                  border: "none",
                }}
              >
                {gradeResult.score} / {gradeResult.maxMarks}
              </Badge>
            </Group>
          )}
          <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
            {gradeResult.feedback}
          </Text>
        </Paper>
      )}

      {/* Markscheme reveal */}
      <Collapse in={revealed}>
        <Box mt="md" pt="md" style={{ borderTop: "1px solid #252533" }}>
          <Text fz={11} ff="'JetBrains Mono', monospace" c="#34D399" lts={1} mb="sm">
            MARKSCHEME
          </Text>
          <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
            {q.markscheme}
          </Text>
        </Box>
      </Collapse>
    </Paper>
  );
}

// ─── Main Specimen Page ────────────────────────────────────────────────────
export default function SpecimenPage() {
  const totalMarks = SPECIMEN_QUESTIONS.reduce((sum, q) => sum + q.marks, 0);

  return (
    <Box mih="100vh" bg="#09090F" style={{ fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>
      {/* Header */}
      <Box
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
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#2DD4BF18", color: "#2DD4BF", border: "none" }}
            >
              IB HL Business Management
            </Badge>
            <LoginButton />
          </Group>
          <Text
            ta="center"
            fw={800}
            fz={{ base: 22, sm: 30 }}
            c="#F0EEE8"
            style={{ letterSpacing: -0.5 }}
          >
            Specimen Paper
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            Unit 3 — Finance · {totalMarks} marks total
          </Text>
          <Group justify="center">
            <Button
              component="a"
              href="/"
              size="xs"
              radius="xl"
              ff="'JetBrains Mono', monospace"
              style={{
                backgroundColor: "#1A1A24",
                color: "#8B8B9E",
                border: "1px solid #252533",
              }}
            >
              ← Back to Revision Hub
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Content */}
      <Container size="lg" py="xl" px="md">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          {/* Exam info banner */}
          <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{ border: "1px solid #252533" }}>
            <Text fz="sm" c="#F0EEE8" fw={600} mb={4}>
              Unit 3 Finance Test — February 2026
            </Text>
            <Text fz="xs" c="#8B8B9E" lh={1.6}>
              Answer all questions. The maximum mark for this test is {totalMarks}. Type your answers in the boxes
              below — everything auto-saves. Use "Solve" for AI grading and "Show Markscheme" to reveal the rubric.
            </Text>
            <Group mt="sm" gap="xs">
              <Badge size="xs" variant="light" color="teal" ff="'JetBrains Mono', monospace">
                {SPECIMEN_QUESTIONS.length} questions
              </Badge>
              <Badge size="xs" variant="light" color="violet" ff="'JetBrains Mono', monospace">
                {totalMarks} marks
              </Badge>
            </Group>
          </Paper>

          {/* Case study context */}
          <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{ border: "1px solid #1E3A5F" }}>
            <Text fz={11} ff="'JetBrains Mono', monospace" c="#60A5FA" lts={1} mb="sm">
              CASE STUDY
            </Text>
            <Text fz={14} c="#F0EEE8" fw={600} mb="xs">
              NorthHaven Dairy (NHD)
            </Text>
            <Text fz={13} c="#B0ADA6" lh={1.7} style={{ whiteSpace: "pre-line" }}>
{`NorthHaven Dairy (NHD) is a medium-sized private limited company based in rural New Zealand. The company specialises in producing and selling a range of dairy products, including fresh milk, cream, butter, and artisan cheese. NHD sources its milk from a network of local farms and has built a strong reputation for quality and sustainability.

Recently, NHD has been considering investing in new automated bottling machines to increase efficiency and reduce labour costs. The company is evaluating whether to lease or purchase these machines outright.`}
            </Text>
          </Paper>

          {/* Questions */}
          <Stack gap="md">
            {SPECIMEN_QUESTIONS.map((q) => (
              <SpecimenQuestion key={q.id} q={q} />
            ))}
          </Stack>
        </div>
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
    </Box>
  );
}
