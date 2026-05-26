import { motion, useReducedMotion } from 'framer-motion'
import type { BriefCard } from '../../data/discoverFeed'
import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import './TrendingBriefs.css'

export type TrendingBriefRowProps = {
  rank: number
  brief?: BriefCard
  onPlay?: (id: string) => void
  loading?: boolean
}

const PlayIcon = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2.5 1.8 10 6 2.5 10.2V1.8z" fill="currentColor" />
  </svg>
)

export const TrendingBriefRow = ({
  rank,
  brief,
  onPlay,
  loading = false,
}: TrendingBriefRowProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowPressMotion = !prefersReducedMotion && !loading

  if (loading) {
    return (
      <article
        className="trending-brief-row trending-brief-row--loading"
        role="listitem"
        aria-hidden
      />
    )
  }

  if (!brief) {
    return null
  }

  const ariaLabel = `Number ${rank}: ${brief.episodeTitle} by ${brief.showName}, ${brief.playCountLabel ?? ''}`

  const handlePlay = () => {
    onPlay?.(brief.id)
  }

  return (
    <article
      className="trending-brief-row"
      role="listitem"
      aria-label={ariaLabel}
    >
      <span
        className={`trending-brief-row__rank${rank <= 3 ? ' trending-brief-row__rank--top' : ''}`}
        aria-hidden
      >
        {rank}
      </span>

      <ArtworkPlaceholder
        tone={brief.artworkTone}
        coverSrc={brief.coverSrc}
        size="sm"
        className="trending-brief-row__cover"
        label=""
      />

      <span className="trending-brief-row__copy">
        <span className="trending-brief-row__title">{brief.episodeTitle}</span>
        <span className="trending-brief-row__show">{brief.showName}</span>
        {brief.playCountLabel ? (
          <span className="trending-brief-row__plays">{brief.playCountLabel}</span>
        ) : null}
      </span>

      <motion.button
        type="button"
        className="trending-brief-row__play"
        onClick={handlePlay}
        aria-label={`Play the best parts of ${brief.episodeTitle}`}
        whileTap={allowPressMotion ? { scale: 0.92 } : undefined}
        transition={
          allowPressMotion
            ? { duration: 0.12, ease: [0.22, 1, 0.36, 1] }
            : undefined
        }
      >
        <PlayIcon />
      </motion.button>
    </article>
  )
}
