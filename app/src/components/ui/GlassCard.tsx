import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { useMemo } from 'react'
import { cn } from '../../lib/cn'

interface GlassCardOwnProps<T extends ElementType> {
  as?: T
  children?: ReactNode
  interactive?: boolean
  className?: string
}

type GlassCardProps<T extends ElementType> = GlassCardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassCardOwnProps<T>>

export function GlassCard<T extends ElementType = 'div'>({
  as,
  className,
  children,
  interactive = false,
  ...rest
}: GlassCardProps<T>) {
  const MotionComponent = useMemo(() => motion.create(as ?? 'div'), [as])

  return (
    <MotionComponent
      className={cn(
        'glass-surface rounded-3xl p-6 shadow-2xl',
        interactive &&
          'shine cursor-pointer transition-shadow hover:shadow-black/20',
        className,
      )}
      whileHover={interactive ? { y: -6, scale: 1.015 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </MotionComponent>
  )
}
