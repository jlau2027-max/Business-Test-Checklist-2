import { useState } from "react";
import { Tabs, Select, ListBox, Label } from "@heroui/react";
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
  chemistryApi, physicsApi, sportsApi, economicsApi, essApi, spanishApi,
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

const ESS_TABS = [
  { value: "ess_checklist", label: "Checklist" },
  { value: "ess_flashcards", label: "Flashcards" },
  { value: "ess_mcq", label: "MCQ" },
  { value: "ess_written", label: "Written" },
];

const SPANISH_TABS = [
  { value: "span_checklist", label: "Checklist" },
  { value: "span_flashcards", label: "Flashcards" },
  { value: "span_mcq", label: "MCQ" },
  { value: "span_written", label: "Written" },
];

const USERS_TABS = [
  { value: "users", label: "User Management" },
];

export default function AdminPage() {
  const [section, setSection] = useState("business");
  const [activeTab, setActiveTab] = useState("checklist");

  const SECTION_TAB_MAP = {
    spanish: { tabs: SPANISH_TABS, defaultTab: "span_checklist" },
    business: { tabs: BUSINESS_TABS, defaultTab: "checklist" },
    history: { tabs: HISTORY_TABS, defaultTab: "history" },
    economics: { tabs: ECONOMICS_TABS, defaultTab: "econ_checklist" },
    biology: { tabs: BIOLOGY_TABS, defaultTab: "bio_checklist" },
    chemistry: { tabs: CHEMISTRY_TABS, defaultTab: "chem_checklist" },
    physics: { tabs: PHYSICS_TABS, defaultTab: "phys_checklist" },
    sports: { tabs: SPORTS_TABS, defaultTab: "sport_checklist" },
    ess: { tabs: ESS_TABS, defaultTab: "ess_checklist" },
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

          {/* Section selector — dropdown */}
          <Select
            selectedKey={section}
            onSelectionChange={handleSectionChange}
            className="mb-4 w-[240px]"
            placeholder="Select subject"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Subject</Label>
            <Select.Trigger className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)]">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg">
              <ListBox className="p-1">
                <ListBox.Item id="spanish" textValue="Spanish" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Spanish</ListBox.Item>
                <ListBox.Item id="business" textValue="Business" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Business</ListBox.Item>
                <ListBox.Item id="history" textValue="History" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">History</ListBox.Item>
                <ListBox.Item id="economics" textValue="Economics" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Economics</ListBox.Item>
                <ListBox.Item id="biology" textValue="Biology" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Biology</ListBox.Item>
                <ListBox.Item id="chemistry" textValue="Chemistry" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Chemistry</ListBox.Item>
                <ListBox.Item id="physics" textValue="Physics" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Physics</ListBox.Item>
                <ListBox.Item id="sports" textValue="Sports Sci" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Sports Sci</ListBox.Item>
                <ListBox.Item id="ess" textValue="ESS" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">ESS</ListBox.Item>
                <ListBox.Item id="users" textValue="Users" className="text-sm font-medium text-[var(--text-secondary)] px-3 py-2 rounded-lg cursor-pointer">Users</ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

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

            {/* ESS */}
            <Tabs.Panel id="ess_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={essApi.fetchChecklist} createChecklistSection={essApi.createChecklistSection} updateChecklistSection={essApi.updateChecklistSection} deleteChecklistSection={essApi.deleteChecklistSection} createChecklistItem={essApi.createChecklistItem} updateChecklistItem={essApi.updateChecklistItem} deleteChecklistItem={essApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="ess_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={essApi.fetchFlashcardTopics} fetchFlashcards={essApi.fetchFlashcards} createFlashcardTopic={essApi.createFlashcardTopic} updateFlashcardTopic={essApi.updateFlashcardTopic} deleteFlashcardTopic={essApi.deleteFlashcardTopic} createFlashcard={essApi.createFlashcard} updateFlashcard={essApi.updateFlashcard} deleteFlashcard={essApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="ess_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={essApi.fetchMcqQuestions} createMcqQuestion={essApi.createMcqQuestion} updateMcqQuestion={essApi.updateMcqQuestion} deleteMcqQuestion={essApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="ess_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={essApi.fetchWrittenQuestions} createWrittenQuestion={essApi.createWrittenQuestion} updateWrittenQuestion={essApi.updateWrittenQuestion} deleteWrittenQuestion={essApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
            </Tabs.Panel>

            {/* Spanish */}
            <Tabs.Panel id="span_checklist" className="pt-4">
              <ChecklistAdmin fetchChecklist={spanishApi.fetchChecklist} createChecklistSection={spanishApi.createChecklistSection} updateChecklistSection={spanishApi.updateChecklistSection} deleteChecklistSection={spanishApi.deleteChecklistSection} createChecklistItem={spanishApi.createChecklistItem} updateChecklistItem={spanishApi.updateChecklistItem} deleteChecklistItem={spanishApi.deleteChecklistItem} />
            </Tabs.Panel>
            <Tabs.Panel id="span_flashcards" className="pt-4">
              <FlashcardAdmin fetchFlashcardTopics={spanishApi.fetchFlashcardTopics} fetchFlashcards={spanishApi.fetchFlashcards} createFlashcardTopic={spanishApi.createFlashcardTopic} updateFlashcardTopic={spanishApi.updateFlashcardTopic} deleteFlashcardTopic={spanishApi.deleteFlashcardTopic} createFlashcard={spanishApi.createFlashcard} updateFlashcard={spanishApi.updateFlashcard} deleteFlashcard={spanishApi.deleteFlashcard} />
            </Tabs.Panel>
            <Tabs.Panel id="span_mcq" className="pt-4">
              <McqAdmin fetchMcqQuestions={spanishApi.fetchMcqQuestions} createMcqQuestion={spanishApi.createMcqQuestion} updateMcqQuestion={spanishApi.updateMcqQuestion} deleteMcqQuestion={spanishApi.deleteMcqQuestion} />
            </Tabs.Panel>
            <Tabs.Panel id="span_written" className="pt-4">
              <WrittenAdmin fetchWrittenQuestions={spanishApi.fetchWrittenQuestions} createWrittenQuestion={spanishApi.createWrittenQuestion} updateWrittenQuestion={spanishApi.updateWrittenQuestion} deleteWrittenQuestion={spanishApi.deleteWrittenQuestion} questionTypes={SHORT_ANSWER_ONLY} />
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
