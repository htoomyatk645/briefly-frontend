import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import ShowTile from './ShowTile'
import { markShowProfileOpenedFromLibrary } from './useShowProfileBack'
import { SkeletonShimmer } from './SkeletonShimmer'
import { LIBRARY_SHOWS, SHOWS_GRID_PREVIEW } from './libraryShowsData'
import './showsGrid.css'

export default function ShowsGrid() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsLoading(false))
    return () => cancelAnimationFrame(frame)
  }, [])

  const previewShows = LIBRARY_SHOWS.slice(0, SHOWS_GRID_PREVIEW)
  const isEmpty = !isLoading && LIBRARY_SHOWS.length === 0
  const seeAllHref = LIBRARY_SHOWS.length > SHOWS_GRID_PREVIEW ? '/discover' : undefined

  return (
    <LibrarySectionReveal>
      <LibrarySection
        id="shows"
        title="Shows"
        subtitle="Voices you've spent time with."
        seeAllHref={seeAllHref}
        seeAllLabel="See all"
      >
        {isLoading ? (
          <div className="shows-grid shows-grid--loading" role="presentation">
            {Array.from({ length: 8 }, (_, index) => (
              <SkeletonShimmer key={index} className="shows-grid__skeleton" />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="shows-grid-empty">
            <p className="shows-grid-empty__title">You haven&apos;t followed any shows yet.</p>
            <button
              type="button"
              className="shows-grid-empty__cta"
              onClick={() => navigate('/discover')}
            >
              Discover shows
            </button>
          </div>
        ) : (
          <div className="shows-grid" role="list" aria-label="Your shows">
            {previewShows.map((show) => (
              <ShowTile
                key={show.id}
                show={show}
                onSelect={(id) => {
                  markShowProfileOpenedFromLibrary()
                  navigate(`/library/shows/${id}`)
                }}
              />
            ))}
          </div>
        )}
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
