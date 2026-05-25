import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { EditorialPick } from '../data/homeData'
import { pressSpring } from '../styles/motion'
import '../styles/sections.css'
import './homeShelves.css'

export type TheEditProps = {
  pick: EditorialPick
  onPlay?: (id: string) => void
}

const PlayIcon = () => (
  <svg width={10} height={12} viewBox="0 0 10 12" fill="none" aria-hidden>
    <path d="M1 1.2 9 6 1 10.8V1.2z" fill="currentColor" />
  </svg>
)

export const TheEdit = ({ pick, onPlay }: TheEditProps) => {
  const prefersReducedMotion = useReducedMotion()
  const cardStyle = {
    '--the-edit-frame': pick.frameColor,
    '--the-edit-inner': pick.innerColor,
  } as CSSProperties

  return (
    <section className="home-section the-edit" aria-labelledby="the-edit-heading">
      <div className="home-section__head">
        <h2 id="the-edit-heading" className="section-heading">
          The Edit
        </h2>
      </div>
      <motion.button
        type="button"
        className="the-edit__card"
        style={cardStyle}
        onClick={() => onPlay?.(pick.id)}
        aria-label={`Play ${pick.title} from ${pick.showName}`}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        transition={pressSpring}
      >
        <span className="the-edit__wrap">
          <img
            src="/home/the-edit-microphone.svg"
            alt=""
            className="the-edit__mic"
            width={80}
            height={147}
          />
          <span className="the-edit__frame">
            <span className="the-edit__inner">
              <img
                src={pick.coverSrc}
                alt=""
                className="the-edit__art"
              />
              <span className="the-edit__copy">
                <span className="the-edit__title">{pick.title}</span>
                <span className="the-edit__meta">{pick.episodeMeta}</span>
                <span className="the-edit__show">{pick.showName}</span>
                <span className="the-edit__play">
                  <span className="the-edit__play-label">Play</span>
                  <PlayIcon />
                </span>
              </span>
            </span>
          </span>
        </span>
      </motion.button>
    </section>
  )
}
