/**
 * Floating donate/support heart button — fixed bottom-right corner.
 *
 * This component was duplicated across 5 pages; now it lives here once.
 */
export default function SupportButton() {
  return (
    <a
      href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Support us"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 999,
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 14px rgba(124,111,255,0.4)",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)";
        const p = e.currentTarget.querySelector("path");
        if (p) p.style.fill = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)";
        const p = e.currentTarget.querySelector("path");
        if (p) p.style.fill = "none";
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          style={{ transition: "fill 0.25s ease" }}
        />
      </svg>
    </a>
  );
}
