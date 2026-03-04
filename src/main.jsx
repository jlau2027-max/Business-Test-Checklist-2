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
import { AuthProvider, useAuth } from './AuthContext.jsx'
import theme from './theme.js'

const path = window.location.pathname
const Page = path === '/specimen' ? SpecimenPage
           : path === '/history' ? HistoryPage
           : path === '/dashboard' ? DashboardPage
           : App

function AuthGate({ children }) {
  const { loading } = useAuth()
  if (loading) return null
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider afterSignOutUrl="/">
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
