import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import SpecimenPage from './SpecimenPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import AdminPage from './admin/AdminPage.jsx'
import LandingPage from './LandingPage.jsx'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsuamFzcGVybGF1bHZsN3N0dWRlbnQuY29tJA'

// ─── Routing ────────────────────────────────────────────────────────────────
const path = window.location.pathname

// Backward-compat redirects for old URLs
if (path === '/specimen') window.location.replace('/business/specimen')
if (path === '/history') window.location.replace('/history/specimen')
if (path === '/business') window.location.replace('/business/checklist')

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
} else if (path === '/dashboard') {
  Page = DashboardPage
} else if (path === '/admin') {
  Page = AdminPage
} else if (path !== '/') {
  // Unknown path — show landing
  Page = LandingPage
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
