interface IconProps {
  className?: string
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M32 4 L38 26 L60 32 L38 38 L32 60 L26 38 L4 32 L26 26 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ButterflyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M32 20 C24 4 4 6 6 22 C7 32 20 34 32 26"
        fill="currentColor"
        opacity={0.9}
      />
      <path
        d="M32 20 C40 4 60 6 58 22 C57 32 44 34 32 26"
        fill="currentColor"
        opacity={0.9}
      />
      <path
        d="M32 26 C22 34 8 40 10 50 C12 58 24 54 32 40"
        fill="currentColor"
        opacity={0.7}
      />
      <path
        d="M32 26 C42 34 56 40 54 50 C52 58 40 54 32 40"
        fill="currentColor"
        opacity={0.7}
      />
      <rect
        x="30.5"
        y="18"
        width="3"
        height="26"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  )
}

export function VineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M6 58 C10 40 6 24 20 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M14 46 C22 44 26 38 24 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 30 C18 30 22 26 20 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 12 C28 8 30 14 24 18 C18 20 16 14 22 12 Z"
        fill="currentColor"
      />
      <path
        d="M23 28 C30 25 31 32 24 34 C18 35 17 30 23 28 Z"
        fill="currentColor"
      />
      <path
        d="M13 44 C20 42 21 48 15 50 C9 51 8 46 13 44 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function CatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <path
        d="M18 54 C10 50 8 38 12 30 C8 26 8 16 14 12 C18 16 19 20 19 20 C24 17 30 17 32 17 C34 17 40 17 45 20 C45 20 46 16 50 12 C56 16 56 26 52 30 C56 38 54 50 46 54 C40 57 24 57 18 54 Z"
        fill="currentColor"
      />
      <circle cx="26" cy="34" r="2.4" fill="var(--color-bg-start)" />
      <circle cx="38" cy="34" r="2.4" fill="var(--color-bg-start)" />
      <path
        d="M30 40 C31 42 33 42 34 40"
        stroke="var(--color-bg-start)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
