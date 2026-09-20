# VITHELO OEM / ODM Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `/oem-odm` 改造成以七项能力地图为入口、以统一六步项目流程为主线的结构化 B2B 决策页。

**Architecture:** 业务内容继续由 Zod 契约验证后经本地适配器进入 Server Component。页面模式组件按十个语义区块渲染，样式集中在现有 B2B 页面 CSS Module 中；不新增客户端状态，不拆分 OEM / ODM 双路径，不在路由组件中写业务事实。

**Tech Stack:** Next.js 16 App Router、React 19 Server Components、TypeScript、Zod 4、CSS Modules、Vitest、Testing Library、Playwright。

---

## 文件边界

- Modify: `src/content/schema.ts` — 定义 OEM / ODM 页面新的内容契约。
- Modify: `src/content/demo/vithelo-b2b-site.ts` — 提供经过验证的七项能力、八种剂型、六步流程和辅助内容。
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx` — 渲染十个语义区块。
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css` — 只增加或替换 OEM / ODM 专属样式。
- Modify: `src/app/oem-odm/page.tsx` — 更新该路由元数据文案，不改变数据获取方式。
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts` — 验证新契约和证据边界。
- Modify: `tests/unit/vithelo-oem-odm-page.test.tsx` — 验证页面结构、顺序、数量和链接。
- Create: `tests/e2e/oem-odm-page.spec.ts` — 验证六个视口、响应式网格、溢出、Reduced Motion 和询盘路径。
- Modify: `docs/current-status.md` — 记录页面改造结果和验证事实。

不修改首页、产品页、共享导航、页脚、Hero 视频、询盘揭示或其他已锁定页面。

### Task 1: 用内容契约锁定统一 OEM / ODM 信息架构

**Files:**
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`

- [ ] **Step 1: 先写失败的内容契约测试**

在 `tests/unit/vithelo-b2b-pages-content.test.ts` 增加：

```ts
it("publishes one unified OEM ODM capability system", () => {
  const page = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);

  expect(page.capabilities.map(({ title }) => title)).toEqual([
    "Product Brief & Feasibility",
    "Formulation Direction",
    "Dosage-Form Selection",
    "Sensory & Sample Development",
    "Packaging Alignment",
    "Production Coordination",
    "Quality & Documentation",
  ]);
  expect(page.formats).toHaveLength(8);
  expect(page.steps).toHaveLength(6);
  expect(page.commercialVariables.map(({ title }) => title)).toEqual([
    "What shapes MOQ",
    "What shapes lead time",
  ]);
  expect(page.packaging).toHaveLength(4);
  expect(page.quality).toHaveLength(4);
  expect(page.checklist).toHaveLength(6);
  expect(page.relatedLinks).toHaveLength(3);
  expect(page).not.toHaveProperty("identity");
  expect(page).not.toHaveProperty("customization");
  expect(page).not.toHaveProperty("production");
});

it("keeps OEM ODM commercial claims conditional and evidence bounded", () => {
  const page = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);
  const serialized = JSON.stringify(page);

  expect(page.dataStatus).toBe("DEMO_ONLY");
  expect(serialized).not.toMatch(/FDA approved|certified facility|guaranteed|\b\d+\s*(?:days?|units?)\b/i);
  expect(serialized).not.toMatch(/\b(?:GMP|HACCP|HALAL|BRC|FSSC)\b/);
  expect(serialized).toMatch(/depends|review|confirmed|project/i);
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: FAIL，因为 `capabilities`、`formats`、`commercialVariables`、`packaging` 和 `relatedLinks` 尚未出现在 `B2BOemOdmPageSchema`。

- [ ] **Step 3: 最小化更新 Zod 契约**

在 `src/content/schema.ts` 的 `B2BOemOdmPageSchema` 附近增加并使用以下结构：

```ts
const B2BCommercialVariableSchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
  factors: z.array(z.string().min(1)).min(3),
});

