# VITHELO Gummies Concept 01 产品详情页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `/products/gummies?product=gummies-concept-01` 建成一条完整的 Seed 结构机制转译版 B2B 长页，同时保证其他产品详情页不变。

**Architecture:** 在 `ProductDiscoveryItemSchema` 上增加可选的 `pdpStory` 合同，只给 `gummies-concept-01` 配置数据。`VitheloDosageFormDetail` 继续负责 URL 产品解析；解析到 `pdpStory` 时渲染新的 `VitheloProductDetailStory`，否则渲染现有通用详情页。新长页使用独立 CSS Module，避免继续扩张已有综合样式文件。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Zod 4、CSS Modules、Vitest、Testing Library、Playwright。

---

## 文件结构

- Modify: `src/content/schema.ts` — 增加单产品长页的 Zod 合同与推导类型。
- Modify: `src/content/demo/vithelo-b2b-site.ts` — 只给 `gummies-concept-01` 写入已批准的演示内容。
- Create: `src/components/patterns/vithelo-product-detail-story.tsx` — 专属长页结构、画廊与 FAQ 交互。
- Create: `src/components/patterns/vithelo-product-detail-story.module.css` — 专属视觉、响应式与 Reduced Motion。
- Modify: `src/components/patterns/vithelo-dosage-form-detail.tsx` — 保留解析职责并增加专属长页分流。
- Modify: `tests/unit/product-catalog.test.ts` — 验证只有目标产品拥有专属数据且证据边界不变。
- Modify: `tests/unit/vithelo-products-page.test.tsx` — 验证分流、结构、交互与通用回退。
- Create: `tests/e2e/vithelo-product-detail-story.spec.ts` — 六视口、溢出、键盘、Reduced Motion 与产品隔离。
- Create: `docs/superpowers/specs/2026-09-20-vithelo-gummies-concept-01-pdp-acceptance.md` — 记录实施后的定向验收事实。
- Modify: `docs/current-status.md` — 仅更新本产品页的当前状态与验证结果。

## 实施前置

- [ ] **读取当前 Next.js 16 本地文档**

完整阅读以下两个文件后再修改组件，遵循其中对 Client Component、`useSearchParams`、`next/image`、`fill` 与 `sizes` 的当前约束：

```powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
```

## Task 1：建立 `pdpStory` 内容合同

**Files:**
- Modify: `src/content/schema.ts:417-519`
- Test: `tests/unit/product-catalog.test.ts`

- [ ] **Step 1：写失败的合同测试**

在 `tests/unit/product-catalog.test.ts` 增加：

```ts
import { ProductDiscoveryItemSchema } from "@/content/schema";

it("requires a complete nine-section PDP story when the story is configured", () => {
  const base = {
    id: "gummies-concept-01",
    formatSlug: "gummies",
    formatName: "Gummies",
    title: "Plant-Based Gummies Concept 01 for Private Label Nutrition",
    descriptor: "DEMO_ONLY product concept.",
    dataStatus: "DEMO_ONLY" as const,
  };

  const result = ProductDiscoveryItemSchema.safeParse({
    ...base,
    pdpStory: {
      kicker: "GUMMIES · CONCEPT 01",
      subhead: "A demonstration concept for project review.",
      commerceNotice: "Price, MOQ, lead time and production claims are not configured.",
      capabilityHeadline: "Shape the product around your brief.",
      capabilities: [{ title: "Formula", copy: "Formula direction." }],
    },
  });

  expect(result.success).toBe(false);
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts`

Expected: FAIL，因为当前 Zod 对象会剥离未知的 `pdpStory`，测试得到 `result.success === true`，与期望的拒绝结果不一致。

- [ ] **Step 3：新增完整 Zod 合同**

在 `src/content/schema.ts` 的 `ProductDiscoveryItemSchema` 前增加并导出：

```ts
const ProductStoryTextItemSchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
});

const ProductStoryStageSchema = ProductStoryTextItemSchema.extend({
  label: z.string().min(1),
});

const ProductStoryReviewRowSchema = z.object({
  area: z.string().min(1),
  status: z.enum(["SELECTED", "TO_CONFIRM"]),
  guidance: z.string().min(1),
});

export const ProductDetailStorySchema = z.object({
  kicker: z.string().min(1),
  subhead: z.string().min(1),
  commerceNotice: z.string().min(1),
  capabilityHeadline: z.string().min(1),
  capabilities: z.array(ProductStoryTextItemSchema).length(4),
  projectHeadline: z.string().min(1),
  projectIntro: z.string().min(1),
  projectStages: z.array(ProductStoryStageSchema).length(4),
  decisionKicker: z.string().min(1),
  decisionHeadline: z.string().min(1),
  decisionIntro: z.string().min(1),
  decisions: z.array(ProductStoryTextItemSchema).length(4),
  reviewHeadline: z.string().min(1),
  reviewRows: z.array(ProductStoryReviewRowSchema).length(4),
  packagingKicker: z.string().min(1),
  packagingHeadline: z.string().min(1),
  packagingItems: z.array(ProductStoryTextItemSchema).length(3),
  qualityKicker: z.string().min(1),
  qualityHeadline: z.string().min(1),
  qualityCopy: z.string().min(1),
  qualityItems: z.array(ProductStoryTextItemSchema).length(3),
  faqs: z.array(ProductStoryTextItemSchema).length(4),
  inquiry: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    href: z.literal("/contact"),
  }),
});

export const ProductDiscoveryItemSchema = z.object({
  pdpStory: ProductDetailStorySchema.optional(),
});
```

