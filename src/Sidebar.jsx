import { useState, useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { useUser } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import { House, Briefcase, Clock, TrendingUp, Leaf, FlaskConical, Atom, Activity, Languages, Trees, LayoutGrid, UserRound, ChevronsLeft, ChevronsRight, Menu, X } from "lucide-react";

const EXPANDED = 240;
const COLLAPSED = 56;
const LS_KEY = "sidebar_collapsed";
const MOBILE_BP = 768;

const SECTIONS = [
  {
    items: [
      { label: "Home", href: "/", subject: "home", Icon: House, color: "var(--accent)" },
    ],
  },
  {
    heading: "Group 2",
    items: [
      { label: "Spanish", href: "/spanish/checklist", subject: "spanish", Icon: Languages, color: "#D4915C" },
    ],
  },
  {
    heading: "Group 3",
    items: [
      { label: "Business", href: "/business/checklist", subject: "business", Icon: Briefcase, color: "var(--accent)" },
      { label: "History", href: "/history/checklist", subject: "history", Icon: Clock, color: "var(--accent-tertiary)" },
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
      { label: "ESS", href: "/ess/checklist", subject: "ess", Icon: Trees, color: "#7AAD6B" },
    ],
  },
];

const ROLE_LABEL = { origin: "Origin", core: "Core", admin: "Admin" };
const ROLE_COLOR = {
  origin: "var(--accent-tertiary)",
  core: "var(--accent-secondary)",
  admin: "var(--accent)",
};

export default function Sidebar({ activeSubject }) {
  const { user, role } = useAuth();
  const { user: clerkUser } = useUser();
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(LS_KEY) === "1"; } catch { return false; }
  });

  // Mobile state
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BP);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track viewport
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP - 1}px)`);
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMobileOpen(false); // close drawer when resizing to desktop
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const width = collapsed ? COLLAPSED : EXPANDED;

  // Sync CSS variable — 0 on mobile so content fills full width
  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", isMobile ? "0px" : `${width}px`);
    try { localStorage.setItem(LS_KEY, collapsed ? "1" : "0"); } catch {}
  }, [collapsed, width, isMobile]);

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", isMobile ? "0px" : `${width}px`);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const allSections = user
    ? [...SECTIONS, {
        heading: "Account",
        items: [
          { label: "Dashboard", href: "/dashboard", subject: "dashboard", Icon: LayoutGrid, color: "var(--accent)" },
          { label: "Account", href: "https://accounts.ibrev.org/user", subject: "account", Icon: UserRound, color: "var(--text-secondary)" },
        ],
      }]
    : SECTIONS;

  // ─── Mobile: floating hamburger trigger ────────────────────────
  const mobileToggle = isMobile && !mobileOpen && (
    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      aria-label="Open navigation"
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 201,
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Menu size={18} strokeWidth={2} />
    </button>
  );

  // ─── Mobile: backdrop overlay ──────────────────────────────────
  const mobileOverlay = isMobile && mobileOpen && (
    <div
      onClick={closeMobile}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 199,
        backgroundColor: "rgba(0,0,0,0.4)",
        transition: "opacity 0.2s ease",
      }}
    />
  );

  // ─── Sidebar nav styles (desktop vs mobile) ───────────────────
  const navStyle = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        width: EXPANDED,
        maxWidth: "85vw",
        height: "100vh",
        zIndex: 200,
        backgroundColor: "var(--bg-base)",
        borderRight: "1px solid var(--bg-input)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 14px 20px",
        gap: 0,
        overflowY: "auto",
        overflowX: "hidden",
        transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: mobileOpen ? "4px 0 24px rgba(0,0,0,0.15)" : "none",
      }
    : {
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
        overflowY: "auto",
        overflowX: "hidden",
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), padding 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      };

  // On mobile, sidebar is always "expanded" (labels visible)
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <>
      {mobileToggle}
      {mobileOverlay}
      <nav
        aria-label="Subjects"
        style={navStyle}
      >
        {/* Logo / brand + collapse/close toggle */}
        {isMobile ? (
          // Mobile: brand + close button
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
              IBrev.org
            </span>
            <button
              onClick={closeMobile}
              aria-label="Close navigation"
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
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : isCollapsed ? (
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
            <span style={{ marginRight: 6 }}><ChevronsRight size={16} /></span>
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
              IBrev.org
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
            {section.heading && !isCollapsed && (
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
            {section.heading && isCollapsed && (
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
                    height: isMobile ? 44 : 40,
                    borderRadius: 10,
                    paddingLeft: isCollapsed ? 0 : 10,
                    gap: isCollapsed ? 0 : 10,
                    justifyContent: isCollapsed ? "center" : "flex-start",
                    backgroundColor: active ? "var(--bg-input)" : "transparent",
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    border: "none",
                    transition: "all 0.15s ease",
                  }}
                  title={isCollapsed ? s.label : undefined}
                >
                  {/* Icon */}
                  <span style={{ width: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: active ? 1 : 0.55, transition: "opacity 0.15s ease", marginLeft: isCollapsed ? 12 : 0 }}>
                    <s.Icon size={16} color={active ? s.color : "currentColor"} strokeWidth={2} />
                  </span>
                  {/* Label — hidden when collapsed */}
                  {!isCollapsed && s.label}
                  {/* Active indicator bar */}
                  {active && !isCollapsed && (
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
                <a key={s.label} href={s.href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }} onClick={isMobile ? closeMobile : undefined} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {linkContent}
                </a>
              );
            })}
          </div>
        ))}

        <div style={{ flex: 1 }} />

        {/* User footer */}
        {user && clerkUser && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isCollapsed ? 0 : 14,
              justifyContent: isCollapsed ? "center" : "flex-start",
              padding: isCollapsed ? "14px 0" : "14px 10px",
              borderTop: "1px solid var(--bg-input)",
              marginTop: 8,
            }}
          >
            <img
              src={clerkUser.imageUrl}
              alt=""
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                flexShrink: 0,
                marginLeft: isCollapsed ? 12 : 0,
              }}
            />
            {!isCollapsed && (
              <div style={{ minWidth: 0, overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.4,
                  }}
                >
                  {clerkUser.firstName || clerkUser.username || "Student"}
                </div>
                {role && ROLE_LABEL[role] && (
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: ROLE_COLOR[role],
                      lineHeight: 1.4,
                    }}
                  >
                    {ROLE_LABEL[role]}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
