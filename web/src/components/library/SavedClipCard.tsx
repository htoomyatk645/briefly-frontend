import { useReducedMotion } from 'framer-motion'
import { useRef, type RefObject } from 'react'
import { FeedCardRadialProgress } from '../feed/FeedCardRadialProgress'
import { formatRelativeSaveDate } from './savedClipsTypes'
import type { SavedClip } from './savedClipsTypes'
import { SavedClipWaveform } from './SavedClipWaveform'
import { useSavedClipRailCentered } from './useSavedClipRailCentered'
import './savedClipCard.css'

const COVER_SIZE = 64

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
  const prefersReducedMotion = useReducedMotion()
  const isCentered = useSavedClipRailCentered(
    railRef ?? { current: null },
    cardRef,
    layout === 'rail' && Boolean(railRef) && !prefersReducedMotion,
  )
  const waveformActive = layout === 'rail' && isCentered && !prefersReducedMotion

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
        isRemoving ? ' saved-clip-card--removing' : ''
      }${prefersReducedMotion ? ' saved-clip-card--reduced-motion' : ''}`}
      data-removing={isRemoving || undefined}
    >
      <button
        type="button"
        className="saved-clip-card__hit"
        onClick={handleCardClick}
        aria-label={`Play saved moment from ${clip.showName}: ${clip.sentenceBefore}`}
      >
        <div className="saved-clip-card__top">
          <span className="saved-clip-card__cover-wrap">
            <img
              src={clip.coverSrc}
              alt=""
              className="saved-clip-card__cover"
              width={COVER_SIZE}
              height={COVER_SIZE}
            />
            <span className="saved-clip-card__cover-warmth" aria-hidden />
            <SavedClipWaveform active={waveformActive} />
            <FeedCardRadialProgress
              progress={clip.clipProgress}
              artWidth={COVER_SIZE}
              artHeight={COVER_SIZE}
            />
          </span>
        </div>

        <p className="saved-clip-card__quote">{clip.sentenceBefore}</p>

        <div className="saved-clip-card__meta">
          <div className="saved-clip-card__meta-primary">
            <span className="saved-clip-card__show">{clip.showName}</span>
            <span className="saved-clip-card__episode">{clip.episodeTitle}</span>
          </div>
          <time className="saved-clip-card__date" dateTime={clip.savedAt}>
            {formatRelativeSaveDate(clip.savedAt)}
          </time>
        </div>
      </button>

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