export const B2BOemOdmPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  capabilities: z.array(B2BTextItemSchema).length(7),
  formats: z.array(B2BLinkSchema).length(8),
  steps: z.array(B2BTextItemSchema).length(6),
  commercialVariables: z.array(B2BCommercialVariableSchema).length(2),
  packaging: z.array(B2BTextItemSchema).length(4),
  quality: z.array(B2BTextItemSchema).length(4),
  checklist: z.array(z.string().min(1)).length(6),
  faqs: z.array(B2BTextItemSchema).min(5),
  cta: z.object({
    title: z.string().min(1),
    copy: z.string().min(1),
    href: z.literal("/contact"),
  }),
  relatedLinks: z.array(B2BLinkSchema).length(3),
});
```

删除旧字段 `identity`、`customization` 和 `production`。不要更改 `DataStatusSchema`、`B2BHeroSchema` 或全站共享链接契约。

- [ ] **Step 4: 用完整英文公开文案替换 OEM / ODM 演示记录**

在 `src/content/demo/vithelo-b2b-site.ts` 中把 `vitheloB2BOemOdmPage` 更新为：

```ts
export const vitheloB2BOemOdmPage = B2BOemOdmPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "OEM / ODM PROJECT DEVELOPMENT",
    title: "Build the project around the decisions that matter.",
    copy: "VITHELO connects product direction, format, sampling, packaging, production coordination and project-specific quality review in one manufacturing path.",
  },
  capabilities: [
    {
      title: "Product Brief & Feasibility",
      copy: "Clarify the product objective, intended format, serving context, volume direction and the decisions still open for review.",
    },
    {
      title: "Formulation Direction",
      copy: "Review ingredient direction and serving requirements against the needs of the selected dosage form and production route.",
    },
    {
      title: "Dosage-Form Selection",
      copy: "Compare eight oral formats through product use, formula fit, sensory needs, packaging and manufacturing feasibility.",
    },
    {
      title: "Sensory & Sample Development",
      copy: "Use sampling to review taste, texture, appearance and other format-specific characteristics before production confirmation.",
    },
    {
      title: "Packaging Alignment",
      copy: "Coordinate container, count, label, printed components and transport considerations with the confirmed product direction.",
    },
    {
      title: "Production Coordination",
      copy: "Move confirmed product, sample and packaging decisions into the agreed manufacturing route and project records.",
    },
    {
      title: "Quality & Documentation",
      copy: "Define relevant checks and available project documents according to the product, process and destination requirements.",
    },
  ],
  formats: [
    { label: "Gummies", href: "/products/gummies" },
    { label: "Jelly", href: "/products/jelly" },
    { label: "Hard Capsules", href: "/products/hard-capsules" },
    { label: "Tablets", href: "/products/tablets" },
    { label: "Powders", href: "/products/powders" },
    { label: "Softgels", href: "/products/softgels" },
    { label: "Liquid Drops", href: "/products/liquids" },
    { label: "Oral Films", href: "/products/oral-films" },
  ],
  steps: [
    { title: "01 · Define the Brief", copy: "Share the format, formula direction, pack, estimated volume, destination context and target timing." },
    { title: "02 · Review Feasibility", copy: "Connect product requirements with dosage-form, ingredient, sensory and manufacturing considerations." },
    { title: "03 · Develop the Sample", copy: "Review the sample and record the adjustments required before the specification is confirmed." },
    { title: "04 · Align the Pack", copy: "Coordinate container, count, label, artwork inputs and transport requirements with the product." },
    { title: "05 · Confirm Production", copy: "Confirm the project inputs that determine the manufacturing route, MOQ review and production schedule." },
    { title: "06 · Review & Coordinate Delivery", copy: "Review finished-product records and coordinate the project-specific delivery requirements." },
  ],
  commercialVariables: [
    {
      title: "What shapes MOQ",
      copy: "MOQ is reviewed after the main product and packaging decisions are understood.",
      factors: ["Dosage form and formula", "Ingredient sourcing", "Packaging and printing", "Production setup", "Customization level"],
    },
    {
      title: "What shapes lead time",
      copy: "Timing is assessed from the confirmed development and production scope.",
      factors: ["Formulation and sample review", "Ingredient availability", "Packaging production", "Manufacturing schedule", "Inspection and shipment preparation"],
    },
  ],
  packaging: [
    { title: "Bottles, Jars & Blisters", copy: "Review compatibility, count, closure, label and presentation requirements for the selected format." },
    { title: "Sachets, Stick Packs & Pouches", copy: "Align portioning, barrier needs, print inputs and packing format with the product direction." },
    { title: "Liquid & Dropper Packaging", copy: "Review product compatibility, serving size, dispensing, sealing, labeling and transport needs." },
    { title: "Labels, Cartons & Printed Components", copy: "Coordinate approved artwork inputs with packaging scope, MOQ review and production planning." },
  ],
  quality: [
    { title: "Material Review", copy: "Relevant identity, specification and supplier records depend on the confirmed project scope." },
    { title: "In-Process Checks", copy: "Production checks are defined by the confirmed dosage form and manufacturing process." },
    { title: "Finished-Product Review", copy: "Finished-product checks and batch records follow the confirmed product requirements." },
    { title: "Project Documentation", copy: "Document availability is reviewed against current records, product needs and destination requirements." },
  ],
  checklist: [
    "Target dosage form",
    "Formula or ingredient direction",
    "Preferred packaging",
    "Estimated order volume",
    "Destination context",
    "Target timing",
  ],
  faqs: [
    { title: "How is MOQ reviewed?", copy: "MOQ depends on the dosage form, formula, ingredient sourcing, packaging, production setup and customization level." },
    { title: "Can the project begin without a final formula?", copy: "Yes. A formula or ingredient direction can begin the feasibility review; production specifications are confirmed later in the project." },
    { title: "Can VITHELO support sampling?", copy: "Sampling is part of the project path. The sample scope and review points are confirmed after the initial requirement review." },
    { title: "Can packaging be coordinated?", copy: "Packaging alignment can cover the container, count, label, printed components and transport considerations within the confirmed scope." },
    { title: "Which documents are available?", copy: "Availability depends on current records, the selected product, the project scope and destination requirements." },
    { title: "How is project timing assessed?", copy: "Timing is reviewed after formulation, sample, ingredient, packaging, production and inspection requirements are understood." },
  ],
  cta: {
    title: "Bring the direction. Build the brief together.",
    copy: "Share what is already decided and what still needs review. The first conversation can define the next practical step.",
    href: "/contact",
  },
  relatedLinks: [
    { label: "Compare private label and custom formulation", href: "/insights/private-label-vs-custom-formulation" },
    { label: "Understand the sampling process", href: "/insights/how-supplement-sampling-works" },
    { label: "Review packaging, MOQ and timing variables", href: "/insights/how-packaging-affects-moq-and-lead-time" },
  ],
});
```

- [ ] **Step 5: 运行内容测试并确认通过**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: PASS；无 Zod parse error，无认证或固定数字声明命中。

- [ ] **Step 6: 提交内容契约和演示数据**

```powershell
git add src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-b2b-pages-content.test.ts
git commit -m "feat: structure OEM ODM content"
```

### Task 2: 测试并实现十区块语义页面

**Files:**
- Modify: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`
- Modify: `src/app/oem-odm/page.tsx`

