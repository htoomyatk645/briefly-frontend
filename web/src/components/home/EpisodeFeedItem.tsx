import { ArtworkPlaceholder } from './ArtworkPlaceholder'
import type { EpisodeRecommendation } from './types'

export type EpisodeFeedItemProps = {
  episode: EpisodeRecommendation
  onPress?: (id: string) => void
}

export const EpisodeFeedItem = ({ episode, onPress }: EpisodeFeedItemProps) => (
  <button
    type="button"
    className="episode-feed-item"
    onClick={() => onPress?.(episode.id)}
    aria-label={`Play ${episode.episodeTitle} from ${episode.showName}`}
  >
    <ArtworkPlaceholder
      tone={episode.artworkTone}
      coverSrc={episode.coverSrc}
      size="sm"
      className="episode-feed-item__art"
      label={`${episode.showName} artwork`}
    />
    <div className="episode-feed-item__copy">
      <p className="episode-feed-item__show">{episode.showName}</p>
      <p className="episode-feed-item__title">{episode.episodeTitle}</p>
      <p className="episode-feed-item__description">{episode.description}</p>
      <p className="episode-feed-item__meta">{episode.durationLabel}</p>
    </div>
  </button>
)
