import type { ImageSourcePropType } from 'react-native';

import { PLAYER_EPISODES, PODCAST_COVERS } from './podcastCovers';

export type SearchFeedEpisode = {
  id: string;
  showId: string;
  showName: string;
  episodeTitle: string;
  cover: ImageSourcePropType;
  durationSeconds: number;
  startSeconds?: number;
};

const WSJ_SHOW = {
  showName: 'The Journal',
  episodeTitle: 'Tech Layoffs and the AI Spending Boom',
  cover: PODCAST_COVERS.wsj,
};

export const SEARCH_FEED_QUEUE: SearchFeedEpisode[] = [
  {
    id: 'feed-huberman',
    showId: 'show-huberman',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    cover: PLAYER_EPISODES.huberman.cover,
    durationSeconds: 14 * 60 + 27,
    startSeconds: 12 * 60 + 39,
  },
  {
    id: 'feed-wsj',
    showId: 'show-wsj',
    showName: WSJ_SHOW.showName,
    episodeTitle: WSJ_SHOW.episodeTitle,
    cover: WSJ_SHOW.cover,
    durationSeconds: 8 * 60 + 12,
  },
  {
    id: 'feed-fa',
    showId: 'show-fa',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    cover: PLAYER_EPISODES.foreignAffairs.cover,
    durationSeconds: 42 * 60,
  },
  {
    id: 'feed-jay',
    showId: 'show-jay',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    cover: PLAYER_EPISODES.jayShetty.cover,
    durationSeconds: 36 * 60,
  },
];

export function getSearchEpisodeById(id: string): SearchFeedEpisode | undefined {
  return SEARCH_FEED_QUEUE.find((episode) => episode.id === id);
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
  'pulse-1': 'feed-wsj',
  'pulse-2': 'feed-fa',
  'pulse-3': 'feed-jay',
  'pulse-4': 'feed-huberman',
};

export function mosaicIdToFeedId(mosaicId: string): string {
  return MOSAIC_TO_FEED_ID[mosaicId] ?? mosaicId;
}
