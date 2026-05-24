# Brand Palette Reconciliation

**Date:** May 24, 2026  
**Status:** ✅ Complete  
**Decision:** **Option B** — Warm Editorial (cream/dark + pink-red), with glassmorphism and gradients removed

---

## Decision

| Aspect | Choice |
| --- | --- |
| Backgrounds | Light: `hsl(40 20% 97%)` cream · Dark: `hsl(20 6% 7%)` warm near-black · Feed: `#18110F` |
| Primary accent | Light: `#C9184A` · Dark: `#FF6B8E` |
| Glassmorphism | **Removed** — solid surfaces only |
| Gradients | **Removed** — solid colors and bottom scrims only |
| Source of truth | `web/src/index.css` + `web/src/tokens.ts` + `packages/tokens/colors.ts` |

---

## Files Updated

### Token & documentation
- `web/src/index.css` — removed Inter fallback
- `web/src/tokens.ts` — rewritten to Warm Editorial palette
- `packages/tokens/colors.ts` — removed player gradients and frosted overlay token
- `web/docs/figma-audit.md` — rewritten for reconciled palette
- `.cursor/rules/briefly.mdc` — authoritative Warm Editorial rules
- `web/docs/brand-reconciliation.md` — this file

### Glassmorphism removed
- `web/src/components/home/tab-bar.css`
- `web/src/styles/app-header.css`
- `web/src/styles/discover-layout.css`
- `web/src/components/feed/feedTokens.css`
- `web/src/components/feed/player/player-interactions.css`
- `mobile/src/components/navigation/FrostedTabBar.tsx`

### Gradients removed / replaced with solids
- `web/src/components/feed/useCoverGradient.ts` → deleted, replaced by `useCoverColor.ts`
- `web/src/components/feed/PlayerCard.tsx`
- `web/src/components/onboarding/listening-habits.css`
- `web/src/components/home/home.css`
- `web/src/components/discover/discover-mosaic.css`
- `web/src/components/feed/clip-feed.css`
- `mobile/src/components/player/NowPlayingScreen.tsx`
- `mobile/src/components/player/UpNextCard.tsx`

### Hardcoded hex → token references
- `web/src/components/home/home.css` — `#C9184A` → `var(--primary)`
- `web/src/components/home/continue-listening.css` — `#C9184A` → `var(--primary)`
- `web/src/components/feed/PlayerCard.tsx` — `#C9184A` → `var(--primary)`
- `web/src/components/SplashScreen.tsx` — CTA uses `colors.onPrimary` on `colors.accent.primary`

### Feed token rename (`feed-glass-*` → `feed-surface-*`)
- `web/src/components/feed/feedTokens.css`
- `web/src/components/feed/clip-feed.css`
- `web/src/components/home/tab-bar.css`
- `web/src/components/feed/PlayerCard.tsx` (class rename `feed-glass` → `feed-surface`)

---

## Historical Audit (pre-reconciliation)

<details>
<summary>Original conflict table (May 24, 2026 audit)</summary>

| File | Declared primary BG | Declared accent(s) | Restrictions |
| --- | --- | --- | --- |
| `figma-audit.md` / `tokens.ts` / Cursor rules | `#0C0F14` | `#B8FF3C` + `#FF6640` | No glass, no gradients, 8px radius cap |
| `index.css` (runtime) | Warm cream / warm dark | `#C9184A` / `#FF6B8E` | Glass, gradients, pill radii in components |
| `packages/tokens/colors.ts` | `#18110F` | `#C9184A` | Teal player gradient, frosted overlay |

</details>
