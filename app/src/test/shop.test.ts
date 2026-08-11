import { describe, expect, it } from 'vitest'
import { getShopProductById, getShopProducts } from '../data/shop'

describe('shop data', () => {
  it('has exactly one product per project across both artists (12 total)', () => {
    expect(getShopProducts()).toHaveLength(12)
  })

  it('gives every product a unique id and a positive price', () => {
    const products = getShopProducts()
    const ids = products.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const product of products) {
      expect(product.price).toBeGreaterThan(0)
    }
  })

  it('gives every product the same set of mockup product labels', () => {
    const products = getShopProducts()
    const labelSets = products.map((p) =>
      p.mockups.map((m) => m.label).join('|'),
    )
    expect(new Set(labelSets).size).toBe(1)
    expect(products[0].mockups.length).toBeGreaterThan(0)
  })

  it('finds a product by id', () => {
    expect(getShopProductById('poki')?.artistName).toBe('José Gutierrez')
    expect(getShopProductById('nope')).toBeUndefined()
  })
})
