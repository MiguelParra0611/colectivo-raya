import { Link } from 'react-router-dom'
import { ProductCard } from '../components/shop/ProductCard'
import { GlassButton } from '../components/ui/GlassButton'
import { useShop } from '../state/useShop'

export function FavoritesPage() {
  const { favoriteProducts } = useShop()

  if (favoriteProducts.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Todavía no tienes favoritos
        </h1>
        <p className="mt-3 text-ink-muted">
          Toca el corazón de cualquier ilustración en la tienda para guardarla
          aquí.
        </p>
        <Link to="/tienda" className="mt-6 inline-block">
          <GlassButton variant="primary">Ir a la tienda</GlassButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-ink">
        Favoritos
      </h1>
      <p className="mt-2 text-ink-muted">
        {favoriteProducts.length}{' '}
        {favoriteProducts.length === 1
          ? 'ilustración guardada'
          : 'ilustraciones guardadas'}
        .
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