这里的代码表示在现有 `ProductDiscoveryItemSchema` 对象末尾新增 `pdpStory` 字段；现有 `id`、`formatSlug`、`media`、`parameters` 与 `detailSections` 字段原样保留。

同时在文件末尾增加：

```ts
export type ProductDetailStory = z.infer<typeof ProductDetailStorySchema>;
```

- [ ] **Step 4：运行合同测试**

Run: `pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts`

Expected: PASS，且现有目录合同测试保持通过。

- [ ] **Step 5：提交合同变更**

```powershell
git add src/content/schema.ts tests/unit/product-catalog.test.ts
git commit -m "feat(products): add single-product PDP story contract"
```

## Task 2：只给 Gummies Concept 01 配置批准内容

**Files:**
- Modify: `src/content/demo/vithelo-b2b-site.ts:15-105`
- Test: `tests/unit/product-catalog.test.ts`

- [ ] **Step 1：写产品隔离失败测试**

```ts
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

it("configures the long-form PDP story for Gummies Concept 01 only", () => {
  const storyProducts = vitheloB2BProductsPage.discovery.items.filter(
    (item) => item.pdpStory,
  );

  expect(storyProducts).toHaveLength(1);
  expect(storyProducts[0]).toMatchObject({
    id: "gummies-concept-01",
    dataStatus: "DEMO_ONLY",
  });
  expect(storyProducts[0].pdpStory?.capabilities).toHaveLength(4);
  expect(storyProducts[0].pdpStory?.projectStages).toHaveLength(4);
  expect(storyProducts[0].pdpStory?.reviewRows).toHaveLength(4);
  expect(storyProducts[0].pdpStory?.faqs).toHaveLength(4);
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts`

Expected: FAIL，`storyProducts` 长度为 0。

- [ ] **Step 3：添加专属内容常量与条件注入**

在 `discoveryMatrix` 前增加：

```ts
const gummiesConcept01Story = {
  kicker: "GUMMIES · CONCEPT 01",
  subhead:
    "A demonstration concept for aligning formula direction, sensory experience, shape and packaging before project review.",
  commerceNotice:
    "Price, MOQ, lead time and production claims are not configured on this demonstration page.",
  capabilityHeadline: "Shape the product around your brief.",
  capabilities: [
    { title: "Formula Direction", copy: "Align the intended concept and ingredient direction." },
    { title: "Taste + Texture", copy: "Review flavor, sweetness, chew and sensory expectations." },
    { title: "Shape + Color", copy: "Connect product form with the intended brand expression." },
    { title: "Pack + Count", copy: "Discuss bottle, pouch and count as one project system." },
  ],
  projectHeadline: "Decisions that build into a manufacturable brief.",
  projectIntro:
    "The page shows the decisions required to move a concept toward production without promising an outcome before review.",
  projectStages: [
    { label: "01 · BRIEF", title: "Define the intended product experience", copy: "Audience, format, formula direction and pack enter one working brief." },
    { label: "02 · FEASIBILITY", title: "Review fit before confirmation", copy: "Manufacturing feasibility remains subject to approved project inputs." },
    { label: "03 · SAMPLE", title: "Align the sensory direction", copy: "Flavor, texture, shape and color are reviewed together." },
    { label: "04 · PACKAGING", title: "Connect the product and the pack", copy: "Bottle, pouch, count and presentation are discussed before route confirmation." },
  ],
  decisionKicker: "CUSTOMIZATION SYSTEM",
  decisionHeadline: "One gummy concept. Four connected decisions.",
  decisionIntro:
    "VITHELO reviews the product as a complete system rather than treating formula, sensory direction and packaging as separate choices.",
  decisions: [
    { title: "Formula", copy: "Ingredient and serving direction." },
    { title: "Sensory", copy: "Flavor, sweetness, texture and chew." },
    { title: "Form", copy: "Shape, color and visual expression." },
    { title: "Packaging", copy: "Pack type, count and shelf presentation." },
  ],
  reviewHeadline: "Project review at a glance.",
  reviewRows: [
    { area: "Dosage format", status: "SELECTED", guidance: "Gummies selected" },
    { area: "Formula direction", status: "TO_CONFIRM", guidance: "Requires approved inputs" },
    { area: "Flavor + sensory", status: "TO_CONFIRM", guidance: "Requires sample alignment" },
    { area: "Pack + count", status: "TO_CONFIRM", guidance: "Requires project review" },
  ],
  packagingKicker: "PACKAGING DIRECTION",
  packagingHeadline: "Presented as one coherent shelf system.",
  packagingItems: [
    { title: "Bottle direction", copy: "DEMO_ONLY packaging direction." },
    { title: "Label expression", copy: "DEMO_ONLY visual expression." },
    { title: "Product detail", copy: "DEMO_ONLY product presentation." },
  ],
  qualityKicker: "MANUFACTURING + QUALITY",
  qualityHeadline: "A clearer review path before commitment.",
  qualityCopy:
    "Manufacturing fit, raw-material review, in-process checks and finished-product documentation are discussed within the confirmed project scope.",
  qualityItems: [
    { title: "Manufacturing feasibility", copy: "Reviewed against approved project inputs." },
    { title: "In-process alignment", copy: "Checkpoints are discussed within the confirmed scope." },
    { title: "Finished-product documents", copy: "Documentation is discussed before route confirmation." },
  ],
  faqs: [
    { title: "What information should I prepare?", copy: "Share the product direction, target format, intended pack and expected volume." },
    { title: "Which elements can be customized?", copy: "Formula direction, sensory experience, form and packaging can be discussed within the confirmed project scope." },
    { title: "How is manufacturing fit reviewed?", copy: "Fit is reviewed after the relevant formula, format, packaging and volume inputs are available." },
    { title: "Which packaging routes can be discussed?", copy: "Bottle and pouch directions can be discussed; final compatibility remains subject to project review." },
  ],
  inquiry: {
    kicker: "DIRECT INQUIRY",
    title: "Bring the brief. We’ll review the route.",
    copy: "Share the product direction, intended pack and expected volume through the configured inquiry channels.",
    href: "/contact" as const,
  },
};
```

