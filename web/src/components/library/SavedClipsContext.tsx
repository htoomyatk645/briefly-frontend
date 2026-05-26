import { createContext, useContext, type ReactNode } from 'react'
import { useSavedClips } from './useSavedClips'
import type { ClipMoment, SavedClip } from './savedClipsTypes'

export type SavedClipsContextValue = ReturnType<typeof useSavedClips> & {
  onPlayClip: (clip: SavedClip) => void
}

const SavedClipsContext = createContext<SavedClipsContextValue | null>(null)

export type SavedClipsProviderProps = {
  children: ReactNode
  onPlayClip: (moment: ClipMoment) => void
}

export function SavedClipsProvider({ children, onPlayClip }: SavedClipsProviderProps) {
  const saved = useSavedClips()

  const value: SavedClipsContextValue = {
    ...saved,
    onPlayClip: (clip) => {
      onPlayClip({
        episodeId: clip.episodeId,
        seekSeconds: clip.momentOffsetSeconds,
      })
    },
  }

  return (
    <SavedClipsContext.Provider value={value}>{children}</SavedClipsContext.Provider>
  )
}

export function useSavedClipsContext(): SavedClipsContextValue {
  const ctx = useContext(SavedClipsContext)
  if (!ctx) {
    throw new Error('useSavedClipsContext must be used within SavedClipsProvider')
  }
  return ctx
}
