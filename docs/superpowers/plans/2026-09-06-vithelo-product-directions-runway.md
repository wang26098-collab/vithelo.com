# VITHELO 第 5 屏单屏产品切换 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首页第 5 屏改成自然滚动驱动的 sticky 单屏切换，只展示睡眠、运动和女性三个产品方向。

**Architecture:** `#solutions` 提供三段原生滚动距离，内部 sticky 舞台叠放三个故事。CSS View Timeline 将 section 的滚动进度映射到三个画面，不依赖脚本状态、不拦截 wheel，也不改变文档滚动位置。内容继续由 Zod 校验的首页数据提供；Reduced Motion 下回退为三组顺序内容。

**Tech Stack:** Next.js 16 App Router、React 19、CSS Modules、Next Image、Vitest、Testing Library、Playwright。

---

## 文件结构

- 新增：`public/media/vithelo-product-card-active.png`，运动营养专属演示产品图。
- 修改：`src/content/demo/vithelo-b2b-home.ts`，第 5 屏只保留三个方向并映射正确素材。
- 修改：`src/components/patterns/vithelo-market-stage.tsx`，实现 sticky 舞台和观察标记。
- 修改：`src/components/patterns/vithelo-b2b-home.module.css`，实现单屏叠放、切换和响应式布局。
- 修改：`tests/unit/vithelo-market-stage.test.tsx`，验证三故事、初始状态和观察切换。
- 修改：`tests/unit/vithelo-b2b-home-content.test.ts`，验证顺序和素材映射。
- 修改：`tests/e2e/responsive.spec.ts`，验证桌面单屏高度、移动端顺序和无滚动劫持。

### Task 1: 锁定三个方向的数据合同

- [x] **Step 1: 修改内容测试并确认 RED**

在 `tests/unit/vithelo-b2b-home-content.test.ts` 断言：

```ts
expect(vitheloB2BHome.market.stories.map((story) => story.title)).toEqual([
  "Sleep, Stress & Mood",
  "Active Nutrition",
  "Women’s Wellness",
]);
expect(vitheloB2BHome.market.stories.map((story) => story.media.src)).toEqual([
  "/media/vithelo-product-card-sleep.png",
  "/media/vithelo-product-card-active.png",
  "/media/vithelo-product-card-womens.png",
]);
```

运行：

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts
```

预期：旧数据仍返回六个方向，测试失败。

- [x] **Step 2: 生成运动营养产品图**

使用 Imagegen 生成冷 Ivory、Graphite、Titanium 视觉下的 VITHELO Active Nutrition 包装场景。包装只允许出现 `VITHELO` 与 `ACTIVE NUTRITION`，不出现成分、功效、剂量、认证或数字声明。输出保存为 `public/media/vithelo-product-card-active.png`。

- [x] **Step 3: 最小化更新内容数据**

把 `market.stories` 缩减并排序为 Sleep、Active、Women，分别映射 sleep、active、womens 三张产品图，保留现有安全文案和 `FREE_COMMERCIAL_OR_REAL` 状态。

- [x] **Step 4: 运行内容测试并确认 GREEN**

运行：

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts
```

预期：内容测试全部通过。

### Task 2: 先定义 sticky 切换行为

- [x] **Step 1: 修改组件测试并确认 RED**

在 `tests/unit/vithelo-market-stage.test.tsx` 断言：

```tsx
const stage = screen.getByTestId("market-stage");
expect(stage).toHaveAttribute("data-layout", "sticky-product-switcher");
expect(screen.getAllByTestId("market-story")).toHaveLength(3);
expect(screen.getAllByTestId("market-step")).toHaveLength(3);
expect(within(stage).queryByRole("button")).not.toBeInTheDocument();
```

E2E 在真实浏览器中按整屏滚动，读取每个故事的最终可见状态。

运行：

```powershell
pnpm.cmd test tests/unit/vithelo-market-stage.test.tsx
```

预期：旧纵向实现没有 sticky 布局、标记或 active 状态，测试失败。

- [x] **Step 2: 实现无状态切换器**

`VitheloMarketStage` 只渲染三个故事和三个滚动段。组件不使用 `useState`、`IntersectionObserver` 或 `wheel` 监听器；切换状态完全交给 CSS View Timeline。

- [x] **Step 3: 渲染单屏叠放结构**

组件结构固定为：

```tsx
<section data-layout="sticky-product-switcher" id="solutions">
  <div className={styles.marketStickyStage}>
    <div className={styles.marketStoryStack}>{/* 三个叠放故事 */}</div>
  </div>
  <div aria-hidden="true" className={styles.marketScrollTrack}>
    {/* 三个 100svh 标记 */}
  </div>
</section>
```

图片、标题、编号和说明都在同一个故事层中切换，DOM 保留全部三组内容。

- [x] **Step 4: 运行组件测试并确认 GREEN**

运行：

```powershell
pnpm.cmd test tests/unit/vithelo-market-stage.test.tsx
```

预期：sticky 结构、三个标记和索引切换测试全部通过。

### Task 3: 完成参考站式单屏视觉

- [x] **Step 1: 改写第 5 屏 CSS**

实现以下明确布局：

```css
.marketStage { position: relative; min-height: 300svh; padding: 0; }
.marketStickyStage { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; }
.marketStoryStack { position: relative; width: 100%; height: 100%; }
.marketStory { position: absolute; inset: 0; opacity: 0; visibility: hidden; pointer-events: none; }
.marketStory:first-child { opacity: 1; visibility: visible; }
.marketScrollTrack { position: absolute; inset: 0; }
.marketStep { height: 100svh; }
```

在 `@supports (animation-timeline: view())` 中为三层故事定义独立时间区间。保留已确认的横向圆角画面、双层图片、Georgia 标题、图片下方说明。移动端画面切换为 4:5。Reduced Motion 中取消 sticky 与动画，恢复顺序内容。

- [x] **Step 2: 运行目标 lint、单元测试和类型检查**

```powershell
pnpm.cmd test tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home-content.test.ts
pnpm.cmd typecheck
```

预期：全部通过。

### Task 4: 浏览器验收

- [x] **Step 1: 更新 E2E 验收**

桌面测试断言：section 高度约为三个视口，sticky 舞台高度等于一个视口，三个故事叠放且只有一个可见。移动端测试断言无横向溢出、三个标题按滚动标记依次激活。

- [x] **Step 2: 运行专项 E2E**

复用现有本地开发服务器运行：

```powershell
$env:E2E_EXTERNAL_SERVER = "1"
$env:E2E_BASE_URL = "http://127.0.0.1:3000"
node.exe node_modules/@playwright/test/cli.js test tests/e2e/responsive.spec.ts --grep "product directions" --project desktop-1440 --project mobile-390
```

预期：专项桌面与移动端测试通过。

- [x] **Step 3: 截图检查**

在 1440×900 和 390×844 下分别滚动到三个标记并截图，确认：产品完整、标题无裁切、切换发生在同一个视口、离开 section 后恢复原生页面滚动。

- [x] **Step 4: 生产构建**

```powershell
pnpm.cmd build
```

预期：Next.js 生产构建通过。全量测试中的既有陈旧断言单独记录，不将其误报为本次回归。
