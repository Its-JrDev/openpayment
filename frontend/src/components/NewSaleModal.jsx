import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuth } from '@/hooks/useAuth'
import { crearVenta } from '@/api/payments'
import SaleForm from '@/components/SaleForm'

export default function NewSaleModal() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(data) {
    setLoading(true)
    setError(null)
    try {
      const venta = await crearVenta({
        comerciante_id: user?.id ?? 'demo',
        ...data,
      })
      setOpen(false)
      navigate(`/ventas/${venta.id}`)
    } catch (e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nueva Venta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nueva Venta</DialogTitle>
          <DialogDescription>
            Genera un link de cobro Open Payments al instante
          </DialogDescription>
        </DialogHeader>
        <p className="mb-2 text-sm text-destructive" className="mb-2 text-sm text-destructive">{error}</p>
        <SaleForm onSubmit={handleSubmit} isLoading={loading} />
      </DialogContent>
    </Dialog>
  )
}