import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { MOOD_TILES, TRENDING_SEARCHES } from '../../data/searchData'
import { MoodTile } from './MoodTile'
import { RecentRow } from './RecentRow'
import { TrendingCard } from './TrendingCard'

const SEARCH_EASE = [0.22, 1, 0.36, 1] as const
const SECTION_STAGGER_S = 0.04

type SearchSectionProps = {
  index: number
  children: ReactNode
  className?: string
}

function SearchSection({ index, children, className }: SearchSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <section className={className}>{children}</section>
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.28,
        ease: SEARCH_EASE,
        delay: index * SECTION_STAGGER_S,
      }}
    >
      {children}
    </motion.section>
  )
}

export type SearchEmptyProps = {
  recentQueries: string[]
  loading?: boolean
  onRecentSelect: (query: string) => void
  onRecentRemove: (query: string) => void
  onRecentClearAll: () => void
  onTrendingSelect: (query: string) => void
  onMoodSelect: (moodQuery: string) => void
}

export function SearchEmpty({
  recentQueries,
  loading = false,
  onRecentSelect,
  onRecentRemove,
  onRecentClearAll,
  onTrendingSelect,
  onMoodSelect,
}: SearchEmptyProps) {
  const showRecent = loading || recentQueries.length > 0
  let sectionIndex = 0

  return (
    <div className="search-empty">
      {showRecent ? (
        <SearchSection index={sectionIndex++} className="search-empty__section">
          <RecentRow
            queries={recentQueries}
            loading={loading}
            onSelect={onRecentSelect}
            onRemove={onRecentRemove}
            onClearAll={onRecentClearAll}
          />
        </SearchSection>
      ) : null}

      <SearchSection index={sectionIndex++} className="search-empty__section">
        <div className="search-trending">
          <h2 className="search-trending__label">Trending now</h2>
          <div className="search-trending__list" role="list">
            {loading
              ? TRENDING_SEARCHES.map((item) => (
                  <TrendingCard key={item.id} loading />
                ))
              : TRENDING_SEARCHES.map((item) => (
                  <TrendingCard
                    key={item.id}
                    item={item}
                    onSelect={onTrendingSelect}
                  />
                ))}
          </div>
        </div>
      </SearchSection>

      <SearchSection index={sectionIndex} className="search-empty__section">
        <div className="search-mood">
          <h2 className="search-mood__label">Browse by mood</h2>
          <div className="search-mood__grid">
            {loading
              ? MOOD_TILES.map((item) => <MoodTile key={item.id} loading />)
              : MOOD_TILES.map((item) => (
                  <MoodTile key={item.id} item={item} onSelect={onMoodSelect} />
                ))}
          </div>
        </div>
      </SearchSection>
    </div>
  )
}
