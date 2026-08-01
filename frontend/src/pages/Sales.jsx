import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SalesTable from '@/components/SalesTable'
import { useSales } from '@/hooks/useSales'

export default function Sales() {
  const { ventas, loading } = useSales()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Historial de Ventas</h1>
        <p className="text-sm text-muted-foreground">Registro completo de transacciones e ingentes de pago</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ventas registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesTable ventas={ventas} loading={loading} />
        </CardContent>
      </Card>
    </main>
  )
}
