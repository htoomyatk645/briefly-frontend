import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { VibeShelf as VibeShelfData } from '../../data/discoverFeed'
import { transition } from '../../styles/motion'
import './VibeShelves.css'

export type VibeChipProps = {
  vibe?: VibeShelfData
  onSelect?: (vibeId: string) => void
  loading?: boolean
  motionIndex?: number
  allowMotion?: boolean
}

const ACCENT_VAR: Record<string, string> = {
  primary: 'var(--primary)',
  'primary-soft': 'var(--primary)',
  'surface-alt': 'var(--text-secondary)',
  'text-muted': 'var(--text-muted)',
}

function accentCssVar(token: string): string {
  return ACCENT_VAR[token] ?? 'var(--primary)'
}

export const VibeChip = ({
  vibe,
  onSelect,
  loading = false,
  motionIndex = 0,
  allowMotion = true,
}: VibeChipProps) => {
  const prefersReducedMotion = useReducedMotion()
  const canAnimate = allowMotion && !prefersReducedMotion && !loading

  if (loading) {
    return (
      <div
        className="vibe-chip vibe-chip--loading"
        role="presentation"
        aria-hidden
      />
    )
  }

  if (!vibe) {
    return null
  }

  const handleClick = () => {
    console.log(`[VibeChip] navigate to vibe: ${vibe.id}`)
    onSelect?.(vibe.id)
  }

  const chipStyle = {
    '--vibe-accent': accentCssVar(vibe.accentToken),
  } as CSSProperties

  return (
    <motion.button
      type="button"
      role="listitem"
      className="vibe-chip"
      style={chipStyle}
      onClick={handleClick}
      aria-label={`${vibe.label}: ${vibe.subtitle}`}
      initial={canAnimate ? { opacity: 0, y: 6 } : false}
      animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
      transition={{
        ...transition.base,
        delay: canAnimate ? motionIndex * 0.04 : 0,
        duration: canAnimate ? 0.2 : 0,
      }}
      whileTap={
        canAnimate
          ? { scale: 0.97, transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] } }
          : undefined
      }
    >
      <span className="vibe-chip__highlight" aria-hidden />
      <span className="vibe-chip__copy">
        <span className="vibe-chip__subtitle">{vibe.subtitle}</span>
        <span className="vibe-chip__label">{vibe.label}</span>
      </span>
    </motion.button>
  )
}
