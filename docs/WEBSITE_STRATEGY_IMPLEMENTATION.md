# 网站战略实施状态

| 战略要求 | 状态 | 说明 |
|---|---|---|
| VITHELO 单一公开身份 | Partial | 已清理未核实身份措辞；法定主体待确认 |
| 八种剂型高可见 | Implemented | 首页同屏列出八种格式 |
| 制造证据边界 | Implemented | 数字标注用户资料来源与待核验边界 |
| Quality / R&D 入口 | Implemented | `/quality` 已建立，认证与检测仍保留核验边界 |
| Manufacturing 入口 | Implemented | `/manufacturing` 已建立，包含格式、流程、运营与质量关系 |
| About 入口 | Implemented | `/about` 已建立，未确认主体信息不公开 |
| Navigation / IA | Implemented | 核心入口与 8 个剂型深链已存在；移动菜单与 active state 仍可优化 |
| Products dosage-form routes | Implemented | `/products/[slug]` 共享框架覆盖八种格式，含 metadata、breadcrumb 和上下文内链 |
| Homepage order | Implemented | Homepage JSX/DOM follows the buyer decision sequence; CSS is used only for responsive presentation |
| Manufacturing duplication | Implemented | Capacity steps 已并入唯一的 Manufacturing proof section |
| Start a Project RFQ | Partial | 有关键字段与预填渠道，无存储提交 |
| Technical SEO | Implemented | metadata、canonical、sitemap、robots、breadcrumbs 已覆盖；生产 hostname 单独阻塞 |
| GEO 可抽取性 | Partial | 核心实体与主题网络已成立；证据授权与上线后引用测量待补 |
| Core Web Vitals | Blocked | 需 Node 20 干净构建及真实环境测量 |
| RFQ domain model | Implemented | `src/lib/rfq.ts` 提供统一 Zod schema 与 normalization |
| Technical SEO implementation | Implemented | metadata、canonical、sitemap、robots、breadcrumbs 已覆盖 |
| Production canonical verification | Blocked | 需正式部署环境确认 hostname |
| Accessibility baseline | Implemented | 语义 landmarks、heading、labels、focus 样式已覆盖 |
