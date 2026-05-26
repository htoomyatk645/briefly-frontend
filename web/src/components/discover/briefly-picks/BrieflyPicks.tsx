import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import {
  filterBriefs,
  type CuratorCollection,
} from '../../../data/discoverSectionsData'
import { pressSpring } from '../../../styles/motion'
import '../../../styles/sections.css'
import { ArtworkPlaceholder } from '../../home/ArtworkPlaceholder'
import '../shared/discover-shared.css'
import './briefly-picks.css'

export type BrieflyPicksProps = {
  collections: CuratorCollection[]
  activeCategory: string | null
  onPlay?: (id: string) => void
  loading?: boolean
}

const PlayIcon = () => (
  <svg width={10} height={12} viewBox="0 0 10 12" fill="none" aria-hidden>
    <path d="M1 1.2 9 6 1 10.8V1.2z" fill="currentColor" />
  </svg>
)

type CollectionCardProps = {
  collection: CuratorCollection
  onPlay?: (id: string) => void
  allowMotion: boolean
}

const CollectionCard = ({ collection, onPlay, allowMotion }: CollectionCardProps) => {
  const leadBrief = collection.briefs[0]

  return (
    <motion.button
      type="button"
      className="briefly-picks__card"
      onClick={() => onPlay?.(leadBrief.id)}
      aria-label={`Play ${collection.collectionTitle}, curated by ${collection.curatorName}`}
      whileTap={allowMotion ? { scale: 0.98 } : undefined}
      transition={pressSpring}
    >
      <span className="briefly-picks__stack" aria-hidden>
        {collection.briefs.slice(0, 5).map((brief, index) => (
          <span
            key={brief.id}
            className="briefly-picks__cover"
            style={{ '--stack-index': index } as CSSProperties}
          >
            <ArtworkPlaceholder
              tone={brief.artworkTone}
              coverSrc={brief.coverSrc}
              size="md"
              className="briefly-picks__cover-art"
              label=""
            />
          </span>
        ))}
      </span>

      <span className="briefly-picks__copy">
        <span className="briefly-picks__curator">
          {collection.curatorName}
          <span className="briefly-picks__role"> · {collection.curatorRole}</span>
        </span>
        <span className="briefly-picks__title">{collection.collectionTitle}</span>
        <span className="briefly-picks__count">
          {collection.briefs.length} briefs
        </span>
        <span className="briefly-picks__play">
          <PlayIcon />
          <span>Play first</span>
        </span>
      </span>
    </motion.button>
  )
}

const SKELETON_COUNT = 2

export const BrieflyPicks = ({
  collections,
  activeCategory,
  onPlay,
  loading = false,
}: BrieflyPicksProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  const visibleCollections = collections.filter((collection) => {
    const filtered = filterBriefs(collection.briefs, activeCategory)
    return filtered.length > 0
  })

  if (loading) {
    return (
      <section
        className="home-section briefly-picks briefly-picks--loading"
        aria-labelledby="briefly-picks-heading"
        aria-busy="true"
      >
        <div className="home-section__head">
          <h2 id="briefly-picks-heading" className="section-heading">
            Briefly Picks
          </h2>
        </div>
        <div className="briefly-picks__scroller" role="status" aria-label="Loading picks">
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={`picks-skeleton-${i}`} className="briefly-picks__card briefly-picks__card--skeleton" />
          ))}
        </div>
      </section>
    )
  }

  if (visibleCollections.length === 0) {
    return (
      <section className="home-section briefly-picks" aria-labelledby="briefly-picks-heading">
        <div className="home-section__head">
          <h2 id="briefly-picks-heading" className="section-heading">
            Briefly Picks
          </h2>
          <p className="section-subtitle">Editorial collections from named curators</p>
        </div>
        <p className="discover-empty discover-section-empty" role="status">
          No curated picks in this category yet.
        </p>
      </section>
    )
  }

  return (
    <section className="home-section briefly-picks" aria-labelledby="briefly-picks-heading">
      <div className="home-section__head">
        <h2 id="briefly-picks-heading" className="section-heading">
          Briefly Picks
        </h2>
        <p className="section-subtitle">Editorial collections from named curators</p>
      </div>

      <div className="home-shelf__scroller briefly-picks__scroller" role="list">
        {visibleCollections.map((collection) => {
          const filteredBriefs = filterBriefs(collection.briefs, activeCategory)
          const displayCollection = {
            ...collection,
            briefs: activeCategory ? filteredBriefs : collection.briefs,
          }

          return (
            <div key={collection.id} role="listitem" className="briefly-picks__item">
              <CollectionCard
                collection={displayCollection}
                onPlay={onPlay}
                allowMotion={allowMotion}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
