import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { transition } from '../../../styles/motion'
import './player-interactions.css'

type BottomSheetProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  variant?: 'default' | 'plain'
  className?: string
  sheetStyle?: CSSProperties
}

export const BottomSheet = ({
  open,
  title,
  onClose,
  children,
  variant = 'default',
  className,
  sheetStyle,
}: BottomSheetProps) => {
  const prefersReducedMotion = useReducedMotion()
  const sheetClassName = ['player-sheet', className].filter(Boolean).join(' ')

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="player-overlay"
            aria-label="Close"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={transition.base}
            onClick={onClose}
          />
          <motion.div
            className={sheetClassName}
            style={sheetStyle}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={prefersReducedMotion ? false : { y: '100%', opacity: 0.95, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { y: '100%', opacity: 0, scale: 0.98 }
            }
            transition={transition.slow}
          >
            <div className="player-sheet__handle" aria-hidden />
            {variant === 'default' ? (
              <header className="player-sheet__head">
                <h3 className="player-sheet__title">{title}</h3>
                <button type="button" className="player-sheet__close" onClick={onClose}>
                  Done
                </button>
              </header>
            ) : null}
            <div className="player-sheet__body">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}

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
