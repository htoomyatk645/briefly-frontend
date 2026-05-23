/**
 * Briefly Design Tokens
 * 
 * Source of truth for all design tokens. Synced with Figma Design System.
 * Figma file: https://www.figma.com/design/sgYL7Xf5yATgTVaaKkDETk
 * 
 * @see /docs/figma-audit.md for full token documentation
 */

// =============================================================================
// COLORS
// =============================================================================

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0C0F14',
    surface1: '#13171E',
    surface2: '#1A1F28',
    surface3: '#232A36',
  },

  // Accents
  accent: {
    primary: '#B8FF3C',  // Acid chartreuse - use purposefully, not decoratively
    warm: '#FF6640',     // Burnt orange - for active play states, progress, error
  },

  // Text
  text: {
    primary: '#F2F0EB',
    secondary: '#8A9099',
    muted: '#4E5561',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

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
} as const;

// =============================================================================
// RADIUS
// =============================================================================

export const radius = {
  none: 0,
  sm: 4,
  md: 8,    // Max for CTAs per brand spec
  lg: 12,
  full: 9999,
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const fontFamily = {
  display: "'Fraunces', serif",
  body: "'Geist', sans-serif",
  mono: "'Geist Mono', monospace",
} as const;

export const fontSize = {
  // Display (Fraunces)
  hero: 48,
  h1: 32,
  h2: 28,
  h3: 24,
  pullquote: 24,

  // Body (Geist)
  lg: 18,
  base: 16,
  sm: 14,
  xs: 12,

  // Labels
  labelLg: 16,
  labelBase: 14,
  labelSm: 12,
  labelXs: 10,

  // Code
  codeBase: 14,
  codeSm: 12,
} as const;

export const lineHeight = {
  // Display
  hero: 56,
  h1: 40,
  h2: 36,
  h3: 32,
  pullquote: 34,

  // Body
  lg: 28,
  base: 24,
  sm: 20,
  xs: 16,

  // Labels
  labelLg: 20,
  labelBase: 18,
  labelSm: 16,
  labelXs: 12,

  // Code
  codeBase: 22,
  codeSm: 18,
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const letterSpacing = {
  tight: '-0.02em',  // Display text (Fraunces)
  normal: '0',       // Body text
  wide: '0.5px',     // Overlines, badges
} as const;

// =============================================================================
// MOTION
// =============================================================================

export const motion = {
  easing: {
    default: 'cubic-bezier(0.22, 1, 0.36, 1)',  // ease-out-quint
  },
  duration: {
    micro: 120,      // Micro-interactions
    transition: 240, // UI transitions
    entrance: 360,   // Screen entrances
  },
} as const;

// =============================================================================
// SHADOWS (Effect Styles)
// =============================================================================

export const shadows = {
  subtle: '0 2px 8px rgba(0, 0, 0, 0.06)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
  strong: '0 8px 32px rgba(0, 0, 0, 0.24)',
} as const;

// =============================================================================
// CSS CUSTOM PROPERTIES
// =============================================================================

export const cssVariables = `
  :root {
    /* Colors - Backgrounds */
    --color-bg-primary: ${colors.bg.primary};
    --color-surface-1: ${colors.bg.surface1};
    --color-surface-2: ${colors.bg.surface2};
    --color-surface-3: ${colors.bg.surface3};

    /* Colors - Accents */
    --color-accent-primary: ${colors.accent.primary};
    --color-accent-warm: ${colors.accent.warm};

    /* Colors - Text */
    --color-text-primary: ${colors.text.primary};
    --color-text-secondary: ${colors.text.secondary};
    --color-text-muted: ${colors.text.muted};

    /* Colors - Borders */
    --color-border-subtle: ${colors.border.subtle};
    --color-border-default: ${colors.border.default};

    /* Spacing */
    --space-0: ${spacing[0]}px;
    --space-1: ${spacing[1]}px;
    --space-2: ${spacing[2]}px;
    --space-3: ${spacing[3]}px;
    --space-4: ${spacing[4]}px;
    --space-5: ${spacing[5]}px;
    --space-6: ${spacing[6]}px;
    --space-8: ${spacing[8]}px;
    --space-10: ${spacing[10]}px;
    --space-12: ${spacing[12]}px;
    --space-16: ${spacing[16]}px;
    --space-20: ${spacing[20]}px;
    --space-24: ${spacing[24]}px;

    /* Radius */
    --radius-none: ${radius.none}px;
    --radius-sm: ${radius.sm}px;
    --radius-md: ${radius.md}px;
    --radius-lg: ${radius.lg}px;
    --radius-full: ${radius.full}px;

    /* Typography */
    --font-display: ${fontFamily.display};
    --font-body: ${fontFamily.body};
    --font-mono: ${fontFamily.mono};

    /* Motion */
    --ease-default: ${motion.easing.default};
    --duration-micro: ${motion.duration.micro}ms;
    --duration-transition: ${motion.duration.transition}ms;
    --duration-entrance: ${motion.duration.entrance}ms;
  }
`;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type ColorToken = keyof typeof colors.bg | keyof typeof colors.accent | keyof typeof colors.text | keyof typeof colors.border;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type FontSizeToken = keyof typeof fontSize;
