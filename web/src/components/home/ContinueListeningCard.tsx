import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { ContinueListeningEpisode } from '../../data/homeData'
import { FeedCardRadialProgress } from '../feed/FeedCardRadialProgress'
import { pressSpring, transition } from '../../styles/motion'
import '../../styles/sections.css'
import './continue-listening.css'

const SKELETON_COUNT = 3

export type ContinueListeningCardProps = {
  item: ContinueListeningEpisode
  onPress?: (id: string) => void
  allowMotion?: boolean
}

function parseDominantColor(hsl: string): { h: string; s: string } {
  const match = hsl.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '0', s: '0%' }
  return { h: match[1], s: `${match[2]}%` }
}

export const ContinueListeningCard = ({
  item,
  onPress,
  allowMotion = true,
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
      whileTap={allowMotion ? { scale: 0.97 } : undefined}
      transition={pressSpring}
    >
      <span className="continue-listening-card__art-wrap">
        <img
          src={item.coverSrc}
          alt=""
          className="continue-listening-card__art"
          width={132}
          height={132}
        />
        <FeedCardRadialProgress progress={item.progress} />
      </span>
      <span className="continue-listening-card__body">
        <span className="continue-listening-card__progress-label">
          {item.progressLabel}
        </span>
        <span className="continue-listening-card__title">{item.episodeTitle}</span>
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
    transition: transition.base,
  },
}

export type ContinueListeningSectionProps = {
  episodes: ContinueListeningEpisode[]
  onPress?: (id: string) => void
  loading?: boolean
}

export const ContinueListeningSection = ({
  episodes,
  onPress,
  loading = false,
}: ContinueListeningSectionProps) => {
  const prefersReducedMotion = useReducedMotion()
  const allowMotion = !prefersReducedMotion && !loading
  const visible = episodes.slice(0, 5)
  const isEmpty = !loading && visible.length === 0

  return (
    <section className="home-section continue-listening" aria-labelledby="continue-listening-heading">
      <div className="home-section__head">
        <h2 id="continue-listening-heading" className="section-heading">
          Continue listening
        </h2>
      </div>

      {loading ? (
        <div
          className="continue-listening__scroller"
          role="status"
          aria-label="Loading continue listening episodes"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div
              key={`continue-skeleton-${i}`}
              className="continue-listening-card continue-listening-card--skeleton"
              aria-hidden
            />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="continue-listening__scroller" role="list">
          <div role="listitem" className="continue-listening__item">
            <div className="continue-listening-card continue-listening-card--ghost">
              <p className="continue-listening-card__ghost-text">
                Nothing in progress. Start an episode and it&apos;ll appear here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="continue-listening__scroller"
          role="list"
          variants={allowMotion ? listVariants : undefined}
          initial={allowMotion ? 'hidden' : false}
          animate={allowMotion ? 'show' : undefined}
        >
          {visible.map((item) => (
            <motion.div
              key={item.id}
              role="listitem"
              className="continue-listening__item"
              variants={allowMotion ? cardVariants : undefined}
            >
              <ContinueListeningCard
                item={item}
                onPress={onPress}
                allowMotion={allowMotion}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}
