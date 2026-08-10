import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children?: ReactNode
  interactive?: boolean
}

export function GlassCard({
  className,
  children,
  interactive = false,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-surface rounded-3xl p-6 shadow-2xl',
        interactive && 'cursor-pointer transition-shadow hover:shadow-black/40',
        className,
      )}
      whileHover={interactive ? { y: -6, scale: 1.015 } : undefined}
      whileTap={interactive ? { scale: 0.99 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
