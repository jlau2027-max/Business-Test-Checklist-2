import { Box, Container, Text, Group, Paper, Badge } from "@mantine/core";
import { Button } from "@heroui/react";
import { Show, SignInButton, SignUpButton } from "@clerk/react";
import LoginButton from "./LoginButton.jsx";

export default function LandingPage() {
  return (
    <Box mih="100vh" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-primary)", background: "var(--bg-base)" }}>
      {/* Header */}
      <Box
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "var(--header-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" style={{ position: "relative" }}>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none" }}
            >
              IB Revision Hub
            </Badge>
            <LoginButton />
          </Group>
        </Container>
      </Box>

      {/* Hero */}
      <Container size="sm" py={80}>
        <Text
          ta="center" fw={800}
          fz={{ base: 28, sm: 40 }}
          c="#F0EEE8"
          style={{ letterSpacing: -1 }}
          mb="xs"
        >
          IB Revision Hub
        </Text>
        <Text ta="center" fz="md" c="#8B8B9E" mb={40} maw={420} mx="auto">
          Flashcards, MCQs, written practice with AI grading, and more — built for IB students.
        </Text>

        {/* Auth prompt for signed-out users */}
        <Show when="signed-out">
          <Group justify="center" gap="sm" mb={48}>
            <SignInButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                className="rounded-md bg-[#7C6FFF] text-white border-none text-[15px] font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                variant="outline"
                className="rounded-md bg-transparent text-[#A78BFA] border border-[#252533] text-[15px] font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </Group>
        </Show>

        <Show when="signed-in">
          <Box mb={48} />
        </Show>

        {/* Subject cards */}
        <Group grow gap="md" style={{ flexWrap: "wrap" }}>
          <Paper
            component="a"
            href="/business/checklist"
            radius="lg"
            p="xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C6FFF"; e.currentTarget.style.boxShadow = "0 0 20px #7C6FFF22"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" mb="sm"
              style={{ backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none" }}>
              HL
            </Badge>
            <Text fz="lg" fw={700} c="var(--text-primary)" mb={4}>
              Business Management
            </Text>
            <Text fz="sm" c="var(--text-secondary)" lh={1.5}>
              Finance unit — checklist, flashcards, MCQs, written practice & specimen papers
            </Text>
          </Paper>

          <Paper
            component="a"
            href="/history/specimen"
            radius="lg"
            p="xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#F87171"; e.currentTarget.style.boxShadow = "0 0 20px #F8717122"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" mb="sm"
              style={{ backgroundColor: "#F8717118", color: "#F87171", border: "none" }}>
              HL / SL
            </Badge>
            <Text fz="lg" fw={700} c="var(--text-primary)" mb={4}>
              History
            </Text>
            <Text fz="sm" c="var(--text-secondary)" lh={1.5}>
              Paper 2 & Paper 3 specimen questions with AI-powered grading
            </Text>
          </Paper>

          <Paper
            component="a"
            href="/biology/checklist"
            radius="lg"
            p="xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#34D399"; e.currentTarget.style.boxShadow = "0 0 20px #34D39922"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Badge size="xs" variant="light" ff="'JetBrains Mono', monospace" mb="sm"
              style={{ backgroundColor: "#34D39918", color: "#34D399", border: "none" }}>
              HL / SL
            </Badge>
            <Text fz="lg" fw={700} c="var(--text-primary)" mb={4}>
              Biology
            </Text>
            <Text fz="sm" c="var(--text-secondary)" lh={1.5}>
              Unit 1: Evolution of Life — checklist, flashcards, MCQs & written practice with AI grading
            </Text>
          </Paper>
        </Group>
      </Container>
    </Box>
  );
}
