# VITHELO Products Runway Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `/products` 收敛为 8 个剂型入口，每次只展示当前剂型的 10 款 `DEMO_ONLY` 产品，并以已确认的非对称 Product Runway、双图悬浮和完整无障碍退化呈现。

**Architecture:** 保留 Next.js App Router 页面和现有内容适配器边界，在 Zod 合同中把旧的“健康方向 × 剂型”矩阵替换为 8 组固定 10 条的剂型产品记录。客户端页面只管理一个当前剂型状态；布局切换使用现有 `motion/react`，卡片悬浮、键盘焦点、触屏和 Reduced Motion 主要由 CSS 完成。

**Tech Stack:** Next.js 16.3 App Router、React 19、TypeScript 5.9、Zod 4、Motion 13、CSS Modules、Vitest、Testing Library、Playwright。

---

## 文件边界

### 新增

- `public/media/products/beauty-gummies/beauty-gummies-default.png`：白底产品主图。
- `public/media/products/beauty-gummies/beauty-gummies-detail.png`：包装细节悬浮图。
- `public/media/products/beauty-gummies/beauty-gummies-hand.png`：手持食用场景图。
- `public/media/products/beauty-gummies/beauty-gummies-closeup.png`：产品特写图。
- `public/media/products/beauty-gummies/beauty-gummies-routine.png`：日常场景图。
- `public/media/products/beauty-gummies/beauty-gummies-motion.png`：动感场景图。
- `tests/e2e/products-runway.spec.ts`：8 个剂型、10 张卡片、响应式、悬浮和 Reduced Motion 的定向验收。

### 修改

- `src/content/schema.ts`：把产品发现合同收敛为 8 个剂型、80 条记录及默认/悬浮媒体对。
- `src/content/demo/vithelo-b2b-site.ts`：生成 8 × 10 的 `DEMO_ONLY` 产品数据并映射当前六张素材。
- `src/lib/product-discovery.ts`：移除健康方向过滤，改为按单一剂型选择产品。
- `tests/unit/product-discovery.test.ts`：验证单剂型选择行为。
- `src/components/patterns/vithelo-products-page.tsx`：移除健康方向 UI，渲染 Product Runway。
- `src/components/patterns/vithelo-b2b-pages.module.css`：实现非对称桌面布局、触屏退化和 Reduced Motion。
- `tests/unit/vithelo-products-page.test.tsx`：验证 8 个剂型、每次 10 张卡片、切换和链接。
- `tests/unit/vithelo-b2b-pages-content.test.ts`：验证内容合同的 8 × 10 不变量和媒体状态。
- `tests/e2e/accessibility.spec.ts`：把旧 `format-ledger` 断言替换为 Product Runway 断言。
- `tests/e2e/vithelo-b2b-site.spec.ts`：把旧 `format-ledger` 断言替换为 Product Runway 断言。
- `docs/current-status.md`：记录 `/products` 新基线与真实验证结果。

### 明确不修改

- `src/components/patterns/vithelo-b2b-home.tsx`
- `src/components/patterns/vithelo-b2b-home.module.css`
- `src/content/demo/vithelo-b2b-home.ts`
- 所有首页专项测试
- `next-env.d.ts`

## Task 1: 用失败测试锁定 8 × 10 内容合同

**Files:**
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `src/content/schema.ts:501-534`
- Modify: `src/content/demo/vithelo-b2b-site.ts:9-29,167-193`
- Create: `public/media/products/beauty-gummies/*.png`

- [ ] **Step 1: 添加失败的内容合同测试**

在 `tests/unit/vithelo-b2b-pages-content.test.ts` 新增：

