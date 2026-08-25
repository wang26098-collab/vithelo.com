# VITHELO Preview-to-Next Homepage Design

Date: 2026-08-25  
Status: Approved technical direction, awaiting implementation plan

## Goal

Convert `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html` into the production Next.js `/` route without redesigning the approved eleven-section homepage or changing unrelated routes.

## Scope

### Included

- Replace the current `/` composition with the approved VITHELO B2B homepage.
- Preserve the existing visual hierarchy, English copy, section order, colors, spacing, four-by-two dosage spectrum, and bounded market-stage wheel interaction.
- Preserve the independent HTML file as the visual reference.
- Keep all existing non-home routes operational and visually unchanged.
- Keep Email, WhatsApp, and inquiry submission visibly `NOT_CONFIGURED` until approved providers and contact values exist.

### Excluded

- No new visual direction or copy rewrite.
- No CMS, CRM, email, WhatsApp, form submission, analytics, payment, search, identity, or deployment integration.
- No changes to product detail, landing, science, professional, account, cart, checkout, support, or utility-route content.
- No replacement of placeholder media with generated images.

## Architecture

### Route composition

`src/app/page.tsx` remains a server route. It supplies validated homepage content to a new B2B homepage pattern instead of rendering the existing `HomePagePattern`.

The new pattern is divided by responsibility:

- `src/components/patterns/vithelo-b2b-home.tsx` — semantic eleven-section composition.
- `src/components/patterns/vithelo-market-stage.tsx` — the only client component; owns story state, pointer-zone wheel behavior, keyboard controls, Reduced Motion, and mobile fallback.
- `src/components/patterns/vithelo-b2b-home.module.css` — styles scoped to this homepage.
- `src/content/demo/vithelo-b2b-home.ts` — validated homepage copy, formats, MOQ states, steps, channels, and explicit configuration states.
- `src/content/schema.ts` — only the minimum new Zod contracts needed to validate that record.

### Site chrome

The approved homepage contains its own Header and Footer. The existing global `DemoDisclosure`, `SiteHeader`, and `MobileInquiryBar` must not cover or duplicate the `/` composition.

A route-aware shell component will hide those three global elements only on `/`. It will render the current shell unchanged on every other route. The route-aware component is the minimum client boundary required by the App Router; it will not own page content.

## Eleven-section contract

The production homepage retains this exact order:

1. Hero
2. Proof Strip
3. Gummy Spotlight
4. Market-Ready Solutions
5. Dosage Form Spectrum
6. Custom Development
7. Manufacturing Proof
8. Quality & Compliance
9. Six-Step Project Runway
10. Built for Your Channel
11. Start a Project and Footer

The dosage spectrum occupies one desktop viewport and shows all eight formats in a four-by-two layout. It has no horizontal scrollbar or one-format-per-screen behavior.

## Market-stage interaction

- Six stories share one desktop stage.
- A wheel gesture in the central 76% advances one story.
- Left and right 12% gutters preserve native page scrolling.
- First-story upward and final-story downward gestures release page scrolling.
- One transition must finish before another story can advance.
- Previous and Next controls remain keyboard operable.
- Escape releases focus.
- Reduced Motion removes transition locking.
- Mobile renders all six stories in native vertical document order and never captures touch scrolling.

The pointer-zone decision must remain a pure tested helper, reused from or equivalent to `vithelo-homepage-work/market-stage-logic.mjs`.

## Content and claims

- User-supplied MOQ references remain qualified by `Flexible MOQ based on formula and packaging` and `Contact us for MOQ` where applicable.
- Capacities marked `verify before launch` remain visibly qualified until verified production records are approved.
- Missing Email, WhatsApp, and inquiry providers remain `NOT_CONFIGURED` in data and rendered output.
- Placeholder media names include the required asset type and dimensions; no image generation is used.

## Accessibility and responsive behavior

- Semantic landmarks and heading order are required.
- Interactive controls provide visible focus and minimum 44px targets.
- Hidden desktop market stories are correctly removed from the accessibility tree.
- Mobile preserves natural reading order and no horizontal overflow.
- All meaningful text remains available when JavaScript or motion is unavailable.

## Verification

Implementation is accepted when:

- `/` contains the eleven sections in approved order.
- The visible homepage contains no Chinese copy.
- The dosage section renders eight formats as desktop 4×2 in one viewport and has no horizontal scroll.
- Desktop center/gutter/first/last wheel boundaries behave as specified.
- Mobile displays all six stories naturally and has no horizontal overflow.
- The global shell is absent only on `/` and remains present on representative non-home routes.
- `NOT_CONFIGURED` contact and form states remain explicit.
- The independent HTML reference is unchanged.
- Unit tests, typecheck, lint, production build, and applicable browser checks pass.

## Self-review

- Placeholder scan: production contact providers intentionally remain `NOT_CONFIGURED`; no unresolved implementation placeholder remains.
- Consistency: the route is server-rendered except for the bounded market-stage and route-aware shell client boundaries.
- Scope: only the homepage, its validated content, its scoped styles, and the minimum shell routing condition change.
- Ambiguity: section order, desktop dosage layout, wheel zones, exit conditions, mobile fallback, global-shell behavior, and non-goals are explicit.
