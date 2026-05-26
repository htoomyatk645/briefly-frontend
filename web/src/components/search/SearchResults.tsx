import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOOD_TILES } from '../../data/searchData'
import { ClipRow2Up } from './ClipRow2Up'
import { HeroClipCard } from './HeroClipCard'
import { MoodTile } from './MoodTile'
import { PeopleChipRow } from './PeopleChipRow'
import { ShowsScroller } from './ShowsScroller'
import {
  clipMatchesForQuery,
  displayQueryLabel,
  filterClipsBySpeaker,
  peopleFromClips,
  showsForQuery,
} from './searchResultsUtils'
import type { SearchIndexEntry } from './useSearchIndex'
import './search.css'

const SEARCH_EASE = [0.22, 1, 0.36, 1] as const
const SECTION_STAGGER_S = 0.04
const CLIP_CROSSFADE_S = 0.2

export type SearchResultsProps = {
  query: string
  onPlayClip: (episodeId: string, seekSeconds?: number) => void
}

type ResultsSectionProps = {
  index: number
  children: ReactNode
  className?: string
}

function ResultsSection({ index, children, className }: ResultsSectionProps) {
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

const BackIcon = () => (
  <svg className="search-results-page__back-icon" viewBox="0 0 24 24" aria-hidden>
    <path
      d="M14.5 5.5 9 11l5.5 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function SearchResults({ query, onPlayClip }: SearchResultsProps) {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(true)
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null)

  const allClips = useMemo(() => clipMatchesForQuery(query), [query])
  const filteredClips = useMemo(
    () => filterClipsBySpeaker(allClips, activeSpeakerId),
    [allClips, activeSpeakerId],
  )
  const heroClip = filteredClips[0]
  const rowClips = filteredClips.slice(1, 3)
  const shows = useMemo(() => showsForQuery(query, allClips), [query, allClips])
  const people = useMemo(() => peopleFromClips(allClips), [allClips])
  const label = displayQueryLabel(query)
  const suggestedMoods = MOOD_TILES.slice(0, 3)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [query])

  useEffect(() => {
    setActiveSpeakerId(null)
  }, [query])

  const handleBack = useCallback(() => {
    navigate('/search')
  }, [navigate])

  const handlePlay = useCallback(
    (clip: SearchIndexEntry) => {
      onPlayClip(clip.feedEpisodeId, clip.startSeconds)
    },
    [onPlayClip],
  )

  const handleShowSelect = useCallback(
    (showId: string) => {
      navigate(`/library/shows/${showId}`)
    },
    [navigate],
  )

  const handleMoodSelect = useCallback(
    (moodQuery: string) => {
      navigate(`/search?q=${encodeURIComponent(moodQuery)}`)
    },
    [navigate],
  )

  const clipBlock = (
    <>
      <HeroClipCard
        clip={heroClip}
        loading={isLoading}
        onPlay={handlePlay}
      />
      <ClipRow2Up
        clips={rowClips}
        loading={isLoading}
        onPlay={handlePlay}
      />
    </>
  )

  if (!isLoading && allClips.length === 0) {
    return (
      <div className="search-results-page">
        <header className="search-results-page__top">
          <button
            type="button"
            className="search-results-page__back"
            onClick={handleBack}
            aria-label="Back to search"
          >
            <BackIcon />
            <span>Search</span>
          </button>
        </header>
        <div className="search-results-empty" role="status">
          <h1 className="search-results-empty__title">
            Nothing for &lsquo;{label}&rsquo; yet
          </h1>
          <p className="search-results-empty__body">
            Try a topic, show name, or someone you&apos;d want to hear from.
          </p>
          <div className="search-results-empty__moods">
            {suggestedMoods.map((mood) => (
              <MoodTile key={mood.id} item={mood} onSelect={handleMoodSelect} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  let sectionIndex = 0

  return (
    <div className="search-results-page">
      <header className="search-results-page__top">
        <button
          type="button"
          className="search-results-page__back"
          onClick={handleBack}
          aria-label="Back to search"
        >
          <BackIcon />
          <span>Search</span>
        </button>
      </header>

      <div className="search-results-page__sections">
        <ResultsSection index={sectionIndex++} className="search-results-page__clips">
          {prefersReducedMotion ? (
            <div className="search-results-page__clips-inner">{clipBlock}</div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSpeakerId ?? 'all'}
                className="search-results-page__clips-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: CLIP_CROSSFADE_S, ease: SEARCH_EASE }}
              >
                {clipBlock}
              </motion.div>
            </AnimatePresence>
          )}
        </ResultsSection>

        <ResultsSection index={sectionIndex++}>
          <ShowsScroller
            shows={shows}
            loading={isLoading}
            onShowSelect={handleShowSelect}
          />
        </ResultsSection>

        {!isLoading && people.length > 0 ? (
          <ResultsSection index={sectionIndex}>
            <PeopleChipRow
              people={people}
              activeSpeakerId={activeSpeakerId}
              onSelect={setActiveSpeakerId}
            />
          </ResultsSection>
        ) : null}
      </div>
    </div>
  )
}
