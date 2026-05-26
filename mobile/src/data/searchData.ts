import type { ImageSourcePropType } from 'react-native';

import { PODCAST_COVERS } from './podcastCovers';

export type TrendingSearchItem = {
  id: string;
  query: string;
  pullQuote: string;
  showName: string;
  cover: ImageSourcePropType;
  volume24h: number[];
  playCountLabel: string;
};

export type MoodTileItem = {
  id: string;
  label: string;
  moodQuery: string;
  cover: ImageSourcePropType;
};

export const TRENDING_SEARCHES: TrendingSearchItem[] = [
  {
    id: 'trend-ozempic',
    query: 'ozempic',
    pullQuote: 'GLP-1 drugs are rewriting appetite — and the obesity conversation.',
    showName: 'Huberman Lab',
    cover: PODCAST_COVERS.huberman,
    volume24h: [
      0.12, 0.18, 0.22, 0.28, 0.35, 0.42, 0.48, 0.55, 0.62, 0.68, 0.72, 0.78, 0.82, 0.88,
      0.92, 0.95, 0.9, 0.85, 0.8, 0.74, 0.68, 0.6, 0.52, 0.45,
    ],
    playCountLabel: '18.4k plays',
  },
  {
    id: 'trend-sleep',
    query: 'sleep debt',
    pullQuote: 'Even mild restriction compounds across a work week — not just one bad night.',
    showName: 'Huberman Lab',
    cover: PODCAST_COVERS.huberman,
    volume24h: [
      0.2, 0.24, 0.3, 0.34, 0.38, 0.44, 0.5, 0.54, 0.58, 0.62, 0.66, 0.7, 0.74, 0.76, 0.78,
      0.8, 0.78, 0.75, 0.7, 0.65, 0.58, 0.5, 0.42, 0.36,
    ],
    playCountLabel: '12.1k plays',
  },
  {
    id: 'trend-fed',
    query: 'Federal Reserve',
    pullQuote: 'Liquidity panic and asset quality are not the same story — read the post-mortem.',
    showName: 'The Journal',
    cover: PODCAST_COVERS.wsj,
    volume24h: [
      0.08, 0.1, 0.14, 0.2, 0.26, 0.32, 0.4, 0.48, 0.56, 0.64, 0.7, 0.76, 0.8, 0.84, 0.88,
      0.9, 0.86, 0.8, 0.72, 0.64, 0.55, 0.46, 0.38, 0.3,
    ],
    playCountLabel: '9.8k plays',
  },
  {
    id: 'trend-realism',
    query: 'realism',
    pullQuote: 'Structural constraints matter — leader psychology is not a sideshow.',
    showName: 'The Foreign Affairs Interview',
    cover: PODCAST_COVERS.foreignAffairs,
    volume24h: [
      0.15, 0.18, 0.2, 0.22, 0.25, 0.28, 0.32, 0.36, 0.4, 0.44, 0.48, 0.52, 0.55, 0.58, 0.6,
      0.62, 0.6, 0.56, 0.5, 0.44, 0.38, 0.32, 0.26, 0.2,
    ],
    playCountLabel: '7.2k plays',
  },
  {
    id: 'trend-chips',
    query: 'semiconductors',
    pullQuote:
      'Supply chains for chips ripple through hardware startups faster than equity markets admit.',
    showName: 'Acquired',
    cover: PODCAST_COVERS.acquired,
    volume24h: [
      0.1, 0.12, 0.15, 0.18, 0.22, 0.26, 0.3, 0.34, 0.38, 0.42, 0.46, 0.5, 0.54, 0.58, 0.62,
      0.66, 0.64, 0.6, 0.54, 0.48, 0.4, 0.34, 0.28, 0.22,
    ],
    playCountLabel: '6.5k plays',
  },
  {
    id: 'trend-meditation',
    query: 'meditation',
    pullQuote: 'Guided breath is measurable, not aesthetic — the research hub backs the habit.',
    showName: 'On Purpose',
    cover: PODCAST_COVERS.jayShetty,
    volume24h: [
      0.18, 0.2, 0.22, 0.24, 0.26, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46,
      0.48, 0.46, 0.42, 0.38, 0.34, 0.3, 0.26, 0.22, 0.18,
    ],
    playCountLabel: '5.9k plays',
  },
];

export const MOOD_TILES: MoodTileItem[] = [
  {
    id: 'mood-sharpen',
    label: 'Sharpen your thinking',
    moodQuery: 'mood:sharpen-thinking',
    cover: PODCAST_COVERS.revisionistHistory,
  },
  {
    id: 'mood-laugh',
    label: 'Make me laugh',
    moodQuery: 'mood:make-me-laugh',
    cover: PODCAST_COVERS.smartLess,
  },
  {
    id: 'mood-wind-down',
    label: 'Wind me down',
    moodQuery: 'mood:wind-down',
    cover: PODCAST_COVERS.jayShetty,
  },
  {
    id: 'mood-catch-up',
    label: 'Catch me up on the week',
    moodQuery: 'mood:catch-up-week',
    cover: PODCAST_COVERS.theDaily,
  },
];
