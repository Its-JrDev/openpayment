import { Inbox } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import StatusBadge from '@/components/StatusBadge'

const headers = [
  'ID Venta',
  'Monto',
  'Moneda',
  'Wallet cliente',
  'Estado',
  'Fecha',
  'Incoming Payment ID',
]

function formatFecha(iso) {
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function SalesTable({ ventas, loading }) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Cargando ventas...
      </div>
    )
  }

  if (ventas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-muted-foreground">
        <Inbox className="size-8" />
        <p className="text-sm">No hay ventas para mostrar</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow key={venta.id}>
              <TableCell className="font-medium">#{venta.id}</TableCell>
              <TableCell>{venta.monto_total}</TableCell>
              <TableCell>{venta.moneda}</TableCell>
              <TableCell className="max-w-56 truncate" title={venta.wallet_cliente}>
                {venta.wallet_cliente}
              </TableCell>
              <TableCell>
                <StatusBadge estado={venta.estado_venta} />
              </TableCell>
              <TableCell className="whitespace-nowrap">{formatFecha(venta.fecha)}</TableCell>
              <TableCell className="max-w-40 truncate font-mono text-xs" title={venta.incoming_payment_id}>
                {venta.incoming_payment_id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SalesTable
