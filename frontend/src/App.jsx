import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import SalesPage from '@/pages/SalesPage'
import SaleDetailPage from '@/pages/SaleDetailPage'
import Tracebility from '@/pages/Tracebility'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/sales/:id" element={<SaleDetailPage />} />
            <Route path="/ventas" element={<Navigate to="/sales" replace />} />
            <Route path="/ventas/:id" element={<Navigate to="/sales/:id" replace />} />
            <Route path="/traceability" element={<Tracebility />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
