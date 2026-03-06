import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Group,
  Paper,
  Text,
  Stack,
  TextInput,
  Textarea,
  ColorInput,
  Modal,
  Badge,
  ActionIcon,
  Skeleton,
  Alert,
  Tooltip,
  ScrollArea,
  Table,
} from "@mantine/core";
import { Button, Spinner } from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";
import {
  fetchFlashcardTopics,
  fetchFlashcards,
  createFlashcardTopic,
  updateFlashcardTopic,
  deleteFlashcardTopic,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
} from "../api/contentApi.js";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";

// ---------------------------------------------------------------------------
// Style constants
// ---------------------------------------------------------------------------
const BG = "#12121A";
const BORDER = "#252533";
const TEXT_COLOR = "#F0EEE8";
const MUTED = "#8B8B9E";
const INPUT_BG = "#1A1A24";
const DEFAULT_COLOR = "#7C6FFF";

const panelStyle = {
  backgroundColor: BG,
  border: `1px solid ${BORDER}`,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
};

const modalStyles = {
  header: { backgroundColor: BG, borderBottom: `1px solid ${BORDER}` },
  body: { backgroundColor: BG },
  title: { color: TEXT_COLOR, fontWeight: 700 },
};

const inputStyles = {
  input: { backgroundColor: INPUT_BG, borderColor: BORDER, color: TEXT_COLOR },
  label: { color: TEXT_COLOR, marginBottom: 4 },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ---------------------------------------------------------------------------
// Toast / inline notification
// ---------------------------------------------------------------------------
function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <Alert
      color={type === "error" ? "red" : "green"}
      radius="md"
      withCloseButton
      onClose={onClose}
      styles={{
        root: { backgroundColor: type === "error" ? "#2A1215" : "#122A1A", border: `1px solid ${type === "error" ? "#5C2020" : "#1A4028"}` },
        message: { color: TEXT_COLOR },
      }}
    >
      {message}
    </Alert>
  );
}

