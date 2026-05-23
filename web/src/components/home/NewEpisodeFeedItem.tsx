import { ArtworkPlaceholder } from './ArtworkPlaceholder'
import type { NewEpisodeItem } from './types'

export type NewEpisodeFeedItemProps = {
  episode: NewEpisodeItem
  onPress?: (id: string) => void
}

export const NewEpisodeFeedItem = ({ episode, onPress }: NewEpisodeFeedItemProps) => (
  <button
    type="button"
    className="new-episode-item"
    onClick={() => onPress?.(episode.id)}
    aria-label={`Play ${episode.episodeTitle} from ${episode.showName}`}
  >
    <ArtworkPlaceholder
      tone={episode.artworkTone}
      coverSrc={episode.coverSrc}
      size="sm"
      className="new-episode-item__art"
      label={`${episode.showName} artwork`}
    />
    <div className="new-episode-item__copy">
      <div className="new-episode-item__row">
        <p className="new-episode-item__show">{episode.showName}</p>
        {episode.isNew ? (
          <span className="new-episode-item__badge">New</span>
        ) : null}
      </div>
      <p className="new-episode-item__title">{episode.episodeTitle}</p>
      <p className="new-episode-item__meta">
        {episode.publishedLabel} · {episode.durationLabel}
      </p>
    </div>
  </button>
)
