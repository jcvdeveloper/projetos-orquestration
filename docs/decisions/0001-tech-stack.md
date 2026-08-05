# 0001: Base tech stack for SaaS products and client sites

**Status:** Accepted
**Date:** 2026-08-05
**Author:** Founding Engineer

## Context

Projetos Orquestration is pre-product with no existing codebase. We'll be building
a mix of SaaS products and client sites, often several in flight at once, with a
single engineer (for now). The stack needs to be boring, well-documented, and cheap
to run at zero revenue, not novel. It needs to unblock every future project, not just
this one.

## Decision

| Layer | Choice |
|---|---|
| Language | TypeScript everywhere (frontend, backend, scripts) |
| Package manager | pnpm |
| Repo shape | Monorepo (pnpm workspaces + Turborepo) |
| Frontend / full-stack framework | Next.js (App Router) |
| Backend | Next.js Route Handlers for product APIs; break out a standalone Node service only when a project needs a long-running process (queues, cron workers) outside the request lifecycle |
| Database | PostgreSQL |
| ORM | Prisma |
| DB hosting | Neon (serverless Postgres, free tier, branch-per-PR previews) |
| Styling | Tailwind CSS |
| Testing | Vitest |
| Lint / format | ESLint + Prettier |
| App hosting | Vercel |
| CI | GitHub Actions |

## Why

- **One language, one runtime.** TypeScript on both ends means one engineer (or a
  small team) doesn't context-switch between languages, tooling, or type systems.
  This matters more for a one-person shop than for a large org.
- **Next.js covers both product types we build.** SaaS dashboards and marketing/client
  sites are both first-class in Next.js (SSR, SSG, ISR, API routes). Avoids running
  two frameworks for two kinds of deliverable.
- **Monorepo now, not later.** We know from the mission statement that we'll build
  *multiple* things (SaaS + client sites). A pnpm + Turborepo monorepo lets every new
  project share lint config, UI primitives, and tsconfig from day one, instead of
  copy-pasting boilerplate per repo or doing a painful migration later. Turborepo's
  caching also keeps CI fast as the repo grows.
- **Postgres + Prisma is the least surprising choice for relational data**, which is
  what SaaS billing/user/tenant data almost always is. Prisma's migrations and
  generated client remove a class of hand-written SQL bugs.
- **Neon over self-hosting Postgres**: serverless, scales to zero, has a real free
  tier, and gives us branch-per-PR databases for previews without extra ops work.
  No infra to patch or back up ourselves pre-revenue.
- **Vercel over a general cloud (AWS/GCP)**: zero-ops deploys, preview URLs per PR,
  first-class Next.js support, free tier. We can move a specific project off Vercel
  later if a client needs it (e.g. dedicated infra requirement) without changing the
  app code.
- **Vitest over Jest**: faster, near-zero config with Vite/Next tooling, same API
  surface so it's not a novel choice, just a faster default.
- **GitHub Actions**: matches GitHub as the code host, free minutes for a repo this
  size, no separate CI vendor to manage.

## Explicitly deferred (not decided here)

- **Auth**: no auth provider is wired into the scaffold yet. When the first project
  needs it, default to Auth.js (self-hosted, no per-MAU cost) unless the project's
  requirements (e.g. SSO, org management) justify a paid provider like Clerk/WorkOS —
  that's a per-project call, not a base-stack one.
- **Payments**: Stripe is the default assumption for any SaaS billing, added
  per-project when needed.
- **Mobile**: not addressed; revisit if a project requires a native app.

## Alternatives considered

- **Remix / SvelteKit** instead of Next.js: smaller ecosystem, less hiring/knowledge
  surface than Next.js, no compelling advantage for our use case.
- **Separate frontend (Vite/React) + backend (Fastify/NestJS) repos**: more moving
  parts, two deploy targets per project, slower to stand up a new client site.
  Next.js Route Handlers cover the vast majority of what we'll need; we keep the
  escape hatch to a standalone service for the minority of cases that need one.
- **Supabase instead of Neon**: also a reasonable choice (adds auth/storage/realtime
  out of the box). We chose Neon to keep the DB layer minimal and unopinionated;
  Supabase's extra services can be adopted per-project if a specific product wants
  its auth/storage rather than baking it into the base stack.
- **Multiple single-purpose repos** instead of a monorepo: rejected because it
  duplicates config/tooling across every new project and makes shared components
  harder to reuse across client sites.

## Consequences

- New projects (a new SaaS product, a new client site) live as a new app under
  `apps/` in this repo, or as their own repo scaffolded from this template if a
  client requires code isolation. Shared code goes in `packages/`.
- Every project defaults to Vercel + Neon + GitHub Actions unless a client
  contract requires different infra — that's a per-project decision to flag,
  not a reason to fork the base stack.
