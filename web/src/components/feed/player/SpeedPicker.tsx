import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PLAYBACK_SPEEDS, type PlaybackSpeed } from './playerStorage'
import { modalVariants, transition } from '../../../styles/motion'
import './player-interactions.css'

type SpeedPickerProps = {
  open: boolean
  speed: PlaybackSpeed
  onSelect: (speed: PlaybackSpeed) => void
  onClose: () => void
}

export const SpeedPicker = ({ open, speed, onSelect, onClose }: SpeedPickerProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="player-overlay player-overlay--dim"
            aria-label="Close speed menu"
            onClick={onClose}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={transition.base}
          />
          <motion.div
            className="player-speed"
            role="menu"
            aria-label="Playback speed"
            initial={prefersReducedMotion ? false : modalVariants.initial}
            animate={modalVariants.animate}
            exit={prefersReducedMotion ? undefined : modalVariants.exit}
            transition={transition.base}
          >
            {PLAYBACK_SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                role="menuitemradio"
                className={`player-speed__pill${speed === s ? ' player-speed__pill--active' : ''}`}
                aria-checked={speed === s}
                onClick={() => {
                  onSelect(s)
                  window.setTimeout(onClose, 180)
                }}
              >
                {s}x
              </button>
            ))}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
