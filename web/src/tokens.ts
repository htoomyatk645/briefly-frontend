/**
 * Briefly Design Tokens — Web
 *
 * Brand colors: import from @briefly/tokens (single source of truth).
 * Runtime CSS variables: web/src/index.css (mirrors theme.light / theme.dark).
 *
 * @see /docs/figma-audit.md
 * @see /docs/brand-reconciliation.md
 */

import { colors as brandColors, theme as brandTheme } from '@briefly/tokens'

export { brandColors as colors, brandTheme as theme }

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
  pill: 9999,
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
  subtle: '0 2px 8px rgba(0, 0, 0, 0.06)',
  medium: '0 8px 24px rgba(0, 0, 0, 0.08)',
  strong: '0 12px 36px rgba(0, 0, 0, 0.1)',
} as const

// =============================================================================
// CSS CUSTOM PROPERTIES (documentation / tooling — runtime uses index.css)
// =============================================================================

function themeBlock(mode: 'light' | 'dark', selector: string) {
  const t = brandTheme[mode]
  return `
  ${selector} {
    --bg-page: ${t.bgPage};
    --bg-content: ${t.bg};
    --bg: ${t.bg};
    --surface: ${t.surface};
    --surface-alt: ${t.surfaceAlt};
    --primary: ${t.primary};
    --primary-hover: ${t.primaryHover};
    --primary-soft: ${t.primarySoft};
    --on-primary: ${t.onPrimary};
    --text: ${t.text};
    --text-secondary: ${t.textSecondary};
    --text-muted: ${t.textMuted};
    --border: ${t.border};
    --border-strong: ${t.borderStrong};
    --focus-ring: ${t.focusRing};
  }`
}

export const cssVariables = `
  :root {
    --font-display: ${fontFamily.display};
    --font-body: ${fontFamily.body};
    --font-mono: ${fontFamily.mono};
    --radius-sm: ${radius.sm}px;
    --radius-md: ${radius.md}px;
    --radius-lg: ${radius.lg}px;
    --radius-pill: ${radius.pill}px;
    --ease-default: ${motion.easing.default};
    --duration-micro: ${motion.duration.micro}ms;
    --duration-transition: ${motion.duration.transition}ms;
    --duration-entrance: ${motion.duration.entrance}ms;
    --feed-bg: ${brandColors.zoneDark};
    --feed-player-surface: ${brandColors.feedPlayerSurface};
  }
  ${themeBlock('light', ":root[data-theme='light']")}
  ${themeBlock('dark', ":root[data-theme='dark']")}
`

export type SpacingToken = keyof typeof spacing
export type RadiusToken = keyof typeof radius
export type FontSizeToken = keyof typeof fontSize
