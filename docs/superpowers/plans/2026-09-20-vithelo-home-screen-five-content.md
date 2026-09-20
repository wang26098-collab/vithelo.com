# VITHELO 首页第 5 屏内容实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 只替换首页第 5 屏的三张场景素材和三组文案，删除 `01 / 02 / 03`，让桌面与平板文案保持单行，同时保留已确认的 600px 圆角重叠滚动效果。

**Architecture:** 三张新图通过内置 `image_gen` 分别生成并落入 `public/media/b2b/`，继续由 `src/content/demo/vithelo-b2b-home.ts` 作为 Zod 验证的数据入口。`VitheloMarketStage` 只负责渲染场景、图片与文案；单行规则继续放在现有 CSS Module 中，既不新增滚动 JavaScript，也不修改第 5 屏以外的页面结构。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、CSS Modules、Zod、Vitest、Testing Library、Playwright、内置 `image_gen`

---

## 文件结构与边界

- Create: `public/media/b2b/vithelo-evening-wellness-scene-v1.png` — Evening Wellness 场景图，`DEMO_ONLY`。
- Create: `public/media/b2b/vithelo-active-nutrition-scene-v1.png` — Active Nutrition 场景图，`DEMO_ONLY`。
- Create: `public/media/b2b/vithelo-womens-wellness-scene-v1.png` — Women’s Wellness 场景图，`DEMO_ONLY`。
- Modify: `docs/vithelo-media-register.md` — 登记三张生成素材的来源、用途与证据边界。
- Modify: `src/content/demo/vithelo-b2b-home.ts:135-174` — 写入三组已确认的标题、正文、媒体路径和媒体描述。
- Modify: `src/components/patterns/vithelo-market-stage.tsx:21-56` — 删除编号节点，保留 `data-scene` 层级与现有图片机制。
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:1558-1591,2517-2525` — 删除编号样式，添加桌面/平板单行与移动端自然换行规则。
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts:117-129` — 锁定新内容、媒体路径和 `DEMO_ONLY` 状态。
- Modify: `tests/unit/vithelo-b2b-home.test.tsx:100-113` — 锁定三屏标题与“无编号”渲染结果。
- Modify: `tests/e2e/vithelo-home-layered-scroll.spec.ts` — 验证六个验收视口的单行、移动换行、无溢出和无编号。
- Modify: `tests/unit/vithelo-home-geometry-contract.test.ts` — 把旧 `100svh` 说明与哈希更新为已经确认的 600px 第 5 屏基线；不改生产 CSS 几何。

工作区当前已有其他未提交改动。所有提交均使用路径限定和交互式暂存，只暂存本计划产生的区块；不得用 `git add .`。

### Task 1: 生成并登记三张第 5 屏场景素材

**Files:**
- Create: `public/media/b2b/vithelo-evening-wellness-scene-v1.png`
- Create: `public/media/b2b/vithelo-active-nutrition-scene-v1.png`
- Create: `public/media/b2b/vithelo-womens-wellness-scene-v1.png`
- Modify: `docs/vithelo-media-register.md`

- [ ] **Step 1: 用内置 `image_gen` 独立生成 Evening Wellness 场景**

不传参考图；现有图片只用于理解版式，不参与编辑或合成。使用以下完整提示词：

