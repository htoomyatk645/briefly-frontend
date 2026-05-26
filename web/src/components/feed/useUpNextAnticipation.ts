import { useCallback, useEffect, useState, type RefObject } from 'react'
import { computeCardAnticipation } from './feedCardAnticipation'

export function useUpNextAnticipation(
  scrollRef: RefObject<HTMLElement | null>,
  itemIds: string[],
  enabled = true,
) {
  const [anticipationById, setAnticipationById] = useState<Record<string, number>>({})

  const updateAnticipation = useCallback(() => {
    const track = scrollRef.current
    if (!track || !enabled) {
      setAnticipationById({})
      return
    }

    const next: Record<string, number> = {}
    for (const id of itemIds) {
      const shell = track.querySelector<HTMLElement>(`[data-feed-card-id="${id}"]`)
      if (!shell) {
        next[id] = 0
        continue
      }
      next[id] = computeCardAnticipation(shell, track)
    }
    setAnticipationById(next)
  }, [enabled, itemIds, scrollRef])

  useEffect(() => {
    updateAnticipation()
  }, [updateAnticipation])

  useEffect(() => {
    const track = scrollRef.current
    if (!track || !enabled) return

    track.addEventListener('scroll', updateAnticipation, { passive: true })
    window.addEventListener('resize', updateAnticipation)

    const ro = new ResizeObserver(updateAnticipation)
    ro.observe(track)

    return () => {
      track.removeEventListener('scroll', updateAnticipation)
      window.removeEventListener('resize', updateAnticipation)
      ro.disconnect()
    }
  }, [enabled, scrollRef, updateAnticipation])

  return anticipationById
}
