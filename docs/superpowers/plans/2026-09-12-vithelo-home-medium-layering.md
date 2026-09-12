# VITHELO 首页前三屏中度层叠实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变首页前三屏内容、顺序、屏高和内间距的前提下，为 Hero、制造证明和三款主打产品建立中度页面板覆盖关系。

**Architecture:** 保留现有 Server Component、内容层和 `VitheloHomeMotion` 行为，只在现有 CSS Module 中增加响应式层叠变量、负外边距、上沿圆角和明确层级。用独立 Playwright 契约在六个验收视口验证覆盖距离、非吸顶行为、Hero 静止、Reduced Motion 和无 JavaScript 状态，不引入新的运行时滚动逻辑或依赖。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、CSS Modules、Vitest、Playwright。

---

## 文件边界

- Create: `tests/e2e/vithelo-home-layering.spec.ts` — 只负责前三屏层叠、响应式、Reduced Motion 和无 JavaScript 契约。
- Modify: `src/components/patterns/vithelo-b2b-home.module.css` — 只增加页面板层级和响应式覆盖值，不改内容网格与锁定几何声明。
- Create after visual approval: `docs/superpowers/specs/2026-09-12-vithelo-home-medium-layering-acceptance.md` — 记录已实际通过的定向验证与用户视觉结论。
- Modify after visual approval: `docs/current-status.md` — 将前三屏中度层叠从待实施方向更新为已验收状态。
- Do not modify: `src/components/patterns/vithelo-b2b-home.tsx`、`src/components/motion/vithelo-home-motion.tsx`、Hero 素材、第四至第八屏实现。

### Task 1: 用六视口 E2E 锁定层叠契约

**Files:**
- Create: `tests/e2e/vithelo-home-layering.spec.ts`
- Verify: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 写入当前会失败的层叠 E2E**

创建 `tests/e2e/vithelo-home-layering.spec.ts`，完整内容如下：

