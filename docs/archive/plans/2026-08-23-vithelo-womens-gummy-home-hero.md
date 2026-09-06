# VITHELO Women’s Gummy Home Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the VITHELO Home first screen with the approved woman-and-flagship-gummy composition and a single B2B `START A PROJECT` action.

**Architecture:** Keep Home data behind `HomeContentSchema` and `localContentAdapter`. Render the editorial layout in the existing Server Component and use art-directed demo media for desktop and mobile. Preserve every route, every screen after the hero, the visible `DEMO_ONLY` boundary, and the complete Phase A acceptance baseline.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Zod, Tailwind v4 plus existing CSS tokens, Motion 13, Vitest, Testing Library, Playwright, Next Image.

---

## File map

- Create `public/media/vithelo-womens-gummy-hero-desktop.png`: 1536x1024 desktop composite with left copy safety area.
- Create `public/media/vithelo-womens-gummy-hero-mobile.png`: 1024x1536 mobile art direction of the same scene.
- Modify `src/content/schema.ts`: replace channel-style hero actions with one typed project action.
- Modify `src/content/demo/home.ts`: provide approved copy, CTA, media paths, dimensions, and alt text.
- Modify `src/components/patterns/nutrition-home-hero.tsx`: consume the record, render one CTA, and retain navigation and fallback behavior.
- Modify `src/app/globals.css`: implement the cold-Ivory composition, readable scrim, responsive crop, and Reduced Motion fallback.
- Modify `tests/unit/content-schema.test.ts` and `tests/unit/home-inquiry.test.tsx`: lock the contract and semantic hero.
- Modify `tests/e2e/core-journeys.spec.ts`, `tests/e2e/accessibility.spec.ts`, and `tests/e2e/responsive.spec.ts`: lock inquiry routing, accessibility, and six-width layout.
- Update `AI_CHANGELOG.md`: record exact verification evidence.

## Task 1: Lock the hero content contract

**Files:**

- Modify: `tests/unit/content-schema.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/home.ts`

- [ ] **Step 1: Write the failing schema assertion**

Add:

```ts
it("models the Home hero as one women’s gummy project action", async () => {
  const home = await localContentAdapter.getHomeContent();

  expect(home.hero.headline).toBe("WOMEN’S NUTRITION, SHAPED WITH PRECISION.");
  expect(home.hero.supportingText.split(/\s+/)).toHaveLength(12);
  expect(home.hero.primaryAction).toEqual({
    label: "START A PROJECT",
    href: "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
  });
  expect(home.hero).not.toHaveProperty("secondaryAction");
  expect(home.hero.desktopMedia).toMatchObject({
    status: "DEMO_ONLY",
    src: "/media/vithelo-womens-gummy-hero-desktop.png",
    width: 1536,
    height: 1024,
  });
  expect(home.hero.mobileMedia).toMatchObject({
    status: "DEMO_ONLY",
    src: "/media/vithelo-womens-gummy-hero-mobile.png",
    width: 1024,
    height: 1536,
  });
});
```

- [ ] **Step 2: Verify the old contract fails**

Run:

```powershell
pnpm.cmd test -- tests/unit/content-schema.test.ts
```

Expected: FAIL because `primaryAction` is still `"email"` and the old copy and media paths remain.

- [ ] **Step 3: Replace the hero schema fields**

Use:

```ts
headline: z.literal("WOMEN’S NUTRITION, SHAPED WITH PRECISION."),
supportingText: z.literal(
  "A flagship gummy platform for differentiated formulas, brand programs and professional partnerships.",
),
primaryAction: z.object({
  label: z.literal("START A PROJECT"),
  href: z.literal(
    "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
  ),
}),
desktopMedia: MediaSchema,
mobileMedia: MediaSchema,
```

Remove `secondaryAction`.

- [ ] **Step 4: Replace only `demoHome.hero`**

