import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppHeader } from '../AppHeader'
import { RouteTransition } from '../motion/RouteTransition'
import { useLibraryScrollRestoration } from '../library/useLibraryScrollRestoration'
import { Home } from '../../pages/Home'
import { Discover } from '../../pages/Discover'
import { LibraryRoutes } from '../../pages/LibraryRoutes'
import { ClipFeed } from '../feed/ClipFeed'
import type { ClipMoment } from '../library/savedClipsTypes'
import { TabBar, type TabId } from './TabBar'
import '../../styles/app-header.css'

type TabShellProps = {
  onPlayEpisode?: (id: string) => void
  onShowSelect?: (id: string) => void
  onNotifications?: () => void
  onProfile?: () => void
}

const TAB_PATHS: Record<TabId, string> = {
  home: '/',
  library: '/library',
  feed: '/feed',
  discover: '/discover',
  search: '/search',
}

function tabFromPath(pathname: string): TabId {
  if (pathname.startsWith('/library')) return 'library'
  if (pathname.startsWith('/feed')) return 'feed'
  if (pathname.startsWith('/discover')) return 'discover'
  if (pathname.startsWith('/search')) return 'search'
  return 'home'
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

  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    previewFeed ? 'feed' : tabFromPath(location.pathname),
  )
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null)
  const [pendingClipMoment, setPendingClipMoment] = useState<ClipMoment | null>(null)
  const [feedIsPlaying, setFeedIsPlaying] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (previewFeed) {
      navigate('/feed', { replace: true })
    }
  }, [previewFeed, navigate])

  useLibraryScrollRestoration(activeTab === 'library' ? scrollRef : { current: null })

  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname))
  }, [location.pathname])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    if (activeTab === 'library') return

    el.scrollTo(0, 0)
  }, [activeTab])

  useEffect(() => {
    if (activeTab !== 'feed') {
      setFeedIsPlaying(false)
    }
  }, [activeTab])

  const handleTileSelect = useCallback(
    (id: string) => {
      setSelectedEpisodeId(id)
      navigate('/feed')
      onPlayEpisode?.(id)
    },
    [navigate, onPlayEpisode],
  )

  const handleTabChange = useCallback(
    (tab: TabId) => {
      navigate(TAB_PATHS[tab])
    },
    [navigate],
  )

  const handleOpenFeed = useCallback(() => {
    navigate('/feed')
  }, [navigate])

  const handlePlaySavedClip = useCallback(
    (moment: ClipMoment) => {
      setSelectedEpisodeId(moment.episodeId)
      setPendingClipMoment(moment)
      navigate('/feed')
      onPlayEpisode?.(moment.episodeId)
    },
    [navigate, onPlayEpisode],
  )

  const handleClipSeekApplied = useCallback(() => {
    setPendingClipMoment(null)
  }, [])

  const clipSeekSeconds =
    pendingClipMoment &&
    selectedEpisodeId &&
    pendingClipMoment.episodeId === selectedEpisodeId
      ? pendingClipMoment.seekSeconds
      : null

  const handleFeedPlaybackChange = useCallback((isPlaying: boolean) => {
    setFeedIsPlaying(isPlaying)
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
            clipSeekSeconds={clipSeekSeconds}
            onPlayEpisode={onPlayEpisode}
            onClipSeekApplied={handleClipSeekApplied}
            onPlaybackActiveChange={handleFeedPlaybackChange}
          />
        )
      case 'discover':
        return <Discover />
      case 'library':
        return (
          <LibraryRoutes onOpenFeed={handleOpenFeed} onPlaySavedClip={handlePlaySavedClip} />
        )
      case 'search':
        return <PlaceholderScreen label="Search" />
    }
  }

  const isFeed = activeTab === 'feed'
  const isLibrary = activeTab === 'library'
  const showAppHeader = activeTab !== 'home' && activeTab !== 'feed'

  return (
    <div
      className={`tab-shell${isFeed ? ' tab-shell--feed' : ''}${isLibrary ? ' tab-shell--library' : ''}`}
    >
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
      <TabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        feedIsPlaying={feedIsPlaying}
      />
    </div>
  )
}
