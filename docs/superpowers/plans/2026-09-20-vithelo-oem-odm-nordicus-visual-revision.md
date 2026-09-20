# VITHELO OEM / ODM Nordicus Visual Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `/oem-odm` 从被否决的米色图片墙改成用户确认的纯白 Nordicus 编辑式页面，同时保持现有 Hero、内容证据边界和完整询盘路径。

**Architecture:** 保留现有 `B2BOemOdmPage` 内容适配边界和十二段页面顺序，只扩展 OEM/ODM 专用内容契约，为第二屏提供经过验证的短标题、标签与双操作。页面组件负责语义结构，CSS Module 负责纯白两列场景、统一主图样式和响应式；视觉契约由单元测试与六视口 Playwright 断言共同保护。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、CSS Modules、Zod、Vitest、Testing Library、Playwright。

---

## 0. 文件结构与修改边界

### 直接修改

- `src/content/schema.ts`：只扩展 OEM/ODM story 的 `eyebrow`，并为 introduction 增加两个经过验证的 action。
- `src/content/demo/vithelo-b2b-site.ts`：更新 OEM/ODM introduction、三组能力标题和对应标签；Hero 数据不得修改。
- `src/components/patterns/vithelo-oem-odm-page.tsx`：重排第二屏和能力区 DOM，保留十二段顺序及 Hero JSX。
- `src/components/patterns/vithelo-oem-odm-page.module.css`：替换被否决的米色、深色全宽面板、交替图片墙和三栏说明视觉。
- `tests/unit/vithelo-b2b-pages-content.test.ts`：锁定新文案契约、双操作和证据边界。
- `tests/unit/vithelo-oem-odm-page.test.tsx`：锁定第二屏结构、五个剂型缩略链接和能力区的文案—图片顺序。
- `tests/e2e/oem-odm-page.spec.ts`：锁定白底、56/44 第二屏、桌面单行标题、参考投影、响应式单列与无横向溢出。
- `docs/current-status.md`：仅更新 OEM/ODM 当前状态与验证结果。

### 不修改

- `src/app/oem-odm/page.tsx`：路由、元数据和内容读取已经符合边界。
- Hero 内容、媒体、阴影和布局 CSS。
- 首页、导航、页脚、Products、Insights、About、Contact。
- `next-env.d.ts`。

### Git 保护

当前工作树包含其他任务的改动。每次提交前只暂存本任务对应 hunk，并检查缓存差异：

```powershell
git diff --cached --name-only
git diff --cached
```

若共享文件含其他任务 hunk，使用 `git add -p -- <path>` 只暂存 OEM/ODM 相关块，不覆盖或清理其他修改。

---

### Task 1: 锁定新的内容契约与短标题

**Files:**
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Verify and stage: `public/media/b2b/oem-odm-packaging-still-life-v1.png`
- Verify existing register entry: `docs/vithelo-media-register.md`

- [ ] **Step 1: 先写失败的内容契约测试**

将 OEM/ODM 内容测试中的旧标题断言替换并增加 introduction action 断言：

```tsx
it("publishes the approved Nordicus editorial copy contract", () => {
  const page = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);

  expect(page.hero).toMatchObject({
    kicker: "OEM / ODM PROJECT DEVELOPMENT",
    title: "From product direction to a production-ready brief.",
  });
  expect(page.introduction).toMatchObject({
    eyebrow: "CUSTOM DEVELOPMENT",
    title: "From brief to finished product.",
    actions: [
      { label: "Start a Project", href: "/contact" },
      { label: "Explore Formats", href: "/products" },
    ],
  });
  expect(page.developmentStories.map(({ eyebrow, title }) => ({ eyebrow, title }))).toEqual([
    { eyebrow: "01 · SAMPLE DEVELOPMENT", title: "Start with a sample." },
    { eyebrow: "02 · FORMULA DIRECTION", title: "Shape the formula direction." },
    { eyebrow: "03 · DOSAGE FORM", title: "Choose the right dosage form." },
  ]);
  expect(page.packagingIntroduction.eyebrow).toBe("PACKAGING DEVELOPMENT");
});
```

