import { motion, useReducedMotion } from 'framer-motion'
import type { BrieflyPickList } from '../../data/discoverFeed'
import { getBriefCover } from '../../data/discoverFeed'
import { transition } from '../../styles/motion'
import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import './BrieflyPicks.css'

export type BrieflyPickCardProps = {
  pick?: BrieflyPickList
  onSelect?: (pickId: string) => void
  loading?: boolean
  motionIndex?: number
  allowMotion?: boolean
}

function curatorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export const BrieflyPickCard = ({
  pick,
  onSelect,
  loading = false,
  motionIndex = 0,
  allowMotion = true,
}: BrieflyPickCardProps) => {
  const prefersReducedMotion = useReducedMotion()
  const canAnimate = allowMotion && !prefersReducedMotion && !loading

  if (loading) {
    return (
      <article
        className="briefly-pick-card-wrap briefly-pick-card-wrap--loading"
        role="listitem"
        aria-hidden
      >
        <div className="briefly-pick-card briefly-pick-card--loading" />
      </article>
    )
  }

  if (!pick) {
    return null
  }

  const titleId = `briefly-pick-title-${pick.id}`
  const gridCoverIds = pick.coverIds.slice(0, 4)
  const extraCount = pick.coverIds.length > 4 ? pick.coverIds.length - 4 : 0

  const handleClick = () => {
    console.log(`[BrieflyPickCard] open collection: ${pick.id}`)
    onSelect?.(pick.id)
  }

  return (
    <article className="briefly-pick-card-wrap" role="listitem" aria-labelledby={titleId}>
      <motion.button
        type="button"
        className="briefly-pick-card"
        onClick={handleClick}
        aria-labelledby={titleId}
        initial={canAnimate ? { opacity: 0, y: 8 } : false}
        animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{
          ...transition.slow,
          delay: canAnimate ? motionIndex * 0.06 : 0,
          duration: canAnimate ? 0.26 : 0,
        }}
        whileTap={canAnimate ? { scale: 0.985 } : undefined}
      >
        <span className="briefly-pick-card__curator">
          <span className="briefly-pick-card__avatar" aria-hidden>
            {curatorInitials(pick.curatorName)}
          </span>
          <span className="briefly-pick-card__curator-copy">
            <span className="briefly-pick-card__curator-name">{pick.curatorName}</span>
            <span className="briefly-pick-card__curator-role">{pick.curatorRole}</span>
          </span>
        </span>

        <span id={titleId} className="briefly-pick-card__title">
          {pick.title}
        </span>

        <span className="briefly-pick-card__blurb">{pick.blurb}</span>

        <span className="briefly-pick-card__covers" aria-hidden>
          {gridCoverIds.map((coverId, index) => {
            const cover = getBriefCover(coverId)
            const isOverflowTile = extraCount > 0 && index === 3

            return (
              <span key={coverId} className="briefly-pick-card__cover-cell">
                {cover ? (
                  <ArtworkPlaceholder
                    tone={cover.artworkTone}
                    coverSrc={cover.coverSrc}
                    size="sm"
                    className="briefly-pick-card__cover-art"
                    label=""
                  />
                ) : (
                  <span className="briefly-pick-card__cover-fallback" />
                )}
                {isOverflowTile ? (
                  <span className="briefly-pick-card__cover-more">+{extraCount}</span>
                ) : null}
              </span>
            )
          })}
        </span>
      </motion.button>
    </article>
  )
}
