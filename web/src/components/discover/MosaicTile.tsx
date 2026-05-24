import { motion } from 'framer-motion'
import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import type { MosaicItem } from './discoverData'

type MosaicTileProps = {
  item: MosaicItem
  zoom: number
  onSelect: (id: string) => void
  tileRef: (id: string, el: HTMLButtonElement | null) => void
  getLensScale: (id: string) => number
}

export const MosaicTile = ({
  item,
  zoom,
  onSelect,
  tileRef,
  getLensScale,
}: MosaicTileProps) => {
  const labelOpacity = Math.max(0, Math.min(1, (zoom - 1.4) / 0.6))

  const handleClick = () => {
    const lensScale = getLensScale(item.id)
    if (lensScale > 1.45) {
      sessionStorage.setItem('briefly-mosaic-layout-id', `mosaic-${item.id}`)
    } else {
      sessionStorage.removeItem('briefly-mosaic-layout-id')
    }
    onSelect(item.id)
  }

  return (
    <button
      type="button"
      className="mosaic-tile"
      ref={(el) => tileRef(item.id, el)}
      onClick={handleClick}
      aria-label={`${item.showName}: ${item.episodeTitle}`}
    >
      <motion.div
        className="mosaic-tile__artwork-wrap"
        layoutId={`mosaic-${item.id}`}
      >
        <ArtworkPlaceholder
          tone={item.artworkTone}
          coverSrc={item.coverSrc}
          size="md"
          className="mosaic-tile__artwork"
        />
      </motion.div>
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

export const MosaicEmptyTile = () => (
  <button
    type="button"
    className="mosaic-tile mosaic-tile--empty"
    aria-label="No podcasts to explore yet"
    disabled
  >
    <div className="mosaic-tile__empty-body" aria-hidden>
      <span className="mosaic-tile__empty-mark">—</span>
    </div>
  </button>
)
