import type { SearchShowHit } from './searchResultsUtils'

export type ShowsScrollerProps = {
  shows: SearchShowHit[]
  loading?: boolean
  onShowSelect?: (showId: string) => void
}

export function ShowsScroller({
  shows,
  loading = false,
  onShowSelect,
}: ShowsScrollerProps) {
  if (loading) {
    return (
      <div className="search-shows-scroller search-shows-scroller--loading" aria-hidden>
        <div className="search-shows-scroller__track">
          <div className="search-shows-scroller__label-skeleton" />
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="search-shows-scroller__item-skeleton" />
          ))}
        </div>
      </div>
    )
  }

  if (shows.length === 0) {
    return null
  }

  return (
    <div className="search-shows-scroller">
      <div className="search-shows-scroller__track" role="list">
        <p className="search-shows-scroller__label">Also in shows</p>
        {shows.map((show) => (
          <button
            key={show.showId}
            type="button"
            className="search-shows-scroller__item"
            role="listitem"
            onClick={() => onShowSelect?.(show.showId)}
            aria-label={`${show.name}, ${show.episodeCountLabel}`}
          >
            <img
              className="search-shows-scroller__cover"
              src={show.coverSrc}
              alt=""
              width={88}
              height={88}
              loading="lazy"
              decoding="async"
            />
            <span className="search-shows-scroller__copy">
              <span className="search-shows-scroller__name">{show.name}</span>
              <span className="search-shows-scroller__meta">{show.episodeCountLabel}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
