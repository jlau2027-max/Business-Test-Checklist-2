import LoginButton from "../LoginButton.jsx";

/**
 * PageHeader — sticky frosted-glass header bar used on every page.
 *
 * Props:
 *   children — content rendered inside `max-w-4xl` inner container
 */
export default function PageHeader({ children }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--bg-header)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-header)",
      }}
    >
      <div className="max-w-4xl mx-auto py-2 px-4">
        {children}
      </div>
    </div>
  );
}

/**
 * HeaderBadge — centered pill label + LoginButton row.
 *
 * Props:
 *   label — text inside the pill
 *   bg    — pill background color (default: accent-soft)
 *   color — pill text color (default: accent)
 */
export function HeaderBadge({
  label,
  bg = "var(--accent-soft)",
  color = "var(--accent)",
}) {
  return (
    <div
      className="flex items-center justify-center mb-1"
      style={{ position: "relative" }}
    >
      <span
        className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
        style={{ letterSpacing: 2, backgroundColor: bg, color, border: "none" }}
      >
        {label}
      </span>
      <LoginButton />
    </div>
  );
}

/**
 * HeaderTitle — centered page title with responsive font size.
 */
export function HeaderTitle({ children }) {
  return (
    <span
      className="text-center block font-extrabold text-[var(--text-primary)]"
      style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
    >
      {children}
    </span>
  );
}
