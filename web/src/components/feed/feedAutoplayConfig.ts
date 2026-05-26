export const FEED_SCROLL_VELOCITY_THRESHOLD = 0.4
export const FEED_CENTER_THRESHOLD_PX = 60
export const FEED_DWELL_MS = 1200
export const FEED_GAIN_RAMP_UP_S = 0.4
export const FEED_GAIN_RAMP_DOWN_S = 0.3
export const FEED_CARD_EXPAND_MS = 300
export const FEED_CARD_EXPAND_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function isFeedAutoplayEnabled(): boolean {
  if (import.meta.env.VITE_ENABLE_AUTOPLAY === 'false') return false
  if (import.meta.env.VITE_ENABLE_AUTOPLAY === 'true') return true
  return import.meta.env.DEV
}

export type FeedAutoplayEventDetail = {
  cardId: string
}

export const FEED_AUTOPLAY_EVENT = 'feed:autoplay'