- [ ] **Step 2: 运行测试并确认因字段缺失而失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: FAIL，错误包含 `eyebrow` 或 `actions` 不存在，或旧标题与新标题不一致。

- [ ] **Step 3: 最小扩展 Zod 契约**

将 OEM story 和 introduction 定义更新为：

```ts
const B2BOemStorySchema = B2BTextItemSchema.extend({
  eyebrow: z.string().min(1),
  media: DemoMediaSchema,
});

const B2BOemIntroductionSchema = B2BOemStorySchema.extend({
  actions: z.tuple([
    z.object({ label: z.literal("Start a Project"), href: z.literal("/contact") }),
    z.object({ label: z.literal("Explore Formats"), href: z.literal("/products") }),
  ]),
});
```

并在 `B2BOemOdmPageSchema` 中使用：

```ts
introduction: B2BOemIntroductionSchema,
developmentStories: z.array(B2BOemStorySchema).length(3),
packagingIntroduction: B2BOemStorySchema,
```

- [ ] **Step 4: 更新演示内容，不碰 Hero**

更新 OEM/ODM 记录：

```ts
introduction: {
  eyebrow: "CUSTOM DEVELOPMENT",
  title: "From brief to finished product.",
  copy: "Every project begins with a clear product idea: who it serves, how it should be used and which delivery format best supports that experience.",
  actions: [
    { label: "Start a Project", href: "/contact" },
    { label: "Explore Formats", href: "/products" },
  ],
  media: {
    status: "DEMO_ONLY",
    src: "/media/b2b/oem-odm-packaging-still-life-v1.png",
    width: 1536,
    height: 1024,
    alt: "Unbranded nutrition packaging formats arranged for project development review",
  },
},
```

三组能力使用测试中的 `eyebrow` 和短标题，保留现有条件化正文与媒体。`packagingIntroduction` 增加 `eyebrow: "PACKAGING DEVELOPMENT"`，其余数据不改。

确认 `public/media/b2b/oem-odm-packaging-still-life-v1.png` 存在，且 `docs/vithelo-media-register.md` 已将其登记为 `DEMO_ONLY` 概念包装图。若登记行已存在，不新增重复记录。

- [ ] **Step 5: 运行内容测试与类型检查**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd typecheck
```

Expected: 内容测试 PASS；TypeScript 与 Zod 推断无错误。

- [ ] **Step 6: 只提交本任务 hunk**

```powershell
git add -p -- src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-b2b-pages-content.test.ts docs/vithelo-media-register.md
git add -- public/media/b2b/oem-odm-packaging-still-life-v1.png
git diff --cached
git commit -m "content: refine OEM ODM editorial narrative"
```

Expected: 提交只包含 OEM/ODM 契约、记录和对应测试。

---

### Task 2: 重建第二屏语义结构

**Files:**
- Modify: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`

- [ ] **Step 1: 先写第二屏失败测试**

新增测试：

```tsx
it("renders the approved second-screen narrative before its primary image", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  const intro = screen.getByTestId("oem-introduction");
  const narrative = within(intro).getByTestId("oem-introduction-copy");
  const media = within(intro).getByTestId("oem-introduction-media");

  expect(intro.firstElementChild).toBe(narrative);
  expect(narrative.nextElementSibling).toBe(media);
  expect(within(narrative).getByRole("heading", { level: 2 })).toHaveTextContent(
    "From brief to finished product.",
  );
  expect(within(narrative).getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(within(narrative).getByRole("link", { name: "Explore Formats" })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(within(narrative).getAllByTestId("intro-format-link")).toHaveLength(5);
});
```

- [ ] **Step 2: 运行测试并确认结构尚未实现**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: FAIL，找不到 `oem-introduction`、双操作或五个格式缩略链接。

