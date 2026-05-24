import { motion } from 'framer-motion'
import { useTheme } from '../../theme/useTheme'
import { pressSpring } from '../../styles/motion'
import '../../styles/header-actions.css'

const SunIcon = () => (
  <svg width={24} height={24} viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 3.5v1.4M10 15.1v1.4M3.5 10h1.4M15.1 10h1.4M5.4 5.4l1 1M13.6 13.6l1 1M5.4 14.6l1-1M13.6 6.4l1-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = () => (
  <svg width={24} height={24} viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M14.2 11.4a4.8 4.8 0 1 1-5.6-5.6 4.2 4.2 0 0 0 5.6 5.6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

type ThemeIndicatorProps = {
  className?: string
}

export const ThemeIndicator = ({ className = '' }: ThemeIndicatorProps) => {
  const { theme, followsSystem, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const hint = followsSystem ? ' (currently follows system)' : ''

  return (
    <motion.button
      type="button"
      className={`theme-indicator header-icon-btn ${className}`.trim()}
      onClick={toggleTheme}
      title={`${label}${hint}`}
      aria-label={`${label}${hint}`}
      whileTap={{ scale: 0.97 }}
      transition={pressSpring}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </motion.button>
  )
}
