import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Callout,
  Divider,
  H2,
  Row,
  Stack,
  Text,
  useCanvasState,
} from 'cursor/canvas'

/** Briefly brand tokens — mirrors src/tokens.ts for canvas preview */
const t = {
  bg: '#0C0F14',
  accent: '#B8FF3C',
  textPrimary: '#F2F0EB',
  textSecondary: '#8A9099',
  radius: 8,
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  entrance: 360,
  transition: 240,
  micro: 120,
} as const

const DELAY_TAGLINE = t.entrance + t.micro
const DELAY_CTA = DELAY_TAGLINE + t.transition

function PhoneSplash({ replayKey }: { replayKey: number }) {
  const [showWordmark, setShowWordmark] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const timers = useRef<number[]>([])

  useEffect(() => {
    setShowWordmark(false)
    setShowTagline(false)
    setShowCta(false)

    const raf = requestAnimationFrame(() => setShowWordmark(true))
    timers.current = [
      window.setTimeout(() => setShowTagline(true), DELAY_TAGLINE),
      window.setTimeout(() => setShowCta(true), DELAY_CTA),
    ]

    return () => {
      cancelAnimationFrame(raf)
      timers.current.forEach(clearTimeout)
    }
  }, [replayKey])

  return (
    <div
      style={{
        width: 390,
        height: 844,
        background: t.bg,
        borderRadius: 40,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <h1
        style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 300,
          fontSize: 60,
          lineHeight: 1,
          fontVariationSettings: "'opsz' 144",
          color: t.textPrimary,
          margin: 0,
          opacity: showWordmark ? 1 : 0,
          transform: showWordmark ? 'scale(1)' : 'scale(0.94)',
          transition: `opacity ${t.entrance}ms ${t.ease}, transform ${t.entrance}ms ${t.ease}`,
        }}
      >
        Briefly
      </h1>

      <p
        style={{
          fontFamily: "'Geist', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: 15,
          lineHeight: '22px',
          letterSpacing: '0.04em',
          color: t.textSecondary,
          margin: '16px 0 0',
          opacity: showTagline ? 1 : 0,
          transition: `opacity ${t.transition}ms ${t.ease}`,
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
          gap: 16,
          padding: '0 24px 48px',
        }}
      >
        <button
          type="button"
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 15,
            color: t.bg,
            background: t.accent,
            border: 'none',
            borderRadius: t.radius,
            padding: '12px 24px',
            width: '100%',
            maxWidth: 340,
            cursor: 'pointer',
            opacity: showCta ? 1 : 0,
            transform: showCta ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity ${t.transition}ms ${t.ease}, transform ${t.transition}ms ${t.ease}`,
          }}
        >
          Get started
        </button>

        <button
          type="button"
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: t.textSecondary,
            background: 'transparent',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            opacity: showCta ? 1 : 0,
            transform: showCta ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity ${t.transition}ms ${t.ease}, transform ${t.transition}ms ${t.ease}`,
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  )
}

export default function BrieflySplashLive() {
  const [replayKey, setReplayKey] = useCanvasState('splash-replay', 0)

  return (
    <Stack gap={20}>
      <Row gap={12} align="center" justify="space-between" wrap>
        <H2 style={{ margin: 0 }}>Briefly Splash — Live Preview</H2>
        <Button
          variant="secondary"
          onClick={() => setReplayKey((k) => k + 1)}
        >
          Replay entrance
        </Button>
      </Row>

      <Text tone="secondary" size="small">
        Source of truth: src/components/SplashScreen.tsx · Dev server:
        http://localhost:5173
      </Text>

      <Row gap={32} align="start" wrap>
        <PhoneSplash replayKey={replayKey} />

        <Stack gap={16} style={{ flex: 1, minWidth: 280 }}>
          <H2>Design notes</H2>

          <Callout tone="info">
            <Text weight="medium">What's working</Text>
            <Text tone="secondary" size="small">
              The wordmark at opsz 144 reads editorial, not startup. The dark
              field lets Fraunces carry the screen. CTA placement at the bottom
              keeps the center still.
            </Text>
          </Callout>

          <Callout tone="warning">
            <Text weight="medium">Suggested tweaks</Text>
            <Text tone="secondary" size="small">
              1. Bump tagline margin-top from 16px to 20px — more breathing room
              between wordmark and manifesto.
            </Text>
            <Text tone="secondary" size="small">
              2. CTA max-width 340px feels narrow on tablet — consider 100% on
              mobile, capped at 400px on larger screens.
            </Text>
            <Text tone="secondary" size="small">
              3. Add a 1px top border on the bottom CTA cluster at border.subtle
              opacity — anchors the actions without breaking the darkness.
            </Text>
          </Callout>

          <Divider />

          <Text tone="secondary" size="small">
            Tell me what to change and I'll update SplashScreen.tsx — the dev
            server hot-reloads instantly.
          </Text>
        </Stack>
      </Row>
    </Stack>
  )
}
