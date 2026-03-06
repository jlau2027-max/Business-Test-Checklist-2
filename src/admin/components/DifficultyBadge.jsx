import { Chip } from "@heroui/react";

const STYLES = {
  SL: { bg: "#0d9488", text: "#fff" },
  HL: { bg: "#ea580c", text: "#fff" },
  "SL/HL": { bg: "#7c3aed", text: "#fff" },
};

export default function DifficultyBadge({ difficulty }) {
  const s = STYLES[difficulty] || { bg: "#6b7280", text: "#fff" };
  return (
    <Chip size="sm" variant="primary" className="rounded-sm text-xs" style={{ backgroundColor: s.bg, color: s.text }}>
      {difficulty}
    </Chip>
  );
}