// ---------------------------------------------------------------------------
// Topic Modal (create / edit)
// ---------------------------------------------------------------------------
function TopicModal({ opened, onClose, topic, onSave }) {
  const isEdit = !!topic;
  const [label, setLabel] = useState("");
  const [id, setId] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (opened) {
      setLabel(topic?.label || "");
      setId(topic?.id || "");
      setColor(topic?.color || DEFAULT_COLOR);
      setError("");
    }
  }, [opened, topic]);

  // Auto-generate id from label on create
  useEffect(() => {
    if (!isEdit && label) {
      setId(slugify(label));
    }
  }, [label, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!label.trim()) {
      setError("Label is required.");
      return;
    }
    if (!id.trim()) {
      setError("ID is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (isEdit) {
        await onSave({ label: label.trim(), color }, topic.id);
      } else {
        await onSave({ id: id.trim(), label: label.trim(), color });
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save topic.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit Topic" : "Create Topic"}
      centered
      radius="md"
      styles={modalStyles}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {error && (
            <Alert color="red" radius="md" styles={{ root: { backgroundColor: "#2A1215", border: "1px solid #5C2020" }, message: { color: TEXT_COLOR } }}>
              {error}
            </Alert>
          )}
          <TextInput
            label="Label"
            placeholder="e.g. Ratio Analysis"
            value={label}
            onChange={(e) => setLabel(e.currentTarget.value)}
            required
            radius="md"
            styles={inputStyles}
          />
          <TextInput
            label="ID"
            placeholder="Auto-generated from label"
            value={id}
            onChange={(e) => !isEdit && setId(e.currentTarget.value)}
            readOnly={isEdit}
            required
            radius="md"
            styles={{
              ...inputStyles,
              input: {
                ...inputStyles.input,
                ...(isEdit ? { opacity: 0.5, cursor: "not-allowed" } : {}),
              },
            }}
          />
          <ColorInput
            label="Color"
            value={color}
            onChange={setColor}
            format="hex"
            radius="md"
            styles={{
              ...inputStyles,
              dropdown: { backgroundColor: BG, borderColor: BORDER },
            }}
          />
          <Group justify="flex-end" gap="sm" mt="xs">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={onClose} isDisabled={saving}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-md bg-[#7C6FFF] text-white border-none" isPending={saving}>
              {({isPending}) => (
                <>
                  {isPending && <Spinner color="current" size="sm" />}
                  {isPending ? "Saving..." : (isEdit ? "Save Changes" : "Create Topic")}
                </>
              )}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Card Modal (create / edit)
// ---------------------------------------------------------------------------
function CardModal({ opened, onClose, card, topicId, onSave }) {
  const isEdit = !!card;
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [formula, setFormula] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (opened) {
      setTerm(card?.term || "");
      setDefinition(card?.definition || "");
      setFormula(card?.formula || "");
      setError("");
    }
  }, [opened, card]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!term.trim()) {
      setError("Term is required.");
      return;
    }
    if (!definition.trim()) {
      setError("Definition is required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        term: term.trim(),
        definition: definition.trim(),
        formula: formula.trim() || null,
      };
      if (isEdit) {
        await onSave(payload, card.id);
      } else {
        await onSave({ ...payload, topic_id: topicId });
      }
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save card.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit Card" : "Create Card"}
      centered
      radius="md"
      size="lg"
      styles={modalStyles}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {error && (
            <Alert color="red" radius="md" styles={{ root: { backgroundColor: "#2A1215", border: "1px solid #5C2020" }, message: { color: TEXT_COLOR } }}>
              {error}
            </Alert>
          )}
          <TextInput
            label="Term"
            placeholder="e.g. Net Present Value"
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
            required
            radius="md"
            styles={inputStyles}
          />
          <Textarea
            label="Definition"
            placeholder="Enter the definition..."
            value={definition}
            onChange={(e) => setDefinition(e.currentTarget.value)}
            required
            radius="md"
            minRows={3}
            autosize
            maxRows={8}
            styles={inputStyles}
          />
          <TextInput
            label="Formula (optional)"
            placeholder="e.g. NPV = Sum of PV of cash flows - initial investment"
            value={formula}
            onChange={(e) => setFormula(e.currentTarget.value)}
            radius="md"
            styles={inputStyles}
          />
          <Group justify="flex-end" gap="sm" mt="xs">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={onClose} isDisabled={saving}>
              Cancel
            </Button>
            <Button type="submit" className="rounded-md bg-[#7C6FFF] text-white border-none" isPending={saving}>
              {({isPending}) => (
                <>
                  {isPending && <Spinner color="current" size="sm" />}
                  {isPending ? "Saving..." : (isEdit ? "Save Changes" : "Create Card")}
                </>
              )}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

// ---------------------------------------------------------------------------
// Pencil / Trash icons (inline SVG to avoid icon library dependency)
// ---------------------------------------------------------------------------
function IconPencil() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function IconCards() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#55556A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="6" y1="9" x2="18" y2="9" />
      <line x1="6" y1="13" x2="14" y2="13" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function FlashcardAdmin() {
  const { canEditContent, canDeleteContent } = useAuth();

  // --- Topics state ---
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  // --- Cards state ---
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);

  // --- Topic modal ---
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);

  // --- Card modal ---
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // --- Delete modal ---
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'topic'|'card', item }
  const [deleteLoading, setDeleteLoading] = useState(false);

  // --- Toast ---
  const [toast, setToast] = useState({ message: "", type: "" });

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  }

  // --- Load topics ---
  const loadTopics = useCallback(async () => {
    setTopicsLoading(true);
    try {
      const data = await fetchFlashcardTopics();
      setTopics(data.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      showToast("Failed to load topics: " + err.message, "error");
    } finally {
      setTopicsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  // --- Load cards for selected topic ---
  const loadCards = useCallback(async (topicId) => {
    if (!topicId) {
      setCards([]);
      return;
    }
    setCardsLoading(true);
    try {
      const data = await fetchFlashcards(topicId);
      setCards(data.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)));
    } catch (err) {
      showToast("Failed to load cards: " + err.message, "error");
      setCards([]);
    } finally {
      setCardsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards(selectedTopicId);
  }, [selectedTopicId, loadCards]);

  // --- Selected topic object ---
  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || null;

  // --- Topic CRUD ---
  async function handleSaveTopic(data, existingId) {
    if (existingId) {
      await updateFlashcardTopic(existingId, data);
      showToast("Topic updated.");
    } else {
      await createFlashcardTopic(data);
      showToast("Topic created.");
    }
    await loadTopics();
  }

  async function handleDeleteTopic() {
    if (!deleteTarget || deleteTarget.type !== "topic") return;
    setDeleteLoading(true);
    try {
      await deleteFlashcardTopic(deleteTarget.item.id);
      showToast("Topic deleted.");
      if (selectedTopicId === deleteTarget.item.id) {
        setSelectedTopicId(null);
        setCards([]);
      }
      await loadTopics();
    } catch (err) {
      showToast("Failed to delete topic: " + err.message, "error");
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  }

  // --- Card CRUD ---
  async function handleSaveCard(data, existingId) {
    if (existingId) {
      await updateFlashcard(existingId, data);
      showToast("Card updated.");
    } else {
      await createFlashcard(data);
      showToast("Card created.");
    }
    await loadCards(selectedTopicId);
    // Refresh topics to update card_count
    await loadTopics();
  }

  async function handleDeleteCard() {
    if (!deleteTarget || deleteTarget.type !== "card") return;
    setDeleteLoading(true);
    try {
      await deleteFlashcard(deleteTarget.item.id);
      showToast("Card deleted.");
      await loadCards(selectedTopicId);
      await loadTopics();
    } catch (err) {
      showToast("Failed to delete card: " + err.message, "error");
    } finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <Box>
      {/* Toast */}
      {toast.message && (
        <Box mb="md">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
        </Box>
      )}

      {/* Two-panel layout */}
      <Box
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          minHeight: 500,
          flexWrap: "wrap",
        }}
      >
        {/* ---- LEFT PANEL: Topics ---- */}
        <Paper
          style={{
            ...panelStyle,
            width: 320,
            minWidth: 280,
            flexShrink: 0,
          }}
          p={0}
        >
          {/* Header */}
          <Group
            justify="space-between"
            px="md"
            py="sm"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            <Text fw={700} fz="md" c={TEXT_COLOR}>
              Topics
            </Text>
            {canEditContent && (
              <Button
                size="sm"
                className="rounded-md bg-[#7C6FFF22] text-[#A78BFA] border-none"
                onPress={() => {
                  setEditingTopic(null);
                  setTopicModalOpen(true);
                }}
              >
                <IconPlus /> Add Topic
              </Button>
            )}
          </Group>

          {/* Topic list */}
          <ScrollArea style={{ flex: 1 }} offsetScrollbars>
            <Stack gap={0} p="xs">
              {topicsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} height={48} radius="md" mb={6} />
                ))
              ) : topics.length === 0 ? (
                <Text fz="sm" c={MUTED} ta="center" py="xl">
                  No topics yet.
                </Text>
              ) : (
                topics.map((topic) => {
                  const isSelected = topic.id === selectedTopicId;
                  return (
                    <Paper
                      key={topic.id}
                      px="sm"
                      py={10}
                      radius="md"
                      style={{
                        cursor: "pointer",
                        backgroundColor: isSelected ? "#1E1E30" : "transparent",
                        border: isSelected ? `1px solid #7C6FFF44` : "1px solid transparent",
                        transition: "background-color 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = "#16161F";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      <Group justify="space-between" wrap="nowrap" gap="xs">
                        <Group gap="sm" wrap="nowrap" style={{ minWidth: 0, flex: 1 }}>
                          {/* Color dot */}
                          <Box
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: topic.color || DEFAULT_COLOR,
                              flexShrink: 0,
                            }}
                          />
                          <Text
                            fz="sm"
                            c={TEXT_COLOR}
                            fw={isSelected ? 600 : 400}
                            truncate="end"
                            style={{ minWidth: 0 }}
                          >
                            {topic.label}
                          </Text>
                          <Badge
                            size="sm"
                            variant="light"
                            color="gray"
                            radius="sm"
                            style={{ flexShrink: 0 }}
                          >
                            {topic.card_count ?? 0}
                          </Badge>
                        </Group>

                        {/* Action buttons */}
                        <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
                          {canEditContent && (
                            <Tooltip label="Edit topic" withArrow>
                              <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="gray"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingTopic(topic);
                                  setTopicModalOpen(true);
                                }}
                              >
                                <IconPencil />
                              </ActionIcon>
                            </Tooltip>
                          )}
                          {canDeleteContent && (
                            <Tooltip label="Delete topic" withArrow>
                              <ActionIcon
                                size="sm"
                                variant="subtle"
                                color="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteTarget({ type: "topic", item: topic });
                                }}
                              >
                                <IconTrash />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </Group>
                      </Group>
                    </Paper>
                  );
                })
              )}
            </Stack>
          </ScrollArea>
        </Paper>

        {/* ---- RIGHT PANEL: Cards ---- */}
        <Paper
          style={{
            ...panelStyle,
            flex: 1,
            minWidth: 360,
          }}
          p={0}
        >
          {/* Header */}
          <Group
            justify="space-between"
            px="md"
            py="sm"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            <Text fw={700} fz="md" c={TEXT_COLOR}>
              {selectedTopic ? `${selectedTopic.label} Cards` : "Cards"}
            </Text>
            {canEditContent && selectedTopic && (
              <Button
                size="sm"
                className="rounded-md bg-[#7C6FFF22] text-[#A78BFA] border-none"
                onPress={() => {
                  setEditingCard(null);
                  setCardModalOpen(true);
                }}
              >
                <IconPlus /> Add Card
              </Button>
            )}
          </Group>

          {/* Content */}
          <ScrollArea style={{ flex: 1 }} offsetScrollbars>
            {!selectedTopic ? (
              /* Placeholder when no topic is selected */
              <Stack align="center" justify="center" gap="sm" py={80}>
                <IconCards />
                <Text fz="sm" c={MUTED} ta="center">
                  Select a topic to view its flashcards.
                </Text>
              </Stack>
            ) : cardsLoading ? (
              <Stack gap="xs" p="md">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} height={44} radius="md" />
                ))}
              </Stack>
            ) : cards.length === 0 ? (
              <Stack align="center" justify="center" gap="sm" py={80}>
                <IconCards />
                <Text fz="sm" c={MUTED} ta="center">
                  No cards in this topic yet.
                </Text>
                {canEditContent && (
                  <Button
                    size="sm"
                    className="rounded-md bg-[#7C6FFF22] text-[#A78BFA] border-none"
                    onPress={() => {
                      setEditingCard(null);
                      setCardModalOpen(true);
                    }}
                  >
                    <IconPlus /> Add First Card
                  </Button>
                )}
              </Stack>
            ) : (
              <Box p="xs">
                <Table
                  highlightOnHover
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                  styles={{
                    table: { borderCollapse: "separate", borderSpacing: 0 },
                    thead: { borderBottom: `1px solid ${BORDER}` },
                    th: {
                      color: MUTED,
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      borderBottom: `1px solid ${BORDER}`,
                      padding: "8px 12px",
                    },
                    td: {
                      color: TEXT_COLOR,
                      fontSize: 13,
                      borderBottom: `1px solid ${BORDER}22`,
                      padding: "10px 12px",
                    },
                    tr: {
                      "&[data-hover]:hover": {
                        backgroundColor: "#16161F",
                      },
                    },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Term</Table.Th>
                      <Table.Th>Definition</Table.Th>
                      <Table.Th>Formula</Table.Th>
                      <Table.Th style={{ width: 80, textAlign: "right" }}>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {cards.map((card) => (
                      <Table.Tr key={card.id}>
                        <Table.Td style={{ fontWeight: 500, whiteSpace: "nowrap" }}>
                          {card.term}
                        </Table.Td>
                        <Table.Td>
                          <Text fz="xs" c={MUTED} lineClamp={2}>
                            {truncate(card.definition, 120)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          {card.formula ? (
                            <Text fz="xs" c="#A78BFA" ff="'JetBrains Mono', monospace">
                              {truncate(card.formula, 60)}
                            </Text>
                          ) : (
                            <Text fz="xs" c="#55556A">--</Text>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <Group gap={4} justify="flex-end" wrap="nowrap">
                            {canEditContent && (
                              <Tooltip label="Edit card" withArrow>
                                <ActionIcon
                                  size="sm"
                                  variant="subtle"
                                  color="gray"
                                  onClick={() => {
                                    setEditingCard(card);
                                    setCardModalOpen(true);
                                  }}
                                >
                                  <IconPencil />
                                </ActionIcon>
                              </Tooltip>
                            )}
                            {canDeleteContent && (
                              <Tooltip label="Delete card" withArrow>
                                <ActionIcon
                                  size="sm"
                                  variant="subtle"
                                  color="red"
                                  onClick={() => setDeleteTarget({ type: "card", item: card })}
                                >
                                  <IconTrash />
                                </ActionIcon>
                              </Tooltip>
                            )}
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Box>
            )}
          </ScrollArea>
        </Paper>
      </Box>

      {/* ---- Modals ---- */}
      <TopicModal
        opened={topicModalOpen}
        onClose={() => setTopicModalOpen(false)}
        topic={editingTopic}
        onSave={handleSaveTopic}
      />

      <CardModal
        opened={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        card={editingCard}
        topicId={selectedTopicId}
        onSave={handleSaveCard}
      />

      <ConfirmDeleteModal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteTarget?.type === "topic" ? handleDeleteTopic : handleDeleteCard}
        title={deleteTarget?.type === "topic" ? "Delete Topic" : "Delete Card"}
        message={
          deleteTarget?.type === "topic"
            ? `Are you sure you want to delete the topic "${deleteTarget?.item?.label}"? All cards within this topic will also be deleted. This cannot be undone.`
            : `Are you sure you want to delete the card "${deleteTarget?.item?.term}"? This cannot be undone.`
        }
        loading={deleteLoading}
      />
    </Box>
  );
}
