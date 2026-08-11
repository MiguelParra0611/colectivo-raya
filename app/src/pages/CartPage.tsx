import { Link } from 'react-router-dom'
import { GlassButton } from '../components/ui/GlassButton'
import { GlassPanel } from '../components/ui/GlassPanel'
import { formatPrice } from '../lib/formatPrice'
import { useShop } from '../state/useShop'

export function CartPage() {
  const { cartProducts, cartTotal, removeFromCart } = useShop()

  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 text-ink-muted">
          Explora la tienda y añade la licencia de alguna ilustración.
        </p>
        <Link to="/tienda" className="mt-6 inline-block">
          <GlassButton variant="primary">Ir a la tienda</GlassButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-ink">Carrito</h1>
      <p className="mt-2 text-ink-muted">
        {cartProducts.length}{' '}
        {cartProducts.length === 1 ? 'licencia' : 'licencias'} en tu carrito.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {cartProducts.map((product) => (
          <GlassPanel key={product.id} className="flex items-center gap-4 p-4">
            <img
              src={product.image.thumbSrc}
              alt={product.image.alt}
              className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-ink-muted">{product.artistName}</p>
              <h2 className="truncate font-display text-lg font-semibold text-ink">
                {product.title}
              </h2>
              <p className="text-sm text-ink-muted">
                {formatPrice(product.price)}
              </p>
            </div>
            <GlassButton
              variant="ghost"
              onClick={() => removeFromCart(product.id)}
              aria-label={`Quitar "${product.title}" del carrito`}
            >
              Quitar
            </GlassButton>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel className="mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-ink-muted">Subtotal</p>
          <p className="font-display text-2xl font-semibold text-ink">
            {formatPrice(cartTotal)}
          </p>
        </div>
        <Link to="/checkout">
          <GlassButton variant="primary" className="w-full sm:w-auto">
            Proceder al pago
          </GlassButton>
        </Link>
      </GlassPanel>
    </div>
  )
}
