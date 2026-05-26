import { useMemo } from 'react'
import type { CategoryId } from '../../data/discoverData'
import {
  buildMosaicRows,
  filterMosaicByCategory,
  MOSAIC_ITEMS,
  tileMosaicLibrary,
} from './discoverData'
import { MosaicTile } from './MosaicTile'
import './discover-mosaic.css'
import './CatalogMosaic.css'

export type CatalogMosaicProps = {
  activeCategoryId?: CategoryId | null
  onTileSelect?: (id: string) => void
  loading?: boolean
}

const HEADING_ID = 'catalog-mosaic-heading'
const MOSAIC_COLS = 5
const CATALOG_TILE_COUNT = 40

export const CatalogMosaic = ({
  activeCategoryId = null,
  onTileSelect,
  loading = false,
}: CatalogMosaicProps) => {
  const filteredItems = useMemo(
    () => filterMosaicByCategory(MOSAIC_ITEMS, activeCategoryId),
    [activeCategoryId],
  )

  const mosaicItems = useMemo(
    () => tileMosaicLibrary(filteredItems, CATALOG_TILE_COUNT),
    [filteredItems],
  )

  const rows = useMemo(() => buildMosaicRows(mosaicItems, MOSAIC_COLS), [mosaicItems])

  const handleSelect = (id: string) => {
    console.log(`[CatalogMosaic] select tile: ${id}`)
    onTileSelect?.(id)
  }

  if (!loading && mosaicItems.length === 0) {
    return null
  }

  return (
    <section className="catalog-mosaic" aria-labelledby={HEADING_ID}>
      <div className="catalog-mosaic__header">
        <h2 id={HEADING_ID} className="catalog-mosaic__title">
          Browse the Catalog
        </h2>
        <p className="catalog-mosaic__subtitle">Every brief, organized.</p>
      </div>

      {loading ? (
        <div className="catalog-mosaic__loading" role="status" aria-label="Loading catalog">
          <div className="catalog-mosaic__skeleton" aria-hidden />
        </div>
      ) : (
        <div className="catalog-mosaic__grid-wrap">
          <div className="mosaic-grid catalog-mosaic__grid" role="grid" aria-label="Browse catalog">
            {rows.map((row, rowIdx) => (
              <div
                key={`catalog-row-${rowIdx}`}
                className={`mosaic-row${rowIdx % 2 === 1 ? ' mosaic-row--offset' : ''}`}
                role="row"
              >
                {row.map((item) => (
                  <MosaicTile key={item.id} item={item} onSelect={handleSelect} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