```ts
it("publishes eight format groups with ten demo products each", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);

  expect(products.discovery.formats.map(({ slug }) => slug)).toEqual([
    "gummies",
    "jelly",
    "hard-capsules",
    "tablets",
    "powders",
    "softgels",
    "liquids",
    "oral-films",
  ]);
  expect(products.discovery.items).toHaveLength(80);

  for (const format of products.discovery.formats) {
    expect(
      products.discovery.items.filter((item) => item.formatSlug === format.slug),
    ).toHaveLength(10);
  }

  expect(products.discovery).not.toHaveProperty("healthDirections");
  expect(products.discovery.items[0].media.default.status).toBe("DEMO_ONLY");
  expect(products.discovery.items[0].media.default.alt).not.toBe("");
  expect(products.discovery.items[0].media.hover.status).toBe("DEMO_ONLY");
});
```

- [ ] **Step 2: 运行测试并确认 RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: FAIL，原因应为当前仍有 10 个 discovery formats、100 条记录、`healthDirections`，且媒体不是 `default`/`hover` 对；不得接受语法或导入错误作为 RED。

- [ ] **Step 3: 复制用户提供的六张素材到公开媒体目录**

使用明确路径复制，不改动内部素材源：

```powershell
New-Item -ItemType Directory -Force -Path "public/media/products/beauty-gummies"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/默认.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-default.png"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/1.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-detail.png"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/2.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-hand.png"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/3.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-closeup.png"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/4.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-routine.png"
Copy-Item -LiteralPath "独立站内容/99-内部敏感/产品/1/5.png" -Destination "public/media/products/beauty-gummies/beauty-gummies-motion.png"
```

Expected: 六张源文件保持原样，六张公开副本位于 `public/media/products/beauty-gummies/`。

- [ ] **Step 4: 最小化修改 Zod 合同**

用产品矩阵专用媒体合同替换旧 `ProductDiscoveryItemSchema` 的健康方向和可选媒体字段：

```ts
const ProductRunwayMediaSchema = z.object({
  status: z.literal("DEMO_ONLY"),
  src: z.string().regex(/^\/media\/products\/[\w./-]+$/),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const ProductDiscoveryItemSchema = z.object({
  id: z.string().min(1),
  formatSlug: ProductFormatSlugSchema,
  formatName: z.string().min(1),
  sequence: z.number().int().min(1).max(10),
  title: z.string().min(1),
  descriptor: z.string().min(1),
  dataStatus: z.literal("DEMO_ONLY"),
  media: z.object({
    default: ProductRunwayMediaSchema.extend({ alt: z.string().min(1) }),
    hover: ProductRunwayMediaSchema,
  }),
});

const ProductDiscoverySchema = z
  .object({
    formats: z
      .array(z.object({ slug: ProductFormatSlugSchema, name: z.string().min(1) }))
      .length(8),
    items: z.array(ProductDiscoveryItemSchema).length(80),
  })
  .superRefine(({ formats, items }, context) => {
    for (const format of formats) {
      const count = items.filter((item) => item.formatSlug === format.slug).length;
      if (count !== 10) {
        context.addIssue({
          code: "custom",
          path: ["items"],
          message: `${format.slug} must contain exactly 10 products`,
        });
      }
    }
  });
```

并让 `B2BProductsPageSchema.discovery` 使用 `ProductDiscoverySchema`，删除不再被引用的 `HealthDirectionSlugSchema`。保留 `ProductFormatSlugSchema` 中的其他 slug，因为现有剂型详情页仍使用它们。

- [ ] **Step 5: 生成 8 × 10 演示数据**

把 `discoveryFormatExamples` 收敛为：

