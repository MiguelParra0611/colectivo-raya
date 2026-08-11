import { cn } from '../../lib/cn'

export type CheckoutStep = 'contact' | 'payment' | 'confirmation'

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'contact', label: 'Contacto' },
  { id: 'payment', label: 'Pago' },
  { id: 'confirmation', label: 'Confirmación' },
]

interface CheckoutStepperProps {
  currentStep: CheckoutStep
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex
        const isCurrent = index === currentIndex
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                  isDone && 'bg-accent-2 text-white',
                  isCurrent && 'bg-accent text-ink',
                  !isDone && !isCurrent && 'bg-ink/10 text-ink-muted',
                )}
              >
                {isDone ? '✓' : index + 1}
              </span>
              <span
                className={cn(
                  'text-sm',
                  isCurrent ? 'font-semibold text-ink' : 'text-ink-muted',
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <span className="h-px w-6 bg-ink/15 sm:w-10" aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
