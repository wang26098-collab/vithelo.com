# VITHELO Editorial Typography and Copy Design

**Date:** 2026-08-26
**Status:** Approved direction, pending written-spec review
**Scope:** Homepage typography and English copy only

## Objective

Bring the VITHELO homepage closer to Seed's restrained editorial hierarchy without copying Seed's brand, layout, code, or product language. The homepage must read as an international B2B nutrition manufacturing site, not as a site limited to one national market.

## Scope locks

- Keep the approved eleven-section order, layouts, navigation, interactions, metrics, MOQ values, asset requirements, and contact configuration states.
- Do not change the frozen standalone HTML preview.
- Do not add claims, certifications, contact details, images, routes, integrations, or new features.
- Remove direct geographic targeting such as `U.S.`, `USA`, `American`, `America`, and `United States` from visible homepage content.
- Geographic breadth may be communicated only through already approved facts such as `50+ countries and markets`.

## Typography system

Seed's local reference uses a 48px desktop hero title, 16px supporting copy, approximately 1.1 title line height, and a supporting-copy measure near 426px. VITHELO will adopt that hierarchy while retaining its own colors, typeface, layout, and B2B content.

### Desktop

- Hero title: `clamp(40px, 4vw, 48px)`, line-height `1.08`, maximum measure about `620px`.
- Hero supporting copy: `16px`, line-height `1.4`, maximum measure `460px`.
- Primary section titles: `clamp(40px, 4.6vw, 64px)`, line-height `0.98-1.04`.
- Market-story titles: maximum `56px`.
- Body copy: `16-20px` according to hierarchy, never enlarged to behave as a second headline.

### Mobile

- Hero title: `clamp(36px, 10vw, 44px)`.
- Primary section titles: `clamp(36px, 10vw, 52px)`.
- Supporting copy: `16px` with natural wrapping.
- No manually forced headline line breaks. Text wraps according to available width.

## Voice rules

- Restrained, professional, international, and specific.
- Prefer concrete nouns and verbs: formula, sample, pack, batch, line, release, delivery.
- Use short sentences and one idea per section.
- Avoid inflated phrases such as leading, innovative, empowering, world-class, cutting-edge, seamless, comprehensive, market-leading, and growth solution.
- Avoid formulaic contrast, forced rules of three, em dashes, excessive hyphenation, and vague promises.
- State capability directly. Do not turn unverified information into proof.

## Approved homepage copy

### 01 Hero

- Eyebrow: `GUMMY-FIRST NUTRITION OEM / ODM`
- Title: `Your nutrition product, from first brief to finished batch.`
- Supporting copy: `VITHELO develops and manufactures gummies and seven other oral formats, with formula, sampling, packaging and production managed in one system.`
- Primary CTA: `Start a Project`
- Secondary CTA: `Explore Formats`

### 02 Proof

- `Manufacturing since`
- `Clients served`
- `Countries and markets`
- `Custom gummy projects from`

Approved figures and qualifiers remain unchanged.

### 03 Gummy expertise

- Kicker: `03 · Gummy Expertise`
- Title: `Gummies give your brand room to be distinctive.`
- Formula Direction: `Ingredients, serving and audience considered together`
- Shape System: `Standard molds or a custom shape`
- Taste & Texture: `Pectin or gelatin, balanced for the formula`
- Color & Flavor: `A recognizable expression for your brand`
- Packaging Fit: `Bottles, pouches and practical pack sizes`
- MOQ: `Custom projects from 500 bottles`

### 04 Product directions

- Kicker: `04 · Product Directions`
- Title: `Products shaped around real consumer routines.`
- Women's Wellness: `Daily nutrition, life-stage support and beauty routines, developed around a clear use case.`
- Sleep, Stress & Mood: `Gummies, capsules and powders designed for evening routines and everyday support.`
- Beauty From Within: `Collagen, antioxidants and supporting nutrients in formats made for daily use.`
- Gut & Digestive Health: `Prebiotics, fiber and digestive ingredients matched with practical serving formats.`
- Daily Essentials: `Straightforward vitamin and mineral products for everyday nutrition.`
- Active Nutrition: `Energy, hydration and recovery products in portable formats.`

### 05 Product formats

- Kicker: `05 · Product Formats`
- Title: `One factory. Eight product formats.`
- Qualifier: `Flexible MOQ based on formula and packaging. Contact us for MOQ.`

Format names and approved MOQ values remain unchanged.

### 06 Custom development

- Title: `A formula has to work on paper and on the line.`
- Formula Strategy: `Ingredients, serving size and target use`
- Sensory Design: `Flavor, color, shape and texture`
- Packaging Fit: `Container, label, shelf and transport needs`
- Project Review: `MOQ, timing and manufacturing feasibility`

### 07 Manufacturing

- Title: `Development and production under one manufacturing system.`

The approved media requirement, metrics, verification notes, and demo boundaries remain unchanged.

### 08 Quality

- Title: `Quality recorded at every stage.`
- Record title: `From incoming material to finished-product release`
- Caveat: `Certification scope, testing and export documents depend on current factory records and the requirements of each project.`

Quality rows and states remain unchanged.

### 09 Project runway

- Title: `Six clear steps from brief to delivery.`
- Brief: `Set the format, formula direction, pack and volume.`
- Develop: `Review the formula and production requirements.`
- Sample: `Evaluate the sample and agree on adjustments.`
- Pack: `Confirm packaging specifications and artwork.`
- Make: `Schedule and run the production batch.`
- Deliver: `Inspect, release and coordinate delivery.`

### 10 Channel fit

- Kicker: `10 · Built for Your Channel`
- Title: `Built for brands, sellers and retail teams.`
- Nutrition Brands: `Formula development, format selection and packaging built around your product brief.`
- Cross-Border Sellers: `Practical launch planning, packaging support and coordinated multi-SKU production.`
- Retail & Supermarket: `Stable supply planning, clear specifications and delivery support for larger retail programs.`

### 11 Contact

- Kicker: `11 · Start a Project`
- Title: `Tell us what you want to make.`
- Supporting copy: `Share the format, formula direction, packaging needs and expected volume. Our sales team will review the project and confirm the right production route and MOQ.`

The form remains visibly disabled and contact channels remain `NOT_CONFIGURED` until approved details are supplied.

## Metadata

- Title: `VITHELO | Nutrition OEM ODM Manufacturing Partner`
- Description: `Gummy-first nutrition OEM and ODM manufacturing across gummies, capsules, tablets, powders, liquids, functional gum and oral films.`

## Acceptance criteria

- At 1440px desktop width, the computed hero-title size does not exceed 48px.
- At desktop widths, primary section titles do not exceed 64px and market-story titles do not exceed 56px.
- At mobile widths, primary titles do not exceed 52px.
- The hero title, supporting copy, and both CTAs remain visible inside the compact hero stage.
- Visible homepage content contains no direct United States or American-market wording.
- All approved figures, MOQ values, demo disclosures, missing-configuration states, and eleven section IDs remain unchanged.
- Existing accessibility, responsive, interaction, content-integrity, unit, E2E, and production-build checks continue to pass.

## Non-goals

- No new images or image generation.
- No change to visual colors, section composition, scroll behavior, route architecture, other pages, or Hostinger deployment.
- No Git push or deployment as part of this typography-and-copy change.
