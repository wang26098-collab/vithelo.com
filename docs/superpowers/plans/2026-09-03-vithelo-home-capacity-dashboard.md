# VITHELO Home Capacity Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在首页第二屏与软糖能力屏之间新增来源边界明确、具有轻量进入动效的制造能力仪表盘。

**Architecture:** 新屏内容进入现有 Zod 首页内容契约，由本地内容适配器提供。页面模式组件负责语义结构，新建客户端数字组件只负责进入视口后的一次性数字递增；CSS Module 负责双面板布局、流程线、响应式与 Reduced Motion。

**Tech Stack:** Next.js 16 App Router、React、TypeScript、Zod、CSS Modules、Vitest、Testing Library、Playwright

---

### Task 1: 扩展首页内容契约

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`

- [x] **Step 1: 写失败的内容契约测试**

断言解析后的首页内容包含 `capacity-dashboard`，并验证标题、四项数据、四个流程节点和来源边界；同时断言公开文本不包含 `audited` 或虚构增长年份。

```ts
expect(parsed.sectionOrder.slice(0, 4)).toEqual([
  "hero",
  "proof",
  "capacity-dashboard",
  "gummy-stage",
]);
expect(parsed.capacity.metrics).toHaveLength(4);
expect(parsed.capacity.steps).toHaveLength(4);
expect(JSON.stringify(parsed.capacity)).not.toMatch(/audited|2020|2025/i);
```

- [x] **Step 2: 运行测试并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: 因 `capacity-dashboard` 和 `capacity` 尚不存在而失败。

- [x] **Step 3: 添加最小内容模型与记录**

在 `B2BHomeSectionIdSchema` 中加入 `capacity-dashboard`，将 `sectionOrder` 长度改为 12，并加入：

```ts
capacity: z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  sourceBoundary: z.string().min(1),
  metrics: z.array(z.object({
    label: z.string().min(1),
    value: z.number().nonnegative(),
    prefix: z.string(),
    suffix: z.string(),
  })).length(4),
  steps: z.array(z.object({
    label: z.string().min(1),
    copy: z.string().min(1),
  })).length(4),
})
```

内容使用已确认数据：8、50B、5,000+ t、36B；标题为 `Built to scale across formats.`，流程为 Formulation、Sampling、Scale-up、Packaging。

- [x] **Step 4: 运行内容测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: PASS。

### Task 2: 实现第三屏结构与数字动效

**Files:**
- Create: `src/components/patterns/vithelo-capacity-metric.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [x] **Step 1: 写失败的页面结构测试**

将首页顶层 section 期望调整为八屏，并断言 `capacity-dashboard` 位于 `proof` 与 `gummy-stage` 之间。断言四个 metric、四个 step、来源边界和 Reduced Motion 可读最终值存在。

```ts
expect(sections.map((section) => section.id)).toEqual([
  "hero",
  "proof",
  "capacity-dashboard",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "contact",
]);
expect(within(capacity).getAllByTestId("capacity-metric")).toHaveLength(4);
expect(within(capacity).getAllByTestId("capacity-step")).toHaveLength(4);
```

- [x] **Step 2: 运行测试并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: 因第三屏尚未渲染而失败。

- [x] **Step 3: 实现数字组件**

`VitheloCapacityMetric` 接收 `value`、`prefix`、`suffix` 和 `label`。IntersectionObserver 触发后在约 900ms 内递增一次；`prefers-reduced-motion: reduce` 时直接显示最终值。可访问名称始终包含最终完整数值，不让读屏读取中间帧。

- [x] **Step 4: 在 proof 后插入第三屏**

新增 `section#capacity-dashboard`，使用 `data-motion-intent="EXPLAIN"`。左侧渲染四项数据，右侧渲染四阶段流程和连接线，来源边界保持可见。

- [x] **Step 5: 运行单元测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS，首页为八屏且顺序正确。

### Task 3: 完成视觉、响应式和验收

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `docs/current-status.md`

- [x] **Step 1: 写失败的 E2E 顺序和布局断言**

断言第三屏顺序、桌面双面板、移动单列流程、无横向溢出，以及页面不出现 `audited` 或虚构增长年份。

- [x] **Step 2: 运行针对性 E2E 并确认失败**

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/responsive.spec.ts`

Expected: 因新屏样式和顺序尚未完成而失败。

- [x] **Step 3: 添加最小视觉样式**

桌面端使用深色全宽屏和约 `58 / 42` 的白色双面板；数据格使用细边界分栏；流程节点以细线连接。移动端为两列数据格与单列流程，不使用圆角卡片堆叠或阴影浮层。

- [x] **Step 4: 更新当前状态文档**

将首页当前序列更新为八屏，并记录新增第三屏、数据边界和禁止虚构增长曲线。

- [x] **Step 5: 运行完整验证**

Run: `pnpm.cmd lint`

Run: `pnpm.cmd typecheck`

Run: `pnpm.cmd test`

Run: `pnpm.cmd test:e2e`

Run: `pnpm.cmd build`

Expected: 所有命令 exit code 0；六个验收视口无 P0/P1、裁切、重叠或横向溢出。

- [x] **Step 6: 检查真实预览**

在 `http://127.0.0.1:3200/` 检查第三屏位置、桌面与移动构图、数字动效、Reduced Motion、来源边界和与相邻屏幕的节奏。
