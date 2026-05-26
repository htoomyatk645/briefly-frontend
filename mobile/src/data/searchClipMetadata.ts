import type { ImageSourcePropType } from 'react-native';

import { mosaicIdToFeedId, SEARCH_FEED_QUEUE } from './searchFeed';
import { PODCAST_COVERS } from './podcastCovers';

export type SearchClipMetadata = {
  id: string;
  feedEpisodeId: string;
  showName: string;
  episodeTitle: string;
  cover: ImageSourcePropType;
  speakerName: string;
  topicTags: string[];
  pullQuote?: string;
  startSeconds?: number;
};

const FEED_PULL_QUOTES: Record<string, string> = {
  'feed-huberman':
    'Morning light within an hour of waking is the anchor for every sleep protocol that follows.',
  'feed-wsj':
    'Post-pandemic hiring and AI spend are pulling headcount in opposite directions.',
  'feed-fa': 'Structural constraints matter — leader psychology is not a sideshow.',
  'feed-jay':
    'Micro-commitments rebuild agency without waiting for external validation.',
};

const FEED_EXTRA_TAGS: Record<string, string[]> = {
  'feed-huberman': ['sleep', 'neuroscience', 'circadian', 'alertness'],
  'feed-wsj': ['layoffs', 'tech', 'economy', 'silicon valley', 'federal reserve'],
  'feed-fa': ['geopolitics', 'realism', 'diplomacy', 'middle east'],
  'feed-jay': ['habits', 'mindfulness', 'purpose', 'meditation'],
};

const FEED_SPEAKERS: Record<string, string> = {
  'feed-huberman': 'Andrew Huberman',
  'feed-wsj': 'Kate Linebaugh',
  'feed-fa': 'John Mearsheimer',
  'feed-jay': 'Jay Shetty',
};

const FEED_CLIP_META: SearchClipMetadata[] = SEARCH_FEED_QUEUE.map((episode) => ({
  id: episode.id,
  feedEpisodeId: episode.id,
  showName: episode.showName,
  episodeTitle: episode.episodeTitle,
  cover: episode.cover,
  speakerName: FEED_SPEAKERS[episode.id] ?? episode.showName,
  topicTags: FEED_EXTRA_TAGS[episode.id] ?? [],
  pullQuote: FEED_PULL_QUOTES[episode.id],
  startSeconds: episode.startSeconds,
}));

function homeClip(
  mosaicId: string,
  showName: string,
  episodeTitle: string,
  cover: ImageSourcePropType,
  speakerName: string,
  topicTags: string[],
  pullQuote?: string,
): SearchClipMetadata {
  const feedEpisodeId = mosaicIdToFeedId(mosaicId);
  return {
    id: mosaicId,
    feedEpisodeId,
    showName,
    episodeTitle,
    cover,
    speakerName,
    topicTags: topicTags.map((tag) => tag.toLowerCase()),
    pullQuote,
  };
}

const HOME_CLIP_METADATA: SearchClipMetadata[] = [
  homeClip(
    'cl-1',
    'Huberman Lab',
    'Master Your Sleep & Be More Alert When Awake',
    PODCAST_COVERS.huberman,
    'Andrew Huberman',
    ['continue listening', 'huberman lab', 'sleep'],
    'Morning light within an hour of waking anchors your circadian rhythm.',
  ),
  homeClip(
    'pulse-1',
    'The Journal',
    'Tech Layoffs and the AI Spending Boom',
    PODCAST_COVERS.wsj,
    'Kate Linebaugh',
    ['trending', 'tech', 'economy'],
    'Post-pandemic hiring and AI spend are pulling headcount in opposite directions.',
  ),
  homeClip(
    'pulse-2',
    'The Foreign Affairs Interview',
    'Why Realist Leaders Fail',
    PODCAST_COVERS.foreignAffairs,
    'John Mearsheimer',
    ['trending', 'geopolitics', 'realism'],
    'Structural constraints matter — leader psychology is not a sideshow.',
  ),
  homeClip(
    'feat-1',
    'On Purpose with Jay Shetty',
    'Why Monks Meditate in Early Sunrise',
    PODCAST_COVERS.jayShetty,
    'Jay Shetty',
    ['featured', 'meditation', 'mindfulness'],
    'Guided breath is measurable, not aesthetic — the research hub backs the habit.',
  ),
  homeClip(
    'rec-1',
    'Acquired',
    'NVIDIA',
    PODCAST_COVERS.acquired,
    'Ben Gilbert',
    ['recommendation', 'semiconductors', 'chips'],
    'Supply chains for chips ripple through hardware startups faster than equity markets admit.',
  ),
];

export const SEARCH_CLIP_METADATA: SearchClipMetadata[] = [
  ...FEED_CLIP_META,
  ...HOME_CLIP_METADATA,
];
