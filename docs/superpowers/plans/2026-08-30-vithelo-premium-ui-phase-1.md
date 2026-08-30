# VITHELO Premium UI Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the first three VITHELO visual master sections so the site starts to feel like a premium B2B nutrition OEM/ODM brand instead of a demo made from flat color blocks.

**Architecture:** Keep the existing Next.js App Router and validated content adapter. Make surgical changes to the VITHELO B2B homepage pattern, its scoped CSS module, the local demo content record, and focused Playwright assertions. Do not change route architecture, backend integrations, contact configuration, or the frozen standalone HTML preview.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Zod-validated demo content, Playwright, Vitest, pnpm on Windows.

---

## Scope

This plan implements only Phase 1 of the premium UI system:

1. Homepage Hero
2. Product Directions
3. One Manufacturing System, Eight Product Formats

Everything else remains structurally intact. The purpose is to establish a reusable visual language before applying it across the remaining homepage sections and other routes.

## Files

- Modify: `src/content/demo/vithelo-b2b-home.ts`
  - Refine copy and media metadata for the three master sections.
  - Keep all content English-only.
  - Keep contact and unverified states explicit.

- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
  - Replace synthetic hero material shapes with image-led hero markup.
  - Rework the gummy expertise and dosage format sections with premium editorial structure.
  - Preserve semantic section order and IDs.

- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
  - Add premium visual tokens local to the VITHELO homepage.
  - Add image-stage, editorial overlay, product-format field, and responsive styles.
  - Reduce flat color slab and table-like styling in the three master sections.

- Modify: `tests/e2e/vithelo-b2b-site.spec.ts`
  - Add assertions that the core sections still exist, remain English-only, and keep the eight-format section as one section.

- Create: `tests/e2e/vithelo-premium-ui.spec.ts`
  - Add targeted UI regression checks for premium image-led sections and non-table dosage layout.

- Do not modify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`
  - This is the frozen reference file.

## Constraints

- Do not use AI-generated images.
- Do not add real contact links.
- Do not add unsupported certifications, capacity claims, dosage claims, lead times, client names, or market policy.
- Do not write “United States” or “US market” in public-facing copy.
- Do not use a horizontal slider for the eight product formats.
- Do not split the eight product formats into eight scroll pages.
- Do not make the dosage section a generic 4-card or 8-card grid.
- Do not change routes outside the Phase 1 visual work.

---

### Task 1: Add premium UI regression coverage

**Files:**
- Create: `tests/e2e/vithelo-premium-ui.spec.ts`
- Modify: `tests/e2e/vithelo-b2b-site.spec.ts`

- [ ] **Step 1: Create a focused visual-structure test file**

Create `tests/e2e/vithelo-premium-ui.spec.ts` with this content:

```ts
import { expect, test } from "@playwright/test";

test.describe("VITHELO premium UI phase 1", () => {
  test("homepage master sections use premium image-led structure", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero");
    const productDirections = page.locator("#solutions");
    const dosageForms = page.locator("#dosage-forms");

    await expect(hero).toHaveAttribute("data-ui-stage", "image-led-hero");
    await expect(productDirections).toHaveAttribute("data-ui-stage", "image-led-product-directions");
    await expect(dosageForms).toHaveAttribute("data-ui-stage", "editorial-format-field");
  });

  test("eight product formats remain one section without horizontal slider semantics", async ({ page }) => {
    await page.goto("/");

    const dosageForms = page.locator("#dosage-forms");
    const dosageItems = dosageForms.locator("[data-testid='dosage-item']");

    await expect(dosageForms).toHaveCount(1);
    await expect(dosageItems).toHaveCount(8);
    await expect(dosageForms.locator("[role='tablist']")).toHaveCount(0);
    await expect(dosageForms.locator("[aria-roledescription*='carousel']")).toHaveCount(0);
  });

  test("homepage copy stays English and does not name a single target country", async ({ page }) => {
    await page.goto("/");

    const bodyText = await page.locator("body").innerText();

    expect(bodyText).not.toMatch(/[\u4e00-\u9fff]/);
    expect(bodyText).not.toMatch(/\bUnited States\b/i);
    expect(bodyText).not.toMatch(/\bUS market\b/i);
    expect(bodyText).not.toMatch(/\bU\.S\. market\b/i);
  });
});
```

- [ ] **Step 2: Run the new test and confirm it fails before implementation**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-premium-ui.spec.ts
```

