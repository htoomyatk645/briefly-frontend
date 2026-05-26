import { useReducedMotion } from 'framer-motion'
import type { BrieflyPickList } from '../../data/discoverFeed'
import { BrieflyPickCard } from './BrieflyPickCard'
import './BrieflyPicks.css'

export type BrieflyPicksProps = {
  picks?: BrieflyPickList[]
  loading?: boolean
  onSelect?: (pickId: string) => void
  onSeeAll?: () => void
}

const HEADING_ID = 'briefly-picks-heading'
const SKELETON_COUNT = 3

export const BrieflyPicks = ({
  picks = [],
  loading = false,
  onSelect,
  onSeeAll,
}: BrieflyPicksProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  if (!loading && picks.length === 0) {
    return null
  }

  const handleSeeAll = () => {
    console.log('[BrieflyPicks] see all collections')
    onSeeAll?.()
  }

  return (
    <section className="briefly-picks" aria-labelledby={HEADING_ID}>
      <div className="briefly-picks__header">
        <div className="briefly-picks__headline">
          <h2 id={HEADING_ID} className="briefly-picks__title">
            Briefly Picks
          </h2>
          <button
            type="button"
            className="briefly-picks__see-all"
            onClick={handleSeeAll}
          >
            See all
          </button>
        </div>
        <p className="briefly-picks__subtitle">
          Curated by humans who listen for a living.
        </p>
      </div>

      <div className="briefly-picks__scroller" role="list" aria-labelledby={HEADING_ID}>
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <BrieflyPickCard key={`briefly-pick-skeleton-${index}`} loading />
            ))
          : picks.map((pick, index) => (
              <BrieflyPickCard
                key={pick.id}
                pick={pick}
                onSelect={onSelect}
                motionIndex={index}
                allowMotion={allowMotion}
              />
            ))}
      </div>
    </section>
  )
}
