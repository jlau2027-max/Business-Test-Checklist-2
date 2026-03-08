export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 40 }}>
          Last updated: March 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 16, lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Acceptance</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              By accessing IB Revision you agree to these terms. If you do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Use of the Service</h2>
            <ul style={{ color: "var(--text-secondary)", paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>IB Revision is provided as a free study aid for IB students.</li>
              <li>Content is intended for educational purposes only and does not replace official IBO materials.</li>
              <li>You may not reproduce, redistribute, or commercially exploit the content without permission.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Accounts</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              You are responsible for maintaining the security of your account. We reserve the right to suspend accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Disclaimer</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              The service is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any study material. IB Revision is not affiliated with the International Baccalaureate Organization.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Changes</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
