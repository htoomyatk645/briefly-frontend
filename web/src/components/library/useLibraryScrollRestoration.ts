import { useEffect, type RefObject } from 'react'
import { useLocation } from 'react-router-dom'

const SCROLL_KEY = 'briefly-library-scroll-y'

export function useLibraryScrollRestoration(
  scrollRef: RefObject<HTMLElement | null>,
) {
  const location = useLocation()
  const isLibraryIndex =
    location.pathname === '/library' || location.pathname === '/library/'

  useEffect(() => {
    if (!isLibraryIndex) return

    const el = scrollRef.current
    if (!el) return

    const saved = sessionStorage.getItem(SCROLL_KEY)
    if (!saved) return

    const frame = requestAnimationFrame(() => {
      el.scrollTop = Number.parseInt(saved, 10)
    })

    return () => cancelAnimationFrame(frame)
  }, [isLibraryIndex, scrollRef, location.key])

  useEffect(() => {
    if (!isLibraryIndex) return

    const el = scrollRef.current
    if (!el) return

    const save = () => {
      sessionStorage.setItem(SCROLL_KEY, String(el.scrollTop))
    }

    save()
    el.addEventListener('scroll', save, { passive: true })
    return () => {
      save()
      el.removeEventListener('scroll', save)
    }
  }, [isLibraryIndex, scrollRef])
}
