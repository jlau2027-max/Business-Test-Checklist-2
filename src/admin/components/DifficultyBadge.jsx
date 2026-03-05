import { Badge } from "@mantine/core";

const COLORS = { SL: "teal", HL: "orange", "SL/HL": "violet" };

export default function DifficultyBadge({ difficulty }) {
  return (
    <Badge size="sm" variant="light" color={COLORS[difficulty] || "gray"} radius="sm">
      {difficulty}
    </Badge>
  );
}
