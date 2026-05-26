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

      <LibrarySection id="shows-skeleton" title="Shows" subtitle="Voices you've spent time with.">
        <div className="shows-grid shows-grid--loading" role="presentation">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="shows-grid__skeleton-wrap">
              <SkeletonShimmer className="shows-grid__skeleton" />
            </div>
          ))}
        </div>
      </LibrarySection>

      <LibrarySection id="mentions-skeleton" title="From the episodes">
        <div className="library-mentions-skeleton" role="presentation">
          <SkeletonShimmer className="library-mentions-skeleton__panel" />
          <SkeletonShimmer className="library-mentions-skeleton__panel" />
        </div>
      </LibrarySection>

      <div className="library-tune-skeleton" aria-hidden>
        <SkeletonShimmer className="library-tune-skeleton__card" />
      </div>
    </div>
  )
}
