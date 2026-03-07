import { Modal, Button } from "@heroui/react";

export default function ConfirmDeleteModal({ opened, onClose, onConfirm, title, message, loading }) {
  if (!opened) return null;

  return (
    <Modal.Backdrop
      variant="opaque"
      isOpen={opened}
      onOpenChange={(open) => { if (!open) onClose(); }}
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <Modal.CloseTrigger />
          <Modal.Header style={{ borderBottom: "1px solid var(--border)" }}>
            <Modal.Heading style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "'JSans', sans-serif" }}>
              {title || "Confirm Delete"}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-[var(--text-secondary)]">
              {message || "Are you sure you want to delete this item? This action cannot be undone."}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" className="rounded-full text-[var(--text-secondary)]" onPress={onClose} isDisabled={loading}>
              Cancel
            </Button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{
                fontFamily: "'JSans', sans-serif",
                backgroundColor: "var(--color-danger)",
                color: "#fff",
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
