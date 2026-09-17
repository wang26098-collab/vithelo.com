# VITHELO Product Detail Static Canvas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 VITHELO 产品详情页的主图画布调整为 945:645 白底比例，并保持图 2 式左图库右信息的响应式详情结构。

**Architecture:** 继续使用现有 `VitheloDosageFormDetail` 组件和 `vithelo-b2b-pages.module.css`，不拆分新组件、不改变内容适配器。通过稳定的 `data-pdp-layout`、`data-gallery-aspect` 和现有语义节点建立布局契约，CSS 负责主图比例、白底、双栏与移动端堆叠。

**Tech Stack:** Next.js App Router、React、CSS Modules、Vitest、Playwright、pnpm。

---

### Task 1: 建立详情页布局契约测试

**Files:**
- Modify: `src/components/patterns/vithelo-dosage-form-detail.tsx`
- Create: `tests/unit/vithelo-dosage-form-detail.test.tsx`

- [ ] **Step 1: 在组件上暴露稳定的布局数据属性**

在 `<main>` 保留现有 `data-pdp-layout="seed-reference"` 的兼容属性，并增加 `data-pdp-layout="gallery-info"` 的新语义属性或等价稳定选择器；在主图 `<figure>` 增加 `data-gallery-aspect="945/645"`。测试只依赖新属性，不依赖 CSS module 类名。

- [ ] **Step 2: 写失败测试，验证主图比例和结构**

测试渲染 `VitheloDosageFormDetail` 时断言：

```tsx
expect(screen.getByTestId("format-gallery")).toHaveAttribute("data-gallery-aspect", "945/645");
expect(screen.getByRole("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
expect(screen.getByRole("link", { name: /get a free quote/i })).toBeInTheDocument();
```

使用仓库现有 Vitest + Testing Library 配置；format fixture 采用当前 schema 中 gummies 格式的最小合法对象，product 使用无参数的最小合法 product fixture，避免改动内容层。

- [ ] **Step 3: 运行单测确认失败**

运行：`pnpm.cmd vitest run tests/unit/vithelo-dosage-form-detail.test.tsx`

预期：测试因缺少新数据属性失败。

- [ ] **Step 4: 加入最小组件属性实现并重新运行**

只增加上述数据属性，不改动 gallery 状态逻辑、面包屑、内容文案或询盘链接。

运行：`pnpm.cmd vitest run tests/unit/vithelo-dosage-form-detail.test.tsx`

预期：PASS。

### Task 2: 调整主图与双栏视觉

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`（`formatDetailPage`、`formatDetailTop`、`formatGallery`、`formatHeroMedia`、`formatDetailInfo` 及相关响应式规则）

- [ ] **Step 1: 将主图容器改为 945:645 比例**

为 `.formatHeroMedia` 设置 `aspect-ratio: 945 / 645`、`min-height: 0`、`background: #fff`；保留 `position: relative`、`overflow: hidden` 和图片 `object-fit: contain`。不要给图片设置固定像素尺寸，避免小屏横向溢出。

- [ ] **Step 2: 将 PDP 背景统一为白色并保持双栏**

将 `.formatDetailPage`、`.formatDetailTop`、`.formatGallery` 和 `.formatDetailInfo` 的视觉底色统一为 `#fff`；保留右侧信息栏左边界和左图库/右信息的桌面网格。移除旧的蓝色提示框视觉，令 `.formatDescriptionCallout` 使用白底、细灰边界和现有文字层级。

- [ ] **Step 3: 保留图 2 的信息密度但不复制其品牌购买逻辑**

保持现有 `formatSpecs` 的键值列表和 `formatQuoteAction` 询盘入口，CTA 继续链接 `/contact`；不加入价格、订阅、购物车、功效、绿色主题或 Seed 文案。

- [ ] **Step 4: 保持移动端堆叠与 44px 交互目标**

在现有 `max-width: 620px` 规则中保留 `.formatDetailTop { display: block; }`，确保主图按 945:645 比例缩放；保留箭头、缩略图和 CTA 的可见焦点状态，不使用固定宽度覆盖 viewport。

### Task 3: 定向验证与视觉检查

**Files:**
- Modify: none

- [ ] **Step 1: 运行详情页单测与相关页面单测**

运行：`pnpm.cmd vitest run tests/unit/vithelo-dosage-form-detail.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts tests/unit/vithelo-products-page.test.tsx`

预期：全部 PASS。

- [ ] **Step 2: 运行类型检查**

运行：`pnpm.cmd typecheck`

预期：退出码 0；不修改生成的 `next-env.d.ts`。

- [ ] **Step 3: 运行产品相关 E2E**

运行：`pnpm.cmd test:e2e -- tests/e2e/vithelo-b2b-site.spec.ts`

预期：产品路由、图库交互、响应式和可访问性相关断言通过；不启动第二个 3100 端口服务。

- [ ] **Step 4: 运行生产构建**

运行：`pnpm.cmd build`

预期：退出码 0。若出现已知 Node 20/Hostinger 环境差异，只记录，不改变本次页面实现来规避部署配置问题。

- [ ] **Step 5: 检查工作区差异**

运行：`git diff -- src/components/patterns/vithelo-dosage-form-detail.tsx src/components/patterns/vithelo-b2b-pages.module.css tests/unit/vithelo-dosage-form-detail.test.tsx`

确认差异只覆盖本计划中的布局属性、白底样式、主图比例和对应测试；不整理或覆盖其他既有未提交改动。
