import { useCallback, useEffect, useRef, useState } from 'react'
import {
  colors,
  fontFamily,
  fontWeight,
  motion,
  radius,
  spacing,
} from '../tokens'

type SplashScreenProps = {
  onGetStarted: () => void
  onSignIn: () => void
}

/**
 * Entrance timing derived from the spec:
 *   1. Wordmark — immediate, 360ms (entrance duration)
 *   2. Tagline  — 120ms after wordmark begins, 240ms (transition duration)
 *   3. CTA      — 240ms after tagline begins, 240ms (transition duration)
 */
const DELAY_TAGLINE = motion.duration.entrance + motion.duration.micro
const DELAY_CTA = DELAY_TAGLINE + motion.duration.transition

const EASE = motion.easing.default

export const SplashScreen = ({ onGetStarted, onSignIn }: SplashScreenProps) => {
  const [showWordmark, setShowWordmark] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [ctaHover, setCtaHover] = useState(false)
  const [signInHover, setSignInHover] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      setShowWordmark(true)
      setShowTagline(true)
      setShowCta(true)
      return
    }

    const raf = requestAnimationFrame(() => setShowWordmark(true))
    timers.current.push(
      window.setTimeout(() => setShowTagline(true), DELAY_TAGLINE),
      window.setTimeout(() => setShowCta(true), DELAY_CTA),
    )

    return () => {
      cancelAnimationFrame(raf)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        action()
      }
    },
    [],
  )

  return (
    <main
      style={{
        backgroundColor: colors.bg.primary,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing[12]}px ${spacing[6]}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Welcome to Briefly"
    >
      <h1
        style={{
          fontFamily: fontFamily.display,
          fontWeight: fontWeight.light,
          fontSize: 60,
          lineHeight: 1,
          fontVariationSettings: "'opsz' 144",
          color: colors.text.primary,
          margin: 0,
          opacity: showWordmark ? 1 : 0,
          transform: showWordmark ? 'scale(1)' : 'scale(0.94)',
          transition: [
            `opacity ${motion.duration.entrance}ms ${EASE}`,
            `transform ${motion.duration.entrance}ms ${EASE}`,
          ].join(', '),
          willChange: 'opacity, transform',
          userSelect: 'none',
        }}
      >
        Briefly
      </h1>

      <p
        style={{
          fontFamily: fontFamily.body,
          fontWeight: fontWeight.regular,
          fontSize: 15,
          lineHeight: '22px',
          letterSpacing: '0.04em',
          color: colors.text.secondary,
          margin: 0,
          marginTop: spacing[4],
          opacity: showTagline ? 1 : 0,
          transition: `opacity ${motion.duration.transition}ms ${EASE}`,
          willChange: 'opacity',
        }}
      >
        The best parts. Nothing else.
      </p>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing[4],
          paddingBottom: spacing[12],
          paddingLeft: spacing[6],
          paddingRight: spacing[6],
        }}
      >
        <button
          type="button"
          onClick={onGetStarted}
          onKeyDown={(e) => handleKeyDown(e, onGetStarted)}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          style={{
            fontFamily: fontFamily.body,
            fontWeight: fontWeight.medium,
            fontSize: 15,
            lineHeight: '20px',
            color: colors.bg.primary,
            backgroundColor: colors.accent.primary,
            border: 'none',
            borderRadius: radius.md,
            padding: `${spacing[3]}px ${spacing[6]}px`,
            width: '100%',
            maxWidth: 340,
            cursor: 'pointer',
            opacity: showCta ? (ctaHover ? 0.88 : 1) : 0,
            transform: showCta ? 'translateY(0)' : `translateY(${spacing[2]}px)`,
            transition: [
              `opacity ${motion.duration.transition}ms ${EASE}`,
              `transform ${motion.duration.transition}ms ${EASE}`,
            ].join(', '),
            willChange: 'opacity, transform',
          }}
        >
          Get started
        </button>

        <button
          type="button"
          onClick={onSignIn}
          onKeyDown={(e) => handleKeyDown(e, onSignIn)}
          onMouseEnter={() => setSignInHover(true)}
          onMouseLeave={() => setSignInHover(false)}
          style={{
            fontFamily: fontFamily.body,
            fontWeight: fontWeight.regular,
            fontSize: 15,
            lineHeight: '20px',
            color: signInHover ? colors.text.primary : colors.text.secondary,
            backgroundColor: 'transparent',
            border: 'none',
            padding: `${spacing[2]}px ${spacing[4]}px`,
            cursor: 'pointer',
            opacity: showCta ? 1 : 0,
            transform: showCta ? 'translateY(0)' : `translateY(${spacing[2]}px)`,
            transition: [
              `opacity ${motion.duration.transition}ms ${EASE}`,
              `transform ${motion.duration.transition}ms ${EASE}`,
              `color ${motion.duration.micro}ms ${EASE}`,
            ].join(', '),
            willChange: 'opacity, transform',
          }}
        >
          Sign in
        </button>
      </div>
    </main>
  )
}
