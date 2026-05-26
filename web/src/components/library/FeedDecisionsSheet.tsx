import { BottomSheet, useBodyScrollLock } from '../feed/player/BottomSheet'
import { FEED_EXPLANATIONS } from '../../data/feedExplanations'

export type FeedDecisionsSheetProps = {
  open: boolean
  onClose: () => void
}

export function FeedDecisionsSheet({ open, onClose }: FeedDecisionsSheetProps) {
  useBodyScrollLock(open)

  return (
    <BottomSheet open={open} title="Recent feed decisions" onClose={onClose}>
      <ul className="feed-decisions-list">
        {FEED_EXPLANATIONS.map((item) => (
          <li key={item.id} className="feed-decisions-list__item">
            {item.headline}
          </li>
        ))}
      </ul>
    </BottomSheet>
  )
}
