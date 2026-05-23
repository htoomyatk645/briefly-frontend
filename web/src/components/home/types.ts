export type ContinueListeningItem = {
  id: string
  showName: string
  episodeTitle: string
  artworkTone: string
  coverSrc?: string
  progress: number
  durationLabel: string
}

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
  continueListening: ContinueListeningItem[]
  featured: EpisodeRecommendation
  recommendations: EpisodeRecommendation[]
  newEpisodes: NewEpisodeItem[]
}
