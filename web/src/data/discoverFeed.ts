import type { MosaicItem } from '../components/discover/discoverData'
import { PODCAST_COVERS, PLAYER_EPISODES } from './podcastCatalog'

export type BriefCard = MosaicItem & {
  playCountLabel?: string
}

export type EditorialHeroItem = {
  id: string
  showName: string
  episodeTitle: string
  brief: string
  durationLabel: string
  coverSrc: string
  artworkTone: string
  categoryId: string
}

export type VibeShelf = {
  id: string
  label: string
  subtitle: string
  accentToken: string
  items: BriefCard[]
}

export type BrieflyPickList = {
  id: string
  title: string
  curatorName: string
  curatorRole: string
  blurb: string
  coverIds: string[]
}

const briefCatalog: BriefCard[] = [
  {
    id: 'brief-01',
    showName: PLAYER_EPISODES.huberman.showName,
    episodeTitle: 'Master Your Sleep & Be More Alert When Awake',
    artworkTone: 'moss',
    coverSrc: PODCAST_COVERS.huberman,
    durationLabel: '4 min',
    playCountLabel: '28k plays',
  },
  {
    id: 'brief-02',
    showName: 'Acquired',
    episodeTitle: 'NVIDIA',
    artworkTone: 'forest',
    coverSrc: PODCAST_COVERS.acquired,
    durationLabel: '5 min',
    playCountLabel: '45k plays',
  },
  {
    id: 'brief-03',
    showName: 'Radiolab',
    episodeTitle: 'The Wubi Effect',
    artworkTone: 'coral',
    coverSrc: PODCAST_COVERS.radiolab,
    durationLabel: '3 min',
    playCountLabel: '9.8k plays',
  },
  {
    id: 'brief-04',
    showName: 'Crime Junkie',
    episodeTitle: 'MURDERED: Hanna Harris',
    artworkTone: 'berry',
    coverSrc: PODCAST_COVERS.crimeJunkie,
    durationLabel: '4 min',
    playCountLabel: '67k plays',
  },
  {
    id: 'brief-05',
    showName: 'Hard Fork',
    episodeTitle: 'Our Field Trip to Google I/O',
    artworkTone: 'gold',
    coverSrc: PODCAST_COVERS.hardFork,
    durationLabel: '4 min',
    playCountLabel: '33k plays',
  },
  {
    id: 'brief-06',
    showName: 'SmartLess',
    episodeTitle: 'Adam Scott',
    artworkTone: 'sand',
    coverSrc: PODCAST_COVERS.smartLess,
    durationLabel: '3 min',
    playCountLabel: '15k plays',
  },
  {
    id: 'brief-07',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    episodeTitle: 'Why Realist Leaders Fail',
    artworkTone: 'slate',
    coverSrc: PODCAST_COVERS.foreignAffairs,
    durationLabel: '3 min',
    playCountLabel: '12k plays',
  },
  {
    id: 'brief-08',
    showName: 'Planet Money',
    episodeTitle: 'The Island No One Wants',
    artworkTone: 'ocean',
    coverSrc: PODCAST_COVERS.planetMoney,
    durationLabel: '3 min',
    playCountLabel: '11k plays',
  },
  {
    id: 'brief-09',
    showName: PLAYER_EPISODES.jayShetty.showName,
    episodeTitle: 'Why Monks Meditate in Early Sunrise',
    artworkTone: 'terracotta',
    coverSrc: PODCAST_COVERS.jayShetty,
    durationLabel: '4 min',
    playCountLabel: '22k plays',
  },
  {
    id: 'brief-10',
    showName: 'The Daily',
    episodeTitle: 'Nicolas Cage Made Himself a Legend',
    artworkTone: 'ocean',
    coverSrc: PODCAST_COVERS.theDaily,
    durationLabel: '3 min',
    playCountLabel: '41k plays',
  },
  {
    id: 'brief-11',
    showName: 'Revisionist History',
    episodeTitle: 'The Satire Paradox',
    artworkTone: 'indigo',
    coverSrc: PODCAST_COVERS.revisionistHistory,
    durationLabel: '3 min',
    playCountLabel: '7.4k plays',
  },
  {
    id: 'brief-12',
    showName: '99% Invisible',
    episodeTitle: 'The Blue Yarn',
    artworkTone: 'rust',
    coverSrc: PODCAST_COVERS.invisible,
    durationLabel: '3 min',
    playCountLabel: '5.6k plays',
  },
]

