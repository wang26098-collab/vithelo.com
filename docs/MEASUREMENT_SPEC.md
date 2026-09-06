# VITHELO Measurement Specification

最后更新：2026-09-04

## 状态与边界

- Measurement contract：READY。
- GA4：`CREDENTIAL REQUIRED`；未接入。
- Google Search Console：`OWNER ACCESS REQUIRED`；未接入。
- Bing Webmaster：`OWNER ACCESS REQUIRED`；未接入。
- AI citation provider：`NOT SELECTED`；不购买、不模拟。
- Consent solution：`NOT SELECTED`。在适用隐私要求和 provider 未确认前，不加载行为分析 provider。
- 禁止将姓名、邮箱、电话、询盘正文、配方或其他客户资料写入 analytics properties。

业务事件通过 `src/lib/analytics.ts` 的 event contract 进入 adapter。当前默认 adapter 为显式 `NOT_CONFIGURED` no-op；事件语义不绑定 `gtag`、GTM 或 vendor SDK。

## Measurement Layers

| Layer | 决策问题 | 数据来源 | 当前状态 |
|---|---|---|---|
| Search Visibility | 哪些 query/page 获得曝光、点击与可优化位置？ | Search Console / Bing Webmaster | OWNER ACCESS REQUIRED |
| Content Engagement | Insight 是否帮助用户继续研究或进入商业页面？ | 未来行为分析 provider | CONTRACT READY / PROVIDER REQUIRED |
| Commercial Progression | 用户是否从内容进入 Products、OEM、Manufacturing、Quality 或 Contact？ | 未来行为分析 provider | CONTRACT READY / PROVIDER REQUIRED |
| Lead Action | 用户是否开始项目并继续到真实 Email / WhatsApp 渠道？ | 未来行为分析 provider | CONTRACT READY / PROVIDER REQUIRED |

## Search Visibility Contract

未来导入字段：`query`、`page`、`impressions`、`clicks`、`ctr`、`average_position`、`device`、`country`、`date`、`source`。这些字段来自真实 provider export/API，不由网站事件生成，也不得填充模拟值。

## Business Event Contract

通用 properties：`pagePath`、`pageType`。仅在适用时增加 `articleSlug`、`destinationPath`、`linkContext`、`dosageForm`、`contactMethod`。properties 使用页面/内容上下文，不含 PII。

| Event | Layer | Trigger | Page Context / Properties | Business Meaning | Provider | Implementation Status | Validation Method |
|---|---|---|---|---|---|---|---|
| `insight_commercial_click` | Content / Commercial | Insight 内指向商业页的链接点击 | insight；`articleSlug`, `destinationPath`, `linkContext=commercial` | 内容推进到能力研究 | Pending | Contract only | click once / event once |
| `insight_related_content_click` | Content | Related Insight 点击 | insight；`articleSlug`, `destinationPath`, `linkContext=related_content` | 继续知识研究 | Pending | Contract only | click once / event once |
| `insight_start_project_click` | Commercial | Insight CTA 进入 Contact | insight；`articleSlug`, `destinationPath`, `linkContext=start_project` | 高意图内容行动 | Pending | Contract only | click once / event once |
| `page_view` | Search / Content / Commercial | 页面可见加载；由 provider 的通用 page view 记录 | `pagePath`, `pageType` | 页面入口与路径分布 | Pending | Contract only；不创建每页 custom view event | provider debug + route check |
| `rfq_start` | Lead | 用户主动开始使用真实 project route | contact | 项目意图开始 | Pending | Contract only；站内表单不可提交 | confirm trigger after UX/provider decision |
| `email_continue` | Lead | 用户点击真实 Email 渠道 | contact；`contactMethod=email` | 继续到 Email | Pending | Contract only | verify navigation + one event |
| `whatsapp_continue` | Lead | 用户点击真实 WhatsApp 渠道 | contact；`contactMethod=whatsapp` | 继续到 WhatsApp | Pending | Contract only | verify navigation + one event |

不存在 `rfq_submit_success`：当前没有服务端提交或 CRM success state。

## Provider Integration Gate

接入任何 provider 前必须确认：真实 property/container ID、production hostname、数据保留与 consent 要求、谁有管理权限、测试/生产隔离、PII 排除规则。接入后先用 provider debug 验证触发、payload、去重和移动端，再启用 conversion 标记。

## Decision Rules

- Search：优先 positions 4–20、high impressions / low CTR、query-page mismatch、unexpected query 与 cannibalization。
- Behavior：优先 Insight → Commercial、Insight → Start a Project、Product → Manufacturing/Quality、Contact → Email/WhatsApp。
- 不以 page views 单独证明增长，不在 provider 缺失时声称排名、流量或转化改善。
