import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Button, TextArea, Spinner, Alert, Checkbox, Tabs, RadioGroup, Radio, Accordion, Surface } from "@heroui/react";
import ProgressBar from "./components/ProgressBar.jsx";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { ListChecks, Layers, CircleDot, PenLine } from "lucide-react";
import { useAttemptTracker } from "./useAttemptTracker.js";
import { syncToCloud } from "./stateSync.js";
import {
  fetchFlashcardTopics, fetchFlashcards, fetchMcqQuestions, fetchWrittenQuestions, fetchChecklist, fetchCategoryColors,
  fetchBiologyFlashcardTopics, fetchBiologyFlashcards, fetchBiologyMcqQuestions, fetchBiologyWrittenQuestions, fetchBiologyChecklist, fetchBiologyCategoryColors,
  chemistryApi, physicsApi, sportsApi, economicsApi, essApi, spanishApi,
} from "./api/contentApi.js";

// ─── Subject configuration ──────────────────────────────────────────────────
const SUBJECT_CONFIGS = {
  business: {
    subject: "business",
    label: "IB Business Management",
    subtitle: "Business",
    accentColor: "var(--accent)",
    accentSoft: "var(--accent-soft)",
    accentGlow: "var(--accent-glow)",
    labelColor: "var(--cat-investment)",
    basePath: "/business",
    show10Marker: true,
    showSpecimen: true,
    lsPrefix: "",
    api: {
      fetchChecklist, fetchFlashcardTopics, fetchFlashcards,
      fetchMcqQuestions, fetchWrittenQuestions, fetchCategoryColors,
    },
  },
  biology: {
    subject: "biology",
    label: "IB Biology",
    subtitle: "Biology",
    accentColor: "var(--color-success)",
    accentSoft: "var(--color-success-soft)",
    accentGlow: "var(--color-success-soft)",
    labelColor: "var(--color-success)",
    basePath: "/biology",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "bio_",
    units: [
      { value: "All", label: "All Units" },
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
    ],
    api: {
      fetchChecklist: fetchBiologyChecklist, fetchFlashcardTopics: fetchBiologyFlashcardTopics,
      fetchFlashcards: fetchBiologyFlashcards, fetchMcqQuestions: fetchBiologyMcqQuestions,
      fetchWrittenQuestions: fetchBiologyWrittenQuestions, fetchCategoryColors: fetchBiologyCategoryColors,
    },
  },
  chemistry: {
    subject: "chemistry",
    label: "IB Chemistry",
    subtitle: "Chemistry",
    accentColor: "#8B7EB5",
    accentSoft: "#8B7EB520",
    accentGlow: "#8B7EB540",
    labelColor: "#8B7EB5",
    basePath: "/chemistry",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "chem_",
    units: [
      { value: "All", label: "All Units" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6a", label: "6a" },
      { value: "7", label: "7" },
      { value: "8a", label: "8a" },
      { value: "9", label: "9" },
    ],
    api: {
      fetchChecklist: chemistryApi.fetchChecklist, fetchFlashcardTopics: chemistryApi.fetchFlashcardTopics,
      fetchFlashcards: chemistryApi.fetchFlashcards, fetchMcqQuestions: chemistryApi.fetchMcqQuestions,
      fetchWrittenQuestions: chemistryApi.fetchWrittenQuestions, fetchCategoryColors: chemistryApi.fetchCategoryColors,
    },
  },
  physics: {
    subject: "physics",
    label: "IB Physics",
    subtitle: "Physics",
    accentColor: "#C4A36A",
    accentSoft: "#C4A36A20",
    accentGlow: "#C4A36A40",
    labelColor: "#C4A36A",
    basePath: "/physics",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "phys_",
    units: [
      { value: "All", label: "All Units" },
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E" },
    ],
    api: {
      fetchChecklist: physicsApi.fetchChecklist, fetchFlashcardTopics: physicsApi.fetchFlashcardTopics,
      fetchFlashcards: physicsApi.fetchFlashcards, fetchMcqQuestions: physicsApi.fetchMcqQuestions,
      fetchWrittenQuestions: physicsApi.fetchWrittenQuestions, fetchCategoryColors: physicsApi.fetchCategoryColors,
    },
  },
  sports: {
    subject: "sports",
    label: "IB Sports Science",
    subtitle: "Sports Science",
    accentColor: "#B57A7A",
    accentSoft: "#B57A7A20",
    accentGlow: "#B57A7A40",
    labelColor: "#B57A7A",
    basePath: "/sports-science",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "sport_",
    units: [
      { value: "All", label: "All Units" },
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
    ],
    api: {
      fetchChecklist: sportsApi.fetchChecklist, fetchFlashcardTopics: sportsApi.fetchFlashcardTopics,
      fetchFlashcards: sportsApi.fetchFlashcards, fetchMcqQuestions: sportsApi.fetchMcqQuestions,
      fetchWrittenQuestions: sportsApi.fetchWrittenQuestions, fetchCategoryColors: sportsApi.fetchCategoryColors,
    },
  },
  economics: {
    subject: "economics",
    label: "IB Economics",
    subtitle: "Economics",
    accentColor: "#6BA3AD",
    accentSoft: "#6BA3AD20",
    accentGlow: "#6BA3AD40",
    labelColor: "#6BA3AD",
    basePath: "/economics",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "econ_",
    units: [
      { value: "All", label: "All Units" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
    ],
    api: {
      fetchChecklist: economicsApi.fetchChecklist, fetchFlashcardTopics: economicsApi.fetchFlashcardTopics,
      fetchFlashcards: economicsApi.fetchFlashcards, fetchMcqQuestions: economicsApi.fetchMcqQuestions,
      fetchWrittenQuestions: economicsApi.fetchWrittenQuestions, fetchCategoryColors: economicsApi.fetchCategoryColors,
    },
  },
  ess: {
    subject: "ess",
    label: "IB ESS",
    subtitle: "Environmental Systems & Societies",
    accentColor: "#7AAD6B",
    accentSoft: "#7AAD6B20",
    accentGlow: "#7AAD6B40",
    labelColor: "#7AAD6B",
    basePath: "/ess",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "ess_",
    units: [
      { value: "All", label: "All Units" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
      { value: "6", label: "6" },
      { value: "7", label: "7" },
      { value: "8", label: "8" },
    ],
    api: {
      fetchChecklist: essApi.fetchChecklist, fetchFlashcardTopics: essApi.fetchFlashcardTopics,
      fetchFlashcards: essApi.fetchFlashcards, fetchMcqQuestions: essApi.fetchMcqQuestions,
      fetchWrittenQuestions: essApi.fetchWrittenQuestions, fetchCategoryColors: essApi.fetchCategoryColors,
    },
  },
  spanish: {
    subject: "spanish",
    label: "IB Spanish",
    subtitle: "Spanish",
    accentColor: "#D4915C",
    accentSoft: "#D4915C20",
    accentGlow: "#D4915C40",
    labelColor: "#D4915C",
    basePath: "/spanish",
    show10Marker: false,
    showSpecimen: false,
    lsPrefix: "span_",
    units: [
      { value: "All", label: "All Units" },
      { value: "Ingenio Humano", label: "Ingenio Humano" },
      { value: "Cómo nos cuidamos", label: "Cómo nos cuidamos" },
    ],
    api: {
      fetchChecklist: spanishApi.fetchChecklist, fetchFlashcardTopics: spanishApi.fetchFlashcardTopics,
      fetchFlashcards: spanishApi.fetchFlashcards, fetchMcqQuestions: spanishApi.fetchMcqQuestions,
      fetchWrittenQuestions: spanishApi.fetchWrittenQuestions, fetchCategoryColors: spanishApi.fetchCategoryColors,
    },
  },
};
const SubjectConfigCtx = createContext(SUBJECT_CONFIGS.business);
function useSubjectConfig() { return useContext(SubjectConfigCtx); }

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
// CONTENT CONTEXT — all content is fetched from the database
// ─────────────────────────────────────────────────────────────────────────────
const EMPTY_CONTENT = { checklistSections: [], flashcardCategories: [], mcqQuestions: [], writtenQuestions: [], written10MarkQuestions: [], catColors: {}, allCats: ["All"] };
const ContentCtx = createContext(EMPTY_CONTENT);
function useContent() { return useContext(ContentCtx); }


// Phase 1: checklist + colors — renders the default tab immediately
async function fetchChecklistContent(api) {
  const [checklistRaw, colorsRaw] = await Promise.all([
    api.fetchChecklist(), api.fetchCategoryColors(),
  ]);
  const checklistSections = checklistRaw.map(sec => ({
    ...sec,
    items: sec.items ? sec.items.map(item => typeof item === "string" ? item : item.text) : [],
  }));
  const catColors = Array.isArray(colorsRaw)
    ? Object.fromEntries(colorsRaw.map(c => [c.category, c.color]))
    : colorsRaw;
  return { checklistSections, catColors };
}

// Phase 2: MCQ + written + flashcards — loads in background
async function fetchRemainingContent(api) {
  const [mcqRaw, writtenRaw, topicsRaw] = await Promise.all([
    api.fetchMcqQuestions(), api.fetchWrittenQuestions(), api.fetchFlashcardTopics(),
  ]);
  const mcqQuestions = mcqRaw.map(q => ({
    id: q.id, cat: q.category, difficulty: q.difficulty, q: q.question_text,
    options: [q.option_a, q.option_b, q.option_c, q.option_d],
    answer: q.correct_option, explanation: q.explanation, unit: q.unit,
  }));
  const allWritten = writtenRaw.map(q => ({
    id: q.id, cat: q.category, difficulty: q.difficulty, marks: q.marks,
    q: q.question_text, modelAnswer: q.mark_scheme, _type: q.question_type, unit: q.unit,
  }));
  const writtenQuestions = allWritten.filter(q => q._type === "short_answer");
  const written10MarkQuestions = allWritten.filter(q => q._type === "ten_marker");
  const flashcardCategories = await Promise.all(topicsRaw.map(async t => {
    try {
      const cards = await api.fetchFlashcards(t.id);
      return { id: t.id, label: t.label, color: t.color, unit: t.unit, cards: cards.map(c => ({ term: c.term, def: c.definition, formula: c.formula })) };
    } catch { return { id: t.id, label: t.label, color: t.color, unit: t.unit, cards: [] }; }
  }));
  const allCats = ["All", ...Array.from(new Set(mcqQuestions.map(q => q.cat)))];
  return { mcqQuestions, writtenQuestions, written10MarkQuestions, flashcardCategories, allCats };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function ChecklistView() {
  const { checklistSections } = useContent();
  const { lsPrefix } = useSubjectConfig();
  const [checked, setChecked] = useState(() => loadLS(`${lsPrefix}checklist_checked`, {}));
  const [openSections, setOpenSections] = useState(() => {
    const collapsed = loadLS(`${lsPrefix}checklist_collapsed`, {});
    return checklistSections.filter(s => !collapsed[s.id]).map(s => s.id);
  });
  const toggle = id => setChecked(p => { const next = { ...p, [id]: !p[id] }; saveLS(`${lsPrefix}checklist_checked`, next); return next; });
  const handleAccordion = (keys) => {
    const value = [...keys];
    setOpenSections(value);
    const collapsed = {};
    checklistSections.forEach(s => { if (!keys.has(s.id)) collapsed[s.id] = true; });
    saveLS(`${lsPrefix}checklist_collapsed`, collapsed);
  };
  const totalItems = checklistSections.reduce((s,sec)=>s+sec.items.length,0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount/totalItems)*100);
  const progColor = progress<30?"var(--color-danger)":progress<70?"var(--color-warning)":"var(--color-success)";

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Progress card */}
      <Surface className="rounded-3xl p-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-[var(--text-secondary)]" style={{fontFamily:"'JSans', sans-serif"}}>Overall Progress</span>
          <span className="text-2xl font-extrabold" style={{color: progColor}}>{progress}%</span>
        </div>
        <ProgressBar value={progress} color={progColor} animated />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[var(--text-muted)]">{checkedCount} of {totalItems} topics covered</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif", backgroundColor:"var(--color-success-soft)", color:"var(--color-success)"}}>auto-saved</span>
        </div>
      </Surface>

      {/* Sections */}
      <Accordion
        allowsMultipleExpanded
        expandedKeys={openSections}
        onExpandedChange={handleAccordion}
        hideSeparator
        className="flex flex-col gap-3"
      >
        {checklistSections.map(section => {
          const sectionChecked = section.items.filter((_,i)=>checked[`${section.id}-${i}`]).length;
          const allDone = sectionChecked===section.items.length;
          const isOpen = Array.isArray(openSections) ? openSections.includes(section.id) : openSections === "all";
          return (
            <Accordion.Item key={section.id} id={section.id} className="bg-[var(--bg-card)] rounded-2xl overflow-hidden">
              <Accordion.Heading>
                <Accordion.Trigger className="w-full flex items-center gap-2 px-5 py-3.5 hover:bg-[var(--bg-input)] transition-colors">
                  {!isOpen && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{backgroundColor: section.color + "22", color: section.color, fontFamily: "'JSans', sans-serif"}}>{sectionChecked}/{section.items.length}</span>}
                  <span className="text-sm font-semibold" style={{color: allDone ? section.color : "var(--text-primary)"}}>{allDone && "✓ "}{section.title}</span>
                  <Accordion.Indicator className="ml-auto shrink-0 text-[var(--text-muted)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="px-5 pb-4 pt-1">
                  <div className="flex flex-col gap-1">
                    {section.items.map((item,i) => {
                      const key = `${section.id}-${i}`;
                      const isChecked = checked[key];
                      const isImportant = item.includes("MEMORISE");
                      return (
                        <Checkbox
                          key={key}
                          isSelected={!!isChecked}
                          onChange={() => toggle(key)}
                          className="flex items-start gap-2.5 py-1.5 px-1 rounded-lg cursor-pointer hover:bg-[var(--bg-input)] transition-colors max-w-full"
                        >
                          <Checkbox.Control
                            className="mt-1 shrink-0"
                            style={{
                              borderColor: isChecked ? section.color : section.color + "66",
                              ...(isChecked ? { backgroundColor: section.color } : {}),
                            }}
                          >
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <Checkbox.Content>
                            <span className="text-sm leading-relaxed cursor-pointer" style={{color: isChecked ? "var(--text-muted)" : isImportant ? "var(--color-warning)" : "var(--text-body)", textDecoration: isChecked ? "line-through" : "none"}}>{item}</span>
                          </Checkbox.Content>
                        </Checkbox>
                      );
                    })}
                  </div>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <span className="text-center block text-xs text-[var(--text-muted)] mt-6">
        Click any item to mark it as revised ·{" "}
        <button type="button" className="text-[var(--accent)] cursor-pointer bg-transparent border-none text-xs" style={{font:"inherit"}} onClick={()=>{ setChecked({}); saveLS(`${lsPrefix}checklist_checked`, {}); }}>Reset all</button>
      </span>
    </div>
  );
}

function FlashCard({card, catColor}) {
  const [flipped,setFlipped]=useState(false);
  const handleKeyDown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped(f=>!f); } };
  return (
    <div
      className="flashcard-container"
      onClick={()=>setFlipped(f=>!f)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={flipped ? `Definition: ${card.def}` : `Flashcard: ${card.term}. Press to reveal`}
    >
      <div className={`flashcard-inner${flipped ? " flipped" : ""}`}>
        {/* Front */}
        <div
          className="flashcard-face bg-[var(--bg-input)]"
          aria-hidden={flipped}
          style={{
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            alignItems: "center",
            padding: 24,
            textAlign: "center",
          }}
        >
          <span className="block text-[11px] uppercase text-[var(--text-muted)] mb-4" style={{letterSpacing:2}}>TERM</span>
          <span className="block text-[20px] font-bold text-[var(--text-primary)]" style={{lineHeight:1.3}}>{card.term}</span>
          <span className="block text-[11px] text-[var(--text-muted)] mt-6">tap to reveal</span>
        </div>
        {/* Back */}
        <div
          className="flashcard-face flashcard-back bg-[var(--bg-input)]"
          aria-hidden={!flipped}
          style={{
            border: "1px solid var(--border)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            padding: 20,
            overflowY: "auto",
          }}
        >
          <span className="block text-[11px] uppercase text-[var(--text-muted)] mb-2" style={{letterSpacing:2}}>DEFINITION</span>
          <span className="block text-[13px] text-[var(--text-body)]" style={{lineHeight:1.65}}>{card.def}</span>
          {card.formula && (
            <div className="mt-2 p-2" style={{ background: "var(--bg-base)", borderRadius: 8, borderLeft: `3px solid ${catColor}` }}>
              <span className="block text-[10px] text-current mb-1" style={{fontFamily:"'JSans', sans-serif", letterSpacing:1, color:catColor}}>FORMULA</span>
              <span className="block text-[12px] text-[var(--accent)]" style={{fontFamily:"'JSans', sans-serif"}}>{card.formula}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FlashcardsView() {
  const { flashcardCategories } = useContent();
  const { lsPrefix } = useSubjectConfig();
  const [activeCat,setActiveCat]=useState(()=>loadLS(`${lsPrefix}fc_cat`, flashcardCategories[0]?.id));
  const [cardIdx,setCardIdx]=useState(0);
  const currentCat=flashcardCategories.find(c=>c.id===activeCat) || flashcardCategories[0];
  if (!currentCat || !currentCat.cards || currentCat.cards.length === 0) return <span className="text-center block text-[var(--text-muted)] py-8">Loading flashcards…</span>;
  const currentCard=currentCat.cards[Math.min(cardIdx, currentCat.cards.length - 1)];
  return (
    <div style={{maxWidth:680,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Category filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {flashcardCategories.map(cat=>(
          <Button
            key={cat.id}
            size="sm"
            onPress={()=>{ setActiveCat(cat.id); saveLS(`${lsPrefix}fc_cat`, cat.id); setCardIdx(0); }}
            className="rounded-full text-xs"
            style={{
              fontFamily: "'JSans', sans-serif",
              backgroundColor: activeCat===cat.id ? cat.color : "var(--bg-input)",
              color: activeCat===cat.id ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${activeCat===cat.id ? cat.color : "var(--border)"}`,
            }}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[var(--text-muted)]" style={{fontFamily:"'JSans', sans-serif"}}>{cardIdx+1} / {currentCat.cards.length} — {currentCat.label}</span>
        <div style={{background:"var(--bg-input)",borderRadius:99,height:4,width:140,overflow:"hidden"}}>
          <div style={{width:`${((cardIdx+1)/currentCat.cards.length)*100}%`,height:"100%",background:currentCat.color,borderRadius:99,transition:"width 0.3s"}}/>
        </div>
      </div>

      {/* Card */}
      <FlashCard key={`${activeCat}-${cardIdx}`} card={currentCard} catColor={currentCat.color}/>

      {/* Navigation */}
      <div className="flex gap-2 grow mt-4">
        <Button
          variant="ghost"
          size="md"
          isDisabled={cardIdx===0}
          onPress={()=>setCardIdx(i=>Math.max(0,i-1))}
          className="rounded-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-secondary)] disabled:bg-[var(--bg-card)] disabled:border-[var(--bg-elevated)]"
          style={{flex:1}}
        >
          Previous
        </Button>
        <Button
          size="md"
          isDisabled={cardIdx===currentCat.cards.length-1}
          onPress={()=>setCardIdx(i=>Math.min(currentCat.cards.length-1,i+1))}
          className="rounded-full border-none text-white"
          style={{
            flex:1,
            background: cardIdx===currentCat.cards.length-1 ? "var(--bg-elevated)" : currentCat.color,
          }}
        >
          Next
        </Button>
      </div>
      <span className="text-center block text-xs text-[var(--text-muted)] mt-4">Tap any card to flip it</span>
    </div>
  );
}

function MCQItem({q, displayNum}) {
  const { catColors } = useContent();
  const { subject } = useSubjectConfig();
  const [selected,setSelected]=useState(null);
  const [confirmed,setConfirmed]=useState(false);
  const color=catColors[q.cat]||"var(--accent)";
  const { recordAttempt, resetTimer } = useAttemptTracker(q.id, "mcq", q.cat, subject, q.difficulty);
  return (
    <Surface variant="secondary" className="rounded-2xl mb-2 overflow-hidden" style={{ transition:"all 0.2s" }}>
      <div style={{borderLeft:`4px solid ${color}`,padding:"18px 20px"}}>
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif",backgroundColor:color,color:"#fff"}}>MCQ</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif",backgroundColor:color+"22",color:color}}>{ q.cat}</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif",backgroundColor:"var(--bg-elevated)",color:"var(--text-secondary)"}}>{q.difficulty}</span>
        </div>
        <span className="block text-[15px] text-[var(--text-primary)] font-semibold" style={{lineHeight:1.6}}>Q{displayNum}. {q.q}</span>
      </div>
      <div className="flex flex-col gap-2 p-4 pt-2">
        <RadioGroup
          value={selected!==null ? String(selected) : undefined}
          onChange={(val) => { if(!confirmed) setSelected(Number(val)); }}
          isReadOnly={confirmed}
          className="flex flex-col gap-2"
        >
          {q.options.map((opt,i) => {
            const isSelected=selected===i;
            const isCorrect=i===q.answer;
            let bg="var(--bg-card)",border="var(--border)",tc="var(--text-body)";
            if(confirmed){
              if(isCorrect){bg="var(--color-success-soft)";border="var(--color-success)";tc="var(--color-success)";}
              else if(isSelected&&!isCorrect){bg="var(--color-danger-soft)";border="var(--color-danger)";tc="var(--color-danger)";}
            } else if(isSelected){bg=color+"22";border=color;tc="var(--text-primary)";}
            return (
              <Radio
                key={i}
                value={String(i)}
                className="p-2 rounded-full m-0 hover:border-opacity-60"
                style={{
                  background:bg, border:`1.5px solid ${border}`,
                  cursor:confirmed?"default":"pointer", transition:"all 0.2s",
                }}
              >
                <Radio.Control className="hidden">
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <div className="flex items-center gap-2 flex-nowrap">
                    <div style={{
                      width:28,height:28,borderRadius:'50%',flexShrink:0,
                      background:confirmed&&isCorrect?"var(--color-success)":confirmed&&isSelected&&!isCorrect?"var(--color-danger)":isSelected?color:"var(--border)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                    }}>
                      <span className="text-[11px] text-white font-bold" style={{fontFamily:"'JSans', sans-serif"}}>
                        {confirmed&&isCorrect?"✓":confirmed&&isSelected&&!isCorrect?"✗":String.fromCharCode(65+i)}
                      </span>
                    </div>
                    <span className="text-[14px]" style={{color:tc, lineHeight:1.4}}>{opt}</span>
                  </div>
                </Radio.Content>
              </Radio>
            );
          })}
        </RadioGroup>
        {!confirmed ? (
          <Button
            fullWidth
            isDisabled={selected===null}
            onPress={()=>{if(selected!==null){setConfirmed(true);recordAttempt({userAnswer:selected,isCorrect:selected===q.answer});}}}
            className="rounded-full mt-1 font-semibold border-none"
            style={{
              background: selected!==null ? color : "var(--bg-elevated)",
              color: selected===null ? "var(--text-muted)" : "#fff",
            }}
          >
            Check Answer
          </Button>
        ) : (
          <Alert status={selected===q.answer ? "success" : "danger"} className="mt-1 rounded-2xl" style={{backgroundColor: (selected===q.answer ? "var(--color-success)" : "var(--color-danger)") + "11", border: `1px solid ${selected===q.answer ? "var(--color-success)" : "var(--color-danger)"}44`}}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title style={{fontFamily: "'JSans', sans-serif", fontSize: 12}}>{selected===q.answer ? "Correct!" : "Incorrect"}</Alert.Title>
              <Alert.Description>
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{q.explanation}</span>
                <Button variant="ghost" size="sm" className="mt-2 text-[var(--text-secondary)]" onPress={()=>{setSelected(null);setConfirmed(false);resetTimer();}}>Try Again</Button>
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}
      </div>
    </Surface>
  );
}

function PracticeView() {
  const { mcqQuestions, allCats, catColors } = useContent();
  const [filterCat,setFilterCat]=useState("All");

  const catMatchFn = (qCat, fCat) => {
    if (fCat === "All") return true;
    const normalise = s => s.replace(" (HL)","").toLowerCase();
    return normalise(qCat) === normalise(fCat);
  };

  const filtered = mcqQuestions.filter(q => catMatchFn(q.cat, filterCat));

  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"0 0 40px"}}>
      {/* Category filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {allCats.map(cat => {
          const c = catColors[cat] || "var(--accent)";
          const active = filterCat === cat;
          return (
            <Button
              key={cat}
              size="sm"
              className="rounded-full"
              onPress={()=>setFilterCat(cat)}
              style={{
                backgroundColor: active ? c : "var(--bg-input)",
                color: active ? "#fff" : "var(--text-secondary)",
                border: `1px solid ${active ? c : "var(--border)"}`,
                boxShadow: "none",
                fontFamily: "'JSans', sans-serif",
              }}
            >
              {cat}
            </Button>
          );
        })}
      </div>

      {/* Summary */}
      <span className="block text-xs text-[var(--text-muted)] mb-6" style={{fontFamily:"'JSans', sans-serif"}}>
        Showing {filtered.length} question{filtered.length!==1?"s":""}{filterCat!=="All"?` · ${filterCat}`:""}
      </span>

      {filtered.length === 0 && (
        <span className="text-center block py-10 text-[var(--text-muted)] text-sm">No questions match this filter.</span>
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
  const { catColors } = useContent();
  const { lsPrefix, subject } = useSubjectConfig();
  const [answer, setAnswer] = useState(() => loadLS(`${lsPrefix}written_ans_${q.id}`, ""));
  const [revealed, setRevealed] = useState(false);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState(() => loadLS(`${lsPrefix}written_grade_${q.id}`, null));
  const color = catColors[q.cat] || "var(--accent)";
  const { recordAttempt } = useAttemptTracker(q.id, "written", q.cat, subject, q.difficulty);

  useEffect(() => { saveLS(`${lsPrefix}written_ans_${q.id}`, answer); }, [answer, q.id]);
  useEffect(() => { saveLS(`${lsPrefix}written_grade_${q.id}`, gradeResult); }, [gradeResult, q.id]);

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
    ? scorePct >= 0.75 ? "var(--color-success)" : scorePct >= 0.4 ? "var(--color-warning)" : "var(--color-danger)"
    : "var(--text-secondary)";

  return (
    <Surface variant="secondary" className="rounded-2xl mb-4 overflow-hidden">
      <div style={{borderLeft:`4px solid ${color}`, padding:"18px 20px"}}>
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif",backgroundColor:color+"22", color}}>{q.cat}</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{fontFamily:"'JSans', sans-serif",backgroundColor:"var(--bg-elevated)", color:"var(--text-secondary)"}}>{q.difficulty}</span>
          <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{fontFamily:"'JSans', sans-serif",backgroundColor:"var(--color-warning-soft)", color:"var(--color-warning)", border:"1px solid var(--color-warning)"}}>[ {q.marks} marks ]</span>
        </div>
        <span className="block text-[15px] text-[var(--text-primary)] font-semibold" style={{lineHeight:1.6, whiteSpace:"pre-line"}}>Q{displayNum}. {q.q}</span>
      </div>

      <div style={{padding:"12px 20px 16px"}}>
        <TextArea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          aria-label={`Your answer to question ${displayNum}`}
          rows={5}
          disabled={grading}
          fullWidth
          className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] text-sm leading-relaxed placeholder:text-[var(--text-muted)] p-3 mb-2"
          style={{ fontFamily: "'JSans', sans-serif", resize: "vertical" }}
        />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="rounded-full border-none font-semibold"
            onPress={handleSolve}
            isPending={grading}
            isDisabled={!answer.trim() || grading}
            style={{
              background: answer.trim() && !grading ? "var(--accent)" : "var(--bg-elevated)",
              fontFamily: "'JSans', sans-serif",
            }}
          >
            {({isPending}) => <>
              {isPending && <Spinner color="current" size="sm" />}
              {isPending ? "Grading..." : "Solve"}
            </>}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={revealed
              ? "rounded-full text-[var(--text-secondary)]"
              : "rounded-full"
            }
            onPress={()=>setRevealed(r=>!r)}
            style={revealed ? { fontFamily: "'JSans', sans-serif" } : {
              backgroundColor: color,
              color: "#fff",
              border: "none",
              fontFamily: "'JSans', sans-serif",
            }}
          >
            {revealed ? "Hide Markscheme" : "Show Markscheme"}
          </Button>
          {answer.trim() && !grading && (
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full text-[var(--text-secondary)]"
              style={{ fontFamily: "'JSans', sans-serif" }}
              onPress={()=>{ setAnswer(""); setGradeResult(null); saveLS(`${lsPrefix}written_ans_${q.id}`, ""); saveLS(`${lsPrefix}written_grade_${q.id}`, null); }}
            >
              Clear
            </Button>
          )}
        </div>

        {/* AI Grade Result */}
        {gradeResult && (
          <Alert status={gradeResult.score == null ? "warning" : scorePct >= 0.75 ? "success" : scorePct >= 0.4 ? "warning" : "danger"} className="mt-4 rounded-2xl" style={{backgroundColor: (gradeResult.score == null ? "var(--text-secondary)" : scoreColor) + "11", border: `1px solid ${gradeResult.score == null ? "var(--text-secondary)" : scoreColor}44`}}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title style={{fontFamily: "'JSans', sans-serif", fontSize: 12}}>{gradeResult.score != null ? `AI Score: ${gradeResult.score}/${gradeResult.maxMarks || q.marks}` : "Grading Error"}</Alert.Title>
              <Alert.Description>
                {gradeResult.score != null && <ProgressBar value={scorePct * 100} color={scoreColor} animated className="mb-2" />}
                <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{gradeResult.feedback}</span>
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        {revealed && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <span className="block text-[11px] text-[var(--color-success)] mb-2" style={{fontFamily:"'JSans', sans-serif", letterSpacing:1}}>MARKSCHEME</span>
            <span className="block text-[13px] text-[var(--text-secondary)]" style={{lineHeight:1.7, whiteSpace:"pre-line"}}>{q.modelAnswer}</span>
          </div>
        )}
      </div>
    </Surface>
  );
}

function WrittenPracticeView() {
  const { writtenQuestions, written10MarkQuestions, catColors } = useContent();
  const { show10Marker, showSpecimen, basePath } = useSubjectConfig();
  const [mode, setMode] = useState("short"); // "short" or "10mark"
  const [filterCat, setFilterCat] = useState("All");

  const writtenCats = ["All", ...Array.from(new Set(writtenQuestions.map(q => q.cat)))];

  const catMatchFn = (qCat, fCat) => {
    if (fCat === "All") return true;
    const normalise = s => s.replace(" (HL)","").toLowerCase();
    return normalise(qCat) === normalise(fCat);
  };

  const filtered = mode === "10mark"
    ? written10MarkQuestions
    : writtenQuestions.filter(q => catMatchFn(q.cat, filterCat));

  return (
    <div style={{maxWidth:1060, margin:"0 auto", padding:"0 0 40px"}}>
      <Surface className="rounded-3xl p-5 mb-6">
        <span className="block text-sm text-[var(--text-primary)] font-semibold mb-1">Written Practice</span>
        <span className="block text-xs text-[var(--text-secondary)]" style={{lineHeight:1.5}}>
          Answer each question in the text box, then reveal the markscheme to compare.
        </span>
      </Surface>

      {/* Mode selector — Short Answer / 10 Marker / Specimen (link) */}
      <div className="flex gap-2.5 mb-6">
        <Button
          className="rounded-full font-bold"
          onPress={()=>{ setMode("short"); setFilterCat("All"); }}
          style={{
            flex: 1,
            height: 48,
            backgroundColor: mode === "short" ? "var(--accent)" : "var(--bg-input)",
            color: mode === "short" ? "#fff" : "var(--text-secondary)",
            border: `2px solid ${mode === "short" ? "var(--accent)" : "var(--border)"}`,
            fontSize: 15,
            lineHeight: 1,
            boxShadow: mode === "short" ? "0 0 16px var(--accent-glow)" : "none",
            fontFamily: "'JSans', sans-serif",
          }}
        >
          Short Answer
        </Button>
        {show10Marker && (
          <Button
            className="rounded-full font-bold"
            onPress={()=>setMode("10mark")}
            style={{
              flex: 1,
              height: 48,
              backgroundColor: mode === "10mark" ? "var(--color-danger)" : "var(--bg-input)",
              color: mode === "10mark" ? "#fff" : "var(--text-secondary)",
              border: `2px solid ${mode === "10mark" ? "var(--color-danger)" : "var(--border)"}`,
              fontSize: 15,
              lineHeight: 1,
              boxShadow: mode === "10mark" ? "0 0 16px var(--color-danger-soft)" : "none",
              fontFamily: "'JSans', sans-serif",
            }}
          >
            10 Marker
          </Button>
        )}
        {showSpecimen && (
          <a href={`${basePath}/specimen`} style={{ flex: 1, textDecoration: "none" }}>
            <Button
              fullWidth
              className="rounded-full font-bold"
              style={{
                height: 48,
                backgroundColor: "var(--bg-input)",
                color: "var(--cat-breakeven)",
                border: "2px solid var(--accent-secondary)",
                fontSize: 15,
                lineHeight: 1,
                fontFamily: "'JSans', sans-serif",
              }}
            >
              Specimen →
            </Button>
          </a>
        )}
      </div>

      {/* Category filter — only for short answer mode */}
      {mode === "short" && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {writtenCats.map(cat => {
            const c = catColors[cat] || "var(--accent)";
            const active = filterCat === cat;
            return (
              <Button
                key={cat}
                size="sm"
                className="rounded-full"
                onPress={()=>setFilterCat(cat)}
                style={{
                  backgroundColor: active ? c : "var(--bg-input)",
                  color: active ? "#fff" : "var(--text-secondary)",
                  border: `1px solid ${active ? c : "var(--border)"}`,
                  boxShadow: "none",
                  fontFamily: "'JSans', sans-serif",
                }}
              >
                {cat}
              </Button>
            );
          })}
        </div>
      )}

      <span className="block text-xs text-[var(--text-muted)] mb-6" style={{fontFamily:"'JSans', sans-serif"}}>
        Showing {filtered.length} question{filtered.length!==1?"s":""}{mode === "short" && filterCat!=="All"?` · ${filterCat}`:""}
        {mode === "10mark" ? " · 10 Markers" : ""}
      </span>

      {filtered.length === 0 && (
        <span className="text-center block py-10 text-[var(--text-muted)] text-sm">No questions match this filter.</span>
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
export default function App({ initialTab = "checklist", subject = "business" }) {
  const config = SUBJECT_CONFIGS[subject] || SUBJECT_CONFIGS.business;
  const { user } = useAuth();
  const [tab, setTab] = useState(initialTab);
  const switchTab = t => {
    const urlMap = { checklist: 'checklist', flashcards: 'flashcards', practice: 'multi-choice', written: 'written' };
    window.location.href = `${config.basePath}/${urlMap[t] || t}`;
  };
  // Unit filter (biology only)
  const [unit, setUnit] = useState(() => loadLS(`${config.lsPrefix}unit_tab`, "All"));
  useEffect(() => { saveLS(`${config.lsPrefix}unit_tab`, unit); }, [unit, config.lsPrefix]);

  // Content state — always starts empty, populated from API
  const [content, setContent] = useState(EMPTY_CONTENT);
  useEffect(() => {
    let cancelled = false;
    // Phase 1: checklist + colors — renders default tab immediately
    fetchChecklistContent(config.api)
      .then(data => { if (!cancelled) setContent(prev => ({ ...prev, ...data })); })
      .catch(err => console.warn("Checklist API unavailable:", err.message));
    // Phase 2: MCQ + written + flashcards — loads in background
    fetchRemainingContent(config.api)
      .then(data => { if (!cancelled) setContent(prev => ({ ...prev, ...data })); })
      .catch(err => console.warn("Content API unavailable:", err.message));
    return () => { cancelled = true; };
  }, [subject]);

  // Filtered content by unit (passthrough when no units config or "All")
  const filteredContent = useMemo(() => {
    if (!config.units || unit === "All") return content;
    return {
      ...content,
      checklistSections: content.checklistSections.filter(s => s.unit === unit),
      flashcardCategories: content.flashcardCategories.filter(c => c.unit === unit),
      mcqQuestions: content.mcqQuestions.filter(q => q.unit === unit),
      writtenQuestions: content.writtenQuestions.filter(q => q.unit === unit),
      written10MarkQuestions: content.written10MarkQuestions.filter(q => q.unit === unit),
      allCats: ["All", ...Array.from(new Set(content.mcqQuestions.filter(q => q.unit === unit).map(q => q.cat)))],
    };
  }, [content, unit, config.units]);

  return (
    <SubjectConfigCtx.Provider value={config}>
    <ContentCtx.Provider value={filteredContent}>
    <div className="min-h-screen bg-[var(--bg-base)]" style={{fontFamily:"'JSans', sans-serif",color:"var(--text-primary)"}}>

      <Sidebar activeSubject={config.subject} />

      <main id="main-content" style={{ marginLeft: "var(--sidebar-width, 240px)", transition: "margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)" }}>

      {/* Sticky header with glassmorphism */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "var(--bg-header)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-header)",
        }}
      >
        <div className="max-w-5xl mx-auto pt-4 pb-2 px-4">
          <div className="flex items-center justify-center mb-2.5" style={{ position: "relative" }}>
            <span className="text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-widest" style={{fontFamily: "'JSans', sans-serif", backgroundColor: config.accentSoft, color: config.labelColor}}>
              {config.label}
            </span>
            <LoginButton />
          </div>
          <h1 className="text-center font-extrabold text-[22px] sm:text-[30px] text-[var(--text-primary)] mb-3" style={{letterSpacing: -0.5}}>{config.subtitle}</h1>

          <Tabs variant="secondary" selectedKey={tab}>
            <Tabs.ListContainer>
              <Tabs.List aria-label="Content tabs" className="w-full">
                {[
                  { value: "checklist", label: "Checklist", href: `${config.basePath}/checklist`, Icon: ListChecks },
                  { value: "flashcards", label: "Flashcards", href: `${config.basePath}/flashcards`, Icon: Layers },
                  { value: "practice", label: "Multi-Choice", href: `${config.basePath}/multi-choice`, Icon: CircleDot },
                  { value: "written", label: "Written", href: `${config.basePath}/written`, Icon: PenLine },
                ].map(t => (
                  <Tabs.Tab key={t.value} id={t.value}
                    render={(domProps) => <a {...domProps} href={t.href} style={{textDecoration:"none", flex:1, textAlign:"center"}} />}
                    className="text-[13px] font-semibold py-2.5 text-[var(--text-muted)] data-[selected=true]:text-[var(--text-primary)]"
                    style={{fontFamily: "'JSans', sans-serif"}}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <t.Icon size={14} strokeWidth={2} />
                      {t.label}
                    </span>
                    <Tabs.Indicator style={{backgroundColor: config.accentColor}} />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Unit filter (biology) */}
        {config.units && (
          <div className="flex gap-2 justify-center mb-6">
            {config.units.map(u => {
              const active = unit === u.value;
              return (
                <Button
                  key={u.value}
                  size="sm"
                  className="rounded-full font-semibold"
                  onPress={() => setUnit(u.value)}
                  style={{
                    backgroundColor: active ? config.accentColor : "var(--bg-input)",
                    color: active ? "#fff" : "var(--text-secondary)",
                    border: `1px solid ${active ? config.accentColor : "var(--border)"}`,
                    boxShadow: active ? `0 0 12px ${config.accentGlow}` : "none",
                    fontFamily: "'JSans', sans-serif",
                    minWidth: u.value === "All" ? 90 : 40,
                  }}
                >
                  {u.label}
                </Button>
              );
            })}
          </div>
        )}
        {tab==="checklist" && <ChecklistView/>}
        {tab==="flashcards" && <FlashcardsView/>}
        {tab==="practice" && <PracticeView/>}
        {tab==="written" && <WrittenPracticeView/>}
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
        aria-label="Support us"
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "none"; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{transition:"fill 0.25s ease"}}/>
        </svg>
      </a>

      <Analytics />
    </main>
    </div>
    </ContentCtx.Provider>
    </SubjectConfigCtx.Provider>
  );
}
