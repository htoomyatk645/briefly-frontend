import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export type TuneFeedSavedToastProps = {
  visible: boolean
}

export function TuneFeedSavedToast({ visible }: TuneFeedSavedToastProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="tune-feed-toast"
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
  )
}