- [ ] **Step 3: 重排 introduction JSX，Hero JSX 保持逐行不变**

将 introduction 替换为以下结构：

```tsx
<section
  {...sectionProps("custom-formulation")}
  className={`${styles.section} ${styles.introduction}`}
  data-testid="oem-introduction"
>
  <div className={styles.introCopy} data-testid="oem-introduction-copy">
    <p className={styles.linedKicker}>{content.introduction.eyebrow}</p>
    <h2>{content.introduction.title}</h2>
    <p>{content.introduction.copy}</p>
    <div className={styles.introActions}>
      {content.introduction.actions.map((action, index) => (
        <Link
          className={index === 0 ? styles.primaryAction : styles.secondaryAction}
          href={action.href}
          key={action.href}
        >
          {action.label}
        </Link>
      ))}
    </div>
    <div className={styles.introFormats} aria-label="Eight dosage formats">
      {content.formats.slice(0, 5).map((format) => (
        <Link data-testid="intro-format-link" href={format.href} key={format.href}>
          <OemMedia media={format.media} sizes="52px" unoptimized />
          <span className="sr-only">{format.label}</span>
        </Link>
      ))}
      <p>Eight dosage formats within one development field</p>
    </div>
  </div>
  <div className={styles.introMedia} data-testid="oem-introduction-media">
    <OemMedia media={content.introduction.media} sizes="(max-width: 900px) 100vw, 44vw" />
  </div>
</section>
```

若项目没有全局 `sr-only` 工具类，则用 `aria-label={format.label}` 放在链接上并移除隐藏 `span`，不要为本页新增全局 CSS。

- [ ] **Step 4: 运行组件测试**

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: 新第二屏测试 PASS；原十二段顺序、八剂型、十步骤和 CTA 测试继续 PASS。

- [ ] **Step 5: 提交第二屏结构**

```powershell
git add -p -- src/components/patterns/vithelo-oem-odm-page.tsx tests/unit/vithelo-oem-odm-page.test.tsx
git diff --cached
git commit -m "feat: structure OEM ODM editorial introduction"
```

---

### Task 3: 统一三组能力的 Nordicus 叙事语法

**Files:**
- Modify: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`

- [ ] **Step 1: 先写能力区失败测试**

```tsx
it("keeps each development capability as one narrative followed by one image", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  const stories = within(screen.getByTestId("development-stories")).getAllByRole("article");
  expect(stories).toHaveLength(3);

  for (const story of stories) {
    const copy = within(story).getByTestId("development-story-copy");
    const media = within(story).getByTestId("development-story-media");
    expect(story.firstElementChild).toBe(copy);
    expect(copy.nextElementSibling).toBe(media);
    expect(within(copy).getAllByRole("heading")).toHaveLength(1);
  }
});
```

- [ ] **Step 2: 确认测试因当前图片在前、偶数项交换而失败**

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: FAIL，`story.firstElementChild` 当前是媒体而不是文案。

- [ ] **Step 3: 将每项能力固定为文案在前、图片在后**

替换 map 内 article：

```tsx
<article className={styles.story} key={story.title}>
  <div className={styles.storyCopy} data-testid="development-story-copy">
    <p className={styles.linedKicker}>{story.eyebrow}</p>
    <h3>{story.title}</h3>
    <p>{story.copy}</p>
  </div>
  <div className={styles.storyMedia} data-testid="development-story-media">
    <OemMedia media={story.media} sizes="(max-width: 900px) 100vw, 44vw" />
  </div>
</article>
```

移除用于生成两位编号的 `index` 参数。保留 `development-stories` 测试标识和 section 顺序。

- [ ] **Step 4: 运行单元测试**

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
```

Expected: OEM/ODM 页面单元测试全部 PASS。

- [ ] **Step 5: 提交能力结构**

```powershell
git add -p -- src/components/patterns/vithelo-oem-odm-page.tsx tests/unit/vithelo-oem-odm-page.test.tsx
git diff --cached
git commit -m "feat: align OEM ODM capability narratives"
```

