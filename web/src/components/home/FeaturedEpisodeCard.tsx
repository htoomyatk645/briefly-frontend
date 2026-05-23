import { ArtworkPlaceholder } from './ArtworkPlaceholder'
import type { EpisodeRecommendation } from './types'

export type FeaturedEpisodeCardProps = {
  episode: EpisodeRecommendation
  onPlay?: (id: string) => void
}

export const FeaturedEpisodeCard = ({
  episode,
  onPlay,
}: FeaturedEpisodeCardProps) => (
  <article className="featured-card">
    <div className="featured-card__visual">
      <ArtworkPlaceholder
        tone={episode.artworkTone}
        coverSrc={episode.coverSrc}
        size="hero"
        className="featured-card__art"
        label={`${episode.showName} artwork`}
      />
      <div className="featured-card__overlay" aria-hidden />
    </div>

    <div className="featured-card__content">
      <p className="featured-card__kicker">Editor&apos;s pick</p>
      <p className="featured-card__show">{episode.showName}</p>
      <h2 className="featured-card__title">{episode.episodeTitle}</h2>
      <p className="featured-card__description">{episode.description}</p>
      <div className="featured-card__actions">
        <button
          type="button"
          className="featured-card__play"
          onClick={() => onPlay?.(episode.id)}
          aria-label={`Play ${episode.episodeTitle}`}
        >
          <span className="featured-card__play-icon" aria-hidden>
            ▶
          </span>
          <span>Play · {episode.durationLabel}</span>
        </button>
      </div>
    </div>
  </article>
)
