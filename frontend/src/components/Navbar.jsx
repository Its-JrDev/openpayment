import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSession } from '@/hooks/useSession'

const navLinks = [
  { to: '/ventas', label: 'Ventas' },
  { to: '/dashboard', label: 'Dashboard' },
]

function Navbar() {
  const { user, logout } = useSession()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wheat className="size-4" />
          </div>
          <span className="font-semibold text-sm">Granero</span>
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Nav links */}
        <nav className="flex flex-1 gap-4 text-sm">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium leading-tight">{user?.nombre}</p>
            <p className="text-xs text-muted-foreground">{user?.rol}</p>
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-medium uppercase">
            {(user?.nombre ?? '?').slice(0, 1)}
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
