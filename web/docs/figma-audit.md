# Briefly Design System Audit

**Figma File:** [Briefly Design System](https://www.figma.com/design/sgYL7Xf5yATgTVaaKkDETk)  
**Audit Date:** May 18, 2026  
**Status:** ✅ Ready for development

---

## 1. Color Tokens

### Collection: Colors (Mode: Dark)

| Token Name | Hex Value | Scopes | CSS Variable |
|------------|-----------|--------|--------------|
| `bg/primary` | `#0C0F14` | FRAME_FILL | `var(--color-bg-primary)` |
| `bg/surface-1` | `#13171E` | FRAME_FILL | `var(--color-surface-1)` |
| `bg/surface-2` | `#1A1F28` | FRAME_FILL | `var(--color-surface-2)` |
| `bg/surface-3` | `#232A36` | FRAME_FILL | `var(--color-surface-3)` |
| `accent/primary` | `#B8FF3C` | FRAME_FILL, SHAPE_FILL, TEXT_FILL | `var(--color-accent-primary)` |
| `accent/warm` | `#FF6640` | FRAME_FILL, SHAPE_FILL, TEXT_FILL | `var(--color-accent-warm)` |
| `text/primary` | `#F2F0EB` | TEXT_FILL | `var(--color-text-primary)` |
| `text/secondary` | `#8A9099` | TEXT_FILL | `var(--color-text-secondary)` |
| `text/muted` | `#4E5561` | TEXT_FILL | `var(--color-text-muted)` |
| `border/subtle` | `rgba(255,255,255,0.06)` | STROKE_COLOR | `var(--color-border-subtle)` |
| `border/default` | `rgba(255,255,255,0.12)` | STROKE_COLOR | `var(--color-border-default)` |

---

## 2. Spacing Tokens

### Collection: Spacing (Mode: Default)

| Token Name | Value (px) | CSS Variable |
|------------|------------|--------------|
| `space/0` | 0 | `var(--space-0)` |
| `space/1` | 4 | `var(--space-1)` |
| `space/2` | 8 | `var(--space-2)` |
| `space/3` | 12 | `var(--space-3)` |
| `space/4` | 16 | `var(--space-4)` |
| `space/5` | 20 | `var(--space-5)` |
| `space/6` | 24 | `var(--space-6)` |
| `space/8` | 32 | `var(--space-8)` |
| `space/10` | 40 | `var(--space-10)` |
| `space/12` | 48 | `var(--space-12)` |
| `space/16` | 64 | `var(--space-16)` |
| `space/20` | 80 | `var(--space-20)` |
| `space/24` | 96 | `var(--space-24)` |

**Base unit:** 4px

---

## 3. Radius Tokens

### Collection: Radius (Mode: Default)

| Token Name | Value (px) | CSS Variable | Notes |
|------------|------------|--------------|-------|
| `radius/none` | 0 | `var(--radius-none)` | Sharp corners |
| `radius/sm` | 4 | `var(--radius-sm)` | Subtle rounding |
| `radius/md` | 8 | `var(--radius-md)` | **Max per brand spec** |
| `radius/lg` | 12 | `var(--radius-lg)` | Use sparingly |
| `radius/full` | 9999 | `var(--radius-full)` | Circular elements only |

**Brand constraint:** Maximum 8px radius on CTAs. No rounded pill buttons.

---

## 4. Text Styles

### Display (Fraunces)

| Style Name | Font | Size | Line Height | Letter Spacing | Use Case |
|------------|------|------|-------------|----------------|----------|
| `display/hero` | Fraunces Bold | 48px | 56px | -2% | Hero headlines |
| `display/h1` | Fraunces SemiBold | 32px | 40px | -2% | Page titles |
| `display/h2` | Fraunces SemiBold | 28px | 36px | -2% | Section headers |
| `display/h3` | Fraunces SemiBold | 24px | 32px | -2% | Highlight headlines |
| `display/pullquote` | Fraunces Regular | 24px | 34px | -2% | Pull quote cards |

### Body (Geist)

| Style Name | Font | Size | Line Height | Use Case |
|------------|------|------|-------------|----------|
| `body/lg` | Geist Regular | 18px | 28px | Large body text |
| `body/base` | Geist Regular | 16px | 24px | Default body |
| `body/sm` | Geist Regular | 14px | 20px | Small body text |
| `body/xs` | Geist Regular | 12px | 16px | Captions, metadata |

### Labels (Geist Medium/SemiBold)

| Style Name | Font | Size | Line Height | Letter Spacing | Use Case |
|------------|------|------|-------------|----------------|----------|
| `label/lg` | Geist Medium | 16px | 20px | 0 | Large labels |
| `label/base` | Geist Medium | 14px | 18px | 0 | Buttons, default labels |
| `label/sm` | Geist Medium | 12px | 16px | 0 | Small labels, tags |
| `label/xs` | Geist SemiBold | 10px | 12px | 0.5px | Overlines, badges |

### Code (Geist Mono)

| Style Name | Font | Size | Line Height | Use Case |
|------------|------|------|-------------|----------|
| `code/base` | Geist Mono Regular | 14px | 22px | Code blocks |
| `code/sm` | Geist Mono Regular | 12px | 18px | Inline code |

---

## 5. Components

| Component | Type | Variants | Description |
|-----------|------|----------|-------------|
| **Button** | Component Set | 6 | Primary, Secondary, Ghost × Default, Hover states |
| **Highlight Card** | Component | 1 | Core content unit with pull quote and accent line |
| **Tab Bar Item** | Component Set | 2 | Active, Inactive states |
| **Input Field** | Component Set | 3 | Default, Focused, Filled states |

### Button Variants
- `Variant=Primary, State=Default` - Acid chartreuse background, dark text
- `Variant=Primary, State=Hover` - 90% opacity
- `Variant=Secondary, State=Default` - Surface-2 background
- `Variant=Secondary, State=Hover` - Surface-3 background
- `Variant=Ghost, State=Default` - Transparent, muted text
- `Variant=Ghost, State=Hover` - Surface-1 background

### Highlight Card
- Signature detail: 2px vertical accent line on left edge
- Pull quote in Fraunces Regular
- Metadata in Geist Regular

---

## 6. Grid & Spacing Definitions

### Mobile Grid (375px)
- Columns: 4
- Gutter: 16px (space/4)
- Margin: 16px (space/4)

### Tablet Grid (768px)
- Columns: 8
- Gutter: 24px (space/6)
- Margin: 32px (space/8)

### Desktop Grid (1440px)
- Columns: 12
- Gutter: 24px (space/6)
- Margin: 80px (space/20)

### Section Spacing
- Minimum card separation: 32px (space/8)
- Section padding desktop: 80px (space/20)
- Section padding mobile: 48px (space/12)

---

## 7. Consistency Audit

### ✅ No Issues Found

All tokens are properly:
- Named with consistent slash-delimited hierarchy
- Scoped to appropriate property pickers
- Linked to CSS variables for code handoff
- Following brand specifications

### Token Naming Convention
```
category/name
├── bg/primary, bg/surface-1, bg/surface-2, bg/surface-3
├── accent/primary, accent/warm
├── text/primary, text/secondary, text/muted
├── border/subtle, border/default
├── space/0 through space/24
└── radius/none, radius/sm, radius/md, radius/lg, radius/full
```

---

## 8. tokens.ts Mapping

All Figma tokens map 1:1 to the code tokens. See `/src/tokens.ts` for the TypeScript implementation.

### Verification Checklist
- [x] All colors match brand spec hex values
- [x] Spacing uses 4px base unit
- [x] Radius capped at 8px for CTAs (per brand spec)
- [x] Fraunces used for display only
- [x] Geist used for body and labels
- [x] Geist Mono used for code
- [x] No gradient fills (brand prohibited)
- [x] No glassmorphism (brand prohibited)
- [x] Components use token bindings (not hardcoded values)
