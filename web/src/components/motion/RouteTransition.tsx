import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { routeVariants, transition } from '../../styles/motion'

type RouteTransitionProps = {
  routeKey: string
  children: ReactNode
  className?: string
  fillViewport?: boolean
}

export const RouteTransition = ({
  routeKey,
  children,
  className,
  fillViewport = true,
}: RouteTransitionProps) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      key={routeKey}
      className={className}
      initial={routeVariants.initial}
      animate={routeVariants.animate}
      exit={routeVariants.exit}
      transition={transition.base}
      style={fillViewport ? { height: '100%', minHeight: 0 } : undefined}
    >
      {children}
    </motion.div>
  )
}
