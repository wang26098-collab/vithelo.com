# VITHELO 晨昏品牌标语屏 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在首页第 7 屏与询盘收尾之间新增一块静态晨昏品牌标语屏，逐字使用用户提供的英文，并保持现有询盘转化行为不变。

**Architecture:** 在现有 `VitheloB2BHomeContentSchema` 中增加独立 `statement` 内容记录和 `brand-statement` 顺序标识，页面模式组件按内容渲染单一新 section。新生成的无文字全屏图片进入 `public/media/b2b/`，CSS 负责固定桌面两行标题、移动端自然换行和现有分层滚动衔接；不增加新的客户端运行时或交互组件。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Zod、CSS Modules、Vitest / Testing Library、Playwright、OpenAI image generation。

---

## 文件结构

- 修改 `src/content/schema.ts`：增加第九个 section id、标语内容和 `DEMO_ONLY` 媒体契约。
- 修改 `src/content/demo/vithelo-b2b-home.ts`：保存用户原文、媒体路径和新的 section 顺序。
- 创建 `public/media/b2b/vithelo-daybreak-nightfall.png`：晨光到夜色的连续宽幅场景。
- 修改 `src/components/patterns/vithelo-b2b-home.tsx`：在项目路径与询盘之间渲染新屏。
- 修改 `src/components/patterns/vithelo-b2b-home.module.css`：完成静态全屏影像、两行标题和响应式布局。
- 修改 `tests/unit/vithelo-b2b-home-content.test.ts`：锁定原文、媒体状态和顺序。
- 修改 `tests/unit/vithelo-b2b-home.test.tsx`：锁定语义、无 CTA 和 DOM 顺序。
- 修改 `tests/unit/vithelo-home-geometry-contract.test.ts`：继续证明既有几何声明没有被改写。
- 修改 `tests/e2e/nutrition-home-sequence.spec.ts`：验证第九屏顺序与内容。
- 修改 `tests/e2e/vithelo-home-layered-scroll.spec.ts`：验证九层面板、圆角、重叠与 z-index。
- 修改 `tests/e2e/responsive.spec.ts`：验证桌面两行、移动端自然换行、无裁切与无横向溢出。
- 修改 `docs/current-status.md`：只更新首页屏数和本屏验收事实，不覆盖现有未提交内容。

### Task 1: 用失败测试锁定内容契约与顺序

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: 先阅读本仓库所安装 Next.js 的图片规则**

Run:

```powershell
Get-Content -Raw node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
Get-Content -Raw node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
```

Expected: 两份本地 Next.js 16 文档完整输出，后续 `Image fill`、`sizes` 和静态媒体用法以该版本文档为准。

- [ ] **Step 2: 写入失败的内容契约测试**

在 `tests/unit/vithelo-b2b-home-content.test.ts` 的首页内容测试中加入：

```ts
expect(parsed.sectionOrder).toEqual([
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "brand-statement",
  "contact",
]);
expect(parsed.statement).toEqual({
  title:
    "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
  supportingText:
    "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
  media: {
    status: "DEMO_ONLY",
    src: "/media/b2b/vithelo-daybreak-nightfall.png",
    label: "A continuous scene moving from soft daybreak into a quiet blue night with one warm illuminated window",
    width: 1536,
    height: 1024,
    format: "PNG",
  },
});
expect(parsed.contact.kicker).toBe("09 · START A PROJECT");
```

- [ ] **Step 3: 运行测试并确认它因新字段缺失而失败**

Run: `pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts`

Expected: FAIL，错误指出 section 数量、`statement` 或 contact kicker 与新预期不一致。

- [ ] **Step 4: 扩充最小 Zod 契约**

把 `brand-statement` 加入 `B2BHomeSectionIdSchema`，将顺序长度改为 9，并在 `runway` 与 `contact` 之间增加：

