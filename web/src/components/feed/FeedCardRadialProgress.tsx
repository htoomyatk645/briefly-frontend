import { useReducedMotion } from 'framer-motion'
import './feedCardRadialProgress.css'
import {
  getRadialProgressMetrics,
  getStrokeDashoffset,
  RADIAL_STROKE_WIDTH_PX,
  shouldShowRadialProgress,
} from './feedCardRadialProgress'

export type FeedCardRadialProgressProps = {
  progress: number
  artSize?: number
}

export const FeedCardRadialProgress = ({
  progress,
  artSize = 132,
}: FeedCardRadialProgressProps) => {
  const prefersReducedMotion = useReducedMotion()

  if (!shouldShowRadialProgress(progress)) {
    return null
  }

  const { svgSize, radius, circumference, center } = getRadialProgressMetrics(artSize)
  const dashoffset = getStrokeDashoffset(circumference, progress)

  return (
    <svg
      className={`feed-card-radial-progress${prefersReducedMotion ? ' feed-card-radial-progress--static' : ''}`}
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      aria-hidden
    >
      <circle
        className="feed-card-radial-progress__track"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={RADIAL_STROKE_WIDTH_PX}
      />
      <circle
        className="feed-card-radial-progress__fill"
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={RADIAL_STROKE_WIDTH_PX}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: dashoffset,
        }}
      />
    </svg>
  )
}
