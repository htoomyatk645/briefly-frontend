import type { ImageSourcePropType } from 'react-native';

export type UpNextEpisode = {
  id: number;
  title: string;
  show: string;
  artwork: ImageSourcePropType;
};

export type NowPlayingEpisode = {
  title: string;
  show: string;
  artwork: ImageSourcePropType;
  elapsed: number;
  duration: number;
};

export type ShopProduct = {
  id: string;
  title: string;
  price: string;
  image: ImageSourcePropType;
};

export type AudioOutput = {
  id: string;
  label: string;
};

export type MoreMenuItem = {
  id: string;
  label: string;
  icon: string;
  dividerBefore?: boolean;
};

const COVERS = {
  huberman: { uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg' },
  wsj: { uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/cd/0b/bb/cd0bbbae-acb2-1962-6653-6b4e0634db3c/mza_2669424987953808400.jpg/600x600bb.jpg' },
  fa: { uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/d3/47/d6/d347d6a6-6732-2349-0801-f1c76c9e3e69/mza_13598977958412175792.jpg/600x600bb.jpg' },
  jay: { uri: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/5e/a1/69/5ea169e2-18c4-40b0-0982-2fda3476d9a4/mza_9372864784596222041.jpg/600x600bb.jpg' },
};

export const upNextEpisodes: UpNextEpisode[] = [
  {
    id: 1,
    title: '03/10/23: Regulators Shut Down Silicon Valley Bank',
    show: 'WSJ Tech News Briefing',
    artwork: COVERS.wsj,
  },
  {
    id: 2,
    title: 'Prof. Mearsheimer on: Why Realist Leaders Fail',
    show: 'The Foreign Affairs Interview',
    artwork: COVERS.fa,
  },
  {
    id: 3,
    title: 'Why Monks Meditate in Early Sunrise & How You Can Too',
    show: 'On Purpose with Jay Shetty',
    artwork: COVERS.jay,
  },
];

export const nowPlaying: NowPlayingEpisode = {
  title: 'Essentials: Master Your Sleep & Be More Alert When Awake',
  show: 'Huberman Lab',
  artwork: COVERS.huberman,
  elapsed: 759,
  duration: 907,
};

export const shopProducts: ShopProduct[] = [
  {
    id: '1',
    title: 'AG1 Daily Foundational Nutrition',
    price: '$79',
    image: { uri: 'https://picsum.photos/seed/ag1/80/80' },
  },
  {
    id: '2',
    title: 'Eight Sleep Pod Cover',
    price: '$2,295',
    image: { uri: 'https://picsum.photos/seed/eightsleep/80/80' },
  },
  {
    id: '3',
    title: 'Momentous Magnesium Threonate',
    price: '$35',
    image: { uri: 'https://picsum.photos/seed/momentous/80/80' },
  },
];

export const audioOutputs: AudioOutput[] = [
  { id: 'speaker', label: 'iPhone Speaker' },
  { id: 'airpods', label: 'AirPods Pro' },
  { id: 'appletv', label: 'Apple TV' },
];

export const moreMenuItems: MoreMenuItem[] = [
  { id: 'follow', label: 'Follow the show', icon: 'heart' },
  { id: 'similar', label: 'Play something similar', icon: 'play-circle' },
  { id: 'not-similar', label: "Don't play similar", icon: 'thumbs-down' },
  { id: 'unplayed', label: 'Mark as unplayed', icon: 'refresh-ccw' },
  { id: 'transcript', label: 'View transcript', icon: 'file-text' },
  { id: 'report', label: 'Report a concern', icon: 'flag', dividerBefore: true },
  { id: 'share', label: 'Share', icon: 'share-2' },
];

export const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const;
