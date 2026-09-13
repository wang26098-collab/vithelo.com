# VITHELO 首页七段滚动重叠实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让第二至第八屏随原生滚动逐层覆盖前一屏，同时保持 Hero 静止、第五屏内部叙事和第八屏询盘揭示完整。

**Architecture:** 使用 CSS 自定义属性、负上外边距、统一上沿圆角和递增 `z-index` 形成页面板重叠，不新增页面级滚动监听。第五屏内部现有 sticky 只负责三段场景切换；第八屏先完成页面板覆盖，再由现有 `VitheloInquiryReveal` 处理字标揭示。

**Tech Stack:** CSS Modules、Playwright、Vitest、现有 Next.js 16 页面与 Motion 组件。

---

## 文件边界

- 本计划只在采购内容计划全部通过后执行。
- Create: `tests/e2e/vithelo-home-layered-scroll.spec.ts` — 六视口覆盖距离、层级和降级契约。
- Modify: `src/components/patterns/vithelo-b2b-home.module.css` — 七段页面板覆盖系统。
- Verify only: `src/components/motion/vithelo-home-motion.tsx`、`src/components/motion/vithelo-inquiry-reveal.tsx`。
- Verify only: `tests/e2e/inquiry-reveal.spec.ts`、`tests/e2e/accessibility.spec.ts`、`tests/unit/vithelo-home-geometry-contract.test.ts`。
- Supersedes: `docs/superpowers/plans/2026-09-12-vithelo-home-medium-layering.md`。

### Task 1: 用 E2E 锁定七段覆盖

**Files:**
- Create: `tests/e2e/vithelo-home-layered-scroll.spec.ts`

- [ ] **Step 1: 写入覆盖值和页面板顺序**

```ts
import { expect, test, type Page } from "@playwright/test";

const panelIds = [
  "hero", "proof", "capacity-boundary", "gummy-stage",
  "solutions", "dosage-forms", "project-runway", "contact",
] as const;

function expectedFor(width: number) {
  if (width <= 760) return { radius: 20, overlaps: [20, 16, 14, 12, 12, 16, 16] };
  if (width <= 1100) return { radius: 32, overlaps: [32, 24, 22, 20, 20, 24, 24] };
  return { radius: 40, overlaps: [40, 32, 28, 24, 24, 32, 32] };
}

async function readPanels(page: Page) {
  return page.locator("main").evaluate((main, ids) => {
    const panels = ids.map((id) => main.querySelector<HTMLElement>(`#${id}`));
    if (panels.some((panel) => !panel)) throw new Error("A homepage panel is missing");
    const elements = panels as HTMLElement[];
    return {
      overlaps: elements.slice(1).map((panel, index) => {
        const previous = elements[index];
        return Math.round(previous.getBoundingClientRect().bottom - panel.getBoundingClientRect().top);
      }),
      radii: elements.slice(1).map((panel) => Math.round(Number.parseFloat(getComputedStyle(panel).borderTopLeftRadius))),
      positions: elements.slice(1).map((panel) => getComputedStyle(panel).position),
      zIndices: elements.map((panel) => getComputedStyle(panel).zIndex),
      heroTransform: getComputedStyle(elements[0], "::before").transform,
    };
  }, panelIds);
}
```

- [ ] **Step 2: 写入正常、Reduced Motion 和无 JavaScript 测试**

```ts
test("all seven transitions use responsive native-scroll overlap", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");
  const actual = await readPanels(page);
  const expected = expectedFor(viewport.width);
  expect(actual.overlaps).toEqual(expected.overlaps);
  expect(actual.radii).toEqual(Array(7).fill(expected.radius));
  expect(actual.positions).toEqual(Array(7).fill("relative"));
  expect(actual.zIndices).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  expect(actual.heroTransform).toBe("none");
});

test("reduced motion preserves static overlap and all content", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");
  expect((await readPanels(page)).overlaps).toEqual(expectedFor(viewport.width).overlaps);
  await expect(page.locator("#contact").getByRole("link", { name: /^Email/ })).toBeVisible();
});

test("CSS overlap survives without JavaScript", async ({ browser, baseURL, viewport }) => {
  if (!baseURL || !viewport) throw new Error("baseURL and viewport required");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  expect((await readPanels(page)).overlaps).toEqual(expectedFor(viewport.width).overlaps);
  await expect(page.locator("#contact").getByRole("link", { name: /^Email/ })).toBeVisible();
  await context.close();
});
```

- [ ] **Step 3: 运行桌面定向测试并确认失败**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layered-scroll.spec.ts --project=desktop-1280
```

Expected: FAIL，失败点是当前七段没有对应负重叠、统一圆角或递增层级；不得出现选择器或测试编译错误。

- [ ] **Step 4: 提交失败测试**

```powershell
git add -- tests/e2e/vithelo-home-layered-scroll.spec.ts
git commit -m "test: define seven-stage homepage overlap"
```

### Task 2: 实现统一页面板层叠变量

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Test: `tests/e2e/vithelo-home-layered-scroll.spec.ts`

- [ ] **Step 1: 在 `.homepage` 中增加桌面变量**

```css
--home-layer-radius: 40px;
--home-overlap-02: 40px;
--home-overlap-03: 32px;
--home-overlap-04: 28px;
--home-overlap-05: 24px;
--home-overlap-06: 24px;
--home-overlap-07: 32px;
--home-overlap-08: 32px;
isolation: isolate;
```

- [ ] **Step 2: 为八屏设置明确层级，为后七屏设置覆盖**

