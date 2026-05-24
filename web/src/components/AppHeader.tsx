import { useEffect, useRef, type RefObject } from 'react'
import { BrieflyLogo } from './onboarding/BrieflyLogo'
import { AccountMenuButton } from './home/AccountMenuButton'
import { ThemeIndicator } from './ui/ThemeIndicator'
import '../styles/app-header.css'
import '../styles/header-actions.css'

type AppHeaderProps = {
  scrollContainerRef: RefObject<HTMLElement | null>
  layoutKey?: string
}

export const AppHeader = ({ scrollContainerRef, layoutKey }: AppHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scrollEl = scrollContainerRef.current
    if (!scrollEl) return

    const syncScrolled = () => {
      const scrolled = scrollEl.scrollTop > 0
      headerRef.current?.setAttribute(
        'data-scrolled',
        scrolled ? 'true' : 'false',
      )
    }

    syncScrolled()
    scrollEl.addEventListener('scroll', syncScrolled, { passive: true })

    return () => scrollEl.removeEventListener('scroll', syncScrolled)
  }, [scrollContainerRef, layoutKey])

  return (
    <header
      ref={headerRef}
      className="app-header"
      data-scrolled="false"
      aria-label="Briefly"
    >
      <BrieflyLogo className="app-header__wordmark" />
      <div className="app-header__actions">
        <ThemeIndicator />
        <AccountMenuButton />
      </div>
    </header>
  )
}
