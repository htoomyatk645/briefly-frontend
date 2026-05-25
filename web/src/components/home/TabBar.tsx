import type React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './tab-bar.css'

export type TabId = 'home' | 'library' | 'feed' | 'discover' | 'search'

type TabBarProps = {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  feedIsPlaying?: boolean
}

const ICON_STROKE = 1.75
const EASE = [0.22, 1, 0.36, 1] as const

type TabIconProps = {
  filled: boolean
  animate?: boolean
}

const iconPathTransition = (prefersReducedMotion: boolean | null, animate: boolean) => ({
  duration: prefersReducedMotion || !animate ? 0 : 0.18,
  ease: EASE,
})

const HomeIcon = ({ filled, animate = true }: TabIconProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg className="tab-bar__icon" viewBox="0 0 24 24" aria-hidden>
      <motion.path
        d="M4 10.75L12 5l8 5.75V20a1.25 1.25 0 01-1.25 1.25H5.25A1.25 1.25 0 014 20V10.75z"
        initial={false}
        animate={{
          fill: filled ? 'currentColor' : 'transparent',
          stroke: 'currentColor',
          strokeWidth: filled ? 0 : ICON_STROKE,
        }}
        transition={iconPathTransition(prefersReducedMotion, animate)}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

const bookPath = (
  x: number,
  y: number,
  width: number,
  height: number,
) => `M${x} ${y}h${width}v${height}h-${width}V${y}z`

const LibraryIcon = ({ filled, animate = true }: TabIconProps) => {
  const prefersReducedMotion = useReducedMotion()
  const books = [
    bookPath(5, 10, 3.5, 8),
    bookPath(10.25, 6, 3.5, 12),
    bookPath(15.5, 11, 3.5, 7),
  ]

  return (
    <svg className="tab-bar__icon" viewBox="0 0 24 24" aria-hidden>
      {books.map((d) => (
        <motion.path
          key={d}
          d={d}
          initial={false}
          animate={{
            fill: filled ? 'currentColor' : 'transparent',
            stroke: 'currentColor',
            strokeWidth: filled ? 0 : ICON_STROKE,
          }}
          transition={iconPathTransition(prefersReducedMotion, animate)}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

const FeedIcon = ({ filled, animate = true }: TabIconProps) => {
  const prefersReducedMotion = useReducedMotion()
  const bars = [
    { x: 5, y: 10, h: 8 },
    { x: 9.5, y: 6, h: 12 },
    { x: 14, y: 9, h: 9 },
    { x: 18.5, y: 7, h: 11 },
  ]

  return (
    <svg className="tab-bar__icon" viewBox="0 0 24 24" aria-hidden>
      {bars.map(({ x, y, h }) =>
        filled ? (
          <motion.rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={2}
            height={h}
            rx={1}
            initial={false}
            animate={{ fill: 'currentColor' }}
            transition={iconPathTransition(prefersReducedMotion, animate)}
          />
        ) : (
          <motion.path
            key={`${x}-${y}`}
            d={`M${x + 1} ${y + h}V${y}`}
            initial={false}
            animate={{
              fill: 'transparent',
              stroke: 'currentColor',
              strokeWidth: ICON_STROKE,
            }}
            transition={iconPathTransition(prefersReducedMotion, animate)}
            strokeLinecap="round"
          />
        ),
      )}
    </svg>
  )
}

const DiscoverIcon = ({ filled, animate = true }: TabIconProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg className="tab-bar__icon" viewBox="0 0 24 24" aria-hidden>
      {filled ? (
        <motion.path
          d="M12 3.5a8.5 8.5 0 110 17 8.5 8.5 0 010-17M15.2 8.8l-1.45 4.35-4.35 1.45 1.45-4.35z"
          fillRule="evenodd"
          clipRule="evenodd"
          initial={false}
          animate={{ fill: 'currentColor', stroke: 'transparent', strokeWidth: 0 }}
          transition={iconPathTransition(prefersReducedMotion, animate)}
        />
      ) : (
        <>
          <motion.circle
            cx={12}
            cy={12}
            r={8.5}
            initial={false}
            animate={{
              fill: 'transparent',
              stroke: 'currentColor',
              strokeWidth: ICON_STROKE,
            }}
            transition={iconPathTransition(prefersReducedMotion, animate)}
          />
          <motion.path
            d="M15.2 8.8l-1.45 4.35-4.35 1.45 1.45-4.35z"
            initial={false}
            animate={{
              fill: 'transparent',
              stroke: 'currentColor',
              strokeWidth: ICON_STROKE,
            }}
            transition={iconPathTransition(prefersReducedMotion, animate)}
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  )
}

const SearchIcon = ({ filled, animate = true }: TabIconProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <svg className="tab-bar__icon" viewBox="0 0 24 24" aria-hidden>
      <motion.circle
        cx={10.5}
        cy={10.5}
        r={5.75}
        initial={false}
        animate={{
          fill: filled ? 'currentColor' : 'transparent',
          stroke: 'currentColor',
          strokeWidth: filled ? 0 : ICON_STROKE,
        }}
        transition={iconPathTransition(prefersReducedMotion, animate)}
      />
      <motion.path
        d="M15 15l4.25 4.25"
        initial={false}
        animate={{
          fill: 'transparent',
          stroke: 'currentColor',
          strokeWidth: ICON_STROKE,
        }}
        transition={iconPathTransition(prefersReducedMotion, animate)}
        strokeLinecap="round"
      />
    </svg>
  )
}

type TabConfig = {
  id: TabId
  label: string
  Icon: (props: TabIconProps) => React.ReactElement
}

const tabs: TabConfig[] = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'library', label: 'Library', Icon: LibraryIcon },
  { id: 'feed', label: 'Now playing', Icon: FeedIcon },
  { id: 'discover', label: 'Discover', Icon: DiscoverIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
]

export const TabBar = ({ activeTab, onTabChange, feedIsPlaying = false }: TabBarProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <nav className="tab-bar" role="tablist" aria-label="Main navigation">
      <div className="tab-bar__pill">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isFeedPlaying = tab.id === 'feed' && isActive && feedIsPlaying
          const Icon = tab.Icon

          return (
            <motion.button
              key={tab.id}
              type="button"
              role="tab"
              className={`tab-bar__item${isActive ? ' tab-bar__item--active' : ''}${isFeedPlaying ? ' tab-bar__item--feed-playing' : ''}`}
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.id)}
              whileTap={
                prefersReducedMotion
                  ? undefined
                  : { scale: 0.92 }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { type: 'spring', stiffness: 320, damping: 22 }
              }
            >
              <motion.span
                className="tab-bar__icon-wrap"
                animate={{ scale: isActive && !prefersReducedMotion ? 1.08 : 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.22,
                  ease: EASE,
                }}
              >
                <Icon filled={isActive} />
              </motion.span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