- [ ] **Step 1: 先写失败的页面结构测试**

用以下测试替换 `tests/unit/vithelo-oem-odm-page.test.tsx`：

```tsx
import { render, screen, within } from "@testing-library/react";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { vitheloB2BOemOdmPage } from "@/content/demo/vithelo-b2b-site";

it("renders the unified OEM ODM decision sequence", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(
    screen.getAllByTestId("oem-section").map((section) => section.getAttribute("data-section")),
  ).toEqual([
    "hero",
    "capabilities",
    "formats",
    "project-path",
    "commercial-variables",
    "packaging",
    "quality",
    "quote-preparation",
    "questions",
    "inquiry",
  ]);
  expect(within(screen.getByTestId("capability-map")).getAllByRole("article")).toHaveLength(7);
  expect(within(screen.getByTestId("format-field")).getAllByRole("link")).toHaveLength(8);
  expect(within(screen.getByTestId("oem-steps")).getAllByRole("article")).toHaveLength(6);
  expect(within(screen.getByTestId("commercial-variables")).getAllByRole("article")).toHaveLength(2);
  expect(within(screen.getByTestId("packaging-groups")).getAllByRole("article")).toHaveLength(4);
  expect(within(screen.getByTestId("quality-path")).getAllByRole("article")).toHaveLength(4);
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute("href", "/contact");
});

it("does not render a split OEM and ODM comparison", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(screen.queryByText(/you bring the specification/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/you bring the product direction/i)).not.toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/FDA approved|certified|guaranteed/i);
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: FAIL，因为当前组件没有十个 `oem-section`、能力地图、剂型场和商业变量区。

- [ ] **Step 3: 最小化重写页面模式组件**

在 `src/components/patterns/vithelo-oem-odm-page.tsx` 中保留 Server Component，按以下结构渲染：

```tsx
import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BOemOdmPage } from "@/content/schema";