在生成单个产品记录时增加：

```ts
...(formatSlug === "gummies" && sequence === 1
  ? { pdpStory: gummiesConcept01Story }
  : {}),
```

- [ ] **Step 4：验证内容合同与隔离**

Run: `pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts`

Expected: PASS；只有 `gummies-concept-01` 含 `pdpStory`。

- [ ] **Step 5：提交内容变更**

```powershell
git add src/content/demo/vithelo-b2b-site.ts tests/unit/product-catalog.test.ts
git commit -m "content(products): define Gummies Concept 01 PDP story"
```

## Task 3：建立专属长页分流与语义骨架

**Files:**
- Create: `src/components/patterns/vithelo-product-detail-story.tsx`
- Create: `src/components/patterns/vithelo-product-detail-story.module.css`
- Modify: `src/components/patterns/vithelo-dosage-form-detail.tsx:22-45`
- Test: `tests/unit/vithelo-products-page.test.tsx`

- [ ] **Step 1：写专属分流与通用回退测试**

```tsx
it("renders the Seed-aligned B2B story only for Gummies Concept 01", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  const nextProduct = vitheloB2BProductsPage.discovery.items[1];

  const { rerender } = render(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={target}
    />,
  );

  expect(screen.getByRole("main")).toHaveAttribute(
    "data-pdp-layout",
    "seed-aligned-b2b-story",
  );
  expect(screen.getByRole("heading", { name: target.pdpStory?.capabilityHeadline })).toBeVisible();

  rerender(
    <VitheloDosageFormDetail
      format={vitheloB2BProductsPage.formats[0]}
      product={nextProduct}
    />,
  );

  expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
  expect(screen.queryByText(target.pdpStory?.capabilityHeadline ?? "")).not.toBeInTheDocument();
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: FAIL，因为专属组件和 `seed-aligned-b2b-story` 合同尚不存在。

- [ ] **Step 3：创建专属组件的最小语义结构**

创建 `src/components/patterns/vithelo-product-detail-story.tsx`：

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { B2BProductsPage } from "@/content/schema";
import styles from "./vithelo-product-detail-story.module.css";

type Product = B2BProductsPage["discovery"]["items"][number];
type Format = B2BProductsPage["formats"][number];

export function VitheloProductDetailStory({
  format,
  product,
}: {
  format: Format;
  product: Product & { pdpStory: NonNullable<Product["pdpStory"]> };
}) {
  const story = product.pdpStory;
  const [openFaq, setOpenFaq] = useState(0);
  const hero = product.media?.default;

  return (
    <main className={styles.page} data-pdp-layout="seed-aligned-b2b-story">
      <section className={styles.hero} data-testid="pdp-story-hero">
        <div className={styles.heroMedia}>
          {hero ? (
            <Image fill priority src={hero.src} alt={hero.alt} sizes="(max-width: 760px) 100vw, 72vw" />
          ) : (
            <div className={styles.mediaPlaceholder} role="img" aria-label={`${format.name} visual awaiting approval`}>
              DEMO_ONLY · AWAITING APPROVED VISUAL
            </div>
          )}
        </div>
        <article className={styles.brief}>
          <p className={styles.kicker}>{story.kicker}</p>
          <h1>{product.title}</h1>
          <p>{story.subhead}</p>
          <p role="note">Source-provided specifications · pending production verification.</p>
          <Link className={styles.primaryAction} href={story.inquiry.href}>Start a Project</Link>
          <p>{story.commerceNotice}</p>
        </article>
      </section>
      <section aria-labelledby="capability-title">
        <h2 id="capability-title">{story.capabilityHeadline}</h2>
      </section>
      <section aria-labelledby="faq-title">
        <h2 id="faq-title">Questions? Start with the project.</h2>
        {story.faqs.map((faq, index) => (
          <div key={faq.title}>
            <button
              type="button"
              aria-expanded={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              {faq.title}
            </button>
            {openFaq === index ? <p>{faq.copy}</p> : null}
          </div>
        ))}
      </section>
    </main>
  );
}
```

创建最小 CSS：

```css
.page { width: 100%; overflow: clip; background: var(--color-ivory); color: var(--color-graphite); }
.hero { display: grid; grid-template-columns: minmax(0, 72fr) minmax(19rem, 28fr); gap: var(--space-24); padding: calc(var(--home-header-height) + var(--space-24)) var(--space-20) var(--space-48); }
.heroMedia { position: relative; min-height: 58rem; overflow: hidden; border-radius: var(--radius-cinematic); background: var(--color-ivory-deep); }
.heroMedia img { object-fit: cover; }
.brief { padding: var(--space-16) var(--space-20); }
.kicker { font-size: var(--font-size-label); letter-spacing: var(--letter-spacing-label); }
.primaryAction { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; padding: 0 var(--space-24); border-radius: 999px; background: var(--color-graphite); color: var(--color-ivory); }
.primaryAction:focus-visible, .page button:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
.mediaPlaceholder { display: grid; min-height: 58rem; place-items: center; padding: var(--space-24); text-align: center; }
@media (max-width: 760px) { .hero { grid-template-columns: 1fr; padding-inline: var(--space-16); } .heroMedia, .mediaPlaceholder { min-height: 65svh; } }
```

