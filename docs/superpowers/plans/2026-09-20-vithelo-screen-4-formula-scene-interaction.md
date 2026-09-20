# VITHELO Screen 4 Formula Scene Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为首页第 4 屏的 Formula 节点增加可逆的整图交叉淡化交互，桌面支持 hover/键盘、手机支持点击，同时保持当前中央瓶体总览、另外三个节点和内容任务不变。

**Architecture:** 将第 4 屏右侧星环区域抽成一个小型 Client Component，只维护 `overview | formula` 两态；首页主体仍为 Server Component。内容 schema 持有 Formula 的 `DEMO_ONLY` 图片和三条说明，CSS Module 负责两张图片、星环与说明的状态过渡，React 只负责输入归一化和可访问状态。

**Tech Stack:** Next.js 16、React 19、TypeScript、Zod 4、CSS Modules、`next/image`、Vitest、Testing Library、Playwright、OpenAI Image Generation。

---

## 文件职责

- Create: `public/media/b2b/vithelo-formula-customization-atmospheric.png` — Formula 详细定制场景，1536×1024、无烘焙文字、`DEMO_ONLY`。
- Create: `src/components/patterns/vithelo-formula-constellation.tsx` — 第 4 屏右侧唯一的交互状态与输入处理。
- Modify: `src/content/schema.ts` — 为 `customization.formulaScene` 增加严格内容合约。
- Modify: `src/content/demo/vithelo-b2b-home.ts` — 登记 Formula 图片和三条 HTML 说明。
- Modify: `src/components/patterns/vithelo-b2b-home.tsx` — 用新 Client Component 替换现有右侧静态星环标记。
- Modify: `src/components/patterns/vithelo-b2b-home.module.css` — 交叉淡化、节点状态、响应式与 Reduced Motion。
- Create: `tests/unit/vithelo-formula-constellation.test.tsx` — 鼠标、键盘、触屏和外部点击状态测试。
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts` — Formula 媒体边界与三条说明。
- Modify: `tests/unit/vithelo-b2b-home.test.tsx` — 首页集成、节点数量和初始总览状态。
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts` — 桌面 hover、恢复、移动点击和 900px/六视口布局。
- Modify: `tests/e2e/accessibility.spec.ts` — 键盘、Escape、Reduced Motion 与点击目标。
- Create: `docs/superpowers/specs/2026-09-20-vithelo-screen-4-formula-scene-interaction-acceptance.md` — 中文验收结果。

## 工作区保护

当前工作区包含大量既有与并行修改，且 `vithelo-b2b-home.tsx`、CSS、schema、fixture 和测试均可能已有未提交差异。实施前后禁止 `git checkout`、`git reset` 或整文件覆盖。每次提交前使用 `git diff` 和 `git add -p` 逐 hunk 审查；若不能安全分离，则跳过实现提交并在交付中说明。

### Task 1: 先锁定内容合约与交互失败测试

**Files:**
- Create: `tests/unit/vithelo-formula-constellation.test.tsx`
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 记录相关文件当前差异**

Run:

```powershell
git diff -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: 能区分本轮 hunk 与既有第 2–4 屏、OEM/ODM 或其他并行修改；不清理邻近代码。

- [ ] **Step 2: 在内容测试中写 Formula 场景失败断言**

在 `tests/unit/vithelo-b2b-home-content.test.ts` 的 customization 测试中加入：

```ts
expect(parsed.customization.formulaScene.media).toMatchObject({
  status: "DEMO_ONLY",
  src: "/media/b2b/vithelo-formula-customization-atmospheric.png",
  width: 1536,
  height: 1024,
  format: "PNG",
});
expect(parsed.customization.formulaScene.details).toEqual([
  {
    label: "INGREDIENT DIRECTION",
    copy: "What belongs in the brief",
  },
  {
    label: "SERVING BRIEF",
    copy: "How the concept should be framed",
  },
  {
    label: "FEASIBILITY REVIEW",
    copy: "How the direction fits production",
  },
]);
expect(JSON.stringify(parsed.customization.formulaScene)).not.toMatch(
  /GMP|HACCP|Halal|ISO|FDA|dose|efficacy|certified/i,
);
```

- [ ] **Step 3: 创建交互组件失败测试**

创建 `tests/unit/vithelo-formula-constellation.test.tsx`：

```tsx
import { fireEvent, render, screen, within } from "@testing-library/react";
import { VitheloFormulaConstellation } from "@/components/patterns/vithelo-formula-constellation";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

