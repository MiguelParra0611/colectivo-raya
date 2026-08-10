import {
  FRAME_STYLES,
  FRAME_STYLE_LABELS,
  type FrameStyle,
} from '../../data/types'
import { cn } from '../../lib/cn'
import { GlassButton } from '../ui/GlassButton'
import { ButterflyIcon, CatIcon, StarIcon, VineIcon } from './icons'
import type { ComponentType } from 'react'

interface FramePickerProps {
  value: FrameStyle
  onChange: (value: FrameStyle) => void
}

const PREVIEW_ICONS: Partial<
  Record<FrameStyle, ComponentType<{ className?: string }>>
> = {
  stars: StarIcon,
  butterflies: ButterflyIcon,
  vines: VineIcon,
  cats: CatIcon,
}

export function FramePicker({ value, onChange }: FramePickerProps) {
  return (
    <div
      role="group"
      aria-label="Elegir marco decorativo"
      className="flex flex-wrap gap-2"
    >
      {FRAME_STYLES.map((frameStyle) => {
        const Icon = PREVIEW_ICONS[frameStyle]
        const isSelected = value === frameStyle
        return (
          <GlassButton
            key={frameStyle}
            type="button"
            variant={isSelected ? 'primary' : 'secondary'}
            aria-pressed={isSelected}
            onClick={() => onChange(frameStyle)}
            className={cn(isSelected && 'ring-2 ring-accent ring-offset-0')}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {FRAME_STYLE_LABELS[frameStyle]}
          </GlassButton>
        )
      })}
    </div>
  )
}
