import { describe, expect, it } from 'vitest'
import { createInitialShopState, shopReducer } from './shopReducer'

describe('shopReducer', () => {
  it('starts with an empty cart and no favorites', () => {
    const state = createInitialShopState()
    expect(state.cart).toEqual([])
    expect(state.favorites).toEqual([])
  })

  it('adds a product to the cart', () => {
    const state = createInitialShopState()
    const next = shopReducer(state, { type: 'ADD_TO_CART', productId: 'poki' })
    expect(next.cart).toEqual(['poki'])
  })

  it('does not add the same product to the cart twice', () => {
    const state = createInitialShopState()
    const once = shopReducer(state, { type: 'ADD_TO_CART', productId: 'poki' })
    const twice = shopReducer(once, {
      type: 'ADD_TO_CART',
      productId: 'poki',
    })
    expect(twice.cart).toEqual(['poki'])
  })

  it('removes a product from the cart', () => {
    const state = createInitialShopState()
    const withItem = shopReducer(state, {
      type: 'ADD_TO_CART',
      productId: 'poki',
    })
    const withoutItem = shopReducer(withItem, {
      type: 'REMOVE_FROM_CART',
      productId: 'poki',
    })
    expect(withoutItem.cart).toEqual([])
  })

  it('clears the whole cart', () => {
    const state = createInitialShopState()
    const withItems = [
      { type: 'ADD_TO_CART' as const, productId: 'poki' },
      { type: 'ADD_TO_CART' as const, productId: 'naranja' },
    ].reduce(shopReducer, state)
    const cleared = shopReducer(withItems, { type: 'CLEAR_CART' })
    expect(cleared.cart).toEqual([])
  })

  it('toggles a product in and out of favorites', () => {
    const state = createInitialShopState()
    const favorited = shopReducer(state, {
      type: 'TOGGLE_FAVORITE',
      productId: 'poki',
    })
    expect(favorited.favorites).toEqual(['poki'])

    const unfavorited = shopReducer(favorited, {
      type: 'TOGGLE_FAVORITE',
      productId: 'poki',
    })
    expect(unfavorited.favorites).toEqual([])
  })

  it('keeps cart and favorites independent of each other', () => {
    const state = createInitialShopState()
    const next = [
      { type: 'ADD_TO_CART' as const, productId: 'poki' },
      { type: 'TOGGLE_FAVORITE' as const, productId: 'naranja' },
    ].reduce(shopReducer, state)
    expect(next.cart).toEqual(['poki'])
    expect(next.favorites).toEqual(['naranja'])
  })
})
