import { Select, ListBox, Label } from "@heroui/react";

const DEFAULT_CATEGORIES = [
  { value: "Costs & Revenue", color: "var(--cat-costs)" },
  { value: "Cash Flow", color: "var(--cat-cashflow)" },
  { value: "Final Accounts", color: "var(--cat-accounts)" },
  { value: "Ratio Analysis", color: "var(--cat-ratios)" },
  { value: "Ratio Analysis (HL)", color: "var(--cat-ratios)" },
  { value: "Investment Appraisal", color: "var(--cat-investment)" },
  { value: "Budgets & Variance", color: "var(--cat-budgets)" },
  { value: "Breakeven", color: "var(--cat-breakeven)" },
  { value: "BMT Tools", color: "var(--cat-bmt)" },
  { value: "Sources of Finance", color: "var(--accent-tertiary)" },
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
