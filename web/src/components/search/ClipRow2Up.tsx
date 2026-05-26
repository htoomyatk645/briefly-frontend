import type { SearchIndexEntry } from './useSearchIndex'
import { pullQuoteForCard } from './searchResultsUtils'
import { useSearchCoverTintStyle } from './searchCoverTint'

export type ClipRow2UpProps = {
  clips: SearchIndexEntry[]
  loading?: boolean
  onPlay: (clip: SearchIndexEntry) => void
}

const PlayIcon = () => (
  <svg className="search-clip-tile__play-icon" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2.5 1.8 10 6 2.5 10.2V1.8z" fill="currentColor" />
  </svg>
)

type ClipTileProps = {
  clip: SearchIndexEntry
  onPlay: (clip: SearchIndexEntry) => void
}

function ClipTile({ clip, onPlay }: ClipTileProps) {
  const tintStyle = useSearchCoverTintStyle(clip.coverSrc)
  const quote = pullQuoteForCard(clip)

  return (
    <article className="search-clip-tile" style={tintStyle}>
      <div className="search-clip-tile__body">
        <blockquote className="search-clip-tile__quote">{quote}</blockquote>
        <p className="search-clip-tile__show">{clip.showName}</p>
      </div>
      <button
        type="button"
        className="search-clip-tile__play"
        onClick={() => onPlay(clip)}
        aria-label={`Play clip from ${clip.showName}`}
      >
        <PlayIcon />
      </button>
    </article>
  )
}

export function ClipRow2Up({ clips, loading = false, onPlay }: ClipRow2UpProps) {
  if (loading) {
    return (
      <div className="search-clip-row-2up" aria-hidden>
        <div className="search-clip-tile search-clip-tile--skeleton" />
        <div className="search-clip-tile search-clip-tile--skeleton" />
      </div>
    )
  }

  if (clips.length === 0) {
    return null
  }

  return (
    <div className="search-clip-row-2up" role="list">
      {clips.slice(0, 2).map((clip) => (
        <div key={clip.feedEpisodeId} role="listitem">
          <ClipTile clip={clip} onPlay={onPlay} />
        </div>
      ))}
    </div>
  )
}
