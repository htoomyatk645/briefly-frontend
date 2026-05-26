export type SavedClip = {
  id: string
  episodeId: string
  showName: string
  episodeTitle: string
  coverSrc: string
  sentenceBefore: string
  /** Progress within the highlight clip (0–1) for the radial arc */
  clipProgress: number
  /** Seek position when opening from Library */
  momentOffsetSeconds: number
  savedAt: string
}

export type ClipMoment = {
  episodeId: string
  seekSeconds: number
}

export function formatRelativeSaveDate(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diffMs = now - then
  const days = Math.floor(diffMs / 86_400_000)

  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
  }
  const months = Math.floor(days / 30)
  return months === 1 ? '1 month ago' : `${months} months ago`
}
