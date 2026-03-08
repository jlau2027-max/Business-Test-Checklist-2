import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
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
} else if (path !== '/') {
  // Unknown path — show landing
  Page = LandingPage
}

// ─── Dynamic page titles (SEO — Google executes JS) ────────────────────────
const PAGE_TITLES = {
  '/': 'IB Revision — IBrev.org',
  '/dashboard': 'Dashboard — IBrev',
  '/admin': 'Admin — IBrev',
  '/privacy': 'Privacy Policy — IBrev',
  '/terms': 'Terms of Service — IBrev',
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

function AuthGate({ children }) {
  const { loading } = useAuth()
  // Don't block rendering — show the app while Clerk loads
  // Auth-dependent features will handle their own loading states
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
        <AuthGate>
          <Page {...pageProps} />
          <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
            <ThemeToggle />
          </div>
        </AuthGate>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
