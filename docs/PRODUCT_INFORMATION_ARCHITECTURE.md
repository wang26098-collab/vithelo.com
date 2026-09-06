# VITHELO 产品信息架构

> 本文档定义 Products、剂型页、产品详情、OEM / ODM 与 Manufacturing 之间的产品实体边界。它是后续 schema、内容 adapter、页面组件、SEO metadata 和内部链接的共同依据。

## 1. 产品实体定义

Products 的唯一主要任务是回答：**VITHELO 可以生产什么产品？**

Product Entity 是一个可被发现、筛选、链接和单独解释的营养产品方向，不是电商 SKU，也不是一个 OEM 项目。

最小结构：

```ts
type ProductEntity = {
  id: string;
  slug: string;
  name: string;
  form: DosageFormId[];
  benefit: BenefitId[];
  category: "human" | "pet";
  application: ("oem" | "odm" | "private-label")[];
  positioning: string;
  media: MediaReference[];
  status: "DEMO_ONLY" | "APPROVED" | "NOT_CONFIGURED";
  relationshipIds: string[];
};
```

字段规则：

- `name` 是公开产品方向名称，例如 `Marine Collagen Gummies`；未获得真实产品方向前不得批量虚构名称。
- `form` 和 `benefit` 都是受控枚举，不把自由文本当作筛选标签。
- `category` 用于区分 human / pet，不把宠物产品另建一套脱离 Product Entity System 的模型。
- `application` 表示项目适用路径，不等于 VITHELO 对每一个方向都已完成生产核验。
- `positioning` 只描述产品方向和格式关系，不写功效、疗效、剂量、认证、MOQ、交期或价格承诺。
- `status` 必须保持事实状态。没有真实数据时使用 `NOT_CONFIGURED`，演示夹具使用 `DEMO_ONLY`。
- 产品数据只进入 content schema 和 adapter，不直接写进 route 或 page pattern。

## 2. Dosage Form taxonomy

本阶段目标为九种剂型。`id` 是稳定的内部标签；公开名称可以在文案层调整，但不得改变标签含义。

| Label | ID | 示例 URL 片段 | 当前实现状态 |
| --- | --- | --- | --- |
| Gummies | `gummies` | `/products/gummies` | 已有，需从 capability card 迁移 |
| Soft Capsules | `soft-gel` | `/products/soft-capsules` | 新架构待建；兼容旧 `softgels` |
| Hard Capsules | `hard-capsule` | `/products/hard-capsules` | 已有，需统一 ID |
| Powders | `powder` | `/products/powders` | 已有，需统一 ID |
| Tablets | `tablet` | `/products/tablets` | 已有，需统一 ID |
| Jelly | `jelly` | `/products/jelly` | 新架构待建 |
| Oral Films | `oral-film` | `/products/oral-films` | 已有，Products 不得单独拆布局行 |
| Effervescent Tablets | `effervescent` | `/products/effervescent-tablets` | 新架构待建 |
| Soft Chews | `soft-chew` | `/products/soft-chews` | 新增 |

说明：旧页面的 `liquids`、`functional-gum` 和 `softgels` 不能未经业务核验直接等价替换为新九剂型。它们先作为迁移审计对象，是否保留或映射由真实产品数据决定。

## 3. Benefit taxonomy

功能方向是产品发现维度，不是未经核验的功效声明。

| Public label | ID | 使用边界 |
| --- | --- | --- |
| Sports Performance | `sports` | 描述运动营养产品方向，不承诺表现结果 |
| Women's Health | `women` | 描述女性健康产品方向，不承诺医疗或生理结果 |
| Sleep Support | `sleep` | 描述睡眠支持方向，不承诺改善或治疗 |
| Cognitive & Focus | `cognitive` | 描述认知与专注方向，不承诺认知结果 |
| Beauty Nutrition | `beauty` | 描述美容营养方向，不承诺外观或皮肤结果 |
| Pet Health | `pet` | 描述宠物健康方向；`category` 必须为 `pet` |

一个 Product Entity 可以拥有多个 benefit，但只有经过业务确认的关系才能进入公开夹具或生产数据。

