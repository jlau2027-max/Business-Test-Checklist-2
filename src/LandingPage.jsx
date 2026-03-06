import { Button } from "@heroui/react";
import { Show, SignInButton, SignUpButton } from "@clerk/react";
import LoginButton from "./LoginButton.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", fontFamily: "'JSans', sans-serif", color: "var(--text-primary)" }}>
      {/* Header */}
      <div
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "var(--bg-header)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-header)",
        }}
      >
        <div className="max-w-4xl mx-auto py-2 px-4">
          <div className="flex items-center justify-center" style={{ position: "relative" }}>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
              style={{ letterSpacing: 2, backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              IB Revision Hub
            </span>
            <LoginButton />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-xl mx-auto px-4" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <span
          className="text-center block font-extrabold text-[var(--text-primary)] mb-1"
          style={{ fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: -1 }}
        >
          IB Revision Hub
        </span>
        <span className="text-center block text-base text-[var(--text-secondary)] mx-auto" style={{ marginBottom: 40, maxWidth: 420 }}>
          Flashcards, MCQs, written practice with AI grading, and more — built for IB students.
        </span>

        {/* Auth prompt for signed-out users */}
        <Show when="signed-out">
          <div className="flex items-center justify-center gap-2" style={{ marginBottom: 48 }}>
            <SignInButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                className="rounded-full bg-[#7C6FFF] text-white border-none text-[15px] font-semibold"
                style={{ fontFamily: "'JSans', sans-serif" }}
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                variant="outline"
                className="rounded-full bg-transparent text-[#A78BFA] border border-[var(--border)] text-[15px] font-semibold"
                style={{ fontFamily: "'JSans', sans-serif" }}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div style={{ marginBottom: 48 }} />
        </Show>

        {/* Subject cards */}
        <div className="flex gap-4 grow">
          <a
            href="/business/checklist"
            className="bg-[var(--bg-card)] rounded-lg p-6 flex-1"
            style={{
              border: "1px solid var(--border)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C6FFF"; e.currentTarget.style.boxShadow = "0 0 20px #7C6FFF22"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <span
              className="text-xs px-1.5 py-0.5 rounded-full mb-2 inline-block"
              style={{ backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              HL
            </span>
            <span className="font-bold text-lg text-[var(--text-primary)] block" style={{ marginBottom: 4 }}>
              Business Management
            </span>
            <span className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.5 }}>
              Finance unit — checklist, flashcards, MCQs, written practice & specimen papers
            </span>
          </a>

          <a
            href="/history/specimen"
            className="bg-[var(--bg-card)] rounded-lg p-6 flex-1"
            style={{
              border: "1px solid var(--border)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#F87171"; e.currentTarget.style.boxShadow = "0 0 20px #F8717122"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <span
              className="text-xs px-1.5 py-0.5 rounded-full mb-2 inline-block"
              style={{ backgroundColor: "#F8717118", color: "#F87171", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              HL / SL
            </span>
            <span className="font-bold text-lg text-[var(--text-primary)] block" style={{ marginBottom: 4 }}>
              History
            </span>
            <span className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.5 }}>
              Paper 2 & Paper 3 specimen questions with AI-powered grading
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
