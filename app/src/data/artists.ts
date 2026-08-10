import type { Artist } from './types'

import joseAlasVeladasFull from '../assets/images/jose/alas-veladas-full.webp'
import joseAlasVeladasThumb from '../assets/images/jose/alas-veladas-thumb.webp'
import joseCoronaDeAstrosFull from '../assets/images/jose/corona-de-astros-full.webp'
import joseCoronaDeAstrosThumb from '../assets/images/jose/corona-de-astros-thumb.webp'
import joseGuardianaDePiedraFull from '../assets/images/jose/guardiana-de-piedra-full.webp'
import joseGuardianaDePiedraThumb from '../assets/images/jose/guardiana-de-piedra-thumb.webp'
import joseMensajerasFull from '../assets/images/jose/mensajeras-full.webp'
import joseMensajerasThumb from '../assets/images/jose/mensajeras-thumb.webp'
import joseNaranjaFull from '../assets/images/jose/naranja-full.webp'
import joseNaranjaThumb from '../assets/images/jose/naranja-thumb.webp'
import josePokiFull from '../assets/images/jose/poki-full.webp'
import josePokiThumb from '../assets/images/jose/poki-thumb.webp'

import brendaAveDeBitacoraFull from '../assets/images/brenda/ave-de-bitacora-full.webp'
import brendaAveDeBitacoraThumb from '../assets/images/brenda/ave-de-bitacora-thumb.webp'
import brendaCriaturaDeEngranajesFull from '../assets/images/brenda/criatura-de-engranajes-full.webp'
import brendaCriaturaDeEngranajesThumb from '../assets/images/brenda/criatura-de-engranajes-thumb.webp'
import brendaCuentoDeInviernoFull from '../assets/images/brenda/cuento-de-invierno-full.webp'
import brendaCuentoDeInviernoThumb from '../assets/images/brenda/cuento-de-invierno-thumb.webp'
import brendaDiaDePlayaFull from '../assets/images/brenda/dia-de-playa-full.webp'
import brendaDiaDePlayaThumb from '../assets/images/brenda/dia-de-playa-thumb.webp'
import brendaEstudioDeElefantesFull from '../assets/images/brenda/estudio-de-elefantes-full.webp'
import brendaEstudioDeElefantesThumb from '../assets/images/brenda/estudio-de-elefantes-thumb.webp'
import brendaFugaNocturnaFull from '../assets/images/brenda/fuga-nocturna-full.webp'
import brendaFugaNocturnaThumb from '../assets/images/brenda/fuga-nocturna-thumb.webp'

