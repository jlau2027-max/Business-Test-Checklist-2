import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Paper,
  Group,
  Stack,
  Text,
  Button,
  TextInput,
  Textarea,
  Modal,
  SegmentedControl,
  Table,
  ActionIcon,
  Tooltip,
  Skeleton,
  Alert,
  Badge,
  Box,
  ScrollArea,
  NumberInput,
} from "@mantine/core";
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
const IconAlertCircle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
);
const IconCircleCheckFilled = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm3.7 7.3a1 1 0 0 0-1.4 0L11 12.58l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.42z" /></svg>
);
import { useAuth } from "../AuthContext.jsx";
import {
  fetchHistoryQuestions,
  createHistoryQuestion,
  updateHistoryQuestion,
  deleteHistoryQuestion,
} from "../api/contentApi.js";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PAPER_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "paper2", label: "Paper 2" },
  { value: "paper3", label: "Paper 3" },
];

const PAPER_FORM_OPTIONS = [
  { value: "paper2", label: "Paper 2" },
  { value: "paper3", label: "Paper 3" },
];

const PAPER_BADGE_CONFIG = {
  paper2: { label: "P2", color: "blue" },
  paper3: { label: "P3", color: "orange" },
};

const EMPTY_FORM = {
  paper: "paper2",
  topic: "",
  question_number: 1,
  question_text: "",
  marks: 15,
  mark_scheme: "",
  sort_order: 0,
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

const markSchemeTextareaStyles = {
  ...inputStyles,
  input: { ...inputStyles.input, minHeight: 120 },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ---------------------------------------------------------------------------
// HistoryAdmin Component
// ---------------------------------------------------------------------------

export default function HistoryAdmin() {
  const { canEditContent, canDeleteContent } = useAuth();

  // ---- Data state ----
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Filter state ----
  const [filterPaper, setFilterPaper] = useState("all");

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
      const paper = filterPaper !== "all" ? filterPaper : undefined;
      const data = await fetchHistoryQuestions(paper);
      setQuestions(data);
    } catch (err) {
      setError(err.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [filterPaper]);

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
      paper: question.paper || "paper2",
      topic: question.topic || "",
      question_number: question.question_number ?? 1,
      question_text: question.question_text || "",
      marks: question.marks ?? 15,
      mark_scheme: question.mark_scheme || "",
      sort_order: question.sort_order ?? 0,
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
    if (!form.paper) return "Paper is required.";
    if (!form.topic.trim()) return "Topic is required.";
    if (!form.question_text.trim()) return "Question text is required.";
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
        paper: form.paper,
        topic: form.topic.trim(),
        question_number: parseInt(form.question_number, 10) || 1,
        question_text: form.question_text.trim(),
        marks: parseInt(form.marks, 10) || 15,
        mark_scheme: form.mark_scheme.trim(),
        sort_order: parseInt(form.sort_order, 10) || 0,
      };

      if (editingQuestion) {
        await updateHistoryQuestion(editingQuestion.id, payload);
        setSuccessMsg("Question updated successfully.");
      } else {
        await createHistoryQuestion(payload);
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
      await deleteHistoryQuestion(deleteTarget.id);
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
            History Questions
          </Text>
          {canEditContent && (
            <Button
              leftSection={<IconPlus size={16} />}
              color="violet"
              radius="md"
              onClick={openCreateModal}
            >
              Add Question
            </Button>
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
            <Stack gap={4}>
              <Text fz="sm" fw={500} c="#8B8B9E">
                Paper
              </Text>
              <SegmentedControl
                data={PAPER_FILTER_OPTIONS}
                value={filterPaper}
                onChange={setFilterPaper}
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
                    <Table.Th style={{ width: 70 }}>Paper</Table.Th>
                    <Table.Th style={{ width: 160 }}>Topic</Table.Th>
                    <Table.Th style={{ width: 50 }}>Q#</Table.Th>
                    <Table.Th>Question</Table.Th>
                    <Table.Th style={{ width: 60 }}>Marks</Table.Th>
                    {(canEditContent || canDeleteContent) && (
                      <Table.Th style={{ width: 90, textAlign: "right" }}>
                        Actions
                      </Table.Th>
                    )}
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {questions.map((q) => {
                    const badgeConfig = PAPER_BADGE_CONFIG[q.paper] || { label: q.paper, color: "gray" };
                    return (
                      <Table.Tr key={q.id}>
                        <Table.Td>
                          <Badge
                            size="sm"
                            variant="filled"
                            color={badgeConfig.color}
                            radius="sm"
                          >
                            {badgeConfig.label}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text fz="xs" c="#F0EEE8" lineClamp={1}>
                            {q.topic}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fz="sm" c="#F0EEE8">
                            {q.question_number}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fz="sm" c="#F0EEE8" lineClamp={1}>
                            {truncate(q.question_text)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Text fz="sm" c="#8B8B9E">
                            {q.marks}
                          </Text>
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
                    );
                  })}
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

          {/* Paper & Question Number */}
          <Group grow gap="md">
            <Stack gap={4}>
              <Text fz="sm" fw={500} c="#8B8B9E">
                Paper
              </Text>
              <SegmentedControl
                data={PAPER_FORM_OPTIONS}
                value={form.paper}
                onChange={(val) => updateField("paper", val)}
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
            <NumberInput
              label="Question Number"
              placeholder="1"
              value={form.question_number}
              onChange={(val) => updateField("question_number", val)}
              min={1}
              radius="md"
              styles={inputStyles}
            />
          </Group>

          {/* Topic */}
          <TextInput
            label="Topic"
            placeholder="Enter the topic name..."
            value={form.topic}
            onChange={(e) => updateField("topic", e.currentTarget.value)}
            radius="md"
            styles={inputStyles}
          />

          {/* Question text */}
          <Textarea
            label="Question"
            placeholder="Enter the question text..."
            value={form.question_text}
            onChange={(e) => updateField("question_text", e.currentTarget.value)}
            autosize
            minRows={3}
            maxRows={8}
            radius="md"
            styles={textareaStyles}
          />

          {/* Marks */}
          <NumberInput
            label="Marks"
            placeholder="15"
            value={form.marks}
            onChange={(val) => updateField("marks", val)}
            min={1}
            radius="md"
            styles={inputStyles}
          />

          {/* Mark Scheme */}
          <Textarea
            label="Mark Scheme"
            placeholder="Enter the mark scheme..."
            value={form.mark_scheme}
            onChange={(e) => updateField("mark_scheme", e.currentTarget.value)}
            autosize
            minRows={4}
            maxRows={10}
            radius="md"
            styles={markSchemeTextareaStyles}
          />

          {/* Actions */}
          <Group justify="flex-end" gap="sm" mt="sm">
            <Button
              variant="subtle"
              color="gray"
              radius="md"
              onClick={closeModal}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              color="violet"
              radius="md"
              onClick={handleSave}
              loading={saving}
            >
              {editingQuestion ? "Save Changes" : "Create Question"}
            </Button>
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
