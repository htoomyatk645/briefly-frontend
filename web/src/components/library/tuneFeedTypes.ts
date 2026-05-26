export type TuneTopic = {
  id: string
  label: string
  recentClips: number
}

export type MutedShow = {
  id: string
  name: string
}

export type TuneFeedPreferences = {
  topicLevels: Record<string, number>
  mutedTopics: string[]
  mutedShows: MutedShow[]
  hasListeningSignal: boolean
}

export const TUNE_LEVEL_MIN = -2
export const TUNE_LEVEL_MAX = 2
export const TUNE_LEVEL_STEP = 1

export const TUNE_LEVEL_LABELS: Record<number, string> = {
  [-2]: 'Much less',
  [-1]: 'Less',
  0: 'Default',
  1: 'More',
  2: 'Much more',
}

export function tuneLevelAriaText(value: number): string {
  return TUNE_LEVEL_LABELS[value] ?? 'Default'
}
