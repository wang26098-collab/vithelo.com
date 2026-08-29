# VITHELO Next.js Homepage Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the production Next.js `/` route with the approved English eleven-section VITHELO B2B homepage while preserving the standalone HTML reference and every non-home route.

**Architecture:** Keep `src/app/page.tsx` as a Server Component that renders validated demo content through a focused homepage pattern. Keep all static sections server-rendered, isolate the bounded market-stage behavior in one Client Component, and isolate pathname-dependent global chrome in one small Client Component. Scope all visual rules to one CSS Module so the existing route system cannot inherit the preview styling.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Zod 4, CSS Modules, Vitest/Testing Library, Playwright.

---

## File map

- Create `src/content/demo/vithelo-b2b-home.ts`: validated copy and configuration state for the eleven sections.
- Modify `src/content/schema.ts`: minimum Zod contract and inferred type for the new homepage record.
- Create `src/components/core/route-shell.tsx`: pathname-aware visibility boundary for the existing global chrome.
- Modify `src/app/layout.tsx`: pass the existing shell nodes through `RouteShell` without changing their implementation.
- Create `src/components/patterns/vithelo-market-stage-logic.ts`: pure center/gutter/boundary decision helper.
- Create `src/components/patterns/vithelo-market-stage.tsx`: the only homepage interaction Client Component.
- Create `src/components/patterns/vithelo-b2b-home.tsx`: semantic Server Component for the header, eleven sections, and footer.
- Create `src/components/patterns/vithelo-b2b-home.module.css`: route-scoped approved preview styling and responsive behavior.
- Modify `src/app/page.tsx`: metadata and new homepage composition only.
- Create `tests/unit/vithelo-b2b-home-content.test.ts`: schema, copy, order, format, MOQ, and configuration contracts.
- Create `tests/unit/vithelo-market-stage.test.tsx`: pure decision helper and control accessibility contracts.
- Create `tests/unit/route-shell.test.tsx`: shell hidden only on `/`.
- Modify `tests/unit/app-shell.test.tsx`: new homepage identity and section-order smoke contract.
- Modify `tests/unit/home-inquiry.test.tsx`: replace old route-level six-screen assertions with the new contact/section contract; retain the independent `NutritionHomeHero` fallback test.
- Modify `tests/e2e/nutrition-home-sequence.spec.ts`: eleven-section production route contract.
- Modify homepage-specific cases in `tests/e2e/accessibility.spec.ts`, `tests/e2e/core-journeys.spec.ts`, `tests/e2e/inquiry-journeys.spec.ts`, and `tests/e2e/responsive.spec.ts`; leave non-home journeys unchanged.

### Task 1: Freeze the reference and write failing content contracts

**Files:**
- Create: `tests/unit/vithelo-b2b-home-content.test.ts`
- Test only: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`

- [ ] **Step 1: Write the failing schema and content test**

```ts
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import { VitheloB2BHomeContentSchema } from "@/content/schema";

const sectionOrder = [
  "hero", "proof", "gummy-stage", "solutions", "dosage-forms",
  "custom-development", "manufacturing", "quality", "project-runway",
  "company-fit", "contact",
];

it("validates the approved English eleven-section homepage record", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);
  expect(parsed.sectionOrder).toEqual(sectionOrder);
  expect(parsed.market.stories).toHaveLength(6);
  expect(parsed.dosage.items).toHaveLength(8);
  expect(JSON.stringify(parsed)).not.toMatch(/[\u3400-\u9fff]/);
  expect(parsed.contact.status).toBe("NOT_CONFIGURED");
});

it("keeps the approved MOQ qualifications", () => {
  const text = JSON.stringify(vitheloB2BHome);
  expect(text).toContain("Flexible MOQ based on formula and packaging.");
  expect(text).toContain("Contact us for MOQ");
  for (const value of ["500 bottles", "60,000–100,000", "300,000", "100,000", "100 kg", "2 metric tons"]) {
    expect(text).toContain(value);
  }
});

it("does not mutate the approved standalone preview", () => {
  const html = readFileSync(resolve("vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html"));
  expect(createHash("sha256").update(html).digest("hex").toUpperCase()).toBe(
    "CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649",
  );
});
```

- [ ] **Step 2: Verify the content test fails for missing imports**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`
Expected: FAIL because the new schema and fixture do not exist.

- [ ] **Step 3: Recalculate the frozen hash before implementation**

Run: `Get-FileHash -Algorithm SHA256 vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`
Expected: replace the test literal only if the repository file's current hash differs before any implementation edit; never edit the HTML to make the test pass.

