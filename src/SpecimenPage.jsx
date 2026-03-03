import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Button, Box, Textarea,
} from "@mantine/core";

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function SpecimenPage() {
  const [specimenText, setSpecimenText] = useState(() => loadLS("specimen_text", ""));

  useEffect(() => { saveLS("specimen_text", specimenText); }, [specimenText]);

  return (
    <Box mih="100vh" bg="#09090F" style={{fontFamily:"'Inter', sans-serif",color:"#F0EEE8"}}>
      {/* Header */}
      <Box
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(9, 9, 15, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" mb={4}>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#2DD4BF18", color: "#2DD4BF", border: "none" }}
            >
              IB HL Business Management
            </Badge>
          </Group>
          <Text
            ta="center" fw={800}
            fz={{ base: 22, sm: 30 }}
            c="#F0EEE8"
            style={{ letterSpacing: -0.5 }}
          >
            Specimen Paper
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            Blank workspace for specimen practice
          </Text>
          <Group justify="center">
            <Button
              component="a"
              href="/"
              size="xs"
              radius="xl"
              ff="'JetBrains Mono', monospace"
              style={{
                backgroundColor: "#1A1A24",
                color: "#8B8B9E",
                border: "1px solid #252533",
              }}
            >
              ← Back to Revision Hub
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Content */}
      <Container size="lg" py="xl" px="md">
        <div style={{maxWidth:1060, margin:"0 auto", padding:"0 0 40px"}}>
          <Paper bg="#12121A" radius="lg" p="lg" mb="xl" style={{border:"1px solid #252533"}}>
            <Text fz="sm" c="#F0EEE8" fw={600} mb={4}>Specimen Workspace</Text>
            <Text fz="xs" c="#8B8B9E" lh={1.5}>
              Paste a specimen paper, draft answers, or use this as a freeform writing space. Everything auto-saves.
            </Text>
          </Paper>

          <Textarea
            value={specimenText}
            onChange={(e) => setSpecimenText(e.currentTarget.value)}
            placeholder="Paste your specimen paper or start writing here..."
            minRows={24}
            autosize
            radius="md"
            mb="md"
            styles={{
              input: {
                backgroundColor: "#12121A",
                borderColor: "#252533",
                color: "#F0EEE8",
                fontSize: 14,
                lineHeight: 1.7,
                fontFamily: "'Inter', sans-serif",
                "&:focus": { borderColor: "#2DD4BF" },
                "&::placeholder": { color: "#55556A" },
              },
            }}
          />

          <Group gap="sm">
            {specimenText.trim() && (
              <Button
                size="sm"
                radius="md"
                variant="subtle"
                color="gray"
                ff="'JetBrains Mono', monospace"
                onClick={()=>{ setSpecimenText(""); saveLS("specimen_text", ""); }}
              >
                Clear
              </Button>
            )}
            <Badge size="xs" variant="light" color="teal" ff="'JetBrains Mono', monospace" ml="auto">
              auto-saved
            </Badge>
          </Group>
        </div>
      </Container>
    </Box>
  );
}
