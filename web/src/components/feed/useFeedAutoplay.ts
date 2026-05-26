import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { FeedAutoplayAudioEngine } from './feedAutoplayAudio'
import {
  FEED_AUTOPLAY_EVENT,
  isFeedAutoplayEnabled,
  type FeedAutoplayEventDetail,
} from './feedAutoplayConfig'
import { useFeedScrollIntent } from './useFeedScrollIntent'

export type UseFeedAutoplayOptions = {
  enabled?: boolean
  onAutoplay?: (cardId: string) => void
}

export function useFeedAutoplay(
  containerRef: RefObject<HTMLElement | null>,
  cardIds: string[],
  { enabled = isFeedAutoplayEnabled(), onAutoplay }: UseFeedAutoplayOptions = {},
) {
  const [autoplayCardId, setAutoplayCardId] = useState<string | null>(null)
  const engineRef = useRef<FeedAutoplayAudioEngine | null>(null)
  const autoplayCardRef = useRef<string | null>(null)
  const onAutoplayRef = useRef(onAutoplay)

  onAutoplayRef.current = onAutoplay
  autoplayCardRef.current = autoplayCardId

  if (!engineRef.current) {
    engineRef.current = new FeedAutoplayAudioEngine()
  }

  const dispatchAutoplayEvent = useCallback(
    (cardId: string) => {
      const card = containerRef.current?.querySelector<HTMLElement>(
        `[data-feed-card-id="${cardId}"]`,
      )
      if (!card) return

      card.dispatchEvent(
        new CustomEvent<FeedAutoplayEventDetail>(FEED_AUTOPLAY_EVENT, {
          bubbles: true,
          detail: { cardId },
        }),
      )
    },
    [containerRef],
  )

  const stopAutoplay = useCallback(async (cardId: string) => {
    await engineRef.current?.stop(cardId)
    if (autoplayCardRef.current === cardId) {
      setAutoplayCardId(null)
    }
  }, [])

  const startAutoplay = useCallback(
    async (cardId: string) => {
      if (autoplayCardRef.current === cardId) return

      if (autoplayCardRef.current) {
        await stopAutoplay(autoplayCardRef.current)
      }

      await engineRef.current?.start(cardId)
      setAutoplayCardId(cardId)
      dispatchAutoplayEvent(cardId)
      onAutoplayRef.current?.(cardId)
    },
    [dispatchAutoplayEvent, stopAutoplay],
  )

  const intent = useFeedScrollIntent(containerRef, {
    enabled: enabled && cardIds.length > 0,
    cardIds,
    onDwellComplete: (cardId) => {
      void startAutoplay(cardId)
    },
  })

  useEffect(() => {
    if (!enabled) return

    if (autoplayCardId && intent.dwellCardId !== autoplayCardId) {
      void stopAutoplay(autoplayCardId)
    }
  }, [enabled, autoplayCardId, intent.dwellCardId, stopAutoplay])

  useEffect(() => {
    const engine = engineRef.current
    return () => {
      engine?.dispose()
      engineRef.current = null
    }
  }, [])

  return useMemo(
    () => ({
      scrollVelocity: intent.scrollVelocity,
      dwellCardId: intent.dwellCardId,
      autoplayCardId,
    }),
    [intent.scrollVelocity, intent.dwellCardId, autoplayCardId],
  )
}
