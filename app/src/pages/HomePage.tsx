import { motion } from 'framer-motion'
import { ArtistGrid } from '../components/gallery/ArtistGrid'
import { artists } from '../data/artists'

export function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-accent-ink">
          Galería virtual
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Colectivo Raya
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Un espacio donde cada ilustrador comparte su portafolio: proyectos,
          historia y estilo propio, presentados con el cuidado de una galería.
        </p>
      </motion.div>

      <div className="mt-14">
        <ArtistGrid artists={artists} />
      </div>
    </div>
  )
}