```text
Use case: photorealistic-natural
Asset type: VITHELO homepage product-direction scene
Primary request: create a new premium commercial lifestyle photograph for an evening nutrition concept; this must be an original scene, not an edit or composite of any existing site image
Scene/backdrop: quiet contemporary home at dusk, restrained interior, a natural hand reaching near a clear glass of water
Subject: one matte graphite capsule bottle placed in the right 40 percent of the frame, with the exact word "VITHELO" printed once on the front; two capsules nearby as a subtle dosage-format cue
Style/medium: photorealistic commercial photography with real material texture and restrained depth of field
Composition/framing: wide landscape composition; clean low-detail negative space across the left 55 percent for website copy; product and hand remain crop-safe for 4:3 and mobile crops
Lighting/mood: soft dusk light with a restrained warm interior glow, calm but not sleepy or therapeutic
Color palette: cold ivory, graphite, titanium, muted warm light
Materials/textures: matte packaging, clear glass, natural skin texture, realistic contact shadows and reflections
Text (verbatim): "VITHELO"
Constraints: render VITHELO exactly once; no other label copy; no watermark; no medical device; no pills being swallowed; no health result; no sleep or treatment claim; no logo other than the VITHELO wordmark
Avoid: stock-photo polish, pasted-on packaging, extra products, extra text, green wellness styling, exaggerated fatigue
```

- [ ] **Step 2: 审查 Evening Wellness 输出并落盘**

用 `view_image` 检查左侧文字安全区、瓶身拼写、手部、胶囊、接触阴影和裁切安全。若只有一个问题，使用一次只改该问题的定向编辑；不得同时重构场景。将最终输出从工具返回的 `$CODEX_HOME/generated_images/...` 路径复制到：

```text
public/media/b2b/vithelo-evening-wellness-scene-v1.png
```

- [ ] **Step 3: 用内置 `image_gen` 独立生成 Active Nutrition 场景**

```text
Use case: photorealistic-natural
Asset type: VITHELO homepage product-direction scene
Primary request: create a new premium commercial lifestyle photograph for a portable active-nutrition concept; this must be an original scene, not an edit or composite of any existing site image
Scene/backdrop: natural daylight training or travel-preparation setting with only a gym bag, folded towel and water bottle as restrained environmental cues
Subject: one matte titanium-gray powder jar and two slim stick packs in the right 40 percent of the frame; the jar carries the exact word "VITHELO" once, while the stick packs have no readable claims
Style/medium: photorealistic commercial photography with realistic everyday detail and restrained depth of field
Composition/framing: wide landscape composition; clean low-detail negative space across the left 55 percent for website copy; products remain crop-safe for 4:3 and mobile crops
Lighting/mood: clean natural daylight, prepared and mobile rather than intense or competitive
Color palette: titanium gray, cold ivory, graphite, a very subtle optical-purple reflection
Materials/textures: matte jar, flexible stick-pack film, worn fabric, realistic contact shadows and reflections
Text (verbatim): "VITHELO"
Constraints: render VITHELO exactly once; no other readable label copy; no watermark; no dosage, efficacy, certification or performance claim; no body-transformation cue; no unrelated logo
Avoid: exaggerated muscles, competitive sports result, gym clutter, pasted-on packaging, extra products, extra text, green wellness styling
```

- [ ] **Step 4: 审查 Active Nutrition 输出并落盘**

用 `view_image` 检查左侧安全区、粉剂罐与两支条包的可辨识度、包装透视和光影一致性。将最终输出复制到：

```text
public/media/b2b/vithelo-active-nutrition-scene-v1.png
```

- [ ] **Step 5: 用内置 `image_gen` 独立生成 Women’s Wellness 场景**

```text
Use case: photorealistic-natural
Asset type: VITHELO homepage product-direction scene
Primary request: create a new premium commercial lifestyle photograph for a women’s everyday-wellness concept; this must be an original scene, not an edit or composite of any existing site image
Scene/backdrop: calm contemporary morning routine in a warm ivory home setting
Subject: one mature adult woman with natural age texture in the right half of the frame, beside a matte VITHELO gummy bottle and a few restrained red gummies in the foreground; the bottle carries the exact word "VITHELO" once
Style/medium: photorealistic commercial photography, candid and dignified, with true skin and material texture
Composition/framing: wide landscape composition; clean low-detail negative space across the left 55 percent for website copy; face, bottle and gummies remain crop-safe for 4:3 and mobile crops
Lighting/mood: soft natural morning light, composed and everyday, not clinical or beauty-advertising
Color palette: warm ivory, natural skin tones, stone texture, restrained red as the only distinct warm accent
Materials/textures: matte bottle, translucent gummies, real skin texture, stone and fabric, realistic contact shadows and reflections
Text (verbatim): "VITHELO"
Constraints: render VITHELO exactly once; no other label copy; no watermark; no white coat; no diagnosis, beauty result, life-stage efficacy or treatment claim; no unrelated logo
Avoid: heavy retouching, anti-aging cues, clinical setting, pasted-on packaging, extra products, extra text, green wellness styling
```

