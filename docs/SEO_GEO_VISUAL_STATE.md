# SEO / GEO / Visual 长期状态

最后更新：2026-09-05

## 当前阶段

Phase A：完整 SEO/GEO + UI Audit、Visual System、Navigation baseline。

## 已锁定

- Global Navigation：视觉与功能双冻结。
- URL、页面职责、首页商业顺序和询盘逻辑冻结。
- Start a Project、Email、WhatsApp、Project Brief 保留。
- 素材必须先脱敏；不公开源公司名、原 logo、外部工厂图、地址、二维码、证书编号和注册号。

## 已完成

- 已建立 `docs/SEO_GEO_UI_AUDIT.md`。
- 已建立 `docs/VISUAL_SYSTEM.md`。
- 已建立独立站素材脱敏规则文件。
- 已启动本地视觉辅助工作台，用于后续页面对比，不属于正式站点资产。
- 已记录 Global Navigation baseline：Desktop 1440×900 时 header 高度 80px；Mobile 390×844 时 header 高度 72px。
- Desktop 导航顺序：VITHELO → Products → OEM / ODM → Manufacturing → Quality → Insights → About → Contact → Start a Project；所有链接保持当前 URL。
- Mobile baseline：VITHELO + Menu 入口；移动抽屉及其交互后续只做回归检查，不主动修改。
- baseline 截图保存在 `.superpowers/brainstorm/vithelo-seo-visual/content/`：`nav-desktop-1440.png`、`nav-tablet-1024.png`、`nav-mobile-390.png`。
- 已完成 16 个核心 route 的只读巡检：全部 HTTP 200；均有单一 H1、title 与 meta description；1440px / 390px 初检无横向溢出。
- 已抽查 4 个 Insight detail：均有 H1、H2 结构与 meta description，初检无横向溢出。
- 已建立 `docs/PAGE_CONTENT_OWNERSHIP.md`、`docs/PAGE_RESTRUCTURE_AUDIT.md`、`docs/EVIDENCE_ASSET_LIBRARY.md`。
- 已建立 `docs/PAGE_DECISION_MAP.md`，冻结页面唯一核心问题，并为每个主要 Section 增加 `Decision Contribution` / `If removed` 审核字段。
- 已建立 `docs/VISUAL_SYSTEM_AUDIT.md`，将 Typography、Color、Grid、Evidence、Motion、Responsive、Performance 与各页面视觉任务统一到证据驱动的验收顺序。
- 已完成 Phase A.5 Homepage Evidence-Ready Reconstruction：`docs/HOMEPAGE_EVIDENCE_READY_RECONSTRUCTION.md`，冻结 Home 01–09 的 Buyer Question、Decision Contribution、Evidence Status、Visual Composition、CTA Position 和 Mobile Behavior。
- 已建立 `assets/evidence/` 证据资产目录，并将 6 个非证照素材副本按内容重命名后放入 `_needs-review`；原始素材保持不变。

## 待完成

- [x] 记录 Global Navigation desktop / tablet / mobile baseline。
- [ ] 逐页完成视觉截图巡视并补齐审计证据。
- [ ] 根据页面归属表迁移 Products / OEM / ODM / Manufacturing 的重复内容。
- [ ] 完成 `_needs-review` 素材逐张脱敏与公开状态确认。
- [ ] 在不触碰导航的前提下，按页面职责更新视觉系统实现。
- [ ] 按首页 01–09、内页 Header、Products / Dosage、OEM / ODM、Manufacturing、Quality、About、Insights、Contact 顺序执行。
- [ ] 每个 major phase 完成 lint、typecheck、unit、build、Playwright 与三类设备 smoke。

## 当前风险

- 部分历史文档和当前实现存在路线/屏数差异，以用户最新阶段指令和实际代码为准，变更时需记录决策。
- 素材目录包含源公司名、原 logo、工厂外部画面、证照编号和地址；这些内容不能直接进入公共页面。
- 产能、认证、MOQ、客户覆盖等资料在正式核验和公开授权前继续保持来源边界。

## 下一项最高杠杆任务

等待 Homepage 01–09 结构审核通过；通过后才进入 Home UI implementation，并按 Section 单屏实施、单屏验收。审核前不修改 Home 组件、CSS 或公开素材引用。
