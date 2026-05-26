import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type LibrarySectionRevealProps = {
  children: ReactNode
  className?: string
}

const LIBRARY_EASE = [0.22, 1, 0.36, 1] as const

export function LibrarySectionReveal({ children, className }: LibrarySectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, { once: true, amount: 0.12 })

  if (prefersReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.28, ease: LIBRARY_EASE }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.28, ease: LIBRARY_EASE }}
    >
      {children}
    </motion.div>
  )
}
