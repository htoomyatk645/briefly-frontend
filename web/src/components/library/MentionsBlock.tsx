import MentionedProducts from './MentionedProducts'
import MentionedReading from './MentionedReading'
import { LibrarySectionReveal } from './LibrarySectionReveal'

export default function MentionsBlock() {
  return (
    <LibrarySectionReveal>
      <section className="library-section library-section--mentions" aria-label="From the episodes">
        <div className="library-section__head">
          <div className="library-section__head-copy">
            <h2 className="library-section__title">From the episodes</h2>
          </div>
        </div>
        <div className="library-mentions">
          <MentionedProducts />
          <MentionedReading />
        </div>
      </section>
    </LibrarySectionReveal>
  )
}
