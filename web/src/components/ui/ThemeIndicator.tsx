import { useTheme } from '../../theme/useTheme'
import '../../styles/header-actions.css'

const SunMoonIcon = ({ isDark }: { isDark: boolean }) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
    {isDark ? (
      <>
        <path
          d="M14.5 11.2a4.8 4.8 0 0 1-6.8-6.8 4.9 4.9 0 1 0 6.8 6.8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M10 2.5v1.2M10 16.3v1.2M2.5 10h1.2M16.3 10h1.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.35"
        />
      </>
    ) : (
      <>
        <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 3.5v1.4M10 15.1v1.4M3.5 10h1.4M15.1 10h1.4M5.4 5.4l1 1M13.6 13.6l1 1M5.4 14.6l1-1M13.6 6.4l1-1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
)

type ThemeIndicatorProps = {
  className?: string
}

export const ThemeIndicator = ({ className = '' }: ThemeIndicatorProps) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <span
      className={`theme-indicator header-icon-btn ${className}`.trim()}
      title="Follows system setting"
      aria-label="Follows system setting"
    >
      <SunMoonIcon isDark={isDark} />
    </span>
  )
}
