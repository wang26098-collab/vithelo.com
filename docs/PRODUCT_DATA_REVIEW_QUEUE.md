# VITHELO Product Data Review Queue

> 本队列用于把 Product Taxonomy 与 Approved Product Data 分开。队列中的记录不是公开产品目录；只有满足来源、剂型、产品方向、证据和公开批准条件的记录，才可以进入 Product Entity 和可索引页面。

## 1. 状态定义

| Status | 含义 | 是否允许进入公开 Products |
| --- | --- | --- |
| `APPROVED` | 有真实来源；产品方向、剂型和公开素材/资料已核验；公开措辞已批准 | Yes |
| `DEMO_ONLY` | 只用于开发结构、交互或测试的夹具 | No |
| `NOT_CONFIGURED` | 缺少真实产品资料、来源、图片、授权或关键字段 | No |

`APPROVED` 不是“看起来合理”，也不是“有一张图片”。它需要产品来源、剂型确认、产品身份和公开使用批准同时成立。

## 2. Taxonomy 与产品数据的分离

Taxonomy 永远存在于分类层，不代表对应产品已经存在：

- Dosage Forms：`gummies`、`soft-gel`、`hard-capsule`、`powder`、`tablet`、`jelly`、`oral-film`、`effervescent`、`soft-chew`。
- Benefits：`sports`、`women`、`sleep`、`cognitive`、`beauty`、`pet`。

例如，`soft-chew` 可以作为筛选选项存在，但在没有 APPROVED Product Entity 时必须显示空状态，不得生成 Soft Chews 产品卡或详情页。

## 3. 当前队列

| Queue ID | 当前记录/方向 | Form | Benefit | Category | Source | Media | Status | 审核结论/下一步 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| PDQ-001 | `Demo Sleep Formula` | `capsule`（旧模型） | `sleep-health`（旧模型） | human（推定） | `src/content/demo/products.ts` | `/media/nutrition-ritual.png`，demo media | `DEMO_ONLY` | 旧 Nutrition 夹具，不迁移为 B2B Product Entity |
| PDQ-002 | `Demo Women’s Formula` | `gummy`（旧模型） | `womens-health`（旧模型） | human（推定） | `src/content/demo/products.ts` | 未配置 | `DEMO_ONLY` | 旧 Nutrition 夹具，不迁移为 B2B Product Entity |
| PDQ-003 | `Demo Daily Formula` | `capsule`（旧模型） | `daily-essential`（旧模型） | human（推定） | `src/content/demo/products.ts` | 未配置 | `DEMO_ONLY` | 旧 Nutrition 夹具，不迁移为 B2B Product Entity |
| PDQ-004 | `Demo Precision Device` | 不适用 | 不适用 | 不适用 | `src/content/demo/products.ts` | 未配置 | `DEMO_ONLY` | 历史设备夹具，不进入当前营养 Products |
| PDQ-005 | Gummy capability record | `gummies` | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 通用 Pexels 图片 | `DEMO_ONLY` | capability 不是产品实体；图片不可绑定具体产品 |
| PDQ-006 | Hard Capsules capability record | `hard-capsule` 目标 ID | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 等待真实产品方向和来源 |
| PDQ-007 | Softgels capability record | `soft-gel` 目标 ID | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 与 Soft Capsules 的关系需业务确认 |
| PDQ-008 | Tablets capability record | `tablet` 目标 ID | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 等待真实产品方向和来源 |
| PDQ-009 | Powders capability record | `powder` 目标 ID | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 等待真实产品方向和来源 |
| PDQ-010 | Liquids capability record | 不属于当前九剂型 | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 暂不删除；等待业务确认是否保留 |
| PDQ-011 | Functional Gum capability record | 不属于当前九剂型 | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 不自动映射为 Soft Chews |
| PDQ-012 | Oral Films capability record | `oral-film` 目标 ID | 未配置 | 未配置 | `src/content/demo/vithelo-b2b-site.ts` | 未配置 | `DEMO_ONLY` | 等待真实产品方向和来源 |
| PDQ-013 | Jelly product direction | `jelly` | 未配置 | 未配置 | 无 | 无 | `NOT_CONFIGURED` | 只有 taxonomy，不代表产品存在 |
| PDQ-014 | Effervescent Tablets product direction | `effervescent` | 未配置 | 未配置 | 无 | 无 | `NOT_CONFIGURED` | 只有 taxonomy，不代表产品存在 |
| PDQ-015 | Soft Chews product direction | `soft-chew` | 未配置 | 未配置 | 无 | 无 | `NOT_CONFIGURED` | 只有 taxonomy，不代表产品存在 |

## 4. 审核闸门

每条记录按以下顺序审核：

1. 确认来源是用户提供资料、已确认数据库、产品文件或可追溯图片资料。
2. 确认产品名称代表真实产品方向，而不是从包装、颜色、图片或行业经验推断。
3. 确认剂型属于 taxonomy，并记录旧模型到新 ID 的映射依据。
4. 确认 benefit、category 和 application 有独立来源；没有依据则保持 `NOT_CONFIGURED`。
5. 确认图片与产品的绑定关系；图片只能作为辅助证据，不能单独创造产品事实。
6. 确认公开措辞、alt、slug 和详情页是否获批准。
7. 通过后才把 `status` 改为 `APPROVED`，并进入 validated Product Entity collection。

## 5. 禁止自动升级

不得根据图片、包装、logo、颜色、文件名、现有营销文案或行业经验自动生成：产品名称、功效、成分、剂量、认证、MOQ、交期、适用人群或市场定位。

若审核人无法回答“这是什么真实产品、来源在哪里、剂型如何确认、图片是否属于它、哪些内容可以公开”，记录必须保持 `NOT_CONFIGURED` 或 `DEMO_ONLY`。

## 6. SEO/GEO 发布规则

- `DEMO_ONLY` 和 `NOT_CONFIGURED` 不进入生产 Products 卡片、Product Detail、sitemap 或可索引 landing page。
- taxonomy 可以作为不可索引的筛选选项存在；没有匹配实体时显示 Empty State。
- 不创建 `/products/{form}/{benefit}` 组合页，除非已有真实实体、独立页面价值、非重复内容和明确搜索意图。
- Product Entity 的公开页面必须从 validated adapter 读取，不能从图片文件名、营销文案或 route 参数推断。

## 7. 队列更新记录

| 日期 | 变更 | 依据 |
| --- | --- | --- |
| 2026-09-06 | 初始建立；当前无 APPROVED B2B Product Entity | 当前 schema、demo fixtures、Products 页面实现和现有素材库核对 |