export const artists: Artist[] = [
  {
    id: 'jose',
    slug: 'jose',
    name: 'José Gutierrez',
    tagline: 'Retratos entre lo humano, lo salvaje y lo sagrado',
    bio: 'Ilustrador digital especializado en retratos donde lo humano se funde con lo sagrado, lo salvaje y lo sobrenatural: guardianes, criaturas míticas y personajes con un pie en otro mundo.',
    instagramHandle: '@jgut.art',
    instagramUrl: 'https://www.instagram.com/jgut.art/',
    frameStyle: 'none',
    projects: [
      {
        id: 'poki',
        title: 'Poki',
        description:
          'Retrato de una joven acompañada por dos cacatúas ninfa; el vínculo silencioso entre las personas y sus animales.',
        image: {
          thumbSrc: josePokiThumb,
          fullSrc: josePokiFull,
          alt: 'Retrato digital de una joven con dos cacatúas ninfa sobre los hombros',
        },
      },
      {
        id: 'naranja',
        title: 'Naranja',
        description:
          'Retrato veraniego bañado en tonos cítricos, donde un gesto cotidiano se vuelve protagonista.',
        image: {
          thumbSrc: joseNaranjaThumb,
          fullSrc: joseNaranjaFull,
          alt: 'Retrato digital de una persona de cabello naranja sosteniendo un vaso con jugo de naranja',
        },
      },
      {
        id: 'guardiana-de-piedra',
        title: 'Guardiana de Piedra',
        description:
          'Una sacerdotisa y su guardián de otro mundo se encuentran frente a un torii al atardecer.',
        image: {
          thumbSrc: joseGuardianaDePiedraThumb,
          fullSrc: joseGuardianaDePiedraFull,
          alt: 'Ilustración de una sacerdotisa vestida de rojo junto a un tigre gigante frente a un torii',
        },
      },
      {
        id: 'alas-veladas',
        title: 'Alas Veladas',
        description:
          'Una figura entre lo humano y lo alado, con la mirada cubierta y los sentidos alerta.',
        image: {
          thumbSrc: joseAlasVeladasThumb,
          fullSrc: joseAlasVeladasFull,
          alt: 'Retrato de una figura con alas y ojos vendados, con un collar decorado con ojos',
        },
      },
      {
        id: 'mensajeras',
        title: 'Mensajeras',
        description:
          'Una bruja de mirada carmesí acompañada por sus dos cuervos mensajeros.',
        image: {
          thumbSrc: joseMensajerasThumb,
          fullSrc: joseMensajerasFull,
          alt: 'Retrato de una bruja de piel pálida y ojos rojos sosteniendo dos cuervos',
        },
      },
      {
        id: 'corona-de-astros',
        title: 'Corona de Astros',
        description:
          'Una figura solemne, con un halo de estrellas y un cetro ornamentado, entre lo sagrado y lo oscuro.',
        image: {
          thumbSrc: joseCoronaDeAstrosThumb,
          fullSrc: joseCoronaDeAstrosFull,
          alt: 'Ilustración de una figura encapuchada con un halo de estrellas sosteniendo un cetro',
        },
      },
    ],
  },
  {
    id: 'brenda',
    slug: 'brenda',
    name: 'Brenda Villanueva',
    tagline: 'Diseño de personajes entre lo tierno y lo extraño',
    bio: 'Ilustradora y diseñadora de personajes; explora el color plano y la narrativa visual entre lo tierno y lo extraño.',
    instagramHandle: '@mo.ilustra',
    instagramUrl: 'https://www.instagram.com/mo.ilustra/',
    frameStyle: 'none',
    projects: [
      {
        id: 'estudio-de-elefantes',
        title: 'Estudio de Elefantes',
        description:
          'Estudio pop-art de figuras de elefante en una paleta pastel.',
        image: {
          thumbSrc: brendaEstudioDeElefantesThumb,
          fullSrc: brendaEstudioDeElefantesFull,
          alt: 'Estudio ilustrado de figuras decorativas de elefante en colores pastel',
        },
      },
      {
        id: 'fuga-nocturna',
        title: 'Fuga Nocturna',
        description:
          'Un niño sobre una moto voladora envuelta en humo turquesa.',
        image: {
          thumbSrc: brendaFugaNocturnaThumb,
          fullSrc: brendaFugaNocturnaFull,
          alt: 'Ilustración de un niño montando una moto voladora con humo turquesa',
        },
      },
      {
        id: 'dia-de-playa',
        title: 'Día de Playa',
        description:
          'Un niño con sombrero mirando el mar, junto a viñetas de un pez fugitivo y un oso curioso.',
        image: {
          thumbSrc: brendaDiaDePlayaThumb,
          fullSrc: brendaDiaDePlayaFull,
          alt: 'Ilustración de un niño con sombrero de playa junto a viñetas de un pez y un oso',
        },
      },
      {
        id: 'criatura-de-engranajes',
        title: 'Criatura de Engranajes',
        description: 'Diseño de una criatura híbrida entre oruga y máquina.',
        image: {
          thumbSrc: brendaCriaturaDeEngranajesThumb,
          fullSrc: brendaCriaturaDeEngranajesFull,
          alt: 'Diseño de criatura verde con forma de oruga mecánica',
        },
      },
      {
        id: 'cuento-de-invierno',
        title: 'Cuento de Invierno',
        description: 'Viajeros abrigados bajo la nieve, en clave de cómic.',
        image: {
          thumbSrc: brendaCuentoDeInviernoThumb,
          fullSrc: brendaCuentoDeInviernoFull,
          alt: 'Cómic ilustrado de personajes abrigados caminando bajo la nieve',
        },
      },
      {
        id: 'ave-de-bitacora',
        title: 'Ave de Bitácora',
        description: 'Página de sketchbook: un ave regordeta en tonos rosados.',
        image: {
          thumbSrc: brendaAveDeBitacoraThumb,
          fullSrc: brendaAveDeBitacoraFull,
          alt: 'Ilustración de un ave pequeña y regordeta en tonos rosados',
        },
      },
    ],
  },
]

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug)
}