Expected result:

```text
failed
```

Expected reason:

```text
data-ui-stage attributes are missing
```

- [ ] **Step 3: Extend existing B2B site test without changing its intent**

Open `tests/e2e/vithelo-b2b-site.spec.ts`. Add a small assertion to the homepage test that confirms the three master sections still exist by ID:

```ts
await expect(page.locator("#hero")).toBeVisible();
await expect(page.locator("#solutions")).toBeVisible();
await expect(page.locator("#dosage-forms")).toBeVisible();
```

Place the assertions inside the existing homepage coverage block so this does not create a separate broad test.

- [ ] **Step 4: Run the affected e2e files**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-b2b-site.spec.ts tests/e2e/vithelo-premium-ui.spec.ts
```

Expected result before implementation:

```text
vithelo-premium-ui.spec.ts fails because the new UI stage attributes do not exist yet.
vithelo-b2b-site.spec.ts remains green unless existing behavior is already broken.
```

---

### Task 2: Refine content for the three visual master sections

**Files:**
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: Update the hero copy to a quieter premium B2B tone**

In `src/content/demo/vithelo-b2b-home.ts`, replace the current `hero` block values with:

```ts
  hero: {
    eyebrow: "GUMMY-FIRST NUTRITION OEM / ODM",
    title: "Nutrition formats, built for private-label growth.",
    copy:
      "VITHELO is a factory-owned overseas brand and export division for gummy-first nutrition OEM/ODM projects.",
    primaryAction: { label: "Start a Project", href: "/contact" },
    secondaryAction: {
      label: "Explore Formats",
      href: "/products",
    },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      label: "Premium supplement manufacturing atmosphere with copy-safe negative space",
      width: 2560,
      height: 1400,
      format: "WebP",
    },
  },
```

- [ ] **Step 2: Update gummy section copy without adding claims**

In the same file, replace the `gummy` block with:

```ts
  gummy: {
    kicker: "03 · Gummy Expertise",
    title: "A flexible format for daily nutrition brands.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      label: "Real gummy macro asset",
      width: 2400,
      height: 1400,
      format: "WebP",
    },
    features: [
      {
        title: "Formula Direction",
        copy: "Ingredients, serving and use case planned together",
      },
      {
        title: "Shape System",
        copy: "Standard molds or a custom shape route",
      },
      {
        title: "Taste & Texture",
        copy: "Pectin or gelatin, balanced for the formula",
      },
      {
        title: "Color & Flavor",
        copy: "A recognizable expression for the brand",
      },
      {
        title: "Packaging Fit",
        copy: "Bottles, pouches and practical pack sizes",
      },
      { title: "MOQ", copy: "Custom projects from 500 bottles" },
    ],
  },
```

- [ ] **Step 3: Update dosage title while preserving MOQ wording**

Replace only the `dosage.title` value:

```ts
    title: "One manufacturing system, eight product formats.",
```

Keep:

```ts
    qualifier:
      "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
```

Keep all eight MOQ lines unchanged unless the user later approves different wording.

- [ ] **Step 4: Run content validation through typecheck**

Run:

```powershell
pnpm.cmd typecheck
```

Expected result:

```text
exit code 0
```

---

### Task 3: Implement image-led hero and product-direction master styling

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Replace hero synthetic material markup with image-led stage metadata**

In `src/components/patterns/vithelo-b2b-home.tsx`, change the opening hero section to include the data attribute:

```tsx
      <section
        aria-labelledby="hero-title"
        className={styles.hero}
        data-media-status={content.hero.media.status}
        data-ui-stage="image-led-hero"
        id="hero"
      >
```

Remove this decorative block from inside the hero:

```tsx
        <div className={styles.heroMaterial} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
