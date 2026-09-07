# VITHELO Featured Format Wall Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Home screen six with an image-led, Lusion-inspired two-column wall that presents all eight VITHELO product formats through native vertical scrolling.

**Architecture:** Extend the validated homepage content contract so every format owns an explicit slug and media record, then render the section as semantic linked figures inside the existing Home pattern. Use CSS view-progress animation with a static IntersectionObserver fallback already provided by `VitheloHomeMotion`; no carousel state, scroll-jacking, WebGL, or new runtime dependency is required.

**Tech Stack:** Next.js 16 App Router, React 19 server components, `next/image`, Zod 4, CSS Modules, Vitest, Testing Library, Playwright.

---

## File map

- Modify `src/content/schema.ts`: strengthen the Home dosage-format contract with slug and media fields.
- Modify `src/content/demo/vithelo-b2b-home.ts`: supply the approved heading, shared evidence-safe qualifier, eight slugs, and eight media records.
- Modify `src/components/patterns/vithelo-b2b-home.tsx`: replace `DosageSection` compact cards with the semantic Featured Format Wall markup.
- Modify `src/components/patterns/vithelo-b2b-home.module.css`: implement the chapter intro, two-column wall, image reveal/parallax, hover/focus, mobile stack, and Reduced Motion states.
- Create eight files under `public/media/b2b/`: one image per dosage format.
- Modify `tests/unit/vithelo-b2b-home-content.test.ts`: verify the eight-format media and routing contract.
- Modify `tests/unit/vithelo-b2b-home.test.tsx`: verify the new structure and absence of carousel semantics.
- Modify `tests/unit/home-inquiry.test.tsx`: update the expected homepage image count after eight format images replace the old background-only treatment.
- Modify `tests/e2e/nutrition-home-sequence.spec.ts`: verify section order, links, images, and evidence-safe copy.
- Modify `tests/e2e/vithelo-premium-ui.spec.ts`: update the approved UI-stage contract.
- Modify `tests/e2e/responsive.spec.ts`: verify two columns above 760px, one column at 760px and below, intentional desktop offset, and no overflow.
- Modify `tests/e2e/accessibility.spec.ts`: verify Reduced Motion final state and keyboard-visible links.
- Modify `docs/current-status.md`: record the accepted sixth-screen structure and verification facts.
- Create `docs/superpowers/specs/2026-09-07-vithelo-product-formats-featured-wall-acceptance.md`: record visual and technical acceptance evidence.

### Task 1: Lock the eight-format content contract

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: Write the failing content test**

Add a test that asserts the new title, exact slug order, eight unique images, valid dimensions, and evidence-safe shared qualifier:

