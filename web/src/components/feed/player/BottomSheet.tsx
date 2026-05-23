import { useEffect, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './player-interactions.css'

type BottomSheetProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export const BottomSheet = ({ open, title, onClose, children }: BottomSheetProps) => (
  <AnimatePresence>
    {open ? (
      <>
        <motion.button
          type="button"
          className="player-overlay"
          aria-label="Close"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        />
        <motion.div
          className="player-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="player-sheet__handle" aria-hidden />
          <header className="player-sheet__head">
            <h3 className="player-sheet__title">{title}</h3>
            <button type="button" className="player-sheet__close" onClick={onClose}>
              Done
            </button>
          </header>
          <div className="player-sheet__body">{children}</div>
        </motion.div>
      </>
    ) : null}
  </AnimatePresence>
)

export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
