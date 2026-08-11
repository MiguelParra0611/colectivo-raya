import { useContext } from 'react'
import { ShopContext, type ShopContextValue } from './shopContextDefinition'

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop debe usarse dentro de un <ShopProvider>')
  }
  return context
}
