import { useCallback, useState } from 'react'
import { Home } from '../../pages/Home'
import { ClipFeed } from '../feed/ClipFeed'
import { TabBar, type TabId } from './TabBar'

type TabShellProps = {
  onPlayEpisode?: (id: string) => void
  onShowSelect?: (id: string) => void
  onNotifications?: () => void
  onProfile?: () => void
}

const PlaceholderScreen = ({ label }: { label: string }) => (
  <div className="placeholder-screen">
    <span className="placeholder-screen__label">{label}</span>
  </div>
)

export const TabShell = ({
  onPlayEpisode,
  onShowSelect,
}: TabShellProps) => {
  const previewFeed =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === 'feed'

  const [activeTab, setActiveTab] = useState<TabId>(previewFeed ? 'feed' : 'home')
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null)

  const handleTileSelect = useCallback((id: string) => {
    setSelectedEpisodeId(id)
    setActiveTab('feed')
    onPlayEpisode?.(id)
  }, [onPlayEpisode])

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab)
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            onTileSelect={handleTileSelect}
            onShowSelect={onShowSelect}
          />
        )
      case 'feed':
        return (
          <ClipFeed
            selectedEpisodeId={selectedEpisodeId}
            onPlayEpisode={onPlayEpisode}
          />
        )
      case 'discover':
        return <PlaceholderScreen label="Discover" />
      case 'saved':
        return <PlaceholderScreen label="Saved" />
      case 'account':
        return <PlaceholderScreen label="Account" />
    }
  }

  const isFeed = activeTab === 'feed'

  return (
    <div className={`tab-shell${isFeed ? ' tab-shell--feed' : ''}`}>
      <div className="tab-shell__content">
        {renderTab()}
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
