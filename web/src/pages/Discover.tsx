import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { BrowseCatalog } from '../components/discover/browse-catalog/BrowseCatalog'
import { BrieflyPicks } from '../components/discover/briefly-picks/BrieflyPicks'
import { EditorialHero } from '../components/discover/editorial-hero/EditorialHero'
import { InTheMoodFor } from '../components/discover/in-the-mood/InTheMoodFor'
import { TrendingBriefs } from '../components/discover/trending-briefs/TrendingBriefs'
import { SectionReveal } from '../components/motion/SectionReveal'
import { categories } from '../data/discoverData'
import {
  catalogBriefs,
  curatorCollections,
  editorialHeroPick,
  moodShelves,
  trendingBriefs,
} from '../data/discoverSectionsData'
import { transition } from '../styles/motion'
import '../styles/sections.css'
import '../styles/discover-layout.css'
import '../components/homeShelves.css'

export type DiscoverProps = {
  onPlay?: (id: string) => void
}

export const Discover = ({ onPlay }: DiscoverProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory((current) => (current === id ? null : id))
  }, [])

  const handlePlay = useCallback(
    (id: string) => {
      onPlay?.(id)
    },
    [onPlay],
  )

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

      <div className="discover-page__body">
        <SectionReveal id="discover-editorial-hero">
          <EditorialHero pick={editorialHeroPick} onPlay={handlePlay} />
        </SectionReveal>

        <SectionReveal id="discover-in-the-mood">
          <InTheMoodFor
            shelves={moodShelves}
            activeCategory={activeCategory}
            onPlay={handlePlay}
          />
        </SectionReveal>

        <SectionReveal id="discover-briefly-picks">
          <BrieflyPicks
            collections={curatorCollections}
            activeCategory={activeCategory}
            onPlay={handlePlay}
          />
        </SectionReveal>

        <SectionReveal id="discover-trending-briefs">
          <TrendingBriefs
            briefs={trendingBriefs}
            activeCategory={activeCategory}
            onPlay={handlePlay}
          />
        </SectionReveal>

        <SectionReveal id="discover-browse-catalog">
          <BrowseCatalog
            briefs={catalogBriefs}
            activeCategory={activeCategory}
            onTileSelect={handlePlay}
          />
        </SectionReveal>
      </div>
    </div>
  )
}
