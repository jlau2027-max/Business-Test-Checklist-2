import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
  Modal,
  SegmentedControl,
  Radio,
  Table,
  ActionIcon,
  Tooltip,
  Skeleton,
  Alert,
  Badge,
  Box,
  ScrollArea,
} from "@mantine/core";
import { Button, Spinner } from "@heroui/react";
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
// Styles
// ---------------------------------------------------------------------------
const modalStyles = {
  header: { backgroundColor: "#12121A", borderBottom: "1px solid #252533" },
  body: { backgroundColor: "#12121A" },
  title: { color: "#F0EEE8", fontWeight: 700 },
};
const inputStyles = {
  input: {
    backgroundColor: "#1A1A24",
    borderColor: "#252533",
    color: "#F0EEE8",
  },
  label: { color: "#8B8B9E", fontWeight: 500, marginBottom: 4 },
};
const textareaStyles = {
  ...inputStyles,
  input: { ...inputStyles.input, minHeight: 80 },
};
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}
function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || "#8B8B9E";
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
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Text fz="xl" fw={700} c="#F0EEE8">
            MCQ Questions
          </Text>
          {canEditContent && (
            <Button className="rounded-md bg-[#7C6FFF] text-white border-none" onPress={openCreateModal}><IconPlus size={16} /> Add Question</Button>
          )}
        </Group>
        {/* Success alert */}
        {successMsg && (
          <Alert
            icon={<IconCircleCheckFilled size={18} />}
            color="green"
            variant="light"
            radius="md"
            withCloseButton
            onClose={() => setSuccessMsg(null)}
          >
            {successMsg}
          </Alert>
        )}
        {/* Error alert */}
        {error && (
          <Alert
            icon={<IconAlertCircle size={18} />}
            color="red"
            variant="light"
            radius="md"
            withCloseButton
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        {/* Filters */}
        <Paper
          bg="#12121A"
          radius="md"
          p="md"
          style={{ border: "1px solid #252533" }}
        >
          <Group gap="md" wrap="wrap">
            <Box style={{ minWidth: 220 }}>
              <CategorySelect
                value={filterCategory}
                onChange={setFilterCategory}
                label="Filter by Category"
                clearable
              />
            </Box>
            <Stack gap={4}>
              <Text fz="sm" fw={500} c="#8B8B9E">
                Difficulty
              </Text>
              <SegmentedControl
                data={DIFFICULTY_FILTER_OPTIONS}
                value={filterDifficulty}
                onChange={setFilterDifficulty}
                radius="md"
                size="sm"
                styles={{
                  root: { backgroundColor: "#1A1A24" },
                  label: { color: "#8B8B9E", padding: "6px 14px" },
                  indicator: { backgroundColor: "#7C6FFF" },
                }}
              />
            </Stack>
            <Box style={{ flex: 1 }} />
            <Text fz="sm" c="#8B8B9E" style={{ alignSelf: "flex-end" }}>
              {loading ? "Loading..." : `${questions.length} question${questions.length !== 1 ? "s" : ""}`}
            </Text>
          </Group>
        </Paper>
        {/* Questions table */}
        <Paper
          bg="#12121A"
          radius="md"
          style={{ border: "1px solid #252533", overflow: "hidden" }}
        >
          {loading ? (
            <Stack gap="sm" p="md">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} height={48} radius="sm" />
              ))}
            </Stack>
          ) : questions.length === 0 ? (
            <Stack align="center" gap="sm" py="xl">
              <Text fz="sm" c="#8B8B9E">
                No questions found. {canEditContent ? "Click \"Add Question\" to create one." : ""}
              </Text>
            </Stack>
          ) : (
            <ScrollArea>
              <Table
                striped={false}
                highlightOnHover
                styles={{
                  table: { borderCollapse: "separate", borderSpacing: 0 },
                  thead: { backgroundColor: "#0E0E16" },
                  th: {
                    color: "#8B8B9E",
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    padding: "10px 14px",
                    borderBottom: "1px solid #252533",
                  },
                  td: {
                    color: "#F0EEE8",
                    padding: "10px 14px",
                    borderBottom: "1px solid #1E1E2A",
                    fontSize: 14,
                  },
                  tr: {
                    "&:hover": { backgroundColor: "#16161F" },
                  },
                }}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: 140 }}>Category</Table.Th>
                    <Table.Th style={{ width: 80 }}>Difficulty</Table.Th>
                    <Table.Th>Question</Table.Th>
                    <Table.Th style={{ width: 70 }}>Answer</Table.Th>
                    {(canEditContent || canDeleteContent) && (
                      <Table.Th style={{ width: 90, textAlign: "right" }}>
                        Actions
                      </Table.Th>
                    )}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {questions.map((q) => (
                    <Table.Tr key={q.id}>
                      <Table.Td>
                        <Group gap={6} wrap="nowrap">
                          <Box
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: getCategoryColor(q.category),
                              flexShrink: 0,
                            }}
                          />
                          <Text fz="xs" c="#F0EEE8" lineClamp={1}>
                            {q.category}
                          </Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <DifficultyBadge difficulty={q.difficulty} />
                      </Table.Td>
                      <Table.Td>
                        <Text fz="sm" c="#F0EEE8" lineClamp={1}>
                          {truncate(q.question_text)}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          size="sm"
                          variant="filled"
                          color="green"
                          radius="sm"
                          leftSection={<IconCheck size={10} />}
                        >
                          {OPTION_LETTERS[q.correct_option] ?? "?"}
                        </Badge>
                      </Table.Td>
                      {(canEditContent || canDeleteContent) && (
                        <Table.Td>
                          <Group gap={4} justify="flex-end" wrap="nowrap">
                            {canEditContent && (
                              <Tooltip label="Edit" withArrow position="top">
                                <ActionIcon
                                  variant="subtle"
                                  color="violet"
                                  radius="md"
                                  size="sm"
                                  onClick={() => openEditModal(q)}
                                >
                                  <IconPencil size={15} />
                                </ActionIcon>
                              </Tooltip>
                            )}
                            {canDeleteContent && (
                              <Tooltip label="Delete" withArrow position="top">
                                <ActionIcon
                                  variant="subtle"
                                  color="red"
                                  radius="md"
                                  size="sm"
                                  onClick={() => setDeleteTarget(q)}
                                >
                                  <IconTrash size={15} />
                                </ActionIcon>
                              </Tooltip>
                            )}
                          </Group>
                        </Table.Td>
                      )}
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          )}
        </Paper>
      </Stack>
      {/* ---- Create / Edit Modal ---- */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title={editingQuestion ? "Edit Question" : "New Question"}
        centered
        size="lg"
        radius="md"
        styles={modalStyles}
      >
        <Stack gap="md">
          {formError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              radius="md"
            >
              {formError}
            </Alert>
          )}
          {/* Category & Difficulty */}
          <Group grow gap="md">
            <CategorySelect
              value={form.category}
              onChange={(val) => updateField("category", val)}
            />
            <Stack gap={4}>
              <Text fz="sm" fw={500} c="#8B8B9E">
                Difficulty
              </Text>
              <SegmentedControl
                data={DIFFICULTY_FORM_OPTIONS}
                value={form.difficulty}
                onChange={(val) => updateField("difficulty", val)}
                radius="md"
                size="sm"
                fullWidth
                styles={{
                  root: { backgroundColor: "#1A1A24" },
                  label: { color: "#8B8B9E", padding: "6px 14px" },
                  indicator: { backgroundColor: "#7C6FFF" },
                }}
              />
            </Stack>
          </Group>
          {/* Question text */}
          <Textarea
            label="Question"
            placeholder="Enter the question text..."
            value={form.question_text}
            onChange={(e) => updateField("question_text", e.currentTarget.value)}
            autosize
            minRows={3}
            maxRows={6}
            radius="md"
            styles={textareaStyles}
          />
          {/* Options */}
          <Stack gap="sm">
            <Text fz="sm" fw={500} c="#8B8B9E">
              Answer Options
            </Text>
            {["a", "b", "c", "d"].map((letter, idx) => (
              <TextInput
                key={letter}
                label={`Option ${OPTION_LETTERS[idx]}`}
                placeholder={`Enter option ${OPTION_LETTERS[idx]}...`}
                value={form[`option_${letter}`]}
                onChange={(e) =>
                  updateField(`option_${letter}`, e.currentTarget.value)
                }
                radius="md"
                styles={inputStyles}
                leftSection={
                  <Text fz="xs" fw={700} c="#8B8B9E">
                    {OPTION_LETTERS[idx]}
                  </Text>
                }
              />
            ))}
          </Stack>
          {/* Correct answer */}
          <Radio.Group
            label="Correct Answer"
            value={form.correct_option}
            onChange={(val) => updateField("correct_option", val)}
            styles={{ label: { color: "#8B8B9E", fontWeight: 500 } }}
          >
            <Group mt="xs" gap="lg">
              {OPTION_LETTERS.map((letter, idx) => (
                <Radio
                  key={idx}
                  value={String(idx)}
                  label={`${letter}${form[`option_${letter.toLowerCase()}`] ? `: ${truncate(form[`option_${letter.toLowerCase()}`], 30)}` : ""}`}
                  color="green"
                  styles={{
                    label: { color: "#F0EEE8", fontSize: 13 },
                    radio: { borderColor: "#252533", backgroundColor: "#1A1A24" },
                  }}
                />
              ))}
            </Group>
          </Radio.Group>
          {/* Explanation */}
          <Textarea
            label="Explanation (shown when incorrect)"
            placeholder="Explain why the correct answer is right..."
            value={form.explanation}
            onChange={(e) =>
              updateField("explanation", e.currentTarget.value)
            }
            autosize
            minRows={2}
            maxRows={5}
            radius="md"
            styles={textareaStyles}
          />
          {/* Actions */}
          <Group justify="flex-end" gap="sm" mt="sm">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={closeModal} isDisabled={saving}>Cancel</Button>
            <Button className="rounded-md bg-[#7C6FFF] text-white border-none" onPress={handleSave} isPending={saving}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingQuestion ? "Save Changes" : "Create Question")}</>}</Button>
          </Group>
        </Stack>
      </Modal>
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
    </Container>
  );
}