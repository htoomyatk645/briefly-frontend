import { useNavigate } from 'react-router-dom'
import { TuneFeedSurface } from '../components/library/TuneFeedSurface'
import '../components/library/tuneFeed.css'

export default function TuneFeed() {
  const navigate = useNavigate()

  return (
    <div className="tune-feed-page">
      <TuneFeedSurface
        showBack
        autoFocusTitle={false}
        onBack={() => navigate('/library')}
      />
    </div>
  )
}