---

### Task 4: 用失败 E2E 锁定白底、比例、单行标题和参考投影

**Files:**
- Modify: `tests/e2e/oem-odm-page.spec.ts`

- [ ] **Step 1: 增加桌面视觉契约测试**

在六视口循环之外新增：

```ts
test("desktop matches the approved white Nordicus composition", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/oem-odm");

  const pageRoot = page.getByRole("main");
  const introduction = page.getByTestId("oem-introduction");
  const title = introduction.getByRole("heading", { level: 2 });
  const media = page.getByTestId("oem-introduction-media");

  await expect(pageRoot).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(introduction).toHaveCSS("grid-template-columns", /.+ .+/);
  await expect(media).toHaveCSS(
    "box-shadow",
    /rgba\(34, 38, 39, 0\.28\).*rgba\(34, 38, 39, 0\.14\)/,
  );

  const lineCount = await title.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return range.getClientRects().length;
  });
  expect(lineCount).toBe(1);

  const [copyBox, mediaBox] = await Promise.all([
    page.getByTestId("oem-introduction-copy").boundingBox(),
    media.boundingBox(),
  ]);
  expect(copyBox).not.toBeNull();
  expect(mediaBox).not.toBeNull();
  expect(copyBox!.x).toBeLessThan(mediaBox!.x);
  const ratio = copyBox!.width / (copyBox!.width + mediaBox!.width);
  expect(ratio).toBeGreaterThan(0.52);
  expect(ratio).toBeLessThan(0.6);
});
```

- [ ] **Step 2: 增加背景和能力区一致性断言**

在六视口循环中补充：

```ts
for (const selector of [
  '[data-section="formats"]',
  '[data-section="commercial-planning"]',
  '[data-section="quality"]',
  '[data-section="quote-preparation"]',
]) {
  await expect(page.locator(selector)).toHaveCSS("background-color", "rgb(255, 255, 255)");
}

const story = page.locator('[data-testid="development-stories"] > article').first();
const copyBox = await story.getByTestId("development-story-copy").boundingBox();
const mediaBox = await story.getByTestId("development-story-media").boundingBox();
if (viewport.width > 900) {
  expect(copyBox!.x).toBeLessThan(mediaBox!.x);
} else {
  expect(copyBox!.y).toBeLessThan(mediaBox!.y);
}
```

- [ ] **Step 3: 运行 OEM/ODM E2E 并确认视觉断言失败**

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: FAIL，当前根背景为 Ivory、formats/quality 为深色、第二屏比例和投影不符合规范。

- [ ] **Step 4: 提交失败测试**

```powershell
git add -- tests/e2e/oem-odm-page.spec.ts
git diff --cached
git commit -m "test: lock OEM ODM Nordicus visual contract"
```

---

### Task 5: 实现纯白第二屏和能力场景 CSS

**Files:**
- Modify: `src/components/patterns/vithelo-oem-odm-page.module.css`

- [ ] **Step 1: 替换页面局部令牌，但保留 Hero 规则**

将 `.page` 更新为：

```css
.page {
  --ink: #191b1a;
  --soft-ink: #626762;
  --paper: #fff;
  --titanium: #d4d8d5;
  overflow: clip;
  background: var(--paper);
  color: var(--ink);
}
```

不要修改 `.hero`、`.heroMedia`、`.heroShade`、`.heroCopy` 及其子选择器。

- [ ] **Step 2: 实现第二屏 56/44 构图**

