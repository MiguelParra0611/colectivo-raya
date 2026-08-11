import { Link, useParams } from 'react-router-dom'
import { MockupTile } from '../components/shop/MockupTile'
import { GlassButton } from '../components/ui/GlassButton'
import { GlassPanel } from '../components/ui/GlassPanel'
import { HeartFilledIcon, HeartIcon } from '../components/ui/icons'
import { getShopProductById } from '../data/shop'
import { formatPrice } from '../lib/formatPrice'
import { useShop } from '../state/useShop'

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>()
  const product = productId ? getShopProductById(productId) : undefined
  const { isFavorite, toggleFavorite, isInCart, addToCart } = useShop()

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink">
          No encontramos este producto
        </h1>
        <Link to="/tienda" className="mt-6 inline-block">
          <GlassButton variant="secondary">Volver a la tienda</GlassButton>
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(product.id)
  const inCart = isInCart(product.id)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="glass-surface overflow-hidden rounded-3xl">
          <img
            src={product.image.fullSrc}
            alt={product.image.alt}
            className="h-full w-full object-cover"
          />
        </div>

        <GlassPanel className="h-fit p-6 sm:p-8">
          <p className="text-sm text-ink-muted">
            Por{' '}
            <Link
              to={`/artists/${product.artistSlug}`}
              className="font-medium text-accent-ink underline underline-offset-4"
            >
              {product.artistName}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-4 text-ink-muted">{product.description}</p>

          <p className="mt-6 text-2xl font-semibold text-ink">
            {formatPrice(product.price)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Licencia de uso de esta ilustración — demo, sin pago real.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <GlassButton
              variant={inCart ? 'secondary' : 'primary'}
              onClick={() => addToCart(product.id)}
            >
              {inCart ? 'Ya está en el carrito' : 'Añadir al carrito'}
            </GlassButton>
            <GlassButton
              variant="secondary"
              aria-pressed={favorite}
              onClick={() => toggleFavorite(product.id)}
            >
              {favorite ? (
                <HeartFilledIcon className="h-4 w-4" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
              {favorite ? 'En favoritos' : 'Añadir a favoritos'}
            </GlassButton>
          </div>
        </GlassPanel>
      </div>

      <div className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Disponible en
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Vista previa conceptual — las fotos de producto reales se agregan
          próximamente.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {product.mockups.map((mockup) => (
            <MockupTile
              key={mockup.label}
              mockup={mockup}
              fallbackImageSrc={product.image.thumbSrc}
              fallbackAlt={product.image.alt}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
