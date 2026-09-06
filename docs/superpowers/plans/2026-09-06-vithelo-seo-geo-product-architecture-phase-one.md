# VITHELO SEO/GEO Product Architecture Phase One Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use the execution-plan workflow and complete each checkbox with verification before moving to the next task.

**Goal:** 将 VITHELO 的 Products、OEM / ODM、Manufacturing、Quality 和 Insights 统一到可核验的页面归属与 Product Entity 架构，为后续 Products 重构提供稳定 contract。

**Architecture:** 先以文档冻结页面职责、九剂型和六功能方向，再在 Zod schema 与 content adapter 中落 Product Entity；页面只消费 validated content，不在 route 或 pattern 中硬编码产品事实。旧 `/quality` 和既有产品 URL 暂时保留兼容策略，直到真实数据与迁移关系确认。

**Tech Stack:** Next.js App Router、TypeScript、Zod、Vitest、Playwright、Markdown 内容治理文档。

---

## 当前已完成的 Phase 1 文档基线

- [x] `docs/PAGE_CONTENT_OWNERSHIP.md`：冻结主题主归属和禁止重复。
- [x] `docs/PRODUCT_INFORMATION_ARCHITECTURE.md`：定义 Product Entity、九剂型、六 benefit、筛选、URL、详情页和内链规则。
- [x] `docs/PAGE_RESTRUCTURE_AUDIT.md`：记录当前 Products schema、fixture、路由和页面重复问题。
- [x] `docs/EVIDENCE_ASSET_LIBRARY.md`：记录候选图片、页面匹配和 `IMAGE_REQUIRED` 缺口。

## Task 1：冻结真实产品数据输入边界

**Files:**

- Read: `docs/data-governance.md`
- Read: `docs/missing-production-inputs.md`
- Read: `docs/FACTS_TO_VERIFY.md`
- Modify: `docs/BUYER_DATA_INTAKE.md` only when a confirmed business input is supplied

- [ ] 建立产品数据输入表：每条 Product Entity 至少有名称、剂型、benefit、category、application、图片状态和来源。
- [ ] 没有真实产品清单时只保留 contract 与 `NOT_CONFIGURED` 记录，不用现有营销句子批量生成具体产品。
- [ ] 将 `liquids`、`functional-gum`、`softgels` 与新九剂型的对应关系标为待确认，不直接等价映射。

验证：审阅 `docs/FACTS_TO_VERIFY.md`，确认没有把用户提供资料写成已批准的 VITHELO 事实。

## Task 2：新增 Product Entity contract

**Files:**

- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `src/lib/adapters/content-adapter.ts` only if adapter surface needs the new collection
- Test: `tests/unit/vithelo-products-page.test.tsx`
- Test: new `tests/unit/product-entity.test.ts`

- [ ] 在 schema 中新增受控 `DosageFormIdSchema`、`BenefitIdSchema`、`ProductCategorySchema` 和 `ProductEntitySchema`。
- [ ] Product Entity 使用多值 `form`、多值 `benefit`、`human | pet` category、application、positioning、media、status 和 relationship IDs。
- [ ] 将公开数据状态与 `DEMO_ONLY` / `NOT_CONFIGURED` 保持一致；没有 `APPROVED` 业务数据前，不在 demo fixture 中伪造已批准产品。
- [ ] 为九剂型和六 benefit 增加 contract 测试，验证非法 ID、空数组和 pet/product 关系不会静默通过。

验证：运行 `pnpm.cmd test -- product-entity vithelo-products-page`，预期所有相关测试通过。

## Task 3：实现纯函数筛选器

**Files:**

- Create: `src/lib/product-filter.ts`
- Test: `tests/unit/product-filter.test.ts`

- [ ] 实现 `filterProductEntities(products, { forms, benefits })`。
- [ ] 同一筛选维度使用 OR，form 与 benefit 两个维度使用 AND。
- [ ] 覆盖无筛选、只筛 form、只筛 benefit、组合筛选、无结果和清除状态。
- [ ] 筛选器只处理 validated Product Entity，不包含 URL、DOM 或页面文案逻辑。

验证：运行 `pnpm.cmd test -- product-filter`，预期 6 类逻辑全部通过。

## Task 4：重构 Products 页面职责

**Files:**

- Modify: `src/app/products/page.tsx`
- Modify: `src/components/patterns/vithelo-products-page.tsx`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Test: `tests/unit/vithelo-products-page.test.tsx`
- Test: `tests/e2e/core-journeys.spec.ts`

