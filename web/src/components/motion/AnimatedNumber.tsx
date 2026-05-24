import { animate, useMotionValue, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { motion as motionTokens, toSeconds } from '../../styles/motion'

type AnimatedNumberProps = {
  value: number
  format?: (value: number) => string
  className?: string
}

export const AnimatedNumber = ({
  value,
  format = (n) => String(Math.round(n)),
  className,
}: AnimatedNumberProps) => {
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(value)
  const [display, setDisplay] = useState(() => format(value))

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(format(value))
      return
    }

    const controls = animate(motionValue, value, {
      duration: toSeconds(motionTokens.durations.slow),
      ease: motionTokens.ease,
      onUpdate: (latest) => setDisplay(format(latest)),
    })

    return () => controls.stop()
  }, [value, format, motionValue, prefersReducedMotion])

  return <span className={className}>{display}</span>
}
