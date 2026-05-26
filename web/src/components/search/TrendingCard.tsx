import type { TrendingSearchItem } from '../../data/searchData'
import { SearchSparkline } from './SearchSparkline'

export type TrendingCardProps = {
  item?: TrendingSearchItem
  loading?: boolean
  onSelect?: (query: string) => void
}

export function TrendingCard({ item, loading = false, onSelect }: TrendingCardProps) {
  if (loading) {
    return (
      <article
        className="search-trending-card search-trending-card--skeleton"
        aria-hidden
      />
    )
  }

  if (!item) {
    return null
  }

  const handleClick = () => {
    onSelect?.(item.query)
  }

  return (
    <article className="search-trending-card">
      <button
        type="button"
        className="search-trending-card__hit"
        onClick={handleClick}
        aria-label={`Search for ${item.query}: ${item.pullQuote}`}
      >
        <img
          className="search-trending-card__cover"
          src={item.coverSrc}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          decoding="async"
        />
        <span className="search-trending-card__body">
          <span className="search-trending-card__quote">{item.pullQuote}</span>
          <span className="search-trending-card__meta">
            <span className="search-trending-card__show">{item.showName}</span>
            <SearchSparkline
              values={item.volume24h}
              className="search-trending-card__sparkline"
            />
          </span>
        </span>
        <span className="search-trending-card__badge">{item.playCountLabel}</span>
      </button>
    </article>
  )
}
