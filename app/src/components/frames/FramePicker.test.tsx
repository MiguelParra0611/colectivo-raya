import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FramePicker } from './FramePicker'

describe('FramePicker', () => {
  it('renders one option per frame style, including "Ninguno"', () => {
    render(<FramePicker value="none" onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Ninguno' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Estrellas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Mariposas' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Enredaderas' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Gatos' })).toBeInTheDocument()
  })

  it('marks the currently selected option as pressed', () => {
    render(<FramePicker value="stars" onChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Estrellas' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Ninguno' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('calls onChange with the clicked frame style', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FramePicker value="none" onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Mariposas' }))

    expect(onChange).toHaveBeenCalledWith('butterflies')
  })

  it('is keyboard-operable: Enter on a focused option selects it', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<FramePicker value="none" onChange={onChange} />)

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalled()
  })
})
