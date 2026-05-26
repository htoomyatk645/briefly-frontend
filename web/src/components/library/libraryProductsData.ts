import { PLAYER_EPISODES, PODCAST_COVERS } from '../../data/podcastCatalog'

export type MentionedProduct = {
  id: string
  title: string
  brand: string
  price: string
  imageUrl?: string
  affiliateUrl: string
  hostName: string
  hostFirstName: string
  hostAvatarSrc: string
  episodeId: string
  episodeTitle: string
  showName: string
  mentionOffsetSeconds: number
  contextSentence: string
}

export const MENTION_PREVIEW_SECONDS = 8
export const PRODUCTS_RAIL_LIMIT = 8

export const MENTIONED_PRODUCTS: MentionedProduct[] = [
  {
    id: 'prod-magnesium',
    title: 'Momentous Magnesium Threonate',
    brand: 'Momentous',
    price: '$29.99',
    affiliateUrl: 'https://example.com/momentous-magnesium',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    hostAvatarSrc: PODCAST_COVERS.huberman,
    episodeId: 'feed-huberman',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 12 * 60 + 42,
    contextSentence:
      'Magnesium threonate crosses the blood-brain barrier more reliably than oxide forms — that is why I keep it in the stack.',
  },
  {
    id: 'prod-why-we-sleep',
    title: 'Why We Sleep',
    brand: 'Penguin Books',
    price: '$18.00',
    affiliateUrl: 'https://example.com/why-we-sleep',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    hostAvatarSrc: PODCAST_COVERS.huberman,
    episodeId: 'feed-huberman',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 14 * 60 + 8,
    contextSentence: 'Matthew Walker’s book remains the clearest map of what sleep debt does to cognition.',
  },
  {
    id: 'prod-blue-light',
    title: 'Rechargeable Red-Spectrum Desk Lamp',
    brand: 'Helios Labs',
    price: '$64.00',
    affiliateUrl: 'https://example.com/red-spectrum-lamp',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    hostAvatarSrc: PODCAST_COVERS.huberman,
    episodeId: 'feed-huberman',
    episodeTitle: 'Light exposure and circadian rhythm',
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 6 * 60 + 55,
    contextSentence:
      'A low-angle red lamp after sunset keeps melatonin on schedule without living in the dark.',
  },
  {
    id: 'prod-ag1',
    title: 'AG1 Daily Foundational Nutrition',
    brand: 'Athletic Greens',
    price: '$79.00',
    affiliateUrl: 'https://example.com/ag1',
    hostName: PLAYER_EPISODES.wsj.showName,
    hostFirstName: 'Tech',
    hostAvatarSrc: PODCAST_COVERS.wsj,
    episodeId: 'feed-wsj',
    episodeTitle: PLAYER_EPISODES.wsj.episodeTitle,
    showName: PLAYER_EPISODES.wsj.showName,
    mentionOffsetSeconds: 3 * 60 + 20,
    contextSentence:
      'The sponsor read lands because it ties the product to a concrete morning routine, not a vague wellness claim.',
  },
  {
    id: 'prod-notion',
    title: 'Notion for Research Teams',
    brand: 'Notion',
    price: 'Free trial',
    affiliateUrl: 'https://example.com/notion',
    hostName: PLAYER_EPISODES.foreignAffairs.showName,
    hostFirstName: 'Dan',
    hostAvatarSrc: PODCAST_COVERS.foreignAffairs,
    episodeId: 'feed-fa',
    episodeTitle: PLAYER_EPISODES.foreignAffairs.episodeTitle,
    showName: PLAYER_EPISODES.foreignAffairs.showName,
    mentionOffsetSeconds: 22 * 60 + 10,
    contextSentence:
      'Every policy shop I know runs briefing books through a shared workspace — the tool matters less than the discipline.',
  },
  {
    id: 'prod-headspace',
    title: 'Headspace Annual Membership',
    brand: 'Headspace',
    price: '$69.99',
    affiliateUrl: 'https://example.com/headspace',
    hostName: PLAYER_EPISODES.jayShetty.showName,
    hostFirstName: 'Jay',
    hostAvatarSrc: PODCAST_COVERS.jayShetty,
    episodeId: 'feed-jay',
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    showName: PLAYER_EPISODES.jayShetty.showName,
    mentionOffsetSeconds: 11 * 60 + 5,
    contextSentence:
      'Guided breath before sunrise is not mysticism — it is a repeatable downshift for the nervous system.',
  },
  {
    id: 'prod-oura',
    title: 'Oura Ring Gen 3',
    brand: 'Oura',
    price: '$299.00',
    affiliateUrl: 'https://example.com/oura-ring',
    hostName: PLAYER_EPISODES.huberman.showName,
    hostFirstName: 'Andrew',
    hostAvatarSrc: PODCAST_COVERS.huberman,
    episodeId: 'feed-huberman',
    episodeTitle: PLAYER_EPISODES.huberman.episodeTitle,
    showName: PLAYER_EPISODES.huberman.showName,
    mentionOffsetSeconds: 8 * 60 + 30,
    contextSentence:
      'Temperature delta at the wrist is a surprisingly honest proxy for whether you actually slept.',
  },
  {
    id: 'prod-audible',
    title: 'Audible Plus',
    brand: 'Audible',
    price: '$7.95/mo',
    affiliateUrl: 'https://example.com/audible',
    hostName: 'The Daily',
    hostFirstName: 'Michael',
    hostAvatarSrc: PODCAST_COVERS.theDaily,
    episodeId: 'feed-wsj',
    episodeTitle: 'The weekend long read',
    showName: 'The Daily',
    mentionOffsetSeconds: 5 * 60 + 12,
    contextSentence:
      'If you only have twenty minutes, the abridged edition still gives you the spine of the argument.',
  },
  {
    id: 'prod-hydroflask',
    title: 'Hydro Flask 32oz',
    brand: 'Hydro Flask',
    price: '$44.95',
    affiliateUrl: 'https://example.com/hydroflask',
    hostName: PLAYER_EPISODES.jayShetty.showName,
    hostFirstName: 'Jay',
    hostAvatarSrc: PODCAST_COVERS.jayShetty,
    episodeId: 'feed-jay',
    episodeTitle: PLAYER_EPISODES.jayShetty.episodeTitle,
    showName: PLAYER_EPISODES.jayShetty.showName,
    mentionOffsetSeconds: 7 * 60 + 48,
    contextSentence: 'Hydration before coffee is the smallest habit that changes the rest of the morning.',
  },
]
