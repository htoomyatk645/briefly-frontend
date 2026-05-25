# Briefly Brand Reconciliation Audit

**Date:** May 25, 2026  
**Purpose:** Document what each authoritative file declares about Briefly's color identity and visual restrictions, so contradictions are visible before a palette decision is made.  
**Status:** Phase 1 — audit only. No palette chosen. No source files modified except this document.

---

## How to read this document

Each row in the tables below answers four questions for one file:

1. **Primary brand color** — the main action / identity color (CTAs, brand moments, tint).
2. **Background** — page and surface backgrounds the file treats as canonical.
3. **Accent / secondary** — supporting accent colors beyond the primary brand color.
4. **Visual treatment restrictions** — explicit prohibitions or constraints (glass, gradients, radius caps, typography bans, etc.). **Silent** means the file does not address that dimension; it does not mean "allowed."

Where a file declares different values for light and dark modes, both are listed.

---

## Source file audit

### Summary table

| File | Primary brand color | Background | Accent / secondary | Visual treatment restrictions |
|------|---------------------|------------|-------------------|------------------------------|
| `web/docs/figma-audit.md` | `accent/primary` **#B8FF3C** (acid chartreuse). Primary buttons described as chartreuse background with dark text. No separate pink/red primary declared. | `bg/primary` **#0C0F14** (near-black). Surfaces: **#13171E**, **#1A1F28**, **#232A36**. Documents **dark mode collection only** — no light-mode palette. | `accent/warm` **#FF6640** (burnt orange). Text hierarchy: **#F2F0EB**, **#8A9099**, **#4E5561**. Borders: `rgba(255,255,255,0.06)` / `0.12`. | **Max 8px radius on CTAs.** **No rounded pill buttons.** `radius/full` (9999) for circular elements only. **No gradient fills.** **No glassmorphism.** Fraunces display, Geist body, Geist Mono code. Verification checklist claims all of the above are satisfied. |
| `.cursor/rules/briefly.mdc` | **#B8FF3C** listed as "accent" (paired with bg and warm). No `--primary` or pink/red equivalent named. | **#0C0F14** listed as "Primary bg." | **#FF6640** listed as "warm." | **No purple gradients, glassmorphism, pill CTAs, or gradient text.** Fraunces (display) + Geist (body); **never Inter or Roboto as primary.** All colors/spacing from `tokens.ts`; **no hardcoded values.** Does not mention 8px CTA radius cap, general gradients, or chartreuse-as-CTA vs accent semantics. |
| `web/src/tokens.ts` | `colors.accent.primary` **#B8FF3C** (comment: "use purposefully, not decoratively"). No `primary` / CTA color token. | `colors.bg.primary` **#0C0F14**. Surfaces: **#13171E**, **#1A1F28**, **#232A36**. Dark editorial palette only — **no light theme**. | `colors.accent.warm` **#FF6640** (comment: play states, progress, error). Text: **#F2F0EB**, **#8A9099**, **#4E5561**. | `radius.md` **8px** with comment **"Max for CTAs per brand spec."** `radius.full` **9999** for circular elements. **Silent** on glassmorphism, gradients, pill CTAs, gradient text, purple gradients, typography bans. Exports `--color-*` CSS variables that **are not imported by runtime CSS** (see Cross-cutting findings). |
| `web/src/index.css` | Light: **`--primary` #C9184A** (pink-red). Dark: **`--primary` #FF6B8E** (pink). Hover/soft variants per theme. This is what components using `var(--primary)` actually render. | Light: **`--bg-page` / `--bg` `hsl(40 20% 97%)`** (warm cream). **`--surface` #FFFFFF**, **`--surface-alt` #F1ECEC**. Dark: **`--bg-page` / `--bg` `hsl(20 6% 7%)`**. **`--surface` #221917**, **`--surface-alt` #261A18**. | No chartreuse (**#B8FF3C**) or burnt orange (**#FF6640**) tokens. Secondary hierarchy via **`--text-secondary`**, **`--text-muted`**, **`--border`**, **`--border-strong`**. | **Silent** on glassmorphism, gradients, pill CTAs, gradient text, purple gradients, typography bans. **`--radius-sm` 10px, `--radius-md` 16px, `--radius-lg` 24px** in both themes — **conflicts with 8px CTA cap.** **`--font-body` includes `'Inter'` as fallback.** Hardcoded toast `border-radius: 10px`. |
| `web/src/theme.css` | **Silent** — defers to `index.css` via `var(--text)`, `var(--focus-ring)`. | **Silent** — uses `var(--bg-page)` only. | **Silent**. | **Silent** on all brand restrictions. Structural only: body typography, `.briefly-display` (Fraunces + letter-spacing), focus ring utility. Comment states: *"color tokens live in index.css."* |
| `packages/tokens/colors.ts` | **`primary` #C9184A**. **`primaryHover` #A01039**. **`primarySoft` `rgba(201, 24, 74, 0.08)`**. **`onPrimary` #FFFFFF**. | **`zoneDark` #18110F** (feed/player zone). Neutral scale **#FAF8F8 → #1F1818**. **No page background token** equivalent to `--bg-page`. | **Player gradient:** **`playerGradientStart/Mid` #0DA2D7**, **`playerGradientEnd` #075571** (teal). **`overlay.frosted` `rgba(255, 255, 255, 0.15)`** and other glass-friendly overlays. **No chartreuse or burnt orange.** | **Silent** on explicit prohibitions. **`radius.pill` 999**, **`radius.sheet` 40**, **`radius.card` 16** — implies pills and large radii are valid in shared tokens. Package comment claims *"Source of truth for web + mobile"* but values **match `index.css` light theme, not `web/src/tokens.ts` or figma-audit**. |
| `mobile/constants/Colors.ts` | Light: **`tint` #2f95dc** (default Expo blue). Dark: **`tint` #fff**. **`tabIconSelected`** follows tint. | Light: **`background` #fff**. Dark: **`background` #000**. **`text` #000 / #fff**. | **`tabIconDefault` #ccc** in both modes. **No Briefly brand colors.** | **Silent** on all visual treatment restrictions. Generic Expo template palette; **no relationship to any Briefly token file.** |

