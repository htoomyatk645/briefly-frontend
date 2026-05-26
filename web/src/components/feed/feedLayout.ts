import type { FeedEpisode } from './feedData'

export type FeedItem = FeedEpisode & {
  editorial: boolean
  listenerCount: number
}

export type LayoutHeroRow = {
  type: 'hero'
  item: FeedItem
}

export type LayoutCompactRow = {
  type: 'compact'
  items: [FeedItem, FeedItem]
}

export type LayoutRow = LayoutHeroRow | LayoutCompactRow

export function buildFeedLayout(items: FeedItem[]): LayoutRow[] {
  const heroRows: LayoutHeroRow[] = []
  const compactRows: LayoutCompactRow[] = []
  const pendingNonEditorial: FeedItem[] = []

  const flushCompactPair = () => {
    if (pendingNonEditorial.length < 2) return
    const pair = pendingNonEditorial.splice(0, 2) as [FeedItem, FeedItem]
    compactRows.push({ type: 'compact', items: pair })
  }

  for (const item of items) {
    if (item.editorial) {
      flushCompactPair()
      while (pendingNonEditorial.length > 0) {
        heroRows.push({ type: 'hero', item: pendingNonEditorial.shift()! })
      }
      heroRows.push({ type: 'hero', item })
      continue
    }

    pendingNonEditorial.push(item)
    if (pendingNonEditorial.length === 2) {
      flushCompactPair()
    }
  }

  while (pendingNonEditorial.length > 0) {
    heroRows.push({ type: 'hero', item: pendingNonEditorial.shift()! })
  }

  const layout: LayoutRow[] = []
  let heroIndex = 0
  let compactIndex = 0

  while (heroIndex < heroRows.length || compactIndex < compactRows.length) {
    if (heroIndex < heroRows.length) {
      layout.push(heroRows[heroIndex])
      heroIndex += 1
    }

    if (compactIndex < compactRows.length) {
      layout.push(compactRows[compactIndex])
      compactIndex += 1
    }
  }

  return layout
}
