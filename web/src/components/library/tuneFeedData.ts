import type { TuneTopic } from './tuneFeedTypes'

export const TUNE_FEED_TOPICS: TuneTopic[] = [
  { id: 'ai', label: 'AI & Machine Learning', recentClips: 14 },
  { id: 'science', label: 'Science', recentClips: 9 },
  { id: 'mental-health', label: 'Mental Health', recentClips: 7 },
  { id: 'politics', label: 'Politics', recentClips: 6 },
  { id: 'startups', label: 'Startups', recentClips: 5 },
  { id: 'sleep', label: 'Sleep', recentClips: 4 },
  { id: 'history', label: 'History', recentClips: 3 },
  { id: 'true-crime', label: 'True Crime', recentClips: 2 },
]

export const DEFAULT_MUTED_TOPICS = ['Crypto']
export const DEFAULT_MUTED_SHOWS = [
  { id: 'crime-junkie', name: 'Crime Junkie' },
  { id: 'my-favorite-murder', name: 'My Favorite Murder' },
]
