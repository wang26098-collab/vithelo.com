# VITHELO 项目状态

最后更新：2026-09-04

## 当前阶段

第六阶段最终收口：Core Site Closure / Release Readiness。

## Core Site Status

CORE SITE STATUS: GROWTH-READY

## 当前实现

- Next.js App Router + TypeScript + Zod 内容适配层。
- 公开核心路由：`/`、`/products`、`/oem-odm`、`/manufacturing`、`/quality`、`/about`、`/insights`、`/contact`。
- 首页已包含 Hero、八种剂型、单一制造证明区、软糖能力、项目路径和 Start a Project。
- 询盘采用浏览器生成预填 Email / WhatsApp，不在站内保存数据。

## 当前事实

- 移除未核实的 “factory-owned / export division” 公开身份表述。
- 增加回归测试，防止该类身份表述再次进入公开 demo 内容。
- 本地预览已验证：首页标题为 `Nutrition formats, built for private-label growth.`。
- 新增 Manufacturing、Quality、About 核心页面及 metadata/canonical。
- 导航与 sitemap 已接入三条核心入口；首页制造证据区新增 contextual links。
- 内容 schema 已从固定 4 项导航扩展为 4–7 项，保留最小约束。
- Products Hub 已接入共享动态路由 `/products/[slug]`，8 个剂型均生成静态页面、独立 metadata、breadcrumb 与 BreadcrumbList。

## 当前状态

- Manufacturing、Quality、About 独立入口：DONE。
- 导航与 sitemap 核心入口：DONE。
- Products Hub：DONE；8-format discovery 满足当前核心采购任务。
- Products dosage-form routes：DONE；页面内容基于已验证格式记录，未生成成分或功效差异。
- 首页顺序与 Manufacturing Proof / Capacity 合并：DONE；JSX/DOM 顺序与视觉采购顺序一致，已移除整页 CSS order。
- Start a Project RFQ：PARTIAL；浏览器预填 Email / WhatsApp，无服务端 provider。
- RFQ domain schema：DONE；统一 Zod schema 与 trim normalization 已建立，provider adapter 仍未接入。
- Node 20.x clean install：BLOCKED；当前环境仅有 Node 24.16.0。

## Open Core-Site P0/P1

None.

## Next Highest-Leverage Task

SEO / GEO Growth Engine Phase 1：商业主题地图、Buyer Questions backlog、Insights 架构与证据模型。

## 最近验证

- `pnpm.cmd test tests/unit/metadata-brand.test.ts --run`：4 项通过。
- 本地 `pnpm.cmd dev`：`http://localhost:3000/` 可访问。
- `pnpm.cmd build`：29 条路由生成成功。
- `pnpm.cmd lint`、`pnpm.cmd typecheck`：通过。
- `docs/RELEASE_READINESS.md`：已建立技术上线 / 商业完整 / 外部阻塞分层。

## External / Post-launch

公司法定主体、地址、认证范围、产能和客户覆盖数字的正式公开授权仍待确认。