```ts
import { expect, test, type Page } from "@playwright/test";

type ExpectedLayering = {
  panelRadius: number;
  productsOverlap: number;
  proofOverlap: number;
};

function expectedLayering(width: number): ExpectedLayering {
  if (width <= 760) {
    return { panelRadius: 20, productsOverlap: 16, proofOverlap: 20 };
  }
  if (width <= 1100) {
    return { panelRadius: 32, productsOverlap: 24, proofOverlap: 32 };
  }
  return { panelRadius: 40, productsOverlap: 32, proofOverlap: 40 };
}

async function measureLayering(page: Page) {
  return page.locator("main").evaluate((main) => {
    const hero = main.querySelector<HTMLElement>("#hero");
    const proof = main.querySelector<HTMLElement>("#proof");
    const products = main.querySelector<HTMLElement>("#capacity-boundary");
    const customization = main.querySelector<HTMLElement>("#gummy-stage");
    if (!hero || !proof || !products || !customization) {
      throw new Error("Homepage layering sections are missing");
    }

    const heroBox = hero.getBoundingClientRect();
    const proofBox = proof.getBoundingClientRect();
    const productsBox = products.getBoundingClientRect();
    const proofStyle = getComputedStyle(proof);
    const productsStyle = getComputedStyle(products);
    const customizationStyle = getComputedStyle(customization);

    return {
      customizationMarginTop: customizationStyle.marginTop,
      heroImageTransform: getComputedStyle(hero, "::before").transform,
      productsOverlap: Math.round(proofBox.bottom - productsBox.top),
      productsPosition: productsStyle.position,
      productsRadius: Math.round(Number.parseFloat(productsStyle.borderTopLeftRadius)),
      productsZIndex: productsStyle.zIndex,
      proofOverlap: Math.round(heroBox.bottom - proofBox.top),
      proofPosition: proofStyle.position,
      proofRadius: Math.round(Number.parseFloat(proofStyle.borderTopLeftRadius)),
      proofZIndex: proofStyle.zIndex,
    };
  });
}

test("medium layering overlaps only the first three homepage screens", async ({ page, viewport }) => {
  if (!viewport) throw new Error("The layering contract requires a configured viewport");
  await page.goto("/");
  const expected = expectedLayering(viewport.width);
  const actual = await measureLayering(page);

  expect(actual).toEqual({
    customizationMarginTop: "0px",
    heroImageTransform: "none",
    productsOverlap: expected.productsOverlap,
    productsPosition: "relative",
    productsRadius: expected.panelRadius,
    productsZIndex: "3",
    proofOverlap: expected.proofOverlap,
    proofPosition: "relative",
    proofRadius: expected.panelRadius,
    proofZIndex: "2",
  });
});

test("reduced motion keeps the same static layering and complete content", async ({ page, viewport }) => {
  if (!viewport) throw new Error("The layering contract requires a configured viewport");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");

  const expected = expectedLayering(viewport.width);
  const actual = await measureLayering(page);
  expect(actual.proofOverlap).toBe(expected.proofOverlap);
  expect(actual.productsOverlap).toBe(expected.productsOverlap);
  await expect(page.locator("#proof").getByRole("heading", { name: "From Formula to Finished Product" })).toBeVisible();
  await expect(page.locator("#capacity-boundary").getByTestId("featured-product-card")).toHaveCount(3);
});

test("layering and meaningful content survive without JavaScript", async ({ browser, baseURL, viewport }) => {
  if (!baseURL) throw new Error("The no-JavaScript contract requires baseURL");
  if (!viewport) throw new Error("The layering contract requires a configured viewport");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);

  const expected = expectedLayering(viewport.width);
  const actual = await measureLayering(page);
  expect(actual.proofOverlap).toBe(expected.proofOverlap);
  expect(actual.productsOverlap).toBe(expected.productsOverlap);
  await expect(page.locator("#hero").getByRole("heading", { name: "VITHELO — Nutrition OEM / ODM Manufacturer" })).toBeVisible();
  await expect(page.locator("#proof").getByTestId("manufacturing-metric")).toHaveCount(4);
  await expect(page.locator("#capacity-boundary").getByTestId("featured-product-card")).toHaveCount(3);

  await context.close();
});
```

- [ ] **Step 2: 运行新测试并确认失败原因准确**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layering.spec.ts --project=desktop-1280
```

Expected: 3 项中至少第一项失败，失败字段是 `proofOverlap`、`productsOverlap`、圆角或 `zIndex` 尚未达到设计值；不得出现页面启动失败、选择器缺失或 TypeScript 编译错误。

- [ ] **Step 3: 确认现有几何锁测试在改动前通过**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: 1 项 PASS，保存当前 hash 作为实施后对照。

- [ ] **Step 4: 只提交失败测试**

```powershell
git add -- tests/e2e/vithelo-home-layering.spec.ts
git commit -m "test: define homepage layering contract"
```

### Task 2: 用纯 CSS 实现中度页面板覆盖

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Test: `tests/e2e/vithelo-home-layering.spec.ts`
- Verify: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 在 `.homepage` 中加入唯一一组层叠变量和局部堆叠上下文**

在现有 `.homepage` 变量末尾加入以下变量，并在基础声明中加入 `isolation`：

```css
  --home-layer-radius: 40px;
  --home-products-overlap: 32px;
  --home-proof-overlap: 40px;
  isolation: isolate;
```

不得改写任何名称以 `--home-frame` 或 `--home-screen` 开头的现有变量。

- [ ] **Step 2: 为前三屏加入最小层级关系**

在各自现有规则中加入以下声明；其余属性保持不变：

```css
.hero {
  z-index: 1;
}

.proof {
  position: relative;
  z-index: 2;
  margin-top: calc(var(--home-proof-overlap) * -1);
  overflow: hidden;
  border-radius: var(--home-layer-radius) var(--home-layer-radius) 0 0;
}

