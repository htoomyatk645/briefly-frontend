import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BrowseChannels } from '../components/BrowseChannels'
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

      <section className="discover-page__body" aria-label="Discover content">
        {activeCategory ? (
          <p className="discover-page__filter-label">
            Showing {categories.find((c) => c.id === activeCategory)?.label ?? activeCategory}
          </p>
        ) : (
          <p className="discover-page__placeholder">
            Select a category to explore.
          </p>
        )}
      </section>
    </div>
  )
}
