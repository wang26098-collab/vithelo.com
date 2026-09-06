# VITHELO 精简 B2B 网站前端实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不破坏已确认 11 板块首页的前提下，完成 Products、OEM / ODM、Insights、三篇内容详情和 Contact，并把导航、内容契约、Sitemap、旧路由退出机制及响应式验收连成一套可上线的英文 B2B 前端。

**Architecture:** 继续使用 Next.js App Router 和服务端页面；所有公开事实先经过 Zod 契约和本地内容适配器，再进入 Page Pattern。新建一个共享 B2B Site Frame，首页和四类新页面共用 Header、Footer 与配置披露；旧 DTC 路由在新页面全部通过验收后再重定向，不提前删除旧组件。

**Tech Stack:** Next.js 16.3.1 App Router、React 19.2、TypeScript 5.9、Zod 4、CSS Modules、Vitest、Testing Library、Playwright。

**Authoritative spec:** `docs/superpowers/specs/2026-08-27-vithelo-b2b-site-architecture-design.md`

---

## 范围压缩

### Must

- `/`、`/products`、`/oem-odm`、`/insights`、三条 `/insights/[slug]`、`/contact` 可访问。
- Products 在一页内展示八种剂型，不生成八个详情页。
- OEM / ODM 同页承担工厂关系、合作流程、生产体系和质量路径。
- Contact 展示完整项目信息结构，但邮箱、WhatsApp 和提交服务保持 `NOT_CONFIGURED`。
- 所有公开事实经过 Zod 和适配器；未验证内容保持 `DEMO_ONLY`。
- 六个验收视口、Reduced Motion、键盘、44px 目标、Sitemap 和构建全部通过。

### Should

- 第一版只引入一张有明确 Pexels 来源、会被实际使用的软糖产品形态图片。
- 建立素材登记表，明确图片不是 VITHELO 真实工厂证据。
- 首页与内页使用同一导航语义和转化入口。

### Could

- 获得真实资产后替换工厂、生产、实验室和质量图片。
- 获得真实联系方式后启用邮件、WhatsApp 和表单服务。
- 获得真实法律文本后公开 Privacy 与 Terms。

### Won't

- 不创建八个剂型详情页、商城、账户、搜索、评论、订阅、CMS、CRM 或多语言。
- 不虚构认证、客户、工厂照片、检测、交期、功效或法规结论。
- 不改动冻结文件 `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`。
- 未获得用户明确确认时不创建 Git commit、不推送。

## 文件结构锁定

### 新建

- `src/content/demo/vithelo-b2b-site.ts`：共享站点、Products、OEM / ODM、Insights、Contact 的验证后本地记录。
- `src/components/core/vithelo-b2b-site-frame.tsx`：共享 Header、移动导航、Footer 和数据状态披露。
- `src/components/core/vithelo-b2b-site-frame.module.css`：共享站点壳层样式。
- `src/components/patterns/vithelo-b2b-pages.module.css`：四类内页共用的编辑型布局规则。
- `src/components/patterns/vithelo-products-page.tsx`：Products 页面组合。
- `src/components/patterns/vithelo-oem-odm-page.tsx`：OEM / ODM 页面组合。
- `src/components/patterns/vithelo-insights-page.tsx`：内容中心索引。
- `src/components/patterns/vithelo-insight-article.tsx`：模块化内容详情渲染器。
- `src/components/patterns/vithelo-contact-page.tsx`：禁用状态的项目需求页面。
- `src/app/products/page.tsx`
- `src/app/oem-odm/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/insights/[slug]/page.tsx`
- `public/media/b2b/gummies-pexels-14027295.jpg`
- `docs/vithelo-media-register.md`
- `tests/unit/vithelo-b2b-pages-content.test.ts`
- `tests/unit/vithelo-b2b-site-frame.test.tsx`
- `tests/unit/vithelo-products-page.test.tsx`
- `tests/unit/vithelo-oem-odm-page.test.tsx`
- `tests/unit/vithelo-insights.test.tsx`
- `tests/unit/vithelo-contact-page.test.tsx`
- `tests/e2e/vithelo-b2b-site.spec.ts`

### 修改

- `src/content/schema.ts`：加入 B2B 页面、媒体来源和 Article Blocks 契约。
- `src/lib/adapters/content-adapter.ts`：加入 B2B 内容读取接口。
- `src/lib/content.ts`：解析并返回新的验证记录。
- `src/components/core/route-shell.tsx`：新 B2B 路由不再套用旧站壳层。
- `src/components/patterns/vithelo-b2b-home.tsx`：移除页面内重复 Header/Footer，保留 11 个板块。
- `src/components/patterns/vithelo-b2b-home.module.css`：只移除被共享壳层接管的样式。
- `src/content/demo/vithelo-b2b-home.ts`：首页链接改为新页面路由。
- `src/app/page.tsx`：通过内容适配器取得首页与共享站点数据。
- `src/app/contact/page.tsx`：替换旧双产品世界 Intake。
- `src/app/layout.tsx`：更新全站英文 B2B metadata 文案。
- `src/app/sitemap.ts`：只输出新 B2B 页面与已发布文章。
- `src/app/robots.ts`：明确不抓取退出中的旧交易和账户路由。
- `next.config.ts`：在新页面验收后添加旧公开路径重定向。
- 现有相关 unit/e2e 测试：把旧导航和旧公开路由断言改为已确认架构。

---

### Task 1: 建立失败基线和 B2B 内容契约

**Files:**
- Create: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Modify: `src/content/schema.ts`

- [ ] **Step 1: 记录工作树和冻结首页基线**

Run:

```powershell
git status --short
Get-FileHash -Algorithm SHA256 -LiteralPath 'vithelo-homepage-work\VITHELO_Homepage_FullPreview_V1.html'
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
```

Expected:

- 冻结 HTML 的 SHA256 为 `CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649`。
- 三条质量命令退出码为 0。
- 记录现有非本任务改动；不得清理或格式化它们。

- [ ] **Step 2: 写内容契约失败测试**

Create `tests/unit/vithelo-b2b-pages-content.test.ts`:

```ts
import {
  B2BContactPageSchema,
  B2BInsightArticleSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";
import {
  vitheloB2BContactPage,
  vitheloB2BInsightsPage,
  vitheloB2BOemOdmPage,
  vitheloB2BProductsPage,
  vitheloB2BSite,
} from "@/content/demo/vithelo-b2b-site";

it("validates the compact B2B site records", () => {
  expect(B2BSiteContentSchema.parse(vitheloB2BSite).navigation).toEqual([
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ]);
  expect(B2BProductsPageSchema.parse(vitheloB2BProductsPage).formats).toHaveLength(8);
  expect(B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage).steps).toHaveLength(6);
  expect(B2BInsightsPageSchema.parse(vitheloB2BInsightsPage).articles).toHaveLength(3);
  expect(B2BContactPageSchema.parse(vitheloB2BContactPage).status).toBe("NOT_CONFIGURED");
});

it("keeps only approved MOQ values and global English positioning", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
  expect(products.formats.map(({ name, moq }) => [name, moq])).toEqual([
    ["Gummies", "Custom projects from 500 bottles"],
    ["Hard Capsules", "60,000-100,000 capsules"],
    ["Softgels", "300,000 softgels"],
    ["Tablets", "100,000 tablets"],
    ["Powders", "100 kg"],
    ["Liquids", "Contact us for MOQ"],
    ["Functional Gum", "2 metric tons"],
    ["Oral Films", "Contact us for MOQ"],
  ]);
  expect(JSON.stringify({ products, site: vitheloB2BSite })).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("publishes three valid article records without configured media claims", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
  for (const article of insights.articles) {
    expect(B2BInsightArticleSchema.parse(article).published).toBe(true);
    expect(article.blocks.length).toBeGreaterThanOrEqual(4);
  }
});
```

- [ ] **Step 3: 运行测试并确认因缺少契约和记录失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: FAIL，错误明确指向尚不存在的 B2B schema 或 fixture export。

- [ ] **Step 4: 在 `src/content/schema.ts` 追加最小契约**

Append the following definitions before the exported inferred types:

