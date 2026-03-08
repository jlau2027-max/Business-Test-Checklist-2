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
  chemistryApi, physicsApi, sportsApi, economicsApi,
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

const CHEMISTRY_TABS = [
  { value: "chem_checklist", label: "Checklist" },
  { value: "chem_flashcards", label: "Flashcards" },
  { value: "chem_mcq", label: "MCQ" },
  { value: "chem_written", label: "Written" },
];

const PHYSICS_TABS = [
  { value: "phys_checklist", label: "Checklist" },
  { value: "phys_flashcards", label: "Flashcards" },
  { value: "phys_mcq", label: "MCQ" },
  { value: "phys_written", label: "Written" },
];

const SPORTS_TABS = [
  { value: "sport_checklist", label: "Checklist" },
  { value: "sport_flashcards", label: "Flashcards" },
  { value: "sport_mcq", label: "MCQ" },
  { value: "sport_written", label: "Written" },
];

const ECONOMICS_TABS = [
  { value: "econ_checklist", label: "Checklist" },
  { value: "econ_flashcards", label: "Flashcards" },
  { value: "econ_mcq", label: "MCQ" },
  { value: "econ_written", label: "Written" },
];

const BIOLOGY_WRITTEN_TYPES = [
  { value: "short_answer", label: "Short Answer" },
];

