const categoryDefinitions = [
  { id: 'news', label: 'News', icon: 'newspaper' },
  { id: 'health', label: 'Health', icon: 'heart' },
  { id: 'business', label: 'Business', icon: 'trending-up' },
  { id: 'true-crime', label: 'True Crime', icon: 'alert-triangle' },
  { id: 'science', label: 'Science', icon: 'flask' },
  { id: 'comedy', label: 'Comedy', icon: 'laugh' },
  { id: 'technology', label: 'Technology', icon: 'cpu' },
  { id: 'society', label: 'Society', icon: 'users' },
] as const

export type CategoryId = (typeof categoryDefinitions)[number]['id']

export type BrowseCategoryIcon = (typeof categoryDefinitions)[number]['icon']

export type BrowseCategory = {
  id: CategoryId
  label: string
  icon: BrowseCategoryIcon
}

export const categories: BrowseCategory[] = categoryDefinitions.map((category) => ({
  id: category.id,
  label: category.label,
  icon: category.icon,
}))

export function getCategoryLabel(categoryId: CategoryId): string {
  const match = categoryDefinitions.find((category) => category.id === categoryId)
  return match?.label ?? categoryId
}

export function matchesCategoryId(
  categoryId: CategoryId,
  activeCategoryId: CategoryId | null,
): boolean {
  if (activeCategoryId === null) return true
  return categoryId === activeCategoryId
}

export function isCategoryId(id: string): id is CategoryId {
  return categoryDefinitions.some((category) => category.id === id)
}
