import { AnimatePresence, motion } from 'framer-motion'
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { BubbleBurst } from '../shop/BubbleBurst'
import { GlassButton } from '../ui/GlassButton'

type ReviewPhase = 'disclaimer' | 'reviewing' | 'accepted'

interface SubmitPortfolioModalProps {
  isOpen: boolean
  artistName?: string
  onClose: () => void
}

export function SubmitPortfolioModal({
  isOpen,
  artistName = '',
  onClose,
}: SubmitPortfolioModalProps) {
  const [phase, setPhase] = useState<ReviewPhase>('disclaimer')
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<Element | null>(null)

  useEffect(() => {
    if (isOpen) setPhase('disclaimer')
  }, [isOpen])

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

  useEffect(() => {
    if (phase !== 'reviewing') return
    const timeout = setTimeout(() => setPhase('accepted'), 1800)
    return () => clearTimeout(timeout)
  }, [phase])

  const handleKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Escape' && phase !== 'reviewing') onClose()
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Enviar portafolio para revisión"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            disabled={phase === 'reviewing'}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm disabled:cursor-not-allowed"
            onClick={() => phase !== 'reviewing' && onClose()}
          />

          <motion.div
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {phase === 'disclaimer' && (
              <>
                <p className="text-sm uppercase tracking-[0.2em] text-accent-ink">
                  Antes de enviar
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-ink">
                  Tu portafolio será revisado
                </h2>
                <p className="mt-4 text-sm text-ink-muted">
                  Para exhibir tu portafolio en Colectivo Raya, nuestro equipo
                  de talento lo revisará primero para saber si calificas. Esto
                  es una simulación: nadie va a revisar nada de verdad, pero así
                  funcionaría el proceso real.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <GlassButton
                    ref={closeButtonRef}
                    variant="secondary"
                    onClick={onClose}
                  >
                    Cancelar
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    onClick={() => setPhase('reviewing')}
                  >
                    Enviar para revisión
                  </GlassButton>
                </div>
              </>
            )}

            {phase === 'reviewing' && (
              <div className="flex flex-col items-center gap-4 py-6">
                <motion.div
                  className="h-10 w-10 rounded-full border-4 border-accent-soft border-t-accent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <p className="font-display text-lg font-semibold text-ink">
                  Revisando tu portafolio…
                </p>
                <p className="text-sm text-ink-muted">
                  Colectivo Raya lo está echando un vistazo.
                </p>
              </div>
            )}

            {phase === 'accepted' && (
              <>
                <BubbleBurst play />
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-2 text-2xl text-ink mx-auto">
                  ✓
                </div>
                <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                  ¡Bienvenido, {artistName || 'artista'}!
                </h2>
                <p className="mt-3 text-sm text-ink-muted">
                  El equipo de Colectivo Raya revisó tu portafolio y quiere
                  exhibirlo. Pronto te contactaremos para hablar de la cesión de
                  derechos y promocionar tu trabajo con el colectivo.
                </p>
                <p className="mt-3 text-xs text-ink-muted/70">
                  Simulación — no se envió ni se revisó nada real.
                </p>
                <GlassButton
                  variant="primary"
                  className="mt-6"
                  onClick={onClose}
                >
                  Genial
                </GlassButton>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
