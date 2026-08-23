# VITHELO Nutrition-Led Brand Website Redesign

**Date:** 2026-08-23  
**Status:** User-approved design  
**Authority:** This specification supersedes the equal-weight Nutrition / Aesthetic Technology homepage and primary-navigation priorities in the earlier site specification. It does not remove Aesthetic Technology from the master brand.

## 1. Objective

Reposition VITHELO as a premium, science-led nutrition brand whose first public impression is product-led and consumer-legible, while preserving a clear B2B conversion path through Email and WhatsApp.

Nutrition owns approximately 90% of the public brand experience. Sleep Health and Women's Health are the first launch priorities. Aesthetic Technology remains a secondary professional capability and is removed from the primary navigation.

## 2. Approved Decisions

- One master brand remains in place.
- Nutrition is the dominant public product world.
- Sleep Health and Women's Health are the first memorable product directions.
- The homepage must feel like a premium nutrition brand before it feels like a manufacturing or OEM platform.
- Consumer-facing pages explain products, use, safety, and science. They do not provide online checkout in this release.
- B2B conversion uses Email and WhatsApp.
- Aesthetic Technology remains available inside Professional Partnership / Capabilities, not in the primary navigation.
- Existing partial product and packaging assets are used where approved.
- Missing efficacy, formula, dosage, certification, pricing, and policy inputs remain `NOT_CONFIGURED` or visibly `DEMO_ONLY`.
- The six approved static UI renders are the visual authority for the homepage's first six screens.
- The implementation must reproduce the approved static composition, hierarchy, spacing, typography, material treatment, and product emphasis before adding motion.

## 3. Reference Boundary

The local Seed mirror is a structural and interaction-quality reference only.

Allowed reference mechanisms:

- immersive product-first sequencing;
- full-viewport product photography;
- product-card focus on hover;
- sticky scientific explanation stages;
- sticky editorial copy paired with changing media;
- clear movement from product discovery to science and education.

Not allowed:

- Seed branding, logo, copy, code, green microbiome styling, product naming, claims, layout tracing, or proprietary product logic;
- using visual similarity to imply equivalent evidence or efficacy;
- replacing VITHELO's cold Ivory, Graphite, Titanium, Optical light, and Human Mauve material language with Seed's palette.

## 4. Brand Reading and Design Dials