- [ ] **Step 6: 审查 Women’s Wellness 输出并落盘**

用 `view_image` 检查真实年龄质感、左侧安全区、软糖数量、瓶身拼写和非医疗表达。将最终输出复制到：

```text
public/media/b2b/vithelo-womens-wellness-scene-v1.png
```

- [ ] **Step 7: 验证三个文件和像素尺寸**

Run:

```powershell
$paths = @(
  'public/media/b2b/vithelo-evening-wellness-scene-v1.png',
  'public/media/b2b/vithelo-active-nutrition-scene-v1.png',
  'public/media/b2b/vithelo-womens-wellness-scene-v1.png'
)
Add-Type -AssemblyName System.Drawing
foreach ($path in $paths) {
  $image = [System.Drawing.Image]::FromFile((Resolve-Path $path))
  try { [PSCustomObject]@{ Path = $path; Width = $image.Width; Height = $image.Height } }
  finally { $image.Dispose() }
}
```

Expected: 三个文件都存在、均为横向图片；记录输出的实际 `Width` 和 `Height`，供 Task 2 的媒体元数据使用。若任一图不是横向或关键主体无法安全裁切，回到对应的单图生成步骤，不用脚本拉伸图片。

- [ ] **Step 8: 在媒体登记表追加三条记录**

在表格中追加：

