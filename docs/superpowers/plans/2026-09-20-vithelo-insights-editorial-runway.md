# VITHELO Insights Editorial Runway Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `/insights` 改造成暗色沉浸 Hero、圆角冷象牙内容层和 10 篇统一左文右图文章长廊，同时保持内容证据边界、响应式、键盘可达与 Reduced Motion。

**Architecture:** 现有 server route 和 `localContentAdapter` 保持不变；新增 Insights 专属 CSS Module，并让 `VitheloInsightsPage` 继续作为 Server Component。文章图片和编辑引言通过 Zod 合同进入页面，使用 Next.js 16 `Image` 的显式尺寸避免布局偏移；视口揭示使用 CSS 渐进增强，不增加客户端状态或滚动劫持。

**Tech Stack:** Next.js 16.3 App Router、React 19、TypeScript 5.9、Zod 4、CSS Modules、Vitest、Testing Library、Playwright。

---

## 文件结构

- 修改 `src/content/schema.ts`：为 Insights 编辑引言和列表页演示图片增加内容合同。
- 修改 `src/content/demo/vithelo-b2b-site.ts`：为 10 篇文章配置现有本地图片与替代文本，并添加编辑引言。
- 修改 `src/components/patterns/vithelo-insights-page.tsx`：渲染 Hero、主题索引、编辑引言和 10 个大图文单元。
- 新建 `src/components/patterns/vithelo-insights-page.module.css`：只承载 Insights 的视觉、响应式与 Reduced Motion。
- 修改 `src/app/insights/page.tsx`：让 Insights Open Graph 图片不再指向历史设备合成图。
- 修改 `tests/unit/vithelo-insights.test.tsx`：锁定 10 个章节、图片、编号、链接和语义结构。
- 修改 `tests/unit/vithelo-b2b-pages-content.test.ts`：锁定新 Zod 合同、编辑引言和图片证据状态。
- 新建 `tests/e2e/insights-page.spec.ts`：覆盖六个视口、重叠关系、响应式、溢出和 Reduced Motion。
- 修改 `docs/current-status.md`：记录本轮范围、验证结果和仍待用户视觉验收的事实。

### Task 1: 用失败测试锁定 Insights 内容合同

