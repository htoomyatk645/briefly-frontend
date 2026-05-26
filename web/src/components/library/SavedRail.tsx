import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { SAVED_RAIL_LIMIT } from './savedClipsStorage'
import { useSavedClipsContext } from './SavedClipsContext'
import SavedClipCard from './SavedClipCard'
import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import { SkeletonShimmer } from './SkeletonShimmer'
import { SavedClipsUndoToast } from './SavedClipsUndoToast'

const RAIL_EASE = [0.22, 1, 0.36, 1] as const

function SavedRailPlaceholder() {
  return (
    <div className="saved-rail__placeholder" role="presentation">
      <p className="saved-rail__placeholder-title">Save the moments you don&apos;t want to lose.</p>
      <p className="saved-rail__placeholder-caption">Tap the bookmark icon on any clip.</p>
    </div>
  )
}

export default function SavedRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { clips, isLoading, undo, removeClip, undoRemove, onPlayClip } = useSavedClipsContext()

  const railClips = clips.slice(0, SAVED_RAIL_LIMIT)
  const isEmpty = !isLoading && railClips.length === 0

  return (
    <LibrarySectionReveal>
      <LibrarySection
        id="saved"
        title="Saved"
        seeAllHref={clips.length > 0 ? '/library/saved' : undefined}
      >
        <div ref={railRef} className="library-rail saved-rail" role="list" aria-label="Saved clips">
          {isLoading ? (
            Array.from({ length: 3 }, (_, index) => (
              <SkeletonShimmer key={index} className="saved-rail__skeleton" />
            ))
          ) : isEmpty ? (
            <SavedRailPlaceholder />
          ) : (
            <AnimatePresence initial={false}>
              {railClips.map((clip) => (
                <motion.div
                  key={clip.id}
                  role="listitem"
                  layout={!prefersReducedMotion}
                  className="saved-rail__item"
                  initial={false}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, transition: { duration: 0.22 } }
                      : {
                          opacity: 0,
                          scale: 0.96,
                          maxWidth: 0,
                          marginRight: 0,
                          transition: {
                            opacity: { duration: 0.22, ease: RAIL_EASE },
                            scale: { duration: 0.22, ease: RAIL_EASE },
                            maxWidth: { delay: 0.22, duration: 0.2, ease: RAIL_EASE },
                            marginRight: { delay: 0.22, duration: 0.2, ease: RAIL_EASE },
                          },
                        }
                  }
                  transition={{ layout: { duration: 0.2, ease: RAIL_EASE } }}
                >
                  <SavedClipCard
                    clip={clip}
                    railRef={railRef}
                    layout="rail"
                    onPlay={onPlayClip}
                    onUnsave={removeClip}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        <SavedClipsUndoToast undo={undo} onUndo={undoRemove} />
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
