import { GlassButton } from '../ui/GlassButton'
import { DropzoneUploader } from './DropzoneUploader'
import type { DraftProject } from './portfolioDraftReducer'

interface ProjectDraftEditorProps {
  project: DraftProject
  index: number
  canRemove: boolean
  onImageAccepted: (file: File, previewUrl: string) => void
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
  onRemove: () => void
}

export function ProjectDraftEditor({
  project,
  index,
  canRemove,
  onImageAccepted,
  onTitleChange,
  onDescriptionChange,
  onRemove,
}: ProjectDraftEditorProps) {
  const titleId = `project-title-${project.id}`
  const descriptionId = `project-description-${project.id}`

  return (
    <div className="glass-surface rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink">
          Proyecto {index + 1}
        </h3>
        {canRemove && (
          <GlassButton variant="ghost" onClick={onRemove}>
            Quitar
          </GlassButton>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr]">
        <DropzoneUploader
          label={`Imagen del proyecto ${index + 1}`}
          onFileAccepted={onImageAccepted}
        />
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor={titleId}
              className="text-sm font-medium text-ink-muted"
            >
              Título del proyecto
            </label>
            <input
              id={titleId}
              type="text"
              value={project.title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="Ej. Retrato nocturno"
              className="glass-surface mt-1 w-full rounded-xl px-3 py-2 text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div>
            <label
              htmlFor={descriptionId}
              className="text-sm font-medium text-ink-muted"
            >
              Descripción del proyecto
            </label>
            <textarea
              id={descriptionId}
              value={project.description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="Cuenta brevemente de qué trata este proyecto…"
              rows={3}
              className="glass-surface mt-1 w-full resize-none rounded-xl px-3 py-2 text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
