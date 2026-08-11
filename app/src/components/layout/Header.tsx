import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import logoHorizontal from '../../assets/logo/horizontal.svg'
import { cn } from '../../lib/cn'
import { useShop } from '../../state/useShop'
import { BagIcon, HeartIcon } from '../ui/icons'

const navItems = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/tienda', label: 'Tienda', end: false },
  { to: '/apoyar', label: 'Apoyar', end: false },
  { to: '/create', label: 'Crear portafolio', end: false },
]

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'shine whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink sm:px-4',
    isActive && 'bg-accent-soft/30 text-ink',
  )
}

interface IconLinkProps {
  to: string
  label: string
  count: number
  icon: ReactNode
}

function IconLink({ to, label, count, icon }: IconLinkProps) {
  return (
    <NavLink
      to={to}
      aria-label={`${label}${count > 0 ? ` (${count})` : ''}`}
      className="shine relative flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
    >
      {icon}
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-ink">
          {count}
        </span>
      )}
    </NavLink>
  )
}

export function Header() {
  const { cartCount, favoritesCount } = useShop()

  const iconLinks = (
    <>
      <IconLink
        to="/favoritos"
        label="Favoritos"
        count={favoritesCount}
        icon={<HeartIcon className="h-5 w-5" />}
      />
      <IconLink
        to="/carrito"
        label="Carrito"
        count={cartCount}
        icon={<BagIcon className="h-5 w-5" />}
      />
    </>
  )

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-40 px-4 pt-4 sm:px-6"
    >
      <div className="glass-surface mx-auto flex max-w-5xl flex-col gap-2 rounded-3xl px-4 py-3 shadow-lg shadow-black/5 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-5 sm:py-2">
        <div className="flex items-center justify-between gap-2">
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
          <div className="flex items-center gap-1 sm:hidden">{iconLinks}</div>
        </div>

        <nav
          aria-label="Principal"
          className="flex flex-wrap items-center gap-1"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClassName}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-1 sm:flex">{iconLinks}</div>
      </div>
    </motion.header>
  )
}
