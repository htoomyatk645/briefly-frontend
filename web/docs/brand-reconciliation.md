# Brand Palette Reconciliation Audit

**Date:** May 24, 2026  
**Status:** ⏸ Awaiting palette decision — no source files modified yet  
**Scope:** Cross-file audit of declared brand tokens vs. runtime CSS

---

## Executive Summary

The repo declares **two incompatible brand palettes**. Documentation, Cursor rules, and `web/src/tokens.ts` describe **Editorial Dark** (near-black + chartreuse + burnt orange). The CSS that actually drives the running web app (`web/src/index.css` and downstream component styles) implements **Warm Editorial** (warm cream/dark + pink-red accent, with glassmorphism, gradients, and pill radii).

Until one palette is chosen and propagated everywhere, Cursor prompts and new component work will continue to diverge.

---

## Source-of-Truth Comparison

| File | Declared primary BG | Declared accent(s) | Declared text | Restrictions declared | Actually applied at runtime? |
| --- | --- | --- | --- | --- | --- |
| `web/docs/figma-audit.md` | `#0C0F14` (+ surfaces `#13171E` / `#1A1F28` / `#232A36`) | `#B8FF3C` chartreuse, `#FF6640` burnt orange | `#F2F0EB` / `#8A9099` / `#4E5561` | No gradients, no glassmorphism, max **8px** CTA radius, no pill CTAs | ❌ Not wired into `index.css` |
| `.cursor/rules/briefly.mdc` | `#0C0F14` | `#B8FF3C`, `#FF6640` | (not specified) | No purple gradients, glassmorphism, pill CTAs, or gradient text; all values from `tokens.ts` | ❌ Cursor reads this; CSS ignores it |
| `web/src/tokens.ts` | `#0C0F14` (+ surface tokens) | `#B8FF3C`, `#FF6640` | `#F2F0EB` / `#8A9099` / `#4E5561` | `radius.md = 8` (max CTA), exports `--color-*` CSS vars | ⚠️ Partial — used by `SplashScreen.tsx` only; `cssVariables` export is **not imported** anywhere |
| `web/src/index.css` | Light: `hsl(40 20% 97%)` (~`#F9F7F3` cream) · Dark: `hsl(20 6% 7%)` (~`#131110` warm near-black) | Light: `#C9184A` · Dark: `#FF6B8E` | Light: `#1F1818` / `#4B3C3C` / `#A99898` · Dark: `#FAF8F8` / `#E3DBDB` / `#705453` | **No explicit bans**; defines `--radius-sm/md/lg` as **10 / 16 / 24px** | ✅ **Primary runtime source** — imported first in app CSS cascade |
| `web/src/theme.css` | Inherits `--bg-page`, `--text` from `index.css` | Inherits `--primary`, `--focus-ring` from `index.css` | Inherits from `index.css` | Structural only (fonts, focus ring); no palette declarations | ✅ Applied (delegates to `index.css`) |
| `packages/tokens/colors.ts` | `#18110F` (`zoneDark`) + neutral scale anchored on warm cream/brown | `#C9184A` primary, `#A01039` hover | Neutral scale `#FAF8F8` → `#1F1818` | Defines `radius.pill: 999`, `playerGradientStart/Mid/End` (teal), `overlay.frosted` | ✅ Used by `web/src/data/homeData.ts` and **mobile** components |

---

## Palette A vs Palette B (Side-by-Side)

| Token role | **Option A — Editorial Dark** (audit + `tokens.ts` + Cursor rules) | **Option B — Warm Editorial** (`index.css` + `packages/tokens`) |
| --- | --- | --- |
| Primary background | `#0C0F14` | Light: `hsl(40 20% 97%)` · Dark: `hsl(20 6% 7%)` |
| Surface | `#13171E` / `#1A1F28` / `#232A36` | Light: `#FFFFFF` / `#F1ECEC` · Dark: `#221917` / `#261A18` |
| Primary accent | `#B8FF3C` chartreuse | Light: `#C9184A` pink-red · Dark: `#FF6B8E` pink |
| Warm / secondary accent | `#FF6640` burnt orange | (none declared — pink fills both roles) |
| Text primary | `#F2F0EB` | Light: `#1F1818` · Dark: `#FAF8F8` |
| Display / body fonts | Fraunces + Geist | Fraunces + Geist (but `index.css` lists `'Inter'` as fallback) |
| Max CTA radius | 8px | 16px (`--radius-md`) with pill chips at 999px throughout CSS |
| Glassmorphism | **Banned** | **Used** — `backdrop-filter: blur()` in tab bar, headers, feed, player |
| Gradients | **Banned** | **Used** — player backgrounds, listening habits, discover mosaic, cover extraction |
| Light mode | Not defined (dark-only system) | Full light/dark parity via `data-theme` |

