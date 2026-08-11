import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ArtistProfilePage } from '../../pages/ArtistProfilePage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { CreatePortfolioPage } from '../../pages/CreatePortfolioPage'
import { FavoritesPage } from '../../pages/FavoritesPage'
import { HomePage } from '../../pages/HomePage'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { ProductDetailPage } from '../../pages/ProductDetailPage'
import { ShopPage } from '../../pages/ShopPage'
import { SupportPage } from '../../pages/SupportPage'
import { Footer } from './Footer'
import { Header } from './Header'

export function AppShell() {
  const location = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/artists/:artistSlug"
              element={<ArtistProfilePage />}
            />
            <Route path="/create" element={<CreatePortfolioPage />} />
            <Route path="/tienda" element={<ShopPage />} />
            <Route path="/tienda/:productId" element={<ProductDetailPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/apoyar" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
