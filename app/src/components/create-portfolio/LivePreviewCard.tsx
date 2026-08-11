import { FrameRenderer } from '../frames/FrameRenderer'
import { GlassPanel } from '../ui/GlassPanel'
import type { PortfolioDraft } from './portfolioDraftReducer'

interface LivePreviewCardProps {
  draft: PortfolioDraft
}

export function LivePreviewCard({ draft }: LivePreviewCardProps) {
  const projectsWithImage = draft.projects.filter(
    (project) => project.previewUrl,
  )

  return (
    <div className="relative">
      <FrameRenderer frameStyle={draft.frameStyle} />
      <GlassPanel className="p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-ink">
          Vista previa
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
          Tu portafolio
        </h3>
        <p className="mt-3 min-h-[1.5em] text-ink-muted">
          {draft.portfolioDescription || 'La descripción aparecerá aquí…'}
        </p>

        {projectsWithImage.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {projectsWithImage.map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-xl bg-black/20"
              >
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={project.previewUrl ?? undefined}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="truncate p-2 text-xs text-ink-muted">
                  {project.title || 'Sin título'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-ink-muted">
            Sube al menos una imagen para verla aquí.
          </p>
        )}
      </GlassPanel>
    </div>
  )
}
