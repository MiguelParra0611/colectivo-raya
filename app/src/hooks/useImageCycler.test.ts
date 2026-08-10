import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useImageCycler } from './useImageCycler'

describe('useImageCycler', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts at index 0', () => {
    const { result } = renderHook(() => useImageCycler(3, { intervalMs: 1000 }))
    expect(result.current.index).toBe(0)
  })

  it('advances to the next index after intervalMs elapses', () => {
    const { result } = renderHook(() => useImageCycler(3, { intervalMs: 1000 }))

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.index).toBe(1)
  })

  it('wraps around from the last index back to 0', () => {
    const { result } = renderHook(() => useImageCycler(3, { intervalMs: 1000 }))

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(result.current.index).toBe(0)
  })

  it('stops advancing while paused', () => {
    const { result } = renderHook(() => useImageCycler(3, { intervalMs: 1000 }))

    act(() => {
      result.current.pause()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.index).toBe(0)
    expect(result.current.isPaused).toBe(true)
  })

  it('resumes advancing after resume() without double-firing', () => {
    const { result } = renderHook(() => useImageCycler(3, { intervalMs: 1000 }))

    act(() => {
      result.current.pause()
    })
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    act(() => {
      result.current.resume()
    })
    expect(result.current.index).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.index).toBe(1)
  })

  it('clears its interval on unmount (no further advances possible)', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const { unmount } = renderHook(() =>
      useImageCycler(3, { intervalMs: 1000 }),
    )

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  it('stays at index 0 and does not schedule a timer for 0 items', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const { result } = renderHook(() => useImageCycler(0, { intervalMs: 1000 }))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.index).toBe(0)
    expect(setIntervalSpy).not.toHaveBeenCalled()
    setIntervalSpy.mockRestore()
  })

  it('stays at index 0 and does not schedule a timer for 1 item', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const { result } = renderHook(() => useImageCycler(1, { intervalMs: 1000 }))

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.index).toBe(0)
    expect(setIntervalSpy).not.toHaveBeenCalled()
    setIntervalSpy.mockRestore()
  })
})