function renderConstellation() {
  return render(
    <VitheloFormulaConstellation customization={vitheloB2BHome.customization} />,
  );
}

it("starts in overview and preserves all four decision nodes", () => {
  renderConstellation();

  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "overview",
  );
  expect(screen.getAllByTestId("customization-node")).toHaveLength(4);
  expect(screen.getByRole("button", { name: /Formula/i })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
  expect(screen.getByTestId("formula-scene")).toHaveAttribute("aria-hidden", "true");
});

it("uses mouse hover as a temporary Formula preview", () => {
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.mouseEnter(formula);
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "formula",
  );
  fireEvent.mouseLeave(formula);
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "overview",
  );
});

it("supports keyboard focus and Escape", () => {
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(formula, { key: "Escape" });
  expect(formula).toHaveAttribute("aria-pressed", "false");
});

it("toggles on touch and restores after an outside pointer", () => {
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.pointerDown(document.body, { pointerType: "touch" });
  expect(formula).toHaveAttribute("aria-pressed", "false");
});

it("exposes three Formula details only in the active state", () => {
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });
  const details = screen.getByTestId("formula-details");

  expect(details).toHaveAttribute("aria-hidden", "true");
  fireEvent.mouseEnter(formula);
  expect(details).toHaveAttribute("aria-hidden", "false");
  expect(within(details).getAllByRole("heading", { level: 4 })).toHaveLength(3);
});
```

- [ ] **Step 4: 在首页集成测试中锁定初始状态**

在 `tests/unit/vithelo-b2b-home.test.tsx` 的第 4 屏测试加入：

```tsx
expect(within(stage).getByTestId("customization-constellation")).toHaveAttribute(
  "data-customization-state",
  "overview",
);
expect(within(stage).getByRole("button", { name: /Formula/i })).toHaveAttribute(
  "aria-controls",
  "formula-customization-details",
);
expect(within(stage).getByTestId("formula-scene")).toHaveAttribute(
  "data-media-status",
  "DEMO_ONLY",
);
```

- [ ] **Step 5: 运行失败测试**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL，仅因 `formulaScene`、新组件和交互状态尚未实现。

### Task 2: 生成并审查 Formula 定制场景图片

**Files:**
- Create: `public/media/b2b/vithelo-formula-customization-atmospheric.png`

- [ ] **Step 1: 使用 imagegen 生成正式素材**

Prompt:

```text
Create a 3:2 cinematic editorial still-life for the Formula customization state of a premium B2B nutrition OEM/ODM website. The image replaces a central bottle overview with a refined formulation workbench: layered warm-ivory specification papers with abstract non-readable linework, a precise pencil, one shallow ceramic dish holding cream mineral powder, a restrained translucent amber material sample, and subtle measurement or review tools. Keep the composition calm, tactile and premium, with cocoa-taupe low exposure, warm cream edge light, one restrained honey highlight, soft long shadows and generous negative space along the bottom for three HTML detail labels. The scene should communicate ingredient direction, serving brief and manufacturing feasibility without showing a finished package. No readable formula, ingredient names, dosage, efficacy, medical claims, certification marks, regulatory logos, product packaging, bottle, pouch, jar, box, pills, laboratory glassware, people, green botanical styling, cold blue light, chrome, cyber interface, other brands or baked-in text.
```

Expected: 1536×1024 PNG；暖暗配方工作台成立，底部留白，无包装、可读文字、宣称或认证。

- [ ] **Step 2: 用视觉工具人工审图**

检查：

- 主体是资料、粉末与抽象材质，不是实验室或药品；
- 底部三条 HTML 文案安全区可用；
- 没有瓶、袋、盒、品牌、可读配方、成分、剂量、功效或认证；
- 390px 窄屏中央裁切仍保留资料与材质主体。

失败时继续用 imagegen 编辑/返修，不使用 PIL、Canvas 或脚本拼贴最终素材。

- [ ] **Step 3: 校验文件尺寸**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
$bitmap = [System.Drawing.Image]::FromFile((Resolve-Path 'public\media\b2b\vithelo-formula-customization-atmospheric.png'))
[pscustomobject]@{ Width=$bitmap.Width; Height=$bitmap.Height }
$bitmap.Dispose()
```

