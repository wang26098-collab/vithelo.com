# VITHELO Second-Screen Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 VITHELO 首页第二屏重排为参考图所示的克制编辑式制造说明页。

**Architecture:** 保留现有第二屏 JSX、内容层和制造图片，仅在首页 CSS Module 中调整桌面端内容边界、左右分栏比例、标题字体/宽度、图片卡片表现和能力栏层级。移动端继续沿用现有单列结构，并通过桌面与移动预览验证不溢出。

**Tech Stack:** Next.js App Router, CSS Modules, Playwright browser preview, Vitest/Playwright existing test suites.

---

## 文件结构

- Modify: `src/components/patterns/vithelo-b2b-home.module.css` — 第二屏 `.proof`、`.proofPrimary`、`.proofNarrative`、`.proofVisual` 和 `.proofCapabilities` 的视觉重排。
- Test/verify: `tests/unit/vithelo-home-geometry-contract.test.ts` — 保持首页既有屏高、重叠和几何契约通过；仅在现有测试需要覆盖新约束时增加精确断言。
- Verify only: `tests/e2e/vithelo-home-layered-scroll.spec.ts` — 验证第二屏仍可见、文案和制造图片存在且无横向溢出。
- Verify only: `docs/superpowers/specs/2026-09-14-vithelo-second-screen-editorial-redesign-design.md` — 实施依据与验收标准。

### Task 1: 建立第二屏样式回归基线

**Files:**
- Inspect: `src/components/patterns/vithelo-b2b-home.module.css:191-367`
- Inspect: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 运行现有第二屏几何与首页定向检查**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/vithelo-home-geometry-contract.test.ts
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layered-scroll.spec.ts --grep "manufacturing|proof|second"
```

Expected: 现有测试结果作为实施前基线记录；若 grep 没有匹配项，以单元测试和后续浏览器预览作为验证依据，不修改无关测试。

### Task 2: 实现桌面编辑式重排

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:191-367`

- [ ] **Step 1: 将第二屏主内容固定到左右 190px 对齐线**

在 `.proof` 中使用 `padding-inline: var(--home-frame-gutter)`，并在已有 `@media (min-width: 1201px)` 中保持 `--home-frame-gutter: 190px`。不得恢复基于 `max((100vw - 1720px) / 2)` 的计算。

- [ ] **Step 2: 调整桌面主内容为 46/54 编辑分栏**

在桌面样式中将 `.proofPrimary` 保持为全内容宽度网格，并使用：

```css
grid-template-columns: minmax(0, 0.46fr) minmax(0, 0.54fr);
```

保持主内容顶部细线、现有内容顺序和图片素材不变。

- [ ] **Step 3: 调整左侧标题和文案层级**

将 `.proofNarrative` 调整为垂直居中的编辑式文案区；标题使用现有项目允许的 Georgia/Times 字体栈，设置收窄的 `max-width`，保留完整文案和链接。不要新增营销声明或改写内容层文字。

- [ ] **Step 4: 将制造图片改为独立卡片**

调整 `.proofVisual` 的外观，使图片不贴满第二屏背景：保留图片内容和 `object-fit: cover`，增加约 `16px` 圆角、轻微阴影，并通过主网格内留白让图片成为独立视觉对象。不得修改 `proofVisual img` 的素材来源。

- [ ] **Step 5: 降低底部能力栏的视觉重量**

保留四个能力项和现有数据内容，使用细分隔线、较低对比度和与主内容相同的左右边界；确保第一项的左侧对齐不额外缩进，四项在桌面端不产生横向溢出。

### Task 3: 保持移动端与无障碍行为

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:2072-2189`

- [ ] **Step 1: 确认移动端覆盖桌面规则**

在 `@media (max-width: 760px)` 中保留 `.proof` 的移动端 `padding`，使文案、图片和能力项继续单列；不得让桌面端 `190px` 固定值进入移动布局。

- [ ] **Step 2: 检查 Reduced Motion 与交互目标**

确认本次只改变布局和视觉表现，不隐藏 `.proof` 文案、链接或能力项；现有 `prefers-reduced-motion` 样式继续让内容静态可读，链接保持至少 44px 可操作高度。

### Task 4: 浏览器视觉验收与回归

**Files:**
- Verify: `src/components/patterns/vithelo-b2b-home.module.css`
- Verify: `tests/unit/vithelo-home-geometry-contract.test.ts`
- Verify: `tests/e2e/vithelo-home-layered-scroll.spec.ts`

- [ ] **Step 1: 在 1440px 桌面视口检查第二屏**

确认第二屏主内容的左边界为 `190px`，制造图片右边界距可用视口右侧为 `190px`，标题/正文/链接位于左栏，图片为右侧独立圆角卡片。

- [ ] **Step 2: 在 390px 移动视口检查响应式**

确认文案在图片上方、能力项纵向排列，无水平滚动、裁切或遮挡。

- [ ] **Step 3: 运行定向回归**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/vithelo-home-geometry-contract.test.ts tests/unit/vithelo-b2b-home.test.tsx
pnpm.cmd exec playwright test tests/e2e/vithelo-home-layered-scroll.spec.ts --project desktop-1440 --project mobile-390
```

Expected: 定向单元和第二屏相关 E2E 通过；若完整回归仍受项目既有旧首页断言影响，记录失败范围，不修改无关断言。

- [ ] **Step 4: 检查差异范围**

Run:

```powershell
git diff --check -- src/components/patterns/vithelo-b2b-home.module.css
git diff --stat -- src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: 只有第二屏样式及必要的精确测试变更；不修改 Hero、其他首页屏幕、内容数据或参考素材。