## 4. 双筛选逻辑

Products 使用两个独立筛选维度：

- Dosage Form：单选或多选均可支持；同一维度内为 OR。
- Functional Benefits：多选；同一维度内为 OR。
- 两个维度同时有选择时，维度之间为 AND。
- 没有选择时返回全部已发布 Product Entity。
- 筛选结果为空时显示明确的空状态、清除筛选操作和当前条件；不伪造推荐结果。

形式化表达：

```ts
matches =
  (selectedForms.length === 0 || product.form.some((id) => selectedForms.includes(id))) &&
  (selectedBenefits.length === 0 || product.benefit.some((id) => selectedBenefits.includes(id)));
```

例子：

| 选择 | 结果 |
| --- | --- |
| `gummies` | 所有 Gummies 产品 |
| `sleep` | 所有标记为 Sleep Support 的产品 |
| `gummies` + `sleep` | 同时属于 Gummies 且属于 Sleep Support 的产品 |
| `gummies` + `soft-chew` | 两种剂型的并集；只有产品拥有任一所选剂型才显示 |

筛选状态必须可被键盘操作、可读标签、可恢复默认状态，并在 Reduced Motion 下保持完整可用。筛选控件不修改全站导航。

## 5. Product card 规则

Product card 是 B2B 产品发现卡，不是电商卡。每张卡可以包含：

- 产品图片或 `IMAGE_REQUIRED` 状态；
- Product Name；
- 一个或多个 Form Tag；
- 一个或多个 Benefit Tag；
- 一句 Short Positioning；
- `View Details` 链接。

禁止出现：价格、库存、购买按钮、虚构 MOQ、虚构交期、未经核验的认证徽章和疗效结论。

图片和 alt 必须描述实际画面，不得用源公司的名称、logo 或证照信息。缺图时使用内容层的缺失状态，不用 AI 生成假工厂或假产品证据。

## 6. Product detail relationship

Products 负责发现；Product Detail 负责具体产品方向的匹配说明。

目标关系：

```text
/products
  -> /products/{form}
      -> /products/{form}/{product-slug}
```

详情页可展示：

- Product Concept；
- Ingredient Direction（方向，不是最终配方或剂量）；
- Format Advantage；
- Packaging Options；
- OEM Availability；
- Related Products。

详情页只能适度引用 OEM / ODM 的项目路径；完整的 Formula Development、Sampling、Packaging Customization、Scale Production 解释归 `/oem-odm`。详情页的制造证据链接到 `/manufacturing`，不复制制造过程长文。

## 7. SEO URL strategy

- `/products` 是 Product Portfolio 总入口，覆盖 `supplement products`、`dosage forms` 和功能方向的发现意图。
- `/products/{form}` 是剂型商业页，覆盖 `{form} supplement manufacturer` 和 `{form} OEM` 的产品匹配意图。
- `/products/{form}/{product-slug}` 是具体产品方向页，覆盖产品名 + format + manufacturer 的长尾意图。
- URL 使用小写、连字符和稳定英文 slug；不得把筛选条件永久编码成大量索引页。
- 交互筛选默认使用 query state 或客户端状态；只有经过内容与 SEO 验证的高价值组合才允许生成可索引落地页。
- 旧 slug 必须通过兼容映射或 301 策略处理，不能静默制造 404。
- 页面 canonical 只指向自身规范 URL；筛选组合默认 canonical 到基础集合页，除非该组合有独立、完整、非重复内容。

## 8. Internal linking rules

- `/products` 链接到九种剂型集合和六个功能方向入口。
- 剂型页链接到对应 Product Entity 详情页，并链接到相关 Insights 文章。
- Product Detail 链接到同剂型的相关产品、`/oem-odm` 和 `/contact`。
- `/oem-odm` 可以引用剂型选择，但不复制 Products 的完整卡片网格；链接回 `/products` 完成发现。
- `/manufacturing` 只链接到制造证据和适用产品方向，不成为产品目录。
- `/insights` 通过问题型文章链接到 Products、OEM / ODM 或 Manufacturing；文章不抢占商业页主词。
- 所有产品页保留 `Start a Project`、Email 和 WhatsApp 的商业通路，不把询盘路径隐藏在筛选交互之后。

