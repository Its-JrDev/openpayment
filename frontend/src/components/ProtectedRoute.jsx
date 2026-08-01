import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

function ProtectedRoute() {
  const { isAuthenticated } = useSession()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
