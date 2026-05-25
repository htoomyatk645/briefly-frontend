import { motion, useReducedMotion } from 'framer-motion'
import type { PulseEpisode } from '../data/homeData'
import { AnimatedNumber } from './motion/AnimatedNumber'
import { pressSpring, transition } from '../styles/motion'
import '../styles/sections.css'
import './homeShelves.css'

export type PulseShelfProps = {
  episodes: PulseEpisode[]
  onPlay?: (id: string) => void
  loading?: boolean
}

function accentHeight(score: number) {
  const clamped = Math.min(100, Math.max(0, score))
  return 24 + (clamped / 100) * 32
}

function parseListenerCount(label: string): { count: number; suffix: string } | null {
  const match = label.match(/^([\d.]+)k\s+(.*)$/)
  if (!match) return null
  return {
    count: Number.parseFloat(match[1]),
    suffix: `k ${match[2]}`,
  }
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
    transition: transition.base,
  },
}

const SKELETON_COUNT = 3

type PulseCardProps = {
  episode: PulseEpisode
  onPlay?: (id: string) => void
  allowMotion: boolean
}

const PulseCard = ({ episode, onPlay, allowMotion }: PulseCardProps) => {
  const parsed = parseListenerCount(episode.trendLabel)

  return (
    <motion.button
      type="button"
      className="pulse-card"
      onClick={() => onPlay?.(episode.id)}
      aria-label={`Play ${episode.episodeTitle} from ${episode.showName}`}
      whileTap={allowMotion ? { scale: 0.97 } : undefined}
      transition={pressSpring}
    >
      <span
        className="pulse-card__accent"
        style={{ height: `${accentHeight(episode.trendScore)}px` }}
        aria-hidden
      />
      <img
        src={episode.coverSrc}
        alt=""
        className="pulse-card__art"
        width={64}
        height={64}
      />
      <span className="pulse-card__body">
        <span className="pulse-card__title">{episode.episodeTitle}</span>
        <span className="pulse-card__show">{episode.showName}</span>
        <span className="pulse-card__trend">
          <span
            className={`pulse-card__dot${allowMotion ? '' : ' pulse-card__dot--static'}`}
            aria-hidden
          />
          {parsed ? (
            <>
              <AnimatedNumber
                value={parsed.count}
                format={(n) =>
                  n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1)
                }
              />
              {parsed.suffix}
            </>
          ) : (
            episode.trendLabel
          )}
        </span>
      </span>
    </motion.button>
  )
}

export const PulseShelf = ({ episodes, onPlay, loading = false }: PulseShelfProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading

  if (!loading && episodes.length === 0) return null

  return (
    <section className="home-shelf pulse-shelf" aria-labelledby="pulse-shelf-heading">
      <div className="home-section__head">
        <h2 id="pulse-shelf-heading" className="section-heading">
          Pulse
        </h2>
      </div>

      {loading ? (
        <div
          className="home-shelf__scroller"
          role="status"
          aria-label="Loading pulse episodes"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              key={`pulse-skeleton-${i}`}
              className="pulse-card pulse-card--skeleton"
              aria-hidden
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="home-shelf__scroller"
          role="list"
          variants={allowMotion ? listVariants : undefined}
          initial={allowMotion ? 'hidden' : false}
          animate={allowMotion ? 'show' : undefined}
        >
          {episodes.map((episode) => (
            <motion.div
              key={episode.id}
              role="listitem"
              className="pulse-shelf__item"
              variants={allowMotion ? cardVariants : undefined}
            >
              <PulseCard episode={episode} onPlay={onPlay} allowMotion={allowMotion} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
