import { Link } from 'react-router-dom'
import { GlassButton } from '../components/ui/GlassButton'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Página no encontrada
      </h1>
      <p className="mt-3 text-ink-muted">
        Esta ruta no existe en Colectivo Raya.
      </p>
      <Link to="/" className="mt-6 inline-block">
        <GlassButton variant="secondary">Volver al inicio</GlassButton>
      </Link>
    </div>
  )
}
