import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Show, SignInButton } from "@clerk/react";
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
        {/* Hero */}
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center" style={{ paddingTop: 0, paddingBottom: 120 }}>
          {/* ASCII art title */}
          <div style={{ position: "relative", width: "280%", maxWidth: "2400px", height: "clamp(450px, 65vw, 800px)", marginBottom: -20 }}>
            <ASCIIText
              text="ib rev"
              enableWaves={false}
              asciiFontSize={8}
              textFontSize={200}
              textColor="#fdf9f3"
              planeBaseHeight={10}
            />
          </div>
          <div className="flex justify-center" style={{ marginBottom: 28 }}>
            <Show when="signed-out">
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
                    paddingLeft: 28,
                    paddingRight: 28,
                  }}
                >
                  Sign In
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <a href="/business" style={{ textDecoration: "none" }}>
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
                    paddingLeft: 28,
                    paddingRight: 28,
                  }}
                >
                  Go to Material
                </Button>
              </a>
            </Show>
          </div>

          <div style={{ marginBottom: 64 }} />

          {/* Subject buttons */}
          {(() => {
            const subjects = [
              { label: "Business", href: "/business/checklist", color: "#7BA3B5", subtitle: "Finance Unit" },
              { label: "History", href: "/history/specimen", color: "#D4A572", subtitle: "Paper 2 & 3" },
              { label: "Biology", href: "/biology/checklist", color: "#5BA88C", subtitle: "Unit 3 & 4" },
              { label: "Chemistry", href: "/chemistry/checklist", color: "#8B5CF6", subtitle: "Work in Progress" },
              { label: "Physics", href: "/physics/checklist", color: "#F59E0B", subtitle: "Work in Progress" },
              { label: "Sports Science", href: "/sports-science/checklist", color: "#EF4444", subtitle: "Work in Progress" },
              { label: "Economics", href: "/economics/checklist", color: "#06B6D4", subtitle: "Work in Progress" },
            ];
            return (
              <div
                className="w-full"
                style={{
                  maxWidth: 900,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                }}
              >
                {subjects.map((s) => (
                  <a key={s.label} href={s.href} style={{ textDecoration: "none" }}>
                    <Button
                      render={(props) => <button {...props} />}
                      size="lg"
                      className="rounded-full w-full font-semibold"
                      style={{
                        fontFamily: "'JSans', sans-serif",
                        height: 56,
                        background: `${s.color}20`,
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: `1px solid ${s.color}40`,
                        color: "rgba(255,255,255,0.9)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        padding: "8px 12px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${s.color}35`;
                        e.currentTarget.style.borderColor = `${s.color}70`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${s.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${s.color}20`;
                        e.currentTarget.style.borderColor = `${s.color}40`;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <span style={{ fontSize: 14, letterSpacing: -0.3, lineHeight: 1.2 }}>{s.label}</span>
                      <span style={{ fontSize: 9, fontWeight: 400, textTransform: "uppercase", letterSpacing: 0.8, opacity: 0.5, lineHeight: 1 }}>
                        {s.subtitle}
                      </span>
                    </Button>
                  </a>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
