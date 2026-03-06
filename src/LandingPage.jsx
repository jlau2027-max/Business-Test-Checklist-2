import { Button } from "@heroui/react";
import { Show, SignInButton, SignUpButton } from "@clerk/react";
import LoginButton from "./LoginButton.jsx";
import AnimatedShinyButton from "./components/AnimatedShinyButton.jsx";

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
              style={{ letterSpacing: 2, backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              IB Revision Hub
            </span>
            <LoginButton />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-xl mx-auto px-4 flex flex-col items-center" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <span
          className="text-center block font-extrabold text-[var(--text-primary)] mb-1"
          style={{ fontSize: "clamp(28px, 5vw, 40px)", letterSpacing: -1 }}
        >
          IB Revision Hub
        </span>
        <span className="text-center block text-base text-[var(--text-secondary)] mx-auto" style={{ marginBottom: 24, maxWidth: 420 }}>
          Flashcards, MCQs, written practice with AI grading, and more — built for IB students.
        </span>

        {/* Auth prompt for signed-out users */}
        <Show when="signed-out">
          <div className="flex items-center justify-center gap-2" style={{ marginBottom: 56 }}>
            <SignInButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                className="rounded-full bg-[var(--accent)] text-white border-none text-[15px] font-semibold"
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
                className="rounded-full bg-transparent text-[var(--accent)] border border-[var(--border)] text-[15px] font-semibold"
                style={{ fontFamily: "'JSans', sans-serif" }}
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div style={{ marginBottom: 56 }} />
        </Show>

        {/* Subject buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full" style={{ maxWidth: 480 }}>
          <AnimatedShinyButton
            url="/business/checklist"
            className="flex-1"
            shimmerColor="var(--accent-glow)"
            style={{ width: "100%" }}
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-[var(--text-primary)]" style={{ letterSpacing: -0.5 }}>
                Business
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-medium uppercase" style={{ letterSpacing: 1 }}>
                Finance Unit
              </span>
            </span>
          </AnimatedShinyButton>

          <AnimatedShinyButton
            url="/history/specimen"
            className="flex-1"
            shimmerColor="var(--accent-tertiary-soft)"
            style={{ width: "100%" }}
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-[var(--text-primary)]" style={{ letterSpacing: -0.5 }}>
                History
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-medium uppercase" style={{ letterSpacing: 1 }}>
                Paper 2 & 3
              </span>
            </span>
          </AnimatedShinyButton>
        </div>
      </div>
    </div>
  );
}
