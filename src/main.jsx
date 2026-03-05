import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'
import SpecimenPage from './SpecimenPage.jsx'
import HistoryPage from './HistoryPage.jsx'
import AdminPage from './admin/AdminPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminGuard from './components/AdminGuard.jsx'
import theme from './theme.js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/specimen" element={<SpecimenPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/sign-in/*" element={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#09090F' }}>
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </div>
      } />
      <Route path="/sign-up/*" element={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#09090F' }}>
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
        </div>
      } />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminGuard>
            <AdminPage />
          </AdminGuard>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      {clerkPubKey ? (
        <ClerkProvider publishableKey={clerkPubKey}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ClerkProvider>
      ) : (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </MantineProvider>
  </StrictMode>,
)
