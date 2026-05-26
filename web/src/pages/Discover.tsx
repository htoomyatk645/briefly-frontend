import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { BrieflyPicks } from '../components/discover/BrieflyPicks'
import { CatalogMosaic } from '../components/discover/CatalogMosaic'
import { EditorialHero } from '../components/discover/EditorialHero'
import { TrendingBriefs } from '../components/discover/TrendingBriefs'
import { VibeShelves } from '../components/discover/VibeShelves'
import { SectionReveal } from '../components/motion/SectionReveal'
import { categories } from '../data/discoverData'
import { transition } from '../styles/motion'
import '../styles/discover-layout.css'

export const Discover = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory((current) => (current === id ? null : id))
  }, [])

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
            activeId={activeCategory}
            onSelect={handleCategorySelect}
          />
        </motion.div>
      </AnimatePresence>

      <div className="discover-page__sections" aria-label="Discover content">
        <SectionReveal id="discover-editorial-hero">
          <EditorialHero />
        </SectionReveal>

        <SectionReveal id="discover-vibe-shelves">
          <VibeShelves />
        </SectionReveal>

        <SectionReveal id="discover-briefly-picks">
          <BrieflyPicks />
        </SectionReveal>

        <SectionReveal id="discover-trending-briefs">
          <TrendingBriefs />
        </SectionReveal>

        <SectionReveal id="discover-catalog-mosaic">
          <CatalogMosaic />
        </SectionReveal>
      </div>
    </div>
  )
}
