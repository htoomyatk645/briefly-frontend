import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'

export default function TuneFeedCard() {
  return (
    <LibrarySectionReveal>
      <LibrarySection id="tune-feed" title="Tune your feed">
        <div className="library-tune-card">
          <p className="library-tune-card__copy">
            Calibrate what shows up. We&apos;ll learn the rest.
          </p>
        </div>
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
