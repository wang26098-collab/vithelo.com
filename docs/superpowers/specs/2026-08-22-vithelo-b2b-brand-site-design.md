# VITHELO B2B Brand Site Design Specification

Date: 2026-08-22  
Status: Draft for user review  
Primary objective: Generate qualified B2B inquiries through email and WhatsApp  
Secondary objective: Help consumers and professional end users understand products, use context, safety, and evidence boundaries

## 1. Design Read

This is a premium B2B-first brand site for procurement teams, brand owners, distributors, clinics, studios, and professional operators. Consumer commerce and product education support the main business journey but do not dominate the home page.

The design language is Swiss precision with human material science. The site borrows Seed's useful structural mechanisms: real product imagery, generous copy space, direct action, need-led discovery, layered science content, and professional trust. It does not copy Seed's green palette, microbiome identity, wording, product logic, layouts, motion, or code.

Design dials:

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 4`
- `VISUAL_DENSITY: 4`

Design foundation:

- Next.js App Router and React Server Components by default
- Native brand CSS tokens with Tailwind v4 consumption
- Customized Radix primitives for accessible disclosure and overlays
- Motion only in isolated client leaves
- Phosphor as the single icon family

## 2. Brand Logic

Master brand: `VITHELO`

Visible brand signature from the supplied logo system:

`PRECISION · SCIENCE · HUMAN`

Internal visual design formula retained from the approved project foundation:

`HUMAN × MATERIAL × PRECISION`

These statements have different jobs. The signature is part of the visible brand lockup. The formula governs layout, imagery, motion, and content behavior.

Brand personality:

- Calm, exact, credible, progressive
- Premium without luxury decoration
- Scientific without appearing cold or institutional
- Human without lifestyle sentimentality
- Commercial without hard-sell language

Copy rules:

- Use direct business language
- Prefer concrete verbs such as develop, formulate, source, validate, distribute, supply, and support
- Do not use generic claims such as elevate, revolutionize, seamless, next-gen, or world-class
- Do not invent efficacy, dosage, certifications, regulatory status, device mechanisms, parameters, warranty, MOQ, lead time, pricing, shipping, returns, or market policy
- Unverified content remains visibly labeled `DEMO_ONLY`
- Missing operational information remains visibly labeled `NOT_CONFIGURED`

## 3. Success Criteria

The first version succeeds when:

1. A business visitor understands what Vithelo offers within the first viewport.
2. Email Inquiry and WhatsApp are visible without scrolling on desktop and mobile.
3. Nutrition and Aesthetic Technology read as two product worlds inside one master brand.
4. Business visitors can select a cooperation context before contacting Vithelo.
5. Consumers can reach product, use, safety, and evidence information without overtaking the B2B journey.
6. Science content states source, scope, supported statement, and limitation together.
7. All unsupported facts are labeled `DEMO_ONLY` or `NOT_CONFIGURED`.
8. The page remains usable with reduced motion, failed media, keyboard navigation, and text resizing.

## 4. SLC Scope

### Must

- B2B-first home page
- Nutrition landing
- Aesthetic Technology landing
- Professional capabilities page
- Science page
- Product detail patterns for nutrition and devices
- Email Inquiry and WhatsApp entry points
- Mobile sticky inquiry actions
- Explicit demo and missing-configuration states
- Responsive behavior for 1440, 1280, 1024, 768, 390, and 375 px

### Should

- Cooperation-type selection before inquiry
- Context-aware inquiry actions on product and capability pages
- Local generation of a prefilled email subject and WhatsApp message
- Science-to-product and product-to-inquiry return paths
- One restrained product-world transition on the home page

### Could

- Downloadable approved product sheets
- Market or language switching
- Distributor resource area
- Journal and educational library

### Won't

- CRM submission without an approved provider
- Automated lead qualification or scoring
- Live commerce, payment, account, or subscription without approval
- Fake testimonials, client logos, certifications, metrics, or factory imagery
- Complex configurators, 3D viewers, or scroll-jacking

## 5. Information Architecture

Primary navigation:

- Nutrition
- Aesthetic Technology
- Capabilities
- Science
- Professional

Primary action:

- Start a Project

Utility navigation:

- Search, only after a provider or local index is configured
- Product Support
- Market / Language, only after markets are approved

Footer groups:

- Product Worlds
- Work With Vithelo
- Science and Safety
- Company
- Legal and Support

Required routes:

```text
/
/nutrition
/aesthetic-technology
/capabilities
/science
/professional
/products/[slug]
/technologies/[slug]
/support
/contact
```

Optional later routes:

```text
/journal
/evidence/[slug]
/ingredients/[slug]
/markets/[market]
```

## 6. Home Page Specification

Selected direction: `A / Project Inquiry First`

### Section 1: Hero

Purpose: Establish the master brand, show both product worlds, and expose the two inquiry channels.

Desktop composition:

- Full first viewport with navigation included
- Asymmetric split, approximately 42 percent copy and 58 percent media
- Copy sits in genuine negative space on the left
- Product and system composition sits on the right
- Headline stays within two lines
- Supporting text uses no more than 20 words in the final production language
- Both actions remain visible without scrolling

Content model:

```yaml
eyebrow: null
headline: "Precision for what comes next."
supportingText: "Nutrition and aesthetic technology developed for brands, distributors, and professional partners."
primaryAction:
  label: "Email Inquiry"
  channel: "email"