```css
.introduction {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
  gap: clamp(48px, 5vw, 76px);
  min-height: 620px;
  align-items: center;
}

.introCopy {
  min-width: 0;
}

.linedKicker {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  font-size: 0.72rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.linedKicker::before {
  width: clamp(54px, 7vw, 84px);
  height: 1px;
  background: currentColor;
  content: "";
}

.introCopy h2 {
  margin: 1.8rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.25rem, 3vw, 2.7rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.035em;
  white-space: nowrap;
}

.introCopy > p:not(.linedKicker) {
  max-width: 41rem;
  margin: 1.25rem 0 0;
  color: var(--soft-ink);
  line-height: 1.72;
}

.introMedia {
  aspect-ratio: 1.32;
  overflow: hidden;
  border-radius: 28px;
  box-shadow:
    0 3px 11px rgb(34 38 39 / 28%),
    0 0 4px rgb(34 38 39 / 14%);
}
```

- [ ] **Step 3: 实现操作和剂型缩略图**

```css
.introActions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.75rem;
  align-items: center;
  margin-top: 1.5rem;
}

.primaryAction,
.secondaryAction {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--ink);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
}

.primaryAction {
  padding-inline: 1.1rem;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
}

.introFormats {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.introFormats a {
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-left: -10px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #f3f4f1;
  box-shadow: 0 0 0 1px rgb(167 172 168 / 62%);
}

.introFormats a:first-child {
  margin-left: 0;
}

.introFormats p {
  max-width: 11rem;
  margin: 0 0 0 1rem;
  color: var(--soft-ink);
  font-size: 0.72rem;
  line-height: 1.4;
}
```

- [ ] **Step 4: 让三组能力固定为左文案、右主图**

```css
.storySequence {
  display: grid;
  gap: clamp(96px, 11vw, 164px);
}

.story,
.story:nth-child(even) {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
  gap: clamp(48px, 5vw, 76px);
  align-items: center;
}

.storyCopy,
.story:nth-child(even) .storyCopy,
.storyMedia,
.story:nth-child(even) .storyMedia {
  grid-column: auto;
  grid-row: auto;
}

.storyCopy h3 {
  margin: 1.8rem 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.1rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.storyMedia,
.story:nth-child(2) .storyMedia {
  aspect-ratio: 1.32;
  overflow: hidden;
  border-radius: 28px;
  box-shadow:
    0 3px 11px rgb(34 38 39 / 28%),
    0 0 4px rgb(34 38 39 / 14%);
}
```

- [ ] **Step 5: 运行桌面定向 E2E**

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts --grep "desktop matches"
```

Expected: 白底、56/44、单行标题和参考投影测试 PASS。

- [ ] **Step 6: 提交第二屏与能力样式**

```powershell
git add -- src/components/patterns/vithelo-oem-odm-page.module.css
git diff --cached
git commit -m "style: apply Nordicus OEM ODM composition"
```

---

### Task 6: 清除其余区块的深色面板、米色块与卡片墙感

**Files:**
- Modify: `src/components/patterns/vithelo-oem-odm-page.module.css`
- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`

- [ ] **Step 1: Formats 改成白底连续视觉带**

保留八个链接，但移除整区黑底和每张图片上的深色渐变。核心规则：

```css
.formats {
  width: 100%;
  padding-bottom: clamp(88px, 10vw, 160px);
  background: #fff;
  color: var(--ink);
}

.formatGallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 1.5vw, 22px);
  width: min(calc(100% - 96px), 1320px);
  margin-inline: auto;
}

.formatGallery a {
  min-height: 0;
  color: var(--ink);
}

.formatGallery a::after {
  content: none;
}

.formatGallery img {
  aspect-ratio: 1;
  border-radius: 50%;
  background: #f4f5f2;
}
```

标签和编号移到正常文档流中，避免覆盖图片。为此在 JSX 中把 `span`、`strong` 保持在图片后，并将 CSS 的 `position:absolute` 删除。

- [ ] **Step 2: Commercial 与 Quality 统一为白底编辑区**

