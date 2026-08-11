import { act, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BubbleBurst } from './BubbleBurst'

describe('BubbleBurst', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing when play is false', () => {
    render(<BubbleBurst play={false} count={5} />)
    expect(document.querySelectorAll('span').length).toBe(0)
  })

  it('renders the requested number of bubbles when play is true', () => {
    render(<BubbleBurst play={true} count={5} />)
    expect(document.querySelectorAll('span').length).toBe(5)
  })

  it('clears the bubbles automatically after its lifetime', () => {
    render(<BubbleBurst play={true} count={5} />)
    expect(document.querySelectorAll('span').length).toBe(5)

    act(() => {
      vi.advanceTimersByTime(6000)
    })

    expect(document.querySelectorAll('span').length).toBe(0)
  })
})