```markdown
| `/media/b2b/vithelo-evening-wellness-scene-v1.png` | OpenAI image generation, 2026-09-20 | OpenAI image generation | Project concept asset; public-use approval pending | Homepage `#solutions` Evening Wellness scene | Concept packaging and lifestyle context only; not VITHELO product, customer, efficacy or manufacturing evidence. Held as `DEMO_ONLY` | Replace when approved VITHELO lifestyle/product photography is available |
| `/media/b2b/vithelo-active-nutrition-scene-v1.png` | OpenAI image generation, 2026-09-20 | OpenAI image generation | Project concept asset; public-use approval pending | Homepage `#solutions` Active Nutrition scene | Concept packaging and lifestyle context only; not VITHELO product, customer, efficacy or manufacturing evidence. Held as `DEMO_ONLY` | Replace when approved VITHELO lifestyle/product photography is available |
| `/media/b2b/vithelo-womens-wellness-scene-v1.png` | OpenAI image generation, 2026-09-20 | OpenAI image generation | Project concept asset; public-use approval pending | Homepage `#solutions` Women’s Wellness scene | Concept packaging and lifestyle context only; not VITHELO product, customer, efficacy or manufacturing evidence. Held as `DEMO_ONLY` | Replace when approved VITHELO lifestyle/product photography is available |
```

- [ ] **Step 9: 提交素材与登记区块**

```powershell
git add -- 'public/media/b2b/vithelo-evening-wellness-scene-v1.png' 'public/media/b2b/vithelo-active-nutrition-scene-v1.png' 'public/media/b2b/vithelo-womens-wellness-scene-v1.png'
git add -p -- 'docs/vithelo-media-register.md'
git diff --cached --check
git diff --cached --name-only
git commit -m "feat: add screen five lifestyle scenes"
```

Expected: staged file list only包含三张新图和媒体登记表；提交成功。

### Task 2: 用测试锁定新内容并删除场景编号

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts:117-129`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx:100-113`
- Modify: `src/content/demo/vithelo-b2b-home.ts:135-174`
- Modify: `src/components/patterns/vithelo-market-stage.tsx:21-56`

- [ ] **Step 1: 先修改内容契约测试**

把 `keeps three product directions...` 中的方向断言改为：

```ts
expect(parsed.market.stories).toMatchObject([
  {
    title: "Evening Wellness",
    copy: "Evening nutrition concepts shaped around format, flavor and everyday routines.",
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-evening-wellness-scene-v1.png",
    },
  },
  {
    title: "Active Nutrition",
    copy: "Portable nutrition formats for movement, training, travel and everyday use.",
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-active-nutrition-scene-v1.png",
    },
  },
  {
    title: "Women’s Wellness",
    copy: "Everyday nutrition concepts shaped around women’s routines and life stages.",
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-womens-wellness-scene-v1.png",
    },
  },
]);
```

保留现有 `market` 无 `kicker/title/intro` 断言和第 6、7 屏顺序断言。

- [ ] **Step 2: 再修改组件渲染测试**

在现有三场景测试中追加：

```ts
expect(within(directions!).getByRole("heading", { name: "Evening Wellness" })).toBeInTheDocument();
expect(within(directions!).getByRole("heading", { name: "Active Nutrition" })).toBeInTheDocument();
expect(within(directions!).getByRole("heading", { name: "Women’s Wellness" })).toBeInTheDocument();
expect(within(directions!).queryByText(/^(01|02|03)$/)).not.toBeInTheDocument();
```

- [ ] **Step 3: 运行测试并确认先失败**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL，旧标题仍为 `Evening Routines / Active Routines / Life-stage Routines`，页面仍存在编号。

- [ ] **Step 4: 更新三组内容和媒体元数据**

把 `market.stories` 改为下列结构。`width` 与 `height` 必须使用 Task 1 Step 7 打印的三张图实际整数，不得伪造；除此之外内容逐字保持：

```ts
market: {
  stories: [
    {
      title: "Evening Wellness",
      copy: "Evening nutrition concepts shaped around format, flavor and everyday routines.",
      media: {
        status: "DEMO_ONLY",
        src: "/media/b2b/vithelo-evening-wellness-scene-v1.png",
        label: "A quiet evening home scene with a VITHELO capsule concept bottle, water and two capsules",
        width: 1536,
        height: 1024,
        format: "PNG",
      },
    },
    {
      title: "Active Nutrition",
      copy: "Portable nutrition formats for movement, training, travel and everyday use.",
      media: {
        status: "DEMO_ONLY",
        src: "/media/b2b/vithelo-active-nutrition-scene-v1.png",
        label: "An active travel-preparation scene with a VITHELO powder concept jar and two stick packs",
        width: 1536,
        height: 1024,
        format: "PNG",
      },
    },
    {
      title: "Women’s Wellness",
      copy: "Everyday nutrition concepts shaped around women’s routines and life stages.",
      media: {
        status: "DEMO_ONLY",
        src: "/media/b2b/vithelo-womens-wellness-scene-v1.png",
        label: "A mature woman in a morning routine beside a VITHELO gummy concept bottle and red gummies",
        width: 1536,
        height: 1024,
        format: "PNG",
      },
    },
  ],
},
```

上面 `1536 × 1024` 是内置工具的预期横向输出。若 Task 1 验证得到不同尺寸，只替换对应的两个整数，其他字段不变。

- [ ] **Step 5: 删除编号节点但保留场景层级**

从 `VitheloMarketStage` 中删除：

```tsx
<span className={styles.marketSceneIndex}>
  {String(index + 1).padStart(2, "0")}
