/**
 * SectionLabel — uppercase, muted mini-heading used for section titles.
 *
 * Props:
 *   children  — label text
 *   color     — text color (default: "var(--text-muted)")
 *   className — extra classes
 */
export default function SectionLabel({
  children,
  color = "var(--text-muted)",
  className = "",
}) {
  return (
    <span
      className={`block mb-4 ${className}`}
      style={{ fontSize: 11, letterSpacing: 1, color }}
    >
      {children}
    </span>
  );
}
