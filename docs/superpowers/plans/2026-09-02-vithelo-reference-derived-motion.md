# VITHELO Reference-Derived Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将参考 HTML 的遮罩、分批、数字启动与状态响应提炼到 VITHELO 首页，同时保持 Hero 图片静止、内容静态优先和 Reduced Motion 完整可读。

**Architecture:** 继续使用单一 `VitheloHomeMotion` 客户端运行器管理首页一次性 `IntersectionObserver`，通过有限的 `data-motion-role` 与 `data-motion-sequence` 标记区分标题、媒体、证据、集合和流程。CSS 默认呈现终态，只在运行器确认浏览器支持且未开启 Reduced Motion 后进入增强状态；内容数值继续来自内容层，运行器只读取已渲染文本进行可选计数增强。

**Tech Stack:** Next.js App Router、React、TypeScript、CSS Modules、Vitest、Testing Library、Playwright。

---

## 版本控制安全约束

本计划涉及的首页组件、CSS 和测试在任务开始前已经包含用户的未提交改动。实施过程中必须先保存这些文件的基线 diff，并在每个任务后记录测试 checkpoint；不得把重叠文件直接 `git add` 或 `git commit`，避免把用户既有改动误归入本任务。只有本计划文档本身可以独立提交。最终交付以精确文件清单和验证结果代替实现阶段的分段提交。

## 文件职责

- `src/components/motion/vithelo-home-motion.tsx`：唯一首页视口观察器、一次触发、Reduced Motion/无观察器回退、数字增强与清理。
- `src/components/patterns/vithelo-b2b-home.tsx`：只添加语义动效标记，不写时长、不硬编码数值、不改变内容结构。
- `src/components/patterns/vithelo-b2b-home.module.css`：五类动作材质、封顶交错、移动端节奏和 Reduced Motion 终态。
- `tests/unit/vithelo-b2b-home.test.tsx`：DOM 标记、观察器行为、Reduced Motion 和清理契约。
- `tests/e2e/accessibility.spec.ts`：Reduced Motion 下事实与操作完整可见。
- `tests/e2e/nutrition-home-sequence.spec.ts`：Hero 静态、七屏顺序和动效触发契约。

### Task 1: 用测试锁定动效运行器行为

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 扩展 IntersectionObserver 测试桩，保存 callback 与 observer 方法**

```tsx
let observerCallback: IntersectionObserverCallback;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class IntersectionObserverMock {
  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
}
```

- [ ] **Step 2: 写入失败测试，要求五个内容区使用明确的 motion intent 与 role**

```tsx
it("maps homepage content to semantic motion roles", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(document.getElementById("proof")).toHaveAttribute("data-motion-intent", "EXPLAIN");
  expect(document.querySelector("[data-motion-role='proof-ledger']")).toBeInTheDocument();
  expect(document.querySelector("[data-motion-role='media']")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-motion-role='collection-item']")).toHaveLength(8);
  expect(document.querySelectorAll("[data-motion-role='process-step']")).toHaveLength(6);
});
```

- [ ] **Step 3: 写入失败测试，模拟进入视口并验证一次触发与清理**

```tsx
it("reveals each motion section once and disconnects on unmount", () => {
  const { unmount } = render(<VitheloB2BHome content={vitheloB2BHome} />);
  const proof = document.getElementById("proof")!;

  observerCallback([{ isIntersecting: true, target: proof } as IntersectionObserverEntry], {} as IntersectionObserver);
  expect(proof).toHaveAttribute("data-motion-state", "visible");
  expect(unobserve).toHaveBeenCalledWith(proof);

  unmount();
  expect(disconnect).toHaveBeenCalled();
});
```

- [ ] **Step 4: 写入失败测试，Reduced Motion 时不启用增强和观察器**

```tsx
it("keeps the static final state when reduced motion is requested", () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    addEventListener: vi.fn(),
    matches: true,
    removeEventListener: vi.fn(),
  })));

  render(<VitheloB2BHome content={vitheloB2BHome} />);
  expect(document.querySelector("main")).toHaveAttribute("data-motion-mode", "static");
  expect(document.querySelector("main")).not.toHaveAttribute("data-motion-enabled");
  expect(observe).not.toHaveBeenCalled();
});
```

