/**
 * Briefly shared brand tokens
 * Source of truth for web + mobile
 */

export const colors = {
  primary: '#C9184A',
  primaryHover: '#A01039',
  primarySoft: 'rgba(201, 24, 74, 0.08)',
  onPrimary: '#FFFFFF',

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

  zoneDark: '#18110F',
  playerGradientStart: '#0DA2D7',
  playerGradientMid: '#0DA2D7',
  playerGradientEnd: '#075571',

  white: '#FFFFFF',
  overlay: {
    light: 'rgba(255, 255, 255, 0.2)',
    medium: 'rgba(255, 255, 255, 0.35)',
    strong: 'rgba(255, 255, 255, 0.7)',
    dark: 'rgba(0, 0, 0, 0.75)',
    menu: 'rgba(20, 20, 20, 0.95)',
    frosted: 'rgba(255, 255, 255, 0.15)',
    tabInactive: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.3)',
    divider: 'rgba(255, 255, 255, 0.1)',
  },
} as const;

export const radius = {
  card: 16,
  cardSm: 12,
  pill: 999,
  sheet: 40,
} as const;

export const layout = {
  touchMin: 44,
  carouselCardWidth: 110,
  carouselCardHeight: 140,
  artworkSize: 200,
  playButtonSize: 64,
  iconButtonSize: 44,
  iconColumnGap: 14,
  carouselGap: 12,
} as const;

export const motion = {
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  duration: {
    micro: 120,
    transition: 240,
    entrance: 360,
  },
  stagger: 40,
} as const;