---

## Detailed Deviations by File

### `web/docs/figma-audit.md` ↔ `web/src/index.css`

| Property | Figma audit | `index.css` (runtime) | Conflict |
| --- | --- | --- | --- |
| BG primary | `#0C0F14` | `hsl(40 20% 97%)` / `hsl(20 6% 7%)` | Different hue family (cool near-black vs warm cream/dark) |
| Accent primary | `#B8FF3C` | `#C9184A` / `#FF6B8E` | Chartreuse vs pink-red |
| Accent warm | `#FF6640` | *(absent)* | Burnt orange not represented |
| Radius cap | 8px max on CTAs | 10 / 16 / 24px + 999px pills | Audit constraint violated in ~20 CSS files |
| Gradients | Prohibited | `--feed-player-gradient`, radial/linear gradients in onboarding + discover | Direct violation |
| Glassmorphism | Prohibited | `backdrop-filter` in tab bar, app header, discover layout, feed, player | Direct violation |
| Light mode | Dark-only token set | Full `[data-theme='light']` block | Audit has no light-mode tokens |

### `web/src/tokens.ts` ↔ `web/src/index.css`

| Property | `tokens.ts` | `index.css` | Conflict |
| --- | --- | --- | --- |
| CSS variable namespace | `--color-bg-primary`, `--color-accent-primary`, etc. | `--bg-page`, `--primary`, `--surface`, etc. | **Two parallel naming systems** — components use whichever they import |
| Variable injection | `cssVariables` template exported but never imported | `:root[data-theme]` blocks in `index.css` | `tokens.ts` CSS output is dead code |
| Accent warm | `#FF6640` defined | Not mapped | Orphan token |
| Radius | `md: 8`, `full: 9999` (circular only) | `--radius-md: 16px`, pills at 999px everywhere | Different radius philosophy |

### `web/src/tokens.ts` ↔ `packages/tokens/colors.ts`

| Property | `web/src/tokens.ts` | `packages/tokens/colors.ts` | Conflict |
| --- | --- | --- | --- |
| Primary accent | `#B8FF3C` | `#C9184A` | Completely different brand color |
| Background | `#0C0F14` | `#18110F` (zoneDark) + warm neutral scale | Different dark base |
| Player gradient | *(none)* | `#0DA2D7` → `#075571` teal gradient | Mobile/shared package assumes gradients |
| Frosted overlay | *(none)* | `overlay.frosted: rgba(255,255,255,0.15)` | Shared package encodes glassmorphism |
| Radius | `md: 8`, max CTA 8px | `pill: 999`, `card: 16`, `sheet: 40` | Pill CTAs baked into shared package |

### `.cursor/rules/briefly.mdc` ↔ runtime

| Rule in Cursor | Runtime behavior | Conflict |
| --- | --- | --- |
| Primary bg `#0C0F14` | `--bg-page` is warm cream/dark HSL | Cursor generates dark editorial; CSS renders warm editorial |
| Accent `#B8FF3C` | `--primary` is pink-red | Every Cursor-generated component will use wrong accent |
| "No glassmorphism, pill CTAs, gradients" | Widespread in `tab-bar.css`, `feedTokens.css`, `listening-habits.css`, etc. | Cursor rules contradict ~15 CSS files |
| "All colors from tokens.ts" | Most components use `--primary` / `--bg-page` from `index.css` | Two token sources actively used |

---

## What Actually Renders Today

CSS import order in `web/src/index.css`:

```
@import './theme.css';
@import './tokens.css';
@import './styles/motion.css';
```

The **Warm Editorial** palette from `index.css` `:root[data-theme='light'|'dark']` blocks drives the majority of the app. Components reference `--primary`, `--bg-page`, `--surface`, etc.

**Editorial Dark** from `web/src/tokens.ts` is used in:
- `web/src/components/SplashScreen.tsx` (inline styles from TS token imports)

**Shared Warm palette** from `packages/tokens/colors.ts` is used in:
- `web/src/data/homeData.ts`
- Mobile: `FrostedTabBar`, `PlaybackControls`, `SpeedSelector`, `ShopSheet`

**Feed-specific third palette** in `web/src/components/feed/feedTokens.css`:
- Teal player gradient (`#5bc8d4` → `#1a7b9a`)
- Glass tokens (`--feed-glass-bg`, `--feed-blur`)
- Hardcoded `#18110f` feed background