.section.capacityBoundarySection {
  z-index: 3;
  margin-top: calc(var(--home-products-overlap) * -1);
  border-radius: var(--home-layer-radius) var(--home-layer-radius) 0 0;
}
```

不要增加 `sticky`、`fixed`、`transform`、`scale`、`filter`、`box-shadow`、滚动时间线或新的 JavaScript 状态。

- [ ] **Step 3: 加入平板和手机收敛值**

在现有响应式规则之前增加平板覆盖值：

```css
@media (max-width: 1100px) {
  .homepage {
    --home-layer-radius: 32px;
    --home-products-overlap: 24px;
    --home-proof-overlap: 32px;
  }
}
```

在现有 `@media (max-width: 760px)` 的 `.homepage` 声明中加入：

```css
    --home-layer-radius: 20px;
    --home-products-overlap: 16px;
    --home-proof-overlap: 20px;
```

不得增加手机左右外边距，页面板继续使用当前全宽表面。

- [ ] **Step 4: 运行六视口层叠契约**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layering.spec.ts
```

Expected: 18 项 PASS（3 项测试 × 6 个验收视口），0 项失败。

- [ ] **Step 5: 验证锁定几何、首页顺序和现有动效语义**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts tests/unit/vithelo-b2b-home.test.tsx
pnpm.cmd exec playwright test tests/e2e/nutrition-home-sequence.spec.ts
```

Expected: 两个单元测试文件全部 PASS；首页顺序 E2E 在六视口全部 PASS；几何 hash 不需要更新。

- [ ] **Step 6: 检查本任务只改变允许的 CSS 属性**

Run:

```powershell
git diff -- src/components/patterns/vithelo-b2b-home.module.css
git diff --check
```

Expected: CSS diff 只包含三项层叠变量、`isolation`、前三屏层级/负外边距/上沿圆角/裁切和两个响应式覆盖；无已锁定 `height`、`min-height` 或 `padding*` 声明变化；`git diff --check` 无输出。

- [ ] **Step 7: 提交最小实现**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.module.css
git commit -m "feat: add medium homepage layering"
```

### Task 3: 六视口视觉验收与边界检查

**Files:**
- Verify only: `src/components/patterns/vithelo-b2b-home.module.css`
- Verify only: `tests/e2e/vithelo-home-layering.spec.ts`

- [ ] **Step 1: 启动唯一的本地预览服务**

Run:

```powershell
pnpm.cmd dev
```

Expected: Next.js 在空闲端口正常启动。若随后运行 `pnpm.cmd test:e2e`，先停止该服务，不能占用 E2E 的 `127.0.0.1:3100`。

- [ ] **Step 2: 逐一检查六个验收视口**

按 `1440×1000`、`1280×900`、`1024×768`、`768×1024`、`390×844`、`375×812` 顺序检查以下三个滚动节点：

1. Hero 首屏：素材、尺寸、位置、文案和按钮与锁定基线一致，没有缩放或视差。
2. Hero → 制造证明：第二屏上沿提前露出，圆角完整，覆盖明显但没有卡片漂浮感。
3. 制造证明 → 主打产品：第三屏覆盖略弱于第一次，三款产品仍属于同一屏。

Expected: 六视口均无黑边、圆角露底、层级穿帮、横向滚动条、内容裁切或焦点遮挡；第四屏衔接保持原样。

- [ ] **Step 3: 检查键盘和 Reduced Motion**

在每类视口至少各选一个尺寸，用 Tab 依次进入 Hero、制造证明和产品 CTA；再启用系统 Reduced Motion 重新加载页面。

Expected: 焦点环完整可见，页面不会为了展示层叠而阻止原生滚动；Reduced Motion 保留静态圆角与覆盖，不出现位移、缩放、透明度等待或内容缺失。

- [ ] **Step 4: 向用户展示前三屏并等待视觉确认**

