# VITHELO OEM / ODM Image-Led Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/oem-odm` as an image-led editorial manufacturing page with alternating visual stories, eight pictured formats, ten project steps, and no card-wall or table-like dividers.

**Architecture:** Extend the validated OEM/ODM content contract with demo media, render twelve semantic page sections from that content, and isolate the new visual system in a page-specific CSS Module. Reuse approved VITHELO media and add one neutral packaging still life; keep all manufacturing statements conditional and `DEMO_ONLY`.

**Tech Stack:** Next.js App Router, React, TypeScript, Zod, CSS Modules, Vitest/Testing Library, Playwright.

---

### Task 1: Lock the image-led content contract with failing tests

**Files:**
- Modify: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `tests/e2e/oem-odm-page.spec.ts`

- [ ] **Step 1: Replace the old ledger assertions**

Assert the twelve-section sequence and the media-led content counts:

```ts
expect(sectionNames).toEqual([
  "hero", "custom-formulation", "development-capabilities", "formats",
  "commercial-planning", "quality", "project-path", "packaging-introduction",
  "quote-preparation", "packaging-by-format", "questions", "inquiry",
]);
expect(within(screen.getByTestId("development-stories")).getAllByRole("article")).toHaveLength(3);
expect(within(screen.getByTestId("format-gallery")).getAllByRole("link")).toHaveLength(8);
expect(within(screen.getByTestId("oem-steps")).getAllByRole("article")).toHaveLength(10);
expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(15);
```

- [ ] **Step 2: Add a visual-contract E2E assertion**

```ts
await expect(page.locator('[data-testid="oem-section"]')).toHaveCount(12);
await expect(page.locator('[data-testid="development-stories"] img')).toHaveCount(3);
await expect(page.locator('[data-testid="format-gallery"] img')).toHaveCount(8);
await expect(page.locator('[data-testid="oem-steps"] > article')).toHaveCount(10);
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run: `pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts`

Expected: FAIL because the page still renders ten ledger sections, seven capability cells, and six steps.

### Task 2: Extend the validated content model

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`

- [ ] **Step 1: Add the page-local content shapes**

Define `B2BOemStorySchema` and `B2BOemFormatSchema` from the existing text, link, commercial-variable, and `DemoMediaSchema` contracts. Update `B2BOemOdmPageSchema` to require:

```ts
hero: B2BHeroSchema.extend({ media: DemoMediaSchema }),
introduction: B2BTextItemSchema.extend({ media: DemoMediaSchema }),
developmentStories: z.array(B2BOemStorySchema).length(3),
formats: z.array(B2BOemFormatSchema).length(8),
commercialVariables: z.array(B2BCommercialVariableSchema.extend({ media: DemoMediaSchema })).length(2),
quality: z.object({ title: z.string().min(1), copy: z.string().min(1), media: DemoMediaSchema, items: z.array(B2BTextItemSchema).length(4) }),
steps: z.array(B2BTextItemSchema).length(10),
packagingIntroduction: B2BTextItemSchema.extend({ media: DemoMediaSchema }),
quoteStories: z.array(B2BTextItemSchema).length(3),
packaging: z.array(B2BTextItemSchema).length(4),
```

- [ ] **Step 2: Populate all media and the ten conditional project steps**

Reuse `/media/b2b/vithelo-project-entry-atmospheric-panorama.png`, `/media/b2b/vithelo-product-definition-atmospheric.png`, `/media/b2b/sanitized-factory-production-line.jpg`, the eight `/media/b2b/format-*.png` assets, and `/media/b2b/oem-odm-packaging-still-life-v1.png`. Keep copy conditional and free of fixed MOQ, lead-time, certification, capacity, or regulatory claims.

