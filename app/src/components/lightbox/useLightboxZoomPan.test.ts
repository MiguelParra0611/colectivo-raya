import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useLightboxZoomPan } from './useLightboxZoomPan'

describe('useLightboxZoomPan', () => {
  it('starts at scale 1, no offset, and not zoomed', () => {
    const { result } = renderHook(() => useLightboxZoomPan('image-a'))
    expect(result.current.scale).toBe(1)
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
    expect(result.current.isZoomed).toBe(false)
  })

  it('zooms in on wheel with a negative deltaY, up to the max scale', () => {
    const { result } = renderHook(() =>
      useLightboxZoomPan('image-a', { maxScale: 4, zoomStep: 1 }),
    )

    act(() => result.current.onWheel(-1))
    expect(result.current.scale).toBe(2)
    expect(result.current.isZoomed).toBe(true)

    act(() => result.current.onWheel(-1))
    act(() => result.current.onWheel(-1))
    act(() => result.current.onWheel(-1))
    act(() => result.current.onWheel(-1))
    expect(result.current.scale).toBe(4)
  })

  it('zooms out on wheel with a positive deltaY, never below the min scale of 1', () => {
    const { result } = renderHook(() =>
      useLightboxZoomPan('image-a', { zoomStep: 1 }),
    )

    act(() => result.current.onWheel(-1))
    expect(result.current.scale).toBe(2)

    act(() => result.current.onWheel(1))
    expect(result.current.scale).toBe(1)
    expect(result.current.isZoomed).toBe(false)

    act(() => result.current.onWheel(1))
    expect(result.current.scale).toBe(1)
  })

  it('resets the pan offset to 0 once zoomed back out to scale 1', () => {
    const { result } = renderHook(() =>
      useLightboxZoomPan('image-a', { zoomStep: 1 }),
    )

    act(() => result.current.onWheel(-1))
    act(() => result.current.pan(50, 50))
    expect(result.current.x).toBeGreaterThan(0)

    act(() => result.current.onWheel(1))
    expect(result.current.scale).toBe(1)
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('toggleZoom zooms in to a fixed scale, then back out to 1', () => {
    const { result } = renderHook(() =>
      useLightboxZoomPan('image-a', { toggleScale: 2.5 }),
    )

    act(() => result.current.toggleZoom())
    expect(result.current.scale).toBe(2.5)
    expect(result.current.isZoomed).toBe(true)

    act(() => result.current.toggleZoom())
    expect(result.current.scale).toBe(1)
    expect(result.current.isZoomed).toBe(false)
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('does not pan while at scale 1', () => {
    const { result } = renderHook(() => useLightboxZoomPan('image-a'))

    act(() => result.current.pan(80, 80))

    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
  })

  it('clamps the pan offset so the image cannot be dragged out of bounds', () => {
    const { result } = renderHook(() =>
      useLightboxZoomPan('image-a', { zoomStep: 1, panExtent: 100 }),
    )

    act(() => result.current.onWheel(-1)) // scale = 2 → bound = (2-1)*100 = 100
    act(() => result.current.pan(10_000, -10_000))

    expect(result.current.x).toBe(100)
    expect(result.current.y).toBe(-100)
  })

  it('resets scale, offset, and zoom state when the active image key changes', () => {
    const { result, rerender } = renderHook(
      ({ activeKey }: { activeKey: string }) => useLightboxZoomPan(activeKey),
      { initialProps: { activeKey: 'image-a' } },
    )

    act(() => result.current.toggleZoom())
    expect(result.current.scale).not.toBe(1)

    rerender({ activeKey: 'image-b' })

    expect(result.current.scale).toBe(1)
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
    expect(result.current.isZoomed).toBe(false)
  })

  it('reset() manually returns to the default zoom/pan state', () => {
    const { result } = renderHook(() => useLightboxZoomPan('image-a'))

    act(() => result.current.toggleZoom())
    act(() => result.current.reset())

    expect(result.current.scale).toBe(1)
    expect(result.current.x).toBe(0)
    expect(result.current.y).toBe(0)
    expect(result.current.isZoomed).toBe(false)
  })
})
