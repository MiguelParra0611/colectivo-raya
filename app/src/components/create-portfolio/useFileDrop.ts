import { useCallback, useEffect, useRef, useState } from 'react'

interface UseFileDropOptions {
  maxSizeBytes?: number
}

interface UseFileDropResult {
  file: File | null
  previewUrl: string | null
  error: string | null
  isDraggingOver: boolean
  acceptFiles: (files: FileList | File[] | null) => void
  setDraggingOver: (value: boolean) => void
  clear: () => void
}

const DEFAULT_MAX_SIZE_BYTES = 8 * 1024 * 1024

function formatMb(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

export function useFileDrop({
  maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
}: UseFileDropOptions = {}): UseFileDropResult {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const previewUrlRef = useRef<string | null>(null)

  useEffect(() => {
    previewUrlRef.current = previewUrl
  }, [previewUrl])

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const acceptFiles = useCallback(
    (files: FileList | File[] | null) => {
      const candidate = files?.[0]
      if (!candidate) return

      if (!candidate.type.startsWith('image/')) {
        setError('Solo se aceptan archivos de imagen.')
        return
      }

      if (candidate.size > maxSizeBytes) {
        setError(
          `La imagen supera el tamaño máximo permitido (${formatMb(maxSizeBytes)}).`,
        )
        return
      }

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }

      const nextPreviewUrl = URL.createObjectURL(candidate)
      setFile(candidate)
      setPreviewUrl(nextPreviewUrl)
      setError(null)
    },
    [maxSizeBytes],
  )

  const clear = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
    setFile(null)
    setPreviewUrl(null)
    setError(null)
  }, [])

  return {
    file,
    previewUrl,
    error,
    isDraggingOver,
    acceptFiles,
    setDraggingOver: setIsDraggingOver,
    clear,
  }
}
