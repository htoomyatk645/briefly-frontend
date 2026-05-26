import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useFeedTuningStore } from '../../state/feedTuning'

const SAVED_TOAST_MS = 1600

export function TuneFeedToasts() {
  const prefersReducedMotion = useReducedMotion()
  const savedToastKey = useFeedTuningStore((state) => state.savedToastKey)
  const snackbar = useFeedTuningStore((state) => state.snackbar)

  const savedVisible = savedToastKey > 0

  useEffect(() => {
    if (!savedToastKey) return
    const timer = window.setTimeout(() => {
      useFeedTuningStore.setState({ savedToastKey: 0 })
    }, SAVED_TOAST_MS)
    return () => window.clearTimeout(timer)
  }, [savedToastKey])

  return (
    <>
      <AnimatePresence mode="wait">
        {savedVisible ? (
          <motion.div
            key={savedToastKey}
            className="tune-feed-saved-toast"
            role="status"
            aria-live="polite"
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
            }
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            Saved
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {snackbar ? (
          <motion.div
            key={snackbar.message}
            className="tune-feed-snackbar"
            role="status"
            aria-live="polite"
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
            }
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {snackbar.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
