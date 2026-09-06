# VITHELO 首页第三屏主打产品 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页第三屏改为睡眠、运动、女性三款 VITHELO 主打产品的高质感 Editorial Product Runway，并保持第二屏和第五屏不变。

**Architecture:** 保留现有 `capacity` 内容入口与 `#capacity-boundary` 公共锚点，定向替换其 Zod 数据结构、演示内容、React 标记和 CSS Module 样式。产品图片继续来自 `public/media/`，使用 Next.js `Image` 和 `Link`，通过现有首页 IntersectionObserver 动效系统实现进入渐显，通过 CSS 实现桌面悬停反馈与 Reduced Motion 静态回退。

**Tech Stack:** Next.js App Router、React、TypeScript、Zod、CSS Modules、Vitest、Testing Library、Playwright

---

### Task 1: 锁定第三屏内容契约

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: 写入失败的数据测试**

将旧的 capacity dashboard 断言替换为三个主打产品的断言：

```ts
it("defines the approved featured product runway", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.capacity.kicker).toBe("03 · FEATURED PRODUCTS");
  expect(parsed.capacity.action).toEqual({ label: "View All Products", href: "/products" });
  expect(parsed.capacity.products.map((product) => product.title)).toEqual([
    "Sleep Health",
    "Active Nutrition",
    "Women’s Health",
  ]);
  expect(parsed.capacity.products.map((product) => product.media.src)).toEqual([
    "/media/vithelo-product-card-sleep.png",
    "/media/vithelo-product-card-active.png",
    "/media/vithelo-product-card-womens.png",
  ]);
  expect(parsed.capacity.products.every((product) => product.action.href === "/contact")).toBe(true);
  expect(JSON.stringify(parsed.capacity)).not.toMatch(/Shop Now|price|MOQ|Seed/i);
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: FAIL，因为 `capacity.action` 与 `capacity.products` 尚不存在。

- [ ] **Step 3: 最小化更新 Zod 契约**

将 `capacity` 改为：

```ts
capacity: z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
  action: z.object({
    label: z.literal("View All Products"),
    href: z.literal("/products"),
  }),
  products: z.array(z.object({
    id: z.enum(["sleep", "active", "women"]),
    title: z.string().min(1),
    copy: z.string().min(1),
    media: B2BRequiredMediaSchema,
    action: z.object({
      label: z.literal("Discuss This Product"),
      href: z.literal("/contact"),
    }),
  })).length(3),
}),
```

- [ ] **Step 4: 写入已确认的三款产品内容**

在 `vithelo-b2b-home.ts` 中写入规范中的标题、说明、`/products` 入口、三款产品文案、图片尺寸与 `/contact` 行动，不增加功效、剂量、价格、认证或 MOQ。

- [ ] **Step 5: 运行数据测试并确认通过**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: PASS，Zod 解析成功且产品顺序为 Sleep、Active、Women。

### Task 2: 用真实产品陈列替换第三屏标记

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`

- [ ] **Step 1: 写入失败的组件测试**

```tsx
it("renders the third screen as a three-product editorial runway", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const runway = document.getElementById("capacity-boundary")!;
  expect(runway).toHaveAttribute("data-layout", "editorial-product-runway");
  expect(within(runway).getAllByTestId("featured-product-card")).toHaveLength(3);
  expect(within(runway).getAllByTestId("featured-product-image")).toHaveLength(3);
  expect(within(runway).getByRole("link", { name: /View All Products/i })).toHaveAttribute("href", "/products");
  expect(within(runway).getAllByRole("link", { name: /Discuss This Product/i })).toHaveLength(3);
  expect(runway).toHaveTextContent("Sleep Health");
  expect(runway).toHaveTextContent("Active Nutrition");
  expect(runway).toHaveTextContent("Women’s Health");
  expect(runway).not.toHaveTextContent(/Shop Now|price|MOQ|Seed|Pending verification/i);
});
```

- [ ] **Step 2: 运行测试并确认按预期失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL，因为旧第三屏仍渲染四个 capability boundary item。

- [ ] **Step 3: 实现语义化产品陈列**

保留 `id="capacity-boundary"`，将 `data-ui-stage` 改为 `featured-product-runway`，增加 `data-layout="editorial-product-runway"`。顶部使用标题、说明和 `Link`；下方映射 `content.capacity.products`，每张 `<article>` 内包含方向编号、标题、Next.js `Image fill`、说明和 `/contact` 的 `Link`。图片使用 `sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 34vw"`，并为每张卡设置 `data-featured={product.id === "sleep"}` 与 `data-motion-role="collection-item"`。

