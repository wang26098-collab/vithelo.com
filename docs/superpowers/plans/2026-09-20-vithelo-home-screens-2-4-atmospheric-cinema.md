# VITHELO 首页第 2–4 屏 Atmospheric Cinema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变第 2、3、4 屏任务、顺序、屏高、间距和证据边界的前提下，实现用户批准的暖暗电影化连续视觉。

**Architecture:** 内容 schema 和 fixture 继续拥有媒体路径、状态与替代文本；`VitheloB2BHome` 只渲染语义结构，CSS Module 负责构图与一次性揭示。第 2 屏只复用真实工厂图并通过 CSS 裁切/分级；第 3、4 屏使用 `DEMO_ONLY` 新媒体；第 4 屏四节点继续由 HTML 渲染。

**Tech Stack:** Next.js 16、React 19、TypeScript、Zod 4、CSS Modules、`next/image`、Vitest、Testing Library、Playwright、OpenAI Image Generation。

---

## 文件职责

- `public/media/b2b/vithelo-project-entry-atmospheric-panorama.png`：第 3 屏连续全景，无包装、无可读文字。
- `public/media/b2b/vithelo-product-definition-atmospheric.png`：第 4 屏暖暗中央瓶体，不烘焙四节点。
- `src/content/schema.ts`：严格区分真实制造媒体与 `DEMO_ONLY` 编辑影像。
- `src/content/demo/vithelo-b2b-home.ts`：登记媒体状态、路径、尺寸和替代文本。
- `src/components/patterns/vithelo-b2b-home.tsx`：渲染第 2 屏真实图、第 3 屏全景、第 4 屏瓶体与 HTML 节点。
- `src/components/patterns/vithelo-b2b-home.module.css`：三屏 Atmospheric Cinema、响应式与 Reduced Motion。
- `tests/unit/vithelo-b2b-home-content.test.ts`：媒体状态、路径与禁用内容。
- `tests/unit/vithelo-b2b-home.test.tsx`：三屏 DOM、媒体语义和数量。
- `tests/unit/vithelo-home-geometry-contract.test.ts`：锁定屏高与 padding。
- `tests/e2e/nutrition-home-sequence.spec.ts`：顺序、媒体、CTA 和证据边界。
- `tests/e2e/accessibility.spec.ts`：Reduced Motion 与最终可见状态。
- `docs/superpowers/specs/2026-09-20-vithelo-home-screens-2-4-atmospheric-cinema-acceptance.md`：中文验收记录。

## 工作区保护

相关组件、内容和测试已存在未提交修改。实施前后均不得使用 `git checkout`、`git reset` 或覆盖式恢复。任何提交都必须逐 hunk 审查；若本轮 hunk 无法与既有改动安全分离，则不提交实现代码。

### Task 1: 先写媒体边界与结构失败测试

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts:45-108`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx:70-135`
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts:35-70`
- Modify: `tests/e2e/accessibility.spec.ts:60-105`

- [ ] **Step 1: 审阅相关文件现有差异**

Run:

```powershell
git diff -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: 只识别本轮可安全追加的区块，不清理邻近代码。

- [ ] **Step 2: 锁定内容媒体状态**

在内容测试加入：

```ts
expect(vitheloB2BHome.proof.media).toMatchObject({
  status: "FREE_COMMERCIAL_OR_REAL",
  src: "/media/b2b/sanitized-factory-production-line.jpg",
});
expect(parsed.entryRoutes.media).toMatchObject({
  status: "DEMO_ONLY",
  src: "/media/b2b/vithelo-project-entry-atmospheric-panorama.png",
});
expect(parsed.customization.media).toMatchObject({
  status: "DEMO_ONLY",
  src: "/media/b2b/vithelo-product-definition-atmospheric.png",
});
expect(JSON.stringify(parsed.entryRoutes.media)).not.toMatch(
  /pouch|bottle|jar|box|stick|dropper|GMP|HACCP|Halal|ISO|FDA/i,
);
```

- [ ] **Step 3: 锁定三屏 DOM**

在组件测试加入：

