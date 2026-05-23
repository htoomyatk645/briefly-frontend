# Briefly UI Foundation

This folder contains the baseline component-driven UI system for Briefly.

## Included primitives

- `Button` (`primary`, `secondary`, `ghost`; `sm`, `md`, `lg`; loading + disabled)
- `Card` (soft border, optional subtle depth)
- `Input` (accessible focus ring + warm-neutral styling)
- `Screen` (responsive page container with editorial spacing rhythm)

## Usage

1. Import global theme variables once:

```ts
import '../theme.css'
```

2. Use components:

```tsx
import { Button, Card, Input, Screen } from './components/ui'

export const Demo = () => (
  <Screen narrow>
    <Card elevated>
      <h1 className="briefly-display text-3xl text-[var(--text)]">Briefly</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        The best parts. Nothing else.
      </p>
      <Input className="mt-6" placeholder="Paste podcast episode URL" aria-label="Episode URL" />
      <div className="mt-4 flex gap-3">
        <Button>Extract highlights</Button>
        <Button variant="secondary">Watch demo</Button>
      </div>
    </Card>
  </Screen>
)
```

## Accessibility notes

- All interactive components support keyboard focus via `:focus-visible`
- Color contrast is tuned for text-first editorial UI
- Buttons expose `aria-busy` while loading
