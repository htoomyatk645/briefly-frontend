import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DEFAULT_FEED_ID,
  FEED_QUEUE,
  getEpisodeById,
  getUpNextItems,
  mosaicIdToFeedId,
  promoteUpNextItem,
} from './feedData'
import type { MoreMenuAction } from './player/MoreMenu'
import {
  readFollowedShowIds,
  readSavedEpisodeIds,
  writeFollowedShowIds,
  writeSavedEpisodeIds,
} from './player/playerStorage'
import { PlayerCard } from './PlayerCard'
import { UpNextCarousel } from './UpNextCarousel'
import { FEED_AUTOPLAY_EVENT, type FeedAutoplayEventDetail } from './feedAutoplayConfig'
import { usePlayback } from './usePlayback'
import './clip-feed.css'

type ClipFeedProps = {
  selectedEpisodeId?: string | null
  clipSeekSeconds?: number | null
  onPlayEpisode?: (id: string) => void
  onClipSeekApplied?: () => void
  onPlaybackActiveChange?: (isPlaying: boolean) => void
}

function resolveInitialId(selectedEpisodeId?: string | null): string {
  if (!selectedEpisodeId) return DEFAULT_FEED_ID
  const match = FEED_QUEUE.find((e) => e.id === selectedEpisodeId)
  if (match) return match.id
  return mosaicIdToFeedId(selectedEpisodeId)
}

