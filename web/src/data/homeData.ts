import { colors } from '../../../packages/tokens/colors'
import { PODCAST_COVERS } from './podcastCatalog'

export type PulseEpisode = {
  id: string
  showName: string
  episodeTitle: string
  coverSrc: string
  trendScore: number
  trendLabel: string
}

export type EditorialPick = {
  id: string
  kicker: string
  title: string
  coverSrc: string
  accentColor: string
}

export type BrowseCategory = {
  id: string
  label: string
  icon:
    | 'newspaper'
    | 'heart'
    | 'trending-up'
    | 'alert-triangle'
    | 'flask'
    | 'laugh'
    | 'cpu'
    | 'users'
}

export const pulseEpisodes: PulseEpisode[] = [
  {
    id: 'pulse-1',
    showName: 'Hard Fork',
    episodeTitle: 'Our Field Trip to Google I/O + A Sit-Down With Sundar Pichai',
    coverSrc: PODCAST_COVERS.hardFork,
    trendScore: 92,
    trendLabel: '🔥 14k listening now',
  },
  {
    id: 'pulse-2',
    showName: 'Crime Junkie',
    episodeTitle: 'MURDERED: Hanna Harris',
    coverSrc: PODCAST_COVERS.crimeJunkie,
    trendScore: 78,
    trendLabel: '🔥 9.2k listening now',
  },
  {
    id: 'pulse-3',
    showName: 'Radiolab',
    episodeTitle: 'The Wubi Effect',
    coverSrc: PODCAST_COVERS.radiolab,
    trendScore: 61,
    trendLabel: '🔥 5.1k listening now',
  },
  {
    id: 'pulse-4',
    showName: 'Planet Money',
    episodeTitle: 'The Island No One Wants',
    coverSrc: PODCAST_COVERS.planetMoney,
    trendScore: 44,
    trendLabel: '🔥 2.8k listening now',
  },
  {
    id: 'pulse-5',
    showName: 'SmartLess',
    episodeTitle: 'Adam Scott',
    coverSrc: PODCAST_COVERS.smartLess,
    trendScore: 31,
    trendLabel: '🔥 1.4k listening now',
  },
]

export const editorialPick: EditorialPick = {
  id: 'edit-1',
  kicker: "EDITOR'S PICK",
  title: 'Sleep, stress, and the science of showing up rested',
  coverSrc: PODCAST_COVERS.huberman,
  accentColor: colors.neutral[800],
}

export const categories: BrowseCategory[] = [
  { id: 'news', label: 'News', icon: 'newspaper' },
  { id: 'health', label: 'Health', icon: 'heart' },
  { id: 'business', label: 'Business', icon: 'trending-up' },
  { id: 'true-crime', label: 'True Crime', icon: 'alert-triangle' },
  { id: 'science', label: 'Science', icon: 'flask' },
  { id: 'comedy', label: 'Comedy', icon: 'laugh' },
  { id: 'technology', label: 'Technology', icon: 'cpu' },
  { id: 'society', label: 'Society', icon: 'users' },
]
