import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { TUNE_FEED_TOPICS } from './tuneFeedData'
import {
  createDefaultPreferences,
  loadTuneFeedPreferences,
  saveTuneFeedPreferences,
} from './tuneFeedStorage'
import { TuneFeedSavedToast } from './TuneFeedSavedToast'
import type { TuneFeedPreferences } from './tuneFeedTypes'
import { TUNE_LEVEL_MAX, TUNE_LEVEL_MIN } from './tuneFeedTypes'

type TuneFeedPreferencesContextValue = {
  isLoading: boolean
  preferences: TuneFeedPreferences
  topics: typeof TUNE_FEED_TOPICS
  savedToastVisible: boolean
  setTopicLevel: (topicId: string, level: number) => void
  unmuteTopic: (name: string) => void
  unmuteShow: (showId: string) => void
  resetToDefaults: () => void
}

const TuneFeedPreferencesContext = createContext<TuneFeedPreferencesContextValue | null>(
  null,
)

const SAVED_TOAST_MS = 1600

export function TuneFeedPreferencesProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [preferences, setPreferences] = useState<TuneFeedPreferences>(createDefaultPreferences)
  const [savedToastVisible, setSavedToastVisible] = useState(false)
  const toastTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPreferences(loadTuneFeedPreferences())
      setIsLoading(false)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const showSavedToast = useCallback(() => {
    setSavedToastVisible(true)
    if (toastTimeoutRef.current != null) {
      window.clearTimeout(toastTimeoutRef.current)
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setSavedToastVisible(false)
      toastTimeoutRef.current = null
    }, SAVED_TOAST_MS)
  }, [])

  const persist = useCallback(
    (updater: (prev: TuneFeedPreferences) => TuneFeedPreferences) => {
      setPreferences((prev) => {
        const next = updater(prev)
        saveTuneFeedPreferences(next)
        return next
      })
      showSavedToast()
    },
    [showSavedToast],
  )

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current != null) {
        window.clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  const setTopicLevel = useCallback(
    (topicId: string, level: number) => {
      const clamped = Math.min(TUNE_LEVEL_MAX, Math.max(TUNE_LEVEL_MIN, level))
      persist((prev) => ({
        ...prev,
        topicLevels: { ...prev.topicLevels, [topicId]: clamped },
      }))
    },
    [persist],
  )

  const unmuteTopic = useCallback(
    (name: string) => {
      persist((prev) => ({
        ...prev,
        mutedTopics: prev.mutedTopics.filter((topic) => topic !== name),
      }))
    },
    [persist],
  )

  const unmuteShow = useCallback(
    (showId: string) => {
      persist((prev) => ({
        ...prev,
        mutedShows: prev.mutedShows.filter((show) => show.id !== showId),
      }))
    },
    [persist],
  )

  const resetToDefaults = useCallback(() => {
    persist(() => createDefaultPreferences())
  }, [persist])

  const value = useMemo(
    () => ({
      isLoading,
      preferences,
      topics: TUNE_FEED_TOPICS,
      savedToastVisible,
      setTopicLevel,
      unmuteTopic,
      unmuteShow,
      resetToDefaults,
    }),
    [
      isLoading,
      preferences,
      savedToastVisible,
      setTopicLevel,
      unmuteTopic,
      unmuteShow,
      resetToDefaults,
    ],
  )

  return (
    <TuneFeedPreferencesContext.Provider value={value}>
      {children}
      <TuneFeedSavedToast visible={savedToastVisible} />
    </TuneFeedPreferencesContext.Provider>
  )
}

export function useTuneFeedPreferences(): TuneFeedPreferencesContextValue {
  const ctx = useContext(TuneFeedPreferencesContext)
  if (!ctx) {
    throw new Error('useTuneFeedPreferences must be used within TuneFeedPreferencesProvider')
  }
  return ctx
}
