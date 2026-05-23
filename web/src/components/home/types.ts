export type EpisodeRecommendation = {
  id: string
  showName: string
  episodeTitle: string
  description: string
  artworkTone: string
  coverSrc?: string
  durationLabel: string
}

export type NewEpisodeItem = {
  id: string
  showName: string
  episodeTitle: string
  durationLabel: string
  publishedLabel: string
  isNew: boolean
  artworkTone: string
  coverSrc?: string
}

export type HomeFeedData = {
  featured: EpisodeRecommendation
  recommendations: EpisodeRecommendation[]
  newEpisodes: NewEpisodeItem[]
}
