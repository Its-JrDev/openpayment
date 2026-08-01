import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <span className="font-semibold">Granero · Panel</span>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-medium">{user?.nombre}</p>
            <p className="text-xs text-muted-foreground">{user?.rol}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} aria-label="Cerrar sesión">
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">
          Sesión iniciada · {user?.email}
        </p>
      </main>
    </div>
  )
}

export default Dashboard
