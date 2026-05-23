import { useCallback, useEffect, useRef, useState } from 'react'
import type { FeedEpisode } from './feedData'
import { feedAssetsRemote } from './feedAssets'

type UpNextCarouselProps = {
  items: FeedEpisode[]
  queueDepth: number
  onSelect: (id: string) => void
}

export const UpNextCarousel = ({ items, queueDepth, onSelect }: UpNextCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)

  const dotCount = Math.min(Math.max(queueDepth, 1), 8)

  useEffect(() => {
    const el = scrollRef.current
    if (!el?.firstElementChild || items.length < 2) return
    const card = el.firstElementChild as HTMLElement
    const target = Math.min(1, items.length - 1)
    el.scrollLeft = target * (card.offsetWidth + 10)
    setScrollIndex(target)
  }, [items.length])

  const updateIndexFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el?.firstElementChild) return
    const card = el.firstElementChild as HTMLElement
    const idx = Math.round(el.scrollLeft / (card.offsetWidth + 10))
    setScrollIndex(Math.min(Math.max(0, idx), items.length - 1))
  }, [items.length])

  return (
    <section className="up-next" aria-labelledby="up-next-heading">
      <h2 id="up-next-heading" className="up-next__heading">
        Up Next
      </h2>

      <div className="up-next__carousel-wrap">
        <div className="up-next__peek up-next__peek--left" aria-hidden />

        <div
          className="up-next__track"
          ref={scrollRef}
          onScroll={updateIndexFromScroll}
          role="list"
          aria-label="Up next queue"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="listitem"
              className={`up-next__card up-next__card--${item.cardTone}`}
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
          ))}
        </div>

        <div className="up-next__peek up-next__peek--right" aria-hidden />
      </div>

      <div className="up-next__dots" role="tablist" aria-label={`${queueDepth} episodes in queue`}>
        {Array.from({ length: dotCount }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className={`up-next__dot${i === scrollIndex ? ' up-next__dot--active' : ''}`}
            aria-selected={i === scrollIndex}
            aria-label={`Queue position ${i + 1} of ${dotCount}`}
            onClick={() => {
              const el = scrollRef.current
              if (!el?.firstElementChild || i >= items.length) return
              const card = el.firstElementChild as HTMLElement
              el.scrollTo({ left: i * (card.offsetWidth + 10), behavior: 'smooth' })
              setScrollIndex(i)
            }}
          />
        ))}
      </div>
    </section>
  )
}
