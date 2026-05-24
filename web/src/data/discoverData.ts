export type BrowseCategory = {
  id: string
  label: string
  icon:
    | 'newspaper'
    | 'heart'
    | 'trending-up'
    | 'alert-triangle'
    | 'flask'
    | 'laugh'
    | 'cpu'
    | 'users'
}

export const categories: BrowseCategory[] = [
  { id: 'news', label: 'News', icon: 'newspaper' },
  { id: 'health', label: 'Health', icon: 'heart' },
  { id: 'business', label: 'Business', icon: 'trending-up' },
  { id: 'true-crime', label: 'True Crime', icon: 'alert-triangle' },
  { id: 'science', label: 'Science', icon: 'flask' },
  { id: 'comedy', label: 'Comedy', icon: 'laugh' },
  { id: 'technology', label: 'Technology', icon: 'cpu' },
  { id: 'society', label: 'Society', icon: 'users' },
]
