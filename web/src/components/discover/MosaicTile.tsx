import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import { mosaicIdToFeedId } from '../feed/feedData'
import type { MosaicItem } from './discoverData'

export type MosaicTileProps = {
  item: MosaicItem
  layoutIdActive?: boolean
  isTransitionSource?: boolean
  onSelect: (id: string) => void
}

export const MosaicTile = forwardRef<HTMLButtonElement, MosaicTileProps>(
  function MosaicTile(
    { item, layoutIdActive = false, isTransitionSource = false, onSelect },
    ref,
  ) {
    const feedArtId = mosaicIdToFeedId(item.id)
    const layoutId = layoutIdActive ? `player-artwork-${feedArtId}` : undefined

    return (
      <button
        ref={ref}
        type="button"
        className={[
          'mosaic-tile',
          isTransitionSource ? 'mosaic-tile--transition-source' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-item-id={item.id}
        onClick={() => onSelect(item.id)}
        aria-label={`${item.showName}: ${item.episodeTitle}`}
      >
        {layoutId ? (
          <motion.div
            layoutId={layoutId}
            className="mosaic-tile__artwork-wrap"
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <ArtworkPlaceholder
              tone={item.artworkTone}
              coverSrc={item.coverSrc}
              size="md"
              className="mosaic-tile__artwork"
              label={`${item.showName}: ${item.episodeTitle}`}
            />
          </motion.div>
        ) : (
          <div className="mosaic-tile__artwork-wrap">
            <ArtworkPlaceholder
              tone={item.artworkTone}
              coverSrc={item.coverSrc}
              size="md"
              className="mosaic-tile__artwork"
              label={`${item.showName}: ${item.episodeTitle}`}
            />
          </div>
        )}
      </button>
    )
  },
)
