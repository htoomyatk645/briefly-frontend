import { useEffect, useState } from 'react'
import { sleep, WELCOME_TIMING } from './welcomeSequence'

export const useWelcomeSequence = () => {
  const [showLogo, setShowLogo] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showCta, setShowCta] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReduced) {
        setShowLogo(true)
        setShowTagline(true)
        setShowCta(true)
        return
      }

      setShowLogo(true)

      await sleep(WELCOME_TIMING.taglineAfterLogoMs)
      if (cancelled) return
      setShowTagline(true)
    }

    void run()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    showLogo,
    showTagline,
    showCta,
    setShowCta,
  }
}
