import { motion, type Variants } from 'framer-motion'
import type { ComponentType, CSSProperties } from 'react'
import type { FrameStyle } from '../../data/types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ButterflyIcon, CatIcon, StarIcon, VineIcon } from './icons'

interface FrameRendererProps {
  frameStyle: FrameStyle
}

interface Ornament {
  style: CSSProperties
  size: number
  delay: number
  color: string
}

const ACCENT = 'var(--color-accent)'
const ACCENT_2 = 'var(--color-accent-2)'

// Los adornos se posicionan a propósito asomando fuera del borde del panel
// (offsets negativos / mayores a 100%) para que se lean como un marco que
// rodea la tarjeta, no como iconos sueltos flotando dentro de ella.
const ORNAMENTS: Record<Exclude<FrameStyle, 'none'>, Ornament[]> = {
  stars: [
    { style: { top: '-6%', left: '-4%' }, size: 44, delay: 0, color: ACCENT },
    {
      style: { top: '-4%', right: '-3%' },
      size: 34,
      delay: 0.6,
      color: ACCENT_2,
    },
    {
      style: { bottom: '-5%', left: '10%' },
      size: 30,
      delay: 1.1,
      color: ACCENT_2,
    },
    {
      style: { bottom: '-6%', right: '8%' },
      size: 48,
      delay: 0.3,
      color: ACCENT,
    },
    {
      style: { top: '40%', left: '-3%' },
      size: 26,
      delay: 1.6,
      color: ACCENT,
    },
    {
      style: { top: '15%', right: '-3%' },
      size: 22,
      delay: 2,
      color: ACCENT_2,
    },
  ],
  butterflies: [
    { style: { top: '-8%', left: '-3%' }, size: 56, delay: 0, color: ACCENT },
    {
      style: { top: '-6%', right: '-4%' },
      size: 48,
      delay: 0.8,
      color: ACCENT_2,
    },
    {
      style: { bottom: '-8%', left: '14%' },
      size: 44,
      delay: 1.4,
      color: ACCENT_2,
    },
    {
      style: { bottom: '-6%', right: '10%' },
      size: 52,
      delay: 0.4,
      color: ACCENT,
    },
  ],
  vines: [
    {
      style: { top: '-4%', left: '-2%' },
      size: 96,
      delay: 0,
      color: ACCENT_2,
    },
    {
      style: { bottom: '-4%', right: '-2%', transform: 'scaleX(-1)' },
      size: 96,
      delay: 0.5,
      color: ACCENT_2,
    },
    {
      style: { top: '25%', right: '-4%' },
      size: 60,
      delay: 1,
      color: ACCENT,
    },
  ],
  cats: [
    {
      style: { bottom: '-6%', left: '2%' },
      size: 64,
      delay: 0,
      color: ACCENT,
    },
    {
      style: { top: '-6%', right: '4%', transform: 'scaleX(-1)' },
      size: 52,
      delay: 0.9,
      color: ACCENT_2,
    },
  ],
}

const ICONS: Record<
  Exclude<FrameStyle, 'none'>,
  ComponentType<{ className?: string }>
> = {
  stars: StarIcon,
  butterflies: ButterflyIcon,
  vines: VineIcon,
  cats: CatIcon,
}

const idleVariants: Record<Exclude<FrameStyle, 'none'>, Variants> = {
  stars: {
    idle: (delay: number) => ({
      opacity: [0.75, 1, 0.75],
      scale: [0.95, 1.12, 0.95],
      transition: { duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' },
    }),
  },
  butterflies: {
    idle: (delay: number) => ({
      y: [0, -10, 0],
      rotate: [-4, 4, -4],
      transition: { duration: 3.2, repeat: Infinity, delay, ease: 'easeInOut' },
    }),
  },
  vines: {
    idle: (delay: number) => ({
      rotate: [-2, 2, -2],
      transition: { duration: 5, repeat: Infinity, delay, ease: 'easeInOut' },
    }),
  },
  cats: {
    idle: (delay: number) => ({
      rotate: [0, -3, 0, 3, 0],
      transition: { duration: 4, repeat: Infinity, delay, ease: 'easeInOut' },
    }),
  },
}

export function FrameRenderer({ frameStyle }: FrameRendererProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (frameStyle === 'none') return null

  const Icon = ICONS[frameStyle]
  const ornaments = ORNAMENTS[frameStyle]
  const variants = idleVariants[frameStyle]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
    >
      {ornaments.map((ornament, index) => (
        <motion.div
          key={index}
          className="absolute drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          style={{
            ...ornament.style,
            color: ornament.color,
            width: ornament.size,
            height: ornament.size,
          }}
          custom={ornament.delay}
          animate={prefersReducedMotion ? undefined : 'idle'}
          variants={variants}
        >
          <Icon className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  )
}
