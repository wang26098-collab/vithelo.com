# VITHELO Material Glass Navigation and Repository Cleanup Design

Date: 2026-08-31  
Status: User-approved visual and structural design; pending written-spec review

## Objective

Make the homepage Hero begin at the top of the viewport, place navigation inside the Hero rather than above it, introduce a restrained Seed-inspired two-state navigation system without copying Seed branding, and conservatively simplify the repository while preserving recoverable historical references.

## Scope

This design covers:

- Homepage navigation at the top of the Hero.
- The scrolled desktop navigation state.
- The mobile navigation state.
- Removal of the full-width homepage `DEMO_ONLY` disclosure bar.
- Preservation of explicit `DEMO_ONLY` and `NOT_CONFIGURED` status near affected content and in the footer.
- Conservative cleanup of generated output, obsolete hosting residue, and historical project artifacts.

This design does not change homepage section order, Hero imagery or copy, internal-page composition, contact submission capability, public claims, or production integrations.

## Approved Visual Direction

The approved direction is **V-C: Material Glass**.

### Homepage top state

- Navigation is positioned over the Hero and consumes no separate page height.
- There is no navigation background at the top of the page.
- Navigation text is Ivory.
- A very light Hero-top contrast gradient may protect readability, but individual links do not receive separate scrims.
- The left side contains `VITHELO`, `Products`, `OEM / ODM`, and `Insights`.
- The right side contains `Contact` and `Start a Project`.
- `Start a Project` uses a restrained low-saturation warm brown, not the previous bright orange.

### Homepage scrolled state

- The navigation becomes two independent floating groups rather than one full-width bar.
- Both groups use light, titanium-gray glass at approximately 48% opacity, a fine light border, and restrained background blur.
- Both groups use a full capsule outline and a 52px height.
- The left capsule serves browsing; the right capsule serves contact and inquiry.
- The transition uses a quiet fade-and-gather movement: glass appears while each group contracts slightly toward its own content.
- No scroll-jacking is introduced.
- Under Reduced Motion, the state changes directly without gathering motion.

### Mobile state

- At the top of the Hero, mobile shows only `VITHELO` and `Menu` without a background.
- After scrolling, mobile uses one 52px light-glass capsule.
- The mobile capsule contains `VITHELO`, `Menu`, and a shortened visible `Start` action with an accessible name of `Start a Project`.
- All interactive targets remain at least 44px.
- The opened menu retains the current primary destinations and does not cover critical content without a recovery action.

### Internal pages

- Products, OEM / ODM, Insights, article, and Contact pages retain a stable solid navigation treatment.
- Internal pages do not use the Hero-overlay or two-floating-group behavior.
- Navigation destinations and information architecture remain unchanged.

## Technical Structure

The implementation uses an explicit homepage variant.

- `VitheloB2BSiteFrame` gains a `variant="home"` option.
- Only `src/app/page.tsx` passes the homepage variant.
- A focused client navigation component observes the homepage Hero boundary with `IntersectionObserver`.
- The component exposes a semantic top/scrolled state through data attributes and CSS classes.
- Internal routes continue rendering the stable frame without route-name inference.
- The implementation does not add an animation library or a global scroll listener.
- If `IntersectionObserver` is unavailable, the stable scrolled treatment is the safe fallback.

The full-width disclosure is omitted only from the homepage top. Demo and missing-configuration boundaries remain visible beside affected data or actions and in the footer. No unverified value is promoted to production status.

## State and Interaction Requirements

- Initial homepage load at scroll position zero renders the no-background Hero state.
- Scrolling beyond the Hero navigation threshold renders the two floating glass groups.
- Returning to the top restores the no-background state.
- Refreshing while scrolled resolves to the correct state without a prolonged flash of the wrong treatment.
- Keyboard focus is visible in both states.
- Mobile menu opening, closing, focus restoration, and Escape behavior remain intact.
- The transition does not alter link order or accessible names.
- Navigation remains usable at 200% text zoom and at all six acceptance viewports.

## Conservative Repository Cleanup

### Keep as active project material

- `src/`, `public/`, `tests/`, `scripts/`, `.github/`
- Active documents under `docs/`
- `AGENTS.md`, `README.md`, `.env.example`
- `package.json`, `pnpm-lock.yaml`, and active framework/test configuration
- `node_modules/` during implementation so the project remains immediately testable
- `.env.local`
- Current source changes and Git history
- `docs/deployment.md`
- `docs/superpowers/plans/2026-08-30-vithelo-operational-launch.md`

### Delete as generated or obsolete local output

- `.next/`
- `.pnpm-store/`
- `playwright-report/`
- `test-results/`
- `tsconfig.tsbuildinfo`
- Empty `.tmp/`
- `.vercel/`
- Completed temporary browser-companion sessions under `.superpowers/brainstorm/` after their decisions are recorded here

These targets are either reproducible output, obsolete Vercel residue, or temporary review material. Deletion must use exact resolved workspace paths.

### Move into `docs/archive/`

- `vithelo-homepage-work/` to `docs/archive/legacy-homepage-preview/`
- Root V6.0 `.docx` brief to `docs/archive/source-briefs/`
- `design-system/a-prime-brand-site/` to `docs/archive/legacy-design-system/a-prime-brand-site/`
- `AI_CHANGELOG.md`, `IMPLEMENTATION_PLAN.md`, `PROJECT_AUDIT.md`, `SAVEPOINT-2026-08-23.md`, and `UI_HANDOFF.md` to `docs/archive/project-history/`
- Completed or superseded plans dated 2026-08-16 through 2026-08-27, plus the deprecated Vercel hardening plan, to `docs/archive/plans/`
- The completed premium UI phase-one plan to `docs/archive/plans/`

Historical HTML files are moved without content edits. They remain recoverable references and are not used as deployment sources.

## Documentation Updates

- `README.md` continues to identify the Next.js root as the deployable project.
- `docs/deployment.md` remains the hosting authority.
- Active documentation links that point to moved historical plans are updated to their archive paths.
- A concise archive index explains that archived material is non-authoritative.
- `.gitignore` continues excluding generated output and adds the visual-companion working directory if required.

## Testing and Acceptance

Implementation is accepted only when:

- The homepage Hero begins at the top of the viewport with navigation over it.
- No full-width disclosure or standalone header creates a band above the Hero.
- Desktop top and scrolled states match the approved structure.
- Mobile top and scrolled states match the approved single-capsule structure.
- Internal routes retain stable navigation.
- All routes have no horizontal overflow.
- Keyboard, focus, Escape, 44px target, text zoom, and Reduced Motion requirements pass.
- `DEMO_ONLY` and `NOT_CONFIGURED` boundaries remain visible where required.
- The eight-format section, all eleven homepage sections, and current inquiry behavior remain unchanged.
- Archive moves preserve historical files byte-for-byte.
- Only the exact generated directories and obsolete `.vercel` residue are deleted.
- `pnpm.cmd lint`, `pnpm.cmd typecheck`, `pnpm.cmd test`, `pnpm.cmd test:e2e`, and `pnpm.cmd build` exit with code 0 before final generated-output cleanup.

## Rollback

- Navigation changes are isolated to the B2B frame, its styles, the homepage variant call, and focused tests.
- Historical project materials remain available under `docs/archive/`.
- Generated dependencies and build output can be restored with `pnpm.cmd install` and the standard validation commands.
- No production deployment, DNS change, provider connection, or external message is part of this work.
