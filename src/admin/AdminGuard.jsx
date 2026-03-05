import { Container, Text, Button, Paper, Stack } from "@mantine/core";
import { useAuth } from "../AuthContext.jsx";

export default function AdminGuard({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <Container size="sm" py={120}>
        <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
          <Stack align="center" gap="md">
            <Text fz={48}>🔒</Text>
            <Text fz="xl" fw={700} c="#F0EEE8">Sign In Required</Text>
            <Text fz="sm" c="#8B8B9E">You need to sign in to access the admin panel.</Text>
            <Button component="a" href="/business/checklist" variant="light" color="violet" radius="md">
              Go Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!isAdmin) {
    return (
      <Container size="sm" py={120}>
        <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
          <Stack align="center" gap="md">
            <Text fz={48}>🚫</Text>
            <Text fz="xl" fw={700} c="#F0EEE8">Access Denied</Text>
            <Text fz="sm" c="#8B8B9E">You don't have permission to access the admin panel.</Text>
            <Button component="a" href="/business/checklist" variant="light" color="violet" radius="md">
              Go Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return children;
}