secondaryAction:
  label: "WhatsApp"
  channel: "whatsapp"
media:
  type: "approved_product_world_composite"
  status: "NOT_CONFIGURED"
```

The hero must not contain trust-logo walls, fake metrics, feature bullets, pricing teasers, or scroll cues.

### Section 2: Inquiry Split

Purpose: Let the visitor identify their business context before leaving the site.

Path A, Product Partners:

- OEM / ODM
- Private Label
- Distribution
- Product Development
- Preferred channel: Email Inquiry

Path B, Professional Partners:

- Professional Aesthetic Systems
- Clinic / Studio Use
- Device Distribution
- Training or Support Inquiry, only when configured
- Preferred channel: WhatsApp

This is a two-column editorial split, not two rounded cards. Each side includes one image or material crop, one short description, and one action.

### Section 3: Two Product Worlds

Purpose: Explain the breadth of Vithelo without splitting the master brand.

Nutrition visual language:

- Frosted glass, powder, capsule, liquid, paper, and daily human context
- Soft natural light with cool neutral color balance
- Product formulation and use context, not green wellness tropes

Aesthetic Technology visual language:

- Brushed metal, precision polymer, skin interface, controlled optical light
- Full device or system first, detail imagery second
- Professional context without fake clinical procedures

Each world provides:

- One clear proposition
- One approved hero asset
- Two to four representative categories
- One product-world action
- One contextual inquiry action

### Section 4: Business Capabilities

Purpose: Give procurement and business visitors enough information to self-qualify.

Capability groups:

- Product Development
- Formulation / System Development
- Private Label
- Professional Technology
- Distribution Support

Layout: A vertical capability index with a synchronized visual stage. Hover, focus, or tap changes the related visual. The list is not a grid of equal cards.

Each capability record contains:

```yaml
title: string
summary: string
productWorlds: [nutrition | aesthetic_technology]
availableMarkets: []
evidenceRefs: []
mediaRef: string | null
status: DEMO_ONLY | NOT_CONFIGURED | VERIFIED
inquiryContext: string
```

### Section 5: Science, Material, Human

Purpose: Explain how Vithelo thinks before presenting an evidence archive.

Required content units:

- Material or formulation principle
- Human use context
- Precision or validation method
- Evidence boundary
- Link to Science

The section may use one large approved image, diagram, or material macro. It must not use certificate walls, decorative molecules, fake lab dashboards, or unsupported performance numbers.

### Section 6: Consumer Support Path

Purpose: Provide a secondary route for people evaluating a Vithelo product.

Entry points:

- Explore Nutrition
- Explore Aesthetic Technology
- Product Use and Safety
- Evidence and Product Support

The section remains visually quieter than the B2B capability and inquiry sections.

### Section 7: Final Inquiry

Purpose: Close the business journey with the same two channel labels used in the hero.

Headline:

`Tell us what you are building.`

Actions:

- Email Inquiry
- WhatsApp

No additional synonyms such as Contact Us, Let's Talk, Get Started, or Reach Out may represent the same inquiry intent.

## 7. Inquiry Experience

### Start a Project Panel

The navigation action opens a dialog or dedicated contact route with:

1. Cooperation type
2. Product world
3. Country / market
4. Short project summary
5. Preferred contact channel

The interface does not submit to a remote service in the demo. It creates a local inquiry context, then opens the selected user-controlled channel.

Email behavior after configuration:

```text
mailto:{approved-email}
subject=VITHELO inquiry: {cooperation type}
body=Product world, market, and project summary
```

WhatsApp behavior after configuration:

```text
https://wa.me/{approved-e164-number}?text={encoded inquiry context}
```

Until the email address and WhatsApp number are supplied, actions render a clear `NOT_CONFIGURED` message and a recovery instruction. The design must never invent contact details.

Mobile behavior:

- A sticky bottom action bar shows Email and WhatsApp after the hero exits
- It hides while a modal, keyboard, consent layer, or drawer is active
- It must not cover Safety, product actions, or form errors
- Each action has a minimum 44 px target

## 8. Visual System

### Palette

The site supports light and dark appearance from the same semantic token system. A page uses one coherent appearance at a time and never flips theme between sections. The default follows the visitor's system preference unless the final brand owner approves a fixed appearance.

```css
--vithelo-cold-ivory: #F4F4F0;
--vithelo-surface: #ECEDE8;
--vithelo-graphite: #191B1A;
--vithelo-graphite-muted: #626762;
--vithelo-titanium: #A7ACA8;
--vithelo-line: #C9CCC7;
--vithelo-optical: #B8D0C8;
```

Dark appearance uses the same roles with near-black graphite surfaces, cool off-white text, titanium dividers, and the same restrained Optical accent. Pure black and pure white are excluded. Token values are starting values for visual prototyping. Both appearances require final contrast and brand approval before production.

Color rules:

- Graphite carries text and primary actions
- Cold Ivory is the main page surface
- Titanium appears in materials, dividers, and product imagery
- Optical is the only accent and is limited to focus, selected state, and restrained image light
- Nutrition does not become green
- Aesthetic Technology does not become blue
- Gold, neon, purple AI gradients, and mixed channel palettes are excluded

### Typography

- Use the supplied Vithelo wordmark as an image or approved vector asset
- Use a modern sans-serif display face for headings
- Use a readable sans-serif for body and interface copy
- Use a mono face only for factual labels, identifiers, or validated parameters
- Do not use a decorative serif by default
- Do not mix font families inside a headline for emphasis

Provisional hierarchy:

```text
Display: 48-72 px desktop, 38-48 px mobile
H1: 44-60 px desktop, 34-42 px mobile
H2: 32-44 px desktop, 28-34 px mobile
Body: 16-18 px
Small factual label: 12-14 px
```

### Shape and Surface

- Main content surfaces use square corners or a restrained 4 px radius
- Buttons use the same restrained geometry
- Pills are reserved for real filters or compact statuses
- Ordinary sections do not use drop shadows
- Dialogs may use a restrained tinted shadow
- Cards are used only where containment communicates a real relationship

### Grid and Rhythm

- Maximum content width: 1400 px
- Desktop grid: 12 columns
- Tablet grid: 8 columns
- Mobile grid: 4 columns
- Desktop navigation height: 64-72 px
- Major section spacing: 96-144 px desktop, 64-88 px mobile
- Headings and explanations stack vertically unless a real media or interaction occupies the second column

## 9. Image System

The site needs real or generated visual assets. Text-only layouts and fake product UI are not acceptable.

Required asset families:

1. Hero product-world composite, 16:9 desktop and 4:5 mobile
2. Nutrition still life, 4:5 and 1:1
3. Aesthetic Technology full system image, 4:5 and 16:9
4. Material macro series, 3:2
5. Human interface image, 4:5
6. Capability process image, 3:2

Photography direction:

- Realistic premium product still life
- Soft side light and controlled reflections
- Cool neutral white balance
- Genuine negative space for copy
- Shallow depth of field only when product labels remain legible
- Product scale and materials remain believable

Do not generate:

- Fake certifications or test results
- Invented packaging facts
- Fake factory scale
- Unsupported treatment scenes
- Floating capsules, neon molecule tunnels, blue holograms, or green leaves as generic health symbolism
- Reference-brand products or logos

Base image prompt:

```text
Brand: VITHELO.
Purpose: Premium B2B nutrition and aesthetic technology brand website.
Composition: Asymmetric editorial product still life, products grouped on the right, generous clean negative space on the left for web copy.
Materials: Brushed titanium, frosted glass, graphite polymer, cold ivory paper, restrained optical reflection.
Lighting: Soft natural side light, realistic shadows, controlled highlights, cool neutral balance.
Camera: Premium commercial product photography, believable scale, accurate perspective, subtle depth of field.
Tone: Calm, exact, human, credible, progressive.
Exclude: Seed branding, green wellness styling, blue medical gradients, gold luxury styling, neon, fake laboratory data, certificates, unsupported medical scenes, text artifacts, distorted packaging.
Output: 16:9 desktop hero with protected copy space, plus a separate 4:5 mobile crop.
```

## 10. Motion System

Motion is defined as `SCALE × REVEAL × RESPONSE`.

Approved behaviors:

- Hero media enters with one short reveal to establish hierarchy
- Product-world media changes when its corresponding text receives hover, focus, or tap
- Capability visual stage changes through a short cross-position transition
- Buttons provide tactile press feedback
- Dialogs provide clear open and close state transitions

Motion limits:

- No scroll-jacking
- No continuous floating decoration
- No ornamental 3D rotation
- No animation that contains the only copy of a fact
- No animation of layout dimensions
- No `window` scroll listener

Reduced Motion behavior:

- All content is immediately visible
- Product-world and capability visual states switch without travel animation
- Focus, selected, error, and confirmation states remain visible

## 11. Component Inventory

Core components:

- Brand Header
- Desktop Mega Menu
- Mobile Navigation Drawer
- Inquiry Action Pair
- Start a Project Panel
- Mobile Sticky Inquiry Bar
- Product World Switcher
- Capability Index
- Evidence Disclosure
- Safety Summary
- Product Fact Group
- Media Figure
- Explicit State Notice
- Footer

State Notice variants:

- `DEMO_ONLY`
- `NOT_CONFIGURED`
- `LOADING`
- `EMPTY`
- `ERROR`
- `SUCCESS`
- `DISABLED`

## 12. Responsive Rules

Desktop:

- Hero uses copy-left and media-right asymmetry
- Primary navigation remains one line
- Inquiry channels remain visible in the hero
- Capability list and visual stage operate side by side

Tablet:

- Navigation condenses before wrapping
- Hero may use a 45 / 55 split
- Capability stage remains paired when space permits

Mobile under 768 px:

- Every asymmetric layout collapses to one column
- Hero copy appears before media
- Inquiry actions appear before the fold where possible
- Email and WhatsApp actions stack or use equal-width columns without text wrapping
- Hover-only behavior becomes tap or ordered static content
- Product and Safety facts remain visible outside optional disclosure
- Media uses mobile-specific crop rather than shrinking the desktop composition

## 13. Accessibility and Performance

- Keyboard access for navigation, inquiry selection, disclosure, and dialogs
- Visible focus on every action
- Logical source order matches reading order
- Minimum 44 px touch targets
- WCAG AA contrast for controls and body text
- Labels above inputs, never placeholders as labels
- Inline and associated validation errors
- Non-color-only states
- Text resizing without clipping or horizontal overflow
- LCP target below 2.5 seconds
- INP target below 200 ms
- CLS target below 0.1
- Hero media uses reserved dimensions and priority loading
- Below-fold media is lazy loaded

## 14. Content and Data Boundaries

Content dependency direction:

`Tokens -> Core Components -> Domain Components -> Page Patterns -> Validated Content`

Product, evidence, safety, market, capability, and contact configuration remain separate.

No product facts live directly in route files or visual components.

Contact configuration:

```yaml
contact:
  email:
    value: null
    status: NOT_CONFIGURED
  whatsapp:
    e164: null
    status: NOT_CONFIGURED
