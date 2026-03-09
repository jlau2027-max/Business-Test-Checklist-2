import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider, SignInButton } from '@clerk/react'
import { Spinner } from '@heroui/react'
import { Lock } from 'lucide-react'
import './index.css'
import App from './App.jsx'
import SpecimenPage from './SpecimenPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import BiologyPage from './BiologyPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import AdminPage from './admin/AdminPage.jsx'
import LandingPage from './LandingPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import TermsPage from './TermsPage.jsx'
import FeedbackPage from './FeedbackPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import Grainient from './components/Grainient.jsx'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsuaWJyZXYub3JnJA'

// ─── Routing ────────────────────────────────────────────────────────────────
const path = window.location.pathname

// Backward-compat redirects for old URLs
if (path === '/specimen') window.location.replace('/business/specimen')
if (path === '/history') window.location.replace('/history/specimen')
if (path === '/biology') window.location.replace('/biology/checklist')
if (path === '/business') window.location.replace('/business/checklist')
if (path === '/chemistry') window.location.replace('/chemistry/checklist')
if (path === '/physics') window.location.replace('/physics/checklist')
if (path === '/sports-science') window.location.replace('/sports-science/checklist')
if (path === '/economics') window.location.replace('/economics/checklist')

// Determine page and props
let Page = LandingPage
let pageProps = {}

if (path.startsWith('/business/')) {
  const sub = path.split('/')[2]
  if (sub === 'specimen') {
    Page = SpecimenPage
  } else {
    Page = App
    const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
    pageProps = { initialTab: tabMap[sub] || 'checklist' }
  }
} else if (path === '/history/specimen') {
  Page = HistoryPage
} else if (path.startsWith('/biology/')) {
  const sub = path.split('/')[2]
  if (sub === 'specimen') {
    Page = BiologyPage
  } else {
    Page = App
    const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
    pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'biology' }
  }
} else if (path.startsWith('/chemistry/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'chemistry' }
} else if (path.startsWith('/physics/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'physics' }
} else if (path.startsWith('/sports-science/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'sports' }
} else if (path.startsWith('/economics/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'economics' }
} else if (path === '/dashboard') {
  Page = DashboardPage
} else if (path === '/admin') {
  Page = AdminPage
} else if (path === '/privacy') {
  Page = PrivacyPage
} else if (path === '/terms') {
  Page = TermsPage
} else if (path === '/feedback') {
  Page = FeedbackPage
} else if (path !== '/') {
  // Unknown path — 404
  Page = NotFoundPage
}

// ─── Dynamic page titles (SEO — Google executes JS) ────────────────────────
const PAGE_TITLES = {
  '/': 'IB Revision — IBrev.org',
  '/dashboard': 'Dashboard — IBrev',
  '/admin': 'Admin — IBrev',
  '/privacy': 'Privacy Policy — IBrev',
  '/terms': 'Terms of Service — IBrev',
  '/feedback': 'Feedback — IBrev',
  '/history/specimen': 'IB History Specimen — IBrev',
}
const SUBJECT_LABELS = {
  business: 'IB Business',
  biology: 'IB Biology',
  chemistry: 'IB Chemistry',
  physics: 'IB Physics',
  'sports-science': 'IB Sports Science',
  economics: 'IB Economics',
}
const TAB_LABELS = {
  checklist: 'Checklist',
  flashcards: 'Flashcards',
  'multi-choice': 'Multi-Choice',
  written: 'Written',
  specimen: 'Specimen',
}
if (PAGE_TITLES[path]) {
  document.title = PAGE_TITLES[path]
} else {
  const [, subjectSlug, tabSlug] = path.split('/')
  const subjectName = SUBJECT_LABELS[subjectSlug]
  const tabName = TAB_LABELS[tabSlug]
  if (subjectName && tabName) {
    document.title = `${subjectName} ${tabName} — IBrev`
  }
}

// ─── Auth gating ─────────────────────────────────────────────────────────────
const PUBLIC_PATHS = new Set(['/', '/privacy', '/terms', '/feedback'])
const isPublicPage = PUBLIC_PATHS.has(path) || Page === NotFoundPage

function SignInGate() {
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

function AuthGate({ children, isPublic }) {
  const { user, loading } = useAuth()

  // Public pages always render immediately
  if (isPublic) return children

  // While Clerk loads, show centered spinner (prevents gate flash)
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "var(--bg-primary)",
      }}>
        <Spinner size="lg" />
      </div>
    )
  }

  // Not signed in — show branded sign-in prompt
  if (!user) return <SignInGate />

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#5E8A9C",
          colorBackground: "var(--bg-card)",
          colorInputBackground: "var(--bg-input)",
          colorText: "var(--text-primary)",
          colorTextSecondary: "var(--text-secondary)",
          borderRadius: "0.5rem",
          fontFamily: "'JSans', sans-serif",
        },
      }}
    >
      <AuthProvider>
        <AuthGate isPublic={isPublicPage}>
          <Page {...pageProps} />
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
            <ThemeToggle />
          </div>
        </AuthGate>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
