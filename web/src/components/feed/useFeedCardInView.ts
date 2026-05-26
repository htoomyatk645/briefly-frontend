import { useEffect, useRef, useState } from 'react'

type UseFeedCardInViewOptions = {
  enabled?: boolean
  threshold?: number
}

export function useFeedCardInView<T extends HTMLElement = HTMLElement>({
  enabled = true,
  threshold = 0.25,
}: UseFeedCardInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!enabled || !node) {
      setInView(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, threshold])

  return { ref, inView }
}
