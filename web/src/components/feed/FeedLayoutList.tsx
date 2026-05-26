import { useMemo } from 'react'
import { CompactCard } from './CompactCard'
import { FEED_ITEMS } from './feedData'
import { buildFeedLayout } from './feedLayout'
import { HeroCard } from './HeroCard'
import './feedLayout.css'

export type FeedLayoutListProps = {
  nowPlayingId: string
  isPlaying: boolean
  progress: number
  currentTime: number
  duration: number
  saved: boolean
  onSelect: (id: string) => void
  onTogglePlay: () => void
  onSeek: (seconds: number) => void
  onToggleSaved: () => void
}

export const FeedLayoutList = ({
  nowPlayingId,
  isPlaying,
  progress,
  currentTime,
  duration,
  saved,
  onSelect,
  onTogglePlay,
  onSeek,
  onToggleSaved,
}: FeedLayoutListProps) => {
  const layout = useMemo(() => buildFeedLayout(FEED_ITEMS), [])

  return (
    <div className="feed-layout" role="feed" aria-label="Episode feed">
      {layout.map((row) => {
        if (row.type === 'hero') {
          const active = row.item.id === nowPlayingId

          return (
            <HeroCard
              key={`hero-${row.item.id}`}
              item={row.item}
              active={active}
              isPlaying={active && isPlaying}
              progress={active ? progress : 0}
              currentTime={active ? currentTime : 0}
              duration={active ? duration : row.item.durationSeconds}
              saved={active && saved}
              onPress={onSelect}
              onTogglePlay={onTogglePlay}
              onSeek={onSeek}
              onToggleSaved={onToggleSaved}
            />
          )
        }

        return (
          <div className="feed-compact-row" key={`compact-${row.items[0].id}-${row.items[1].id}`}>
            {row.items.map((item, index) => (
              <CompactCard
                key={item.id}
                item={item}
                staggerIndex={index}
                active={item.id === nowPlayingId}
                isPlaying={item.id === nowPlayingId && isPlaying}
                progress={item.id === nowPlayingId ? progress : 0}
                onPress={onSelect}
                onTogglePlay={onTogglePlay}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
