import { Group } from "@mantine/core";
import { Button } from "@heroui/react";

/**
 * Renders a row of pill buttons for unit selection.
 * @param {object} props
 * @param {{ id: string, label: string, title?: string, topics?: string }[]} props.units - From UNIT_CONFIG
 * @param {string} props.activeUnitId - Current unit id
 * @param {(unitId: string) => void} props.onUnitChange - Called when a unit is selected
 * @param {string} [props.accentColor] - Active pill color (default #34D399 for biology)
 */
export default function UnitSelector({ units, activeUnitId, onUnitChange, accentColor = "#34D399" }) {
  if (!units || units.length === 0) return null;

  return (
    <Group gap={6} justify="center" wrap="wrap" mb="sm">
      {units.map((u) => {
        const active = activeUnitId === u.id;
        return (
          <Button
            key={u.id}
            size="sm"
            variant="flat"
            onPress={() => onUnitChange(u.id)}
            className="rounded-full text-xs font-semibold min-w-0"
            style={{
              backgroundColor: active ? accentColor : "var(--bg-elevated)",
              color: active ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${active ? accentColor : "var(--border-subtle)"}`,
              fontFamily: "'Inter', sans-serif",
              opacity: active ? 1 : 0.85,
            }}
          >
            {u.label}
          </Button>
        );
      })}
    </Group>
  );
}
