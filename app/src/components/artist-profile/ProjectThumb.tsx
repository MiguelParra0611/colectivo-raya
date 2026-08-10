import type { Project } from '../../data/types'
import { GlassCard } from '../ui/GlassCard'

interface ProjectThumbProps {
  project: Project
  onOpen: () => void
}

export function ProjectThumb({ project, onOpen }: ProjectThumbProps) {
  return (
    <GlassCard
      as="button"
      type="button"
      interactive
      onClick={onOpen}
      className="block w-full overflow-hidden p-0 text-left"
      aria-label={`Ver "${project.title}" en grande`}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={project.image.thumbSrc}
          alt={project.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
          {project.description}
        </p>
      </div>
    </GlassCard>
  )
}
