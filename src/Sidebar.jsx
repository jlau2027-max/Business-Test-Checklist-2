import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";
import { House, Briefcase, Clock, TrendingUp, Leaf, FlaskConical, Atom, Activity, LayoutGrid } from "lucide-react";

const SECTIONS = [
  {
    items: [
      { label: "Home", href: "/", subject: "home", Icon: House, color: "var(--accent)" },
    ],
  },
  {
    heading: "Group 3",
    items: [
      { label: "Business", href: "/business/checklist", subject: "business", Icon: Briefcase, color: "var(--accent)" },
      { label: "History", href: "/history/specimen", subject: "history", Icon: Clock, color: "var(--accent-tertiary)" },
      { label: "Economics", href: "/economics/checklist", subject: "economics", Icon: TrendingUp, color: "#6BA3AD" },
    ],
  },
  {
    heading: "Group 4",
    items: [
      { label: "Biology", href: "/biology/checklist", subject: "biology", Icon: Leaf, color: "var(--color-success)" },
      { label: "Chemistry", href: "/chemistry/checklist", subject: "chemistry", Icon: FlaskConical, color: "#8B7EB5" },
      { label: "Physics", href: "/physics/checklist", subject: "physics", Icon: Atom, color: "#C4A36A" },
      { label: "Sports Sci", href: "/sports-science/checklist", subject: "sports", Icon: Activity, color: "#B57A7A" },
    ],
  },
];

export default function Sidebar({ activeSubject }) {
  const { user } = useAuth();

  const allSections = user
    ? [...SECTIONS, { items: [{ label: "Dashboard", href: "/dashboard", subject: "dashboard", Icon: LayoutGrid, color: "var(--accent)" }] }]
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
                    <s.Icon size={16} color={active ? s.color : "currentColor"} strokeWidth={2} />
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
