import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { useAuth } from "./AuthContext.jsx";
import { House, Briefcase, Clock, TrendingUp, Leaf, FlaskConical, Atom, Activity, LayoutGrid, ChevronsLeft, ChevronsRight } from "lucide-react";

const EXPANDED = 240;
const COLLAPSED = 56;
const LS_KEY = "sidebar_collapsed";

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
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(LS_KEY) === "1"; } catch { return false; }
  });

  const width = collapsed ? COLLAPSED : EXPANDED;

  // Sync CSS variable so page content can read it
  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
    try { localStorage.setItem(LS_KEY, collapsed ? "1" : "0"); } catch {}
  }, [collapsed, width]);

  // Set initial value on mount
  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", `${width}px`);
  }, []);

  const allSections = user
    ? [...SECTIONS, { items: [{ label: "Dashboard", href: "/dashboard", subject: "dashboard", Icon: LayoutGrid, color: "var(--accent)" }] }]
    : SECTIONS;

  return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width,
          height: "100vh",
          zIndex: 200,
          backgroundColor: "var(--bg-base)",
          borderRight: "1px solid var(--bg-input)",
          display: "flex",
          flexDirection: "column",
          padding: collapsed ? "24px 6px 20px 0" : "24px 14px 20px",
          gap: 0,
          fontFamily: "'JSans', sans-serif",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), padding 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo / brand + collapse toggle */}
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              width: "100%",
              height: 40,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: 0,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              transition: "color 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}
            title="Expand sidebar"
          >
            <span style={{ marginLeft: 12 }}><ChevronsRight size={16} /></span>
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
              marginBottom: 20,
              height: 40,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
              IB Revision
            </span>
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: 4,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}
              title="Collapse sidebar"
            >
              <ChevronsLeft size={16} />
            </button>
          </div>
        )}

        {allSections.map((section, si) => (
          <div key={si}>
            {/* Group heading — hidden when collapsed */}
            {section.heading && !collapsed && (
              <span
                style={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  color: "var(--text-muted)",
                  padding: "16px 10px 6px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {section.heading}
              </span>
            )}
            {/* Thin divider when collapsed between groups */}
            {section.heading && collapsed && (
              <div style={{ height: 1, backgroundColor: "var(--bg-input)", margin: "10px 8px 8px" }} />
            )}

            {/* Items */}
            {section.items.map((s) => {
              const active = activeSubject === s.subject;
              const linkContent = (
                <Button
                  key={s.label}
                  render={(props) => <button {...props} />}
                  className="w-full font-medium text-sm"
                  style={{
                    height: 40,
                    borderRadius: 10,
                    paddingLeft: collapsed ? 0 : 10,
                    gap: collapsed ? 0 : 10,
                    justifyContent: collapsed ? "center" : "flex-start",
                    fontFamily: "'JSans', sans-serif",
                    backgroundColor: active ? "var(--bg-input)" : "transparent",
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    border: "none",
                    transition: "all 0.15s ease",
                  }}
                  title={collapsed ? s.label : undefined}
                >
                  {/* Icon */}
                  <span style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: active ? 1 : 0.55, transition: "opacity 0.15s ease", marginLeft: collapsed ? 12 : 0 }}>
                    <s.Icon size={16} color={active ? s.color : "currentColor"} strokeWidth={2} />
                  </span>
                  {/* Label — hidden when collapsed */}
                  {!collapsed && s.label}
                  {/* Active indicator bar */}
                  {active && !collapsed && (
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
