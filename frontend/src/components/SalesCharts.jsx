import { useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ESTADO_COLORS = {
  PAGADA: '#16a34a',
  PENDIENTE: '#d97706',
  EXPIRADA: '#dc2626',
}

const tooltipStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '12px',
  color: '#0f172a',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}

function ultimos7Dias() {
  return Array.from({ length: 7 }, (_, i) => {
    const fecha = new Date()
    fecha.setDate(fecha.getDate() - (6 - i))
    return fecha.toISOString().slice(0, 10)
  })
}

function ventasPorDia(ventas) {
  const porDia = ventas.reduce((acc, venta) => {
    const dia = venta.fecha.slice(0, 10)
    acc[dia] = (acc[dia] ?? 0) + 1
    return acc
  }, {})

  return ultimos7Dias().map((dia) => ({
    dia: new Date(`${dia}T00:00:00`).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' }),
    ventas: porDia[dia] ?? 0,
  }))
}

function ventasPorEstado(ventas) {
  const porEstado = ventas.reduce((acc, venta) => {
    const estado = venta.estado_venta
    acc[estado] = (acc[estado] ?? 0) + 1
    return acc
  }, {})

  return Object.entries(porEstado).map(([estado, value]) => ({ estado, value }))
}

function SalesCharts({ ventas }) {
  const porDia = useMemo(() => ventasPorDia(ventas), [ventas])
  const porEstado = useMemo(() => ventasPorEstado(ventas), [ventas])

  if (ventas.length === 0) {
    return null
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Ventas por día</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={porDia}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="dia" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                allowDecimals={false}
                width={28}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip cursor={{ fill: 'rgba(148, 163, 184, 0.15)' }} contentStyle={tooltipStyle} />
              <Bar dataKey="ventas" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Por estado</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={porEstado}
                dataKey="value"
                nameKey="estado"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                strokeWidth={0}
              >
                {porEstado.map((entry) => (
                  <Cell key={entry.estado} fill={ESTADO_COLORS[entry.estado]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default SalesCharts