Expected: `Width = 1536`，`Height = 1024`。

### Task 3: 扩展 schema 与内容 fixture

**Files:**
- Modify: `src/content/schema.ts:227-305`
- Modify: `src/content/demo/vithelo-b2b-home.ts:103-135`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: 为 customization 增加 Formula 场景合约**

在 `VitheloB2BHomeContentSchema` 的 `customization` 中加入：

```ts
formulaScene: z.object({
  media: B2BEditorialDemoMediaSchema,
  details: z
    .array(
      z.object({
        label: z.string().min(1),
        copy: z.string().min(1),
      }),
    )
    .length(3),
}),
```

- [ ] **Step 2: 登记 Formula 内容**

在 `vitheloB2BHome.customization` 中加入：

```ts
formulaScene: {
  media: {
    status: "DEMO_ONLY",
    src: "/media/b2b/vithelo-formula-customization-atmospheric.png",
    label:
      "A warm, low-lit formulation workspace with abstract specification papers, mineral powder and amber material samples",
    width: 1536,
    height: 1024,
    format: "PNG",
  },
  details: [
    {
      label: "INGREDIENT DIRECTION",
      copy: "What belongs in the brief",
    },
    {
      label: "SERVING BRIEF",
      copy: "How the concept should be framed",
    },
    {
      label: "FEASIBILITY REVIEW",
      copy: "How the direction fits production",
    },
  ],
},
```

- [ ] **Step 3: 运行内容测试**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: PASS。

- [ ] **Step 4: 条件式提交内容与素材**

```powershell
git add -p -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts
git add -- public/media/b2b/vithelo-formula-customization-atmospheric.png
git commit -m "feat(home): add formula customization scene content"
```

Expected: 只提交 Formula 内容 hunk；若与既有未提交修改无法安全分离，则跳过提交。

### Task 4: 实现独立 Formula 交互组件

**Files:**
- Create: `src/components/patterns/vithelo-formula-constellation.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx:72-106,355-393`
- Test: `tests/unit/vithelo-formula-constellation.test.tsx`
- Test: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 创建 Client Component 基础结构**

创建 `src/components/patterns/vithelo-formula-constellation.tsx`，从原首页文件迁入 `CustomizationIcon`，并使用以下状态骨架：

```tsx
"use client";

import type { VitheloB2BHomeContent } from "@/content/schema";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type CustomizationContent = VitheloB2BHomeContent["customization"];

type VitheloFormulaConstellationProps = {
  customization: CustomizationContent;
};

export function VitheloFormulaConstellation({
  customization,
}: VitheloFormulaConstellationProps) {
  const [state, setState] = useState<"overview" | "formula">("overview");
  const rootRef = useRef<HTMLDivElement>(null);
  const touchPointerRef = useRef(false);
  const isFormulaActive = state === "formula";

  function showFormula() {
    setState("formula");
  }

  function showOverview() {
    setState("overview");
  }

  useEffect(() => {
    function handleOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setState("overview");
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, []);

  return (
    <div
      className={styles.customizationConstellation}
      data-customization-state={state}
      data-testid="customization-constellation"
      ref={rootRef}
    >
      {/* 两层图片、星环、三条说明和四个节点在后续步骤加入 */}
    </div>
  );
}
```

