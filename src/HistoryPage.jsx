import { useState } from "react";
import {
  Container, Badge, Text, Group, Paper, Button, Box,
} from "@mantine/core";

export default function HistoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box mih="100vh" bg="#09090F" style={{ fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <Box
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Sidebar */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : -220,
          width: 220,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "#0D0D14",
          borderRight: "1px solid #1A1A24",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: 8,
          transition: "left 0.25s ease",
        }}
      >
        <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb={4} px={8}>
          SUBJECTS
        </Text>
        {[
          { label: "Business", active: false, href: "/" },
          { label: "History", active: true, href: "/history" },
        ].map(s => (
          <Button
            key={s.label}
            component={s.active ? "button" : "a"}
            href={s.active ? undefined : s.href}
            radius="md"
            ff="'JetBrains Mono', monospace"
            fw={600}
            onClick={() => setSidebarOpen(false)}
            style={{
              height: 44,
              justifyContent: "flex-start",
              paddingLeft: 14,
              fontSize: 14,
              backgroundColor: s.active ? "#F87171" : "transparent",
              color: s.active ? "#fff" : "#8B8B9E",
              border: s.active ? "none" : "1px solid transparent",
              boxShadow: s.active ? "0 0 12px #F8717133" : "none",
              textDecoration: "none",
            }}
          >
            {s.label}
          </Button>
        ))}

        <Box style={{ flex: 1 }} />
        <Text fz={10} c="#33334A" ff="'JetBrains Mono', monospace" ta="center">
          More subjects coming soon
        </Text>
      </Box>

      {/* Header */}
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(9, 9, 15, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            {/* Sidebar toggle */}
            <Button
              onClick={() => setSidebarOpen(o => !o)}
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#8B8B9E",
                border: "1px solid #252533",
                padding: "4px 10px",
                minWidth: "auto",
                height: 32,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#F8717118", color: "#F87171", border: "none" }}
            >
              IB HL History
            </Badge>
          </Group>
          <Text
            ta="center"
            fw={800}
            fz={{ base: 22, sm: 30 }}
            c="#F0EEE8"
            style={{ letterSpacing: -0.5 }}
          >
            History — Revision Hub
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            Coming soon
          </Text>
        </Container>
      </Box>

      {/* Content */}
      <Container size="lg" py="xl" px="md">
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 0 40px" }}>
          <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
            <Text fz="lg" c="#F0EEE8" fw={700} mb={8}>
              History Revision Hub
            </Text>
            <Text fz="sm" c="#8B8B9E" lh={1.6} maw={500} mx="auto" mb="lg">
              This section is under construction. Checklists, flashcards, practice questions, and written exercises for IB HL History will be added here.
            </Text>
            <Button
              component="a"
              href="/"
              size="sm"
              radius="xl"
              ff="'JetBrains Mono', monospace"
              style={{
                backgroundColor: "#1A1A24",
                color: "#8B8B9E",
                border: "1px solid #252533",
              }}
            >
              ← Back to Business
            </Button>
          </Paper>
        </div>
      </Container>

      {/* Floating support button */}
      <a
        href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#7C6FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(124,111,255,0.4)",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        title="Support us"
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)"; const p = e.currentTarget.querySelector("path"); if(p) p.style.fill = "none"; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{transition:"fill 0.25s ease"}}/>
        </svg>
      </a>
    </Box>
  );
}