---

## Detailed notes by file

### `web/docs/figma-audit.md`

- Treats Figma **Colors (Mode: Dark)** as the design system. All documented hex values are the editorial near-black + chartreuse system.
- Maps tokens to CSS variables named `--color-bg-primary`, `--color-accent-primary`, etc. — a **different namespace** from what `index.css` defines (`--bg-page`, `--primary`, etc.).
- Section 3 explicitly states: *"Maximum 8px radius on CTAs. No rounded pill buttons."* while also documenting `radius/lg` 12px and `radius/full` 9999 for non-CTA use.
- Section 7 verification checklist marks **"No gradient fills"** and **"No glassmorphism"** as complete — **as documentation claims, not as runtime verification against shipped CSS.**
- Button variants reference chartreuse primary buttons; no pink/red primary button variant documented.

### `.cursor/rules/briefly.mdc`

- Cursor reads this file on **every conversation** (`alwaysApply: true`). It instructs agents to use the **#0C0F14 / #B8FF3C / #FF6640** palette and prohibits glassmorphism and pill CTAs.
- Points to **`web/src/tokens.ts`** and **`packages/tokens/`** as shared token sources **without resolving that they disagree with each other.**
- Does not mention `index.css`, which is what the running web app actually loads for theme colors.

### `web/src/tokens.ts`

- Mirrors figma-audit dark editorial palette under `colors.*` and exports `cssVariables` string with `--color-*` prefix.
- **`cssVariables` is never injected** into the app (no imports found in `web/src`). Runtime components do not receive these values unless they import the TS object directly (uncommon).
- Radius comment enforces 8px CTA max; **`radius.lg` 12** and **`radius.full` 9999** still exist in the same file.

### `web/src/index.css`

- **This is the runtime theme** for the web prototype: loaded via `main.tsx` → `@import './index.css'`.
- Defines a **warm, approachable, pink-red primary** system with **cream/dark-warm backgrounds** — a coherent brand, but **not the editorial chartreuse system** documented elsewhere.
- Theme toggle via `[data-theme='light']` / `[data-theme='dark']` on `:root`.
- Radius tokens (**10 / 16 / 24 px**) exceed the 8px CTA cap declared in figma-audit and `tokens.ts`.
- Imports `theme.css` (structural) and `tokens.css` (motion timing only — **no color tokens**).

### `web/src/theme.css`

- Explicitly delegates color authority to `index.css`.
- No palette declarations; no restrictions. Overlap with `index.css` is minimal (body font, display utility, focus ring). **Not a duplicate palette source**, but **not a reconciliation target** beyond confirming it adds nothing conflicting.

### `packages/tokens/colors.ts`

- Declares **`@briefly/tokens`** as shared package; **`primary` #C9184A** aligns with **`index.css` light `--primary`**, not with **`web/src/tokens.ts` accent.primary #B8FF3C**.
- Includes **teal player gradient** tokens and **frosted overlay** tokens — patterns explicitly **prohibited** in figma-audit and Cursor rules.
- Used by **`web/src/data/homeData.ts`** and **`mobile/src/theme.ts`**, but **not** by `mobile/constants/Colors.ts` or runtime `index.css` variable names.
- **`radius.pill: 999`** directly contradicts *"No rounded pill buttons"* in figma-audit and Cursor rules.

### `mobile/constants/Colors.ts`

- Stock Expo navigation template: **#2f95dc** tint, **#fff / #000** backgrounds.
- **Third distinct palette** in the repo, unrelated to both the editorial system and the pink/cream web runtime.
- **`mobile/src/theme.ts`** already imports `@briefly/tokens` — so mobile has **two competing color sources** (this file vs. theme.ts), neither matching `web/src/tokens.ts`.

---

## Cross-cutting findings (contradictions made explicit)

### Two complete palettes

