import { useState, useEffect } from 'react'
import { SignInButton } from '@clerk/react'
import { Lock } from 'lucide-react'
import Grainient from './components/Grainient.jsx'

export default function SignInGate() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(document.documentElement.classList.contains("dark")))
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: "'JSans', sans-serif" }}>
      {/* Grainient background — same as landing page */}
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

      {/* Centered sign-in card */}
      <div style={{
        position: "relative", zIndex: 1, minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}>
        <div style={{
          background: isDark ? "rgba(30,35,44,0.92)" : "rgba(255,255,255,0.95)",
          borderRadius: 20, padding: "48px 40px", maxWidth: 400, width: "100%",
          textAlign: "center",
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.12)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: isDark ? "#5E8A9C20" : "#5E8A9C15",
            display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 20px",
          }}>
            <Lock size={22} color="#5E8A9C" />
          </div>

          <h1 style={{
            fontSize: 24, fontWeight: 700,
            color: isDark ? "#e8e4de" : "#1a1a1a",
            marginBottom: 8, lineHeight: 1.3,
          }}>
            Sign in to IBrev
          </h1>
          <p style={{
            fontSize: 15,
            color: isDark ? "#9a958d" : "#666",
            lineHeight: 1.6, marginBottom: 28,
          }}>
            Create a free account to access revision content, flashcards, specimen papers, AI marking and progress tracking.
          </p>

          <SignInButton mode="modal">
            <button
              type="button"
              style={{
                fontFamily: "'JSans', sans-serif",
                fontSize: 15, fontWeight: 600,
                background: "#5E8A9C", color: "#fff",
                border: "none", borderRadius: 10,
                padding: "12px 32px", cursor: "pointer",
                width: "100%", marginBottom: 16,
              }}
            >
              Sign In
            </button>
          </SignInButton>

          <a
            href="/"
            style={{
              fontSize: 13,
              color: isDark ? "#7a756d" : "#888",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            &larr; Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
