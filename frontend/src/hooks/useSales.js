import { useCallback, useEffect, useState } from 'react'
import { fetchSales } from '@/api/sales'

export function useSales(filters = {}) {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await fetchSales(filters)
            setVentas(data)
        } catch (err) {
            setError(err.message || 'No se pudieron cargar las ventas')
        } finally {
            setLoading(false)
        }
    }, [JSON.stringify(filters)]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        load()
    }, [load])

    return { ventas, loading, error, reload: load }
}