| Dimension | Palette A — "Editorial / Figma / Cursor rules / `web/src/tokens.ts`" | Palette B — "Warm runtime / `index.css` / `packages/tokens/colors.ts`" |
|-----------|------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Primary action color | **#B8FF3C** (chartreuse accent) | **#C9184A** light / **#FF6B8E** dark (pink-red `--primary`) |
| Page background | **#0C0F14** (cool near-black) | **`hsl(40 20% 97%)`** cream light / **`hsl(20 6% 7%)`** warm dark |
| Warm accent | **#FF6640** (burnt orange) | Absent from token set; pink primary fills that role |
| Light mode | Not defined in Palette A sources | Fully defined in Palette B |
| CSS variable namespace | `--color-accent-primary`, `--color-bg-primary`, … | `--primary`, `--bg-page`, `--surface`, … |

**Palette C — `mobile/constants/Colors.ts`:** Expo blue **#2f95dc**, white/black surfaces. Unrelated to both A and B.

### Restrictions declared vs. shipped

| Restriction | Declared in (figma-audit, Cursor rules) | Violated by (examples in codebase) |
|-------------|----------------------------------------|-------------------------------------|
| No glassmorphism | ✅ Both | Tab bar pill (`backdrop-filter: blur(24px)` in `tab-bar.css`), feed glass tokens (`overlay.frosted`, `--feed-glass-*` in `feedTokens.css`), player frosted controls |
| No gradient fills | ✅ figma-audit checklist | `--feed-player-gradient` teal gradient in `feedTokens.css`; `playerGradient*` in `packages/tokens/colors.ts`; featured card overlay gradients in `home.css` |
| No pill CTAs | ✅ figma-audit, Cursor rules | Tab bar full pill (`border-radius: 9999px`); `radius.pill: 999` in shared tokens; pill chips on player source badge, Up Next action buttons |
| Max 8px radius on CTAs | ✅ figma-audit, `tokens.ts` comment | `index.css` `--radius-md: 16px`; shared `radius.card: 16`; feed player radius `2.75rem`; many components use 10–24px radii |
| No purple gradients | ✅ Cursor rules only | **Silent** in Palette B sources; purple appears in decorative artwork classes in `home.css` (`.artwork--plum`, `.artwork--indigo`) — semantic ban vs. illustration palette |
| All colors from tokens / no hardcoded values | ✅ Cursor rules, figma-audit checklist | Widespread hardcoded hex/HSL across component CSS (feed zone, home artwork, tab bar glass literals, etc.) |
| Never Inter/Roboto as primary | ✅ Cursor rules | `index.css` `--font-body: 'Geist', 'Inter', sans-serif` |

**Neither position is documented as aspirational vs. enforced.** Documentation marks several items ✅ complete while runtime and recent PRs reinforce the opposite patterns.

### Three "sources of truth" that disagree

1. **`web/src/tokens.ts`** — editorial chartreuse system; synced to figma-audit; **not wired to runtime CSS.**
2. **`web/src/index.css`** — warm pink/cream system; **what the browser actually uses** for `--primary`, `--bg-page`, etc.
3. **`packages/tokens/colors.ts`** — pink primary + teal gradients + frosted overlays; **imported by some TS modules and mobile theme**, labeled "Source of truth for web + mobile."

Cursor rules cite (1) and (3) without acknowledging (2) is what renders in the web UI today.

### Variable namespace split

| figma-audit / `tokens.ts` `cssVariables` | `index.css` runtime |
|------------------------------------------|---------------------|
| `--color-bg-primary` | `--bg-page`, `--bg` |
| `--color-accent-primary` | `--primary` (different hex) |
| `--color-accent-warm` | *(no equivalent)* |
| `--color-text-primary` | `--text` |
| `--color-surface-1` | `--surface` |

Components overwhelmingly use the **`index.css` namespace**. Figma handoff variables exist only in documentation and an unused TS export.

---

## Files explicitly out of scope for this table (but relevant to Phase 2)

These were **not** in the Phase 1 read list but will matter when reconciling:

- `web/src/tokens.css` — motion timing only; no colors.
- `web/src/components/feed/feedTokens.css` — feed-specific palette (**#18110f** bg, teal gradient, glass shadows) layered on top of `index.css`.
- `mobile/src/theme.ts` — uses `@briefly/tokens`; conflicts with `mobile/constants/Colors.ts`.

---

## Decision required (Phase 2 — blocked until you respond)

Before any reconciliation code runs, choose:

1. **Which palette wins** — Palette A (editorial chartreuse/near-black), Palette B (warm pink/cream runtime), a merge of both, or something new.
2. **Which restrictions to keep or retire** — especially glassmorphism, gradients, pill shapes, and the 8px CTA radius cap, given shipped components that depend on the opposite.
3. **Single token entry point** — which file(s) become authoritative and how `index.css` variables map to them.

**Phase 2 work order (after your decision):**

1. `.cursor/rules/briefly.mdc`
2. `web/docs/figma-audit.md`
3. `web/src/tokens.ts` + `packages/tokens/colors.ts`
4. `web/src/index.css` (+ reconcile/remove overlap with `theme.css`)
5. Orphan hex sweep across `web/src/**/*.{ts,tsx,css}`
6. `mobile/constants/Colors.ts` → import from `@briefly/tokens`

---

*This document will be updated after the palette decision. No source files were modified in Phase 1 except the creation of this audit.*
