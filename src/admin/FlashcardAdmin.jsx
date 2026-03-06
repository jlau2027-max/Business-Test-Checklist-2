import { useState, useEffect, useCallback } from "react";
import { Button, Spinner, Modal, TextField, Input, Label, TextArea, Table, Tooltip, Skeleton, Alert, CloseButton } from "@heroui/react";
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
const TEXT_COLOR = "#F0EEE8";
const MUTED = "#8B8B9E";
const DEFAULT_COLOR = "#7C6FFF";

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
      status={type === "error" ? "danger" : "success"}
      className={type === "error" ? "bg-[#2A1215] border border-[#5C2020]" : "bg-[#122A1A] border border-[#1A4028]"}
    >
      <Alert.Indicator />
      <Alert.Content className="flex-1">
        <Alert.Description className="text-[#F0EEE8]">{message}</Alert.Description>
      </Alert.Content>
      <CloseButton onPress={onClose} className="text-[#8B8B9E] ml-2 hover:text-white" />
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
    <Modal.Backdrop variant="opaque" isKeyboardDismissDisabled={false} isOpen={opened} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
          <Modal.CloseTrigger />
          <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
            <Modal.Heading style={{ color: TEXT_COLOR, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              {isEdit ? "Edit Topic" : "Create Topic"}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {error && (
                  <Alert status="danger" className="bg-[#2A1215] border border-[#5C2020]">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Description className="text-[#F0EEE8]">{error}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
                <TextField className="w-full" name="label" onChange={(val) => setLabel(val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Label</Label>
                  <Input value={label} placeholder="e.g. Ratio Analysis" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
                <TextField className="w-full" name="id" isReadOnly={isEdit} onChange={(val) => { if (!isEdit) setId(val); }}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>ID</Label>
                  <Input
                    value={id}
                    placeholder="Auto-generated from label"
                    className={`bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full ${isEdit ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </TextField>
                <div className="flex items-end gap-3">
                  <TextField className="flex-1" name="color" onChange={setColor}>
                    <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Color</Label>
                    <Input value={color} placeholder="#7C6FFF" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                  </TextField>
                  <div className="w-9 h-9 rounded-lg border border-[#252533] shrink-0" style={{ backgroundColor: color || "#8B8B9E" }} />
                </div>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <Button variant="ghost" className="rounded-full text-[#8B8B9E]" onPress={onClose} isDisabled={saving}>
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full bg-[#7C6FFF] text-white border-none" isPending={saving}>
                    {({isPending}) => (
                      <>
                        {isPending && <Spinner color="current" size="sm" />}
                        {isPending ? "Saving..." : (isEdit ? "Save Changes" : "Create Topic")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
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
    <Modal.Backdrop variant="opaque" isKeyboardDismissDisabled={false} isOpen={opened} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-lg" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
          <Modal.CloseTrigger />
          <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
            <Modal.Heading style={{ color: TEXT_COLOR, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              {isEdit ? "Edit Card" : "Create Card"}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {error && (
                  <Alert status="danger" className="bg-[#2A1215] border border-[#5C2020]">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Description className="text-[#F0EEE8]">{error}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
                <TextField className="w-full" name="term" onChange={(val) => setTerm(val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Term</Label>
                  <Input value={term} placeholder="e.g. Net Present Value" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
                <div>
                  <label className="text-[#8B8B9E] text-xs font-medium mb-1 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Definition</label>
                  <TextArea
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    placeholder="Enter the definition..."
                    className="w-full bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-2xl min-h-[80px]"
                    rows={3}
                  />
                </div>
                <TextField className="w-full" name="formula" onChange={(val) => setFormula(val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Formula (optional)</Label>
                  <Input value={formula} placeholder="e.g. NPV = Sum of PV of cash flows - initial investment" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
                <div className="flex items-center justify-end gap-2 mt-1">
                  <Button variant="ghost" className="rounded-full text-[#8B8B9E]" onPress={onClose} isDisabled={saving}>
                    Cancel
                  </Button>
                  <Button type="submit" className="rounded-full bg-[#7C6FFF] text-white border-none" isPending={saving}>
                    {({isPending}) => (
                      <>
                        {isPending && <Spinner color="current" size="sm" />}
                        {isPending ? "Saving..." : (isEdit ? "Save Changes" : "Create Card")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
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
    <div>
      {/* Toast */}
      {toast.message && (
        <div className="mb-4">
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />
        </div>
      )}

      {/* Two-panel layout */}
      <div
        className="flex gap-4 items-start flex-wrap"
        style={{ minHeight: 500 }}
      >
        {/* ---- LEFT PANEL: Topics ---- */}
        <div
          className="bg-[#12121A] rounded-xl border border-[#252533] flex flex-col"
          style={{ width: 320, minWidth: 280, flexShrink: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #252533" }}>
            <span className="font-bold text-base text-[#F0EEE8]">
              Topics
            </span>
            {canEditContent && (
              <Button
                size="sm"
                className="rounded-full bg-[#7C6FFF22] text-[#A78BFA] border-none"
                onPress={() => {
                  setEditingTopic(null);
                  setTopicModalOpen(true);
                }}
              >
                <IconPlus /> Add Topic
              </Button>
            )}
          </div>

          {/* Topic list */}
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col p-2">
              {topicsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 rounded-md mb-1.5" />
                ))
              ) : topics.length === 0 ? (
                <span className="text-sm text-[#8B8B9E] text-center py-8">
                  No topics yet.
                </span>
              ) : (
                topics.map((topic) => {
                  const isSelected = topic.id === selectedTopicId;
                  return (
                    <div
                      key={topic.id}
                      className={`px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-[#1E1E30] border border-[#7C6FFF44]" : "border border-transparent hover:bg-[#16161F]"}`}
                      onClick={() => setSelectedTopicId(topic.id)}
                    >
                      <div className="flex items-center justify-between flex-nowrap gap-1">
                        <div className="flex items-center gap-2 flex-nowrap min-w-0 flex-1">
                          {/* Color dot */}
                          <div
                            className="shrink-0"
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: topic.color || DEFAULT_COLOR,
                            }}
                          />
                          <span
                            className={`text-sm text-[#F0EEE8] truncate min-w-0 ${isSelected ? "font-semibold" : "font-normal"}`}
                          >
                            {topic.label}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#252533] text-[#8B8B9E] shrink-0">
                            {topic.card_count ?? 0}
                          </span>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 flex-nowrap shrink-0">
                          {canEditContent && (
                            <Tooltip delay={0}>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                className="text-[#8B8B9E]"
                                onPress={(e) => {
                                  setEditingTopic(topic);
                                  setTopicModalOpen(true);
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <IconPencil />
                              </Button>
                              <Tooltip.Content><p>Edit topic</p></Tooltip.Content>
                            </Tooltip>
                          )}
                          {canDeleteContent && (
                            <Tooltip delay={0}>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                className="text-[#8B8B9E]"
                                onPress={() => {
                                  setDeleteTarget({ type: "topic", item: topic });
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <IconTrash />
                              </Button>
                              <Tooltip.Content><p>Delete topic</p></Tooltip.Content>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ---- RIGHT PANEL: Cards ---- */}
        <div
          className="bg-[#12121A] rounded-xl border border-[#252533] flex flex-col flex-1"
          style={{ minWidth: 360 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid #252533" }}>
            <span className="font-bold text-base text-[#F0EEE8]">
              {selectedTopic ? `${selectedTopic.label} Cards` : "Cards"}
            </span>
            {canEditContent && selectedTopic && (
              <Button
                size="sm"
                className="rounded-full bg-[#7C6FFF22] text-[#A78BFA] border-none"
                onPress={() => {
                  setEditingCard(null);
                  setCardModalOpen(true);
                }}
              >
                <IconPlus /> Add Card
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {!selectedTopic ? (
              /* Placeholder when no topic is selected */
              <div className="flex flex-col items-center justify-center gap-2 py-20">
                <IconCards />
                <span className="text-sm text-[#8B8B9E] text-center">
                  Select a topic to view its flashcards.
                </span>
              </div>
            ) : cardsLoading ? (
              <div className="flex flex-col gap-2 p-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-11 rounded-md" />
                ))}
              </div>
            ) : cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-20">
                <IconCards />
                <span className="text-sm text-[#8B8B9E] text-center">
                  No cards in this topic yet.
                </span>
                {canEditContent && (
                  <Button
                    size="sm"
                    className="rounded-full bg-[#7C6FFF22] text-[#A78BFA] border-none"
                    onPress={() => {
                      setEditingCard(null);
                      setCardModalOpen(true);
                    }}
                  >
                    <IconPlus /> Add First Card
                  </Button>
                )}
              </div>
            ) : (
              <div className="p-2">
                <Table className="w-full">
                  <Table.ScrollContainer>
                    <Table.Content>
                      <Table.Header>
                        <Table.Column className="text-[#8B8B9E] text-[11px] font-semibold uppercase tracking-wider">Term</Table.Column>
                        <Table.Column className="text-[#8B8B9E] text-[11px] font-semibold uppercase tracking-wider">Definition</Table.Column>
                        <Table.Column className="text-[#8B8B9E] text-[11px] font-semibold uppercase tracking-wider">Formula</Table.Column>
                        <Table.Column className="text-[#8B8B9E] text-[11px] font-semibold uppercase tracking-wider text-right" style={{ width: 80 }}>Actions</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {cards.map((card) => (
                          <Table.Row key={card.id} className="hover:bg-[#16161F] border-b border-[#252533]/15">
                            <Table.Cell className="text-[#F0EEE8] text-sm font-medium whitespace-nowrap">
                              {card.term}
                            </Table.Cell>
                            <Table.Cell>
                              <span className="text-xs text-[#8B8B9E] line-clamp-2">
                                {truncate(card.definition, 120)}
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                              {card.formula ? (
                                <span className="text-xs text-[#A78BFA]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                  {truncate(card.formula, 60)}
                                </span>
                              ) : (
                                <span className="text-xs text-[#55556A]">--</span>
                              )}
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex items-center gap-1 flex-nowrap justify-end">
                                {canEditContent && (
                                  <Tooltip delay={0}>
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      variant="ghost"
                                      className="text-[#8B8B9E]"
                                      onPress={() => {
                                        setEditingCard(card);
                                        setCardModalOpen(true);
                                      }}
                                    >
                                      <IconPencil />
                                    </Button>
                                    <Tooltip.Content><p>Edit card</p></Tooltip.Content>
                                  </Tooltip>
                                )}
                                {canDeleteContent && (
                                  <Tooltip delay={0}>
                                    <Button
                                      isIconOnly
                                      size="sm"
                                      variant="ghost"
                                      className="text-[#8B8B9E]"
                                      onPress={() => setDeleteTarget({ type: "card", item: card })}
                                    >
                                      <IconTrash />
                                    </Button>
                                    <Tooltip.Content><p>Delete card</p></Tooltip.Content>
                                  </Tooltip>
                                )}
                              </div>
                            </Table.Cell>
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
      </div>

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
    </div>
  );
}
