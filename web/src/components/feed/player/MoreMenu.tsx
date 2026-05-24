import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { modalVariants, transition } from '../../../styles/motion'
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
  const prefersReducedMotion = useReducedMotion()
  const items = BASE_ITEMS.map((item) =>
    item.id === 'follow'
      ? { ...item, label: following ? 'Unfollow' : 'Follow the show' }
      : item,
  )

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="player-overlay player-overlay--dim"
            aria-label="Close menu"
            onClick={onClose}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={transition.base}
          />
          <motion.ul
            className="player-more-menu"
            role="menu"
            aria-label="More options"
            initial={prefersReducedMotion ? false : modalVariants.initial}
            animate={modalVariants.animate}
            exit={prefersReducedMotion ? undefined : modalVariants.exit}
            transition={transition.base}
          >
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition.base, delay: i * 0.03 }}
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