```ts
hero: {
  headline: "WOMEN’S NUTRITION, SHAPED WITH PRECISION.",
  supportingText:
    "A flagship gummy platform for differentiated formulas, brand programs and professional partnerships.",
  primaryAction: {
    label: "START A PROJECT",
    href: "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
  },
  desktopMedia: {
    status: "DEMO_ONLY",
    src: "/media/vithelo-womens-gummy-hero-desktop.png",
    width: 1536,
    height: 1024,
    alt: "Demo VITHELO women’s gummy bottle with transparent red bear gummies and an adult woman in soft natural light",
  },
  mobileMedia: {
    status: "DEMO_ONLY",
    src: "/media/vithelo-womens-gummy-hero-mobile.png",
    width: 1024,
    height: 1536,
    alt: "Mobile demo composition of a VITHELO women’s gummy bottle, transparent red bear gummies, and an adult woman",
  },
},
```

- [ ] **Step 5: Run the focused test**

Run `pnpm.cmd test -- tests/unit/content-schema.test.ts`. Expected: PASS, including the prohibited-language scan.

- [ ] **Step 6: Commit**

Stage the three Task 1 files and commit with `feat: define women gummy Home hero content`.

## Task 2: Produce and inspect the art-directed media

**Files:**

- Create: `public/media/vithelo-womens-gummy-hero-desktop.png`
- Create: `public/media/vithelo-womens-gummy-hero-mobile.png`

- [ ] **Step 1: Generate the desktop master**

Use the image-generation tool with this exact brief:

```text
Create a premium photorealistic website hero image in a 3:2 landscape composition for VITHELO, a high-end nutrition brand. Cold ivory studio-bedroom environment with graphite and titanium details. On the right rear, an adult woman shown in soft side profile from head to shoulder with real natural skin texture, calm expression, neutral styling, no direct eye contact. On the right foreground, one complete matte cold-ivory supplement bottle with a restrained black VITHELO wordmark and the small label WOMEN'S GUMMY, fully visible and sharply focused. Place three to five translucent ruby-red bear-shaped gummies around the bottle with realistic glass-like material, subtle reflections, foreground and midground depth. Preserve the entire left 42 percent as clean cold-ivory negative space for black website copy. Scientific, precise, human, quiet luxury. No pink background, no flowers, no leaves, no capsules, no medical props, no doctor, no laboratory glassware, no efficacy claims, no certification marks, no price, no extra products, no warped hands, no unreadable decorative text. Soft silver edge light, natural skin, realistic packaging photography.
```

Save the accepted 1536x1024 result at the desktop path.

- [ ] **Step 2: Generate the mobile art direction**

Use the accepted desktop result as the visual reference:

```text
Recompose this exact VITHELO women’s gummy scene for a 2:3 portrait mobile website hero. Keep the same adult woman, natural skin, cold ivory environment, single complete bottle, VITHELO wordmark, WOMEN'S GUMMY label, and three to five translucent ruby-red bear gummies. Move the woman to the upper-right rear and the product to the lower-right foreground. Preserve a clean left and upper-left text safety area. Keep the product fully visible and sharply focused. Do not add products, claims, badges, flowers, leaves, medical props, or pink background.
```

Save the accepted 1024x1536 result at the mobile path.

- [ ] **Step 3: Inspect both files at original resolution**

Reject an asset if the copy zone is occupied, the bottle has a false claim or distorted text, the woman appears underage or anatomically distorted, gummies are opaque rather than translucent, or desktop and mobile look like different campaigns.