```

Add this decorative image layer immediately after the opening `<section>`:

```tsx
        <div className={styles.heroImageLayer} aria-hidden="true" />
```

- [ ] **Step 2: Add the product directions data attribute at the market stage boundary**

Open `src/components/patterns/vithelo-market-stage.tsx`.

Find the top-level `<section>` for the market stage. Add:

```tsx
data-ui-stage="image-led-product-directions"
```

The final section opening should keep its current ID and accessibility attributes.

- [ ] **Step 3: Update hero CSS to use photographic atmosphere**

In `src/components/patterns/vithelo-b2b-home.module.css`, replace the current `.hero`, `.hero::after`, `.heroMaterial`, and `.heroMaterial span` rules with:

```css
.hero {
  position: relative;
  min-height: clamp(560px, 78svh, 760px);
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #111512;
  color: white;
  isolation: isolate;
}

.hero::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background-image:
    linear-gradient(90deg, rgb(12 15 13 / 82%) 0%, rgb(12 15 13 / 58%) 38%, rgb(12 15 13 / 16%) 72%),
    linear-gradient(180deg, rgb(12 15 13 / 18%), rgb(12 15 13 / 42%)),
    url("/media/b2b/gummies-pexels-14027295.jpg");
  background-size: cover;
  background-position: 62% center;
  transform: scale(1.02);
}

.hero::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  opacity: 0.22;
  pointer-events: none;
  background-image:
    radial-gradient(circle at 18% 28%, rgb(255 255 255 / 30%), transparent 24%),
    linear-gradient(115deg, transparent 0 58%, rgb(255 255 255 / 16%) 58% 58.12%, transparent 58.12% 100%);
  mix-blend-mode: screen;
}

.heroImageLayer {
  position: absolute;
  right: clamp(20px, 6vw, 96px);
  bottom: clamp(22px, 7vh, 72px);
  width: min(38vw, 520px);
  aspect-ratio: 1.12;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 14px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 18%), rgb(255 255 255 / 4%)),
    rgb(255 255 255 / 8%);
  box-shadow: 0 40px 120px rgb(0 0 0 / 28%);
  backdrop-filter: blur(18px);
}
```

- [ ] **Step 4: Refine hero typography to Seed-like restraint**

Replace the current `.hero h1` and `.heroContent > p` rules with:

```css
.hero h1 {
  max-width: 640px;
  margin: 1.25rem 0 0;
  font-size: clamp(2.75rem, 5vw, 4rem);
  font-weight: 480;
  letter-spacing: -0.055em;
  line-height: 0.98;
}

.heroContent > p {
  max-width: 470px;
  margin: 1.25rem 0 0;
  color: rgb(255 255 255 / 78%);
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.45;
}
```

- [ ] **Step 5: Keep mobile hero readable**

In the existing `@media (max-width: 760px)` block, replace the mobile `.hero`, `.heroContent`, `.hero h1`, and `.heroMaterial` rules with:

```css
  .hero {
    min-height: 620px;
    align-items: flex-start;
  }

  .hero::before {
    background-position: 66% center;
  }

  .heroContent {
    padding-top: clamp(6rem, 15vh, 8rem);
  }

  .hero h1 {
    font-size: clamp(2.25rem, 11vw, 3rem);
  }

  .heroImageLayer {
    right: 16px;
    bottom: 24px;
    width: min(58vw, 280px);
    opacity: 0.42;
  }
```

- [ ] **Step 6: Run targeted homepage test**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-premium-ui.spec.ts
```

Expected result:

```text
The hero assertion passes.
The product directions and dosage assertions may still fail until Task 4.
```

---

### Task 4: Rework the eight-format section away from table/card-grid feeling

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Add the dosage section stage attribute**

In `src/components/patterns/vithelo-b2b-home.tsx`, update the dosage section opening:

```tsx
      <section
        aria-labelledby="dosage-title"
        className={`${styles.section} ${styles.dosageSection}`}
        data-layout="desktop-editorial-field"
        data-ui-stage="editorial-format-field"
        id="dosage-forms"
      >
```

- [ ] **Step 2: Give dosage items stable index labels**

