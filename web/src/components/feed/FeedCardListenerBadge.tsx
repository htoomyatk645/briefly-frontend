import type { ReactNode } from 'react'
import './feedCardAmbient.css'

type FeedCardListenerBadgeProps = {
  children: ReactNode
  animate?: boolean
}

export const FeedCardListenerBadge = ({
  children,
  animate = true,
}: FeedCardListenerBadgeProps) => (
  <span
    className={`feed-card-listener-badge${animate ? '' : ' feed-card-listener-badge--static'}`}
  >
    {children}
  </span>
)
