# Acceptance

This is the operating checklist for determining whether the V6.1 demonstration remains complete. The release threshold is P0 = 0 and P1 = 0.

## Severity gate

- P0: a critical task, Safety boundary, factual boundary, or application route is unusable or materially misleading.
- P1: a core journey, viewport, accessibility requirement, commerce decision, or visible composition has a blocking defect.
- P2 and lower: polish or limited-scope issues that do not break the V6.1 core task. Record them, but do not relabel them as P0/P1 to pass the gate.

## Automated gate

Run from the repository root:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Every command must exit with code 0. The E2E command owns port 3100 and starts the configured Next.js test server. If a transient server failure appears, rerun the exact failing test in isolation, inspect server stability, then rerun the full suite. Do not weaken assertions, remove a viewport, or add retries to hide instability.

## Browser matrix

Playwright runs six projects:

| Project | Viewport |
| --- | --- |
| `desktop-1440` | 1440 × 1000 |
| `desktop-1280` | 1280 × 900 |
| `tablet-1024` | 1024 × 768 |
| `tablet-768` | 768 × 1024 |
| `mobile-390` | 390 × 844 |
| `mobile-375` | 375 × 812 |

## Required automated coverage

- Home hydrates without browser errors and exposes the nutrition-led six-screen sequence: Hero, manifesto, product discovery, capsule study, separate gummy study, and human rhythms.
- Navigation exposes Products, Science, Health Knowledge, and Professional Partnership; Aesthetic Technology remains route-reachable but is not primary navigation.
- Both PDPs show identity, missing price, disabled primary action, and Safety.
- Science returns to Support.
- Professional intake changes its first question by business intent.
- Search and Cart preserve task clarity.
- Demo disclosure is visible and rendered pages contain a `DEMO_ONLY`, `NOT_CONFIGURED`, or equivalent missing-state signal.
- Rendered copy contains no `sleep deeper`, `live in balance`, credential/efficacy phrase, `VERIFIED INFORMATION ONLY` for current demo fixtures, or forbidden en/em dash character.
- Keyboard focus is visible; mobile Dialog closes with Escape and restores focus.
- Visible navigation and form controls meet the 44px target.
- Reduced Motion preserves the manifesto, capsule, gummy, product-rail, and human-rhythm facts as static meaningful content.
- Core routes do not overflow at any configured viewport; mobile capsule and gummy stages remain sequential and product discovery retains horizontal snap.
- Mobile `P1` commerce resources pin to the viewport, pause under Dialog, and exit before Safety.

## Documentation and claim checks

```powershell
rg -n "HUMAN × MATERIAL × PRECISION|DEMO_ONLY|Reduced Motion|P0|P1" AGENTS.md docs src
rg -n "FDA|clinically proven|certified|guaranteed|approved device" src/content/demo
```

The first command must find the governing principles in repository guidance and implementation evidence. The second command must return no matches unless the task includes a separately approved, sourced change.

## Visual review

Review all six homepage screens and core routes at 1440, 1280, 1024, 768, 390, and 375px. Confirm:

- recognizable VITHELO nutrition-led material system without relying on unapproved product claims;
- distinct nutrition-primary Home, Nutrition, and professional-secondary Aesthetic Technology compositions;
- no universal left-copy, right-image, three-card template;
- commerce-first PDP first view and visible Safety;
- distinct Science and Professional information rhythms;
- restrained product rail, capsule/gummy material studies, shadow, and motion use;
- no green Nutrition or blue Device channel theme;
- separate capsule and gummy stages, with stable desktop sticky visual bounds and mobile sequential fallback;
- no clipping, overlap, horizontal overflow, or application console error.

The nutrition-led screen checklist and current review status are recorded in [Nutrition home visual QA](visual-qa/vithelo-nutrition-home-redesign.md). Do not declare final P0/P1 clearance until the command gate and six-viewport review have run together.

## Acceptance record

When handing off a change, record exact command exits, unit/E2E pass and skip counts, build route count, claim-scan result, remaining P0/P1 count, and commit hash. Do not claim completion from a partial or stale run.

## Related

- [Page patterns](page-patterns.md)
- [Data governance](data-governance.md)
- [Missing production inputs](missing-production-inputs.md)
