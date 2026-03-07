import { useState, useCallback } from "react";
import {
  Container,
  Paper,
  Stack,
  Group,
  Text,
  Alert,
  Checkbox,
  Select,
  TextInput,
  Collapse,
  UnstyledButton,
  Box,
  List,
  ScrollArea,
} from "@mantine/core";
import { Button, Spinner } from "@heroui/react";
import {
  createMcqQuestion,
  createWrittenQuestion,
  createChecklistSection,
  createChecklistItem,
  createFlashcardTopic,
  createFlashcard,
  fetchFlashcardTopics,
} from "../api/contentApi.js";

// ---------------------------------------------------------------------------
// Constants & helpers
// ---------------------------------------------------------------------------

const SUBJECT_OPTIONS = [
  { value: "business", label: "Business" },
  { value: "biology", label: "Biology" },
];

const CONTENT_TYPES = [
  { key: "mcq", label: "MCQ Questions" },
  { key: "written", label: "Written / Short Answer" },
  { key: "checklist", label: "Checklist" },
  { key: "flashcard", label: "Flashcards" },
];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const panelStyle = {
  backgroundColor: "#12121A",
  border: "1px solid #252533",
  borderRadius: 12,
};

const inputStyles = {
  input: {
    backgroundColor: "#1A1A24",
    borderColor: "#252533",
    color: "#F0EEE8",
  },
  label: { color: "#8B8B9E", fontWeight: 500, marginBottom: 4 },
};

// ---------------------------------------------------------------------------
// DocumentUploadAdmin
// ---------------------------------------------------------------------------

