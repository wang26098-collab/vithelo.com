# VITHELO 首页采购决策内容实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 保持 Hero 锁定，将第二至第八屏改造成无重复的采购决策内容链。

**Architecture:** 先让 Zod 内容契约只描述实际渲染的八屏，再更新 `DEMO_ONLY` 英文内容，最后用现有页面 Pattern 重组屏幕二、三、四、七、八。第五屏、剂型墙和询盘揭示保留现有专用组件，只接收新的文案字段，不新增依赖或业务事实。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Zod 4、CSS Modules、Vitest、Testing Library、Playwright。

---

## 执行顺序与文件边界

- 本计划先于 `2026-09-13-vithelo-home-layered-scroll.md` 执行。
- Modify: `src/content/schema.ts` — 将首页内容契约收敛到实际八屏。
- Modify: `src/content/demo/vithelo-b2b-home.ts` — 写入已确认的英文采购决策文案。
- Modify: `src/components/patterns/vithelo-b2b-home.tsx` — 更新第二、三、四、七、八屏结构。
- Modify: `src/components/patterns/vithelo-market-stage.tsx` — 渲染第五屏 intro。
- Modify: `src/components/patterns/vithelo-b2b-home.module.css` — 适配新的工作面、项目入口和询盘提示；本计划不实现整屏重叠。
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts` — 锁定内容唯一性和证据边界。
- Modify: `tests/unit/vithelo-b2b-home.test.tsx` — 锁定八屏职责和结构。
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts` — 锁定真实浏览器叙事顺序。
- Do not modify: Hero 素材与 Hero 文案、`src/components/motion/vithelo-home-motion.tsx`、`src/components/motion/vithelo-inquiry-reveal.tsx`。

### Task 1: 先锁定新的八屏内容契约

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 将内容测试的 section order 改成真实八屏**

```ts
const approvedSectionOrder = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "contact",
] as const;
```

- [ ] **Step 2: 用一项完整测试锁定每屏唯一内容**

删除旧的 featured products、MOQ 和 PDF-backed metrics 断言，加入：

```ts
it("defines one unique procurement decision per post-hero screen", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.proof.workstreams.map((item) => item.title)).toEqual([
    "Product Development",
    "Manufacturing Planning",
    "Quality Documentation",
    "Packaging Coordination",
  ]);
  expect(parsed.entryRoutes.routes.map((item) => item.title)).toEqual([
    "Private Label",
    "Adapt & Differentiate",
    "Custom Development",
  ]);
  expect(parsed.customization.nodes.map((item) => item.title)).toEqual([
    "Formula",
    "Dosage Form",
    "Sensory Direction",
    "Packaging",
  ]);
  expect(parsed.market.stories.map((item) => item.title)).toEqual([
    "Evening Routines",
    "Active Routines",
    "Life-stage Routines",
  ]);
  expect(parsed.dosage.items).toHaveLength(8);
  expect(parsed.runway.steps.map((item) => item.title)).toEqual([
    "Align",
    "Develop",
    "Sample",
    "Confirm",
    "Produce",
    "Review & Release",
  ]);
  expect(parsed.contact.prompts).toEqual([
    "Product direction",
    "Preferred format",
    "Customization priorities",
    "Expected volume and target market",
  ]);
});
```

- [ ] **Step 3: 锁定禁止重复和禁止声明**

```ts
it("keeps homepage topics unique and avoids unsupported claims", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);
  const publicContent = JSON.stringify(parsed);

  expect(publicContent).not.toMatch(/Sleep Health|Women’s Health|5,000\+|50\+|2008/);
  expect(publicContent).not.toMatch(/GMP|HACCP|Halal|FDA|ISO|certified|guaranteed/i);
  expect(publicContent).not.toMatch(/Flexible MOQ|lead time|fast sampling|automatic quote/i);
  expect(parsed.customization.nodes.flatMap((item) => item.copy)).not.toContain("Gummies");
  expect(parsed.proof.workstreams.flatMap((item) => item.copy)).not.toContain("Sample");
});
```

