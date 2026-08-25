# VITHELO Project AGENTS.md Redesign

Date: 2026-08-25  
Status: Approved direction, awaiting written-spec review

## Goal

Replace the obsolete repository guidance with one clear project-level `AGENTS.md` that reflects the approved VITHELO B2B nutrition OEM/ODM website and prevents the misunderstandings, broad rewrites, preview regressions, and deployment mistakes seen during the homepage work.

## File strategy

- Rewrite the root `AGENTS.md`; do not append a second conflicting rule set.
- Remove obsolete `A PRIME`, Nutrition-plus-Aesthetic-Technology, and dual-product-world requirements.
- Retain accurate repository structure, Windows commands, Next.js version guidance, schema/data boundaries, accessibility requirements, and verification commands.
- Keep durable project rules in `AGENTS.md`; keep page-specific implementation detail in the approved design specifications.

## Required sections

### 1. Project truth

- Brand: `VITHELO`.
- Site type: English-language cross-border B2B OEM/ODM website for supplement buyers.
- Primary audiences: overseas nutrition brands, cross-border ecommerce sellers, and large offline retailers/supermarkets.
- Product priority: gummies first, with stable OEM/ODM capability across capsules, tablets, powders, liquids/drops, chewing gum, oral films, and softgels.
- The site represents the factory's overseas brand/foreign-trade function and its real cooperating factory capability.

### 2. Authority and conflict resolution

- Current explicit user instructions override older documents.
- Approved specifications and frozen previews are implementation authorities.
- Reference websites and screenshots are references, not source assets or permission to copy.
- If two requirements conflict or a request can be interpreted more than one way, stop and ask one concise question before editing.

### 3. Scope and confirmation semantics

- `确认`, `采用`, `A`, or similar approval accepts only the immediately presented option; it does not authorize adjacent redesigns, refactors, extra sections, or deployment changes.
- Translate every request into an exact change list and an explicit unchanged list before implementation.
- Make surgical edits only. Every changed file and line must trace to the current request.
- Do not use broad rewrites to solve a local layout or interaction issue.

### 4. Homepage contract

- Preserve the approved standalone HTML preview as a frozen visual reference.
- The production `/` page contains exactly the approved eleven sections in their approved order.
- The public site is English; Chinese is permitted only in internal documentation and developer communication.
- The dosage-form section stays within one desktop screen, shows eight forms as a 4-by-2 composition, and has no horizontal slider.
- The market section uses its approved bounded wheel interaction only; the site must not add global scroll-jacking.
- Implementing the Next.js homepage must not overwrite, redirect, or silently change the frozen HTML preview.

### 5. Visual and media boundaries

- Maintain a high-end, restrained B2B visual direction; avoid generic card grids, excessive rounded cards, heavy shadows, and template-like layouts.
- Do not copy Seed branding, copy, product logic, layout, motion, code, or green microbiome identity.
- User-supplied screenshots are reference material unless explicitly approved as source assets.
- Use free commercially usable media or specify the required asset type and dimensions.
- Do not generate images unless the user explicitly changes the current instruction.

### 6. Claims, MOQ, and configuration

- Do not invent certifications, capacity, efficacy, dosage, lead time, market policy, or contact information.
- MOQ language remains qualified by `Flexible MOQ based on formula and packaging` and `Contact us for MOQ` unless the user approves exact public figures.
- Unverified values remain visibly qualified; missing providers and contact endpoints remain `NOT_CONFIGURED`.
- Email, WhatsApp, inquiry forms, CRM, analytics, CMS, payment, and deployment connections require explicit provider decisions and authorization.

### 7. Technical implementation

- Preserve non-home routes unless they are explicitly included in scope.
- Keep content in validated records rather than embedding business facts in route components.
- Follow the repository's dependency direction and existing component conventions.
- Read the installed Next.js documentation before changing framework APIs because the repository uses a version with breaking changes.
- Do not edit generated `next-env.d.ts` manually.

### 8. Git and deployment discipline

- Inspect `git status` before editing and preserve unrelated user files.
- Stage exact paths only; never include unrelated untracked files.
- Do not commit, merge, push, or deploy unless the user explicitly requests that action.
- A preview running locally is not evidence that it was committed or deployed.
- Before deployment changes, identify the framework, package manager, root directory, runtime version, build command, and output behavior from repository evidence.
- Verify the exact pushed commit and production result when deployment work is authorized.

### 9. Verification and completion

- Test the smallest relevant contract first, then run lint, typecheck, unit tests, applicable end-to-end tests, and production build.
- Visually inspect desktop and mobile at the affected sections.
- Check English-only public copy, section count/order, overflow, clipping, keyboard behavior, Reduced Motion, and frozen-preview integrity.
- Report what changed, what was intentionally unchanged, verification results, and commit status separately.
- Do not claim completion while a required check is failing or was not run.

## Self-review

- Placeholder scan: no unresolved rule placeholder remains.
- Consistency: the new file has one VITHELO project identity and removes the obsolete dual-brand/product-world model.
- Scope: rules address recurring failures without prescribing an unrelated redesign or new feature.
- Ambiguity: confirmation scope, reference/source distinction, preview protection, Git authorization, and deployment evidence are explicit.
