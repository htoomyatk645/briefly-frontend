export type LibraryPageStatus = 'loading' | 'empty' | 'ready'

export function useLibraryPageState(): LibraryPageStatus {
  if (typeof window === 'undefined') return 'ready'

  const override = new URLSearchParams(window.location.search).get('libraryState')
  if (override === 'loading' || override === 'empty' || override === 'ready') {
    return override
  }

  return 'ready'
}