- [ ] **Step 4: Verify dimensions**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
$desktop = [System.Drawing.Image]::FromFile((Resolve-Path 'public/media/vithelo-womens-gummy-hero-desktop.png'))
$mobile = [System.Drawing.Image]::FromFile((Resolve-Path 'public/media/vithelo-womens-gummy-hero-mobile.png'))
"desktop=$($desktop.Width)x$($desktop.Height) mobile=$($mobile.Width)x$($mobile.Height)"
$desktop.Dispose()
$mobile.Dispose()
```

Expected: `desktop=1536x1024 mobile=1024x1536`. If image generation returns a larger file at the same ratio, resize once and preserve the composition.

- [ ] **Step 5: Commit**

Stage both approved images and commit with `feat: add women gummy Home hero media`.

## Task 3: Rebuild the semantic first screen

**Files:**

- Modify: `tests/unit/home-inquiry.test.tsx`
- Modify: `src/components/patterns/nutrition-home-hero.tsx`

- [ ] **Step 1: Replace stale hero assertions**

Replace the old heading, old art path, `Our approach` CTA, and `Explore our range` CTA assertions with:

```ts
const hero = document.getElementById("nutrition-hero")!;
expect(within(hero).getByRole("heading", {
  name: "WOMEN’S NUTRITION, SHAPED WITH PRECISION.",
})).toBeVisible();
expect(within(hero).getByText(
  "A flagship gummy platform for differentiated formulas, brand programs and professional partnerships.",
)).toBeVisible();
expect(screen.getByTestId("nutrition-hero-approved-art")).toHaveAttribute(
  "srcset",
  expect.stringContaining("vithelo-womens-gummy-hero-desktop.png"),
);
expect(within(hero).getByRole("link", { name: "START A PROJECT" })).toHaveAttribute(
  "href",
  "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
);
expect(within(hero).getAllByRole("link", { name: /START A PROJECT/i })).toHaveLength(1);
expect(within(hero).queryByRole("link", { name: "Explore our range" })).not.toBeInTheDocument();
```

Keep navigation, `DEMO_ONLY`, fallback, screen order, and screen 2 through 6 assertions unchanged.

- [ ] **Step 2: Verify the old hero fails**

Run `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx`. Expected: FAIL on the new heading, media, and one-action assertions.

- [ ] **Step 3: Make `ResponsiveHeroMedia` data-driven**

```tsx
function ResponsiveHeroMedia({
  desktopMedia,
  mobileMedia,
}: {
  desktopMedia: Extract<HomeContent["hero"]["desktopMedia"], { status: "DEMO_ONLY" }>;
  mobileMedia: Extract<HomeContent["hero"]["mobileMedia"], { status: "DEMO_ONLY" }>;
}) {
  const common = { quality: 82, sizes: "100vw" } as const;
  const { props: { srcSet: desktop } } = getImageProps({
    ...common,
    alt: desktopMedia.alt,
    height: desktopMedia.height,
    src: desktopMedia.src,
    width: desktopMedia.width,
  });
  const { props: { srcSet: mobile, ...imageProps } } = getImageProps({
    ...common,
    alt: mobileMedia.alt,
    height: mobileMedia.height,
    src: mobileMedia.src,
    width: mobileMedia.width,
  });

  return (
    <picture>
      <source data-testid="nutrition-hero-approved-art" media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        {...imageProps}
        alt={mobileMedia.alt}
        className="nutrition-hero-art size-full object-cover"
        fetchPriority="high"
      />
    </picture>
  );
}
```

- [ ] **Step 4: Replace only the live-content block**

```tsx
<div
  className="nutrition-hero-content relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.25rem,4vw,4rem)]"
  data-motion-intent="ORIENT"
  data-testid="nutrition-hero-live-content"
>
  <div className="nutrition-hero-copy w-full max-w-[42rem]">
    <HeroIntro delay={0.1}>
      <h1 className="nutrition-hero-title font-light" data-demo-only-claim id="nutrition-hero-title">
        {hero.headline}
      </h1>
    </HeroIntro>
    <HeroIntro className="mt-[var(--space-24)]" delay={0.2}>
      <p className="nutrition-hero-supporting max-w-[35rem]">{hero.supportingText}</p>
    </HeroIntro>
    <HeroIntro className="mt-[var(--space-32)]" delay={0.3}>
      <Link className="hero-cta hero-cta-primary" href={hero.primaryAction.href}>
        {hero.primaryAction.label}
      </Link>
    </HeroIntro>
  </div>
