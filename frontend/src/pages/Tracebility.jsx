import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Tracebility() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trazabilidad Open Payments</h1>
        <p className="text-sm text-muted-foreground">Rastreo de concesiones, grants y eventos de pago Interledger</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Eventos y Auditoría</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Monitoreo activo de Grants de pago (Incoming & Outgoing Payments) e interacciones con la wallet.</p>
        </CardContent>
      </Card>
    </main>
  )
}
