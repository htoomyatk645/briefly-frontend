export type FloatingCardLayout = {
  id: string
  emoji: string
  label: string
  /** Degrees on the ring; 0° = top, spaced evenly clockwise */
  orbitAngle: number
  artClass: string
}

/** Card half-size (5.5rem) */
export const CARD_HALF_PX = 44

/** Distance from hero center to card center */
export const ORBIT_RADIUS_PX = 128

const CARD_COUNT = 6

/** 0° = top, increases clockwise */
export const polarOffset = (angleDeg: number, radiusPx = ORBIT_RADIUS_PX) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.sin(rad) * radiusPx,
    y: -Math.cos(rad) * radiusPx,
  }
}

export const orbitAngleForIndex = (index: number) =>
  (360 / CARD_COUNT) * index

export const FLOATING_CARDS: FloatingCardLayout[] = [
  {
    id: '1',
    emoji: '🎧',
    label: 'Podcasts',
    orbitAngle: orbitAngleForIndex(0),
    artClass: 'floating-card__art--lavender',
  },
  {
    id: '2',
    emoji: '📰',
    label: 'News',
    orbitAngle: orbitAngleForIndex(1),
    artClass: 'floating-card__art--sky',
  },
  {
    id: '3',
    emoji: '✨',
    label: 'Highlights',
    orbitAngle: orbitAngleForIndex(2),
    artClass: 'floating-card__art--peach',
  },
  {
    id: '4',
    emoji: '📚',
    label: 'Reads',
    orbitAngle: orbitAngleForIndex(3),
    artClass: 'floating-card__art--mint',
  },
  {
    id: '5',
    emoji: '⚡',
    label: 'Fast',
    orbitAngle: orbitAngleForIndex(4),
    artClass: 'floating-card__art--rose',
  },
  {
    id: '6',
    emoji: '🎯',
    label: 'Signal',
    orbitAngle: orbitAngleForIndex(5),
    artClass: 'floating-card__art--indigo',
  },
]

/** Timing (ms) */
export const WELCOME_TIMING = {
  taglineAfterLogoMs: 480,
  ctaAfterTaglineMs: 1200,
} as const

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
