import { LibrarySection } from './LibrarySection'
import { LibrarySectionReveal } from './LibrarySectionReveal'

export default function ShowsGrid() {
  return (
    <LibrarySectionReveal>
      <LibrarySection id="shows" title="Shows">
        <div
          className="library-shows-grid library-shows-grid--empty"
          role="list"
          aria-label="Your shows"
        />
      </LibrarySection>
    </LibrarySectionReveal>
  )
}
