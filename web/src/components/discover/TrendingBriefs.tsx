import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { CategoryId } from '../../data/discoverData'
import { filterBriefsByCategory, type BriefCard } from '../../data/discoverFeed'
import { TrendingBriefRow } from './TrendingBriefRow'
import './TrendingBriefs.css'

export type TrendingBriefsProps = {
  briefs?: BriefCard[]
  activeCategoryId?: CategoryId | null
  loading?: boolean
  onPlay?: (id: string) => void
}

const HEADING_ID = 'trending-briefs-heading'
const SKELETON_COUNT = 6

export const TrendingBriefs = ({
  briefs = [],
  activeCategoryId = null,
  loading = false,
  onPlay,
}: TrendingBriefsProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  const visibleBriefs = useMemo(
    () => filterBriefsByCategory(briefs, activeCategoryId),
    [briefs, activeCategoryId],
  )

  if (!loading && visibleBriefs.length === 0) {
    return null
  }

  return (
    <section className="trending-briefs" aria-labelledby={HEADING_ID}>
      <div className="trending-briefs__header">
        <div className="trending-briefs__headline">
          <h2 id={HEADING_ID} className="trending-briefs__title">
            Trending Briefs Right Now
          </h2>
          <span className="trending-briefs__badge">Now</span>
        </div>
        <p className="trending-briefs__sub">Refreshed every hour</p>
      </div>

      <motion.div
        className="trending-briefs__grid"
        role="list"
        aria-labelledby={HEADING_ID}
        initial={allowMotion ? { opacity: 0 } : false}
        animate={allowMotion ? { opacity: 1 } : undefined}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <TrendingBriefRow key={`trending-skeleton-${index}`} rank={0} loading />
            ))
          : visibleBriefs.map((brief, index) => (
              <TrendingBriefRow
                key={brief.id}
                rank={index + 1}
                brief={brief}
                onPlay={onPlay}
              />
            ))}
      </motion.div>
    </section>
  )
}
