import axios from 'axios'

const STORAGE_KEY = 'granero.auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const session = raw ? JSON.parse(raw) : null
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`
      }
    } catch {
      // sin sesión almacenada
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY)
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default api
