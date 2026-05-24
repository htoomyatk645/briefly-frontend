import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
import { JumpRightIn } from '../components/discover/JumpRightIn'
import { SectionReveal } from '../components/motion/SectionReveal'
import { categories } from '../data/discoverData'
import { transition } from '../styles/motion'
import '../components/discover/discover-mosaic.css'
import '../styles/discover-layout.css'

export type DiscoverProps = {
  onTileSelect?: (id: string) => void
}

export const Discover = ({ onTileSelect }: DiscoverProps) => {
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

      <section className="discover-page__body" aria-label="Discover content">
        {activeCategory ? (
          <p className="discover-page__filter-label">
            Showing {categories.find((c) => c.id === activeCategory)?.label ?? activeCategory}
          </p>
        ) : null}

        {onTileSelect ? (
          <SectionReveal id="discover-mosaic">
            <JumpRightIn onTileSelect={onTileSelect} />
          </SectionReveal>
        ) : (
          <p className="discover-page__placeholder">
            Select a highlight to start listening.
          </p>
        )}
      </section>
    </div>
  )
}
