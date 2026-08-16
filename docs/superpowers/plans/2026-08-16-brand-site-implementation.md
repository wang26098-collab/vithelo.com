# Nutrition × Aesthetic Technology Brand Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the V6.1-compliant, responsive, accessible high-fidelity demo for the unified Nutrition × Aesthetic Technology brand site.

**Architecture:** Use a Next.js App Router application whose CSS and motion tokens feed shared core components, domain components, and controlled page patterns. All product, science, safety, and professional content comes from Zod-validated `DEMO_ONLY` fixtures behind provider-neutral adapter interfaces; pages never own product facts.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, shadcn/Radix primitives, Motion, Zod, Vitest, Testing Library, Playwright, axe-core.

---

## File map

- `package.json` — scripts and dependency contract.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` — framework and quality configuration.
- `src/app/*` — route entry points only; each route delegates to a page pattern.
- `src/styles/tokens.css`, `src/app/globals.css` — A-Prime design/motion tokens and global primitives.
- `src/components/core/*` — reusable navigation, action, form, disclosure, feedback, search, and sticky behavior.
- `src/components/domain/*` — schema-driven Product, Formula, Technology, Evidence, Safety, and Professional UI.
- `src/components/motion/*` — shared Reveal, MembraneReveal, ScaleShift, and VisualSwitcher primitives.
- `src/components/patterns/*` — Home, Landing, PDP, Science, Professional, and Utility compositions.
- `src/content/schema.ts`, `src/content/demo/*` — content contracts and visibly marked demo fixtures.
- `src/lib/content.ts`, `src/lib/adapters/*` — validated content access and future CMS/Commerce boundaries.
- `tests/unit/*`, `tests/e2e/*` — component, schema, accessibility, responsive, and journey checks.
- `docs/*` and `AGENTS.md` — durable V6.1 constraints and acceptance guidance.

## Task 1: Establish the TypeScript web baseline

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Add the package and quality contracts**

Create `package.json` with these scripts and dependency families:

```json
{
  "name": "a-prime-brand-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "@phosphor-icons/react": "^2.1.10",
    "motion": "^13.1.0",
    "next": "^16.3.1",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwind-merge": "^3.3.1",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.62.1",
    "@tailwindcss/postcss": "^4.3.3",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^24.0.0",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "eslint": "^9.39.1",
    "eslint-config-next": "^16.3.1",
    "jsdom": "^26.1.0",
    "tailwindcss": "^4.3.3",
    "typescript": "^5.9.3",
    "vitest": "^4.1.10"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `pnpm.cmd install`  
Expected: lockfile created and install exits with code 0.

- [ ] **Step 3: Add a minimal failing smoke test**

Create `tests/unit/app-shell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the temporary wordmark and demo disclosure", () => {
  render(<HomePage />);
  expect(screen.getByText("A PRIME")).toBeInTheDocument();
  expect(screen.getByText(/demonstration content/i)).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the smoke test and confirm failure**

Run: `pnpm.cmd test -- tests/unit/app-shell.test.tsx`  
Expected: FAIL because the page shell and test configuration do not exist yet.

- [ ] **Step 5: Add framework, Vitest, and minimal app configuration**

Configure `@/*` to map to `src/*`, use jsdom in Vitest, import `@testing-library/jest-dom/vitest`, and create a root layout with English metadata plus a body containing `HomePage`. The initial page must render `A PRIME` and `Demonstration content - not a production product or claim.`. Add the approved direction contract as the first rendered body comment and preserve it in the production build.

- [ ] **Step 6: Verify the baseline**

Run: `pnpm.cmd test -- tests/unit/app-shell.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd typecheck`  
Expected: exits with code 0.  
Run: `pnpm.cmd build`  
Expected: Next.js production build completes.

- [ ] **Step 7: Commit**

```powershell
git add package.json pnpm-lock.yaml tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts src/app tests/unit/app-shell.test.tsx
git commit -m "chore: establish Next.js quality baseline"
```

## Task 2: Encode the A-Prime token system

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/app/globals.css`
- Create: `src/lib/cn.ts`
- Create: `tests/unit/tokens.test.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the token contract test**

```ts
import { readFileSync } from "node:fs";

it("defines the locked A-Prime token families", () => {
  const css = readFileSync("src/styles/tokens.css", "utf8");
  for (const token of ["--color-ivory", "--color-graphite", "--color-titanium", "--space-4", "--space-160", "--motion-fast", "--motion-immersive", "--container-standard", "--focus-ring"]) {
    expect(css).toContain(token);
  }
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `pnpm.cmd test -- tests/unit/tokens.test.ts`  
Expected: FAIL with missing `src/styles/tokens.css`.

- [ ] **Step 3: Implement tokens and global foundations**

Define the 4px spacing scale `4/8/12/16/20/24/32/40/48/64/80/96/120/160`, Ivory/Graphite/Titanium neutrals, a restrained optical accent, 0/4/8/12 radii, standard/reading/form/data containers, 13–80px typography roles, P1–P4 sticky z-index, visible focus, and Fast/Standard/Narrative/Immersive motion values. Set body to Ivory/Graphite, avoid default card shadows, and add reusable `.container-standard`, `.container-reading`, `.section-space`, `.demo-disclosure`, and `.sr-only` utilities.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/tokens.test.ts`  
Expected: PASS.  
Run: `pnpm.cmd lint && pnpm.cmd typecheck`  
Expected: both exit with code 0.

```powershell
git add src/styles src/app/layout.tsx src/lib/cn.ts tests/unit/tokens.test.ts
git commit -m "feat: encode A-Prime design and motion tokens"
```

## Task 3: Build validated DEMO_ONLY content contracts

**Files:**
- Create: `src/content/schema.ts`
- Create: `src/content/demo/products.ts`
- Create: `src/content/demo/evidence.ts`
- Create: `src/content/demo/professional.ts`
- Create: `src/lib/content.ts`
- Create: `src/lib/adapters/content-adapter.ts`
- Create: `src/lib/adapters/commerce-adapter.ts`
- Create: `tests/unit/content-schema.test.ts`

- [ ] **Step 1: Write failing schema tests**

```ts
import { demoProducts } from "@/content/demo/products";
import { ProductSchema } from "@/content/schema";

it("marks every fixture and record as DEMO_ONLY", () => {
  expect(demoProducts.mode).toBe("DEMO_ONLY");
  for (const product of demoProducts.items) {
    expect(ProductSchema.parse(product).dataStatus).toBe("DEMO_ONLY");
  }
});

it("keeps safety visible when configuration is missing", () => {
  const nutrition = demoProducts.items.find((item) => item.kind === "nutrition");
  expect(nutrition?.safety.status).toBe("NOT_CONFIGURED");
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/content-schema.test.ts`  
Expected: FAIL because schemas and fixtures are absent.

- [ ] **Step 3: Implement the contracts**

Create discriminated Zod schemas for `NutritionProduct` and `DeviceProduct`, plus `Formula`, `Ingredient`, `Technology`, `Evidence`, `Safety`, `Capability`, and `MarketConfiguration`. Every product must contain `id`, `slug`, `kind`, `dataStatus: "DEMO_ONLY"`, `name`, `descriptor`, `media`, `commerce`, `safety`, and relationship IDs. Use neutral copy such as `Demo Daily Formula`, `Demo Precision Device`, `Price not configured`, and `Safety details require approved product input`; do not include dosage, efficacy, certification, or device-performance claims.

Define `ContentAdapter` read methods and `CommerceAdapter` price/cart methods. Local demo adapters must return validated fixtures and explicit `NOT_CONFIGURED` commerce states.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/content-schema.test.ts`  
Expected: PASS.  
Run: `pnpm.cmd typecheck`  
Expected: exits with code 0.

```powershell
git add src/content src/lib/content.ts src/lib/adapters tests/unit/content-schema.test.ts
git commit -m "feat: add validated demo content contracts"
```

## Task 4: Build accessible core components and navigation

**Files:**
- Create: `src/components/core/button.tsx`
- Create: `src/components/core/site-header.tsx`
- Create: `src/components/core/mega-menu.tsx`
- Create: `src/components/core/mobile-menu.tsx`
- Create: `src/components/core/state-panel.tsx`
- Create: `src/components/core/demo-disclosure.tsx`
- Create: `src/components/core/sticky-resource.tsx`
- Create: `tests/unit/site-header.test.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the navigation behavior test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/core/site-header";

it("exposes the five locked primary destinations and an accessible mobile menu", () => {
  render(<SiteHeader />);
  for (const label of ["Nutrition", "Aesthetic Technology", "By Need", "Science", "Professional"]) {
    expect(screen.getAllByRole("link", { name: label })[0]).toBeVisible();
  }
  fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
  expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/site-header.test.tsx`  
Expected: FAIL because `SiteHeader` is absent.

- [ ] **Step 3: Implement shared components**

Build one button source with primary/secondary/text/icon hierarchy and default/hover/focus/pressed/loading/disabled states. Build a desktop header and Mega Menu around the five locked primary routes, with Journal/About secondary and Search/Account/Cart utility. Build the mobile menu as a Radix Dialog with focus trapping, Escape close, 44px targets, and no brand-heavy animation. Add `StatePanel`, `DemoDisclosure`, and a P1–P4-aware `StickyResource` that pauses when a dialog is open.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/site-header.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd lint && pnpm.cmd typecheck`  
Expected: both pass.

```powershell
git add src/components/core src/app/layout.tsx tests/unit/site-header.test.tsx
git commit -m "feat: add accessible navigation and core UI"
```

## Task 5: Implement shared motion primitives

**Files:**
- Create: `src/components/motion/reveal.tsx`
- Create: `src/components/motion/membrane-reveal.tsx`
- Create: `src/components/motion/scale-shift.tsx`
- Create: `src/components/motion/visual-switcher.tsx`
- Create: `src/hooks/use-reduced-motion.ts`
- Create: `tests/unit/visual-switcher.test.tsx`

- [ ] **Step 1: Write the reduced-motion and keyboard test**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { VisualSwitcher } from "@/components/motion/visual-switcher";

it("switches facts by keyboard without hiding inactive text from the document", () => {
  render(<VisualSwitcher label="Demo formula" items={[{ id: "a", label: "Structure", content: "Approved-data slot A" }, { id: "b", label: "Use", content: "Approved-data slot B" }]} />);
  fireEvent.keyDown(screen.getByRole("tab", { name: "Use" }), { key: "Enter" });
  expect(screen.getByText("Approved-data slot B")).toBeVisible();
  expect(screen.getByText("Approved-data slot A")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/visual-switcher.test.tsx`  
Expected: FAIL because motion primitives are absent.

- [ ] **Step 3: Implement semantic motion only**

Build Reveal and MediaReveal with one-time viewport entry, MembraneReveal with a static fallback, ScaleShift that disables transform under reduced motion, and VisualSwitcher using tabs with click/keyboard support. All primitives must accept an explicit `intent` union of `ORIENT | RELATE | EXPLAIN | FOCUS | CONFIRM`; no arbitrary duration prop is allowed. Inactive facts remain in accessible document order.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/visual-switcher.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd typecheck`  
Expected: exits with code 0.

```powershell
git add src/components/motion src/hooks tests/unit/visual-switcher.test.tsx
git commit -m "feat: add semantic motion primitives"
```

## Task 6: Build Home and the two differentiated landing pages

**Files:**
- Create: `src/components/patterns/home-page.tsx`
- Create: `src/components/patterns/nutrition-landing.tsx`
- Create: `src/components/patterns/aesthetic-landing.tsx`
- Create: `src/components/domain/product-card.tsx`
- Create: `src/app/nutrition/page.tsx`
- Create: `src/app/aesthetic-technology/page.tsx`
- Modify: `src/app/page.tsx`
- Create: `tests/unit/landing-recognition.test.tsx`

- [ ] **Step 1: Write the mid-page recognition test**

```tsx
import { render, screen } from "@testing-library/react";
import { NutritionLanding } from "@/components/patterns/nutrition-landing";
import { AestheticLanding } from "@/components/patterns/aesthetic-landing";

it("keeps the two product worlds recognizable without color-channel theming", () => {
  const { rerender } = render(<NutritionLanding />);
  expect(screen.getByText(/formulation precision/i)).toBeVisible();
  expect(screen.getByText(/daily practice/i)).toBeVisible();
  rerender(<AestheticLanding />);
  expect(screen.getByText(/complete device/i)).toBeVisible();
  expect(screen.getByText(/skin interface/i)).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/landing-recognition.test.tsx`  
Expected: FAIL because page patterns do not exist.

- [ ] **Step 3: Implement the three page patterns**

Home must implement Brand Promise, Two Product Worlds, By Need, Signature Method, Featured Products, Science & Proof, and Professional Gateway, with one MembraneReveal and no more than two narrative/relational moments. Nutrition must use editorial product rhythm, soft material surfaces, formula preview, daily humanity, and quality. Aesthetic must use an engineering rhythm, complete device silhouette, application, technology, skin interface, safety, and professional entry. Do not reuse one full-screen composition across the three routes.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/landing-recognition.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd build`  
Expected: `/`, `/nutrition`, and `/aesthetic-technology` are generated successfully.

```powershell
git add src/app/page.tsx src/app/nutrition src/app/aesthetic-technology src/components/patterns src/components/domain/product-card.tsx tests/unit/landing-recognition.test.tsx
git commit -m "feat: build brand and product-world landing pages"
```

## Task 7: Build commerce-first Nutrition and Device PDPs

**Files:**
- Create: `src/components/domain/product-commerce.tsx`
- Create: `src/components/domain/formula-snapshot.tsx`
- Create: `src/components/domain/technology-story.tsx`
- Create: `src/components/domain/safety-panel.tsx`
- Create: `src/components/patterns/nutrition-pdp.tsx`
- Create: `src/components/patterns/device-pdp.tsx`
- Create: `src/app/nutrition/[slug]/page.tsx`
- Create: `src/app/aesthetic-technology/[slug]/page.tsx`
- Create: `tests/unit/pdp-priority.test.tsx`

- [ ] **Step 1: Write the commerce and safety priority tests**

```tsx
import { render, screen } from "@testing-library/react";
import { NutritionPdp } from "@/components/patterns/nutrition-pdp";
import { DevicePdp } from "@/components/patterns/device-pdp";
import { demoProducts } from "@/content/demo/products";

it.each([["nutrition", NutritionPdp], ["device", DevicePdp]] as const)("keeps %s commerce and critical safety visible", (kind, Pattern) => {
  const product = demoProducts.items.find((item) => item.kind === kind)!;
  render(<Pattern product={product as never} />);
  expect(screen.getByRole("heading", { name: product.name })).toBeVisible();
  expect(screen.getByText(/price not configured/i)).toBeVisible();
  expect(screen.getByRole("button", { name: /add to cart|start inquiry/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /safety/i })).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/pdp-priority.test.tsx`  
Expected: FAIL because PDP patterns are absent.

- [ ] **Step 3: Implement schema-driven PDPs**

Nutrition order: Hero/Commerce, At a Glance, Formula VisualSwitcher, Form/Human Use, How to Use, Evidence, Quality/Safety, Continue. Device order: Hero/Commerce, What It Does, Technology VisualSwitcher, Engineering, Human Interface, How to Use, Modes when present, Safety, Specs/Ownership, Continue. Add a mobile P1 sticky action; it must pause under dialogs and never cover Safety. Missing price, warranty, usage, and policy fields render explicit `Not configured` states.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/pdp-priority.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd typecheck && pnpm.cmd build`  
Expected: both dynamic PDP routes build with demo static params.

```powershell
git add src/components/domain src/components/patterns/nutrition-pdp.tsx src/components/patterns/device-pdp.tsx src/app/nutrition src/app/aesthetic-technology tests/unit/pdp-priority.test.tsx
git commit -m "feat: add commerce-first nutrition and device PDPs"
```

## Task 8: Build Science and Professional task systems

**Files:**
- Create: `src/components/domain/evidence-card.tsx`
- Create: `src/components/domain/capability-card.tsx`
- Create: `src/components/domain/project-intake.tsx`
- Create: `src/components/patterns/science-page.tsx`
- Create: `src/components/patterns/professional-page.tsx`
- Create: `src/app/science/page.tsx`
- Create: `src/app/professional/page.tsx`
- Create: `tests/unit/trust-business.test.tsx`

- [ ] **Step 1: Write the evidence and intent tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { SciencePage } from "@/components/patterns/science-page";
import { ProfessionalPage } from "@/components/patterns/professional-page";

it("reveals evidence scope and limitation without converting it into a claim", () => {
  render(<SciencePage />);
  fireEvent.click(screen.getByRole("button", { name: /view source context/i }));
  expect(screen.getByText(/scope/i)).toBeVisible();
  expect(screen.getByText(/limitations/i)).toBeVisible();
});

it("starts professional intake from a business intent", () => {
  render(<ProfessionalPage />);
  fireEvent.click(screen.getByRole("button", { name: /develop a product/i }));
  expect(screen.getByRole("heading", { name: /project basics/i })).toBeVisible();
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/trust-business.test.tsx`  
Expected: FAIL because Science and Professional patterns are absent.

- [ ] **Step 3: Implement distinct trust and business compositions**

Science must use reading/search/evidence structure: Hero, Approach, Nutrition Science, Aesthetic Science, Libraries, Evidence, Quality/Safety. Evidence disclosure shows type, source placeholder, scope, supported statement boundary, and limitation. Professional must use Hero, four Business Intents, at most six capabilities, Product Worlds for Business, Discover/Develop/Deliver process, Quality/Manufacturing proof, and Project Intake. OEM/ODM and Private Label must differ within the first interaction.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/trust-business.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd build`  
Expected: `/science` and `/professional` build.

```powershell
git add src/components/domain src/components/patterns/science-page.tsx src/components/patterns/professional-page.tsx src/app/science src/app/professional tests/unit/trust-business.test.tsx
git commit -m "feat: add science trust and professional intake paths"
```

## Task 9: Add utility routes and complete system states

**Files:**
- Create: `src/components/patterns/utility-page.tsx`
- Create: `src/app/search/page.tsx`
- Create: `src/app/cart/page.tsx`
- Create: `src/app/checkout/page.tsx`
- Create: `src/app/account/page.tsx`
- Create: `src/app/support/page.tsx`
- Create: `src/app/loading.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/not-found.tsx`
- Create: `tests/unit/system-states.test.tsx`

- [ ] **Step 1: Write the state completeness test**

```tsx
import { render, screen } from "@testing-library/react";
import { StatePanel } from "@/components/core/state-panel";

it.each(["loading", "empty", "error", "success", "missing-configuration"] as const)("renders a recoverable %s state", (state) => {
  render(<StatePanel state={state} title={`Demo ${state}`} actionLabel="Return to home" actionHref="/" />);
  expect(screen.getByRole("heading", { name: `Demo ${state}` })).toBeVisible();
  expect(screen.getByRole("link", { name: "Return to home" })).toHaveAttribute("href", "/");
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm.cmd test -- tests/unit/system-states.test.tsx`  
Expected: FAIL until `StatePanel` supports the full union.

- [ ] **Step 3: Implement task-first utilities**

Search groups demo results by Product, Ingredient/Technology, Professional, Support, and Journal intent. Cart renders Transaction Clarity with one restrained related item. Checkout uses Transaction Mode Header and `Payment not configured`; no brand story or editorial content. Account includes Orders, Saved, Addresses, Support and conditionally owned product areas. Support starts with Track Order, Nutrition Help, Device Support, Returns, Warranty, Professional Support. Add global loading/error/not-found pages using the shared StatePanel.

- [ ] **Step 4: Verify and commit**

Run: `pnpm.cmd test -- tests/unit/system-states.test.tsx`  
Expected: PASS.  
Run: `pnpm.cmd build`  
Expected: all utility routes build.

```powershell
git add src/components/patterns/utility-page.tsx src/app/search src/app/cart src/app/checkout src/app/account src/app/support src/app/loading.tsx src/app/error.tsx src/app/not-found.tsx tests/unit/system-states.test.tsx
git commit -m "feat: complete utility routes and system states"
```

## Task 10: Add responsive, accessibility, and journey QA

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/core-journeys.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `tests/e2e/accessibility.spec.ts`
- Create: `tests/e2e/demo-integrity.spec.ts`

- [ ] **Step 1: Write failing browser journey checks**

```ts
import { expect, test } from "@playwright/test";

test("brand orientation reaches both product worlds and professional", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Nutrition" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Aesthetic Technology" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Professional" }).first()).toBeVisible();
});

test("demo facts are visibly disclosed", async ({ page }) => {
  await page.goto("/nutrition/demo-daily-formula");
  await expect(page.getByText(/demonstration content/i)).toBeVisible();
  await expect(page.getByText(/price not configured/i)).toBeVisible();
});
```

- [ ] **Step 2: Run and record failures**

Run: `pnpm.cmd exec playwright install chromium`  
Expected: Chromium installed.  
Run: `pnpm.cmd test:e2e`  
Expected: initial failures identify route, focus, responsive, or copy mismatches.

- [ ] **Step 3: Complete the QA matrix**

Configure Playwright projects for 1440×1000, 1280×900, 1024×768, 768×1024, 390×844, and 375×812. Add checks for header/mobile navigation, both PDP CTAs and Safety, Science return links, Professional intent branching, Search and Cart, focus visibility, 44px targets, no horizontal overflow, reduced-motion static content, and absence of unmarked claims/credentials. Fix only defects found by these checks.

- [ ] **Step 4: Run the complete quality gate**

Run: `pnpm.cmd lint`  
Expected: zero errors.  
Run: `pnpm.cmd typecheck`  
Expected: zero errors.  
Run: `pnpm.cmd test`  
Expected: all unit tests pass.  
Run: `pnpm.cmd test:e2e`  
Expected: all configured browser projects pass.  
Run: `pnpm.cmd build`  
Expected: production build succeeds.

- [ ] **Step 5: Commit**

```powershell
git add playwright.config.ts tests/e2e src
git commit -m "test: enforce responsive and accessible core journeys"
```

## Task 11: Perform visual QA against V6.1 and the Seed benchmark

**Files:**
- Create: `docs/visual-qa.md`
- Modify: only files with observed P0/P1 visual defects

- [ ] **Step 1: Capture the required viewport set**

Run the app with `pnpm.cmd dev`, then capture full-page screenshots for the seven core pages at 1440, 1024, 768, 390, and 375 widths. Save review artifacts outside `src` so they cannot ship as site assets.

- [ ] **Step 2: Review every screenshot with the locked checklist**

Record PASS/FAIL for: Logo-off recognition, Home/Nutrition/Aesthetic differentiation, no repeated left-copy/right-image/three-card template, Commerce-first PDP, visible Safety, Science/Professional differentiation, restrained Membrane/Card/shadow use, no green Nutrition or blue Device channel theme, stable Mobile Sticky, and no clipping/overlap.

- [ ] **Step 3: Fix P0/P1 defects and rerun screenshots**

For each failure, document route, viewport, requirement, observed issue, changed file, and passing recheck in `docs/visual-qa.md`. Do not refactor unrelated files.

- [ ] **Step 4: Commit**

```powershell
git add docs/visual-qa.md src
git commit -m "fix: resolve V6.1 visual QA blockers"
```

## Task 12: Add durable repository guidance and final acceptance

**Files:**
- Create: `AGENTS.md`
- Create: `docs/brand-system.md`
- Create: `docs/design-system.md`
- Create: `docs/content-model.md`
- Create: `docs/page-patterns.md`
- Create: `docs/data-governance.md`
- Create: `docs/motion-system.md`
- Create: `docs/acceptance.md`
- Create: `docs/missing-production-inputs.md`

- [ ] **Step 1: Write durable guidance from the approved spec**

`AGENTS.md` must list repo structure, commands, Hard Locks, Do-not rules, Definition of Done, and links to the focused docs. The focused docs must restate the implemented token/component/schema/page/motion contracts without inventing business facts. `docs/missing-production-inputs.md` must list brand identity, real SKU/device inputs, approved science/claims, market/locale, commerce/CMS/CRM, media, and policy gaps.

- [ ] **Step 2: Verify documentation against code**

Run: `rg -n "HUMAN × MATERIAL × PRECISION|DEMO_ONLY|Reduced Motion|P0|P1" AGENTS.md docs src`  
Expected: each principle appears in guidance and corresponding implementation.  
Run: `rg -n "FDA|clinically proven|certified|guaranteed|approved device" src/content/demo`  
Expected: no unapproved factual or regulatory claim matches.

- [ ] **Step 3: Run the final acceptance gate**

Run: `pnpm.cmd lint && pnpm.cmd typecheck && pnpm.cmd test && pnpm.cmd test:e2e && pnpm.cmd build`  
Expected: all commands exit with code 0 and no known P0/P1 issue remains.

- [ ] **Step 4: Commit**

```powershell
git add AGENTS.md docs src tests package.json pnpm-lock.yaml
git commit -m "docs: finalize V6.1 implementation guidance"
```

## Execution order and stopping rules

Execute Tasks 1–12 in order. Do not begin a page task before its token, schema, core component, and motion dependencies pass. If real brand/product inputs arrive, add them only through validated schemas and approved assets; do not replace demo content opportunistically. Stop production claims, payment, inquiry sending, or deployment until the corresponding user authorization and verified inputs exist.