- [ ] **Step 4：在解析器中增加数据驱动分流**

在 `VitheloDosageFormDetail` 解析出 `resolvedProduct` 后、通用布局返回前增加：

```tsx
if (resolvedProduct?.pdpStory) {
  return (
    <VitheloProductDetailStory
      format={format}
      product={{ ...resolvedProduct, pdpStory: resolvedProduct.pdpStory }}
    />
  );
}
```

并导入：

```ts
import { VitheloProductDetailStory } from "@/components/patterns/vithelo-product-detail-story";
```

- [ ] **Step 5：运行组件测试**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: PASS，目标产品走新布局，Concept 02 仍走 `gallery-info`。

- [ ] **Step 6：提交分流骨架**

```powershell
git add src/components/patterns/vithelo-product-detail-story.tsx src/components/patterns/vithelo-product-detail-story.module.css src/components/patterns/vithelo-dosage-form-detail.tsx tests/unit/vithelo-products-page.test.tsx
git commit -m "feat(products): route Concept 01 to long-form PDP"
```

## Task 4：完成首屏画廊、项目简报和折叠信息

**Files:**
- Modify: `src/components/patterns/vithelo-product-detail-story.tsx`
- Modify: `src/components/patterns/vithelo-product-detail-story.module.css`
- Test: `tests/unit/vithelo-products-page.test.tsx`

- [ ] **Step 1：写首屏行为失败测试**

```tsx
it("renders the 72/28 story hero, DEMO_ONLY boundary and project disclosures", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={target} />);

  expect(screen.getByTestId("pdp-story-hero")).toBeVisible();
  expect(screen.getByTestId("pdp-story-gallery")).toHaveAttribute("data-active-index", "0");
  expect(screen.getByRole("note")).toHaveTextContent(/pending production verification/i);
  expect(screen.getByText(/price, moq, lead time/i)).toBeVisible();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute("href", "/contact");

  const parameters = screen.getByRole("button", { name: "Project parameters" });
  expect(parameters).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("button", { name: "Customization options" }));
  expect(screen.getByRole("button", { name: "Customization options" })).toHaveAttribute("aria-expanded", "true");
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: FAIL，画廊状态与项目折叠区尚未实现。

- [ ] **Step 3：实现画廊与三个折叠区**

在组件内增加：

```tsx
const gallery = [
  product.media?.default,
  product.media?.hover,
  ...(product.gallery ?? []),
].filter((item): item is NonNullable<typeof item> => Boolean(item));
const [activeImage, setActiveImage] = useState(0);
const [openBriefPanel, setOpenBriefPanel] = useState("parameters");
const currentImage = gallery[activeImage];
const briefPanels = [
  { id: "parameters", title: "Project parameters", items: product.parameters?.map(({ label, value }) => `${label} · ${value}`) ?? [] },
  { id: "customization", title: "Customization options", items: format.customization },
  { id: "manufacturing", title: "Manufacturing review", items: ["Manufacturing fit", "Raw-material review", "In-process checks", "Finished-product documents"] },
];
```

将首屏媒体替换为带缩略图的结构：

```tsx
<div className={styles.heroMedia} data-testid="pdp-story-gallery" data-active-index={activeImage}>
  {currentImage ? (
    <Image fill priority src={currentImage.src} alt={currentImage.alt} sizes="(max-width: 760px) 100vw, 72vw" />
  ) : (
    <div className={styles.mediaPlaceholder} role="img" aria-label={`${format.name} visual awaiting approval`}>
      DEMO_ONLY · AWAITING APPROVED VISUAL
    </div>
  )}
  <div className={styles.galleryControls} aria-label="Product image">
    {gallery.slice(0, 4).map((image, index) => (
      <button key={`${image.src}-${index}`} type="button" aria-label={`View product image ${index + 1}`} aria-pressed={activeImage === index} onClick={() => setActiveImage(index)}>
        <Image src={image.src} alt="" width={72} height={72} />
      </button>
    ))}
  </div>
