# Page Patterns

Route files load validated data and delegate composition to page patterns. Each pattern owns a user task, not product facts.

## Route and responsibility map

| Route | Pattern | Responsibility | Implemented structure |
| --- | --- | --- | --- |
| `/` | `HomePagePattern` | Nutrition-led orientation | Product-media hero, Ivory manifesto, product-focus rail, capsule science, gummy science, human rhythms, then science/knowledge/professional/inquiry recovery |
| `/nutrition` | `NutritionLanding` | Nutrition discovery | Validated `#sleep-health`, `#womens-health`, and `#daily-essential` sections, product form/status boundary, formula preview, quality return loop |
| `/learn` | `LearnPage` | Health Knowledge recovery | `DEMO_ONLY` educational boundary, Sleep Health and Women’s Health category links, Science and Support routes |
| `/aesthetic-technology` | `AestheticLanding` | Device discovery | Complete device, application context, devices, engineering, skin interface, Professional return loop |
| `/nutrition/[slug]` | `NutritionPdp` | Nutrition decision | Commerce, glance facts, formula, form/use, instructions, evidence, Safety, continuation |
| `/aesthetic-technology/[slug]` | `DevicePdp` | Device decision | Commerce, function boundary, technology, engineering, interface, instructions, modes, Safety, ownership |
| `/science` | `SciencePage` | Explanation and evidence | Approach, two science contexts, libraries, evidence disclosure, quality/Safety, Support return loop |
| `/professional` | `ProfessionalPage` | Business fit and qualification | Four intents, capabilities, product worlds, process, proof state, project intake |
| `/search` | direct `UtilityPage` composition | Task routing | Disabled search plus Product, Ingredient/Technology, Professional, Support, Journal groups |
| `/cart` | direct `UtilityPage` composition | Transaction clarity | Empty state, totals state, one related demo item |
| `/checkout` | direct `UtilityPage` composition | Transaction mode | Missing payment configuration and disabled continuation |
| `/account` | direct `UtilityPage` composition | Account task map | Missing identity state, account areas, conditional ownership area |
| `/support` | direct `UtilityPage` composition | Support task map | Six support intents and missing provider state |

Global `loading.tsx`, `error.tsx`, and `not-found.tsx` use `UtilityPage` and `StatePanel` to keep recovery behavior consistent.

## Pattern contracts

### Home

Home is a nutrition-led six-screen sequence: product/lifestyle Hero, Ivory manifesto, product-focus rail, capsule form study, separate gummy form study, and human-rhythms panel. It then offers science, Health Knowledge, Professional Partnership, disabled inquiry, and Support recovery. It is not an equal-weight device catalog or a long brand film.

### Landings

Both landings support discovery without sharing one repeated composition. Nutrition uses neo-grotesk, validated category/form grouping, and formulation relationships. Aesthetic Technology uses a complete-device and engineering rhythm. Their distinction survives without channel color.

### PDPs

`ProductCommerce` appears in the first decision region. Missing price and actions remain explicit. Mobile receives a `P1` `StickyResource` after the primary commerce block; it pauses under the menu Dialog and exits before `#safety`.

Nutrition orders content around formula, ingredient, routine, instructions, evidence, and quality/Safety. Device orders content around technology, engineering, human interface, instructions, modes, Safety, and ownership.

### Science

`EvidenceCard` reveals type, source placeholder, scope, supported-statement boundary, and limitations together. Search stays visibly disabled until a provider exists. The page ends with a Support return loop.

### Professional

The first interactive choice is a business intent. Develop a Product, Private Label, OEM / ODM, and Distribution ask different first questions. Submission remains disabled and sends no information.

### Utility

Utility pages use `mode="task"` by default. Cart and Checkout use `mode="transaction"`. Their copy prioritizes current state, next action, and recovery over brand storytelling.

## Responsive contract

Mobile is a priority composition. Critical commerce state, Safety, instructions, evidence context, and recovery actions must remain discoverable without hover. The product rail becomes horizontal snap; capsule and gummy stages become ordinary sequential content rather than sticky scenes. Acceptance covers 1440, 1280, 1024, 768, 390, and 375px widths.

## Related

- [Brand system](brand-system.md)
- [Content model](content-model.md)
- [Design system](design-system.md)
- [Acceptance](acceptance.md)
