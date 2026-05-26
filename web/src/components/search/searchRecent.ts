export const SEARCH_RECENT_STORAGE_KEY = 'briefly:search:recent'

export const SEARCH_RECENT_MAX = 5

export function readRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(SEARCH_RECENT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .slice(0, SEARCH_RECENT_MAX)
  } catch {
    return []
  }
}

export function writeRecentSearches(queries: string[]): void {
  if (typeof window === 'undefined') return
  const trimmed = queries
    .map((q) => q.trim())
    .filter(Boolean)
    .slice(0, SEARCH_RECENT_MAX)
  window.localStorage.setItem(SEARCH_RECENT_STORAGE_KEY, JSON.stringify(trimmed))
}

export function removeRecentSearch(query: string): void {
  const next = readRecentSearches().filter((item) => item !== query)
  writeRecentSearches(next)
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SEARCH_RECENT_STORAGE_KEY)
}
