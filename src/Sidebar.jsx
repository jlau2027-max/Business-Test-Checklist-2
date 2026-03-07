import { Box, Text } from "@mantine/core";
import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";

const SUBJECT_COLORS = {
  business: "#7C6FFF",
  history: "#F87171",
  biology: "#34D399",
  dashboard: "#A78BFA",
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
        <Box
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 199,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      {/* Sidebar */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : -220,
          width: 220,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "var(--bg-base)",
          borderRight: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: 8,
          transition: "left 0.25s ease",
        }}
      >
        <Text fz={11} ff="'JetBrains Mono', monospace" c="var(--text-muted)" lts={1} mb={4} px={8}>
          SUBJECTS
        </Text>
        {items.map(s => {
          const active = activeSubject === s.subject;
          const color = SUBJECT_COLORS[s.subject] || "#7C6FFF";
          const btn = (
            <Button
              key={s.label}
              onPress={onClose}
              className="rounded-md font-semibold text-sm w-full justify-start"
              style={{
                height: 44,
                paddingLeft: 14,
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor: active ? color : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
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

        <Box style={{ flex: 1 }} />
        <Text fz={10} c="var(--text-muted)" ff="'JetBrains Mono', monospace" ta="center">
          More subjects coming soon
        </Text>
      </Box>
    </>
  );
}
