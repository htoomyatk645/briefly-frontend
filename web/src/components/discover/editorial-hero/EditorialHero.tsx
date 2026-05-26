import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { EditorialHeroPick } from '../../../data/discoverSectionsData'
import { pressSpring } from '../../../styles/motion'
import '../../../styles/sections.css'
import './editorial-hero.css'

export type EditorialHeroProps = {
  pick: EditorialHeroPick
  onPlay?: (id: string) => void
  loading?: boolean
}

const PlayIcon = () => (
  <svg width={12} height={14} viewBox="0 0 10 12" fill="none" aria-hidden>
    <path d="M1 1.2 9 6 1 10.8V1.2z" fill="currentColor" />
  </svg>
)

export const EditorialHero = ({ pick, onPlay, loading = false }: EditorialHeroProps) => {
  const prefersReducedMotion = useReducedMotion()
  const cardStyle = {
    '--editorial-hero-frame': pick.frameColor,
    '--editorial-hero-inner': pick.innerColor,
  } as CSSProperties

  if (loading) {
    return (
      <section
        className="home-section editorial-hero editorial-hero--loading"
        aria-labelledby="editorial-hero-heading"
        aria-busy="true"
      >
        <div className="home-section__head">
          <h2 id="editorial-hero-heading" className="section-heading">
            Editorial Hero
          </h2>
        </div>
        <div className="editorial-hero__skeleton" role="status" aria-label="Loading featured brief">
          <span className="editorial-hero__skeleton-cover" />
          <span className="editorial-hero__skeleton-copy" />
        </div>
      </section>
    )
  }

  return (
    <section className="home-section editorial-hero" aria-labelledby="editorial-hero-heading">
      <div className="home-section__head">
        <h2 id="editorial-hero-heading" className="section-heading">
          Editorial Hero
        </h2>
        <p className="section-subtitle">The week&apos;s must-listen clip</p>
      </div>

      <motion.button
        type="button"
        className="editorial-hero__card"
        style={cardStyle}
        onClick={() => onPlay?.(pick.id)}
        aria-label={`Play ${pick.title} from ${pick.showName}, ${pick.durationLabel}`}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        transition={pressSpring}
      >
        <span className="editorial-hero__kicker">{pick.kicker}</span>
        <span className="editorial-hero__frame">
          <span className="editorial-hero__inner">
            <img src={pick.coverSrc} alt="" className="editorial-hero__art" />
            <span className="editorial-hero__copy">
              <span className="editorial-hero__duration">{pick.durationLabel}</span>
              <span className="editorial-hero__title">{pick.title}</span>
              <span className="editorial-hero__excerpt">{pick.excerpt}</span>
              <span className="editorial-hero__show">{pick.showName}</span>
              <span className="editorial-hero__play">
                <PlayIcon />
                <span className="editorial-hero__play-label">Play brief</span>
              </span>
            </span>
          </span>
        </span>
      </motion.button>
    </section>
  )
}
