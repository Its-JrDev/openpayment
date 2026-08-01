import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import Navbar from '@/components/Navbar'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
