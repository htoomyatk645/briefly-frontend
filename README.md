# Briefly Frontend

The best parts. Nothing else.

Briefly extracts the best moments from podcast episodes so users get the signal without the runtime. This monorepo contains all frontend work: the React web prototype, the Expo mobile app, shared design tokens, and design canvases.

## Repository structure

```
briefly-frontend/
├── web/                  # React + Vite web prototype (primary design surface)
│   ├── src/
│   │   ├── components/   # UI by feature area
│   │   ├── pages/        # Route-level screens (Home, Discover)
│   │   ├── styles/       # Layout and motion CSS
│   │   ├── theme/        # Theme provider and hooks
│   │   ├── data/         # Mock data and catalogs
│   │   └── tokens.ts     # Design token source of truth
│   ├── public/feed/      # Podcast assets and cover art
│   ├── scripts/          # Asset pipeline (covers, colors, metadata)
│   └── docs/             # Figma audit and design docs
├── mobile/               # Expo React Native app
│   ├── app/              # Expo Router screens
│   └── src/              # Player, navigation, theme
├── packages/tokens/      # Shared color tokens (@briefly/tokens)
└── canvases/             # Cursor Canvas design explorations
```

## Quick start

```bash
# Install dependencies (from repo root)
npm install

# Web prototype
npm run dev:web
# → http://localhost:5173
# → Add ?preview=feed to skip onboarding and open the player

# Mobile app
npm run dev:mobile
```

## Design system

| Token | Value |
|-------|-------|
| Primary bg (light) | `hsl(40 20% 97%)` warm cream |
| Primary bg (dark) | `hsl(20 6% 7%)` warm near-black |
| Accent (light) | `#C9184A` pink-red |
| Accent (dark) | `#FF6B8E` pink |
| Display font | Fraunces |
| Body font | Geist |

Full token reference: `web/src/tokens.ts` and `web/docs/figma-audit.md`.

## What's built so far

### Onboarding
- Welcome sequence with typewriter animation
- Sign up, email profile, forgot password
- Interest selection, podcast network picker, listening habits
- Podcast import (Apple Podcasts / Spotify)

### Home
- Sticky Explore Channels chip row above the Briefly header
- Jump Right In mosaic, Pulse shelf, Continue Listening (compact color-tinted cards)
- The Edit editorial pick, For you today feed, and New from your shows sections
- App header with account menu on secondary tabs; home uses inline sticky header

### Discover
- Dedicated Discover tab with category browse chips
- Jump Right In mosaic grid for browsing highlights

### Feed / Player
- Full-screen clip feed with playback controls
- Bottom sheets: speed, transcript, shop, audio output, more menu
- Up Next carousel

### Mobile
- Expo Router tab shell (Home, Discover, Search, Library, Now Playing)
- Now Playing screen with frosted tab bar
- Player components mirroring web interactions

## Working in Cursor

Open this folder as your workspace root — not the parent `empty-window` Cursor project folder. When starting a new chat, say:

> "I'm working on Briefly Frontend. Context: web prototype in `web/`, mobile in `mobile/`. Follow tokens in `web/src/tokens.ts`."

See `docs/CURSOR_WORKFLOW.md` for full setup instructions.
