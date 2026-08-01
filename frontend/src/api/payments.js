import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const STORAGE_KEY = 'granero.ventas'

function readVentas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeVentas(ventas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ventas))
}

function fakePaymentUrl(id) {
  return `https://openpayments.granero.local/incoming/${id}`
}

function buildVenta(comercianteId, moneda, monto, motivo) {
  return {
    id: Date.now(),
    comerciante_id: comercianteId,
    monto_total: monto,
    moneda,
    motivo,
    estado_venta: 'PENDIENTE',
    fecha: new Date().toISOString(),
    payment_url: fakePaymentUrl(Date.now()),
    incoming_payment_id: `incoming_${Math.random().toString(36).slice(2, 10)}`,
  }
}

function mockCrearVenta({ comerciante_id, moneda, monto_total, motivo }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const venta = buildVenta(comerciante_id, moneda, monto_total, motivo)
      const ventas = readVentas()
      ventas.unshift(venta)
      writeVentas(ventas)
      resolve(venta)
    }, 700)
  })
}

function mockListarVentas() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(readVentas()), 400)
  })
}

function mockObtenerVenta(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const venta = readVentas().find((item) => item.id === Number(id))
      if (venta) {
        resolve(venta)
      } else {
        reject(new Error('Venta no encontrada'))
      }
    }, 400)
  })
}

export async function crearVenta(payload) {
  if (USE_MOCK) {
    return mockCrearVenta(payload)
  }
  const { data } = await api.post('/ventas', payload)
  return data
}

export async function listarVentas() {
  if (USE_MOCK) {
    return mockListarVentas()
  }
  const { data } = await api.get('/ventas')
  return data
}

export async function obtenerVenta(id) {
  if (USE_MOCK) {
    return mockObtenerVenta(id)
  }
  const { data } = await api.get(`/ventas/${id}`)
  return data
}
