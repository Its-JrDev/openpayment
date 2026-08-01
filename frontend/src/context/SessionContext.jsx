import { useEffect, useMemo, useState } from 'react'
import { SessionContext } from '@/context/session-context'

const STORAGE_KEY = 'granero.session'

const MOCK_USER = {
    id: 1,
    nombre: 'Cajero Demo',
    email: 'cajero@granero.com',
    rol: 'CAJERO',
    comerciante_id: 1,
}

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

export function SessionProvider({ children }) {
    const [session, setSession] = useState(() => readStoredSession() ?? MOCK_USER)

    useEffect(() => {
        persistSession(session)
    }, [session])

    const value = useMemo(
        () => ({
            user: session,
            token: session?.token ?? 'mock-token',
            isAuthenticated: Boolean(session),
            login: (user) => setSession(user),
            logout: () => setSession(null),
        }),
        [session],
    )

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
