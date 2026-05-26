import { motion, useReducedMotion } from 'framer-motion'
import { displayPullQuote, type SearchIndexEntry } from './useSearchIndex'
import { ResultsCounter } from './ResultsCounter'

export type InlineResultsProps = {
  matches: SearchIndexEntry[]
  totalCount: number
  isPending?: boolean
  query: string
  onPlay: (entry: SearchIndexEntry) => void
  onOpenClip: (entry: SearchIndexEntry) => void
  onSeeAll: () => void
}

const ROW_STAGGER_S = 0.04
const SEARCH_EASE = [0.22, 1, 0.36, 1] as const

const PlayIcon = () => (
  <svg className="search-inline-row__play-icon" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2.5 1.8 10 6 2.5 10.2V1.8z" fill="currentColor" />
  </svg>
)

type InlineRowProps = {
  entry: SearchIndexEntry
  index: number
  isPending: boolean
  onPlay: (entry: SearchIndexEntry) => void
  onOpenClip: (entry: SearchIndexEntry) => void
}

function InlineRow({ entry, index, isPending, onPlay, onOpenClip }: InlineRowProps) {
  const prefersReducedMotion = useReducedMotion()
  const quote = displayPullQuote(entry)

  const row = (
    <article
      className={`search-inline-row${isPending ? ' search-inline-row--pending' : ''}`}
      style={
        prefersReducedMotion
          ? undefined
          : { animationDelay: `${index * ROW_STAGGER_S}s` }
      }
    >
      <button
        type="button"
        className="search-inline-row__main"
        onClick={() => onOpenClip(entry)}
        aria-label={`Open ${entry.showName}: ${quote}`}
      >
        <img
          className="search-inline-row__cover"
          src={entry.coverSrc}
          alt=""
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />
        <span className="search-inline-row__copy">
          <span className="search-inline-row__quote">{quote}</span>
          <span className="search-inline-row__show">{entry.showName}</span>
        </span>
      </button>
      <button
        type="button"
        className="search-inline-row__play"
        onClick={(event) => {
          event.stopPropagation()
          onPlay(entry)
        }}
        aria-label={`Play clip from ${entry.showName}`}
      >
        <PlayIcon />
      </button>
    </article>
  )

  if (prefersReducedMotion) {
    return row
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.22,
        ease: SEARCH_EASE,
        delay: index * ROW_STAGGER_S,
      }}
    >
      {row}
    </motion.div>
  )
}

export function InlineResults({
  matches,
  totalCount,
  isPending = false,
  query,
  onPlay,
  onOpenClip,
  onSeeAll,
}: InlineResultsProps) {
  const prefersReducedMotion = useReducedMotion()
  const hasQuery = query.trim().length > 0

  if (!hasQuery) {
    return null
  }

  const containerClass = `search-inline${prefersReducedMotion ? '' : ' search-inline--animate'}`

  if (matches.length === 0) {
    if (isPending) {
      return (
        <div
          className={`${containerClass} search-inline--busy`}
          role="region"
          aria-label="Search suggestions"
          aria-busy="true"
        />
      )
    }
    if (totalCount === 0) {
      return (
        <div className={containerClass} role="region" aria-label="Search suggestions">
          <p className="search-inline__empty">
            No clips match yet — try a topic, show name, or speaker
          </p>
        </div>
      )
    }
  }

  return (
    <div className={containerClass} role="region" aria-label="Search suggestions">
      <div className="search-inline__list" role="list">
        {matches.map((entry, index) => (
          <div key={entry.feedEpisodeId} role="listitem">
            <InlineRow
              entry={entry}
              index={index}
              isPending={isPending}
              onPlay={onPlay}
              onOpenClip={onOpenClip}
            />
          </div>
        ))}
      </div>
      <ResultsCounter
        count={totalCount}
        showSeeAllHint={totalCount > 10}
        onSeeAll={onSeeAll}
      />
    </div>
  )
}
