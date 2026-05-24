# Workspace Structure

This document explains where new code should go.

## Root

- `README.md`: quickstart, project summary, and folder map.
- `DESIGN.md`: product, UI, and privacy direction.
- `AGENTS.md`: coding agent rules and project constraints.
- `CLAUDE.md`: Claude entry point.
- `GEMINI.md`: Gemini entry point.
- `package.json`: scripts and dependencies.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: TypeScript and path alias configuration.

## Source

```text
src/
├── app/
├── components/
└── lib/
```

### `src/app`

Use this folder for routes. A route is public only when a segment contains `page.tsx` or `route.ts`.

Current routes:

- `/`
- `/assessment`
- `/skills`
- `/dashboard`

### `src/components`

Use this folder for reusable UI.

- `layout`: shared shell components such as `Navbar` and `Footer`.
- `landing`: sections used by the home page.

### `src/lib`

Use this folder for non-UI code.

- `storage/localLearning.ts`: localStorage keys, data types, migrations, and persistence helpers.

## Public Assets

Put images and SVGs that should be served directly from the site in `public`.

Use stable descriptive filenames. Remove assets when the feature that uses them is removed.