### Task 2: Add the validated VITHELO homepage record

**Files:**
- Modify: `src/content/schema.ts`
- Create: `src/content/demo/vithelo-b2b-home.ts`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: Add focused Zod contracts**

```ts
const B2BSectionIdSchema = z.enum([
  "hero", "proof", "gummy-stage", "solutions", "dosage-forms",
  "custom-development", "manufacturing", "quality", "project-runway",
  "company-fit", "contact",
]);

const RequiredMediaSchema = z.object({
  status: z.enum(["REQUIRED_REAL_ASSET", "FREE_COMMERCIAL_OR_REAL"]),
  label: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: z.enum(["WebP", "transparent WebP"]),
});

export const VitheloB2BHomeContentSchema = z.object({
  dataStatus: DataStatusSchema,
  sectionOrder: z.array(B2BSectionIdSchema).length(11),
  navigation: z.array(z.object({ label: z.string().min(1), href: z.string().startsWith("#") })).length(4),
  hero: z.object({ eyebrow: z.string(), title: z.string(), copy: z.string(), primaryAction: z.string(), secondaryAction: z.string(), media: RequiredMediaSchema }),
  proof: z.array(z.object({ label: z.string(), value: z.string(), suffix: z.string().optional() })).length(4),
  gummy: z.object({ kicker: z.string(), title: z.string(), media: RequiredMediaSchema, features: z.array(z.object({ title: z.string(), copy: z.string() })).length(6) }),
  market: z.object({ kicker: z.string(), title: z.string(), stories: z.array(z.object({ title: z.string(), copy: z.string(), media: RequiredMediaSchema })).length(6) }),
  dosage: z.object({ kicker: z.string(), title: z.string(), qualifier: z.string(), items: z.array(z.object({ name: z.string(), moq: z.string() })).length(8) }),
  development: z.object({ kicker: z.string(), title: z.string(), coreTitle: z.string(), coreCopy: z.string(), notes: z.array(z.object({ title: z.string(), copy: z.string() })).length(4) }),
  manufacturing: z.object({ kicker: z.string(), title: z.string(), media: RequiredMediaSchema, metrics: z.array(z.object({ label: z.string(), value: z.string(), note: z.string() })).length(4) }),
  quality: z.object({ kicker: z.string(), title: z.string(), recordTitle: z.string(), caveat: z.string(), rows: z.array(z.object({ title: z.string(), copy: z.string(), state: z.string() })).length(4) }),
  runway: z.object({ kicker: z.string(), title: z.string(), steps: z.array(z.object({ title: z.string(), copy: z.string() })).length(6) }),
  channels: z.object({ kicker: z.string(), title: z.string(), paths: z.array(z.object({ label: z.string(), title: z.string(), copy: z.string() })).length(3) }),
  contact: z.object({ status: z.literal("NOT_CONFIGURED"), kicker: z.string(), title: z.string(), copy: z.string(), pendingMessage: z.string(), formats: z.array(z.string()).length(8) }),
  footer: z.object({ descriptor: z.string(), disclosure: z.string() }),
});

export type VitheloB2BHomeContent = z.infer<typeof VitheloB2BHomeContentSchema>;
```

- [ ] **Step 2: Create and parse the exact approved fixture**

`src/content/demo/vithelo-b2b-home.ts` must export `vitheloB2BHome = VitheloB2BHomeContentSchema.parse({...})` and copy the English text from the approved preview's active hero/proof plus focused sections 3–11. Use the asset requirements from `vithelo-homepage-work/assets/README.md`; contact remains `NOT_CONFIGURED`.

- [ ] **Step 3: Run the content contract**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`
Expected: PASS.

### Task 3: Hide the existing global shell only on `/`

**Files:**
- Create: `src/components/core/route-shell.tsx`
- Modify: `src/app/layout.tsx`
- Create: `tests/unit/route-shell.test.tsx`

- [ ] **Step 1: Write a failing route-shell test**

Mock `next/navigation` so `usePathname()` returns `/`, render the shell with labelled stub nodes, and assert only the page child renders. Change the mock to `/nutrition`, rerender, and assert disclosure, header, child, and mobile resource render in that order.

- [ ] **Step 2: Verify the test fails**

Run: `pnpm.cmd test -- tests/unit/route-shell.test.tsx`
Expected: FAIL because `RouteShell` does not exist.

- [ ] **Step 3: Implement the isolated Client boundary**

```tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RouteShellProps = {
  children: ReactNode;
  disclosure: ReactNode;
  header: ReactNode;
  mobileResource: ReactNode;
};

