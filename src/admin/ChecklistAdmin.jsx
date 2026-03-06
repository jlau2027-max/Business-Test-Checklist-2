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
  ActionIcon,
  Tooltip,
  Skeleton,
  Alert,
  Badge,
  Box,
  Collapse,
  UnstyledButton,
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
const IconAlertCircle = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
);
const IconCircleCheckFilled = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm3.7 7.3a1 1 0 0 0-1.4 0L11 12.58l-1.3-1.3a1 1 0 0 0-1.4 1.42l2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.42z" /></svg>
);
const IconChevronDown = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={2} strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
);
const IconChevronRight = ({ size = 16, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={2} strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
);
import { useAuth } from "../AuthContext.jsx";
import {
  fetchChecklist,
  createChecklistSection,
  updateChecklistSection,
  deleteChecklistSection,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} from "../api/contentApi.js";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal.jsx";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EMPTY_SECTION_FORM = {
  title: "",
  color: "#7C6FFF",
  sort_order: 0,
};

const EMPTY_ITEM_FORM = {
  text: "",
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ---------------------------------------------------------------------------
// ChecklistAdmin Component
// ---------------------------------------------------------------------------

export default function ChecklistAdmin() {
  const { canEditContent, canDeleteContent } = useAuth();

  // ---- Data state ----
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---- Expand state ----
  const [expandedSection, setExpandedSection] = useState(null);

  // ---- Section modal state ----
  const [sectionModalOpened, setSectionModalOpened] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [sectionForm, setSectionForm] = useState(EMPTY_SECTION_FORM);
  const [savingSection, setSavingSection] = useState(false);
  const [sectionFormError, setSectionFormError] = useState(null);

  // ---- Item modal state ----
  const [itemModalOpened, setItemModalOpened] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemParentSectionId, setItemParentSectionId] = useState(null);
  const [itemForm, setItemForm] = useState(EMPTY_ITEM_FORM);
  const [savingItem, setSavingItem] = useState(false);
  const [itemFormError, setItemFormError] = useState(null);

  // ---- Delete state ----
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // "section" | "item"
  const [deleting, setDeleting] = useState(false);

  // ---- Success message ----
  const [successMsg, setSuccessMsg] = useState(null);

  // ---- Load sections ----
  const loadSections = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchChecklist();
      setSections(data);
    } catch (err) {
      setError(err.message || "Failed to load checklist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  // ---- Clear success message after a delay ----
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3500);
    return () => clearTimeout(t);
  }, [successMsg]);

  // ---- Section form helpers ----
  function updateSectionField(field, value) {
    setSectionForm((prev) => ({ ...prev, [field]: value }));
  }

  function openCreateSectionModal() {
    setEditingSection(null);
    setSectionForm(EMPTY_SECTION_FORM);
    setSectionFormError(null);
    setSectionModalOpened(true);
  }

  function openEditSectionModal(section) {
    setEditingSection(section);
    setSectionForm({
      title: section.title || "",
      color: section.color || "#7C6FFF",
      sort_order: section.sort_order ?? 0,
    });
    setSectionFormError(null);
    setSectionModalOpened(true);
  }

  function closeSectionModal() {
    setSectionModalOpened(false);
    setEditingSection(null);
    setSectionFormError(null);
  }

  // ---- Item form helpers ----
  function updateItemField(field, value) {
    setItemForm((prev) => ({ ...prev, [field]: value }));
  }

  function openCreateItemModal(sectionId) {
    setEditingItem(null);
    setItemParentSectionId(sectionId);
    setItemForm(EMPTY_ITEM_FORM);
    setItemFormError(null);
    setItemModalOpened(true);
  }

  function openEditItemModal(item) {
    setEditingItem(item);
    setItemParentSectionId(item.section_id);
    setItemForm({
      text: item.text || "",
      sort_order: item.sort_order ?? 0,
    });
    setItemFormError(null);
    setItemModalOpened(true);
  }

  function closeItemModal() {
    setItemModalOpened(false);
    setEditingItem(null);
    setItemParentSectionId(null);
    setItemFormError(null);
  }

  // ---- Section validation ----
  function validateSection() {
    if (!sectionForm.title.trim()) return "Title is required.";
    if (!sectionForm.color.trim()) return "Color is required.";
    return null;
  }

  // ---- Item validation ----
  function validateItem() {
    if (!itemForm.text.trim()) return "Text is required.";
    return null;
  }

  // ---- Save section ----
  async function handleSaveSection() {
    const validationError = validateSection();
    if (validationError) {
      setSectionFormError(validationError);
      return;
    }

    setSavingSection(true);
    setSectionFormError(null);
    try {
      const payload = {
        title: sectionForm.title.trim(),
        color: sectionForm.color.trim(),
        sort_order: Number(sectionForm.sort_order) || 0,
      };

      if (editingSection) {
        await updateChecklistSection(editingSection.id, payload);
        setSuccessMsg("Section updated successfully.");
      } else {
        await createChecklistSection(payload);
        setSuccessMsg("Section created successfully.");
      }

      closeSectionModal();
      await loadSections();
    } catch (err) {
      setSectionFormError(err.message || "Failed to save section.");
    } finally {
      setSavingSection(false);
    }
  }

  // ---- Save item ----
  async function handleSaveItem() {
    const validationError = validateItem();
    if (validationError) {
      setItemFormError(validationError);
      return;
    }

    setSavingItem(true);
    setItemFormError(null);
    try {
      const payload = {
        text: itemForm.text.trim(),
        sort_order: Number(itemForm.sort_order) || 0,
      };

      if (editingItem) {
        await updateChecklistItem(editingItem.id, payload);
        setSuccessMsg("Item updated successfully.");
      } else {
        payload.section_id = itemParentSectionId;
        await createChecklistItem(payload);
        setSuccessMsg("Item created successfully.");
      }

      closeItemModal();
      await loadSections();
    } catch (err) {
      setItemFormError(err.message || "Failed to save item.");
    } finally {
      setSavingItem(false);
    }
  }

  // ---- Delete ----
  function openDeleteSection(section) {
    setDeleteTarget(section);
    setDeleteType("section");
  }

  function openDeleteItem(item) {
    setDeleteTarget(item);
    setDeleteType("item");
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteType === "section") {
        await deleteChecklistSection(deleteTarget.id);
        if (expandedSection === deleteTarget.id) {
          setExpandedSection(null);
        }
        setSuccessMsg("Section deleted.");
      } else {
        await deleteChecklistItem(deleteTarget.id);
        setSuccessMsg("Item deleted.");
      }
      setDeleteTarget(null);
      setDeleteType(null);
      await loadSections();
    } catch (err) {
      setError(err.message || "Failed to delete.");
      setDeleteTarget(null);
      setDeleteType(null);
    } finally {
      setDeleting(false);
    }
  }

  // ---- Toggle expand ----
  function toggleSection(sectionId) {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  }

  // ---- Render ----
  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Text fz="xl" fw={700} c="#F0EEE8">
            Checklist
          </Text>
          {canEditContent && (
            <Button className="rounded-md bg-[#7C6FFF] text-white border-none" onPress={openCreateSectionModal}><IconPlus size={16} /> Add Section</Button>
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

        {/* Sections list */}
        {loading ? (
          <Stack gap="sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={64} radius="md" />
            ))}
          </Stack>
        ) : sections.length === 0 ? (
          <Paper
            bg="#12121A"
            radius="md"
            p="xl"
            style={{ border: "1px solid #252533" }}
          >
            <Stack align="center" gap="sm" py="xl">
              <Text fz="sm" c="#8B8B9E">
                No sections found.{" "}
                {canEditContent
                  ? 'Click "Add Section" to create one.'
                  : ""}
              </Text>
            </Stack>
          </Paper>
        ) : (
          <Stack gap="sm">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              const items = section.items || [];

              return (
                <Paper
                  key={section.id}
                  bg="#12121A"
                  radius="md"
                  style={{ border: "1px solid #252533", overflow: "hidden" }}
                >
                  {/* Section header row */}
                  <UnstyledButton
                    onClick={() => toggleSection(section.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "12px 16px",
                      gap: 12,
                    }}
                  >
                    {isExpanded ? (
                      <IconChevronDown size={16} color="#8B8B9E" />
                    ) : (
                      <IconChevronRight size={16} color="#8B8B9E" />
                    )}
                    <Box
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: section.color || "#8B8B9E",
                        flexShrink: 0,
                      }}
                    />
                    <Text fz="sm" fw={600} c="#F0EEE8" style={{ flex: 1 }}>
                      {section.title}
                    </Text>
                    <Badge
                      size="sm"
                      variant="light"
                      color="gray"
                      radius="sm"
                    >
                      {items.length} item{items.length !== 1 ? "s" : ""}
                    </Badge>
                    {(canEditContent || canDeleteContent) && (
                      <Group gap={4} wrap="nowrap">
                        {canEditContent && (
                          <Tooltip label="Edit Section" withArrow position="top">
                            <ActionIcon
                              variant="subtle"
                              color="violet"
                              radius="md"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditSectionModal(section);
                              }}
                            >
                              <IconPencil size={15} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                        {canDeleteContent && (
                          <Tooltip
                            label="Delete Section"
                            withArrow
                            position="top"
                          >
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              radius="md"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteSection(section);
                              }}
                            >
                              <IconTrash size={15} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Group>
                    )}
                  </UnstyledButton>

                  {/* Expanded items */}
                  <Collapse in={isExpanded}>
                    <Box
                      style={{
                        borderTop: "1px solid #252533",
                        backgroundColor: "#0E0E16",
                      }}
                    >
                      {items.length === 0 ? (
                        <Text fz="sm" c="#8B8B9E" p="md" ta="center">
                          No items in this section.
                        </Text>
                      ) : (
                        <Stack gap={0}>
                          {items.map((item) => (
                            <Group
                              key={item.id}
                              px="md"
                              py="sm"
                              gap="sm"
                              wrap="nowrap"
                              style={{
                                borderBottom: "1px solid #1E1E2A",
                              }}
                            >
                              <Text
                                fz="sm"
                                c="#F0EEE8"
                                style={{ flex: 1 }}
                                lineClamp={2}
                              >
                                {item.text}
                              </Text>
                              {(canEditContent || canDeleteContent) && (
                                <Group gap={4} wrap="nowrap" style={{ flexShrink: 0 }}>
                                  {canEditContent && (
                                    <Tooltip
                                      label="Edit Item"
                                      withArrow
                                      position="top"
                                    >
                                      <ActionIcon
                                        variant="subtle"
                                        color="violet"
                                        radius="md"
                                        size="sm"
                                        onClick={() => openEditItemModal(item)}
                                      >
                                        <IconPencil size={15} />
                                      </ActionIcon>
                                    </Tooltip>
                                  )}
                                  {canDeleteContent && (
                                    <Tooltip
                                      label="Delete Item"
                                      withArrow
                                      position="top"
                                    >
                                      <ActionIcon
                                        variant="subtle"
                                        color="red"
                                        radius="md"
                                        size="sm"
                                        onClick={() => openDeleteItem(item)}
                                      >
                                        <IconTrash size={15} />
                                      </ActionIcon>
                                    </Tooltip>
                                  )}
                                </Group>
                              )}
                            </Group>
                          ))}
                        </Stack>
                      )}

                      {/* Add Item button */}
                      {canEditContent && (
                        <Box p="md">
                          <Button size="sm" className="rounded-md bg-[#7C6FFF22] text-[#A78BFA] border-none" onPress={() => openCreateItemModal(section.id)}><IconPlus size={14} /> Add Item</Button>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </Paper>
              );
            })}
          </Stack>
        )}
      </Stack>

      {/* ---- Section Create / Edit Modal ---- */}
      <Modal
        opened={sectionModalOpened}
        onClose={closeSectionModal}
        title={editingSection ? "Edit Section" : "New Section"}
        centered
        size="md"
        radius="md"
        styles={modalStyles}
      >
        <Stack gap="md">
          {sectionFormError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              radius="md"
            >
              {sectionFormError}
            </Alert>
          )}

          <TextInput
            label="Title"
            placeholder="Enter section title..."
            value={sectionForm.title}
            onChange={(e) =>
              updateSectionField("title", e.currentTarget.value)
            }
            radius="md"
            styles={inputStyles}
          />

          <Group gap="md" align="flex-end">
            <TextInput
              label="Color (hex)"
              placeholder="#7C6FFF"
              value={sectionForm.color}
              onChange={(e) =>
                updateSectionField("color", e.currentTarget.value)
              }
              radius="md"
              styles={{
                ...inputStyles,
                root: { flex: 1 },
              }}
            />
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: sectionForm.color || "#8B8B9E",
                border: "1px solid #252533",
                flexShrink: 0,
              }}
            />
          </Group>

          <TextInput
            label="Sort Order"
            placeholder="0"
            type="number"
            value={String(sectionForm.sort_order)}
            onChange={(e) =>
              updateSectionField("sort_order", e.currentTarget.value)
            }
            radius="md"
            styles={inputStyles}
          />

          {/* Actions */}
          <Group justify="flex-end" gap="sm" mt="sm">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={closeSectionModal} isDisabled={savingSection}>Cancel</Button>
            <Button className="rounded-md bg-[#7C6FFF] text-white border-none" onPress={handleSaveSection} isPending={savingSection}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingSection ? "Save Changes" : "Create Section")}</>}</Button>
          </Group>
        </Stack>
      </Modal>

      {/* ---- Item Create / Edit Modal ---- */}
      <Modal
        opened={itemModalOpened}
        onClose={closeItemModal}
        title={editingItem ? "Edit Item" : "New Item"}
        centered
        size="md"
        radius="md"
        styles={modalStyles}
      >
        <Stack gap="md">
          {itemFormError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
              radius="md"
            >
              {itemFormError}
            </Alert>
          )}

          <Textarea
            label="Text"
            placeholder="Enter checklist item text..."
            value={itemForm.text}
            onChange={(e) =>
              updateItemField("text", e.currentTarget.value)
            }
            autosize
            minRows={2}
            maxRows={6}
            radius="md"
            styles={textareaStyles}
          />

          <TextInput
            label="Sort Order"
            placeholder="0"
            type="number"
            value={String(itemForm.sort_order)}
            onChange={(e) =>
              updateItemField("sort_order", e.currentTarget.value)
            }
            radius="md"
            styles={inputStyles}
          />

          {/* Actions */}
          <Group justify="flex-end" gap="sm" mt="sm">
            <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={closeItemModal} isDisabled={savingItem}>Cancel</Button>
            <Button className="rounded-md bg-[#7C6FFF] text-white border-none" onPress={handleSaveItem} isPending={savingItem}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingItem ? "Save Changes" : "Create Item")}</>}</Button>
          </Group>
        </Stack>
      </Modal>

      {/* ---- Delete Confirmation Modal ---- */}
      <ConfirmDeleteModal
        opened={!!deleteTarget}
        onClose={() => {
          setDeleteTarget(null);
          setDeleteType(null);
        }}
        onConfirm={handleDelete}
        title={deleteType === "section" ? "Delete Section" : "Delete Item"}
        message={
          deleteTarget
            ? deleteType === "section"
              ? `Are you sure you want to delete the section "${truncate(deleteTarget.title, 60)}"? All items in this section will also be deleted. This action cannot be undone.`
              : `Are you sure you want to delete the item "${truncate(deleteTarget.text, 60)}"? This action cannot be undone.`
            : undefined
        }
        loading={deleting}
      />
    </Container>
  );
}
