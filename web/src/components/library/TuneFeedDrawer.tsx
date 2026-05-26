import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef } from 'react'
import { useBodyScrollLock } from '../feed/player/BottomSheet'
import { TuneFeedContent } from './TuneFeedContent'

export type TuneFeedDrawerProps = {
  open: boolean
  onClose: () => void
}

export function TuneFeedDrawer({ open, onClose }: TuneFeedDrawerProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="tune-feed-drawer-root">
          <motion.button
            type="button"
            className="tune-feed-drawer__backdrop"
            aria-label="Close tune feed panel"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            className="tune-feed-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <TuneFeedContent titleId={titleId} />
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
