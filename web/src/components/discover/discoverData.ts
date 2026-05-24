import { MOCK_HOME_FEED } from '../home/homeData'
import { continueListeningEpisodes, pulseEpisodes } from '../../data/homeData'
import { PLAYER_EPISODES, PODCAST_COVERS } from '../../data/podcastCatalog'

export type MosaicItem = {
  id: string
  showName: string
  episodeTitle: string
  artworkTone: string
  coverSrc: string
  durationLabel?: string
}

/** Strip duplicate suffix so feed routing resolves to the canonical episode id. */
export function getMosaicBaseId(id: string): string {
  return id.replace(/~dup-[a-z0-9-]+$/i, '')
}

const EXTRA_CATALOG: MosaicItem[] = [
  {
    id: 'cat-daily',
    showName: 'The Daily',
    episodeTitle: 'Nicolas Cage Made Himself a Legend. Then He Had to Live With It.',
    artworkTone: 'ocean',
    coverSrc: PODCAST_COVERS.theDaily,
    durationLabel: '32 min',
  },
  {
    id: 'cat-acquired',
    showName: 'Acquired',
    episodeTitle: 'NVIDIA',
    artworkTone: 'forest',
    coverSrc: PODCAST_COVERS.acquired,
    durationLabel: '3h 12 min',
  },
  {
    id: 'cat-revisionist',
    showName: 'Revisionist History',
    episodeTitle: 'The Satire Paradox',
    artworkTone: 'plum',
    coverSrc: PODCAST_COVERS.revisionistHistory,
    durationLabel: '38 min',
  },
  {
    id: 'cat-hibt',
    showName: 'How I Built This',
    episodeTitle: 'Airbnb: Joe Gebbia',
    artworkTone: 'sand',
    coverSrc: PODCAST_COVERS.howIBuiltThis,
    durationLabel: '48 min',
  },
  {
    id: 'cat-invisible',
    showName: '99% Invisible',
    episodeTitle: 'The Blue Yarn',
    artworkTone: 'coral',
    coverSrc: PODCAST_COVERS.invisible,
    durationLabel: '34 min',
  },
  {
    id: 'cat-rest',
    showName: 'The Rest Is History',
    episodeTitle: 'Cleopatra',
    artworkTone: 'gold',
    coverSrc: PODCAST_COVERS.restIsHistory,
    durationLabel: '52 min',
  },
  {
    id: 'cat-crime',
    showName: 'Crime Junkie',
    episodeTitle: 'MURDERED: Hanna Harris',
    artworkTone: 'berry',
    coverSrc: PODCAST_COVERS.crimeJunkie,
    durationLabel: '44 min',
  },
  {
    id: 'cat-mfm',
    showName: 'My Favorite Murder',
    episodeTitle: 'Just the Stay Out of the Forest',
    artworkTone: 'rust',
    coverSrc: PODCAST_COVERS.myFavoriteMurder,
    durationLabel: '61 min',
  },
  {
    id: 'cat-darknet',
    showName: 'Darknet Diaries',
    episodeTitle: 'Ep 100: Bridging the Gap',
    artworkTone: 'indigo',
    coverSrc: PODCAST_COVERS.darknetDiaries,
    durationLabel: '55 min',
  },
  {
    id: 'cat-chd',
    showName: 'Call Her Daddy',
    episodeTitle: 'Best of 2024',
    artworkTone: 'terracotta',
    coverSrc: PODCAST_COVERS.callHerDaddy,
    durationLabel: '47 min',
  },
  {
    id: 'cat-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    artworkTone: 'moss',
    coverSrc: PODCAST_COVERS.huberman,
    durationLabel: '14 min',
  },
  {
    id: 'cat-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    artworkTone: 'terracotta',
    coverSrc: PODCAST_COVERS.jayShetty,
    durationLabel: '36 min',
  },
]

function flatten(): MosaicItem[] {
  const items: MosaicItem[] = []
  const seen = new Set<string>()

  const push = (item: MosaicItem) => {
    if (seen.has(item.id)) return
    seen.add(item.id)
    items.push(item)
  }

  push({
    id: MOCK_HOME_FEED.featured.id,
    showName: MOCK_HOME_FEED.featured.showName,
    episodeTitle: MOCK_HOME_FEED.featured.episodeTitle,
    artworkTone: MOCK_HOME_FEED.featured.artworkTone,
    coverSrc: MOCK_HOME_FEED.featured.coverSrc!,
    durationLabel: MOCK_HOME_FEED.featured.durationLabel,
  })

  for (const r of MOCK_HOME_FEED.recommendations) {
    push({
      id: r.id,
      showName: r.showName,
      episodeTitle: r.episodeTitle,
      artworkTone: r.artworkTone,
      coverSrc: r.coverSrc!,
      durationLabel: r.durationLabel,
    })
  }

  for (const cl of continueListeningEpisodes) {
    push({
      id: cl.id,
      showName: cl.showName,
      episodeTitle: cl.episodeTitle,
      artworkTone: 'slate',
      coverSrc: cl.coverSrc,
    })
  }

  for (const ne of MOCK_HOME_FEED.newEpisodes) {
    push({
      id: ne.id,
      showName: ne.showName,
      episodeTitle: ne.episodeTitle,
      artworkTone: ne.artworkTone,
      coverSrc: ne.coverSrc!,
      durationLabel: ne.durationLabel,
    })
  }

  for (const p of pulseEpisodes) {
    push({
      id: p.id,
      showName: p.showName,
      episodeTitle: p.episodeTitle,
      artworkTone: 'indigo',
      coverSrc: p.coverSrc,
    })
  }

  for (const extra of EXTRA_CATALOG) {
    push(extra)
  }

  return items
}

export const MOSAIC_ITEMS: MosaicItem[] = flatten()

/** Interleave catalog entries when tiling duplicates so repeats are not adjacent. */
export function tileMosaicLibrary(items: MosaicItem[], targetCount: number): MosaicItem[] {
  if (items.length === 0) return []

  const count = Math.max(targetCount, items.length)
  const result: MosaicItem[] = []
  const stride = items.length

  for (let i = 0; i < count; i += 1) {
    const offset = (i * 7) % stride
    const source = items[(i + offset) % stride]
    const cycle = Math.floor(i / stride)

    if (cycle === 0) {
      result.push(source)
      continue
    }

    result.push({
      ...source,
      id: `${source.id}~dup-${cycle}-${i}`,
    })
  }

  return result
}
