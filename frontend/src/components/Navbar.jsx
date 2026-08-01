import { useNavigate } from 'react-router-dom'
import { LogOut, Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/useSession'

function Navbar() {
  const { user, logout } = useSession()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wheat className="size-4" />
          </div>
          <span className="font-semibold">Granero</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-tight">{user?.nombre}</p>
              <p className="text-xs text-muted-foreground">{user?.rol}</p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium uppercase">
              {(user?.nombre ?? '?').slice(0, 1)}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Cerrar sesión">
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