```ts
const B2BLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().regex(/^\/(?:[a-z][\w-]*)(?:\/[a-z][\w-]*)?(?:\?[^\s]+)?$|^\/$/),
});

const B2BTextItemSchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
});

const B2BFreeMediaSchema = z.object({
  status: z.literal("FREE_COMMERCIAL"),
  src: z.string().regex(/^\/media\/b2b\/[\w.-]+$/),
  alt: z.string().min(1),
  sourceUrl: z.url(),
  creator: z.string().min(1),
  licenseUrl: z.url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const B2BMissingMediaSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  alt: z.string().min(1),
  message: z.string().min(1),
});

export const B2BPageMediaSchema = z.discriminatedUnion("status", [
  B2BFreeMediaSchema,
  B2BMissingMediaSchema,
]);

export const B2BSiteContentSchema = z.object({
  dataStatus: DataStatusSchema,
  identity: z.string().min(1),
  navigation: z.array(B2BLinkSchema).length(4),
  requestQuote: B2BLinkSchema,
  footerLinks: z.array(B2BLinkSchema).length(4),
  disclosure: z.string().min(1),
});

const B2BHeroSchema = z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
});

const DosageFormatCapabilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  fit: z.string().min(1),
  customization: z.array(z.string().min(1)).min(2),
  packaging: z.string().min(1),
  moq: z.string().min(1),
});

export const B2BProductsPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  gummy: z.object({
    title: z.string().min(1),
    copy: z.string().min(1),
    media: B2BPageMediaSchema,
    dimensions: z.array(B2BTextItemSchema).length(6),
  }),
  formats: z.array(DosageFormatCapabilitySchema).length(8),
  comparison: z.array(z.object({ criterion: z.string(), guidance: z.string() })).min(4),
  packaging: z.array(B2BTextItemSchema).min(4),
  moqNote: z.literal("Flexible MOQ based on formula and packaging."),
  cta: z.object({ title: z.string(), copy: z.string(), href: z.literal("/contact") }),
});

export const B2BOemOdmPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  identity: B2BTextItemSchema,
  steps: z.array(B2BTextItemSchema).length(6),
  customization: z.array(B2BTextItemSchema).length(4),
  production: z.array(B2BTextItemSchema).length(4),
  quality: z.array(B2BTextItemSchema).length(4),
  checklist: z.array(z.string().min(1)).length(5),
  faqs: z.array(B2BTextItemSchema).min(5),
  cta: z.object({ title: z.string(), copy: z.string(), href: z.literal("/contact") }),
});

const InsightBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), title: z.string(), paragraphs: z.array(z.string()).min(1) }),
  z.object({ type: z.literal("list"), title: z.string(), items: z.array(z.string()).min(2) }),
  z.object({ type: z.literal("table"), title: z.string(), columns: z.array(z.string()).min(2), rows: z.array(z.array(z.string()).min(2)).min(2) }),
  z.object({ type: z.literal("callout"), title: z.string(), copy: z.string() }),
  z.object({ type: z.literal("cta"), title: z.string(), copy: z.string(), href: z.literal("/contact") }),
  z.object({ type: z.literal("media"), media: B2BPageMediaSchema }),
  z.object({ type: z.literal("video"), status: z.literal("NOT_CONFIGURED"), message: z.string() }),
  z.object({ type: z.literal("download"), status: z.literal("NOT_CONFIGURED"), message: z.string() }),
  z.object({ type: z.literal("faq"), items: z.array(B2BTextItemSchema).min(2) }),
]);

export const B2BInsightArticleSchema = z.object({
  dataStatus: DataStatusSchema,
  published: z.boolean(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  byline: z.string().min(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  contentFormat: z.string().min(1),
  blocks: z.array(InsightBlockSchema).min(4),
});

export const B2BInsightsPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  categories: z.array(z.string().min(1)).length(5),
  articles: z.array(B2BInsightArticleSchema).length(3),
});

export const B2BContactPageSchema = z.object({
  dataStatus: DataStatusSchema,
  status: z.literal("NOT_CONFIGURED"),
  hero: B2BHeroSchema,
  fields: z.array(z.string().min(1)).length(8),
  formats: z.array(z.string().min(1)).length(8),
  pendingMessage: z.string().min(1),
});
```

Add these inferred types at the end of `src/content/schema.ts`:

```ts
export type B2BPageMedia = z.infer<typeof B2BPageMediaSchema>;
export type B2BSiteContent = z.infer<typeof B2BSiteContentSchema>;
export type B2BProductsPage = z.infer<typeof B2BProductsPageSchema>;
export type B2BOemOdmPage = z.infer<typeof B2BOemOdmPageSchema>;
export type B2BInsightArticle = z.infer<typeof B2BInsightArticleSchema>;
export type B2BInsightsPage = z.infer<typeof B2BInsightsPageSchema>;
export type B2BContactPage = z.infer<typeof B2BContactPageSchema>;
```

- [ ] **Step 5: 运行 typecheck，确认只剩 fixture 缺失**

Run:

```powershell
pnpm.cmd typecheck
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: typecheck 可因尚未创建 fixture 失败，但错误只指向 `vithelo-b2b-site` 缺失；不得出现 schema 内部类型错误。

- [ ] **Step 6: 检查本任务 diff，不提交**

Run:

```powershell
git diff --check -- src/content/schema.ts tests/unit/vithelo-b2b-pages-content.test.ts
git status --short
```

Expected: `git diff --check` 无输出；不运行 `git commit`。

---

### Task 2: 建立验证后的页面记录和内容适配器

**Files:**
- Create: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `src/lib/adapters/content-adapter.ts`
- Modify: `src/lib/content.ts`
- Test: `tests/unit/vithelo-b2b-pages-content.test.ts`

- [ ] **Step 1: 创建共享站点和 Products 记录**

Create `src/content/demo/vithelo-b2b-site.ts` with the following exports. The arrays below are the launch records; do not add claims beyond them.

```ts
import {
  B2BContactPageSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";

const pexelsLicense = "https://www.pexels.com/license/";

export const vitheloB2BSite = B2BSiteContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  identity: "Factory-owned overseas brand and export team",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  requestQuote: { label: "Request Quote", href: "/contact" },
  footerLinks: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  disclosure: "DEMO_ONLY · Contact details, certifications and production records require final verification before launch.",
});

export const vitheloB2BProductsPage = B2BProductsPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "PRODUCT CAPABILITIES",
    title: "Gummy-first. Built across eight product formats.",
    copy: "Choose the format, formula direction and pack that fit your project. VITHELO reviews manufacturing feasibility before confirming the route.",
  },
  gummy: {
    title: "A flexible format for a distinctive product.",
    copy: "Gummy projects can align formula, texture, shape, flavor, color and packaging in one development brief.",
    media: {
      status: "FREE_COMMERCIAL",
      src: "/media/b2b/gummies-pexels-14027295.jpg",
      alt: "Unbranded gummy supplements on a white surface",
      sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-supplement-gummies-on-white-surface-14027295/",
      creator: "Supplements On Demand",
      licenseUrl: pexelsLicense,
      width: 2400,
      height: 1600,
    },
    dimensions: [
      { title: "Formula", copy: "Ingredient direction and serving context" },
      { title: "Base", copy: "Pectin or gelatin review" },
      { title: "Shape", copy: "Standard molds or custom development" },
      { title: "Taste", copy: "Flavor and texture alignment" },
      { title: "Color", copy: "Product and brand expression" },
      { title: "Pack", copy: "Bottle, pouch and count review" },
    ],
  },
  formats: [
    { id: "gummies", name: "Gummies", fit: "Consumer-friendly daily formats", customization: ["Formula", "Shape", "Flavor and color"], packaging: "Bottles and pouches", moq: "Custom projects from 500 bottles" },
    { id: "hard-capsules", name: "Hard Capsules", fit: "Straightforward powder delivery", customization: ["Capsule size", "Shell and color", "Fill direction"], packaging: "Bottles and bulk formats", moq: "60,000-100,000 capsules" },
    { id: "softgels", name: "Softgels", fit: "Oil-based and liquid fills", customization: ["Shell", "Color", "Fill direction"], packaging: "Bottles and bulk formats", moq: "300,000 softgels" },
    { id: "tablets", name: "Tablets", fit: "Compact and familiar serving formats", customization: ["Shape", "Size", "Coating direction"], packaging: "Bottles and bulk formats", moq: "100,000 tablets" },
    { id: "powders", name: "Powders", fit: "Flexible serving and flavor systems", customization: ["Formula", "Flavor", "Serving size"], packaging: "Tubs, pouches and stick packs", moq: "100 kg" },
    { id: "liquids", name: "Liquids", fit: "Measured oral liquid formats", customization: ["Formula", "Flavor", "Viscosity direction"], packaging: "Bottles, droppers and sachets", moq: "Contact us for MOQ" },
    { id: "functional-gum", name: "Functional Gum", fit: "Portable chew-based concepts", customization: ["Formula", "Flavor", "Piece format"], packaging: "Pouches, blisters and containers", moq: "2 metric tons" },
    { id: "oral-films", name: "Oral Films", fit: "Thin portable strip formats", customization: ["Formula direction", "Flavor", "Strip and sachet format"], packaging: "Individual sachets and cartons", moq: "Contact us for MOQ" },
  ],
  comparison: [
    { criterion: "Use experience", guidance: "Chew, swallow, mix, measure or dissolve" },
    { criterion: "Formula fit", guidance: "Review ingredient form, serving size and sensory limits" },
    { criterion: "Packaging fit", guidance: "Balance protection, count, transport and shelf presentation" },
    { criterion: "Production fit", guidance: "Confirm formula, pack and volume together before MOQ" },
  ],
  packaging: [
    { title: "Bottles", copy: "A practical route for gummies, capsules, softgels and tablets" },
    { title: "Pouches", copy: "Flexible packs for gummies, powders and functional gum" },
    { title: "Stick packs", copy: "Portioned powder and liquid directions" },
    { title: "Sachets", copy: "Individual oral film and selected liquid formats" },
  ],
  moqNote: "Flexible MOQ based on formula and packaging.",
  cta: { title: "Not sure which format fits your project?", copy: "Share the use case, formula direction, pack and volume. We will review the practical route.", href: "/contact" },
});
```

- [ ] **Step 2: 在同一 fixture 文件追加 OEM / ODM、Insights 和 Contact 记录**

Append:

```ts
export const vitheloB2BOemOdmPage = B2BOemOdmPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: { kicker: "OEM / ODM", title: "From product brief to finished batch.", copy: "One project path connects formula review, sampling, packaging alignment, production and release." },
  identity: { title: "A direct line to the manufacturing team.", copy: "VITHELO is the factory-owned overseas brand and export team, connecting international projects with development and production." },
  steps: [
    { title: "01 · Requirement Review", copy: "Clarify format, formula direction, pack and expected volume." },
    { title: "02 · Formula Development", copy: "Review the formula against product and manufacturing needs." },
    { title: "03 · Sample Confirmation", copy: "Evaluate samples and agree on required adjustments." },
    { title: "04 · Packaging Alignment", copy: "Match container, label and transport requirements." },
    { title: "05 · Production", copy: "Move the confirmed project into the agreed production route." },
    { title: "06 · Inspection & Delivery", copy: "Review finished-product records and project-specific delivery needs." },
  ],
  customization: [
    { title: "Formula Direction", copy: "Ingredients, serving context and product objective" },
    { title: "Sensory Design", copy: "Flavor, color, shape and texture where applicable" },
    { title: "Dosage Format", copy: "Eight oral formats within one manufacturing system" },
    { title: "Packaging Alignment", copy: "Container, count, label and transport considerations" },
  ],
  production: [
    { title: "Project Review", copy: "Manufacturing fit is reviewed before the route is confirmed." },
    { title: "Controlled Handoffs", copy: "Development, sample and packaging decisions move into production records." },
    { title: "Multi-format Capability", copy: "Gummies lead the offer, supported by seven additional oral formats." },
    { title: "Documented Release", copy: "Available documents depend on current factory records and project needs." },
  ],
  quality: [
    { title: "Raw Material", copy: "Identity, specification and supplier documentation review" },
    { title: "In Process", copy: "Production checks defined by the confirmed process" },
    { title: "Finished Product", copy: "Finished-product review and batch documentation" },
    { title: "Third-party Testing", copy: "Configured only when the project and approved provider require it" },
  ],
  checklist: ["Target dosage format", "Formula direction", "Packaging format", "Estimated volume", "Target timing"],
  faqs: [
    { title: "How is MOQ confirmed?", copy: "MOQ is reviewed with the formula and packaging. Use the published format figures as project starting points, not unconditional commitments." },
    { title: "Can VITHELO support sampling?", copy: "Sampling belongs to the project path; the exact scope is confirmed after the requirement review." },
    { title: "Can packaging be coordinated?", copy: "Packaging alignment can cover container, label and transport requirements within the confirmed project scope." },
    { title: "Which documents are available?", copy: "Document availability depends on current factory records, the product and the destination requirements." },
    { title: "What lead time should we plan for?", copy: "Timing is assessed after formula, pack, sample and production requirements are clear." },
  ],
  cta: { title: "Bring us the brief, not a finished answer.", copy: "Share what is known. The first review will identify the decisions still needed.", href: "/contact" },
});