- [ ] **Step 2: 渲染两层图片、星环和 Formula 说明**

在 root 内加入：

```tsx
<figure
  aria-hidden={isFormulaActive}
  className={`${styles.customizationVisual} ${styles.customizationOverviewScene}`}
  data-media-status={customization.media.status}
  data-motion-role="media"
  data-testid="customization-visual"
>
  <Image
    alt={customization.media.label}
    fill
    sizes="(max-width: 760px) 100vw, 62vw"
    src={customization.media.src}
  />
</figure>
<figure
  aria-hidden={!isFormulaActive}
  className={`${styles.customizationVisual} ${styles.customizationFormulaScene}`}
  data-media-status={customization.formulaScene.media.status}
  data-testid="formula-scene"
>
  <Image
    alt={customization.formulaScene.media.label}
    fill
    sizes="(max-width: 760px) 100vw, 62vw"
    src={customization.formulaScene.media.src}
  />
</figure>
<div aria-hidden="true" className={styles.customizationOrbit} />
<div
  aria-hidden={!isFormulaActive}
  className={styles.formulaDetails}
  data-testid="formula-details"
  id="formula-customization-details"
>
  {customization.formulaScene.details.map((detail) => (
    <article key={detail.label}>
      <h4>{detail.label}</h4>
      <p>{detail.copy}</p>
    </article>
  ))}
</div>
```

`B2BEditorialDemoMediaSchema` 保证两个 `src` 均为必填，不使用非空断言。

- [ ] **Step 3: 将 Formula 节点实现为按钮，其余节点保持 article**

使用：

```tsx
{customization.nodes.map((node, index) => {
  const content = (
    <>
      <div className={styles.customizationNodeMark}>
        <CustomizationIcon index={index} />
      </div>
      <div>
        <h3>{node.title}</h3>
        <p>{node.copy}</p>
      </div>
    </>
  );

  if (index === 0) {
    return (
      <button
        aria-controls="formula-customization-details"
        aria-pressed={isFormulaActive}
        className={`${styles.customizationNode} ${styles.formulaNode}`}
        data-motion-role="relation-item"
        data-node-index="1"
        data-testid="customization-node"
        key={node.title}
        onBlur={() => {
          if (!touchPointerRef.current) showOverview();
        }}
        onClick={() => {
          if (touchPointerRef.current) {
            setState((current) => (current === "formula" ? "overview" : "formula"));
          }
        }}
        onFocus={() => {
          if (!touchPointerRef.current) showFormula();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") showOverview();
        }}
        onMouseEnter={showFormula}
        onMouseLeave={showOverview}
        onPointerDown={(event) => {
          touchPointerRef.current = event.pointerType !== "mouse";
        }}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <article
      className={styles.customizationNode}
      data-motion-role="relation-item"
      data-node-index={index + 1}
      data-testid="customization-node"
      key={node.title}
    >
      {content}
    </article>
  );
})}
```

- [ ] **Step 4: 滚动离开第 4 屏时恢复 overview**

在组件的 `useEffect` 中增加一个 `IntersectionObserver`：

```tsx
useEffect(() => {
  const root = rootRef.current;
  if (!root || typeof IntersectionObserver === "undefined") return;

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) setState("overview");
  });
  observer.observe(root);
  return () => observer.disconnect();
}, []);
```

不要设置自动恢复计时器；恢复只由离开、失焦、Escape、外部点击或离开视口触发。

- [ ] **Step 5: 在首页接入新组件**

在 `vithelo-b2b-home.tsx`：

```tsx
import { VitheloFormulaConstellation } from "@/components/patterns/vithelo-formula-constellation";
```

删除本文件中的 `CustomizationIcon`，并将现有 `.customizationConstellation` 整段替换为：

```tsx
<VitheloFormulaConstellation customization={content.customization} />
```

