import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArtistHero } from '../components/artist-profile/ArtistHero'
import { ProjectGrid } from '../components/artist-profile/ProjectGrid'
import { GlassButton } from '../components/ui/GlassButton'
import { getArtistBySlug } from '../data/artists'

export function ArtistProfilePage() {
  const { artistSlug } = useParams<{ artistSlug: string }>()
  const artist = artistSlug ? getArtistBySlug(artistSlug) : undefined
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null)

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
    <div>
      <ArtistHero artist={artist} />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Proyectos
        </h2>
        <div className="mt-6">
          <ProjectGrid
            projects={artist.projects}
            onOpenProject={setOpenProjectIndex}
          />
        </div>
      </div>
      {openProjectIndex !== null && (
        <p role="status" className="sr-only">
          Proyecto seleccionado: {artist.projects[openProjectIndex]?.title}
        </p>
      )}
    </div>
  )
}
