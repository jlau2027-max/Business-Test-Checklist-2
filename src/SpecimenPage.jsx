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
const SPECIMEN_QUESTIONS_FALLBACK = [];

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
          style={{ backgroundColor: "var(--accent-secondary-soft)", color: "var(--accent-secondary)", border: "none", flexShrink: 0, fontFamily: "'JSans', sans-serif" }}
        >
          {q.label}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "none", flexShrink: 0, fontFamily: "'JSans', sans-serif" }}
        >
          {q.marks} mark{q.marks !== 1 ? "s" : ""}
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
        rows={minRows}
        fullWidth
        className="rounded-2xl mb-2 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] text-sm leading-[1.7] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] p-3"
        style={{ fontFamily: "'JSans', sans-serif", resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[var(--accent-secondary)] text-white"
          style={{ fontFamily: "'JSans', sans-serif" }}
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
          style={{ fontFamily: "'JSans', sans-serif" }}
        >
          {revealed ? "Hide Markscheme" : "Show Markscheme"}
        </Button>

        {(answer.trim() || gradeResult) && (
          <Button
            size="sm"
            variant="ghost"
            onPress={handleClear}
            className="rounded-full text-[var(--text-secondary)]"
            style={{ fontFamily: "'JSans', sans-serif" }}
          >
            Clear
          </Button>
        )}

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "var(--accent-secondary)", fontFamily: "'JSans', sans-serif" }}>
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
                  fontFamily: "'JSans', sans-serif",
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
          <span className="block text-[var(--color-success)] mb-2" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
            MARKSCHEME
          </span>
          <span className="block text-[var(--text-secondary)]" style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line" }}>
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
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", fontFamily: "'JSans', sans-serif", color: "var(--text-primary)" }}>
      <Sidebar activeSubject="business" />

      <div style={{ marginLeft: "var(--sidebar-width, 240px)", transition: "margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}>

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--bg-header)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-header)",
        }}
      >
        <div className="max-w-4xl mx-auto py-2 px-4">
          <div className="flex items-center justify-center mb-1" style={{ position: "relative" }}>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
              style={{ letterSpacing: 2, backgroundColor: "var(--accent-secondary-soft)", color: "var(--accent-secondary)", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              IB Revision
            </span>
            <LoginButton />
          </div>
          <span
            className="text-center block font-extrabold text-[var(--text-primary)]"
            style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
          >
            Specimen Paper
          </span>
          <div className="flex items-center justify-center">
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button
                size="sm"
                className="rounded-full bg-[var(--bg-input)] text-[var(--text-secondary)] border border-[var(--border)]"
                style={{ fontFamily: "'JSans', sans-serif" }}
              >
                ← Back to IBrev
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
            <span className="text-sm text-[var(--text-primary)] font-semibold block" style={{ marginBottom: 4 }}>
              Specimen Paper
            </span>
            <span className="text-xs text-[var(--text-secondary)] block" style={{ lineHeight: 1.6 }}>
              Answer all questions. Type your answers in the boxes
              below — everything auto-saves. Use "Solve" for AI grading and "Show Markscheme" to reveal the rubric.
            </span>
            {SPECIMEN_QUESTIONS.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(45,212,191,0.1)", color: "var(--accent-secondary)", fontFamily: "'JSans', sans-serif" }}>
                  {SPECIMEN_QUESTIONS.length} questions
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "var(--accent)", fontFamily: "'JSans', sans-serif" }}>
                  {totalMarks} marks
                </span>
              </div>
            )}
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
          backgroundColor: "var(--accent)",
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
    </div>
  );
}
