import { Modal, Button, Spinner } from "@heroui/react";

export default function ConfirmDeleteModal({ opened, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal.Backdrop
      variant="opaque"
      isKeyboardDismissDisabled={false}
      isOpen={opened}
      onOpenChange={(open) => { if (!open) onClose(); }}
    >
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
          <Modal.CloseTrigger />
          <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
            <Modal.Heading style={{ color: "#F0EEE8", fontWeight: 700, fontFamily: "'JSans', sans-serif" }}>
              {title || "Confirm Delete"}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm text-[#8B8B9E]">
              {message || "Are you sure you want to delete this item? This action cannot be undone."}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" className="rounded-full text-[#8B8B9E]" onPress={onClose} isDisabled={loading}>Cancel</Button>
            <Button variant="danger" className="rounded-full" onPress={onConfirm} isPending={loading}>
              {({isPending}) => <>
                {isPending && <Spinner color="current" size="sm" />}
                {isPending ? "Deleting..." : "Delete"}
              </>}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