```ts
statement: z.object({
  title: z.literal(
    "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
  ),
  supportingText: z.literal(
    "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
  ),
  media: z.object({
    status: z.literal("DEMO_ONLY"),
    src: z.literal("/media/b2b/vithelo-daybreak-nightfall.png"),
    label: z.string().min(1),
    width: z.literal(1536),
    height: z.literal(1024),
    format: z.literal("PNG"),
  }),
}),
```

同时把 contact kicker 契约改为：

```ts
kicker: z.literal("09 · START A PROJECT"),
```

- [ ] **Step 5: 更新演示内容**

在 `project-runway` 与 `contact` 之间加入 `brand-statement`，并在 `runway` 与 `contact` 对象之间加入：

```ts
statement: {
  title:
    "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
  supportingText:
    "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
  media: {
    status: "DEMO_ONLY",
    src: "/media/b2b/vithelo-daybreak-nightfall.png",
    label:
      "A continuous scene moving from soft daybreak into a quiet blue night with one warm illuminated window",
    width: 1536,
    height: 1024,
    format: "PNG",
  },
},
```

把 contact kicker 的值改为 `09 · START A PROJECT`，不改 contact 的标题、正文、渠道或表单字段。

- [ ] **Step 6: 运行内容测试**

Run: `pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts`

Expected: PASS。

- [ ] **Step 7: 只提交本任务文件**

```powershell
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts
git commit -m "feat: define homepage brand statement"
```

### Task 2: 生成并审查晨昏配图

**Files:**
- Create: `public/media/b2b/vithelo-daybreak-nightfall.png`

- [ ] **Step 1: 使用 imagegen 生成无文字宽幅场景**

向图像生成工具提交以下完整提示词：

```text
Create a cinematic, photorealistic panoramic editorial photograph for a premium nutrition manufacturing brand website. One continuous architectural landscape carries time from left to right: on the left, fresh soft daybreak with pale ivory-blue sky and delicate early sunlight; through the middle, a restrained neutral transition; on the right, a quiet deep blue night. Include one small warm illuminated window or subtle interior light on the night side to suggest warmth and companionship without showing people. Calm, contemplative, refined, quietly emotional, realistic atmospheric depth, subtle mist, graphite and titanium architecture, cold ivory highlights, restrained amber warmth. Leave the left 60 percent visually quiet and low-detail for white English typography. No text, no logo, no products, no packaging, no pills, no gummies, no certification marks, no third-party branding, no green wellness palette, no fantasy sky, no split-screen seam, no collage. Landscape 3:2 composition, suitable for edge-to-edge cover crop on desktop and mobile.
```

Expected: 返回一张 1536 × 1024 PNG，左侧文字安全区明确，晨到夜的过渡属于同一连续空间。

- [ ] **Step 2: 用图像查看工具做原尺寸检查**

检查：没有生成文字或品牌；没有人物、产品或认证；左侧文字区足够平静；右侧暖光可见但不过曝；晨昏过渡无硬拼接感。

- [ ] **Step 3: 将生成结果复制到固定媒体路径并验证尺寸**

将图像工具返回的本地 PNG 复制为 `public/media/b2b/vithelo-daybreak-nightfall.png`，然后运行：

```powershell
Add-Type -AssemblyName System.Drawing
$statementImage = [System.Drawing.Image]::FromFile((Resolve-Path 'public/media/b2b/vithelo-daybreak-nightfall.png'))
"$($statementImage.Width)x$($statementImage.Height)"
$statementImage.Dispose()
```

Expected: `1536x1024`。

- [ ] **Step 4: 提交媒体资产**

```powershell
git add -- public/media/b2b/vithelo-daybreak-nightfall.png
git commit -m "feat: add daybreak to nightfall artwork"
```

### Task 3: 测试并渲染纯标语屏

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Verify: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 写入失败的组件测试**

把 `sectionIds` 增加 `brand-statement`，将八屏断言改为九屏，并加入：

