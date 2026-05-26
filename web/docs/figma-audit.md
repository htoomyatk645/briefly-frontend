# Briefly Design System Audit

**Figma File:** [Briefly Design System](https://www.figma.com/design/sgYL7Xf5yATgTVaaKkDETk)  
**Audit Date:** May 25, 2026 (reconciled to Palette B)  
**Status:** ✅ Canonical tokens aligned — `@briefly/tokens` + `web/src/index.css`

---

## Token authority

| Layer | File | Role |
|-------|------|------|
| **1 — Source of truth** | `packages/tokens/colors.ts` (`@briefly/tokens`) | Brand color literals for web + mobile |
| **2 — Web design system** | `web/src/tokens.ts` | Spacing, typography, motion; imports colors from package |
| **3 — Runtime CSS** | `web/src/index.css` | CSS custom properties consumed by components |
| **4 — Agent rules** | `.cursor/rules/briefly.mdc` | Cursor prompt constraints |

---

## 1. Color Tokens

### Light theme

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `bg/page` | `hsl(40 20% 97%)` | `var(--bg-page)` |
| `bg/surface` | `#FFFFFF` | `var(--surface)` |
| `bg/surface-alt` | `#F1ECEC` | `var(--surface-alt)` |
| `brand/primary` | `#C9184A` | `var(--primary)` |
| `brand/primary-hover` | `#A01039` | `var(--primary-hover)` |
| `text/primary` | `#1F1818` | `var(--text)` |
| `text/secondary` | `#4B3C3C` | `var(--text-secondary)` |
| `text/muted` | `#A99898` | `var(--text-muted)` |
| `border/default` | `#E3DBDB` | `var(--border)` |
| `border/strong` | `#C9BFBF` | `var(--border-strong)` |

### Dark theme

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `bg/page` | `hsl(20 6% 7%)` | `var(--bg-page)` |
| `bg/surface` | `#221917` | `var(--surface)` |
| `bg/surface-alt` | `#261A18` | `var(--surface-alt)` |
| `brand/primary` | `#FF6B8E` | `var(--primary)` |
| `brand/primary-hover` | `#FFA3BB` | `var(--primary-hover)` |
| `text/primary` | `#FAF8F8` | `var(--text)` |
| `text/secondary` | `#E3DBDB` | `var(--text-secondary)` |
| `text/muted` | `#705453` | `var(--text-muted)` |
| `border/default` | `#4E3835` | `var(--border)` |
| `border/strong` | `#705453` | `var(--border-strong)` |

### Feed / player zone (immersive dark context)

| Token Name | Value | CSS Variable |
|------------|-------|--------------|
| `feed/bg` | `#18110F` | `var(--feed-bg)` |
| `feed/player-surface` | `#221917` | `var(--feed-player-surface)` |

---

## 2. Spacing Tokens

**Base unit:** 4px — see `web/src/tokens.ts` for full scale (`--space-0` through `--space-24` when exported).

---

## 3. Radius Tokens

| Token Name | Value | CSS Variable | Notes |
|------------|-------|--------------|-------|
| `radius/sm` | 10px | `var(--radius-sm)` | Chips, small controls |
| `radius/md` | 16px | `var(--radius-md)` | Cards |
| `radius/lg` | 24px | `var(--radius-lg)` | Large surfaces |
| `radius/pill` | 9999px | `var(--radius-pill)` | Tab bar, pill badges — **permitted** |

---

## 4. Typography

| Role | Font | Use |
|------|------|-----|
| Display | Fraunces | Headlines, pull quotes |
| Body | Geist | UI copy, labels |
| Mono | Geist Mono | Code |

Never Inter or Roboto as primary typefaces.

---

## 5. Visual treatment rules

| Treatment | Status |
|-----------|--------|
| Pill shapes (tab bar, chips) | ✅ Allowed |
| Gradient fills | ❌ Not allowed |
| Glassmorphism (`backdrop-filter`) | ❌ Not allowed |
| Gradient text | ❌ Not allowed |
| Purple decorative gradients | ❌ Not allowed |

---

## 6. Verification checklist

- [x] Single palette (Palette B) across `@briefly/tokens`, `index.css`, and Cursor rules
- [x] Light and dark themes documented
- [x] No gradient or glass tokens in canonical set
- [x] Pill radius permitted and documented
- [x] Fraunces display + Geist body
- [x] Brand hex literals only in `packages/tokens/colors.ts`

---

## 7. Library — Tune Feed

**Mobbin research (Instagram iOS, structural reference only):**

| Search | Top screens referenced |
|--------|-------------------------|
| manage suggested content | Acknowledgement & Success Screen (toast after tuning) |
| snooze suggestions feed | Banner / status row (temporary pause) |
| interests recommendations | Marking flow (not interested / hide) |
| not interested less of this | Marking + Following flows (row actions) |
| reset suggested content | Acknowledgement & Success + settings list hierarchy |

**Borrowed (structure, not visuals):**

- Flat list rows with inline control on the right (not stacked cards per topic)
- Temporary snooze vs persistent topic weight vs nuclear reset at the bottom
- Overflow action for “hide / not interested” moving items to a muted list
- Confirmation dialog before reset; snackbar acknowledgment after snooze toggle
- “About this suggestion” style drill-in (implemented as “View recent feed decisions” bottom sheet with fixtures)

**Rejected (Instagram aesthetics):**

- Inter / system UI typography
- Gradient backgrounds and purple-forward brand
- Continuous sliders (Briefly uses 3-step segmented Less / Default / More)
- Card-heavy topic layout from earlier Briefly draft

**Implementation:** `web/src/pages/TuneFeed.tsx`, `web/src/components/library/TuneFeedSurface.tsx`, `web/src/state/feedTuning.ts` (Zustand + `localStorage`).

---

## 8. Related docs

- `web/docs/brand-reconciliation.md` — audit that led to this reconciliation
- `web/src/tokens.ts` — web spacing, typography, motion