Inside the dosage map, replace the `article` opening and inner structure with:

```tsx
            <article
              className={styles.dosageItem}
              data-format={item.name.toLowerCase().replaceAll(" ", "-")}
              data-testid="dosage-item"
              key={item.name}
            >
              <span className={styles.dosageIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div aria-hidden="true" className={styles.dosageShape} data-shape={index + 1} />
              <div className={styles.dosageCopy}>
                <h3>{item.name}</h3>
                <p>{item.moq}</p>
              </div>
            </article>
```

- [ ] **Step 3: Replace dosage layout CSS with editorial field**

In `src/components/patterns/vithelo-b2b-home.module.css`, replace the `.dosageSection`, `.dosageGrid`, `.dosageItem`, `.dosageShape`, `.dosageItem h3`, and `.dosageItem p` rules with:

```css
.dosageSection {
  min-height: clamp(620px, 88svh, 820px);
  padding-block: clamp(52px, 6vh, 78px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:
    radial-gradient(circle at 78% 16%, rgb(255 255 255 / 80%), transparent 28%),
    linear-gradient(135deg, #f6f2e9 0%, #ece7dd 54%, #d9d2c5 100%);
}

.dosageSection .title {
  max-width: 780px;
  font-size: clamp(2rem, 3.2vw, 2.875rem);
}

.dosageGrid {
  position: relative;
  margin-top: clamp(2rem, 5vh, 3.5rem);
  display: grid;
  grid-template-columns: 1.25fr 0.82fr 0.82fr 1fr;
  grid-auto-rows: minmax(124px, auto);
  gap: 1px;
  background: rgb(23 25 24 / 16%);
  border-block: 1px solid var(--line);
}

.dosageGrid::before {
  position: absolute;
  inset: -18px 8% auto auto;
  width: 280px;
  height: 280px;
  content: "";
  border: 1px solid rgb(23 25 24 / 10%);
  border-radius: 50%;
  pointer-events: none;
}

.dosageItem {
  position: relative;
  min-width: 0;
  min-height: 150px;
  padding: clamp(1rem, 2vw, 1.5rem);
  display: grid;
  grid-template-columns: 3rem 1fr;
  grid-template-rows: auto 1fr;
  gap: 0.75rem 1rem;
  background: rgb(250 248 242 / 82%);
}

.dosageItem[data-format="gummies"] {
  grid-row: span 2;
  min-height: 300px;
  background:
    linear-gradient(180deg, rgb(255 255 255 / 50%), rgb(255 255 255 / 12%)),
    rgb(250 248 242 / 88%);
}

.dosageIndex {
  color: rgb(23 25 24 / 48%);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
}

.dosageShape {
  grid-column: 2;
  min-height: clamp(68px, 10vh, 120px);
  background: radial-gradient(circle at 44% 38%, #ffd8a6 0%, #eb6d33 38%, #8f2b20 70%, transparent 72%);
  filter: saturate(0.9);
}

.dosageItem[data-format="gummies"] .dosageShape {
  min-height: clamp(150px, 24vh, 210px);
}

.dosageShape[data-shape="2"],
.dosageShape[data-shape="5"],
.dosageShape[data-shape="8"] {
  background: radial-gradient(ellipse at center, #ffe68a, #c89716 46%, transparent 48%);
}

.dosageShape[data-shape="3"],
.dosageShape[data-shape="6"] {
  background: radial-gradient(ellipse at center, #f2efe6, #aaa79e 49%, transparent 51%);
}

.dosageShape[data-shape="4"],
.dosageShape[data-shape="7"] {
  background: linear-gradient(135deg, transparent 28%, #eee9df 29% 68%, transparent 69%);
}

.dosageCopy {
  grid-column: 1 / -1;
  align-self: end;
}

.dosageCopy h3 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.125rem, 1.7vw, 1.5rem);
  font-weight: 540;
  letter-spacing: -0.025em;
}

.dosageCopy p {
  max-width: 22ch;
  margin: 0;
  color: var(--muted);
  font-size: 0.875rem;
}
```

