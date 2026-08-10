import { motion, type Variants } from 'framer-motion'
import type { Artist } from '../../data/types'
import { ArtistCard } from './ArtistCard'

interface ArtistGridProps {
  artists: Artist[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export function ArtistGrid({ artists }: ArtistGridProps) {
  if (artists.length === 0) {
    return (
      <p role="status" className="text-ink-muted">
        Todavía no hay artistas en la galería.
      </p>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {artists.map((artist) => (
        <motion.div key={artist.id} variants={itemVariants}>
          <ArtistCard artist={artist} />
        </motion.div>
      ))}
    </motion.div>
  )
}