const articles = [
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "choose-the-right-supplement-format",
    category: "Dosage Formats",
    title: "How to Choose the Right Supplement Format",
    summary: "A practical comparison of use experience, formula fit, packaging and production volume.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Buyer Guide",
    blocks: [
      { type: "text" as const, title: "Start with the way the product will be used", paragraphs: ["Format is not a cosmetic decision. It affects serving size, sensory experience, packaging and production feasibility.", "A useful brief connects the consumer routine with the formula and the commercial pack."] },
      { type: "table" as const, title: "Format decision map", columns: ["Question", "What it changes"], rows: [["Chew, swallow, mix or measure?", "The shortlist of practical formats"], ["How large is the serving?", "Piece count, capsule count or powder volume"], ["Does taste matter?", "Flavor, sweetener and texture work"], ["How will it be packed?", "Protection, count and transport requirements"]] },
      { type: "callout" as const, title: "MOQ follows the whole project", copy: "Formula and packaging can change the viable production route. Confirm them together." },
      { type: "faq" as const, items: [{ title: "Is gummy always the easiest choice?", copy: "No. Gummies offer a distinctive experience, but formula load, taste and texture must be reviewed." }, { title: "Can one formula move between formats?", copy: "The ingredient list may be a starting point, but each format requires its own feasibility review." }] },
      { type: "cta" as const, title: "Compare the eight VITHELO formats", copy: "Review capabilities and project starting MOQs before sending a brief.", href: "/contact" as const },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "prepare-for-an-oem-odm-project",
    category: "Buyer Guides",
    title: "What to Prepare Before Starting an OEM / ODM Project",
    summary: "Five inputs that make the first manufacturing review clearer and faster.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Project Checklist",
    blocks: [
      { type: "text" as const, title: "A useful brief can still be incomplete", paragraphs: ["You do not need a finished specification before the first conversation.", "You do need enough context for the factory to identify the right questions and production route."] },
      { type: "list" as const, title: "Bring these five inputs", items: ["Target dosage format", "Formula or ingredient direction", "Preferred packaging", "Estimated order volume", "Target timing and destination context"] },
      { type: "callout" as const, title: "Separate fixed decisions from open decisions", copy: "Mark what is already approved and what still needs manufacturing guidance." },
      { type: "faq" as const, items: [{ title: "Do I need finished artwork?", copy: "No. Packaging direction is enough for the first review; artwork requirements can be aligned later." }, { title: "Do I need a final formula?", copy: "No. A formula direction can begin the feasibility discussion." }] },
      { type: "cta" as const, title: "Prepare your project brief", copy: "Use the contact structure to organize the first manufacturing review.", href: "/contact" as const },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "gummy-development-guide",
    category: "Product Development",
    title: "Gummy Development: Formula, Texture, Shape and Packaging",
    summary: "The linked decisions behind a gummy that works for the formula, the production line and the brand.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Development Guide",
    blocks: [
      { type: "media" as const, media: { status: "FREE_COMMERCIAL" as const, src: "/media/b2b/gummies-pexels-14027295.jpg", alt: "Unbranded gummy supplements on a white surface", sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-supplement-gummies-on-white-surface-14027295/", creator: "Supplements On Demand", licenseUrl: pexelsLicense, width: 2400, height: 1600 } },
      { type: "text" as const, title: "Treat the gummy as one connected system", paragraphs: ["Formula load, base, sweetness, flavor, shape and pack affect one another.", "A change in one area can create a new decision elsewhere, so the project should be reviewed as a whole."] },
      { type: "list" as const, title: "The six linked decisions", items: ["Ingredient and serving direction", "Pectin or gelatin base", "Shape and piece size", "Flavor and sweetness", "Color direction", "Bottle, pouch and count"] },
      { type: "callout" as const, title: "Start from the use case", copy: "A recognizable shape or flavor only works when the product still fits the formula and daily routine." },
      { type: "cta" as const, title: "Start a gummy project", copy: "Share the formula direction, desired experience, pack and estimated volume.", href: "/contact" as const },
    ],
  },
];

export const vitheloB2BInsightsPage = B2BInsightsPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: { kicker: "INSIGHTS", title: "Practical guidance for product decisions.", copy: "Buyer guides connect format, formula, packaging and manufacturing questions without turning unverified claims into proof." },
  categories: ["Product Development", "Dosage Formats", "Packaging & Launch", "Manufacturing & Quality", "Buyer Guides"],
  articles,
});

export const vitheloB2BContactPage = B2BContactPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  status: "NOT_CONFIGURED",
  hero: { kicker: "START A PROJECT", title: "Tell us what you want to make.", copy: "Share the format, formula direction, packaging needs and expected volume. The manufacturing route and MOQ are reviewed together." },
  fields: ["Name / Company", "Work Email", "Target Market", "Dosage Format", "Formula Direction", "Packaging Needs", "Estimated Volume", "Project Brief"],
  formats: ["Gummies", "Hard Capsules", "Softgels", "Tablets", "Powders", "Liquids", "Functional Gum", "Oral Films"],
  pendingMessage: "Email, WhatsApp and inquiry submission are not configured.",
});
```

- [ ] **Step 3: 扩展内容适配器接口**

Modify `src/lib/adapters/content-adapter.ts` imports and interface:

```ts
import type {
  B2BContactPage,
  B2BInsightArticle,
  B2BInsightsPage,
  B2BOemOdmPage,
  B2BProductsPage,
  B2BSiteContent,
  Capability,
  Evidence,
  Formula,
  HomeContent,
  Ingredient,
  MarketConfiguration,
  Product,
  Technology,
  VitheloB2BHomeContent,
} from "@/content/schema";