```ts
it("renders a non-interactive daybreak statement between runway and inquiry", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const statement = document.getElementById("brand-statement")!;
  expect(statement).toHaveAttribute("data-narrative-role", "brand-statement");
  expect(within(statement).getByRole("heading", {
    name: "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
  })).toBeVisible();
  expect(within(statement).getByText(
    "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
  )).toBeVisible();
  expect(statement.querySelectorAll("[data-statement-line]")).toHaveLength(2);
  expect(within(statement).queryByRole("link")).not.toBeInTheDocument();
  expect(within(statement).queryByRole("button")).not.toBeInTheDocument();
  expect(statement.nextElementSibling).toHaveAttribute("id", "contact");
});
```

- [ ] **Step 2: 运行组件测试并确认失败**

Run: `pnpm.cmd test tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL，`brand-statement` 尚不存在。

- [ ] **Step 3: 在现有页面模式中增加最小 section**

在 `project-runway` section 后、`contact` section 前加入：

```tsx
<section
  aria-labelledby="brand-statement-title"
  className={`${styles.section} ${styles.brandStatementSection}`}
  data-media-status={content.statement.media.status}
  data-narrative-role="brand-statement"
  id="brand-statement"
>
  <Image
    alt=""
    aria-hidden="true"
    className={styles.brandStatementMedia}
    fill
    sizes="100vw"
    src={content.statement.media.src}
  />
  <div aria-hidden="true" className={styles.brandStatementVeil} />
  <div className={styles.brandStatementCopy}>
    <h2 id="brand-statement-title">
      <span data-statement-line>
        From the fresh vitality of daybreak’s first light,
      </span>
      <span data-statement-line>
        to the quiet peace when all the world slips into night.
      </span>
    </h2>
    <p>{content.statement.supportingText}</p>
  </div>
</section>
```

标题的两个 span 只负责确认过的桌面断行；完整可访问名称仍由同一个 h2 形成。不要增加 CTA、眉题或客户端动效。

- [ ] **Step 4: 增加样式并保持既有几何哈希不变**

在共享圆角 selector 中加入 `.brandStatementSection`；把 `.brandStatementSection` 加入 `.runwaySection` 已有的 `height`、`min-height` 和 `padding-block` selector，复用声明而不新增几何声明行。增加：

```css
.brandStatementSection {
  z-index: 8;
  margin-top: calc(var(--home-overlap-08) * -1);
  display: flex;
  align-items: center;
  isolation: isolate;
  background: #263239;
  color: var(--ivory);
}

.brandStatementMedia {
  z-index: -2;
  object-fit: cover;
  object-position: 62% center;
}

.brandStatementVeil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(90deg, rgb(24 35 40 / 94%) 0 48%, rgb(24 35 40 / 62%) 68%, rgb(13 19 27 / 20%) 100%);
}

.brandStatementCopy {
  width: min(100%, var(--home-frame-width));
  margin-inline: auto;
}

.brandStatementCopy h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 3.35vw, 3.375rem);
  font-weight: 400;
  letter-spacing: -0.038em;
  line-height: 1.04;
  white-space: nowrap;
}

.brandStatementCopy h2 span { display: block; }

.brandStatementCopy p {
  max-width: 58ch;
  margin: 1.875rem 0 0;
  color: rgb(243 240 232 / 86%);
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  line-height: 1.5;
}
```

新增 `--home-overlap-09`，在桌面、平板、手机分别与各断点已有 `--home-overlap-08` 值相同；把 contact 的 z-index 改为 9，margin 改为 `var(--home-overlap-09)`。在手机断点加入：

```css
.brandStatementSection {
  align-items: end;
  background: #202b31;
}

.brandStatementMedia { object-position: 72% center; }

.brandStatementVeil {
  background: linear-gradient(180deg, rgb(24 35 40 / 18%), rgb(24 35 40 / 90%) 62%);
}

.brandStatementCopy h2 {
  font-size: clamp(2.1rem, 10.2vw, 3rem);
  white-space: normal;
}

