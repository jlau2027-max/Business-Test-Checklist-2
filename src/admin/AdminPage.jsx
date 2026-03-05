import { useState } from "react";
import { Container, Tabs, Text, Group, Box } from "@mantine/core";
import AdminGuard from "./AdminGuard.jsx";
import FlashcardAdmin from "./FlashcardAdmin.jsx";
import McqAdmin from "./McqAdmin.jsx";
import WrittenAdmin from "./WrittenAdmin.jsx";
import HistoryAdmin from "./HistoryAdmin.jsx";
import ChecklistAdmin from "./ChecklistAdmin.jsx";

const TAB_LIST = [
  { value: "flashcards", label: "Flashcards" },
  { value: "mcq", label: "MCQ" },
  { value: "written", label: "Written" },
  { value: "history", label: "History" },
  { value: "checklist", label: "Checklist" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("flashcards");

  return (
    <AdminGuard>
      <Box
        style={{
          minHeight: "100vh",
          backgroundColor: "#0A0A12",
        }}
      >
        <Container size="xl" py="lg">
          {/* Header */}
          <Group justify="space-between" align="center" mb="lg">
            <Text fz="xl" fw={800} c="#F0EEE8">
              Admin Panel
            </Text>
            <Text
              component="a"
              href="/"
              fz="sm"
              c="#8B8B9E"
              style={{ textDecoration: "none", "&:hover": { color: "#F0EEE8" } }}
            >
              Back to App
            </Text>
          </Group>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            radius="md"
            styles={{
              root: { },
              list: {
                borderBottom: "1px solid #252533",
                gap: 0,
              },
              tab: {
                color: "#8B8B9E",
                fontWeight: 600,
                fontSize: 14,
                padding: "10px 20px",
                borderBottom: "2px solid transparent",
                "&[data-active]": {
                  color: "#F0EEE8",
                  borderBottomColor: "#7C6FFF",
                },
                "&:hover": {
                  backgroundColor: "#12121A",
                  color: "#F0EEE8",
                },
              },
              panel: {
                paddingTop: 16,
              },
            }}
          >
            <Tabs.List>
              {TAB_LIST.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value="flashcards">
              <FlashcardAdmin />
            </Tabs.Panel>
            <Tabs.Panel value="mcq">
              <McqAdmin />
            </Tabs.Panel>
            <Tabs.Panel value="written">
              <WrittenAdmin />
            </Tabs.Panel>
            <Tabs.Panel value="history">
              <HistoryAdmin />
            </Tabs.Panel>
            <Tabs.Panel value="checklist">
              <ChecklistAdmin />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </AdminGuard>
  );
}