export function RouteShell({ children, disclosure, header, mobileResource }: RouteShellProps) {
  const pathname = usePathname();
  if (pathname === "/") return children;
  return <>{disclosure}{header}{children}{mobileResource}</>;
}
```

Update `layout.tsx` to pass `<DemoDisclosure />`, `<SiteHeader />`, and `<MobileInquiryBar />` as slots. Do not edit those components.

- [ ] **Step 4: Run the route-shell and existing core tests**

Run: `pnpm.cmd test -- tests/unit/route-shell.test.tsx tests/unit/core-components.test.tsx`
Expected: PASS.

### Task 4: Implement and test the bounded market stage

**Files:**
- Create: `src/components/patterns/vithelo-market-stage-logic.ts`
- Create: `src/components/patterns/vithelo-market-stage.tsx`
- Create: `tests/unit/vithelo-market-stage.test.tsx`

- [ ] **Step 1: Write failing pure-helper tests**

```ts
expect(decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: 0.5 }))
  .toEqual({ type: "advance", index: 3 });
expect(decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: 0.05 }))
  .toEqual({ type: "release" });
expect(decideMarketStageAction({ index: 0, count: 6, direction: -1, pointerRatio: 0.5 }))
  .toEqual({ type: "release" });
expect(decideMarketStageAction({ index: 5, count: 6, direction: 1, pointerRatio: 0.5 }))
  .toEqual({ type: "release" });
```

Add component assertions for Previous/Next disabled boundaries, `01 / 06` live progress, arrow-key navigation, and Escape focus release.

- [ ] **Step 2: Verify the tests fail**

Run: `pnpm.cmd test -- tests/unit/vithelo-market-stage.test.tsx`
Expected: FAIL because the helper and component do not exist.

- [ ] **Step 3: Implement the pure helper**

```ts
export function decideMarketStageAction({ index, count, direction, pointerRatio }: Input): Action {
  if (direction === 0 || pointerRatio < 0.12 || pointerRatio > 0.88) return { type: "release" };
  const nextIndex = index + direction;
  return nextIndex < 0 || nextIndex >= count
    ? { type: "release" }
    : { type: "advance", index: nextIndex };
}
```

- [ ] **Step 4: Implement the Client Component**

Use a stage `ref`, state plus refs for active index and transition lock, native non-passive `wheel` listener, `matchMedia("(min-width: 761px)")`, `matchMedia("(prefers-reduced-motion: reduce)")`, and the pure helper. Only desktop center gestures call `preventDefault`; mobile and gutter events always release. Set inactive desktop stories to `aria-hidden="true"`; keep all mobile stories accessible.

- [ ] **Step 5: Run the market-stage tests**

Run: `pnpm.cmd test -- tests/unit/vithelo-market-stage.test.tsx`
Expected: PASS.

### Task 5: Render the eleven-section Server Component and scoped styles

**Files:**
- Create: `src/components/patterns/vithelo-b2b-home.tsx`
- Create: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `tests/unit/app-shell.test.tsx`
- Modify: `tests/unit/home-inquiry.test.tsx`

- [ ] **Step 1: Replace route-level old-home assertions with failing eleven-section assertions**

Assert the IDs below occur once and in order in the rendered `HomePage`: `hero`, `proof`, `gummy-stage`, `solutions`, `dosage-forms`, `custom-development`, `manufacturing`, `quality`, `project-runway`, `company-fit`, `contact`. Assert the dosage section contains eight labelled items, the public page has no Chinese text, and contact state is `NOT_CONFIGURED`.

- [ ] **Step 2: Verify the route test fails against the old homepage**

Run: `pnpm.cmd test -- tests/unit/app-shell.test.tsx tests/unit/home-inquiry.test.tsx`
Expected: FAIL because the old six-screen composition is still rendered.

- [ ] **Step 3: Implement semantic static markup**

Render one `<main>` with its own header and the exact eleven `<section id>` elements. Use array mapping only for repeated proof points, gummy features, dosage items, development notes, metrics, quality rows, runway steps, and channel paths. Pass only `content.market` into `VitheloMarketStage`. Render the disabled project form with explicit labels, `type="button"`, and `aria-describedby` pointing to the visible pending message.

- [ ] **Step 4: Port only the approved visual rules into the CSS Module**

Use the preview values as the source: ivory `#f3f0e8`, ink `#171918`, orange `#ec5b32`, section padding `clamp(78px, 9vw, 144px) clamp(22px, 6vw, 96px)`, title sizing `clamp(42px, 7vw, 104px)`, low shadows, one-screen desktop dosage `repeat(4, 1fr)`, two-column mobile dosage, desktop single-story market stage, native vertical mobile stories, visible focus, 44px targets, and Reduced Motion. Every selector must be rooted in the CSS Module; do not add homepage rules to `globals.css`.

