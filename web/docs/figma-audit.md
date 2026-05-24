# Briefly Design System Audit

**Figma File:** [Briefly Design System](https://www.figma.com/design/sgYL7Xf5yATgTVaaKkDETk)  
**Audit Date:** May 24, 2026  
**Status:** ✅ Reconciled — Warm Editorial palette  
**Decision:** Option B (cream/dark + pink-red), glassmorphism and gradients removed

---

## 1. Color Tokens

### Light mode (`data-theme='light'`)

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `bg/page` | `hsl(40 20% 97%)` warm cream | `var(--bg-page)` |
| `bg/surface` | `#FFFFFF` | `var(--surface)` |
| `bg/surface-alt` | `#F1ECEC` | `var(--surface-alt)` |
| `accent/primary` | `#C9184A` pink-red | `var(--primary)` |
| `accent/primary-hover` | `#A01039` | `var(--primary-hover)` |
| `accent/primary-soft` | `hsl(343 79% 44% / 0.08)` | `var(--primary-soft)` |
| `text/on-primary` | `#FFFFFF` | `var(--on-primary)` |
| `text/primary` | `#1F1818` | `var(--text)` |
| `text/secondary` | `#4B3C3C` | `var(--text-secondary)` |
| `text/muted` | `#A99898` | `var(--text-muted)` |
| `border/default` | `#E3DBDB` | `var(--border)` |
| `border/strong` | `#C9BFBF` | `var(--border-strong)` |

### Dark mode (`data-theme='dark'`)

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `bg/page` | `hsl(20 6% 7%)` warm near-black | `var(--bg-page)` |
| `bg/surface` | `#221917` | `var(--surface)` |
| `bg/surface-alt` | `#261A18` | `var(--surface-alt)` |
| `accent/primary` | `#FF6B8E` pink | `var(--primary)` |
| `accent/primary-hover` | `#FFA3BB` | `var(--primary-hover)` |
| `text/primary` | `#FAF8F8` | `var(--text)` |
| `text/secondary` | `#E3DBDB` | `var(--text-secondary)` |
| `text/muted` | `#705453` | `var(--text-muted)` |
| `border/default` | `#4E3835` | `var(--border)` |

### Feed zone (player screen)

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `feed/bg` | `#18110F` | `var(--feed-bg)` |
| `feed/surface` | `rgba(255,255,255,0.18)` solid overlay | `var(--feed-surface-bg)` |
| `feed/text` | `#FFFFFF` | `var(--feed-text)` |

---

## 2. Spacing Tokens

**Base unit:** 4px — see `web/src/tokens.ts` for full scale (`space/0` through `space/24`).

---

## 3. Radius Tokens

| Token Name | Value (px) | CSS Variable | Notes |
|------------|------------|--------------|-------|
| `radius/sm` | 10 | `var(--radius-sm)` | Chips, small controls |
| `radius/md` | 16 | `var(--radius-md)` | Cards, buttons |
| `radius/lg` | 24 | `var(--radius-lg)` | Sheets, large cards |
| `radius/full` | 9999 | — | Tab pills, circular controls |

---

## 4. Text Styles

### Display (Fraunces)

| Style | Font | Size | Line Height | Use Case |
|-------|------|------|-------------|----------|
| `display/hero` | Fraunces Bold | 48px | 56px | Hero headlines |
| `display/h1` | Fraunces SemiBold | 32px | 40px | Page titles |
| `display/h2` | Fraunces SemiBold | 28px | 36px | Section headers |
| `display/h3` | Fraunces SemiBold | 24px | 32px | Highlight headlines |

### Body (Geist)

| Style | Font | Size | Line Height | Use Case |
|-------|------|------|-------------|----------|
| `body/lg` | Geist Regular | 18px | 28px | Large body |
| `body/base` | Geist Regular | 16px | 24px | Default body |
| `body/sm` | Geist Regular | 14px | 20px | Small body |
| `body/xs` | Geist Regular | 12px | 16px | Captions |

---

## 5. Brand Restrictions

| Restriction | Status |
|-------------|--------|
| No glassmorphism (`backdrop-filter`) | ✅ Enforced |
| No decorative gradients | ✅ Enforced |
| No gradient text | ✅ Enforced |
| No purple gradients | ✅ Enforced |
| No Inter/Roboto as primary typeface | ✅ Enforced |
| All values from tokens | ✅ Required |

Image scrims use **solid** semi-transparent overlays, not gradient fades.

---

## 6. Source of Truth Map

| Concern | Authoritative file |
|---------|-------------------|
| CSS runtime variables | `web/src/index.css` |
| TypeScript tokens | `web/src/tokens.ts` |
| Shared web + mobile colors | `packages/tokens/colors.ts` |
| Cursor agent rules | `.cursor/rules/briefly.mdc` |
| Reconciliation history | `web/docs/brand-reconciliation.md` |

---

## 7. Verification Checklist

- [x] Warm cream / warm dark backgrounds with pink-red accents
- [x] Full light/dark mode parity
- [x] Fraunces for display, Geist for body
- [x] No gradient fills
- [x] No glassmorphism
- [x] Components use token bindings (not hardcoded values)
- [x] Mobile shared tokens aligned
