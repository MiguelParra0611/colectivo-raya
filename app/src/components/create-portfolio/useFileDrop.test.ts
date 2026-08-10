import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFileDrop } from './useFileDrop'

function makeFile(name: string, type: string, sizeBytes: number = 1024): File {
  const file = new File([new Uint8Array(sizeBytes)], name, { type })
  return file
}

describe('useFileDrop', () => {
  beforeEach(() => {
    vi.spyOn(URL, 'createObjectURL').mockImplementation(
      (blob) => `blob:mock/${(blob as File).name ?? 'file'}`,
    )
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts with no file, no preview, and no error', () => {
    const { result } = renderHook(() => useFileDrop())
    expect(result.current.file).toBeNull()
    expect(result.current.previewUrl).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isDraggingOver).toBe(false)
  })

  it('accepts a valid image file and creates a preview URL', () => {
    const { result } = renderHook(() => useFileDrop())
    const image = makeFile('portrait.png', 'image/png')

    act(() => result.current.acceptFiles([image]))

    expect(result.current.file).toBe(image)
    expect(result.current.previewUrl).toBe('blob:mock/portrait.png')
    expect(result.current.error).toBeNull()
  })

  it('rejects a non-image file and does not set a preview', () => {
    const { result } = renderHook(() => useFileDrop())
    const document = makeFile('cv.pdf', 'application/pdf')

    act(() => result.current.acceptFiles([document]))

    expect(result.current.file).toBeNull()
    expect(result.current.previewUrl).toBeNull()
    expect(result.current.error).toMatch(/imagen/i)
  })

  it('rejects a file larger than the configured maximum size', () => {
    const { result } = renderHook(() => useFileDrop({ maxSizeBytes: 1000 }))
    const tooLarge = makeFile('huge.png', 'image/png', 2000)

    act(() => result.current.acceptFiles([tooLarge]))

    expect(result.current.file).toBeNull()
    expect(result.current.error).toMatch(/tamaño|grande|MB/i)
  })

  it('toggles isDraggingOver on setDraggingOver', () => {
    const { result } = renderHook(() => useFileDrop())

    act(() => result.current.setDraggingOver(true))
    expect(result.current.isDraggingOver).toBe(true)

    act(() => result.current.setDraggingOver(false))
    expect(result.current.isDraggingOver).toBe(false)
  })

  it('revokes the previous object URL when a new file replaces it', () => {
    const { result } = renderHook(() => useFileDrop())
    const first = makeFile('first.png', 'image/png')
    const second = makeFile('second.png', 'image/png')

    act(() => result.current.acceptFiles([first]))
    const firstPreviewUrl = result.current.previewUrl

    act(() => result.current.acceptFiles([second]))

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(firstPreviewUrl)
    expect(result.current.previewUrl).toBe('blob:mock/second.png')
  })

  it('clear() resets state and revokes the object URL', () => {
    const { result } = renderHook(() => useFileDrop())
    const image = makeFile('portrait.png', 'image/png')

    act(() => result.current.acceptFiles([image]))
    const previewUrl = result.current.previewUrl

    act(() => result.current.clear())

    expect(result.current.file).toBeNull()
    expect(result.current.previewUrl).toBeNull()
    expect(result.current.error).toBeNull()
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(previewUrl)
  })

  it('revokes any outstanding object URL on unmount', () => {
    const { result, unmount } = renderHook(() => useFileDrop())
    const image = makeFile('portrait.png', 'image/png')

    act(() => result.current.acceptFiles([image]))
    const previewUrl = result.current.previewUrl

    unmount()

    expect(URL.revokeObjectURL).toHaveBeenCalledWith(previewUrl)
  })
})