- [ ] **Step 5: Run component tests**

Run: `pnpm.cmd test -- tests/unit/app-shell.test.tsx tests/unit/home-inquiry.test.tsx tests/unit/vithelo-market-stage.test.tsx`
Expected: PASS.

### Task 6: Switch the production `/` route

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace only the homepage composition and metadata**

```tsx
import type { Metadata } from "next";
import { VitheloB2BHome } from "@/components/patterns/vithelo-b2b-home";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

export const metadata: Metadata = {
  title: "VITHELO | Global Nutrition OEM ODM Manufacturing Partner",
  description: "VITHELO provides global nutrition OEM and ODM manufacturing solutions including gummies, capsules, powders and custom supplements.",
};

export default function HomePage() {
  return <VitheloB2BHome content={vitheloB2BHome} />;
}
```

- [ ] **Step 2: Run focused unit tests and typecheck**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/route-shell.test.tsx tests/unit/vithelo-market-stage.test.tsx tests/unit/app-shell.test.tsx tests/unit/home-inquiry.test.tsx`
Expected: PASS.
Run: `pnpm.cmd typecheck`
Expected: exit code 0.

### Task 7: Replace stale homepage E2E expectations

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify homepage-only cases: `tests/e2e/accessibility.spec.ts`
- Modify homepage-only cases: `tests/e2e/core-journeys.spec.ts`
- Modify homepage-only cases: `tests/e2e/inquiry-journeys.spec.ts`
- Modify homepage-only cases: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Convert the sequence test to the eleven-section contract**

Assert exact DOM order, hero heading, six market stories in the DOM, eight dosage items, and visible `NOT_CONFIGURED` contact state.

- [ ] **Step 2: Update accessibility cases**

Desktop keyboard checks target the new homepage header and market controls. Reduced Motion asserts all six story headings remain accessible without relying on animation. Remove the old product-focus parity case because product focus rail is no longer part of `/`; retain independent component unit coverage.

- [ ] **Step 3: Update journey and inquiry cases**

Hydration waits for `#hero-title`. Hero links scroll to `#contact` and `#gummy-stage`; do not expect a prefilled `/contact` navigation. Home inquiry checks the disabled project form plus the pending Email/WhatsApp destinations. Remove the mobile global inquiry-bar expectation on `/` because the global shell is intentionally absent there; preserve the `/contact` mobile resource test.

- [ ] **Step 4: Update responsive cases**

Assert hero decision content fits, desktop dosage computed columns equal four, mobile dosage equals two, mobile market stories are all displayed in document order, and no route overflows. Keep every non-home responsive assertion unchanged.

- [ ] **Step 5: Run the applicable E2E suite**

Run: `pnpm.cmd test:e2e`
Expected: exit code 0 with no homepage hydration, accessibility, overflow, or stale-selector failure.

### Task 8: Full verification and visual comparison

**Files:**
- No intended source changes unless a test exposes an in-scope defect.

- [ ] **Step 1: Run standalone preview contracts**

Run: `node --test vithelo-homepage-work/tests/*.test.mjs`
Expected: 17 tests pass and the standalone preview hash remains unchanged.

- [ ] **Step 2: Run repository quality gates**

Run in order:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: every command exits 0.

- [ ] **Step 3: Perform browser review**

At desktop and mobile widths verify: exactly eleven sections, English-only public copy, header/footer inside the homepage, old global shell absent only on `/`, no horizontal overflow, dosage 4×2 desktop and 2×4 mobile, market center wheel advances one story, gutters release, first-up and last-down release, Previous/Next and arrow keys work, Escape releases focus, Reduced Motion remains complete, and representative non-home routes retain their original shell.

- [ ] **Step 4: Report without unauthorized Git actions**

Report changed paths, intentionally unchanged paths, all verification results, the frozen preview hash, and current Git status. Do not commit, merge, push, or deploy unless the user separately requests it.

## Plan self-review

- Spec coverage: all eleven sections, desktop dosage layout, market-stage boundaries, mobile fallback, explicit configuration states, shell isolation, frozen preview, and non-home preservation map to tasks.
- Placeholder scan: no unresolved implementation marker remains; production assets remain intentionally represented as explicit required-media records.
- Type consistency: the fixture, Server Component, and Client Component all consume `VitheloB2BHomeContent`; the market stage receives `content.market.stories` only.
- Scope: no non-home composition, content fixture, or component is redesigned.
