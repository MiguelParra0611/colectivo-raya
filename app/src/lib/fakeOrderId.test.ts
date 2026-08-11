import { describe, expect, it } from 'vitest'
import { generateFakeOrderId } from './fakeOrderId'

describe('generateFakeOrderId', () => {
  it('starts with the CR- prefix', () => {
    expect(generateFakeOrderId()).toMatch(/^CR-/)
  })

  it('produces different ids across calls', () => {
    const ids = new Set(Array.from({ length: 20 }, () => generateFakeOrderId()))
    expect(ids.size).toBeGreaterThan(1)
  })
})
