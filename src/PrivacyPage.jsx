export default function PrivacyPage() {
  const text = { color: "var(--text-secondary)" };
  const link = { color: "#2c5f8a", textDecoration: "none" };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'JSans', sans-serif",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding: "48px 24px 80px",
        lineHeight: 1.7,
        fontSize: 16,
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ fontSize: 14, ...text, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          &larr; Back to Home
        </a>

        {/* Meta header */}
        <div style={{ marginBottom: 40, paddingBottom: 32, borderBottom: "1px solid var(--border, #ddd)" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#2c5f8a", fontWeight: 600, marginBottom: 8 }}>
            Legal
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 38px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            Privacy Policy
          </h1>
          <div style={{ fontSize: 15, ...text, lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Effective date:</strong> 8 March 2026<br />
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Entity:</strong> IBrev.org (&ldquo;IBrev&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)<br />
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Support contact:</strong>{" "}
            <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>
          </div>
        </div>

        {/* Intro */}
        <p style={{ ...text, marginBottom: 16 }}>
          IBrev is a web-based revision application for International Baccalaureate students, hosted at{" "}
          <a href="https://ibrev.org" style={link}>ibrev.org</a> and <a href="https://jasperlaulvl7student.com" style={link}>jasperlaulvl7student.com</a>. The app can be used
          without an account. Optional sign-in is provided through Clerk and supports email, Apple, Google,
          and other third-party authentication providers.
        </p>
        <p style={{ ...text, marginBottom: 40 }}>
          This Privacy Policy explains how IBrev handles information when you use the site.
        </p>

        {/* 1 — Summary */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>1) Summary</h2>
        <div style={{ background: "var(--bg-secondary, #f5f7f9)", borderLeft: "3px solid #2c5f8a", padding: "16px 20px", borderRadius: "0 6px 6px 0", marginBottom: 24 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 15 }}>
            <li><strong>No accounts required.</strong> IBrev can be used without signing in.</li>
            <li><strong>No analytics or tracking.</strong> We do not run analytics, profiling, or cross-site tracking.</li>
            <li><strong>No advertising.</strong> IBrev does not serve ads or share data with advertisers.</li>
            <li><strong>Authentication is optional.</strong> If you choose to sign in, authentication is handled by Clerk. We do not store your password.</li>
            <li><strong>Minimal data.</strong> We only process information necessary to provide the revision features you use.</li>
            <li><strong>Free to use.</strong> IBrev does not collect payment information.</li>
          </ul>
        </div>

        {/* 2 — Information we collect */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>2) Information we collect and where it is stored</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>A) Without an account (local storage)</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          If you use IBrev without signing in, any revision data, preferences, or progress you create is
          stored <strong>locally in your browser</strong> using standard web storage mechanisms. This data
          does not leave your device and is not transmitted to our servers.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>B) With an account (Clerk authentication)</h3>
        <p style={{ ...text, marginBottom: 8 }}>
          If you choose to create an account or sign in, authentication is handled by{" "}
          <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" style={link}>Clerk</a>, a third-party
          authentication provider. When you sign in, Clerk may collect and process:
        </p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>Your email address</li>
          <li>Your name and profile photo (if provided by a third-party sign-in provider such as Google or Apple)</li>
          <li>Authentication tokens and session identifiers</li>
        </ul>
        <p style={{ ...text, marginBottom: 16 }}>
          This information is processed by Clerk under its own{" "}
          <a href="https://clerk.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={link}>Privacy Policy</a>.
          We receive limited profile information from Clerk (such as your display name and email) to
          identify your account within the app.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>C) Revision data (cloud-stored for signed-in users)</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          If you are signed in, your revision content, progress, and preferences may be stored in our
          cloud infrastructure hosted on <strong>Cloudflare</strong> so that your data can be synchronised
          across devices. This data is associated with your account and is not shared with third parties.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>D) Hosting and infrastructure</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          IBrev is hosted on <strong>Cloudflare</strong>. When you visit the site, Cloudflare may
          automatically process certain technical information such as your IP address, browser type, and
          request metadata as part of standard web delivery and security. Cloudflare&rsquo;s handling of this
          data is governed by{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={link}>Cloudflare&rsquo;s Privacy Policy</a>.
        </p>

        {/* 3 — Not collected */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>3) Information we do not collect</h2>
        <p style={{ ...text, marginBottom: 8 }}>IBrev does <strong>not</strong> collect or transmit:</p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>Analytics events, telemetry, or usage profiling</li>
          <li>Advertising identifiers or tracking data</li>
          <li>Payment or financial information</li>
          <li>Location data</li>
          <li>Contacts, photos, camera, or microphone access</li>
          <li>Crash reports sent to IBrev</li>
        </ul>

        {/* 4 — Third-party services */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>4) Third-party services</h2>
        <p style={{ ...text, marginBottom: 8 }}>
          IBrev relies on the following third-party services to operate. Each service processes data under
          its own privacy policy:
        </p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <li><strong>Clerk</strong> — authentication and account management. <a href="https://clerk.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={link}>Clerk Privacy Policy</a></li>
          <li><strong>Cloudflare</strong> — hosting, content delivery, and security. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" style={link}>Cloudflare Privacy Policy</a></li>
          <li><strong>Google</strong> — if you choose to sign in with Google. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={link}>Google Privacy Policy</a></li>
          <li><strong>Apple</strong> — if you choose to sign in with Apple. <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" style={link}>Apple Privacy Policy</a></li>
        </ul>
        <p style={{ ...text, marginBottom: 16 }}>
          We do not sell, rent, or share your data with any other third parties for advertising or marketing purposes.
        </p>

        {/* 5 — Cookies */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>5) Cookies and local storage</h2>
        <p style={{ ...text, marginBottom: 8 }}>
          IBrev uses <strong>essential cookies and browser local storage</strong> only to operate the site. These include:
        </p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <li><strong>Authentication cookies</strong> — set by Clerk to keep you signed in across page loads.</li>
          <li><strong>Local storage</strong> — used to store your revision data and preferences on your device.</li>
        </ul>
        <p style={{ ...text, marginBottom: 16 }}>
          IBrev does not use advertising cookies, tracking pixels, or third-party analytics cookies.
        </p>

        {/* 6 — Sharing */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>6) Sharing and disclosure</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          Because IBrev does not collect analytics or advertising data, we do not share your personal data
          with third parties for marketing purposes.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          We may disclose information only if required to comply with applicable law or a valid legal
          process, to the extent we are able to do so based on information in our possession.
        </p>

        {/* 7 — Retention */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>7) Data retention and deletion</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          <strong>Local data (no account):</strong> Data stored in your browser remains until you clear it
          through your browser settings or the app&rsquo;s own controls.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          <strong>Account data:</strong> If you have an account, your revision data is retained while your
          account is active. You may request deletion of your account and associated data by contacting us
          at <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>. Upon deletion, we will
          remove your data from our cloud infrastructure within a reasonable timeframe. Clerk may retain
          certain authentication records in accordance with its own retention policies.
        </p>

        {/* 8 — Security */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>8) Security</h2>
        <p style={{ ...text, marginBottom: 8 }}>We take reasonable measures to protect your data, including:</p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>HTTPS encryption for all connections to the site</li>
          <li>Cloudflare&rsquo;s built-in DDoS protection and security features</li>
          <li>Clerk&rsquo;s secure authentication infrastructure for account management</li>
        </ul>
        <p style={{ ...text, marginBottom: 16 }}>
          No method of transmission or storage is completely secure. While we strive to protect your
          information, we cannot guarantee absolute security.
        </p>

        {/* 9 — Children */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>9) Children</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          IBrev is a revision tool designed for International Baccalaureate students, who may include users
          under the age of 18. The app is designed to collect minimal personal data. If you sign in, only
          basic account information is processed as described above.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          We do not knowingly collect personal information beyond what is necessary for the app to function.
          If you are a parent or guardian and believe your child has provided personal information that
          concerns you, please contact us at{" "}
          <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>.
        </p>

        {/* 10 — International */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>10) International users</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          IBrev is available globally. Our infrastructure is hosted on Cloudflare&rsquo;s global network, which
          means your data may be processed in the country where you access the site or in other
          jurisdictions where Cloudflare operates. Authentication data is processed by Clerk, which
          operates primarily in the United States.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          By using IBrev, you acknowledge that your information may be transferred to and processed in
          jurisdictions outside your country of residence, which may have different data protection laws.
        </p>

        {/* 11 — Changes */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>11) Changes to this Privacy Policy</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          We may update this Privacy Policy from time to time. We will update the effective date at the top
          of this page. If changes are material, we will take reasonable steps to notify you, for example
          through a notice on the site.
        </p>

        {/* 12 — Contact */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>12) Contact</h2>
        <p style={{ ...text, marginBottom: 8 }}>Questions or requests:</p>
        <p style={{ marginBottom: 16 }}>
          <strong><a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a></strong>
        </p>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border, #ddd)", fontSize: 14, ...text, textAlign: "center" }}>
          &copy; 2026 IBrev.org
        </div>
      </div>
    </div>
  );
}
