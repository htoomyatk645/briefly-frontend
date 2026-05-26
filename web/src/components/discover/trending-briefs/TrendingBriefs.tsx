import { motion, useReducedMotion } from 'framer-motion'
import {
  filterBriefs,
  formatPlayCount,
  type TrendingBrief,
} from '../../../data/discoverSectionsData'
import { pressSpring } from '../../../styles/motion'
import '../../../styles/sections.css'
import { ArtworkPlaceholder } from '../../home/ArtworkPlaceholder'
import '../shared/discover-shared.css'
import './trending-briefs.css'

export type TrendingBriefsProps = {
  briefs: TrendingBrief[]
  activeCategory: string | null
  onPlay?: (id: string) => void
  loading?: boolean
}

const PlayIcon = () => (
  <svg width={10} height={12} viewBox="0 0 10 12" fill="none" aria-hidden>
    <path d="M1 1.2 9 6 1 10.8V1.2z" fill="currentColor" />
  </svg>
)

type TrendingRowProps = {
  brief: TrendingBrief
  onPlay?: (id: string) => void
  allowMotion: boolean
}

const TrendingRow = ({ brief, onPlay, allowMotion }: TrendingRowProps) => (
  <motion.button
    type="button"
    className="trending-briefs__row"
    onClick={() => onPlay?.(brief.id)}
    aria-label={`Play number ${brief.rank}: ${brief.title} from ${brief.showName}, ${formatPlayCount(brief.playCount)} plays`}
    whileTap={allowMotion ? { scale: 0.98 } : undefined}
    transition={pressSpring}
  >
    <span
      className={`trending-briefs__rank${brief.rank <= 3 ? ' trending-briefs__rank--top' : ''}`}
      aria-hidden
    >
      {brief.rank}
    </span>
    <span className="trending-briefs__art-wrap">
      <ArtworkPlaceholder
        tone={brief.artworkTone}
        coverSrc={brief.coverSrc}
        size="sm"
        className="trending-briefs__art"
        label={`${brief.showName} artwork`}
      />
      <span className="trending-briefs__play" aria-hidden>
        <PlayIcon />
      </span>
    </span>
    <span className="trending-briefs__copy">
      <span className="trending-briefs__title">{brief.title}</span>
      <span className="trending-briefs__meta">
        <span className="trending-briefs__show">{brief.showName}</span>
        <span className="trending-briefs__dot" aria-hidden>
          ·
        </span>
        <span className="trending-briefs__duration">{brief.durationLabel}</span>
      </span>
      <span className="trending-briefs__plays">
        {formatPlayCount(brief.playCount)} plays
      </span>
    </span>
  </motion.button>
)

const SKELETON_COUNT = 6

export const TrendingBriefs = ({
  briefs,
  activeCategory,
  onPlay,
  loading = false,
}: TrendingBriefsProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading
  const visibleBriefs = filterBriefs(briefs, activeCategory) as TrendingBrief[]

  if (loading) {
    return (
      <section
        className="home-section trending-briefs trending-briefs--loading"
        aria-labelledby="trending-briefs-heading"
        aria-busy="true"
      >
        <div className="home-section__head">
          <h2 id="trending-briefs-heading" className="section-heading">
            Trending Briefs Right Now
          </h2>
        </div>
        <div className="trending-briefs__grid" role="status" aria-label="Loading trending briefs">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={`trending-skeleton-${i}`} className="trending-briefs__row trending-briefs__row--skeleton" />
          ))}
        </div>
      </section>
    )
  }

  if (visibleBriefs.length === 0) {
    return (
      <section className="home-section trending-briefs" aria-labelledby="trending-briefs-heading">
        <div className="home-section__head">
          <h2 id="trending-briefs-heading" className="section-heading">
            Trending Briefs Right Now
          </h2>
          <p className="section-subtitle">Top 10 clips finishing fast</p>
        </div>
        <p className="discover-empty discover-section-empty" role="status">
          No trending briefs in this category yet.
        </p>
      </section>
    )
  }

  return (
    <section className="home-section trending-briefs" aria-labelledby="trending-briefs-heading">
      <div className="home-section__head">
        <h2 id="trending-briefs-heading" className="section-heading">
          Trending Briefs Right Now
        </h2>
        <p className="section-subtitle">Top 10 clips finishing fast</p>
      </div>

      <div className="trending-briefs__grid" role="list">
        {visibleBriefs.map((brief) => (
          <div key={brief.id} role="listitem">
            <TrendingRow brief={brief} onPlay={onPlay} allowMotion={allowMotion} />
          </div>
        ))}
      </div>
    </section>
  )
}
