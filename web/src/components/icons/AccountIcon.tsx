export type AccountIconProps = {
  className?: string
  size?: number
}

/**
 * Account icon — stroke family aligned with BrowseChannels chip icons
 * (24px viewBox, 1.75 stroke weight, round caps).
 */
export const AccountIcon = ({ className = '', size = 24 }: AccountIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <circle cx="12" cy="8.5" r="3.75" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M5.5 19.5c0-3.038 2.91-5.5 6.5-5.5s6.5 2.462 6.5 5.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
)
