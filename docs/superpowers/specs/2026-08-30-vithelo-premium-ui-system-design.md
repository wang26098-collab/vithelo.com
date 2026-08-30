# VITHELO Premium UI System Upgrade Design

Date: 2026-08-30  
Status: Draft for user approval  
Scope: Design specification only; no frontend implementation in this step

## Real problem

The current VITHELO frontend has the right B2B structure, but it still feels like a demo because too many sections rely on flat color blocks, table-like layouts, and placeholder-style visual treatment instead of a coherent premium brand system.

## Goal

Upgrade the whole site into a restrained, professional, international B2B brand website for nutrition OEM/ODM manufacturing, while preserving the simplified site architecture:

- `/`
- `/products`
- `/oem-odm`
- `/insights`
- `/insights/[slug]`
- `/contact`

The upgrade should make the site feel more like a serious factory-owned overseas brand and export division, not a generic landing-page template.

## Non-goals

- Do not add new pages before the visual system is resolved.
- Do not redesign the business logic, approved route structure, or confirmed English positioning.
- Do not connect real inquiry submission, email, WhatsApp, CRM, CMS, analytics, payment, or search until approved.
- Do not generate AI images.
- Do not copy Seed branding, wording, product claims, layout, code, green microbiome identity, or motion behavior.
- Do not use broad visual rewrites without a section-by-section acceptance pass.

## Must-have principles

### 1. Premium through restraint, not decoration

The visual language should feel quiet, precise, and confident:

- fewer oversized claims
- shorter headings
- lighter copy density
- more negative space
- stronger image atmosphere
- calmer contrast
- controlled motion
- no generic card walls
- no table-like product grids as primary storytelling

### 2. Image-led sections

Key sections should use full-width or near-full-width photographic backgrounds instead of flat color panels.

Allowed image types:

- clean supplement manufacturing environments
- capsules, gummies, tablets, powder, liquid packaging close-ups
- neutral laboratory and production details
- premium lifestyle-adjacent nutrition scenes
- abstract botanical/material textures when they support the section

Image rules:

- Use free licensed stock assets first.
- Store source notes where practical.
- Treat stock images as atmosphere, not proof of VITHELO’s actual factory.
- If a section needs a specific unavailable asset, specify required size, subject, crop, and mood instead of generating an image.
- Avoid fake brand mockups that imply real finished VITHELO SKUs unless explicitly approved.

### 3. Seed-like editorial proportion

Use Seed as a quality reference for proportion and restraint only.

Typography direction:

- Short, quiet headings.
- Main headings should generally feel closer to editorial product copy than corporate brochure headlines.
- Avoid inflated AI phrasing such as “empowering global wellness brands with end-to-end innovative solutions.”
- Prefer concrete, grounded language.
- Body copy should be short enough to scan in one glance.

Suggested scale:

- Hero headline: 44-64px desktop, 34-42px tablet, 30-36px mobile.
- Section headline: 34-48px desktop, 28-36px tablet, 26-32px mobile.
- Subheadline/body intro: 16-19px desktop, 15-17px mobile.
- Kicker/index: 11-13px, uppercase, tracked.
- Dense labels/specs: 12-14px.

### 4. Screen height discipline

The site should not feel like every section is a forced full-screen slide.

Rules:

- Hero can be tall, but should not feel oversized.
- Most sections should fit within about 70-90% of a desktop viewport when content allows.
- Long informational sections may exceed one viewport only when needed.
- Avoid artificial `100vh` sections unless the interaction requires it.
- Mobile should use natural vertical rhythm, not desktop slide behavior.

### 5. B2B trust without overclaiming

Because the site currently has limited real proof assets, trust must come from clarity and honest boundaries:

- Use “factory-owned overseas brand and export division” consistently.
- Keep `DEMO_ONLY`, `NOT_CONFIGURED`, and verification states visible where required.
- Do not invent certifications, capacity numbers, export records, lead times, client names, case studies, or regulatory claims.
- Show the process clearly: formula direction, sample confirmation, packaging route, production route, quality checks, export support.
- Use transparent wording such as “final MOQ confirmed by formula and packaging route.”

