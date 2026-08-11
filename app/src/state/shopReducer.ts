export interface ShopState {
  cart: string[]
  favorites: string[]
}

export type ShopAction =
  | { type: 'ADD_TO_CART'; productId: string }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; productId: string }

export function createInitialShopState(): ShopState {
  return { cart: [], favorites: [] }
}

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART':
      return state.cart.includes(action.productId)
        ? state
        : { ...state, cart: [...state.cart, action.productId] }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((id) => id !== action.productId),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.productId)
          ? state.favorites.filter((id) => id !== action.productId)
          : [...state.favorites, action.productId],
      }
    default:
      return state
  }
}
