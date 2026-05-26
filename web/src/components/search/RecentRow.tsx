import { useCallback, useRef } from 'react'

export type RecentRowProps = {
  queries: string[]
  loading?: boolean
  onSelect: (query: string) => void
  onRemove: (query: string) => void
  onClearAll: () => void
}

const LONG_PRESS_MS = 500

export function RecentRow({
  queries,
  loading = false,
  onSelect,
  onRemove,
  onClearAll,
}: RecentRowProps) {
  const longPressTimer = useRef<number | null>(null)

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current != null) {
      window.clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }, [])

  const handleLabelPointerDown = useCallback(() => {
    cancelLongPress()
    longPressTimer.current = window.setTimeout(() => {
      onClearAll()
      longPressTimer.current = null
    }, LONG_PRESS_MS)
  }, [cancelLongPress, onClearAll])

  if (loading) {
    return (
      <section className="search-recent" aria-busy="true" aria-label="Recent searches">
        <p className="search-recent__label">Recent</p>
        <div className="search-recent__chips" role="list">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="search-recent__chip search-recent__chip--skeleton"
              role="listitem"
              aria-hidden
            />
          ))}
        </div>
      </section>
    )
  }

  if (queries.length === 0) {
    return null
  }

  return (
    <section className="search-recent" aria-label="Recent searches">
      <p
        className="search-recent__label"
        onPointerDown={handleLabelPointerDown}
        onPointerUp={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onPointerCancel={cancelLongPress}
      >
        Recent
      </p>
      <div className="search-recent__chips" role="list">
        {queries.map((query) => (
          <div key={query} className="search-recent__chip-wrap" role="listitem">
            <button
              type="button"
              className="search-recent__chip"
              onClick={() => onSelect(query)}
            >
              {query}
            </button>
            <button
              type="button"
              className="search-recent__chip-dismiss"
              aria-label={`Remove ${query} from recent searches`}
              onClick={(event) => {
                event.stopPropagation()
                onRemove(query)
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
