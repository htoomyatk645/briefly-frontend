import type { ImageSourcePropType } from 'react-native';

import { PLAYER_EPISODES, PODCAST_COVERS } from './podcastCovers';

export type SearchLibraryShow = {
  id: string;
  name: string;
  hostName: string;
  description: string;
  cover: ImageSourcePropType;
};

export const SEARCH_LIBRARY_SHOWS: SearchLibraryShow[] = [
  {
    id: 'show-huberman',
    name: PLAYER_EPISODES.huberman.showName,
    hostName: 'Andrew Huberman, Ph.D.',
    description: 'Neuroscience tools for everyday life.',
    cover: PODCAST_COVERS.huberman,
  },
  {
    id: 'show-wsj',
    name: 'The Journal',
    hostName: 'WSJ Podcasts',
    description: 'Tech and markets in ten minutes.',
    cover: PODCAST_COVERS.wsj,
  },
  {
    id: 'show-fa',
    name: PLAYER_EPISODES.foreignAffairs.showName,
    hostName: 'Foreign Affairs',
    description: 'Ideas that shape global policy.',
    cover: PODCAST_COVERS.foreignAffairs,
  },
  {
    id: 'show-jay',
    name: PLAYER_EPISODES.jayShetty.showName,
    hostName: 'Jay Shetty',
    description: 'Wisdom for a purposeful life.',
    cover: PODCAST_COVERS.jayShetty,
  },
  {
    id: 'show-daily',
    name: 'The Daily',
    hostName: 'Michael Barbaro',
    description: 'One story, deeply reported.',
    cover: PODCAST_COVERS.theDaily,
  },
  {
    id: 'show-acquired',
    name: 'Acquired',
    hostName: 'Ben Gilbert & David Rosenthal',
    description: 'The stories behind great companies.',
    cover: PODCAST_COVERS.acquired,
  },
];
