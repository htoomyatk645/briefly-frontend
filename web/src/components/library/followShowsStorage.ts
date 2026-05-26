const FOLLOWED_SHOWS_KEY = 'briefly-followed-shows'

export function readFollowedShowIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(FOLLOWED_SHOWS_KEY)
    if (!raw) return new Set(['show-huberman', 'show-wsj'])
    const parsed = JSON.parse(raw) as string[]
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

export function writeFollowedShowIds(ids: Set<string>): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(FOLLOWED_SHOWS_KEY, JSON.stringify([...ids]))
}