- [ ] Hero 改为 `Supplement Product Portfolio` 方向，删除 Products 对 OEM 流程的主体解释。
- [ ] 用双筛选 Product Discovery 替换旧 `DosageFormatCapability` 账本。
- [ ] 展示九剂型入口和六功能方向入口；没有真实实体时显示明确缺失状态。
- [ ] Product card 只显示图片、名称、form tag、benefit tag、positioning 和 View Details。
- [ ] 移出 Products 的 Formula Development、Packaging Customization、Sampling、Manufacturing Process、Quality System 和 MOQ 主体内容。
- [ ] 保留 `Start a Project`、Email、WhatsApp 入口，不改 Header、Navigation、Mega Menu 或主 URL 结构。

验证：桌面和移动端检查键盘筛选、无结果状态、Reduced Motion、44px 目标、无横向溢出和询盘 CTA。

## Task 5：建立详情页与兼容 URL

**Files:**

- Modify: `src/app/products/[slug]/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts` only if canonical/indexing rules require it
- Modify: `src/content/schema.ts`
- Test: `tests/unit/seo-routes.test.ts`
- Test: `tests/e2e/core-journeys.spec.ts`

- [ ] 让详情页从 Product Entity 关系读取，而不是从任意 slug 生成通用页面。
- [ ] 明确 `/products/{form}` 与 `/products/{form}/{product-slug}` 的 canonical 和 sitemap 规则。
- [ ] 为旧 `softgels`、旧八剂型链接和未来新路径建立显式兼容策略；未确认的路径不直接 301 到错误产品。
- [ ] 详情页链接回 `/oem-odm`、`/manufacturing` 和 `/contact`，不复制这些页面的主体内容。

验证：运行 `pnpm.cmd typecheck`、`pnpm.cmd test -- seo-routes`，并检查旧链接不产生意外 404。

## Task 6：按归属表收敛 OEM / ODM 与 Manufacturing

**Files:**

- Modify: `src/components/patterns/vithelo-oem-odm-page.tsx`
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `src/components/patterns/vithelo-information-page.tsx`
- Modify: `src/app/manufacturing/page.tsx`
- Modify: `src/app/quality/page.tsx` only for compatibility/redirect decision
- Test: `tests/unit/vithelo-oem-odm-page.test.tsx`
- Test: new `tests/unit/page-ownership.test.ts`

- [ ] OEM / ODM 采用 Product Concept → Formula Development → Dosage Form Selection → Packaging → Sampling → Scale Production → Brand Launch 路径。
- [ ] Manufacturing 承担 Facilities、Production Capabilities、Process、Quality Control 和可核验证据。
- [ ] Quality 是否合并只在兼容路由方案明确后执行；不删除 `/quality` 入口。
- [ ] 用测试阻止 Products fixture 再次出现 OEM workflow、包装定制和制造质量主体段落。

验证：页面内容 ownership 检查通过，相关页面的 CTA 和内部链接不变。

## Task 7：证据资产发布闸门

**Files:**

- Modify: `docs/EVIDENCE_ASSET_LIBRARY.md`
- Modify: `docs/EVIDENCE_APPROVAL_QUEUE.md`
- Modify: `docs/CONTENT_EVIDENCE_MATRIX.md`
- Assets: `assets/evidence/` only after explicit source/authorization review

- [ ] 每个候选资产记录来源、脱敏状态、页面、section、用途、公开状态和审核人。
- [ ] 资产未通过脱敏和授权前保持 `_needs-review`，不从页面公开引用。
- [ ] 缺图页面使用 `IMAGE_REQUIRED`，不生成假工厂、假证书或假产品证据。
- [ ] 文件名保持描述性，不把未经核验的能力、认证、客户或结果写入文件名。

验证：运行资产完整性检查，确认公开页面不引用源公司名称、原 logo、证照编号、地址或未核验数据。

## Task 8：全量验收

**Files:**

- Read: `docs/acceptance.md`
- Read: `docs/current-status.md`
- Modify: `docs/PAGE_RESTRUCTURE_AUDIT.md`
- Modify: `docs/current-status.md` only after user accepts the changed screen/page

- [ ] `pnpm.cmd lint`
- [ ] `pnpm.cmd typecheck`
- [ ] `pnpm.cmd test`
- [ ] `pnpm.cmd test:e2e`
- [ ] `pnpm.cmd build` under Node 20.x clean install
- [ ] 六个验收视口均达到 P0 = 0、P1 = 0；导航、Hero 锁定规则和询盘路径回归通过。
- [ ] 用户明确接受本轮 Products 屏幕后，才更新项目状态并进入下一页面。
