import { MOCK_HOME_FEED } from '../home/homeData'

export type MosaicItem = {
  id: string
  showName: string
  episodeTitle: string
  artworkTone: string
  coverSrc?: string
  durationLabel?: string
}

function flatten(): MosaicItem[] {
  const items: MosaicItem[] = []

  items.push({
    id: MOCK_HOME_FEED.featured.id,
    showName: MOCK_HOME_FEED.featured.showName,
    episodeTitle: MOCK_HOME_FEED.featured.episodeTitle,
    artworkTone: MOCK_HOME_FEED.featured.artworkTone,
    coverSrc: MOCK_HOME_FEED.featured.coverSrc,
    durationLabel: MOCK_HOME_FEED.featured.durationLabel,
  })

  for (const r of MOCK_HOME_FEED.recommendations) {
    items.push({
      id: r.id,
      showName: r.showName,
      episodeTitle: r.episodeTitle,
      artworkTone: r.artworkTone,
      coverSrc: r.coverSrc,
      durationLabel: r.durationLabel,
    })
  }

  for (const cl of MOCK_HOME_FEED.continueListening) {
    items.push({
      id: cl.id,
      showName: cl.showName,
      episodeTitle: cl.episodeTitle,
      artworkTone: cl.artworkTone,
      coverSrc: cl.coverSrc,
      durationLabel: cl.durationLabel,
    })
  }

  for (const ne of MOCK_HOME_FEED.newEpisodes) {
    items.push({
      id: ne.id,
      showName: ne.showName,
      episodeTitle: ne.episodeTitle,
      artworkTone: ne.artworkTone,
      coverSrc: ne.coverSrc,
      durationLabel: ne.durationLabel,
    })
  }

  return items
}

export const MOSAIC_ITEMS: MosaicItem[] = flatten()
