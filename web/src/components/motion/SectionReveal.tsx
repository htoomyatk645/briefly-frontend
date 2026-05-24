import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { sectionRevealVariants, transition } from '../../styles/motion'

const SESSION_PREFIX = 'briefly-section-seen:'

type SectionRevealProps = {
  id: string
  children: ReactNode
  className?: string
}

export const SectionReveal = ({ id, children, className }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [seenOnMount] = useState(
    () =>
      typeof window !== 'undefined' &&
      sessionStorage.getItem(`${SESSION_PREFIX}${id}`) === '1',
  )
  const isInView = useInView(ref, { once: true, amount: 0.12 })
  const revealed = seenOnMount || isInView

  useEffect(() => {
    if (isInView) {
      sessionStorage.setItem(`${SESSION_PREFIX}${id}`, '1')
    }
  }, [id, isInView])

  if (prefersReducedMotion || seenOnMount) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={sectionRevealVariants.hidden}
      animate={revealed ? sectionRevealVariants.visible : sectionRevealVariants.hidden}
      transition={transition.slow}
    >
      {children}
    </motion.div>
  )
}
