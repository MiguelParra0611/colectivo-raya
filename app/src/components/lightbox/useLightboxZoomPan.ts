import { useCallback, useEffect, useState } from 'react'

interface UseLightboxZoomPanOptions {
  minScale?: number
  maxScale?: number
  zoomStep?: number
  toggleScale?: number
  panExtent?: number
}

interface UseLightboxZoomPanResult {
  scale: number
  x: number
  y: number
  isZoomed: boolean
  zoomIn: () => void
  zoomOut: () => void
  toggleZoom: () => void
  onWheel: (deltaY: number) => void
  pan: (deltaX: number, deltaY: number) => void
  reset: () => void
}

const DEFAULTS = {
  minScale: 1,
  maxScale: 4,
  zoomStep: 0.5,
  toggleScale: 2.5,
  panExtent: 150,
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function useLightboxZoomPan(
  activeKey: unknown,
  options: UseLightboxZoomPanOptions = {},
): UseLightboxZoomPanResult {
  const minScale = options.minScale ?? DEFAULTS.minScale
  const maxScale = options.maxScale ?? DEFAULTS.maxScale
  const zoomStep = options.zoomStep ?? DEFAULTS.zoomStep
  const toggleScale = options.toggleScale ?? DEFAULTS.toggleScale
  const panExtent = options.panExtent ?? DEFAULTS.panExtent

  const [scale, setScale] = useState(minScale)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const reset = useCallback(() => {
    setScale(minScale)
    setX(0)
    setY(0)
  }, [minScale])

  // Cambiar de imagen siempre vuelve a la vista sin zoom ni desplazamiento.
  useEffect(() => {
    setScale(minScale)
    setX(0)
    setY(0)
    // Sólo debe dispararse cuando cambia activeKey, no cuando cambian los
    // setters (son estables) — minScale es prácticamente constante.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey])

  const clampPan = useCallback(
    (nextScale: number, nextX: number, nextY: number) => {
      const bound = (nextScale - minScale) * panExtent
      return {
        x: clamp(nextX, -bound, bound),
        y: clamp(nextY, -bound, bound),
      }
    },
    [minScale, panExtent],
  )

  const applyScale = useCallback(
    (nextScale: number) => {
      const clampedScale = clamp(nextScale, minScale, maxScale)
      setScale(clampedScale)
      if (clampedScale <= minScale) {
        setX(0)
        setY(0)
      } else {
        setX((current) => clampPan(clampedScale, current, 0).x)
        setY((current) => clampPan(clampedScale, 0, current).y)
      }
    },
    [minScale, maxScale, clampPan],
  )

  const zoomIn = useCallback(
    () => applyScale(scale + zoomStep),
    [applyScale, scale, zoomStep],
  )
  const zoomOut = useCallback(
    () => applyScale(scale - zoomStep),
    [applyScale, scale, zoomStep],
  )
  const onWheel = useCallback(
    (deltaY: number) => applyScale(scale - Math.sign(deltaY) * zoomStep),
    [applyScale, scale, zoomStep],
  )

  const toggleZoom = useCallback(() => {
    applyScale(scale > minScale ? minScale : toggleScale)
  }, [applyScale, scale, minScale, toggleScale])

  const pan = useCallback(
    (deltaX: number, deltaY: number) => {
      if (scale <= minScale) return
      setX((current) => clampPan(scale, current + deltaX, 0).x)
      setY((current) => clampPan(scale, 0, current + deltaY).y)
    },
    [scale, minScale, clampPan],
  )

  return {
    scale,
    x,
    y,
    isZoomed: scale > minScale,
    zoomIn,
    zoomOut,
    toggleZoom,
    onWheel,
    pan,
    reset,
  }
}
