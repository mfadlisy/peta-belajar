# Design Guide

## Product Principle

Peta Belajar should feel like a practical learning companion: friendly, clear, and focused on helping users move from diagnosis to roadmap to progress without account friction.

## Experience Model

The first launch version is local-first:

- No login.
- No remote database.
- No API key requirement.
- All personal learning data stays in the user's browser.

Primary flow:

1. Landing page introduces the value.
2. User starts the assessment.
3. Assessment saves a learning profile locally.
4. User chooses a skill.
5. App generates and saves a roadmap locally.
6. Dashboard reads local roadmap data and tracks progress locally.

## UI Structure

- Landing page sections live in `src/components/landing`.
- Shared shell components live in `src/components/layout`.
- Route-specific page UI lives in its route folder under `src/app`.
- CSS Modules stay beside the component or page that owns them.

## Visual Direction

- Keep the UI warm, approachable, and educational.
- Use clear hierarchy and readable spacing.
- Avoid adding decorative complexity unless it supports comprehension.
- Keep CTA language action-oriented, for example `Buat Dashboard`.
- Preserve responsive behavior when editing layouts.

## Data And Privacy

Data stored in localStorage is private to the user's browser profile, but it is not synced across devices. The UI should not promise cloud sync or permanent storage.

Use `src/lib/storage/localLearning.ts` for storage changes. Avoid direct `localStorage` access in pages unless there is a strong reason and the helper is updated first.

## Maintenance Rules

- Change one domain at a time: landing, assessment, skills, dashboard, or storage.
- Prefer small components when a page becomes hard to scan.
- Keep public assets in `public`.
- Remove unused assets when a feature is removed.
- Update this file when the product direction changes.
