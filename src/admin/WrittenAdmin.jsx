import { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Group,
  Text,
  Paper,
  Badge,
  Table,
  Modal,
  TextInput,
  Textarea,
  NumberInput,
  SegmentedControl,
  Select,
  Loader,
  Alert,
  ActionIcon,
  Tooltip,
  Box,
} from "@mantine/core";
import { Button, Spinner } from "@heroui/react";
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
// Shared dark-theme style tokens
// ---------------------------------------------------------------------------

const inputStyles = {
  input: {
    backgroundColor: "#1A1A24",
    borderColor: "#252533",
    color: "#F0EEE8",
    "&:focus": { borderColor: "#7C6FFF" },
    "&::placeholder": { color: "#55556A" },
  },
  label: { color: "#8B8B9E", fontWeight: 500, marginBottom: 4 },
};

const modalStyles = {
  header: { backgroundColor: "#12121A", borderBottom: "1px solid #252533" },
  body: { backgroundColor: "#12121A" },
  title: { color: "#F0EEE8", fontWeight: 700 },
};

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
    <Stack gap="md">
      {/* ---------- Sub-tabs ---------- */}
      <SegmentedControl
        value={activeType}
        onChange={(val) => {
          setActiveType(val);
          setFilterCategory(null);
          setFilterDifficulty(null);
        }}
        data={QUESTION_TYPES}
        color="violet"
        radius="md"
        styles={{
          root: { backgroundColor: "#1A1A24", border: "1px solid #252533" },
          label: { color: "#8B8B9E", fontWeight: 500, "&[data-active]": { color: "#F0EEE8" } },
        }}
      />

      {/* ---------- Filter bar ---------- */}
      <Paper bg="#12121A" radius="lg" p="md" style={{ border: "1px solid #252533" }}>
        <Group justify="space-between" wrap="wrap" gap="sm">
          <Group gap="sm" wrap="wrap">
            <CategorySelect
              value={filterCategory}
              onChange={setFilterCategory}
              label={null}
              placeholder="All categories"
              size="sm"
              w={200}
            />
            <Select
              placeholder="All difficulties"
              data={DIFFICULTY_OPTIONS}
              value={filterDifficulty}
              onChange={setFilterDifficulty}
              clearable
              size="sm"
              w={140}
              radius="md"
              styles={{
                input: { backgroundColor: "#1A1A24", borderColor: "#252533", color: "#F0EEE8" },
                dropdown: { backgroundColor: "#12121A", borderColor: "#252533" },
                option: { color: "#F0EEE8" },
              }}
            />
          </Group>

          {canEditContent && (
            <Button onPress={openCreate} size="sm" className="rounded-md border-none font-semibold bg-gradient-to-br from-[#7C6FFF] to-[#A78BFA] text-white shadow-[0_4px_16px_#7C6FFF30]">+ Add Question</Button>
          )}
        </Group>
      </Paper>

      {/* ---------- Error alert ---------- */}
      {error && (
        <Alert
          color="red"
          variant="light"
          radius="md"
          withCloseButton
          onClose={() => setError(null)}
          styles={{
            root: { backgroundColor: "#F8717111", border: "1px solid #F8717144" },
          }}
        >
          {error}
        </Alert>
      )}

      {/* ---------- Loading state ---------- */}
      {loading && (
        <Paper
          bg="#12121A"
          radius="lg"
          p="xl"
          style={{ border: "1px solid #252533", textAlign: "center" }}
        >
          <Loader color="violet" size="md" />
          <Text fz="sm" c="#8B8B9E" mt="sm">
            Loading questions...
          </Text>
        </Paper>
      )}

      {/* ---------- Empty state ---------- */}
      {!loading && !error && questions.length === 0 && (
        <Paper
          bg="#12121A"
          radius="lg"
          p="xl"
          style={{ border: "1px solid #252533", textAlign: "center" }}
        >
          <Text fz="lg" c="#55556A" fw={600}>
            No questions found
          </Text>
          <Text fz="sm" c="#8B8B9E" mt={4}>
            {filterCategory || filterDifficulty
              ? "Try changing the filters."
              : "Click \"Add Question\" to create the first one."}
          </Text>
        </Paper>
      )}

      {/* ---------- Questions table ---------- */}
      {!loading && questions.length > 0 && (
        <Paper bg="#12121A" radius="lg" style={{ border: "1px solid #252533", overflow: "hidden" }}>
          <Table
            horizontalSpacing="md"
            verticalSpacing="sm"
            highlightOnHover
            styles={{
              table: { backgroundColor: "#12121A" },
              thead: { backgroundColor: "#0D0D14" },
              th: { color: "#8B8B9E", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1px solid #252533" },
              td: { color: "#F0EEE8", borderBottom: "1px solid #1A1A24" },
              tr: { "&:hover": { backgroundColor: "#1A1A2A" } },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Difficulty</Table.Th>
                <Table.Th>Marks</Table.Th>
                {activeType === "specimen" && <Table.Th>Label</Table.Th>}
                <Table.Th>Question</Table.Th>
                {canEditContent && <Table.Th w={100}>Actions</Table.Th>}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {questions.map((q) => (
                <Table.Tr key={q.id}>
                  <Table.Td>
                    <Badge size="sm" variant="light" color="violet" radius="sm">
                      {q.category || "-"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <DifficultyBadge difficulty={q.difficulty} />
                  </Table.Td>
                  <Table.Td>
                    <Badge size="sm" variant="filled" color={getMarksColor(q.marks)} radius="sm">
                      {q.marks} {q.marks === 1 ? "mark" : "marks"}
                    </Badge>
                  </Table.Td>
                  {activeType === "specimen" && (
                    <Table.Td>
                      <Text fz="sm" c="#8B8B9E" ff="'JetBrains Mono', monospace">
                        {q.label || "-"}
                      </Text>
                    </Table.Td>
                  )}
                  <Table.Td>
                    <Text fz="sm" c="#F0EEE8" lineClamp={2}>
                      {truncate(q.question_text, 120)}
                    </Text>
                  </Table.Td>
                  {canEditContent && (
                    <Table.Td>
                      <Group gap={4} wrap="nowrap">
                        <Tooltip label="Edit" withArrow>
                          <ActionIcon
                            variant="subtle"
                            color="violet"
                            size="sm"
                            radius="md"
                            onClick={() => openEdit(q)}
                          >
                            <EditIcon />
                          </ActionIcon>
                        </Tooltip>
                        {canDeleteContent && (
                          <Tooltip label="Delete" withArrow>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              size="sm"
                              radius="md"
                              onClick={() => setDeleteTarget(q)}
                            >
                              <TrashIcon />
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

          <Box px="md" py="xs" style={{ borderTop: "1px solid #252533" }}>
            <Text fz="xs" c="#55556A">
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </Text>
          </Box>
        </Paper>
      )}

      {/* ---------- Create / Edit Modal ---------- */}
      <Modal
        opened={modalOpen}
        onClose={closeModal}
        title={editing ? "Edit Question" : "New Question"}
        centered
        size="lg"
        radius="md"
        styles={modalStyles}
      >
        <Stack gap="md">
          {/* Question type */}
          <Box>
            <Text fz="sm" fw={500} c="#8B8B9E" mb={4}>
              Question Type
            </Text>
            <SegmentedControl
              value={formType}
              onChange={handleFormTypeChange}
              data={QUESTION_TYPES}
              color="violet"
              radius="md"
              fullWidth
              styles={{
                root: { backgroundColor: "#1A1A24", border: "1px solid #252533" },
                label: { color: "#8B8B9E", fontWeight: 500, "&[data-active]": { color: "#F0EEE8" } },
              }}
            />
          </Box>

          {/* Category */}
          <CategorySelect
            value={formCategory}
            onChange={setFormCategory}
          />

          {/* Difficulty */}
          <Box>
            <Text fz="sm" fw={500} c="#8B8B9E" mb={4}>
              Difficulty
            </Text>
            <SegmentedControl
              value={formDifficulty}
              onChange={setFormDifficulty}
              data={DIFFICULTY_OPTIONS}
              color="violet"
              radius="md"
              fullWidth
              styles={{
                root: { backgroundColor: "#1A1A24", border: "1px solid #252533" },
                label: { color: "#8B8B9E", fontWeight: 500, "&[data-active]": { color: "#F0EEE8" } },
              }}
            />
          </Box>

          {/* Marks + Label (side by side) */}
          <Group grow gap="sm">
            <NumberInput
              label="Marks"
              value={formMarks}
              onChange={setFormMarks}
              min={1}
              max={30}
              radius="md"
              styles={inputStyles}
            />
            <TextInput
              label="Label"
              placeholder={formType === "specimen" ? 'e.g. "(a)", "(b)(i)"' : "Optional"}
              value={formLabel}
              onChange={(e) => setFormLabel(e.currentTarget.value)}
              radius="md"
              styles={inputStyles}
            />
          </Group>

          {/* Question text */}
          <Textarea
            label="Question"
            placeholder="Enter the question text..."
            value={formQuestion}
            onChange={(e) => setFormQuestion(e.currentTarget.value)}
            autosize
            minRows={3}
            radius="md"
            styles={inputStyles}
          />

          {/* Mark scheme */}
          <Box>
            <Textarea
              label="Mark Scheme / Model Answer"
              placeholder="Enter the mark scheme or model answer..."
              value={formMarkScheme}
              onChange={(e) => setFormMarkScheme(e.currentTarget.value)}
              autosize
              minRows={6}
              radius="md"
              styles={inputStyles}
            />
            <Text fz="xs" c="#55556A" mt={4}>
              This is sent to the AI marker along with the student's answer. Use [1], [2] notation
              for mark points.
            </Text>
          </Box>

          {/* Form error */}
          {formError && (
            <Alert
              color="red"
              variant="light"
              radius="md"
              styles={{ root: { backgroundColor: "#F8717111", border: "1px solid #F8717144" } }}
            >
              {formError}
            </Alert>
          )}

          {/* Actions */}
          <Group justify="flex-end" gap="sm" mt="xs">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={closeModal} isDisabled={saving}>Cancel</Button>
            <Button className="rounded-md border-none font-semibold bg-gradient-to-br from-[#7C6FFF] to-[#A78BFA] text-white shadow-[0_4px_16px_#7C6FFF30]" onPress={handleSave} isPending={saving}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editing ? "Save Changes" : "Create Question")}</>}</Button>
          </Group>
        </Stack>
      </Modal>

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
                deleteTarget.question_type === "ten_marker" ? "10-marker" : deleteTarget.question_type?.replace("_", " ")
              } question? This action cannot be undone.`
            : undefined
        }
      />
    </Stack>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons (avoids extra dependencies)
// ---------------------------------------------------------------------------

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}
