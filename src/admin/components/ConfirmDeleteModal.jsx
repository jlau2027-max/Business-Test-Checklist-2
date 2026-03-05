import { Modal, Text, Group, Button, Stack } from "@mantine/core";

export default function ConfirmDeleteModal({ opened, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title || "Confirm Delete"}
      centered
      radius="md"
      styles={{
        header: { backgroundColor: "#12121A", borderBottom: "1px solid #252533" },
        body: { backgroundColor: "#12121A" },
        title: { color: "#F0EEE8", fontWeight: 700 },
      }}
    >
      <Stack gap="lg">
        <Text fz="sm" c="#8B8B9E">
          {message || "Are you sure you want to delete this item? This action cannot be undone."}
        </Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" color="gray" radius="md" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button color="red" radius="md" onClick={onConfirm} loading={loading}>
            Delete
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
