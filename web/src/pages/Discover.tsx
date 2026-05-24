import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BrowseChannels } from '../components/BrowseChannels'
import { categories } from '../data/discoverData'
import { transition } from '../styles/motion'
import '../components/discover/discover-mosaic.css'
import '../styles/discover-layout.css'

export const Discover = () => {
  const prefersReducedMotion = useReducedMotion()

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
          <BrowseChannels categories={categories} />
        </motion.div>
      </AnimatePresence>

      <section className="discover-page__body" aria-label="Discover content">
        <p className="discover-page__placeholder">
          Category results will appear here.
        </p>
      </section>
    </div>
  )
}
