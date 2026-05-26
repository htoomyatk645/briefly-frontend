import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { DiscoverBrief } from '../../../data/discoverSectionsData'
import { pressSpring } from '../../../styles/motion'
import { ArtworkPlaceholder } from '../../home/ArtworkPlaceholder'
import './discover-shared.css'

export type BriefPlayCardProps = {
  brief: DiscoverBrief
  onPlay?: (id: string) => void
  size?: 'sm' | 'md'
  showPlayCount?: boolean
}

const PlayIcon = () => (
  <svg width={10} height={12} viewBox="0 0 10 12" fill="none" aria-hidden>
    <path d="M1 1.2 9 6 1 10.8V1.2z" fill="currentColor" />
  </svg>
)

export const BriefPlayCard = ({
  brief,
  onPlay,
  size = 'md',
  showPlayCount = false,
}: BriefPlayCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  const tintStyle = {
    '--brief-card-h': brief.artworkTone,
  } as CSSProperties

  return (
    <motion.button
      type="button"
      className={`brief-play-card brief-play-card--${size}`}
      style={tintStyle}
      onClick={() => onPlay?.(brief.id)}
      aria-label={`Play ${brief.title} from ${brief.showName}, ${brief.durationLabel}`}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={pressSpring}
    >
      <span className="brief-play-card__art-wrap">
        <ArtworkPlaceholder
          tone={brief.artworkTone}
          coverSrc={brief.coverSrc}
          size={size === 'sm' ? 'sm' : 'md'}
          className="brief-play-card__art"
          label={`${brief.showName} artwork`}
        />
        <span className="brief-play-card__play" aria-hidden>
          <PlayIcon />
        </span>
      </span>
      <span className="brief-play-card__body">
        <span className="brief-play-card__title">{brief.title}</span>
        <span className="brief-play-card__meta">
          <span className="brief-play-card__show">{brief.showName}</span>
          <span className="brief-play-card__duration">{brief.durationLabel}</span>
        </span>
        {showPlayCount && brief.playCount != null ? (
          <span className="brief-play-card__plays">
            {formatPlayCount(brief.playCount)} plays
          </span>
        ) : null}
      </span>
    </motion.button>
  )
}

function formatPlayCount(count: number): string {
  if (count >= 1000) {
    const k = count / 1000
    return k % 1 === 0 ? `${Math.round(k)}k` : `${k.toFixed(1)}k`
  }
  return String(count)
}

export type BriefPlayCardSkeletonProps = {
  size?: 'sm' | 'md'
}

export const BriefPlayCardSkeleton = ({ size = 'md' }: BriefPlayCardSkeletonProps) => (
  <div
    className={`brief-play-card brief-play-card--skeleton brief-play-card--${size}`}
    role="presentation"
    aria-hidden
  >
    <span className="brief-play-card__art-wrap brief-play-card__art-wrap--skeleton" />
    <span className="brief-play-card__skeleton-lines" />
  </div>
)
