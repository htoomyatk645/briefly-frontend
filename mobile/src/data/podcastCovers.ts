import type { ImageSourcePropType } from 'react-native';

/** Remote cover art for discover mock data (mirrors web podcast catalog keys). */
export const PODCAST_COVERS = {
  huberman: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg',
  },
  wsj: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/cd/0b/bb/cd0bbbae-acb2-1962-6653-6b4e0634db3c/mza_2669424987953808400.jpg/600x600bb.jpg',
  },
  foreignAffairs: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg',
  },
  jayShetty: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/5e/a1/69/5ea169e2-18c4-40b0-0982-2fda3476d9a4/mza_9372864784596222041.jpg/600x600bb.jpg',
  },
  theDaily: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/2f/3e/8a/2f3e8a0a-0f0a-4b0a-9c0a-0f0a4b0a9c0a/mza_placeholder.jpg/600x600bb.jpg',
  },
  acquired: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg',
  },
  revisionistHistory: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg',
  },
  hardFork: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/cd/0b/bb/cd0bbbae-acb2-1962-6653-6b4e0634db3c/mza_2669424987953808400.jpg/600x600bb.jpg',
  },
  howIBuiltThis: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/5e/a1/69/5ea169e2-18c4-40b0-0982-2fda3476d9a4/mza_9372864784596222041.jpg/600x600bb.jpg',
  },
  invisible: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg',
  },
  radiolab: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/cd/0b/bb/cd0bbbae-acb2-1962-6653-6b4e0634db3c/mza_2669424987953808400.jpg/600x600bb.jpg',
  },
  planetMoney: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/5e/a1/69/5ea169e2-18c4-40b0-0982-2fda3476d9a4/mza_9372864784596222041.jpg/600x600bb.jpg',
  },
  smartLess: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg',
  },
  restIsHistory: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg',
  },
  crimeJunkie: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/cd/0b/bb/cd0bbbae-acb2-1962-6653-6b4e0634db3c/mza_2669424987953808400.jpg/600x600bb.jpg',
  },
  myFavoriteMurder: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/5e/a1/69/5ea169e2-18c4-40b0-0982-2fda3476d9a4/mza_9372864784596222041.jpg/600x600bb.jpg',
  },
  darknetDiaries: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg',
  },
  callHerDaddy: {
    uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg',
  },
} satisfies Record<string, ImageSourcePropType>;

export type PodcastCoverKey = keyof typeof PODCAST_COVERS;

export const PLAYER_EPISODES = {
  huberman: {
    showName: 'Huberman Lab',
    episodeTitle: 'Essentials: Master Your Sleep & Be More Alert When Awake',
    cover: PODCAST_COVERS.huberman,
  },
  foreignAffairs: {
    showName: 'The Foreign Affairs Interview',
    episodeTitle: 'Prof. Mearsheimer on: Why Realist Leaders Fail',
    cover: PODCAST_COVERS.foreignAffairs,
  },
  jayShetty: {
    showName: 'On Purpose with Jay Shetty',
    episodeTitle: 'Why Monks Meditate in Early Sunrise & How You Can Too',
    cover: PODCAST_COVERS.jayShetty,
  },
} as const;