const sectionProps = (section: string) => ({
  "data-testid": "oem-section",
  "data-section": section,
});

export function VitheloOemOdmPage({ content }: { content: B2BOemOdmPage }) {
  return (
    <main className={`${styles.page} ${styles.oemPage}`} data-content-status={content.dataStatus} data-ui-stage="oem-capability-ledger">
      <section {...sectionProps("hero")} data-header-hero className={`${styles.hero} ${styles.oemHero}`}>
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>

      <section {...sectionProps("capabilities")} className={`${styles.section} ${styles.oemCapabilitySection}`}>
        <p className={styles.kicker}>DEVELOPMENT CAPABILITIES</p>
        <h2>One project system. Seven connected decisions.</h2>
        <div className={styles.oemCapabilityMap} data-testid="capability-map">
          {content.capabilities.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section {...sectionProps("formats")} className={`${styles.section} ${styles.oemFormatsSection}`}>
        <p className={styles.kicker}>DOSAGE FORMS</p>
        <h2>Eight formats within one review path.</h2>
        <div className={styles.oemFormatField} data-testid="format-field">
          {content.formats.map((format, index) => (
            <Link key={format.href} href={format.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{format.label}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section {...sectionProps("project-path")} className={`${styles.section} ${styles.oemProjectSection}`}>
        <p className={styles.kicker}>PROJECT PATH</p>
        <h2>Six confirmations from direction to delivery.</h2>
        <div className={styles.oemStepLedger} data-testid="oem-steps">
          {content.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></article>)}
        </div>
      </section>

      <section {...sectionProps("commercial-variables")} className={`${styles.section} ${styles.oemVariablesSection}`}>
        <p className={styles.kicker}>COMMERCIAL VARIABLES</p>
        <h2>MOQ and timing follow the confirmed project.</h2>
        <div className={styles.oemVariableGrid} data-testid="commercial-variables">
          {content.commercialVariables.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p><ul>{item.factors.map((factor) => <li key={factor}>{factor}</li>)}</ul></article>
          ))}
        </div>
      </section>

      <section {...sectionProps("packaging")} className={`${styles.section} ${styles.oemPackagingSection}`}>
        <p className={styles.kicker}>PACKAGING ALIGNMENT</p>
        <h2>Plan the pack with the product.</h2>
        <div className={styles.oemPackagingGrid} data-testid="packaging-groups">
          {content.packaging.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}
        </div>
      </section>

      <section {...sectionProps("quality")} className={`${styles.section} ${styles.oemQualitySection}`}>
        <p className={styles.kicker}>QUALITY & DOCUMENTATION</p>
        <h2>Define the relevant checks before production.</h2>
        <div className={styles.oemQualityLedger} data-testid="quality-path">
          {content.quality.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}
        </div>
      </section>

      <section {...sectionProps("quote-preparation")} className={`${styles.section} ${styles.oemPrepSection}`}>
        <p className={styles.kicker}>QUOTE PREPARATION</p>
        <h2>Six inputs make the first review useful.</h2>
        <ol className={styles.oemChecklist}>{content.checklist.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section {...sectionProps("questions")} className={`${styles.section} ${styles.oemQuestionsSection}`}>
        <p className={styles.kicker}>PROJECT QUESTIONS</p>
        <h2>Clarify the variables before production.</h2>
        <div className={styles.faq}>{content.faqs.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.copy}</p></details>)}</div>
      </section>

      <section {...sectionProps("inquiry")} className={`${styles.cta} ${styles.oemCta}`}>
        <h2>{content.cta.title}</h2><p>{content.cta.copy}</p>
        <Link className={styles.oemPrimaryCta} href={content.cta.href}>Start a Project</Link>
        <nav className={styles.oemRelatedLinks} aria-label="Related OEM and ODM guides">
          {content.relatedLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: 更新路由元数据文案**

在 `src/app/oem-odm/page.tsx` 中只替换 description：

```ts
description:
  "Structured supplement OEM and ODM project development across formulation, dosage form, sampling, packaging, production coordination and quality review.",
```

- [ ] **Step 5: 运行组件与元数据测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/metadata-brand.test.ts
```

Expected: PASS；页面顺序为十区块，数量断言与 `/contact` 链接通过。

- [ ] **Step 6: 提交组件结构**

```powershell
git add src/components/patterns/vithelo-oem-odm-page.tsx src/app/oem-odm/page.tsx tests/unit/vithelo-oem-odm-page.test.tsx
git commit -m "feat: rebuild OEM ODM page structure"
```

### Task 3: 测试并实现响应式制造项目台账视觉

**Files:**
- Create: `tests/e2e/oem-odm-page.spec.ts`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`

- [ ] **Step 1: 先写失败的响应式 E2E**

创建 `tests/e2e/oem-odm-page.spec.ts`：

```ts
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop-wide", width: 1440, height: 1000 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "mobile-small", width: 360, height: 800 },
];

for (const viewport of viewports) {
  test(`${viewport.name} keeps the OEM ODM ledger readable`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/oem-odm");

    await expect(page.locator('[data-testid="oem-section"]')).toHaveCount(10);
    await expect(page.locator('[data-testid="capability-map"] > article')).toHaveCount(7);
    await expect(page.locator('[data-testid="format-field"] > a')).toHaveCount(8);
    await expect(page.locator('[data-testid="oem-steps"] > article')).toHaveCount(6);
    await expect(page.getByRole("link", { name: "Start a Project" })).toHaveAttribute("href", "/contact");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const columns = await page.locator('[data-testid="capability-map"]').evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
    );
    expect(columns).toBe(viewport.width <= 620 ? 1 : viewport.width <= 900 ? 2 : 4);
  });
}

test("reduced motion exposes the final OEM ODM state", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/oem-odm");
  await expect(page.locator('[data-testid="capability-map"] > article')).toHaveCount(7);
  await expect(page.locator('[data-testid="capability-map"] > article').first()).toBeVisible();
  await context.close();
});
```

- [ ] **Step 2: 运行 E2E 并确认布局断言失败**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: FAIL，因为能力地图尚未定义 4 / 2 / 1 列响应式布局，页面专属样式尚不存在。

- [ ] **Step 3: 增加 OEM / ODM 专属 CSS，不改其他页面选择器**

在 `src/components/patterns/vithelo-b2b-pages.module.css` 中增加 `.oem*` 选择器。核心规则如下；允许在不改变断点与布局意图的前提下调整具体间距：

```css
.oemPage {
  --oem-ink: #171918;
  --oem-ivory: #f3f0e8;
  --oem-titanium: #a9afab;
  background: var(--oem-ivory);
}

.oemCapabilitySection,
.oemFormatsSection,
.oemProjectSection,
.oemVariablesSection,
.oemPackagingSection,
.oemQualitySection,
.oemPrepSection,
.oemQuestionsSection {
  width: min(calc(100% - 64px), 1280px);
  margin-inline: auto;
}

.oemCapabilityMap {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 3rem;
  border-block: 1px solid rgb(23 25 24 / 32%);
}

.oemCapabilityMap article {
  min-height: 280px;
  padding: 1.5rem;
  border-right: 1px solid rgb(23 25 24 / 20%);
  border-bottom: 1px solid rgb(23 25 24 / 20%);
}

.oemCapabilityMap article > span,
.oemFormatField a > span:first-child {
  color: #68706c;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
}

.oemCapabilityMap h3,
.oemVariableGrid h3 {
  margin-top: 3.25rem;
  font-size: clamp(1.35rem, 2vw, 2rem);
  line-height: 1.05;
}

.oemCapabilityMap p,
.oemStepLedger p,
.oemPackagingGrid p,
.oemQualityLedger p {
  color: #626863;
  line-height: 1.55;
}

.oemFormatField {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 3rem;
  border-top: 1px solid var(--oem-ink);
}

.oemFormatField a {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.9rem;
  min-height: 92px;
  align-items: center;
  padding: 1rem;
  border-right: 1px solid rgb(23 25 24 / 20%);
  border-bottom: 1px solid rgb(23 25 24 / 20%);
  color: inherit;
  text-decoration: none;
}

.oemFormatField a:focus-visible,
.oemPrimaryCta:focus-visible,
.oemRelatedLinks a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.oemProjectSection,
.oemQualitySection {
  padding: clamp(2.5rem, 5vw, 4.5rem);
  background: #e8e6df;
}

.oemStepLedger {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 3rem;
  border-top: 1px solid var(--oem-ink);
}

.oemStepLedger article,
.oemPackagingGrid article,
.oemQualityLedger article {
  padding: 1.5rem;
  border-right: 1px solid rgb(23 25 24 / 20%);
  border-bottom: 1px solid rgb(23 25 24 / 20%);
}

.oemVariableGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: 3rem;
  background: var(--oem-ink);
  color: var(--oem-ivory);
}

.oemVariableGrid article {
  min-height: 360px;
  padding: clamp(1.5rem, 4vw, 3rem);
  border-right: 1px solid rgb(243 240 232 / 22%);
}

.oemVariableGrid p,
.oemVariableGrid li {
  color: rgb(243 240 232 / 72%);
}

.oemPackagingGrid,
.oemQualityLedger {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 3rem;
  border-top: 1px solid var(--oem-ink);
}

.oemChecklist {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
  counter-reset: oem-input;
}

.oemChecklist li {
  min-height: 112px;
  padding: 1.25rem;
  border: 1px solid rgb(243 240 232 / 20%);
  counter-increment: oem-input;
}

.oemChecklist li::before {
  display: block;
  margin-bottom: 1.5rem;
  color: rgb(243 240 232 / 62%);
  content: counter(oem-input, decimal-leading-zero);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
}

.oemPrepSection {
  padding: clamp(2.5rem, 5vw, 4.5rem);
  background: var(--oem-ink);
  color: var(--oem-ivory);
}

.oemCta {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem 3rem;
}

.oemCta > p,
.oemRelatedLinks {
  grid-column: 1;
}

.oemPrimaryCta {
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  justify-content: center;
  min-width: 180px;
  border: 1px solid currentColor;
  padding-inline: 1.25rem;
}

.oemRelatedLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

@media (max-width: 900px) {
  .oemCapabilityMap,
  .oemFormatField,
  .oemPackagingGrid,
  .oemQualityLedger {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .oemStepLedger,
  .oemChecklist {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .oemCapabilitySection,
  .oemFormatsSection,
  .oemProjectSection,
  .oemVariablesSection,
  .oemPackagingSection,
  .oemQualitySection,
  .oemPrepSection,
  .oemQuestionsSection {
    width: calc(100% - 32px);
  }

  .oemCapabilityMap,
  .oemFormatField,
  .oemStepLedger,
  .oemVariableGrid,
  .oemPackagingGrid,
  .oemQualityLedger,
  .oemChecklist,
  .oemCta {
    grid-template-columns: 1fr;
  }

  .oemCapabilityMap article,
  .oemVariableGrid article {
    min-height: 0;
  }

  .oemPrimaryCta,
  .oemCta > p,
  .oemRelatedLinks {
    grid-column: 1;
    grid-row: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .oemPage *,
  .oemPage *::before,
  .oemPage *::after {
    scroll-behavior: auto;
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
}
```

在实现时删除或停止引用旧的 `.identitySection`、`.customSection`、`.productionSection`、`.projectPathSection`、`.qualityPathSection` 和 `.prepSection` 页面组合，但不得删除仍被其他页面使用的共享样式。

- [ ] **Step 4: 运行定向 E2E 并确认通过**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: 7 tests PASS（六个视口 + Reduced Motion），所有视口横向溢出不超过 1px。

- [ ] **Step 5: 运行组件测试，确保样式改动未影响结构**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: PASS。

- [ ] **Step 6: 提交响应式样式与 E2E**

```powershell
git add src/components/patterns/vithelo-b2b-pages.module.css tests/e2e/oem-odm-page.spec.ts
git commit -m "style: create OEM ODM capability ledger"
```

### Task 4: 完成定向质量门与项目状态记录

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: 运行 OEM / ODM 相关单元测试**

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/metadata-brand.test.ts
```

Expected: 全部 PASS，且无 React、Zod 或可访问性警告。

- [ ] **Step 2: 运行相关源文件 ESLint**

```powershell
pnpm.cmd exec eslint src/app/oem-odm/page.tsx src/components/patterns/vithelo-oem-odm-page.tsx src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts tests/e2e/oem-odm-page.spec.ts
```

Expected: exit code 0。

- [ ] **Step 3: 运行类型检查**

```powershell
pnpm.cmd typecheck
```

Expected: exit code 0；不手工编辑生成的 `next-env.d.ts`，也不把它的偶发变化加入本任务提交。

- [ ] **Step 4: 运行生产构建**

```powershell
pnpm.cmd build
```

Expected: exit code 0。记录当前本机 Node 版本；若不是 Node 20.x，不把结果描述为 Hostinger Node 20 构建证明。

- [ ] **Step 5: 运行定向 E2E**

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: 7 tests PASS。不得在运行期间另外启动 `127.0.0.1:3100` 服务。

- [ ] **Step 6: 人工检查证据边界和页面顺序**

检查：

```powershell
Select-String -Path 'src\content\demo\vithelo-b2b-site.ts' -Pattern 'FDA approved|certified facility|guaranteed|GMP|HACCP|HALAL|BRC|FSSC'
```

Expected: OEM / ODM 新记录不命中这些声明。随后在 1440×1000、1024×768、390×844 三个代表视口检查十区块顺序、标题换行、能力网格、剂型链接、FAQ、CTA、焦点和横向溢出。

- [ ] **Step 7: 更新当前状态文档**

在 `docs/current-status.md` 的 OEM / ODM 参考基线下追加：

```markdown
- `/oem-odm` 已按“七项能力地图 + 八种剂型 + 六步统一项目流程”完成结构化改造，不采用 OEM / ODM 双路径对照。
- 页面新增 MOQ / 交期变量、四类包装、质量与文件边界、六项报价准备和项目 FAQ；所有制造内容继续保持 `DEMO_ONLY` 与条件化表达。
- OEM / ODM 定向单元测试、六视口 E2E、类型检查和构建结果以本轮实际命令输出为准；本地非 Node 20 构建不作为 Hostinger 生产证明。
```

写入本轮命令输出中的真实通过数量；如果任何命令失败，记录失败范围，不写成已通过。

- [ ] **Step 8: 检查最终差异只包含本任务文件**

```powershell
git diff --check
git status --short
git diff -- src/app/oem-odm/page.tsx src/components/patterns/vithelo-oem-odm-page.tsx src/components/patterns/vithelo-b2b-pages.module.css src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts tests/e2e/oem-odm-page.spec.ts docs/current-status.md
```

Expected: 没有空白错误；不暂存或提交工作区原有的首页、动效、媒体、日志和 `next-env.d.ts` 改动。

- [ ] **Step 9: 提交验收记录**

```powershell
git add docs/current-status.md
git commit -m "docs: record OEM ODM page verification"
```

## 执行边界

- 每个实现任务都先观察测试失败，再写最小生产代码。
- 现有工作区包含其他未提交改动；每次 `git add` 必须使用精确文件路径。
- 不推送 GitHub、不部署 Hostinger，除非用户再次明确授权。
- 不宣称全量 E2E 绿色或全站 P0 / P1 清零，除非实际完成对应验证。
