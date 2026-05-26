import { useCallback, useRef, type KeyboardEvent } from 'react'
import type { VibeShelf as VibeShelfData } from '../../data/discoverFeed'
import { VibeChip } from './VibeChip'

export type VibeShelfProps = {
  shelves: VibeShelfData[]
  loading?: boolean
  onSelect?: (vibeId: string) => void
  allowMotion?: boolean
  headingId: string
}

const LOADING_CHIP_COUNT = 5

export const VibeShelf = ({
  shelves,
  loading = false,
  onSelect,
  allowMotion = true,
  headingId,
}: VibeShelfProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const focusChipAt = useCallback((index: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const chips = scroller.querySelectorAll<HTMLButtonElement>('.vibe-chip:not(.vibe-chip--loading)')
    const target = chips[index]
    if (target) target.focus()
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const scroller = scrollerRef.current
      if (!scroller) return

      const chips = Array.from(
        scroller.querySelectorAll<HTMLButtonElement>('.vibe-chip:not(.vibe-chip--loading)'),
      )
      if (chips.length === 0) return

      const activeIndex = chips.findIndex((chip) => chip === document.activeElement)
      if (activeIndex === -1 && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return

      let nextIndex = activeIndex

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          nextIndex = activeIndex === -1 ? 0 : Math.min(activeIndex + 1, chips.length - 1)
          focusChipAt(nextIndex)
          break
        case 'ArrowLeft':
          event.preventDefault()
          nextIndex = activeIndex === -1 ? chips.length - 1 : Math.max(activeIndex - 1, 0)
          focusChipAt(nextIndex)
          break
        case 'Home':
          event.preventDefault()
          focusChipAt(0)
          break
        case 'End':
          event.preventDefault()
          focusChipAt(chips.length - 1)
          break
      }
    },
    [focusChipAt],
  )


  return (
    <div
      ref={scrollerRef}
      className="vibe-shelf__scroller"
      role="list"
      aria-labelledby={headingId}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {loading
        ? Array.from({ length: LOADING_CHIP_COUNT }, (_, index) => (
            <VibeChip key={`vibe-loading-${index}`} loading />
          ))
        : shelves.map((vibe, index) => (
            <VibeChip
              key={vibe.id}
              vibe={vibe}
              onSelect={onSelect}
              motionIndex={index}
              allowMotion={allowMotion}
            />
          ))}
    </div>
  )
}
