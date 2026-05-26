import { useCallback, useEffect, useRef, useState } from 'react'
import {
  readSavedClips,
  sortSavedClipsNewest,
  writeSavedClips,
} from './savedClipsStorage'
import type { SavedClip } from './savedClipsTypes'

const UNDO_MS = 5000

export type SavedClipsUndoState = {
  clip: SavedClip
  expiresAt: number
}

export function useSavedClips() {
  const [clips, setClips] = useState<SavedClip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [undo, setUndo] = useState<SavedClipsUndoState | null>(null)
  const undoTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setClips(sortSavedClipsNewest(readSavedClips()))
      setIsLoading(false)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const persist = useCallback((next: SavedClip[]) => {
    const sorted = sortSavedClipsNewest(next)
    setClips(sorted)
    writeSavedClips(sorted)
  }, [])

  const clearUndoTimer = useCallback(() => {
    if (undoTimerRef.current != null) {
      window.clearTimeout(undoTimerRef.current)
      undoTimerRef.current = null
    }
  }, [])

  const removeClip = useCallback(
    (clipId: string) => {
      const clip = clips.find((item) => item.id === clipId)
      if (!clip) return

      persist(clips.filter((item) => item.id !== clipId))
      clearUndoTimer()

      const expiresAt = Date.now() + UNDO_MS
      setUndo({ clip, expiresAt })
      undoTimerRef.current = window.setTimeout(() => {
        setUndo(null)
        undoTimerRef.current = null
      }, UNDO_MS)
    },
    [clips, clearUndoTimer, persist],
  )

  const undoRemove = useCallback(() => {
    if (!undo) return
    clearUndoTimer()
    persist([undo.clip, ...clips])
    setUndo(null)
  }, [undo, clips, clearUndoTimer, persist])

  useEffect(() => () => clearUndoTimer(), [clearUndoTimer])

  return {
    clips,
    isLoading,
    undo,
    removeClip,
    undoRemove,
    dismissUndo: () => {
      clearUndoTimer()
      setUndo(null)
    },
  }
}
