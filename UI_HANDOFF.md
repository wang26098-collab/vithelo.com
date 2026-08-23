# VITHELO UI Handoff

Date: 2026-08-23
Status: Phase A engineering baseline complete; Phase B not started

## Purpose

This document defines the stable engineering and content boundaries for a future authorized visual implementation. It is not permission to enter Phase B, install Antigravity, or reinterpret the approved design.

## Stable architecture

The required dependency direction is:

`Tokens -> Core Components -> Domain Components -> Page Patterns -> validated content adapters`

- Visual and motion values originate in `src/styles/tokens.css` and the existing global style layer.
- Navigation, actions, disclosure, state, and sticky behavior belong to `src/components/core/`.
- Product, evidence, Safety, and professional records render through `src/components/domain/`.
- Route compositions belong to `src/components/patterns/` and receive validated data as required props.
- Business facts enter through `src/content/schema.ts`, `src/lib/adapters/`, and `src/lib/content.ts`.
- Demo fixtures remain under `src/content/demo/`; production routes and Page Patterns do not import them directly.

## Route tasks

| Route family | Assigned task |
| --- | --- |
| Home | Orient visitors across one master brand and route Nutrition, Aesthetic Technology, Science, and professional intent |
| Nutrition | Support category and health-need discovery while preserving the approved six-screen sequence |
| Aesthetic Technology | Explain the device world without presenting an unsupported catalog or clinical claim |
| Nutrition PDP | Support a commerce-first decision with price state, action state, use context, key facts, and visible Safety |
| Device PDP | Support a professional decision with configuration state, inquiry path, key facts, and visible Safety |
| Science | Explain evidence scope, source boundaries, limitations, and related records before archive behavior |
| Professional | Qualify business fit and route into the shared project intake |
| Contact | Capture local inquiry context without pretending an unavailable submission provider exists |
| Utility routes | Complete or recover Search, Cart, Checkout, Account, Support, loading, error, and not-found tasks honestly |

## Approved visual and interaction locks

- One master brand contains Nutrition and Aesthetic Technology; do not split the site into two unrelated brands or stores.
- Governing brand formula: `HUMAN × MATERIAL × PRECISION`.
- Palette: cold Ivory, Graphite, Titanium, and restrained Optical light. Nutrition is not a green channel; Aesthetic Technology is not a blue channel.
- The temporary `A PRIME` wordmark is replaceable and must not be treated as approved final identity.
- Preserve the approved Nutrition Home sequence: full-product hero, brand/material transition, product focus rail with hover/focus enlargement, capsule science stage, transparent-red bear gummy stage, and human health-rhythm stage.
- Motion semantics remain `SCALE × REVEAL × RESPONSE` and must serve `ORIENT`, `RELATE`, `EXPLAIN`, `FOCUS`, or `CONFIRM`.
- Hover enlargement, sticky progression, and media switching may be implemented only without hiding meaningful facts or changing task order.
- Do not use scroll-jacking, generic rounded-card grids, elevated shadow systems, channel-color themes, or arbitrary page-local design values.
- Reduced Motion must preserve a complete static path. Keyboard, focus, 44px targets, semantic labels, and mobile reading order are non-negotiable.

## Data and claim boundaries

- Every unverified record remains visibly `DEMO_ONLY`.
- Every unavailable provider or business value remains `NOT_CONFIGURED` or an equivalent explicit disabled state.
- Do not invent claims, efficacy, dosage, certifications, regulatory status, mechanisms, parameters, warranty, MOQ, lead time, price, shipping, returns, or market policy.
- Evidence source, scope, supported-statement boundary, and limitation stay together.
- Safety and transaction state may not be hidden in mobile disclosure or covered by sticky UI.
- Contact actions may compose email or WhatsApp URLs only after approved targets are configured. The current intake does not submit data.

## Production inputs still required

- Final legal brand name, approved logo assets, favicon, and social-sharing media.
- Approved product names, imagery, variants, facts, ingredients/materials, use instructions, Safety text, pricing, inventory, and market availability.
- Approved evidence records, citations, supported statements, limitations, and regulatory review.
- Approved professional/device specifications, service model, warranty, MOQ, lead time, and qualification logic.
- Email and WhatsApp destinations plus owners, consent language, privacy policy, terms, returns, shipping, and support policy.
- Provider decisions and credentials for CMS, CRM, commerce, payment, identity, search, analytics, consent, email, and deployment.
- Production origin through `NEXT_PUBLIC_SITE_URL`; until supplied, metadata intentionally prevents indexing and sitemap output.

## Permitted future Phase B surfaces

Only after separate authorization, a Phase B implementation may refine visual composition, responsive art direction, type scale, spacing, media treatment, and semantic motion while preserving every lock above. It may replace demo media and the temporary wordmark only with approved production assets. It may not bypass schemas/adapters, alter route tasks, fabricate facts, connect providers, or weaken accessibility and Safety behavior.

## Phase A verification baseline

- Lint: passed.
- Typecheck: passed.
- Unit tests: 20 files, 62 tests passed.
- Production build: passed; 20 route entries generated.
- E2E: 126 passed, 12 expected viewport skips, 0 failed across six acceptance widths.
- Acceptance severity: P0 = 0, P1 = 0.

Any future visual work must rerun the complete command gate and preserve these acceptance results.