```css
.commercial,
.quality,
.quotePreparation,
.questions {
  background: #fff;
  color: var(--ink);
}

.commercialStories {
  display: grid;
  gap: clamp(88px, 10vw, 150px);
}

.commercialStories article,
.quality {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
  gap: clamp(48px, 5vw, 76px);
  align-items: center;
}

.commercialMedia,
.qualityMedia {
  aspect-ratio: 1.32;
  min-height: 0;
  overflow: hidden;
  border-radius: 28px;
  box-shadow:
    0 3px 11px rgb(34 38 39 / 28%),
    0 0 4px rgb(34 38 39 / 14%);
}

.commercialCopy,
.qualityCopy {
  min-height: 0;
  padding: 0;
}

.commercialCopy,
.qualityCopy {
  grid-column: 1;
  grid-row: 1;
}

.commercialMedia,
.qualityMedia {
  grid-column: 2;
  grid-row: 1;
}
```

保持所有 MOQ、Lead Time 与质量正文原样，不增加事实。

- [ ] **Step 3: Project Path、Packaging 与 Quote 取消卡片化**

- `stepFlow` 保留十步 DOM 顺序，改成一列或两列连续编号列表；删除偶数项位移。
- `packagingIntroduction` 从全屏背景图改成左侧完整文案组、右侧一张主图，使用同一圆角和投影。保留当前 JSX 顺序，通过 `.packagingCopy { grid-column: 1; grid-row: 1; }` 与 `.packagingMedia { position: static; grid-column: 2; grid-row: 1; }` 明确视觉顺序。
- `quotePreparation` 删除米色背景；`quoteStories` 使用留白与顺序号，不使用卡片背景。
- `packagingGroups` 保留四组文本，不交替左右漂移。
- FAQ 保留 `details`，使用一条必要的 Titanium 分隔线，不使用填充卡片。

使用以下共同分隔规则：

```css
.faq details,
.packagingGroups article,
.quoteStories article {
  border: 0;
  border-top: 1px solid rgb(167 172 168 / 55%);
  background: transparent;
}
```

- [ ] **Step 4: 保留 Inquiry Close 和 Hero 的现有图像收口**

不要修改 `.inquiry` 的媒体、遮罩、CTA 与相关链接；该区属于场景图收口，不受“Hero 以下全部内容区白底”的正文区规则影响。规范中的白底要求针对内容区，不覆盖已存在的 Inquiry 场景图。

- [ ] **Step 5: 运行单元测试和六视口 E2E**

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: 所有定向测试 PASS；六视口无溢出，桌面文案在图左侧，900px 以下文案在图片上方。

- [ ] **Step 6: 提交剩余视觉整理**

```powershell
git add -p -- src/components/patterns/vithelo-oem-odm-page.tsx src/components/patterns/vithelo-oem-odm-page.module.css
git diff --cached
git commit -m "style: unify OEM ODM editorial sections"
```

---

### Task 7: 完成响应式、焦点与 Reduced Motion

**Files:**
- Modify: `src/components/patterns/vithelo-oem-odm-page.module.css`
- Modify: `tests/e2e/oem-odm-page.spec.ts`

- [ ] **Step 1: 锁定 900px 以下单列顺序**

```css
@media (max-width: 900px) {
  .introduction,
  .story,
  .story:nth-child(even),
  .commercialStories article,
  .quality,
  .packagingIntroduction {
    grid-template-columns: 1fr;
  }

  .introCopy h2 {
    white-space: normal;
  }

  .introCopy,
  .storyCopy,
  .commercialCopy,
  .qualityCopy,
  .packagingCopy {
    grid-column: 1;
    grid-row: 1;
  }

  .introMedia,
  .storyMedia,
  .commercialMedia,
  .qualityMedia,
  .packagingMedia {
    grid-column: 1;
    grid-row: 2;
  }
}
```

- [ ] **Step 2: 收敛移动端尺寸与交互目标**

