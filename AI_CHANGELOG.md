# VITHELO AI Change Log

This log records Phase A engineering actions, their reason, and fresh verification evidence. It does not authorize Phase B.

## 2026-08-23 - A0 takeover and repository audit

### Source reviewed

- Read `D:/办公/独立站/VITHELO_GPT_Antigravity_双阶段网站开发执行手册_V1.0.docx` in full, including body text and tables.
- The local document renderer could not produce page images because LibreOffice / `soffice` is not installed. Structural extraction completed successfully; no visual-layout claim is made about the document itself.

### Repository reviewed

- Inventoried App Router routes, global states, component layers, content schemas, local fixtures, provider-neutral adapters, site configuration, inquiry helpers, tests, Playwright viewport matrix, CI, and focused documentation.
- Read the installed Next.js 16.3.1 documentation for metadata, `robots`, and `sitemap` before proposing SEO work.
- Confirmed the repository already implements a coherent demonstration architecture and should not be rebuilt.
- Confirmed production email, WhatsApp, commerce, CRM, CMS, search, identity, support, analytics, policy, and factual product inputs remain unavailable and must not be invented.

### Files created

- `PROJECT_AUDIT.md`
- `IMPLEMENTATION_PLAN.md`
- `AI_CHANGELOG.md`

### Decisions

- Phase A strategy: retain, stabilize, verify, and hand off.
- Latest uncommitted homepage work is treated as existing user-approved work that must be preserved and freshly verified.
- Existing unrelated untracked or modified files will not be staged, deleted, or rewritten merely to clean Git status.
- `UI_HANDOFF.md` will not be created until implementation and final QA are complete.
- No Antigravity installation, launch, worktree, or Phase B visual redesign will occur.

### Verification

- A0 was read-only except for the three governance documents above and temporary document-extraction artifacts under `.tmp/document-review/`.
- Fresh lint, typecheck, unit, build, and E2E results are pending A1 and will be recorded here verbatim.

### Remaining work

- A1 fresh baseline through A6 handoff and recoverable checkpoint, as defined in `IMPLEMENTATION_PLAN.md`.

## 2026-08-23 - A1 fresh baseline and test-contract reconciliation

### Initial command results

- `pnpm.cmd lint`: exit 0.
- `pnpm.cmd typecheck`: exit 0.
- `pnpm.cmd test`: exit 0; 19 files and 59 tests passed.
- `pnpm.cmd build`: exit 0; Next.js 16.3.1 compiled successfully and generated 18 route entries.
- First `pnpm.cmd test:e2e`: server did not start because an existing Next development preview for this repository held the `.next/dev` lock.
- After stopping only the identified repository preview process, the first complete browser run executed: 93 passed, 12 expected viewport skips, and 27 failed.

### Root causes

- Two older tests still required the replaced `Capsule form study` heading instead of the approved `Precision inside every capsule.` heading.
- The responsive test equated normal sequential flow with `position: static`; the new capsule stage correctly uses `position: relative` for its material layers while remaining non-sticky on mobile.
- The demo-integrity test required the global disclosure strip even where the approved desktop Home composition intentionally uses an in-screen `DEMO_ONLY` disclosure.
- The claim scan cloned `body` and read `textContent`, causing Next development `<script>` payloads to be treated as rendered copy.
- The six-screen test used a non-exact accessible-name locator that matched both the manifesto navigation and content link on desktop.

### Test changes

- Updated the stale capsule heading contract in accessibility and core-journey E2E coverage.
- Preserved Reduced Motion coverage by asserting the capsule-specific static state plus the remaining generic static records.
- Changed the mobile flow assertion to reject `sticky` and `fixed` instead of requiring `static`.
- Required either the visible global disclosure or a visible in-page `DEMO_ONLY` boundary.
- Excluded script, style, template, and noscript nodes from rendered-copy claim scanning.
- Made the manifesto content-link locator exact.

### Final A1 evidence

- Focused Demo Integrity rerun: 12 passed, 0 failed.
- Final `pnpm.cmd test:e2e`: exit 0; 120 passed, 12 expected viewport skips, 0 failed.
- The right-side development preview was restored at `http://127.0.0.1:3000/` after the E2E run.

### A1 conclusion

- The application baseline is green.
- The initial E2E failures were stale or over-specific test contracts plus one development-server lock conflict, not twenty-seven independent product defects.
- Development logs expose image sizing, fill-parent positioning, and above-the-fold loading warnings; these move to the A4 performance pass.

## 2026-08-23 - A2 route, business-flow, and state verification

### Verified behavior

- Home orientation, first-screen navigation, six-screen sequence, nutrition product discovery, and B2B recovery paths.
- Nutrition and Aesthetic Technology landing and PDP routes, including price state, disabled action state, and visible Safety.
- Professional-to-Contact routing, four business intents, local context fields, and change-intent behavior.
- Email and WhatsApp inquiry message and URL encoding independently of production configuration.
- Explicit disabled inquiry actions when contact targets are unavailable; no data submission occurs.
- Search and Cart task clarity plus Checkout, Account, Support, loading, error, and not-found recovery primitives.
- Mobile inquiry lifecycle, Contact yield behavior, and PDP-local sticky priority.