.brandStatementCopy h2 span { display: inline; }
```

- [ ] **Step 5: 运行组件与几何契约测试**

Run:

```powershell
pnpm.cmd test tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: PASS，且几何契约哈希仍为 `8A51770DA876C4E5D17E62F6B092659ED3FAE44A1E777593CF6CFCCCC9103C2C`。

- [ ] **Step 6: 提交渲染实现**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home.test.tsx
git commit -m "feat: add homepage daybreak statement screen"
```

### Task 4: 六视口验收与文档收口

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/vithelo-home-layered-scroll.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `docs/current-status.md`

- [ ] **Step 1: 更新顺序与分层 E2E 预期**

在两个 section id 数组的 `project-runway` 与 `contact` 之间加入 `brand-statement`。分层测试将面板数量改为 9、圆角与负重叠数量改为 8、z-index 改为：

```ts
expect(actual.positions).toEqual(Array(9).fill("relative"));
expect(actual.radii).toEqual(Array(8).fill(expected.radius));
expect(actual.zIndices).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
```

并把 `expectedFor` 的 overlaps 在每个断点末尾重复一次原 contact 值：桌面 `[40, 32, 28, 24, 24, 32, 32, 32]`，平板 `[32, 24, 22, 20, 20, 24, 24, 24]`，手机 `[20, 16, 14, 12, 12, 16, 16, 16]`。

- [ ] **Step 2: 增加桌面两行与无交互 E2E**

在 `tests/e2e/responsive.spec.ts` 增加：

```ts
test("brand statement keeps two desktop lines and a readable mobile flow", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");

  const statement = page.locator("#brand-statement");
  await statement.scrollIntoViewIfNeeded();
  await expect(statement).toBeVisible();
  await expect(statement.getByRole("link")).toHaveCount(0);
  await expect(statement.getByRole("button")).toHaveCount(0);

  const layout = await statement.evaluate((element) => {
    const lines = Array.from(element.querySelectorAll<HTMLElement>("[data-statement-line]"));
    const heading = element.querySelector<HTMLElement>("h2")!;
    return {
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      headingBottom: heading.getBoundingClientRect().bottom,
      sectionBottom: element.getBoundingClientRect().bottom,
      lineRects: lines.map((line) => Array.from(line.getClientRects()).length),
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  expect(layout.headingBottom).toBeLessThanOrEqual(layout.sectionBottom);
  if (viewport.width >= 1024) expect(layout.lineRects).toEqual([1, 1]);
});
```

- [ ] **Step 3: 运行三项定向 E2E**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/responsive.spec.ts
```

Expected: 六个项目中的定向检查全部 PASS；3100 端口由脚本独占启动和关闭。

- [ ] **Step 4: 完成桌面与手机截图审查**

用浏览器分别在 `1440 × 1000` 与 `390 × 844` 打开 `/` 并滚动到 `#brand-statement`。确认：桌面标题仅两行；手机无裁切；图像从晨光自然流向夜色；暖光不与文字抢焦点；前后分层圆角没有露底、跳层或横向溢出。

- [ ] **Step 5: 定向更新项目状态**

在 `docs/current-status.md` 将首页结构更新为九屏，并新增本屏的文案、静态配图、无 CTA、Reduced Motion 与定向验收事实；保留该文件中所有其他未提交修改。

- [ ] **Step 6: 运行最终验证**

Run:

```powershell
pnpm.cmd exec eslint src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/responsive.spec.ts
pnpm.cmd typecheck
pnpm.cmd test tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts
pnpm.cmd build
```

Expected: 四条命令退出码均为 0。不要把当前已知的参考资料 lint 问题描述为本功能失败，也不要声称完整 E2E 已全绿，除非另行运行并确实通过。

- [ ] **Step 7: 提交测试与状态文档**

```powershell
git add -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/responsive.spec.ts docs/current-status.md
git commit -m "test: verify homepage daybreak statement"
```

提交前必须用 `git diff --cached --name-only` 确认暂存区只包含上面四个文件，避免把当前工作树中的其他修改带入提交。
