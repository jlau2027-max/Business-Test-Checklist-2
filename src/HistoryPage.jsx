import { useState, useEffect } from "react";
import { Button, TextArea, Spinner, Skeleton, Surface } from "@heroui/react";
import { fetchHistoryQuestions } from "./api/contentApi.js";
import { loadLS, saveLS } from "./utils/localStorage.js";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import SupportButton from "./components/SupportButton.jsx";
import PageHeader, { HeaderBadge, HeaderTitle } from "./components/PageHeader.jsx";

// ─── Level Descriptors (Paper 2 — shared across all Paper 2 questions) ────
const LEVEL_DESCRIPTORS = `Level Descriptors (15 marks):

13-15: Responses are clearly focused, showing a high degree of awareness of the demands and implications of the question. Answers are well structured and effectively organized. Knowledge of the world history topic is accurate and relevant. Events are placed in their historical context, and there is a clear understanding of historical concepts. The examples chosen are appropriate and relevant, and are used effectively to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains clear and coherent critical analysis. There is evaluation of different perspectives, and this evaluation is integrated effectively into the answer. All, or nearly all, of the main points are substantiated, and the response argues to a consistent conclusion.

10-12: The demands of the question are understood and addressed. Answers are generally well structured and organized. Knowledge of the world history topic is mostly accurate and relevant. Events are placed in their historical context, and there is some understanding of historical concepts. The examples chosen are appropriate and relevant, and are used to support the analysis/evaluation. The response makes effective links and/or comparisons. The response contains critical analysis, which is mainly clear and coherent. There is some awareness and evaluation of different perspectives. Most of the main points are substantiated and the response argues to a consistent conclusion.

7-9: The response indicates an understanding of the demands of the question, but these demands are only partially addressed. There is an attempt to follow a structured approach. Knowledge of the world history topic is mostly accurate and relevant. Events are generally placed in their historical context. The examples chosen are appropriate and relevant. The response makes links and/or comparisons. The response moves beyond description to include some analysis or critical commentary, but this is not sustained.

4-6: The response indicates some understanding of the demands of the question. While there may be an attempt to follow a structured approach, the response lacks clarity and coherence. Knowledge of the world history topic is demonstrated, but lacks accuracy and relevance. There is a superficial understanding of historical context. The student identifies specific examples to discuss, but these examples are vague or lack relevance. There is some limited analysis, but the response is primarily narrative/descriptive in nature rather than analytical.

1-3: There is little understanding of the demands of the question. The answer is poorly structured or, where there is a recognizable essay structure, there is minimal focus on the task. Little knowledge of the world history topic is present. The student identifies examples to discuss, but these examples are factually incorrect, irrelevant or vague. The response contains little or no critical analysis. The response may consist mostly of generalizations and poorly substantiated assertions.

0: Answers do not reach a standard described by the descriptors above.`;

// ─── Level Descriptors (Paper 3 — History of Africa and the Middle East) ──
const LEVEL_DESCRIPTORS_P3 = `Level Descriptors (15 marks):

Marks   Level descriptor
13-15   Responses are clearly focused, showing a high degree of awareness of the demands and implications of the question. Answers are well structured and effectively organized. Knowledge is accurate, relevant and detailed. Events are placed in their historical context, and there is a clear understanding of historical concepts. Arguments are clearly substantiated and coherent. There is evaluation of different perspectives, and this evaluation is integrated effectively into the answer. The answer argues to a reasoned conclusion.

10-12   The demands of the question are understood and addressed. Answers are generally well structured and organized, although not always focused. Knowledge is mostly accurate and relevant. Events are generally placed in their historical context. Arguments are mainly substantiated and mostly coherent. There is some awareness and evaluation of different perspectives.

7-9     The response indicates an understanding of the demands of the question, but these demands are only partially addressed. There is an attempt to follow a structured approach. Knowledge is mostly accurate and relevant. Events are generally placed in their historical context. The response moves beyond description to include some analysis or critical commentary, but this is not sustained.

4-6     The response indicates some understanding of the demands of the question. While there may be an attempt to follow a structured approach, the response lacks clarity and coherence. Knowledge is demonstrated, but lacks accuracy and relevance. There is a superficial understanding of historical context. There is some limited analysis, but the response is primarily narrative/descriptive in nature rather than analytical.

1-3     There is little understanding of the demands of the question. The response is poorly structured or, where there is a recognizable essay structure, there is minimal focus on the task. Little knowledge is present. The response may consist mostly of generalizations and poorly substantiated assertions.

0       Answers do not reach a standard described by the descriptors above.`;

// ─── History Questions Data (empty — all content now in database) ────────────
const HISTORY_QUESTIONS_FALLBACK = [];
const PAPER3_QUESTIONS_FALLBACK = [];


// ─── Group questions by topic (from fallback — will be recomputed dynamically) ─

