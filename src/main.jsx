import { StrictMode, useState, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { Spinner } from '@heroui/react'
import './index.css'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const App = lazy(() => import('./App.jsx'))
const SpecimenPage = lazy(() => import('./SpecimenPage.jsx'))
const HistoryPage = lazy(() => import('./HistoryPage.jsx'))
const BiologyPage = lazy(() => import('./BiologyPage.jsx'))
const DashboardPage = lazy(() => import('./DashboardPage.jsx'))
const AdminPage = lazy(() => import('./admin/AdminPage.jsx'))
const LandingPage = lazy(() => import('./LandingPage.jsx'))
const PrivacyPage = lazy(() => import('./PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./TermsPage.jsx'))
const FeedbackPage = lazy(() => import('./FeedbackPage.jsx'))
const NotFoundPage = lazy(() => import('./NotFoundPage.jsx'))
const SignInGate = lazy(() => import('./SignInGate.jsx'))

const PageSpinner = (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
    <Spinner size="lg" />
  </div>
)

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
if (path === '/ess') window.location.replace('/ess/checklist')
if (path === '/spanish') window.location.replace('/spanish/checklist')

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
} else if (path.startsWith('/ess/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'ess' }
} else if (path.startsWith('/spanish/')) {
  const sub = path.split('/')[2]
  Page = App
  const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
  pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'spanish' }
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
  ess: 'IB ESS',
  spanish: 'IB Spanish',
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
const PUBLIC_PATHS = new Set(['/', '/privacy', '/terms'])
const isPublicPage = PUBLIC_PATHS.has(path) || Page === NotFoundPage

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
  if (!user) return <Suspense fallback={PageSpinner}><SignInGate /></Suspense>

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
          <Suspense fallback={PageSpinner}>
            <Page {...pageProps} />
          </Suspense>
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
            <ThemeToggle />
          </div>
        </AuthGate>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
