import { useEffect, useRef, useState, type RefObject } from 'react'
import {
  FEED_CENTER_THRESHOLD_PX,
  FEED_DWELL_MS,
  FEED_SCROLL_VELOCITY_THRESHOLD,
} from './feedAutoplayConfig'

const VELOCITY_SAMPLES = 6

export type UseFeedScrollIntentOptions = {
  enabled?: boolean
  cardIds?: string[]
  centerThresholdPx?: number
  velocityThresholdPxMs?: number
  dwellMs?: number
  onDwellComplete?: (cardId: string) => void
  onScrollActive?: () => void
}

function findCenteredCardId(
  container: HTMLElement,
  cardIds: string[],
  centerThresholdPx: number,
): string | null {
  const containerRect = container.getBoundingClientRect()
  const centerX = containerRect.left + containerRect.width / 2

  let closestId: string | null = null
  let closestDistance = Number.POSITIVE_INFINITY

  for (const cardId of cardIds) {
    const card = container.querySelector<HTMLElement>(`[data-feed-card-id="${cardId}"]`)
    if (!card) continue

    const cardRect = card.getBoundingClientRect()
    const cardCenter = cardRect.left + cardRect.width / 2
    const distance = Math.abs(cardCenter - centerX)

    if (distance <= centerThresholdPx && distance < closestDistance) {
      closestDistance = distance
      closestId = cardId
    }
  }

  return closestId
}

export function useFeedScrollIntent(
  containerRef: RefObject<HTMLElement | null>,
  {
    enabled = true,
    cardIds = [],
    centerThresholdPx = FEED_CENTER_THRESHOLD_PX,
    velocityThresholdPxMs = FEED_SCROLL_VELOCITY_THRESHOLD,
    dwellMs = FEED_DWELL_MS,
    onDwellComplete,
    onScrollActive,
  }: UseFeedScrollIntentOptions = {},
) {
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const [dwellCardId, setDwellCardId] = useState<string | null>(null)

  const velocityRef = useRef(0)
  const dwellRef = useRef<string | null>(null)
  const dwellTimerRef = useRef<number | null>(null)
  const velocitySamplesRef = useRef<number[]>([])
  const lastScrollLeftRef = useRef(0)
  const lastSampleTimeRef = useRef(0)
  const onDwellCompleteRef = useRef(onDwellComplete)
  const onScrollActiveRef = useRef(onScrollActive)

  onDwellCompleteRef.current = onDwellComplete
  onScrollActiveRef.current = onScrollActive

  const clearDwellTimer = () => {
    if (dwellTimerRef.current != null) {
      window.clearTimeout(dwellTimerRef.current)
      dwellTimerRef.current = null
    }
  }

  const scheduleDwellTimer = () => {
    clearDwellTimer()

    const cardId = dwellRef.current
    if (!cardId || velocityRef.current >= velocityThresholdPxMs) return

    dwellTimerRef.current = window.setTimeout(() => {
      dwellTimerRef.current = null
      if (
        velocityRef.current < velocityThresholdPxMs &&
        dwellRef.current === cardId
      ) {
        onDwellCompleteRef.current?.(cardId)
      }
    }, dwellMs)
  }

  useEffect(() => {
    if (!enabled) {
      velocityRef.current = 0
      dwellRef.current = null
      clearDwellTimer()
      setScrollVelocity(0)
      setDwellCardId(null)
      return
    }

    const container = containerRef.current
    if (!container) return

    lastScrollLeftRef.current = container.scrollLeft
    lastSampleTimeRef.current = performance.now()
    velocitySamplesRef.current = []

    const updateIntent = (isScrollEvent: boolean) => {
      const centeredCardId = findCenteredCardId(container, cardIds, centerThresholdPx)
      dwellRef.current = centeredCardId
      setDwellCardId(centeredCardId)

      if (isScrollEvent) {
        onScrollActiveRef.current?.()
      }

      if (velocityRef.current >= velocityThresholdPxMs) {
        clearDwellTimer()
        return
      }

      if (centeredCardId) {
        scheduleDwellTimer()
      } else {
        clearDwellTimer()
      }
    }

    const handleScroll = () => {
      const now = performance.now()
      const deltaTime = now - lastSampleTimeRef.current
      const deltaScroll = Math.abs(container.scrollLeft - lastScrollLeftRef.current)

      if (deltaTime > 0) {
        const sample = deltaScroll / deltaTime
        const samples = velocitySamplesRef.current
        samples.push(sample)
        if (samples.length > VELOCITY_SAMPLES) samples.shift()

        const average =
          samples.reduce((total, value) => total + value, 0) / samples.length
        velocityRef.current = average
        setScrollVelocity(average)
      }

      lastScrollLeftRef.current = container.scrollLeft
      lastSampleTimeRef.current = now
      updateIntent(true)
    }

    const handleResize = () => {
      updateIntent(false)
    }

    updateIntent(false)
    container.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearDwellTimer()
    }
  }, [
    enabled,
    containerRef,
    cardIds,
    centerThresholdPx,
    velocityThresholdPxMs,
    dwellMs,
  ])

  return {
    scrollVelocity,
    dwellCardId,
  }
}
