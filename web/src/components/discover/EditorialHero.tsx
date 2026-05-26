import { motion, useReducedMotion } from 'framer-motion'
import type { MouseEvent } from 'react'
import type { EditorialHeroItem } from '../../data/discoverFeed'
import { transition } from '../../styles/motion'
import './EditorialHero.css'

export type EditorialHeroProps = {
  hero?: EditorialHeroItem | null
  loading?: boolean
  onPlay?: (id: string) => void
}

const CARD_HEIGHT_MOBILE = 320
const CARD_HEIGHT_DESKTOP = 360

export const EditorialHero = ({
  hero = null,
  loading = false,
  onPlay,
}: EditorialHeroProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion
  const titleId = hero ? `editorial-hero-title-${hero.id}` : undefined

  const handleCardClick = () => {
    if (hero) onPlay?.(hero.id)
  }

  const handleCtaClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (hero) onPlay?.(hero.id)
  }

  if (loading) {
    return (
      <section className="editorial-hero" aria-busy="true" aria-label="Loading brief of the week">
        <p className="editorial-hero__label">Brief of the week</p>
        <div
          className="editorial-hero__card editorial-hero__card--loading"
          role="status"
          aria-label="Loading editorial hero"
        />
      </section>
    )
  }

  if (!hero) {
    return (
      <section className="editorial-hero editorial-hero--empty" aria-hidden="true">
        <div className="editorial-hero__spacer" />
      </section>
    )
  }

  return (
    <section className="editorial-hero">
      <p className="editorial-hero__label">Brief of the week</p>

      <article className="editorial-hero__article" aria-labelledby={titleId}>
        <motion.button
          type="button"
          className="editorial-hero__card"
          onClick={handleCardClick}
          aria-label={`Play ${hero.episodeTitle} from ${hero.showName}`}
          initial={allowMotion ? { opacity: 0, y: 8 } : false}
          animate={allowMotion ? { opacity: 1, y: 0 } : undefined}
          transition={transition.slow}
          whileTap={allowMotion ? { scale: 0.985 } : undefined}
        >
          <img src={hero.coverSrc} alt="" className="editorial-hero__cover" />
          <span className="editorial-hero__scrim" aria-hidden />

          <span className="editorial-hero__content">
            <span className="editorial-hero__show">{hero.showName}</span>
            <span id={titleId} className="editorial-hero__title">
              {hero.episodeTitle}
            </span>
            <span className="editorial-hero__brief">{hero.brief}</span>

            <span className="editorial-hero__actions">
              <span className="editorial-hero__duration">{hero.durationLabel}</span>
              <button
                type="button"
                className="editorial-hero__cta"
                onClick={handleCtaClick}
                aria-label={`Play the best parts of ${hero.episodeTitle}`}
              >
                Play the best parts
              </button>
            </span>
          </span>
        </motion.button>
      </article>
    </section>
  )
}

export const editorialHeroCardHeights = {
  mobile: CARD_HEIGHT_MOBILE,
  desktop: CARD_HEIGHT_DESKTOP,
} as const