</span>
```

保留 `index`，因为 `data-scene={index + 1}` 仍负责三层 z-index、图像定位和圆角重叠顺序。

- [ ] **Step 6: 重新运行单测**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: 两个文件全部 PASS。

- [ ] **Step 7: 提交内容、组件和测试区块**

```powershell
git add -p -- 'src/content/demo/vithelo-b2b-home.ts' 'src/components/patterns/vithelo-market-stage.tsx' 'tests/unit/vithelo-b2b-home-content.test.ts' 'tests/unit/vithelo-b2b-home.test.tsx'
git diff --cached --check
git diff --cached --name-only
git commit -m "feat: update screen five product directions"
```

Expected: 暂存区只包含三组内容、编号删除及其单测。

### Task 3: 锁定单行排版、移动换行和既有几何基线

**Files:**
- Modify: `tests/e2e/vithelo-home-layered-scroll.spec.ts`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:1558-1591,2517-2525`
- Modify: `tests/unit/vithelo-home-geometry-contract.test.ts`

- [ ] **Step 1: 添加响应式排版 E2E 测试**

在 `vithelo-home-layered-scroll.spec.ts` 末尾添加：

```ts
test("product direction copy has no numbers and respects responsive line rules", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");

  const stage = page.locator("#solutions");
  await expect(stage.getByText(/^(01|02|03)$/)).toHaveCount(0);

  const layout = await page.getByTestId("market-scene").evaluateAll((scenes) =>
    scenes.map((scene) => {
      const heading = scene.querySelector<HTMLElement>("h3");
      const copy = scene.querySelector<HTMLElement>("p");
      if (!heading || !copy) throw new Error("Market scene copy is missing");
      return {
        headingWhiteSpace: getComputedStyle(heading).whiteSpace,
        copyWhiteSpace: getComputedStyle(copy).whiteSpace,
        headingFits: heading.scrollWidth <= heading.clientWidth + 1,
        copyFits: copy.scrollWidth <= copy.clientWidth + 1,
        sceneFits: scene.scrollWidth <= scene.clientWidth + 1,
      };
    }),
  );

  if (viewport.width <= 760) {
    expect(layout.every((item) => item.headingWhiteSpace === "normal")).toBe(true);
    expect(layout.every((item) => item.copyWhiteSpace === "normal")).toBe(true);
    expect(layout.every((item) => item.sceneFits)).toBe(true);
    return;
  }

  expect(layout.every((item) => item.headingWhiteSpace === "nowrap")).toBe(true);
  expect(layout.every((item) => item.copyWhiteSpace === "nowrap")).toBe(true);
  expect(layout.every((item) => item.headingFits && item.copyFits && item.sceneFits)).toBe(true);
});
```

- [ ] **Step 2: 运行四个关键视口并确认测试先失败**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/vithelo-home-layered-scroll.spec.ts --project=desktop-1440 --project=tablet-768 --project=mobile-390 --project=mobile-375
```

Expected: 新测试 FAIL，因为桌面/平板当前未声明 `white-space: nowrap`。

- [ ] **Step 3: 添加最小单行规则并删除孤立编号样式**

把 `.marketSceneCopy` 的宽度改为：

```css
.marketSceneCopy {
  position: absolute;
  left: 190px;
  bottom: clamp(7rem, 15vh, 11rem);
  z-index: 3;
  width: min(780px, calc(100vw - 240px));
  color: #fffaf0;
  text-shadow: 0 2px 24px rgb(0 0 0 / 34%);
}
```

完整删除 `.marketSceneIndex` 规则，并添加：

```css
.marketSceneCopy h3,
.marketSceneCopy p {
  white-space: nowrap;
}

.marketSceneCopy p {
  max-width: none;
  margin: 1.15rem 0 0;
  color: rgb(255 250 240 / 82%);
  font-size: clamp(0.8rem, 0.95vw, 0.92rem);
  line-height: 1.6;
}
```

在现有 `@media (max-width: 760px)` 内追加：

```css
.marketSceneCopy h3,
.marketSceneCopy p {
  white-space: normal;
}
```

不要修改 `.marketScene` 的 `height: 600px`、圆角、负 margin、z-index、`background-attachment` 或背景定位。

- [ ] **Step 4: 重新运行六视口第 5 屏 E2E**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/vithelo-home-layered-scroll.spec.ts
```

