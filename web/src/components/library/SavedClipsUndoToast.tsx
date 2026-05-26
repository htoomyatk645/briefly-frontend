import type { SavedClipsUndoState } from './useSavedClips'

export type SavedClipsUndoToastProps = {
  undo: SavedClipsUndoState | null
  onUndo: () => void
}

export function SavedClipsUndoToast({ undo, onUndo }: SavedClipsUndoToastProps) {
  if (!undo) return null

  return (
    <div className="saved-clips-toast" role="status">
      <span className="saved-clips-toast__text">Removed from Saved.</span>
      <button type="button" className="saved-clips-toast__undo" onClick={onUndo}>
        Undo
      </button>
    </div>
  )
}
