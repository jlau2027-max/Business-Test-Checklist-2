import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { ClerkProvider } from '@clerk/react'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'
import SpecimenPage from './SpecimenPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import AdminPage from './AdminPage.jsx'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import theme from './theme.js'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsuamFzcGVybGF1bHZsN3N0dWRlbnQuY29tJA'

const path = window.location.pathname
const Page = path === '/specimen' ? SpecimenPage
           : path === '/history' ? HistoryPage
           : path === '/dashboard' ? DashboardPage
           : path === '/admin' ? AdminPage
           : App

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
          colorPrimary: "#7C6FFF",
          colorBackground: "#12121A",
          colorInputBackground: "#1A1A24",
          colorText: "#F0EEE8",
          colorTextSecondary: "#8B8B9E",
          borderRadius: "0.5rem",
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <AuthProvider>
          <AuthGate>
            <Page />
          </AuthGate>
        </AuthProvider>
      </MantineProvider>
    </ClerkProvider>
  </StrictMode>,
)
