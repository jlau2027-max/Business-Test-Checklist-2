import { useState, useEffect } from "react";
import Grainient from "./components/Grainient.jsx";
import ASCIIText from "./components/ASCIIText.jsx";

export default function NotFoundPage() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: "'JSans', sans-serif" }}>
      {/* Grainient background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Grainient
          color1={isDark ? "#1A2E3A" : "#7BA3B5"}
          color2={isDark ? "#0D1520" : "#4F6A74"}
          color3={isDark ? "#2A1E14" : "#D4A572"}
          timeSpeed={0.15} colorBalance={0} warpStrength={1} warpFrequency={4}
          warpSpeed={1.5} warpAmplitude={60} blendAngle={0} blendSoftness={0.08}
          rotationAmount={400} noiseScale={2} grainAmount={0.08} grainScale={2}
          grainAnimated={false} contrast={isDark ? 1.4 : 1.3} gamma={1}
          saturation={isDark ? 0.9 : 0.85} centerX={0} centerY={0} zoom={0.9}
        />
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}>
        {/* ASCII "404" */}
        <div style={{ width: "100%", maxWidth: 600, height: 200, marginBottom: 24 }}>
          <ASCIIText
            text="404"
            enableWaves={false}
            asciiFontSize={8}
            textFontSize={200}
            textColor="#fdf9f3"
            planeBaseHeight={10}
          />
        </div>

        <h2 style={{
          fontSize: "clamp(20px, 4vw, 28px)",
          fontWeight: 600,
          color: "#fdf9f3",
          textAlign: "center",
          marginBottom: 8,
          lineHeight: 1.3,
        }}>
          Page not found
        </h2>
        <p style={{
          fontSize: 15,
          color: "rgba(253,249,243,0.55)",
          textAlign: "center",
          marginBottom: 32,
          maxWidth: 360,
          lineHeight: 1.6,
        }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>

        <a
          href="/"
          style={{
            fontFamily: "'JSans', sans-serif",
            fontSize: 15, fontWeight: 600,
            background: "rgba(255,255,255,0.12)",
            color: "#fdf9f3",
            border: "1px solid rgba(253,249,243,0.2)",
            borderRadius: 10,
            padding: "12px 28px",
            textDecoration: "none",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
        >
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
}
