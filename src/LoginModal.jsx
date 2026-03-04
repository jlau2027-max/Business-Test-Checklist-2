import { useState } from "react";
import {
  Modal, Button, TextInput, PasswordInput,
  Text, Stack, Divider, Alert, Group,
} from "@mantine/core";
import { useAuth } from "./AuthContext.jsx";

export default function LoginModal({ opened, onClose }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
    setIsSignUp(false);
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      handleClose();
    } catch (err) {
      setError(err.message?.replace("Firebase: ", "") || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      handleClose();
    } catch (err) {
      const msg = err.code === "auth/user-not-found" ? "No account found with this email"
        : err.code === "auth/wrong-password" ? "Incorrect password"
        : err.code === "auth/invalid-credential" ? "Invalid email or password"
        : err.code === "auth/email-already-in-use" ? "An account with this email already exists"
        : err.code === "auth/weak-password" ? "Password must be at least 6 characters"
        : err.code === "auth/invalid-email" ? "Please enter a valid email address"
        : err.message?.replace("Firebase: ", "") || "Authentication failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text fw={700} fz="lg" c="#F0EEE8">
          {isSignUp ? "Create Account" : "Sign In"}
        </Text>
      }
      centered
      radius="md"
      styles={{
        content: { backgroundColor: "#12121A", border: "1px solid #252533" },
        header: { backgroundColor: "#12121A", borderBottom: "1px solid #1A1A24" },
        overlay: { backgroundColor: "rgba(0,0,0,0.6)" },
      }}
    >
      <Stack gap="md">
        {error && (
          <Alert color="red" variant="light" radius="md" styles={{ root: { backgroundColor: "#1A1A24" } }}>
            {error}
          </Alert>
        )}

        <Button
          onClick={handleGoogle}
          loading={loading}
          fullWidth
          radius="md"
          size="md"
          style={{
            backgroundColor: "#1A1A24",
            border: "1px solid #252533",
            color: "#F0EEE8",
          }}
          leftSection={
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          }
        >
          Continue with Google
        </Button>

        <Divider
          label={<Text fz="xs" c="#55556A">or use email</Text>}
          labelPosition="center"
          color="#252533"
        />

        <form onSubmit={handleEmailSubmit}>
          <Stack gap="sm">
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
              required
              radius="md"
              styles={{
                input: {
                  backgroundColor: "#1A1A24",
                  border: "1px solid #252533",
                  color: "#F0EEE8",
                  "&:focus": { borderColor: "#7C6FFF" },
                },
                label: { color: "#8B8B9E", fontSize: 13 },
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              minLength={6}
              radius="md"
              styles={{
                input: {
                  backgroundColor: "#1A1A24",
                  border: "1px solid #252533",
                  color: "#F0EEE8",
                },
                innerInput: { color: "#F0EEE8" },
                label: { color: "#8B8B9E", fontSize: 13 },
              }}
            />
            <Button
              type="submit"
              loading={loading}
              fullWidth
              radius="md"
              size="md"
              style={{ backgroundColor: "#7C6FFF" }}
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </Stack>
        </form>

        <Group justify="center">
          <Text fz="sm" c="#8B8B9E">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </Text>
          <Button
            variant="subtle"
            size="compact-sm"
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            style={{ color: "#7C6FFF", padding: 0 }}
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