const SHORT_ANSWER_ONLY = [
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

  const SECTION_TAB_MAP = {
    business: { tabs: BUSINESS_TABS, defaultTab: "checklist" },
    history: { tabs: HISTORY_TABS, defaultTab: "history" },
    biology: { tabs: BIOLOGY_TABS, defaultTab: "bio_checklist" },
    chemistry: { tabs: CHEMISTRY_TABS, defaultTab: "chem_checklist" },
    physics: { tabs: PHYSICS_TABS, defaultTab: "phys_checklist" },
    sports: { tabs: SPORTS_TABS, defaultTab: "sport_checklist" },
    economics: { tabs: ECONOMICS_TABS, defaultTab: "econ_checklist" },
    users: { tabs: USERS_TABS, defaultTab: "users" },
  };

  const { tabs, defaultTab } = SECTION_TAB_MAP[section] || SECTION_TAB_MAP.business;

  const handleSectionChange = (val) => {
    setSection(val);
    setActiveTab(SECTION_TAB_MAP[val]?.defaultTab || "checklist");
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
              <Tabs.List aria-label="Admin sections" className="bg-[var(--bg-card)] border border-[var(--border)] rounded-full p-1">
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
                <Tabs.Tab id="chemistry" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Chemistry
                  <Tabs.Indicator className="bg-[#8B7EB5] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="physics" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Physics
                  <Tabs.Indicator className="bg-[#C4A36A] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="sports" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Sports Sci
                  <Tabs.Indicator className="bg-[#B57A7A] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="economics" className="font-semibold text-sm font-mono text-[var(--text-secondary)] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Economics
                  <Tabs.Indicator className="bg-[#6BA3AD] rounded-full" />
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

            {/* Chemistry */}
            <Tabs.Panel id="chem_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={chemistryApi.fetchChecklist} createChecklistSection={chemistryApi.createChecklistSection} updateChecklistSection={chemistryApi.updateChecklistSection} deleteChecklistSection={chemistryApi.deleteChecklistSection} createChecklistItem={chemistryApi.createChecklistItem} updateChecklistItem={chemistryApi.updateChecklistItem} deleteChecklistItem={chemistryApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="chem_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={chemistryApi.fetchFlashcardTopics} fetchFlashcards={chemistryApi.fetchFlashcards} createFlashcardTopic={chemistryApi.createFlashcardTopic} updateFlashcardTopic={chemistryApi.updateFlashcardTopic} deleteFlashcardTopic={chemistryApi.deleteFlashcardTopic} createFlashcard={chemistryApi.createFlashcard} updateFlashcard={chemistryApi.updateFlashcard} deleteFlashcard={chemistryApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="chem_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={chemistryApi.fetchMcqQuestions} createMcqQuestion={chemistryApi.createMcqQuestion} updateMcqQuestion={chemistryApi.updateMcqQuestion} deleteMcqQuestion={chemistryApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="chem_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={chemistryApi.fetchWrittenQuestions} createWrittenQuestion={chemistryApi.createWrittenQuestion} updateWrittenQuestion={chemistryApi.updateWrittenQuestion} deleteWrittenQuestion={chemistryApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
            </Tabs.Panel>

            {/* Physics */}
            <Tabs.Panel id="phys_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={physicsApi.fetchChecklist} createChecklistSection={physicsApi.createChecklistSection} updateChecklistSection={physicsApi.updateChecklistSection} deleteChecklistSection={physicsApi.deleteChecklistSection} createChecklistItem={physicsApi.createChecklistItem} updateChecklistItem={physicsApi.updateChecklistItem} deleteChecklistItem={physicsApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="phys_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={physicsApi.fetchFlashcardTopics} fetchFlashcards={physicsApi.fetchFlashcards} createFlashcardTopic={physicsApi.createFlashcardTopic} updateFlashcardTopic={physicsApi.updateFlashcardTopic} deleteFlashcardTopic={physicsApi.deleteFlashcardTopic} createFlashcard={physicsApi.createFlashcard} updateFlashcard={physicsApi.updateFlashcard} deleteFlashcard={physicsApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="phys_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={physicsApi.fetchMcqQuestions} createMcqQuestion={physicsApi.createMcqQuestion} updateMcqQuestion={physicsApi.updateMcqQuestion} deleteMcqQuestion={physicsApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="phys_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={physicsApi.fetchWrittenQuestions} createWrittenQuestion={physicsApi.createWrittenQuestion} updateWrittenQuestion={physicsApi.updateWrittenQuestion} deleteWrittenQuestion={physicsApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
            </Tabs.Panel>

            {/* Sports Science */}
            <Tabs.Panel id="sport_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={sportsApi.fetchChecklist} createChecklistSection={sportsApi.createChecklistSection} updateChecklistSection={sportsApi.updateChecklistSection} deleteChecklistSection={sportsApi.deleteChecklistSection} createChecklistItem={sportsApi.createChecklistItem} updateChecklistItem={sportsApi.updateChecklistItem} deleteChecklistItem={sportsApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="sport_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={sportsApi.fetchFlashcardTopics} fetchFlashcards={sportsApi.fetchFlashcards} createFlashcardTopic={sportsApi.createFlashcardTopic} updateFlashcardTopic={sportsApi.updateFlashcardTopic} deleteFlashcardTopic={sportsApi.deleteFlashcardTopic} createFlashcard={sportsApi.createFlashcard} updateFlashcard={sportsApi.updateFlashcard} deleteFlashcard={sportsApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="sport_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={sportsApi.fetchMcqQuestions} createMcqQuestion={sportsApi.createMcqQuestion} updateMcqQuestion={sportsApi.updateMcqQuestion} deleteMcqQuestion={sportsApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="sport_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={sportsApi.fetchWrittenQuestions} createWrittenQuestion={sportsApi.createWrittenQuestion} updateWrittenQuestion={sportsApi.updateWrittenQuestion} deleteWrittenQuestion={sportsApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
            </Tabs.Panel>

            {/* Economics */}
            <Tabs.Panel id="econ_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={economicsApi.fetchChecklist} createChecklistSection={economicsApi.createChecklistSection} updateChecklistSection={economicsApi.updateChecklistSection} deleteChecklistSection={economicsApi.deleteChecklistSection} createChecklistItem={economicsApi.createChecklistItem} updateChecklistItem={economicsApi.updateChecklistItem} deleteChecklistItem={economicsApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="econ_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={economicsApi.fetchFlashcardTopics} fetchFlashcards={economicsApi.fetchFlashcards} createFlashcardTopic={economicsApi.createFlashcardTopic} updateFlashcardTopic={economicsApi.updateFlashcardTopic} deleteFlashcardTopic={economicsApi.deleteFlashcardTopic} createFlashcard={economicsApi.createFlashcard} updateFlashcard={economicsApi.updateFlashcard} deleteFlashcard={economicsApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="econ_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={economicsApi.fetchMcqQuestions} createMcqQuestion={economicsApi.createMcqQuestion} updateMcqQuestion={economicsApi.updateMcqQuestion} deleteMcqQuestion={economicsApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="econ_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={economicsApi.fetchWrittenQuestions} createWrittenQuestion={economicsApi.createWrittenQuestion} updateWrittenQuestion={economicsApi.updateWrittenQuestion} deleteWrittenQuestion={economicsApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
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
