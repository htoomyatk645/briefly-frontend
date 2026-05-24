# Briefly Frontend

## Cursor Cloud specific instructions

### Overview

This is a frontend-only monorepo (npm workspaces) with two apps and a shared tokens package. There is no backend, database, or Docker dependency. The workspace rules default to `web/` unless mobile is explicitly requested.

| Workspace | Purpose | Dev command |
|-----------|---------|-------------|
| `web/` | React + Vite prototype (primary) | `npm run dev:web` → http://localhost:5173 |
| `mobile/` | Expo + React Native app | `npm run dev:mobile` |
| `packages/tokens/` | Shared color tokens (`@briefly/tokens`) | Library only — no server |

### Running the web app

- `npm run dev:web` starts Vite on port 5173 with `host: true`.
- Append `?preview=feed` to skip the onboarding flow and jump directly to the clip feed/player.
- Hot module replacement works out of the box; no restart needed after code changes.

### Static analysis

- There is no ESLint configured. TypeScript (`tsc -b` from `web/`) is the sole static checker.
- `tsconfig.json` enforces `noUnusedLocals` and `noUnusedParameters` — treat these as lint errors.
- Run `npx tsc -b` in `web/` to typecheck.

### Build

- `npm run build:web` (or `tsc -b && vite build` in `web/`) produces a production bundle in `web/dist/`.

### Testing

- No automated test framework is configured (no Jest, Vitest, or Playwright). Manual browser testing is the primary verification method.

### Mobile

- Requires Expo CLI. See `mobile/AGENTS.md` for Expo v56-specific guidance.
- The mobile workspace depends on `@briefly/tokens` from `packages/tokens/`.