```

## 15. Acceptance Checklist

- One master brand contains both product worlds
- Home prioritizes B2B project inquiry
- Email Inquiry and WhatsApp appear in the first viewport
- CTA labels are consistent across navigation, hero, pages, and footer
- No CTA label wraps on desktop
- No unsupported facts or fake precision
- No copied Seed identity, green system, copy, layout, or assets
- Hero uses a real or generated product visual
- Page uses at least four layout families
- No three equal feature-card row
- No repeated zigzag sections beyond two in sequence
- No decorative status dots, version labels, section numbering, scroll cues, or fake product UI
- One accent color and one shape system remain consistent
- Light and dark appearances preserve the same hierarchy, accent, and brand character
- Reduced Motion preserves all meaning
- Mobile sticky inquiry does not cover Safety, forms, dialogs, drawers, or the keyboard
- All six acceptance viewports have P0 = 0 and P1 = 0

## 16. Required Production Inputs

Before production release, Vithelo must provide:

- Approved wordmark and monogram vector files
- Approved font licenses or selected production fonts
- Final palette approval
- Real nutrition product data and imagery
- Real aesthetic technology data, imagery, manuals, and safety information
- Approved claims and evidence sources
- Approved certifications and regulatory statements
- Launch markets and languages
- Email inquiry address
- WhatsApp number in E.164 format
- Privacy, cookie, shipping, returns, warranty, and market policies as applicable
- Approved owner for every business and regulatory statement

Until supplied, each missing item remains `NOT_CONFIGURED` and is never replaced with plausible sample data.
