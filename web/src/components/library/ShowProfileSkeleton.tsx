import { SkeletonShimmer } from './SkeletonShimmer'
import './showProfile.css'

export function ShowProfileSkeleton() {
  return (
    <div className="show-profile show-profile--skeleton" aria-busy="true" aria-label="Loading show">
      <SkeletonShimmer className="show-profile__hero-skeleton" />
      <div className="show-profile__section">
        <SkeletonShimmer className="show-profile__next-skeleton" />
      </div>
      <div className="show-profile__section">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonShimmer key={index} className="show-profile__row-skeleton" />
        ))}
      </div>
    </div>
  )
}
