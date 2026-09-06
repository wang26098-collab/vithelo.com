# SEO / GEO Growth State

最后更新：2026-09-05

## Current Growth Phase

Phase 2：Founder-Stage Measurement / Evidence / Search Readiness。十篇 P1 Insights 保持冻结，不自动进入 Batch 4。

## Published P1 Content

- How to Choose the Right Supplement Format（improved）
- What to Prepare Before Starting an OEM / ODM Project（improved）
- Gummy Development: Formula, Texture, Shape and Packaging（improved）
- How to Evaluate a Supplement Manufacturer（new）
- Private Label vs Custom Formulation: Which Route Fits Your Project?
- How Supplement Sampling Typically Works
- Gummies vs Hard Capsules for Private-Label Projects
- What Documents Should Supplement Buyers Ask For?
- What Information Should You Include in a Supplement RFQ?
- How Packaging Affects Supplement MOQ and Lead Time

## Content Portfolio

- Dosage Form Guides：3 篇。已有总 format guide、gummy development 与 gummies / hard capsules 二选一；当前不缺更多泛剂型覆盖。
- Product Development：3 篇。项目准备、private label / custom 与 sampling 分工明确，暂未发现主体重复。
- Buyer Guides：3 篇。manufacturer evaluation、RFQ 与 packaging commercial variables 已覆盖三类 decision-stage 任务。
- Manufacturing & Quality：1 篇独立 documents guide，并由 manufacturer evaluation 提供上层入口。Quality coverage 已建立，但仍受真实文件和认证证据不足限制。
- 结论：四大 Cluster 没有严重失衡；Dosage 内容不应继续优先扩张。十篇内容后，提升证据强度、真实 Buyer Questions 与 measurement readiness 的边际价值高于惯性 Batch 4。

## Content Gaps

- Sample-to-scale-up 期间必须保持受控的规格与变更记录。
- 不依赖 badges 的跨供应商比较方法可继续深化，但需避免与 manufacturer evaluation 重复。
- Softgels vs Hard Capsules 仍是有效剂型问题，但在当前 portfolio 中商业优先级低于证据与 measurement gaps。
- 真实销售问句、异议和 RFQ 原话仍为空白。

剩余候选重新评级：Sample-to-Scale-Up 是数据/外部输入均阻塞时的最佳备用结构缺口，但仍为 `HOLD`；Supplier comparison 与既有 Manufacturer Evaluation 重复风险高，优先 consolidation；Softgels vs Hard Capsules 保持 `REASSESS`，没有真实需求支持。

## Evidence Gaps

公司主体、地址、设施、人员、年限、产能、客户覆盖、认证、MOQ、sampling time、lead time、质量文件和实验室证据均未完成公开授权。所有 C2/C3 内容继续阻塞。

`EVIDENCE_APPROVAL_QUEUE.md` 已按 P0 identity/certification、P1 manufacturing/quality/R&D evidence、P2 business numbers 排序。队列建立不改变任何 claim 的公开状态。

## Internal-Link Gaps

Quality 已反链 Documents Guide；Contact 已反链 RFQ Guide；Products 与 OEM 已反链 Packaging / MOQ / Timing Guide。Batch 1–3 的主要 Commercial ↔ Insight 路径已形成。后续只在真实行为数据或明显孤岛出现时继续加链，避免把商业页变成文章目录。

## Measurement Status

Measurement contract READY，provider/data PENDING。`src/lib/analytics.ts` 提供 provider-neutral business event 与显式 no-op adapter；页面浏览统一由未来 provider 的 `page_view` 承担，未配置 GA4、Search Console、Bing Webmaster、consent solution 或 AI citation provider。

四层模型与事件语义见 `MEASUREMENT_SPEC.md`。AI query baseline 已建立，但所有 citation status 为 `NOT MEASURED`。不得声称流量、排名、conversion 或 AI visibility 改善。

## Real Buyer Data Status

Intake model READY，data PENDING。`BUYER_DATA_INTAKE.md` 已定义统一 source taxonomy、去标识化字段与 PII 禁止项；当前真实 Buyer Data 为 0，Founder Hypothesis 样本为 0，均属正常 Founder Stage 状态，不阻塞 Growth，也不标记 frequency。

## Growth Decision Rules

未来只有满足至少一个条件才新增或大幅扩写 Insight：真实 Buyer Question、Search Console opportunity、AI citation gap、明确商业页知识缺口、强 evidence/expertise opportunity、重要 cannibalization consolidation need。仅有“关键词看起来不错”不构成发布理由。

## Next Highest-Leverage Action

INTERNAL READINESS COMPLETE。Owner input available paths：1) 确认 production hostname；2) Search Console access；3) business identity / site / certification evidence approval；4) 可选地提供自然出现的去标识化 Buyer Question。Buyer input 不是 blocker；GA4 与 Bing 属于后续行为/搜索扩展。没有新输入前不接外部 provider、不发布 C2/C3，也不以更多文章填充时间。

## Latest Verification

- `pnpm.cmd test --run`：33 个测试文件、114 项通过；包含 no-provider、page_view/action event 词汇与 payload 透传测试。
- `pnpm.cmd lint`：通过。
- `pnpm.cmd typecheck`：通过。
- `pnpm.cmd build`：通过；生成 44 个静态页面，其中 10 个 Insight 路由完成静态生成。
- 完整 Playwright E2E（production build，6 个验收视口）：231 项通过、15 项按视口条件跳过、0 项失败。
- Batch 3 Quality Gate 分类：未发现新的产品缺陷；文章数量、公开路由与 sitemap 期望更新为 UPDATED STALE TEST。既有导航与 Home 修复保持通过。
- 当前运行时为 Node 24.16.0；Node 20.x clean install 仍是部署环境验证项。
- Phase 2 本轮没有页面行为或路由变化，因此沿用 Batch 3 完整 E2E baseline；未为文档与未接线 adapter 重跑仪式性浏览器测试。
