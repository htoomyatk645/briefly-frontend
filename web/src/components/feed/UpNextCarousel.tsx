import { useCallback, useEffect, useRef, useState } from 'react'
import type { FeedEpisode } from './feedData'
import { feedAssetsRemote } from './feedAssets'

const CARD_WIDTH = 130
const CARD_GAP = 10

type UpNextCarouselProps = {
  items: FeedEpisode[]
  queueDepth: number
  onSelect: (id: string) => void
}

export const UpNextCarousel = ({ items, onSelect }: UpNextCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [displayItems, setDisplayItems] = useState(items)
  const [isLoading, setIsLoading] = useState(false)
  const itemsKeyRef = useRef('')
  const isFirstMount = useRef(true)

  const itemsKey = items.map((item) => item.id).join('|')
  const dotCount = Math.min(items.length, 8)
  const hasOverflow = items.length > 8

  const resetScroll = useCallback(() => {
    setScrollIndex(0)
    const el = scrollRef.current
    if (el) el.scrollLeft = 0
  }, [])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      itemsKeyRef.current = itemsKey
      setDisplayItems(items)
      resetScroll()
      return
    }

    if (itemsKey === itemsKeyRef.current) return

    setIsLoading(true)

    const frame = requestAnimationFrame(() => {
      setDisplayItems(items)
      itemsKeyRef.current = itemsKey
      setIsLoading(false)
      resetScroll()
    })

    return () => cancelAnimationFrame(frame)
  }, [items, itemsKey, resetScroll])

  const updateIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round((el.scrollLeft + CARD_WIDTH / 2) / (CARD_WIDTH + CARD_GAP))
    setScrollIndex(Math.min(Math.max(0, idx), displayItems.length - 1))
  }, [displayItems.length])

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el || index >= displayItems.length) return
    el.scrollTo({ left: index * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
    setScrollIndex(index)
  }, [displayItems.length])

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
            displayItems.map((item) => (
              <button
                key={item.id}
                type="button"
                role="listitem"
                className="up-next__card"
                onClick={() => onSelect(item.id)}
                aria-label={`Play next: ${item.episodeTitle}`}
              >
                <img src={item.coverSrc} alt="" className="up-next__card-cover" />
                <div className="up-next__card-scrim" aria-hidden />
                <p className="up-next__card-title">{item.episodeTitle}</p>
                <span className="up-next__card-action" aria-hidden>
                  <img
                    src={feedAssetsRemote.controls.chevron}
                    alt=""
                    className="up-next__card-action-icon"
                  />
                </span>
              </button>
            ))
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
