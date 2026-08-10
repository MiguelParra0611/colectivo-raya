import { useEffect, useRef, type DragEvent, type KeyboardEvent } from 'react'
import { cn } from '../../lib/cn'
import { useFileDrop } from './useFileDrop'

interface DropzoneUploaderProps {
  label: string
  onFileAccepted: (file: File, previewUrl: string) => void
}

export function DropzoneUploader({
  label,
  onFileAccepted,
}: DropzoneUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    file,
    previewUrl,
    error,
    isDraggingOver,
    acceptFiles,
    setDraggingOver,
  } = useFileDrop()

  useEffect(() => {
    if (file && previewUrl) {
      onFileAccepted(file, previewUrl)
    }
    // Sólo debe reaccionar a un archivo/preview nuevos, no a cambios en el
    // callback del padre (que puede recrearse en cada render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, previewUrl])

  const openFilePicker = () => inputRef.current?.click()

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDraggingOver(false)
    acceptFiles(event.dataTransfer.files)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openFilePicker()
    }
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={(event) => {
          event.preventDefault()
          setDraggingOver(true)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        className={cn(
          'glass-surface relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/20 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          isDraggingOver && 'border-accent bg-white/[0.12]',
        )}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="px-4 text-sm text-ink-muted">
            <p className="font-medium text-ink">Arrastra una imagen aquí</p>
            <p className="mt-1">o haz clic para elegir un archivo</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => acceptFiles(event.target.files)}
      />
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
