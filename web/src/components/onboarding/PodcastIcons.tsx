import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const ApplePodcastsIcon = (props: IconProps) => (
  <svg
    width={44}
    height={44}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <rect width={44} height={44} rx={10} fill="#872EC4" />
    <circle cx={22} cy={24} r={9} stroke="#fff" strokeWidth={2} />
    <circle cx={22} cy={24} r={3.5} fill="#fff" />
    <path
      d="M22 11v4M22 33v4M11 24h4M29 24h4"
      stroke="#fff"
      strokeWidth={1.75}
      strokeLinecap="round"
      opacity={0.85}
    />
  </svg>
)

export const SpotifyIcon = (props: IconProps) => (
  <svg
    width={44}
    height={44}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    {...props}
  >
    <rect width={44} height={44} rx={10} fill="#1DB954" />
    <path
      d="M14 27c6-1.2 12-.8 16 1M13 22.5c5.5-1 11.5-.6 17 1M14 18c5-.8 10.5-.5 15 .8"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
)
