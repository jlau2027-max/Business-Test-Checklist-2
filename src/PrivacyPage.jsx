export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'JSans', sans-serif",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a
          href="/"
          style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            textDecoration: "none",
            marginBottom: 32,
            display: "inline-block",
          }}
        >
          &larr; Back to Home
        </a>

        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, marginBottom: 8, lineHeight: 1.1 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 40 }}>
          Last updated: March 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 16, lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Overview</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              IB Revision is a study tool for International Baccalaureate students. We take your privacy seriously and collect only the minimum data necessary to provide the service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Data We Collect</h2>
            <ul style={{ color: "var(--text-secondary)", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong>Account information</strong> — email address and name, provided via Clerk authentication.</li>
              <li><strong>Usage data</strong> — checklist progress and flashcard state, stored locally in your browser (localStorage).</li>
              <li><strong>Analytics</strong> — anonymous page views. No personal identifiers are tracked.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>How We Use Your Data</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Your account information is used solely for authentication. Study progress is stored in your browser and is not transmitted to our servers. We do not sell, share, or monetise your personal data.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Third-Party Services</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              We use Clerk for authentication and Vercel for hosting. Each service has its own privacy policy. No other third-party services have access to your data.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Contact</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              If you have questions about this policy, please reach out via the contact details on our homepage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