```css
@media (max-width: 620px) {
  .heroCopy,
  .section,
  .formats .sectionHeader,
  .commercial .sectionHeader,
  .inquiryCopy {
    width: calc(100% - 32px);
  }

  .introMedia,
  .storyMedia,
  .commercialMedia,
  .qualityMedia {
    border-radius: 22px;
  }

  .introFormats p {
    display: none;
  }

  .primaryAction,
  .secondaryAction,
  .introFormats a {
    min-width: 44px;
    min-height: 44px;
  }
}
```

- [ ] **Step 3: 保留可见焦点和 Reduced Motion**

将新链接加入现有焦点选择器：

```css
.introActions a:focus-visible,
.introFormats a:focus-visible,
.hero a:focus-visible,
.formatGallery a:focus-visible,
.inquiry a:focus-visible,
.faq summary:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}
```

保留现有 `@media (prefers-reduced-motion: reduce)`，不新增依赖动画才能出现的内容。

- [ ] **Step 4: 运行六视口与 Reduced Motion E2E**

```powershell
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: 7 个 OEM/ODM E2E 用例 PASS；无水平溢出；Reduced Motion 内容可见。

- [ ] **Step 5: 提交响应式与可访问性收口**

```powershell
git add -p -- src/components/patterns/vithelo-oem-odm-page.module.css tests/e2e/oem-odm-page.spec.ts
git diff --cached
git commit -m "fix: complete OEM ODM responsive contract"
```

---

### Task 8: 全量验证、视觉复核与状态更新

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: 运行 OEM/ODM 定向测试**

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd test:e2e -- tests/e2e/oem-odm-page.spec.ts
```

Expected: 全部 PASS。

- [ ] **Step 2: 运行静态检查与构建**

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: 三条命令退出码均为 `0`。记录实际 Node 版本；若不是 Node 20，不宣称完成 Hostinger Node 20 证明。

- [ ] **Step 3: 运行全量单元测试**

```powershell
pnpm.cmd test
```

Expected: 全量单元测试 PASS；若存在与本任务无关的既有失败，记录测试名、错误和与本改动无关的证据，不篡改测试规避失败。

- [ ] **Step 4: 六视口人工视觉复核**

检查 `1440×1000`、`1280×800`、`1024×768`、`768×1024`、`390×844`、`360×800`：

- Hero 与改造前一致。
- 第二屏为白底、左文案右图片，桌面标题一行。
- 图片投影紧贴四周，顶部和侧边可见，底部略深。
- 后续能力始终文案在前、图片随后。
- 没有米色背景、深色正文面板、黑色图片边距、三栏图片注释、连续卡片墙或无意义横线。
- 所有八种剂型、十步路径、条件化 MOQ / Lead Time、质量边界、FAQ 和 CTA 可访问。
- 无裁切、重叠、横向溢出和不可见焦点。

- [ ] **Step 5: 更新当前状态文档**

在 `docs/current-status.md` 的 OEM/ODM 状态中记录：

```md
- `/oem-odm` 已采用用户确认的 Nordicus 明亮编辑式视觉：Hero 保留，Hero 后正文区使用纯白背景、完整文案组、单张主图与紧贴边缘的灰色柔光投影；标题和正文不再通过人为换行或三栏字段排版制造视觉结构。
```

同时记录本轮实际通过的命令，不复制计划中的预期结果。

- [ ] **Step 6: 最终差异检查**

```powershell
git diff --check
git diff --stat
git status --short
```

Expected: 无空白错误；只报告本任务文件与用户原有未提交工作，不出现 `next-env.d.ts` 的新增改动。

- [ ] **Step 7: 提交状态和最后修正**

```powershell
git add -p -- docs/current-status.md src/components/patterns/vithelo-oem-odm-page.tsx src/components/patterns/vithelo-oem-odm-page.module.css tests/e2e/oem-odm-page.spec.ts tests/unit/vithelo-oem-odm-page.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts src/content/schema.ts src/content/demo/vithelo-b2b-site.ts
git diff --cached
git commit -m "docs: record OEM ODM visual verification"
```

Expected: 最终提交只包含尚未提交的 OEM/ODM hunk 和状态记录。
