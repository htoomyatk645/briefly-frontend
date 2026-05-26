import { useNavigate } from 'react-router-dom'
import { TuneFeedContent } from '../components/library/TuneFeedContent'
import '../components/library/tuneFeed.css'

export default function TuneFeed() {
  const navigate = useNavigate()

  return (
    <div className="tune-feed-page">
      <TuneFeedContent
        showBack
        autoFocusTitle={false}
        onBack={() => navigate('/library')}
      />
    </div>
  )
}
