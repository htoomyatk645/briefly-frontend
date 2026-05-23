import { useTheme } from '../../theme/useTheme'
import './theme-toggle.css'

const SunIcon = () => (
  <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx={9} cy={9} r={3.25} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1.1 1.1M12.8 12.8l1.1 1.1M4.1 13.9l1.1-1.1M12.8 5.2l1.1-1.1"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = () => (
  <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M14.2 10.4a5.4 5.4 0 0 1-7.6-7.6 5.6 5.6 0 1 0 7.6 7.6z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
)

type ThemeToggleProps = {
  className?: string
  showLabel?: boolean
}

export const ThemeToggle = ({ className = '', showLabel = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle${showLabel ? ' theme-toggle--labeled' : ''} ${className}`.trim()}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle__track" aria-hidden>
        <span
          className={`theme-toggle__option${!isDark ? ' theme-toggle__option--active' : ''}`}
        >
          <SunIcon />
          {showLabel ? <span>Light</span> : null}
        </span>
        <span
          className={`theme-toggle__option${isDark ? ' theme-toggle__option--active' : ''}`}
        >
          <MoonIcon />
          {showLabel ? <span>Dark</span> : null}
        </span>
        <span
          className="theme-toggle__thumb"
          style={{ transform: isDark ? 'translateX(100%)' : 'translateX(0)' }}
        />
      </span>
    </button>
  )
}
