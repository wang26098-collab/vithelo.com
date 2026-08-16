# Visual QA Report

Date: 2026-08-16  
Reviewer: independent Task 11 visual review  
Specification: approved V6.1 design specification  
Status: PASS after two focused P1 fixes

## Scope and method

The review started from rendered output, not source. Exactly seven core routes were captured as full-page screenshots at 1440, 1024, 768, 390, and 375 pixels wide. All 35 formal artifacts are stored in the ignored `test-results/visual-qa/` directory and use this naming scheme:

| Route | Artifact prefix |
| --- | --- |
| `/` | `home-{width}.png` |
| `/nutrition` | `nutrition-{width}.png` |
| `/aesthetic-technology` | `aesthetic-{width}.png` |
| `/nutrition/demo-daily-formula` | `nutrition-pdp-{width}.png` |
| `/aesthetic-technology/demo-precision-device` | `device-pdp-{width}.png` |
| `/science` | `science-{width}.png` |
| `/professional` | `professional-{width}.png` |

Widths reviewed for every prefix: `1440`, `1024`, `768`, `390`, `375`.

Every formal screenshot was inspected visually. The final sweep used normal motion behavior and waited for page and image settling. This avoided false negatives from forcing CSS animation completion. The sweep also checked rendered document width and browser errors across all 35 route and viewport combinations. Result: no horizontal overflow and no application console errors.

The local Seed mirror at `D:/Winhttrack web/yingyang/seed.com/index.html` was viewed only as a structural-quality reference. Comparison was limited to hierarchy, commerce clarity, visual pacing, media confidence, and trust placement. No Seed identity, layout, styling, code, or channel color system was copied.

## Locked V6.1 checklist

| Requirement | Result | Rendered evidence |
| --- | --- | --- |
| Logo-off recognition | PASS | The cold ivory field, graphite type, titanium materiality, optical violet trace, editorial Nutrition serif, and precision Device sans remain recognizable without relying on the wordmark. |
| Home, Nutrition, and Aesthetic differentiation | PASS | Home is an orientation and membrane experience; Nutrition is human routine and formulation; Aesthetic is object, system, engineering, and interface. The distinction survives all five widths. |
| No repeated left-copy/right-image/three-card template | PASS | Split heroes are used selectively, while subsequent composition changes among membrane, record rows, editorial statements, paired media, evidence disclosure, and business process. No universal three-card rhythm is present. |
| Commerce-first PDP | PASS | Both PDPs lead with product identity, commerce state, disabled action with reason, and key decision facts. Brand abstraction does not displace commerce. |
| Visible Safety | PASS | Nutrition has `Quality and safety`; Device has `Safety`. Both remain explicit, substantial, and readable at every width. |
| Science and Professional differentiation | PASS | Science is evidence-led reading, search, boundaries, libraries, and disclosure. Professional is capability, process, proof, and project-intake intent. |
| Restrained Membrane, Card, and shadow use | PASS | Membrane imagery is concentrated, records are mostly hairline-separated, cards are not used as a default container, and shadows are essentially absent. |
| No green Nutrition or blue Device channel theme | PASS | Both channels share neutral brand primitives. Nutrition uses human warmth and editorial type; Device uses titanium, graphite, and optical violet without a blue wash. |
| Stable Mobile Sticky | PASS after fix | At 768, 390, and 375, the P1 commerce resource enters after primary commerce, remains pinned to the viewport bottom, pauses under the Drawer, and exits exactly before `#safety`. |
| No clipping or overlap | PASS after fix | All 35 final pages have `scrollWidth <= clientWidth`. Search status copy, headings, media, actions, and Safety are fully visible. No product UI overlaps were found. |

## Findings and fixes

### FINDING-001 - Science search status clipped on narrow viewports

- Severity: P1
- Route: `/science`
- Viewports: 768, 390, 375
- Requirement: no clipping or overlap
- Observed: the disabled search input and button remained in one row, truncating `Search not configured`.
- Before evidence: `finding-001-before.png`, reproducing the reviewed baseline row layout at 375.
- Changed file: `src/components/patterns/science-page.tsx`
- Fix: stack the input and action below the desktop breakpoint.
- Passing recheck: `science-768-after.png`, `science-390-after.png`, `science-375-after.png`, plus the final formal `science-{width}.png` set.
- Result: PASS. Full status copy is visible and the document has no horizontal overflow.

### FINDING-002 - Mobile commerce resource did not remain sticky

- Severity: P1
- Routes: both demo PDPs
- Viewports: 768, 390, 375
- Requirements: stable Mobile Sticky; visible Safety; no overlap
- Observed: the resource used `sticky bottom-0` inside a wrapper only as tall as itself. It scrolled away as ordinary content instead of remaining reachable after primary commerce left the viewport.
- Before evidence: `sticky-nutrition-390-mid.png`, `sticky-device-375-mid.png`; rendered boxes were well above the viewport bottom at the active review scroll positions.
- Changed files: `src/components/core/sticky-resource.tsx`, both PDP patterns, and the focused responsive regression.
- Fix: use a viewport-height top inset matched to the two rendered sticky heights, remove the trapping wrapper, and retain the existing parent boundary that ends immediately before Safety.
- Active after evidence: `sticky-nutrition-after.png`, `sticky-device-after.png`, `sticky-nutrition-768-after.png`.
- Safety after evidence: `sticky-nutrition-safety-after.png`, `sticky-device-safety-after.png`.
- Dialog recheck: the resource reports `data-paused="true"`, `aria-hidden="true"`, and computed opacity `0` while the Drawer is open.
- Geometry recheck: active sticky bottoms equal viewport bottoms; at Safety, sticky bottom is less than or equal to Safety top for both PDPs and all tested mobile widths.
- Result: PASS.

## Design quality notes

- AI-slop risk: low. The pages avoid generic gradients, excessive pills, equal-card grids, decorative dashboards, and repeated marketing boilerplate.
- Contrast: no visual low-contrast blocker was observed. Muted supporting copy remains readable against ivory and light surface fields. Disabled controls are clearly differentiated without losing their status explanation.
- Typographic hierarchy: strong. Large sans display type establishes system statements, the Nutrition serif adds an editorial human register, and metadata stays subordinate. Mobile line breaks remain intentional after the fixes.
- P2 polish note: demo-status language and hairline record rows recur frequently because verified content is intentionally unavailable. This creates some long-page visual sameness, but it is an honest boundary rather than decorative filler and is not a P0/P1 defect.
- Development capture note: the small circular `N` visible in some mobile evidence is the Next.js development indicator, not shipped product UI.

## Health summary

| Measure | Final |
| --- | --- |
| Visual score | 9.1 / 10 |
| P0 defects | 0 |
| P1 defects | 0 after recheck |
| Checklist | 10 / 10 PASS |
| Formal screenshots inspected | 35 / 35 |
| Horizontal overflow | 0 / 35 |
| Application console errors | 0 / 35 |
| Remaining visual blockers | None |

The final prototype meets the V6.1 completion gate of P0 = 0 and P1 = 0.

## Verification

- Unit: 10 files, 35 tests passed.
- Lint: passed.
- Typecheck: passed.
- Focused responsive E2E: 9 passed, 3 desktop skips. The new sticky-position regression passed at 768, 390, and 375.
- Full E2E: 74 passed, 3 expected desktop skips, and one transient desktop Professional test failed when the concurrent Next.js development server returned `Unexpected end of JSON input`. The same Professional test passed on an immediate isolated rerun in 793 ms. No visual-review route or sticky regression failed.
- Production build: passed; 14 static pages generated.
