import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Spinner,
  Modal,
  TextField,
  Input,
  Label,
  TextArea,
  NumberField,
  Select,
  ListBox,
  Table,
  Tabs,
  Tooltip,
  Alert,
  CloseButton,
} from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";
import {
  fetchWrittenQuestions,
  createWrittenQuestion,
  updateWrittenQuestion,
  deleteWrittenQuestion,
} from "../api/contentApi.js";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";
import DifficultyBadge from "./components/DifficultyBadge.jsx";
import CategorySelect from "./components/CategorySelect.jsx";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const QUESTION_TYPES = [
  { value: "short_answer", label: "Short Answer" },
  { value: "ten_marker", label: "10-Marker" },
  { value: "specimen", label: "Specimen" },
];

const DIFFICULTY_OPTIONS = [
  { value: "SL", label: "SL" },
  { value: "HL", label: "HL" },
  { value: "SL/HL", label: "SL/HL" },
];

const DEFAULT_MARKS = {
  short_answer: 2,
  ten_marker: 10,
  specimen: 4,
};

const MARKS_COLORS = {
  1: "gray",
  2: "teal",
  3: "cyan",
  4: "blue",
  5: "indigo",
  6: "violet",
  8: "grape",
  10: "orange",
};

function getMarksColor(marks) {
  return MARKS_COLORS[marks] || "violet";
}

// ---------------------------------------------------------------------------
// Marks badge color mapping (Tailwind classes)
// ---------------------------------------------------------------------------

const MARKS_BADGE_STYLES = {
  gray: "bg-gray-500 text-white",
  teal: "bg-teal-500 text-white",
  cyan: "bg-cyan-500 text-white",
  blue: "bg-blue-500 text-white",
  indigo: "bg-indigo-500 text-white",
  violet: "bg-violet-500 text-white",
  grape: "bg-purple-500 text-white",
  orange: "bg-orange-500 text-white",
};

function getMarksBadgeClasses(marks) {
  const color = getMarksColor(marks);
  return MARKS_BADGE_STYLES[color] || "bg-violet-500 text-white";
}

// ---------------------------------------------------------------------------
// Truncate helper
// ---------------------------------------------------------------------------

function truncate(str, max = 90) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ---------------------------------------------------------------------------
// WrittenAdmin Component
// ---------------------------------------------------------------------------

