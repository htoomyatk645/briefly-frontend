export type EpisodeProduct = {
  id: string
  name: string
  description: string
  imageUrl?: string
  buyUrl: string
}

export type AudioOutput = {
  id: string
  label: string
  kind: 'speaker' | 'bluetooth' | 'airplay' | 'wired'
  active?: boolean
}

const HUBERMAN_PRODUCTS: EpisodeProduct[] = [
  {
    id: 'p-mag',
    name: 'Momentous Magnesium Threonate',
    description: 'Mentioned for sleep onset support.',
    buyUrl: 'https://example.com/magnesium',
  },
  {
    id: 'p-book',
    name: 'Why We Sleep',
    description: 'Dr. Walker’s book, referenced in the conversation.',
    buyUrl: 'https://example.com/why-we-sleep',
  },
]

export function getProductsForEpisode(episodeId: string): EpisodeProduct[] {
  if (episodeId === 'feed-huberman') return HUBERMAN_PRODUCTS
  return []
}

export const MOCK_OUTPUTS: AudioOutput[] = [
  { id: 'iphone', label: 'iPhone Speaker', kind: 'speaker', active: true },
  { id: 'airpods', label: 'AirPods Pro', kind: 'bluetooth' },
  { id: 'homepod', label: 'Living Room HomePod', kind: 'airplay' },
  { id: 'car', label: 'Car Bluetooth', kind: 'bluetooth' },
  { id: 'wired', label: 'Wired Headphones', kind: 'wired' },
]
