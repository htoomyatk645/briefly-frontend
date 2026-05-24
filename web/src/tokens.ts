/**
 * Briefly Design Tokens
 *
 * Source of truth for all design tokens. Synced with index.css and Figma.
 * Figma file: https://www.figma.com/design/sgYL7Xf5yATgTVaaKkDETk
 *
 * @see /docs/figma-audit.md for full token documentation
 * @see /docs/brand-reconciliation.md for palette decision history
 */

// =============================================================================
// COLORS — Warm Editorial (cream/dark + pink-red)
// =============================================================================

export const colors = {
  light: {
    bgPage: 'hsl(40 20% 97%)',
    bgContent: 'hsl(40 20% 97%)',
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
    overlayStrong: 'hsl(0 7% 10% / 0.75)',
  },
  dark: {
    bgPage: 'hsl(20 6% 7%)',
    bgContent: 'hsl(20 6% 7%)',
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
    overlayStrong: 'hsl(12 16% 7% / 0.78)',
  },

  /** Default semantic aliases (light mode baseline for TS consumers) */
  bg: {
    primary: 'hsl(40 20% 97%)',
    surface1: '#FFFFFF',
    surface2: '#F1ECEC',
    surface3: '#E3DBDB',
  },
  accent: {
    primary: '#C9184A',
    hover: '#A01039',
    dark: '#FF6B8E',
    darkHover: '#FFA3BB',
  },
  text: {
    primary: '#1F1818',
    secondary: '#4B3C3C',
    muted: '#A99898',
  },
  onPrimary: '#FFFFFF',
  border: {
    subtle: 'hsl(0 0% 0% / 0.06)',
    default: '#E3DBDB',
  },

  /** Feed zone (player screen) */
  feed: {
    bg: '#18110F',
    surface: 'rgba(255, 255, 255, 0.18)',
    surfaceBorder: 'rgba(255, 255, 255, 0.26)',
    text: '#FFFFFF',
  },
} as const

// =============================================================================
// SPACING
// =============================================================================

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const

// =============================================================================
// RADIUS
// =============================================================================

export const radius = {
  none: 0,
  sm: 10,
  md: 16,
  lg: 24,
  full: 9999,
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fontFamily = {
  display: "'Fraunces', serif",
  body: "'Geist', sans-serif",
  mono: "'Geist Mono', monospace",
} as const

export const fontSize = {
  hero: 48,
  h1: 32,
  h2: 28,
  h3: 24,
  pullquote: 24,
  lg: 18,
  base: 16,
  sm: 14,
  xs: 12,
  labelLg: 16,
  labelBase: 14,
  labelSm: 12,
  labelXs: 10,
  codeBase: 14,
  codeSm: 12,
} as const

export const lineHeight = {
  hero: 56,
  h1: 40,
  h2: 36,
  h3: 32,
  pullquote: 34,
  lg: 28,
  base: 24,
  sm: 20,
  xs: 16,
  labelLg: 20,
  labelBase: 18,
  labelSm: 16,
  labelXs: 12,
  codeBase: 22,
  codeSm: 18,
} as const

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.5px',
} as const

// =============================================================================
// MOTION
// =============================================================================

export const motion = {
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  duration: {
    micro: 120,
    transition: 240,
    entrance: 360,
  },
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  subtle: '0 2px 8px hsl(0 7% 10% / 0.06)',
  medium: '0 8px 24px hsl(0 7% 10% / 0.08)',
  strong: '0 12px 36px hsl(0 7% 10% / 0.1)',
} as const

// =============================================================================
// CSS CUSTOM PROPERTIES (mirrors index.css)
// =============================================================================

export const cssVariables = `
  :root {
    --font-display: ${fontFamily.display};
    --font-body: ${fontFamily.body};
    --duration-entrance: ${motion.duration.entrance}ms;
    --ease-default: ${motion.easing.default};
    --duration-micro: ${motion.duration.micro}ms;
    --duration-transition: ${motion.duration.transition}ms;
  }

  :root[data-theme='light'] {
    --bg-page: ${colors.light.bgPage};
    --bg-content: ${colors.light.bgContent};
    --bg: ${colors.light.bgPage};
    --surface: ${colors.light.surface};
    --surface-alt: ${colors.light.surfaceAlt};
    --primary: ${colors.light.primary};
    --primary-hover: ${colors.light.primaryHover};
    --primary-soft: ${colors.light.primarySoft};
    --on-primary: ${colors.light.onPrimary};
    --text: ${colors.light.text};
    --text-secondary: ${colors.light.textSecondary};
    --text-muted: ${colors.light.textMuted};
    --border: ${colors.light.border};
    --border-strong: ${colors.light.borderStrong};
    --focus-ring: ${colors.light.focusRing};
    --overlay-strong: ${colors.light.overlayStrong};
    --radius-sm: ${radius.sm}px;
    --radius-md: ${radius.md}px;
    --radius-lg: ${radius.lg}px;
  }

  :root[data-theme='dark'] {
    --bg-page: ${colors.dark.bgPage};
    --bg-content: ${colors.dark.bgContent};
    --bg: ${colors.dark.bgPage};
    --surface: ${colors.dark.surface};
    --surface-alt: ${colors.dark.surfaceAlt};
    --primary: ${colors.dark.primary};
    --primary-hover: ${colors.dark.primaryHover};
    --primary-soft: ${colors.dark.primarySoft};
    --on-primary: ${colors.dark.onPrimary};
    --text: ${colors.dark.text};
    --text-secondary: ${colors.dark.textSecondary};
    --text-muted: ${colors.dark.textMuted};
    --border: ${colors.dark.border};
    --border-strong: ${colors.dark.borderStrong};
    --focus-ring: ${colors.dark.focusRing};
    --overlay-strong: ${colors.dark.overlayStrong};
    --radius-sm: ${radius.sm}px;
    --radius-md: ${radius.md}px;
    --radius-lg: ${radius.lg}px;
  }
`

export type ColorToken = keyof typeof colors.bg | keyof typeof colors.accent | keyof typeof colors.text
export type SpacingToken = keyof typeof spacing
export type RadiusToken = keyof typeof radius
export type FontSizeToken = keyof typeof fontSize
