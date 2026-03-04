import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'
import SpecimenPage from './SpecimenPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import DashboardPage from './DashboardPage.jsx'
import { AuthProvider } from './AuthContext.jsx'
import theme from './theme.js'

const path = window.location.pathname
const Page = path === '/specimen' ? SpecimenPage
           : path === '/history' ? HistoryPage
           : path === '/dashboard' ? DashboardPage
           : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Page />
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
)
