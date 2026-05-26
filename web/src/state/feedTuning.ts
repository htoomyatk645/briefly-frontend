import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PODCAST_COVERS } from '../data/podcastCatalog'

export type TopicWeight = 'less' | 'default' | 'more'

export type TuneTopic = {
  id: string
  label: string
  clipCount: number
}

export type MutedTopicItem = {
  kind: 'topic'
  id: string
  label: string
}

export type MutedShowItem = {
  kind: 'show'
  id: string
  name: string
  coverSrc: string
}

export type MutedItem = MutedTopicItem | MutedShowItem

export const TUNE_TOPICS: TuneTopic[] = [
  { id: 'ai', label: 'AI & Machine Learning', clipCount: 14 },
  { id: 'science', label: 'Science', clipCount: 9 },
  { id: 'mental-health', label: 'Mental Health', clipCount: 7 },
  { id: 'politics', label: 'Politics', clipCount: 6 },
  { id: 'startups', label: 'Startups', clipCount: 5 },
  { id: 'sleep', label: 'Sleep', clipCount: 4 },
  { id: 'history', label: 'History', clipCount: 3 },
  { id: 'true-crime', label: 'True Crime', clipCount: 2 },
]

const DEFAULT_MUTED: MutedItem[] = [
  { kind: 'topic', id: 'muted-crypto', label: 'Crypto' },
  {
    kind: 'show',
    id: 'crime-junkie',
    name: 'Crime Junkie',
    coverSrc: PODCAST_COVERS.crimeJunkie,
  },
  {
    kind: 'show',
    id: 'my-favorite-murder',
    name: 'My Favorite Murder',
    coverSrc: PODCAST_COVERS.myFavoriteMurder,
  },
]

const SNOOZE_MS = 30 * 24 * 60 * 60 * 1000
type SnackbarState = {
  message: string
  durationMs: number
} | null

type FeedTuningState = {
  hasListeningSignal: boolean
  snoozeUntil: number | null
  topicWeights: Record<string, TopicWeight>
  mutedItems: MutedItem[]
  savedToastKey: number
  snackbar: SnackbarState
  _hasHydrated: boolean

  setHasHydrated: (value: boolean) => void
  setSnoozeActive: (active: boolean) => void
  resumeSnoozeNow: () => void
  setTopicWeight: (topicId: string, weight: TopicWeight) => void
  hideTopic: (topicId: string, label: string) => void
  unmuteItem: (key: string) => void
  resetPersonalization: () => void
  showSnackbar: (message: string, durationMs?: number) => void
  clearSnackbar: () => void
  bumpSavedToast: () => void
}

function createDefaultTopicWeights(): Record<string, TopicWeight> {
  return Object.fromEntries(TUNE_TOPICS.map((topic) => [topic.id, 'default' as TopicWeight]))
}

let snackbarTimer: number | undefined

function scheduleSnackbar(
  get: () => FeedTuningState,
  set: (partial: Partial<FeedTuningState>) => void,
  message: string,
  durationMs: number,
) {
  if (snackbarTimer != null) {
    window.clearTimeout(snackbarTimer)
  }
  set({ snackbar: { message, durationMs } })
  snackbarTimer = window.setTimeout(() => {
    if (get().snackbar?.message === message) {
      set({ snackbar: null })
    }
    snackbarTimer = undefined
  }, durationMs)
}

export const useFeedTuningStore = create<FeedTuningState>()(
  persist(
    (set, get) => ({
      hasListeningSignal: true,
      snoozeUntil: null,
      topicWeights: createDefaultTopicWeights(),
      mutedItems: [...DEFAULT_MUTED],
      savedToastKey: 0,
      snackbar: null,
      _hasHydrated: false,

      setHasHydrated: (value) => set({ _hasHydrated: value }),

      setSnoozeActive: (active) => {
        const wasActive = get().snoozeUntil != null && get().snoozeUntil! > Date.now()
        if (active) {
          set({ snoozeUntil: Date.now() + SNOOZE_MS })
          scheduleSnackbar(
            get,
            set,
            'Recommendations paused for 30 days.',
            2400,
          )
        } else if (wasActive) {
          set({ snoozeUntil: null })
          scheduleSnackbar(get, set, 'Recommendations resumed.', 2400)
        } else {
          set({ snoozeUntil: null })
        }
        get().bumpSavedToast()
      },

      resumeSnoozeNow: () => {
        set({ snoozeUntil: null })
        scheduleSnackbar(get, set, 'Recommendations resumed.', 2400)
        get().bumpSavedToast()
      },

      setTopicWeight: (topicId, weight) => {
        set({
          topicWeights: { ...get().topicWeights, [topicId]: weight },
        })
        get().bumpSavedToast()
      },

      hideTopic: (topicId, label) => {
        const exists = get().mutedItems.some(
          (item) => item.kind === 'topic' && item.label === label,
        )
        if (exists) return

        set({
          mutedItems: [
            ...get().mutedItems,
            { kind: 'topic', id: `muted-${topicId}`, label },
          ],
          topicWeights: { ...get().topicWeights, [topicId]: 'default' },
        })
        get().bumpSavedToast()
      },

      unmuteItem: (key) => {
        set({
          mutedItems: get().mutedItems.filter((item) => mutedItemKey(item) !== key),
        })
        get().bumpSavedToast()
      },

      resetPersonalization: () => {
        set({
          topicWeights: createDefaultTopicWeights(),
          mutedItems: [],
          snoozeUntil: null,
        })
        scheduleSnackbar(
          get,
          set,
          "Feed reset. We'll relearn from your next listens.",
          3000,
        )
        get().bumpSavedToast()
      },

      showSnackbar: (message, durationMs = 2400) => {
        scheduleSnackbar(get, set, message, durationMs)
      },

      clearSnackbar: () => {
        if (snackbarTimer != null) {
          window.clearTimeout(snackbarTimer)
          snackbarTimer = undefined
        }
        set({ snackbar: null })
      },

      bumpSavedToast: () => set({ savedToastKey: Date.now() }),
    }),
    {
      name: 'briefly:feed-tuning',
      partialize: (state) => ({
        hasListeningSignal: state.hasListeningSignal,
        snoozeUntil: state.snoozeUntil,
        topicWeights: state.topicWeights,
        mutedItems: state.mutedItems,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    },
  ),
)

export function mutedItemKey(item: MutedItem): string {
  return item.kind === 'topic' ? `topic:${item.id}` : `show:${item.id}`
}

export function isSnoozeActive(snoozeUntil: number | null): boolean {
  return snoozeUntil != null && snoozeUntil > Date.now()
}

export function formatSnoozeResumeDate(snoozeUntil: number): string {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(snoozeUntil))
}

useFeedTuningStore.persist.onFinishHydration(() => {
  useFeedTuningStore.setState({ _hasHydrated: true })
})

export const useFeedTuningHydrated = () =>
  useFeedTuningStore((state) => state._hasHydrated)
