import { useNavigate } from 'react-router-dom'
import { Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSession } from '@/hooks/useSession'

function Login() {
    const { login } = useSession()
    const navigate = useNavigate()

    function handleLogin() {
        login({
            id: 1,
            nombre: 'Cajero Demo',
            email: 'cajero@granero.com',
            rol: 'CAJERO',
            comerciante_id: 1,
        })
        navigate('/', { replace: true })
    }

    return (
        <div className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Wheat className="size-6" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Granero</h1>
                    <p className="text-sm text-muted-foreground">Pagos P2P con Open Payments</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Iniciar sesión</CardTitle>
                        <CardDescription>
                            Login mock: la feat de auth conectará el formulario real aquí
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" className="w-full" onClick={handleLogin}>
                            Entrar como Cajero Demo
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Login
