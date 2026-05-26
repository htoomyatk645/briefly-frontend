import { useReducedMotion } from 'framer-motion'
import './feedCardRadialProgress.css'
import {
  getSquareProgressMetrics,
  getStrokeDashoffset,
  RADIAL_STROKE_WIDTH_PX,
  shouldShowRadialProgress,
} from './feedCardRadialProgress'

export type FeedCardRadialProgressProps = {
  progress: number
  artWidth?: number
  artHeight?: number
}

export const FeedCardRadialProgress = ({
  progress,
  artWidth = 132,
  artHeight = 132,
}: FeedCardRadialProgressProps) => {
  const prefersReducedMotion = useReducedMotion()

  if (!shouldShowRadialProgress(progress)) {
    return null
  }

  const { svgWidth, svgHeight, path, perimeter } = getSquareProgressMetrics(
    artWidth,
    artHeight,
  )
  const dashoffset = getStrokeDashoffset(perimeter, progress)

  return (
    <svg
      className={`feed-card-radial-progress${prefersReducedMotion ? ' feed-card-radial-progress--static' : ''}`}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      aria-hidden
    >
      <path
        className="feed-card-radial-progress__track"
        d={path}
        strokeWidth={RADIAL_STROKE_WIDTH_PX}
      />
      <path
        className="feed-card-radial-progress__fill"
        d={path}
        strokeWidth={RADIAL_STROKE_WIDTH_PX}
        style={{
          strokeDasharray: perimeter,
          strokeDashoffset: dashoffset,
        }}
      />
    </svg>
  )
}