- [ ] **Step 4: Add tablet and mobile dosage fallbacks**

Inside `@media (max-width: 900px)`, add:

```css
  .dosageGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dosageItem[data-format="gummies"] {
    grid-row: span 1;
  }
```

Inside `@media (max-width: 760px)`, add:

```css
  .dosageSection {
    min-height: auto;
  }

  .dosageGrid {
    grid-template-columns: 1fr;
  }

  .dosageItem,
  .dosageItem[data-format="gummies"] {
    min-height: 180px;
  }
```

- [ ] **Step 5: Run the premium UI tests**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-premium-ui.spec.ts
```

Expected result:

```text
exit code 0
```

---

### Task 5: Validate Phase 1 without disturbing unrelated work

**Files:**
- No new files required.
- Verify existing changes only.

- [ ] **Step 1: Run lint**

Run:

```powershell
pnpm.cmd lint
```

Expected result:

```text
exit code 0
```

- [ ] **Step 2: Run typecheck**

Run:

```powershell
pnpm.cmd typecheck
```

Expected result:

```text
exit code 0
```

- [ ] **Step 3: Run unit tests**

Run:

```powershell
pnpm.cmd test
```

Expected result:

```text
exit code 0
```

- [ ] **Step 4: Run focused e2e tests**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-b2b-site.spec.ts tests/e2e/vithelo-premium-ui.spec.ts
```

Expected result:

```text
exit code 0
```

- [ ] **Step 5: Run production build**

Run:

```powershell
pnpm.cmd build
```

Expected result:

```text
exit code 0
```

- [ ] **Step 6: Check local preview routes**

Start or keep the local server running:

```powershell
pnpm.cmd dev --hostname 127.0.0.1 --port 3000
```

In another shell, run:

```powershell
foreach ($path in '/', '/products', '/oem-odm', '/insights', '/contact') { try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:3000$path" -UseBasicParsing -TimeoutSec 20; "$path $($r.StatusCode)" } catch { "$path ERROR $($_.Exception.Message)" } }
```

Expected result:

```text
/ 200
/products 200
/oem-odm 200
/insights 200
/contact 200
```

- [ ] **Step 7: Confirm frozen HTML reference was not modified**

Run:

```powershell
git diff -- vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html
```

Expected result:

```text
No output.
```

- [ ] **Step 8: Review changed files before commit**

Run:

```powershell
git status --short
git diff --stat
```

Expected result:

```text
Only Phase 1 files are modified or created:
src/content/demo/vithelo-b2b-home.ts
src/components/patterns/vithelo-b2b-home.tsx
src/components/patterns/vithelo-market-stage.tsx
src/components/patterns/vithelo-b2b-home.module.css
tests/e2e/vithelo-b2b-site.spec.ts
tests/e2e/vithelo-premium-ui.spec.ts
```

- [ ] **Step 9: Commit Phase 1 implementation**

Run:

```powershell
git add -- src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-market-stage.tsx src/components/patterns/vithelo-b2b-home.module.css tests/e2e/vithelo-b2b-site.spec.ts tests/e2e/vithelo-premium-ui.spec.ts
git commit -m "feat: refine VITHELO premium homepage masters"
```

Expected result:

```text
One commit containing only the Phase 1 implementation.
```

## Self-review

- Spec coverage: This plan covers the approved Phase 1 master sections from `docs/superpowers/specs/2026-08-30-vithelo-premium-ui-system-design.md`: Hero, Product Directions, and Eight Product Formats.
- Scope control: The plan does not touch backend integrations, contact configuration, route architecture, generated image creation, or the frozen standalone HTML preview.
- Placeholder scan: The plan contains no incomplete implementation placeholders. Existing `NOT_CONFIGURED` product behavior remains intentional and outside this Phase 1 UI change.
- Type consistency: The planned data attributes are stable: `image-led-hero`, `image-led-product-directions`, and `editorial-format-field`.
- Risk: The plan uses the existing free Pexels gummy image as a temporary visual atmosphere. This improves the current demo feel but does not replace the later need for a proper free-stock asset set or real VITHELO photography.
