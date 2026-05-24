# Cursor workflow for Briefly Frontend

How to keep Briefly work organized and routed correctly in Cursor.

## 1. Open the right folder

**File → Open Folder →** select the `briefly-frontend` repo root (where this README lives).

Do not work from a generic Cursor project folder like `empty-window`. The workspace root should be the Git repo that contains `web/`, `mobile/`, and `packages/`.

## 2. One project = one repo

| Project | Repo | Workspace root |
|---------|------|----------------|
| Briefly | `briefly-frontend` | This repo |
| Other apps (e.g. Ginsberg Academy) | Their own repo | That repo's root |

Never mix multiple products in one workspace unless you intentionally use a monorepo for both.

## 3. Cursor settings to use

### Privacy mode
- Use **Default** or **Privacy Mode with Storage** if you want chat history and automations tied to this project.
- Avoid **No Storage** for long-running Briefly sessions — you lose project context between chats.

### Model / Agent
- Use **Agent** mode for implementation (creates and edits files).
- Use **Ask** mode for reviews and questions only (read-only).
- Use **Plan** mode when scoping a large feature before coding.

### Rules
Add a project rule (`.cursor/rules/briefly.mdc` or Cursor Settings → Rules):

```
This workspace is Briefly Frontend only.
- Web code lives in web/
- Mobile code lives in mobile/
- Shared tokens in packages/tokens/ and web/src/tokens.ts
- Never use Inter, Roboto, purple gradients, or glassmorphism
- Motion: cubic-bezier(0.22, 1, 0.36, 1), transform/opacity only
```

### MCP servers (optional but recommended)
- **Figma** — sync design tokens and read frames before implementing screens
- **Mobbin** — reference patterns for new UI
- Do not commit `mcps/` — that folder is Cursor-local

## 4. Prompt templates

### Starting a new feature
```
Briefly Frontend — implement [feature name].

Stack: React + Vite in web/, tokens from web/src/tokens.ts.
Match existing patterns in web/src/components/[area]/.
Include loading/empty states and prefers-reduced-motion.
Do not touch mobile/ unless I ask.
```

### Web-only UI work
```
Work in web/ only. Reference web/docs/figma-audit.md for tokens.
Component goes in web/src/components/[feature]/.
```

### Mobile work
```
Work in mobile/ only. Use @briefly/tokens for colors.
Follow patterns in mobile/src/components/player/.
```

### Design exploration
```
Create a Cursor Canvas in canvases/ for [screen name].
Use Briefly brand tokens from web/src/tokens.ts.
```

## 5. What not to commit

These stay local to your machine (already in `.gitignore`):

- `node_modules/`, `dist/`, `.expo/`
- `agent-tools/`, `agent-transcripts/`, `mcps/`, `terminals/`
- `.env` files

## 6. Branch and commit habits

```bash
git checkout -b feature/continue-listening-v2
# ... work ...
git add web/src/components/home/
git commit -m "Redesign Continue Listening cards with cover tint extraction."
git push -u origin feature/continue-listening-v2
```

Keep commits scoped to one area when possible (`web/`, `mobile/`, or `packages/`).

## 7. After cloning on a new machine

```bash
git clone https://github.com/YOUR_USERNAME/briefly-frontend.git
cd briefly-frontend
npm install
npm run dev:web
```

Open the cloned folder in Cursor. Re-add any personal MCP servers in Cursor Settings if needed — they are not stored in the repo.
