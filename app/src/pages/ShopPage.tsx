import { motion, type Variants } from 'framer-motion'
import { ProductCard } from '../components/shop/ProductCard'
import { getShopProducts } from '../data/shop'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function ShopPage() {
  const products = getShopProducts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm uppercase tracking-[0.2em] text-accent-ink">
        Tienda
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
        Lleva una ilustración contigo
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Cada compra es la licencia de uso de esa ilustración — para imprimirla
        en camisetas, tazas, cuadros, stickers y más. Es una demo: no se procesa
        ningún pago real.
      </p>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
