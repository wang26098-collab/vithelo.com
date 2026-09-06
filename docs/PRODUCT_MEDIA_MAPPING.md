# VITHELO Product Media Mapping

> 图片审核与产品事实审核分开进行。图片可以说明画面中出现了什么，但不能单独证明具体产品、成分、功效、剂量、认证或制造能力。

## 1. 当前映射表

| Image | Related Product | Confidence | Status | 页面用途 | 说明 |
| --- | --- | --- | --- | --- | --- |
| `/media/b2b/gummies-pexels-14027295.jpg` | unknown | low | review | Products gummy format reference | 通用无品牌软糖图片；不能绑定 `Gummy capability record` 或任何具体产品 |
| `/media/nutrition-ritual.png` | `demo-sleep-formula` | low | `DEMO_ONLY` | 历史 Nutrition demo | 只能作为旧 demo 夹具媒体；不是已批准产品图片 |
| `assets/evidence/manufacturing-cleanroom-corridor-01.jpg` | none | none | review | Manufacturing evidence candidate | 制造场景不能证明某个具体产品存在 |
| `assets/evidence/manufacturing-cleanroom-view-01.jpg` | none | none | review | Manufacturing evidence candidate | 制造场景不能证明某个具体产品存在 |
| `assets/evidence/manufacturing-equipment-filling-line-01.jpg` | none | none | review | Manufacturing evidence candidate | 设备画面不能证明产品、产能或认证 |
| `assets/evidence/manufacturing-process-piping-equipment-01.jpg` | none | none | review | Manufacturing evidence candidate | 工艺设备画面不能证明具体配方或产品 |
| `assets/evidence/manufacturing-production-operation-01.jpg` | none | none | review | Manufacturing / Quality evidence candidate | 人员操作画面需先完成人员、文件、屏幕和标识审核 |
| `assets/evidence/oem-moq-reference-needs-review.png` | none | none | do not publish | OEM internal reference | 含 MOQ/中文资料风险，不绑定产品、不公开 |
| `独立站内容/微信图片_202609052155406725_10.jpg` | none | none | do not publish | Internal certificate reference | 含公司/证照敏感信息，不进入产品媒体 |
| `独立站内容/微信图片_202609052155406725_11.jpg` | none | none | do not publish | Internal certificate reference | 含公司、地址和编号，不进入产品媒体 |

## 2. 绑定规则

只有在以下条件全部满足时，图片才能绑定 Product Entity：

1. 图片原始来源可追溯；
2. 图片中产品身份与候选产品有明确记录或文件支持；
3. 图片没有源公司名称、原 logo、地址、二维码、证照编号、人员隐私或客户信息；
4. 图片用途、alt 和裁切不会暗示未经批准的功效、认证、产能或市场结论；
5. 产品本身已经通过 Product Data Review Queue；
6. 公开使用授权已记录。

不满足时，`Related Product` 保持 `unknown` 或 `none`，`Status` 保持 `review` / `NOT_CONFIGURED`。

## 3. Media status

| Status | 含义 | 页面行为 |
| --- | --- | --- |
| `approved` | 图片与产品身份、脱敏和公开授权均已完成 | 可由 validated Product Entity 引用 |
| `review` | 仍需确认来源、身份、脱敏或用途 | 不公开绑定产品 |
| `NOT_CONFIGURED` | 没有可用图片或关键资料缺失 | 显示 IMAGE_REQUIRED / missing media |
| `DEMO_ONLY` | 仅用于开发演示 | 不进入生产产品页或 sitemap |
| `do not publish` | 明确含敏感、未核验或错误用途 | 只留内部参考 |

## 4. 图片不能证明的事项

- 工厂图片不能证明某个具体产品一定可以生产；
- 研发图片不能证明某个具体配方、成分或剂量；
- 包装图片不能证明 MOQ、交期、市场合规或产品功效；
- 证书图片不能在主体、范围、有效期和公开授权未核验时证明 VITHELO 认证；
- 参考图、竞品图和免费图库图不能成为 VITHELO 产品实体来源。

## 5. 待补素材

当前 Product 页面缺少可公开绑定到真实 Product Entity 的产品图。优先补充：

- 真实剂型代表图：九种 taxonomy 各自至少一张，前提是对应产品真实存在；
- 具体产品方向主图：每条 APPROVED Product Entity 一张；
- 包装图：只作为该产品的已确认 packaging reference，不推断定制能力；
- 公开授权记录：产品名称、图片、alt、裁切和页面用途。
