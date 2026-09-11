# VITHELO Home Narrative and Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保持首页导航、八屏几何和顺序不变的情况下，统一叙事职责并收敛动效语言。

**Architecture:** 保留当前 Server Component 页面组合与内容 schema，通过 demo 内容记录调整第五屏叙事和素材；通过现有两个 Client Motion 组件收敛第六屏与第八屏行为；通过 CSS Modules 调整视觉状态，不引入新依赖或新布局组件。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、CSS Modules、Vitest、Testing Library、Playwright。

---

### Task 1: 锁定叙事与几何契约

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/unit/vithelo-market-stage.test.tsx`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: 写入失败测试**

断言八屏 `data-narrative-role` 顺序、第五屏标题与三张非产品卡场景图、可见标题标记，以及六视口下导航和页面无溢出。保留现有 section id 顺序断言。

- [ ] **Step 2: 验证测试因缺少新叙事契约而失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-market-stage.test.tsx`

Expected: FAIL，失败点为新 title、media source、`data-narrative-role` 或 `data-market-intro` 尚不存在。

- [ ] **Step 3: 最小实现叙事职责**

在 `vithelo-b2b-home.tsx` 为八屏增加语义角色；在 `vithelo-market-stage.tsx` 增加可测试的 intro 标记；在内容记录中将第五屏标题改为 `From routine to product brief.`，并使用 `/media/nutrition-ritual.png`、`/media/home-membrane.png`、`/media/vithelo-womens-gummy-hero-desktop.png`。

- [ ] **Step 4: 运行定向测试并确认通过**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-market-stage.test.tsx`

Expected: PASS。

### Task 2: 收敛通用与第五屏动效

**Files:**
- Modify: `src/components/motion/vithelo-home-motion.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: 写入失败测试**

断言 Hero 不包含 `hero-copy-arrive`，制造数据进入可见状态后仍保持最终文本；第五屏 intro 可见，三段关键帧的可见区间不重叠。

- [ ] **Step 2: 验证测试失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL，当前 Hero 仍有入场动画且制造数字会从零计数。

- [ ] **Step 3: 实现最小动效收敛**

删除制造数字计数和 Hero 文案入场；让通用进入使用 500ms token；将第五屏 intro 作为不占流的章节提示显示；调整 view-timeline 关键帧，使上一故事隐藏后下一故事再进入。

- [ ] **Step 4: 验证定向测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

### Task 3: 简化第六屏剂型动效

**Files:**
- Modify: `src/components/motion/vithelo-format-wall-motion.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `tests/unit/vithelo-format-wall-motion.test.tsx`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 写入失败测试**

断言组件只观察 intro 和项目一次，不注册 `scroll`、`pointermove`、`pointerleave`，不导出或调用乱码解码与速度函数；CSS 不包含左右 entry、pointer 或 velocity 变量。

- [ ] **Step 2: 验证测试失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-format-wall-motion.test.tsx`

Expected: FAIL，当前组件仍注册指针和滚动惯性行为。

- [ ] **Step 3: 实现同向轻揭示**

将 Client Motion 缩减为 IntersectionObserver 一次性可见标记；把标题和八张卡片统一为向上淡入，时长使用 500ms；保留双列、偶数卡片静态错位、八链接和所有真实标题。

- [ ] **Step 4: 验证定向测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-format-wall-motion.test.tsx tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

### Task 4: 提前完成询盘揭示

**Files:**
- Modify: `src/components/motion/vithelo-inquiry-reveal.tsx`
- Modify: `tests/e2e/inquiry-reveal.spec.ts`

- [ ] **Step 1: 写入失败 E2E 断言**

在现有滚动距离 75% 处断言 `--reveal-copy-opacity` 为 1、`data-reveal-complete=true` 且 Email 可交互。

- [ ] **Step 2: 验证当前阈值失败**

Run: `pnpm.cmd exec playwright test tests/e2e/inquiry-reveal.spec.ts --project=desktop-1280`

Expected: FAIL，当前 75% 进度仍未完全揭示。

- [ ] **Step 3: 调整映射阈值**

保持 `--inquiry-stage-height` 和 `--inquiry-scroll-distance` 不变，仅将 mask 淡出区间和 copy 淡入区间前移，并在 72% 标记完成。

- [ ] **Step 4: 验证询盘行为**

Run: `pnpm.cmd exec playwright test tests/e2e/inquiry-reveal.spec.ts --project=desktop-1280`

Expected: PASS。

### Task 5: 回归与视觉验收

**Files:**
- Verify only: homepage files changed in Tasks 1–4

- [ ] **Step 1: 运行单元、类型和构建检查**

Run: `pnpm.cmd test`

Run: `pnpm.cmd typecheck`

Run: `pnpm.cmd build`

Expected: 三项 PASS；保留 Node 24 与生产 Node 20 的环境差异说明。

- [ ] **Step 2: 运行首页相关六视口 E2E**

Run: `pnpm.cmd exec playwright test tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/responsive.spec.ts tests/e2e/inquiry-reveal.spec.ts`

Expected: 六视口全部 PASS。

- [ ] **Step 3: 比对几何声明**

Run: `git diff 91cd157 -- src/components/patterns/vithelo-b2b-home.module.css`

Expected: 无任何已锁定 `height`、`min-height`、`padding`、`padding-block` 或 `padding-inline` 声明变化。

- [ ] **Step 4: 浏览器视觉复核**

检查桌面、平板、手机滚动节点：第 5 屏无叠字，第 6 屏无乱码和漂移，第 8 屏联系卡更早清晰；全页无横向溢出、裁切或 P0/P1 缺陷。

