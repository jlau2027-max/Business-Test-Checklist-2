/**
 * Badge / Pill — a small inline label with a tinted background.
 *
 * Props:
 *   children   — label text
 *   color      — CSS color value for text + tint (default: "var(--accent)")
 *   bg         — explicit background override (default: auto-tinted from `color`)
 *   size       — "sm" (default) or "md"
 *   className  — extra classes to merge
 *   style      — extra inline styles to merge
 */
export default function Badge({
  children,
  color = "var(--accent)",
  bg,
  size = "sm",
  className = "",
  style,
  ...rest
}) {
  const sizeClasses =
    size === "md"
      ? "text-sm px-2 py-1 rounded-full font-bold"
      : "text-xs px-1.5 py-0.5 rounded-full font-semibold";

  return (
    <span
      className={`${sizeClasses} ${className}`}
      style={{
        backgroundColor: bg || color,
        color,
        border: "none",
        flexShrink: 0,
        // When no explicit `bg` is passed, derive a 10% tint from the color.
        // Callers can pass `bg` to override (e.g. for rgba or CSS-var tints).
        ...(bg ? {} : { backgroundColor: undefined }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