export interface ContentAdapter {
  getHomeContent(): Promise<HomeContent>;
  getB2BHomeContent(): Promise<VitheloB2BHomeContent>;
  getB2BSiteContent(): Promise<B2BSiteContent>;
  getB2BProductsPage(): Promise<B2BProductsPage>;
  getB2BOemOdmPage(): Promise<B2BOemOdmPage>;
  getB2BInsightsPage(): Promise<B2BInsightsPage>;
  listPublishedB2BInsights(): Promise<B2BInsightArticle[]>;
  getB2BInsightBySlug(slug: string): Promise<B2BInsightArticle | null>;
  getB2BContactPage(): Promise<B2BContactPage>;
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  listFormulas(): Promise<Formula[]>;
  listIngredients(): Promise<Ingredient[]>;
  listTechnologies(): Promise<Technology[]>;
  listEvidence(): Promise<Evidence[]>;
  listCapabilities(): Promise<Capability[]>;
  getMarketConfiguration(): Promise<MarketConfiguration>;
}
```

- [ ] **Step 4: 在 `src/lib/content.ts` 解析一次并添加读取方法**

Add these exact imports alongside the existing demo and schema imports:

```ts
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import {
  vitheloB2BContactPage,
  vitheloB2BInsightsPage,
  vitheloB2BOemOdmPage,
  vitheloB2BProductsPage,
  vitheloB2BSite,
} from "@/content/demo/vithelo-b2b-site";
import {
  B2BContactPageSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
  VitheloB2BHomeContentSchema,
} from "@/content/schema";
```

Parse records once at module load, then add these adapter methods:

```ts
const b2bHome = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);
const b2bSite = B2BSiteContentSchema.parse(vitheloB2BSite);
const b2bProductsPage = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
const b2bOemOdmPage = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);
const b2bInsightsPage = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
const b2bContactPage = B2BContactPageSchema.parse(vitheloB2BContactPage);

export const localContentAdapter: ContentAdapter = {
  async getHomeContent() { return homeContent; },
  async getB2BHomeContent() { return b2bHome; },
  async getB2BSiteContent() { return b2bSite; },
  async getB2BProductsPage() { return b2bProductsPage; },
  async getB2BOemOdmPage() { return b2bOemOdmPage; },
  async getB2BInsightsPage() { return b2bInsightsPage; },
  async listPublishedB2BInsights() {
    return b2bInsightsPage.articles.filter((article) => article.published);
  },
  async getB2BInsightBySlug(slug) {
    return b2bInsightsPage.articles.find((article) => article.published && article.slug === slug) ?? null;
  },
  async getB2BContactPage() { return b2bContactPage; },
  async listProducts() { return products; },
  async getProductBySlug(slug) { return products.find((product) => product.slug === slug) ?? null; },
  async listFormulas() { return formulas; },
  async listIngredients() { return ingredients; },
  async listTechnologies() { return technologies; },
  async listEvidence() { return evidence; },
  async listCapabilities() { return capabilities; },
  async getMarketConfiguration() { return marketConfiguration; },
};
```

- [ ] **Step 5: 让失败测试转绿**

Run:

```powershell
pnpm.cmd typecheck
pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts
```

Expected: PASS。

- [ ] **Step 6: 检查范围，不提交**

Run:

```powershell
git diff --check -- src/content src/lib tests/unit/vithelo-b2b-pages-content.test.ts
git status --short
```

Expected: 无 whitespace 错误；不运行 `git commit`。

---

### Task 3: 下载并登记一张免费软糖素材

**Files:**
- Create: `public/media/b2b/gummies-pexels-14027295.jpg`
- Create: `docs/vithelo-media-register.md`

- [ ] **Step 1: 创建目标目录并下载固定来源文件**

Run from repository root:

```powershell
New-Item -ItemType Directory -Force -Path 'public\media\b2b' | Out-Null
Invoke-WebRequest -Uri 'https://images.pexels.com/photos/14027295/pexels-photo-14027295.jpeg?cs=srgb&dl=pexels-supliful-14027295.jpg&fm=jpg' -OutFile 'public\media\b2b\gummies-pexels-14027295.jpg'
```

Expected: 文件存在且长度大于 100 KB。若网络权限被限制，使用批准的网络访问重跑同样命令，不改用来源不明的图片。

- [ ] **Step 2: 校验文件是真实可读图片**

Run:

```powershell
Add-Type -AssemblyName System.Drawing
Get-ChildItem -LiteralPath 'public\media\b2b' -File | ForEach-Object {
  $image = [System.Drawing.Image]::FromFile($_.FullName)
  [pscustomobject]@{ Name = $_.Name; Width = $image.Width; Height = $image.Height; Bytes = $_.Length }
  $image.Dispose()
}
```

Expected: 图片可以读取，Width、Height 和 Bytes 均为正数。把真实宽高回填到 `src/content/demo/vithelo-b2b-site.ts`；不得保留与文件不一致的尺寸。

- [ ] **Step 3: 写素材登记表**

Create `docs/vithelo-media-register.md`:

```markdown
# VITHELO Media Register

| Local file | Source page | Creator | License | Intended use | Evidence boundary | Replacement target |
|---|---|---|---|---|---|---|
| `/media/b2b/gummies-pexels-14027295.jpg` | https://www.pexels.com/photo/close-up-shot-of-supplement-gummies-on-white-surface-14027295/ | Supplements On Demand | https://www.pexels.com/license/ | Gummy product-form illustration | Not VITHELO product or factory evidence | Replace when approved VITHELO gummy photography is available |

Downloaded for the first B2B frontend release on 2026-08-27. The files may be cropped for responsive layout, but they may not be presented as VITHELO manufacturing, laboratory, team, customer, certification or product proof.
```

- [ ] **Step 4: 检查素材登记和工作树，不提交**

Run:

```powershell
git diff --check -- docs/vithelo-media-register.md src/content/demo/vithelo-b2b-site.ts
git status --short
```

Expected: 无 whitespace 错误；图片只出现在 `public/media/b2b/`。

---

### Task 4: 建立共享 B2B Header、Footer 和路由壳层

**Files:**
- Create: `src/components/core/vithelo-b2b-site-frame.tsx`
- Create: `src/components/core/vithelo-b2b-site-frame.module.css`
- Create: `tests/unit/vithelo-b2b-site-frame.test.tsx`
- Modify: `src/components/core/route-shell.tsx`
- Modify: `tests/unit/route-shell.test.tsx`

- [ ] **Step 1: 写共享导航和 RouteShell 失败测试**

Create `tests/unit/vithelo-b2b-site-frame.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

it("renders one shared B2B navigation and request quote path", () => {
  render(<VitheloB2BSiteFrame content={vitheloB2BSite}><main>Page body</main></VitheloB2BSiteFrame>);
  expect(screen.getByRole("link", { name: "VITHELO home" })).toHaveAttribute("href", "/");
  for (const [label, href] of [["Products", "/products"], ["OEM / ODM", "/oem-odm"], ["Insights", "/insights"], ["Contact", "/contact"]]) {
    expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute("href", href);
  }
  expect(screen.getByRole("link", { name: "Request Quote" })).toHaveAttribute("href", "/contact");
  expect(screen.getByText(/Factory-owned overseas brand/)).toBeVisible();
});
```

Modify `tests/unit/route-shell.test.tsx` so the bypass test covers the exact B2B set:

```tsx
it.each(["/", "/products", "/oem-odm", "/insights", "/insights/gummy-development-guide", "/contact"])(
  "does not duplicate the legacy chrome on %s",
  (pathname) => {
    navigationState.pathname = pathname;
    renderShell();
    expect(screen.getByText("Route content")).toBeVisible();
    expect(screen.queryByText("Global header")).not.toBeInTheDocument();
  },
);
```

- [ ] **Step 2: 运行测试并确认失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-site-frame.test.tsx tests/unit/route-shell.test.tsx
```

Expected: FAIL，因为 Site Frame 不存在且 RouteShell 只绕过 `/`。

- [ ] **Step 3: 创建共享 Site Frame**

Create `src/components/core/vithelo-b2b-site-frame.tsx`:

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import type { B2BSiteContent } from "@/content/schema";
import styles from "@/components/core/vithelo-b2b-site-frame.module.css";

type VitheloB2BSiteFrameProps = { children: ReactNode; content: B2BSiteContent };

function NavigationLinks({ items }: { items: B2BSiteContent["navigation"] }) {
  return items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>);
}