**Files:**
- Modify: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`

- [ ] **Step 1: 先写内容合同失败测试**

在 `tests/unit/vithelo-b2b-pages-content.test.ts` 增加：

```ts
it("publishes an editorial intro and demo media for every insight", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);

  expect(insights.intro).toEqual({
    kicker: "THE KNOWLEDGE EDIT",
    title: "Manufacturing knowledge, made practical.",
    copy:
      "Ten decision guides connect product format, development, packaging, manufacturing review and project preparation.",
  });
  expect(insights.articles).toHaveLength(10);

  for (const article of insights.articles) {
    expect(article.media.status).toBe("DEMO_ONLY");
    expect(article.media.src).toMatch(/^\/media\//);
    expect(article.media.alt).not.toBe("");
    expect(article.media.width).toBeGreaterThan(0);
    expect(article.media.height).toBeGreaterThan(0);
  }
});
```

- [ ] **Step 2: 运行测试并确认正确失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: FAIL，错误指向 `intro` 或 `media` 不存在，而不是导入或语法错误。

- [ ] **Step 3: 增加最小 Zod 合同**

在 `B2BInsightArticleSchema` 前增加并接入：

```ts
const B2BInsightMediaSchema = z.object({
  status: DataStatusSchema,
  src: z.string().regex(/^\/media\/[\w./-]+$/),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const B2BInsightsIntroSchema = z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
});
```

在 `B2BInsightArticleSchema` 的 `summary` 后增加：

```ts
media: B2BInsightMediaSchema,
```

在 `B2BInsightsPageSchema` 的 `hero` 后增加：

```ts
intro: B2BInsightsIntroSchema,
```

- [ ] **Step 4: 为 10 篇文章添加演示图片**

在 `src/content/demo/vithelo-b2b-site.ts` 的每篇文章对象中加入下列与 slug 对应的 `media`：

```ts
const insightMedia = {
  "choose-the-right-supplement-format": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-tablets.png",
    alt: "Editorial still of a tablet format concept in the VITHELO visual system.",
    width: 1536,
    height: 1024,
  },
  "prepare-for-an-oem-odm-project": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/hero-loop-poster.jpg",
    alt: "Demo manufacturing scene used to introduce project preparation guidance.",
    width: 1280,
    height: 720,
  },
  "gummy-development-guide": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-gummies.png",
    alt: "Editorial still of a gummy format concept with neutral packaging.",
    width: 1536,
    height: 1024,
  },
  "how-to-evaluate-a-supplement-manufacturer": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/sanitized-factory-production-line.jpg",
    alt: "Demo production-line scene for a manufacturer evaluation guide.",
    width: 961,
    height: 1280,
  },
  "private-label-vs-custom-formulation": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-softgels.png",
    alt: "Editorial still of a softgel format concept used for route comparison.",
    width: 1536,
    height: 1024,
  },
  "how-supplement-sampling-works": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/gummies-pexels-14027295.jpg",
    alt: "Demo close-up of gummies used for an article about sample review.",
    width: 2048,
    height: 2048,
  },
  "gummies-vs-hard-capsules": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-hard-capsules.png",
    alt: "Editorial still of a hard-capsule format concept for format comparison.",
    width: 1536,
    height: 1024,
  },
  "what-documents-buyers-should-ask-for": {
    status: "DEMO_ONLY" as const,
    src: "/media/home-membrane.png",
    alt: "Abstract translucent structure used as a demo visual for document review.",
    width: 1536,
    height: 1024,
  },
  "what-information-to-include-in-an-rfq": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-powders.png",
    alt: "Editorial still of a powder format concept used for RFQ preparation.",
    width: 1536,
    height: 1024,
  },
  "how-packaging-affects-moq-and-lead-time": {
    status: "DEMO_ONLY" as const,
    src: "/media/b2b/format-liquids.png",
    alt: "Editorial still of a liquid format and packaging concept.",
    width: 1536,
    height: 1024,
  },
} as const;
```

每个文章对象在 `summary` 后写入对应值，例如：

```ts
media: insightMedia["choose-the-right-supplement-format"],
```

在 `vitheloB2BInsightsPage` 的 `hero` 后增加：

```ts
intro: {
  kicker: "THE KNOWLEDGE EDIT",
  title: "Manufacturing knowledge, made practical.",
  copy:
    "Ten decision guides connect product format, development, packaging, manufacturing review and project preparation.",
},
```

- [ ] **Step 5: 运行内容测试并确认通过**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: PASS，包括新增的编辑引言和 10 个 `DEMO_ONLY` 图片记录。

- [ ] **Step 6: 只提交本任务文件**

```powershell
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-b2b-pages-content.test.ts
git commit -m "feat: add insights editorial media contract"
```

### Task 2: 用失败测试锁定 10 篇编辑长廊结构

**Files:**
- Modify: `tests/unit/vithelo-insights.test.tsx`
- Modify: `src/components/patterns/vithelo-insights-page.tsx`
- Modify: `src/app/insights/page.tsx`

- [ ] **Step 1: 先写页面结构失败测试**

将 `tests/unit/vithelo-insights.test.tsx` 的首个测试替换为：

```tsx
it("renders ten numbered insight stories with demo media and working links", () => {
  render(<VitheloInsightsPage content={vitheloB2BInsightsPage} />);

  expect(screen.getByTestId("insights-hero")).toHaveAttribute(
    "data-motion-intent",
    "ORIENT",
  );
  expect(screen.getByTestId("insights-paper")).toBeInTheDocument();
  expect(screen.getAllByTestId("insight-topic")).toHaveLength(5);

  const stories = screen.getAllByTestId("insight-story");
  expect(stories).toHaveLength(10);
  expect(stories[0]).toHaveAttribute("data-insight-index", "01");
  expect(stories[9]).toHaveAttribute("data-insight-index", "10");
  expect(screen.getAllByRole("img")).toHaveLength(10);
  expect(
    screen.getByRole("link", {
      name: "How to Choose the Right Supplement Format",
    }),
  ).toHaveAttribute("href", "/insights/choose-the-right-supplement-format");
});
```

- [ ] **Step 2: 运行测试并确认正确失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-insights.test.tsx
```

Expected: FAIL，错误指向 `insights-hero`、`insights-paper` 或 `insight-story` 尚不存在。

- [ ] **Step 3: 实现语义页面结构**

把 `src/components/patterns/vithelo-insights-page.tsx` 改为：

