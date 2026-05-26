import { FEED_QUEUE, mosaicIdToFeedId } from '../components/feed/feedData'
import { getContextForEpisode } from '../components/feed/episodeContextData'
import { continueListeningEpisodes, pulseEpisodes } from './homeData'
import { MOCK_HOME_FEED } from '../components/home/homeData'

/** Clip-level metadata for search indexing (home + feed). */
export type SearchClipMetadata = {
  /** Stable id for list keys — mosaic id or feed episode id. */
  id: string
  feedEpisodeId: string
  showName: string
  episodeTitle: string
  coverSrc: string
  speakerName: string
  topicTags: string[]
  /** Display line for inline results (defaults to episodeTitle). */
  pullQuote?: string
  startSeconds?: number
}

function tagsFromContext(episodeId: string, extra: string[] = []): string[] {
  const ctx = getContextForEpisode(episodeId)
  const fromRefs = ctx?.references.map((ref) => ref.label) ?? []
  const fromShow = ctx?.showName ? [ctx.showName] : []
  return [...new Set([...extra, ...fromShow, ...fromRefs].map((t) => t.toLowerCase()))]
}

function speakerFromContext(episodeId: string, fallback: string): string {
  const ctx = getContextForEpisode(episodeId)
  const host = ctx?.speakers.find((s) => /host/i.test(s.role))
  return host?.name ?? ctx?.speakers[0]?.name ?? fallback
}

const FEED_PULL_QUOTES: Record<string, string> = {
  'feed-huberman':
    'Morning light within an hour of waking is the anchor for every sleep protocol that follows.',
  'feed-wsj':
    'Post-pandemic hiring and AI spend are pulling headcount in opposite directions.',
  'feed-fa':
    'Structural constraints matter — leader psychology is not a sideshow.',
  'feed-jay':
    'Micro-commitments rebuild agency without waiting for external validation.',
}

const FEED_EXTRA_TAGS: Record<string, string[]> = {
  'feed-huberman': ['sleep', 'neuroscience', 'circadian', 'alertness'],
  'feed-wsj': ['layoffs', 'tech', 'economy', 'silicon valley', 'federal reserve'],
  'feed-fa': ['geopolitics', 'realism', 'diplomacy', 'middle east'],
  'feed-jay': ['habits', 'mindfulness', 'purpose', 'meditation'],
}

const FEED_CLIP_META: SearchClipMetadata[] = FEED_QUEUE.map((episode) => ({
  id: episode.id,
  feedEpisodeId: episode.id,
  showName: episode.showName,
  episodeTitle: episode.episodeTitle,
  coverSrc: episode.coverSrc,
  speakerName: speakerFromContext(episode.id, episode.showName),
  topicTags: tagsFromContext(episode.id, FEED_EXTRA_TAGS[episode.id] ?? []),
  pullQuote: FEED_PULL_QUOTES[episode.id],
  startSeconds: episode.startSeconds,
}))

function homeClip(
  mosaicId: string,
  showName: string,
  episodeTitle: string,
  coverSrc: string,
  speakerName: string,
  topicTags: string[],
  pullQuote?: string,
): SearchClipMetadata {
  const feedEpisodeId = mosaicIdToFeedId(mosaicId)
  return {
    id: mosaicId,
    feedEpisodeId,
    showName,
    episodeTitle,
    coverSrc,
    speakerName: speakerFromContext(feedEpisodeId, speakerName),
    topicTags: [
      ...new Set([
        ...topicTags.map((t) => t.toLowerCase()),
        ...tagsFromContext(feedEpisodeId),
      ]),
    ],
    pullQuote,
  }
}

const HOME_CLIP_METADATA: SearchClipMetadata[] = [
  ...continueListeningEpisodes.map((ep) =>
    homeClip(ep.id, ep.showName, ep.episodeTitle, ep.coverSrc, ep.showName, [
      'continue listening',
      ep.showName,
    ]),
  ),
  ...pulseEpisodes.map((ep) =>
    homeClip(ep.id, ep.showName, ep.episodeTitle, ep.coverSrc, ep.showName, [
      'trending',
      ep.showName,
    ]),
  ),
  homeClip(
    MOCK_HOME_FEED.featured.id,
    MOCK_HOME_FEED.featured.showName,
    MOCK_HOME_FEED.featured.episodeTitle,
    MOCK_HOME_FEED.featured.coverSrc ?? '',
    MOCK_HOME_FEED.featured.showName,
    ['featured', 'morning ritual', 'meditation'],
    MOCK_HOME_FEED.featured.description,
  ),
  ...MOCK_HOME_FEED.recommendations.map((rec) =>
    homeClip(rec.id, rec.showName, rec.episodeTitle, rec.coverSrc ?? '', rec.showName, [
      'recommendation',
      rec.showName,
    ], rec.description),
  ),
  ...MOCK_HOME_FEED.newEpisodes.map((ep) =>
    homeClip(ep.id, ep.showName, ep.episodeTitle, ep.coverSrc ?? '', ep.showName, [
      'new episode',
      ep.showName,
    ]),
  ),
]

/** All clip metadata used to build the in-memory search index. */
export const SEARCH_CLIP_METADATA: SearchClipMetadata[] = [
  ...FEED_CLIP_META,
  ...HOME_CLIP_METADATA,
]
