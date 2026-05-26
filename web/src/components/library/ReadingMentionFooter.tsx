import type { MouseEvent } from 'react'
import { IconPlay } from './icons'

export type ReadingMentionFooterProps = {
  hostLabel: string
  isPreviewOpen?: boolean
  onHearMention: () => void
}

export function ReadingMentionFooter({
  hostLabel,
  isPreviewOpen = false,
  onHearMention,
}: ReadingMentionFooterProps) {
  const handlePlayClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onHearMention()
  }

  return (
    <div className="reading-card__footer">
      <button
        type="button"
        className="reading-card__play"
        onClick={handlePlayClick}
        aria-label="Hear it mentioned"
        aria-expanded={isPreviewOpen}
      >
        <IconPlay />
      </button>
      <span className="reading-card__mention-label">{hostLabel}</span>
    </div>
  )
}
