import { motion, useReducedMotion } from 'framer-motion'
import './mentionPreview.css'
import { useEffect, useRef, useState } from 'react'
import { IconClose } from './icons'
import type { MentionPreviewPlayback } from './mentionPreviewAudio'

export type MentionPreviewProps = {
  mentionLabel: string
  hostName: string
  episodeTitle: string
  playback: MentionPreviewPlayback
  onClose: () => void
  onOpenClip: () => void
}

export function MentionPreview({
  mentionLabel,
  hostName,
  episodeTitle,
  playback,
  onClose,
  onOpenClip,
}: MentionPreviewProps) {
  const prefersReducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = () => {
      setProgress(playback.getProgress())
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current)
    }
  }, [playback])

  return (
    <motion.div
      className="mention-preview"
      role="dialog"
      aria-label={`Preview mention of ${mentionLabel}`}
      initial={
        prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
      }
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mention-preview__progress" aria-hidden>
        <span
          className="mention-preview__progress-fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <button
        type="button"
        className="mention-preview__close"
        onClick={onClose}
        aria-label="Close preview"
      >
        <IconClose />
      </button>

      <p className="mention-preview__host">{hostName}</p>
      <p className="mention-preview__episode">{episodeTitle}</p>

      <button type="button" className="mention-preview__open" onClick={onOpenClip}>
        Open clip
      </button>
    </motion.div>
  )
}
