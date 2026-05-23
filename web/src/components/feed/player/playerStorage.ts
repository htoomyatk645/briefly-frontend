const SPEED_KEY = 'briefly-playback-speed'
const SAVED_KEY = 'briefly-saved-episodes'
const FOLLOWED_KEY = 'briefly-followed-shows'

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] as const
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number]

export function readPlaybackSpeed(): PlaybackSpeed {
  try {
    const raw = localStorage.getItem(SPEED_KEY)
    const n = raw ? Number(raw) : 1
    return PLAYBACK_SPEEDS.includes(n as PlaybackSpeed) ? (n as PlaybackSpeed) : 1
  } catch {
    return 1
  }
}

export function writePlaybackSpeed(speed: PlaybackSpeed): void {
  try {
    localStorage.setItem(SPEED_KEY, String(speed))
  } catch {
    /* ignore */
  }
}

export function readSavedEpisodeIds(): Set<string> {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

export function writeSavedEpisodeIds(ids: Set<string>): void {
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
}

export function readFollowedShowIds(): Set<string> {
  try {
    const raw = localStorage.getItem(FOLLOWED_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

export function writeFollowedShowIds(ids: Set<string>): void {
  try {
    localStorage.setItem(FOLLOWED_KEY, JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
}
