import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import {
  filterBriefs,
  type MoodShelf,
} from '../../../data/discoverSectionsData'
import { transition } from '../../../styles/motion'
import '../../../styles/sections.css'
import { BriefPlayCard, BriefPlayCardSkeleton } from '../shared/BriefPlayCard'
import '../shared/discover-shared.css'
import './in-the-mood.css'

export type InTheMoodForProps = {
  shelves: MoodShelf[]
  activeCategory: string | null
  onPlay?: (id: string) => void
  loading?: boolean
}

const SKELETON_MOODS = 2
const SKELETON_CARDS = 3

const MoodShelfRow = ({
  shelf,
  onPlay,
  allowMotion,
}: {
  shelf: MoodShelf
  onPlay?: (id: string) => void
  allowMotion: boolean
}) => {
  const tintStyle = {
    '--mood-tint': shelf.tintHsl,
  } as CSSProperties

  return (
    <article className="mood-shelf" style={tintStyle} aria-labelledby={`mood-${shelf.id}`}>
      <div className="mood-shelf__head">
        <span className="mood-shelf__chip" aria-hidden>
          {shelf.label}
        </span>
        <div className="mood-shelf__head-copy">
          <h3 id={`mood-${shelf.id}`} className="mood-shelf__title">
            {shelf.label}
          </h3>
          <p className="mood-shelf__desc">{shelf.description}</p>
        </div>
      </div>
      <motion.div
        className="home-shelf__scroller mood-shelf__scroller"
        role="list"
        initial={allowMotion ? { opacity: 0 } : false}
        animate={allowMotion ? { opacity: 1 } : undefined}
        transition={transition.base}
      >
        {shelf.briefs.map((brief) => (
          <div key={brief.id} role="listitem" className="mood-shelf__item">
            <BriefPlayCard brief={brief} onPlay={onPlay} size="md" />
          </div>
        ))}
      </motion.div>
    </article>
  )
}

export const InTheMoodFor = ({
  shelves,
  activeCategory,
  onPlay,
  loading = false,
}: InTheMoodForProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  const visibleShelves = shelves
    .map((shelf) => ({
      ...shelf,
      briefs: filterBriefs(shelf.briefs, activeCategory),
    }))
    .filter((shelf) => shelf.briefs.length > 0)

  if (loading) {
    return (
      <section
        className="home-section in-the-mood in-the-mood--loading"
        aria-labelledby="in-the-mood-heading"
        aria-busy="true"
      >
        <div className="home-section__head">
          <h2 id="in-the-mood-heading" className="section-heading">
            In the Mood For…
          </h2>
        </div>
        {Array.from({ length: SKELETON_MOODS }, (_, i) => (
          <div key={`mood-skeleton-${i}`} className="mood-shelf mood-shelf--skeleton">
            <div className="home-shelf__scroller mood-shelf__scroller">
              {Array.from({ length: SKELETON_CARDS }, (_, j) => (
                <BriefPlayCardSkeleton key={`mood-card-skeleton-${i}-${j}`} />
              ))}
            </div>
          </div>
        ))}
      </section>
    )
  }

  if (visibleShelves.length === 0) {
    return (
      <section className="home-section in-the-mood" aria-labelledby="in-the-mood-heading">
        <div className="home-section__head">
          <h2 id="in-the-mood-heading" className="section-heading">
            In the Mood For…
          </h2>
          <p className="section-subtitle">Listening context, not just topic</p>
        </div>
        <p className="discover-empty discover-section-empty" role="status">
          No mood shelves match this category yet.
        </p>
      </section>
    )
  }

  return (
    <section className="home-section in-the-mood" aria-labelledby="in-the-mood-heading">
      <div className="home-section__head">
        <h2 id="in-the-mood-heading" className="section-heading">
          In the Mood For…
        </h2>
        <p className="section-subtitle">Listening context, not just topic</p>
      </div>

      <div className="in-the-mood__shelves">
        {visibleShelves.map((shelf) => (
          <MoodShelfRow
            key={shelf.id}
            shelf={shelf}
            onPlay={onPlay}
            allowMotion={allowMotion}
          />
        ))}
      </div>
    </section>
  )
}