---

## Hardcoded Deprecated-Palette Inventory (for post-decision sweep)

These files contain hex values from the **Warm Editorial** palette that would need replacing if **Option A** wins, or chartreuse/dark values if **Option B** wins:

### Pink-red accent (`#C9184A`, `#FF6B8E`, `#A01039`, `#FFA3BB`)

| File | Values found |
| --- | --- |
| `web/src/index.css` | `#C9184A`, `#A01039`, `#FF6B8E`, `#FFA3BB` |
| `web/src/components/home/home.css` | `#C9184A` (hardcoded artwork) |
| `web/src/components/home/continue-listening.css` | `#C9184A` |
| `web/src/components/feed/PlayerCard.tsx` | `#C9184A` (SVG fill) |
| `packages/tokens/colors.ts` | `#C9184A`, `#A01039` |

### Editorial Dark accent (`#B8FF3C`, `#FF6640`, `#0C0F14`)

| File | Values found |
| --- | --- |
| `web/src/tokens.ts` | `#0C0F14`, `#B8FF3C`, `#FF6640` |
| `web/docs/figma-audit.md` | (documentation only) |
| `.cursor/rules/briefly.mdc` | (rules only) |

### Gradients and glass (restricted under Option A)

| File | Pattern |
| --- | --- |
| `web/src/components/feed/feedTokens.css` | Player gradient, glass blur |
| `web/src/components/feed/useCoverGradient.ts` | Dynamic cover gradients |
| `web/src/components/home/tab-bar.css` | Frosted tab bar, 9999px radius |
| `web/src/styles/app-header.css` | `backdrop-filter: blur(24px)` |
| `web/src/styles/discover-layout.css` | `backdrop-filter: blur(20px)` |
| `web/src/components/onboarding/listening-habits.css` | Radial + linear gradients, 9999px pills |
| `web/src/components/discover/discover-mosaic.css` | Linear gradient, 9999px radius |
| `web/src/components/feed/clip-feed.css` | Gradients, 9999px pills |
| `web/src/components/feed/player/player-interactions.css` | Glass blur, 9999px pills |
| `packages/tokens/colors.ts` | `playerGradientStart/Mid/End`, `overlay.frosted`, `radius.pill: 999` |

### Pill radius (`border-radius: 999px` / `9999px`) — ~30+ occurrences

`homeShelves.css`, `tab-bar.css`, `header-actions.css`, `onboarding/*.css`, `home.css`, `continue-listening.css`, `discover-mosaic.css`, `clip-feed.css`, `player-interactions.css`, `podcast-import.css`, `network-selection.css`, `interest-selection.css`, `forgot-password.css`, `onboarding-shell.css`

---

## Decision Options (Recap)

### Option A — Editorial Dark
Keep `figma-audit.md` + `tokens.ts` + Cursor rules as canonical. Replace warm cream/pink runtime CSS with near-black + chartreuse + burnt orange. Remove glassmorphism, gradients, pill CTAs. **Largest diff** — most component CSS needs updating.

### Option B — Warm Editorial
Keep `index.css` + `packages/tokens/colors.ts` as canonical. Update audit doc, Cursor rules, and `tokens.ts` to match the pink-red warm system. Accept glass/blur/gradients as part of the brand. **Smallest diff** — docs and orphaned tokens change; runtime mostly stays.

### Option C — Merge
Keep warm cream/dark backgrounds from Option B, swap primary accent to chartreuse (`#B8FF3C`) + warm to burnt orange (`#FF6640`), drop glassmorphism per audit. Requires new light-mode chartreuse mapping and re-tinting all pink-dependent components. **Medium diff** — hybrid palette needs new Figma alignment.

---

## Post-Decision Checklist

Once you pick A, B, or C, the following files will be updated (not started yet):

- [ ] `web/src/index.css` — align CSS custom properties
- [ ] `web/src/tokens.ts` — align TS tokens + wire `cssVariables` or remove dead export
- [ ] `web/docs/figma-audit.md` — align documentation
- [ ] `.cursor/rules/briefly.mdc` — make Cursor rules authoritative
- [ ] `packages/tokens/colors.ts` — align for mobile
- [ ] Regex sweep of `web/src/**/*.{ts,tsx,css}` for hardcoded deprecated hex → token refs
- [ ] Report list of files touched

---

## ⏸ STOP — Awaiting Your Decision

**Which palette is the real Briefly brand?**

Reply with **A**, **B**, or **C** (or a variant). No source files will be modified until you decide.
