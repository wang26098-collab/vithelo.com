# VITHELO Phase A Repository Audit

Date: 2026-08-23
Scope: Phase A engineering takeover only
Authority: `VITHELO_GPT_Antigravity_双阶段网站开发执行手册_V1.0.docx`, repository guidance, and the approved local design specification

## Executive conclusion

The repository is a functioning Next.js demonstration rather than an empty shell. Its route coverage, content contracts, explicit `DEMO_ONLY` / `NOT_CONFIGURED` states, responsive primitives, and automated test structure should be retained. Phase A should stabilize and verify the current implementation, close engineering gaps, and produce a recoverable handoff. It should not redesign the approved visual system or begin any Antigravity work.

The current checkout is not a clean baseline. It contains uncommitted homepage work plus pre-existing user files and documentation. These changes must be preserved and separated carefully when creating the Phase A checkpoint.

## Current system map

- Runtime: Next.js 16.3.1 App Router, React 19.2.8, TypeScript 5.9, Tailwind CSS 4.
- Validation: Zod contracts in `src/content/schema.ts`.
- Data direction: local `DEMO_ONLY` fixtures -> Zod validation -> provider-neutral adapter -> route -> page pattern -> domain component.
- Commerce direction: provider-neutral `CommerceAdapter`; all transaction actions remain explicitly `NOT_CONFIGURED`.
- Primary routes: Home, Nutrition, Aesthetic Technology, both PDP families, Science, Professional, Learn, Contact, Search, Cart, Checkout, Account, and Support.
- Global recovery: loading, error, and not-found states.
- Quality tooling: ESLint, TypeScript, Vitest, Playwright at six viewports, production build, and GitHub Actions.
- Business goal: nutrition-led B2B discovery and qualification, with C-side product understanding as support. Email and WhatsApp are the intended inquiry exits but have no approved production endpoints yet.

## Route and task coverage

| Route group | Intended task | Audit result |
| --- | --- | --- |
| `/` | Nutrition-led orientation and routing | Implemented; current visual changes are uncommitted and require baseline verification |
| `/nutrition`, `/nutrition/[slug]` | Discovery and product decision | Implemented with validated demo data, commerce state, evidence boundary, and visible Safety |
| `/aesthetic-technology`, `/aesthetic-technology/[slug]` | Secondary professional capability and device decision | Implemented with the same master brand and explicit configuration boundaries |
| `/science`, `/learn` | Explanation, evidence boundary, and knowledge routing | Implemented; search remains honestly unavailable |
| `/professional`, `/contact` | B2B qualification and inquiry preparation | Implemented locally; no information is transmitted because providers are not configured |
| `/search`, `/cart`, `/checkout`, `/account`, `/support` | Complete or recover user tasks | Implemented as explicit empty or missing-configuration states |

## KEEP

- The one-brand/two-product-world architecture and nutrition-led hierarchy.
- The dependency direction: Tokens -> Core -> Domain -> Patterns -> validated content.
- Zod schemas, fixture validation, relationship IDs, and adapter boundaries.
- Explicit `DEMO_ONLY` and `NOT_CONFIGURED` vocabulary.
- Commerce-first PDP structure and permanently visible Safety boundaries.
- The business-intent-first Project Intake flow.
- Disabled inquiry, cart, checkout, identity, search, and support actions until approved providers exist.
- Six-viewport Playwright matrix and Reduced Motion / keyboard / overflow acceptance coverage.
- Existing approved brand and visual specifications as the visual authority.
- Current CI stages: install, lint, typecheck, unit, build, and E2E.

## REFACTOR

- Consolidate root-level Phase A governance around this audit, `IMPLEMENTATION_PLAN.md`, `AI_CHANGELOG.md`, and the eventual `UI_HANDOFF.md` while linking rather than duplicating focused documents in `docs/`.
- Normalize metadata coverage so every public task route has an intentional title and description, including Home and Contact.
- Add a small, explicit site-origin configuration boundary before canonical URLs, sitemap URLs, robots host data, or social URLs are emitted.
- Review homepage changes against existing content boundaries so product facts do not leak into page-pattern code.
- Make the Phase A checkpoint contain only authorized Phase A and already-approved homepage work; leave unrelated user files untouched.

## REPLACE

- No architectural subsystem requires wholesale replacement.
- Do not replace the local content or commerce adapters until production providers, fields, ownership, and approvals are supplied.
- Do not replace honest missing states with plausible production copy.
- Do not replace the approved visual system during Phase A.

## CREATE

- Root `IMPLEMENTATION_PLAN.md` with Phase A priorities and verification gates.
- Root `AI_CHANGELOG.md` with command evidence and change ownership.
- Root `UI_HANDOFF.md` only after the Phase A implementation and QA gates pass.
- SEO route files (`robots` and `sitemap`) only after the canonical production origin is explicitly configured; until then, prevent demo URLs from being presented as production truth.
- Focused tests for any Phase A behavior changed during implementation.
- A recoverable Git checkpoint that excludes secrets, generated test output, temporary extraction files, and unrelated user changes.

## Findings by severity

### Blocker

1. The current working tree is dirty and mixes approved homepage implementation with unrelated user files. A clean, attributable Phase A checkpoint does not yet exist.
2. The complete Phase A command gate has not been rerun against this exact working tree. Previous passing evidence is useful but stale for handoff purposes.

### High

1. Email and WhatsApp inquiry endpoints are `NOT_CONFIGURED`. This is honest and safe, but production inquiry cannot launch until the user supplies approved values and operating policy.
2. The current metadata layer is incomplete: Home inherits a generic title, Contact has no route metadata, and canonical / Open Graph / sitemap / robots policy has not been finalized.
3. Existing visual QA evidence predates the latest uncommitted homepage changes and cannot certify the current checkout.

### Medium

1. Several utility routes are intentionally non-functional because provider decisions are missing. They are complete demonstration states, not production integrations.
2. A large homepage media asset should be measured during the performance pass before optimization is proposed.
3. The repository contains overlapping historical plans and audits. They are valuable evidence but need a single current Phase A index.

### Low

1. Demo-state language is necessarily repetitive.
2. Social share imagery and structured data are absent; these should wait for approved brand assets and production facts rather than be invented.

## Risks and constraints

- Do not invent an email address, WhatsApp number, price, claim, dosage, policy, certification, MOQ, lead time, or market eligibility.
- Do not connect payment, CRM, CMS, identity, analytics, or deployment without provider decisions and authorization.
- Do not stage or remove pre-existing unrelated files merely to make Git status clean.
- Do not start Antigravity, create a Phase B worktree, or perform a visual redesign in Phase A.
- Do not declare completion from partial, stale, or development-server-only evidence.

## A0 exit decision

A0 is complete when this audit, the Phase A plan, and the initial changelog exist in the repository. The engineering direction is **retain, stabilize, verify, and hand off**. No Phase B authorization is implied.
