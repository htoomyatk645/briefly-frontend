export type InterestTopic = {
  id: string
  label: string
}

export type InterestGroup = {
  id: string
  title: string
  emoji: string
  topics: InterestTopic[]
}

export const INTEREST_GROUPS: InterestGroup[] = [
  {
    id: 'news-politics',
    title: 'News & Politics',
    emoji: '📰',
    topics: [
      { id: 'breaking-news', label: 'Breaking News' },
      { id: 'politics', label: 'Politics' },
      { id: 'world-affairs', label: 'World Affairs' },
      { id: 'journalism', label: 'Journalism' },
      { id: 'opinion', label: 'Opinion' },
    ],
  },
  {
    id: 'tech-science',
    title: 'Tech & Science',
    emoji: '🔬',
    topics: [
      { id: 'ai', label: 'AI & Machine Learning' },
      { id: 'startups', label: 'Startups' },
      { id: 'software-dev', label: 'Software Dev' },
      { id: 'gadgets', label: 'Gadgets' },
      { id: 'science', label: 'Science' },
      { id: 'space', label: 'Space' },
      { id: 'climate', label: 'Climate' },
    ],
  },
  {
    id: 'business-finance',
    title: 'Business & Finance',
    emoji: '💼',
    topics: [
      { id: 'entrepreneurship', label: 'Entrepreneurship' },
      { id: 'investing', label: 'Investing' },
      { id: 'crypto', label: 'Crypto' },
      { id: 'real-estate', label: 'Real Estate' },
      { id: 'personal-finance', label: 'Personal Finance' },
      { id: 'economics', label: 'Economics' },
    ],
  },
  {
    id: 'culture-society',
    title: 'Culture & Society',
    emoji: '🌍',
    topics: [
      { id: 'pop-culture', label: 'Pop Culture' },
      { id: 'relationships', label: 'Relationships' },
      { id: 'philosophy', label: 'Philosophy' },
      { id: 'psychology', label: 'Psychology' },
      { id: 'social-issues', label: 'Social Issues' },
    ],
  },
  {
    id: 'true-crime-mystery',
    title: 'True Crime & Mystery',
    emoji: '🔍',
    topics: [
      { id: 'true-crime', label: 'True Crime' },
      { id: 'cold-cases', label: 'Cold Cases' },
      { id: 'investigations', label: 'Investigations' },
      { id: 'forensics', label: 'Forensics' },
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    emoji: '🎬',
    topics: [
      { id: 'comedy', label: 'Comedy' },
      { id: 'movies', label: 'Movies' },
      { id: 'tv-shows', label: 'TV Shows' },
      { id: 'music', label: 'Music' },
      { id: 'gaming', label: 'Gaming' },
      { id: 'celebrity', label: 'Celebrity' },
    ],
  },
  {
    id: 'health-wellness',
    title: 'Health & Wellness',
    emoji: '💪',
    topics: [
      { id: 'fitness', label: 'Fitness' },
      { id: 'mental-health', label: 'Mental Health' },
      { id: 'nutrition', label: 'Nutrition' },
      { id: 'meditation', label: 'Meditation' },
      { id: 'sleep', label: 'Sleep' },
    ],
  },
  {
    id: 'education-learning',
    title: 'Education & Learning',
    emoji: '📚',
    topics: [
      { id: 'history', label: 'History' },
      { id: 'languages', label: 'Languages' },
      { id: 'self-improvement', label: 'Self Improvement' },
      { id: 'productivity', label: 'Productivity' },
      { id: 'books', label: 'Books & Reading' },
    ],
  },
  {
    id: 'sports',
    title: 'Sports',
    emoji: '⚽',
    topics: [
      { id: 'football', label: 'Football' },
      { id: 'basketball', label: 'Basketball' },
      { id: 'soccer', label: 'Soccer' },
      { id: 'fantasy-sports', label: 'Fantasy Sports' },
      { id: 'mma', label: 'MMA & Boxing' },
    ],
  },
  {
    id: 'arts-design',
    title: 'Arts & Design',
    emoji: '🎨',
    topics: [
      { id: 'art-inspiration', label: 'Art Inspiration' },
      { id: 'photography', label: 'Photography' },
      { id: 'design', label: 'Design' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'storytelling', label: 'Storytelling' },
    ],
  },
]

export const MIN_INTEREST_SELECTIONS = 3
