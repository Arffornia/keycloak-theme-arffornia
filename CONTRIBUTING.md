# Contributing

Read [AGENTS.md](AGENTS.md) first.

1. `make install`, then `npm run dev` or `make storybook`.
2. Branch from `main` (`fix/<slug>`, `feat/<slug>`, `ci/<slug>`, `docs/<slug>`), Conventional Commits.
3. Run `make check` (lint, type-check, build) before opening a PR; it is what CI runs.
4. Open a PR with the template (What / Why / How it was tested / Risk & revert) and `Closes #n`.

User-visible text goes in `src/login/i18n.ts` (en + fr). Security problems: see [SECURITY.md](SECURITY.md).