```tsx
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-insights-page.module.css";
import type { B2BInsightsPage } from "@/content/schema";

export function VitheloInsightsPage({ content }: { content: B2BInsightsPage }) {
  const articles = content.articles.filter((article) => article.published);

  return (
    <main
      className={styles.page}
      data-content-status={content.dataStatus}
      data-layout="editorial-runway"
    >
      <section
        className={styles.hero}
        data-header-hero
        data-motion-intent="ORIENT"
        data-testid="insights-hero"
      >
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroLede}>{content.hero.copy}</p>
        </div>
      </section>

      <section className={styles.paper} data-testid="insights-paper">
        <div aria-label="Insight topics" className={styles.topicRail}>
          {content.categories.map((category) => (
            <span data-testid="insight-topic" key={category}>
              {category}
            </span>
          ))}
        </div>

        <header className={styles.intro} data-motion-intent="RELATE">
          <p className={styles.kicker}>{content.intro.kicker}</p>
          <div>
            <h2>{content.intro.title}</h2>
            <p>{content.intro.copy}</p>
          </div>
        </header>

        <div className={styles.runway}>
          {articles.map((article, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <article
                className={styles.story}
                data-insight-index={number}
                data-motion-intent="RELATE"
                data-testid="insight-story"
                key={article.slug}
              >
                <div className={styles.storyCopy}>
                  <p className={styles.storyMeta}>
                    <span>{number}</span>
                    <span>{article.category}</span>
                  </p>
                  <p className={styles.storyFormat}>
                    {article.contentFormat} · Updated {article.updatedAt}
                  </p>
                  <h2>{article.title}</h2>
                  <p className={styles.storySummary}>{article.summary}</p>
                  <Link
                    aria-label={article.title}
                    className={styles.storyLink}
                    href={`/insights/${article.slug}`}
                  >
                    Read insight <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                <figure
                  className={styles.storyMedia}
                  data-media-status={article.media.status}
                >
                  <Image
                    alt={article.media.alt}
                    height={article.media.height}
                    sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1100px) 52vw, 58vw"
                    src={article.media.src}
                    width={article.media.width}
                  />
                  <span aria-hidden="true" className={styles.numberBadge}>
                    {number}
                  </span>
                </figure>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: 更新 Insights Open Graph 图片**

在 `src/app/insights/page.tsx` 将：

```ts
images: ["/media/vithelo-hero-composite.png"],
```

改为：

```ts
images: ["/media/b2b/hero-loop-poster.jpg"],
```

- [ ] **Step 5: 运行组件测试并确认只有样式模块缺失或结构通过**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-insights.test.tsx
```

Expected: 若 CSS Module 尚未创建则报告模块缺失；创建空模块后结构测试 PASS。不要修改断言绕过结构要求。

- [ ] **Step 6: 暂不提交，和 Task 3 的样式一起形成完整页面提交**

### Task 3: 实现 Hero、圆角纸张层和统一左文右图视觉

**Files:**
- Create: `src/components/patterns/vithelo-insights-page.module.css`
- Modify: `src/components/patterns/vithelo-insights-page.tsx`
- Modify: `src/app/insights/page.tsx`
- Test: `tests/unit/vithelo-insights.test.tsx`

- [ ] **Step 1: 创建 Insights 专属 CSS Module**

新建 `src/components/patterns/vithelo-insights-page.module.css`，使用以下完整样式：

