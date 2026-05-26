import { BottomSheet, useBodyScrollLock } from '../feed/player/BottomSheet'
import type { EpisodeContext } from '../feed/episodeContextData'
import { EpisodeContextContent } from '../feed/player/EpisodeContextContent'

export type ContextDetailSheetProps = {
  context: EpisodeContext | null
  open: boolean
  onClose: () => void
}

export function ContextDetailSheet({ context, open, onClose }: ContextDetailSheetProps) {
  useBodyScrollLock(open)

  return (
    <BottomSheet
      open={open}
      title="Context"
      onClose={onClose}
      size="half"
      className="player-sheet--context"
    >
      {context ? (
        <EpisodeContextContent context={context} />
      ) : (
        <p className="player-sheet__empty">No context is available for this episode yet.</p>
      )}
    </BottomSheet>
  )
}
