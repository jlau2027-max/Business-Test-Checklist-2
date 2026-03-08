export default function TermsPage() {
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
            Terms of Service
          </h1>
          <div style={{ fontSize: 15, ...text, lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Effective date:</strong> 8 March 2026<br />
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Operated by:</strong> IBrev.org (&ldquo;IBrev&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)<br />
            <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>Contact:</strong>{" "}
            <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>
          </div>
        </div>

        {/* Intro */}
        <p style={{ ...text, marginBottom: 16 }}>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of:
        </p>
        <ol style={{ ...text, paddingLeft: 22, marginBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>the IBrev website at <a href="https://ibrev.org" style={link}>ibrev.org</a> and <a href="https://jasperlaulvl7student.com" style={link}>jasperlaulvl7student.com</a> (the &ldquo;Website&rdquo;), and</li>
          <li>the revision tools, content, and features available through the Website (collectively, the &ldquo;Services&rdquo;).</li>
        </ol>
        <p style={{ ...text, marginBottom: 40 }}>
          By accessing or using the Services, you agree to these Terms. If you do not agree, do not use the Services.
        </p>

        {/* 1 — About */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>1) About the Services</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          IBrev is a free, web-based revision application designed for International Baccalaureate students.
          The Services can be used without creating an account. Optional sign-in is available through{" "}
          <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" style={link}>Clerk</a> using email, Apple, Google,
          or other supported third-party authentication providers.
        </p>

        {/* 2 — Eligibility */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>2) Eligibility</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          You may use the Services only if you can form a legally binding contract in your jurisdiction,
          or if you have the consent of a parent or guardian. IBrev is designed for use by IB students,
          who may include users under the age of 18. If you use the Services on behalf of an organisation,
          you represent that you have authority to bind that organisation.
        </p>

        {/* 3 — Accounts */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>3) Accounts and authentication</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          Creating an account is optional. If you choose to sign in, authentication is handled by Clerk.
          You are responsible for maintaining the security of your authentication credentials and for all
          activity that occurs under your account.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          We are not responsible for any loss or damage arising from unauthorised access to your account
          caused by your failure to safeguard your credentials. You agree to notify us promptly if you
          become aware of any unauthorised use of your account.
        </p>

        {/* 4 — Changes to Services */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>4) Changes to the Services</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          We may change, suspend, or discontinue any part of the Services at any time, including to improve
          performance, maintain security, or comply with law. Where required by law, we will provide notice.
        </p>

        {/* 5 — Permitted use */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>5) Permitted use</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>5.1 General use</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          You may access and use the Services for lawful, personal, and educational purposes in accordance
          with these Terms.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>5.2 Prohibited conduct</h3>
        <p style={{ ...text, marginBottom: 8 }}>You must not:</p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>access or use the Services in a way that violates any law or infringes any rights</li>
          <li>attempt to gain unauthorised access to systems, data, or other users&rsquo; accounts</li>
          <li>interfere with or disrupt the Services or bypass security or access controls</li>
          <li>scrape, crawl, harvest, or use automated means to access the Services, except as permitted by applicable law</li>
          <li>use the Services to distribute malware, spam, or any harmful content</li>
          <li>misrepresent your identity or affiliation when using the Services</li>
        </ul>

        {/* 6 — Your content */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>6) Your content</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>6.1 Ownership</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          You retain ownership of any content you create or upload through the Services, such as notes,
          revision materials, or other user-generated content (&ldquo;Your Content&rdquo;).
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>6.2 Licence to operate</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          By submitting Your Content to the Services, you grant IBrev a limited, non-exclusive, worldwide,
          royalty-free licence to store, process, and display Your Content solely as necessary to provide
          and improve the Services. This licence ends when you delete Your Content or your account.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>6.3 Responsibility</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          You are solely responsible for Your Content and for ensuring it does not violate any applicable
          law or third-party rights.
        </p>

        {/* 7 — Purchases */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>7) Purchases</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          The Services are currently offered free of charge. No payment information is collected. If paid
          features are introduced in the future, these Terms will be updated to reflect the applicable
          payment terms before any charges apply.
        </p>

        {/* 8 — IP */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>8) Intellectual property</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>8.1 Our materials</h3>
        <p style={{ ...text, marginBottom: 12 }}>
          As between you and IBrev, IBrev owns the Services and all associated intellectual property rights,
          including software, UI design, visual assets, text, and other materials provided by IBrev, except
          for Your Content and third-party materials.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          Nothing in these Terms transfers ownership of IBrev&rsquo;s intellectual property to you. All rights
          not expressly granted are reserved.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>8.2 Third-party materials</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          The Services may incorporate third-party libraries, frameworks, or content that are owned by their
          respective licensors. IBrev does not claim ownership of third-party materials.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>8.3 Feedback</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          If you provide feedback or suggestions, you grant IBrev a worldwide, perpetual, irrevocable,
          sublicensable, royalty-free right to use them without compensation, to the extent permitted by law.
        </p>

        {/* 9 — Licence restrictions */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>9) Licence restrictions (to the extent permitted by law)</h2>
        <p style={{ ...text, marginBottom: 8 }}>
          Except as permitted by applicable law, you agree not to, and not to enable others to:
        </p>
        <ul style={{ ...text, paddingLeft: 22, marginBottom: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          <li>copy, modify, translate, or create derivative works of the Services</li>
          <li>reverse engineer, decompile, or disassemble any part of the Services, or attempt to discover source code or underlying ideas (except where such restriction is prohibited by law)</li>
          <li>redistribute, sublicence, or commercially exploit the Services or their content</li>
          <li>remove or alter proprietary notices</li>
          <li>use automated scripts or bots to manipulate, stress, or interfere with the Services</li>
          <li>publish or disclose benchmark or performance test results about the Services without IBrev&rsquo;s prior written consent, to the extent permitted by law</li>
        </ul>

        {/* 10 — Privacy */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>10) Privacy</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          Our <a href="/privacy" style={link}>Privacy Policy</a> explains how the Services handle information.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          Hosting providers (for example, Cloudflare) may process technical request data to deliver the
          Website and provide security features. IBrev does not run advertising trackers and does not
          intentionally set tracking cookies for marketing or behavioural profiling.
        </p>

        {/* 11 — Third-party services */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>11) Third-party services</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          The Services integrate with third-party providers including Clerk (authentication), Cloudflare
          (hosting and security), and third-party sign-in providers such as Google and Apple. Your use of
          these third-party services is subject to their respective terms and privacy policies. IBrev is
          not responsible for the practices of third-party providers.
        </p>

        {/* 12 — Support */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>12) Support</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          Support (if provided) is best-effort only, with no guaranteed response time. You may contact us
          at <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>.
        </p>

        {/* 13 — Disclaimers */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>13) Disclaimers</h2>
        <p style={{ ...text, marginBottom: 12, textTransform: "uppercase", fontSize: 14, lineHeight: 1.8, letterSpacing: "0.01em" }}>
          THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE.&rdquo; TO THE MAXIMUM EXTENT PERMITTED BY LAW,
          IBREV DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
        </p>
        <p style={{ ...text, marginBottom: 12, textTransform: "uppercase", fontSize: 14, lineHeight: 1.8, letterSpacing: "0.01em" }}>
          IBREV DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE
          OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
        <p style={{ ...text, marginBottom: 16, textTransform: "uppercase", fontSize: 14, lineHeight: 1.8, letterSpacing: "0.01em" }}>
          THE SERVICES ARE AN EDUCATIONAL REVISION TOOL. IBREV DOES NOT GUARANTEE ANY PARTICULAR
          ACADEMIC OUTCOME, GRADE, OR EXAMINATION RESULT FROM USE OF THE SERVICES. THE SERVICES ARE
          NOT A SUBSTITUTE FOR PROFESSIONAL ACADEMIC GUIDANCE.
        </p>

        {/* 14 — Limitation of liability */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>14) Limitation of liability</h2>
        <p style={{ ...text, marginBottom: 12, textTransform: "uppercase", fontSize: 14, lineHeight: 1.8, letterSpacing: "0.01em" }}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IBREV WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR
          GOODWILL, ARISING OUT OF OR RELATING TO THE SERVICES OR THESE TERMS, EVEN IF ADVISED OF THE
          POSSIBILITY.
        </p>
        <p style={{ ...text, marginBottom: 12, textTransform: "uppercase", fontSize: 14, lineHeight: 1.8, letterSpacing: "0.01em" }}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IBREV&rsquo;S TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF
          OR RELATING TO THE SERVICES OR THESE TERMS WILL NOT EXCEED SGD 50.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          Some jurisdictions do not allow certain disclaimers or liability limitations. Nothing in these
          Terms limits liability that cannot be limited under applicable law, and your statutory consumer
          rights remain unaffected.
        </p>

        {/* 15 — Indemnity */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>15) Indemnity (where allowed)</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          To the extent permitted by law, you agree to indemnify and hold IBrev harmless from claims
          arising out of your misuse of the Services or your violation of these Terms.
        </p>

        {/* 16 — Termination */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>16) Termination</h2>
        <p style={{ ...text, marginBottom: 12 }}>
          We may suspend or terminate your access to the Services if you materially violate these Terms.
          If you have an account, you may delete it at any time by contacting us at{" "}
          <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>.
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          Upon termination, your right to use the Services ceases. Provisions that by their nature should
          survive termination (including intellectual property, disclaimers, limitation of liability,
          indemnity, and dispute resolution) will continue to apply.
        </p>

        {/* 17 — Notices */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>17) Notices and electronic communications</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          You agree that IBrev may provide notices to you by posting them on the Website or by replying to
          an email you send to <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a>. Notices
          are effective when posted (or when sent, if by email reply). You are responsible for keeping your
          own contact information current when communicating with us.
        </p>

        {/* 18 — Governing law */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>18) Governing law</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          These Terms are governed by the laws of Singapore, excluding conflict of laws rules, subject to
          any mandatory consumer protection laws that apply in your jurisdiction.
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border, #ddd)", margin: "40px 0" }} />

        {/* 19 — Dispute resolution */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>19) Dispute resolution and arbitration (Singapore)</h2>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.1 Agreement to arbitrate</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          Any dispute, claim, or controversy arising out of or relating to these Terms or the Services
          (including any question regarding the existence, validity, interpretation, performance, breach,
          termination, or enforceability of these Terms) shall be referred to and finally resolved by
          arbitration in Singapore, except as expressly provided below.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.2 Opt-out right (14 days)</h3>
        <p style={{ ...text, marginBottom: 12 }}>
          You may opt out of this arbitration agreement by sending an email to{" "}
          <a href="mailto:legal@ibrev.org" style={link}>legal@ibrev.org</a> within <strong>14 days</strong>{" "}
          of your first use of the Services (the &ldquo;Opt-Out Deadline&rdquo;).
        </p>
        <p style={{ ...text, marginBottom: 12 }}>
          Your email must include: (i) your name, (ii) a statement that you are opting out of arbitration,
          and (iii) enough information for us to match your request to your use (for example, the email
          address associated with your account, and the approximate date you first used the Services).
        </p>
        <p style={{ ...text, marginBottom: 16 }}>
          If you opt out, disputes will be resolved in the courts of Singapore unless mandatory law in
          your jurisdiction provides otherwise.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.3 Rules</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          The arbitration shall be conducted under arbitration rules selected by IBrev in IBrev&rsquo;s sole
          and absolute discretion (the &ldquo;Selected Rules&rdquo;), as notified in writing to the other party at
          the time IBrev commences arbitration.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.4 Sole arbitrator selected by IBrev</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          The dispute shall be decided by a sole arbitrator selected and appointed by IBrev in IBrev&rsquo;s
          sole and absolute discretion, and the other party irrevocably consents to that selection and
          appointment.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.5 Backstop if unilateral selection is unenforceable</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          If any part of the foregoing provisions regarding selection of rules and/or appointment of the
          arbitrator is held to be invalid, unenforceable, or not permitted under applicable law, then:
          (a) the arbitration shall instead be administered by the Singapore International Arbitration
          Centre (&ldquo;SIAC&rdquo;) under the SIAC Rules in force when arbitration is commenced, and (b) the
          arbitrator shall be appointed by SIAC, while all other provisions of this arbitration agreement
          remain in effect.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.6 Seat and language</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          The seat (legal place) of arbitration shall be Singapore. The language shall be English.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.7 Binding outcome and confidentiality</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          The arbitrator&rsquo;s award shall be final and binding on the parties, and judgment on the award may
          be entered in any court of competent jurisdiction. The arbitration, including the existence of
          the arbitration, all submissions, evidence, and any award, shall be confidential to the maximum
          extent permitted by law, except as required for enforcement of an award or as otherwise required
          by law.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.8 Injunctive and protective relief</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          Notwithstanding the foregoing, IBrev may seek urgent interim, protective, or injunctive relief
          (including to prevent or stop unauthorised use, scraping, distribution, or infringement of IBrev
          intellectual property) in the courts of Singapore, and doing so will not be deemed incompatible
          with or a waiver of this arbitration agreement.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 20, marginBottom: 8 }}>19.9 Time limit</h3>
        <p style={{ ...text, marginBottom: 16 }}>
          To the extent permitted by law, any claim must be brought within one (1) year after the claim
          arose, or it is permanently barred.
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border, #ddd)", margin: "40px 0" }} />

        {/* 20 — Changes to Terms */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 0, marginBottom: 12 }}>20) Changes to these Terms</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          IBrev may update these Terms from time to time by posting a revised version on the Website and
          updating the effective date above. Continued access to or use of the Services after changes
          become effective constitutes acceptance of the revised Terms, to the extent permitted by law.
        </p>

        {/* 21 — Severability */}
        <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 36, marginBottom: 12 }}>21) Severability</h2>
        <p style={{ ...text, marginBottom: 16 }}>
          If any provision of these Terms is held invalid or unenforceable, that provision will be enforced
          to the maximum extent permissible, and the remaining provisions will remain in full force and
          effect.
        </p>

        {/* Footer */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border, #ddd)", fontSize: 14, ...text, textAlign: "center" }}>
          &copy; 2026 IBrev.org
        </div>
      </div>
    </div>
  );
}
