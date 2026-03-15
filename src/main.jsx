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
if (path === '/history') window.location.replace('/history/checklist')
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
} else if (path.startsWith('/history/')) {
  const sub = path.split('/')[2]
  if (sub === 'specimen') {
    Page = HistoryPage
  } else {
    Page = App
    const tabMap = { checklist: 'checklist', flashcards: 'flashcards', 'multi-choice': 'practice', written: 'written' }
    pageProps = { initialTab: tabMap[sub] || 'checklist', subject: 'history' }
  }
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

// ─── Dynamic page metadata (SEO — Google executes JS) ───────────────────────
const SUBJECT_META = {
  business:          { name: 'IB Business Management', short: 'Business' },
  history:           { name: 'IB History',             short: 'History' },
  biology:           { name: 'IB Biology',             short: 'Biology' },
  chemistry:         { name: 'IB Chemistry',           short: 'Chemistry' },
  physics:           { name: 'IB Physics',             short: 'Physics' },
  'sports-science':  { name: 'IB Sports Science',      short: 'Sports Science' },
  economics:         { name: 'IB Economics',            short: 'Economics' },
  ess:               { name: 'IB ESS',                 short: 'ESS' },
  spanish:           { name: 'IB Spanish',              short: 'Spanish' },
}
const TAB_META = {
  checklist:      { label: 'Checklist',     desc: 'revision checklist — track every topic' },
  flashcards:     { label: 'Flashcards',    desc: 'flashcards — key terms and definitions' },
  'multi-choice': { label: 'Multi-Choice',  desc: 'multiple-choice practice questions' },
  written:        { label: 'Written',       desc: 'written practice with AI marking' },
  specimen:       { label: 'Specimen',      desc: 'specimen paper practice' },
}
const STATIC_META = {
  '/':          { title: 'IB Revision — IBrev.org',    desc: 'Free IB revision tools — checklists, flashcards, multiple-choice and written practice for Business, Biology, Chemistry, Physics, Economics and more.' },
  '/dashboard': { title: 'Dashboard — IBrev',          desc: 'Track your IB revision progress across all subjects.' },
  '/admin':     { title: 'Admin — IBrev',              desc: null },
  '/privacy':   { title: 'Privacy Policy — IBrev',     desc: 'IBrev privacy policy — how we handle your data.' },
  '/terms':     { title: 'Terms of Service — IBrev',   desc: 'IBrev terms of service.' },
  '/feedback':  { title: 'Feedback — IBrev',           desc: 'Share feedback to help improve IBrev.' },
}

function setMeta(title, description, canonicalPath) {
  document.title = title
  const url = `https://ibrev.org${canonicalPath || path}`
  // Helper to set or create a meta tag
  const set = (attr, key, content) => {
    if (!content) return
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.setAttribute(attr === 'property' ? 'content' : 'content', content)
  }
  if (description) set('name', 'description', description)
  set('property', 'og:title', title)
  if (description) set('property', 'og:description', description)
  set('property', 'og:url', url)
  set('name', 'twitter:title', title)
  if (description) set('name', 'twitter:description', description)
  // Update canonical
  const canon = document.querySelector('link[rel="canonical"]')
  if (canon) canon.setAttribute('href', url)
}

if (STATIC_META[path]) {
  const m = STATIC_META[path]
  setMeta(m.title, m.desc)
} else {
  const [, subjectSlug, tabSlug] = path.split('/')
  const subj = SUBJECT_META[subjectSlug]
  const tab = TAB_META[tabSlug]
  if (subj && tab) {
    setMeta(
      `${subj.name} ${tab.label} — IBrev`,
      `${subj.name} ${tab.desc}. Free IB revision on IBrev.org.`
    )
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
          <a href="#main-content" className="skip-nav">Skip to content</a>
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