Expected: 六个项目全部 PASS；桌面和平板单行，移动端自然换行且无横向溢出；原有 600px、圆角、层叠和前图透出测试继续通过。

- [ ] **Step 5: 更新旧几何锁测试，不改生产几何**

把 `tests/unit/vithelo-home-geometry-contract.test.ts` 中关于第 5 屏 `height: 100svh` 的旧注释替换为：

```ts
// Spec 2026-09-20 (第 5 屏 Nordicus 式圆角重叠): the three desktop/tablet
// .marketScene panels use a fixed 600px window height, relative positioning,
// and radius-derived negative overlap. Mobile and Reduced Motion use static
// image panels. This contract update records the accepted geometry; it does
// not authorize geometry changes outside #solutions.
```

把期望哈希改为当前已核算的：

```ts
"C15F107047F0A41C020046B42E2F83F40FE78E73FDDA80CF3706DF2AB61D2D15"
```

- [ ] **Step 6: 验证几何锁单测**

Run:

```powershell
pnpm.cmd exec vitest run tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: PASS。若哈希仍不同，停止并检查本任务之外的 `height / min-height / padding` 是否发生变化；不得盲目再次改哈希。

- [ ] **Step 7: 提交排版、E2E 与几何锁区块**

```powershell
git add -p -- 'src/components/patterns/vithelo-b2b-home.module.css' 'tests/e2e/vithelo-home-layered-scroll.spec.ts' 'tests/unit/vithelo-home-geometry-contract.test.ts'
git diff --cached --check
git diff --cached --name-only
git commit -m "fix: keep screen five copy on one line"
```

Expected: 只暂存第 5 屏排版规则、新 E2E 和对应几何锁说明/哈希。

### Task 4: 完整验证与视觉验收

**Files:**
- Verify only; do not create production files.

- [ ] **Step 1: 运行文件级 lint 与类型检查**

Run:

```powershell
pnpm.cmd exec eslint src/components/patterns/vithelo-market-stage.tsx src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/vithelo-home-layered-scroll.spec.ts tests/unit/vithelo-home-geometry-contract.test.ts
pnpm.cmd typecheck
```

Expected: 两条命令 exit code 0。Node 24 下可能打印项目要求 Node 20 的 engine warning；warning 不能替代 Hostinger 的 Node 20 证明，但本任务不改部署配置。

- [ ] **Step 2: 运行完整单测**

Run:

```powershell
pnpm.cmd test
```

Expected: 全部 PASS，原先几何哈希的单个失败已消失。

- [ ] **Step 3: 运行完整 E2E**

Run:

```powershell
pnpm.cmd test:e2e
```

Expected: 六个验收视口全部 PASS；无端口 3100 冲突。

- [ ] **Step 4: 运行生产构建**

Run:

```powershell
pnpm.cmd build
```

Expected: exit code 0，无类型或静态生成错误。

- [ ] **Step 5: 在六个验收视口做第 5 屏视觉检查**

检查 `1440×1000`、`1280×900`、`1024×768`、`768×1024`、`390×844`、`375×812`：

```text
1. 三张图分别清楚呈现胶囊、粉剂罐＋条包、软糖。
2. 桌面和平板标题与正文各一行，且不盖住产品主体。
3. 手机允许自然换行，无横向滚动，人物/产品关键主体未被裁掉。
4. 1→2、2→3 与第 5→6 屏交界没有黑角、白角或三角缝。
5. 向上、向下滚动时三个场景的左右上角始终保持圆角。
6. 第 1、2、3、4、6、7、8、9 屏的内容和布局未改变。
7. 页面只出现 VITHELO，不出现来源公司名称、认证、剂量或功效声明。
```

- [ ] **Step 6: 检查最终差异和提交范围**

Run:

```powershell
git status --short
git diff --check
git log -3 --oneline
```

Expected: 本计划产生的变更已被三个小提交覆盖；工作区原有的其他修改仍原样保留，未被清理、重写或误提交。