- [ ] **Step 4: 更新组件测试的叙事角色和第三屏断言**

```ts
expect(sections.map((section) => section.getAttribute("data-narrative-role"))).toEqual([
  "positioning",
  "manufacturing-system",
  "project-entry",
  "product-definition",
  "routine-to-brief",
  "format-options",
  "project-path",
  "inquiry",
]);

const entryRoutes = document.getElementById("capacity-boundary")!;
expect(entryRoutes).toHaveAttribute("data-layout", "project-entry-routes");
expect(within(entryRoutes).getAllByTestId("project-entry-route")).toHaveLength(3);
expect(within(entryRoutes).queryByText("Sleep Health")).not.toBeInTheDocument();
expect(within(entryRoutes).queryByText("Active Nutrition")).not.toBeInTheDocument();
expect(within(entryRoutes).queryByText("Women’s Health")).not.toBeInTheDocument();
```

- [ ] **Step 5: 运行测试并验证它们因旧 schema 和旧结构失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL，失败原因只包括 `entryRoutes`、`workstreams`、`prompts`、新标题或新测试节点尚不存在；不得出现测试语法或导入错误。

- [ ] **Step 6: 提交内容契约测试**

```powershell
git add -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
git commit -m "test: define homepage procurement narrative"
```

### Task 2: 将 Zod schema 收敛到实际八屏

**Files:**
- Modify: `src/content/schema.ts`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: 将首页 section id 收敛为八项**

```ts
export const B2BHomeSectionIdSchema = z.enum([
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "contact",
]);
```

将 `sectionOrder` 改为：

```ts
sectionOrder: z.array(B2BHomeSectionIdSchema).length(8),
```

- [ ] **Step 2: 替换第二至第五屏契约**

```ts
proof: z.object({
  kicker: z.literal("02 · MANUFACTURING SYSTEM"),
  title: z.literal("Built to connect development with production."),
  copy: z.string().min(1),
  action: z.object({
    label: z.literal("Explore Manufacturing"),
    href: z.literal("/manufacturing"),
  }),
  media: B2BRequiredMediaSchema,
  workstreams: z.array(B2BLabelCopySchema).length(4),
}),
entryRoutes: z.object({
  kicker: z.literal("03 · WAYS TO START"),
  title: z.literal("Start from where your product is today."),
  copy: z.string().min(1),
  action: z.object({
    label: z.literal("Find Your Starting Route"),
    href: z.literal("/contact"),
  }),
  routes: z.array(
    B2BLabelCopySchema.extend({
      id: z.enum(["private-label", "adapt", "custom"]),
    }),
  ).length(3),
}),
customization: z.object({
  kicker: z.literal("04 · PRODUCT DEFINITION"),
  title: z.literal("Four decisions shape one finished product."),
  copy: z.string().min(1),
  action: z.object({
    label: z.literal("Explore OEM / ODM"),
    href: z.literal("/oem-odm"),
  }),
  media: B2BRequiredMediaSchema,
  nodes: z.array(B2BLabelCopySchema).length(4),
}),
market: z.object({
  kicker: z.literal("05 · PRODUCT DIRECTION"),
  title: z.literal("Begin with the routine, not the ingredient list."),
  intro: z.string().min(1),
  stories: z.array(
    B2BLabelCopySchema.extend({ media: B2BRequiredMediaSchema }),
  ).length(3),
}),
```

删除旧 `capacity`、`metrics`、`capabilities`、`primaryAction`、`secondaryAction` 和 `benefits` 契约。

- [ ] **Step 3: 更新第六至第八屏契约并删除未渲染旧字段**