export const ClipFeed = ({
  selectedEpisodeId,
  clipSeekSeconds,
  onPlayEpisode,
  onClipSeekApplied,
  onPlaybackActiveChange,
}: ClipFeedProps) => {
  const [nowPlayingId, setNowPlayingId] = useState(() => resolveInitialId(selectedEpisodeId))
  const [savedIds, setSavedIds] = useState(() => readSavedEpisodeIds())
  const [followedShows, setFollowedShows] = useState(() => readFollowedShowIds())
  const [toast, setToast] = useState<string | null>(null)
  const [queueOrder, setQueueOrder] = useState<string[] | null>(null)
  const autoPlayNext = useRef(false)
  const feedScreenRef = useRef<HTMLDivElement>(null)

  const nowPlaying = useMemo(
    () => getEpisodeById(nowPlayingId) ?? FEED_QUEUE[0],
    [nowPlayingId],
  )

  const upNextItems = useMemo(() => {
    const base = getUpNextItems(nowPlayingId)
    if (!queueOrder) return base
    return queueOrder
      .map((id) => base.find((e) => e.id === id))
      .filter((e): e is NonNullable<typeof e> => e != null)
  }, [nowPlayingId, queueOrder])

  useEffect(() => {
    setQueueOrder(null)
  }, [nowPlayingId])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2400)
  }, [])

  const playNextInQueue = useCallback(() => {
    if (upNextItems.length === 0) return
    const nextId = upNextItems[0].id
    autoPlayNext.current = true
    setNowPlayingId(nextId)
    onPlayEpisode?.(nextId)
  }, [upNextItems, onPlayEpisode])

  const playback = usePlayback({
    durationSeconds: nowPlaying.durationSeconds,
    initialSeconds: nowPlaying.startSeconds ?? 0,
    onEnded: playNextInQueue,
  })

  useEffect(() => {
    if (autoPlayNext.current) {
      autoPlayNext.current = false
      playback.play()
    }
  }, [nowPlayingId, playback])

  useEffect(() => {
    onPlaybackActiveChange?.(playback.isPlaying)
  }, [playback.isPlaying, onPlaybackActiveChange])

  useEffect(() => {
    const root = feedScreenRef.current
    if (!root) return

    const handleFeedAutoplay = (event: Event) => {
      const { cardId } = (event as CustomEvent<FeedAutoplayEventDetail>).detail
      if (!cardId) return
      onPlaybackActiveChange?.(true)
    }

    root.addEventListener(FEED_AUTOPLAY_EVENT, handleFeedAutoplay)
    return () => root.removeEventListener(FEED_AUTOPLAY_EVENT, handleFeedAutoplay)
  }, [onPlaybackActiveChange])

  useEffect(() => {
    setNowPlayingId(resolveInitialId(selectedEpisodeId))
  }, [selectedEpisodeId])

  useEffect(() => {
    if (clipSeekSeconds == null) return

    const frame = requestAnimationFrame(() => {
      playback.seek(clipSeekSeconds)
      playback.play()
      onClipSeekApplied?.()
    })

    return () => cancelAnimationFrame(frame)
  }, [clipSeekSeconds, nowPlayingId, onClipSeekApplied])

  const selectFromUpNext = useCallback(
    (id: string) => {
      setNowPlayingId(id)
      onPlayEpisode?.(id)
      playback.play()
    },
    [onPlayEpisode, playback],
  )

  const queueFromUpNext = useCallback((id: string) => {
    const base = getUpNextItems(nowPlayingId)
    const next = promoteUpNextItem(base, id)
    setQueueOrder(next.map((e) => e.id))
  }, [nowPlayingId])

  const goNext = useCallback(() => {
    playNextInQueue()
    playback.play()
  }, [playNextInQueue, playback])

  const goPrev = useCallback(() => {
    const idx = FEED_QUEUE.findIndex((e) => e.id === nowPlayingId)
    const prev = FEED_QUEUE[(idx - 1 + FEED_QUEUE.length) % FEED_QUEUE.length]
    setNowPlayingId(prev.id)
    onPlayEpisode?.(prev.id)
    playback.play()
  }, [nowPlayingId, onPlayEpisode, playback])

  const toggleSaved = useCallback(() => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(nowPlayingId)) next.delete(nowPlayingId)
      else next.add(nowPlayingId)
      writeSavedEpisodeIds(next)
      return next
    })
  }, [nowPlayingId])

  const toggleFollow = useCallback(() => {
    setFollowedShows((prev) => {
      const next = new Set(prev)
      if (next.has(nowPlaying.showId)) next.delete(nowPlaying.showId)
      else next.add(nowPlaying.showId)
      writeFollowedShowIds(next)
      return next
    })
  }, [nowPlaying.showId])

  const handleMoreAction = useCallback(
    (action: MoreMenuAction) => {
      switch (action) {
        case 'similar':
          showToast('Three similar episodes added to Up Next')
          break
        case 'not-similar':
          showToast("We'll show fewer episodes like this")
          break
        case 'unplayed':
          playback.seek(0)
          showToast('Marked as unplayed')
          break
        case 'report':
          showToast('Thanks — we will review this report')
          break
        case 'share': {
          const t = playback.formatTime(playback.currentTime)
          const text = `Listen to "${nowPlaying.episodeTitle}" at ${t}`
          if (navigator.share) {
            void navigator.share({ title: nowPlaying.showName, text, url: window.location.href })
          } else {
            void navigator.clipboard.writeText(`${text}\n${window.location.href}`)
            showToast('Link copied with timestamp')
          }
          break
        }
        default:
          break
      }
    },
    [nowPlaying, playback, showToast],
  )

  return (
    <div className="feed-screen" ref={feedScreenRef}>
      {toast ? <div className="player-toast" role="status">{toast}</div> : null}

      <UpNextCarousel
        items={upNextItems}
        queueDepth={upNextItems.length}
        nowPlayingId={nowPlayingId}
        onSelect={selectFromUpNext}
        onQueue={queueFromUpNext}
      />

      <PlayerCard
        episode={nowPlaying}
        isPlaying={playback.isPlaying}
        currentTime={playback.currentTime}
        duration={playback.duration}
        progress={playback.progress}
        playbackRate={playback.playbackRate}
        saved={savedIds.has(nowPlayingId)}
        following={followedShows.has(nowPlaying.showId)}
        onTogglePlay={playback.togglePlay}
        onSeek={playback.seek}
        onRewind15={playback.rewind15}
        onForward30={playback.forward30}
        onPrev={goPrev}
        onNext={goNext}
        onSetSpeed={playback.setSpeed}
        onToggleSaved={toggleSaved}
        onToggleFollow={toggleFollow}
        onMoreAction={handleMoreAction}
      />
    </div>
  )
}
