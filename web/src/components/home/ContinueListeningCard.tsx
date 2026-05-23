import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { ContinueListeningEpisode } from '../../data/homeData'
import '../../styles/sections.css'
import './continue-listening.css'

export type ContinueListeningCardProps = {
  item: ContinueListeningEpisode
  onPress?: (id: string) => void
}

function parseDominantColor(hsl: string): { h: string; s: string } {
  const match = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '0', s: '0%' }
  return { h: match[1], s: `${match[2]}%` }
}

export const ContinueListeningCard = ({
  item,
  onPress,
}: ContinueListeningCardProps) => {
  const { h, s } = parseDominantColor(item.dominantColor)
  const tintStyle = {
    '--continue-card-h': h,
    '--continue-card-s': s,
  } as CSSProperties

  return (
    <motion.button
      type="button"
      className="continue-listening-card"
      style={tintStyle}
      onClick={() => onPress?.(item.id)}
      aria-label={`Resume ${item.episodeTitle} from ${item.showName}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <img
        src={item.coverSrc}
        alt=""
        className="continue-listening-card__art"
        width={64}
        height={64}
      />
      <span className="continue-listening-card__body">
        <span className="continue-listening-card__show">{item.showName}</span>
        <span className="continue-listening-card__title">{item.episodeTitle}</span>
        <span className="continue-listening-card__progress" aria-hidden>
          <span
            className="continue-listening-card__progress-fill"
            style={{ width: `${Math.round(item.progress * 100)}%` }}
          />
        </span>
      </span>
    </motion.button>
  )
}

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export type ContinueListeningSectionProps = {
  episodes: ContinueListeningEpisode[]
  onPress?: (id: string) => void
}

export const ContinueListeningSection = ({
  episodes,
  onPress,
}: ContinueListeningSectionProps) => {
  const prefersReducedMotion = useReducedMotion()
  const visible = episodes.slice(0, 5)

  if (visible.length === 0) return null

  return (
    <section className="home-section continue-listening" aria-labelledby="continue-listening-heading">
      <div className="home-section__head">
        <h2 id="continue-listening-heading" className="section-heading">
          Continue listening
        </h2>
        <p className="section-subtitle">Pick up where you paused</p>
      </div>

      <motion.div
        className="continue-listening__scroller"
        role="list"
        variants={prefersReducedMotion ? undefined : listVariants}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'show'}
      >
        {visible.map((item) => (
          <motion.div
            key={item.id}
            role="listitem"
            className="continue-listening__item"
            variants={prefersReducedMotion ? undefined : cardVariants}
          >
            <ContinueListeningCard item={item} onPress={onPress} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