```ts
dosage: z.object({
  kicker: z.literal("06 · PRODUCT FORMATS"),
  title: z.literal("One brief. Eight ways to deliver it."),
  qualifier: z.string().min(1),
  items: z.array(
    z.object({
      name: z.string().min(1),
      slug: z.enum([
        "gummies",
        "hard-capsules",
        "softgels",
        "tablets",
        "powders",
        "liquids",
        "functional-gum",
        "oral-films",
      ]),
      media: B2BRequiredMediaSchema,
    }),
  ).length(8),
}),
runway: z.object({
  kicker: z.literal("07 · PROJECT PATH"),
  title: z.literal("A clear path from first brief to finished-project review."),
  copy: z.string().min(1),
  action: z.object({
    label: z.literal("See the OEM / ODM Process"),
    href: z.literal("/oem-odm"),
  }),
  steps: z.array(B2BLabelCopySchema).length(6),
}),
contact: z.object({
  kicker: z.literal("08 · START A PROJECT"),
  title: z.literal("Turn your idea into a useful first conversation."),
  copy: z.string().min(1),
  prompts: z.array(z.string().min(1)).length(4),
  formats: z.array(z.string().min(1)).length(8),
  scene: z.object({
    src: z.string().startsWith("/media/"),
    status: z.literal("DEMO_ONLY"),
  }),
}),
```

删除首页 schema 中未渲染的 `development`、`manufacturing`、`quality`、`channels` 字段。

- [ ] **Step 4: 运行内容测试确认只剩 demo record 失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: schema 文件通过 TypeScript 转译；测试因旧 `vitheloB2BHome` 数据形状不符合新 schema 而 FAIL。

### Task 3: 写入已批准的英文内容记录

**Files:**
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: 将 `sectionOrder` 与 schema 对齐并保持 Hero 原样**

使用 Task 1 的八项顺序。不得编辑 `hero` 对象中的任何值。

- [ ] **Step 2: 替换第二至第五屏数据**

将设计规范 `docs/superpowers/specs/2026-09-13-vithelo-home-procurement-narrative-design.md` 中 02—05 屏的已批准英文 Title、Body、四个 workstreams、三个 routes、四个 nodes、market intro 和三个 stories 原样写入。保留第二屏与第五屏的现有媒体对象；第三屏 routes 不包含图片字段。

- [ ] **Step 3: 替换第六至第八屏数据**

写入规范中的剂型标题与 qualifier、六个项目阶段、runway action、询盘标题、正文和四项 prompts。保留八剂型 item、contact scene 与 formats 数组；删除未渲染的 `development`、`manufacturing`、`quality`、`channels` 数据。

- [ ] **Step 4: 运行内容契约测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: 全部 PASS；公开内容无中文、旧产品方向标题、未核验数字、认证或固定 MOQ/交期声明。

- [ ] **Step 5: 提交 schema 与内容记录**

```powershell
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts
git commit -m "feat: define homepage procurement content"
```

### Task 4: 重组第二、三、四、七、八屏

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-market-stage.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Test: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: 第二屏删除 metrics，只渲染四个 workstreams**

保留 `proofPrimary`、制造图片和 CTA；将底部循环改为：

```tsx
<div className={styles.proofWorkstreams} data-motion-role="proof-ledger">
  {content.proof.workstreams.map((workstream, index) => (
    <article data-motion-role="proof-value" data-testid="manufacturing-workstream" key={workstream.title}>
      <ProofCapabilityIcon index={index} />
      <div>
        <h3>{workstream.title}</h3>
        <p>{workstream.copy}</p>
      </div>
    </article>
  ))}
</div>
```

在 `proofNarrative` 中渲染唯一 CTA `content.proof.action`。删除 `proofMetrics` JSX 和对应 CSS。

- [ ] **Step 2: 第三屏改为纯排版项目入口**

