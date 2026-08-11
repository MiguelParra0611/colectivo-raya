import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface Bubble {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  color: string
  /** Fracción del recorrido (0-1) donde la burbuja "revienta". `null` =
   *  no revienta, sigue subiendo hasta esconderse por arriba del todo. */
  popAt: number | null
}

const COLORS = [
  'var(--color-accent)',
  'var(--color-accent-soft)',
  'var(--color-accent-2)',
  'var(--color-accent-2-soft)',
]

function randomBubble(id: number): Bubble {
  const behavior = Math.random()
  const popAt =
    behavior < 0.35
      ? 0.4 + Math.random() * 0.2 // revienta a mitad de camino
      : behavior < 0.6
        ? 0.85 + Math.random() * 0.1 // revienta casi al llegar arriba
        : null // sigue de largo y se esconde arriba

  return {
    id,
    left: 4 + Math.random() * 92,
    size: 14 + Math.random() * 34,
    delay: Math.random() * 0.8,
    duration: 2.8 + Math.random() * 1.8,
    color: COLORS[id % COLORS.length],
    popAt,
  }
}

interface BubbleBurstProps {
  play: boolean
  count?: number
}

export function BubbleBurst({ play, count = 22 }: BubbleBurstProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [batchKey, setBatchKey] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!play || prefersReducedMotion) return
    setActive(true)
    setBatchKey((key) => key + 1)
    const timeout = setTimeout(() => setActive(false), 5200)
    return () => clearTimeout(timeout)
  }, [play, prefersReducedMotion])

  const bubbles = useMemo(
    () => Array.from({ length: count }, (_, i) => randomBubble(i)),
    // Se regenera cada vez que arranca un nuevo "lote" de burbujas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [batchKey, count],
  )

  if (!active) return null

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden"
    >
      {bubbles.map((bubble) => {
        const travel =
          typeof window === 'undefined' ? 800 : window.innerHeight + 80
        const popTravel = bubble.popAt !== null ? travel * bubble.popAt : null

        return (
          <motion.span
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: `${bubble.left}%`,
              bottom: -bubble.size,
              width: bubble.size,
              height: bubble.size,
              background: bubble.color,
              opacity: 0.85,
            }}
            initial={{ y: 0, opacity: 0, scale: 0.6 }}
            animate={
              popTravel !== null
                ? {
                    y: [0, -popTravel],
                    opacity: [0, 0.85, 0.85, 0],
                    scale: [0.6, 1, 1.15, 0],
                  }
                : {
                    y: [0, -travel],
                    opacity: [0, 0.85, 0.85, 0],
                    scale: [0.6, 1, 1, 0.85],
                  }
            }
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              ease: 'easeOut',
              times:
                popTravel !== null ? [0, 0.5, 0.92, 1] : [0, 0.15, 0.85, 1],
            }}
          />
        )
      })}
    </div>,
    document.body,
  )
}
