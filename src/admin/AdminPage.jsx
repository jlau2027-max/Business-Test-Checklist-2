import { useState } from "react";
import { Container, Tabs, Text, Group, Box, SegmentedControl } from "@mantine/core";
import AdminGuard from "./AdminGuard.jsx";
import FlashcardAdmin from "./FlashcardAdmin.jsx";
import McqAdmin from "./McqAdmin.jsx";
import WrittenAdmin from "./WrittenAdmin.jsx";
import HistoryAdmin from "./HistoryAdmin.jsx";
import ChecklistAdmin from "./ChecklistAdmin.jsx";
import UsersAdmin from "./UsersAdmin.jsx";
import DocumentUploadAdmin from "./DocumentUploadAdmin.jsx";

const BUSINESS_TABS = [
  { value: "upload-doc", label: "📄 Upload Document" },
  { value: "checklist", label: "Checklist" },
  { value: "flashcards", label: "Flashcards" },
  { value: "mcq", label: "MCQ" },
  { value: "written", label: "Written" },
];

const HISTORY_TABS = [
  { value: "history", label: "History Questions" },
];

const USERS_TABS = [
  { value: "users", label: "User Management" },
];

export default function AdminPage() {
  const [section, setSection] = useState("business");
  const [activeTab, setActiveTab] = useState("upload-doc");

  const tabs = section === "business" ? BUSINESS_TABS : section === "history" ? HISTORY_TABS : USERS_TABS;

  // Reset to first tab when switching sections
  const handleSectionChange = (val) => {
    setSection(val);
    setActiveTab(val === "business" ? "upload-doc" : val === "history" ? "history" : "users");
  };

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
              href="/business/checklist"
              fz="sm"
              c="#8B8B9E"
              style={{ textDecoration: "none" }}
            >
              Back to App
            </Text>
          </Group>

          {/* Section selector */}
          <SegmentedControl
            value={section}
            onChange={handleSectionChange}
            data={[
              { label: "Business", value: "business" },
              { label: "History", value: "history" },
              { label: "Users", value: "users" },
            ]}
            mb="md"
            radius="md"
            styles={{
              root: {
                backgroundColor: "#12121A",
                border: "1px solid #252533",
              },
              label: {
                color: "#8B8B9E",
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
              },
              indicator: {
                backgroundColor: section === "business" ? "#7C6FFF" : section === "history" ? "#F87171" : "#38BDF8",
              },
              control: {
                "&[data-active] .mantine-SegmentedControl-label": {
                  color: "#fff",
                },
              },
            }}
          />

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
                  borderBottomColor: section === "business" ? "#7C6FFF" : section === "history" ? "#F87171" : "#38BDF8",
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
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.value} value={tab.value}>
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            <Tabs.Panel value="upload-doc">
              <DocumentUploadAdmin />
            </Tabs.Panel>
            <Tabs.Panel value="checklist">
              <ChecklistAdmin />
            </Tabs.Panel>
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
            <Tabs.Panel value="users">
              <UsersAdmin />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Box>
    </AdminGuard>
  );
}
