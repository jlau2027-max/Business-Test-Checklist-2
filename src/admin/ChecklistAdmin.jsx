import { useState, useEffect, useCallback } from "react";
import { Button, Spinner, Modal, TextField, Input, Label, TextArea, Tooltip, Skeleton, Alert, CloseButton, Disclosure } from "@heroui/react";
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
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#F0EEE8]">
            Checklist
          </span>
          {canEditContent && (
            <Button className="rounded-full bg-[#7C6FFF] text-white border-none" onPress={openCreateSectionModal}><IconPlus size={16} /> Add Section</Button>
          )}
        </div>

        {/* Success alert */}
        {successMsg && (
          <Alert status="success" className="flex items-center">
            <Alert.Indicator />
            <Alert.Content className="flex-1">
              <Alert.Description>{successMsg}</Alert.Description>
            </Alert.Content>
            <CloseButton onPress={() => setSuccessMsg(null)} className="text-[#8B8B9E] ml-2" />
          </Alert>
        )}

        {/* Error alert */}
        {error && (
          <Alert status="danger" className="flex items-center">
            <Alert.Indicator />
            <Alert.Content className="flex-1">
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
            <CloseButton onPress={() => setError(null)} className="text-[#8B8B9E] ml-2" />
          </Alert>
        )}

        {/* Sections list */}
        {loading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-md" />
            ))}
          </div>
        ) : sections.length === 0 ? (
          <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533]">
            <div className="flex flex-col items-center gap-2 py-8">
              <span className="text-sm text-[#8B8B9E]">
                No sections found.{" "}
                {canEditContent
                  ? 'Click "Add Section" to create one.'
                  : ""}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sections.map((section) => {
              const isExpanded = expandedSection === section.id;
              const items = section.items || [];

              return (
                <Disclosure
                  key={section.id}
                  isExpanded={isExpanded}
                  onExpandedChange={() => toggleSection(section.id)}
                  className="bg-[#12121A] rounded-lg border border-[#252533] overflow-hidden"
                >
                  {/* Section header row */}
                  <Disclosure.Heading>
                    <Disclosure.Trigger className="flex items-center w-full px-4 py-3 gap-3 bg-transparent border-none cursor-pointer text-left">
                      {isExpanded ? (
                        <IconChevronDown size={16} color="#8B8B9E" />
                      ) : (
                        <IconChevronRight size={16} color="#8B8B9E" />
                      )}
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: section.color || "#8B8B9E" }}
                      />
                      <span className="text-sm font-semibold text-[#F0EEE8] flex-1">
                        {section.title}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#252533] text-[#8B8B9E]">
                        {items.length} item{items.length !== 1 ? "s" : ""}
                      </span>
                      {(canEditContent || canDeleteContent) && (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {canEditContent && (
                            <Tooltip delay={0}>
                              <Button isIconOnly size="sm" variant="ghost" className="text-[#A78BFA]" onPress={() => openEditSectionModal(section)}>
                                <IconPencil size={15} />
                              </Button>
                              <Tooltip.Content><p>Edit Section</p></Tooltip.Content>
                            </Tooltip>
                          )}
                          {canDeleteContent && (
                            <Tooltip delay={0}>
                              <Button isIconOnly size="sm" variant="ghost" className="text-red-400" onPress={() => openDeleteSection(section)}>
                                <IconTrash size={15} />
                              </Button>
                              <Tooltip.Content><p>Delete Section</p></Tooltip.Content>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </Disclosure.Trigger>
                  </Disclosure.Heading>

                  {/* Expanded items */}
                  <Disclosure.Content>
                    <Disclosure.Body className="border-t border-[#252533] bg-[#0E0E16]">
                      {items.length === 0 ? (
                        <span className="text-sm text-[#8B8B9E] p-4 block text-center">
                          No items in this section.
                        </span>
                      ) : (
                        <div className="flex flex-col">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 px-4 py-3 border-b border-[#1E1E2A]"
                            >
                              <span
                                className="text-sm text-[#F0EEE8] flex-1 line-clamp-2"
                              >
                                {item.text}
                              </span>
                              {(canEditContent || canDeleteContent) && (
                                <div className="flex items-center gap-1 shrink-0">
                                  {canEditContent && (
                                    <Tooltip delay={0}>
                                      <Button isIconOnly size="sm" variant="ghost" className="text-[#A78BFA]" onPress={() => openEditItemModal(item)}>
                                        <IconPencil size={15} />
                                      </Button>
                                      <Tooltip.Content><p>Edit Item</p></Tooltip.Content>
                                    </Tooltip>
                                  )}
                                  {canDeleteContent && (
                                    <Tooltip delay={0}>
                                      <Button isIconOnly size="sm" variant="ghost" className="text-red-400" onPress={() => openDeleteItem(item)}>
                                        <IconTrash size={15} />
                                      </Button>
                                      <Tooltip.Content><p>Delete Item</p></Tooltip.Content>
                                    </Tooltip>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Item button */}
                      {canEditContent && (
                        <div className="p-4">
                          <Button size="sm" className="rounded-full bg-[#7C6FFF22] text-[#A78BFA] border-none" onPress={() => openCreateItemModal(section.id)}><IconPlus size={14} /> Add Item</Button>
                        </div>
                      )}
                    </Disclosure.Body>
                  </Disclosure.Content>
                </Disclosure>
              );
            })}
          </div>
        )}
      </div>

      {/* ---- Section Create / Edit Modal ---- */}
      <Modal.Backdrop variant="opaque" isKeyboardDismissDisabled={false} isOpen={sectionModalOpened} onOpenChange={(open) => { if (!open) closeSectionModal(); }}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
              <Modal.Heading style={{ color: "#F0EEE8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{editingSection ? "Edit Section" : "New Section"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                {sectionFormError && (
                  <Alert status="danger" className="flex items-center">
                    <Alert.Indicator />
                    <Alert.Content className="flex-1">
                      <Alert.Description>{sectionFormError}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}

                <TextField className="w-full" name="title" onChange={(val) => updateSectionField("title", val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Title</Label>
                  <Input value={sectionForm.title} placeholder="Enter section title..." className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>

                <div className="flex items-end gap-3">
                  <TextField className="flex-1" name="color" onChange={(val) => updateSectionField("color", val)}>
                    <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Color (hex)</Label>
                    <Input value={sectionForm.color} placeholder="#7C6FFF" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                  </TextField>
                  <div className="w-9 h-9 rounded-lg border border-[#252533] shrink-0" style={{ backgroundColor: sectionForm.color || "#8B8B9E" }} />
                </div>

                <TextField className="w-full" name="sort_order" onChange={(val) => updateSectionField("sort_order", val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sort Order</Label>
                  <Input type="number" value={String(sectionForm.sort_order)} placeholder="0" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button variant="ghost" className="rounded-full text-[#8B8B9E]" onPress={closeSectionModal} isDisabled={savingSection}>Cancel</Button>
                <Button className="rounded-full bg-[#7C6FFF] text-white border-none" onPress={handleSaveSection} isPending={savingSection}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingSection ? "Save Changes" : "Create Section")}</>}</Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* ---- Item Create / Edit Modal ---- */}
      <Modal.Backdrop variant="opaque" isKeyboardDismissDisabled={false} isOpen={itemModalOpened} onOpenChange={(open) => { if (!open) closeItemModal(); }}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
              <Modal.Heading style={{ color: "#F0EEE8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{editingItem ? "Edit Item" : "New Item"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                {itemFormError && (
                  <Alert status="danger" className="flex items-center">
                    <Alert.Indicator />
                    <Alert.Content className="flex-1">
                      <Alert.Description>{itemFormError}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}

                <div>
                  <label className="text-[#8B8B9E] text-xs font-medium mb-1 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Text</label>
                  <TextArea value={itemForm.text} onChange={(e) => updateItemField("text", e.target.value)} placeholder="Enter checklist item text..." className="w-full bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-2xl min-h-[80px]" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </div>

                <TextField className="w-full" name="sort_order" onChange={(val) => updateItemField("sort_order", val)}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Sort Order</Label>
                  <Input type="number" value={String(itemForm.sort_order)} placeholder="0" className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              {/* Actions */}
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button variant="ghost" className="rounded-full text-[#8B8B9E]" onPress={closeItemModal} isDisabled={savingItem}>Cancel</Button>
                <Button className="rounded-full bg-[#7C6FFF] text-white border-none" onPress={handleSaveItem} isPending={savingItem}>{({isPending}) => <>{isPending && <Spinner color="current" size="sm" />}{isPending ? "Saving..." : (editingItem ? "Save Changes" : "Create Item")}</>}</Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

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
    </div>
  );
}