```tsx
expect(within(proof).getByTestId("manufacturing-scene")).toHaveAttribute(
  "data-media-provenance",
  "real-source",
);
expect(within(runway).getByTestId("project-entry-scene")).toHaveAttribute(
  "data-media-status",
  "DEMO_ONLY",
);
expect(within(runway).getAllByTestId("project-entry-route")).toHaveLength(3);
expect(within(stage).getByTestId("customization-visual")).toHaveAttribute(
  "data-media-status",
  "DEMO_ONLY",
);
expect(within(stage).getAllByTestId("customization-node")).toHaveLength(4);
```

- [ ] **Step 4: 锁定 E2E 与 Reduced Motion**

在两个 E2E 文件加入：

```ts
await expect(proof.getByTestId("manufacturing-scene")).toHaveAttribute(
  "data-media-provenance",
  "real-source",
);
await expect(entryRoutes.getByTestId("project-entry-scene")).toHaveAttribute(
  "data-media-status",
  "DEMO_ONLY",
);
await expect(customization.getByTestId("customization-visual")).toHaveAttribute(
  "data-media-status",
  "DEMO_ONLY",
);
await expect(page.getByTestId("customization-node")).toHaveCount(4);
```

- [ ] **Step 5: 确认测试按预期失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL，仅因第 3 屏媒体字段、第 3/4 屏新路径状态或三个 data attribute 尚未实现。

### Task 2: 制作并审查第 3、4 屏媒体

**Files:**
- Create: `public/media/b2b/vithelo-project-entry-atmospheric-panorama.png`
- Create: `public/media/b2b/vithelo-product-definition-atmospheric.png`

- [ ] **Step 1: 使用 imagegen 生成第 3 屏全景**

Prompt:

```text
Create a wide 3:2 editorial still-life panorama for a premium B2B nutrition OEM/ODM website, with copy-safe negative space in the upper left. One continuous warm, low-exposure physical environment divided only by light and depth, never by cards: on the left, refined unbranded formula documents, translucent paper layers and a precise pencil; in the center, a quiet product-development workbench with an abstract non-readable project interface reflected in frosted acrylic; on the right, macro sensory materials such as cream mineral powder, translucent amber gel and soft granular texture. Warm ivory, oat, cocoa grey and one restrained honey highlight. Directional warm light, soft long shadows, tactile material, cinematic depth, calm premium precision, realistic photography. No packaging of any kind, no bottle, pouch, jar, box, stick pack or dropper, no supplement product, no pills, no logos, no readable text, no certification marks, no green botanical styling, no laboratory glassware, no cold blue, no chrome, no cyber interface, no people, no medical scene. The three zones must feel like one scene and remain usable behind three HTML text columns.
```

Expected: 1536 × 1024 PNG；三段可辨认、无硬分栏、无包装、无可读文字。

- [ ] **Step 2: 审图并返修第 3 屏**

用 `view_image` 确认：左/中/右分别暗示资料、项目定义、抽象材质；无包装、产品宣称、认证、冷蓝实验室或绿色草本风。失败则用 imagegen 返修，不用 PIL 或脚本拼贴成品。

- [ ] **Step 3: 使用 imagegen 编辑第 4 屏现有图片**

Reference: `public/media/b2b/vithelo-customization-constellation.png`

Prompt:

```text
Edit this VITHELO product-definition image into a 3:2 warm atmospheric cinematic scene while preserving one central neutral VITHELO bottle as the unmistakable subject. Replace the bright white studio feeling with a low-exposure cocoa-taupe environment, cream edge light and one restrained honey glow. Keep the bottle warm ivory with a subtle abstract V-shaped coral material zone; keep only the public wordmark VITHELO and remove every other readable label claim. Remove orbit graphics and all text because four decision nodes will be rendered in HTML. Simplify surrounding dosage-form objects so they do not compete with the bottle; keep generous negative space around it for nodes and responsive cropping. No certification marks, dosage, benefits, efficacy, ingredients, regulatory claims, green botanical styling, cold blue laboratory, chrome, cyber interface, medical props or extra brands.
```

Expected: 1536 × 1024 PNG；中央瓶体唯一主角，周边可放四个 HTML 节点。

- [ ] **Step 4: 审图并保存**

