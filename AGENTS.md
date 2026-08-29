# Repository Guidance

This repository is the V6.1 high-fidelity demonstration for one Nutrition and Aesthetic Technology brand platform. The approved design specification is the authority. The current site is not production-ready because brand, product, science, market, provider, media, and policy inputs are still missing.

## Repository structure

- `src/app/`: Next.js App Router entry points, metadata, and global route states.
- `src/styles/tokens.css`: visual and motion token source of truth.
- `src/components/core/`: navigation, actions, disclosure, state, and sticky primitives.
- `src/components/ui/`: customized Radix primitives used by core components.
- `src/components/domain/`: schema-driven product, evidence, safety, and professional UI.
- `src/components/motion/`: semantic motion primitives.
- `src/components/patterns/`: Home, Landing, PDP, Science, Professional, and Utility compositions.
- `src/content/schema.ts`: Zod content contracts.
- `src/content/demo/`: local `DEMO_ONLY` fixtures.
- `src/lib/adapters/`: provider-neutral content and commerce interfaces.
- `src/lib/content.ts`: validated local content adapter.
- `public/media/`: demonstration media used by implemented patterns.
- `tests/unit/`: component, schema, token, state, and interaction tests.
- `tests/e2e/`: journey, accessibility, responsive, and data-integrity checks.
- `docs/`: implementation contracts, acceptance evidence, and production-input gaps.

## Commands

Run commands from the repository root on Windows:

```powershell
pnpm.cmd install
pnpm.cmd dev
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

`pnpm.cmd test:e2e` starts its own Next.js development server on `127.0.0.1:3100`. Do not start a second server on that port during the run.

## Hard Locks

1. One master brand contains two product worlds. Do not build a Nutrition shop beside a separate device catalog.
2. The governing brand formula is `HUMAN × MATERIAL × PRECISION`.
3. The visual world is cold Ivory, Graphite, Titanium, and restrained Optical light. Nutrition is not a green channel. Aesthetic Technology is not a blue channel.
4. The temporary `A PRIME` wordmark is replaceable. It is not an approved final brand identity.
5. The dependency direction is Tokens -> Core Components -> Domain Components -> Page Patterns -> validated `DEMO_ONLY` data.
6. Home orients, Landings support discovery, PDPs support decisions, Science explains evidence, Professional qualifies business fit, and Utility routes complete or recover tasks.
7. PDPs are commerce-first. Price state, action state, key facts, use context, and Safety remain visible.
8. Science explains first and archives later. Source, scope, supported-statement boundary, and limitation stay together.
9. Motion follows `SCALE × REVEAL × RESPONSE` and must declare one of `ORIENT`, `RELATE`, `EXPLAIN`, `FOCUS`, or `CONFIRM`.
10. Reduced Motion is a completion requirement. Meaningful facts may not exist only inside animation.
11. Every unverified fixture and record remains visibly marked `DEMO_ONLY`; missing integrations or facts remain `NOT_CONFIGURED`.
12. Completion requires P0 = 0 and P1 = 0 at all six acceptance viewports.

## Do-not rules

- Do not invent claims, efficacy, dosage, certifications, regulatory status, device mechanisms, parameters, warranty, MOQ, lead time, pricing, shipping, returns, or market policy.
- Do not turn placeholder evidence into proof through visual treatment or confident copy.
- Do not connect payment, inquiry submission, CMS, CRM, search, identity, or deployment without approved provider decisions and authorization.
- Do not put product facts directly in route or page-pattern code. Add validated records and relationships through the content layer.
- Do not replace `DEMO_ONLY` or `NOT_CONFIGURED` with plausible-sounding values.
- Do not hide Safety, commerce state, evidence boundaries, or recovery actions in mobile-only disclosure.
- Do not copy Seed branding, copy, green microbiome styling, product logic, layout, motion, or code. The local mirror is a structural-quality reference only.
- Do not restore generic shadcn styling, rounded-card grids, elevated shadows, channel-color themes, arbitrary motion durations, or page-local design values.
- Do not use scroll-jacking. Do not let sticky resources cover Safety or remain visible above a modal.
- Do not edit generated `next-env.d.ts` by hand.

## Definition of Done

A change is done only when all applicable items pass:

- Content enters through a Zod contract and adapter boundary.
- Demo and missing-configuration states are explicit in data and rendered UI.
- Desktop and mobile compositions preserve the page's assigned task.
- Keyboard operation, visible focus, semantic labels, logical order, 44px targets, text resizing, non-color-only status, and Reduced Motion remain intact.
- Loading, empty, error, loaded/success, disabled, and missing-configuration behavior is covered where relevant.
- Critical Safety and transaction information remain visible.
- `pnpm.cmd lint`, `pnpm.cmd typecheck`, `pnpm.cmd test`, `pnpm.cmd test:e2e`, and `pnpm.cmd build` exit with code 0.
- Visual review confirms no unresolved P0/P1 defect, clipping, overlap, horizontal overflow, or unsupported claim.

## Focused documentation

- [Brand system](docs/brand-system.md)
- [Design system](docs/design-system.md)
- [Content model](docs/content-model.md)
- [Page patterns](docs/page-patterns.md)
- [Data governance](docs/data-governance.md)
- [Motion system](docs/motion-system.md)
- [Acceptance](docs/acceptance.md)
- [Missing production inputs](docs/missing-production-inputs.md)
- [Visual QA evidence](docs/visual-qa.md)
- [Approved design specification](docs/superpowers/specs/2026-08-16-nutrition-aesthetic-brand-site-design.md)


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
