import { Link, useParams } from 'react-router-dom'
import { getArtistBySlug } from '../data/artists'
import { GlassButton } from '../components/ui/GlassButton'

export function ArtistProfilePage() {
  const { artistSlug } = useParams<{ artistSlug: string }>()
  const artist = artistSlug ? getArtistBySlug(artistSlug) : undefined

  if (!artist) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink">
          No encontramos a este artista
        </h1>
        <Link to="/" className="mt-6 inline-block">
          <GlassButton variant="secondary">Volver al inicio</GlassButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-ink">
        {artist.name}
      </h1>
      <p className="mt-3 max-w-xl text-ink-muted">{artist.bio}</p>
    </div>
  )
}
