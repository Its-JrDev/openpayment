import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const mockSales = [
    {
        id: 1001,
        comerciante_id: 1,
        monto_total: 45.5,
        moneda: 'USD',
        estado_venta: 'PAGADA',
        fecha: '2026-07-31T14:22:00.000Z',
        wallet_cliente: 'https://wallet.example.com/alice',
        incoming_payment_id: 'incoming_9f2b1a',
    },
    {
        id: 1002,
        comerciante_id: 1,
        monto_total: 120.0,
        moneda: 'USD',
        estado_venta: 'PENDIENTE',
        fecha: '2026-07-31T15:05:00.000Z',
        wallet_cliente: 'https://wallet.example.com/carlos',
        incoming_payment_id: 'incoming_4c8d9e',
    },
    {
        id: 1003,
        comerciante_id: 1,
        monto_total: 12.75,
        moneda: 'USD',
        estado_venta: 'EXPIRADA',
        fecha: '2026-07-30T10:30:00.000Z',
        wallet_cliente: 'https://wallet.example.com/bruno',
        incoming_payment_id: 'incoming_7e1f3c',
    },
    {
        id: 1004,
        comerciante_id: 1,
        monto_total: 88.2,
        moneda: 'USD',
        estado_venta: 'PAGADA',
        fecha: '2026-07-29T18:47:00.000Z',
        wallet_cliente: 'https://wallet.example.com/diana',
        incoming_payment_id: 'incoming_2a6b8d',
    },
    {
        id: 1005,
        comerciante_id: 1,
        monto_total: 33.0,
        moneda: 'USD',
        estado_venta: 'PAGADA',
        fecha: '2026-07-28T09:12:00.000Z',
        wallet_cliente: 'https://wallet.example.com/elena',
        incoming_payment_id: 'incoming_5c9e7f',
    },
    {
        id: 1006,
        comerciante_id: 1,
        monto_total: 67.4,
        moneda: 'USD',
        estado_venta: 'PENDIENTE',
        fecha: '2026-07-27T16:40:00.000Z',
        wallet_cliente: 'https://wallet.example.com/fabio',
        incoming_payment_id: 'incoming_8d0a2c',
    },
]

function filterMockSales({ estado, desde, hasta, query } = {}) {
    const q = query?.trim().toLowerCase()
    return mockSales.filter((venta) => {
        if (estado && venta.estado_venta !== estado) return false
        const fecha = new Date(venta.fecha)
        if (desde && fecha < new Date(`${desde}T00:00:00`)) return false
        if (hasta && fecha > new Date(`${hasta}T23:59:59`)) return false
        if (q) {
            const hayCoincidencia =
                String(venta.id).includes(q) ||
                venta.wallet_cliente.toLowerCase().includes(q) ||
                venta.incoming_payment_id.toLowerCase().includes(q)
            if (!hayCoincidencia) return false
        }
        return true
    })
}

function mockFetchSales(filters = {}) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(filterMockSales(filters)), 600)
    })
}

export async function fetchSales(filters = {}) {
    if (USE_MOCK) {
        return mockFetchSales(filters)
    }
    const { data } = await api.get('/ventas', { params: filters })
    return data
}
