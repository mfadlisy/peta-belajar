<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Peta Belajar Agent Guide

## Product Direction

Peta Belajar is a local-first learning roadmap app. The first launch version must work without login, Supabase, server database, or API keys. User data is stored only in the browser with `localStorage`.

## Current Architecture

- `src/app`: Next.js App Router route files only.
- `src/app/assessment`: learning profile diagnosis flow.
- `src/app/skills`: skill selection and roadmap generation flow.
- `src/app/dashboard`: local progress dashboard.
- `src/components/layout`: shared layout components such as navbar and footer.
- `src/components/landing`: landing page sections.
- `src/lib/storage`: local persistence helpers and data types.
- `public`: static images, icons, and brand assets.

## Local Data Contract

Use `src/lib/storage/localLearning.ts` as the only place that reads or writes app-owned localStorage keys.

Current keys:

- `peta_belajar_profile`
- `peta_belajar_roadmap`

Legacy migration keys are kept inside the storage helper only. Do not read those keys directly from pages or components.

## Coding Rules

- Keep route files focused on page-level orchestration.
- Put shared UI in `src/components`.
- Put browser storage, parsing, and data-shape helpers in `src/lib`.
- Do not reintroduce Supabase, auth, or backend calls unless the product direction changes.
- Do not commit `.env*`, `.next`, `node_modules`, or local OS files.
- Run `npm run lint` and `npm run build` before pushing meaningful changes.

## Next.js Rules

This project uses Next.js 16. Read the local docs in `node_modules/next/dist/docs/` before changing framework-specific patterns. Prefer the App Router conventions already used in this repository.
