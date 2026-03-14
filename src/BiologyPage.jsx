import { useState, useEffect } from "react";
import { Button, TextArea, Spinner, Skeleton, Surface } from "@heroui/react";
import { fetchBiologyQuestions } from "./api/contentApi.js";
import { loadLS, saveLS } from "./utils/localStorage.js";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { useAttemptTracker } from "./useAttemptTracker.js";
import SupportButton from "./components/SupportButton.jsx";
import PageHeader, { HeaderBadge, HeaderTitle } from "./components/PageHeader.jsx";

// ─── Level Descriptors (generic IB Biology marking bands) ──────────────────
const LEVEL_DESCRIPTORS = `Level Descriptors:

7-8 marks: The answer demonstrates a thorough understanding of the topic. The response is well structured and coherent. Scientific terminology is used accurately throughout. The answer includes relevant, detailed examples. Analysis is clear and comprehensive.

5-6 marks: The answer demonstrates a good understanding of the topic. The response is generally well structured. Scientific terminology is mostly used correctly. Some relevant examples are included. There is some analysis present.

3-4 marks: The answer demonstrates a limited understanding of the topic. The response may lack structure. Scientific terminology is sometimes used correctly. Few relevant examples are included. Analysis is superficial or absent.

1-2 marks: The answer demonstrates very limited understanding of the topic. The response lacks structure and coherence. Scientific terminology is rarely used correctly. Examples, if present, may be irrelevant. There is no meaningful analysis.

0 marks: The answer does not reach a standard described by the descriptors above.`;

// ─── Fallback questions (empty — all content now in database) ────────────────
const PAPER1_FALLBACK = [];
const PAPER2_FALLBACK = [];

// ─── Single Question Component ─────────────────────────────────────────────
function BiologyQuestion({ q, prefix }) {
  const lsPrefix = prefix || "bio_p1";
  const [answer, setAnswer] = useState(() => loadLS(`${lsPrefix}_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [levelsRevealed, setLevelsRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`${lsPrefix}_grade_${q.id}`, null));
  const { recordAttempt } = useAttemptTracker(q.id, "biology", q.topic || "Biology", "biology");

  useEffect(() => { saveLS(`${lsPrefix}_ans_${q.id}`, answer); }, [answer, q.id, lsPrefix]);
  useEffect(() => { saveLS(`${lsPrefix}_grade_${q.id}`, gradeResult); }, [gradeResult, q.id, lsPrefix]);

  const handleSolve = async () => {
    if (!answer.trim()) return;
    setGrading(true);
    setGradeResult(null);
    try {
      const token = await window.Clerk?.session?.getToken();
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers,
        body: JSON.stringify({
          question: q.question,
          studentAnswer: answer,
          expectedAnswer: q.markscheme + "\n\n" + LEVEL_DESCRIPTORS,
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
          style={{ backgroundColor: "var(--color-success-soft)", color: "var(--color-success)", border: "none", flexShrink: 0 }}
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
        placeholder="Type your answer here..."
        rows={12}
        fullWidth
        className="rounded-2xl mb-2 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] text-sm leading-[1.7] placeholder:text-[var(--text-muted)] focus:border-[var(--color-success)] p-3"
        style={{ resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[var(--color-success)] text-white"        >
          {({isPending}) => <>
            {isPending && <Spinner color="current" size="sm" />}
            {isPending ? "Grading..." : "Solve"}
          </>}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setRevealed((r) => !r)}
          className={`rounded-full ${revealed ? "text-[var(--text-secondary)]" : "bg-[var(--accent)] text-white"}`}        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setLevelsRevealed((r) => !r)}
          className={`rounded-full ${levelsRevealed ? "text-[var(--text-secondary)]" : "bg-[var(--color-warning)] text-black"}`}        >
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

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(77,170,127,0.1)", color: "var(--color-success)" }}>
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
            {LEVEL_DESCRIPTORS}
          </span>
        </div>
      )}
    </Surface>
  );
}

// ─── Main Biology Page ────────────────────────────────────────────────────
export default function BiologyPage() {
  const { user } = useAuth();
  const [paper, setPaper] = useState(() => loadLS("bio_paper_tab", "paper1"));
  const [paper1Questions, setPaper1Questions] = useState(null);
  const [paper2Questions, setPaper2Questions] = useState(null);
  const [loadingP1, setLoadingP1] = useState(true);
  const [loadingP2, setLoadingP2] = useState(true);

  useEffect(() => { saveLS("bio_paper_tab", paper); }, [paper]);

  // Fetch Paper 1 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchBiologyQuestions("paper1")
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
        setPaper1Questions(transformed);
      })
      .catch(() => {
        if (!cancelled) setPaper1Questions(PAPER1_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP1(false);
      });
    return () => { cancelled = true; };
  }, []);

  // Fetch Paper 2 questions from API
  useEffect(() => {
    let cancelled = false;
    fetchBiologyQuestions("paper2")
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
        if (!cancelled) setPaper2Questions(PAPER2_FALLBACK);
      })
      .finally(() => {
        if (!cancelled) setLoadingP2(false);
      });
    return () => { cancelled = true; };
  }, []);

  const P1_QUESTIONS = paper1Questions || PAPER1_FALLBACK;
  const P2_QUESTIONS = paper2Questions || PAPER2_FALLBACK;
  const questions = paper === "paper1" ? P1_QUESTIONS : P2_QUESTIONS;
  const topics = [...new Set(questions.map(q => q.topic))];
  const lsPrefix = paper === "paper1" ? "bio_p1" : "bio_p2";
  const loading = paper === "paper1" ? loadingP1 : loadingP2;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>

      <Sidebar activeSubject="biology" />

      <div style={{ marginLeft: "var(--sidebar-width, 240px)", transition: "margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}>

      {/* Header */}
      <PageHeader>
        <HeaderBadge label="IB Group 4" bg="var(--color-success-soft)" color="var(--color-success)" />
        <HeaderTitle>
          {paper === "paper1" ? "Paper 1 \u2014 Specimen" : "Paper 2 \u2014 Specimen"}
        </HeaderTitle>
        <div className="flex items-center justify-center gap-1 pb-1">
          {[
            { key: "paper1", label: "Paper 1" },
            { key: "paper2", label: "Paper 2" },
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
              {paper === "paper1"
                ? "Paper 1 Specimen"
                : "Paper 2 Specimen"}
            </span>
            <span className="text-xs text-[var(--text-secondary)] block" style={{ lineHeight: 1.6 }}>
              {paper === "paper1"
                ? "Answer all questions. Type your answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."
                : "Answer all questions in Section A and one question in Section B. Type your answers below \u2014 everything auto-saves. Use \"Solve\" for AI grading, \"Show Markscheme\" for the rubric, and \"Level Descriptors\" for the marking bands."}
            </span>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-success-soft)", color: "var(--color-success)" }}>
                {questions.length} questions
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "var(--accent)" }}>
                {topics.length} topics
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
            : questions.length === 0
            ? (
              <Surface className="rounded-3xl p-8 text-center">
                <span className="block text-[var(--text-secondary)] text-sm">
                  No questions available yet. Check back soon or ask an admin to add biology content.
                </span>
              </Surface>
            )
            : topics.map(topic => (
                <div key={topic} className="mb-6">
                  <span
                    className="block text-[var(--color-success)] font-bold uppercase mb-4"
                    style={{ fontSize: 11, letterSpacing: 1 }}
                  >
                    {topic}
                  </span>
                  <div className="flex flex-col gap-4">
                    {questions.filter(q => q.topic === topic).map(q => (
                      <BiologyQuestion key={q.id} q={q} prefix={lsPrefix} />
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
