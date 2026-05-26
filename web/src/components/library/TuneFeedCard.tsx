import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconChevronRight, IconSliders } from './icons'
import { TuneFeedDrawer } from './TuneFeedDrawer'
import { useMatchMinWidth } from './useMatchMinWidth'
import './tuneFeed.css'

export default function TuneFeedCard() {
  const navigate = useNavigate()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const isDesktop = useMatchMinWidth('(min-width: 1024px)')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openSurface = useCallback(() => {
    if (isDesktop) {
      setDrawerOpen(true)
      return
    }
    navigate('/library/tune')
  }, [isDesktop, navigate])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="tune-feed-card"
        onClick={openSurface}
        aria-haspopup={isDesktop ? 'dialog' : undefined}
        aria-expanded={isDesktop ? drawerOpen : undefined}
      >
        <span className="tune-feed-card__icon" aria-hidden>
          <IconSliders />
        </span>
        <span className="tune-feed-card__copy">
          <span className="tune-feed-card__title">Tune your feed</span>
          <span className="tune-feed-card__caption">
            Calibrate what shows up. We'll learn the rest.
          </span>
        </span>
        <span className="tune-feed-card__chevron" aria-hidden>
          <IconChevronRight />
        </span>
      </button>

      {isDesktop ? <TuneFeedDrawer open={drawerOpen} onClose={closeDrawer} /> : null}
    </>
  )
}