## Recommended visual direction

### Direction A: Clinical Editorial Manufacturing

This is the recommended direction.

Mood:

- premium laboratory
- clean manufacturing
- quiet product science
- editorial spacing
- restrained graphite / ivory / muted botanical tones

Why it fits:

- It makes VITHELO feel more credible for B2B buyers.
- It can work with free stock imagery.
- It avoids looking like a consumer supplement DTC clone.
- It keeps the site high-end without pretending to have unavailable proof assets.

Signature moves:

- image-background stage sections
- centered copy on soft dark or frosted panels
- thin rules and small indexes
- asymmetrical image crops
- understated CTA placement
- product forms shown as a premium manufacturing range, not a supermarket catalog

### Direction B: Premium Ingredient House

Mood:

- natural textures
- ingredient close-ups
- soft light
- wellness-adjacent

Risk:

- May look too consumer/DTC.
- Could dilute the “real factory / OEM ODM partner” message.

### Direction C: Industrial Export Partner

Mood:

- factory scale
- shipping-ready
- sober B2B operations

Risk:

- May feel too cold or commodity-like.
- Harder to make visually premium without real factory photography.

## Approved upgrade approach

Use Direction A as the base.

Do not rebuild the whole site in one uncontrolled pass. Create a reusable visual system through three master sections first:

1. Homepage Hero
2. Product Directions
3. One Manufacturing System, Eight Product Formats

After these three sections feel right, apply the same system across:

- remaining homepage sections
- `/products`
- `/oem-odm`
- `/insights`
- `/contact`

## Section-level guidance

### Homepage Hero

Current issue:

- Synthetic product shapes and gradients can feel placeholder-like.

Target:

- One strong photographic atmosphere.
- Shorter, quieter headline.
- Copy placed with generous negative space.
- CTA should feel integrated, not like a SaaS button block.

Possible copy direction:

> Nutrition formats, built for private-label growth.

Supporting copy:

> VITHELO is a factory-owned overseas brand and export division for gummy-first nutrition OEM/ODM projects.

### Product Directions

Current issue:

- The section risks becoming a conventional left-text/right-image or carousel pattern.

Target:

- Background images fill the section.
- Text sits centered in a calm overlay panel.
- The interaction can advance product directions, but the visual should feel cinematic and contained.
- No horizontal sliding strip.
- No “each product format becomes a separate full page” behavior.

### One Manufacturing System, Eight Product Formats

Current issue:

- Table-like layout reads as internal capability sheet.

Target:

- Keep all eight formats visible within one section.
- Replace table feeling with an editorial product-format field:
  - asymmetric layout
  - larger gummy anchor
  - smaller supporting formats grouped by manufacturing route
  - compact MOQ/spec chips
  - subtle lines, not boxed cards

Important:

- This section is still one section, not eight scroll pages.
- Do not use a horizontal slider.
- Do not make it a generic 4-card or 8-card grid.

### Manufacturing and Quality

Target:

- Use image-led credibility.
- Avoid fake certification confidence.
- Separate actual verified proof from launch-pending proof.
- Use calm labels and process language.

### Contact

Current issue:

- The orange contact block is visually memorable but may feel abrupt and unresolved.

Target:

- Keep a strong final CTA, but refine it into a premium project-starting environment.
- Inquiry form remains `NOT_CONFIGURED`.
- Email/WhatsApp remain pending until approved.
- Reduce “warning label” feeling while preserving truthful configuration status.

## Component rules

### Avoid

- Generic rounded card grids.
- Large flat color slabs as the main visual identity.
- Excessive shadows.
- Overly large headings on every section.
- Dense tables as front-facing brand UI.
- Repeating the same two-column layout across pages.
- Fake mockups or fake certifications.
- Trendy but ungrounded AI copy.

### Prefer

