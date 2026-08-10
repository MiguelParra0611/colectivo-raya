import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Artist } from '../../data/types'
import { useImageCycler } from '../../hooks/useImageCycler'
import { GlassCard } from '../ui/GlassCard'

interface ArtistCardProps {
  artist: Artist
}

const CYCLE_INTERVAL_MS = 3200

export function ArtistCard({ artist }: ArtistCardProps) {
  const { index, pause, resume } = useImageCycler(artist.projects.length, {
    intervalMs: CYCLE_INTERVAL_MS,
  })
  const activeProject = artist.projects[index]

  return (
    <Link
      to={`/artists/${artist.slug}`}
      aria-label={`Ver el portafolio de ${artist.name}`}
      className="block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <GlassCard interactive className="overflow-hidden p-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.img
                key={activeProject.id}
                src={activeProject.image.thumbSrc}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display text-xl font-semibold text-white">
              {artist.name}
            </h3>
            <p className="mt-1 text-sm text-white/75">{artist.tagline}</p>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