用 `view_image` 确认唯一可读品牌为 VITHELO、无宣称与认证、暖暗影调成立、移动 3:2 裁切保留瓶体。将通过版本保存到两个约定路径。

- [ ] **Step 5: 校验尺寸**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
Get-Item 'public\media\b2b\vithelo-project-entry-atmospheric-panorama.png','public\media\b2b\vithelo-product-definition-atmospheric.png' | ForEach-Object {
  $bitmap = [System.Drawing.Image]::FromFile($_.FullName)
  [pscustomobject]@{ Path=$_.FullName; Width=$bitmap.Width; Height=$bitmap.Height; Bytes=$_.Length }
  $bitmap.Dispose()
}
```

Expected: 两张图均为 1536 × 1024，宽高和文件大小为正数。若 imagegen 输出不是该尺寸，返修生成而不是拉伸。

### Task 3: 扩展内容合约并登记媒体

**Files:**
- Modify: `src/content/schema.ts:218-292`
- Modify: `src/content/demo/vithelo-b2b-home.ts:41-124`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: 添加严格的 DEMO_ONLY 编辑影像 schema**

在 `B2BRequiredMediaSchema` 后加入：

```ts
const B2BEditorialDemoMediaSchema = z.object({
  status: z.literal("DEMO_ONLY"),
  src: z.string().regex(/^\/media\/b2b\/[\w.-]+$/),
  label: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: z.enum(["WebP", "transparent WebP", "PNG", "JPEG"]),
});
```

让 `entryRoutes` 必须包含 `media: B2BEditorialDemoMediaSchema`，并把 `customization.media` 改为该 schema；`proof.media` 保持真实媒体 schema。

- [ ] **Step 2: 登记第 3 屏媒体**

在 `entryRoutes` 加入：

```ts
media: {
  status: "DEMO_ONLY",
  src: "/media/b2b/vithelo-project-entry-atmospheric-panorama.png",
  label:
    "A warm, low-lit product-development workspace moving from formula documents through project definition to abstract sensory materials",
  width: 1536,
  height: 1024,
  format: "PNG",
},
```

- [ ] **Step 3: 更新第 4 屏媒体**

替换 `customization.media`：

```ts
media: {
  status: "DEMO_ONLY",
  src: "/media/b2b/vithelo-product-definition-atmospheric.png",
  label:
    "A warm ivory VITHELO concept bottle in a low-lit cocoa setting, surrounded by four product-definition relationships",
  width: 1536,
  height: 1024,
  format: "PNG",
},
```

- [ ] **Step 4: 运行内容测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: PASS。

### Task 4: 渲染三屏媒体层

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx:241-374`
- Test: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 恢复第 2 屏真实制造图片**

在 `.proofNarrative` 后加入：

```tsx
<figure
  className={styles.proofVisual}
  data-media-provenance="real-source"
  data-motion-role="media"
  data-testid="manufacturing-scene"
>
  <Image
    alt={content.proof.media.label}
    fill
    sizes="(max-width: 900px) 100vw, 42vw"
    src={content.proof.media.src!}
  />
  <figcaption>REAL MANUFACTURING REFERENCE</figcaption>
</figure>
```

不使用 `preload` 或已弃用的 `priority`；它不是 Hero/LCP 图片。

- [ ] **Step 2: 增加第 3 屏连续全景**

在 `featuredIntro` 之前加入：

```tsx
<figure
  aria-hidden="true"
  className={styles.entryRouteScene}
  data-media-status={content.entryRoutes.media.status}
  data-motion-role="media"
  data-testid="project-entry-scene"
>
  <Image alt="" fill sizes="100vw" src={content.entryRoutes.media.src} />
</figure>
<div aria-hidden="true" className={styles.entryRouteVeil} />
```

图像是装饰背景，三个入口标题和正文保留全部语义。

- [ ] **Step 3: 标记第 4 屏媒体状态**

在现有 `customizationVisual` figure 上增加：

```tsx
data-media-status={content.customization.media.status}
```

保留非空 alt，因为中央瓶体参与表达含义。

