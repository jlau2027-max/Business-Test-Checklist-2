import { useState, useEffect } from "react";
import { Show, SignInButton } from "@clerk/react";
import Grainient from "./components/Grainient.jsx";
import RotatingText from "./components/RotatingText.jsx";
import CardNav from "./components/CardNav.jsx";

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
        <div className="mx-auto px-4 flex flex-col items-center" style={{ maxWidth: 1400, paddingTop: 0, paddingBottom: 120 }}>
          {/* Title */}
          <h1 style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            fontWeight: 800,
            letterSpacing: -1.5,
            color: "#fdf9f3",
            textAlign: "center",
            marginTop: "clamp(72px, 12vw, 140px)",
            marginBottom: 12,
            lineHeight: 1,
          }}>
            IB Revision
          </h1>
          <p style={{
            fontSize: "clamp(20px, 3vw, 30px)",
            fontWeight: 500,
            color: "rgba(253,249,243,0.6)",
            textAlign: "center",
            marginBottom: 28,
            lineHeight: 1.4,
            display: "flex",
            alignItems: "center",
            gap: 8,
            overflow: "hidden",
          }}>
            Revision for{" "}
            <RotatingText
              texts={["Business", "History", "Economics", "Biology", "Chemistry", "Physics", "Sports Sci"]}
              rotationInterval={2000}
              staggerDuration={0.02}
              staggerFrom="first"
              splitBy="characters"
              mainClassName=""
              style={{ color: "rgba(253,249,243,0.85)", fontWeight: 700 }}
            />
          </p>
          {/* Subject groups — CardNav */}
          <CardNav
            logoText="IB Subjects"
            items={[
              {
                label: "Individuals & Societies",
                bgColor: "rgba(255,255,255,0.08)",
                textColor: "#fdf9f3",
                links: [
                  { label: "Business", href: "/business/checklist", ariaLabel: "Business revision" },
                  { label: "History", href: "/history/specimen", ariaLabel: "History revision" },
                  { label: "Economics", href: "/economics/checklist", ariaLabel: "Economics revision" },
                ],
              },
              {
                label: "Sciences",
                bgColor: "rgba(255,255,255,0.08)",
                textColor: "#fdf9f3",
                links: [
                  { label: "Biology", href: "/biology/checklist", ariaLabel: "Biology revision" },
                  { label: "Chemistry", href: "/chemistry/checklist", ariaLabel: "Chemistry revision" },
                  { label: "Physics", href: "/physics/checklist", ariaLabel: "Physics revision" },
                  { label: "Sports Sci", href: "/sports-science/checklist", ariaLabel: "Sports Science revision" },
                ],
              },
              {
                label: "Other",
                bgColor: "rgba(255,255,255,0.08)",
                textColor: "#fdf9f3",
                links: [
                  { label: "Admin", href: "/admin", ariaLabel: "Admin panel" },
                ],
              },
            ]}
            baseColor="rgba(255,255,255,0.06)"
            menuColor="rgba(253,249,243,0.85)"
            buttonBgColor="rgba(255,255,255,0.12)"
            buttonTextColor="rgba(255,255,255,0.85)"
            ctaContent={
              <>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      style={{
                        fontFamily: "'JSans', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        color: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "calc(0.75rem - 0.35rem)",
                        padding: "0 1rem",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <a href="/business" style={{ textDecoration: "none", height: "100%" }}>
                    <button
                      type="button"
                      style={{
                        fontFamily: "'JSans', sans-serif",
                        fontSize: 14,
                        fontWeight: 500,
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        color: "rgba(255,255,255,0.85)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "calc(0.75rem - 0.35rem)",
                        padding: "0 1rem",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      Go to Material
                    </button>
                  </a>
                </Show>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
