import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import type { MosaicItem } from './discoverData'

type MosaicTileProps = {
  item: MosaicItem
  zoom: number
  onSelect: (id: string) => void
}

export const MosaicTile = ({ item, zoom, onSelect }: MosaicTileProps) => {
  const labelOpacity = Math.max(0, Math.min(1, (zoom - 1.4) / 0.6))

  return (
    <button
      type="button"
      className="mosaic-tile"
      onClick={() => onSelect(item.id)}
      aria-label={`${item.showName}: ${item.episodeTitle}`}
    >
      <ArtworkPlaceholder
        tone={item.artworkTone}
        coverSrc={item.coverSrc}
        size="md"
        className="mosaic-tile__artwork"
      />
      <div
        className="mosaic-tile__overlay"
        style={{ opacity: labelOpacity }}
        aria-hidden={labelOpacity < 0.1}
      >
        <span className="mosaic-tile__show">{item.showName}</span>
        <span className="mosaic-tile__title">{item.episodeTitle}</span>
      </div>
    </button>
  )
}
