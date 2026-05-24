export const motion = {
  ease: [0.22, 1, 0.36, 1] as const,
  durations: { fast: 180, base: 240, chipRelocate: 220, slow: 320, slower: 480 },
}

export const pressSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
}

export const toSeconds = (ms: number) => ms / 1000

export const transition = {
  fast: { duration: toSeconds(motion.durations.fast), ease: motion.ease },
  base: { duration: toSeconds(motion.durations.base), ease: motion.ease },
  chipRelocate: { duration: toSeconds(motion.durations.chipRelocate), ease: motion.ease },
  slow: { duration: toSeconds(motion.durations.slow), ease: motion.ease },
  slower: { duration: toSeconds(motion.durations.slower), ease: motion.ease },
}

export const routeVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}
