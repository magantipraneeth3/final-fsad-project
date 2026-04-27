import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../services/AppContext'

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useApp()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />
  }

  return <Outlet />
}
