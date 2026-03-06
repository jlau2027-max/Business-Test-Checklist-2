import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Spinner,
  Modal,
  TextField,
  Input,
  Label,
  TextArea,
  Table,
  Tabs,
  RadioGroup,
  Radio,
  Tooltip,
  Skeleton,
  Alert,
  CloseButton,
} from "@heroui/react";
// Inline SVG icons (avoids @tabler/icons-react dependency)
const IconPlus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
const IconPencil = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L18.5 9.5a2.828 2.828 0 0 0-4-4L4 16v4M13.5 6.5l4 4" /></svg>
);
const IconTrash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" /></svg>
);
const IconCheck = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12l5 5L20 7" /></svg>
);
const IconAlertCircle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
);
const IconCircleCheckFilled = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm3.7 7.3a1 1 0 0 0-1.4 0L11 12.58l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.42z" /></svg>
);
import { useAuth } from "../AuthContext.jsx";
import {
  fetchMcqQuestions,
  createMcqQuestion,
  updateMcqQuestion,
  deleteMcqQuestion,
} from "../api/contentApi.js";
import CategorySelect from "./components/CategorySelect.jsx";
import DifficultyBadge from "./components/DifficultyBadge.jsx";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";
// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CATEGORY_COLORS = {
  "Costs & Revenue": "#7C6FFF",
  "Cash Flow": "#38BDF8",
  "Final Accounts": "#34D399",
  "Ratio Analysis": "#FBBF24",
  "Ratio Analysis (HL)": "#FBBF24",
  "Investment Appraisal": "#A78BFA",
  "Budgets & Variance": "#F87171",
  "Breakeven": "#2DD4BF",
  "BMT Tools": "#F472B6",
  "Sources of Finance": "#FB923C",
};
const OPTION_LETTERS = ["A", "B", "C", "D"];
const DIFFICULTY_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "SL", label: "SL" },
  { value: "HL", label: "HL" },
];
const DIFFICULTY_FORM_OPTIONS = [
  { value: "SL", label: "SL" },
  { value: "HL", label: "HL" },
  { value: "SL/HL", label: "SL/HL" },
];
const EMPTY_FORM = {
  category: "",
  difficulty: "SL",
  question_text: "",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  correct_option: "0",
  explanation: "",
};
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}
function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || "var(--text-secondary)";
}
// ---------------------------------------------------------------------------
// McqAdmin Component
// ---------------------------------------------------------------------------
export default function McqAdmin() {
  const { canEditContent, canDeleteContent } = useAuth();
  // ---- Data state ----
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ---- Filter state ----
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  // ---- Modal state ----
  const [modalOpened, setModalOpened] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  // ---- Delete state ----
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  // ---- Load questions ----
  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (filterCategory) filters.category = filterCategory;
      if (filterDifficulty !== "all") filters.difficulty = filterDifficulty;
      const data = await fetchMcqQuestions(filters);
      setQuestions(data);
    } catch (err) {
      setError(err.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterDifficulty]);
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);
  // ---- Clear success message after a delay ----
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3500);
    return () => clearTimeout(t);
  }, [successMsg]);
  // ---- Form helpers ----
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function openCreateModal() {
    setEditingQuestion(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpened(true);
  }
  function openEditModal(question) {
    setEditingQuestion(question);
    setForm({
      category: question.category || "",
      difficulty: question.difficulty || "SL",
      question_text: question.question_text || "",
      option_a: question.option_a || "",
      option_b: question.option_b || "",
      option_c: question.option_c || "",
      option_d: question.option_d || "",
      correct_option: String(question.correct_option ?? "0"),
      explanation: question.explanation || "",
    });
    setFormError(null);
    setModalOpened(true);
  }
  function closeModal() {
    setModalOpened(false);
    setEditingQuestion(null);
    setFormError(null);
  }
  // ---- Validation ----
  function validate() {
    if (!form.category) return "Category is required.";
    if (!form.question_text.trim()) return "Question text is required.";
    if (!form.option_a.trim()) return "Option A is required.";
    if (!form.option_b.trim()) return "Option B is required.";
    if (!form.option_c.trim()) return "Option C is required.";
    if (!form.option_d.trim()) return "Option D is required.";
    return null;
  }
  // ---- Save (create/update) ----
  async function handleSave() {
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        category: form.category,
        difficulty: form.difficulty,
        question_text: form.question_text.trim(),
        option_a: form.option_a.trim(),
        option_b: form.option_b.trim(),
        option_c: form.option_c.trim(),
        option_d: form.option_d.trim(),
        correct_option: parseInt(form.correct_option, 10),
        explanation: form.explanation.trim(),
      };
      if (editingQuestion) {
        await updateMcqQuestion(editingQuestion.id, payload);
        setSuccessMsg("Question updated successfully.");
      } else {
        await createMcqQuestion(payload);
        setSuccessMsg("Question created successfully.");
      }
      closeModal();
      await loadQuestions();
    } catch (err) {
      setFormError(err.message || "Failed to save question.");
    } finally {
      setSaving(false);
    }
  }
  // ---- Delete ----
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteMcqQuestion(deleteTarget.id);
      setDeleteTarget(null);
      setSuccessMsg("Question deleted.");
      await loadQuestions();
    } catch (err) {
      setError(err.message || "Failed to delete question.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }
  // ---- Render ----
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[var(--text-primary)]">
            MCQ Questions
          </span>
          {canEditContent && (
            <Button className="rounded-full bg-[#7C6FFF] text-white border-none" onPress={openCreateModal}><IconPlus size={16} /> Add Question</Button>
          )}
        </div>
        {/* Success alert */}
        {successMsg && (
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content className="flex-1">
              <Alert.Description>{successMsg}</Alert.Description>
            </Alert.Content>
            <CloseButton onPress={() => setSuccessMsg(null)} className="text-[var(--text-secondary)] hover:text-white" />
          </Alert>
        )}
        {/* Error alert */}
        {error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content className="flex-1">
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
            <CloseButton onPress={() => setError(null)} className="text-[var(--text-secondary)] hover:text-white" />
          </Alert>
        )}
        {/* Filters */}
        <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-[220px]">
              <CategorySelect
                value={filterCategory}
                onChange={setFilterCategory}
                label="Filter by Category"
                clearable
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                Difficulty
              </span>
              <Tabs variant="primary" selectedKey={filterDifficulty} onSelectionChange={setFilterDifficulty}>
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Difficulty filter" className="bg-[var(--bg-input)] rounded-lg p-0.5">
                    {DIFFICULTY_FILTER_OPTIONS.map(opt => (
                      <Tabs.Tab key={opt.value} id={opt.value} className="text-[var(--text-secondary)] text-sm px-3.5 py-1.5 data-[selected=true]:text-white rounded-full">
                        {opt.label}
                        <Tabs.Indicator className="bg-[#7C6FFF] rounded-full" />
                      </Tabs.Tab>
                    ))}
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>
            <div className="flex-1" />
            <span className="text-sm text-[var(--text-secondary)] self-end">
              {loading ? "Loading..." : `${questions.length} question${questions.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
        {/* Questions table */}
        <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] overflow-hidden">
          {loading ? (
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-sm" />
              ))}
            </div>
          ) : questions.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8">
              <span className="text-sm text-[var(--text-secondary)]">
                No questions found. {canEditContent ? "Click \"Add Question\" to create one." : ""}
              </span>
            </div>
          ) : (
            <div className="overflow-auto">
              <Table className="w-full">
                <Table.ScrollContainer>
                  <Table.Content>
                    <Table.Header className="bg-[#0E0E16]">
                      <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider p-3.5" style={{ width: 140 }}>Category</Table.Column>
                      <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider p-3.5" style={{ width: 80 }}>Difficulty</Table.Column>
                      <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider p-3.5">Question</Table.Column>
                      <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider p-3.5" style={{ width: 70 }}>Answer</Table.Column>
                      {(canEditContent || canDeleteContent) && (
                        <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider p-3.5 text-right" style={{ width: 90 }}>Actions</Table.Column>
                      )}
                    </Table.Header>
                    <Table.Body>
                      {questions.map((q) => (
                        <Table.Row key={q.id} className="hover:bg-[#16161F] border-b border-[var(--bg-elevated)]">
                          <Table.Cell className="p-3.5 text-sm">
                            <div className="flex items-center gap-1.5 flex-nowrap">
                              <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: getCategoryColor(q.category) }}
                              />
                              <span className="text-xs text-[var(--text-primary)] line-clamp-1">
                                {q.category}
                              </span>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="p-3.5 text-sm">
                            <DifficultyBadge difficulty={q.difficulty} />
                          </Table.Cell>
                          <Table.Cell className="p-3.5 text-sm">
                            <span className="text-sm text-[var(--text-primary)] line-clamp-1">
                              {truncate(q.question_text)}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="p-3.5 text-sm">
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-600 text-white">
                              <IconCheck size={10} />
                              {OPTION_LETTERS[q.correct_option] ?? "?"}
                            </span>
                          </Table.Cell>
                          {(canEditContent || canDeleteContent) && (
                            <Table.Cell className="p-3.5 text-sm">
                              <div className="flex items-center gap-1 justify-end flex-nowrap">
                                {canEditContent && (
                                  <Tooltip delay={0}>
                                    <Button isIconOnly size="sm" variant="ghost" className="text-[#A78BFA]" onPress={() => openEditModal(q)}>
                                      <IconPencil size={15} />
                                    </Button>
                                    <Tooltip.Content><p>Edit</p></Tooltip.Content>
                                  </Tooltip>
                                )}
                                {canDeleteContent && (
                                  <Tooltip delay={0}>
                                    <Button isIconOnly size="sm" variant="ghost" className="text-[#F87171]" onPress={() => setDeleteTarget(q)}>
                                      <IconTrash size={15} />
                                    </Button>
                                    <Tooltip.Content><p>Delete</p></Tooltip.Content>
                                  </Tooltip>
                                )}
                              </div>
                            </Table.Cell>
                          )}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </div>
          )}
        </div>
      </div>
      {/* ---- Create / Edit Modal ---- */}
      <Modal.Backdrop variant="opaque" isKeyboardDismissDisabled={false} isOpen={modalOpened} onOpenChange={(open) => { if (!open) closeModal(); }}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-lg" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid var(--border)" }}>
              <Modal.Heading style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "'JSans', sans-serif" }}>
                {editingQuestion ? "Edit Question" : "New Question"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                {formError && (
                  <Alert status="danger">
                    <Alert.Indicator />
                    <Alert.Content className="flex-1">
                      <Alert.Description>{formError}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
                {/* Category & Difficulty */}
                <div className="grid grid-cols-2 gap-4">
                  <CategorySelect
                    value={form.category}
                    onChange={(val) => updateField("category", val)}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      Difficulty
                    </span>
                    <Tabs variant="primary" selectedKey={form.difficulty} onSelectionChange={(val) => updateField("difficulty", val)}>
                      <Tabs.ListContainer>
                        <Tabs.List aria-label="Difficulty selection" className="bg-[var(--bg-input)] rounded-lg p-0.5 w-full">
                          {DIFFICULTY_FORM_OPTIONS.map(opt => (
                            <Tabs.Tab key={opt.value} id={opt.value} className="text-[var(--text-secondary)] text-sm px-3.5 py-1.5 data-[selected=true]:text-white rounded-full flex-1 text-center">
                              {opt.label}
                              <Tabs.Indicator className="bg-[#7C6FFF] rounded-full" />
                            </Tabs.Tab>
                          ))}
                        </Tabs.List>
                      </Tabs.ListContainer>
                    </Tabs>
                  </div>
                </div>
                {/* Question text */}
                <div>
                  <label className="text-[var(--text-secondary)] text-xs font-medium mb-1 block">Question</label>
                  <TextArea
                    value={form.question_text}
                    onChange={(e) => updateField("question_text", e.target.value)}
                    placeholder="Enter the question text..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-2xl min-h-[80px]"
                    rows={3}
                  />
                </div>
                {/* Options */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    Answer Options
                  </span>
                  {["a", "b", "c", "d"].map((letter, idx) => (
                    <TextField key={letter} className="w-full" name={`option_${letter}`} onChange={(val) => updateField(`option_${letter}`, val)}>
                      <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>Option {OPTION_LETTERS[idx]}</Label>
                      <Input
                        value={form[`option_${letter}`]}
                        placeholder={`Enter option ${OPTION_LETTERS[idx]}...`}
                        className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full"
                      />
                    </TextField>
                  ))}
                </div>
                {/* Correct answer */}
                <RadioGroup value={form.correct_option} onChange={(val) => updateField("correct_option", val)} name="correct_option">
                  <Label className="text-[var(--text-secondary)] text-xs font-medium">Correct Answer</Label>
                  <div className="flex items-center gap-6 mt-2">
                    {OPTION_LETTERS.map((letter, idx) => (
                      <Radio key={idx} value={String(idx)}>
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        <Radio.Content>
                          <Label className="text-[var(--text-primary)] text-sm">{`${letter}${form[`option_${letter.toLowerCase()}`] ? `: ${truncate(form[`option_${letter.toLowerCase()}`], 30)}` : ""}`}</Label>
                        </Radio.Content>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                {/* Explanation */}
                <div>
                  <label className="text-[var(--text-secondary)] text-xs font-medium mb-1 block">Explanation (shown when incorrect)</label>
                  <TextArea
                    value={form.explanation}
                    onChange={(e) => updateField("explanation", e.target.value)}
                    placeholder="Explain why the correct answer is right..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-2xl min-h-[60px]"
                    rows={2}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" className="rounded-full text-[var(--text-secondary)]" onPress={closeModal} isDisabled={saving}>Cancel</Button>
              <Button className="rounded-full bg-[#7C6FFF] text-white border-none" onPress={handleSave} isPending={saving}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingQuestion ? "Save Changes" : "Create Question")}</>}</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
      {/* ---- Delete Confirmation Modal ---- */}
      <ConfirmDeleteModal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Question"
        message={
          deleteTarget
            ? `Are you sure you want to delete the question "${truncate(deleteTarget.question_text, 60)}"? This action cannot be undone.`
            : undefined
        }
        loading={deleting}
      />
    </div>
  );
}
