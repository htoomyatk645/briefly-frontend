import type { CSSProperties } from 'react'
import { FeedCardListenerBadge } from './FeedCardListenerBadge'
import type { FeedItem } from './feedLayout'
import { useFeedLayoutEntrance } from './useFeedLayoutEntrance'
import './feedLayout.css'

export type CompactCardProps = {
  item: FeedItem
  staggerIndex?: number
  active?: boolean
  isPlaying?: boolean
  progress?: number
  onPress?: (id: string) => void
  onTogglePlay?: () => void
}

function formatListenerCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k listening`
  }
  return `${count} listening`
}

export const CompactCard = ({
  item,
  staggerIndex = 0,
  active = false,
  isPlaying = false,
  progress = 0,
  onPress,
  onTogglePlay,
}: CompactCardProps) => {
  const { ref, style } = useFeedLayoutEntrance<HTMLButtonElement>({
    staggerMs: staggerIndex === 1 ? 60 : 0,
  })

  const cardStyle = style as CSSProperties

  return (
    <button
      ref={ref}
      type="button"
      className={`feed-compact-card feed-layout-card${active ? ' feed-compact-card--active' : ''}`}
      style={cardStyle}
      onClick={() => (active ? onTogglePlay?.() : onPress?.(item.id))}
      aria-label={
        active
          ? isPlaying
            ? `Pause ${item.episodeTitle}`
            : `Play ${item.episodeTitle}`
          : `Play ${item.episodeTitle} from ${item.showName}`
      }
      aria-current={active ? 'true' : undefined}
    >
      <span className="feed-compact-card__main">
        <img
          src={item.coverSrc}
          alt=""
          className="feed-compact-card__art"
          width={48}
          height={48}
        />

        <span className="feed-compact-card__copy">
          <span className="feed-compact-card__show">{item.showName}</span>
          <span className="feed-compact-card__title">{item.episodeTitle}</span>
        </span>
      </span>

      <FeedCardListenerBadge animate={!active}>
        <span className="feed-compact-card__listener">{formatListenerCount(item.listenerCount)}</span>
      </FeedCardListenerBadge>

      {active ? (
        <span className="feed-compact-card__active-bar" aria-hidden>
          <span
            className="feed-compact-card__active-fill"
            style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }}
          />
        </span>
      ) : null}
    </button>
  )
}
