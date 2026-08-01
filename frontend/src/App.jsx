import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SessionProvider } from '@/context/SessionContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}

export default App
