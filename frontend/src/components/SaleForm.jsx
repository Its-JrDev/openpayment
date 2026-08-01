import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const schema = z.object({
    monto_total: z
        .string()
        .min(1, 'El monto es requerido')
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Debe ser mayor a 0'),
    moneda: z.enum(['USD', 'MXN', 'COP', 'ARS']),
    motivo: z.string().min(1, 'Agrega un motivo').max(100, 'Máximo 100 caracteres'),
})

export default function SaleForm({ onSubmit, isLoading }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { moneda: 'USD' },
    })

    async function submit(data) {
        await onSubmit({ ...data, monto_total: Number(data.monto_total) })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-5">
            <div className="grid gap-2">
                <Label htmlFor="motivo">Motivo o descripción</Label>
                <Input
                    id="motivo"
                    type="text"
                    placeholder="Ej. Pago de servicios integrales"
                    {...register('motivo')}
                    className={errors.motivo ? 'border-destructive' : ''}
                />
                {errors.motivo && (
                    <p className="text-xs text-destructive">{errors.motivo.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="monto_total">Monto</Label>
                <Input
                    id="monto_total"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register('monto_total')}
                    className={errors.monto_total ? 'border-destructive' : ''}
                />
                {errors.monto_total && (
                    <p className="text-xs text-destructive">{errors.monto_total.message}</p>
                )}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="moneda">Moneda</Label>
                <Select
                    defaultValue="USD"
                    onValueChange={(val) => setValue('moneda', val)}
                >
                    <SelectTrigger id="moneda">
                        <SelectValue placeholder="Selecciona moneda" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD – Dólar</SelectItem>
                        <SelectItem value="MXN">MXN – Peso mexicano</SelectItem>
                        <SelectItem value="COP">COP – Peso colombiano</SelectItem>
                        <SelectItem value="ARS">ARS – Peso argentino</SelectItem>
                    </SelectContent>
                </Select>
                {errors.moneda && (
                    <p className="text-xs text-destructive">{errors.moneda.message}</p>
                )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creando venta…' : 'Crear venta'}
            </Button>
        </form>
    )
}
