import { useCallback, useMemo, useReducer, type ReactNode } from 'react'
import { getShopProducts } from '../data/shop'
import { createInitialShopState, shopReducer } from './shopReducer'
import { ShopContext, type ShopContextValue } from './shopContextDefinition'

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    shopReducer,
    undefined,
    createInitialShopState,
  )
  const products = useMemo(() => getShopProducts(), [])

  const addToCart = useCallback(
    (productId: string) => dispatch({ type: 'ADD_TO_CART', productId }),
    [],
  )
  const removeFromCart = useCallback(
    (productId: string) => dispatch({ type: 'REMOVE_FROM_CART', productId }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleFavorite = useCallback(
    (productId: string) => dispatch({ type: 'TOGGLE_FAVORITE', productId }),
    [],
  )

  const cartProducts = useMemo(
    () => state.cart.flatMap((id) => products.filter((p) => p.id === id)),
    [state.cart, products],
  )
  const favoriteProducts = useMemo(
    () => state.favorites.flatMap((id) => products.filter((p) => p.id === id)),
    [state.favorites, products],
  )
  const cartTotal = useMemo(
    () => cartProducts.reduce((sum, p) => sum + p.price, 0),
    [cartProducts],
  )

  const value: ShopContextValue = {
    state,
    products,
    cartProducts,
    favoriteProducts,
    cartTotal,
    cartCount: state.cart.length,
    favoritesCount: state.favorites.length,
    isInCart: (productId) => state.cart.includes(productId),
    isFavorite: (productId) => state.favorites.includes(productId),
    addToCart,
    removeFromCart,
    clearCart,
    toggleFavorite,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