export const editorialHero: EditorialHeroItem = {
  id: 'editorial-hero-1',
  showName: PLAYER_EPISODES.huberman.showName,
  episodeTitle: 'The 4-minute case for doing less, better',
  brief: 'One clip on focus and dopamine — the week\'s must-listen edit.',
  durationLabel: '4 min',
  coverSrc: PODCAST_COVERS.huberman,
  artworkTone: 'moss',
  categoryId: 'health',
}

export const vibeShelves: VibeShelf[] = [
  {
    id: 'deep-focus',
    label: 'Deep Focus',
    subtitle: 'Dense ideas, zero filler',
    accentToken: 'primary',
    items: [briefCatalog[0], briefCatalog[1], briefCatalog[2], briefCatalog[6]],
  },
  {
    id: 'morning-wakeup',
    label: 'Morning Wake-Up',
    subtitle: 'Sharp starts for early hours',
    accentToken: 'primary-soft',
    items: [briefCatalog[0], briefCatalog[7], briefCatalog[9], briefCatalog[8]],
  },
  {
    id: 'walk-and-wonder',
    label: 'Walk & Wonder',
    subtitle: 'Curiosity on the move',
    accentToken: 'surface-alt',
    items: [briefCatalog[3], briefCatalog[10], briefCatalog[11], briefCatalog[2]],
  },
  {
    id: 'insomnia-companion',
    label: 'Insomnia Companion',
    subtitle: 'Quiet voices, low stakes',
    accentToken: 'text-muted',
    items: [briefCatalog[5], briefCatalog[8], briefCatalog[10], briefCatalog[11]],
  },
  {
    id: 'smart-at-dinner',
    label: 'Smart at Dinner',
    subtitle: 'Conversation starters in 3 minutes',
    accentToken: 'primary',
    items: [briefCatalog[4], briefCatalog[1], briefCatalog[9], briefCatalog[6]],
  },
]

export const brieflyPicks: BrieflyPickList[] = [
  {
    id: 'pick-1',
    title: 'Five clips that changed how we edit',
    curatorName: 'Maya Chen',
    curatorRole: 'Briefly Editor',
    blurb: 'The moments we return to when training the model.',
    coverIds: ['brief-07', 'brief-02', 'brief-04', 'brief-05', 'brief-11'],
  },
  {
    id: 'pick-2',
    title: 'Stories worth repeating at dinner',
    curatorName: 'Jordan Ellis',
    curatorRole: 'Culture Desk',
    blurb: 'Tight narratives with a clear takeaway.',
    coverIds: ['brief-06', 'brief-10', 'brief-08', 'brief-11'],
  },
  {
    id: 'pick-3',
    title: 'Big ideas, small runtime',
    curatorName: 'Samira Okonkwo',
    curatorRole: 'Science Lead',
    blurb: 'Complex topics compressed without losing the point.',
    coverIds: ['brief-01', 'brief-03', 'brief-08', 'brief-12', 'brief-09'],
  },
]

function toListensTodayLabel(playCountLabel: string): string {
  return playCountLabel.replace(/\s*plays$/i, ' listens today').replace(/^([\d.]+)k/i, (_, value: string) => {
    const num = Number.parseFloat(value)
    return num % 1 === 0 ? `${Math.round(num)}K` : `${num}K`
  })
}

function withListensToday(brief: BriefCard): BriefCard {
  return {
    ...brief,
    playCountLabel: brief.playCountLabel
      ? toListensTodayLabel(brief.playCountLabel)
      : undefined,
  }
}

export const trendingBriefs: BriefCard[] = [
  briefCatalog[3],
  briefCatalog[1],
  briefCatalog[9],
  briefCatalog[0],
  briefCatalog[4],
  briefCatalog[8],
  briefCatalog[5],
  briefCatalog[6],
  briefCatalog[7],
  briefCatalog[2],
].map(withListensToday)