**Design reading:** A premium nutrition brand for human health rhythms, combining Swiss precision, tangible product material, and calm human presence. The C-end first understands the product; the B-end then discovers professional partnership.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 5`
- Governing formula: `HUMAN × MATERIAL × PRECISION`
- Motion formula: `SCALE × REVEAL × RESPONSE`
- Page theme: light
- Corner system: square to 4px for interface components; up to 20px only for approved cinematic media or scientific-stage containers

## 5. Information Architecture

### 5.1 Primary navigation

1. Products
2. Science
3. Health Knowledge
4. Professional Partnership

The header follows the spacing, scale, and one-line geometry of the approved static renders. Semantic labels follow this information architecture even when exploratory render text differs.

### 5.2 Route hierarchy

- `/`
  - nutrition-led homepage
- `/nutrition`
  - all nutrition products
  - Sleep Health
  - Women's Health
- `/nutrition/[slug]`
  - product detail
- `/science`
  - scientific approach
  - formula and material records
  - evidence boundary
  - safety information
- `/learn`
  - Sleep Health
  - Women's Health
  - use guides
  - article detail
- `/professional`
  - nutrition partnership
  - product development and support capabilities
  - secondary Aesthetic Technology capability
  - Email inquiry
  - WhatsApp inquiry
- `/support`
  - FAQ
  - product information
  - contact and policy recovery routes

The existing `/aesthetic-technology` route may remain reachable for continuity, but it is removed from the primary navigation and must not compete with Nutrition on the homepage.

## 6. Approved Homepage Sequence

The first six screens must be implemented in this order. The capsule stage and gummy stage are separate screens.

### Screen 1: Full-Viewport Product Hero

**Static authority:** Approved render with the VITHELO wordmark, one-line navigation, monumental neo-grotesk headline, adult human presence, and two large VITHELO supplement bottles in a real interior.

- Fill the visible first viewport with one integrated product photograph or video frame.
- Do not use a left-copy / right-image split container.
- Navigation and copy overlay the image.
- Product bottles dominate the lower-right and remain legible at all acceptance viewports.
- Sleep Health and Women's Health appear as the first product contexts.
- Keep the headline to two visual statements and the primary CTA visible without scrolling.
- Primary CTA: explore nutrition products.
- Secondary route: professional partnership, visually restrained.
- Motion declaration: `ORIENT`.
- Motion: subtle media push-in and text reveal only.

### Screen 2: Brand Manifesto Transition

**Static authority:** Approved cold-Ivory render with a monumental left-aligned headline, restrained optical material, and two underlined health-category paths.

- Use the approved headline: `Nutrition for the rhythms that shape a life.`
- Present Sleep Health and Women's Health as two clear category paths.
- Avoid product cards, icon grids, or supporting-content clutter.
- Maintain generous cold-Ivory negative space and the same header geometry as Screen 1.
- Motion declaration: `RELATE`.
- Motion: headline and category links reveal in sequence as the section enters.

### Screen 3: Interactive Product Focus

**Static authority:** Approved three-product render with the center Women's Health card enlarged, its bottle raised, and the adjacent Sleep Health and Daily Essential cards narrowed.

- The section title is `Find your daily formula.`
- Desktop uses one continuous product row.
- The active or hovered card expands to approximately `1.35–1.45×` its resting width.
- Adjacent cards contract without becoming unreadable.
- The focused product image moves slightly upward and may scale within safe bounds.
- Keyboard focus must produce the same meaningful state as pointer hover.
- Product facts remain available without hover.
- Mobile removes hover dependence and uses horizontal snap scrolling with the centered card as the active focus.
- Do not show prices, checkout, subscriptions, or unsupported claims.
- Motion declaration: `FOCUS`.
- Motion: width interpolation, product lift, and restrained content reveal.

### Screen 4: Capsule Scientific Mechanism

**Static authority:** Approved light scientific-stage render with a large split capsule, frosted information container, technical connector lines, and the labels `FORM`, `MATERIAL`, `USE`, and `SAFETY`.

- This screen must remain in the final implementation.
- Use a light page theme with the dark capsule contained inside the visual stage.
- Desktop section length is approximately `180–200vh` with a pinned visual stage.
- Scroll progress moves through capsule form, material, use, and safety states.
- Facts change only when corresponding validated records exist.
- Use `VERIFIED INFORMATION ONLY` as a governance principle, not as a certification claim.
- Do not use decorative molecular graphics or invented technical data.
- Reduced Motion presents the same states as a static vertical sequence.
- Motion declaration: `EXPLAIN`.

### Screen 5: Gummy Scientific Mechanism

**Static authority:** Approved light scientific-stage render with one large transparent red bear gummy, a macro material inset, technical connector lines, and the labels `FORM`, `MATERIAL`, `USE`, and `SAFETY`.

- This is an additional screen. It does not replace or merge with the capsule screen.
- The product object is a transparent ruby-red bear-shaped gummy.
- Red exists in the gummy material only; it does not become the site's interface accent.
- Desktop section length is approximately `180–200vh` with an independent pinned stage.
- Scroll states explain form, material, use, and safety using approved inputs.
- The gummy remains premium and material-led, never childish or candy-like.
- Reduced Motion presents a static vertical sequence.
- Motion declaration: `EXPLAIN`.

### Screen 6: Human Health Rhythms

**Static authority:** Approved editorial split render with monumental left copy, an adult woman in a natural quiet moment on the right, a restrained video control, and Sleep Health / Women's Health paths.

- Use the approved headline: `Your health moves with your rhythms.`
- Left-side copy remains readable while the right media changes or advances.
- Human imagery must feel candid and intelligent, not like generic wellness stock photography.
- Media may transition between sleep and women's-health contexts.
- Avoid unverifiable health promises in supporting copy.
- Reduced Motion uses one static approved image or a user-controlled carousel.
- Motion declaration: `RELATE`.

### After Screen 6

The remaining homepage content supports conversion without diluting the six-screen brand sequence:

1. responsible science and evidence boundary;
2. Health Knowledge entry points;
3. Professional Partnership section;
4. Email and WhatsApp inquiry actions;
5. support and policy footer.

## 7. Visual System

### 7.1 Palette

- Cold Ivory: page background and principal negative space
- Graphite: text, principal product, and primary button
- Titanium: technical material and scientific-stage accents
- Human Mauve: restrained human / Women's Health image tone
- Translucent Ruby Red: gummy product material only

Nutrition must not become a green channel. Aesthetic Technology must not become a blue channel. Red must not become a global UI accent.

### 7.2 Typography

- Use one precise neo-grotesk sans-serif family across display and body roles.
- Do not use the current editorial serif for homepage display headlines.
- Display headlines use tight letter spacing and compact line height.
- Body copy stays neutral, readable, and concise.
- VITHELO wordmark geometry remains unchanged.

### 7.3 Photography and Render Language

Three media families are required:

1. product in a real human environment;
2. candid adult human moments connected to daily rhythms;
3. macro product-form material and scientific visualization.

Do not use generic beige-spa imagery, influencer wellness poses, doctors, decorative molecule fields, or fake laboratory evidence.

## 8. Inquiry and Conversion

- The homepage's principal visible task is product discovery.
- Professional Partnership remains visible in the primary navigation.
- A dedicated partnership section appears after the six-screen narrative.
- Email and WhatsApp are the two approved inquiry channels.
- Inquiry actions remain `NOT_CONFIGURED` until real contact destinations are approved.
- The website must not submit inquiry data to a CMS, CRM, messaging provider, or external endpoint without a separately approved provider decision.
- Product pages do not show online payment, cart, or subscription UI in this release.

## 9. Content and Data Boundaries

Content must continue to enter through validated schema records and provider-neutral adapters.

Required product presentation data includes:

- product identity and approved packaging media;
- product world and health category;
- product form, including capsule or gummy;
- approved use context;
- safety record;
- formula and material relationships;
- evidence source, scope, supported-statement boundary, and limitation;
- explicit `DEMO_ONLY` or `NOT_CONFIGURED` status where applicable.

No route or page-pattern component may contain invented product facts.

## 10. Responsive Behavior

### Desktop

- preserve six full visual beats;
- use product-card hover / focus expansion;
- pin the capsule and gummy scientific stages;
- pin copy or media appropriately in Screen 6.

### Tablet

- reduce pinned distance and object scale;
- preserve the order and meaning of all states;
- prevent product cards from shrinking below readable widths.

### Mobile

- keep Screen 1 product-led and full-viewport without obscuring the products;
- convert Screen 3 to horizontal snap scrolling;
- convert Screens 4 and 5 to sequential vertical states rather than long pinned scenes;
- convert Screen 6 to copy followed by user-controlled media;
- keep Email and WhatsApp targets at least 44px;
- maintain access to all Safety and evidence-boundary information.

## 11. Accessibility and Motion

- All pointer-only states require keyboard equivalents.
- Hover expansion cannot be the sole location of facts or actions.
- Visible focus must remain clear against photographic and Ivory surfaces.
- Every meaningful animation must declare `ORIENT`, `RELATE`, `EXPLAIN`, `FOCUS`, or `CONFIRM`.
- No scroll-jacking is allowed.
- Reduced Motion is a completion requirement.
- Motion may not hide facts, safety, or recovery actions.
- Video requires user controls and a non-video fallback.
- Text and control contrast must meet WCAG AA.

## 12. States and Recovery

Where relevant, the implementation covers:

- loading;
- loaded;
- media failure;
- empty product set;
- missing approved product media;
- `DEMO_ONLY`;
- `NOT_CONFIGURED`;
- disabled inquiry channel;
- reduced-motion fallback.

Media failure must preserve page meaning and provide a static fallback without collapsing the section.

## 13. Performance Constraints

- Screen 1 media is the LCP priority and must be art-directed for desktop and mobile.
- Non-hero product, capsule, gummy, and human media load progressively.
- Motion libraries must remain isolated to client-leaf components.
- Avoid main-thread scroll listeners; use supported scroll progress primitives, Intersection Observer, or a justified timeline implementation.
- Target LCP under 2.5 seconds, INP under 200ms, and CLS under 0.1 on representative production infrastructure.
- Reserve intrinsic media dimensions to prevent layout shift.

## 14. Scope

### Must Have

- approved six-screen order and static visual composition;
- full-viewport product hero;
- product-card hover / keyboard-focus expansion;
- retained capsule Sticky stage;
- additional gummy Sticky stage;
- Screen 6 media transition;
- nutrition-led navigation and hierarchy;
- Email and WhatsApp partnership path;
- Reduced Motion and mobile alternatives;
- explicit content-status governance.

### Should Have

- polished transition from Screen 6 into science, knowledge, and partnership content;
- responsive product image art direction;
- authored loading and media-error fallbacks.

### Could Have

- user-controlled product-form comparison after the six-screen sequence;
- richer editorial media once approved assets exist.

### Won't Have in This Release

- checkout, subscription, or payment;
- live CRM or CMS integration;
- invented claims, dosage, certification, pricing, warranty, MOQ, or lead time;
- Aesthetic Technology as a homepage co-primary product world;
- Seed branding, code, copy, or green visual identity.

## 15. Acceptance Criteria

The redesign is acceptable only when:

- visual review confirms close adherence to all six approved static renders;
- Screen 4 capsule and Screen 5 gummy remain separate;
- the product-card focus interaction is visible and usable by pointer and keyboard;
- Sticky stages communicate a real sequence without scroll-jacking;
- Reduced Motion provides complete static equivalents;
- all critical content and Safety remain available at mobile widths;
- Email and WhatsApp actions expose correct configured / unconfigured states;
- no unsupported product or health claim appears;
- no unresolved P0 or P1 defect, clipping, overlap, horizontal overflow, or focus loss remains at the six acceptance viewports;
- lint, typecheck, unit tests, E2E tests, and production build pass.

## 16. Implementation Boundary

This document approves the design only. No production implementation begins until the user reviews this written specification and approves transition to an implementation plan.
