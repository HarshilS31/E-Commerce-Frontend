import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { authContext } from "../context/AuthProvider"
const ProtectedRoute = ({ requiredRole }: { requiredRole?: string }) => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error("Auth context is undefined")
  }
  const { user, loading } = context
  if (loading) {
    return <div className="auth-loading">Checking session...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute