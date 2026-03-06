import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";

const SUBJECT_COLORS = {
  business: "#7C6FFF",
  history: "#F87171",
  dashboard: "#A78BFA",
};

export default function Sidebar({ activeSubject, sidebarOpen, onClose }) {
  const { user } = useAuth();

  const items = [
    { label: "Business", href: "/business/checklist", subject: "business" },
    { label: "History", href: "/history/specimen", subject: "history" },
    ...(user ? [{ label: "Dashboard", href: "/dashboard", subject: "dashboard" }] : []),
  ];

  return (
    <>
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Sidebar */}
      <div
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
        <span className="text-[#55556A] mb-1 px-2" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
          SUBJECTS
        </span>
        {items.map(s => {
          const active = activeSubject === s.subject;
          const color = SUBJECT_COLORS[s.subject] || "#7C6FFF";
          const btn = (
            <Button
              key={s.label}
              onPress={onClose}
              className="rounded-full font-semibold text-sm w-full justify-start"
              style={{
                height: 44,
                paddingLeft: 14,
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: active ? color : "transparent",
                color: active ? "#fff" : "#8B8B9E",
                border: active ? "none" : "1px solid transparent",
                boxShadow: active ? `0 0 12px ${color}33` : "none",
              }}
            >
              {s.label}
            </Button>
          );
          return active ? btn : (
            <a key={s.label} href={s.href} style={{ textDecoration: "none" }}>
              {btn}
            </a>
          );
        })}

        <div style={{ flex: 1 }} />
        <span className="text-center block" style={{ fontSize: 10, color: "#33334A", fontFamily: "'JetBrains Mono', monospace" }}>
          More subjects coming soon
        </span>
      </div>
    </>
  );
}
