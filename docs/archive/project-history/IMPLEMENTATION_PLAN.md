# VITHELO Phase A Implementation Plan

Date: 2026-08-23
Scope lock: Phase A only; no Antigravity or Phase B activity

## Real problem

Turn the current high-fidelity demonstration into a stable, testable, recoverable engineering baseline without changing its approved visual direction or fabricating missing production inputs.

## Scope tiers

### Must

- Preserve and classify the current working tree.
- Establish fresh lint, typecheck, unit, build, and E2E baselines.
- Verify every primary route, core interaction, missing state, responsive composition, keyboard path, Reduced Motion path, and Safety boundary.
- Fix reproducible Phase A engineering defects with focused tests.
- Close metadata and crawl-policy gaps without inventing a production origin.
- Maintain `AI_CHANGELOG.md` and produce `UI_HANDOFF.md` only after all gates pass.
- Create a recoverable Git checkpoint containing only authorized work.

### Should

- Measure largest assets and obvious performance risks.
- Reconcile current implementation evidence with existing focused docs.
- Record production-input blockers in one handoff section.

### Could

- Add approved production integrations after the required values and owners are supplied in a future task.
- Add approved OG media and structured data after production brand assets and facts exist.

### Won't in Phase A

- Install or launch Antigravity.
- Create a Phase B branch or worktree.
- Redesign the approved screens, motion language, or brand system.
- Connect commerce, CRM, CMS, search, identity, analytics, payment, or deployment.
- Invent missing business facts or contact endpoints.

## Execution order

### A0 - Repository audit

- [x] Read the execution manual in full.
- [x] Inventory routes, component layers, adapters, fixtures, configuration states, tests, CI, and focused documentation.
- [x] Classify KEEP / REFACTOR / REPLACE / CREATE.
- [x] Create `PROJECT_AUDIT.md`, `IMPLEMENTATION_PLAN.md`, and the initial `AI_CHANGELOG.md`.

Exit: repository direction is explicit and no Phase B work has started.

### A1 - Fresh baseline

- [x] Capture exact Git branch, head, and working-tree ownership.
- [x] Run `pnpm.cmd lint`.
- [x] Run `pnpm.cmd typecheck`.
- [x] Run `pnpm.cmd test`.
- [x] Run `pnpm.cmd build`.
- [x] Run `pnpm.cmd test:e2e` with no conflicting development server.
- [x] Record exact exits, pass / skip counts, generated route count, and failures.

Exit: every failure is reproducible and classified as product defect, environment issue, or unrelated pre-existing change.

### A2 - Functions, business routes, and states

- [x] Verify Home orientation and links.
- [x] Verify Nutrition and Aesthetic discovery and PDP decision paths.
- [x] Verify Professional and Contact intent selection, query initialization, and disabled inquiry behavior.
- [x] Verify email / WhatsApp URL generation independently of unavailable production values.
- [x] Verify Search, Cart, Checkout, Account, Support, loading, error, and not-found recovery states.
- [x] Fix only reproducible defects and add focused tests first.

Exit: main routes and core interactions are coherent, no critical runtime error remains, and unavailable services fail honestly.

### A3 - Architecture and data boundaries

- [x] Confirm all business facts enter through Zod records and adapters.
- [x] Confirm page patterns do not own product, evidence, Safety, or commerce facts.
- [x] Confirm `DEMO_ONLY` / `NOT_CONFIGURED` labels survive rendering.
- [x] Confirm no provider-specific logic leaks into presentation components.
- [x] Run claim and secret scans.

Exit: data lineage, provider boundaries, and unsupported-claim protection are enforceable.

### A4 - Responsive, accessibility, SEO, and performance

- [x] Verify 1440, 1280, 1024, 768, 390, and 375 pixel compositions.
- [x] Verify keyboard navigation, visible focus, Escape / focus restoration, semantic labels, 44px targets, and text resizing.
- [x] Verify Reduced Motion preserves all meaningful content.
- [x] Add and test intentional route metadata and safe crawl policy.
- [x] Measure large media, overflow, layout shift symptoms, and avoidable loading issues.

Exit: no P0/P1 responsive or accessibility defect remains; metadata and crawl behavior are explicit and safe.

### A5 - QA and regression closure

- [x] Run the complete command gate together after fixes.
- [x] Review representative core routes visually at all six viewports.
- [x] Confirm zero critical console errors, clipping, overlap, and horizontal overflow.
- [x] Re-run claim, secret, demo-integrity, and configuration-state checks.
- [x] Record remaining P0, P1, P2, and production blockers.

Exit: P0 = 0 and P1 = 0, with fresh evidence from the final checkout.

### A6 - Handoff and checkpoint

- [x] Update `AI_CHANGELOG.md` with every Phase A change and exact verification evidence.
- [x] Create `UI_HANDOFF.md` describing stable architecture, route tasks, visual locks, demo boundaries, remaining production inputs, and permitted Phase B surfaces.
- [x] Remove task-local temporary extraction artifacts.
- [x] Review the final diff and exclude unrelated user changes and secrets.
- [x] Create a recoverable Phase A Git checkpoint on `codex/phase-a-engineering`.

Exit: the repository can be handed to a visual implementation phase without ambiguity. Completion wording from the manual is withheld until every exit above is satisfied.

## Priority queue

| Priority | Work | Done criterion |
| --- | --- | --- |
| Blocker | Fresh full command baseline | All five command families run against the current checkout; failures classified |
| Blocker | Working-tree ownership | Phase A changes and unrelated user changes are separable |
| High | Main-route and inquiry QA | All primary tasks work or expose an intentional unavailable state |
| High | Responsive and accessibility closure | P0 = 0 and P1 = 0 at six acceptance viewports |
| High | Metadata and crawl policy | Route metadata is intentional; no false production URL is emitted |
| Medium | Performance review | Largest assets and material loading risks measured and recorded |
| Medium | Documentation reconciliation | Current root documents point to authoritative focused evidence |
| Low | Future production integrations | Deferred with explicit required inputs and owners |

## Verification discipline

- A previous passing run is not a final passing run.
- A visual screenshot is not proof of interaction correctness.
- A disabled integration is acceptable only when its state and recovery path are visible.
- Every code fix receives the smallest relevant regression test.
- The final checkpoint is created only after reviewing staged file ownership.
