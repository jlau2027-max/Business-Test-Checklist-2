import { useState, useEffect } from "react";
import { Button, TextArea, Spinner, Skeleton, Surface } from "@heroui/react";
import { fetchBiologyQuestions } from "./api/contentApi.js";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
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

// ─── Level Descriptors (generic IB Biology marking bands) ──────────────────
const LEVEL_DESCRIPTORS = `Level Descriptors:

7-8 marks: The answer demonstrates a thorough understanding of the topic. The response is well structured and coherent. Scientific terminology is used accurately throughout. The answer includes relevant, detailed examples. Analysis is clear and comprehensive.

5-6 marks: The answer demonstrates a good understanding of the topic. The response is generally well structured. Scientific terminology is mostly used correctly. Some relevant examples are included. There is some analysis present.

3-4 marks: The answer demonstrates a limited understanding of the topic. The response may lack structure. Scientific terminology is sometimes used correctly. Few relevant examples are included. Analysis is superficial or absent.

1-2 marks: The answer demonstrates very limited understanding of the topic. The response lacks structure and coherence. Scientific terminology is rarely used correctly. Examples, if present, may be irrelevant. There is no meaningful analysis.

0 marks: The answer does not reach a standard described by the descriptors above.`;

// ─── Fallback questions (shown if API unavailable) ──────────────────────────
const PAPER1_FALLBACK = [
  {
    id: "bio_p1_1",
    number: 1,
    topic: "Cell Biology",
    question: "Explain the fluid mosaic model of membrane structure, including the roles of phospholipids, cholesterol, and integral and peripheral proteins.",
    marks: 8,
    markscheme: "Phospholipids form a bilayer with hydrophilic heads facing outward and hydrophobic tails facing inward. The membrane is described as 'fluid' because phospholipids can move laterally within each layer. 'Mosaic' refers to the pattern created by scattered protein molecules. Cholesterol is found between phospholipid tails and regulates membrane fluidity — it restricts movement at high temperatures and prevents solidification at low temperatures. Integral (transmembrane) proteins span the entire bilayer and are involved in transport (channels, pumps) and cell signalling. Peripheral proteins are attached to the surface and function in cell signalling, enzymatic activity, and maintaining cell shape. Glycoproteins on the outer surface are involved in cell recognition and immune response.",
  },
  {
    id: "bio_p1_2",
    number: 2,
    topic: "Cell Biology",
    question: "Compare and contrast the structure of prokaryotic and eukaryotic cells.",
    marks: 8,
    markscheme: "Prokaryotic cells lack a membrane-bound nucleus; DNA is found in a nucleoid region. Eukaryotic cells have a membrane-bound nucleus containing chromosomal DNA. Prokaryotes have 70S ribosomes; eukaryotes have 80S ribosomes (though 70S ribosomes are found in mitochondria and chloroplasts). Prokaryotic cells are generally smaller (1-10 μm) compared to eukaryotic cells (10-100 μm). Prokaryotes lack membrane-bound organelles such as mitochondria, endoplasmic reticulum, and Golgi apparatus. Some prokaryotes have a cell wall made of peptidoglycan; plant eukaryotic cells have cell walls made of cellulose. Both have a plasma membrane, ribosomes, and DNA as genetic material. Prokaryotic DNA is circular and naked; eukaryotic DNA is linear and associated with histone proteins.",
  },
  {
    id: "bio_p1_3",
    number: 3,
    topic: "Molecular Biology",
    question: "Describe the process of DNA replication, including the roles of helicase, DNA polymerase III, and ligase.",
    marks: 8,
    markscheme: "DNA replication is semi-conservative — each new molecule contains one original and one new strand. Helicase unwinds the double helix by breaking hydrogen bonds between complementary base pairs. Each separated strand acts as a template. DNA polymerase III adds free nucleotides to the 3' end of the growing strand in the 5' to 3' direction, following complementary base pairing rules (A-T, G-C). The leading strand is synthesized continuously. The lagging strand is synthesized in short Okazaki fragments. RNA primase adds short RNA primers to initiate synthesis. DNA polymerase I replaces RNA primers with DNA. DNA ligase seals the gaps (nicks) between Okazaki fragments on the lagging strand, creating a continuous strand.",
  },
];

