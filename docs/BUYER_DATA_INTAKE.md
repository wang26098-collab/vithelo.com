# Buyer Data Intake

最后更新：2026-09-04

目标是把真实采购问题转化为可验证的内容与商业决策输入，而不是收集客户档案。

## 不得进入 Repository

客户姓名、私人邮箱、电话号码、订单号、公司机密、完整配方、未公开报价、合同或可重新识别客户身份的信息。提供数据前应完成去标识化；不确定时只提交问题的概括版本。

## 建议记录字段

| Field | What to provide |
|---|---|
| Buyer Question Raw Text | 去标识化后的原始问法；可轻度删除身份信息，不改问题含义 |
| Source | `SITE`、`RESEARCH`、`FOUNDER_HYPOTHESIS`、`DATA_PENDING`、`SALES`、`RFQ`、`EMAIL`、`WHATSAPP`、`SEARCH_CONSOLE`、`AI_QUERY` |
| Category | Discovery、Development、Sampling、MOQ / Commercial、Manufacturing、Quality、Packaging、Documents、Supplier Evaluation、Scale-up |
| Channel | Email、WhatsApp、RFQ、sales summary、search、AI check |
| Buyer Stage | Discovery、Consideration、Decision、Project Active |
| Product / Format | Gummies、Capsules 等；未知可留空 |
| Frequency | 仅填写真实计数或明确区间；没有统计写 `NOT MEASURED` |
| Objection | 去标识化后的顾虑或阻塞点 |
| What Buyer Needed | 比较、文件、解释、报价输入、风险确认等 |
| Outcome | Answered、Needs Evidence、Needs Commercial Review、Unknown |
| Commercial Relevance | Low、Medium、High、Very High，并说明理由 |
| Date Range | 数据覆盖时间，不填写虚构精确日期 |

## Founder Stage 最小可用输入

Founder Stage 可以从 1 条去标识化问题开始；暂时 0–3 条也属于正常状态，不是 Growth blocker。每条尽量附来源类型、产品/剂型和是否真实重复出现；无需整理客户身份。Growth review 会先合并近义问题、区分事实/内容/商业响应，再决定改页、补证据、加入 backlog 或保持观察。

## 来源纪律

`SITE` 表示当前网站/流程自然产生的问题；`RESEARCH` 表示行业研究；`FOUNDER_HYPOTHESIS` 表示 Owner 判断；`DATA_PENDING` 表示等待验证。真实输入使用 `SALES`、`RFQ`、`EMAIL`、`WHATSAPP`、`SEARCH_CONSOLE`、`AI_QUERY`。未获得真实计数时禁止标记 “most buyers ask” 或 “high frequency”。
