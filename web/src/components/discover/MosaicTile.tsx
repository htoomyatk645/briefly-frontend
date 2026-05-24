import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArtworkPlaceholder } from '../home/ArtworkPlaceholder'
import { mosaicIdToFeedId } from '../feed/feedData'
import type { MosaicItem } from './discoverData'

export type MosaicTileProps = {
  item: MosaicItem
  isPlaceholder?: boolean
  layoutIdActive?: boolean
  isTransitionSource?: boolean
  onSelect: (id: string) => void
}

export const MosaicTile = forwardRef<HTMLButtonElement, MosaicTileProps>(
  function MosaicTile(
    { item, isPlaceholder = false, layoutIdActive = false, isTransitionSource = false, onSelect },
    ref,
  ) {
    const feedArtId = mosaicIdToFeedId(item.id)
    const layoutId = layoutIdActive ? `player-artwork-${feedArtId}` : undefined

    const artwork = (
      <ArtworkPlaceholder
        tone={item.artworkTone}
        coverSrc={isPlaceholder ? undefined : item.coverSrc}
        size="md"
        className="mosaic-tile__artwork"
        label={isPlaceholder ? undefined : `${item.showName}: ${item.episodeTitle}`}
      />
    )

    return (
      <button
        ref={ref}
        type="button"
        className={[
          'mosaic-tile',
          isPlaceholder ? 'mosaic-tile--placeholder' : '',
          isTransitionSource ? 'mosaic-tile--transition-source' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-item-id={item.id}
        onClick={() => onSelect(item.id)}
        disabled={isPlaceholder}
        aria-label={
          isPlaceholder
            ? undefined
            : `${item.showName}: ${item.episodeTitle}`
        }
        aria-hidden={isPlaceholder ? true : undefined}
        tabIndex={isPlaceholder ? -1 : 0}
      >
        {layoutId ? (
          <motion.div
            layoutId={layoutId}
            className="mosaic-tile__artwork-wrap"
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {artwork}
          </motion.div>
        ) : (
          <div className="mosaic-tile__artwork-wrap">{artwork}</div>
        )}
      </button>
    )
  },
)
