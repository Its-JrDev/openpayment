import { Link } from 'react-router-dom'
import { ArrowDownLeft, Inbox, Receipt } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import StatusBadge from '@/components/StatusBadge'

function formatDate(iso) {
    return new Date(iso).toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
    })
}

function formatAmount(monto, moneda) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: moneda,
        minimumFractionDigits: 2,
    }).format(monto)
}

export default function SalesList({ ventas }) {
    if (!ventas.length) {
        return (
            <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-muted p-4 rounded-full mb-4">
                        <Inbox className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">Aún no hay ventas</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                        Tus solicitudes de cobro Open Payments aparecerán aquí. Crea una nueva venta para empezar a recibir pagos.
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid gap-3">
            {ventas.map((venta) => (
                <Link key={venta.id} to={`/ventas/${venta.id}`} className="group block focus:outline-none">
                    <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/40 group-focus:ring-2 group-focus:ring-primary/20">
                        <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div className="flex items-center gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                    <ArrowDownLeft className="size-5" />
                                </div>

                                <div className="grid gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-base leading-none">
                                            {formatAmount(venta.monto_total, venta.moneda)}
                                        </span>
                                        <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">
                                            {venta.moneda}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="font-mono">#{venta.id}</span>
                                        <span>•</span>
                                        <span>{formatDate(venta.fecha)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                {venta.incoming_payment_id && (
                                    <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Receipt className="size-3.5" />
                                        <span className="font-mono truncate max-w-[120px]">{venta.incoming_payment_id}</span>
                                    </div>
                                )}
                                <StatusBadge estado={venta.estado_venta} />
                            </div>

                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
