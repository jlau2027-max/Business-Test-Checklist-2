import { useState } from "react";
import { Tabs } from "@heroui/react";
import AdminGuard from "./AdminGuard.jsx";
import FlashcardAdmin from "./FlashcardAdmin.jsx";
import McqAdmin from "./McqAdmin.jsx";
import WrittenAdmin from "./WrittenAdmin.jsx";
import HistoryAdmin from "./HistoryAdmin.jsx";
import ChecklistAdmin from "./ChecklistAdmin.jsx";
import UsersAdmin from "./UsersAdmin.jsx";

const BUSINESS_TABS = [
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
  const [activeTab, setActiveTab] = useState("checklist");

  const tabs = section === "business" ? BUSINESS_TABS : section === "history" ? HISTORY_TABS : USERS_TABS;

  const handleSectionChange = (val) => {
    setSection(val);
    setActiveTab(val === "business" ? "checklist" : val === "history" ? "history" : "users");
  };

  return (
    <AdminGuard>
      <div className="min-h-screen" style={{ backgroundColor: "#0A0A12" }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-extrabold text-[#F0EEE8]">Admin Panel</h1>
            <a href="/business/checklist" className="text-sm text-[#8B8B9E] no-underline hover:text-[#F0EEE8]">
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
              <Tabs.List aria-label="Admin sections" className="bg-[#12121A] border border-[#252533] rounded-lg p-1">
                <Tabs.Tab id="business" className="font-semibold text-sm font-mono text-[#8B8B9E] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Business
                  <Tabs.Indicator className="bg-[#7C6FFF] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="history" className="font-semibold text-sm font-mono text-[#8B8B9E] data-[selected=true]:text-white rounded-full px-4 py-2">
                  History
                  <Tabs.Indicator className="bg-[#F87171] rounded-full" />
                </Tabs.Tab>
                <Tabs.Tab id="users" className="font-semibold text-sm font-mono text-[#8B8B9E] data-[selected=true]:text-white rounded-full px-4 py-2">
                  Users
                  <Tabs.Indicator className="bg-[#38BDF8] rounded-full" />
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
              <Tabs.List aria-label="Sub-tabs" className="border-b border-[#252533]">
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.value}
                    id={tab.value}
                    className="font-semibold text-sm text-[#8B8B9E] data-[selected=true]:text-[#F0EEE8] px-5 py-2.5 hover:bg-[#12121A] hover:text-[#F0EEE8]"
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
            <Tabs.Panel id="users" className="pt-4">
              <UsersAdmin />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  );
}
