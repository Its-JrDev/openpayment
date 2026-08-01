import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const mockLogin = (email, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@granero.com' && password === 'admin') {
        resolve({
          token: 'mock-token-admin',
          user: {
            id: 1,
            nombre: 'Admin Granero',
            email,
            rol: 'ADMIN',
            comerciante_id: 1,
          },
        })
        return
      }
      if (email === 'cajero@granero.com' && password === 'cajero') {
        resolve({
          token: 'mock-token-cajero',
          user: {
            id: 2,
            nombre: 'Cajero Uno',
            email,
            rol: 'CAJERO',
            comerciante_id: 1,
          },
        })
        return
      }
      reject(new Error('Credenciales inválidas'))
    }, 600)
  })

export async function login(email, password) {
  if (USE_MOCK) {
    return mockLogin(email, password)
  }
  const { data } = await api.post('/login', { email, password })
  return data
}