</div>
```

Use a cold-Ivory root with Graphite text, rename the scrim to `nutrition-hero-scrim`, and set `data-static-design="screen-01-womens-gummy-approved"`.

- [ ] **Step 5: Preserve explicit fallbacks**

Build the responsive `<picture>` only when both records are `DEMO_ONLY`. Otherwise render the existing `HeroMedia` fallback for the missing viewport and never show a broken media element.

- [ ] **Step 6: Run and commit**

Run `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx`. Expected: PASS. Commit the component and test with `feat: rebuild Home hero around women gummy inquiry`.

## Task 4: Apply the approved responsive visual system

**Files:**

- Modify: `src/app/globals.css`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Add the failing viewport test**

```ts
test("women’s gummy hero keeps its decision content inside the first viewport", async ({ page, viewport }) => {
  await page.goto("/");
  const hero = page.locator("#nutrition-hero");
  const title = hero.getByRole("heading", {
    name: "WOMEN’S NUTRITION, SHAPED WITH PRECISION.",
  });
  const action = hero.getByRole("link", { name: "START A PROJECT" });

  await expect(hero).toBeVisible();
  await expect(title).toBeVisible();
  await expect(action).toBeVisible();
  const [heroBox, titleBox, actionBox] = await Promise.all([
    hero.boundingBox(),
    title.boundingBox(),
    action.boundingBox(),
  ]);
  expect(heroBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  if (viewport && heroBox && titleBox && actionBox) {
    expect(heroBox.height).toBeGreaterThanOrEqual(viewport.height - 1);
    expect(titleBox.x).toBeGreaterThanOrEqual(0);
    expect(actionBox.y + actionBox.height).toBeLessThanOrEqual(viewport.height + 1);
  }
});
```

Add new hero heading and CTA visibility assertions to the existing Reduced Motion test.

- [ ] **Step 2: Run the focused browser tests**

Run:

```powershell
& .\scripts\run-e2e.ps1 -PlaywrightArgs @('--grep=women’s gummy hero|reduced motion','tests/e2e/responsive.spec.ts','tests/e2e/accessibility.spec.ts')
```

Expected: the new viewport test fails before the approved CSS is applied.

- [ ] **Step 3: Replace conflicting first-screen CSS**

```css
.nutrition-hero-art {
  object-position: center center;
  animation: nutrition-hero-arrive var(--motion-immersive) var(--ease-standard) both;
  transform-origin: 70% 52%;
}

.nutrition-hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(244 244 240 / 0.98) 0%, rgb(244 244 240 / 0.9) 29%, rgb(244 244 240 / 0.28) 51%, transparent 72%),
    linear-gradient(180deg, rgb(244 244 240 / 0.22), transparent 35%);
}

.nutrition-hero-content {
  padding-top: clamp(5.5rem, 10vh, 7rem);
  padding-bottom: clamp(2rem, 5vh, 4rem);
}

.nutrition-hero-copy {
  width: min(42vw, 42rem);
}

.nutrition-hero-title {
  max-width: 11ch;
  font-size: clamp(3.25rem, 5.3vw, 5.9rem);
  line-height: 0.98;
  letter-spacing: -0.052em;
}

.nutrition-hero-supporting {
  color: color-mix(in srgb, var(--color-graphite) 78%, transparent);
  font-size: clamp(1rem, 1.15vw, 1.2rem);
  line-height: 1.45;
}

#nutrition-hero .hero-cta-primary {
  border-color: var(--color-graphite);
  background: var(--color-graphite);
  color: var(--color-ivory);
}

