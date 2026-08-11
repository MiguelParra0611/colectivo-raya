import type { ShopMockup } from '../../data/shop'

interface MockupTileProps {
  mockup: ShopMockup
  fallbackImageSrc: string
  fallbackAlt: string
}

export function MockupTile({
  mockup,
  fallbackImageSrc,
  fallbackAlt,
}: MockupTileProps) {
  return (
    <div className="glass-surface overflow-hidden rounded-2xl">
      <div className="relative aspect-square w-full overflow-hidden bg-accent-2-soft/40">
        <img
          src={mockup.imageSrc ?? fallbackImageSrc}
          alt={mockup.imageSrc ? `${mockup.label}: ${fallbackAlt}` : ''}
          loading="lazy"
          decoding="async"
          className={
            mockup.imageSrc
              ? 'h-full w-full object-cover'
              : 'h-full w-full object-contain p-6 opacity-70'
          }
        />
      </div>
      <p className="px-3 py-2 text-center text-xs font-medium text-ink-muted">
        {mockup.label}
        {!mockup.imageSrc && (
          <span className="block text-[10px] text-ink-muted/70">
            mockup próximamente
          </span>
        )}
      </p>
    </div>
  )
}
