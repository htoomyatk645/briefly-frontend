import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DEFAULT_FEED_ID,
  FEED_QUEUE,
  getEpisodeById,
  getUpNextItems,
  mosaicIdToFeedId,
  promoteUpNextItem,
} from './feedData'
import {
  readSavedEpisodeIds,
  writeSavedEpisodeIds,
} from './player/playerStorage'
import { UpNextCarousel } from './UpNextCarousel'
import { FeedLayoutList } from './FeedLayoutList'
import { FEED_AUTOPLAY_EVENT, type FeedAutoplayEventDetail } from './feedAutoplayConfig'
import { usePlayback } from './usePlayback'
import './clip-feed.css'

type ClipFeedProps = {
  selectedEpisodeId?: string | null
  onPlayEpisode?: (id: string) => void
  onPlaybackActiveChange?: (isPlaying: boolean) => void
}

function resolveInitialId(selectedEpisodeId?: string | null): string {
  if (!selectedEpisodeId) return DEFAULT_FEED_ID
  const match = FEED_QUEUE.find((e) => e.id === selectedEpisodeId)
  if (match) return match.id
  return mosaicIdToFeedId(selectedEpisodeId)
}

export const ClipFeed = ({ selectedEpisodeId, onPlayEpisode, onPlaybackActiveChange }: ClipFeedProps) => {
  const [nowPlayingId, setNowPlayingId] = useState(() => resolveInitialId(selectedEpisodeId))
  const [savedIds, setSavedIds] = useState(() => readSavedEpisodeIds())
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

  const toggleSaved = useCallback(() => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(nowPlayingId)) next.delete(nowPlayingId)
      else next.add(nowPlayingId)
      writeSavedEpisodeIds(next)
      return next
    })
  }, [nowPlayingId])

  return (
    <div className="feed-screen" ref={feedScreenRef}>
      <UpNextCarousel
        items={upNextItems}
        queueDepth={upNextItems.length}
        nowPlayingId={nowPlayingId}
        onSelect={selectFromUpNext}
        onQueue={queueFromUpNext}
      />

      <FeedLayoutList
        nowPlayingId={nowPlayingId}
        isPlaying={playback.isPlaying}
        progress={playback.progress}
        currentTime={playback.currentTime}
        duration={playback.duration}
        saved={savedIds.has(nowPlayingId)}
        onSelect={(id) => {
          setNowPlayingId(id)
          onPlayEpisode?.(id)
          playback.play()
        }}
        onTogglePlay={playback.togglePlay}
        onSeek={playback.seek}
        onToggleSaved={toggleSaved}
      />
    </div>
  )
}
