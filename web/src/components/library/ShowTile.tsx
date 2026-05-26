import { useReducedMotion } from 'framer-motion'
import type { LibraryShow } from './libraryShowsData'

export type ShowTileProps = {
  show: LibraryShow
  onSelect: (showId: string) => void
}

export default function ShowTile({ show, onSelect }: ShowTileProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="show-tile-wrap" role="listitem">
      <button
        type="button"
        className={`show-tile${prefersReducedMotion ? ' show-tile--reduced-motion' : ''}`}
        onClick={() => onSelect(show.id)}
        aria-label={`Open ${show.name}`}
      >
        <img src={show.coverSrc} alt="" className="show-tile__cover" />
        <span className="show-tile__overlay" aria-hidden>
          <span className="show-tile__overlay-name">{show.name}</span>
          <span className="show-tile__overlay-desc">{show.description}</span>
        </span>
      </button>
      <p className="show-tile__mobile-name">{show.name}</p>
    </div>
  )
}
