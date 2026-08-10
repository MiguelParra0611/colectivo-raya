import { AnimatePresence, motion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../../data/types'
import { GlassButton } from '../ui/GlassButton'
import { useLightboxZoomPan } from './useLightboxZoomPan'

interface LightboxProps {
  projects: Project[]
  activeIndex: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function Lightbox({
  projects,
  activeIndex,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const project = activeIndex !== null ? projects[activeIndex] : undefined
  const containerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<Element | null>(null)
  const dragState = useRef<{ x: number; y: number } | null>(null)

  const { scale, x, y, isZoomed, zoomIn, zoomOut, toggleZoom, onWheel, pan } =
    useLightboxZoomPan(project?.id ?? null)

  const isOpen = project !== undefined

  useEffect(() => {
    if (!isOpen) return
    lastFocusedRef.current = document.activeElement
    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      if (lastFocusedRef.current instanceof HTMLElement) {
        lastFocusedRef.current.focus()
      }
    }
  }, [isOpen])

  const goPrev = useCallback(() => {
    if (activeIndex === null) return
    onIndexChange((activeIndex - 1 + projects.length) % projects.length)
  }, [activeIndex, onIndexChange, projects.length])

  const goNext = useCallback(() => {
    if (activeIndex === null) return
    onIndexChange((activeIndex + 1) % projects.length)
  }, [activeIndex, onIndexChange, projects.length])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key === 'ArrowLeft') goPrev()
    if (event.key === 'ArrowRight') goNext()

    if (event.key === 'Tab') {
      const container = containerRef.current
      if (!container) return
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!isZoomed) return
    dragState.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!dragState.current) return
    const deltaX = event.clientX - dragState.current.x
    const deltaY = event.clientY - dragState.current.y
    dragState.current = { x: event.clientX, y: event.clientY }
    pan(deltaX, deltaY)
  }

  const handlePointerUp = () => {
    dragState.current = null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="lightbox"
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — vista ampliada`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Cerrar vista ampliada"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="glass-surface flex items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-semibold text-ink">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <GlassButton
                  variant="ghost"
                  aria-label="Alejar"
                  onClick={zoomOut}
                  disabled={scale <= 1}
                >
                  −
                </GlassButton>
                <GlassButton
                  variant="ghost"
                  aria-label="Acercar"
                  onClick={zoomIn}
                >
                  +
                </GlassButton>
                <GlassButton
                  ref={closeButtonRef}
                  variant="secondary"
                  aria-label="Cerrar vista ampliada"
                  onClick={onClose}
                >
                  Cerrar
                </GlassButton>
              </div>
            </div>

            <div
              className="relative flex-1 overflow-hidden bg-black/40"
              onWheel={(event) => {
                event.preventDefault()
                onWheel(event.deltaY)
              }}
            >
              {projects.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Proyecto anterior"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Proyecto siguiente"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    ›
                  </button>
                </>
              )}
              <div className="flex h-[60vh] items-center justify-center">
                <motion.img
                  key={project.id}
                  src={project.image.fullSrc}
                  alt={project.image.alt}
                  onDoubleClick={toggleZoom}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="max-h-full max-w-full touch-none select-none object-contain"
                  style={{ cursor: isZoomed ? 'grab' : 'zoom-in' }}
                  animate={{ scale, x, y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={() => {
                    if (!isZoomed) toggleZoom()
                  }}
                />
              </div>
            </div>

            <div className="glass-surface px-5 py-4">
              <p className="text-sm text-ink-muted">{project.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
