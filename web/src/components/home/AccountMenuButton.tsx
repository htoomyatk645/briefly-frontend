import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { AccountIcon } from '../icons/AccountIcon'
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
      <button
        type="button"
        className="header-icon-btn"
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <AccountIcon size={24} />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Account"
            className="account-menu__dropdown"
            initial={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
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