- [ ] **Step 6: 运行组件测试**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-b2b-home.test.tsx
```

Expected: PASS；Formula 是唯一按钮，仍有 4 个 decision nodes，初始为 `overview`。

### Task 5: 实现交叉淡化、节点与响应式 CSS

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:694-778,2919-3030`
- Test: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 让两张场景共享同一几何容器**

增加：

```css
.customizationOverviewScene,
.customizationFormulaScene {
  transition:
    opacity var(--motion-narrative) var(--ease-standard),
    transform var(--motion-narrative) var(--ease-standard);
}

.customizationOverviewScene {
  opacity: 1;
  transform: scale(1);
}

.customizationFormulaScene {
  opacity: 0;
  transform: scale(1.02);
  pointer-events: none;
}

.customizationConstellation[data-customization-state="formula"] .customizationOverviewScene {
  opacity: 0;
  transform: scale(1.02);
}

.customizationConstellation[data-customization-state="formula"] .customizationFormulaScene {
  opacity: 1;
  transform: scale(1);
}
```

不得改变第 4 屏现有 section `height`、`min-height` 或 `padding` 声明。

- [ ] **Step 2: 添加 Formula 三条说明**

```css
.formulaDetails {
  position: absolute;
  right: 9%;
  bottom: 5%;
  left: 7%;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition:
    opacity var(--motion-standard) var(--ease-standard) 160ms,
    transform var(--motion-standard) var(--ease-standard) 160ms,
    visibility 0s linear var(--motion-standard);
}

.formulaDetails article {
  min-width: 0;
  padding-top: 0.65rem;
  border-top: 1px solid rgb(255 238 215 / 35%);
}

.formulaDetails h4 {
  margin: 0;
  color: var(--ivory);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
}

.formulaDetails p {
  margin: 0.3rem 0 0;
  color: rgb(243 240 232 / 62%);
  font-size: 0.62rem;
  line-height: 1.35;
}

.customizationConstellation[data-customization-state="formula"] .formulaDetails {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition-delay: 160ms, 160ms, 0s;
}
```

- [ ] **Step 3: 重置 Formula 按钮并增加清晰状态**

```css
.formulaNode {
  min-height: 62px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.formulaNode:focus-visible {
  outline: 2px solid #e0b181;
  outline-offset: 6px;
  border-radius: 10px;
}

.formulaNode[aria-pressed="true"] .customizationNodeMark {
  border-color: rgb(255 238 215 / 55%);
  background: rgb(102 75 57 / 88%);
}

.customizationConstellation[data-customization-state="formula"] .customizationOrbit {
  opacity: 0.25;
  transform: rotate(-8deg) scale(1.04);
}
```

Formula 的强调必须同时有节点底色/边框和 `aria-pressed`，不只依赖颜色。

- [ ] **Step 4: 手机端把三条说明改为紧凑纵向层级**

在现有 `@media (max-width: 760px)` 中加入：

```css
.homepage .formulaDetails {
  right: 8%;
  bottom: 4%;
  left: 8%;
  grid-template-columns: 1fr;
  gap: 0.35rem;
}

.homepage .formulaDetails article {
  display: grid;
  grid-template-columns: minmax(120px, 0.8fr) minmax(0, 1.2fr);
  gap: 0.6rem;
  padding-top: 0.4rem;
}
```

若三条说明在 360×800 遮挡主体，优先缩短间距与字号，不增加屏高或弹出模态框。

- [ ] **Step 5: Reduced Motion 直接显示最终状态**

在最终 `@media (prefers-reduced-motion: reduce)` 中加入：

```css
.homepage .customizationOverviewScene,
.homepage .customizationFormulaScene,
.homepage .formulaDetails,
.homepage .customizationOrbit {
  transition: none !important;
}

.homepage .customizationConstellation[data-customization-state="formula"] .customizationFormulaScene,
.homepage .customizationConstellation[data-customization-state="formula"] .formulaDetails {
  transform: none !important;
}
```

- [ ] **Step 6: 运行组件与几何测试**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: Formula 组件测试通过；几何契约若仍为工作区已知旧 hash 不一致，确认本轮未新增 section 高度或 padding 声明，不更新 hash 掩盖问题。

