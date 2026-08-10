import { useCallback, useEffect, useState } from 'react'

interface UseImageCyclerOptions {
  intervalMs?: number
}

interface UseImageCyclerResult {
  index: number
  isPaused: boolean
  pause: () => void
  resume: () => void
}

const DEFAULT_INTERVAL_MS = 3000

export function useImageCycler(
  itemCount: number,
  { intervalMs = DEFAULT_INTERVAL_MS }: UseImageCyclerOptions = {},
): UseImageCyclerResult {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  useEffect(() => {
    if (itemCount <= 1 || isPaused) return

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % itemCount)
    }, intervalMs)

    return () => clearInterval(id)
  }, [itemCount, intervalMs, isPaused])

  useEffect(() => {
    if (index >= itemCount) setIndex(0)
  }, [itemCount, index])

  return { index, isPaused, pause, resume }
}
