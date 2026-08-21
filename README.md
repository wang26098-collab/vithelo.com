# vithelo.com

V6.1 high-fidelity demonstration for one master brand with two product worlds:

- Nutrition
- Aesthetic Technology

The governing direction is `HUMAN × MATERIAL × PRECISION`. The current site is a demonstration, not a production commerce or regulated-product system. The temporary `A PRIME` wordmark is replaceable.

## Current boundary

All local fixtures are explicitly `DEMO_ONLY`. Missing product, science, safety, market, policy, identity, search, commerce, and inquiry inputs remain `NOT_CONFIGURED`. Do not replace these states with invented claims, prices, certifications, parameters, policies, or provider behavior.

The repository intentionally does not connect payment, Commerce, CMS, CRM, Search, Identity, Analytics, or inquiry submission. Those integrations require an approved provider, source data, owner, market context, and acceptance evidence.

## Stack

- Next.js 16.3.1 App Router
- React 19 and TypeScript
- Tailwind CSS 4, Radix UI, and Motion
- Zod-validated content adapters
- Vitest and Testing Library
- Playwright across six acceptance viewports

## Local setup

Use Node 20.x or a compatible current LTS runtime.

```powershell
corepack enable
pnpm.cmd install
pnpm.cmd dev
```

The fallback npm scripts are equivalent when pnpm is unavailable:

```powershell
npm install
npm run dev
```

## Quality commands

Run from the repository root:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Playwright starts its own Next.js server on `127.0.0.1:3100`. Do not start a second server on that port while `test:e2e` is running. The acceptance matrix covers 1440, 1280, 1024, 768, 390, and 375px widths.

## Deployment

Recommended Vercel settings:

- Framework: `Next.js`
- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: leave blank
- Node.js: `20.x`

The current demonstration requires no environment variables. Do not add placeholder secrets. Future provider variables must be approved, documented, and supplied through the deployment secret store.

## Repository structure

- `src/app/`: App Router routes and global states
- `src/components/`: core, UI, domain, motion, and page patterns
- `src/content/`: Zod contracts and `DEMO_ONLY` fixtures
- `src/lib/adapters/`: provider-neutral content and Commerce boundaries
- `tests/unit/`: unit and component tests
- `tests/e2e/`: journey, accessibility, responsive, and data-integrity tests
- `docs/`: design, data governance, acceptance, audit, and visual QA records

See [the repository audit](docs/project-audit.md), [acceptance checklist](docs/acceptance.md), and [visual QA record](docs/visual-qa.md) before changing architecture or connecting production services.
