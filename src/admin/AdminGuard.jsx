import { Container, Text, Paper, Stack } from "@mantine/core";
import { Button } from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";

export default function AdminGuard({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <Container size="sm" py={120}>
        <Paper bg="var(--bg-surface)" radius="lg" p="xl" style={{ border: "1px solid var(--border-subtle)", textAlign: "center" }}>
          <Stack align="center" gap="md">
            <Text fz={48}>🔒</Text>
            <Text fz="xl" fw={700} c="var(--text-primary)">Sign In Required</Text>
            <Text fz="sm" c="var(--text-secondary)">You need to sign in to access the admin panel.</Text>
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button className="rounded-md border-none" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent-soft)' }}>Go Home</Button>
            </a>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container size="sm" py={120}>
        <Paper bg="var(--bg-surface)" radius="lg" p="xl" style={{ border: "1px solid var(--border-subtle)", textAlign: "center" }}>
          <Stack align="center" gap="md">
            <Text fz={48}>🚫</Text>
            <Text fz="xl" fw={700} c="var(--text-primary)">Access Denied</Text>
            <Text fz="sm" c="var(--text-secondary)">You don't have permission to access the admin panel.</Text>
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button className="rounded-md border-none" style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', color: 'var(--accent-soft)' }}>Go Home</Button>
            </a>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return children;
}
