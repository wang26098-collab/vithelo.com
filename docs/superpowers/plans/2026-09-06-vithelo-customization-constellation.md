# VITHELO 首页第四屏定制能力星图 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页第四屏改为以 VITHELO 包装瓶、多剂型元素和四个能力节点组成的 Customization Constellation，并加入解释性进入动效。

**Architecture:** 保留公共锚点 `#gummy-stage`，避免既有链接失效；将首页内容模型中的 `gummy` 改为 `customization`，由 Zod 约束主文案、四个能力节点、四项底部能力和两个行动入口。中央组合图作为独立图片资产使用 Next.js `Image` 渲染，节点、连线、文字和动效均由语义化 React 标记与 CSS Module 实现。

**Tech Stack:** Next.js App Router、React、TypeScript、Zod、CSS Modules、OpenAI Image Generation、Vitest、Testing Library、Playwright

---

### Task 1: 生成中央 VITHELO 定制产品组合图

**Files:**
- Create: `public/media/b2b/vithelo-customization-constellation.png`

- [ ] **Step 1: 使用图像生成模型创建原生视觉资产**

使用以下完整提示词生成横向产品组合图：

```text
Create a premium photorealistic 3D product still life for a high-end nutrition OEM/ODM website. Wide horizontal composition, approximately 3:2. Background is seamless cold ivory (#f3f0e8) with soft titanium-gray shadows, designed to blend into a web page. In the center-right, a single matte white nutrition supplement bottle floats at a subtle 6-degree clockwise angle. The bottle has a precise ribbed white cap and a restrained black label reading only “VITHELO” and, in much smaller type, “CUSTOM NUTRITION”. Around the bottle, suspend exactly five formulation elements with generous separation: one translucent two-piece capsule with warm coral powder inside, one glossy deep-burgundy softgel, one pale round tablet, one translucent coral gummy, and a restrained burst of fine muted-coral powder behind the upper-right of the bottle. Soft studio lighting, refined material detail, realistic shadows, luxury editorial product photography blended with polished CGI, understated and clinical but warm. Keep large clean negative-space zones around the outer edges for HTML capability labels. No embedded callout text, no icons, no UI, no cards, no logo other than VITHELO, no third-party branding, no green color palette, no medical symbols, no efficacy claims, no dosage, no certifications, no hands or people, no excessive particles, no dramatic neon lighting.
```

- [ ] **Step 2: 视觉检查生成结果**

确认瓶身 `VITHELO` 可辨认、没有第三方品牌、五类元素清楚且互不粘连、四周有节点留白、背景能融入 `#f3f0e8`。若文字畸变、主体被裁切或元素数量错误，使用同一图片编辑一次并重新检查。

- [ ] **Step 3: 放入公开媒体目录**

将最终图片复制为 `public/media/b2b/vithelo-customization-constellation.png`，保留原图，不使用脚本重绘、拼贴或加字。

### Task 2: 用测试锁定第四屏内容契约

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: 写入失败的数据测试**

```ts
it("defines the approved customization constellation", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.customization.kicker).toBe("04 · CUSTOMIZATION");
  expect(parsed.customization.title).toBe("Tailored to Your Brand.");
  expect(parsed.customization.nodes.map((node) => node.title)).toEqual([
    "Formula",
    "Dosage Form",
    "Flavor & Taste",
    "Packaging",
  ]);
  expect(parsed.customization.benefits.map((benefit) => benefit.title)).toEqual([
    "OEM / ODM",
    "Flexible MOQ",
    "Multi-format Production",
    "Packaging Coordination",
  ]);
  expect(parsed.customization.media.src).toBe(
    "/media/b2b/vithelo-customization-constellation.png",
  );
  expect(JSON.stringify(parsed.customization)).not.toMatch(
    /YOUR BRAND|Fast Sampling|Confidential|certified|Shop Now/i,
  );
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: FAIL，因为 `customization` 尚不存在。

- [ ] **Step 3: 更新 Zod 契约**

移除首页顶层 `gummy`，新增：

```ts
customization: z.object({
  kicker: z.literal("04 · CUSTOMIZATION"),
  title: z.literal("Tailored to Your Brand."),
  copy: z.string().min(1),
  primaryAction: z.object({ label: z.literal("Start Your Customization"), href: z.literal("/contact") }),
  secondaryAction: z.object({ label: z.literal("Explore Customization"), href: z.literal("/oem-odm") }),
  media: B2BRequiredMediaSchema,
  nodes: z.array(B2BLabelCopySchema).length(4),
  benefits: z.array(B2BLabelCopySchema).length(4),
}),
```

- [ ] **Step 4: 写入已确认内容**

在 `vithelo-b2b-home.ts` 中写入设计规范中的英文标题、说明、四个节点、四项底部能力、`/contact` 与 `/oem-odm` 链接，以及新图片的真实尺寸。

- [ ] **Step 5: 运行数据测试并确认通过**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: PASS。

### Task 3: 用语义化组件替换旧软糖图片卡片

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`

- [ ] **Step 1: 写入失败的组件测试**