- [ ] **Step 7: 条件式提交组件与样式**

```powershell
git add -- src/components/patterns/vithelo-formula-constellation.tsx tests/unit/vithelo-formula-constellation.test.tsx
git add -p -- src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home.test.tsx
git commit -m "feat(home): add formula scene interaction"
```

Expected: 只提交 Formula 交互 hunk；无法安全分离时跳过。

### Task 6: E2E、Reduced Motion 与六视口视觉验收

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Create: `docs/superpowers/specs/2026-09-20-vithelo-screen-4-formula-scene-interaction-acceptance.md`

- [ ] **Step 1: 添加桌面 hover 与恢复 E2E**

在 `nutrition-home-sequence.spec.ts` 加入仅桌面项目执行的测试：

```ts
test("Formula temporarily replaces the screen-four image on desktop hover", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("desktop"));
  await page.goto("/");

  const stage = page.locator("#gummy-stage");
  const constellation = stage.getByTestId("customization-constellation");
  const formula = stage.getByRole("button", { name: /Formula/i });

  await formula.hover();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await expect(stage.getByTestId("formula-scene")).toHaveAttribute("aria-hidden", "false");
  await expect(stage.getByTestId("formula-details")).toHaveAttribute("aria-hidden", "false");

  await stage.getByRole("heading", { name: /Four decisions/i }).hover();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");
});
```

- [ ] **Step 2: 添加手机点击、再次点击与外部点击 E2E**

```ts
test("Formula toggles by tap and restores outside on mobile", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"));
  await page.goto("/");

  const stage = page.locator("#gummy-stage");
  const constellation = stage.getByTestId("customization-constellation");
  const formula = stage.getByRole("button", { name: /Formula/i });

  await formula.click();
  await expect(constellation).toHaveAttribute("data-customization-state", "formula");
  await formula.click();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");
  await formula.click();
  await stage.getByRole("heading", { name: /Four decisions/i }).click();
  await expect(constellation).toHaveAttribute("data-customization-state", "overview");
});
```

- [ ] **Step 3: 扩展键盘和 Reduced Motion 测试**

在 `accessibility.spec.ts` 加入：

```ts
const formula = page.locator("#gummy-stage").getByRole("button", { name: /Formula/i });
await formula.focus();
await expect(formula).toBeFocused();
await expect(formula).toHaveAttribute("aria-pressed", "true");
await page.keyboard.press("Escape");
await expect(formula).toHaveAttribute("aria-pressed", "false");
```

Reduced Motion 测试中激活 Formula 后检查：

```ts
await formula.focus();
await expect(page.getByTestId("formula-scene")).toHaveAttribute("aria-hidden", "false");
const transition = await page.getByTestId("formula-scene").evaluate(
  (element) => getComputedStyle(element).transitionDuration,
);
expect(transition).toBe("0s");
```

- [ ] **Step 4: 运行定向 E2E**

若本地 3000 端口已有预览服务：

```powershell
$env:E2E_EXTERNAL_SERVER='1'
$env:E2E_BASE_URL='http://127.0.0.1:3000'
node.exe node_modules/@playwright/test/cli.js test tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
Remove-Item Env:E2E_EXTERNAL_SERVER,Env:E2E_BASE_URL
```

否则运行：

```powershell
pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: 新 Formula hover、tap、keyboard、outside restore 和 Reduced Motion 检查全通过；既有第 8 屏文本空格断言若仍失败，单独记录且不修改第 8 屏。

- [ ] **Step 5: 六视口与 900px 边界视觉检查**

检查：1440×1000、1280×800、1024×1366、900×1000、768×1024、390×844、360×800。

逐项确认：

- 默认状态与当前已验收第 4 屏一致；
- Formula 切换没有白闪、图片跳位、星环抢焦点或文本烘焙；
- 三条说明在 Formula 状态可读，不遮挡主要资料和 Formula 节点；
- 其他三个节点位置、顺序和文案不变；
- 离开、Escape、再次点击、外部点击和离开视口均恢复；
- 无横向溢出、节点碰撞或低对比度；P0 = 0，P1 = 0。

- [ ] **Step 6: 写中文验收记录**

创建 acceptance 文件，至少包含：

```markdown
# VITHELO 首页第 4 屏 Formula 场景交互验收

