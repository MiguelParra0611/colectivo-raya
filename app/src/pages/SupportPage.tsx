import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BubbleBurst } from '../components/shop/BubbleBurst'
import { GlassButton } from '../components/ui/GlassButton'
import { GlassPanel } from '../components/ui/GlassPanel'
import { artists } from '../data/artists'
import { cn } from '../lib/cn'
import { formatPrice } from '../lib/formatPrice'

const SUGGESTED_AMOUNTS = [5, 10, 25, 50]

export function SupportPage() {
  const [recipient, setRecipient] = useState<string>('colectivo')
  const [amount, setAmount] = useState<number | null>(10)
  const [customAmount, setCustomAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const effectiveAmount = customAmount ? Number(customAmount) : amount

  const recipients = [
    { id: 'colectivo', label: 'Todos los artistas' },
    ...artists.map((artist) => ({ id: artist.slug, label: artist.name })),
  ]

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <BubbleBurst play={submitted} />
      <p className="text-center text-sm uppercase tracking-[0.2em] text-accent-ink">
        Apoyar
      </p>
      <h1 className="mt-3 text-center font-display text-4xl font-semibold text-ink">
        Invita un café a un ilustrador
      </h1>
      <p className="mt-4 text-center text-ink-muted">
        Las donaciones son independientes de la tienda: van directo a apoyar el
        trabajo del colectivo. Esta es una demo — no se procesa ningún pago
        real.
      </p>

      <GlassPanel className="mt-10 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3 py-4 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-2 text-2xl text-ink">
                ✓
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                ¡Gracias por tu apoyo!
              </h2>
              <p className="text-ink-muted">
                Tu donación simulada de{' '}
                <span className="font-semibold text-ink">
                  {effectiveAmount ? formatPrice(effectiveAmount) : ''}
                </span>{' '}
                para{' '}
                <span className="font-semibold text-ink">
                  {recipients.find((r) => r.id === recipient)?.label}
                </span>{' '}
                fue registrada. Nada se cobró de verdad.
              </p>
              <GlassButton
                variant="primary"
                className="mt-3"
                onClick={() => {
                  setSubmitted(false)
                  setAmount(10)
                  setCustomAmount('')
                }}
              >
                Donar de nuevo
              </GlassButton>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={(event) => {
                event.preventDefault()
                setSubmitted(true)
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <p className="text-sm font-medium text-ink-muted">
                  ¿A quién quieres apoyar?
                </p>
                <div
                  role="radiogroup"
                  aria-label="Destinatario de la donación"
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {recipients.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={recipient === r.id}
                      onClick={() => setRecipient(r.id)}
                      className={cn(
                        'shine rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent-ink',
                        recipient === r.id
                          ? 'border-transparent bg-accent text-ink'
                          : 'glass-surface text-ink-muted hover:text-ink',
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-ink-muted">Monto</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTED_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={amount === value && !customAmount}
                      onClick={() => {
                        setAmount(value)
                        setCustomAmount('')
                      }}
                      className={cn(
                        'shine rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-accent-ink',
                        amount === value && !customAmount
                          ? 'border-transparent bg-accent text-ink'
                          : 'glass-surface text-ink-muted hover:text-ink',
                      )}
                    >
                      {formatPrice(value)}
                    </button>
                  ))}
                </div>
                <label
                  htmlFor="custom-amount"
                  className="mt-3 block text-sm text-ink-muted"
                >
                  O escribe otro monto
                </label>
                <input
                  id="custom-amount"
                  type="number"
                  min={1}
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder="Ej. 15"
                  className="glass-surface mt-1 w-40 rounded-xl px-3 py-2 text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-accent-ink"
                />
              </div>

              <GlassButton
                type="submit"
                variant="primary"
                disabled={!effectiveAmount || effectiveAmount <= 0}
                className="mt-2"
              >
                Donar {effectiveAmount ? formatPrice(effectiveAmount) : ''}
              </GlassButton>
            </motion.form>
          )}
        </AnimatePresence>
      </GlassPanel>
    </div>
  )
}