export default function WrittenAdmin() {
  const { canEditContent, canDeleteContent } = useAuth();

  // ---- Tab / filter state ----
  const [activeType, setActiveType] = useState("short_answer");
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState(null);

  // ---- Data state ----
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Modal state ----
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, object = edit
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  // ---- Form fields ----
  const [formType, setFormType] = useState("short_answer");
  const [formCategory, setFormCategory] = useState("");
  const [formDifficulty, setFormDifficulty] = useState("SL/HL");
  const [formMarks, setFormMarks] = useState(2);
  const [formLabel, setFormLabel] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  const [formMarkScheme, setFormMarkScheme] = useState("");

  // ---- Delete state ----
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ------------------------------------------------------------------
  // Load questions
  // ------------------------------------------------------------------

  const loadQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = { type: activeType };
      if (filterCategory) filters.category = filterCategory;
      if (filterDifficulty) filters.difficulty = filterDifficulty;
      const data = await fetchWrittenQuestions(filters);
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load written questions:", err);
      setError(err.message || "Failed to load questions");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [activeType, filterCategory, filterDifficulty]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // ------------------------------------------------------------------
  // Open modal helpers
  // ------------------------------------------------------------------

  function openCreate() {
    setEditing(null);
    setFormType(activeType);
    setFormCategory(activeType === "specimen" ? "Specimen Exam" : "");
    setFormDifficulty("SL/HL");
    setFormMarks(DEFAULT_MARKS[activeType] ?? 2);
    setFormLabel("");
    setFormQuestion("");
    setFormMarkScheme("");
    setFormError(null);
    setModalOpen(true);
  }

  function openEdit(q) {
    setEditing(q);
    setFormType(q.question_type || activeType);
    setFormCategory(q.category || "");
    setFormDifficulty(q.difficulty || "SL/HL");
    setFormMarks(q.marks ?? DEFAULT_MARKS[q.question_type] ?? 2);
    setFormLabel(q.label || "");
    setFormQuestion(q.question_text || "");
    setFormMarkScheme(q.mark_scheme || "");
    setFormError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setFormError(null);
  }

  // ------------------------------------------------------------------
  // Save (create / update)
  // ------------------------------------------------------------------

  async function handleSave() {
    // Basic validation
    if (!formQuestion.trim()) {
      setFormError("Question text is required.");
      return;
    }
    if (!formCategory) {
      setFormError("Category is required.");
      return;
    }
    if (formMarks == null || formMarks < 1) {
      setFormError("Marks must be at least 1.");
      return;
    }

    const payload = {
      question_type: formType,
      category: formCategory,
      difficulty: formDifficulty,
      marks: formMarks,
      question_text: formQuestion.trim(),
      mark_scheme: formMarkScheme.trim(),
      label: formLabel.trim() || null,
    };

    setSaving(true);
    setFormError(null);
    try {
      if (editing) {
        await updateWrittenQuestion(editing.id, payload);
      } else {
        await createWrittenQuestion(payload);
      }
      closeModal();
      await loadQuestions();
    } catch (err) {
      console.error("Failed to save written question:", err);
      setFormError(err.message || "Failed to save question");
    } finally {
      setSaving(false);
    }
  }

  // ------------------------------------------------------------------
  // Delete
  // ------------------------------------------------------------------

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteWrittenQuestion(deleteTarget.id);
      setDeleteTarget(null);
      await loadQuestions();
    } catch (err) {
      console.error("Failed to delete written question:", err);
      setError(err.message || "Failed to delete question");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  // ------------------------------------------------------------------
  // When form type changes, update default marks
  // ------------------------------------------------------------------

  function handleFormTypeChange(val) {
    setFormType(val);
    setFormMarks(DEFAULT_MARKS[val] ?? 2);
    if (val === "specimen" && !formCategory) {
      setFormCategory("Specimen Exam");
    }
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  return (
    <div className="flex flex-col gap-4">
      {/* ---------- Sub-tabs ---------- */}
      <Tabs
        variant="primary"
        selectedKey={activeType}
        onSelectionChange={(val) => {
          setActiveType(val);
          setFilterCategory(null);
          setFilterDifficulty(null);
        }}
      >
        <Tabs.ListContainer>
          <Tabs.List
            aria-label="Question type"
            className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg p-0.5"
          >
            {QUESTION_TYPES.map((opt) => (
              <Tabs.Tab
                key={opt.value}
                id={opt.value}
                className="text-[var(--text-secondary)] text-sm font-medium px-4 py-2 data-[selected=true]:text-white rounded-full"
              >
                {opt.label}
                <Tabs.Indicator className="bg-[var(--accent)] rounded-full" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>

      {/* ---------- Filter bar ---------- */}
      <div className="bg-[var(--bg-card)] rounded-lg p-4 border border-[var(--border)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <CategorySelect
              value={filterCategory}
              onChange={setFilterCategory}
              label={null}
              placeholder="All categories"
              size="sm"
              w={200}
            />
            <Select
              className="w-[140px]"
              placeholder="All difficulties"
              selectedKey={filterDifficulty}
              onSelectionChange={setFilterDifficulty}
            >
              <Select.Trigger className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full text-sm">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-[var(--bg-input)] border border-[var(--border)]">
                <ListBox>
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <ListBox.Item
                      key={opt.value}
                      id={opt.value}
                      textValue={opt.label}
                      className="text-[var(--text-primary)] text-xs"
                    >
                      {opt.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {canEditContent && (
            <Button
              onPress={openCreate}
              size="sm"
              className="rounded-full border-none font-semibold bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-[0_4px_16px_var(--accent-glow)]"
            >
              + Add Question
            </Button>
          )}
        </div>
      </div>

      {/* ---------- Error alert ---------- */}
      {error && (
        <Alert
          status="danger"
          className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)]"
        >
          <Alert.Indicator />
          <Alert.Content className="flex-1">
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
          <CloseButton onPress={() => setError(null)} className="text-[var(--text-secondary)] hover:text-white" />
        </Alert>
      )}

      {/* ---------- Loading state ---------- */}
      {loading && (
        <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)] text-center">
          <Spinner color="current" size="md" />
          <span className="text-sm text-[var(--text-secondary)] mt-2 block">
            Loading questions...
          </span>
        </div>
      )}

      {/* ---------- Empty state ---------- */}
      {!loading && !error && questions.length === 0 && (
        <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)] text-center">
          <span className="text-lg text-[var(--text-muted)] font-semibold block">
            No questions found
          </span>
          <span className="text-sm text-[var(--text-secondary)] mt-1 block">
            {filterCategory || filterDifficulty
              ? "Try changing the filters."
              : 'Click "Add Question" to create the first one.'}
          </span>
        </div>
      )}

      {/* ---------- Questions table ---------- */}
      {!loading && questions.length > 0 && (
        <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] overflow-hidden">
          <Table className="w-full">
            <Table.ScrollContainer>
              <Table.Content>
                <Table.Header className="bg-[var(--bg-base)]">
                  <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2">
                    Category
                  </Table.Column>
                  <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2">
                    Difficulty
                  </Table.Column>
                  <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2">
                    Marks
                  </Table.Column>
                  {activeType === "specimen" && (
                    <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2">
                      Label
                    </Table.Column>
                  )}
                  <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2">
                    Question
                  </Table.Column>
                  {canEditContent && (
                    <Table.Column className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider border-b border-[var(--border)] px-4 py-2 w-[100px]">
                      Actions
                    </Table.Column>
                  )}
                </Table.Header>
                <Table.Body>
                  {questions.map((q) => (
                    <Table.Row
                      key={q.id}
                      className="hover:bg-[var(--bg-input)] border-b border-[var(--bg-input)]"
                    >
                      <Table.Cell className="px-4 py-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          {q.category || "-"}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="px-4 py-2">
                        <DifficultyBadge difficulty={q.difficulty} />
                      </Table.Cell>
                      <Table.Cell className="px-4 py-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full${getMarksBadgeClasses(q.marks)}`}
                        >
                          {q.marks} {q.marks === 1 ? "mark" : "marks"}
                        </span>
                      </Table.Cell>
                      {activeType === "specimen" && (
                        <Table.Cell className="px-4 py-2">
                          <span
                            className="text-sm text-[var(--text-secondary)]"
                            style={{
                              fontFamily: "'JSans', sans-serif",
                            }}
                          >
                            {q.label || "-"}
                          </span>
                        </Table.Cell>
                      )}
                      <Table.Cell className="px-4 py-2">
                        <span className="text-sm text-[var(--text-primary)] line-clamp-2">
                          {truncate(q.question_text, 120)}
                        </span>
                      </Table.Cell>
                      {canEditContent && (
                        <Table.Cell className="px-4 py-2">
                          <div className="flex items-center gap-1 flex-nowrap">
                            <Tooltip delay={0}>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                className="text-[var(--accent)]"
                                onPress={() => openEdit(q)}
                              >
                                <EditIcon />
                              </Button>
                              <Tooltip.Content>
                                <p>Edit</p>
                              </Tooltip.Content>
                            </Tooltip>
                            {canDeleteContent && (
                              <Tooltip delay={0}>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="ghost"
                                  className="text-[var(--color-danger)]"
                                  onPress={() => setDeleteTarget(q)}
                                >
                                  <TrashIcon />
                                </Button>
                                <Tooltip.Content>
                                  <p>Delete</p>
                                </Tooltip.Content>
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

          <div
            className="px-4 py-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span className="text-xs text-[var(--text-muted)]">
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {/* ---------- Create / Edit Modal ---------- */}
      <Modal.Backdrop
        variant="opaque"
        isKeyboardDismissDisabled={false}
        isOpen={modalOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <Modal.Container>
          <Modal.Dialog
            className="sm:max-w-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid var(--border)" }}>
              <Modal.Heading style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                {editing ? "Edit Question" : "New Question"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                {/* Question type */}
                <div>
                  <span className="text-sm font-medium text-[var(--text-secondary)] mb-1 block">
                    Question Type
                  </span>
                  <Tabs
                    variant="primary"
                    selectedKey={formType}
                    onSelectionChange={handleFormTypeChange}
                  >
                    <Tabs.ListContainer>
                      <Tabs.List
                        aria-label="Question type selector"
                        className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg p-0.5 w-full"
                      >
                        {QUESTION_TYPES.map((opt) => (
                          <Tabs.Tab
                            key={opt.value}
                            id={opt.value}
                            className="text-[var(--text-secondary)] text-sm font-medium px-4 py-2 data-[selected=true]:text-white rounded-full flex-1 text-center"
                          >
                            {opt.label}
                            <Tabs.Indicator className="bg-[var(--accent)] rounded-full" />
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>

                {/* Category */}
                <CategorySelect
                  value={formCategory}
                  onChange={setFormCategory}
                />

                {/* Difficulty */}
                <div>
                  <span className="text-sm font-medium text-[var(--text-secondary)] mb-1 block">
                    Difficulty
                  </span>
                  <Tabs
                    variant="primary"
                    selectedKey={formDifficulty}
                    onSelectionChange={setFormDifficulty}
                  >
                    <Tabs.ListContainer>
                      <Tabs.List
                        aria-label="Difficulty selector"
                        className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg p-0.5 w-full"
                      >
                        {DIFFICULTY_OPTIONS.map((opt) => (
                          <Tabs.Tab
                            key={opt.value}
                            id={opt.value}
                            className="text-[var(--text-secondary)] text-sm font-medium px-4 py-2 data-[selected=true]:text-white rounded-full flex-1 text-center"
                          >
                            {opt.label}
                            <Tabs.Indicator className="bg-[var(--accent)] rounded-full" />
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs.ListContainer>
                  </Tabs>
                </div>

                {/* Marks + Label (side by side) */}
                <div className="grid grid-cols-2 gap-2">
                  <NumberField
                    className="w-full"
                    value={formMarks}
                    onChange={setFormMarks}
                    minValue={1}
                    maxValue={30}
                  >
                    <Label
                      className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1"
                      style={{ fontFamily: "'JSans', sans-serif" }}
                    >
                      Marks
                    </Label>
                    <NumberField.Group>
                      <NumberField.DecrementButton />
                      <NumberField.Input className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" />
                      <NumberField.IncrementButton />
                    </NumberField.Group>
                  </NumberField>

                  <TextField
                    className="w-full"
                    name="label"
                    onChange={(val) => setFormLabel(val)}
                  >
                    <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1">
                      Label
                    </Label>
                    <Input
                      value={formLabel}
                      placeholder={
                        formType === "specimen"
                          ? 'e.g. "(a)", "(b)(i)"'
                          : "Optional"
                      }
                      className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full"
                    />
                  </TextField>
                </div>

                {/* Question text */}
                <div>
                  <label className="text-[var(--text-secondary)] text-xs font-medium mb-1 block">
                    Question
                  </label>
                  <TextArea
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    placeholder="Enter the question text..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-2xl min-h-[80px]"
                    rows={3}
                  />
                </div>

                {/* Mark scheme */}
                <div>
                  <label className="text-[var(--text-secondary)] text-xs font-medium mb-1 block">
                    Mark Scheme / Model Answer
                  </label>
                  <TextArea
                    value={formMarkScheme}
                    onChange={(e) => setFormMarkScheme(e.target.value)}
                    placeholder="Enter the mark scheme or model answer..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-2xl min-h-[160px]"
                    rows={6}
                  />
                  <span className="text-xs text-[var(--text-muted)] mt-1 block">
                    This is sent to the AI marker along with the student's
                    answer. Use [1], [2] notation for mark points.
                  </span>
                </div>

                {/* Form error */}
                {formError && (
                  <Alert
                    status="danger"
                    className="bg-[var(--color-danger-soft)] border border-[var(--color-danger)]"
                  >
                    <Alert.Indicator />
                    <Alert.Content className="flex-1">
                      <Alert.Description>{formError}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  className="rounded-full text-[var(--text-secondary)]"
                  onPress={closeModal}
                  isDisabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full border-none font-semibold bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] text-white shadow-[0_4px_16px_var(--accent-glow)]"
                  onPress={handleSave}
                  isPending={saving}
                >
                  {({ isPending }) => (
                    <>
                      {isPending && <Spinner color="current" size="sm" />}
                      {isPending
                        ? "Saving..."
                        : editing
                          ? "Save Changes"
                          : "Create Question"}
                    </>
                  )}
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* ---------- Delete confirmation ---------- */}
      <ConfirmDeleteModal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Question"
        message={
          deleteTarget
            ? `Are you sure you want to delete this ${
                deleteTarget.question_type === "ten_marker"
                  ? "10-marker"
                  : deleteTarget.question_type?.replace("_", " ")
              } question? This action cannot be undone.`
            : undefined
        }
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons (avoids extra dependencies)
// ---------------------------------------------------------------------------

function EditIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