- [ ] **Step 4: 运行组件测试并确认通过**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS，第三屏三张产品卡与链接全部可访问。

### Task 3: 完成 Editorial Product Runway 视觉与交互

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: 替换旧第三屏样式**

实现以下布局规则：

```css
.capacityBoundarySection {
  min-height: min(100svh, 940px);
  background: #171b19;
  color: var(--ivory);
}

.featuredIntro {
  width: min(100%, 1320px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.7fr) auto;
  align-items: end;
}

.featuredProductGrid {
  width: min(100%, 1320px);
  margin: clamp(2.5rem, 5vw, 4.5rem) auto 0;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) repeat(2, minmax(0, 1fr));
}
```

产品卡使用连续细边框和明度层级，不使用悬浮阴影；图片区占主要高度并让包装主体完整可见，文案与行动区固定在卡片下方。睡眠卡通过更宽列、略深背景和更大的产品图建立主卡层级。

- [ ] **Step 2: 增加精确桌面反馈**

仅在 `@media (hover: hover) and (pointer: fine)` 中加入：卡片背景轻微提亮、产品图 `scale(1.02)`、行动箭头平移。焦点目标保持不小于 44px，不能依赖 hover 才显示内容。

- [ ] **Step 3: 增加响应式与 Reduced Motion**

在 `max-width: 900px` 下使用两列并让 Sleep 跨两列；在 `max-width: 760px` 下改为单列、Sleep 不再跨列，保证无横向滚动。Reduced Motion 下取消图片缩放、卡片位移和延迟，所有内容直接可见。

- [ ] **Step 4: 运行定向质量检查**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

Run: `pnpm.cmd typecheck`

Expected: PASS。

### Task 4: 跨视口浏览器验收

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: 更新 E2E 第三屏断言**

在首页序列测试中断言三张 `featured-product-card`、三张图片、`editorial-product-runway` 布局以及 `/products`、`/contact` 链接；删除旧四个 capability item 断言。

- [ ] **Step 2: 增加第三屏响应式断言**

在响应式测试中读取产品网格列数、`clientWidth` 和 `scrollWidth`：桌面为 3 列，平板为 2 列，手机为 1 列；所有视口 `scrollWidth <= clientWidth + 1`。

- [ ] **Step 3: 运行六视口 E2E**

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/responsive.spec.ts`

Expected: 所有配置视口通过；第三屏无裁切、重叠和横向溢出。

- [ ] **Step 4: 运行生产验证**

先停止仅监听 `127.0.0.1:3000` 的当前开发进程，运行 `pnpm.cmd build`，Expected: PASS；随后重新以隐藏窗口启动 `pnpm.cmd dev`，恢复 `http://127.0.0.1:3000/` 预览。

- [ ] **Step 5: 视觉验收**

在 1440×900、1024×768、390×844 三个代表视口检查第三屏：三款产品均清晰可见；Sleep 主卡层级明确；产品包装未被卡片内再次缩成海报；第二屏和第五屏构图未改变；Reduced Motion 下内容完整显示。

### Task 5: 更新状态记录并提交定向变更

**Files:**
- Modify: `docs/current-status.md`
- Create: `docs/superpowers/specs/2026-09-06-vithelo-featured-products-acceptance.md`

- [ ] **Step 1: 写入中文验收记录**

记录第三屏的结构、内容、三张图片、桌面/平板/手机结果、Reduced Motion、定向测试、TypeScript 和构建结果；如完整回归仍有历史失败，明确区分本次通过项与历史债务。

- [ ] **Step 2: 更新当前状态**

将首页第三屏描述从“制造能力边界”改为“三款主打产品陈列”，保留八屏顺序与第五屏纵向切换说明。

- [ ] **Step 3: 仅暂存本任务文件并提交**

```powershell
git add docs/superpowers/plans/2026-09-06-vithelo-featured-products.md docs/superpowers/specs/2026-09-06-vithelo-featured-products-acceptance.md docs/current-status.md src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/responsive.spec.ts public/media/vithelo-product-card-active.png
git commit -m "feat: build featured product runway"
```

Expected: 提交只包含第三屏及其直接验证文件，不纳入工作区其他既有改动。
