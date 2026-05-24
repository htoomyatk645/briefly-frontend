import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { FeedEpisode } from './feedData'
import { feedAssetsRemote } from './feedAssets'

const CARD_WIDTH = 130
const CARD_GAP = 10
const CARD_EXIT_OFFSET = CARD_WIDTH + CARD_GAP
const EXIT_MS = 280
const EASE_OUT = [0.22, 1, 0.36, 1] as const

type UpNextCarouselProps = {
  items: FeedEpisode[]
  queueDepth: number
  nowPlayingId: string
  onSelect: (id: string) => void
  onQueue: (id: string) => void
}

export const UpNextCarousel = ({
  items,
  nowPlayingId,
  onSelect,
  onQueue,
}: UpNextCarouselProps) => {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [displayItems, setDisplayItems] = useState(items)
  const [visibleItems, setVisibleItems] = useState(items)
  const [isLoading, setIsLoading] = useState(false)
  const pendingQueueIdRef = useRef<string | null>(null)
  const queueTimerRef = useRef<number | null>(null)
  const prevNowPlayingIdRef = useRef(nowPlayingId)
  const isFirstMount = useRef(true)

  const dotCount = Math.min(items.length, 8)
  const hasOverflow = items.length > 8

  const resetScroll = useCallback(() => {
    setScrollIndex(0)
    const el = scrollRef.current
    if (el) el.scrollLeft = 0
  }, [])

  useEffect(() => {
    return () => {
      if (queueTimerRef.current != null) window.clearTimeout(queueTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      prevNowPlayingIdRef.current = nowPlayingId
      setDisplayItems(items)
      setVisibleItems(items)
      resetScroll()
      return
    }

    const nowPlayingChanged = nowPlayingId !== prevNowPlayingIdRef.current
    if (nowPlayingChanged) {
      prevNowPlayingIdRef.current = nowPlayingId
      pendingQueueIdRef.current = null
      if (queueTimerRef.current != null) {
        window.clearTimeout(queueTimerRef.current)
        queueTimerRef.current = null
      }
      setIsLoading(true)

      const frame = requestAnimationFrame(() => {
        setDisplayItems(items)
        setVisibleItems(items)
        setIsLoading(false)
        resetScroll()
      })

      return () => cancelAnimationFrame(frame)
    }

    setDisplayItems(items)
    if (!pendingQueueIdRef.current) {
      setVisibleItems(items)
    }
  }, [items, nowPlayingId, resetScroll])

  const updateIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round((el.scrollLeft + CARD_WIDTH / 2) / (CARD_WIDTH + CARD_GAP))
    setScrollIndex(Math.min(Math.max(0, idx), visibleItems.length - 1))
  }, [visibleItems.length])

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el || index >= visibleItems.length) return
      el.scrollTo({ left: index * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
      setScrollIndex(index)
    },
    [visibleItems.length],
  )

  const handleQueueStart = useCallback(
    (id: string) => {
      if (displayItems[0]?.id === id) {
        onQueue(id)
        return
      }

      pendingQueueIdRef.current = id
      setVisibleItems((prev) => prev.filter((item) => item.id !== id))

      const delay = prefersReducedMotion ? 0 : EXIT_MS
      if (queueTimerRef.current != null) window.clearTimeout(queueTimerRef.current)

      queueTimerRef.current = window.setTimeout(() => {
        queueTimerRef.current = null
        if (pendingQueueIdRef.current !== id) return
        pendingQueueIdRef.current = null
        onQueue(id)
      }, delay)
    },
    [displayItems, onQueue, prefersReducedMotion],
  )

  const layoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: EASE_OUT }

  const exitTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: EASE_OUT }

  const isEmpty = displayItems.length === 0

  return (
    <section className="up-next" aria-labelledby="up-next-heading">
      <h2 id="up-next-heading" className="up-next__heading">
        Up Next
      </h2>

      <div className="up-next__carousel-wrap">
        <div
          className="up-next__track"
          ref={scrollRef}
          onScroll={updateIndexFromScroll}
          role="list"
          aria-label="Up next queue"
          data-loading={isLoading || undefined}
        >
          {isEmpty ? (
            <div className="up-next__card up-next__card--placeholder" role="listitem">
              <p className="up-next__card-placeholder-text">
                Nothing queued. Tap a podcast on Home to start a queue.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  role="listitem"
                  layout={!prefersReducedMotion}
                  initial={false}
                  className="up-next__card-shell"
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, transition: exitTransition }
                      : { x: CARD_EXIT_OFFSET, opacity: 0, transition: exitTransition }
                  }
                  transition={{
                    layout: layoutTransition,
                  }}
                >
                  <button
                    type="button"
                    className="up-next__card"
                    onClick={() => onSelect(item.id)}
                    aria-label={`Play next: ${item.episodeTitle}`}
                  >
                    <img src={item.coverSrc} alt="" className="up-next__card-cover" />
                    <div className="up-next__card-scrim" aria-hidden />
                    <p className="up-next__card-title">{item.episodeTitle}</p>
                  </button>
                  <motion.button
                    type="button"
                    className="up-next__card-action"
                    aria-label={`Queue ${item.episodeTitle} as next without switching`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleQueueStart(item.id)
                    }}
                    whileTap={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 0.92, backgroundColor: 'hsla(0, 0%, 100%, 0.4)' }
                    }
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    <img
                      src={feedAssetsRemote.controls.chevron}
                      alt=""
                      className="up-next__card-action-icon"
                    />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {!isEmpty && dotCount > 0 ? (
        <div className="up-next__dots" role="tablist" aria-label={`${items.length} episodes in queue`}>
          {Array.from({ length: dotCount }, (_, i) => {
            const isEllipsis = hasOverflow && i === 7

            if (isEllipsis) {
              return (
                <span key="ellipsis" className="up-next__dot-ellipsis" aria-hidden>
                  …
                </span>
              )
            }

            return (
              <button
                key={i}
                type="button"
                role="tab"
                className={`up-next__dot${i === scrollIndex ? ' up-next__dot--active' : ''}`}
                aria-selected={i === scrollIndex}
                aria-label={`Queue position ${i + 1} of ${items.length}`}
                onClick={() => scrollToIndex(i)}
              />
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
