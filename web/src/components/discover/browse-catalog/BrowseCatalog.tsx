import { useMemo } from 'react'
import { filterBriefs, type DiscoverBrief } from '../../../data/discoverSectionsData'
import { MOSAIC_ITEMS, tileMosaicLibrary } from '../discoverData'
import { MosaicTile } from '../MosaicTile'
import '../../../styles/sections.css'
import '../discover-mosaic.css'
import '../shared/discover-shared.css'
import './browse-catalog.css'

export type BrowseCatalogProps = {
  briefs: DiscoverBrief[]
  activeCategory: string | null
  onTileSelect: (id: string) => void
  loading?: boolean
}

const CATALOG_TILE_COUNT = 24
const SKELETON_COUNT = 12

function briefsToMosaicItems(briefs: DiscoverBrief[]) {
  return briefs.map((brief) => ({
    id: brief.id,
    showName: brief.showName,
    episodeTitle: brief.title,
    artworkTone: brief.artworkTone,
    coverSrc: brief.coverSrc,
    durationLabel: brief.durationLabel,
  }))
}

export const BrowseCatalog = ({
  briefs,
  activeCategory,
  onTileSelect,
  loading = false,
}: BrowseCatalogProps) => {
  const filteredBriefs = filterBriefs(briefs, activeCategory)

  const mosaicItems = useMemo(() => {
    const source =
      filteredBriefs.length > 0
        ? briefsToMosaicItems(filteredBriefs)
        : MOSAIC_ITEMS
    return tileMosaicLibrary(source, CATALOG_TILE_COUNT)
  }, [filteredBriefs])

  if (loading) {
    return (
      <section
        className="home-section browse-catalog browse-catalog--loading"
        aria-labelledby="browse-catalog-heading"
        aria-busy="true"
      >
        <div className="home-section__head">
          <h2 id="browse-catalog-heading" className="section-heading">
            Browse the Catalog
          </h2>
        </div>
        <div
          className="browse-catalog__grid browse-catalog__grid--skeleton"
          role="status"
          aria-label="Loading catalog"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <div key={`catalog-skeleton-${i}`} className="browse-catalog__skeleton-tile" />
          ))}
        </div>
      </section>
    )
  }

  if (filteredBriefs.length === 0 && activeCategory) {
    return (
      <section className="home-section browse-catalog" aria-labelledby="browse-catalog-heading">
        <div className="home-section__head">
          <h2 id="browse-catalog-heading" className="section-heading">
            Browse the Catalog
          </h2>
          <p className="section-subtitle">Deep dive for power listeners</p>
        </div>
        <p className="discover-empty discover-section-empty" role="status">
          No catalog tiles match this category yet.
        </p>
      </section>
    )
  }

  return (
    <section className="home-section browse-catalog" aria-labelledby="browse-catalog-heading">
      <div className="home-section__head">
        <h2 id="browse-catalog-heading" className="section-heading">
          Browse the Catalog
        </h2>
        <p className="section-subtitle">Deep dive for power listeners</p>
      </div>

      <div className="browse-catalog__grid" role="list">
        {mosaicItems.map((item) => (
          <div key={item.id} role="listitem" className="browse-catalog__cell">
            <MosaicTile item={item} onSelect={onTileSelect} />
          </div>
        ))}
      </div>
    </section>
  )
}
