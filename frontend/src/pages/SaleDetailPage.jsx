import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { obtenerVenta } from '@/api/payments'
import PaymentUrlCard from '@/components/PaymentUrlCard'
import StatusBadge from '@/components/StatusBadge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Hash, Coins, Network, CalendarClock } from 'lucide-react'

function formatAmount(monto, moneda) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: moneda,
        minimumFractionDigits: 2,
    }).format(monto)
}

function formatDate(iso) {
    return new Date(iso).toLocaleString('es-MX', {
        dateStyle: 'long',
        timeStyle: 'short',
    })
}

function DetailRow({ icon: Icon, label, value, mono = false }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 py-4 sm:py-5">
            <div className="flex items-center gap-3 text-muted-foreground">
                <Icon className="size-5" />
                <span className="text-sm font-medium">{label}</span>
            </div>
            <span className={`text-sm sm:text-right break-all ${mono ? 'font-mono text-xs sm:text-sm' : 'font-medium text-foreground sm:text-base'}`}>
                {value}
            </span>
        </div>
    )
}

export default function SaleDetailPage() {
    const { id } = useParams()
    const [venta, setVenta] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerVenta(id)
            .then(setVenta)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [id])

    return (
        <main className="max-w-4xl mx-auto w-full px-4 py-8 sm:py-12 grid gap-8">
            <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" asChild className="shrink-0 group hover:border-primary/50">
                    <Link to="/ventas">
                        <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Detalle de pago</h1>
            </div>

            {loading && (
                <div className="grid md:grid-cols-2 gap-6 w-full">
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                    <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
            )}

            {error && (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                    <p className="font-semibold mb-1">Error al consultar el pago</p>
                    <p className="text-sm">{error}</p>
                </div>
            )}

            {venta && (
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start mt-4">

                    {/* Detalles de la venta */}
                    <div className="grid gap-6">
                        <Card className="shadow-sm border-border">
                            <CardContent className="p-6 sm:p-8">
                                <div className="flex flex-col gap-2 mb-8">
                                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                        Monto a cobrar
                                    </span>
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <p className="text-4xl sm:text-5xl font-extrabold tracking-tighter">
                                            {formatAmount(venta.monto_total, venta.moneda)}
                                        </p>
                                        <StatusBadge estado={venta.estado_venta} />
                                    </div>
                                </div>

                                <div className="grid divide-y border-t border-border/60">
                                    <DetailRow
                                        icon={Hash}
                                        label="Identificador de Venta"
                                        value={venta.id}
                                        mono
                                    />
                                    <DetailRow
                                        icon={Coins}
                                        label="Moneda de Transacción"
                                        value={venta.moneda}
                                    />
                                    <DetailRow
                                        icon={CalendarClock}
                                        label="Fecha de Creación"
                                        value={formatDate(venta.fecha)}
                                    />
                                    {venta.incoming_payment_id && (
                                        <DetailRow
                                            icon={Network}
                                            label="Incoming Payment URL"
                                            value={venta.incoming_payment_id}
                                            mono
                                        />
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* QR de Pago */}
                    <div className="w-full">
                        <PaymentUrlCard url={venta.payment_url} />
                    </div>

                </div>
            )}
        </main>
    )
}
