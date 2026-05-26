import { useId, type ChangeEvent, type CSSProperties } from 'react'
import { AnimatedNumber } from '../motion/AnimatedNumber'
import type { FeedItem } from './feedLayout'
import { feedAssets } from './feedAssets'
import { useCoverCardBackground, useCoverGradient, useCoverThemeAccent } from './useCoverGradient'
import { useFeedLayoutEntrance } from './useFeedLayoutEntrance'
import { formatRemaining, formatTime } from './usePlayback'
import './feedLayout.css'

export type HeroCardProps = {
  item: FeedItem
  active?: boolean
  isPlaying?: boolean
  progress?: number
  currentTime?: number
  duration?: number
  saved?: boolean
  onPress?: (id: string) => void
  onTogglePlay?: () => void
  onSeek?: (seconds: number) => void
  onToggleSaved?: () => void
}

export const HeroCard = ({
  item,
  active = false,
  isPlaying = false,
  progress = 0,
  currentTime = 0,
  duration = 0,
  saved = false,
  onPress,
  onTogglePlay,
  onSeek,
  onToggleSaved,
}: HeroCardProps) => {
  const progressId = useId()
  const { ref, style } = useFeedLayoutEntrance<HTMLElement>()
  const coverTint = useCoverCardBackground(item.coverSrc)
  const coverGradient = useCoverGradient(item.coverSrc)
  const themeAccent = useCoverThemeAccent(item.coverSrc)

  const cardStyle = {
    '--player-cover-tint': coverTint,
    '--player-cover-gradient': coverGradient,
    '--player-theme-accent': themeAccent,
    ...style,
  } as CSSProperties

  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSeek?.((Number(event.target.value) / 100) * duration)
  }

  return (
    <article
      ref={ref}
      className={`feed-hero-card feed-layout-card${active ? ' feed-hero-card--active' : ''}`}
      style={cardStyle}
      aria-label={`${active ? 'Now playing' : 'Featured'}: ${item.episodeTitle}`}
    >
      <div className="feed-hero-card__grabber" aria-hidden />

      <div className="feed-hero-card__body">
        <div className="feed-hero-card__hero">
          <button
            type="button"
            className="feed-hero-card__hero-hit"
            onClick={() => (active ? onTogglePlay?.() : onPress?.(item.id))}
            aria-label={active ? (isPlaying ? 'Pause' : 'Play') : `Play ${item.episodeTitle}`}
          >
            <div className="feed-hero-card__art-frame">
              <img
                src={item.coverSrc}
                alt=""
                className="feed-hero-card__art"
              />
            </div>

            <span className="feed-hero-card__source">
              <span className="feed-hero-card__source-text">{item.showName.toUpperCase()}</span>
            </span>
          </button>

          {active ? (
            <div className="feed-hero-card__toolbar" role="toolbar" aria-label="Player actions">
              <button
                type="button"
                className={`feed-hero-card__toolbar-btn${saved ? ' feed-hero-card__toolbar-btn--saved' : ''}`}
                onClick={onToggleSaved}
                aria-label={saved ? 'Remove from saved' : 'Save episode'}
                aria-pressed={saved}
              >
                <img
                  src={feedAssets.actions.bookmark}
                  alt=""
                  className={`feed-hero-card__toolbar-icon${saved ? ' feed-hero-card__toolbar-icon--filled' : ''}`}
                />
              </button>
            </div>
          ) : null}
        </div>

        <div className="feed-hero-card__meta">
          <h2 className="feed-hero-card__title">{item.episodeTitle}</h2>
        </div>

        {active ? (
          <div className="feed-hero-card__lower">
            <div className="feed-hero-card__progress">
              <label htmlFor={progressId} className="visually-hidden">
                Playback position
              </label>
              <div className="feed-hero-card__progress-track" aria-hidden>
                <div
                  className="feed-hero-card__progress-fill"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <input
                id={progressId}
                type="range"
                className="feed-hero-card__slider"
                min={0}
                max={100}
                step={0.1}
                value={progress * 100}
                onChange={handleProgressChange}
                aria-valuenow={currentTime}
                aria-valuetext={`${formatTime(currentTime)}, ${formatRemaining(currentTime, duration)} remaining`}
              />
              <div className="feed-hero-card__times">
                <AnimatedNumber value={currentTime} format={formatTime} />
                <AnimatedNumber
                  value={currentTime}
                  format={(time) => formatRemaining(time, duration)}
                />
              </div>
            </div>

            <div className="feed-hero-card__controls">
              <button
                type="button"
                className={`feed-hero-card__play${isPlaying ? '' : ' feed-hero-card__play--ready'}`}
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M7 6h3.5v12H7V6zm6.5 0H17v12h-3.5V6z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="feed-hero-card__cta"
            onClick={() => onPress?.(item.id)}
          >
            Play highlight
          </button>
        )}
      </div>
    </article>
  )
}
