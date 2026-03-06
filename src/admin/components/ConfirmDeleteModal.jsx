import { Modal, Text, Group, Stack } from "@mantine/core";
import { Button, Spinner } from "@heroui/react";

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
          <Button variant="ghost" className="rounded-md text-[#8B8B9E]" onPress={onClose} isDisabled={loading}>Cancel</Button>
          <Button variant="danger" className="rounded-md" onPress={onConfirm} isPending={loading}>
            {({isPending}) => <>
              {isPending && <Spinner color="current" size="sm" />}
              {isPending ? "Deleting..." : "Delete"}
            </>}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