展示桌面 `1440×1000` 与手机 `390×844` 的三个关键滚动节点。只有用户明确确认“连续、克制、干净”后才能进入 Task 4；若用户认为像卡片、作品集或层叠太强，只调整本计划中的圆角和覆盖变量，不重做屏内布局。

### Task 4: 回归、记录与完成闸门

**Files:**
- Create: `docs/superpowers/specs/2026-09-12-vithelo-home-medium-layering-acceptance.md`
- Modify: `docs/current-status.md`

- [ ] **Step 1: 运行产品代码定向质量检查**

Run:

```powershell
pnpm.cmd exec eslint tests/e2e/vithelo-home-layering.spec.ts
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: 定向 ESLint、TypeScript、单元测试和构建 PASS。项目未配置 Stylelint，因此 CSS 通过定向 E2E、几何契约与 `git diff --check` 验证。

- [ ] **Step 2: 运行首页相关和完整 E2E**

先确保没有第二个服务占用 `127.0.0.1:3100`，然后运行：

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layering.spec.ts tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts
pnpm.cmd test:e2e
```

Expected: 所有首页定向测试 PASS。完整 E2E 若仍存在 `docs/current-status.md` 已记录的旧断言失败，则不得宣称仓库全绿，也不得顺手修改非本任务测试；记录实际结果并向用户报告阻塞。

- [ ] **Step 3: 创建已验证的验收记录**

只有 Task 3 获得用户视觉确认、Task 4 Step 1 通过且层叠定向 E2E 为 18/18 时，创建以下文件：

```markdown
# VITHELO 首页前三屏中度层叠验收

## 结论

首页前三屏中度层叠已通过用户视觉确认。Hero 保持锁定且静止；制造证明与三款主打产品通过响应式页面板覆盖形成连续叙事；第四至第八屏未进入本轮修改范围。

## 自动验证

- 层叠定向 E2E：18/18 通过，覆盖六个验收视口、Reduced Motion 和无 JavaScript。
- 首页几何契约：通过，锁定的高度和内间距 hash 未改变。
- 首页顺序与内容契约：通过。
- TypeScript、单元测试和生产构建：通过。

## 视觉验证

- 桌面：40px / 32px 两级覆盖，40px 上沿圆角。
- 平板：32px / 24px 两级覆盖，32px 上沿圆角。
- 手机：20px / 16px 两级覆盖，20px 上沿圆角。
- 六视口无横向溢出、圆角露底、层级穿帮、内容裁切或焦点遮挡。

## 保留边界

- Hero 素材、尺寸、定位和静止状态未改变。
- 没有增加 sticky、scroll-jacking、缩放、视差或运行时滚动计算。
- 完整 E2E 和完整 lint 的既有仓库状态继续以 `docs/current-status.md` 的实际结果为准，不因本轮定向验收被描述为全绿。
```

- [ ] **Step 4: 更新当前状态**

在 `docs/current-status.md` 的“当前首页结构与锁定规则”中增加：

```markdown
- 首页前三屏已采用中度页面板层叠：Hero 保持静止基底，制造证明与三款主打产品使用响应式上沿圆角和递减覆盖；不使用 sticky、视差、缩放或滚动劫持，第四至第八屏保持既有实现。
```

并在“当前版本与验证事实”中增加：

```markdown
- 首页前三屏中度层叠定向 E2E 在六个验收视口为 18 项通过；覆盖正常滚动、Reduced Motion 与无 JavaScript，并已完成用户视觉验收。
```

- [ ] **Step 5: 提交验收文档并检查提交范围**

```powershell
git add -- docs/current-status.md docs/superpowers/specs/2026-09-12-vithelo-home-medium-layering-acceptance.md
git diff --cached --check
git diff --cached --stat
git commit -m "docs: accept homepage medium layering"
git status --short
```

Expected: 提交只包含两份文档。`git status --short` 可以继续显示用户原有未提交文件，但不得显示本计划涉及的 CSS、测试或验收文档仍未提交。
