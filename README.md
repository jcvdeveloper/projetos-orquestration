# Projetos Orquestration

Monorepo for SaaS products and client sites built by Projetos Orquestration.

See [`docs/decisions/0001-tech-stack.md`](docs/decisions/0001-tech-stack.md) for the
full stack decision and rationale. Short version: TypeScript everywhere, Next.js,
PostgreSQL via Prisma on Neon, Vercel hosting, GitHub Actions CI, pnpm + Turborepo
monorepo.

## Repo layout

```
apps/
  web/          # Next.js app (starter — first SaaS product or client site starts here)
packages/        # Shared code across apps (UI, config, types) — added as needed
docs/
  decisions/     # Architecture decision records
.github/workflows/ # CI
```

New projects are added as a new app under `apps/`, or their own repo scaffolded from
this one if a client requires code isolation.

## Prerequisites

- Node.js 22 (see `.nvmrc` — run `nvm use` if you use nvm)
- pnpm 11 (`corepack enable` will pick up the pinned version from `package.json`)

## Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # fill in real values
```

## Common commands

Run from the repo root; Turborepo fans these out to every app/package:

```bash
pnpm dev         # start apps/web in dev mode
pnpm lint        # eslint
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest
pnpm build       # production build
pnpm verify      # lint + typecheck + test + build, same as CI
```

## Landing page

Live at **https://jcvdeveloper.github.io/projetos-orquestration/** — a single page
(`apps/web/src/app/page.tsx`) covering what the company does and how to get in touch.
Hosted on GitHub Pages as a v1 stopgap; redeploy after changes with:

```bash
./scripts/deploy-web-to-gh-pages.sh
```

This builds a static export (`pnpm --filter web build:pages`, which sets
`GITHUB_PAGES=true` so `next.config.ts` adds the `/projetos-orquestration` base
path) and pushes it to the `gh-pages` branch, which GitHub Pages serves from.
Move to Vercel (the default per `docs/decisions/0001-tech-stack.md`) once a
Vercel account/token is set up — flagged to the CEO as a decision, not done here.

## CI

`.github/workflows/ci.yml` runs lint, typecheck, test, and build on every push to
`main` and every pull request. A PR that fails any of these should not be merged.

**Known limitation:** the CI workflow currently lives at
`.github/workflows-pending-scope/ci.yml`, not `.github/workflows/ci.yml`, because
the `gh` token used to push from this environment only has `repo`/`gist`/`read:org`
scopes, not `workflow` — GitHub rejects pushes that touch `.github/workflows/*`
without it. Once a maintainer pushes with a token that has the `workflow` scope
(or via the GitHub web UI), move the file back; no content changes needed.

## Adding a new app

```bash
cd apps
pnpm dlx create-next-app@latest <name> --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
```

Then remove any nested `pnpm-lock.yaml` / `pnpm-workspace.yaml` it generates (the
root ones own the workspace) and run `pnpm install` from the repo root.