- [ ] **Step 3: Run content tests**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts`

Expected: PASS.

### Task 3: Generate the missing packaging image

**Files:**
- Create: `public/media/b2b/oem-odm-packaging-still-life-v1.png`
- Modify: `docs/vithelo-media-register.md`

- [ ] **Step 1: Generate one project-bound product mockup**

Use the built-in image generator with this production prompt:

```text
Use case: product-mockup
Asset type: editorial website image for a nutrition OEM/ODM packaging section
Primary request: a premium white-label packaging still life showing an unbranded supplement bottle, jar, stick packs, sachet pouch, dropper bottle, and folded carton
Scene/backdrop: cold ivory architectural studio with pale limestone and brushed titanium surfaces
Style/medium: photorealistic high-end product photography
Composition/framing: landscape 3:2, objects grouped on the right two thirds with quiet negative space on the left
Lighting/mood: soft directional daylight, restrained shadows, precise and calm
Color palette: cold ivory, graphite, titanium, small neutral amber-glass accent
Constraints: blank packaging only; no logos; no labels; no readable text; no claims; no certification marks; no watermark
Avoid: green wellness styling, colorful gradients, pills floating in air, clinical symbols, badges
```

- [ ] **Step 2: Inspect and save the selected output**

Copy the final asset into `public/media/b2b/oem-odm-packaging-still-life-v1.png`, record dimensions and `DEMO_ONLY` provenance in the media register, and verify there is no readable generated text.

### Task 4: Replace the ledger component with editorial sections

**Files:**
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`
- Create: `src/components/patterns/vithelo-oem-odm-page.module.css`

- [ ] **Step 1: Render responsive demo media through `next/image`**

Add a page-private `OemMedia` helper that accepts validated demo media, sets `sizes`, and renders the provided alt text without inventing facts.

- [ ] **Step 2: Render the twelve approved sections**

Use semantic sections and these test ids: `development-stories`, `format-gallery`, `commercial-stories`, `quality-path`, `oem-steps`, `packaging-groups`. Alternate the three development stories and the two commercial stories on desktop; keep image-before-copy order on mobile.

- [ ] **Step 3: Keep accessibility and inquiry behavior intact**

Preserve logical headings, native FAQ `details/summary`, 44px link targets, visible focus, `/contact` CTA, and `data-content-status="DEMO_ONLY"`.

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx`

Expected: PASS.

### Task 5: Build the line-free visual system

**Files:**
- Modify: `src/components/patterns/vithelo-oem-odm-page.module.css`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`

- [ ] **Step 1: Implement the editorial composition**

Use full-bleed or wide media, 58/42 alternating story grids, natural image crops, large section spacing, background-tone changes, oversized step numerals, and typographic grouping. Do not use border grids, boxed cards, repeated rounded rectangles, table rows, or decorative divider lines.

- [ ] **Step 2: Remove the obsolete OEM ledger style block**

Delete only the CSS block beginning `/* OEM / ODM — capability-led manufacturing ledger. */`; preserve all unrelated shared-page rules.

- [ ] **Step 3: Add responsive and Reduced Motion rules**

At `900px`, simplify asymmetric layouts; at `620px`, make every story single-column with media first. Disable non-essential transitions under `prefers-reduced-motion: reduce`.

### Task 6: Verify behavior and visual quality

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: Run focused validation**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd typecheck
pnpm.cmd exec eslint src/components/patterns/vithelo-oem-odm-page.tsx src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-oem-odm-page.test.tsx tests/e2e/oem-odm-page.spec.ts
pnpm.cmd exec playwright test tests/e2e/oem-odm-page.spec.ts
pnpm.cmd build
```

Expected: all focused checks pass; if the standard E2E wrapper cannot acquire the Next dev lock, run the focused spec against the already-running `127.0.0.1:3000` server and record that limitation.

- [ ] **Step 2: Visually review all six acceptance viewports**

Verify no horizontal overflow, cropped essential content, hidden copy, excessive lines, card-wall appearance, unreadable image overlay text, or Reduced Motion dependency.

- [ ] **Step 3: Record the acceptance truth**

Update `docs/current-status.md` with the exact commands, results, remaining environment limitations, and the fact that final visual acceptance remains with the user.

## Self-review

- Spec coverage: all twelve sections, image strategy, three development stories, eight formats, ten steps, two commercial variables, quality, packaging, quote preparation, FAQ, inquiry, responsive behavior, and evidence boundaries have an implementation task.
- Placeholder scan: no TBD/TODO or undefined “similar” work remains.
- Type consistency: the schema names used by content, component, and tests match; all media use the existing `DEMO_ONLY` media contract.
