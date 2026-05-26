import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { PulseEpisode } from '../data/homeData'
import { FeedCardListenerBadge } from './feed/FeedCardListenerBadge'
import { FeedCardWaveform } from './feed/FeedCardWaveform'
import { useFeedCardInView } from './feed/useFeedCardInView'
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
  return (24 + (clamped / 100) * 32) * 1.3
}

function parseDominantColor(hsl: string): { h: string; s: string } {
  const match = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '0', s: '0%' }
  return { h: match[1], s: `${match[2]}%` }
}

function parseListenerCount(label: string): { count: number; suffix: string } | null {
  const match = label.match(/^([\d.]+)k\s+(.+)$/i)
  if (!match) return null
  return {
    count: Number.parseFloat(match[1]),
    suffix: 'k Listening Now',
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
  const { h, s } = parseDominantColor(episode.dominantColor)
  const { ref, inView } = useFeedCardInView<HTMLButtonElement>({ enabled: allowMotion })
  const tintStyle = {
    '--pulse-card-h': h,
    '--pulse-card-s': s,
  } as CSSProperties

  return (
    <motion.button
      ref={ref}
      type="button"
      className="pulse-card"
      style={tintStyle}
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
      <span className="pulse-card__art-wrap">
        <img
          src={episode.coverSrc}
          alt=""
          className="pulse-card__art"
          width={72}
          height={72}
        />
        <FeedCardWaveform active={allowMotion && inView} />
      </span>
      <span className="pulse-card__body">
        <span className="pulse-card__title">{episode.episodeTitle}</span>
        <span className="pulse-card__show">{episode.showName}</span>
        <span className="pulse-card__trend">
          <span
            className={`pulse-card__dot${allowMotion ? '' : ' pulse-card__dot--static'}`}
            aria-hidden
          />
          {parsed ? (
            <FeedCardListenerBadge animate={allowMotion}>
              <span className="pulse-card__trend-label">
                <AnimatedNumber
                  value={parsed.count}
                  format={(n) =>
                    n % 1 === 0 ? String(Math.round(n)) : n.toFixed(1)
                  }
                />
                {parsed.suffix}
              </span>
            </FeedCardListenerBadge>
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
