import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const ENTRANCE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const ENTRANCE_MS = 280

type UseFeedLayoutEntranceOptions = {
  enabled?: boolean
  threshold?: number
  staggerMs?: number
}

export function useFeedLayoutEntrance<T extends HTMLElement = HTMLElement>({
  enabled = true,
  threshold = 0.15,
  staggerMs = 0,
}: UseFeedLayoutEntranceOptions = {}) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!enabled || !node) {
      setVisible(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, threshold])

  const style = {
    opacity: visible ? 1 : 0,
    transform: prefersReducedMotion
      ? undefined
      : visible
        ? 'translateY(0)'
        : 'translateY(12px)',
    transition: prefersReducedMotion
      ? `opacity ${ENTRANCE_MS}ms ${ENTRANCE_EASE}`
      : `opacity ${ENTRANCE_MS}ms ${ENTRANCE_EASE}, transform ${ENTRANCE_MS}ms ${ENTRANCE_EASE}`,
    transitionDelay: staggerMs > 0 ? `${staggerMs}ms` : undefined,
  } as const

  return { ref, visible, style }
}
