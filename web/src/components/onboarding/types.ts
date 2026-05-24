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
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'ai-future', label: 'AI & Future' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'true-crime', label: 'True Crime' },
  { id: 'news', label: 'News & Politics' },
  { id: 'science', label: 'Science' },
  { id: 'education', label: 'Education' },
  { id: 'finance', label: 'Finance' },
  { id: 'comedy', label: 'Comedy' },
  { id: 'culture', label: 'Culture & Society' },
  { id: 'history', label: 'History' },
  { id: 'self-improvement', label: 'Self Improvement' },
] as const
