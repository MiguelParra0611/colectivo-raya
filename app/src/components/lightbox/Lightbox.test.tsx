import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Project } from '../../data/types'
import { Lightbox } from './Lightbox'

const projects: Project[] = [
  {
    id: 'a',
    title: 'Proyecto A',
    description: 'Descripción A',
    image: { thumbSrc: '/a-thumb.webp', fullSrc: '/a-full.webp', alt: 'A' },
  },
  {
    id: 'b',
    title: 'Proyecto B',
    description: 'Descripción B',
    image: { thumbSrc: '/b-thumb.webp', fullSrc: '/b-full.webp', alt: 'B' },
  },
]

describe('Lightbox', () => {
  it('renders nothing when there is no active index', () => {
    render(
      <Lightbox
        projects={projects}
        activeIndex={null}
        onClose={vi.fn()}
        onIndexChange={vi.fn()}
      />,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the active project title and description when open', () => {
    render(
      <Lightbox
        projects={projects}
        activeIndex={0}
        onClose={vi.fn()}
        onIndexChange={vi.fn()}
      />,
    )
    expect(
      screen.getByRole('heading', { name: 'Proyecto A' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Descripción A')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <Lightbox
        projects={projects}
        activeIndex={0}
        onClose={onClose}
        onIndexChange={vi.fn()}
      />,
    )
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the backdrop is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Lightbox
        projects={projects}
        activeIndex={0}
        onClose={onClose}
        onIndexChange={vi.fn()}
      />,
    )
    const [backdropButton] = screen.getAllByRole('button', {
      name: 'Cerrar vista ampliada',
    })
    await user.click(backdropButton)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when the image itself is clicked (only toggles zoom)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(
      <Lightbox
        projects={projects}
        activeIndex={0}
        onClose={onClose}
        onIndexChange={vi.fn()}
      />,
    )
    await user.click(screen.getByRole('img', { name: 'A' }))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('navigates to the next and previous project, wrapping around', async () => {
    const user = userEvent.setup()
    const onIndexChange = vi.fn()
    render(
      <Lightbox
        projects={projects}
        activeIndex={1}
        onClose={vi.fn()}
        onIndexChange={onIndexChange}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Proyecto siguiente' }))
    expect(onIndexChange).toHaveBeenCalledWith(0)

    await user.click(screen.getByRole('button', { name: 'Proyecto anterior' }))
    expect(onIndexChange).toHaveBeenCalledWith(0)
  })

  it('hides prev/next navigation when there is only one project', () => {
    render(
      <Lightbox
        projects={[projects[0]]}
        activeIndex={0}
        onClose={vi.fn()}
        onIndexChange={vi.fn()}
      />,
    )
    expect(
      screen.queryByRole('button', { name: 'Proyecto siguiente' }),
    ).not.toBeInTheDocument()
  })
})
