# VITHELO 页面证据映射

最后更新：2026-09-06

> 本表是页面实施前的证据闸门。`候选 / 待审核` 不等于可公开使用；只有来源、脱敏、主体范围和公开授权全部通过，素材或 claim 才能进入公开页面。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| `APPROVED` | 来源、主体、范围、脱敏和公开授权均已确认 |
| `REVIEW` | 有候选来源，但仍需脱敏、主体、范围或授权核验 |
| `IMAGE_REQUIRED` | 当前没有可公开匹配的真实图片，应保留缺口，不生成替代证据 |
| `NOT_CONFIGURED` | 业务事实或公开文案尚未配置 |
| `EXTERNAL` | 仅用于解释一般行业/法规背景，不证明 VITHELO 能力 |

## 页面映射

| Page | Section / Buyer Question | Claim or decision supported | Evidence asset / source | Status | Next action |
| --- | --- | --- | --- | --- | --- |
| Home | Hero / Who are you? | VITHELO 是营养品 OEM / ODM 项目入口 | Locked hero artwork；页面定位文案 | APPROVED for composition | 保持静态；不替换或加视差 |
| Home | Manufacturing proof / Can I trust the direction? | 用真实现场把品牌定位连接到制造现实 | `manufacturing-cleanroom-*`、`manufacturing-production-operation-*` | REVIEW | 逐图检查源品牌、反光、人员和授权 |
| Home | Capability dashboard / What can you support? | 已提供的能力数字或剂型范围 | `森酷企业介绍(2).pdf`；`docs/FACTS_TO_VERIFY.md` | NOT_CONFIGURED | 完成生产核验和公开使用批准前保持来源边界 |
| Home | Product directions / What can I make? | 产品方向分流 | Product Entity records | NOT_CONFIGURED / DEMO_ONLY | 先补真实产品输入，不用营销句子批量造实体 |
| Home | Inquiry close / How do we start? | 进入 Email、WhatsApp、Start a Project | `src/lib/rfq.ts` 与现有 CTA | APPROVED path | 只做视觉和文案层级回归 |
| Products | Product discovery / What do you manufacture? | 剂型、产品方向、应用发现 | Product Entity contract；真实产品图 | NOT_CONFIGURED | 补产品输入；缺图使用 `IMAGE_REQUIRED` |
| Products | Dosage forms / Which format fits discovery? | 九剂型受控入口 | `docs/PRODUCT_INFORMATION_ARCHITECTURE.md` | NOT_CONFIGURED | 核实旧八剂型与新九剂型关系，不直接等价迁移 |
| Products | Applications / What direction is relevant? | 六个功能方向的发现标签 | Benefit taxonomy | NOT_CONFIGURED | 逐条确认可公开的产品关系；不写疗效结论 |
| OEM / ODM | Concept / Can you help develop my idea? | 项目概念进入开发路径 | R&D / sample workflow；真实研发图 | IMAGE_REQUIRED | 提供无敏感信息的实验室、样品或记录局部 |
| OEM / ODM | Formula / Can the formula be adjusted? | 配方方向、口味和开发变量的项目讨论 | Approved workflow / project brief | NOT_CONFIGURED | 只保留方法与待确认项，不承诺最终配方或剂量 |
| OEM / ODM | Sampling / How is a prototype reviewed? | prototype → review → adjustment | Sample review scene | IMAGE_REQUIRED | 提供可公开样品审核或调整场景 |
| OEM / ODM | Packaging / What must be decided? | 包装选择与项目依赖 | `oem-moq-reference-needs-review.png` | REVIEW / not public | 仅内部核验；不把 MOQ 图作为公开承诺 |
| OEM / ODM | Production / How does the project scale? | 从批准样品进入生产的路径 | Manufacturing process evidence | IMAGE_REQUIRED | 由 Manufacturing 证据映射提供链接，不复制长文 |
| Manufacturing | Facilities / Is there a real site? | 室内生产与设施现实 | `manufacturing-cleanroom-*`、`manufacturing-process-piping-equipment-*` | REVIEW | 检查标识、反光、设备铭牌和站点授权 |
| Manufacturing | Production process / Can you manufacture it? | 现场流程与适用范围 | `manufacturing-equipment-filling-line-*`、production operation | REVIEW | 确认每个 caption 只描述画面能支持的事实 |
| Manufacturing | Quality control / How is production controlled? | 控制点与过程证据 | QC records / approved extracts | IMAGE_REQUIRED | 提供可脱敏的检查或记录局部 |
| Quality | Document review / How is reliability proven? | 文件、检测和核验方法 | Approved document extracts | IMAGE_REQUIRED | 不公开证照编号、地址、原主体或未授权文件 |
| Quality | Certification / What does a certificate prove? | 证书主体、范围、有效期和公开用途 | Certificate-specific evidence | NOT_CONFIGURED | 完成逐证核验后再决定是否公开；禁止 Logo 墙 |
| About | Identity / Who is behind VITHELO? | 公开品牌与法定主体边界 | Approved legal identity input | NOT_CONFIGURED | 未确认前只公开 VITHELO，不补主体、地址或关系结论 |
| Insights | Direct answer / What should I know? | 单一采购问题的行业解释 | External authoritative sources + editorial boundary | EXTERNAL / APPROVED for general education | 保持文章不抢商业页主解释权 |
| Contact | Project start / What should I prepare? | 询盘所需信息和联系路径 | RFQ schema；Email / WhatsApp | APPROVED path | 检查移动端 CTA、预填内容和未提交状态 |

## 资产使用规则

1. `REVIEW`、`IMAGE_REQUIRED` 和 `NOT_CONFIGURED` 不得通过视觉包装伪装成证明。
2. 图片 alt、caption 和 metadata 只描述真实可见场景；不能从图片推导认证、产能、客户覆盖、MOQ 或交期。
3. 证据进入页面前，必须同步更新 `docs/EVIDENCE_APPROVAL_QUEUE.md`、`docs/CONTENT_EVIDENCE_MATRIX.md` 和本表。
4. 若一个 Section 没有证据但仍有明确采购判断贡献，保留结构并显示缺失边界；若没有判断贡献，按 `PAGE_DECISION_MAP.md` 执行 Rewrite 或 Remove。
5. 本表不改变导航、URL、Header、Mega Menu、Email、WhatsApp 或 Start a Project。
