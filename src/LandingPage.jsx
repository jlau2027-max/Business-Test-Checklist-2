import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Show, SignInButton } from "@clerk/react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
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

  // ─── Splash preloader (first visit per session only) ────────────────────────
  const [showSplash, setShowSplash] = useState(true);
  const overlayRef = useRef(null);
  const splashTextRef = useRef(null);

  useLayoutEffect(() => {
    if (!showSplash) return;
    const overlay = overlayRef.current;
    const text = splashTextRef.current;
    if (!overlay || !text) return;

    gsap.set(text, { scale: 0.5, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => setShowSplash(false),
    });

    tl.to(text, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
      .to(text, { scale: 1.8, duration: 0.8, ease: "power2.in" }, "+=0.3")
      .to(overlay, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.3");

    return () => tl.kill();
  }, [showSplash]);

  return (
    <div className="min-h-screen relative" style={{ fontFamily: "'JSans', sans-serif", color: "#F0EEE8" }}>
      {/* Splash preloader overlay */}
      {showSplash && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: isDark ? "#0D1520" : "#5A8494",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            ref={splashTextRef}
            style={{
              fontSize: "clamp(48px, 12vw, 120px)",
              fontWeight: 800,
              color: "#fdf9f3",
              letterSpacing: -2,
              userSelect: "none",
            }}
          >
            IBrev.org
          </span>
        </div>
      )}

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

      {/* Content layer — vertically centered */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Hero */}
        <div className="mx-auto px-4 flex flex-col items-center" style={{ maxWidth: 1400, width: "100%" }}>
          {/* Title */}
          <h1 style={{
            fontSize: "clamp(52px, 10vw, 96px)",
            fontWeight: 800,
            letterSpacing: -1.5,
            color: "#fdf9f3",
            textAlign: "center",
            marginBottom: 12,
            lineHeight: 1,
          }}>
            IBrev.org
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
            Free revision for{" "}
            <RotatingText
              texts={["IB Business", "IB History", "IB Economics", "IB Biology", "IB Chemistry", "IB Physics", "IB Sports Sci", "IB Spanish"]}
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
                label: "Language Acquisition",
                bgColor: "#f0ece3",
                textColor: "#1a1a1a",
                links: [
                  { label: "Spanish", href: "/spanish/checklist", ariaLabel: "Spanish revision" },
                ],
              },
              {
                label: "Individuals & Societies",
                bgColor: "#e8eff3",
                textColor: "#1a1a1a",
                links: [
                  { label: "Business", href: "/business/checklist", ariaLabel: "Business revision" },
                  { label: "History", href: "/history/checklist", ariaLabel: "History revision" },
                  { label: "Economics", href: "/economics/checklist", ariaLabel: "Economics revision" },
                  { label: "ESS", href: "/ess/checklist", ariaLabel: "ESS revision" },
                ],
              },
              {
                label: "Sciences",
                bgColor: "#e6f0ec",
                textColor: "#1a1a1a",
                links: [
                  { label: "Biology", href: "/biology/checklist", ariaLabel: "Biology revision" },
                  { label: "Chemistry", href: "/chemistry/checklist", ariaLabel: "Chemistry revision" },
                  { label: "Physics", href: "/physics/checklist", ariaLabel: "Physics revision" },
                  { label: "Sports Sci", href: "/sports-science/checklist", ariaLabel: "Sports Science revision" },
                ],
              },
              {
                label: "Other",
                bgColor: "#f0ede8",
                textColor: "#1a1a1a",
                extraContent: (
                  <Show when="signed-in">
                    <a className="nav-card-link" href="/dashboard" aria-label="Dashboard">
                      <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                      Dashboard
                    </a>
                  </Show>
                ),
                links: [
                  { label: "Privacy", href: "/privacy", ariaLabel: "Privacy policy" },
                  { label: "Terms", href: "/terms", ariaLabel: "Terms of service" },
                  { label: "Feedback", href: "/feedback", ariaLabel: "Feedback form" },
                ],
              },
            ]}
            baseColor="#fff"
            menuColor="#1a1a1a"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ctaContent={
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    type="button"
                    style={{
                      fontFamily: "'JSans', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      background: "#111",
                      color: "#fff",
                      border: "none",
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
            }
          />
        </div>
      </div>
    </div>
  );
}