- 设计规范：2026-09-20-vithelo-screen-4-formula-scene-interaction-design.md
- Formula 媒体：DEMO_ONLY，1536×1024 PNG
- 桌面：hover / leave / keyboard / Escape 通过
- 触屏：tap / second tap / outside tap 通过
- Reduced Motion：通过
- 验收视口：1440×1000、1280×800、1024×1366、900×1000、768×1024、390×844、360×800
- P0：0
- P1：0
- 用户视觉验收：待确认
```

### Task 7: 完整验证与交付

**Files:**
- Verify: all changed files

- [ ] **Step 1: 定向 lint**

Run:

```powershell
node.exe node_modules/eslint/bin/eslint.js src/components/patterns/vithelo-formula-constellation.tsx src/components/patterns/vithelo-b2b-home.tsx src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: exit code 0。

- [ ] **Step 2: 类型、单元测试与构建**

Run:

```powershell
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: 本轮 Formula 相关代码无类型或测试错误。若并行修改导致 OEM/ODM fixture/组件字段仍不一致，记录具体文件与错误，不越界修复；不得将该失败写成通过。Node 24 本地构建不等于 Hostinger Node 20 证明。

- [ ] **Step 3: 扫描禁用身份与宣称**

Run:

```powershell
Get-Item -LiteralPath 'src\components\patterns\vithelo-formula-constellation.tsx','src\content\demo\vithelo-b2b-home.ts','src\content\schema.ts' | Select-String -Pattern '(?i)(森酷|Sencool|\bGMP\b|\bHACCP\b|\bHalal\b|\bISO\b|\bFDA\b|\befficacy\b|\bcertified\b|\bdose\b)'
```

Expected: 本轮新增运行时代码与元数据无匹配；图片通过人工审图。

- [ ] **Step 4: 最终 diff 审查**

Run:

```powershell
git diff --check
git diff -- src/components/patterns/vithelo-formula-constellation.tsx src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts docs/superpowers/specs/2026-09-20-vithelo-screen-4-formula-scene-interaction-acceptance.md
```

Expected: 每个新增 hunk 都能追溯到 Formula 单节点交互；没有修改 Hero、导航、第 2、3、5–9 屏或 `next-env.d.ts`。

- [ ] **Step 5: 条件式最终提交**

仅在所有本轮 hunk 可安全分离时：

```powershell
git add -- src/components/patterns/vithelo-formula-constellation.tsx tests/unit/vithelo-formula-constellation.test.tsx public/media/b2b/vithelo-formula-customization-atmospheric.png docs/superpowers/specs/2026-09-20-vithelo-screen-4-formula-scene-interaction-acceptance.md
git add -p -- src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
git commit -m "feat(home): add formula scene interaction"
```

Expected: 只提交本轮文件和 hunk；若无法安全分离，跳过提交并在最终交付说明中列明。

## 计划自检

- 规范覆盖：整图交叉淡化、Formula 单节点、自动恢复、桌面/键盘/触屏、外部点击、离开视口、三条 HTML 说明、Reduced Motion 和七个视觉宽度均有对应步骤。
- 类型一致：`customization.formulaScene.media/details` 在 schema、fixture、组件和测试中名称一致；`DEMO_ONLY` 图片路径为必填。
- 范围一致：其他三个节点仍为静态 article；公开标题、正文、CTA、屏高与其他首页屏幕不变。
- 可访问性一致：Formula 为 button，使用 `aria-pressed`、`aria-controls`、focus-visible、Escape 和 44px 目标。
- 工作区安全：使用精确路径与 `git add -p`，不覆盖或清理并行修改。
