import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Wheat, LayoutDashboard, ShoppingBag, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/sales', label: 'Ventas', icon: ShoppingBag },
  { to: '/traceability', label: 'Trazabilidad', icon: Activity },
]

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const initial = (user?.nombre || user?.email || 'U').charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur shadow-xs">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Wheat className="size-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight">Granero</span>
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Nav links */}
        <nav className="flex flex-1 items-center gap-1 sm:gap-2 text-sm">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`
              }
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium leading-tight">
              {user?.nombre || user?.email || 'Usuario'}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              {user?.rol || 'SESIÓN'}
            </span>
          </div>

          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20 select-none">
            {initial}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors gap-1.5 px-2.5"
            title="Cerrar sesión"
          >
            <LogOut className="size-4" />
            <span className="hidden md:inline text-xs font-medium">Salir</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
