import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { FeedCardRadialProgress } from '../feed/FeedCardRadialProgress'
import { pressSpring } from '../../styles/motion'
import { formatRelativeSaveDate } from './savedClipsTypes'
import type { SavedClip } from './savedClipsTypes'
import { SavedClipWaveform } from './SavedClipWaveform'
import { useCoverTintHsl } from './useCoverTintHsl'
import { useSavedClipRailCentered } from './useSavedClipRailCentered'
import './savedClipCard.css'

const ART_HEIGHT = 132

function parseTintHsl(tint: string): { h: string; s: string } {
  const match = tint.match(/^([\d.]+)\s+([\d.]+)%/)
  if (!match) return { h: '220', s: '30%' }
  return { h: match[1], s: `${match[2]}%` }
}

export type SavedClipCardProps = {
  clip: SavedClip
  railRef?: RefObject<HTMLElement | null>
  layout?: 'rail' | 'grid'
  onPlay: (clip: SavedClip) => void
  onUnsave: (clipId: string) => void
}

const BookmarkFilledIcon = () => (
  <svg className="saved-clip-card__bookmark-icon" viewBox="0 0 16 16" aria-hidden>
    <path
      d="M4 2.5h8a1 1 0 0 1 1 1v10.2c0 .8-.9 1.3-1.6.9L8 12.5 4.6 14.6A1 1 0 0 1 3 13.7V3.5a1 1 0 0 1 1-1z"
      fill="currentColor"
    />
  </svg>
)

export default function SavedClipCard({
  clip,
  railRef,
  layout = 'rail',
  onPlay,
  onUnsave,
}: SavedClipCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const artWrapRef = useRef<HTMLSpanElement>(null)
  const [artSize, setArtSize] = useState({ width: 132, height: ART_HEIGHT })
  const prefersReducedMotion = useReducedMotion()
  const coverTint = useCoverTintHsl(clip.coverSrc)
  const { h, s } = parseTintHsl(coverTint)
  const tintStyle = {
    '--saved-card-h': h,
    '--saved-card-s': s,
  } as CSSProperties

  const isCentered = useSavedClipRailCentered(
    railRef ?? { current: null },
    cardRef,
    layout === 'rail' && Boolean(railRef) && !prefersReducedMotion,
  )
  const waveformActive = layout === 'rail' && isCentered && !prefersReducedMotion
  const allowMotion = !prefersReducedMotion

  useEffect(() => {
    const element = artWrapRef.current
    if (!element) return

    const measure = () => {
      setArtSize({
        width: element.clientWidth,
        height: element.clientHeight,
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const handleCardClick = () => {
    onPlay(clip)
  }

  const handleUnsave = (event: React.MouseEvent) => {
    event.stopPropagation()
    onUnsave(clip.id)
  }

  return (
    <article
      ref={cardRef}
      className={`saved-clip-card saved-clip-card--${layout}${
        prefersReducedMotion ? ' saved-clip-card--reduced-motion' : ''
      }`}
    >
      <motion.button
        type="button"
        className="saved-clip-card__hit"
        style={tintStyle}
        onClick={handleCardClick}
        aria-label={`Play saved moment from ${clip.showName}: ${clip.sentenceBefore}`}
        whileTap={allowMotion ? { scale: 0.97 } : undefined}
        transition={pressSpring}
      >
        <span ref={artWrapRef} className="saved-clip-card__art-wrap">
          <img
            src={clip.coverSrc}
            alt=""
            className="saved-clip-card__art"
            width={132}
            height={ART_HEIGHT}
          />
          <SavedClipWaveform active={waveformActive} />
          <FeedCardRadialProgress
            progress={clip.clipProgress}
            artWidth={artSize.width}
            artHeight={artSize.height}
          />
        </span>

        <span className="saved-clip-card__body">
          <span className="saved-clip-card__quote">{clip.sentenceBefore}</span>
          <span className="saved-clip-card__meta">
            <span className="saved-clip-card__meta-primary">
              <span className="saved-clip-card__show">{clip.showName}</span>
              <span className="saved-clip-card__episode">{clip.episodeTitle}</span>
            </span>
            <time className="saved-clip-card__date" dateTime={clip.savedAt}>
              {formatRelativeSaveDate(clip.savedAt)}
            </time>
          </span>
        </span>
      </motion.button>

      <button
        type="button"
        className="saved-clip-card__unsave"
        onClick={handleUnsave}
        aria-label="Remove from saved"
      >
        <BookmarkFilledIcon />
      </button>
    </article>
  )
}
