import { createContext } from 'react'
import type { ShopProduct } from '../data/shop'
import type { ShopState } from './shopReducer'

export interface ShopContextValue {
  state: ShopState
  products: ShopProduct[]
  cartProducts: ShopProduct[]
  favoriteProducts: ShopProduct[]
  cartTotal: number
  cartCount: number
  favoritesCount: number
  isInCart: (productId: string) => boolean
  isFavorite: (productId: string) => boolean
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  toggleFavorite: (productId: string) => void
}

export const ShopContext = createContext<ShopContextValue | null>(null)
