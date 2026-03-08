import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";

/* ── Tiny SVG icons (16×16, stroke-based) ─────────────────────────── */
const sz = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const ICONS = {
  home: (c) => <svg {...sz} stroke={c}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><polyline points="9 21 9 14 15 14 15 21"/></svg>,
  briefcase: (c) => <svg {...sz} stroke={c}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>,
  clock: (c) => <svg {...sz} stroke={c}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  trendUp: (c) => <svg {...sz} stroke={c}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  leaf: (c) => <svg {...sz} stroke={c}><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66"/><path d="M20.5 3.5S19.17 9.17 13 14"/><path d="M20.5 3.5c-2.5 0-8 2.5-12.5 7S2.5 18 2.5 20.5"/></svg>,
  flask: (c) => <svg {...sz} stroke={c}><path d="M9 3h6"/><path d="M10 3v7.4a2 2 0 0 1-.5 1.3L4.26 18a2 2 0 0 0 1.49 3.33h12.5A2 2 0 0 0 19.74 18l-5.24-6.3A2 2 0 0 1 14 10.4V3"/></svg>,
  atom: (c) => <svg {...sz} stroke={c}><circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>,
  activity: (c) => <svg {...sz} stroke={c}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  dashboard: (c) => <svg {...sz} stroke={c}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
};

const SECTIONS = [
  {
    items: [
      { label: "Home", href: "/", subject: "home", icon: "home", color: "var(--accent)" },
    ],
  },
  {
    heading: "Group 3",
    items: [
      { label: "Business", href: "/business/checklist", subject: "business", icon: "briefcase", color: "var(--accent)" },
      { label: "History", href: "/history/specimen", subject: "history", icon: "clock", color: "var(--accent-tertiary)" },
      { label: "Economics", href: "/economics/checklist", subject: "economics", icon: "trendUp", color: "#6BA3AD" },
    ],
  },
  {
    heading: "Group 4",
    items: [
      { label: "Biology", href: "/biology/checklist", subject: "biology", icon: "leaf", color: "var(--color-success)" },
      { label: "Chemistry", href: "/chemistry/checklist", subject: "chemistry", icon: "flask", color: "#8B7EB5" },
      { label: "Physics", href: "/physics/checklist", subject: "physics", icon: "atom", color: "#C4A36A" },
      { label: "Sports Sci", href: "/sports-science/checklist", subject: "sports", icon: "activity", color: "#B57A7A" },
    ],
  },
];

export default function Sidebar({ activeSubject }) {
  const { user } = useAuth();

  const allSections = user
    ? [...SECTIONS, { items: [{ label: "Dashboard", href: "/dashboard", subject: "dashboard", icon: "dashboard", color: "var(--accent)" }] }]
    : SECTIONS;

  return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 240,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "var(--bg-base)",
          borderRight: "1px solid var(--bg-input)",
          display: "flex",
          flexDirection: "column",
          padding: "24px 14px 20px",
          gap: 0,
          fontFamily: "'JSans', sans-serif",
          overflowY: "auto",
        }}
      >
        {/* Logo / brand */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: "var(--text-primary)",
            padding: "0 10px 20px",
          }}
        >
          IB Revision
        </div>

        {allSections.map((section, si) => (
          <div key={si}>
            {/* Group heading */}
            {section.heading && (
              <span
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  color: "var(--text-muted)",
                  padding: "16px 10px 6px",
                }}
              >
                {section.heading}
              </span>
            )}

            {/* Items */}
            {section.items.map((s) => {
              const active = activeSubject === s.subject;
              const linkContent = (
                <Button
                  key={s.label}
                  render={(props) => <button {...props} />}
                  className="w-full justify-start font-medium text-sm"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    paddingLeft: 10,
                    gap: 10,
                    fontFamily: "'JSans', sans-serif",
                    backgroundColor: active ? "var(--bg-input)" : "transparent",
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    border: "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  {/* Icon */}
                  <span style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: active ? 1 : 0.55, transition: "opacity 0.15s ease" }}>
                    {ICONS[s.icon]?.(active ? s.color : "currentColor")}
                  </span>
                  {s.label}
                  {active && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 4,
                        height: 16,
                        borderRadius: 2,
                        backgroundColor: s.color || "var(--accent)",
                      }}
                    />
                  )}
                </Button>
              );

              return active ? (
                <div key={s.label} style={{ marginBottom: 2 }}>{linkContent}</div>
              ) : (
                <a key={s.label} href={s.href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
                  {linkContent}
                </a>
              );
            })}
          </div>
        ))}

        <div style={{ flex: 1 }} />
      </div>
  );
}
