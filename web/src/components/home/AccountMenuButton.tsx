import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { AccountIcon } from '../icons/AccountIcon'
import { modalVariants, pressSpring, transition } from '../../styles/motion'
import '../../styles/header-actions.css'

const MENU_ITEMS = ['Profile', 'Subscription', 'Settings', 'Sign out'] as const

export const AccountMenuButton = () => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className="account-menu" ref={rootRef}>
      <motion.button
        type="button"
        className="header-icon-btn"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        whileTap={{ scale: 0.97 }}
        transition={pressSpring}
      >
        <AccountIcon size={24} />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Account"
            className="account-menu__dropdown"
            initial={prefersReducedMotion ? false : modalVariants.initial}
            animate={modalVariants.animate}
            exit={prefersReducedMotion ? undefined : modalVariants.exit}
            transition={transition.base}
          >
            {MENU_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                role="menuitem"
                className="account-menu__item"
                onClick={() => setOpen(false)}
              >
                {item}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
