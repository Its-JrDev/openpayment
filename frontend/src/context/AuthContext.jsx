import { useMemo, useState } from 'react'
import { AuthContext } from '@/context/auth-context'
import {
  login as serviceLogin,
  logout as serviceLogout,
  getCurrentUser,
  getToken,
} from '@/services/authService'

function readInitialSession() {
  const user = getCurrentUser()
  const token = getToken()
  return { user, token }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readInitialSession)

  const value = useMemo(() => {
    const user = session.user
    const token = session.token
    return {
      user,
      rol: user?.rol ?? null,
      token,
      isAuthenticated: Boolean(token),
      login: async (email, password) => {
        const next = await serviceLogin(email, password)
        setSession({ user: next.user, token: next.token })
      },
      logout: () => {
        serviceLogout()
        setSession({ user: null, token: null })
      },
    }
  }, [session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
