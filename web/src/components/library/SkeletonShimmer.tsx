import type { CSSProperties, ReactNode } from 'react'

type SkeletonShimmerProps = {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  'aria-hidden'?: boolean
}

export function SkeletonShimmer({
  className = '',
  style,
  children,
  'aria-hidden': ariaHidden = true,
}: SkeletonShimmerProps) {
  return (
    <div
      className={`library-shimmer${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  )
}
