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

const ORNAMENTS: Record<Exclude<FrameStyle, 'none'>, Ornament[]> = {
  stars: [
    { style: { top: '4%', left: '3%' }, size: 28, delay: 0, color: ACCENT },
    {
      style: { top: '8%', right: '6%' },
      size: 20,
      delay: 0.6,
      color: ACCENT_2,
    },
    {
      style: { bottom: '10%', left: '8%' },
      size: 22,
      delay: 1.1,
      color: ACCENT_2,
    },
    {
      style: { bottom: '5%', right: '4%' },
      size: 32,
      delay: 0.3,
      color: ACCENT,
    },
    { style: { top: '45%', left: '1%' }, size: 16, delay: 1.6, color: ACCENT },
  ],
  butterflies: [
    { style: { top: '6%', left: '5%' }, size: 40, delay: 0, color: ACCENT },
    {
      style: { top: '12%', right: '8%' },
      size: 32,
      delay: 0.8,
      color: ACCENT_2,
    },
    {
      style: { bottom: '8%', left: '12%' },
      size: 30,
      delay: 1.4,
      color: ACCENT_2,
    },
    {
      style: { bottom: '14%', right: '6%' },
      size: 36,
      delay: 0.4,
      color: ACCENT,
    },
  ],
  vines: [
    { style: { top: '-2%', left: '2%' }, size: 64, delay: 0, color: ACCENT_2 },
    {
      style: { bottom: '-2%', right: '3%', transform: 'scaleX(-1)' },
      size: 64,
      delay: 0.5,
      color: ACCENT_2,
    },
    { style: { top: '20%', right: '1%' }, size: 40, delay: 1, color: ACCENT },
  ],
  cats: [
    { style: { bottom: '2%', left: '4%' }, size: 44, delay: 0, color: ACCENT },
    {
      style: { top: '6%', right: '5%', transform: 'scaleX(-1)' },
      size: 36,
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
      opacity: [0.5, 1, 0.5],
      scale: [0.9, 1.1, 0.9],
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
      className="pointer-events-none absolute inset-0 overflow-visible"
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
