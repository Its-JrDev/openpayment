import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from '@/context/SessionContext'
import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import SalesPage from '@/pages/SalesPage'
import SaleDetailPage from '@/pages/SaleDetailPage'
import DashboardPage from '@/pages/DashboardPage'

function Layout({ children }) {
  return (
    <div className="min-h-svh flex flex-col bg-muted/40">
      <Navbar />
      {children}
    </div>
  )
}

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: sin Navbar */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas: con Navbar */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Navigate to="/ventas" replace />
                </Layout>
              }
            />
            <Route
              path="/ventas"
              element={
                <Layout>
                  <SalesPage />
                </Layout>
              }
            />
            <Route
              path="/ventas/:id"
              element={
                <Layout>
                  <SaleDetailPage />
                </Layout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <Layout>
                  <DashboardPage />
                </Layout>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}

export default App
