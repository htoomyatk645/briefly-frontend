/**
 * Briefly brand tokens — single source of truth for web + mobile.
 * Runtime CSS custom properties in web/src/index.css mirror theme.light / theme.dark.
 */

export const theme = {
  light: {
    bgPage: 'hsl(40 20% 97%)',
    bg: 'hsl(40 20% 97%)',
    surface: '#FFFFFF',
    surfaceAlt: '#F1ECEC',
    primary: '#C9184A',
    primaryHover: '#A01039',
    primarySoft: 'hsl(343 79% 44% / 0.08)',
    onPrimary: '#FFFFFF',
    text: '#1F1818',
    textSecondary: '#4B3C3C',
    textMuted: '#A99898',
    border: '#E3DBDB',
    borderStrong: '#C9BFBF',
    focusRing: 'hsl(343 79% 44% / 0.22)',
  },
  dark: {
    bgPage: 'hsl(20 6% 7%)',
    bg: 'hsl(20 6% 7%)',
    surface: '#221917',
    surfaceAlt: '#261A18',
    primary: '#FF6B8E',
    primaryHover: '#FFA3BB',
    primarySoft: 'hsl(346 100% 71% / 0.12)',
    onPrimary: '#FFFFFF',
    text: '#FAF8F8',
    textSecondary: '#E3DBDB',
    textMuted: '#705453',
    border: '#4E3835',
    borderStrong: '#705453',
    focusRing: 'hsl(346 100% 71% / 0.35)',
  },
} as const

export const colors = {
  /** Default / light-theme flat exports for shared modules */
  primary: theme.light.primary,
  primaryHover: theme.light.primaryHover,
  primarySoft: theme.light.primarySoft,
  onPrimary: theme.light.onPrimary,

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

  /** Immersive feed / player zone (dark context) */
  zoneDark: '#18110F',
  feedPlayerSurface: theme.dark.surface,

  white: '#FFFFFF',
  overlay: {
    light: 'rgba(255, 255, 255, 0.2)',
    medium: 'rgba(255, 255, 255, 0.35)',
    strong: 'rgba(255, 255, 255, 0.7)',
    dark: 'rgba(0, 0, 0, 0.75)',
    menu: 'rgba(20, 20, 20, 0.95)',
    tabInactive: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)',
    divider: 'rgba(255, 255, 255, 0.1)',
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
