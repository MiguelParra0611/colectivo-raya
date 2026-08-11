import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckoutStepper,
  type CheckoutStep,
} from '../components/shop/CheckoutStepper'
import { GlassButton } from '../components/ui/GlassButton'
import { GlassPanel } from '../components/ui/GlassPanel'
import { generateFakeOrderId } from '../lib/fakeOrderId'
import { formatPrice } from '../lib/formatPrice'
import { useShop } from '../state/useShop'

const inputClassName =
  'glass-surface mt-1 w-full rounded-xl px-3 py-2 text-ink placeholder:text-ink-muted/60 focus-visible:outline-2 focus-visible:outline-accent-ink'

export function CheckoutPage() {
  const { cartProducts, cartTotal, clearCart } = useShop()
  const navigate = useNavigate()
  const [step, setStep] = useState<CheckoutStep>('contact')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [contact, setContact] = useState({ name: '', email: '' })

  if (cartProducts.length === 0 && step !== 'confirmation') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink">
          No hay nada que pagar todavía
        </h1>
        <p className="mt-3 text-ink-muted">
          Añade alguna ilustración al carrito antes de pasar por caja.
        </p>
        <Link to="/tienda" className="mt-6 inline-block">
          <GlassButton variant="primary">Ir a la tienda</GlassButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-center font-display text-4xl font-semibold text-ink">
        Pago
      </h1>
      <p className="mt-2 text-center text-sm text-ink-muted">
        Demo — no se procesa ningún cargo real.
      </p>

      <div className="mt-8">
        <CheckoutStepper currentStep={step} />
      </div>

      <GlassPanel className="mt-8 p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {step === 'contact' && (
            <motion.form
              key="contact"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              onSubmit={(event) => {
                event.preventDefault()
                setStep('payment')
              }}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="checkout-name"
                  className="text-sm font-medium text-ink-muted"
                >
                  Nombre completo
                </label>
                <input
                  id="checkout-name"
                  required
                  value={contact.name}
                  onChange={(event) =>
                    setContact((c) => ({ ...c, name: event.target.value }))
                  }
                  className={inputClassName}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="checkout-email"
                  className="text-sm font-medium text-ink-muted"
                >
                  Correo electrónico
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={contact.email}
                  onChange={(event) =>
                    setContact((c) => ({ ...c, email: event.target.value }))
                  }
                  className={inputClassName}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <GlassButton type="submit" variant="primary" className="mt-2">
                Continuar al pago
              </GlassButton>
            </motion.form>
          )}

          {step === 'payment' && (
            <motion.form
              key="payment"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              onSubmit={(event) => {
                event.preventDefault()
                const id = generateFakeOrderId()
                setOrderId(id)
                clearCart()
                setStep('confirmation')
              }}
              className="flex flex-col gap-4"
            >
              <p
                role="status"
                className="rounded-xl bg-accent-2-soft/50 px-3 py-2 text-xs text-ink-muted"
              >
                Esto es una simulación — no ingreses datos reales de tarjeta.
              </p>
              <div>
                <label
                  htmlFor="checkout-card"
                  className="text-sm font-medium text-ink-muted"
                >
                  Número de tarjeta (simulado)
                </label>
                <input
                  id="checkout-card"
                  required
                  inputMode="numeric"
                  maxLength={19}
                  className={inputClassName}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="checkout-expiry"
                    className="text-sm font-medium text-ink-muted"
                  >
                    Vencimiento
                  </label>
                  <input
                    id="checkout-expiry"
                    required
                    className={inputClassName}
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-cvc"
                    className="text-sm font-medium text-ink-muted"
                  >
                    CVC
                  </label>
                  <input
                    id="checkout-cvc"
                    required
                    inputMode="numeric"
                    maxLength={4}
                    className={inputClassName}
                    placeholder="123"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-4">
                <span className="text-sm text-ink-muted">Total a pagar</span>
                <span className="font-display text-xl font-semibold text-ink">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <GlassButton type="submit" variant="primary" className="mt-2">
                Confirmar pago simulado
              </GlassButton>
            </motion.form>
          )}

          {step === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3 py-4 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-2 text-2xl text-ink">
                ✓
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                ¡Listo, {contact.name || 'gracias'}!
              </h2>
              <p className="text-ink-muted">
                Tu pedido simulado{' '}
                <span className="font-semibold text-ink">#{orderId}</span> fue
                confirmado. Es solo una demo — no se realizó ningún cargo ni se
                envió ningún correo real.
              </p>
              <GlassButton
                variant="primary"
                className="mt-3"
                onClick={() => navigate('/tienda')}
              >
                Seguir explorando
              </GlassButton>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassPanel>
    </div>
  )
}