- [ ] **Step 4: 运行组件测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx
```

Expected: PASS；仍为 4 个 workstream、3 个 entry route、4 个 customization node。

### Task 5: 实现 Atmospheric Cinema CSS

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:218-448`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:450-505`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:620-807`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:2190-2263`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:2306-2440`
- Test: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 第 2 屏改为暖暗真实制造场景**

保留现有 `height`、`min-height`、`padding`，修改/加入：

```css
.proof {
  background:
    radial-gradient(circle at 78% 18%, rgb(224 162 104 / 24%), transparent 28%),
    #302c29;
  color: var(--ivory);
}

.proofPrimary {
  position: relative;
  grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1.18fr);
}

.proofVisual {
  isolation: isolate;
  overflow: hidden;
  border-radius: var(--radius-cinematic);
  background: #514a44;
  box-shadow: none;
}

.proofVisual::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: "";
  background:
    linear-gradient(90deg, rgb(30 26 23 / 45%), transparent 52%),
    linear-gradient(180deg, transparent 58%, rgb(32 28 25 / 48%));
  pointer-events: none;
}

.proofVisual img {
  object-fit: cover;
  object-position: 50% 58%;
  filter: sepia(0.12) saturate(0.68) contrast(1.06) brightness(0.72);
}
```

同步将第 2 屏 kicker、正文、CTA 与工作流文字改为暖白层级，不改公开文案。

- [ ] **Step 2: 第 3 屏使用单一全景背景**

加入：

```css
.entryRouteScene,
.entryRouteVeil {
  position: absolute;
  inset: 0;
}

.entryRouteScene img {
  object-fit: cover;
  object-position: center;
  filter: saturate(0.78) contrast(1.04) brightness(0.76);
}

.entryRouteVeil {
  z-index: 1;
  background:
    linear-gradient(180deg, rgb(30 27 24 / 44%), rgb(30 27 24 / 22%) 42%, rgb(30 27 24 / 68%)),
    linear-gradient(90deg, rgb(30 27 24 / 36%), transparent 48%, rgb(30 27 24 / 22%));
  pointer-events: none;
}

.featuredIntro,
.entryRouteGrid {
  position: relative;
  z-index: 2;
}

.entryRoute {
  background: transparent;
}
```

- [ ] **Step 3: 第 4 屏改为暖暗关系场景**

保留现有几何声明，修改/加入：

```css
.customizationSection {
  background:
    radial-gradient(circle at 72% 34%, rgb(222 162 104 / 24%), transparent 29%),
    #302c29;
  color: var(--ivory);
}

.customizationVisual {
  -webkit-mask-image: radial-gradient(ellipse 64% 74% at 50% 52%, #000 58%, transparent 84%);
  mask-image: radial-gradient(ellipse 64% 74% at 50% 52%, #000 58%, transparent 84%);
}

.customizationVisual img {
  object-fit: contain;
  filter: saturate(0.82) contrast(1.04);
}

.customizationOrbit,
.customizationOrbit::after {
  border-color: rgb(255 238 215 / 18%);
}

.customizationNodeMark {
  border-color: rgb(255 238 215 / 20%);
  background: rgb(48 44 41 / 62%);
  color: var(--ivory);
}
```

把标题、正文、节点和 CTA 调成暖白层级；不使用霓虹、冷蓝或循环动画。

- [ ] **Step 4: 保留一次性显影与 Reduced Motion**

复用现有 `[data-motion-role="media"]` clip reveal。Reduced Motion 最终规则必须覆盖：

```css
@media (prefers-reduced-motion: reduce) {
  .homepage [data-motion-role],
  .customizationIntro,
  .customizationVisual,
  .customizationNode {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    animation: none !important;
  }
}
```

- [ ] **Step 5: 保持移动端文档流**

继续使用现有单列 entry routes 和静态 customization nodes，只补充：

```css
@media (max-width: 760px) {
  .entryRouteScene img { object-position: 58% center; }
  .customizationVisual img { object-position: center; }
}
```

不得为三屏新增或修改 `height`、`min-height`、`padding*` 声明。

- [ ] **Step 6: 验证几何与组件**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: PASS；几何 hash 仍为 `510CD4882DF236AAB05843B8ACC1F1925DF1BBB4F3297DE55879787CF8C8B525`。

