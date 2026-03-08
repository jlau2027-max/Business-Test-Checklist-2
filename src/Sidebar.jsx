import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";

const SUBJECT_COLORS = {
  business: { solid: "var(--accent)", glow: "var(--accent-glow)" },
  history: { solid: "var(--accent-tertiary)", glow: "var(--accent-tertiary-soft)" },
  biology: { solid: "var(--color-success)", glow: "var(--color-success-soft)" },
  dashboard: { solid: "var(--accent-secondary)", glow: "var(--accent-secondary-soft)" },
};

export default function Sidebar({ activeSubject, sidebarOpen, onClose }) {
  const { user } = useAuth();

  const items = [
    { label: "Business", href: "/business/checklist", subject: "business" },
    { label: "History", href: "/history/specimen", subject: "history" },
    { label: "Biology", href: "/biology/checklist", subject: "biology" },
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
          backgroundColor: "var(--bg-base)",
          borderRight: "1px solid var(--bg-input)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: 8,
          transition: "left 0.25s ease",
        }}
      >
        <span className="text-[var(--text-muted)] mb-1 px-2" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
          SUBJECTS
        </span>
        {items.map(s => {
          const active = activeSubject === s.subject;
          const theme = SUBJECT_COLORS[s.subject] || { solid: "var(--accent)", glow: "var(--accent-glow)" };
          const btn = (
            <Button
              key={s.label}
              onPress={onClose}
              className="rounded-full font-semibold text-sm w-full justify-start"
              style={{
                height: 44,
                paddingLeft: 14,
                fontFamily: "'JSans', sans-serif",
                backgroundColor: active ? theme.solid : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                border: active ? "none" : "1px solid transparent",
                boxShadow: active ? `0 0 12px ${theme.glow}` : "none",
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
      </div>
    </>
  );
}
