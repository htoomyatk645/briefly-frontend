import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 32,
  height: 32,
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const

export const IconCommute = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="5" y="14" width="22" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="M9 14V11h3l2 3h4l2-3h3v3" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    <circle cx="10" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="22" cy="22" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
  </svg>
)

export const IconWork = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="6" y="9" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="M11 23h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M10 13h12M10 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconSleep = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M18 8a7 7 0 1 0 0 14 8.5 8.5 0 0 1 0-14z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M10 10l1 1M8 15h2M10 20l1-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

export const IconWorkout = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M11 11.5v5M9 14.5h4M8 20l3-3.5 3 3.5M20 11v9M17 14h6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
