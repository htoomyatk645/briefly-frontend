import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InlineResults } from '../components/search/InlineResults'
import { SearchEmpty } from '../components/search/SearchEmpty'
import { SearchInput } from '../components/search/SearchInput'
import {
  readRecentSearches,
  removeRecentSearch,
  clearRecentSearches,
} from '../components/search/searchRecent'
import {
  useDebouncedClipSearch,
  type SearchIndexEntry,
} from '../components/search/useSearchIndex'
import '../components/search/search.css'

export type SearchProps = {
  onPlayClip: (episodeId: string, seekSeconds?: number) => void
}

export function Search({ onPlayClip }: SearchProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [recentQueries, setRecentQueries] = useState<string[]>(() => readRecentSearches())
  const [isLoading, setIsLoading] = useState(true)

  const isTyping = query.trim().length > 0
  const { previewMatches, totalCount, isPending } = useDebouncedClipSearch(query, 120)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  const commitQuery = useCallback(
    (raw: string, options?: { fromMic?: boolean }) => {
      const trimmed = raw.trim()
      if (!trimmed) return
      const params = new URLSearchParams({ q: trimmed })
      if (options?.fromMic) {
        params.set('from', 'mic')
      }
      navigate(`/search?${params.toString()}`)
    },
    [navigate],
  )

  const handleSubmit = useCallback(() => {
    commitQuery(query)
  }, [commitQuery, query])

  const handleVoiceCommit = useCallback(
    (transcript: string) => {
      commitQuery(transcript, { fromMic: true })
    },
    [commitQuery],
  )

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

  const handlePlayClip = useCallback(
    (entry: SearchIndexEntry) => {
      onPlayClip(entry.feedEpisodeId, entry.startSeconds)
    },
    [onPlayClip],
  )

  const handleOpenClip = useCallback(
    (entry: SearchIndexEntry) => {
      onPlayClip(entry.feedEpisodeId, entry.startSeconds)
    },
    [onPlayClip],
  )

  return (
    <div className="search-page">
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        onVoiceCommit={handleVoiceCommit}
        inputRef={inputRef}
      />
      {isTyping ? (
        <InlineResults
          matches={previewMatches}
          totalCount={totalCount}
          isPending={isPending}
          query={query}
          onPlay={handlePlayClip}
          onOpenClip={handleOpenClip}
          onSeeAll={handleSubmit}
        />
      ) : null}
      <SearchEmpty
        recentQueries={recentQueries}
        loading={isLoading}
        isTyping={isTyping}
        onRecentSelect={handleRecentSelect}
        onRecentRemove={handleRecentRemove}
        onRecentClearAll={handleRecentClearAll}
        onTrendingSelect={handleTrendingSelect}
        onMoodSelect={handleMoodSelect}
      />
    </div>
  )
}
