import { colors as brieflyColors } from '../tokens'
import { PLAYER_EPISODES, PODCAST_COVERS } from './podcastCatalog'

export type ContinueListeningEpisode = {
  id: string
  showName: string
  episodeTitle: string
  coverSrc: string
  progress: number
  progressLabel: string
  /** Build-time dominant color from cover art (color-thief). Hue/sat used for card tint. */
  dominantColor: string
}

export type PulseEpisode = {
  id: string
  showName: string
  episodeTitle: string
  coverSrc: string
  trendScore: number
  trendLabel: string
  /** Build-time dominant color from cover art (color-thief). Hue/sat used for card tint. */
  dominantColor: string
}

export type EditorialPick = {
  id: string
  title: string
  coverSrc: string
  showName: string
  episodeMeta: string
  innerColor: string
  frameColor: string
}

/** Dominant colors extracted via `node scripts/extract-continue-colors.mjs` */
export const continueListeningEpisodes: ContinueListeningEpisode[] = [
  {
    id: 'cl-1',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    coverSrc: PODCAST_COVERS.huberman,
    progress: 0.42,
    progressLabel: '17:36/42:00',
    dominantColor: 'hsl(152 29% 62%)',
  },
  {
    id: 'cl-2',
    showName: 'The Daily',
    episodeTitle: 'Nicolas Cage Made Himself a Legend. Then He Had to Live With It.',
    coverSrc: PODCAST_COVERS.theDaily,
    progress: 0.68,
    progressLabel: '16:32/24:18',
    dominantColor: 'hsl(197 100% 40%)',
  },
  {
    id: 'cl-3',
    showName: 'Acquired',
    episodeTitle: 'NVIDIA',
    coverSrc: PODCAST_COVERS.acquired,
    progress: 0.15,
    progressLabel: '18:09/2:01:00',
    dominantColor: 'hsl(177 75% 11%)',
  },
  {
    id: 'cl-4',
    showName: 'Hard Fork',
    episodeTitle: 'Our Field Trip to Google I/O + A Sit-Down With Sundar Pichai',
    coverSrc: PODCAST_COVERS.hardFork,
    progress: 0.31,
    progressLabel: '21:42/1:09:48',
    dominantColor: 'hsl(59 79% 54%)',
  },
  {
    id: 'cl-5',
    showName: 'Radiolab',
    episodeTitle: 'The Wubi Effect',
    coverSrc: PODCAST_COVERS.radiolab,
    progress: 0.57,
    progressLabel: '19:12/33:36',
    dominantColor: 'hsl(6 100% 63%)',
  },
]

/** Dominant colors extracted via `node scripts/extract-continue-colors.mjs` (pulse covers) */
export const pulseEpisodes: PulseEpisode[] = [
  {
    id: 'pulse-1',
    showName: 'Hard Fork',
    episodeTitle: 'Our Field Trip to Google I/O + A Sit-Down With Sundar Pichai',
    coverSrc: PODCAST_COVERS.hardFork,
    trendScore: 92,
    trendLabel: '14k Listening Now',
    dominantColor: 'hsl(59 79% 54%)',
  },
  {
    id: 'pulse-2',
    showName: 'Crime Junkie',
    episodeTitle: 'MURDERED: Hanna Harris',
    coverSrc: PODCAST_COVERS.crimeJunkie,
    trendScore: 78,
    trendLabel: '9.2k Listening Now',
    dominantColor: 'hsl(276 72% 43%)',
  },
  {
    id: 'pulse-3',
    showName: 'Radiolab',
    episodeTitle: 'The Wubi Effect',
    coverSrc: PODCAST_COVERS.radiolab,
    trendScore: 61,
    trendLabel: '5.1k Listening Now',
    dominantColor: 'hsl(6 100% 63%)',
  },
  {
    id: 'pulse-4',
    showName: 'Planet Money',
    episodeTitle: 'The Island No One Wants',
    coverSrc: PODCAST_COVERS.planetMoney,
    trendScore: 44,
    trendLabel: '2.8k Listening Now',
    dominantColor: 'hsl(109 88% 9%)',
  },
  {
    id: 'pulse-5',
    showName: 'SmartLess',
    episodeTitle: 'Adam Scott',
    coverSrc: PODCAST_COVERS.smartLess,
    trendScore: 31,
    trendLabel: '1.4k Listening Now',
    dominantColor: 'hsl(24 36% 83%)',
  },
]

export const editorialPick: EditorialPick = {
  id: 'edit-1',
  title: 'How having a purpose changes the course of human enjoyment in life.',
  coverSrc: PODCAST_COVERS.jayShetty,
  showName: 'On Purpose with Jay Shetty',
  episodeMeta: 'S: 06 | EPS: 22',
  innerColor: '#121212',
  frameColor: brieflyColors.accent.warm,
}
