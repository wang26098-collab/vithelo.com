# Repository Guidance

This repository is the current VITHELO English B2B nutrition-manufacturing website. Historical V6.1 Nutrition and Aesthetic Technology specifications remain archived context, but they no longer describe the active public route structure or current homepage. Read `docs/current-status.md` before starting work. When historical documentation conflicts with the current status or the user's latest explicit instruction, the newer direction wins.

## Current working memory

- Public identity is `VITHELO` only. Never expose the source company's Chinese name, English name, or original logo in public copy, metadata, images, or alt text.
- Source material is stored under `独立站内容/`. It may inform design and content only within the evidence boundaries recorded in `docs/current-status.md` and `docs/data-governance.md`.
- The hero artwork is locked. Do not replace, regenerate, scale, translate, or apply parallax to it.
- The current Home sequence has seven sections: Hero, manufacturing proof, gummy capability, product directions, product formats, OEM / ODM runway, and inquiry close.
- Product directions remain vertically scroll-driven with no page count, left/right arrows, or horizontal carousel.
- Eight dosage formats remain one section; Oral Films must not be isolated by the layout.
- Motion is selective. The hero image stays static; meaningful facts remain visible with Reduced Motion.
- Do not repeatedly redesign the whole homepage. Work one approved screen at a time and preserve accepted screens.
- The immediate design task is Home screen two only. Its approved direction is `V-A Editorial Proof Ledger`; see `docs/superpowers/specs/2026-09-01-vithelo-home-screen-two-design.md`.
- Project-facing design specifications, plans, progress notes, and acceptance summaries should be written in Chinese. Public website copy remains English.

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

## VITHELO deployment memory

- Formal domain: `vithelo.com`.
- Deployment platform: Hostinger.
- GitHub repository: `https://github.com/wang26098-collab/vithelo.com.git`.
- Production branch: `main`.
- Hostinger settings: Framework `Next.js`, Root Directory `./`, Node `20.x`, default Next.js output.
- Package manager is pinned to `pnpm@10.34.5` in `package.json`; keep `pnpm-lock.yaml` committed.
- Known Hostinger failure: cached `pnpm 11.24.0` can trigger `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING` on Node 20. If it returns, ensure Hostinger uses `pnpm@10.34.5` and clear the deploy cache before changing application code.
- The deployable project is the Next.js app in this repository root. Do not deploy from or edit the frozen standalone HTML preview.
- See `docs/deployment.md` before changing deployment, domain, build, Node, package-manager, or hosting settings.

## Hard Locks

1. Public identity is `VITHELO` only. The source company's names and original logo are not public assets.
2. The active website is a Nutrition OEM / ODM B2B inquiry site. Do not restore the historical device catalog or commerce prototype unless the user explicitly reopens that scope.
3. The approved hero artwork is locked and static.
4. The visual world is cold Ivory, Graphite, Titanium, and restrained Optical light. Do not turn Nutrition into a green channel.
5. The dependency direction is Tokens -> Core Components -> Domain Components -> Page Patterns -> validated content.
6. Home orients and builds trust, Products supports format comparison, OEM / ODM explains the project path, Insights supports reading, and Contact completes direct inquiry routing.
7. Home keeps the approved seven-section sequence. Screen four is vertical, not horizontal; screen five contains all eight formats in one balanced field.
8. Motion follows `SCALE × REVEAL × RESPONSE` and declares `ORIENT`, `RELATE`, `EXPLAIN`, `FOCUS`, or `CONFIRM`. Motion is selective, not mandatory on every screen.
9. Reduced Motion is a completion requirement. Meaningful facts may not exist only inside animation.
10. User-provided manufacturing facts retain an explicit source boundary until production verification. Missing facts remain `NOT_CONFIGURED`.
11. Email and WhatsApp are configured direct inquiry channels. Internal form submission, CRM, analytics, commerce, and identity remain unconfigured.
12. Completion requires P0 = 0 and P1 = 0 at all six acceptance viewports, plus explicit user visual acceptance for the screen being changed.

## Do-not rules

- Do not invent claims, efficacy, dosage, certifications, regulatory status, device mechanisms, parameters, warranty, MOQ, lead time, pricing, shipping, returns, or market policy.
- Do not turn placeholder evidence into proof through visual treatment or confident copy.
- Do not expose the source company's name, logo, or branded slide design in public VITHELO output.
- Do not publish certification logos or certification claims from the supplied profile until the subject, scope, certificate, validity, and public-use approval are verified.
- Do not connect payment, form submission, CMS, CRM, search, identity, analytics, or deployment without approved provider decisions and authorization.
- Do not put product facts directly in route or page-pattern code. Add validated records and relationships through the content layer.
- Do not replace `DEMO_ONLY` or `NOT_CONFIGURED` with plausible-sounding values.
- Do not redesign already accepted screens when the current task targets one screen. Preserve the hero and navigation unless the user explicitly reopens them.
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

- [Current project status](docs/current-status.md)
- [Brand system](docs/brand-system.md)
- [Design system](docs/design-system.md)
- [Content model](docs/content-model.md)
- [Page patterns](docs/page-patterns.md)
- [Data governance](docs/data-governance.md)
- [Motion system](docs/motion-system.md)
- [Acceptance](docs/acceptance.md)
- [Deployment](docs/deployment.md)
- [Missing production inputs](docs/missing-production-inputs.md)
- [Visual QA evidence](docs/visual-qa.md)
- [Approved design specification](docs/superpowers/specs/2026-08-16-nutrition-aesthetic-brand-site-design.md)


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