```ts
const discoveryFormatExamples = [
  ["gummies", "Gummies"],
  ["jelly", "Jelly"],
  ["hard-capsules", "Capsules"],
  ["tablets", "Tablets"],
  ["powders", "Powders"],
  ["softgels", "Softgels"],
  ["liquids", "Liquid Drops"],
  ["oral-films", "Oral Films"],
] as const;

const productMediaPairs = [
  ["beauty-gummies-default.png", "beauty-gummies-hand.png"],
  ["beauty-gummies-routine.png", "beauty-gummies-detail.png"],
  ["beauty-gummies-detail.png", "beauty-gummies-motion.png"],
  ["beauty-gummies-closeup.png", "beauty-gummies-default.png"],
  ["beauty-gummies-motion.png", "beauty-gummies-routine.png"],
  ["beauty-gummies-hand.png", "beauty-gummies-closeup.png"],
  ["beauty-gummies-default.png", "beauty-gummies-detail.png"],
  ["beauty-gummies-routine.png", "beauty-gummies-hand.png"],
  ["beauty-gummies-detail.png", "beauty-gummies-closeup.png"],
  ["beauty-gummies-motion.png", "beauty-gummies-default.png"],
] as const;

const productRunwayMedia = (fileName: string, alt: string) => ({
  status: "DEMO_ONLY" as const,
  src: `/media/products/beauty-gummies/${fileName}`,
  alt,
  width: 1024,
  height: 1024,
});

const discoveryMatrix = discoveryFormatExamples.flatMap(
  ([formatSlug, formatName]) =>
    productMediaPairs.map(([defaultImage, hoverImage], index) => {
      const sequence = index + 1;
      const paddedSequence = String(sequence).padStart(2, "0");
      const temporaryAlt = `Temporary VITHELO Beauty Gummies demonstration image for ${formatName} concept ${paddedSequence}`;

      return {
        id: `${formatSlug}-${paddedSequence}`,
        formatSlug,
        formatName,
        sequence,
        title: `${formatName} Concept ${paddedSequence}`,
        descriptor: "DEMO_ONLY product concept. Specifications require approved project inputs.",
        dataStatus: "DEMO_ONLY" as const,
        media: {
          default: productRunwayMedia(defaultImage, temporaryAlt),
          hover: productRunwayMedia(hoverImage, ""),
        },
      };
    }),
);
```

`hover.alt` 允许空字符串，因为悬浮图与主图表达同一产品且属于装饰性交叉淡化；默认图由内容测试保证非空。

- [ ] **Step 6: 运行内容测试并确认 GREEN**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: PASS，且不出现 Zod 错误或媒体路径错误。

- [ ] **Step 7: 提交内容合同与素材**

```powershell
git add src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-b2b-pages-content.test.ts public/media/products/beauty-gummies
git commit -m "feat: define eight product runway groups"
```

提交前执行 `git diff --cached --name-only`，确认没有首页文件或 `next-env.d.ts`。

## Task 2: 用失败测试替换健康方向过滤器

**Files:**
- Modify: `tests/unit/product-discovery.test.ts`
- Modify: `src/lib/product-discovery.ts`

- [ ] **Step 1: 把旧测试替换为单剂型选择测试**

```ts
import { describe, expect, it } from "vitest";
import { selectFormatProducts } from "@/lib/product-discovery";

const items = [
  { id: "g-01", formatSlug: "gummies" },
  { id: "c-01", formatSlug: "hard-capsules" },
  { id: "g-02", formatSlug: "gummies" },
] as const;

describe("selectFormatProducts", () => {
  it("returns only products that belong to the selected format", () => {
    expect(selectFormatProducts(items, "gummies").map((item) => item.id)).toEqual([
      "g-01",
      "g-02",
    ]);
  });
});
```

- [ ] **Step 2: 运行测试并确认 RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/product-discovery.test.ts
```

Expected: FAIL with `selectFormatProducts` not exported。

- [ ] **Step 3: 写最小选择函数**

```ts
export function selectFormatProducts<Item extends { formatSlug: string }>(
  items: readonly Item[],
  format: string,
): Item[] {
  return items.filter((item) => item.formatSlug === format);
}
```

删除不再使用的 `ProductDiscoveryFilters` 与 `filterProductDiscovery`。

- [ ] **Step 4: 运行测试并确认 GREEN**

```powershell
pnpm.cmd test -- tests/unit/product-discovery.test.ts
```

Expected: PASS。

- [ ] **Step 5: 提交选择函数**

```powershell
git add src/lib/product-discovery.ts tests/unit/product-discovery.test.ts
git commit -m "refactor: select products by dosage format"
```

## Task 3: 用失败组件测试驱动 Product Runway

**Files:**
- Modify: `tests/unit/vithelo-products-page.test.tsx`
- Modify: `src/components/patterns/vithelo-products-page.tsx`

- [ ] **Step 1: 添加产品矩阵行为测试**

保留文件中现有的 gummies detail gallery 测试，只替换旧产品发现断言：

```tsx
it("renders eight format controls and ten gummies by default", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);

  const formatNavigation = screen.getByRole("navigation", { name: "Product formats" });
  expect(within(formatNavigation).getAllByRole("button")).toHaveLength(8);
  expect(screen.queryByRole("button", { name: "Pet Health" })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Gummies" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByTestId("product-runway").children).toHaveLength(10);
  expect(screen.getByText("10 products · DEMO_ONLY")).toBeVisible();
});

