# VITHELO 页面决策地图

最后更新：2026-09-06

> 用途：冻结每个页面的唯一主要采购问题，并要求每个 Section 对采购判断路径产生明确贡献。本文档不修改 Header、一级导航、URL、Mega Menu 或询盘商业路径。

## 页面主问题

| Page | 核心问题 | 目标采购判断 | Primary owner | 允许引用 | 禁止承担 |
| --- | --- | --- | --- | --- | --- |
| Home | Who are you and why trust you? | 先确认 VITHELO 定位、制造方向和下一步入口 | 总览与分流 | 关键能力、证据摘要、Products / OEM / ODM / Manufacturing 入口 | 完整产品目录、完整项目流程、完整质量体系 |
| Products | What products and formats can you manufacture? | 发现剂型、产品方向和应用入口 | Product discovery | 剂型、产品类别、应用方向、详情入口 | Formula development、包装定制、OEM workflow、MOQ |
| OEM / ODM | How can you help me develop my product? | 判断概念能否进入开发、打样和量产路径 | Project journey | Concept、Formula、Format、Packaging、Sampling、Production 的项目步骤 | 详细产品目录、未经核验的交期/MOQ/价格 |
| Manufacturing | Can you really manufacture this product? | 判断现场、流程、设备和制造证据是否足以继续尽调 | Manufacturing evidence | Facilities、production path、process、quality-control evidence | 认证 Logo 墙、完整产品目录、项目开发长文 |
| Quality | How do you prove reliability? | 判断质量控制、检测和文件证据如何核验 | Quality evidence / compatibility entry | 质量控制、检测、文件、证据边界 | 与 Manufacturing 重复的生产能力叙述；未经核验认证 |
| About | Who is behind this company? | 判断公开身份、透明度和联系主体 | Company identity | VITHELO 身份、透明度、已批准主体信息 | 借用未确认源公司身份、虚构客户/工厂结论 |
| Contact | How can we start cooperation? | 判断现在需要准备什么以及如何发起询盘 | Project start | What to prepare、Email、WhatsApp、Start a Project | 重新解释完整产品、制造或质量内容 |
| Insights | What should I understand before I decide? | 解决单一采购问题并回流商业页面 | Buyer education | 问题型文章、外部来源、相关页面链接 | 抢占 Products / OEM / ODM / Manufacturing 的主解释权 |

## Section 审核字段

每个页面 Section 在设计、改稿和验收时必须记录以下字段：

| 字段 | 要求 |
| --- | --- |
| Section | 唯一名称和所属页面 |
| Buyer question | 采购商在这一段试图确认什么 |
| Decision contribution | 该段如何改变或推进采购判断 |
| Evidence | 对应真实资产、内容来源或 `IMAGE_REQUIRED` |
| Next action | 继续阅读、查看详情、进入项目路径或发起询盘 |
| If removed | 删除后判断路径是否受影响；若没有，Rewrite 或 Remove |

## 当前核心 Section 审核

| Page / Section | Buyer question | Decision contribution | Evidence state | If removed | Action |
| --- | --- | --- | --- | --- | --- |
| Home / Hero | VITHELO 是什么类型的供应商？ | 建立第一定位并把高意向用户导向项目入口 | 已配置；Hero artwork locked | 会损失首屏定位 | Keep / polish only |
| Home / Manufacturing proof | 你是否有真实制造依据？ | 将品牌陈述转换为可继续核验的证据入口 | 用户提供资料边界；图片按证据库审核 | 信任路径变弱 | Keep / evidence-led |
| Home / Capability dashboard | 可制造范围是否足够匹配？ | 让采购商快速比较能力范围 | 部分数字待核验 | 若无可核验数据则改为缺失状态 | Keep only verified facts |
| Home / Product directions | 你主要支持哪些产品方向？ | 把总览用户分流到 Products | 内容层已配置 | 会降低发现效率 | Keep / reduce duplication |
| Home / Product formats | 可选哪些剂型？ | 支持快速识别格式，不展开开发逻辑 | 产品格式需与当前 contract 对齐 | 会影响发现 | Keep / single-format field |
| Home / OEM / ODM runway | 我的项目下一步是什么？ | 把制造兴趣转为项目路径理解 | 流程可配置；图片缺口需记录 | 会削弱转化解释 | Keep / link to OEM |
| Home / Inquiry close | 如何开始？ | 在信任之后提供 Email、WhatsApp、Start a Project | 已配置浏览器预填 | 会损失最终转化 | Keep / conversion freeze |
| Products / Product discovery | 你们生产什么？ | 完成剂型、产品方向和应用发现 | 真实产品图与实体关系仍有缺口 | 页面失去唯一任务 | Rewrite around Product Entity |
| OEM / ODM / Project journey | 能否帮我把想法开发出来？ | 解释 Concept → Production 的合作路径 | R&D、sample、packaging 图片待核验 | 项目判断无法完成 | Rewrite as journey system |
| Manufacturing / Production evidence | 真的能生产吗？ | 用现场和流程支持供应商尽调 | 多个候选资产在 review | 文字会变成无证据能力展示 | Evidence mapping first |
| Quality / Document evidence | 可靠性如何被证明？ | 解释文件与控制点的核验方式 | 公开质量文件缺口 | 质量页与制造页会重复 | Keep separate intent; no logo wall |

## 迁移原则

1. Products 只做 Product Discovery；Formula、Packaging、Sampling 和 OEM workflow 迁移到 OEM / ODM。
2. Manufacturing 与 Quality 保持不同搜索意图；在兼容策略明确前不删除 `/quality`。
3. 没有真实证据的 Section 不用装饰性视觉补足，改为 `IMAGE_REQUIRED` 或 `NOT_CONFIGURED`。
4. Section 删除前必须回答 “If removed”；没有采购判断影响的内容不得仅因视觉完整而保留。
5. 所有页面继续保留 Email、WhatsApp、Start a Project；本地图只优化位置、层级和文案，不改变商业路径。
