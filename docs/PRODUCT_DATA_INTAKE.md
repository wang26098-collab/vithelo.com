# VITHELO Product Data Intake

> 此表收集候选产品资料，不等于批准公开。提交后必须进入 [Product Data Review Queue](PRODUCT_DATA_REVIEW_QUEUE.md)，完成来源、剂型、媒体和公开授权审核后，才能成为 Product Entity。

## 1. Intake 表

| Product | Form | Benefit | Category | Application | Positioning | Source | Media | Status | Open Questions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — | — | `NOT_CONFIGURED` | 尚未收到可核验的 B2B 产品清单 |

当前不能把 `Demo Sleep Formula`、`Demo Women’s Formula`、`Demo Daily Formula` 或 `/products` 中的 capability record 当作真实 intake；它们已经在 review queue 标记为 `DEMO_ONLY`。

## 2. 最小提交要求

每条候选产品至少提交：

- 产品方向名称或内部产品编号；
- 确认的剂型；
- 功能方向（如无确认则填写 `NOT_CONFIGURED`，不猜）；
- `human` 或 `pet` category；
- `oem`、`odm`、`private-label` application 中已确认的项；
- 不含功效承诺的 positioning；
- 来源文件、数据库记录或可追溯输入；
- 产品图片/包装图的原始文件名和媒体审核状态；
- 是否允许 VITHELO 公开使用该产品名称、图片和描述；
- 未决问题、冲突字段和不应公开的信息。

## 3. 可接受来源

- 用户明确提供并确认的产品清单；
- 已确认的内部产品数据库记录；
- 产品规格、样品或项目文件；
- 图片资料，但图片只能支持画面事实，不能单独确认产品身份、功效、成分或产能。

## 4. 不接受为事实的输入

以下内容不能单独批准 Product Entity：

- 图片中的形状、颜色、瓶身或包装风格；
- 图片文件名、OCR 结果或 logo；
- 行业常见产品名称和模型自行补全；
- 搜索结果、竞品产品或参考网站内容；
- 只有剂型 taxonomy，没有具体产品来源；
- 只有工厂照片，没有产品文件或产品身份关联。

## 5. 审核记录模板

```text
Product:
Internal ID:
Form:
Benefit:
Category:
Application:
Positioning:
Source type:
Source reference:
Media reference:
Media review status:
Public name approved:
Public media approved:
Open questions:
Reviewer:
Decision: APPROVED | DEMO_ONLY | NOT_CONFIGURED
Decision date:
```

## 6. 数据流

```text
Product Data Intake
        ↓
Product Data Review Queue
        ↓
Source / Media / Public-use review
        ↓
APPROVED Product Entity or NOT_CONFIGURED record
        ↓
Zod validation
        ↓
Content Adapter
        ↓
Products / Product Detail
```

在进入最后两步之前，不修改 `schema.ts`、adapter 或 Products 页面来迎合未经批准的数据。