```tsx
<section
  aria-labelledby="capacity-boundary-title"
  className={`${styles.section} ${styles.capacityBoundarySection}`}
  data-layout="project-entry-routes"
  data-motion-intent="RELATE"
  data-narrative-role="project-entry"
  id="capacity-boundary"
>
  <div className={styles.entryRoutesIntro}>
    <p className={styles.kicker}>{content.entryRoutes.kicker}</p>
    <h2 className={styles.title} id="capacity-boundary-title">{content.entryRoutes.title}</h2>
    <p>{content.entryRoutes.copy}</p>
  </div>
  <div className={styles.entryRouteGrid}>
    {content.entryRoutes.routes.map((route, index) => (
      <article data-motion-role="collection-item" data-testid="project-entry-route" key={route.id}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{route.title}</h3>
        <p>{route.copy}</p>
      </article>
    ))}
  </div>
  <Link className={styles.entryRoutesAction} href={content.entryRoutes.action.href}>
    {content.entryRoutes.action.label}<span aria-hidden="true">→</span>
  </Link>
</section>
```

删除旧 featured product JSX 和所有仅由其使用的 CSS；不得保留隐藏旧内容。

- [ ] **Step 3: 第四屏只保留四个定义节点和一个 CTA**

删除 `customizationBenefitRail`。在 intro 中把旧 primary action 改为 `content.customization.action`，节点继续使用现有星图和媒体。

- [ ] **Step 4: 第五屏渲染 intro**

在 `vithelo-market-stage.tsx` 的标题后加入：

```tsx
<p className={styles.marketIntroCopy}>{market.intro}</p>
```

将第五屏 `data-narrative-role` 改为 `routine-to-brief`。保留现有纵向轨道与一次只显示一个故事的行为。

- [ ] **Step 5: 第七屏增加正文和单一 CTA**

在 `centerHeader` 标题后渲染 `content.runway.copy`，在六阶段路径后渲染指向 `/oem-odm` 的 `content.runway.action`。不得改变六阶段顺序。

- [ ] **Step 6: 第八屏增加四项准备提示**

在 contact 正文之后、两个直接联系入口之前加入：

```tsx
<ul className={styles.contactPrompts} aria-label="Information to prepare">
  {content.contact.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}
</ul>
```

保留 `VitheloInquiryReveal`、Email、WhatsApp 和 `VitheloHomeInquiryComposer` 的现有功能与顺序。

- [ ] **Step 7: 更新 CSS，只适配新结构**

新增 `.proofWorkstreams`、`.entryRoutesIntro`、`.entryRouteGrid`、`.entryRoutesAction`、`.marketIntroCopy`、`.runwayCopy`、`.runwayAction`、`.contactPrompts`。删除变成孤儿的 `.proofMetrics`、`.featuredProduct*` 和 `.customizationBenefitRail` 规则；不得改 Hero、屏高、padding 或滚动层叠属性。

- [ ] **Step 8: 运行组件测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx
```

Expected: 全部 PASS；八屏角色、3 个项目入口、4 个定义节点、3 个场景、8 个剂型、6 个步骤和 4 个询盘提示均可查询。

- [ ] **Step 9: 提交页面结构重构**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-market-stage.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home.test.tsx
git commit -m "feat: rebuild homepage decision narrative"
```

### Task 5: 浏览器顺序与内容回归

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`

- [ ] **Step 1: 用新标题和结构替换旧 E2E 断言**

断言八个 section id 顺序不变；断言新 `data-narrative-role` 顺序；检查 4 workstreams、3 routes、4 nodes、3 stories、8 formats、6 steps、4 prompts。删除旧 manufacturing metrics、featured product cards 和 customization benefits 断言。

- [ ] **Step 2: 运行六视口首页顺序 E2E**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/nutrition-home-sequence.spec.ts
```

Expected: 六个项目全部 PASS；每个视口均保持八屏顺序和完整内容。

- [ ] **Step 3: 运行内容阶段完整检查**

```powershell
pnpm.cmd exec eslint src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-market-stage.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/e2e/nutrition-home-sequence.spec.ts
pnpm.cmd typecheck
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts
pnpm.cmd build
```

Expected: 全部 PASS；首页几何 hash 无需更新。

- [ ] **Step 4: 提交 E2E 更新**

```powershell
git add -- tests/e2e/nutrition-home-sequence.spec.ts
git commit -m "test: verify homepage procurement sequence"
```