```css
.hero { z-index: 1; }
.proof { z-index: 2; margin-top: calc(var(--home-overlap-02) * -1); }
.capacityBoundarySection { z-index: 3; margin-top: calc(var(--home-overlap-03) * -1); }
.customizationSection { z-index: 4; margin-top: calc(var(--home-overlap-04) * -1); }
.marketStage { z-index: 5; margin-top: calc(var(--home-overlap-05) * -1); }
.dosageSection { z-index: 6; margin-top: calc(var(--home-overlap-06) * -1); }
.runwaySection { z-index: 7; margin-top: calc(var(--home-overlap-07) * -1); }
.contactRevealSection { position: relative; z-index: 8; margin-top: calc(var(--home-overlap-08) * -1); }

.proof,
.capacityBoundarySection,
.customizationSection,
.marketStage,
.dosageSection,
.runwaySection,
.contactRevealSection {
  border-radius: var(--home-layer-radius) var(--home-layer-radius) 0 0;
}
```

不得为 `marketStage` 或 `contactRevealSection` 增加会破坏其内部 sticky 的父级 `overflow: hidden`、`transform`、`filter` 或 `contain: paint`。

- [ ] **Step 3: 增加平板变量**

```css
@media (max-width: 1100px) {
  .homepage {
    --home-layer-radius: 32px;
    --home-overlap-02: 32px;
    --home-overlap-03: 24px;
    --home-overlap-04: 22px;
    --home-overlap-05: 20px;
    --home-overlap-06: 20px;
    --home-overlap-07: 24px;
    --home-overlap-08: 24px;
  }
}
```

- [ ] **Step 4: 在现有 760px media query 中增加手机变量**

```css
--home-layer-radius: 20px;
--home-overlap-02: 20px;
--home-overlap-03: 16px;
--home-overlap-04: 14px;
--home-overlap-05: 12px;
--home-overlap-06: 12px;
--home-overlap-07: 16px;
--home-overlap-08: 16px;
```

- [ ] **Step 5: 运行六视口覆盖契约**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layered-scroll.spec.ts
```

Expected: 18 项 PASS，0 项失败。

- [ ] **Step 6: 验证原几何 hash 未变化**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: PASS；不得更新 hash，因为本任务不改任何锁定 height 或 padding 声明。

- [ ] **Step 7: 提交层叠实现**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.module.css
git commit -m "feat: add seven-stage homepage overlap"
```

### Task 3: 验证第五屏与询盘揭示兼容

**Files:**
- Verify: `tests/e2e/inquiry-reveal.spec.ts`
- Verify: `tests/e2e/accessibility.spec.ts`
- Verify: `tests/e2e/nutrition-home-sequence.spec.ts`

- [ ] **Step 1: 运行三个关键回归文件**

```powershell
pnpm.cmd exec playwright test tests/e2e/inquiry-reveal.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/nutrition-home-sequence.spec.ts
```

Expected: 六视口全部 PASS；第五屏内部场景仍一次只显示一个；询盘在 75% 前完整可用；直达 `#contact`、键盘、Reduced Motion 和无 JavaScript 保持可用。

- [ ] **Step 2: 检查页面板不使用禁止属性**

Run:

```powershell
Select-String -LiteralPath "src\components\patterns\vithelo-b2b-home.module.css" -Pattern "sticky|transform|filter|contain: paint" -Context 1,1
```

Expected: `sticky` 只存在于第五屏内部故事舞台和询盘既有揭示所需位置；页面板层叠选择器自身不包含 `sticky`、`transform`、`filter` 或 `contain: paint`。

### Task 4: 六视口视觉验收与完成闸门

**Files:**
- Create after approval: `docs/superpowers/specs/2026-09-13-vithelo-home-procurement-layering-acceptance.md`
- Modify after approval: `docs/current-status.md`

- [ ] **Step 1: 在六视口检查七段转场**

依次检查 `1440×1000`、`1280×900`、`1024×768`、`768×1024`、`390×844`、`375×812`。每个视口都检查七个边界，重点观察圆角露底、黑边、层级穿帮、横向溢出和内容被覆盖。

- [ ] **Step 2: 向用户展示桌面与手机关键节点**

至少展示 Hero → 制造系统、产品定义 → 产品方向、产品剂型 → 项目路径、项目路径 → 询盘四个节点。只有用户明确确认“滚动时有重叠、但不像卡片堆积”后才记录验收。

- [ ] **Step 3: 运行定向和仓库级验证**

```powershell
pnpm.cmd exec eslint src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-market-stage.tsx tests/e2e/vithelo-home-layered-scroll.spec.ts
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
pnpm.cmd test:e2e
```

Expected: 定向 lint、typecheck、unit 和 build PASS；层叠定向 E2E 为 18/18。完整 lint 与完整 E2E 若仍存在 `docs/current-status.md` 已记录的范围外失败，不得描述为全绿，也不得顺手修改参考资料或旧断言。

- [ ] **Step 4: 用户确认后更新验收文档和当前状态**

验收记录必须包含：新八屏职责、七段覆盖数值、18 项层叠 E2E、Hero 静止证明、第五屏与询盘兼容结果、六视口视觉结论，以及完整仓库检查的实际结果。`docs/current-status.md` 必须把旧“三屏中度层叠”计划标记为已被本方案取代。

- [ ] **Step 5: 提交验收记录**

```powershell
git add -- docs/current-status.md docs/superpowers/specs/2026-09-13-vithelo-home-procurement-layering-acceptance.md
git diff --cached --check
git commit -m "docs: accept homepage procurement layering"
```