const PAPER2_FALLBACK = [
  {
    id: "bio_p2_1",
    number: 1,
    topic: "Genetics and Evolution",
    question: "Explain how natural selection can lead to speciation, using a named example.",
    marks: 8,
    markscheme: "Natural selection acts on phenotypic variation within a population. Individuals with advantageous traits have higher fitness and are more likely to survive and reproduce. Over time, allele frequencies change in the population (evolution). Speciation occurs when populations become reproductively isolated. Geographic isolation (allopatric speciation) separates populations physically. Different selection pressures in different environments lead to divergent evolution. Over time, accumulated genetic differences prevent interbreeding even if populations come back into contact. Example: Darwin's finches on the Galápagos Islands — ancestral finch species colonised different islands, different food sources led to selection for different beak shapes, reproductive isolation developed over time, resulting in 13+ distinct species.",
  },
  {
    id: "bio_p2_2",
    number: 2,
    topic: "Human Physiology",
    question: "Explain the process of ventilation in the human lung, including the role of the diaphragm and intercostal muscles.",
    marks: 8,
    markscheme: "Ventilation involves two processes: inspiration (inhalation) and expiration (exhalation). During inspiration: the external intercostal muscles contract, pulling the rib cage upward and outward; the diaphragm contracts and flattens; these actions increase the volume of the thoracic cavity; this decreases air pressure inside the lungs below atmospheric pressure; air flows into the lungs down the pressure gradient. During expiration (at rest): the external intercostal muscles relax, and the rib cage moves downward and inward; the diaphragm relaxes and returns to its dome shape; these actions decrease the volume of the thoracic cavity; this increases air pressure inside the lungs above atmospheric pressure; air is pushed out of the lungs. The internal intercostal muscles contract during forced expiration. The abdominal muscles also assist in forced expiration.",
  },
];

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
      const res = await fetch("https://ib-grading-hollen.c9tggsfst9.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          style={{ backgroundColor: "var(--color-success-soft)", color: "var(--color-success)", border: "none", flexShrink: 0, fontFamily: "'JSans', sans-serif" }}
        >
          Q{q.number}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
          style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "none", flexShrink: 0, fontFamily: "'JSans', sans-serif" }}
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
        style={{ fontFamily: "'JSans', sans-serif", resize: "vertical" }}
      />

      {/* Action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          isPending={grading}
          onPress={handleSolve}
          isDisabled={!answer.trim()}
          className="rounded-full bg-[var(--color-success)] text-white"
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

        <Button
          size="sm"
          variant="ghost"
          onPress={() => setLevelsRevealed((r) => !r)}
          className={`rounded-full ${levelsRevealed ? "text-[var(--text-secondary)]" : "bg-[var(--color-warning)] text-black"}`}
          style={{ fontFamily: "'JSans', sans-serif" }}
        >
          {levelsRevealed ? "Hide Levels" : "Level Descriptors"}
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

        <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: "rgba(77,170,127,0.1)", color: "var(--color-success)", fontFamily: "'JSans', sans-serif" }}>
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

      {/* Level descriptors reveal */}
      {levelsRevealed && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="block text-[var(--color-warning)] mb-2" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
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
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", fontFamily: "'JSans', sans-serif", color: "var(--text-primary)" }}>

      <Sidebar activeSubject="biology" />

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
              style={{ letterSpacing: 2, backgroundColor: "var(--color-success-soft)", color: "var(--color-success)", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              IB Biology
            </span>
            <LoginButton />
          </div>
          <span
            className="text-center block font-extrabold text-[var(--text-primary)]"
            style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
          >
            {paper === "paper1" ? "Paper 1 \u2014 Specimen" : "Paper 2 \u2014 Specimen"}
          </span>

          {/* Paper 1 / Paper 2 tabs */}
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
                  fontFamily: "'JSans', sans-serif",
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
        </div>
      </div>

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
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-success-soft)", color: "var(--color-success)", fontFamily: "'JSans', sans-serif" }}>
                {questions.length} questions
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(139,92,246,0.1)", color: "var(--accent)", fontFamily: "'JSans', sans-serif" }}>
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
                    style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}
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
