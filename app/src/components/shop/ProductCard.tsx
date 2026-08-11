import { Link } from 'react-router-dom'
import type { ShopProduct } from '../../data/shop'
import { formatPrice } from '../../lib/formatPrice'
import { useShop } from '../../state/useShop'
import { GlassButton } from '../ui/GlassButton'
import { GlassCard } from '../ui/GlassCard'
import { HeartFilledIcon, HeartIcon } from '../ui/icons'

interface ProductCardProps {
  product: ShopProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite, isInCart, addToCart } = useShop()
  const favorite = isFavorite(product.id)
  const inCart = isInCart(product.id)

  return (
    // El botón de favorito vive fuera de GlassCard a propósito: el
    // efecto `shine` de la tarjeta exige overflow:hidden, lo que
    // recortaría un botón absoluto cerca de la esquina redondeada.
    <div className="relative">
      <GlassCard interactive className="flex flex-col p-0">
        <Link
          to={`/tienda/${product.id}`}
          aria-label={`Ver "${product.title}" en la tienda`}
          className="relative block aspect-square w-full overflow-hidden rounded-t-3xl"
        >
          <img
            src={product.image.thumbSrc}
            alt={product.image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-1 p-4">
          <p className="text-xs text-ink-muted">{product.artistName}</p>
          <h3 className="font-display text-base font-semibold text-ink">
            {product.title}
          </h3>
          <div className="mt-auto flex items-center justify-between pt-3">
            <span className="font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            <GlassButton
              type="button"
              variant={inCart ? 'secondary' : 'primary'}
              onClick={() => addToCart(product.id)}
              className="px-4 py-2 text-xs"
            >
              {inCart ? 'En el carrito' : 'Añadir'}
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      <button
        type="button"
        onClick={() => toggleFavorite(product.id)}
        aria-pressed={favorite}
        aria-label={
          favorite
            ? `Quitar "${product.title}" de favoritos`
            : `Añadir "${product.title}" a favoritos`
        }
        className="shine absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-accent-ink shadow-md backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-accent-ink"
      >
        {favorite ? (
          <HeartFilledIcon className="h-5 w-5" />
        ) : (
          <HeartIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}
