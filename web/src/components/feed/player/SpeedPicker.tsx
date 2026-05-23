import { AnimatePresence, motion } from 'framer-motion'
import { PLAYBACK_SPEEDS, type PlaybackSpeed } from './playerStorage'
import './player-interactions.css'

type SpeedPickerProps = {
  open: boolean
  speed: PlaybackSpeed
  onSelect: (speed: PlaybackSpeed) => void
  onClose: () => void
}

export const SpeedPicker = ({ open, speed, onSelect, onClose }: SpeedPickerProps) => (
  <AnimatePresence>
    {open ? (
      <>
        <button type="button" className="player-overlay player-overlay--dim" aria-label="Close speed menu" onClick={onClose} />
        <motion.div
          className="player-speed"
          role="menu"
          aria-label="Playback speed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
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
