# VITHELO Editorial Typography and Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace oversized homepage typography and generic regional copy with the approved Seed-calibrated editorial hierarchy and restrained international B2B language.

**Architecture:** Keep the existing eleven-section component tree and interactions unchanged. Update public language only through the validated `vitheloB2BHome` content record, update page-scoped typography only in the homepage CSS module, and protect both changes with unit and Playwright assertions.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Zod, Vitest, Testing Library, Playwright

---

## File map

- Modify `src/content/demo/vithelo-b2b-home.ts`: approved public homepage copy and labels.
- Modify `src/components/patterns/vithelo-b2b-home.module.css`: Seed-calibrated heading, supporting-copy, and mobile type sizes.
- Modify `src/app/page.tsx`: approved non-regional metadata.
- Modify `tests/unit/vithelo-b2b-home-content.test.ts`: non-regional copy and approved-copy contract.
- Modify `tests/unit/vithelo-b2b-home.test.tsx`: rendered hero-copy expectation.
- Modify `tests/e2e/responsive.spec.ts`: computed typography limits at desktop and mobile widths.
- Verify `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`: hash remains frozen.

No component split, schema change, route change, image work, form integration, Git commit, Git push, or Hostinger deployment belongs to this plan.

### Task 1: Lock the approved copy contract

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: Add the failing content assertions**

Add this test to `tests/unit/vithelo-b2b-home-content.test.ts`:

```ts
it("uses restrained international copy without direct American-market targeting", () => {
  const publicContent = JSON.stringify(vitheloB2BHome);

  expect(vitheloB2BHome.hero.title).toBe(
    "Your nutrition product, from first brief to finished batch.",
  );
  expect(vitheloB2BHome.gummy.title).toBe(
    "Gummies give your brand room to be distinctive.",
  );
  expect(vitheloB2BHome.dosage.title).toBe("One factory. Eight product formats.");
  expect(vitheloB2BHome.contact.title).toBe("Tell us what you want to make.");
  expect(publicContent).not.toMatch(
    /\b(?:U\.S\.|USA|United States|American|America)\b/i,
  );
});
```

Replace the hero heading expectation in `tests/unit/vithelo-b2b-home.test.tsx` with:

```ts
expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
  "Your nutrition product, from first brief to finished batch.",
);
```

- [ ] **Step 2: Run the focused unit tests and verify RED**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL because the current hero title starts with `Build Your Next` and the current supporting copy contains `U.S.`.

### Task 2: Apply the approved homepage copy

**Files:**
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: Replace public copy through the validated content record**

Use the exact strings in `docs/superpowers/specs/2026-08-26-vithelo-editorial-typography-copy-design.md`, including these section-title values:

```ts
hero.title = "Your nutrition product, from first brief to finished batch.";
gummy.title = "Gummies give your brand room to be distinctive.";
market.title = "Products shaped around real consumer routines.";
dosage.title = "One factory. Eight product formats.";
development.title = "A formula has to work on paper and on the line.";
manufacturing.title = "Development and production under one manufacturing system.";
quality.title = "Quality recorded at every stage.";
runway.title = "Six clear steps from brief to delivery.";
channels.title = "Built for brands, sellers and retail teams.";
contact.title = "Tell us what you want to make.";
```

Use the exact approved hero content:

```ts
hero: {
  eyebrow: "GUMMY-FIRST NUTRITION OEM / ODM",
  title: "Your nutrition product, from first brief to finished batch.",
  copy:
    "VITHELO develops and manufactures gummies and seven other oral formats, with formula, sampling, packaging and production managed in one system.",
  primaryAction: { label: "Start a Project", href: "#contact" },
  secondaryAction: { label: "Explore Formats", href: "#dosage-forms" },
  // Keep the existing media requirement unchanged.
},
```

Keep every number, MOQ value, media requirement, section ID, `DEMO_ONLY` marker, and `NOT_CONFIGURED` state byte-for-byte unchanged.

