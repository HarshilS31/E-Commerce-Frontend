import { createContext, useState, useEffect, type ReactNode } from "react"
import { loginUser, logoutUser as apiLogoutUser, getCurrentUser } from "../api/auth"
import type { authProviderType, userDetails, AuthUser } from "../types/interfaces"

export const authContext = createContext<authProviderType | undefined>(undefined)
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const fetchCurrUser = async () => {
    try {
      const res = await getCurrentUser()
      setUser(res.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCurrUser()
  }, [])
  const login = async (data: userDetails) => {
    const res = await loginUser(data)
    setUser(res.user)
  }
  const logout = async () => {
    try {
      await apiLogoutUser()
    } finally {
      setUser(null)
    }
  }
  return (
    <authContext.Provider
      value={{ user: user as authProviderType["user"], loading, login, logout, fetchCurrUser }}
    >
      {children}
    </authContext.Provider>
  )
}
export default AuthProvider