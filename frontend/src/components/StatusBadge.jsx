import { Badge } from '@/components/ui/badge'

const VARIANT_MAP = {
    PENDIENTE: 'secondary',
    COMPLETADA: 'default',
    PAGADA: 'default',
    FALLIDA: 'destructive',
    EXPIRADA: 'destructive',
}

const LABEL_MAP = {
    PENDIENTE: 'Pendiente',
    COMPLETADA: 'Completada',
    PAGADA: 'Pagada',
    FALLIDA: 'Fallida',
    EXPIRADA: 'Expirada',
}

// Custom colors via className for states that need distinct colors
const CLASS_MAP = {
    PAGADA: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
    PENDIENTE: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400',
    EXPIRADA: '',
}

export default function StatusBadge({ estado }) {
    const variant = VARIANT_MAP[estado] ?? 'outline'
    const label = LABEL_MAP[estado] ?? estado
    const extraClass = CLASS_MAP[estado] ?? ''

    return (
        <Badge variant={variant} className={extraClass || undefined}>
            {label}
        </Badge>
    )
}
