import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FrameRenderer } from './FrameRenderer'

describe('FrameRenderer', () => {
  it('renders no SVG ornaments for frameStyle "none"', () => {
    const { container } = render(<FrameRenderer frameStyle="none" />)
    expect(container.querySelectorAll('svg').length).toBe(0)
  })

  it('renders SVG ornaments for the "stars" frame', () => {
    const { container } = render(<FrameRenderer frameStyle="stars" />)
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('renders SVG ornaments for the "butterflies" frame', () => {
    const { container } = render(<FrameRenderer frameStyle="butterflies" />)
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('renders SVG ornaments for the "vines" frame', () => {
    const { container } = render(<FrameRenderer frameStyle="vines" />)
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('renders SVG ornaments for the "cats" frame', () => {
    const { container } = render(<FrameRenderer frameStyle="cats" />)
    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })

  it('marks the ornament layer as decorative for assistive technology', () => {
    const { container } = render(<FrameRenderer frameStyle="stars" />)
    const layer = container.firstElementChild
    expect(layer).toHaveAttribute('aria-hidden', 'true')
  })
})
