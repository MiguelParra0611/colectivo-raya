import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import type { Artist } from '../../data/types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { FramePicker } from '../frames/FramePicker'
import { FrameRenderer } from '../frames/FrameRenderer'
import { GlassPanel } from '../ui/GlassPanel'

interface ArtistHeroProps {
  artist: Artist
}

export function ArtistHero({ artist }: ArtistHeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const coverImage = artist.projects[0]?.image.fullSrc
  const [selectedFrame, setSelectedFrame] = useState(artist.frameStyle)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[70vh] items-end overflow-hidden"
    >
      {coverImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={prefersReducedMotion ? undefined : { y: backgroundY }}
        >
          <img
            src={coverImage}
            alt=""
            aria-hidden="true"
            className="h-[130%] w-full scale-110 object-cover opacity-40 blur-md"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[var(--color-bg-start)]" />
        </motion.div>
      )}

      <motion.div
        className="mx-auto w-full max-w-5xl px-4 pb-16 pt-32 sm:px-6"
        style={prefersReducedMotion ? undefined : { y: contentY }}
      >
        <div className="relative">
          <FrameRenderer frameStyle={selectedFrame} />
          <GlassPanel as="div" className="p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Portafolio
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
              {artist.name}
            </h1>
            <p className="mt-2 text-lg text-ink-muted">{artist.tagline}</p>
            <p className="mt-5 max-w-2xl text-ink-muted">{artist.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
              <span>Ilustraciones usadas con permiso del autor —</span>
              <a
                href={artist.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                {artist.instagramHandle} en Instagram
              </a>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-ink-muted">
                Probar un marco decorativo para este portafolio:
              </p>
              <div className="mt-3">
                <FramePicker
                  value={selectedFrame}
                  onChange={setSelectedFrame}
                />
              </div>
            </div>
          </GlassPanel>
        </div>
      </motion.div>
    </section>
  )
}
