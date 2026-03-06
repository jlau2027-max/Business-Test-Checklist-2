import { Select, ListBox, Label } from "@heroui/react";

const DEFAULT_CATEGORIES = [
  { value: "Costs & Revenue", color: "#7C6FFF" },
  { value: "Cash Flow", color: "#38BDF8" },
  { value: "Final Accounts", color: "#34D399" },
  { value: "Ratio Analysis", color: "#FBBF24" },
  { value: "Ratio Analysis (HL)", color: "#FBBF24" },
  { value: "Investment Appraisal", color: "#A78BFA" },
  { value: "Budgets & Variance", color: "#F87171" },
  { value: "Breakeven", color: "#2DD4BF" },
  { value: "BMT Tools", color: "#F472B6" },
  { value: "Sources of Finance", color: "#FB923C" },
];

export default function CategorySelect({ value, onChange, categories, label, ...props }) {
  const cats = categories || DEFAULT_CATEGORIES;

  return (
    <Select
      className="w-full"
      placeholder="Select category"
      selectedKey={value || null}
      onSelectionChange={(key) => onChange(key)}
      {...props}
    >
      <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>
        {label || "Category"}
      </Label>
      <Select.Trigger className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" style={{ fontFamily: "'JSans', sans-serif" }}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-[var(--bg-input)] border border-[var(--border)]">
        <ListBox>
          {cats.map((c) => (
            <ListBox.Item
              key={c.value || c.category}
              id={c.value || c.category}
              textValue={c.value || c.category}
              className="text-[var(--text-primary)] text-xs"
              style={{ fontFamily: "'JSans', sans-serif" }}
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: c.color }} />
              {c.value || c.category}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
