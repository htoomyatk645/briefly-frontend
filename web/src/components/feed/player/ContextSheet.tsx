import type { EpisodeContext } from '../episodeContextData'
import { BottomSheet } from './BottomSheet'
import { EpisodeContextContent } from './EpisodeContextContent'

type ContextSheetProps = {
  open: boolean
  context: EpisodeContext | null
  onClose: () => void
}

export const ContextSheet = ({ open, context, onClose }: ContextSheetProps) => (
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
