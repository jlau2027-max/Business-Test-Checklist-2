import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Show, SignInButton, SignUpButton } from "@clerk/react";
import LoginButton from "./LoginButton.jsx";
import ElectricBorder from "./components/ElectricBorder.jsx";
import Grainient from "./components/Grainient.jsx";
import ASCIIText from "./components/ASCIIText.jsx";

export default function LandingPage() {
  // Reactive theme detection — re-renders when .dark class toggles
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'JSans', sans-serif", color: "#F0EEE8" }}>
      {/* Grainient full-page background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Grainient
          color1={isDark ? "#1A2E3A" : "#7BA3B5"}
          color2={isDark ? "#0D1520" : "#4F6A74"}
          color3={isDark ? "#2A1E14" : "#D4A572"}
          timeSpeed={0.15}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={4}
          warpSpeed={1.5}
          warpAmplitude={60}
          blendAngle={0}
          blendSoftness={0.08}
          rotationAmount={400}
          noiseScale={2}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={isDark ? 1.4 : 1.3}
          gamma={1}
          saturation={isDark ? 0.9 : 0.85}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* Content layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Minimal header — just the login button */}
        <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
          <div className="max-w-4xl mx-auto py-3 px-4">
            <div className="flex items-center justify-end">
              <LoginButton />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center" style={{ paddingTop: 100, paddingBottom: 120 }}>
          {/* ASCII art title */}
          <div style={{ position: "relative", width: "110%", maxWidth: "900px", height: "clamp(200px, 30vw, 380px)", marginBottom: 8 }}>
            <ASCIIText
              text="IB Revision Hub"
              enableWaves={false}
              asciiFontSize={8}
              textFontSize={200}
              textColor="#fdf9f3"
              planeBaseHeight={10}
            />
          </div>
          <p
            className="text-center mx-auto"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              maxWidth: 440,
              marginBottom: 28,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
            }}
          >
            Flashcards, MCQs, written practice with AI grading, and more — built for IB students.
          </p>

          {/* Auth prompt for signed-out users */}
          <Show when="signed-out">
            <div className="flex items-center justify-center gap-3" style={{ marginBottom: 64 }}>
              <SignInButton mode="modal">
                <Button
                  render={(props) => <button {...props} />}
                  size="md"
                  className="rounded-full border-none text-[15px] font-semibold"
                  style={{
                    fontFamily: "'JSans', sans-serif",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.9)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  render={(props) => <button {...props} />}
                  size="md"
                  className="rounded-full border-none text-[15px] font-semibold"
                  style={{
                    fontFamily: "'JSans', sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <div style={{ marginBottom: 64 }} />
          </Show>

          {/* Subject buttons */}
          <div className="flex flex-col sm:flex-row gap-8 w-full" style={{ maxWidth: 520 }}>
            <a href="/business/checklist" className="flex-1" style={{ textDecoration: "none" }}>
              <ElectricBorder
                color="#7BA3B5"
                speed={1}
                chaos={0.12}
                borderRadius={16}
                style={{ borderRadius: 16, cursor: "pointer" }}
              >
                <div
                  style={{
                    padding: "28px 24px",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: 16,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="block font-bold"
                    style={{ fontSize: 20, letterSpacing: -0.5, marginBottom: 4, color: "rgba(255,255,255,0.92)" }}
                  >
                    Business
                  </span>
                  <span
                    className="block"
                    style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)" }}
                  >
                    Finance Unit
                  </span>
                </div>
              </ElectricBorder>
            </a>

            <a href="/history/specimen" className="flex-1" style={{ textDecoration: "none" }}>
              <ElectricBorder
                color="#D4A572"
                speed={1}
                chaos={0.12}
                borderRadius={16}
                style={{ borderRadius: 16, cursor: "pointer" }}
              >
                <div
                  style={{
                    padding: "28px 24px",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: 16,
                    textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="block font-bold"
                    style={{ fontSize: 20, letterSpacing: -0.5, marginBottom: 4, color: "rgba(255,255,255,0.92)" }}
                  >
                    History
                  </span>
                  <span
                    className="block"
                    style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)" }}
                  >
                    Paper 2 & 3
                  </span>
                </div>
              </ElectricBorder>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
