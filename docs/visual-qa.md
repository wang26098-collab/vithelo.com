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

---

## VITHELO inquiry-first acceptance — 2026-08-22

This review supersedes the brand-shell and Home findings above for the VITHELO inquiry-first revision. Home, Contact, Professional, Nutrition PDP, and Device PDP were captured as full-page screenshots at 1440, 1024, 768, 390, and 375 pixels. The 25 light-appearance artifacts and representative 1440/390 dark-appearance artifacts are stored under the ignored `test-results/responsive-core-routes-*` directories.

Screenshots used normal motion behavior and waited one second for image and reveal settling. Freezing animations at their initial frame incorrectly preserves the Home membrane cover and is not valid visual evidence.

| Requirement | 1440 | 1024 | 768 | 390 | 375 |
| --- | --- | --- | --- | --- | --- |
| Home hero copy, actions, and product visual | PASS | PASS | PASS | PASS | PASS |
| Contact intent selection and inquiry access | PASS | PASS | PASS | PASS | PASS |
| Professional hierarchy and capability path | PASS | PASS | PASS | PASS | PASS |
| Nutrition commerce, context, and visible Safety | PASS | PASS | PASS | PASS | PASS |
| Device commerce, engineering, and visible Safety | PASS | PASS | PASS | PASS | PASS |
| No clipping, overlap, or horizontal overflow | PASS | PASS | PASS | PASS | PASS |

Additional acceptance results:

- Desktop navigation remains one line and below 80 pixels. The VITHELO V monogram and wordmark are both present.
- Nutrition and Aesthetic Technology share one Ivory, Graphite, Titanium, and Optical system while remaining distinct through human-use and engineered-object media.
- No three consecutive zigzag sections or repeated equal-card grid controls the page rhythm.
- The global mobile inquiry bar pauses under the menu and is omitted on PDP routes where the page-local commerce resource has priority.
- Page-local PDP resources remain pinned while relevant and exit before Safety at 768, 390, and 375 pixels.
- No invented email address or WhatsApp number is rendered. Both channels remain disabled and visibly marked `NOT_CONFIGURED` through their configuration messages.
- Representative 1440 and 390 dark captures preserve hierarchy, image fidelity, borders, focus contrast, and readable status text.
- Reduced Motion E2E keeps the Home proposition, product facts, and actions visible without relying on animation.

### Findings fixed in this revision

1. **VITHELO-P1-001 — competing mobile sticky resources on PDPs.** The global inquiry bar and PDP commerce resource occupied the same viewport edge. `src/components/core/mobile-inquiry-bar.tsx` now yields to the PDP-local resource. The focused 1440/390 rerun and all 768/390/375 sticky geometry checks pass.
2. **VITHELO-P1-002 — brand shell lacked the approved V monogram.** `src/components/core/brand-mark.tsx` now includes the scalable geometric V alongside the wordmark. Navigation remains within the width and height gates at every acceptance viewport.
3. **VITHELO-P1-003 — global inquiry actions did not follow the mobile lifecycle contract.** The bar is now fixed only after the Home hero exits, pauses for drawers and editable controls, yields entirely to Contact and PDP-local resources, and reserves page-end space where it is active.
4. **VITHELO-P1-004 — contextual inquiry links lost their route context.** Validated `world`, `subject`, and `path` values now initialize the local Contact intake without transmitting data or accepting arbitrary workflow state.
5. **VITHELO-P1-005 — visible brand and evidence boundaries were incomplete.** The supplied signature is rendered in the shell, unavailable channels visibly carry `NOT_CONFIGURED`, and Home keeps source, scope, supported-statement boundary, and limitation together.

Final automated acceptance after these fixes: lint passed, typecheck passed, 46 unit tests passed, 99 E2E tests passed with 3 expected desktop skips, and the production build passed. The focused mobile inquiry and responsive rerun added 6 passing checks after Contact was made page-local.

Final VITHELO visual gate: **PASS — P0 = 0, P1 = 0.**

---

## VITHELO B2B public site acceptance — 2026-08-28

This review covers the approved inquiry-first public structure: Home, Products, OEM / ODM, Insights, three article routes and Contact. The frozen HTML preview remained a reference artifact and was not edited.

| Route | Viewport | Result | Screenshot evidence |
| --- | --- | --- | --- |
| `/` | 1440 × 1000 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-desktop-1440/home-final.png` |
| `/` | 1024 × 768 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-tablet-1024/home-final.png` |
| `/` | 390 × 844 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-mobile-390/home-final.png` |
| `/products` | 1440 × 1000 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-desktop-1440/products-final.png` |
| `/products` | 390 × 844 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-mobile-390/products-final.png` |
| `/contact` | 1440 × 1000 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-desktop-1440/contact-final.png` |
| `/contact` | 390 × 844 | PASS | `test-results/responsive-core-routes-do-not-overflow-the-viewport-mobile-390/contact-final.png` |

Acceptance notes:

- The shared header, compact hero scale and first-viewport density remain editorial and restrained.
- Home retains exactly eleven sections. The eight product formats remain one section, with no horizontal slider or eight screen-height panels.
- Products uses a continuous comparison ledger instead of a rounded-card wall. The ledger becomes a readable vertical sequence at mobile widths.
- No scroll-jacking, elevated card wall, clipping, overlap or horizontal overflow was observed at the six automated viewports.
- Free stock imagery is labelled as product-form illustration and is not presented as factory evidence.
- Contact remains visibly `NOT_CONFIGURED`; all eight fields and the submission control are disabled, and no email or WhatsApp target is invented.
- Final B2B gate: **PASS — P0 = 0, P1 = 0.**
