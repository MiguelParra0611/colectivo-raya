import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface GlassPanelOwnProps {
  as?: ElementType
  children?: ReactNode
  className?: string
}

type GlassPanelProps<T extends ElementType> = GlassPanelOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassPanelOwnProps>

export function GlassPanel<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: GlassPanelProps<T>) {
  const Component = as ?? 'div'
  return (
    <Component
      className={cn('glass-surface rounded-3xl shadow-2xl', className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
