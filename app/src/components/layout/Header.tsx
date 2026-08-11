import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import logoHorizontal from '../../assets/logo/horizontal.svg'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/create', label: 'Crear portafolio', end: false },
]

export function Header() {
  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 px-4 pt-4 sm:px-6"
    >
      <div className="glass-surface mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2 shadow-lg shadow-black/5 sm:px-5">
        <NavLink
          to="/"
          aria-label="Colectivo Raya — inicio"
          className="shine flex items-center rounded-full px-2 py-1"
        >
          <img
            src={logoHorizontal}
            alt="Colectivo Raya"
            className="h-8 sm:h-9"
          />
        </NavLink>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'shine rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink',
                  isActive && 'bg-accent-soft/30 text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