```tsx
it("renders the fourth screen as a customization constellation", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const stage = document.getElementById("gummy-stage")!;
  expect(stage).toHaveAttribute("data-layout", "customization-constellation");
  expect(within(stage).getByTestId("customization-visual")).toBeInTheDocument();
  expect(within(stage).getAllByTestId("customization-node")).toHaveLength(4);
  expect(within(stage).getAllByTestId("customization-benefit")).toHaveLength(4);
  expect(within(stage).getByRole("link", { name: /Start Your Customization/i })).toHaveAttribute("href", "/contact");
  expect(within(stage).getByRole("link", { name: /Explore Customization/i })).toHaveAttribute("href", "/oem-odm");
  expect(stage).not.toHaveTextContent(/YOUR BRAND|Fast Sampling|Confidential/i);
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL，因为第四屏仍使用 `gummy-image-atelier`。

- [ ] **Step 3: 实现第四屏结构**

保留 `id="gummy-stage"`，将 `data-ui-stage` 和 `data-layout` 设置为 `customization-constellation`，动效意图设为 `EXPLAIN`。DOM 顺序依次为左侧 intro、中央 `Image`、四个 node、底部 benefit rail；视觉位置通过 CSS Grid 与绝对定位实现，不改变读屏顺序。装饰引导线使用 `aria-hidden="true"`，图片使用 `sizes="(max-width: 760px) 100vw, 62vw"`。

- [ ] **Step 4: 运行组件测试并确认通过**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: PASS。

### Task 4: 实现构图、进入动效和响应式回退

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: 替换旧 `.gummy*` 第四屏样式**

桌面使用 `min-height: 100svh` 的冷象牙舞台。左侧 intro 固定在第一列；右侧 visual 占据约 66%；四个节点以 `data-node-index` 定位在中央图周围；底部 benefit rail 横跨全宽。删除旧 `gummyAtelier`、`gummyImageStage` 和 `gummyFeatureRail` 的直接样式与响应式规则，避免遗留选择器继续生效。

- [ ] **Step 2: 实现解释性进入动效**

复用现有 section IntersectionObserver：未进入时 intro、瓶身、节点与 benefit rail 处于轻微透明和位移状态；进入后 900ms 内完成。瓶身整体从 `translateY(18px) rotate(2deg)` 到最终位置，四节点按阅读顺序错开 70ms，底部 rail 最后出现。

- [ ] **Step 3: 实现桌面悬停反馈**

在精细指针设备上，节点 hover/focus 时边框加深、引导线提高可见度；产品组合只做不超过 6px 的视觉位移；两个链接箭头移动 4px。无持续动画。

- [ ] **Step 4: 实现平板、手机与 Reduced Motion**

901–1279px 让 intro 居上、视觉居中、节点两列；760px 以下改为标题、图片、节点、benefit rail 的单列文档流，不保留节点绝对定位。Reduced Motion 取消位移、旋转、过渡延迟和缩放，内容直接可见。

### Task 5: 浏览器验收与回归

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: 更新 E2E 结构断言**

断言第四屏有一张 `customization-visual`、四个 `customization-node`、四个 `customization-benefit`、正确的 `/contact` 和 `/oem-odm` 链接，且没有旧六卡结构或禁止文案。

- [ ] **Step 2: 增加响应式与一屏构图断言**

在六个验收视口读取 `scrollWidth/clientWidth`；桌面 1440×900 下将 section 滚动到顶部，断言底部能力带不超过视口底部 1px；手机断言节点为静态文档流且无横向溢出。

- [ ] **Step 3: 增加 Reduced Motion 断言**

模拟 `prefers-reduced-motion: reduce`，确认主标题、中央图片、四节点和四项底部能力全部可见，计算样式 `transform` 为 `none`。

- [ ] **Step 4: 运行验证**

Run: `pnpm.cmd test`

Expected: 全部单元测试通过。

Run: `pnpm.cmd typecheck`

Expected: PASS。

Run: 使用当前 `127.0.0.1:3000` 外部服务器运行上述三个 E2E 文件的第四屏定向测试。

Expected: 六个验收视口全部通过或仅出现测试定义中的非目标视口 skip。

- [ ] **Step 5: 生产构建与预览**

精确停止 3000 端口的当前 Next.js 开发进程，运行 `pnpm.cmd build`，Expected: PASS；再用隐藏窗口重启 `pnpm.cmd dev`。生成 1440×900、1024×768、390×844 三张第四屏截图并视觉检查，不使用脚本修改图片。

### Task 6: 状态记录

**Files:**
- Modify: `docs/current-status.md`
- Create: `docs/superpowers/specs/2026-09-06-vithelo-customization-constellation-acceptance.md`

- [ ] **Step 1: 写入中文验收记录**

记录图片来源、构图、动效、响应式、Reduced Motion、测试、类型检查和构建结果；明确本地 Node 24 构建不等于 Hostinger Node 20 生产证明。

- [ ] **Step 2: 更新当前状态**

将第四屏描述改为 VITHELO 定制能力星图，并保留 `#gummy-stage` 为兼容锚点。

- [ ] **Step 3: 保存任务结果**

由于工作区已有用户和前序任务的未提交改动，只提交本任务新增的独立规范/计划文档；重叠源码保持未提交，避免把无关改动混入提交。
