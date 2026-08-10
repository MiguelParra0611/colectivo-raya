import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/create', label: 'Crear portafolio', end: false },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="glass-surface mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-3 shadow-lg">
        <NavLink
          to="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          Colectivo Raya
        </NavLink>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                  isActive && 'bg-white/[0.1] text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
