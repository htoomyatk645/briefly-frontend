import { motion, useReducedMotion } from 'framer-motion'
import type { ComponentType, SVGProps } from 'react'

export type InterestCardProps = {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone: string
  isSelected: boolean
  onToggle: (id: string) => void
  index: number
}

const EASE = [0.22, 1, 0.36, 1] as const

export const InterestCard = ({
  id,
  label,
  icon: Icon,
  tone,
  isSelected,
  onToggle,
  index,
}: InterestCardProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={`interest-card interest-card--${tone}`}
      onClick={() => onToggle(id)}
      aria-pressed={isSelected}
      aria-label={`${label}${isSelected ? ', selected' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.28, delay: index * 0.04, ease: EASE },
        y: { duration: 0.32, delay: index * 0.04, ease: EASE },
        scale: { duration: 0.2, ease: EASE },
      }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      <span className="interest-card__icon-wrap" aria-hidden>
        <Icon />
      </span>
      <span className="interest-card__label">{label}</span>
      <motion.span
        className="interest-card__check"
        aria-hidden
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0,
          scale: isSelected ? 1 : 0.6,
        }}
        transition={{ duration: 0.18, ease: EASE }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.2l3 3 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </motion.button>
  )
}
