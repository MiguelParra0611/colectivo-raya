import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DropzoneUploader } from './DropzoneUploader'

function makeImageFile(name = 'artwork.png') {
  return new File([new Uint8Array(10)], name, { type: 'image/png' })
}

describe('DropzoneUploader', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockImplementation(
      (blob) => `blob:mock/${(blob as File).name}`,
    )
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  })

  it('shows instructions when no file has been chosen yet', () => {
    render(<DropzoneUploader label="Subir imagen" onFileAccepted={vi.fn()} />)
    expect(screen.getByText(/arrastra una imagen/i)).toBeInTheDocument()
  })

  it('opens the file picker when the dropzone is clicked', async () => {
    const user = userEvent.setup()
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click')
    render(<DropzoneUploader label="Subir imagen" onFileAccepted={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Subir imagen' }))

    expect(clickSpy).toHaveBeenCalled()
  })

  it('opens the file picker when Enter is pressed on the focused dropzone', async () => {
    const user = userEvent.setup()
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click')
    render(<DropzoneUploader label="Subir imagen" onFileAccepted={vi.fn()} />)

    screen.getByRole('button', { name: 'Subir imagen' }).focus()
    await user.keyboard('{Enter}')

    expect(clickSpy).toHaveBeenCalled()
  })

  it('accepts a valid image chosen via the hidden file input', async () => {
    const user = userEvent.setup()
    const onFileAccepted = vi.fn()
    render(
      <DropzoneUploader label="Subir imagen" onFileAccepted={onFileAccepted} />,
    )
    const image = makeImageFile()

    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement
    await user.upload(input, image)

    expect(onFileAccepted).toHaveBeenCalledWith(image, 'blob:mock/artwork.png')
  })

  it('shows an error and does not accept a non-image file dropped onto the dropzone', () => {
    // Se prueba vía drag-and-drop (no vía el <input accept="image/*">, que
    // el navegador/user-event ya filtra por tipo antes de llegar a nuestro
    // código — el drop sí puede recibir cualquier tipo de archivo).
    const onFileAccepted = vi.fn()
    render(
      <DropzoneUploader label="Subir imagen" onFileAccepted={onFileAccepted} />,
    )
    const notAnImage = new File(['x'], 'notes.txt', { type: 'text/plain' })

    fireEvent.drop(screen.getByRole('button', { name: 'Subir imagen' }), {
      dataTransfer: { files: [notAnImage] },
    })

    expect(onFileAccepted).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/imagen/i)
  })

  it('accepts a file dropped onto the dropzone', () => {
    const onFileAccepted = vi.fn()
    render(
      <DropzoneUploader label="Subir imagen" onFileAccepted={onFileAccepted} />,
    )
    const image = makeImageFile('dropped.png')

    fireEvent.drop(screen.getByRole('button', { name: 'Subir imagen' }), {
      dataTransfer: { files: [image] },
    })

    expect(onFileAccepted).toHaveBeenCalledWith(image, 'blob:mock/dropped.png')
  })
})