## 9. Products 与 OEM / ODM 边界

| Products 允许 | OEM / ODM 负责 |
| --- | --- |
| 产品类型、剂型、功能方向、应用场景 | Product Concept、目标消费者和项目 brief |
| 产品发现、筛选、产品卡 | Formula Development、口味与剂量评估 |
| 具体产品方向的格式优势 | Dosage Form Selection 的决策逻辑 |
| 包装形式作为产品结果的简短提示 | Packaging Customization、Sampling、Approval |
| 进入详情页、OEM / ODM 或 Contact 的链接 | Scale Production 与 Private Label Launch |

Products 不重点展示 Formula Development、Packaging Customization、MOQ、Sampling Process、OEM Workflow、Manufacturing Process 或 Quality System。

## 10. 迁移验收

- [ ] schema 能表达九种剂型、六种 benefit、human / pet category 和多值关系。
- [ ] Products 不再使用 `DosageFormatCapability` 作为最终产品模型。
- [ ] 所有公开产品实体都有 `DEMO_ONLY`、`APPROVED` 或 `NOT_CONFIGURED` 状态。
- [ ] 双筛选通过“单剂型、单功能、组合、无结果、清除”测试。
- [ ] 详情页 slug、canonical、sitemap 和旧链接兼容策略一致。
- [ ] Products、OEM / ODM、Manufacturing、Insights 的内容重复审计通过。
- [ ] Header、Navigation、Mega Menu、URL 主结构和 Email / WhatsApp / Start a Project 不被本架构迁移改变。

## 11. Product Data Governance

Taxonomy 与 Approved Product Data 必须分离：九种剂型和六种 benefit 是筛选分类系统，不代表每个分类已有可公开产品。Product Entity 只有三种状态：

- `APPROVED`：真实来源、产品方向、剂型、媒体/资料和公开使用已经核验。
- `DEMO_ONLY`：仅用于开发结构和交互测试，禁止进入生产 Products、详情页、sitemap 或可索引 landing page。
- `NOT_CONFIGURED`：资料、来源、媒体、授权或关键关系不足；保留结构，不生成公开产品内容。

产品数据的审核入口为 [PRODUCT_DATA_REVIEW_QUEUE.md](PRODUCT_DATA_REVIEW_QUEUE.md)，候选收集使用 [PRODUCT_DATA_INTAKE.md](PRODUCT_DATA_INTAKE.md)，图片绑定使用 [PRODUCT_MEDIA_MAPPING.md](PRODUCT_MEDIA_MAPPING.md)。

### 数据真实性闸门

Product Entity 必须包含：`name`、`form`、`benefit`、`category`、`application`、`positioning`、`media`、`source` 和 `status`。任何字段不得从图片、包装、logo、颜色、文件名、行业经验或营销语气推断。无法确认时记录 `NOT_CONFIGURED`。

Evidence 与 Product 是两条不同关系：Evidence 回答“有什么证据”，Product 回答“有什么产品”。生产线照片可以作为 Manufacturing evidence，但不能自动绑定某个 Product Entity；研发照片可以说明存在研发场景，但不能证明某个配方；包装照片不能单独证明 MOQ、交期或产品能力。

### SEO/GEO 防误生成

- 未批准的 Product Entity 不生成产品详情页、sitemap 条目或可索引组合页。
- 筛选 taxonomy 可以显示空结果，但不能用相邻产品、图片或行业常识填充结果。
- `/products/{form}/{product-slug}` 只有在对应 Product Entity `APPROVED` 且拥有独立内容价值时才创建。
- `/products/{form}/{benefit}` 默认是 query state，不创建批量组合 landing pages。
- Products 只能消费“Product Data → Validation → Product Entity → Adapter → Page Component”数据流。

当前仓库核对结论：截至 2026-09-06，没有 APPROVED 的 B2B Product Entity；现有旧 Nutrition/Device 记录和八项 B2B capability 记录均为 `DEMO_ONLY` 或迁移对象，不能作为真实产品目录。