```css
.page {
  --insights-ink: #171918;
  --insights-ivory: #f3f0e8;
  --insights-paper: #faf8f2;
  --insights-muted: #646b66;
  --insights-line: rgb(23 25 24 / 18%);
  --insights-signal: #a9503c;
  overflow: clip;
  background: var(--insights-ink);
  color: var(--insights-ink);
}

.hero {
  position: relative;
  min-height: min(900px, 88svh);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 7rem max(48px, calc((100vw - 1720px) / 2)) clamp(7rem, 12vh, 10rem);
  background:
    linear-gradient(90deg, rgb(10 13 12 / 82%), rgb(10 13 12 / 42%) 55%, rgb(10 13 12 / 20%)),
    url("/media/b2b/hero-loop-poster.jpg") center / cover no-repeat;
  color: var(--insights-ivory);
  isolation: isolate;
}

.hero::before {
  position: absolute;
  inset: -3%;
  z-index: -1;
  content: "";
  background: inherit;
  animation: heroSettle 1.15s cubic-bezier(.2, 0, 0, 1) both;
}

.hero::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: "";
  background:
    linear-gradient(180deg, rgb(255 255 255 / 8%), transparent 26%),
    linear-gradient(115deg, transparent 58%, rgb(255 255 255 / 11%) 58.08%, transparent 58.16%);
}

.heroCopy {
  width: min(720px, 100%);
}

.kicker,
.storyMeta,
.storyFormat {
  margin: 0;
  font-size: .72rem;
  letter-spacing: .15em;
  text-transform: uppercase;
}

.hero .kicker {
  color: rgb(243 240 232 / 72%);
  animation: heroCopyIn .5s .08s cubic-bezier(.2, 0, 0, 1) both;
}

.hero h1 {
  max-width: 800px;
  margin: 1.15rem 0 0;
  font-family: var(--font-editorial);
  font-size: clamp(3.2rem, 7vw, 7.4rem);
  font-weight: 400;
  line-height: .92;
  letter-spacing: -.055em;
  text-wrap: balance;
  animation: heroCopyIn .62s .15s cubic-bezier(.2, 0, 0, 1) both;
}

.heroLede {
  max-width: 620px;
  margin: 1.5rem 0 0;
  color: rgb(243 240 232 / 72%);
  font-size: clamp(.95rem, 1.25vw, 1.12rem);
  line-height: 1.55;
  animation: heroCopyIn .62s .23s cubic-bezier(.2, 0, 0, 1) both;
}

.paper {
  position: relative;
  z-index: 2;
  width: 100%;
  margin-top: clamp(-76px, -5vw, -48px);
  border-radius: clamp(26px, 3vw, 46px) clamp(26px, 3vw, 46px) 0 0;
  padding: clamp(2rem, 5vw, 4.5rem) max(32px, calc((100vw - 1440px) / 2));
  background: var(--insights-paper);
}

.topicRail {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-block: 1px solid var(--insights-line);
}

.topicRail span {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .75rem 1rem;
  border-right: 1px solid var(--insights-line);
  color: var(--insights-muted);
  font-size: .68rem;
  letter-spacing: .11em;
  text-align: center;
  text-transform: uppercase;
}

.topicRail span:last-child { border-right: 0; }

.intro {
  display: grid;
  grid-template-columns: minmax(180px, .6fr) minmax(0, 1.4fr);
  gap: clamp(2rem, 7vw, 8rem);
  align-items: start;
  padding-block: clamp(5rem, 10vw, 9rem);
}

.intro .kicker { color: var(--insights-signal); }

.intro h2 {
  max-width: 870px;
  margin: 0;
  font-family: var(--font-editorial);
  font-size: clamp(2.6rem, 5.4vw, 6rem);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.05em;
}

.intro div > p {
  max-width: 680px;
  margin: 1.4rem 0 0;
  color: var(--insights-muted);
  line-height: 1.6;
}

.runway { border-top: 1px solid var(--insights-line); }

.story {
  display: grid;
  grid-template-columns: minmax(0, .42fr) minmax(0, .58fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: center;
  padding-block: clamp(4.5rem, 9vw, 8.5rem);
  border-bottom: 1px solid var(--insights-line);
}

.storyCopy { min-width: 0; }

.storyMeta {
  display: flex;
  gap: .85rem;
  align-items: center;
  color: var(--insights-signal);
}

.storyMeta span:first-child {
  min-width: 2rem;
  color: var(--insights-ink);
}

.storyFormat {
  margin-top: 1.25rem;
  color: var(--insights-muted);
  letter-spacing: .08em;
}

.story h2 {
  max-width: 16ch;
  margin: clamp(2rem, 4vw, 4rem) 0 0;
  font-family: var(--font-editorial);
  font-size: clamp(2.1rem, 4vw, 4.6rem);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.045em;
  text-wrap: balance;
}

.storySummary {
  max-width: 620px;
  margin: 1.4rem 0 0;
  color: var(--insights-muted);
  line-height: 1.62;
}

.storyLink {
  min-height: 44px;
  width: fit-content;
  display: inline-flex;
  gap: .65rem;
  align-items: center;
  margin-top: 2rem;
  border-bottom: 1px solid currentColor;
  text-decoration: none;
}

.storyLink span { transition: transform 180ms ease-out; }
.storyLink:hover span,
.storyLink:focus-visible span { transform: translate(3px, -3px); }
.storyLink:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }

.storyMedia {
  position: relative;
  aspect-ratio: 16 / 10;
  margin: 0;
  overflow: hidden;
  border-radius: 18px;
  background: #d8d6cf;
}

.storyMedia img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform .5s cubic-bezier(.2, 0, 0, 1);
}

.story:has(.storyLink:hover) .storyMedia img,
.story:has(.storyLink:focus-visible) .storyMedia img { transform: scale(1.025); }

.numberBadge {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  min-width: 2.75rem;
  min-height: 2.75rem;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--insights-ink);
  color: var(--insights-ivory);
  font-size: .8rem;
  font-weight: 700;
}

@keyframes heroSettle {
  from { transform: scale(1.045); }
  to { transform: scale(1); }
}

@keyframes heroCopyIn {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes storyReveal {
  from { opacity: .001; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@supports (animation-timeline: view()) {
  .story {
    animation: storyReveal linear both;
    animation-timeline: view();
    animation-range: entry 4% entry 30%;
  }
}

@media (max-width: 900px) {
  .topicRail { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .topicRail span { border-bottom: 1px solid var(--insights-line); }
  .topicRail span:nth-child(2n) { border-right: 0; }
  .topicRail span:last-child { grid-column: 1 / -1; border-bottom: 0; }
  .intro { grid-template-columns: 1fr; gap: 1.5rem; }
  .story { gap: 2rem; }
}

@media (max-width: 760px) {
  .hero {
    min-height: min(760px, 88svh);
    padding: 6rem 22px 7rem;
    background-position: 62% center;
  }
  .hero h1 { font-size: clamp(2.7rem, 13vw, 4.6rem); }
  .paper { margin-top: -34px; border-radius: 26px 26px 0 0; padding-inline: 22px; }
  .topicRail { grid-template-columns: 1fr; }
  .topicRail span,
  .topicRail span:nth-child(2n) { justify-content: flex-start; border-right: 0; }
  .topicRail span:last-child { grid-column: auto; }
  .intro { padding-block: 4.5rem; }
  .intro h2 { font-size: clamp(2.5rem, 13vw, 4rem); }
  .story { grid-template-columns: 1fr; padding-block: 4.5rem; }
  .storyMedia { grid-row: 1; border-radius: 14px; }
  .storyCopy { grid-row: 2; }
  .story h2 { max-width: none; margin-top: 2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .hero::before,
  .hero .kicker,
  .hero h1,
  .heroLede,
  .story { animation: none !important; transform: none !important; opacity: 1 !important; }
  .storyLink span,
  .storyMedia img { transition: none !important; transform: none !important; }
}
```

