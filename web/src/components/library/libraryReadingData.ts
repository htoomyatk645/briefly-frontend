import { PLAYER_EPISODES } from '../../data/podcastCatalog'
import { faviconForDomain, LIBRARY_BOOK_COVERS } from './libraryAssetPaths'

export type MentionedReadingBase = {
  id: string
  hostName: string
  hostFirstName: string
  episodeId: string
  episodeTitle: string
  showName: string
  mentionOffsetSeconds: number
}

export type MentionedBook = MentionedReadingBase & {
  kind: 'book'
  title: string
  author: string
  coverUrl: string
  description: string
  bookshopSearchUrl: string
}

export type MentionedResource = MentionedReadingBase & {
  kind: 'resource'
  title: string
  url: string
  domain: string
  faviconUrl: string
  snippet: string
}

export type MentionedReadingItem = MentionedBook | MentionedResource

export const READING_RAIL_LIMIT = 8

export const MENTIONED_READING: MentionedReadingItem[] = [
  {
    kind: 'book',
    id: 'read-why-we-sleep',
    title: 'Why We Sleep',
    author: 'Matthew Walker',
    coverUrl: LIBRARY_BOOK_COVERS.whyWeSleep,
    description:
      'A field guide to what sleep does for memory, metabolism, and emotional regulation — cited constantly on health podcasts.',
    bookshopSearchUrl: 'https://bookshop.org/search?keywords=Why%20We%20Sleep%20Matthew%20Walker',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    episodeId: 'feed-huberman',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 14 * 60 + 8,
  },
  {
    kind: 'resource',
    id: 'read-nih-sleep',
    title: 'NIH: Sleep Deprivation and Deficiency',
    url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation',
    domain: 'nhlbi.nih.gov',
    faviconUrl: faviconForDomain('nhlbi.nih.gov'),
    snippet:
      'Walker points listeners to the NIH overview when arguing that even mild restriction compounds across a work week.',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    episodeId: 'feed-huberman',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 15 * 60 + 2,
  },
  {
    kind: 'book',
    id: 'read-thinking-fast',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: LIBRARY_BOOK_COVERS.thinkingFastAndSlow,
    description:
      'Used as shorthand for System 1 versus System 2 reasoning when the conversation turns to leader misjudgment.',
    bookshopSearchUrl: 'https://bookshop.org/search?keywords=Thinking%20Fast%20and%20Slow',
    hostName: PLAYER_EPISODES.foreignAffairs.showName,
    hostFirstName: 'Dan',
    episodeId: 'feed-fa',
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    mentionOffsetSeconds: 18 * 60 + 40,
  },
  {
    kind: 'resource',
    id: 'read-cfr-mearsheimer',
    title: 'CFR: Realism and Its Limits',
    url: 'https://www.cfr.org/article/realism-and-its-limits',
    domain: 'cfr.org',
    faviconUrl: faviconForDomain('cfr.org'),
    snippet:
      'The guest references this essay when distinguishing structural constraints from leader psychology.',
    hostName: PLAYER_EPISODES.foreignAffairs.showName,
    hostFirstName: 'Dan',
    episodeId: 'feed-fa',
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    mentionOffsetSeconds: 21 * 60 + 5,
  },
  {
    kind: 'book',
    id: 'read-atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: LIBRARY_BOOK_COVERS.atomicHabits,
    description:
      'Framed as a practical stack for morning rituals rather than motivation theater.',
    bookshopSearchUrl: 'https://bookshop.org/search?keywords=Atomic%20Habits',
    hostName: PLAYER_EPISODES.jayShetty.showName,
    hostFirstName: 'Jay',
    episodeId: 'feed-jay',
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    showName: PLAYER_EPISODES.jayShetty.showName,
    mentionOffsetSeconds: 9 * 60 + 18,
  },
  {
    kind: 'resource',
    id: 'read-headspace-science',
    title: 'Headspace: The Science of Meditation',
    url: 'https://www.headspace.com/science',
    domain: 'headspace.com',
    faviconUrl: faviconForDomain('headspace.com'),
    snippet:
      'Jay links out to the research hub when explaining why guided breath is measurable, not aesthetic.',
    hostName: PLAYER_EPISODES.jayShetty.showName,
    hostFirstName: 'Jay',
    episodeId: 'feed-jay',
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    showName: PLAYER_EPISODES.jayShetty.showName,
    mentionOffsetSeconds: 11 * 60 + 44,
  },
  {
    kind: 'book',
    id: 'read-chip-war',
    title: 'Chip War',
    author: 'Chris Miller',
    coverUrl: LIBRARY_BOOK_COVERS.chipWar,
    description:
      'The history of semiconductor supply chains, invoked when discussing why SVB’s collapse rippled through hardware startups.',
    bookshopSearchUrl: 'https://bookshop.org/search?keywords=Chip%20War%20Chris%20Miller',
    hostName: PLAYER_EPISODES.wsj.showName,
    hostFirstName: 'Kate',
    episodeId: 'feed-wsj',
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    showName: PLAYER_EPISODES.wsj.showName,
    mentionOffsetSeconds: 4 * 60 + 55,
  },
  {
    kind: 'resource',
    id: 'read-fed-svb',
    title: 'Federal Reserve: SVB Supervisory Review',
    url: 'https://www.federalreserve.gov/publications/svb-review.htm',
    domain: 'federalreserve.gov',
    faviconUrl: faviconForDomain('federalreserve.gov'),
    snippet:
      'Hosts cite the Fed’s post-mortem when separating liquidity panic from underlying asset quality.',
    hostName: PLAYER_EPISODES.wsj.showName,
    hostFirstName: 'Kate',
    episodeId: 'feed-wsj',
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    showName: PLAYER_EPISODES.wsj.showName,
    mentionOffsetSeconds: 6 * 60 + 12,
  },
  {
    kind: 'book',
    id: 'read-meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverUrl: LIBRARY_BOOK_COVERS.meditations,
    description:
      'Quoted for the line on controlling perception — a staple reference in discipline conversations.',
    bookshopSearchUrl: 'https://bookshop.org/search?keywords=Meditations%20Marcus%20Aurelius',
    hostName: PLAYER_EPISODES.jayShetty.showName,
    hostFirstName: 'Jay',
    episodeId: 'feed-jay',
    episodeTitle: 'Stoicism for modern mornings',
    showName: PLAYER_EPISODES.jayShetty.showName,
    mentionOffsetSeconds: 16 * 60 + 20,
  },
]
