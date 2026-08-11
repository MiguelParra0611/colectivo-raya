import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type GlassButtonVariant = 'primary' | 'secondary' | 'ghost'

interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: ReactNode
  variant?: GlassButtonVariant
}

const variantClasses: Record<GlassButtonVariant, string> = {
  primary:
    'bg-accent text-ink font-semibold border-transparent hover:brightness-105',
  secondary: 'glass-surface text-ink hover:bg-accent-soft/25',
  ghost: 'border-transparent text-ink-muted hover:text-ink hover:bg-ink/5',
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton(
    { className, children, variant = 'secondary', type = 'button', ...rest },
    ref,
  ) {
    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(
          'shine inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          className,
        )}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        {...rest}
      >
        {children}
      </motion.button>
    )
  },
)
