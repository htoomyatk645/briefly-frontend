export function clampAnticipation(value: number): number {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

export function getCoverFilterStyle(anticipation: number): string {
  const t = clampAnticipation(anticipation)
  const saturate = 1 + t * 0.2
  const sepia = t * 0.18
  const brightness = 1 + t * 0.06
  return `saturate(${saturate}) sepia(${sepia}) brightness(${brightness})`
}

export function getWarmOverlayBackground(anticipation: number): string {
  const opacity = clampAnticipation(anticipation) * 0.12
  return `hsl(20 90% 55% / ${opacity})`
}

export function computeCardAnticipation(
  cardElement: HTMLElement,
  scrollContainer: HTMLElement,
): number {
  const trackRect = scrollContainer.getBoundingClientRect()
  const cardRect = cardElement.getBoundingClientRect()
  const trackCenter = trackRect.left + trackRect.width / 2
  const cardCenter = cardRect.left + cardRect.width / 2
  const distance = Math.abs(cardCenter - trackCenter)
  const falloffDistance = trackRect.width / 2 + cardRect.width / 2
  if (falloffDistance <= 0) return 0
  return clampAnticipation(1 - distance / falloffDistance)
}
