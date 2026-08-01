import api from '@/api/api'

const STORAGE_KEY = 'granero.auth'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

// Mock temporal mientras no hay backend disponible.
const mockLogin = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@granero.com' && password === 'admin') {
        resolve({
          token: 'mock-token-admin',
          user: { id: 1, nombre: 'Admin Granero', email, rol: 'ADMIN', comerciante_id: 1 },
        })
        return
      }
      if (email === 'cajero@granero.com' && password === 'cajero') {
        resolve({
          token: 'mock-token-cajero',
          user: { id: 2, nombre: 'Cajero Uno', email, rol: 'CAJERO', comerciante_id: 1 },
        })
        return
      }
      reject(new Error('Credenciales inválidas'))
    }, 600)
  })

export async function login(email, password) {
  const data = USE_MOCK
    ? await mockLogin(email, password)
    : (await api.post('/login', { email, password })).data

  const session = { token: data.token, user: data.user }
  saveSession(session)
  return session
}

export function logout() {
  clearSession()
}

export function getToken() {
  return readSession()?.token ?? null
}

export function getCurrentUser() {
  return readSession()?.user ?? null
}

export function isAuthenticated() {
  return Boolean(readSession()?.token)
}
