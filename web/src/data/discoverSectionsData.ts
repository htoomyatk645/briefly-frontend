import { colors as brieflyColors } from '../tokens'
import { PODCAST_COVERS, PLAYER_EPISODES } from './podcastCatalog'

export type DiscoverBrief = {
  id: string
  title: string
  showName: string
  coverSrc: string
  durationLabel: string
  artworkTone: string
  categories: string[]
  playCount?: number
}

export type EditorialHeroPick = {
  id: string
  kicker: string
  title: string
  showName: string
  coverSrc: string
  durationLabel: string
  excerpt: string
  frameColor: string
  innerColor: string
}

export type MoodShelf = {
  id: string
  label: string
  description: string
  /** Hue for mood chip tint — hsl(h s% l%) */
  tintHsl: string
  briefs: DiscoverBrief[]
}

export type CuratorCollection = {
  id: string
  curatorName: string
  curatorRole: string
  collectionTitle: string
  briefs: DiscoverBrief[]
}

export type TrendingBrief = DiscoverBrief & {
  rank: number
  playCount: number
}

export function matchesCategory(
  categories: string[],
  activeCategory: string | null,
): boolean {
  if (!activeCategory) return true
  return categories.includes(activeCategory)
}

export function filterBriefs(
  briefs: DiscoverBrief[],
  activeCategory: string | null,
): DiscoverBrief[] {
  return briefs.filter((b) => matchesCategory(b.categories, activeCategory))
}

export const editorialHeroPick: EditorialHeroPick = {
  id: 'hero-weekly-1',
  kicker: "This week's must-listen",
  title: 'The 4-minute case for doing less, better.',
  showName: PLAYER_EPISODES.huberman.showName,
  coverSrc: PODCAST_COVERS.huberman,
  durationLabel: '4 min',
  excerpt:
    'A single clip on focus, dopamine, and why finishing one brief beats starting five episodes.',
  frameColor: brieflyColors.primary,
  innerColor: brieflyColors.zoneDark,
}

const BRIEFS: DiscoverBrief[] = [
  {
    id: 'brief-1',
    title: 'Why realist leaders fail at the hardest decisions',
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    coverSrc: PODCAST_COVERS.foreignAffairs,
    durationLabel: '3 min',
    artworkTone: 'slate',
    categories: ['news', 'society'],
    playCount: 12400,
  },
  {
    id: 'brief-2',
    title: 'Master your sleep in one sitting',
    showName: PLAYER_EPISODES.huberman.showName,
    coverSrc: PODCAST_COVERS.huberman,
    durationLabel: '4 min',
    artworkTone: 'moss',
    categories: ['health', 'science'],
    playCount: 28700,
  },
  {
    id: 'brief-3',
    title: 'NVIDIA in 5 minutes',
    showName: 'Acquired',
    coverSrc: PODCAST_COVERS.acquired,
    durationLabel: '5 min',
    artworkTone: 'forest',
    categories: ['business', 'technology'],
    playCount: 45200,
  },
  {
    id: 'brief-4',
    title: 'The Wubi Effect explained',
    showName: 'Radiolab',
    coverSrc: PODCAST_COVERS.radiolab,
    durationLabel: '3 min',
    artworkTone: 'coral',
    categories: ['science', 'technology'],
    playCount: 9800,
  },
  {
    id: 'brief-5',
    title: 'MURDERED: Hanna Harris',
    showName: 'Crime Junkie',
    coverSrc: PODCAST_COVERS.crimeJunkie,
    durationLabel: '4 min',
    artworkTone: 'berry',
    categories: ['true-crime'],
    playCount: 67300,
  },
  {
    id: 'brief-6',
    title: 'Adam Scott on improv and anxiety',
    showName: 'SmartLess',
    coverSrc: PODCAST_COVERS.smartLess,
    durationLabel: '3 min',
    artworkTone: 'sand',
    categories: ['comedy', 'society'],
    playCount: 15600,
  },
  {
    id: 'brief-7',
    title: 'Google I/O with Sundar Pichai',
    showName: 'Hard Fork',
    coverSrc: PODCAST_COVERS.hardFork,
    durationLabel: '4 min',
    artworkTone: 'gold',
    categories: ['technology', 'news'],
    playCount: 33100,
  },
  {
    id: 'brief-8',
    title: 'The Island No One Wants',
    showName: 'Planet Money',
    coverSrc: PODCAST_COVERS.planetMoney,
    durationLabel: '3 min',
    artworkTone: 'ocean',
    categories: ['business', 'news'],
    playCount: 11200,
  },
  {
    id: 'brief-9',
    title: 'Cleopatra in 4 minutes',
    showName: 'The Rest Is History',
    coverSrc: PODCAST_COVERS.restIsHistory,
    durationLabel: '4 min',
    artworkTone: 'plum',
    categories: ['society'],
    playCount: 8900,
  },
  {
    id: 'brief-10',
    title: 'The Satire Paradox',
    showName: 'Revisionist History',
    coverSrc: PODCAST_COVERS.revisionistHistory,
    durationLabel: '3 min',
    artworkTone: 'indigo',
    categories: ['society', 'comedy'],
    playCount: 7400,
  },
  {
    id: 'brief-11',
    title: 'Airbnb: Joe Gebbia',
    showName: 'How I Built This',
    coverSrc: PODCAST_COVERS.howIBuiltThis,
    durationLabel: '5 min',
    artworkTone: 'terracotta',
    categories: ['business'],
    playCount: 19800,
  },
  {
    id: 'brief-12',
    title: 'The Blue Yarn',
    showName: '99% Invisible',
    coverSrc: PODCAST_COVERS.invisible,
    durationLabel: '3 min',
    artworkTone: 'rust',
    categories: ['society', 'technology'],
    playCount: 5600,
  },
  {
    id: 'brief-13',
    title: 'Why monks meditate at sunrise',
    showName: PLAYER_EPISODES.jayShetty.showName,
    coverSrc: PODCAST_COVERS.jayShetty,
    durationLabel: '4 min',
    artworkTone: 'terracotta',
    categories: ['health', 'society'],
    playCount: 22100,
  },
  {
    id: 'brief-14',
    title: 'Ep 100: Bridging the Gap',
    showName: 'Darknet Diaries',
    coverSrc: PODCAST_COVERS.darknetDiaries,
    durationLabel: '4 min',
    artworkTone: 'indigo',
    categories: ['technology', 'true-crime'],
    playCount: 14300,
  },
  {
    id: 'brief-15',
    title: 'Nicolas Cage Made Himself a Legend',
    showName: 'The Daily',
    coverSrc: PODCAST_COVERS.theDaily,
    durationLabel: '3 min',
    artworkTone: 'ocean',
    categories: ['news', 'society'],
    playCount: 41200,
  },
]

