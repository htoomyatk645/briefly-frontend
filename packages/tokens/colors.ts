/**
 * Briefly shared brand tokens
 * Source of truth for web + mobile — Warm Editorial palette
 */

export const colors = {
  primary: '#C9184A',
  primaryHover: '#A01039',
  primarySoft: 'rgba(201, 24, 74, 0.08)',
  onPrimary: '#FFFFFF',

  /** Dark mode primary accent */
  primaryDark: '#FF6B8E',
  primaryDarkHover: '#FFA3BB',

  neutral: {
    50: '#FAF8F8',
    100: '#F1ECEC',
    200: '#E3DBDB',
    300: '#C9BFBF',
    400: '#A99898',
    500: '#877272',
    600: '#655353',
    700: '#4B3C3C',
    800: '#342929',
    900: '#1F1818',
  },

  /** Feed / player zone background */
  zoneDark: '#18110F',
  playerBg: '#18110F',

  white: '#FFFFFF',
  overlay: {
    light: 'rgba(255, 255, 255, 0.2)',
    medium: 'rgba(255, 255, 255, 0.35)',
    strong: 'rgba(255, 255, 255, 0.7)',
    dark: 'rgba(0, 0, 0, 0.75)',
    menu: 'rgba(24, 17, 15, 0.95)',
    tabInactive: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)',
    divider: 'rgba(255, 255, 255, 0.1)',
    /** Solid tab bar surface (no glass) */
    tabBar: 'rgba(24, 17, 15, 0.96)',
  },
} as const

export const radius = {
  card: 16,
  cardSm: 12,
  pill: 999,
  sheet: 40,
} as const

export const layout = {
  touchMin: 44,
  carouselCardWidth: 110,
  carouselCardHeight: 140,
  artworkSize: 200,
  playButtonSize: 64,
  iconButtonSize: 44,
  iconColumnGap: 14,
  carouselGap: 12,
} as const

export const motion = {
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  duration: {
    micro: 120,
    transition: 240,
    entrance: 360,
  },
  stagger: 40,
} as const
