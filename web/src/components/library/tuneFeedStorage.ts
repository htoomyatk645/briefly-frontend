import { DEFAULT_MUTED_SHOWS, DEFAULT_MUTED_TOPICS, TUNE_FEED_TOPICS } from './tuneFeedData'
import type { TuneFeedPreferences } from './tuneFeedTypes'

const STORAGE_KEY = 'briefly:tune-feed-preferences'

export function createDefaultPreferences(): TuneFeedPreferences {
  const topicLevels: Record<string, number> = {}
  for (const topic of TUNE_FEED_TOPICS) {
    topicLevels[topic.id] = 0
  }

  return {
    topicLevels,
    mutedTopics: [...DEFAULT_MUTED_TOPICS],
    mutedShows: [...DEFAULT_MUTED_SHOWS],
    hasListeningSignal: true,
  }
}

export function loadTuneFeedPreferences(): TuneFeedPreferences {
  if (typeof window === 'undefined') {
    return createDefaultPreferences()
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createDefaultPreferences()

    const parsed = JSON.parse(raw) as Partial<TuneFeedPreferences>
    const defaults = createDefaultPreferences()

    return {
      topicLevels: { ...defaults.topicLevels, ...parsed.topicLevels },
      mutedTopics: Array.isArray(parsed.mutedTopics) ? parsed.mutedTopics : defaults.mutedTopics,
      mutedShows: Array.isArray(parsed.mutedShows) ? parsed.mutedShows : defaults.mutedShows,
      hasListeningSignal:
        typeof parsed.hasListeningSignal === 'boolean'
          ? parsed.hasListeningSignal
          : defaults.hasListeningSignal,
    }
  } catch {
    return createDefaultPreferences()
  }
}

export function saveTuneFeedPreferences(preferences: TuneFeedPreferences): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}
