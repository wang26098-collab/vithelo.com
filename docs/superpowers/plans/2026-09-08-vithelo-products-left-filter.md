# VITHELO Products Left Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `/products` 改造成桌面端左侧双重筛选、右侧结果卡片的 Product discovery 页面，并新增 Jelly 独立详情路由。

**Architecture:** 保留现有 `VitheloProductsPage` 和本地内容 adapter 边界，把筛选用的 Format / Health direction 关系加入已验证的内容模型；交互封装为页面级客户端筛选组件，结果卡片只负责链接到剂型详情页。桌面端使用左侧筛选栏，移动端折叠为顶部筛选区，所有未核实关联继续标记 `DEMO_ONLY`。

**Tech Stack:** Next.js App Router、React、TypeScript、Zod 内容 schema、CSS Modules、Vitest / Playwright。

---

### Task 1: Extend the content contract for product discovery

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts` or the current B2B products fixture source identified by `localContentAdapter.getB2BProductsPage()`
- Test: `tests/unit/content-schema.test.ts` or the existing schema test file

- [ ] **Step 1: Write the failing schema test**

Add a fixture assertion for nine formats and six health directions. Assert that each discovery result has a stable `formatSlug`, one or more `healthDirection` values, `dataStatus: "DEMO_ONLY"`, and a valid optional media record.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `pnpm.cmd vitest run tests/unit/content-schema.test.ts`

Expected: FAIL because the current B2B products page contract has no discovery collection and no Jelly record.

- [ ] **Step 3: Add the smallest schema extension**

Define literal unions for the nine format slugs and six health-direction slugs. Add a discovery item contract with `id`, `formatSlug`, `formatName`, `healthDirections`, `title`, `descriptor`, `dataStatus`, and optional media. Add a `discovery` collection to the B2B products page content contract.

- [ ] **Step 4: Add demo-only fixture relationships**

Add Jelly as a `DEMO_ONLY` format record with no invented manufacturing claims. Create a small set of discovery records covering single-dimension results and combined results for Sports Performance, Women’s Health, Sleep & Rest, Cognitive Focus, Beauty From Within, and Pet Health.

- [ ] **Step 5: Run the focused test and typecheck**

Run: `pnpm.cmd vitest run tests/unit/content-schema.test.ts`

Expected: PASS.

Run: `pnpm.cmd typecheck`

Expected: PASS.

- [ ] **Step 6: Commit the content contract**

```bash
git add src/content/schema.ts src/content/demo tests/unit/content-schema.test.ts
git commit -m "feat: add demo product discovery content"
```

### Task 2: Add the filter state and result derivation

**Files:**
- Create: `src/components/domain/vithelo-product-filter.tsx`
- Create: `src/lib/product-discovery.ts`
- Test: `tests/unit/product-discovery.test.ts`

- [ ] **Step 1: Write failing pure filtering tests**

Cover these cases: no filters returns all records; format-only returns matching format; direction-only returns records containing every selected direction; combined filters use AND between format and direction; clearing returns the default set.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `pnpm.cmd vitest run tests/unit/product-discovery.test.ts`

Expected: FAIL because the derivation function does not exist.

- [ ] **Step 3: Implement pure filter derivation**

Create typed `ProductDiscoveryFilters` with `format: FormatSlug | "all"` and `healthDirections: HealthDirectionSlug[]`. Implement `filterProductDiscovery(items, filters)` with deterministic filtering and no mutation of source content.

- [ ] **Step 4: Implement the client filter UI**

Use native `select` or accessible radio controls for Format, native checkboxes for directions, a clear-all button, an `aria-live="polite"` result count, selected-condition summary, and links generated from `formatSlug`. Keep all interaction local to the component and preserve URL-independent state for the first version.

- [ ] **Step 5: Run unit tests and typecheck**

Run: `pnpm.cmd vitest run tests/unit/product-discovery.test.ts`

Expected: PASS.

Run: `pnpm.cmd typecheck`

Expected: PASS.

- [ ] **Step 6: Commit the filter behavior**

```bash
git add src/components/domain/vithelo-product-filter.tsx src/lib/product-discovery.ts tests/unit/product-discovery.test.ts
git commit -m "feat: add product discovery filter behavior"
```

### Task 3: Compose the desktop left-filter Product page

**Files:**
- Modify: `src/components/patterns/vithelo-products-page.tsx`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`
- Modify: `src/app/products/page.tsx`
- Test: `tests/e2e/products-filter.spec.ts`

- [ ] **Step 1: Write the failing E2E structure and interaction checks**

Assert that `/products` exposes a left filter region, one Format control, six direction checkboxes, a result count, result cards, clear-all behavior, and links to the expected format detail paths. Test format-only, direction-only, and combined states.

- [ ] **Step 2: Run the focused E2E and verify the new assertions fail**

