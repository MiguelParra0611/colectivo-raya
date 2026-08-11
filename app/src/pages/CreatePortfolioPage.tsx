import { useReducer } from 'react'
import { FramePicker } from '../components/frames/FramePicker'
import { LivePreviewCard } from '../components/create-portfolio/LivePreviewCard'
import { ProjectDraftEditor } from '../components/create-portfolio/ProjectDraftEditor'
import {
  createInitialDraft,
  portfolioDraftReducer,
} from '../components/create-portfolio/portfolioDraftReducer'
import { GlassButton } from '../components/ui/GlassButton'

export function CreatePortfolioPage() {
  const [draft, dispatch] = useReducer(
    portfolioDraftReducer,
    undefined,
    createInitialDraft,
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-ink">
        Crear portafolio
      </h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Esta es una demo funcional en memoria: arrastra imágenes reales, escribe
        una descripción de tu portafolio y de cada proyecto, y prueba los marcos
        decorativos. Nada se guarda — al recargar la página, todo vuelve a
        empezar.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <div className="glass-surface rounded-3xl p-5">
            <label
              htmlFor="portfolio-description"
              className="text-sm font-medium text-ink-muted"
            >
              Descripción del portafolio
            </label>
            <textarea
              id="portfolio-description"
              value={draft.portfolioDescription}
              onChange={(event) =>
                dispatch({
                  type: 'SET_DESCRIPTION',
                  description: event.target.value,
                })
              }
              placeholder="Cuenta quién eres y qué tipo de trabajo compartes…"
              rows={3}
              className="glass-surface mt-1 w-full resize-none rounded-xl px-3 py-2 text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-accent-ink"
            />
          </div>

          <div className="glass-surface rounded-3xl p-5">
            <p className="text-sm font-medium text-ink-muted">
              Marco decorativo
            </p>
            <div className="mt-3">
              <FramePicker
                value={draft.frameStyle}
                onChange={(frameStyle) =>
                  dispatch({ type: 'SET_FRAME', frameStyle })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {draft.projects.map((project, index) => (
              <ProjectDraftEditor
                key={project.id}
                project={project}
                index={index}
                canRemove={draft.projects.length > 1}
                onImageAccepted={(_file, previewUrl) =>
                  dispatch({
                    type: 'SET_PROJECT_IMAGE',
                    id: project.id,
                    previewUrl,
                  })
                }
                onTitleChange={(title) =>
                  dispatch({ type: 'SET_PROJECT_TITLE', id: project.id, title })
                }
                onDescriptionChange={(description) =>
                  dispatch({
                    type: 'SET_PROJECT_DESCRIPTION',
                    id: project.id,
                    description,
                  })
                }
                onRemove={() =>
                  dispatch({ type: 'REMOVE_PROJECT', id: project.id })
                }
              />
            ))}
          </div>

          <GlassButton
            variant="secondary"
            className="self-start"
            onClick={() => dispatch({ type: 'ADD_PROJECT' })}
          >
            + Añadir proyecto
          </GlassButton>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LivePreviewCard draft={draft} />
        </div>
      </div>
    </div>
  )
}
