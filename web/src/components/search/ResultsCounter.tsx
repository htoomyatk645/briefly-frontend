import { motion, useReducedMotion } from 'framer-motion'

export type ResultsCounterProps = {
  count: number
  showSeeAllHint: boolean
  onSeeAll?: () => void
}

export function ResultsCounter({
  count,
  showSeeAllHint,
  onSeeAll,
}: ResultsCounterProps) {
  const prefersReducedMotion = useReducedMotion()
  const label = count === 1 ? '1 result' : `${count} results`

  return (
    <div className="search-results-counter">
      <p className="search-results-counter__count" aria-live="polite">
        {label}
      </p>
      {showSeeAllHint ? (
        prefersReducedMotion ? (
          <button
            type="button"
            className="search-results-counter__see-all"
            onClick={onSeeAll}
          >
            Press Enter to see all →
          </button>
        ) : (
          <motion.button
            type="button"
            className="search-results-counter__see-all"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={onSeeAll}
          >
            Press Enter to see all →
          </motion.button>
        )
      ) : null}
    </div>
  )
}
