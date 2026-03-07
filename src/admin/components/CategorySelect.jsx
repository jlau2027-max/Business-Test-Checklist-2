import { Select, Group, ColorSwatch, Text } from "@mantine/core";

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

export default function CategorySelect({ value, onChange, categories, ...props }) {
  const cats = categories || DEFAULT_CATEGORIES;

  const data = cats.map(c => ({
    value: c.value || c.category,
    label: c.value || c.category,
  }));

  return (
    <Select
      label="Category"
      placeholder="Select category"
      data={data}
      value={value}
      onChange={onChange}
      searchable
      clearable
      radius="md"
      styles={{
        input: { backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" },
        dropdown: { backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" },
        option: { color: "var(--text-primary)", "&[data-selected]": { backgroundColor: "var(--accent)" } },
      }}
      {...props}
    />
  );
}