- [ ] **Step 5: 运行测试并确认失败原因来自尚未实现的新契约**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL，缺少新的 motion role、proof intent、static mode 或一次触发断言。

- [ ] **Step 6: 记录测试 checkpoint**

记录失败测试名称与失败原因，不暂存该文件。

### Task 2: 实现静态优先的共享动效运行器

**Files:**
- Modify: `src/components/motion/vithelo-home-motion.tsx`
- Test: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 将运行器改为先声明静态模式，再在满足条件时增强**

```tsx
function VitheloHomeMotion() {
  useEffect(() => {
    const homepage = document.querySelector<HTMLElement>("[data-vithelo-home]");
    if (!homepage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      homepage.dataset.motionMode = "static";
      return;
    }

    homepage.dataset.motionMode = "enhanced";
    homepage.dataset.motionEnabled = "true";
    const sections = Array.from(homepage.querySelectorAll<HTMLElement>("[data-motion-intent]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target as HTMLElement;
        section.dataset.motionState = "visible";
        observer.unobserve(section);
      }
    }, { rootMargin: "0px 0px -12%", threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
```

- [ ] **Step 2: 保证 Hero 立即可操作，不把 Inquiry 纳入进入观察器**

只给 `proof`、`gummy-stage`、`dosage-forms`、`project-runway` 配置 `data-motion-intent`。Hero 文案使用 CSS 首屏编排，Contact 保持默认终态并只使用交互反馈。

- [ ] **Step 3: 运行单元测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: 新增的一次触发、静态模式和清理测试通过；角色标记测试仍因 Task 3 尚未完成而失败。

- [ ] **Step 4: 记录运行器 checkpoint**

记录通过与仍失败的测试名称，不暂存重叠文件。

### Task 3: 给七屏首页添加有限的语义标记

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Test: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 为制造证明添加重点编排标记**

```tsx
<section
  aria-label="Manufacturing proof points"
  className={styles.proof}
  data-motion-intent="EXPLAIN"
  data-motion-sequence="proof"
  id="proof"
>
  <dl className={styles.proofGrid} data-motion-role="proof-ledger">
```

每个 proof item 增加 `data-motion-role="proof-value"`，只标记现有内容，不更改值。

- [ ] **Step 2: 为软糖媒体与能力条目添加关系标记**

```tsx
<div className={styles.gummyImageStage} data-motion-role="media" ...>
<article data-motion-role="relation-item" key={feature.title}>
```

- [ ] **Step 3: 为八种剂型添加集合标记**

```tsx
<article
  className={styles.dosageItem}
  data-motion-index={index}
  data-motion-role="collection-item"
  ...
>
```

- [ ] **Step 4: 为六步路径添加解释标记**

```tsx
<div className={styles.runway} data-motion-role="process-line">
  {content.runway.steps.map((step, index) => (
    <article data-motion-index={index} data-motion-role="process-step" key={step.title}>
```

- [ ] **Step 5: 运行单元测试**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

- [ ] **Step 6: 记录语义标记 checkpoint**

记录定向单测通过结果，不暂存重叠文件。

### Task 4: 用 CSS 建立差异化运动材质

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: 删除统一的 44px reveal 规则并建立共享增强前提**

增强规则必须以 `.homepage[data-motion-mode="enhanced"]` 开头；默认样式不设置透明或位移，确保 SSR、无脚本和观察器失败时内容可见。

- [ ] **Step 2: 实现 Hero 的低位移首屏编排，排除背景伪元素**

```css
@media (prefers-reduced-motion: no-preference) {
  .homepage[data-motion-mode="enhanced"] .heroContent {
    animation: hero-copy-arrive 640ms var(--ease-standard) both;
  }
}

@keyframes hero-copy-arrive {
  from { opacity: 0.72; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
```

不得为 `.hero::before`、Hero 媒体容器或背景图片添加 transform、clip-path 或 animation。

- [ ] **Step 3: 实现第二屏重点编排**

`proof-ledger` 使用不超过 700ms 的 `clip-path` 横向揭示；`proof-value` 使用透明度和 12px 内的位移，并把总交错延迟限制在 300ms 内。未配置值仍直接读取 DOM，不做伪造计数。

- [ ] **Step 4: 实现软糖关系、剂型集合与流程解释**

