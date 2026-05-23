import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 28 28',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const

export const IconTrueCrime = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.75" />
    <path d="M16 16l5.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path
      d="M9 10.5h6M9 12.5h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M12 8v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconTech = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="5" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
    <path d="M10 21h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M9 11h10M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="19" cy="11" r="1" fill="currentColor" />
  </svg>
)

export const IconBusiness = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="7" y="11" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
    <path
      d="M10 11V9a4 4 0 0 1 8 0v2"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path d="M11 16h2M15 16h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconComedy = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M8 18c1.2-3 2.8-4.5 6-4.5s4.8 1.5 6 4.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
    <path
      d="M9 12c0-2.2 2.2-4 5-4s5 1.8 5 4"
      stroke="currentColor"
      strokeWidth="1.75"
    />
    <path d="M6 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 10h2M18 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconHistory = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M8 8h12v12H8V8z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M11 11h6M11 14h6M11 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 8V6h8v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

export const IconScience = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M11 6v15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <ellipse cx="11" cy="10" rx="4" ry="2" stroke="currentColor" strokeWidth="1.75" />
    <ellipse cx="11" cy="17" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="19" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19 7v4M17 9h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>
)

export const IconSports = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M9 20V11l5-3 5 3v9"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M11 20h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M14 8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconPolitics = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M7 10h14v10H7V10z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M10 10V8h8v2" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    <path d="M12 14h4M12 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconHealth = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M14 22s-7.5-4.8-7.5-10.5A4.5 4.5 0 0 1 14 8a4.5 4.5 0 0 1 7.5 3.5C21.5 17.2 14 22 14 22z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M14 11v5M11.5 13.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconCulture = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="1.75" />
    <path d="M14 7v14M7 14h14" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M9.5 9.5c2 1 3 1 4.5 0s3-1 4.5 0M9.5 18.5c2-1 3-1 4.5 0s3 1 4.5 0"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
)

export const IconStorytelling = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M7 8c0-1.1 3.6-2 7-2s7 .9 7 2v10c0 1.1-3.6 2-7 2s-7-.9-7-2V8z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M7 12c2 1 4.5 1.5 7 1.5s5-.5 7-1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 18h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconFinance = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M6 19V9l6-3 6 3v10"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path d="M10 15l3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconEducation = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12l10-5 10 5-10 5-10-5z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    <path d="M9 15v4c1 .8 2.2 1.2 5 1.2s4-.4 5-1.2v-4" stroke="currentColor" strokeWidth="1.75" />
    <path d="M22 12v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const IconArts = (props: IconProps) => (
  <svg {...base} {...props}>
    <path
      d="M14 6c-3 0-5 2.2-5 5.5 0 2.2 1.2 3.5 3 4.2V22h4v-6.3c1.8-.7 3-2 3-4.2C19 8.2 17 6 14 6z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <circle cx="11" cy="10" r="1" fill="currentColor" />
    <circle cx="17" cy="11" r="1" fill="currentColor" />
    <circle cx="14" cy="8" r="1" fill="currentColor" />
  </svg>
)
