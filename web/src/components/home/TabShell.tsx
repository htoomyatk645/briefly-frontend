import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AppHeader } from '../AppHeader'
import { RouteTransition } from '../motion/RouteTransition'
import { Home } from '../../pages/Home'
import { Discover } from '../../pages/Discover'
import { ClipFeed } from '../feed/ClipFeed'
import { TabBar, type TabId } from './TabBar'
import '../../styles/app-header.css'

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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [activeTab])

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
        return <Discover />
      case 'saved':
        return <PlaceholderScreen label="Saved" />
      case 'account':
        return <PlaceholderScreen label="Account" />
    }
  }

  const isFeed = activeTab === 'feed'
  const showAppHeader = activeTab !== 'home' && activeTab !== 'feed'

  return (
    <div className={`tab-shell${isFeed ? ' tab-shell--feed' : ''}`}>
      <div className="tab-shell__content">
        <div className="app-page-scroll" ref={scrollRef}>
          {showAppHeader ? (
            <AppHeader scrollContainerRef={scrollRef} layoutKey={activeTab} />
          ) : null}
          <LayoutGroup id="tab-shell-layout">
            <AnimatePresence mode="popLayout">
              <RouteTransition
                key={activeTab}
                routeKey={activeTab}
                className="app-page-body"
                fillViewport={isFeed}
              >
                {renderTab()}
              </RouteTransition>
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