- `media`：500–700ms 裁切/透明度进入。
- `relation-item`：按邻近顺序交错，总延迟不超过 320ms。
- `collection-item`：桌面每项 55ms、移动端每项 30ms，分别封顶 385ms 与 210ms。
- `process-line`：先显示结构线；`process-step` 每项 70ms，六项总延迟 350ms。

所有动作只运行一次，最终状态为 `opacity: 1; transform: none; clip-path: inset(0)`。

- [ ] **Step 5: 维持 Inquiry 的快速反馈**

```css
.contactLink {
  transition:
    color var(--motion-fast) var(--ease-standard),
    border-color var(--motion-fast) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.contactLink:hover { transform: translateX(4px); }
.contactLink:active { transform: translateX(2px); }
```

键盘焦点继续使用现有 focus ring，不通过位移表达焦点。

- [ ] **Step 6: 完成移动端与 Reduced Motion 终态**

```css
@media (prefers-reduced-motion: reduce) {
  .homepage [data-motion-role],
  .homepage .heroContent {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: 运行静态检查与定向单测**

Run: `pnpm.cmd lint`

Expected: exit 0。

Run: `pnpm.cmd typecheck`

Expected: exit 0。

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

- [ ] **Step 8: 记录样式 checkpoint**

记录 lint、typecheck 与定向单测结果，不暂存重叠文件。

### Task 5: 增加浏览器验收契约

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: 增加 Hero 图片静态与区块一次触发断言**

```ts
test("home motion preserves the locked hero and reveals semantic sections", async ({ page }) => {
  await page.goto("/");
  const heroTransform = await page.locator("#hero").evaluate((hero) =>
    getComputedStyle(hero, "::before").transform,
  );
  expect(heroTransform).toBe("none");

  const proof = page.locator("#proof");
  await proof.scrollIntoViewIfNeeded();
  await expect(proof).toHaveAttribute("data-motion-state", "visible");
  await expect(page.getByTestId("dosage-item")).toHaveCount(8);
});
```

- [ ] **Step 2: 扩展 Reduced Motion 测试，验证静态模式和直接询盘**

```ts
await expect(page.locator("main[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");
await expect(page.locator("#proof")).toBeVisible();
await expect(page.locator("#dosage-forms")).toBeVisible();
await expect(page.getByRole("link", { name: "Email" })).toBeVisible();
await expect(page.getByRole("link", { name: "WhatsApp" })).toBeVisible();
```

- [ ] **Step 3: 运行两个定向 E2E 文件**

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts`

Expected: 相关桌面与移动项目通过；现有按视口条件 skip 保持不变。

- [ ] **Step 4: 记录浏览器验收 checkpoint**

记录定向 E2E 结果，不暂存重叠文件。

### Task 6: 完整验证与一次性视觉检查

**Files:**
- Modify only if defects are found: `src/components/motion/vithelo-home-motion.tsx`
- Modify only if defects are found: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify only if defects are found: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: 运行完整质量门禁**

Run: `pnpm.cmd lint`

Run: `pnpm.cmd typecheck`

Run: `pnpm.cmd test`

Run: `pnpm.cmd test:e2e`

Run: `pnpm.cmd build`

Expected: 所有命令 exit 0；既有条件性跳过不计为失败。

- [ ] **Step 2: 运行 Impeccable 机械检测一次**

Run: `node E:\CodexWorkspace\codex-home\skills\impeccable\scripts\detect.mjs --json src/components/motion/vithelo-home-motion.tsx src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css`

Expected: 无未解释的 motion、contrast、overflow 或 craft-floor 阻断项。

- [ ] **Step 3: 一次性检查六个验收视口**

检查 Hero 图片完全静止、第二屏裁切方向正确、八种剂型无等待或溢出、六步路径按阅读方向展开、Inquiry 立即可用、Reduced Motion 为完整终态。把 P0/P1 一次性汇总并在同一批修复。

- [ ] **Step 4: 最多再进行一轮确认检查**

确认第一轮修复没有引入裁切、重叠、横向溢出、焦点丢失或 Unsupported Claim。停止开放式打磨。

- [ ] **Step 5: 输出最终变更边界**

用 `git diff -- <精确文件>` 核对本任务涉及的文件，并在交付说明中明确哪些文件原先已有用户改动；不自动暂存或提交这些重叠文件。
