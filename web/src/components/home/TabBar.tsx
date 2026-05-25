import type React from 'react'
import { feedAssets } from '../feed/feedAssets'
import './tab-bar.css'

export type TabId = 'home' | 'feed' | 'discover' | 'saved' | 'account'

type TabBarProps = {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const HomeIcon = () => (
  <svg className="tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 11.5L12 5l8 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-8.5z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
)

const LibraryIcon = () => (
  <svg className="tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 6.5h4v11H5V6.5zm10 0h4v11h-4V6.5z" stroke="currentColor" strokeWidth={1.5} />
  </svg>
)

const FeedIcon = () => (
  <svg className="tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x={5} y={8} width={3} height={10} rx={1} fill="currentColor" />
    <rect x={10.5} y={5} width={3} height={16} rx={1} fill="currentColor" />
    <rect x={16} y={9} width={3} height={8} rx={1} fill="currentColor" />
  </svg>
)

const DiscoverIcon = () => (
  <svg className="tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx={12} cy={12} r={9} stroke="currentColor" strokeWidth={1.5} />
    <path d="M12 3a14 14 0 010 18M12 3a10 10 0 000 18M3 12h18" stroke="currentColor" strokeWidth={1.25} />
  </svg>
)

const SearchIcon = () => (
  <svg className="tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx={11} cy={11} r={6.5} stroke="currentColor" strokeWidth={1.5} />
    <path d="M16 16l5 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
)

type TabConfig = {
  id: TabId
  label: string
  feedSrc?: string
  Icon?: () => React.ReactNode
  inPill?: boolean
  cap?: 'left' | 'right'
}

const tabs: TabConfig[] = [
  { id: 'home', label: 'Home', feedSrc: feedAssets.tabs.home, Icon: HomeIcon, cap: 'left' },
  { id: 'saved', label: 'Library', feedSrc: feedAssets.tabs.books, Icon: LibraryIcon, inPill: true },
  { id: 'feed', label: 'Now playing', feedSrc: feedAssets.tabs.library, Icon: FeedIcon, inPill: true },
  { id: 'discover', label: 'Discover', feedSrc: feedAssets.tabs.compass, Icon: DiscoverIcon, inPill: true },
  { id: 'account', label: 'Search', feedSrc: feedAssets.tabs.search, Icon: SearchIcon, cap: 'right' },
]

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const isFeedShell = activeTab === 'feed'
  const pillTabs = tabs.filter((t) => t.inPill)
  const leftCap = tabs.find((t) => t.cap === 'left')
  const rightCap = tabs.find((t) => t.cap === 'right')

  const renderBtn = (tab: TabConfig, extraClass = '') => (
    <button
      key={tab.id}
      type="button"
      role="tab"
      className={`tab-bar__item${activeTab === tab.id ? ' tab-bar__item--active' : ''}${extraClass}`}
      aria-selected={activeTab === tab.id}
      aria-label={tab.label}
      onClick={() => onTabChange(tab.id)}
    >
      <span className="tab-bar__icon-wrap">
        {isFeedShell && tab.feedSrc ? (
          <img src={tab.feedSrc} alt="" className="tab-bar__figma-icon" />
        ) : (
          tab.Icon?.()
        )}
      </span>
      {activeTab === tab.id && tab.id === 'feed' && isFeedShell ? (
        <span className="tab-bar__active-dot" aria-hidden />
      ) : null}
    </button>
  )

  if (!isFeedShell) {
    return (
      <nav className="tab-bar" role="tablist" aria-label="Main navigation">
        <div className="tab-bar__pill tab-bar__pill--default">
          {tabs.map((t) => renderBtn(t))}
        </div>
      </nav>
    )
  }

  return (
    <nav className="tab-bar tab-bar--feed-shell" role="tablist" aria-label="Main navigation">
      <div className="tab-bar__feed-row">
        {leftCap ? renderBtn(leftCap, ' tab-bar__item--cap') : null}
        <div className="tab-bar__pill tab-bar__pill--feed">
          {pillTabs.map((t) => renderBtn(t))}
        </div>
        {rightCap ? renderBtn(rightCap, ' tab-bar__item--cap tab-bar__item--cap-right') : null}
      </div>
      <div className="tab-bar__home-indicator" aria-hidden />
    </nav>
  )
}
