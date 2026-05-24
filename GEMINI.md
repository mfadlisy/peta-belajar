# Gemini Notes

Use `AGENTS.md` as the source of truth for coding rules and `DESIGN.md` for product/design direction.

Project summary:

- Next.js App Router project.
- Local-first learning roadmap app.
- No login, Supabase, backend, or API key in the first launch version.
- User data is persisted through `src/lib/storage/localLearning.ts`.

When making changes:

- Keep route files in `src/app`.
- Keep landing sections in `src/components/landing`.
- Keep shared layout components in `src/components/layout`.
- Run `npm run lint` and `npm run build` before finalizing larger changes.