export const moodShelves: MoodShelf[] = [
  {
    id: 'deep-focus',
    label: 'Deep Focus',
    description: 'Dense ideas, zero filler',
    tintHsl: '220 45% 42%',
    briefs: [BRIEFS[0], BRIEFS[2], BRIEFS[3], BRIEFS[10]],
  },
  {
    id: 'morning-wake-up',
    label: 'Morning Wake-Up',
    description: 'Sharp starts for early hours',
    tintHsl: '32 78% 52%',
    briefs: [BRIEFS[1], BRIEFS[7], BRIEFS[12], BRIEFS[14]],
  },
  {
    id: 'walk-wonder',
    label: 'Walk & Wonder',
    description: 'Curiosity on the move',
    tintHsl: '152 38% 38%',
    briefs: [BRIEFS[4], BRIEFS[8], BRIEFS[9], BRIEFS[11]],
  },
  {
    id: 'insomnia-companion',
    label: 'Insomnia Companion',
    description: 'Quiet voices, low stakes',
    tintHsl: '260 32% 48%',
    briefs: [BRIEFS[5], BRIEFS[13], BRIEFS[9], BRIEFS[11]],
  },
  {
    id: 'smart-at-dinner',
    label: 'Smart at Dinner',
    description: 'Conversation starters in 3 minutes',
    tintHsl: '343 65% 45%',
    briefs: [BRIEFS[6], BRIEFS[2], BRIEFS[14], BRIEFS[0]],
  },
]

export const curatorCollections: CuratorCollection[] = [
  {
    id: 'pick-1',
    curatorName: 'Maya Chen',
    curatorRole: 'Briefly Editor',
    collectionTitle: 'Five clips that changed how we edit',
    briefs: [BRIEFS[0], BRIEFS[2], BRIEFS[4], BRIEFS[6], BRIEFS[9]],
  },
  {
    id: 'pick-2',
    curatorName: 'Jordan Ellis',
    curatorRole: 'Culture Desk',
    collectionTitle: 'Stories worth repeating at dinner',
    briefs: [BRIEFS[5], BRIEFS[8], BRIEFS[14], BRIEFS[10]],
  },
  {
    id: 'pick-3',
    curatorName: 'Samira Okonkwo',
    curatorRole: 'Science Lead',
    collectionTitle: 'Big ideas, small runtime',
    briefs: [BRIEFS[1], BRIEFS[3], BRIEFS[7], BRIEFS[11], BRIEFS[13]],
  },
]

export const trendingBriefs: TrendingBrief[] = [
  { ...BRIEFS[4], rank: 1, playCount: 67300 },
  { ...BRIEFS[2], rank: 2, playCount: 45200 },
  { ...BRIEFS[14], rank: 3, playCount: 41200 },
  { ...BRIEFS[1], rank: 4, playCount: 28700 },
  { ...BRIEFS[12], rank: 5, playCount: 22100 },
  { ...BRIEFS[6], rank: 6, playCount: 33100 },
  { ...BRIEFS[10], rank: 7, playCount: 19800 },
  { ...BRIEFS[0], rank: 8, playCount: 12400 },
  { ...BRIEFS[7], rank: 9, playCount: 11200 },
  { ...BRIEFS[3], rank: 10, playCount: 9800 },
]

export const catalogBriefs: DiscoverBrief[] = BRIEFS

export function formatPlayCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000
    return k % 1 === 0 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`
  }
  return String(count)
}
