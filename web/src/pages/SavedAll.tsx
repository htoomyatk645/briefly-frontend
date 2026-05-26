import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSavedClipsContext } from '../components/library/SavedClipsContext'
import SavedClipCard from '../components/library/SavedClipCard'
import { SavedClipsUndoToast } from '../components/library/SavedClipsUndoToast'
import { SkeletonShimmer } from '../components/library/SkeletonShimmer'
import '../components/library/savedClipCard.css'
import '../components/library/savedGrid.css'

const FILTER_CHIPS = ['All', 'This week', 'This month', 'By show'] as const
const GRID_EASE = [0.22, 1, 0.36, 1] as const

export default function SavedAll() {
  const navigate = useNavigate()
  const backRef = useRef<HTMLButtonElement>(null)
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_CHIPS)[number]>('All')
  const { clips, isLoading, removeClip, undoRemove, undo, onPlayClip } = useSavedClipsContext()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    backRef.current?.focus()
  }, [])

  return (
    <div className="saved-all">
      <button
        ref={backRef}
        type="button"
        className="saved-all__back"
        onClick={() => navigate('/library')}
        aria-label="Back to Library"
      >
        Back to Library
      </button>

      <header className="saved-all__head">
        <h1 className="saved-all__title">Saved</h1>
        <p className="saved-all__subtitle">Every clip you kept — with the line that made you stop.</p>
      </header>

      <div className="saved-all__filters" role="tablist" aria-label="Filter saved clips">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            role="tab"
            className={`saved-all__filter${activeFilter === chip ? ' saved-all__filter--active' : ''}`}
            aria-selected={activeFilter === chip}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <p className="saved-all__filter-note" aria-live="polite">
        {activeFilter === 'All'
          ? null
          : `Showing ${activeFilter} — filters connect in a follow-up.`}
      </p>

      <div className="saved-grid" role="list" aria-label="All saved clips">
        {isLoading
          ? Array.from({ length: 6 }, (_, index) => (
              <SkeletonShimmer key={index} className="saved-grid__skeleton" />
            ))
          : (
            <AnimatePresence initial={false}>
              {clips.map((clip) => (
                <motion.div
                  key={clip.id}
                  role="listitem"
                  className="saved-grid__item"
                  layout={!prefersReducedMotion}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, transition: { duration: 0.22 } }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          transition: { duration: 0.22, ease: GRID_EASE },
                        }
                  }
                >
                  <SavedClipCard
                    clip={clip}
                    layout="grid"
                    onPlay={onPlayClip}
                    onUnsave={removeClip}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
      </div>

      <SavedClipsUndoToast undo={undo} onUndo={undoRemove} />
    </div>
  )
}
