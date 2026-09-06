# SEO / GEO / UI 审计工作表

> 阶段：Phase A。本文档是执行清单，不是长篇策略报告。Global Navigation、URL、询盘商业逻辑和已确认页面职责均冻结。

## 审计字段

每个页面按以下顺序检查：Buyer Job → Search Intent → Entity / Topic → Primary Buyer Question → Direct Answer → Evidence → Internal Links → CTA → UI / responsive / performance risk。

| 页面 | Primary Intent | Buyer Question | Direct Answer | Evidence | Internal Links | 当前首要审计项 | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 企业与制造商总定位 | 你是谁，能做什么剂型？ | 需保持首屏清晰定义 VITHELO 与制造方向 | 仅使用已批准或明确标注来源的数据 | Products / OEM / ODM / Manufacturing / Quality / Insights / Contact | 9 屏职责、证据层级、节奏、移动端完整性 | P0 |
| `/products` | 剂型发现与比较 | 你们能生产哪些剂型？ | 8 种剂型必须可扫读并可进入详情 | 剂型关系来自内容层 | 8 个剂型页 / OEM / ODM | Hub 信息层级与比较效率 | P0 |
| `/products/[slug]` | 具体剂型项目匹配 | 这个剂型能否满足我的项目？ | 说明可制造方向、定制维度和下一步 | 不得补写未核验产能、MOQ、交期 | Products / OEM / ODM / Insights / Contact | 8 页视觉个性与共享框架平衡 | P1 |
| `/oem-odm` | 项目开发与私人标签 | 项目如何从想法进入生产？ | Idea → Development → Sample → Scale | 仅呈现已配置流程 | Products / Manufacturing / Quality / Contact | 项目路径是否比卡片更清楚 | P0 |
| `/manufacturing` | 制造能力与供应商尽调 | 你是否真正具备制造能力？ | 用真实生产、过程和边界说明 | 不使用外部工厂图；素材先脱敏 | Products / Quality / OEM / ODM | 真实证据、caption、移动端裁切 | P0 |
| `/quality` | 质量体系与证据 | 质量控制如何被说明？ | 解释质量框架与文件边界 | 未核验认证保持缺失/待确认状态 | Manufacturing / OEM / ODM / Contact | 不用 Logo 墙代替证据 | P0 |
| `/about` | 企业身份与透明度 | 你是谁，是否稳定透明？ | 公开身份只使用 VITHELO | 不公开源公司名、地址或证书号 | Manufacturing / Quality / Contact | 企业叙事与事实边界 | P1 |
| `/insights` | 采购问题与研究 | 我需要先了解什么？ | 以 buyer guide / technical journal 组织 | 文章事实需有来源边界 | Products / OEM / ODM / Manufacturing / Quality | Featured + supporting 层级 | P1 |
| `/insights/[slug]` | 单一采购问题解答 | 这个问题的直接答案是什么？ | 开头给出可提取的 direct answer | Author / reviewer / updated 仅在真实配置后展示 | 相关商业页与文章 | 可读性、表格、证据和相关链接 | P1 |
| `/contact` | 启动项目与询盘路由 | 我需要准备什么，如何联系？ | 保留 Project Brief、Email、WhatsApp | 不伪造已提交状态 | 全站关键商业页 | CTA、表单状态、移动端可用性 | P0 |

## 全站回归清单

- [ ] H1 / H2 / breadcrumb / metadata / canonical / schema 未回归。
- [ ] 核心正文不是图片文字、hover 内容或默认不可访问 accordion。
- [ ] Global Navigation baseline 在 desktop / tablet / mobile 保持不变；发现问题只记录 `NAVIGATION ISSUE — OWNER APPROVAL REQUIRED`。
- [ ] Start a Project、Email、WhatsApp、Contact 和 Project Brief 均保留。
- [ ] 不出现源公司名、原 logo、厂房招牌、地址、二维码、证书编号或注册号。
- [ ] 不把 DEMO_ONLY / NOT_CONFIGURED 内容包装成已核验事实。
- [ ] 1440、1280、768–1024、375–430 均无溢出、遮挡、关键 CTA 消失或重要信息隐藏。
- [ ] Reduced Motion 下内容完整可见。

## 2026-09-05 只读巡检结果

- 16 个核心 route 返回 HTTP 200；Home、Products、OEM / ODM、Manufacturing、Quality、About、Insights、Contact 与 8 个剂型页均各有 1 个 H1。
- 16 个核心 route 均有页面 title 与 meta description。
- 1440px desktop 与 390px mobile 初检均未发现横向溢出；Header 高度分别为 80px 与 72px。
- 已抽查 4 个 Insight detail：均有 1 个 H1、可提取的 H2 结构和 meta description，未发现横向溢出。
- 当前首要人工审计重点不是基础 SEO 缺失，而是页面视觉差异、证据层级、素材安全、移动端信息顺序和 CTA 位置；后续逐页截图核验。

## 2026-09-05 Home / Products 视觉初检

### Home

- Desktop 初次整页截图显示中段留白；经真实滚动触发后复核，页面高度约 6731px，未发现 section 被隐藏或空 section，确认主要是整页截图未触发进入视口揭示，不判定为代码缺陷。
- Mobile 初检无横向溢出；产品方向纵向列表较长，需继续检查每个方向的标题、说明和 CTA 是否保持可读。
- 当前视觉风险：制造证明、能力仪表盘、产品方向和后续能力区之间的证据层级在截图中不够稳定；优先确认内容是否被 motion 状态隐藏。

### Products

- Desktop：Hero、gummy capability、8-format field、项目判断和包装方向形成完整采购路径；8 个剂型在同一结构中出现，未发现横向溢出。
- Mobile：8 个剂型均保留，结构完整；卡片文字和标签偏密，后续需在真实设备宽度下检查字号、触达目标和阅读疲劳。
- 当前视觉风险：全页多个区域使用相近的浅色 surface / card 语言，后续优化应优先做构图和证据层级，不增加装饰性组件。
