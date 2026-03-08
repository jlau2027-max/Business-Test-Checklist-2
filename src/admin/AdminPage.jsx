import { useState } from "react";
import { Tabs } from "@heroui/react";
import AdminGuard from "./AdminGuard.jsx";
import FlashcardAdmin from "./FlashcardAdmin.jsx";
import McqAdmin from "./McqAdmin.jsx";
import WrittenAdmin from "./WrittenAdmin.jsx";
import HistoryAdmin from "./HistoryAdmin.jsx";
import BiologyAdmin from "./BiologyAdmin.jsx";
import ChecklistAdmin from "./ChecklistAdmin.jsx";
import UsersAdmin from "./UsersAdmin.jsx";
import {
  fetchBiologyChecklist, createBiologyChecklistSection, updateBiologyChecklistSection, deleteBiologyChecklistSection,
  createBiologyChecklistItem, updateBiologyChecklistItem, deleteBiologyChecklistItem,
  fetchBiologyFlashcardTopics, fetchBiologyFlashcards, createBiologyFlashcardTopic, updateBiologyFlashcardTopic, deleteBiologyFlashcardTopic,
  createBiologyFlashcard, updateBiologyFlashcard, deleteBiologyFlashcard,
  fetchBiologyMcqQuestions, createBiologyMcqQuestion, updateBiologyMcqQuestion, deleteBiologyMcqQuestion,
  fetchBiologyWrittenQuestions, createBiologyWrittenQuestion, updateBiologyWrittenQuestion, deleteBiologyWrittenQuestion,
} from "../api/contentApi.js";

const BUSINESS_TABS = [
  { value: "checklist", label: "Checklist" },
  { value: "flashcards", label: "Flashcards" },
  { value: "mcq", label: "MCQ" },
  { value: "written", label: "Written" },
];

const HISTORY_TABS = [
  { value: "history", label: "History Questions" },
];

const BIOLOGY_TABS = [
  { value: "bio_checklist", label: "Checklist" },
  { value: "bio_flashcards", label: "Flashcards" },
  { value: "bio_mcq", label: "MCQ" },
  { value: "bio_written", label: "Written" },
  { value: "biology", label: "Specimen Qs" },
];

const BIOLOGY_WRITTEN_TYPES = [
  { value: "short_answer", label: "Short Answer" },
];

const BIOLOGY_UNITS = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

const USERS_TABS = [
  { value: "users", label: "User Management" },
];

export default function AdminPage() {
  const [section, setSection] = useState("business");
  const [activeTab, setActiveTab] = useState("checklist");

  const tabs = section === "business" ? BUSINESS_TABS : section === "history" ? HISTORY_TABS : section === "biology" ? BIOLOGY_TABS : USERS_TABS;

  const handleSectionChange = (val) => {
    setSection(val);
    setActiveTab(val === "business" ? "checklist" : val === "history" ? "history" : val === "biology" ? "bio_checklist" : "users");
  };

  return (
    <AdminGuard>
      <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-extrabold text-[var(--text-primary)]">Admin Panel</h1>
            <a href="/business/checklist" className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--text-primary)]">
              Back to App
            </a>
          </div>

          {/* Section selector — primary variant */}
          <Tabs
            variant="primary"
            selectedKey={section}
            onSelectionChange={handleSectionChange}
            className="mb-4"
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="Admin sections" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-1">
                <Tabs.Tab id="business" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Business
                  <Tabs.Indicator className="bg-[var(--accent)] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="history" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  History
                  <Tabs.Indicator className="bg-[var(--accent-tertiary)] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="biology" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Biology
                  <Tabs.Indicator className="bg-[var(--color-success)] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="users" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Users
                  <Tabs.Indicator className="bg-[var(--accent-secondary)] rounded-full" />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs.ListContainer>
          </Tabs>

          {/* Sub-tabs — secondary variant */}
          <Tabs
            variant="secondary"
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
          >
            <Tabs.ListContainer>
              <Tabs.List aria-label="Sub-tabs" className="border-b border-[var(--border)]">
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.value}
                    id={tab.value}
                    className="font-semibold text-sm text-[var(--text-secondary)] data-[selected=true]:text-[var(--text-primary)] px-5 py-2.5 hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
                  >
                    {tab.label}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>

            <Tabs.Panel id="checklist" className="pt-4">
              <ChecklistAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="flashcards" className="pt-4">
              <FlashcardAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="mcq" className="pt-4">
              <McqAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="written" className="pt-4">
              <WrittenAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="history" className="pt-4">
              <HistoryAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="bio_checklist" className="pt-4">
              <ChecklistAdmin
                fetchChecklist={fetchBiologyChecklist}
                createChecklistSection={createBiologyChecklistSection}
                updateChecklistSection={updateBiologyChecklistSection}
                deleteChecklistSection={deleteBiologyChecklistSection}
                createChecklistItem={createBiologyChecklistItem}
                updateChecklistItem={updateBiologyChecklistItem}
                deleteChecklistItem={deleteBiologyChecklistItem}
              />
            </Tabs.Panel>
            <Tabs.Panel id="bio_flashcards" className="pt-4">
              <FlashcardAdmin
                fetchFlashcardTopics={fetchBiologyFlashcardTopics}
                fetchFlashcards={fetchBiologyFlashcards}
                createFlashcardTopic={createBiologyFlashcardTopic}
                updateFlashcardTopic={updateBiologyFlashcardTopic}
                deleteFlashcardTopic={deleteBiologyFlashcardTopic}
                createFlashcard={createBiologyFlashcard}
                updateFlashcard={updateBiologyFlashcard}
                deleteFlashcard={deleteBiologyFlashcard}
              />
            </Tabs.Panel>
            <Tabs.Panel id="bio_mcq" className="pt-4">
              <McqAdmin
                fetchMcqQuestions={fetchBiologyMcqQuestions}
                createMcqQuestion={createBiologyMcqQuestion}
                updateMcqQuestion={updateBiologyMcqQuestion}
                deleteMcqQuestion={deleteBiologyMcqQuestion}
                units={BIOLOGY_UNITS}
              />
            </Tabs.Panel>
            <Tabs.Panel id="bio_written" className="pt-4">
              <WrittenAdmin
                fetchWrittenQuestions={fetchBiologyWrittenQuestions}
                createWrittenQuestion={createBiologyWrittenQuestion}
                updateWrittenQuestion={updateBiologyWrittenQuestion}
                deleteWrittenQuestion={deleteBiologyWrittenQuestion}
                questionTypes={BIOLOGY_WRITTEN_TYPES}
                units={BIOLOGY_UNITS}
              />
            </Tabs.Panel>
            <Tabs.Panel id="biology" className="pt-4">
              <BiologyAdmin />
            </Tabs.Panel>
            <Tabs.Panel id="users" className="pt-4">
              <UsersAdmin />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
}
