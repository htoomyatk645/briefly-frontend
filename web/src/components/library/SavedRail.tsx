import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'
import { SkeletonShimmer } from './SkeletonShimmer'

export default function SavedRail() {
  return (
    <LibrarySectionReveal>
      <LibrarySection id="saved" title="Saved" seeAllHref="/library/saved">
        <div className="library-rail" role="presentation">
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonShimmer key={index} className="library-rail__card" />
          ))}
        </div>
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
