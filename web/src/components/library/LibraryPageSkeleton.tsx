import { SkeletonShimmer } from './SkeletonShimmer'
import type { CSSProperties } from 'react'
import { LibrarySection } from './LibrarySection'

export function LibraryPageSkeleton() {
  const surfaceStyle = {
    '--library-tab-surface': 'hsl(var(--surface-base-hsl) / 0.98)',
  } as CSSProperties

  return (
    <div
      className="library-page library-page--skeleton"
      style={surfaceStyle}
      aria-busy="true"
      aria-label="Loading library"
    >
      <header className="library-page__intro">
        <SkeletonShimmer className="library-page__title-skeleton" />
        <SkeletonShimmer className="library-page__subtitle-skeleton" />
      </header>

      <LibrarySection id="saved-skeleton" title="Saved">
        <div className="library-rail-skeleton" role="presentation">
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonShimmer key={index} className="library-rail-skeleton__card" />
          ))}
        </div>
      </LibrarySection>

      <LibrarySection id="shows-skeleton" title="Shows">
        <div className="library-grid-skeleton" role="presentation">
          {Array.from({ length: 6 }, (_, index) => (
            <SkeletonShimmer key={index} className="library-grid-skeleton__tile" />
          ))}
        </div>
      </LibrarySection>

      <LibrarySection id="mentions-skeleton" title="From the episodes">
        <div className="library-mentions-skeleton" role="presentation">
          <SkeletonShimmer className="library-mentions-skeleton__panel" />
          <SkeletonShimmer className="library-mentions-skeleton__panel" />
        </div>
      </LibrarySection>

      <LibrarySection id="tune-skeleton" title="Tune your feed">
        <SkeletonShimmer className="library-tune-skeleton__card" />
      </LibrarySection>
    </div>
  )
}
