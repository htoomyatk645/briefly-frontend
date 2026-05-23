import { AnimatePresence, motion } from 'framer-motion'
import './player-interactions.css'

export type MoreMenuAction =
  | 'follow'
  | 'similar'
  | 'not-similar'
  | 'unplayed'
  | 'transcript'
  | 'report'
  | 'share'

type MoreMenuItem = {
  id: MoreMenuAction
  label: string
  dividerBefore?: boolean
}

const BASE_ITEMS: MoreMenuItem[] = [
  { id: 'follow', label: 'Follow the show' },
  { id: 'similar', label: 'Play something similar' },
  { id: 'not-similar', label: "Don't play similar" },
  { id: 'unplayed', label: 'Mark as unplayed' },
  { id: 'transcript', label: 'View transcript' },
  { id: 'report', label: 'Report a concern', dividerBefore: true },
  { id: 'share', label: 'Share' },
]

type MoreMenuProps = {
  open: boolean
  following: boolean
  onAction: (action: MoreMenuAction) => void
  onClose: () => void
}

export const MoreMenu = ({ open, following, onAction, onClose }: MoreMenuProps) => {
  const items = BASE_ITEMS.map((item) =>
    item.id === 'follow'
      ? { ...item, label: following ? 'Unfollow' : 'Follow the show' }
      : item,
  )

  return (
    <AnimatePresence>
      {open ? (
        <>
          <button type="button" className="player-overlay player-overlay--dim" aria-label="Close menu" onClick={onClose} />
          <motion.ul
            className="player-more-menu"
            role="menu"
            aria-label="More options"
            initial="closed"
            animate="open"
            exit="closed"
          >
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                variants={{
                  closed: { opacity: 0, x: 16 },
                  open: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.24, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className={item.dividerBefore ? 'player-more-menu__divider' : undefined}
              >
                <button
                  type="button"
                  role="menuitem"
                  className="player-more-menu__item"
                  onClick={() => {
                    onAction(item.id)
                    onClose()
                  }}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </>
      ) : null}
    </AnimatePresence>
  )
}