Run: `pnpm.cmd playwright test tests/e2e/products-filter.spec.ts`

Expected: FAIL because the current page still renders the legacy gummy platform and format ledger without the filter UI.

- [ ] **Step 3: Replace only the Product page composition**

Keep the existing site frame and metadata boundary. Replace the Product page body with Hero, left filter / right results, and OEM / ODM close. Keep English public copy, `DEMO_ONLY` status, existing VITHELO visual tokens, and placeholder captions for missing media. Do not modify locked homepage screens.

- [ ] **Step 4: Add responsive styling**

Use the existing page module tokens and CSS conventions. Desktop uses a two-column grid with a bounded left rail; mobile stacks the filter above results. Preserve visible focus, 44px targets, text resizing, no horizontal overflow, and Reduced Motion behavior.

- [ ] **Step 5: Run focused E2E and targeted lint**

Run: `pnpm.cmd playwright test tests/e2e/products-filter.spec.ts`

Expected: PASS.

Run: `pnpm.cmd eslint src/app/products/page.tsx src/components/patterns/vithelo-products-page.tsx src/components/domain/vithelo-product-filter.tsx src/lib/product-discovery.ts`

Expected: PASS.

- [ ] **Step 6: Commit the Product page composition**

```bash
git add src/app/products/page.tsx src/components/patterns/vithelo-products-page.tsx src/components/patterns/vithelo-b2b-pages.module.css src/components/domain/vithelo-product-filter.tsx src/lib/product-discovery.ts tests/e2e/products-filter.spec.ts
git commit -m "feat: redesign products page with left filters"
```

### Task 4: Add the Jelly detail route and inquiry handoff

**Files:**
- Modify: `src/app/products/[slug]/page.tsx` or the current dynamic product route file
- Modify: `src/content/demo/vithelo-b2b-site.ts` or the product-detail content source
- Test: `tests/e2e/products-filter.spec.ts`

- [ ] **Step 1: Add a failing route assertion**

Assert that clicking a Jelly result reaches `/products/jelly`, renders the Jelly format name, visibly keeps `DEMO_ONLY`, and exposes the existing direct Email / WhatsApp inquiry actions without a server-side submission.

- [ ] **Step 2: Run the focused E2E and verify it fails**

Run: `pnpm.cmd playwright test tests/e2e/products-filter.spec.ts -g "Jelly"`

Expected: FAIL because the current dynamic route has no Jelly content record.

- [ ] **Step 3: Add the minimal Jelly detail record**

Add only format-level, non-claim content: format title, project-fit placeholder copy, missing media state or approved existing format asset, `DEMO_ONLY` status, and links to the already configured inquiry channels.

- [ ] **Step 4: Run the route and inquiry assertions**

Run: `pnpm.cmd playwright test tests/e2e/products-filter.spec.ts -g "Jelly"`

Expected: PASS.

- [ ] **Step 5: Commit the route**

```bash
git add src/app/products/[slug] src/content/demo
git commit -m "feat: add jelly product detail route"
```

### Task 5: Full verification and visual review

**Files:**
- Modify only files created or changed by Tasks 1–4 if verification exposes a defect
- Review: `docs/superpowers/specs/2026-09-08-vithelo-products-left-filter-design.md`

- [ ] **Step 1: Run focused unit and E2E checks**

Run: `pnpm.cmd vitest run tests/unit/content-schema.test.ts tests/unit/product-discovery.test.ts`

Run: `pnpm.cmd playwright test tests/e2e/products-filter.spec.ts`

Expected: all focused checks pass.

- [ ] **Step 2: Run repository verification commands**

Run: `pnpm.cmd typecheck`

Run: `pnpm.cmd build`

Expected: both exit 0. Note the existing repository-wide lint and full E2E baseline separately if unrelated failures remain.

- [ ] **Step 3: Review desktop and mobile states**

Inspect `/products` at desktop and mobile acceptance widths. Verify left rail hierarchy, result readability, placeholder labeling, no clipping, no unsupported claims, keyboard focus, empty state, and Reduced Motion.

- [ ] **Step 4: Commit verification-only fixes**

```bash
git add src tests docs
git commit -m "test: verify products discovery flow"
```

## Plan self-review

- Spec coverage: format single-select, health-direction multi-select, single-dimension and combined logic, left desktop rail, mobile stacking, DEMO_ONLY boundary, Jelly route, inquiry handoff, accessibility, and image placeholders are covered by Tasks 1–5.
- Placeholder scan: no `TBD` or `TODO` implementation step is used; each task names files, tests, commands, and expected outcomes.
- Type consistency: `FormatSlug`, `HealthDirectionSlug`, `ProductDiscoveryFilters`, and `filterProductDiscovery` are introduced in Task 1/2 before use in later tasks.