```ts
it("defines the approved featured format wall", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.dosage.title).toBe("One system. Eight expressions.");
  expect(parsed.dosage.items.map((item) => item.slug)).toEqual([
    "gummies",
    "hard-capsules",
    "softgels",
    "tablets",
    "powders",
    "liquids",
    "functional-gum",
    "oral-films",
  ]);
  expect(new Set(parsed.dosage.items.map((item) => item.media.src)).size).toBe(8);
  expect(parsed.dosage.items.every((item) => item.media.width > 0)).toBe(true);
  expect(parsed.dosage.items.every((item) => item.media.height > 0)).toBe(true);
  expect(JSON.stringify(parsed.dosage)).not.toMatch(
    /price|fast sampling|confidential|certified|GMP|HACCP|FDA|ISO/i,
  );
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: FAIL because `slug`, `media`, and the new title do not exist.

- [ ] **Step 3: Extend the Zod schema**

Replace the dosage item contract with explicit route and media ownership:

```ts
dosage: z.object({
  kicker: z.literal("06 · Product Formats"),
  title: z.literal("One system. Eight expressions."),
  qualifier: z.string().min(1),
  items: z.array(
    z.object({
      name: z.string().min(1),
      slug: z.enum([
        "gummies",
        "hard-capsules",
        "softgels",
        "tablets",
        "powders",
        "liquids",
        "functional-gum",
        "oral-films",
      ]),
      media: B2BRequiredMediaSchema,
    }),
  ).length(8),
}),
```

- [ ] **Step 4: Populate the validated content record**

Set the shared section copy and eight item records:

```ts
dosage: {
  kicker: "06 · Product Formats",
  title: "One system. Eight expressions.",
  qualifier: "Explore eight product formats through one coordinated manufacturing system. Flexible MOQ depends on formula and packaging.",
  items: [
    { name: "Gummies", slug: "gummies", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-gummies.png", label: "VITHELO gummy product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Hard Capsules", slug: "hard-capsules", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-hard-capsules.png", label: "VITHELO hard capsule product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Softgels", slug: "softgels", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-softgels.png", label: "VITHELO softgel product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Tablets", slug: "tablets", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-tablets.png", label: "VITHELO tablet product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Powders", slug: "powders", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-powders.png", label: "VITHELO powder product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Liquids", slug: "liquids", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-liquids.png", label: "VITHELO liquid product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Functional Gum", slug: "functional-gum", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-functional-gum.png", label: "VITHELO functional gum product format", width: 1536, height: 1024, format: "PNG" } },
    { name: "Oral Films", slug: "oral-films", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-oral-films.png", label: "VITHELO oral film product format", width: 1536, height: 1024, format: "PNG" } },
  ],
},
```

- [ ] **Step 5: Run the content test and verify GREEN**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 6: Commit the contract change**

```powershell
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts
git commit -m "feat: define featured format content"
```

### Task 2: Produce eight format-specific media assets

**Files:**
- Create: `public/media/b2b/format-gummies.png`
- Create: `public/media/b2b/format-hard-capsules.png`
- Create: `public/media/b2b/format-softgels.png`
- Create: `public/media/b2b/format-tablets.png`
- Create: `public/media/b2b/format-powders.png`
- Create: `public/media/b2b/format-liquids.png`
- Create: `public/media/b2b/format-functional-gum.png`
- Create: `public/media/b2b/format-oral-films.png`

- [ ] **Step 1: Generate a consistent eight-image family**

Use the built-in image generation tool in eight calls. Keep this shared prompt prefix unchanged:

```text
High-end editorial product still life for VITHELO, a B2B nutrition OEM/ODM brand. Cold ivory and graphite studio world with restrained titanium reflections and one subtle warm coral accent. Wide 3:2 composition, tactile macro material detail, premium commercial lighting, gentle shadow, generous negative space, no people. Public text may only be VITHELO on an unclaimed neutral package. No dosage, efficacy, certification, price, regulatory, medical, third-party brand, or invented claim text. No card UI, no embedded headings, no green wellness styling.
```

Append exactly one format-specific subject per call:

```text
Gummies: translucent nutrition gummies with a neutral VITHELO jar.
Hard Capsules: two-piece hard capsules with a neutral VITHELO jar.
Softgels: amber translucent softgels with controlled specular highlights.
Tablets: clean round tablets with powder-edge detail and a neutral VITHELO bottle.
Powders: fine coral-beige powder drift, scoop, and neutral VITHELO pouch.
Liquids: amber dropper liquid, glass reflections, and neutral VITHELO bottle.
Functional Gum: precision-cut gum pieces and a minimal VITHELO blister-style pack.
Oral Films: translucent oral-film strips and individual neutral VITHELO sachets.
```

- [ ] **Step 2: Inspect every generated image before copying**

Use visual inspection to reject any image containing malformed `VITHELO`, third-party marks, efficacy language, dosage, certifications, or a product form that does not match its filename.

- [ ] **Step 3: Save accepted assets to their final paths**

Copy only the accepted image from the generated-image directory into each exact project path listed above. Do not script composite images or add text with PIL/Canvas.

- [ ] **Step 4: Verify dimensions and file signatures**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
Get-ChildItem public/media/b2b/format-*.png | ForEach-Object {
  $image = [System.Drawing.Image]::FromFile($_.FullName)
  [PSCustomObject]@{ Name = $_.Name; Width = $image.Width; Height = $image.Height; Format = $image.RawFormat }
  $image.Dispose()
}
```

Expected: eight PNG files; each file matches the dimensions recorded in content. If the generator returns a different consistent size, update all eight content records to the measured dimensions instead of falsifying metadata.

- [ ] **Step 5: Commit the media family**

```powershell
git add -- public/media/b2b/format-*.png
git commit -m "feat: add product format media"
```

### Task 3: Replace compact dosage cards with semantic project-style figures

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/unit/home-inquiry.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`

- [ ] **Step 1: Write the failing component test**

Replace the old layout assertions with:

```ts
it("renders all eight formats as one featured format wall", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const dosage = document.getElementById("dosage-forms")!;
  expect(dosage).toHaveAttribute("data-layout", "featured-format-wall");
  expect(dosage).toHaveAttribute("data-ui-stage", "featured-format-wall");
  expect(within(dosage).getAllByTestId("format-project")).toHaveLength(8);
  expect(within(dosage).getAllByTestId("format-media")).toHaveLength(8);
  expect(within(dosage).getAllByRole("link")).toHaveLength(8);
  expect(dosage).not.toHaveAttribute("data-carousel");
  expect(within(dosage).queryByRole("tablist")).not.toBeInTheDocument();
});
```

Update the homepage image-count assertion in `home-inquiry.test.tsx` from the previous count to the rendered count after all eight format images are added.

- [ ] **Step 2: Run the tests and verify RED**

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/home-inquiry.test.tsx
```

Expected: FAIL on the old UI-stage, missing `format-project`, missing `format-media`, and image count.

- [ ] **Step 3: Replace `DosageSection` markup**

Implement the section with one intro and eight linked figures:

```tsx
function DosageSection({ content }: VitheloB2BHomeProps) {
  return (
    <section
      aria-labelledby="dosage-title"
      className={`${styles.section} ${styles.dosageSection}`}
      data-layout="featured-format-wall"
      data-motion-intent="RELATE"
      data-ui-stage="featured-format-wall"
      id="dosage-forms"
    >
      <header className={styles.formatIntro}>
        <p className={styles.kicker}>{content.dosage.kicker}</p>
        <h2 className={styles.title} id="dosage-title">{content.dosage.title}</h2>
        <p className={styles.formatQualifier}>{content.dosage.qualifier}</p>
      </header>
      <div className={styles.formatWall} data-testid="format-wall">
        {content.dosage.items.map((item, index) => (
          <article className={styles.formatProject} data-testid="format-project" key={item.slug}>
            <Link aria-label={`Explore ${item.name}`} className={styles.formatLink} href={`/products/${item.slug}`}>
              <figure className={styles.formatFigure} data-testid="format-media">
                <Image alt={item.media.label} fill sizes="(max-width: 760px) 100vw, 50vw" src={item.media.src!} />
              </figure>
              <div className={styles.formatMeta}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.name}</h3>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests and verify GREEN**

Run the Step 2 command. Expected: PASS.

- [ ] **Step 5: Commit the semantic structure**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.tsx tests/unit/vithelo-b2b-home.test.tsx tests/unit/home-inquiry.test.tsx
git commit -m "feat: build featured format wall"
```

### Task 4: Implement the visual composition and motion grammar

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Remove the obsolete dosage-card rules**

Delete rules whose only consumers were `.dosageGrid`, `.dosageItem`, `.dosageShape`, `.dosageCopy`, and their item-specific gradient shapes. Keep `.dosageSection` as the section boundary and do not change styles for other screens.

- [ ] **Step 2: Add the chapter intro and two-column wall**

Implement these exact structural properties, adapting values only if six-viewport visual QA exposes clipping:

```css
.dosageSection { min-height: auto; overflow: clip; background: var(--paper); }
.formatIntro { min-height: clamp(520px, 70svh, 760px); display: grid; align-content: end; border-bottom: 1px solid var(--line); }
.formatIntro .title { max-width: 9ch; margin-top: 1.5rem; font-size: clamp(4.5rem, 10vw, 9.5rem); line-height: 0.86; letter-spacing: -0.075em; }
.formatQualifier { width: min(100%, 34rem); margin: 1.5rem 0 3rem auto; color: var(--muted); font-size: 1rem; line-height: 1.55; }
.formatWall { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(4rem, 8vw, 7rem) clamp(1.25rem, 2.5vw, 2.25rem); padding-block: clamp(4rem, 8vw, 8rem); }
.formatProject:nth-child(even) { translate: 0 clamp(3rem, 7vw, 7rem); }
.formatLink { display: block; color: inherit; text-decoration: none; }
.formatFigure { position: relative; aspect-ratio: 3 / 2; margin: 0; overflow: clip; background: #d9d5cc; }
.formatFigure img { object-fit: cover; scale: 1.08; translate: 0 3%; transition: scale 700ms var(--ease-standard), filter 700ms var(--ease-standard); }
.formatMeta { min-height: 72px; display: grid; grid-template-columns: 3rem 1fr auto; align-items: center; gap: 0.75rem; border-top: 1px solid var(--line); }
.formatMeta h3 { margin: 0; font-size: clamp(1.5rem, 2.4vw, 2.4rem); font-weight: 500; letter-spacing: -0.04em; }
```

- [ ] **Step 3: Add progressive reveal and media view progress**

Use CSS view timelines where supported and retain a visible final state elsewhere:

```css
@supports (animation-timeline: view()) {
  .formatProject { animation: format-project-reveal linear both; animation-timeline: view(); animation-range: entry 0% cover 42%; }
  .formatFigure img { animation: format-media-progress linear both; animation-timeline: view(); animation-range: entry 0% exit 100%; }
}
@keyframes format-project-reveal { from { opacity: 0.35; transform: translateY(56px); } to { opacity: 1; transform: translateY(0); } }
@keyframes format-media-progress { from { scale: 1.1; translate: 0 4%; } to { scale: 1.02; translate: 0 -4%; } }
```

The even-column offset must remain separate from animated `transform`; use the individual `translate` property for column offset and `transform` for reveal.

- [ ] **Step 4: Add hover, focus, mobile, and Reduced Motion behavior**

```css
@media (hover: hover) and (pointer: fine) {
  .formatLink:hover .formatFigure img,
  .formatLink:focus-visible .formatFigure img { scale: 1.05; filter: saturate(1.04) contrast(1.02); }
}
@media (max-width: 760px) {
  .formatIntro { min-height: 56svh; }
  .formatIntro .title { font-size: clamp(3.6rem, 18vw, 5rem); }
  .formatQualifier { margin-left: 0; }
  .formatWall { grid-template-columns: 1fr; gap: 3.5rem; }
  .formatProject:nth-child(even) { translate: none; }
  .formatFigure { aspect-ratio: 6 / 5; }
}
@media (prefers-reduced-motion: reduce) {
  .formatProject,
  .formatFigure img { animation: none !important; opacity: 1 !important; transform: none !important; scale: 1 !important; translate: none !important; }
}
```

- [ ] **Step 5: Run targeted lint and unit tests**

```powershell
node node_modules/eslint/bin/eslint.js src/components/patterns/vithelo-b2b-home.tsx src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/home-inquiry.test.tsx
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/home-inquiry.test.tsx
```

Expected: targeted lint exits 0; unit suite exits 0.

- [ ] **Step 6: Commit the styling and motion**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.module.css
git commit -m "feat: animate featured format wall"
```

### Task 5: Lock interaction, responsive, and accessibility behavior

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/vithelo-premium-ui.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: Write failing E2E assertions**

Add assertions for:

```ts
const formats = page.locator("#dosage-forms");
await expect(formats).toHaveAttribute("data-layout", "featured-format-wall");
await expect(formats).toHaveAttribute("data-ui-stage", "featured-format-wall");
await expect(formats.getByTestId("format-project")).toHaveCount(8);
await expect(formats.getByTestId("format-media")).toHaveCount(8);
await expect(formats.getByRole("link", { name: /Explore / })).toHaveCount(8);
await expect(formats.locator("[role='tablist'], [aria-roledescription*='carousel']")).toHaveCount(0);
await expect(formats).not.toContainText(/price|fast sampling|confidential|certified|GMP|HACCP|FDA|ISO/i);
```

In `responsive.spec.ts`, measure `gridTemplateColumns`, `scrollWidth`, and the first two project tops. Expect two columns and unequal first-row tops above 760px; expect one column and natural increasing tops at 760px and below.

In `accessibility.spec.ts`, emulate Reduced Motion, scroll to the section, assert all eight images and names are visible, and assert the first image transform/scale/translate values are static.

- [ ] **Step 2: Run E2E and verify RED before implementation is complete**

With the existing development server on port 3000:

```powershell
$env:E2E_EXTERNAL_SERVER='1'
$env:E2E_BASE_URL='http://127.0.0.1:3000'
node node_modules/@playwright/test/cli.js test tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/vithelo-premium-ui.spec.ts tests/e2e/responsive.spec.ts tests/e2e/accessibility.spec.ts --grep="format|Product Formats|reduced motion"
```

Expected before Tasks 3–4: FAIL on the old grid contract. Expected after Tasks 3–4: PASS at all six configured viewports.

- [ ] **Step 3: Verify every route target**

Assert exact hrefs for all eight links, ending with `/products/oral-films`. Do not click through only the first item; the contract must cover every generated URL.

- [ ] **Step 4: Commit E2E coverage**

```powershell
git add -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/vithelo-premium-ui.spec.ts tests/e2e/responsive.spec.ts tests/e2e/accessibility.spec.ts
git commit -m "test: cover featured format wall"
```

### Task 6: Perform final visual QA and update status

**Files:**
- Modify: `docs/current-status.md`
- Create: `docs/superpowers/specs/2026-09-07-vithelo-product-formats-featured-wall-acceptance.md`
- Create: `tmp/product-formats-desktop-final.png`
- Create: `tmp/product-formats-tablet-final.png`
- Create: `tmp/product-formats-mobile-final.png`

- [ ] **Step 1: Run final static verification**

```powershell
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: both commands exit 0. Record that Node 24 local success is not Node 20 Hostinger proof.

- [ ] **Step 2: Capture the accepted viewports**

Restart the development server after build, then capture:

```powershell
node node_modules/@playwright/test/cli.js screenshot --viewport-size="1440,900" --wait-for-timeout=1200 "http://127.0.0.1:3000/#dosage-forms" "tmp/product-formats-desktop-final.png"
node node_modules/@playwright/test/cli.js screenshot --viewport-size="1024,768" --wait-for-timeout=1200 "http://127.0.0.1:3000/#dosage-forms" "tmp/product-formats-tablet-final.png"
node node_modules/@playwright/test/cli.js screenshot --viewport-size="390,844" --wait-for-timeout=1200 "http://127.0.0.1:3000/#dosage-forms" "tmp/product-formats-mobile-final.png"
```

Also capture at least one mid-wall desktop state so the two-column offset and second-row reveal are reviewed, not only the chapter title.

- [ ] **Step 3: Perform visual inspection**

Confirm no P0/P1 clipping, overlap, broken image, malformed VITHELO text, horizontal overflow, card-like white boxes, uneven Oral Films treatment, or motion-hidden content. Inspect 1440, 1280, 1024, 768, 390, and 375 widths.

- [ ] **Step 4: Update project status and acceptance evidence**

Record:

- Home screen six now uses `Featured Format Wall`.
- Eight formats remain one section; desktop is two columns and mobile is one column.
- Motion uses native scroll progress and Reduced Motion is static.
- Exact unit, E2E, lint, typecheck, and build results.
- User visual acceptance remains pending until the final rendered section is reviewed.

- [ ] **Step 5: Commit the documentation**

```powershell
git add -- docs/current-status.md docs/superpowers/specs/2026-09-07-vithelo-product-formats-featured-wall-acceptance.md
git commit -m "docs: record featured format wall acceptance"
```

Do not commit `tmp/` screenshots unless the repository policy is explicitly changed.
