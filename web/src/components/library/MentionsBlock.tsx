import MentionedProducts from './MentionedProducts'
import MentionedReading from './MentionedReading'

export default function MentionsBlock() {
  return (
    <div className="library-mentions">
      <MentionedProducts />
      <MentionedReading />
    </div>
  )
}
