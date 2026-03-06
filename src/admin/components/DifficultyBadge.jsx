import { Chip } from "@heroui/react";

const STYLES = {
  SL: { bg: "var(--accent-secondary)", text: "#fff" },
  HL: { bg: "var(--accent-tertiary)", text: "#fff" },
  "SL/HL": { bg: "var(--accent)", text: "#fff" },
};

export default function DifficultyBadge({ difficulty }) {
  const s = STYLES[difficulty] || { bg: "var(--text-muted)", text: "#fff" };
  return (
    <Chip size="sm" variant="primary" className="rounded-sm text-xs" style={{ backgroundColor: s.bg, color: s.text }}>
      {difficulty}
    </Chip>
  );
}