### Task 6: 定向 E2E 与六视口视觉验收

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Create: `docs/superpowers/specs/2026-09-20-vithelo-home-screens-2-4-atmospheric-cinema-acceptance.md`

- [ ] **Step 1: 运行定向 E2E**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: 第 2–4 屏顺序、媒体状态、CTA、Reduced Motion 与节点检查通过。

- [ ] **Step 2: 检查六个验收视口**

视口：1440×1000、1280×800、1024×1366、768×1024、390×844、360×800。

逐屏确认：

- 第 2 屏真实空间可辨认，没有伪造内容；
- 第 3 屏共享一个空间，无包装、无三张卡片感；
- 第 4 屏瓶体唯一主角，四节点清晰，移动端为顺序清单；
- 无遮挡、主体误裁、横向溢出、对比度不足或节点碰撞；
- P0 = 0，P1 = 0。

- [ ] **Step 3: 只返修本轮缺陷**

只修改第 2–4 屏相关 CSS、媒体、内容记录或测试；不得重构 Hero、导航、第 5–9 屏。

- [ ] **Step 4: 写中文验收记录**

使用：

```markdown
# VITHELO 首页第 2–4 屏 Atmospheric Cinema 验收

- 设计规范：2026-09-20-vithelo-home-screens-2-4-atmospheric-cinema-design.md
- 验收视口：1440×1000、1280×800、1024×1366、768×1024、390×844、360×800
- P0：0
- P1：0
- 第 2 屏：真实工厂源图，仅 CSS 裁切与分级
- 第 3 屏：DEMO_ONLY，无包装
- 第 4 屏：DEMO_ONLY，中央概念瓶 + HTML 四节点
- Reduced Motion：通过
- 定向单元测试：填写实际结果
- 定向 E2E：填写实际结果
- 用户视觉验收：待确认
```

### Task 7: 完整验证与干净交付

**Files:**
- Verify: all changed files

- [ ] **Step 1: 运行定向 lint**

Run:

```powershell
pnpm.cmd exec eslint src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: exit code 0。

- [ ] **Step 2: 类型检查、完整单元测试与构建**

Run:

```powershell
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: 全部 exit code 0。若运行环境仍是 Node 24，只声明本地构建通过，不声明 Hostinger Node 20 已验证。

- [ ] **Step 3: 扫描禁用身份和宣称**

Run:

```powershell
Get-ChildItem -LiteralPath 'src','public\media\b2b' -Recurse -File | Select-String -Pattern '森酷|Sencool|GMP|HACCP|Halal|ISO|FDA|Flexible MOQ|annual growth'
```

Expected: 本轮新增代码与元数据无匹配；两张图片已通过人工审图。

- [ ] **Step 4: 检查最终 diff**

Run:

```powershell
git status --short
git diff -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: 每一行都能追溯到批准规范；不新增修改 `next-env.d.ts`、Hero、导航或第 5–9 屏。

- [ ] **Step 5: 条件式提交**

只有能安全分离本轮 hunk 时才运行：

```powershell
git add -p -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
git add -- public/media/b2b/vithelo-project-entry-atmospheric-panorama.png public/media/b2b/vithelo-product-definition-atmospheric.png docs/superpowers/specs/2026-09-20-vithelo-home-screens-2-4-atmospheric-cinema-acceptance.md
git commit -m "feat(home): restyle screens two through four"
```

Expected: 只提交本轮内容。若无法安全分离，跳过提交并在交付说明中列明。

## 计划自检

- 规范覆盖：第 2 屏真实来源、第 3 屏无包装、第 4 屏瓶体与四节点、移动端、Reduced Motion、媒体状态、六视口和技术门槛都有对应任务。
- 类型一致：`entryRoutes.media` 与 `customization.media` 均使用 `B2BEditorialDemoMediaSchema`；组件字段与 fixture 一致。
- 几何一致：禁止修改三屏现有 `height`、`min-height` 和 `padding*`，几何 hash 预期不变。
- 工作区安全：不清理、不覆盖、不擅自提交既有修改。