- [ ] **Step 2: Run the focused unit tests and verify GREEN**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: both files pass.

### Task 3: Lock the Seed-calibrated typography limits

**Files:**
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Add the failing computed-style test**

Add:

```ts
test("homepage headings use the approved editorial scale", async ({ page, viewport }) => {
  await page.goto("/");

  const heroSize = await page.locator("#hero h1").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  const sectionSize = await page.locator("#gummy-stage h2").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );

  expect(heroSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 44 : 48);
  expect(sectionSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 52 : 64);

  if (viewport && viewport.width > 760) {
    const marketStorySize = await page
      .getByTestId("market-story")
      .first()
      .getByRole("heading", { level: 3 })
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(marketStorySize).toBeLessThanOrEqual(56);
  }
});
```

- [ ] **Step 2: Run the typography test and verify RED**

Run:

```powershell
pnpm.cmd test:e2e --project=desktop-1440 --grep "approved editorial scale"
```

Expected: FAIL because the current desktop hero reaches 64px and primary section titles exceed 64px.

### Task 4: Apply the editorial typography scale

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Replace the oversized desktop rules**

Use:

```css
.heroContent > * { max-width: 620px; }
.hero h1 {
  margin: 1.25rem 0 0;
  max-width: 620px;
  font-size: clamp(2.5rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.08;
}
.heroContent > p {
  max-width: 460px;
  margin: 1.25rem 0 0;
  color: rgb(255 255 255 / 86%);
  font-size: 1rem;
  line-height: 1.4;
}
.heroActions { margin-top: 2rem; }
.title {
  max-width: 960px;
  margin: 0;
  font-size: clamp(2.5rem, 4.6vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 1;
  text-wrap: balance;
}
.copy {
  max-width: 680px;
  margin: 1.25rem 0 0;
  color: var(--muted);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.45;
}
.marketStage .title,
.dosageSection .title {
  font-size: clamp(2.5rem, 4.6vw, 4rem);
}
.marketStory h3 {
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  line-height: 1;
}
```

- [ ] **Step 2: Replace the mobile overrides**

Inside `@media (max-width: 760px)`, use:

```css
.hero h1 { font-size: clamp(2.25rem, 10vw, 2.75rem); }
.title { font-size: clamp(2.25rem, 10vw, 3.25rem); line-height: 1; }
```

- [ ] **Step 3: Run responsive tests and verify GREEN**

Run:

```powershell
pnpm.cmd test:e2e --grep "approved editorial scale|B2B hero keeps|desktop navigation and hero fit"
```

Expected: typography, hero containment, and compact-height checks pass at all six configured viewports.

### Task 5: Update metadata and verify all boundaries

**Files:**
- Modify: `src/app/page.tsx`
- Verify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`

- [ ] **Step 1: Apply the approved metadata**

```ts
export const metadata: Metadata = {
  title: "VITHELO | Nutrition OEM ODM Manufacturing Partner",
  description:
    "Gummy-first nutrition OEM and ODM manufacturing across gummies, capsules, tablets, powders, liquids, functional gum and oral films.",
};
```

- [ ] **Step 2: Run the full verification sequence**

Run:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
node --test vithelo-homepage-work/tests/*.test.mjs
pnpm.cmd build
```

Expected: every command exits `0`; conditional Playwright skips remain project-specific rather than failures.

- [ ] **Step 3: Verify the frozen preview hash**

Run:

```powershell
(Get-FileHash -Algorithm SHA256 -LiteralPath 'vithelo-homepage-work\VITHELO_Homepage_FullPreview_V1.html').Hash
```

Expected:

```text
CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649
```

- [ ] **Step 4: Restore the independent local preview**

Run:

```powershell
pnpm.cmd dev --hostname 127.0.0.1 --port 3000
```

Expected: `http://127.0.0.1:3000/` returns `200`; Hostinger remains unchanged because this plan does not commit or push.