export function VitheloB2BSiteFrame({ children, content }: VitheloB2BSiteFrameProps) {
  return (
    <div className={styles.site} data-content-status={content.dataStatus}>
      <div className={styles.disclosure}>{content.disclosure}</div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="VITHELO home" className={styles.brand} href="/">VITHELO</Link>
          <nav aria-label="Primary navigation" className={styles.desktopNav}><NavigationLinks items={content.navigation} /></nav>
          <Link className={styles.quote} href={content.requestQuote.href}>{content.requestQuote.label}</Link>
          <details className={styles.mobileMenu}>
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation"><NavigationLinks items={content.navigation} /></nav>
          </details>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div><strong>VITHELO</strong><p>{content.identity}</p></div>
        <nav aria-label="Footer navigation"><NavigationLinks items={content.footerLinks} /></nav>
        <small>{content.disclosure}</small>
      </footer>
    </div>
  );
}
```

- [ ] **Step 4: 创建克制的共享壳层样式**

Create `src/components/core/vithelo-b2b-site-frame.module.css` with these requirements encoded as concrete rules:

```css
.site { --b2b-ivory: #f3f0e8; --b2b-paper: #faf8f2; --b2b-ink: #171918; --b2b-muted: #646761; --b2b-line: rgb(23 25 24 / 18%); --b2b-orange: #ec5b32; --b2b-navy: #102a43; min-height: 100dvh; overflow: clip; background: var(--b2b-ivory); color: var(--b2b-ink); font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }
.site * { box-sizing: border-box; }
.site a { color: inherit; }
.disclosure { padding: .55rem clamp(22px, 5vw, 72px); border-bottom: 1px solid var(--b2b-line); background: var(--b2b-paper); color: var(--b2b-muted); font-size: .6875rem; letter-spacing: .08em; text-transform: uppercase; }
.header { position: sticky; z-index: 20; top: 0; height: 5rem; border-bottom: 1px solid var(--b2b-line); background: rgb(250 248 242 / 92%); backdrop-filter: blur(16px); }
.headerInner { width: min(calc(100% - 64px), 1280px); height: 100%; margin-inline: auto; display: flex; align-items: center; gap: 2rem; }
.brand { min-height: 44px; display: inline-flex; align-items: center; color: var(--b2b-navy) !important; font-size: 1.5rem; font-weight: 750; letter-spacing: -.04em; text-decoration: none; }
.desktopNav { margin-left: auto; display: flex; align-items: center; gap: clamp(1.25rem, 3vw, 2.5rem); color: #334e68; font-size: .875rem; }
.desktopNav a, .footer a, .mobileMenu a { min-height: 44px; display: inline-flex; align-items: center; text-decoration: none; }
.desktopNav a { border-bottom: 1px solid transparent; }
.desktopNav a:hover, .desktopNav a:focus-visible { border-color: currentColor; }
.quote { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; padding-inline: 1.5rem; background: var(--b2b-orange); color: white !important; font-size: .875rem; font-weight: 650; text-decoration: none; }
.mobileMenu { display: none; margin-left: auto; }
.mobileMenu summary { min-width: 44px; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; list-style: none; }
.mobileMenu nav { position: absolute; top: 100%; right: 0; left: 0; display: grid; padding: 1rem 22px 1.5rem; border-bottom: 1px solid var(--b2b-line); background: var(--b2b-paper); }
.mobileMenu a { border-bottom: 1px solid var(--b2b-line); }
.footer { padding: 3.125rem clamp(22px, 6vw, 96px); display: grid; grid-template-columns: 1fr 1fr 1.25fr; gap: 2.5rem; background: #111312; color: #eae8e1; }
.footer strong { font-size: 1.5rem; letter-spacing: -.04em; }
.footer p, .footer small { color: #adb0aa; }
.footer nav { display: flex; flex-direction: column; }
@media (max-width: 900px) { .desktopNav, .quote { display: none; } .mobileMenu { display: block; } .headerInner { width: calc(100% - 44px); } .footer { grid-template-columns: 1fr; } }
@media (max-width: 760px) { .header { height: 4.5rem; } .disclosure { font-size: .625rem; } }
```

- [ ] **Step 5: 扩大 RouteShell 的精确绕过集合**

Modify `src/components/core/route-shell.tsx`:

```tsx
const isVitheloB2BRoute =
  pathname === "/" ||
  pathname === "/products" ||
  pathname === "/oem-odm" ||
  pathname === "/insights" ||
  pathname.startsWith("/insights/") ||
  pathname === "/contact";

if (isVitheloB2BRoute) return children;
```

- [ ] **Step 6: 运行单元测试**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-site-frame.test.tsx tests/unit/route-shell.test.tsx
pnpm.cmd typecheck
```

Expected: PASS。

---

### Task 5: 实现 Products 页面

**Files:**
- Create: `src/components/patterns/vithelo-products-page.tsx`
- Create: `src/components/patterns/vithelo-b2b-pages.module.css`
- Create: `src/app/products/page.tsx`
- Create: `tests/unit/vithelo-products-page.test.tsx`

- [ ] **Step 1: 写 Products 页面失败测试**

Create `tests/unit/vithelo-products-page.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

it("renders eight formats as one ledger without a carousel", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);
  const ledger = screen.getByTestId("format-ledger");
  expect(within(ledger).getAllByRole("article")).toHaveLength(8);
  expect(ledger).not.toHaveAttribute("data-carousel");
  expect(screen.getByText("Flexible MOQ based on formula and packaging.")).toBeVisible();
  expect(screen.getAllByText("Contact us for MOQ")).toHaveLength(2);
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx`

Expected: FAIL，因为页面组件不存在。

- [ ] **Step 3: 创建 Products Page Pattern**

Create `src/components/patterns/vithelo-products-page.tsx`. The component must:

```tsx
import Image from "next/image";
import Link from "next/link";
import type { B2BProductsPage } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";

export function VitheloProductsPage({ content }: { content: B2BProductsPage }) {
  const media = content.gummy.media;
  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}><p className={styles.kicker}>{content.hero.kicker}</p><h1>{content.hero.title}</h1><p className={styles.lede}>{content.hero.copy}</p></section>
      <section className={styles.splitSection}>
        <div><p className={styles.kicker}>GUMMY PLATFORM</p><h2>{content.gummy.title}</h2><p>{content.gummy.copy}</p></div>
        {media.status === "FREE_COMMERCIAL" ? <figure className={styles.media}><Image alt={media.alt} fill sizes="(max-width: 760px) 100vw, 50vw" src={media.src} /><figcaption>Product-form illustration · free commercial stock</figcaption></figure> : null}
        <div className={styles.detailLedger}>{content.gummy.dimensions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>
      <section className={styles.section}><p className={styles.kicker}>EIGHT FORMATS</p><h2>One manufacturing system, eight product formats.</h2><div className={styles.formatLedger} data-testid="format-ledger">{content.formats.map((format, index) => <article id={format.id} key={format.id}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{format.name}</h3><p>{format.fit}</p></div><ul>{format.customization.map((item) => <li key={item}>{item}</li>)}</ul><p>{format.packaging}</p><strong>{format.moq}</strong></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>FORMAT DECISIONS</p><h2>Choose by project fit, not appearance alone.</h2><div className={styles.simpleTable}>{content.comparison.map((row) => <article key={row.criterion}><h3>{row.criterion}</h3><p>{row.guidance}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>PACKAGING</p><h2>Align the pack with the product route.</h2><div className={styles.detailLedger}>{content.packaging.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div><p className={styles.moqNote}>{content.moqNote}</p></section>
      <section className={styles.cta}><h2>{content.cta.title}</h2><p>{content.cta.copy}</p><Link href={content.cta.href}>Start a Project</Link></section>
    </main>
  );
}
```

- [ ] **Step 4: 创建共享内页样式**

Create `src/components/patterns/vithelo-b2b-pages.module.css` with a restrained editorial system: `h1/h2` max 48px desktop and 36px mobile; section padding `clamp(64px, 7vw, 104px)`; format rows use borders and five desktop columns, collapsing to one column below 760px; media uses `position: relative`, `aspect-ratio: 3/2`, `object-fit: cover`; no rounded-card grid, high shadow, horizontal scrolling or `100vh` section.

The minimum required selectors are:

```css
.page { background: #f3f0e8; color: #171918; }
.hero, .section, .splitSection, .cta { width: min(calc(100% - 64px), 1280px); margin-inline: auto; padding-block: clamp(64px, 7vw, 104px); }
.hero h1, .section h2, .splitSection h2, .cta h2 { max-width: 850px; margin: 0; font-size: clamp(2.2rem, 4vw, 3rem); line-height: 1.05; letter-spacing: -.04em; }
.kicker { margin: 0 0 1.25rem; color: #586b65; font-size: .75rem; letter-spacing: .16em; text-transform: uppercase; }
.lede { max-width: 680px; margin-top: 1.5rem; color: #59605b; font-size: 1.0625rem; }
.splitSection { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(2rem, 6vw, 6rem); border-top: 1px solid rgb(23 25 24 / 18%); }
.media { position: relative; min-height: 360px; margin: 0; overflow: hidden; }
.media img { object-fit: cover; }
.media figcaption { position: absolute; right: 1rem; bottom: 1rem; padding: .4rem .55rem; background: rgb(250 248 242 / 88%); font-size: .6875rem; }
.detailLedger { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid rgb(23 25 24 / 18%); }
.detailLedger article { min-height: 130px; padding: 1.5rem; border-right: 1px solid rgb(23 25 24 / 18%); border-bottom: 1px solid rgb(23 25 24 / 18%); }
.formatLedger { margin-top: 3rem; border-top: 1px solid rgb(23 25 24 / 24%); }
.formatLedger article { display: grid; grid-template-columns: 56px 1.2fr 1.4fr 1fr 1fr; gap: 1.25rem; align-items: start; padding-block: 1.5rem; border-bottom: 1px solid rgb(23 25 24 / 24%); }
.formatLedger h3, .detailLedger h3, .simpleTable h3 { margin: 0; font-size: 1.15rem; }
.formatLedger p, .formatLedger ul, .detailLedger p, .simpleTable p { margin: .45rem 0 0; color: #646761; }
.simpleTable { margin-top: 3rem; border-top: 1px solid rgb(23 25 24 / 24%); }
.simpleTable article { display: grid; grid-template-columns: .7fr 1.3fr; gap: 2rem; padding-block: 1.5rem; border-bottom: 1px solid rgb(23 25 24 / 24%); }
.moqNote { margin-top: 2.5rem; font-size: 1.25rem; }
.cta { background: #ec5b32; }
.cta a { min-height: 48px; display: inline-flex; align-items: center; margin-top: 1.5rem; border-bottom: 1px solid currentColor; text-decoration: none; }
@media (max-width: 760px) { .hero, .section, .splitSection, .cta { width: calc(100% - 44px); padding-block: 64px; } .hero h1, .section h2, .splitSection h2, .cta h2 { font-size: 2.2rem; } .splitSection { grid-template-columns: 1fr; } .detailLedger { grid-template-columns: 1fr; } .formatLedger article { grid-template-columns: 44px 1fr; } .formatLedger article > :nth-child(n + 3) { grid-column: 2; } .simpleTable article { grid-template-columns: 1fr; gap: .5rem; } }
```

- [ ] **Step 5: 创建 `/products` route**

Create `src/app/products/page.tsx`:

```tsx
import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = { title: "Product Capabilities | VITHELO", description: "Gummy-first nutrition OEM and ODM capabilities across eight oral product formats." };

export default async function ProductsPage() {
  const [site, content] = await Promise.all([localContentAdapter.getB2BSiteContent(), localContentAdapter.getB2BProductsPage()]);
  return <VitheloB2BSiteFrame content={site}><VitheloProductsPage content={content} /></VitheloB2BSiteFrame>;
}
```

- [ ] **Step 6: 运行 Products 测试和构建型检查**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-products-page.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: PASS。

---

### Task 6: 实现 OEM / ODM 页面

**Files:**
- Create: `src/components/patterns/vithelo-oem-odm-page.tsx`
- Create: `src/app/oem-odm/page.tsx`
- Create: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`

- [ ] **Step 1: 写六步流程和质量边界失败测试**

```tsx
import { render, screen, within } from "@testing-library/react";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { vitheloB2BOemOdmPage } from "@/content/demo/vithelo-b2b-site";

it("renders one six-step project path and four quality checkpoints", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);
  expect(within(screen.getByTestId("oem-steps")).getAllByRole("article")).toHaveLength(6);
  expect(within(screen.getByTestId("quality-path")).getAllByRole("article")).toHaveLength(4);
  expect(screen.getByText(/factory-owned overseas brand/i)).toBeVisible();
  expect(document.body.textContent).not.toMatch(/certified|FDA approved|guaranteed/i);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx`

Expected: FAIL，因为组件不存在。

- [ ] **Step 3: 创建 OEM / ODM Page Pattern**

Create `src/components/patterns/vithelo-oem-odm-page.tsx`:

```tsx
import Link from "next/link";
import type { B2BOemOdmPage } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";

export function VitheloOemOdmPage({ content }: { content: B2BOemOdmPage }) {
  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}><p className={styles.kicker}>{content.hero.kicker}</p><h1>{content.hero.title}</h1><p className={styles.lede}>{content.hero.copy}</p></section>
      <section className={styles.section}><p className={styles.kicker}>DIRECT MANUFACTURING RELATIONSHIP</p><h2>{content.identity.title}</h2><p className={styles.lede}>{content.identity.copy}</p></section>
      <section className={styles.section}><p className={styles.kicker}>PROJECT PATH</p><h2>Six clear steps from brief to delivery.</h2><div className={styles.stepLedger} data-testid="oem-steps">{content.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>CUSTOM DEVELOPMENT</p><h2>Align the decisions that have to work together.</h2><div className={styles.detailLedger}>{content.customization.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>PRODUCTION SYSTEM</p><h2>A manufacturing route built from confirmed inputs.</h2><div className={styles.detailLedger}>{content.production.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>QUALITY PATH</p><h2>Quality is recorded through the project.</h2><div className={styles.simpleTable} data-testid="quality-path">{content.quality.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
      <section className={styles.section}><p className={styles.kicker}>PROJECT PREPARATION</p><h2>Five inputs make the first review useful.</h2><ol className={styles.checklist}>{content.checklist.map((item) => <li key={item}>{item}</li>)}</ol></section>
      <section className={styles.section}><p className={styles.kicker}>BUYER QUESTIONS</p><h2>What to clarify before production.</h2><div className={styles.faq}>{content.faqs.map((item) => <details key={item.title}><summary>{item.title}</summary><p>{item.copy}</p></details>)}</div></section>
      <section className={styles.cta}><h2>{content.cta.title}</h2><p>{content.cta.copy}</p><Link href={content.cta.href}>Start a Project</Link></section>
    </main>
  );
}
```

Append these exact selectors to `vithelo-b2b-pages.module.css`:

```css
.stepLedger { margin-top: 3rem; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); border-block: 1px solid rgb(23 25 24 / 24%); }
.stepLedger article { min-height: 220px; padding: 1.5rem 1rem; border-right: 1px solid rgb(23 25 24 / 18%); }
.stepLedger article:last-child { border-right: 0; }
.checklist { margin: 3rem 0 0; padding: 0; list-style-position: inside; border-top: 1px solid rgb(23 25 24 / 24%); }
.checklist li { padding: 1.25rem 0; border-bottom: 1px solid rgb(23 25 24 / 24%); }
.faq { margin-top: 3rem; border-top: 1px solid rgb(23 25 24 / 24%); }
.faq details { border-bottom: 1px solid rgb(23 25 24 / 24%); }
.faq summary { min-height: 56px; display: flex; align-items: center; cursor: pointer; font-size: 1.05rem; }
.faq p { max-width: 760px; padding-bottom: 1.25rem; color: #646761; }
@media (max-width: 1024px) { .stepLedger { grid-template-columns: repeat(3, minmax(0, 1fr)); } .stepLedger article:nth-child(3n) { border-right: 0; } }
@media (max-width: 760px) { .stepLedger { grid-template-columns: 1fr; } .stepLedger article { min-height: 0; border-right: 0; border-bottom: 1px solid rgb(23 25 24 / 18%); } }
```

- [ ] **Step 4: 创建 `/oem-odm` route**

Create `src/app/oem-odm/page.tsx`:

```tsx
import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "OEM / ODM | VITHELO",
  description: "A clear nutrition product path from requirement review and sampling to production and release.",
};

export default async function OemOdmPage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BOemOdmPage(),
  ]);
  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloOemOdmPage content={content} />
    </VitheloB2BSiteFrame>
  );
}
```

- [ ] **Step 5: 运行定向检查**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-oem-odm-page.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: PASS。

---

### Task 7: 实现 Insights Hub 和三篇动态内容页

**Files:**
- Create: `src/components/patterns/vithelo-insights-page.tsx`
- Create: `src/components/patterns/vithelo-insight-article.tsx`
- Create: `src/app/insights/page.tsx`
- Create: `src/app/insights/[slug]/page.tsx`
- Create: `tests/unit/vithelo-insights.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`

- [ ] **Step 1: 写索引、动态文章和缺失模块失败测试**

```tsx
import { render, screen } from "@testing-library/react";
import { VitheloInsightArticle } from "@/components/patterns/vithelo-insight-article";
import { VitheloInsightsPage } from "@/components/patterns/vithelo-insights-page";
import { vitheloB2BInsightsPage } from "@/content/demo/vithelo-b2b-site";

it("renders three published buyer resources with article links", () => {
  render(<VitheloInsightsPage content={vitheloB2BInsightsPage} />);
  expect(screen.getAllByRole("article")).toHaveLength(3);
  expect(screen.getByRole("link", { name: "How to Choose the Right Supplement Format" })).toHaveAttribute("href", "/insights/choose-the-right-supplement-format");
});

it("renders configured article blocks and omits unconfigured media actions", () => {
  render(<VitheloInsightArticle article={vitheloB2BInsightsPage.articles[0]} relatedArticles={vitheloB2BInsightsPage.articles.slice(1)} />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("How to Choose the Right Supplement Format");
  expect(screen.getByRole("table")).toBeVisible();
  expect(screen.queryByRole("button", { name: /download/i })).not.toBeInTheDocument();
  expect(screen.queryByText(/video not configured/i)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-insights.test.tsx`

Expected: FAIL，因为两个 Pattern 不存在。

- [ ] **Step 3: 创建 Insights Hub**

Create `src/components/patterns/vithelo-insights-page.tsx`:

```tsx
import Link from "next/link";
import type { B2BInsightsPage } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";

export function VitheloInsightsPage({ content }: { content: B2BInsightsPage }) {
  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}><p className={styles.kicker}>{content.hero.kicker}</p><h1>{content.hero.title}</h1><p className={styles.lede}>{content.hero.copy}</p></section>
      <section className={styles.section}>
        <p className={styles.kicker}>KNOWLEDGE AREAS</p>
        <div className={styles.categoryIndex}>{content.categories.map((category) => <span key={category}>{category}</span>)}</div>
        <div className={styles.articleIndex}>
          {content.articles.filter((article) => article.published).map((article) => (
            <article key={article.slug}>
              <div><span>{article.category}</span><small>{article.contentFormat} · Updated {article.updatedAt}</small></div>
              <div><h2><Link href={`/insights/${article.slug}`}>{article.title}</Link></h2><p>{article.summary}</p></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: 创建 Article Block renderer**

Create `src/components/patterns/vithelo-insight-article.tsx` with props `{ article: B2BInsightArticle; relatedArticles: B2BInsightArticle[] }`. Implement a `renderBlock` function with a switch that renders text sections, lists, an accessible table with caption/head/body, callout aside, encoded Contact CTA, free-media `next/image`, native FAQ details, and `null` for `NOT_CONFIGURED` video/download blocks. Render the article header with byline, date, content format and `DEMO_ONLY`; after all blocks, render the supplied related article links and one final encoded Contact CTA.

Use this exact URL construction for every article CTA:

```ts
const contactHref = `/contact?subject=${encodeURIComponent(article.title)}`;
```

Use this exact table structure:

```tsx
<table>
  <caption>{block.title}</caption>
  <thead><tr>{block.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
  <tbody>{block.rows.map((row, rowIndex) => <tr key={`${block.title}-${rowIndex}`}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
</table>
```

- [ ] **Step 5: 创建 Hub route**

Create `src/app/insights/page.tsx`:

```tsx
import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloInsightsPage } from "@/components/patterns/vithelo-insights-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = { title: "Insights | VITHELO", description: "Practical guidance for nutrition product development, formats, packaging and manufacturing decisions." };

export default async function InsightsPage() {
  const [site, content] = await Promise.all([localContentAdapter.getB2BSiteContent(), localContentAdapter.getB2BInsightsPage()]);
  return <VitheloB2BSiteFrame content={site}><VitheloInsightsPage content={content} /></VitheloB2BSiteFrame>;
}
```

Append concrete border-based `.categoryIndex`, `.articleIndex`, `.articleBody`, `.articleTable`, `.articleCallout` and `.relatedArticles` rules to the shared page CSS. Tables must wrap inside an overflow container only on narrow screens; the whole page must not scroll horizontally.

- [ ] **Step 6: 创建 Next.js 16 dynamic route**

Create `src/app/insights/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloInsightArticle } from "@/components/patterns/vithelo-insight-article";
import { localContentAdapter } from "@/lib/content";

export async function generateStaticParams() {
  return (await localContentAdapter.listPublishedB2BInsights()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await localContentAdapter.getB2BInsightBySlug(slug);
  return article ? { title: `${article.title} | VITHELO`, description: article.summary } : { title: "Insight Not Found | VITHELO" };
}

export default async function InsightPage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const [site, article, publishedArticles] = await Promise.all([localContentAdapter.getB2BSiteContent(), localContentAdapter.getB2BInsightBySlug(slug), localContentAdapter.listPublishedB2BInsights()]);
  if (!article) notFound();
  const relatedArticles = publishedArticles.filter((item) => item.slug !== article.slug);
  return <VitheloB2BSiteFrame content={site}><VitheloInsightArticle article={article} relatedArticles={relatedArticles} /></VitheloB2BSiteFrame>;
}
```

- [ ] **Step 7: 运行 Insights 定向检查**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-insights.test.tsx
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: PASS；build 输出三个静态 Insights 参数页面；未知 slug 返回 404。

---

### Task 8: 替换 Contact 为 B2B 项目需求前端

**Files:**
- Create: `src/components/patterns/vithelo-contact-page.tsx`
- Modify: `src/app/contact/page.tsx`
- Create: `tests/unit/vithelo-contact-page.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`

- [ ] **Step 1: 写八字段和配置状态失败测试**

```tsx
import { render, screen } from "@testing-library/react";
import { VitheloContactPage } from "@/components/patterns/vithelo-contact-page";
import { vitheloB2BContactPage } from "@/content/demo/vithelo-b2b-site";

it("shows the complete disabled project form and no invented contact target", () => {
  render(<VitheloContactPage content={vitheloB2BContactPage} initialFormat="Gummies" initialSubject="Gummy development" />);
  expect(screen.getByRole("group", { name: "Project requirements" })).toBeDisabled();
  for (const label of vitheloB2BContactPage.fields) expect(screen.getByLabelText(label)).toBeDisabled();
  expect(screen.getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
  expect(screen.queryByRole("link", { name: "Email" })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "WhatsApp" })).not.toBeInTheDocument();
  expect(screen.getByText(/not configured/i)).toBeVisible();
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `pnpm.cmd test -- tests/unit/vithelo-contact-page.test.tsx`

Expected: FAIL，因为 Pattern 不存在。

- [ ] **Step 3: 创建 Contact Pattern**

Create `src/components/patterns/vithelo-contact-page.tsx`:

```tsx
import type { B2BContactPage } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";

type Props = { content: B2BContactPage; initialFormat?: string; initialSubject?: string };

export function VitheloContactPage({ content, initialFormat = content.formats[0], initialSubject = "" }: Props) {
  const [name, email, market, format, formula, packaging, volume, brief] = content.fields;
  return (
    <main className={styles.page} data-contact-state={content.status} data-content-status={content.dataStatus}>
      <section className={styles.hero}><p className={styles.kicker}>{content.hero.kicker}</p><h1>{content.hero.title}</h1><p className={styles.lede}>{content.hero.copy}</p></section>
      <section className={styles.contactGrid}>
        <fieldset aria-describedby="contact-status" aria-label="Project requirements" disabled>
          <label>{name}<input name="name" type="text" /></label>
          <label>{email}<input name="email" type="email" /></label>
          <label>{market}<input name="market" type="text" /></label>
          <label>{format}<select defaultValue={initialFormat} name="format">{content.formats.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>{formula}<input name="formula" type="text" /></label>
          <label>{packaging}<input name="packaging" type="text" /></label>
          <label>{volume}<input name="volume" type="text" /></label>
          <label>{brief}<textarea defaultValue={initialSubject} name="brief" /></label>
        </fieldset>
        <aside>
          <div className={styles.contactRow}><span>Email</span><strong>NOT_CONFIGURED</strong></div>
          <div className={styles.contactRow}><span>WhatsApp</span><strong>NOT_CONFIGURED</strong></div>
          <p id="contact-status">{content.pendingMessage}</p>
          <button disabled type="button">Inquiry submission not configured</button>
        </aside>
      </section>
    </main>
  );
}
```

Add CSS for `.contactGrid`, its fieldset, labels, inputs, select, textarea, status rows and disabled button. Use a two-column desktop layout and one column below 760px; every visible control remains at least 44px high. Do not render `mailto:`, `wa.me`, a server action or an `onSubmit` handler.

- [ ] **Step 4: 替换 `/contact` server route**

Replace `src/app/contact/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloContactPage } from "@/components/patterns/vithelo-contact-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = { title: "Start a Project | VITHELO", description: "Prepare a nutrition OEM or ODM project brief for VITHELO." };
type ContactPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const firstValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const [site, content] = await Promise.all([localContentAdapter.getB2BSiteContent(), localContentAdapter.getB2BContactPage()]);
  const requestedFormat = firstValue(query.format)?.trim().slice(0, 120);
  const initialFormat = content.formats.includes(requestedFormat ?? "") ? requestedFormat : content.formats[0];
  const initialSubject = firstValue(query.subject)?.trim().slice(0, 120) ?? "";
  return <VitheloB2BSiteFrame content={site}><VitheloContactPage content={content} initialFormat={initialFormat} initialSubject={initialSubject} /></VitheloB2BSiteFrame>;
}
```

- [ ] **Step 5: 运行 Contact 定向检查**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-contact-page.test.tsx tests/unit/inquiry-links.test.ts tests/unit/site-config.test.ts
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: PASS；既有联系配置工具仍可留给旧代码，但新 Contact 不创建虚假链接。

---

### Task 9: 把冻结首页接入共享站点导航而不改变 11 板块

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Modify: `src/app/page.tsx`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/e2e/core-journeys.spec.ts`

- [ ] **Step 1: 先把首页测试改成新站点语义**

Require:

- `main > section` IDs remain exactly the approved 11-item sequence.
- Home Pattern no longer renders its own header or footer.
- Hero primary action is `/contact`; secondary action is `/products`.
- Site Frame owns Products、OEM / ODM、Insights、Contact and Request Quote.
- Frozen standalone hash remains unchanged.

- [ ] **Step 2: 运行并确认测试失败**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: FAIL，原因是首页仍使用锚点导航并自带 Header/Footer。

- [ ] **Step 3: 只移除首页内部重复壳层**

In `vithelo-b2b-home.tsx`, remove the top `<header>` and bottom `<footer>` only. Keep the `<main>` and all 11 `<section>` blocks unchanged. Remove only `.header`, `.headerInner`, `.brand`, `.navigation`, `.headerAction` and `.footer` rules that become unused; do not reformat adjacent section CSS.

Because the shared Site Frame adds a 5rem header and an approximately 2rem disclosure row, change only the desktop hero height contract to:

```css
.hero {
  min-height: min(520px, calc(100svh - 7rem));
  height: min(680px, calc(100svh - 7rem));
  max-height: 680px;
}
```

Keep the existing mobile hero media rules. At 1440×720, disclosure + header + hero must end at or above the viewport bottom, not below it.

- [ ] **Step 4: 把首页 CTA 改为页面路由**

In the home schema and fixture:

```ts
primaryAction: { label: "Start a Project", href: "/contact" },
secondaryAction: { label: "Explore Formats", href: "/products" },
```

Remove `navigation` and `footer` from `VitheloB2BHomeContentSchema` and the fixture because the shared Site record now owns them.

Reorder only the final three dosage records so the homepage and Products page use the confirmed sequence `Liquids`, `Functional Gum`, `Oral Films`; do not change their names or MOQ text.

- [ ] **Step 5: 在根 route 组合首页与 Site Frame**

```tsx
export default async function HomePage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BHomeContent(),
  ]);
  return <VitheloB2BSiteFrame content={site}><VitheloB2BHome content={content} /></VitheloB2BSiteFrame>;
}
```

- [ ] **Step 6: 验证首页只发生导航边界变化**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-site-frame.test.tsx
pnpm.cmd test:e2e -- --grep "home navigation|approved eleven|frozen"
Get-FileHash -Algorithm SHA256 -LiteralPath 'vithelo-homepage-work\VITHELO_Homepage_FullPreview_V1.html'
```

Expected: tests PASS；冻结 HTML hash 完全不变；首页 11 个 section 数量和顺序不变。

---

### Task 10: 更新 metadata、Sitemap 和旧路由退出机制

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: `next.config.ts`
- Modify: `tests/unit/metadata-brand.test.ts`
- Modify: `tests/unit/seo-routes.test.ts`

- [ ] **Step 1: 写新公开路由失败测试**

Update `tests/unit/seo-routes.test.ts` so configured origin expects exactly:

```ts
[
  "https://vithelo.example/",
  "https://vithelo.example/products",
  "https://vithelo.example/oem-odm",
  "https://vithelo.example/insights",
  "https://vithelo.example/insights/choose-the-right-supplement-format",
  "https://vithelo.example/insights/prepare-for-an-oem-odm-project",
  "https://vithelo.example/insights/gummy-development-guide",
  "https://vithelo.example/contact",
]
```

Assert old nutrition, aesthetic, science, professional, cart, checkout, account and search URLs are absent.

- [ ] **Step 2: 运行并确认失败**

Run: `pnpm.cmd test -- tests/unit/seo-routes.test.ts tests/unit/metadata-brand.test.ts`

Expected: FAIL，因为 Sitemap 和 metadata 仍描述旧站。

- [ ] **Step 3: 更新 metadata**

Use:

```ts
title: "VITHELO | Nutrition OEM / ODM",
description: "Gummy-first nutrition product development and manufacturing across eight oral formats.",
openGraph: {
  title: "VITHELO | Nutrition OEM / ODM",
  description: "Gummy-first nutrition product development and manufacturing across eight oral formats.",
  siteName: "VITHELO",
  type: "website",
  url: "/",
},
```

Do not add a country name.

- [ ] **Step 4: 更新 Sitemap**

`sitemap()` must return an empty array without `NEXT_PUBLIC_SITE_URL`. With a valid origin, combine the five static routes (`/`, `/products`, `/oem-odm`, `/insights`, `/contact`) with `listPublishedB2BInsights()`. Do not call the legacy product adapter for Sitemap.

- [ ] **Step 5: 更新 robots 和重定向**

Keep the no-origin full disallow behavior. With an origin, disallow `/account`, `/cart`, `/checkout`, `/search`, `/nutrition`, `/aesthetic-technology`, `/science`, `/professional`, `/learn` and `/support`.

After new route tests pass, add permanent redirects in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/nutrition/:path*", destination: "/products", permanent: true },
      { source: "/aesthetic-technology/:path*", destination: "/products", permanent: true },
      { source: "/science", destination: "/insights", permanent: true },
      { source: "/learn", destination: "/insights", permanent: true },
      { source: "/professional", destination: "/oem-odm", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/cart", destination: "/contact", permanent: true },
      { source: "/checkout", destination: "/contact", permanent: true },
      { source: "/account", destination: "/contact", permanent: true },
      { source: "/search", destination: "/insights", permanent: true },
    ];
  },
};
```

- [ ] **Step 6: 运行 SEO 测试和 build**

Run:

```powershell
pnpm.cmd test -- tests/unit/seo-routes.test.ts tests/unit/metadata-brand.test.ts
pnpm.cmd build
```

Expected: PASS；build route manifest contains the new routes and redirects.

---

### Task 11: 全站 E2E、视觉验收和交付门槛

**Files:**
- Create: `tests/e2e/vithelo-b2b-site.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/core-journeys.spec.ts`
- Modify: `tests/e2e/demo-integrity.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/inquiry-journeys.spec.ts`
- Modify: `docs/visual-qa.md`

- [ ] **Step 1: 添加 B2B 主路径 E2E**

The new spec must test:

1. Header reaches Products、OEM / ODM、Insights、Contact.
2. Products has exactly eight visible format rows and no horizontal overflow.
3. OEM / ODM has six visible steps and four quality nodes.
4. Insights has three published links; each article loads; an unknown slug returns the existing 404 state.
5. Contact exposes eight disabled fields, disabled submit, no `mailto:` and no `wa.me`.
6. New public pages contain no American-market wording, fake certification wording or forbidden dash characters.
7. Free images have non-empty alt text and are never labelled as VITHELO factory evidence.

- [ ] **Step 2: 把现有六视口循环改为新公开路由**

Use this route list in responsive and integrity suites:

```ts
const routes = [
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/insights/choose-the-right-supplement-format",
  "/insights/prepare-for-an-oem-odm-project",
  "/insights/gummy-development-guide",
  "/contact",
] as const;
```

Keep legacy component unit tests until redirect acceptance passes; remove only e2e journeys that can no longer reach redirected legacy pages.

- [ ] **Step 3: 运行全量质量门槛**

Run in this order:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Expected: every command exits 0。Playwright 应在六个配置视口完成，无 P0/P1、横向溢出、遮挡、裁切、失效交互或未标记事实。

- [ ] **Step 4: 做本地视觉复核并记录证据**

Inspect at minimum 1440×1000、1024×768、390×844:

- Header and first viewport density remain close to the approved Seed-like editorial scale.
- `h1/h2` do not exceed the locked page scale.
- Product ledger remains one page section, not eight screen-height panels.
- No rounded-card wall, high shadow, scroll-jacking or horizontal slider appears.
- Contact remains visibly incomplete rather than appearing operational.
- All free imagery is clearly product-form illustration.

Append route, viewport, result and screenshot path to `docs/visual-qa.md` without rewriting unrelated historical evidence.

- [ ] **Step 5: 最终范围和冻结文件检查**

Run:

```powershell
git diff --check
git status --short
Get-FileHash -Algorithm SHA256 -LiteralPath 'vithelo-homepage-work\VITHELO_Homepage_FullPreview_V1.html'
```

Expected:

- SHA256 remains `CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649`。
- No unrelated file is staged or modified by this implementation.
- Do not commit or push. Present the verified diff and test results to the user, then wait for explicit Git authorization.

## 计划自检映射

- Spec 1-3：Tasks 1、2、4、9。
- Products：Tasks 2、3、5。
- OEM / ODM：Tasks 2、6。
- Insights Hub 与 Article Blocks：Tasks 2、7。
- Contact 与配置边界：Task 8。
- 信任与免费素材：Tasks 2、3、11。
- 视觉、交互、Reduced Motion 与六视口：Tasks 4-11，最终由 Task 11 收口。
- 内容层、Zod、adapter、`DEMO_ONLY`、`NOT_CONFIGURED`：Tasks 1、2、8。
- 旧路由、Sitemap、metadata：Task 10。
- 全量 Definition of Done：Task 11。

## 执行纪律

- 每个 Task 只修改列出的文件；发现相邻旧代码问题时记录，不顺手重构。
- 每个失败测试必须先看到预期失败，再写最小实现。
- 每个 Task 结束后运行定向测试和 `git diff --check`。
- 用户未明确说“提交 Git”时，所有 commit 步骤统一停在工作树检查。
- 任一页面出现范围歧义，回到已确认规格，不自行增加页面、交互或商业承诺。
