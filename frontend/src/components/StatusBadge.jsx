import { CircleCheck, CircleX, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const STATUS_STYLES = {
  PAGADA: { variant: 'default', icon: CircleCheck, label: 'Pagada' },
  PENDIENTE: { variant: 'outline', icon: Clock, label: 'Pendiente' },
  EXPIRADA: { variant: 'secondary', icon: CircleX, label: 'Expirada' },
}

function StatusBadge({ estado }) {
  const style = STATUS_STYLES[estado] ?? STATUS_STYLES.PENDIENTE
  const Icon = style.icon

  return (
    <Badge variant={style.variant}>
      <Icon />
      {style.label}
    </Badge>
  )
}

export default StatusBadge