// ─── Single Question Component ─────────────────────────────────────────────
function HistoryQuestion({ q, levelDescriptors, prefix }) {
  const lsPrefix = prefix || "hist";
  const [answer, setAnswer] = useState(() => loadLS(`${lsPrefix}_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [levelsRevealed, setLevelsRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`${lsPrefix}_grade_${q.id}`, null));
  const { recordAttempt } = useAttemptTracker(q.id, "history", q.topic || "History", "history");

  useEffect(() => { saveLS(`${lsPrefix}_ans_${q.id}`, answer); }, [answer, q.id, lsPrefix]);
  useEffect(() => { saveLS(`${lsPrefix}_grade_${q.id}`, gradeResult); }, [gradeResult, q.id, lsPrefix]);

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
          expectedAnswer: q.markscheme + "\n\n" + levelDescriptors,
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
    saveLS(`${lsPrefix}_ans_${q.id}`, "");
    saveLS(`${lsPrefix}_grade_${q.id}`, null);
  };

  return (
    <Surface className="rounded-2xl p-4 mb-3">
      {/* Question header */}
      <div className="flex items-start gap-2 mb-2" style={{ flexWrap: "nowrap" }}>
        <span
          className="text-sm px-2 py-1 rounded-full font-bold"
          style={{ backgroundColor: "var(--color-danger-soft)", color: "var(--color-danger)", border: "none", flexShrink: 0 }}
        >
          Q{q.number}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "none", flexShrink: 0 }}
        >
          {q.marks} marks
        </span>
      </div>

      {/* Question text */}
      <span className="block text-[var(--text-primary)] mb-4" style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>
        {q.question}
      </span>

      {/* Answer textarea */}
      <TextArea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your essay answer here..."
        rows={16}
        fullWidth
        className="rounded-2xl mb-2 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] text-sm leading-[1.7] placeholder:text-[var(--text-muted)] focus:border-[var(--color-danger)] p-3"
        style={{ resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[var(--color-danger)] text-white"

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
          className={`rounded-full ${revealed ? "text-[var(--text-secondary)]" : "bg-[var(--accent)] text-white"}`}

        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setLevelsRevealed((r) => !r)}
          className={`rounded-full ${levelsRevealed ? "text-[var(--text-secondary)]" : "bg-[var(--color-warning)] text-black"}`}

        >
          {levelsRevealed ? "Hide Levels" : "Level Descriptors"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            variant="ghost"
            onPress={handleClear}
            className="rounded-full text-[var(--text-secondary)]"
  
          >
            Clear
          </Button>
        )}

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(248,113,113,0.1)", color: "var(--color-danger)" }}>
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
                  backgroundColor: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "var(--color-success-soft)" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "var(--color-warning-soft)" : "var(--color-danger-soft)",
                  color: gradeResult.score >= gradeResult.maxMarks * 0.7 ? "var(--color-success)" : gradeResult.score >= gradeResult.maxMarks * 0.4 ? "var(--color-warning)" : "var(--color-danger)",
                  border: "none",
                }}
              >
                {gradeResult.score} / {gradeResult.maxMarks}
              </span>
            </div>
          )}
          <span className="block text-[var(--text-secondary)]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {gradeResult.feedback}
          </span>
        </Surface>
      )}

      {/* Markscheme reveal */}
      {revealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="block text-[var(--color-success)] mb-2" style={{ fontSize: 11, letterSpacing: 1 }}>
            MARKSCHEME
          </span>
          <span className="block text-[var(--text-secondary)]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {q.markscheme}
          </span>
        </div>
      )}

      {/* Level descriptors reveal */}
      {levelsRevealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="block text-[var(--color-warning)] mb-2" style={{ fontSize: 11, letterSpacing: 1 }}>
            LEVEL DESCRIPTORS
          </span>
          <span className="block text-[var(--text-secondary)]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
            {levelDescriptors}
          </span>
        </div>
      )}
    </Surface>
  );
}

// ─── Main History Page ────────────────────────────────────────────────────
export default function HistoryPage() {
  const { user } = useAuth();
  const [paper, setPaper] = useState(() => loadLS("hist_paper_tab", "paper2"));
  const [paper2Questions, setPaper2Questions] = useState(null);
  const [paper3Questions, setPaper3Questions] = useState(null);
  const [loadingP2, setLoadingP2] = useState(true);
  const [loadingP3, setLoadingP3] = useState(true);

  useEffect(() => { saveLS("hist_paper_tab", paper); }, [paper]);

  // Fetch Paper 2 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchHistoryQuestions("paper2")
      .then((data) => {
        if (cancelled) return;
        const transformed = data.map((q) => ({
          id: q.id,
          number: q.question_number,
          topic: q.topic,
          question: q.question_text,
          marks: q.marks,
          markscheme: q.mark_scheme,
        }));
        setPaper2Questions(transformed);
      })
      .catch(() => {
        if (!cancelled) setPaper2Questions(HISTORY_QUESTIONS_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP2(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Fetch Paper 3 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchHistoryQuestions("paper3")
      .then((data) => {
        if (cancelled) return;
        const transformed = data.map((q) => ({
          id: q.id,
          number: q.question_number,
          topic: q.topic,
          question: q.question_text,
          marks: q.marks,
          markscheme: q.mark_scheme,
        }));
        setPaper3Questions(transformed);
      })
      .catch(() => {
        if (!cancelled) setPaper3Questions(PAPER3_QUESTIONS_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP3(false);
      });
    return () => { cancelled = true; };
  }, []);

  const HISTORY_QUESTIONS = paper2Questions || HISTORY_QUESTIONS_FALLBACK;
  const PAPER3_QUESTIONS = paper3Questions || PAPER3_QUESTIONS_FALLBACK;
  const questions = paper === "paper2" ? HISTORY_QUESTIONS : PAPER3_QUESTIONS;
  const topics = [...new Set(questions.map(q => q.topic))];
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const levelDesc = paper === "paper2" ? LEVEL_DESCRIPTORS : LEVEL_DESCRIPTORS_P3;
  const lsPrefix = paper === "paper2" ? "hist" : "p3";
  const loading = paper === "paper2" ? loadingP2 : loadingP3;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>

      <Sidebar activeSubject="history" />

      <div style={{ marginLeft: "var(--sidebar-width, 240px)", transition: "margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}>

      <PageHeader>
        <HeaderBadge label="IB Group 3" bg="var(--color-danger-soft)" color="var(--color-danger)" />
        <HeaderTitle>
          {paper === "paper2" ? "Paper 2 \u2014 Specimen" : "Paper 3 \u2014 Specimen"}
        </HeaderTitle>
        {/* Paper 2 / Paper 3 tabs */}
        <div className="flex items-center justify-center gap-1 pb-1">
          {[
            { key: "paper2", label: "Paper 2" },
            { key: "paper3", label: "Paper 3" },
          ].map(t => (
            <Button
              key={t.key}
              size="sm"
              onPress={() => setPaper(t.key)}
              className="rounded-full font-semibold text-[13px]"
              style={{
                backgroundColor: paper === t.key ? "var(--text-primary)" : "transparent",
                color: paper === t.key ? "var(--bg-base)" : "var(--text-muted)",
                border: paper === t.key ? "none" : "1px solid var(--border)",
                height: 34,
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              {t.label}
            </Button>
          ))}
        </div>
      </PageHeader>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-6 px-3">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          {/* Exam info banner */}
          <Surface className="rounded-3xl p-4 mb-6">
            <span className="text-sm text-[var(--text-primary)] font-semibold block" style={{ marginBottom: 4 }}>
              {paper === "paper2"
                ? "Paper 2 Specimen"
                : "Paper 3 Specimen (Africa and the Middle East)"}
            </span>
            <span className="text-xs text-[var(--text-secondary)] block" style={{ lineHeight: 1.6 }}>
              {paper === "paper2"
                ? "Answer two questions, each chosen from a different topic. Each question is worth 15 marks. The maximum mark for this paper is 30. Type your essay answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."
                : "Answer three questions. Each question is worth 15 marks. The maximum mark for this paper is 45. 2 hours 30 minutes. Type your essay answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(248,113,113,0.1)", color: "var(--color-danger)" }}>
                {questions.length} questions
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "var(--accent)" }}>
                {topics.length} topics
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(251,191,36,0.1)", color: "var(--color-warning)" }}>
                15 marks each
              </span>
            </div>
          </Surface>

          {/* Questions grouped by topic */}
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mb-6">
                  <Skeleton className="h-3.5 w-[200px] rounded-sm mb-4" />
                  <div className="flex flex-col gap-4">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <Surface key={j} className="rounded-2xl p-4 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-6 w-[40px] rounded-md" />
                          <Skeleton className="h-5 w-[70px] rounded-md" />
                        </div>
                        <Skeleton className="h-4 rounded-sm mb-1" />
                        <Skeleton className="h-4 rounded-sm mb-4 w-[80%]" />
                        <Skeleton className="h-[160px] rounded-md" />
                      </Surface>
                    ))}
                  </div>
                </div>
              ))
            : topics.map(topic => (
                <div key={topic} className="mb-6">
                  <span
                    className="block text-[var(--color-danger)] font-bold uppercase mb-4"
                    style={{ fontSize: 11, letterSpacing: 1 }}
                  >
                    {topic}
                  </span>
                  <div className="flex flex-col gap-4">
                    {questions.filter(q => q.topic === topic).map(q => (
                      <HistoryQuestion key={q.id} q={q} levelDescriptors={levelDesc} prefix={lsPrefix} />
                    ))}
                  </div>
                </div>
              ))
          }
        </div>
      </div>

      <SupportButton />
    </div>
    </div>
  );
}