</div>
```

在右栏 CTA 后增加：

```tsx
<div className={styles.briefPanels}>
  {briefPanels.map((panel) => (
    <div key={panel.id}>
      <button type="button" aria-expanded={openBriefPanel === panel.id} onClick={() => setOpenBriefPanel(openBriefPanel === panel.id ? "" : panel.id)}>
        <span>{panel.title}</span><span aria-hidden="true">{openBriefPanel === panel.id ? "−" : "+"}</span>
      </button>
      {openBriefPanel === panel.id ? <ul>{panel.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    </div>
  ))}
</div>
```

- [ ] **Step 4：补齐首屏 CSS**

```css
.heroMedia img { object-fit: cover; }
.brief { position: sticky; top: calc(var(--home-header-height) + var(--space-24)); align-self: start; }
.brief h1 { margin: var(--space-16) 0; font-size: clamp(2.25rem, 3.1vw, 4rem); line-height: .98; letter-spacing: var(--letter-spacing-display); }
.galleryControls { position: absolute; inset: auto var(--space-20) var(--space-20); display: flex; gap: var(--space-8); }
.galleryControls button { width: 72px; height: 72px; overflow: hidden; border: 1px solid transparent; border-radius: var(--radius-8); background: var(--color-surface); }
.galleryControls button[aria-pressed="true"] { border-color: var(--color-graphite); }
.galleryControls img { position: static; width: 100%; height: 100%; object-fit: cover; }
.briefPanels { margin-top: var(--space-24); border-top: 1px solid var(--color-border); }
.briefPanels button { width: 100%; min-height: 52px; display: flex; align-items: center; justify-content: space-between; border: 0; border-bottom: 1px solid var(--color-border); background: transparent; color: inherit; text-align: left; }
.briefPanels ul { margin: 0; padding: var(--space-16) 0 var(--space-16) var(--space-20); color: var(--color-muted); }
@media (max-width: 760px) { .brief { position: static; } .galleryControls button { width: 56px; height: 56px; } }
```

- [ ] **Step 5：验证首屏测试**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: PASS。

- [ ] **Step 6：提交首屏实现**

```powershell
git add src/components/patterns/vithelo-product-detail-story.tsx src/components/patterns/vithelo-product-detail-story.module.css tests/unit/vithelo-products-page.test.tsx
git commit -m "feat(products): build Concept 01 hero and project brief"
```

## Task 5：实现定制场景、项目时间轴和四项决策

**Files:**
- Modify: `src/components/patterns/vithelo-product-detail-story.tsx`
- Modify: `src/components/patterns/vithelo-product-detail-story.module.css`
- Test: `tests/unit/vithelo-products-page.test.tsx`

- [ ] **Step 1：写三段结构失败测试**

```tsx
it("renders the capability field, four-stage project path and four decisions", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={target} />);

  expect(screen.getByTestId("pdp-capability-item")).toHaveLength(4);
  expect(screen.getByTestId("pdp-project-stage")).toHaveLength(4);
  expect(screen.getByTestId("pdp-decision")).toHaveLength(4);
  expect(screen.getByRole("heading", { name: target.pdpStory?.projectHeadline })).toBeVisible();
  expect(screen.getByRole("heading", { name: target.pdpStory?.decisionHeadline })).toBeVisible();
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: FAIL，三个区块尚未渲染。

- [ ] **Step 3：渲染三段数据驱动结构**

在 FAQ 前增加：

```tsx
<section className={styles.capabilityScene} aria-labelledby="capability-title">
  {product.gallery?.[0] ? <Image fill src={product.gallery[0].src} alt={product.gallery[0].alt} sizes="100vw" /> : null}
  <h2 id="capability-title">{story.capabilityHeadline}</h2>
  <div className={styles.capabilityGrid}>
    {story.capabilities.map((item) => <article data-testid="pdp-capability-item" key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}
  </div>
</section>

<section className={styles.projectPath} aria-labelledby="project-title">
  <header><h2 id="project-title">{story.projectHeadline}</h2><p>{story.projectIntro}</p></header>
  <div className={styles.projectBody}>
    <ol>{story.projectStages.map((stage) => <li data-testid="pdp-project-stage" key={stage.label}><small>{stage.label}</small><h3>{stage.title}</h3><p>{stage.copy}</p></li>)}</ol>
    {product.gallery?.[1] ? <div className={styles.projectMedia}><Image fill src={product.gallery[1].src} alt={product.gallery[1].alt} sizes="(max-width: 760px) 100vw, 48vw" /></div> : null}
  </div>
</section>

<section className={styles.decisionSystem} aria-labelledby="decision-title">
  <div><p className={styles.kicker}>{story.decisionKicker}</p><h2 id="decision-title">{story.decisionHeadline}</h2><p>{story.decisionIntro}</p></div>
  <div className={styles.decisionGrid}>{story.decisions.map((item, index) => <article data-testid="pdp-decision" key={item.title}><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
</section>
```

- [ ] **Step 4：实现 Seed 式连续节奏的 CSS**

```css
.capabilityScene { position: relative; min-height: 68rem; margin: 0 var(--space-20) var(--space-48); overflow: hidden; border-radius: var(--radius-cinematic); color: var(--color-ivory); }
.capabilityScene > img { object-fit: cover; filter: brightness(.62) saturate(.72); }
.capabilityScene > h2 { position: relative; z-index: 1; max-width: 18ch; margin: 0; padding: var(--space-80) var(--space-40); font-size: clamp(2.6rem, 5vw, 5rem); font-weight: 500; line-height: 1; }
.capabilityGrid { position: absolute; z-index: 1; inset: auto var(--space-24) var(--space-24); display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-16); padding: var(--space-40); border-radius: var(--radius-cinematic); background: rgb(25 27 26 / 58%); backdrop-filter: blur(18px); }
.projectPath { padding: var(--space-96) var(--container-gutter); }
.projectPath > header { display: flex; align-items: end; justify-content: space-between; gap: var(--space-48); }
.projectPath h2, .decisionSystem h2 { max-width: 17ch; font-size: clamp(2.5rem, 5vw, 5rem); line-height: 1; letter-spacing: var(--letter-spacing-display); }
.projectBody { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-64); margin-top: var(--space-80); }
.projectBody ol { margin: 0; padding: 0 0 0 var(--space-32); border-left: 1px solid var(--color-graphite); list-style: none; }
.projectBody li { position: relative; padding: 0 0 var(--space-48); }
.projectBody li::before { content: ""; position: absolute; left: calc(var(--space-32) * -1 - 5px); top: 5px; width: 9px; height: 9px; border-radius: 50%; background: var(--color-graphite); }
.projectMedia { position: relative; min-height: 34rem; overflow: hidden; border-radius: var(--radius-cinematic); }
.projectMedia img { object-fit: cover; }
.decisionSystem { display: grid; grid-template-columns: minmax(0, 43fr) minmax(0, 57fr); gap: var(--space-64); padding: var(--space-96) var(--container-gutter); background: var(--color-ivory-deep); }
.decisionGrid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--color-border); }
.decisionGrid article { min-height: 14rem; padding: var(--space-24); border: 1px solid var(--color-border); background: var(--color-surface); }
@media (max-width: 900px) { .capabilityGrid { grid-template-columns: 1fr 1fr; } .projectBody, .decisionSystem { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .capabilityScene { min-height: 58rem; margin-inline: var(--space-12); } .capabilityGrid { inset-inline: var(--space-12); grid-template-columns: 1fr; padding: var(--space-20); } .decisionGrid { grid-template-columns: 1fr; } }
```

- [ ] **Step 5：验证三段组件测试**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: PASS。

- [ ] **Step 6：提交叙事中段**

```powershell
git add src/components/patterns/vithelo-product-detail-story.tsx src/components/patterns/vithelo-product-detail-story.module.css tests/unit/vithelo-products-page.test.tsx
git commit -m "feat(products): add Concept 01 project narrative"
```

## Task 6：完成审核表、包装、质量、FAQ 与询盘收口

**Files:**
- Modify: `src/components/patterns/vithelo-product-detail-story.tsx`
- Modify: `src/components/patterns/vithelo-product-detail-story.module.css`
- Test: `tests/unit/vithelo-products-page.test.tsx`

- [ ] **Step 1：写后半页失败测试**

```tsx
it("renders review boundaries, packaging, quality, FAQ and direct inquiry", () => {
  const target = vitheloB2BProductsPage.discovery.items[0];
  render(<VitheloDosageFormDetail format={vitheloB2BProductsPage.formats[0]} product={target} />);

  expect(screen.getByTestId("pdp-review-row")).toHaveLength(4);
  expect(screen.getByTestId("pdp-packaging-item")).toHaveLength(3);
  expect(screen.getByTestId("pdp-quality-item")).toHaveLength(3);
  expect(screen.getByRole("button", { name: target.pdpStory?.faqs[0].title })).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(screen.getByRole("button", { name: target.pdpStory?.faqs[1].title }));
  expect(screen.getByText(target.pdpStory?.faqs[1].copy ?? "")).toBeVisible();
  expect(screen.getByRole("link", { name: "Discuss Concept 01" })).toHaveAttribute("href", "/contact");
});
```

- [ ] **Step 2：运行测试并确认失败**

Run: `pnpm.cmd exec vitest run tests/unit/vithelo-products-page.test.tsx`

Expected: FAIL，后半页数据尚未完整渲染。

- [ ] **Step 3：渲染审核、包装与质量区**

```tsx
<section className={styles.reviewMatrix} aria-labelledby="review-title">
  <h2 id="review-title">{story.reviewHeadline}</h2>
  <div>{story.reviewRows.map((row) => <div data-testid="pdp-review-row" key={row.area}><strong>{row.area}</strong><span data-status={row.status}>{row.status === "SELECTED" ? "Selected" : "To confirm"}</span><p>{row.guidance}</p></div>)}</div>
</section>

<section className={styles.packaging} aria-labelledby="packaging-title">
  <p className={styles.kicker}>{story.packagingKicker}</p><h2 id="packaging-title">{story.packagingHeadline}</h2>
  <div>{story.packagingItems.map((item, index) => <article data-testid="pdp-packaging-item" key={item.title}>{product.gallery?.[index] ? <Image fill src={product.gallery[index].src} alt={product.gallery[index].alt} sizes="(max-width: 760px) 100vw, 33vw" /> : null}<div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
</section>

<section className={styles.quality} aria-labelledby="quality-title">
  <div><p className={styles.kicker}>{story.qualityKicker}</p><h2 id="quality-title">{story.qualityHeadline}</h2><p>{story.qualityCopy}</p></div>
  <div>{story.qualityItems.map((item, index) => <article data-testid="pdp-quality-item" key={item.title}><strong>{String(index + 1).padStart(2, "0")}</strong><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
</section>
```

- [ ] **Step 4：完成 FAQ 与询盘收口**

```tsx
<section className={styles.faq} aria-labelledby="faq-title">
  <h2 id="faq-title">Questions?<br />Start with the project.</h2>
  <div>{story.faqs.map((faq, index) => <div key={faq.title}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{faq.title}</span><span aria-hidden="true">{openFaq === index ? "−" : "+"}</span></button>{openFaq === index ? <p>{faq.copy}</p> : null}</div>)}</div>
</section>

<section className={styles.inquiry} aria-labelledby="inquiry-title">
  <div><p className={styles.kicker}>{story.inquiry.kicker}</p><h2 id="inquiry-title">{story.inquiry.title}</h2></div>
  <div><p>{story.inquiry.copy}</p><Link className={styles.primaryAction} href={story.inquiry.href}>Discuss Concept 01</Link></div>
  <footer><span>VITHELO · Nutrition OEM / ODM</span><span>DEMO_ONLY concept · Production inputs require verification</span></footer>
</section>
```

- [ ] **Step 5：完成后半页 CSS 与 Reduced Motion**

```css
.reviewMatrix { display: grid; grid-template-columns: minmax(0, 31fr) minmax(0, 69fr); gap: var(--space-64); padding: var(--space-80) var(--container-gutter); background: var(--color-graphite); color: var(--color-ivory); }
.reviewMatrix h2, .packaging h2, .quality h2, .faq h2, .inquiry h2 { font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 500; line-height: 1; letter-spacing: var(--letter-spacing-display); }
.reviewMatrix > div > div { display: grid; grid-template-columns: 1.5fr .7fr 1fr; gap: var(--space-16); align-items: center; min-height: 82px; border-bottom: 1px solid rgb(244 244 240 / 18%); }
.reviewMatrix [data-status] { justify-self: start; border: 1px solid currentColor; border-radius: 999px; padding: var(--space-8) var(--space-12); font-size: var(--font-size-label); }
.packaging { padding: var(--space-96) var(--container-gutter); }
.packaging > div { display: grid; grid-template-columns: 1.25fr .75fr .75fr; gap: var(--space-16); }
.packaging article { position: relative; min-height: 28rem; overflow: hidden; border-radius: var(--radius-cinematic); background: var(--color-ivory-deep); }
.packaging article > img { object-fit: cover; }
.packaging article > div { position: absolute; inset: auto var(--space-16) var(--space-16); padding: var(--space-16); border-radius: var(--radius-12); background: color-mix(in srgb, var(--color-surface) 88%, transparent); }
.quality { display: grid; grid-template-columns: minmax(0, 42fr) minmax(0, 58fr); gap: var(--space-64); padding: var(--space-80) var(--container-gutter); background: var(--color-ivory-deep); }
.quality > div:last-child { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-16); }
.quality article { min-height: 14rem; padding: var(--space-24); border-radius: var(--radius-cinematic); background: var(--color-surface); }
.faq { display: grid; grid-template-columns: minmax(0, 40fr) minmax(0, 60fr); gap: var(--space-64); padding: var(--space-96) var(--container-gutter); }
.faq button { width: 100%; min-height: 60px; display: flex; align-items: center; justify-content: space-between; border: 0; border-bottom: 1px solid var(--color-border); background: transparent; color: inherit; text-align: left; }
.inquiry { min-height: 40rem; display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-64); align-content: space-between; padding: var(--space-80) var(--container-gutter) var(--space-24); background: var(--color-optical); }
.inquiry footer { grid-column: 1 / -1; display: flex; justify-content: space-between; border-top: 1px solid var(--color-border); padding-top: var(--space-24); }
@media (max-width: 900px) { .reviewMatrix, .quality, .faq, .inquiry { grid-template-columns: 1fr; } .packaging > div, .quality > div:last-child { grid-template-columns: 1fr; } .inquiry footer { grid-column: 1; } }
@media (prefers-reduced-motion: reduce) { .page *, .page *::before, .page *::after { scroll-behavior: auto !important; animation: none !important; transition: none !important; } }
```

- [ ] **Step 6：运行完整定向单元测试**

Run: `pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx`

Expected: PASS。

- [ ] **Step 7：提交完整长页**

```powershell
git add src/components/patterns/vithelo-product-detail-story.tsx src/components/patterns/vithelo-product-detail-story.module.css tests/unit/vithelo-products-page.test.tsx
git commit -m "feat(products): complete Concept 01 long-form PDP"
```

## Task 7：增加六视口与可访问性 E2E

**Files:**
- Create: `tests/e2e/vithelo-product-detail-story.spec.ts`

- [ ] **Step 1：写产品隔离、溢出和 CTA E2E**

```ts
import { expect, test } from "@playwright/test";

const targetRoute = "/products/gummies?product=gummies-concept-01";

test("Concept 01 exposes the complete B2B PDP story without horizontal overflow", async ({ page }) => {
  await page.goto(targetRoute);
  await expect(page.locator("main")).toHaveAttribute("data-pdp-layout", "seed-aligned-b2b-story");
  await expect(page.getByTestId("pdp-capability-item")).toHaveCount(4);
  await expect(page.getByTestId("pdp-project-stage")).toHaveCount(4);
  await expect(page.getByTestId("pdp-decision")).toHaveCount(4);
  await expect(page.getByTestId("pdp-review-row")).toHaveCount(4);
  await expect(page.getByTestId("pdp-packaging-item")).toHaveCount(3);
  await expect(page.getByTestId("pdp-quality-item")).toHaveCount(3);
  await expect(page.getByRole("link", { name: "Discuss Concept 01" })).toHaveAttribute("href", "/contact");

  const width = await page.evaluate(() => ({ client: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("Concept 02 keeps the generic gallery-info detail", async ({ page }) => {
  await page.goto("/products/gummies?product=gummies-concept-02");
  await expect(page.locator("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
  await expect(page.getByTestId("pdp-capability-item")).toHaveCount(0);
});
```

- [ ] **Step 2：写键盘、44px 和 Reduced Motion E2E**

```ts
test("story disclosures are keyboard operable and keep 44px targets", async ({ page }) => {
  await page.goto(targetRoute);
  const secondFaq = page.getByRole("button", { name: "Which elements can be customized?" });
  await secondFaq.focus();
  await page.keyboard.press("Enter");
  await expect(secondFaq).toHaveAttribute("aria-expanded", "true");
  await expect(secondFaq).toBeFocused();

  const undersized = await page.locator("main a, main button").evaluateAll((elements) => elements.filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && (rect.width < 44 || rect.height < 44);
  }).map((element) => element.getAttribute("aria-label") ?? element.textContent?.trim()));
  expect(undersized).toEqual([]);
});

test.use({ reducedMotion: "reduce" });
test("Reduced Motion exposes every meaningful section", async ({ page }) => {
  await page.goto(targetRoute);
  await expect(page.getByRole("heading", { name: "Shape the product around your brief." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Project review at a glance." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Bring the brief. We’ll review the route." })).toBeVisible();
});
```

- [ ] **Step 3：运行桌面定向 E2E 并确认通过**

Run: `pnpm.cmd exec playwright test tests/e2e/vithelo-product-detail-story.spec.ts --project=desktop-1440`

Expected: 4 tests PASS。

- [ ] **Step 4：运行六视口定向 E2E**

Run: `pnpm.cmd exec playwright test tests/e2e/vithelo-product-detail-story.spec.ts`

Expected: 24 tests PASS；六个项目均无横向溢出。

- [ ] **Step 5：提交 E2E**

```powershell
git add tests/e2e/vithelo-product-detail-story.spec.ts
git commit -m "test(products): cover Concept 01 PDP across viewports"
```

## Task 8：完成静态检查、构建和视觉验收记录

**Files:**
- Create: `docs/superpowers/specs/2026-09-20-vithelo-gummies-concept-01-pdp-acceptance.md`
- Modify: `docs/current-status.md`

- [ ] **Step 1：运行相关源文件 lint**

Run:

```powershell
pnpm.cmd exec eslint src/content/schema.ts src/content/demo/vithelo-b2b-site.ts src/components/patterns/vithelo-dosage-form-detail.tsx src/components/patterns/vithelo-product-detail-story.tsx tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx tests/e2e/vithelo-product-detail-story.spec.ts
```

Expected: exit code 0。

- [ ] **Step 2：运行类型检查**

Run: `pnpm.cmd typecheck`

Expected: exit code 0。

- [ ] **Step 3：运行定向单元与六视口 E2E**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/product-catalog.test.ts tests/unit/vithelo-products-page.test.tsx
pnpm.cmd exec playwright test tests/e2e/vithelo-product-detail-story.spec.ts
```

Expected: 两个命令 exit code 0。

- [ ] **Step 4：运行生产构建**

Run: `pnpm.cmd build`

Expected: exit code 0；记录当前 Node 版本，不能把 Node 24 结果描述成 Hostinger Node 20 证明。

- [ ] **Step 5：在六视口进行截图与视觉检查**

依次检查 `1440×1000`、`1280×900`、`1024×768`、`768×1024`、`390×844`、`375×812`：

```text
P0: 页面不可用、关键信息缺失、询盘不可达、身份泄露
P1: 横向溢出、文字裁切、元素覆盖、焦点不可见、重要内容依赖动画
P2: 次要间距、图像裁切、层级或视觉节奏问题
```

验收门槛：P0 = 0、P1 = 0；P2 记录后再决定是否修正。

- [ ] **Step 6：写验收记录**

所有检查通过后，创建 `docs/superpowers/specs/2026-09-20-vithelo-gummies-concept-01-pdp-acceptance.md`。以下内容是通过状态下应写入的完整记录；如果任一检查失败，先修复并重跑，不创建“通过”验收记录：

```markdown
# VITHELO Gummies Concept 01 产品详情页验收

日期：2026-09-20

## 范围

- `/products/gummies?product=gummies-concept-01`
- `gummies-concept-02` 通用详情页回归

## 自动验证

| 检查 | 结果 | 备注 |
| --- | --- | --- |
| 定向 ESLint | PASS | 计划列出的源文件与测试，退出码 0 |
| Typecheck | PASS | `pnpm.cmd typecheck`，退出码 0 |
| 定向 Unit | PASS | 两个定向测试文件全部通过 |
| 六视口 E2E | PASS | 24 项通过 |
| Build | PASS | `pnpm.cmd build`，退出码 0；注明执行时 Node 版本 |

## 视觉检查

| 视口 | P0 | P1 | P2 | 结论 |
| --- | ---: | ---: | ---: | --- |
| 1440×1000 | 0 | 0 | 0 | PASS |
| 1280×900 | 0 | 0 | 0 | PASS |
| 1024×768 | 0 | 0 | 0 | PASS |
| 768×1024 | 0 | 0 | 0 | PASS |
| 390×844 | 0 | 0 | 0 | PASS |
| 375×812 | 0 | 0 | 0 | PASS |

## 数据边界

- VITHELO 公开身份保持不变。
- 页面中的演示产品与包装视觉继续标记 `DEMO_ONLY`。
- 未新增成分、功效、认证、MOQ、交期、价格或法规结论。

## 用户视觉确认

状态：待用户确认
```

- [ ] **Step 7：更新当前状态**

在 `docs/current-status.md` 的“当前版本与验证事实”增加本页实际结果，不覆盖或改写其他并行工作的状态。

- [ ] **Step 8：提交验收记录**

```powershell
git add docs/current-status.md docs/superpowers/specs/2026-09-20-vithelo-gummies-concept-01-pdp-acceptance.md
git commit -m "docs(products): record Concept 01 PDP acceptance"
```

## Task 9：最终差异审查与用户视觉验收

**Files:**
- Review only: 本计划列出的源文件、测试和文档

- [ ] **Step 1：确认差异范围**

Run:

```powershell
git status --short
git diff --stat HEAD~8..HEAD
git diff --check HEAD~8..HEAD
```

Expected: 本功能变更只涉及计划列出的文件；用户原有工作区修改仍保持原样。

- [ ] **Step 2：检查公开内容禁区**

Run:

```powershell
Select-String -Path src/content/demo/vithelo-b2b-site.ts,src/components/patterns/vithelo-product-detail-story.tsx -Pattern 'Seed|GMP|HACCP|Halal|FDA|clinically|price|\$49\.99'
```

Expected: 不包含 Seed 品牌、认证声明、临床声明或参考页价格；允许 `commerceNotice` 中的通用单词 `Price`。

- [ ] **Step 3：打开目标页供用户最终确认**

打开：`http://localhost:3000/products/gummies?product=gummies-concept-01`

同时提供通用回归对照：`http://localhost:3000/products/gummies?product=gummies-concept-02`

- [ ] **Step 4：等待用户视觉确认**

完成标准：用户明确接受目标产品详情页；若用户指出 P0/P1 问题，回到对应任务修复并重新运行定向验证。
