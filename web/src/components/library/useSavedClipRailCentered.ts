import { useEffect, useState, type RefObject } from 'react'

const CENTER_THRESHOLD_PX = 48

export function useSavedClipRailCentered(
  railRef: RefObject<HTMLElement | null>,
  cardRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [isCentered, setIsCentered] = useState(false)

  useEffect(() => {
    const rail = railRef.current
    const card = cardRef.current
    if (!enabled || !rail || !card) {
      setIsCentered(false)
      return
    }

    const update = () => {
      const railRect = rail.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const railCenter = railRect.left + railRect.width / 2
      const cardCenter = cardRect.left + cardRect.width / 2
      setIsCentered(Math.abs(cardCenter - railCenter) <= CENTER_THRESHOLD_PX)
    }

    update()
    rail.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsCentered(false)
          return
        }
        update()
      },
      { root: rail, threshold: 0.7 },
    )
    observer.observe(card)

    return () => {
      rail.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [railRef, cardRef, enabled])

  return isCentered
}
