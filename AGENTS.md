# AGENTS.md

## Commands

- `bun run dev` - Start dev server
- `bun run build` - Typecheck + build (tsc -b && vite build)
- `bun run lint` - ESLint
- `bun run preview` - Preview production build

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (not v3)
- shadcn/ui with `base-nova` style, Lucide icons
- bun (package manager)

## Path Aliases

`@/*` maps to `src/*` (configured in tsconfig.json and vite.config.ts)

## Adding shadcn Components

```bash
bunx shadcn@latest add [component-name]
```

Components go in `src/components/ui/`.

## CSS Variables

Tailwind v4 CSS variables are in `src/index.css`. The shadcn theme uses HSL color space.