- full-bleed image stages
- editorial rules and indexes
- calm overlays
- high-quality cropping
- compact specs
- clear hierarchy
- fewer but stronger CTAs
- restrained motion
- accessible native scroll

## Page application

### `/`

The homepage is the visual flagship. It should prove:

- what VITHELO is
- what formats it supports
- how projects move forward
- why a buyer can trust the process
- how to start contact

### `/products`

The products page should not become eight separate product-detail pages for now.

It should work as a premium capability directory:

- hero with manufacturing-format positioning
- grouped product format system
- product direction examples
- customization variables
- MOQ guidance with caveats
- CTA to contact

### `/oem-odm`

This page should carry the operational trust story:

- project flow
- sample and formula route
- packaging route
- production route
- quality checks
- export support

### `/insights`

This is not just a blog.

It should support conversion by educating buyers:

- format selection
- market-ready product directions
- packaging decisions
- MOQ and production planning
- quality preparation

### `/contact`

This should become a focused project intake page:

- short trust copy
- project brief form placeholder
- direct contact placeholders
- next-step expectations

## Content tone

Write in English only.

Tone:

- restrained
- specific
- low-hype
- B2B-native
- international
- factory-backed

Avoid:

- “revolutionary”
- “cutting-edge”
- “empower”
- “holistic wellness solution”
- “global leader”
- “unmatched”
- “premium quality” without proof

Prefer:

- “Built around the format, formula, and route.”
- “A clearer way to plan private-label nutrition.”
- “Gummy-first, with adjacent dosage formats available.”
- “MOQ depends on formula, packaging, and production route.”
- “Contact us for MOQ.”

## Asset requirements

Initial free-stock asset targets:

- Hero: premium supplement packaging or manufacturing-adjacent image, 2400×1400 or larger.
- Product Directions: six lifestyle/product-use images, 2000×1500 or larger.
- Product Formats: close-ups of gummies, capsules, softgels, tablets, powder, liquid bottles, gum, oral strips, 1600×1200 or larger.
- Manufacturing: clean production/lab environment, 2400×1400 or larger.
- Quality: lab testing/documentation/detail image, 2000×1300 or larger.
- Contact: quiet desk/project planning or premium material image, 2000×1300 or larger.

All assets must be replaceable later with real VITHELO/factory photography.

## Implementation sequence after approval

1. Freeze current committed frontend as the functional baseline.
2. Create visual tokens for premium UI:
   - color
   - typography scale
   - section height rhythm
   - image overlay treatment
   - CTA styles
3. Rebuild three master sections:
   - Hero
   - Product Directions
   - Eight Product Formats
4. Run visual review on desktop and mobile.
5. Apply the approved system to remaining homepage sections.
6. Apply the approved system to `/products`, `/oem-odm`, `/insights`, and `/contact`.
7. Verify:
   - no Chinese copy
   - no horizontal overflow
   - no unsupported claims
   - no broken routes
   - `pnpm.cmd lint`
   - `pnpm.cmd typecheck`
   - `pnpm.cmd test`
   - `pnpm.cmd build`
   - selected e2e checks

## Acceptance criteria

The upgrade is successful when:

- The site no longer feels like a demo or color-block prototype.
- The first viewport feels like a premium B2B nutrition brand.
- Key sections use real photographic atmosphere or clearly specified asset placeholders.
- Product formats are presented as a manufacturing system, not a simple table.
- The site remains honest about missing proof, contact configuration, and unverified claims.
- The route structure stays simple and B2B-appropriate.
- The implementation is surgical and does not disturb the frozen HTML reference.

## Self-review

- Placeholder scan: the only intentional placeholders are pending real contact configuration and replaceable stock/asset requirements.
- Internal consistency: the route structure, B2B positioning, English-only requirement, Seed-as-reference-only rule, and no-AI-image rule are consistent throughout.
- Scope check: this is a visual-system upgrade, not a new page expansion or backend integration.
- Ambiguity check: the “eight product formats” section is explicitly one section, not a slider and not eight separate pages.