- [ ] **Step 2: 运行组件测试、类型检查和定向 lint**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-insights.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts
pnpm.cmd typecheck
pnpm.cmd exec eslint src/app/insights/page.tsx src/components/patterns/vithelo-insights-page.tsx src/content/schema.ts src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-insights.test.tsx tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: 所有命令 exit code 0；不允许通过编辑 `next-env.d.ts` 消除类型错误。

- [ ] **Step 3: 只提交 Insights 页面实现**

```powershell
git add -- src/app/insights/page.tsx src/components/patterns/vithelo-insights-page.tsx src/components/patterns/vithelo-insights-page.module.css tests/unit/vithelo-insights.test.tsx
git commit -m "feat: build insights editorial runway"
```

### Task 4: 用失败 E2E 锁定六视口几何与 Reduced Motion

**Files:**
- Create: `tests/e2e/insights-page.spec.ts`
- Modify: `src/components/patterns/vithelo-insights-page.module.css` only if the new test exposes a real defect

- [ ] **Step 1: 先写 E2E 验收测试**

新建 `tests/e2e/insights-page.spec.ts`：

```ts
import { expect, test } from "@playwright/test";

test("Insights keeps the hero-to-paper overlap and ten-story runway", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/insights");

  const hero = page.getByTestId("insights-hero");
  const paper = page.getByTestId("insights-paper");
  const stories = page.getByTestId("insight-story");
  await expect(stories).toHaveCount(10);
  await expect(page.locator('[data-media-status="DEMO_ONLY"]')).toHaveCount(10);

  const [heroBox, paperBox] = await Promise.all([hero.boundingBox(), paper.boundingBox()]);
  expect(heroBox).not.toBeNull();
  expect(paperBox).not.toBeNull();
  if (heroBox && paperBox) {
    expect(paperBox.y).toBeLessThan(heroBox.y + heroBox.height);
    expect(paperBox.y).toBeGreaterThan(heroBox.y + heroBox.height - 90);
  }

  const firstStory = stories.first();
  await firstStory.scrollIntoViewIfNeeded();
  const layout = await firstStory.evaluate((element) => ({
    clientWidth: element.clientWidth,
    columns: getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
    scrollWidth: element.scrollWidth,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  expect(layout.columns).toBe(viewport.width <= 760 ? 1 : 2);

  const pageWidth = await page.locator("main").evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth + 1);
});

test("Insights keeps one accessible link and image per article", async ({ page }) => {
  await page.goto("/insights");
  await expect(page.locator('main a[href^="/insights/"]')).toHaveCount(10);
  const images = page.getByTestId("insight-story").getByRole("img");
  await expect(images).toHaveCount(10);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("alt", /\S+/);
  }
});

test("Insights disables narrative movement for Reduced Motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/insights");
  const heroAnimation = await page.getByTestId("insights-hero").evaluate((element) =>
    getComputedStyle(element, "::before").animationName,
  );
  const storyAnimation = await page.getByTestId("insight-story").first().evaluate(
    (element) => getComputedStyle(element).animationName,
  );
  expect(heroAnimation).toBe("none");
  expect(storyAnimation).toBe("none");
});
```

