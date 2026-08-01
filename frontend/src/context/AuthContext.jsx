import { useEffect, useMemo, useState } from 'react'
import { login as apiLogin } from '@/api/auth'
import { AuthContext } from '@/context/auth-context'

const STORAGE_KEY = 'granero.auth'

function readStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistSession(session) {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  useEffect(() => {
    persistSession(session)
  }, [session])

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login: async (email, password) => {
        const data = await apiLogin(email, password)
        setSession({ token: data.token, user: data.user })
      },
      logout: () => setSession(null),
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