### Decision

- No production service was connected. The absence of approved contact, commerce, identity, search, and support providers remains an intentional `NOT_CONFIGURED` state.
- No page visual was redesigned during A2.
- No new product code was required after the A1 test-contract fixes; the current business logic is coherent for the demonstration scope.

## 2026-08-23 - A3 content and adapter boundary closure

### Problem confirmed

- Home and the two PDP static-parameter generators still read demo fixture modules directly.
- Nutrition Landing, Aesthetic Landing, Nutrition PDP, Device PDP, Science, and Professional patterns embedded demo fixtures as default props.
- This bypassed the locked adapter direction even though the records were individually parsed.

### Changes

- Added `getHomeContent()` to `ContentAdapter` and the validated local implementation.
- Changed Home to load Home content, evidence, and products through `localContentAdapter`.
- Changed both dynamic product routes to generate static params from the content adapter.
- Removed all demo fixture imports and default business data from Page Patterns; route callers now provide required validated props.
- Updated unit callers to provide explicit parsed fixtures.
- Added a fixture-level regression against prohibited approval and efficacy language.
- Reworded `Approved device and professional-use inputs required.` to `Device and professional-use inputs require approval.` to avoid an `approved device` regulatory ambiguity.

### Evidence

- The new adapter test failed first with `getHomeContent is not a function`, then passed after implementation.
- The prohibited-language test failed first on `approved device`, then passed after the wording correction.
- Production routes and Page Patterns contain no `@/content/demo/*` imports.
- Source secret scan returned no matches.
- Demo claim scan for `FDA`, `clinically proven`, `certified`, `guaranteed`, and `approved device` returned no matches.
- Full unit suite: 19 files, 60 tests passed.

## 2026-08-23 - A4 responsive, accessibility, SEO, and image performance

### SEO and crawl safety

- Added a validated site-origin boundary based on `NEXT_PUBLIC_SITE_URL`; malformed or missing values resolve to no production origin.
- Added `robots.ts`: missing origin disallows all crawling; configured origin allows public content while excluding Account, Cart, Checkout, and Search.
- Added `sitemap.ts`: missing origin returns no URLs; configured origin emits public discovery, product, Science, Learn, Professional, Contact, and Support routes.
- Added Home and Contact route metadata.
- Root metadata emits canonical, Open Graph, and Twitter fields only when a production origin exists; otherwise it emits `noindex, nofollow`.
- No OG image or structured product data was invented because approved production brand assets and facts are unavailable.

### Image performance

- Read the installed Next.js 16.3.1 Image documentation before changing image behavior.
- Replaced deprecated Image `priority` usage on single above-the-fold media with `loading="eager"`.
- Added a positioned direct parent for product-card `fill` images.
- Replaced the two separately rendered Home hero images with the documented `getImageProps` + `<picture>` art-direction pattern, so the browser chooses one breakpoint source instead of eagerly loading both.
- Measured source assets: the largest local file is `home-membrane.png` at 2.24 MiB; Next Image remains responsible for responsive runtime optimization.

### Evidence

- SEO and metadata focused tests passed.
- Typecheck passed after implementation.
- Lint passed with no remaining warning after the art-direction adjustment.
- Desktop 1440 primary visual-route browser check: 9 passed, including zero Next Image configuration warnings.
- Mobile 390 focused primary visual-route warning check passed after the responsive picture change.
- Existing complete E2E coverage retains six viewports, keyboard focus, 44px targets, Reduced Motion, overflow, sticky Safety boundaries, and mobile sequential flow.

## 2026-08-23 - A5 final regression closure

### Last defect closed

- The complete browser matrix exposed an above-the-fold loading warning for the repeated Aesthetic device image at desktop, tablet, and mobile widths.
- Both instances that can become the route's largest visible image now declare eager loading. No layout, copy, product fact, or motion treatment changed.
- The focused primary-visual-route warning suite passed before the final gate.

### Final command gate

- `pnpm.cmd lint`: exit 0.
- `pnpm.cmd typecheck`: exit 0.
- `pnpm.cmd test`: exit 0; 20 test files and 62 tests passed.
- `pnpm.cmd build`: exit 0; Next.js 16.3.1 compiled successfully and generated 20 route entries, including `robots.txt` and `sitemap.xml`.
- `scripts/run-e2e.ps1`: exit 0; 126 passed, 12 expected viewport skips, 0 failed across 1440, 1280, 1024, 768, 390, and 375 pixel projects.

### Acceptance result

- P0: 0.
- P1: 0.
- No critical console error, unsupported claim, secret match, horizontal overflow, Safety obstruction, or unresolved Next Image configuration warning remains in the covered routes.
- Remaining work is production-input configuration and future authorized visual implementation, not a Phase A engineering defect.

## 2026-08-23 - A6 handoff preparation

- Created `UI_HANDOFF.md` as the Phase A-to-Phase B boundary contract.
- Preserved all unrelated and pre-existing user-owned working-tree files.
- Prepared a recoverable local checkpoint on `codex/phase-a-engineering` containing only the reviewed Phase A files and previously approved Home work.
- No Antigravity installation, launch, Phase B branch, Phase B worktree, or visual redesign was performed.