it("switches the runway to one selected format", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);

  fireEvent.click(screen.getByRole("button", { name: "Capsules" }));

  expect(screen.getByRole("button", { name: "Capsules" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(screen.getByRole("heading", { name: "Capsules" })).toBeVisible();
  expect(screen.getByTestId("product-runway").children).toHaveLength(10);
  expect(screen.getAllByRole("link", { name: /Capsules Concept/ })).toHaveLength(10);
  for (const link of screen.getAllByRole("link", { name: /Capsules Concept/ })) {
    expect(link).toHaveAttribute("href", "/products/hard-capsules");
  }
});
```

将 `within` 加入 `@testing-library/react` 导入。

- [ ] **Step 2: 运行测试并确认 RED**

```powershell
pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx
```

Expected: FAIL，原因应为旧健康方向栏仍存在、剂型按钮为 10 个或缺少 `product-runway`。

- [ ] **Step 3: 把页面状态收敛为单一剂型**

组件状态和选择逻辑采用：

```tsx
const defaultFormat = content.discovery.formats[0];
const [activeFormat, setActiveFormat] = useState(defaultFormat.slug);
const activeFormatRecord =
  content.discovery.formats.find((item) => item.slug === activeFormat) ?? defaultFormat;
const products = useMemo(
  () => selectFormatProducts(content.discovery.items, activeFormatRecord.slug),
  [activeFormatRecord.slug, content.discovery.items],
);
```

删除 `directions`、`toggleDirection`、`.healthDirectionBar` JSX 和 Clear All Filters。剂型导航使用：

```tsx
<nav aria-label="Product formats" className={styles.discoveryRail}>
  <p className={styles.discoveryRailLabel}>Formats</p>
  <div className={styles.formatList}>
    {content.discovery.formats.map((item) => (
      <button
        aria-pressed={activeFormat === item.slug}
        key={item.slug}
        onClick={() => setActiveFormat(item.slug)}
        type="button"
      >
        <span>{item.name}</span>
        <span aria-hidden="true">{activeFormat === item.slug ? "01" : "—"}</span>
      </button>
    ))}
  </div>
</nav>
```

- [ ] **Step 4: 渲染一大九小的 Runway**

保持现有 `AnimatePresence`/`motion` 能力，改为按当前剂型切换整组：

```tsx
<AnimatePresence initial={false} mode="wait">
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    className={styles.productRunway}
    data-testid="product-runway"
    exit={{ opacity: 0, y: -8 }}
    initial={{ opacity: 0, y: 12 }}
    key={activeFormatRecord.slug}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    {products.map((item, index) => (
      <Link
        aria-label={`${item.title} · Explore format`}
        className={`${styles.runwayCard} ${index === 0 ? styles.runwayCardFeatured : ""}`}
        data-product-position={index === 0 ? "featured" : "standard"}
        href={`/products/${item.formatSlug}`}
        key={item.id}
      >
        <span className={styles.runwayMedia}>
          <Image
            alt={item.media.default.alt}
            className={styles.runwayImageDefault}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 40vw"
            src={item.media.default.src}
          />
          <Image
            alt=""
            aria-hidden="true"
            className={styles.runwayImageHover}
            fill
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 40vw"
            src={item.media.hover.src}
          />
        </span>
        <span className={styles.runwayCopy}>
          <span className={styles.kicker}>
            {index === 0 ? "FEATURED" : item.formatName} / {String(item.sequence).padStart(2, "0")}
          </span>
          <strong data-testid="product-title">{item.title}</strong>
          <span>{item.descriptor}</span>
          <span className={styles.discoveryCardAction}>Explore format →</span>
        </span>
      </Link>
    ))}
  </motion.div>
</AnimatePresence>
```

保留当前空状态，但将按钮改为 `Return to Gummies` 并调用 `setActiveFormat(defaultFormat.slug)`。

- [ ] **Step 5: 运行组件测试并确认 GREEN**

```powershell
pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx
```

Expected: PASS，现有 gummies gallery 测试也继续通过。

- [ ] **Step 6: 提交组件行为**

```powershell
git add src/components/patterns/vithelo-products-page.tsx tests/unit/vithelo-products-page.test.tsx
git commit -m "feat: switch products by dosage format"
```

由于这两个文件已有未提交变更，提交前必须运行 `git diff --cached`，确认现有 `motion/react` 与 gummies detail 测试被保留且没有夹带不相关代码。

## Task 4: 实现 Product Runway 视觉、悬浮和退化

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css:59-70,962-1005`

- [ ] **Step 1: 写入桌面非对称布局**

用以下结构替换旧 `.discoveryGrid`/`.discoveryCard` 规则：

```css
.productsPage .discoveryLayout {
  width: calc(100% - 96px);
  max-width: 1720px;
  margin-inline: auto;
}

.discoveryLayout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  border-top: 1px solid var(--color-border);
}

.discoveryRail {
  position: sticky;
  top: 5rem;
  align-self: start;
  min-height: 34rem;
  padding: 2rem 1.5rem;
  border-right: 1px solid var(--color-border);
}

.productRunway {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.25rem;
  padding-top: 1.5rem;
}

.runwayCardFeatured {
  grid-column: span 7;
  grid-row: span 2;
}

.runwayCard:nth-child(2),
.runwayCard:nth-child(3) {
  grid-column: span 5;
  display: grid;
  grid-template-columns: minmax(8rem, 0.42fr) minmax(0, 0.58fr);
}

.runwayCard:nth-child(n + 4):nth-child(-n + 9) {
  grid-column: span 4;
}

.runwayCard:nth-child(10) {
  grid-column: span 12;
  display: grid;
  grid-template-columns: minmax(16rem, 0.46fr) minmax(0, 0.54fr);
}
```

九张次级卡自然分布在右列；不使用 JavaScript 计算坐标或滚动劫持。

- [ ] **Step 2: 写入双图悬浮与焦点状态**

```css
.runwayCard {
  min-width: 0;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border-top: 1px solid var(--color-ink);
  background: var(--color-surface);
}

.runwayMedia {
  position: relative;
  display: block;
  min-height: 12rem;
  overflow: hidden;
  background: var(--color-surface-subtle);
}

.runwayCardFeatured .runwayMedia {
  aspect-ratio: 1 / 1.04;
}

.runwayImageDefault,
.runwayImageHover {
  object-fit: cover;
  transition: opacity 360ms ease, transform 560ms cubic-bezier(.2, .7, .2, 1);
}

.runwayImageHover {
  opacity: 0;
}

.runwayCard:is(:hover, :focus-visible) .runwayImageDefault {
  opacity: 0;
  transform: scale(1.035);
}

.runwayCard:is(:hover, :focus-visible) .runwayImageHover {
  opacity: 1;
  transform: scale(1.035);
}

.runwayCard:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 4px;
}

.discoveryCardAction {
  display: inline-block;
  transform: translateX(-.4rem);
  opacity: .72;
  transition: opacity 220ms ease, transform 220ms ease;
}

.runwayCard:is(:hover, :focus-visible) .discoveryCardAction {
  opacity: 1;
  transform: translateX(0);
}
```

- [ ] **Step 3: 写入平板、手机和 Reduced Motion 规则**

```css
@media (max-width: 900px) {
  .discoveryLayout { grid-template-columns: 1fr; }
  .discoveryRail {
    position: static;
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }
  .formatList { flex-direction: row; overflow-x: auto; }
  .formatList button { flex: 0 0 auto; min-height: 44px; }
  .productRunway { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .runwayCard,
  .runwayCardFeatured,
  .runwayCard:nth-child(n) { grid-column: auto; grid-row: auto; display: block; }
}

@media (max-width: 560px) {
  .productRunway { grid-template-columns: 1fr; }
  .runwayCardFeatured .runwayMedia,
  .runwayMedia { aspect-ratio: 1 / 1.04; }
  .discoveryCardAction { opacity: 1; transform: none; }
}

@media (hover: none) {
  .discoveryCardAction { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .runwayImageDefault,
  .runwayImageHover,
  .discoveryCardAction { transition: none; transform: none; }
  .runwayCard:is(:hover, :focus-visible) .runwayImageDefault { opacity: 1; }
  .runwayCard:is(:hover, :focus-visible) .runwayImageHover { opacity: 0; }
}
```

- [ ] **Step 4: 运行组件测试、类型检查和定向 ESLint**

```powershell
pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx tests/unit/product-discovery.test.ts tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd typecheck
pnpm.cmd exec eslint src/components/patterns/vithelo-products-page.tsx src/content/schema.ts src/content/demo/vithelo-b2b-site.ts src/lib/product-discovery.ts tests/unit/vithelo-products-page.test.tsx tests/unit/product-discovery.test.ts tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: 三个命令退出码均为 0；不编辑 `next-env.d.ts` 的 incidental regeneration。

- [ ] **Step 5: 提交样式**

```powershell
git add src/components/patterns/vithelo-b2b-pages.module.css
git commit -m "style: add editorial product runway"
```

## Task 5: 用 Playwright 锁定六个验收视口

**Files:**
- Create: `tests/e2e/products-runway.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts:103-104`
- Modify: `tests/e2e/vithelo-b2b-site.spec.ts:73-82`

- [ ] **Step 1: 添加失败的结构与切换 E2E**

```ts
import { expect, test } from "@playwright/test";

test("products runway exposes eight formats and ten products at a time", async ({ page }) => {
  await page.goto("/products");

  const formats = page.getByRole("navigation", { name: "Product formats" });
  await expect(formats.getByRole("button")).toHaveCount(8);
  await expect(page.getByTestId("product-runway").locator(":scope > a")).toHaveCount(10);
  await expect(page.getByRole("button", { name: "Gummies" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await formats.getByRole("button", { name: "Capsules" }).click();
  await expect(page.getByRole("button", { name: "Capsules" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByTestId("product-runway").locator(":scope > a")).toHaveCount(10);
  await expect(page.getByTestId("product-runway").locator(":scope > a").first()).toHaveAttribute(
    "href",
    "/products/hard-capsules",
  );
});
```

- [ ] **Step 2: 运行 E2E 并确认 RED**

```powershell
pnpm.cmd test:e2e -- tests/e2e/products-runway.spec.ts
```

Expected: FAIL，原因应为旧页面没有 8 个 `Product formats` 控件或 `product-runway`。

- [ ] **Step 3: 添加响应式、悬浮、焦点和 Reduced Motion 检查**

```ts
test("products runway remains readable and overflow-free", async ({ page }) => {
  await page.goto("/products");

  const firstCard = page.getByTestId("product-runway").locator(":scope > a").first();
  await firstCard.focus();
  await expect(firstCard).toBeFocused();
  await expect(firstCard.getByText("Explore format →")).toBeVisible();

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("reduced motion keeps product content visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/products");

  const firstCard = page.getByTestId("product-runway").locator(":scope > a").first();
  await expect(firstCard.getByTestId("product-title")).toBeVisible();
  await expect(firstCard.getByText("Explore format →")).toBeVisible();
  const transitionDuration = await firstCard.locator("img").first().evaluate(
    (image) => getComputedStyle(image).transitionDuration,
  );
  expect(transitionDuration).toMatch(/^(0s)(, 0s)*$/);
});
```

- [ ] **Step 4: 更新两个旧 Product 断言**

把 `format-ledger` 的可见性和 8 行断言改为：

```ts
await expect(page.getByRole("navigation", { name: "Product formats" })).toBeVisible();
await expect(page.getByTestId("product-runway").locator(":scope > a")).toHaveCount(10);
```

不得修改同文件内的首页断言。

- [ ] **Step 5: 运行六视口定向 E2E 并确认 GREEN**

```powershell
pnpm.cmd test:e2e -- tests/e2e/products-runway.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/vithelo-b2b-site.spec.ts
```

Expected: 相关测试在 1440×1000、1280×900、1024×768、768×1024、390×844、375×812 六个项目中通过；无横向溢出。

- [ ] **Step 6: 提交 E2E**

```powershell
git add tests/e2e/products-runway.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/vithelo-b2b-site.spec.ts
git commit -m "test: cover product runway journeys"
```

## Task 6: 回归、视觉验收与状态记录

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: 运行完整单元测试**

```powershell
pnpm.cmd test
```

Expected: 所有单元测试通过。

- [ ] **Step 2: 运行完整质量命令**

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test:e2e
pnpm.cmd build
```

Expected target: 四条命令退出码均为 0。若完整 lint 仍只因 `独立站内容/` 参考脚本失败，或完整 E2E 仍包含已记录的旧版首页预期失败，保留原始输出并明确标记为仓库既有阻塞；不得编辑内部素材或首页来制造绿色结果，也不得声称完整回归通过。

- [ ] **Step 3: 在六个视口完成视觉检查**

检查：

- 桌面为一张主推大卡加九张次级卡，不出现断裂空洞。
- 平板为两列，剂型导航可横向浏览且不遮挡卡片。
- 手机为单列，44px 触控目标、标题、`DEMO_ONLY` 和行动入口完整。
- 默认图与悬浮图交叉淡化时不跳动、不改变卡片尺寸。
- `focus-visible` 清晰，Reduced Motion 无缩放和位移。
- 页面只公开 `VITHELO`，不出现内部目录名称或来源公司身份。

- [ ] **Step 4: 更新当前状态**

在 `docs/current-status.md` 增加产品页基线：

```md
- `/products` 已收敛为 8 个剂型入口；选择剂型后只显示该剂型的 10 款 `DEMO_ONLY` 产品。
- 产品矩阵采用非对称 Product Runway；桌面一张主推卡加九张次级卡，平板两列，手机单列。
- 产品卡使用用户提供的 VITHELO 临时素材进行双图悬浮；触屏、键盘焦点和 Reduced Motion 保持完整信息。
```

同时把本次实际测试数字和仍存在的完整套件阻塞写入“当前版本与验证事实”，不得沿用计划中的预计数字。

- [ ] **Step 5: 检查任务差异不触碰首页**

```powershell
git diff --name-only 1a34e05..HEAD
git diff --check
git status --short
```

Expected: 本任务提交中没有首页组件、首页样式、首页内容、首页测试或 `next-env.d.ts`。

- [ ] **Step 6: 提交状态文档**

```powershell
git add docs/current-status.md
git commit -m "docs: record products runway baseline"
```

## 最终验收清单

- [ ] 8 个剂型入口且无健康方向筛选。
- [ ] 默认 Gummies；切换任何剂型后只显示其 10 款产品。
- [ ] 总数据量为 80，所有记录均为 `DEMO_ONLY`。
- [ ] 桌面 Product Runway、平板两列、手机单列均无溢出。
- [ ] 悬浮、键盘焦点、触屏和 Reduced Motion 信息等价。
- [ ] 卡片继续进入现有剂型详情页。
- [ ] 用户素材通过内容合同进入页面，内部敏感路径不公开。
- [ ] 首页无本任务新增改动。
- [ ] 定向测试、类型检查与构建通过；完整套件状态如实记录。
