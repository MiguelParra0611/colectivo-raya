export type FrameStyle = 'stars' | 'butterflies' | 'vines' | 'cats' | 'none'

export const FRAME_STYLES: FrameStyle[] = [
  'none',
  'stars',
  'butterflies',
  'vines',
  'cats',
]

export const FRAME_STYLE_LABELS: Record<FrameStyle, string> = {
  none: 'Ninguno',
  stars: 'Estrellas',
  butterflies: 'Mariposas',
  vines: 'Enredaderas',
  cats: 'Gatos',
}

export interface ProjectImage {
  thumbSrc: string
  fullSrc: string
  alt: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: ProjectImage
}

export interface Artist {
  id: string
  slug: string
  name: string
  tagline: string
  bio: string
  instagramHandle: string
  instagramUrl: string
  frameStyle: FrameStyle
  projects: Project[]
}
