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
    'bg-accent text-black font-medium border-transparent hover:brightness-110',
  secondary: 'glass-surface text-ink hover:bg-white/[0.12]',
  ghost:
    'border-transparent text-ink-muted hover:text-ink hover:bg-white/[0.06]',
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
          'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50',
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
