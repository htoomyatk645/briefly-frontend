import { PLAYER_EPISODES } from '../../data/podcastCatalog'

export type FeedCardTone = 'purple' | 'navy' | 'crimson'

export type FeedEpisode = {
  id: string
  showId: string
  showName: string
  episodeTitle: string
  cardTone: FeedCardTone
  coverSrc: string
  durationSeconds: number
  startSeconds?: number
}

export const FEED_QUEUE: FeedEpisode[] = [
  {
    id: 'feed-huberman',
    showId: 'show-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    cardTone: 'purple',
    coverSrc: PLAYER_EPISODES.huberman.coverSrc,
    durationSeconds: 14 * 60 + 27,
    startSeconds: 12 * 60 + 39,
  },
  {
    id: 'feed-wsj',
    showId: 'show-wsj',
    showName: PLAYER_EPISODES.wsj.showName,
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    cardTone: 'navy',
    coverSrc: PLAYER_EPISODES.wsj.coverSrc,
    durationSeconds: 8 * 60 + 12,
  },
  {
    id: 'feed-fa',
    showId: 'show-fa',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    cardTone: 'navy',
    coverSrc: PLAYER_EPISODES.foreignAffairs.coverSrc,
    durationSeconds: 42 * 60,
  },
  {
    id: 'feed-jay',
    showId: 'show-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    cardTone: 'purple',
    coverSrc: PLAYER_EPISODES.jayShetty.coverSrc,
    durationSeconds: 36 * 60,
  },
]

export function getEpisodeById(id: string): FeedEpisode | undefined {
  return FEED_QUEUE.find((e) => e.id === id)
}

export const MOSAIC_TO_FEED_ID: Record<string, string> = {
  'cl-1': 'feed-huberman',
  'cl-2': 'feed-wsj',
  'cl-3': 'feed-fa',
  'cl-4': 'feed-wsj',
  'cl-5': 'feed-fa',
  'feat-1': 'feed-jay',
  'rec-1': 'feed-wsj',
  'rec-2': 'feed-fa',
  'rec-3': 'feed-jay',
  'rec-4': 'feed-huberman',
  'rec-5': 'feed-jay',
  'rec-6': 'feed-wsj',
  'new-1': 'feed-wsj',
  'new-2': 'feed-fa',
  'new-3': 'feed-jay',
  'new-4': 'feed-huberman',
  'pulse-1': 'feed-wsj',
  'pulse-2': 'feed-fa',
  'pulse-3': 'feed-jay',
  'pulse-4': 'feed-huberman',
  'pulse-5': 'feed-wsj',
  'cat-daily': 'feed-wsj',
  'cat-acquired': 'feed-fa',
  'cat-revisionist': 'feed-jay',
  'cat-hibt': 'feed-huberman',
  'cat-invisible': 'feed-wsj',
  'cat-rest': 'feed-fa',
  'cat-crime': 'feed-jay',
  'cat-mfm': 'feed-huberman',
  'cat-darknet': 'feed-wsj',
  'cat-chd': 'feed-jay',
  'cat-huberman': 'feed-huberman',
  'cat-jay': 'feed-jay',
}

export function mosaicIdToFeedId(mosaicId: string): string {
  const baseId = mosaicId.replace(/~dup-[a-z0-9-]+$/i, '')
  return MOSAIC_TO_FEED_ID[baseId] ?? DEFAULT_FEED_ID
}

export const DEFAULT_FEED_ID = FEED_QUEUE[0].id

export function getUpNextItems(nowPlayingId: string): FeedEpisode[] {
  return FEED_QUEUE.filter((e) => e.id !== nowPlayingId)
}
