import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { FeedCardTone, FeedEpisode } from './feedData'
import { FeedCard } from './FeedCard'
import { useCoverCardBackground } from './useCoverGradient'
import { useFeedAutoplay } from './useFeedAutoplay'
import { useUpNextAnticipation } from './useUpNextAnticipation'

const CARD_WIDTH = 130
const CARD_GAP = 10
const EXIT_MS = 280
const EASE_OUT = [0.22, 1, 0.36, 1] as const

const TONE_BG: Record<FeedCardTone, string> = {
  purple: 'var(--feed-up-purple)',
  navy: 'var(--feed-up-navy)',
  crimson: 'var(--feed-up-crimson)',
}

type UpNextCarouselProps = {
  items: FeedEpisode[]
  queueDepth: number
  nowPlayingId: string
  onSelect: (id: string) => void
  onQueue: (id: string) => void
}

type UpNextCardProps = {
  item: FeedEpisode
  anticipation: number
  onSelect: (id: string) => void
  onQueueStart: (id: string) => void
  prefersReducedMotion: boolean | null
}

const UpNextChevronIcon = () => (
  <svg className="up-next__card-action-icon" viewBox="0 0 16 16" aria-hidden>
    <path
      d="M5.5 3.5L10.5 8L5.5 12.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const UpNextCard = ({
  item,
  anticipation,
  onSelect,
  onQueueStart,
  prefersReducedMotion,
}: UpNextCardProps) => {
  const coverBackground = useCoverCardBackground(item.coverSrc)
  const cardStyle = {
    background: coverBackground || TONE_BG[item.cardTone],
  } as CSSProperties
  const allowAnticipation = !prefersReducedMotion

  return (
    <>
      <button
        type="button"
        className="up-next__card"
        style={cardStyle}
        onClick={() => onSelect(item.id)}
        aria-label={`Play next: ${item.episodeTitle}`}
      >
        <FeedCard
          coverSrc={item.coverSrc}
          anticipation={anticipation}
          animateAnticipation={allowAnticipation}
          className="up-next__card-art-wrap"
          artClassName="up-next__card-art"
        />
        <div className="up-next__card-body">
          <p className="up-next__card-title">{item.episodeTitle}</p>
        </div>
      </button>
      <motion.button
        type="button"
        className="up-next__card-action"
        aria-label={`Queue ${item.episodeTitle} as next without switching`}
        onClick={(e) => {
          e.stopPropagation()
          onQueueStart(item.id)
        }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <UpNextChevronIcon />
      </motion.button>
    </>
  )
}

export const UpNextCarousel = ({
  items,
  nowPlayingId,
  onSelect,
  onQueue,
}: UpNextCarouselProps) => {
  const prefersReducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [displayItems, setDisplayItems] = useState(items)
  const [visibleItems, setVisibleItems] = useState(items)
  const [isLoading, setIsLoading] = useState(false)
  const [centerTrack, setCenterTrack] = useState(false)
  const [cardStride, setCardStride] = useState({ width: CARD_WIDTH, gap: CARD_GAP })
  const pendingQueueIdRef = useRef<string | null>(null)
  const queueTimerRef = useRef<number | null>(null)
  const prevNowPlayingIdRef = useRef(nowPlayingId)
  const isFirstMount = useRef(true)

  const resetScroll = useCallback(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = 0
  }, [])

  const measureTrack = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCenterTrack(el.scrollWidth <= el.clientWidth + 1)
    const shell = el.querySelector<HTMLElement>('.up-next__card-shell')
    if (!shell) return
    const trackStyles = getComputedStyle(el)
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || `${CARD_GAP}`)
    setCardStride({
      width: shell.offsetWidth,
      gap: Number.isFinite(gap) ? gap : CARD_GAP,
    })
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

  useEffect(() => {
    measureTrack()
    const el = scrollRef.current
    if (!el) return

    const ro = new ResizeObserver(measureTrack)
    ro.observe(el)
    return () => ro.disconnect()
  }, [visibleItems, displayItems.length, measureTrack])

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

  const visibleItemIds = useMemo(
    () => visibleItems.map((item) => item.id),
    [visibleItems],
  )
  const anticipationById = useUpNextAnticipation(
    scrollRef,
    visibleItemIds,
    !prefersReducedMotion,
  )
  const { autoplayCardId } = useFeedAutoplay(scrollRef, visibleItemIds)

  const isEmpty = displayItems.length === 0

  return (
    <section className="up-next" aria-labelledby="up-next-heading">
      <h2 id="up-next-heading" className="up-next__heading">
        Up Next
      </h2>

      <div className="up-next__carousel-wrap">
        <div
          className={`up-next__track${centerTrack ? ' up-next__track--centered' : ''}`}
          ref={scrollRef}
          role="list"
          aria-label="Up next queue"
          data-loading={isLoading || undefined}
        >
          {isEmpty ? (
            <div className="up-next__card-shell up-next__card-shell--solo" role="listitem">
              <div className="up-next__card up-next__card--placeholder">
                <p className="up-next__card-placeholder-text">
                  Nothing queued. Tap a podcast on Home to start a queue.
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  role="listitem"
                  layout={!prefersReducedMotion}
                  initial={false}
                  className={`up-next__card-shell${
                    autoplayCardId === item.id && !prefersReducedMotion
                      ? ' up-next__card-shell--autoplay'
                      : ''
                  }`}
                  data-feed-card-id={item.id}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, transition: exitTransition }
                      : {
                          x: cardStride.width + cardStride.gap,
                          opacity: 0,
                          transition: exitTransition,
                        }
                  }
                  transition={{
                    layout: layoutTransition,
                  }}
                >
                  <UpNextCard
                    item={item}
                    anticipation={anticipationById[item.id] ?? 0}
                    onSelect={onSelect}
                    onQueueStart={handleQueueStart}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
