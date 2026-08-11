import { artists } from './artists'
import type { ProjectImage } from './types'

export interface ShopMockup {
  label: string
  /** Se llena más adelante con fotos reales del producto; hasta entonces
   *  se muestra la ilustración sola con la etiqueta del producto. */
  imageSrc?: string
}

export interface ShopProduct {
  id: string
  artistSlug: string
  artistName: string
  title: string
  description: string
  price: number
  image: ProjectImage
  mockups: ShopMockup[]
}

const MOCKUP_LABELS = [
  'Camiseta',
  'Print',
  'Cuadro',
  'Portavasos',
  'Pin',
  'Sticker',
  'Cuaderno',
  'Artículos de maquillaje',
  'Cartuchera',
]

// Precios de demostración (licencia de uso de la ilustración) — no hay
// procesamiento de pago real en ningún punto del sitio.
const BASE_PRICE = 35
const PRICE_STEP = 4

function buildMockups(): ShopMockup[] {
  return MOCKUP_LABELS.map((label) => ({ label }))
}

let products: ShopProduct[] | null = null

export function getShopProducts(): ShopProduct[] {
  if (products) return products

  products = artists.flatMap((artist) =>
    artist.projects.map((project, index) => ({
      id: project.id,
      artistSlug: artist.slug,
      artistName: artist.name,
      title: project.title,
      description: project.description,
      price: BASE_PRICE + (index % 4) * PRICE_STEP,
      image: project.image,
      mockups: buildMockups(),
    })),
  )
  return products
}

export function getShopProductById(id: string): ShopProduct | undefined {
  return getShopProducts().find((product) => product.id === id)
}
