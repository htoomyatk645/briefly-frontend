import { motion, useReducedMotion } from 'framer-motion'
import type { ComponentType, SVGProps } from 'react'

export type ListeningHabitCardProps = {
  id: string
  label: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  tone: string
  isSelected: boolean
  onToggle: (id: string) => void
  index: number
}

const EASE = [0.22, 1, 0.36, 1] as const

export const ListeningHabitCard = ({
  id,
  label,
  description,
  icon: Icon,
  tone,
  isSelected,
  onToggle,
  index,
}: ListeningHabitCardProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={`listening-habit-card listening-habit-card--${tone}`}
      onClick={() => onToggle(id)}
      aria-pressed={isSelected}
      aria-label={`${label}. ${description}${isSelected ? ', selected' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        delay: index * 0.06,
        ease: EASE,
      }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
    >
      <span className="listening-habit-card__decor" aria-hidden />
      <span className="listening-habit-card__icon-wrap" aria-hidden>
        <Icon />
      </span>
      <span className="listening-habit-card__copy">
        <span className="listening-habit-card__label">{label}</span>
        <span className="listening-habit-card__description">{description}</span>
      </span>
      <motion.span
        className="listening-habit-card__check"
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
