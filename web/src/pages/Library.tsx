import SavedRail from '../components/library/SavedRail'
import ShowsGrid from '../components/library/ShowsGrid'
import MentionedContext from '../components/library/MentionedContext'
import MentionsBlock from '../components/library/MentionsBlock'
import TuneFeedCard from '../components/library/TuneFeedCard'
import '../components/library/library.css'

export function Library() {
  return (
    <div className="library-page__sections">
      <SavedRail />
      <ShowsGrid />
      <MentionedContext />
      <MentionsBlock />
      <TuneFeedCard />
    </div>
  )
}
