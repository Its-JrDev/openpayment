import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { listarVentas } from '@/api/payments'
import SalesList from '@/components/SalesList'
import { Skeleton } from '@/components/ui/skeleton'
import NewSaleModal from '@/components/NewSaleModal'

export default function SalesPage() {
    const [ventas, setVentas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        listarVentas()
            .then(setVentas)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    return (
        <main className="max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 grid gap-8">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                            <Sparkles className="size-5" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cobros P2P</h1>
                    </div>
                    <p className="text-base text-muted-foreground">
                        Historial de transacciones procesadas vía Open Payments.
                    </p>
                </div>
                <div className="shrink-0">
                    <NewSaleModal />
                </div>
            </header>

            <section>
                {loading && (
                    <div className="grid gap-3">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-[88px] w-full rounded-xl" />
                        ))}
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                        <p className="font-semibold mb-1">Error al cargar ventas</p>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && <SalesList ventas={ventas} />}
            </section>
        </main>
    )
}
