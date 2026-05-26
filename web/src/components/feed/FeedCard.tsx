import type { CSSProperties } from 'react'
import './feedCardAnticipation.css'
import {
  clampAnticipation,
  getCoverFilterStyle,
  getWarmOverlayBackground,
} from './feedCardAnticipation'

const FILTER_TRANSITION = 'filter 320ms cubic-bezier(0.22, 1, 0.36, 1)'

export type FeedCardProps = {
  coverSrc: string
  anticipation: number
  animateAnticipation?: boolean
  className?: string
  artClassName?: string
}

export const FeedCard = ({
  coverSrc,
  anticipation,
  animateAnticipation = true,
  className = '',
  artClassName = '',
}: FeedCardProps) => {
  const t = clampAnticipation(anticipation)
  const showEffects = animateAnticipation

  const imageStyle: CSSProperties | undefined = showEffects
    ? {
        filter: getCoverFilterStyle(t),
        transition: FILTER_TRANSITION,
      }
    : undefined

  return (
    <span className={`feed-card-cover${className ? ` ${className}` : ''}`}>
      <img
        src={coverSrc}
        alt=""
        className={`feed-card-cover__img${artClassName ? ` ${artClassName}` : ''}`}
        style={imageStyle}
      />
      {showEffects ? (
        <span
          className="feed-card-cover__warmth"
          style={{ background: getWarmOverlayBackground(t) }}
          aria-hidden
        />
      ) : null}
    </span>
  )
}
