import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useState } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { BrieflyPicks } from '../components/discover/BrieflyPicks'
import { CatalogMosaic } from '../components/discover/CatalogMosaic'
import { EditorialHero } from '../components/discover/EditorialHero'
import { TrendingBriefs } from '../components/discover/TrendingBriefs'
import { VibeShelves } from '../components/discover/VibeShelves'
import { SectionReveal } from '../components/motion/SectionReveal'
import {
  categories,
  getCategoryLabel,
  isCategoryId,
  type CategoryId,
} from '../data/discoverData'
import {
  brieflyPicks,
  editorialHero,
  hasDiscoverFilterResults,
  trendingBriefs,
  vibeShelves,
} from '../data/discoverFeed'
import { transition } from '../styles/motion'
import '../styles/discover-layout.css'

type DiscoverCategoryEmptyProps = {
  categoryLabel: string
  onBrowseAll: () => void
}

const DiscoverCategoryEmpty = ({
  categoryLabel,
  onBrowseAll,
}: DiscoverCategoryEmptyProps) => (
  <div className="discover-category-empty" role="status">
    <p className="discover-category-empty__title">Nothing in {categoryLabel} yet.</p>
    <p className="discover-category-empty__body">
      We&apos;re curating this category. Check back soon.
    </p>
    <button type="button" className="discover-category-empty__action" onClick={onBrowseAll}>
      Browse all briefs
    </button>
  </div>
)

export const Discover = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null)

  const handleCategorySelect = useCallback((id: string) => {
    if (!isCategoryId(id)) return
    setActiveCategoryId((current) => (current === id ? null : id))
  }, [])

  const handleBrowseAll = useCallback(() => {
    setActiveCategoryId(null)
  }, [])

  const showCategoryEmpty = useMemo(
    () => activeCategoryId !== null && !hasDiscoverFilterResults(activeCategoryId),
    [activeCategoryId],
  )

  const categoryLabel = activeCategoryId ? getCategoryLabel(activeCategoryId) : ''

  const filterTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: transition.chipRelocate.ease }

  return (
    <div className="discover discover-page">
      <AnimatePresence mode="popLayout">
        <motion.div
          key="browse-channels"
          className="discover-channels-sticky"
          layout
          layoutId="browse-channels-row"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={transition.chipRelocate}
        >
          <BrowseChannels
            categories={categories}
            activeId={activeCategoryId}
            onSelect={handleCategorySelect}
          />
        </motion.div>
      </AnimatePresence>

      <div className="discover-page__sections" aria-label="Discover content">
        <SectionReveal id="discover-editorial-hero">
          <EditorialHero hero={editorialHero} />
        </SectionReveal>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeCategoryId ?? 'all'}
            className="discover-page__filtered-sections"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={filterTransition}
          >
            {showCategoryEmpty ? (
              <DiscoverCategoryEmpty
                categoryLabel={categoryLabel}
                onBrowseAll={handleBrowseAll}
              />
            ) : (
              <>
                <SectionReveal id="discover-vibe-shelves">
                  <VibeShelves shelves={vibeShelves} activeCategoryId={activeCategoryId} />
                </SectionReveal>

                <SectionReveal id="discover-briefly-picks">
                  <BrieflyPicks picks={brieflyPicks} activeCategoryId={activeCategoryId} />
                </SectionReveal>

                <SectionReveal id="discover-trending-briefs">
                  <TrendingBriefs briefs={trendingBriefs} activeCategoryId={activeCategoryId} />
                </SectionReveal>

                <SectionReveal id="discover-catalog-mosaic">
                  <CatalogMosaic activeCategoryId={activeCategoryId} />
                </SectionReveal>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
