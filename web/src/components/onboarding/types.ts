export type OnboardingStep =
  | 'welcome'
  | 'signup'
  | 'profile'
  | 'interests'
  | 'networks'
  | 'habits'
  | 'import'

export type AgeGroup = 'over18' | 'under18'

export type UserProfile = {
  firstName: string
  lastName: string
  email: string
  ageGroup: AgeGroup | null
}

export const TOPIC_OPTIONS = [
  { id: 'podcasts', label: 'Podcasts', emoji: '🎧' },
  { id: 'technology', label: 'Technology', emoji: '🤖' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'ai-future', label: 'AI & Future', emoji: '🚀' },
  { id: 'health', label: 'Health & Wellness', emoji: '💪' },
  { id: 'true-crime', label: 'True Crime', emoji: '🔍' },
  { id: 'news', label: 'News & Politics', emoji: '📰' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'comedy', label: 'Comedy', emoji: '😂' },
  { id: 'culture', label: 'Culture & Society', emoji: '🌍' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'self-improvement', label: 'Self Improvement', emoji: '✨' },
] as const
