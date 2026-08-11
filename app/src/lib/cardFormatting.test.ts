import { describe, expect, it } from 'vitest'
import { formatCardNumber, formatCardExpiry } from './cardFormatting'

describe('formatCardNumber', () => {
  it('groups digits in blocks of four separated by spaces', () => {
    expect(formatCardNumber('1111111111111111')).toBe('1111 1111 1111 1111')
  })

  it('strips non-digit characters before grouping', () => {
    expect(formatCardNumber('1111-1111 1111.1111')).toBe('1111 1111 1111 1111')
  })

  it('formats a partial number without a trailing space', () => {
    expect(formatCardNumber('111122')).toBe('1111 22')
  })

  it('caps the result at 16 digits', () => {
    expect(formatCardNumber('11111111111111119999')).toBe('1111 1111 1111 1111')
  })

  it('returns an empty string for empty input', () => {
    expect(formatCardNumber('')).toBe('')
  })
})

describe('formatCardExpiry', () => {
  it('inserts a slash after the month once two digits are typed', () => {
    expect(formatCardExpiry('1231')).toBe('12/31')
  })

  it('does not insert a slash before the month is complete', () => {
    expect(formatCardExpiry('1')).toBe('1')
  })

  it('strips non-digit characters (including a manually typed slash)', () => {
    expect(formatCardExpiry('12/31')).toBe('12/31')
  })

  it('caps the result at MM/YY (4 digits)', () => {
    expect(formatCardExpiry('123199')).toBe('12/31')
  })

  it('returns an empty string for empty input', () => {
    expect(formatCardExpiry('')).toBe('')
  })
})