export default function DocumentUploadAdmin() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("business");
  const [subjectCustom, setSubjectCustom] = useState("");
  const [types, setTypes] = useState(CONTENT_TYPES.map((t) => t.key));
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [generated, setGenerated] = useState(null);
  const [generatedTypes, setGeneratedTypes] = useState([]);
  const [generationStats, setGenerationStats] = useState(null);
  const [previewOpen, setPreviewOpen] = useState({ mcq: true, written: true, checklist: true, flashcard: true });
  const [dragOver, setDragOver] = useState(false);

  const subjectValue = subject === "other" ? subjectCustom.trim() || "business" : subject;

  const toggleType = (key) => {
    setTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const togglePreview = (key) => {
    setPreviewOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f && (f.name.endsWith(".pdf") || f.name.endsWith(".txt"))) {
      setFile(f);
      setError(null);
    } else if (f) {
      setError("Please choose a PDF or .txt file.");
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer?.files?.[0];
    if (f && (f.name.endsWith(".pdf") || f.name.endsWith(".txt"))) {
      setFile(f);
      setError(null);
    } else if (f) {
      setError("Please drop a PDF or .txt file.");
      setFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);

  const generateFromDoc = useCallback(async () => {
    if (!file) {
      setError("Please select a PDF or .txt file first.");
      return;
    }
    if (types.length === 0) {
      setError("Select at least one content type to generate.");
      return;
    }
    setGenerating(true);
    setError(null);
    setGenerated(null);
    setGenerationStats(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("subject", subjectValue);
      formData.append("types", JSON.stringify(types));

      const res = await fetch("/api/generate-from-doc", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        const msg = data.error || `Request failed: ${res.status}`;
        if (msg.includes("scanned") || msg.includes("image-based")) {
          throw new Error(`${msg} Try uploading a .txt file instead.`);
        }
        throw new Error(msg);
      }
      if (!data.success || !data.generated) {
        const msg = data.error || "No content generated.";
        if (msg.includes("scanned") || msg.includes("image-based")) {
          throw new Error(`${msg} Try uploading a .txt file instead.`);
        }
        throw new Error(msg);
      }
      setGenerated(data.generated);
      setGeneratedTypes(types);
      setGenerationStats(data.stats || null);
      setSuccessMsg(null);
    } catch (err) {
      setError(err.message || "Failed to generate content.");
      setGenerated(null);
      setGenerationStats(null);
    } finally {
      setGenerating(false);
    }
  }, [file, subjectValue, types]);

  const saveAllToFirestore = useCallback(async () => {
    if (!generated) return;
    setSaving(true);
    setError(null);
    try {
      const subjectLabel = subjectValue.charAt(0).toUpperCase() + subjectValue.slice(1);

      if (generatedTypes.includes("mcq") && generated.mcq?.length) {
        for (const q of generated.mcq) {
          const options = q.options || [];
          const answerLetter = (q.answer || "A").toUpperCase().replace(/[^A-D]/g, "A");
          const correctIndex = Math.max(0, OPTION_LETTERS.indexOf(answerLetter));
          await createMcqQuestion({
            category: subjectLabel,
            difficulty: "SL/HL",
            question_text: q.question || "",
            option_a: (options[0] || "").replace(/^A\.?\s*/i, "").trim() || "—",
            option_b: (options[1] || "").replace(/^B\.?\s*/i, "").trim() || "—",
            option_c: (options[2] || "").replace(/^C\.?\s*/i, "").trim() || "—",
            option_d: (options[3] || "").replace(/^D\.?\s*/i, "").trim() || "—",
            correct_option: correctIndex,
            explanation: q.explanation || "",
          });
        }
      }

      if (generatedTypes.includes("written") && generated.written?.length) {
        for (const w of generated.written) {
          await createWrittenQuestion({
            question_type: "short_answer",
            category: subjectLabel,
            difficulty: "SL/HL",
            marks: typeof w.marks === "number" ? w.marks : 4,
            question_text: w.question || "",
            mark_scheme: w.markScheme || w.mark_scheme || "",
            label: null,
          });
        }
      }

      if (generatedTypes.includes("checklist") && generated.checklist?.length) {
        for (const c of generated.checklist) {
          const items = c.items || [];
          const sectionRes = await createChecklistSection({
            title: c.topic || "Generated",
            color: "#7C6FFF",
            sort_order: 0,
          });
          const sectionId = sectionRes?.id;
          if (sectionId && items.length) {
            for (let i = 0; i < items.length; i++) {
              await createChecklistItem({
                section_id: sectionId,
                text: items[i],
                sort_order: i,
              });
            }
          }
        }
      }

      if (generatedTypes.includes("flashcard") && generated.flashcard?.length) {
        const topicId = slugify(`generated-${subjectValue}`);
        let tid = topicId;
        try {
          const topicRes = await createFlashcardTopic({
            id: topicId,
            label: `Generated: ${subjectLabel}`,
            color: "#7C6FFF",
          });
          if (topicRes?.id) tid = topicRes.id;
        } catch (_) {
          // Topic may already exist
        }
        const topics = await fetchFlashcardTopics();
        const topic = topics.find((t) => t.id === tid) || topics.find((t) => t.id === topicId) || topics[0];
        const topicIdFinal = topic?.id;
        if (topicIdFinal) {
          for (const f of generated.flashcard) {
            await createFlashcard({
              topic_id: topicIdFinal,
              term: f.front || "",
              definition: f.back || "",
              formula: null,
            });
          }
        }
      }

      setSuccessMsg("All content saved to Firestore successfully.");
    } catch (err) {
      setError(err.message || "Failed to save some or all content.");
    } finally {
      setSaving(false);
    }
  }, [generated, generatedTypes, subjectValue]);

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Text fz="xl" fw={700} c="#F0EEE8">
          Generate from Document
        </Text>

        {successMsg && (
          <Alert
            color="green"
            variant="light"
            radius="md"
            withCloseButton
            onClose={() => setSuccessMsg(null)}
            styles={{ root: { backgroundColor: "#122A1A", border: "1px solid #1A4028" } }}
          >
            {successMsg}
          </Alert>
        )}
        {error && (
          <Alert
            color="red"
            variant="light"
            radius="md"
            withCloseButton
            onClose={() => setError(null)}
            styles={{ root: { backgroundColor: "#2A1215", border: "1px solid #5C2020" } }}
          >
            {error}
          </Alert>
        )}

        <Paper p="md" style={panelStyle}>
          <Stack gap="md">
            <Text fz="sm" fw={600} c="#8B8B9E">
              Upload a document (PDF or plain text)
            </Text>
            <UnstyledButton
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("doc-file-input")?.click()}
              style={{
                border: `2px dashed ${dragOver ? "#7C6FFF" : "#252533"}`,
                borderRadius: 12,
                padding: 24,
                backgroundColor: dragOver ? "#1A1A24" : "#0E0E16",
                cursor: "pointer",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
            >
              <Stack align="center" gap="xs">
                <Text c="#8B8B9E" fz="sm">
                  {file ? file.name : "Drag and drop a file here, or click to select"}
                </Text>
                <Text c="#55556A" fz="xs">
                  PDF or .txt only
                </Text>
              </Stack>
            </UnstyledButton>
            <input
              id="doc-file-input"
              type="file"
              accept=".pdf,.txt"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <Box>
              <Text fz="sm" fw={500} c="#8B8B9E" mb={4}>
                Subject
              </Text>
              <Group gap="sm">
                <Select
                  data={[...SUBJECT_OPTIONS, { value: "other", label: "Other" }]}
                  value={subject}
                  onChange={setSubject}
                  size="sm"
                  radius="md"
                  styles={{
                    input: { backgroundColor: "#1A1A24", borderColor: "#252533", color: "#F0EEE8" },
                  }}
                />
                {subject === "other" && (
                  <TextInput
                    placeholder="e.g. Chemistry"
                    value={subjectCustom}
                    onChange={(e) => setSubjectCustom(e.currentTarget.value)}
                    size="sm"
                    radius="md"
                    styles={inputStyles}
                    style={{ maxWidth: 200 }}
                  />
                )}
              </Group>
            </Box>

            <Box>
              <Text fz="sm" fw={500} c="#8B8B9E" mb={8}>
                Content types to generate
              </Text>
              <Group gap="lg">
                {CONTENT_TYPES.map(({ key, label }) => (
                  <Checkbox
                    key={key}
                    label={label}
                    checked={types.includes(key)}
                    onChange={() => toggleType(key)}
                    styles={{
                      label: { color: "#F0EEE8" },
                      input: { backgroundColor: "#1A1A24", borderColor: "#252533" },
                    }}
                  />
                ))}
              </Group>
            </Box>

            <Button
              className="rounded-md bg-[#7C6FFF] text-white border-none"
              onPress={generateFromDoc}
              isDisabled={!file || types.length === 0 || generating}
              isPending={generating}
            >
              {({ isPending }) => (
                <>
                  {isPending && <Spinner color="current" size="sm" />}
                  {isPending ? "Generating…" : "Generate from Document"}
                </>
              )}
            </Button>
          </Stack>
        </Paper>

        {generated && (
          <Paper p="md" style={panelStyle}>
            <Stack gap="md">
              {generationStats && (
                <Text fz="xs" c="#8B8B9E">
                  Processed {generationStats.chunksProcessed} chunks from {(generationStats.textLength / 1000).toFixed(1)}k characters
                </Text>
              )}
              <Group justify="space-between" wrap="wrap">
                <Text fz="md" fw={600} c="#F0EEE8">
                  Preview generated content
                </Text>
                <Button
                  size="sm"
                  className="rounded-md bg-[#34D399] text-white border-none"
                  onPress={saveAllToFirestore}
                  isDisabled={saving}
                  isPending={saving}
                >
                  {({ isPending }) => (
                    <>
                      {isPending && <Spinner color="current" size="sm" />}
                      {isPending ? "Saving…" : "Save All to Firestore"}
                    </>
                  )}
                </Button>
              </Group>

              <ScrollArea.Autosize mah={500}>
                <Stack gap="sm">
                  {generatedTypes.includes("mcq") && generated.mcq?.length > 0 && (
                    <Box>
                      <UnstyledButton
                        onClick={() => togglePreview("mcq")}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
                      >
                        <Text c="#F0EEE8" fw={600} fz="sm">
                          MCQ ({generated.mcq.length})
                        </Text>
                        <Text c="#8B8B9E" fz="xs">
                          {previewOpen.mcq ? "▼" : "▶"}
                        </Text>
                      </UnstyledButton>
                      <Collapse in={previewOpen.mcq}>
                        <List spacing="xs" listStyleType="none">
                          {generated.mcq.map((q, i) => (
                            <List.Item key={i}>
                              <Paper p="sm" mb="xs" style={{ backgroundColor: "#0E0E16", border: "1px solid #252533", borderRadius: 8 }}>
                                <Text fz="sm" c="#F0EEE8" mb={4}>{q.question}</Text>
                                <Text fz="xs" c="#8B8B9E">Answer: {q.answer} · {q.explanation?.slice(0, 80)}…</Text>
                              </Paper>
                            </List.Item>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  )}

                  {generatedTypes.includes("written") && generated.written?.length > 0 && (
                    <Box>
                      <UnstyledButton
                        onClick={() => togglePreview("written")}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
                      >
                        <Text c="#F0EEE8" fw={600} fz="sm">
                          Written ({generated.written.length})
                        </Text>
                        <Text c="#8B8B9E" fz="xs">
                          {previewOpen.written ? "▼" : "▶"}
                        </Text>
                      </UnstyledButton>
                      <Collapse in={previewOpen.written}>
                        <List spacing="xs" listStyleType="none">
                          {generated.written.map((w, i) => (
                            <List.Item key={i}>
                              <Paper p="sm" mb="xs" style={{ backgroundColor: "#0E0E16", border: "1px solid #252533", borderRadius: 8 }}>
                                <Text fz="sm" c="#F0EEE8">{w.question}</Text>
                                <Text fz="xs" c="#8B8B9E" mt={4}>{w.marks} marks</Text>
                              </Paper>
                            </List.Item>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  )}

                  {generatedTypes.includes("checklist") && generated.checklist?.length > 0 && (
                    <Box>
                      <UnstyledButton
                        onClick={() => togglePreview("checklist")}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
                      >
                        <Text c="#F0EEE8" fw={600} fz="sm">
                          Checklist ({generated.checklist.length})
                        </Text>
                        <Text c="#8B8B9E" fz="xs">
                          {previewOpen.checklist ? "▼" : "▶"}
                        </Text>
                      </UnstyledButton>
                      <Collapse in={previewOpen.checklist}>
                        {generated.checklist.map((c, i) => (
                          <Paper key={i} p="sm" mb="xs" style={{ backgroundColor: "#0E0E16", border: "1px solid #252533", borderRadius: 8 }}>
                            <Text fz="sm" fw={600} c="#7C6FFF" mb={4}>{c.topic}</Text>
                            <List size="sm" spacing={2}>
                              {(c.items || []).slice(0, 5).map((item, j) => (
                                <List.Item key={j}><Text fz="xs" c="#F0EEE8">• {item}</Text></List.Item>
                              ))}
                              {(c.items?.length || 0) > 5 && (
                                <List.Item><Text fz="xs" c="#8B8B9E">+ {(c.items?.length || 0) - 5} more</Text></List.Item>
                              )}
                            </List>
                          </Paper>
                        ))}
                      </Collapse>
                    </Box>
                  )}

                  {generatedTypes.includes("flashcard") && generated.flashcard?.length > 0 && (
                    <Box>
                      <UnstyledButton
                        onClick={() => togglePreview("flashcard")}
                        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}
                      >
                        <Text c="#F0EEE8" fw={600} fz="sm">
                          Flashcards ({generated.flashcard.length})
                        </Text>
                        <Text c="#8B8B9E" fz="xs">
                          {previewOpen.flashcard ? "▼" : "▶"}
                        </Text>
                      </UnstyledButton>
                      <Collapse in={previewOpen.flashcard}>
                        <List spacing="xs" listStyleType="none">
                          {generated.flashcard.map((f, i) => (
                            <List.Item key={i}>
                              <Paper p="sm" mb="xs" style={{ backgroundColor: "#0E0E16", border: "1px solid #252533", borderRadius: 8 }}>
                                <Text fz="sm" c="#F0EEE8"><strong>{f.front}</strong></Text>
                                <Text fz="xs" c="#8B8B9E" mt={4}>{f.back?.slice(0, 100)}…</Text>
                              </Paper>
                            </List.Item>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  )}
                </Stack>
              </ScrollArea.Autosize>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
