import type { CSSProperties } from 'react'
import { useCoverCardBackground } from './useCoverGradient'
import './feedHeroCard.css'

export type FeedHeroCardProps = {
  coverSrc: string
  showName: string
  title: string
  episodeTitle: string
  durationLabel: string
  onPress: () => void
}

export const FeedHeroCard = ({
  coverSrc,
  showName,
  title,
  episodeTitle,
  durationLabel,
  onPress,
}: FeedHeroCardProps) => {
  const background = useCoverCardBackground(coverSrc)
  const style = { '--feed-hero-bg': background } as CSSProperties

  return (
    <button
      type="button"
      className="feed-hero-card"
      style={style}
      onClick={onPress}
      aria-label={`Play next: ${title} from ${showName}`}
    >
      <span className="feed-hero-card__cover-wrap">
        <img src={coverSrc} alt="" className="feed-hero-card__cover" width={88} height={88} />
      </span>
      <span className="feed-hero-card__copy">
        <span className="feed-hero-card__eyebrow">{showName}</span>
        <span className="feed-hero-card__title">{title}</span>
        <span className="feed-hero-card__episode">{episodeTitle}</span>
        <span className="feed-hero-card__meta">{durationLabel} highlight</span>
      </span>
      <span className="feed-hero-card__play" aria-hidden>
        <svg viewBox="0 0 24 24">
          <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  )
}