- [ ] **Step 2: 运行 E2E 并确认真实失败或直接暴露几何问题**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/insights-page.spec.ts --project=desktop-1440 --project=mobile-390
```

Expected: 在实现尚不满足几何或 Reduced Motion 时 FAIL；失败必须指向页面行为，不得是端口锁或测试服务器配置错误。

- [ ] **Step 3: 只修复 E2E 暴露的 Insights 缺陷**

仅允许调整 `vithelo-insights-page.module.css` 中的 Hero 高度、paper 负边距、断点、网格列数、溢出或 Reduced Motion 规则。不得借机改首页、导航或文章详情页。

- [ ] **Step 4: 运行六个验收视口**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/insights-page.spec.ts
```

Expected: 3 个测试 × 6 个项目全部 PASS。

- [ ] **Step 5: 提交 E2E 验收**

```powershell
git add -- tests/e2e/insights-page.spec.ts src/components/patterns/vithelo-insights-page.module.css
git commit -m "test: verify insights editorial runway"
```

### Task 5: 完整验证、状态记录与视觉检查

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: 运行完整静态与单元验证**

Run:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build
```

Expected: 四个命令 exit code 0。构建仍运行在本地 Node 24.16.0 时，只能记录为本地证明，不能替代 Hostinger Node 20。

- [ ] **Step 2: 运行与本轮直接相关的现有 E2E**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/insights-page.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/global-header.spec.ts tests/e2e/vithelo-b2b-site.spec.ts
```

Expected: Insights 新测试、可访问性、全局导航主题和现有文章旅程全部 PASS。若完整旧测试存在项目已记录失败，单独报告，不把它归因于本轮。

- [ ] **Step 3: 在 `docs/current-status.md` 增加本轮事实记录**

在“当前版本与验证事实”中增加：

```md
- `/insights` 已改造成深色沉浸 Hero、圆角冷象牙内容层与 10 篇统一左文右图编辑长廊；文章详情页未改动。
- Insights 图片通过 Zod 内容合同进入页面并保持 `DEMO_ONLY`；未复制参考站品牌、图片、Logo、文案或建筑视觉。
- Insights 定向单元、六视口 E2E、可访问性、导航主题、类型检查、lint 与本地构建验证已完成；最终视觉接受仍以用户确认结果为准。
```

- [ ] **Step 4: 手工视觉检查**

启动开发服务器并检查 `1440×1000`、`768×1024`、`390×844`：Hero 文字对比度、paper 重叠、主题索引换行、10 篇左文右图/移动堆叠、图片裁切、焦点、页尾衔接和水平溢出。若需要修复，先新增或收紧对应自动测试，再修改 CSS。

- [ ] **Step 5: 提交状态记录**

```powershell
git add -- docs/current-status.md
git commit -m "docs: record insights runway verification"
```

## 计划自检结论

- 规范覆盖：Hero、圆角内容层、5 个主题、10 篇统一左文右图、内容合同、响应式、无 JavaScript、Reduced Motion、证据边界和视觉验收均有对应任务。
- 范围控制：不修改文章详情、首页、导航结构、CMS、筛选或其他页面。
- 类型一致：计划统一使用 `content.intro` 和 `article.media.{status,src,alt,width,height}`，测试与实现字段一致。
- 实施约束：所有生产代码之前都有对应失败测试；所有提交均必须只暂存当前任务文件，不能包含工作区现有修改。
