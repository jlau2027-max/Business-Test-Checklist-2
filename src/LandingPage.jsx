import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Show, SignInButton } from "@clerk/react";
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
          <div className="flex flex-col sm:flex-row gap-8 w-full" style={{ maxWidth: 780 }}>
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

            <a href="/biology/checklist" className="flex-1" style={{ textDecoration: "none" }}>
              <ElectricBorder
                color="#5BA88C"
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
                    Biology
                  </span>
                  <span
                    className="block"
                    style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,0.4)" }}
                  >
                    Paper 1 & 2
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
