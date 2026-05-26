import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchEmpty } from '../components/search/SearchEmpty'
import { SearchInput } from '../components/search/SearchInput'
import {
  readRecentSearches,
  removeRecentSearch,
  clearRecentSearches,
} from '../components/search/searchRecent'
import '../components/search/search.css'

export function Search() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [recentQueries, setRecentQueries] = useState<string[]>(() => readRecentSearches())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  const commitQuery = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return
      const params = new URLSearchParams({ q: trimmed })
      navigate(`/search?${params.toString()}`)
    },
    [navigate],
  )

  const handleSubmit = useCallback(() => {
    commitQuery(query)
  }, [commitQuery, query])

  const handleRecentSelect = useCallback(
    (value: string) => {
      setQuery(value)
      commitQuery(value)
    },
    [commitQuery],
  )

  const handleRecentRemove = useCallback((value: string) => {
    removeRecentSearch(value)
    setRecentQueries(readRecentSearches())
  }, [])

  const handleRecentClearAll = useCallback(() => {
    clearRecentSearches()
    setRecentQueries([])
  }, [])

  const handleTrendingSelect = useCallback(
    (value: string) => {
      setQuery(value)
      commitQuery(value)
    },
    [commitQuery],
  )

  const handleMoodSelect = useCallback(
    (moodQuery: string) => {
      const params = new URLSearchParams({ q: moodQuery })
      navigate(`/search?${params.toString()}`)
    },
    [navigate],
  )

  return (
    <div className="search-page">
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        inputRef={inputRef}
      />
      <SearchEmpty
        recentQueries={recentQueries}
        loading={isLoading}
        onRecentSelect={handleRecentSelect}
        onRecentRemove={handleRecentRemove}
        onRecentClearAll={handleRecentClearAll}
        onTrendingSelect={handleTrendingSelect}
        onMoodSelect={handleMoodSelect}
      />
    </div>
  )
}
