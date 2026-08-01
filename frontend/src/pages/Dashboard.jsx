import { useMemo, useState } from 'react'
import { BadgeDollarSign, CircleCheck, CircleX, Clock, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Navbar from '@/components/Navbar'
import SalesCharts from '@/components/SalesCharts'
import SalesTable from '@/components/SalesTable'
import { useSales } from '@/hooks/useSales'

function SummaryCard({ title, value, icon: Icon, accent }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`size-4 ${accent}`} />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

function filterVentas(ventas, { estado, desde, hasta, query }) {
  const q = query?.trim().toLowerCase()
  return ventas.filter((venta) => {
    if (estado && estado !== 'TODOS' && venta.estado_venta !== estado) return false
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

function esHoy(iso) {
  const fecha = new Date(iso)
  const hoy = new Date()
  return (
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear()
  )
}

function Dashboard() {
  const { ventas, loading } = useSales()
  const [estado, setEstado] = useState('TODOS')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [query, setQuery] = useState('')

  const filtradas = useMemo(
    () => filterVentas(ventas, { estado, desde, hasta, query }),
    [ventas, estado, desde, hasta, query],
  )

  const resumen = useMemo(() => {
    const hoy = ventas.filter((venta) => esHoy(venta.fecha))
    return {
      hoy: hoy.length,
      pagadas: ventas.filter((venta) => venta.estado_venta === 'PAGADA').length,
      pendientes: ventas.filter((venta) => venta.estado_venta === 'PENDIENTE').length,
      expiradas: ventas.filter((venta) => venta.estado_venta === 'EXPIRADA').length,
    }
  }, [ventas])

  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Panel de ventas</h1>
          <p className="text-sm text-muted-foreground">Historial de ventas y pagos P2P</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Ventas hoy"
            value={loading ? '—' : resumen.hoy}
            icon={BadgeDollarSign}
            accent="text-primary"
          />
          <SummaryCard
            title="Pagadas"
            value={loading ? '—' : resumen.pagadas}
            icon={CircleCheck}
            accent="text-emerald-600"
          />
          <SummaryCard
            title="Pendientes"
            value={loading ? '—' : resumen.pendientes}
            icon={Clock}
            accent="text-amber-600"
          />
          <SummaryCard
            title="Expiradas"
            value={loading ? '—' : resumen.expiradas}
            icon={CircleX}
            accent="text-destructive"
          />
        </div>

        <SalesCharts ventas={filtradas} />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Historial de ventas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto]">
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Buscar</Label>
                <div className="relative flex items-center">
                  <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Por ID, wallet o payment ID"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Estado</Label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODOS">Todos</SelectItem>
                    <SelectItem value="PAGADA">Pagadas</SelectItem>
                    <SelectItem value="PENDIENTE">Pendientes</SelectItem>
                    <SelectItem value="EXPIRADA">Expiradas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Desde</Label>
                <Input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-xs text-muted-foreground">Hasta</Label>
                <Input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
              </div>
            </div>

            <SalesTable ventas={filtradas} loading={loading} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Dashboard