@media (max-width: 767px) {
  .nutrition-hero-scrim {
    background:
      linear-gradient(180deg, rgb(244 244 240 / 0.98) 0%, rgb(244 244 240 / 0.82) 31%, transparent 57%),
      linear-gradient(90deg, rgb(244 244 240 / 0.72), transparent 72%);
  }

  .nutrition-hero-content {
    align-items: flex-start;
    padding-top: clamp(5rem, 12vh, 6.5rem);
    padding-bottom: 1.5rem;
  }

  .nutrition-hero-copy {
    width: 100%;
  }

  .nutrition-hero-title {
    max-width: 10ch;
    font-size: clamp(2.35rem, 11vw, 3.35rem);
  }

  .nutrition-hero-supporting {
    max-width: 18rem;
    font-size: 0.96rem;
  }

  #nutrition-hero .hero-cta {
    width: auto;
    min-width: 12.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nutrition-hero-art,
  .nutrition-hero-intro {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

Keep global palette and motion tokens unchanged.

- [ ] **Step 4: Run and commit**

Run the focused unit test and the browser grep from Step 2 plus the 44px test. Expected: PASS at matching projects. Commit CSS and tests with `feat: style responsive women gummy Home hero`.

## Task 5: Verify the inquiry route and visual integrity

**Files:**

- Modify: `tests/e2e/core-journeys.spec.ts`
- Modify: `tests/e2e/demo-integrity.spec.ts` only if a stale phrase assertion is found

- [ ] **Step 1: Add the CTA journey**

```ts
test("women’s gummy hero enters the Nutrition project intake", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "START A PROJECT" }).click();

  await expect(page).toHaveURL(/\/contact\?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership$/);
  await expect(page.getByRole("heading", { name: "Start a Project" })).toBeVisible();
  await page.getByRole("button", { name: "Develop a product" }).click();
  await expect(page.getByLabel("Product world")).toHaveValue("Nutrition");
  await expect(page.getByLabel("Project summary")).toHaveValue("Women’s gummy partnership");
});
```

- [ ] **Step 2: Run the journey and image-warning tests**

Run:

```powershell
& .\scripts\run-e2e.ps1 -PlaywrightArgs @('--grep=women’s gummy hero enters|primary visual routes avoid','tests/e2e/core-journeys.spec.ts')
```

Expected: CTA journey and all primary visual-route image-warning checks PASS.

- [ ] **Step 3: Inspect all six acceptance widths**

At 1440, 1280, 1024, 768, 390, and 375 pixels verify one bottle, adult natural skin behind the product, readable left copy, one CTA, product label in viewport, no color-channel takeover, no horizontal overflow, and no image warning.

- [ ] **Step 4: Commit**

Commit the focused journey change with `test: cover women gummy Home inquiry journey`.

## Task 6: Run the full gate and record evidence

**Files:**

- Modify: `AI_CHANGELOG.md`

- [ ] **Step 1: Run static and unit gates**

Run each separately:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: every command exits 0 and build retains 20 route entries.

- [ ] **Step 2: Run the complete browser matrix**

Stop only this repository’s preview if it holds the `.next/dev` lock, then run `& .\scripts\run-e2e.ps1`. Expected: zero failures, only expected viewport-condition skips, P0 = 0, P1 = 0.

- [ ] **Step 3: Update `AI_CHANGELOG.md`**

Record the design-spec path, generated media filenames and dimensions, content-contract change, exact gate counts, and confirmation that screens 2 through 6, routes, Contact fields, integrations, and product facts did not change.

- [ ] **Step 4: Commit evidence**

Commit `AI_CHANGELOG.md` with `docs: record women gummy Home hero acceptance`.

- [ ] **Step 5: Restore preview**

Start the project at `http://127.0.0.1:3000/`, verify HTTP 200, and leave it running.

## Plan self-review

- Spec coverage: composition, copy, CTA, data boundary, navigation, motion, Reduced Motion, media failure, mobile art direction, accessibility, image performance, and all six widths map to an implementation or verification step.
- Scope: only Home screen 1, its validated content, its media, focused styling, tests, and changelog are touched.
- Types: `primaryAction` is consistently `{ label, href }` and `secondaryAction` is removed.
- Claims: no dose, efficacy, certification, pricing, medical status, or market policy is introduced.
- Ambiguity: desktop and mobile dimensions, copy, CTA target, visual exclusions, test commands, and acceptance checks are explicit.
