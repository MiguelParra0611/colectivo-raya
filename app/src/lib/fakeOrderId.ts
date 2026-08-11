export function generateFakeOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `CR-${random}`
}
