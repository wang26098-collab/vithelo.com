# VITHELO 精简 B2B 网站架构与转化内容设计规格

日期：2026-08-27
状态：待用户书面审核
适用范围：VITHELO 首页之外的 B2B 前端页面体系

## 1. 目标

在已完成的英文首页基础上，搭建一个少页面、信息集中、能够支持海外 B2B 客户判断与询盘的企业网站。网站不采用零售独立站、成品商城或八个剂型详情页的结构，而以产品能力、OEM/ODM 流程、专业内容和项目联系为核心。

本阶段优先完成完整前端。邮箱、WhatsApp、表单发送、真实工厂素材、证书文件和法律文本继续保持 `NOT_CONFIGURED` 或不展示，待获得真实输入后接入。

## 2. 已确认的核心原则

- 网站定位为工厂型 B2B 营养品 OEM/ODM 企业站，不是 DTC 商城。
- VITHELO 统一表述为工厂自有海外品牌与外贸团队。
- 以软糖为核心，同时展示八种口服产品形态的生产能力。
- Products 集中展示八种剂型，不建立八个独立详情页。
- Manufacturing、Quality 与 About 不单独建页，分别进入 OEM/ODM 和首页内容。
- 内容中心不是普通博客卡片墙，而是面向采购方的知识与转化内容库。
- 免费素材只用于产品、原料、包装和生活方式场景，不冒充真实工厂证据。
- 未验证的认证、客户、工厂、检测、法规、功效、交期和商业承诺不展示。
- 所有可复用事实从验证后的内容层读取，不散落在页面组件中。
- 前端验收完成前不清理旧组件；未经用户确认，不提交 Git、不推送部署。

## 3. 页面架构

```text
首页 /
├── 产品能力 /products
├── OEM / ODM /oem-odm
├── 内容中心 /insights
│   └── 内容详情 /insights/[slug]
└── 联系我们 /contact
```

### 3.1 主导航

主导航顺序：

1. Products
2. OEM / ODM
3. Insights
4. Contact
5. Request Quote（右侧主要 CTA，指向 `/contact`）

VITHELO Logo 返回首页。文章详情页不进入主导航，由内容中心、相关文章和上下文链接进入。

### 3.2 页脚

页脚包含：

- VITHELO 身份说明
- Products
- OEM / ODM
- Insights
- Contact
- Privacy 与 Terms 入口，仅在真实法律文本准备完成后公开

## 4. `/products` 产品能力页

### 4.1 页面任务

帮助采购方快速判断 VITHELO 能否承接目标剂型，并了解定制维度、包装方向和 MOQ 边界。页面不展示虚构成品 SKU，不包装为现货零售商品。

### 4.2 页面结构

1. **Hero**
   - 建议标题：`Gummy-first. Built across eight product formats.`
   - 简短说明软糖优先定位与多剂型能力。
2. **软糖旗舰板块**
   - 展示形状、基质、口味、颜色、单粒克重与包装方向。
   - 免费素材仅用于产品形态示意。
3. **八种剂型能力账本**
   - 使用编号、分隔线和横向信息行，不使用八张圆角卡片。
   - 剂型：Gummies、Hard Capsules、Softgels、Tablets、Powders、Liquids、Functional Gum、Oral Films。
   - 每行包含适用项目、可定制内容、包装方向和已确认 MOQ。
4. **剂型比较**
   - 从项目目标、使用方式、包装形式和起订要求帮助客户选择剂型。
   - 不提供未经验证的医疗、功效或法规判断。
5. **包装与定制范围**
   - 展示瓶装、袋装、条包、滴管瓶等已确认方向。
6. **MOQ 说明**
   - 精确区分已确认 MOQ 与 `Contact us for MOQ`。
   - 保留：`Flexible MOQ based on formula and packaging.`
7. **转化区**
   - 建议标题：`Not sure which format fits your project?`
   - CTA 进入 `/contact`，并携带所选剂型上下文。

### 4.3 已确认 MOQ

- Gummies：Custom projects from 500 bottles
- Hard Capsules：60,000–100,000 capsules
- Softgels：300,000 softgels
- Tablets：100,000 tablets
- Powders：100 kg
- Functional Gum：2 metric tons
- Liquids：Contact us for MOQ
- Oral Films：Contact us for MOQ

这些数字只描述当前确认的对应剂型，不作为所有配方与包装项目的无条件承诺。

## 5. `/oem-odm` 服务与生产能力页

### 5.1 页面任务

解释项目如何从需求进入配方、打样、包装、生产、检验与交付，并通过具体流程降低采购方的不确定性。Manufacturing 与 Quality 内容合并在本页。

### 5.2 页面结构

1. **Hero**
   - 建议标题：`From product brief to finished batch.`
2. **VITHELO 与工厂关系**
   - 清楚说明 VITHELO 是工厂自有海外品牌与外贸团队。
3. **六步合作流程**
   - Requirement Review
   - Formula Development
   - Sample Confirmation
   - Packaging Alignment
   - Production
   - Inspection & Delivery
4. **配方与定制能力**
   - 配方方向、口味与质构、剂型、包装和标签协同。
   - 不承诺未经确认的开发结果。
5. **生产体系**
   - 使用流程图、剂型数据和生产节点表达能力。
   - 缺少真实工厂素材时不使用图库厂房冒充实际工厂。
6. **质量控制路径**
   - 原料、生产过程、成品和第三方检测四个节点。
   - 证书、检测报告和认证状态仅在获得真实文件后展示。
7. **项目准备清单**
   - 目标剂型、配方方向、包装形式、预计数量和目标时间。
8. **常见采购问题**
   - MOQ、打样、包装、标签、交付资料和沟通流程。
   - 不写未经确认的交期与付款承诺。
9. **转化区**
   - 进入 `/contact`，联系方式与表单保持同一配置来源。

## 6. `/insights` 内容中心

### 6.1 页面任务

通过专业、可追溯、与采购决策直接相关的内容建立长期信任，并为 Products、OEM/ODM 和 Contact 提供上下文入口。

### 6.2 内容分类

- Product Development
- Dosage Formats
- Packaging & Launch
- Manufacturing & Quality
- Buyer Guides

内容中心使用编辑型文章索引，展示标题、分类、摘要、更新时间与内容形式，不依赖大量封面图片或通用博客卡片。

### 6.3 首批内容方向

1. How to Choose the Right Supplement Format
2. What to Prepare Before Starting an OEM / ODM Project
3. Gummy Development: Formula, Texture, Shape and Packaging
4. How Supplement MOQ Is Evaluated
5. Packaging Choices for Cross-Border Nutrition Brands

首批可先发布其中 3 篇；其余记录保持未发布，不以空文章进入导航或 Sitemap。

## 7. `/insights/[slug]` 内容详情模板

### 7.1 模块化内容块

每篇内容按需要组合以下模块，不要求全部出现：

1. 标题、摘要、作者或审核团队、更新时间
2. 文章目录与富文本正文
3. 单图、图文双栏和图片组
4. 视频或工厂视频
5. 流程步骤
6. 规格表、比较表和检查清单
7. 重点提示与质量边界
8. 中段 CTA
9. FAQ
10. 文件下载入口
11. 相关文章
12. 文末 Start a Project CTA

### 7.2 信任与转化要求

- 作者、审核团队和更新时间必须来自真实内容记录。
- 法规、认证、检测或科学信息必须标明来源和适用边界。
- 视频未配置时不渲染空播放器。
- 下载文件未配置时不渲染虚假下载按钮。
- 中段 CTA 与文末 CTA 可携带文章主题进入 Contact。
- 不开放评论、登录、点赞或订阅系统。

## 8. `/contact` 项目联系页

### 8.1 第一阶段页面结构

1. 标题：`Tell us what you want to make.`
2. 项目需求表字段：
   - Name / Company
   - Work Email
   - Target Market
   - Dosage Format
   - Formula Direction
   - Packaging Needs
   - Estimated Volume
   - Project Brief
3. Email 与 WhatsApp 入口
4. 提交后流程说明，不承诺未经确认的回复时间

### 8.2 配置边界

- 第一阶段只完成前端状态。
- 邮箱、WhatsApp 与提交服务继续为 `NOT_CONFIGURED`。
- 未配置时表单保持禁用且提供明确状态说明。
- 正式公开上线前，联系方式和至少一种可工作的询盘路径属于发布门槛。

## 9. 信任体系

信任不依赖单独的“Trust”页面，而通过全站事实、证据与风险降低机制持续建立。

### 9.1 身份与事实

- 全站统一使用 VITHELO 工厂自有海外品牌与外贸团队的身份表述。
- 只展示用户已确认可公开的 2008、5,000+、50+ 与各剂型 MOQ。
- 具体数字通过统一内容记录复用，避免页面间矛盾。

### 9.2 证据规则

- 没有真实文件的认证 Logo、检测报告、客户 Logo 与工厂照片不展示。
- 证书、检测和法规信息进入内容层时必须包含来源、范围和更新时间。
- 客户名称、Logo、评价与案例只有在获得公开授权后展示。
- 免费素材不得作为 VITHELO 自有工厂、实验室、团队或客户合作的证明。

### 9.3 免费素材策略

- 允许来源：具备清楚免费商用许可的素材平台，例如 Unsplash 与 Pexels。
- 允许用途：产品形态、原料、包装、使用场景和非身份性氛围。
- 禁止用途：冒充真实厂区、真实产线、真实实验室、真实团队、真实客户或真实证书。
- 每个下载素材记录来源 URL、作者、许可页面、下载日期、页面用途和替换目标。
- 工厂素材缺失时使用流程图、生产节点、质量路径、数据账本和克制的无图布局。

### 9.4 最低真实素材包

后续逐步补充：

- 一张真实厂区外景
- 两张真实生产区域照片
- 一张实验室或质量检测照片
- 一张包装或仓储照片
- 一段 30–60 秒真实工厂视频
- 可公开的证书或脱敏检测文件

这些素材不是本轮前端搭建的阻塞条件，但在上线后应优先补齐。

## 10. 视觉与交互方向

- 延续首页的冷 Ivory、Graphite、Titanium 与 restrained Optical light。
- 延续 Seed 式克制、编辑型信息层级，但不复制 Seed 的品牌、绿色风格、布局、动效或代码。
- 主页面使用分隔线、编号、账本、宽幅媒体和非对称排版，不使用通用圆角卡片网格和高阴影。
- Products 使用编辑型剂型索引；OEM/ODM 使用流程与质量路径；Insights 使用文章索引。
- 页面高度由内容自然决定，不将所有板块强制为 `100vh`。
- 不使用 scroll-jacking；Reduced Motion 下所有信息仍完整可见。
- 桌面、平板与手机保持相同任务顺序，移动端不隐藏关键质量、MOQ 与联系状态。

## 11. 前端架构

### 11.1 路由

- `src/app/products/page.tsx`
- `src/app/oem-odm/page.tsx`
- `src/app/insights/page.tsx`
- `src/app/insights/[slug]/page.tsx`
- `src/app/contact/page.tsx`

### 11.2 页面与共享组件

- VITHELO B2B 全站共享 Header、Footer 和 Request Quote CTA。
- Products、OEM/ODM、Insights Hub、Insight Article 与 Contact 使用独立 Page Pattern。
- 仅提取真正跨页面复用的分区标题、媒体状态、CTA 与事实账本组件。
- 不为单次布局建立额外抽象。

### 11.3 内容契约

新增或扩展 Zod 契约以覆盖：

- B2B 全站导航与页脚
- 八种剂型能力和 MOQ
- OEM/ODM 流程、质量节点和 FAQ
- Insights 索引记录
- Article 模块化内容块
- Contact 字段与配置状态
- 免费与真实媒体的状态、来源和许可元数据

内容通过适配器进入页面，页面组件不直接硬编码产品事实。

### 11.4 内容状态

- 未验证记录继续标记 `DEMO_ONLY`。
- 缺少联系方式、视频、下载、证书或服务集成时使用 `NOT_CONFIGURED`。
- 缺少内容的功能不渲染假数据；必要状态必须对内部验收可见。

## 12. 旧路由处理

以下旧页面不进入新导航与公开 Sitemap：

- `/nutrition`
- `/nutrition/[slug]`
- `/aesthetic-technology`
- `/aesthetic-technology/[slug]`
- `/cart`
- `/checkout`
- `/account`
- `/search`
- `/science`
- `/professional`
- `/learn`
- `/support`

新页面通过验收后，再将旧公开路径重定向到最相关的 B2B 页面。第一轮不直接删除旧组件，避免在新页面未稳定前扩大风险。

## 13. 非目标

本轮不建设：

- 八个剂型独立详情页
- 成品 SKU 与零售商城
- 购物车、结账、会员与支付
- 站内搜索
- 评论、订阅、收藏与用户账户
- CMS、CRM、邮件服务和真实表单提交
- 复杂博客分类页与标签页
- 虚构案例、客户评价、证书或功效内容
- 多语言版本

## 14. 验收标准

### 14.1 内容与路由

- 首页、Products、OEM/ODM、Insights、至少 3 篇 Insights 内容和 Contact 均可访问。
- Header、Footer、上下文链接与 CTA 不产生孤立页面或 404。
- 公开 Sitemap 只包含新 B2B 页面与已发布文章。
- 旧 DTC、设备与交易页面不出现在新导航与 Sitemap。

### 14.2 响应式与可访问性

- 六个验收视口不存在横向溢出、遮挡、裁切或失效交互。
- 键盘顺序、可见焦点、语义标签、44px 点击目标和文本放大保持有效。
- Reduced Motion 不丢失内容或任务完成路径。
- 关键 MOQ、质量边界、配置状态和 CTA 不隐藏在移动端折叠中。

### 14.3 数据与可信度

- 未验证信息继续为 `DEMO_ONLY` 或不展示。
- 缺少的服务与联系方式继续为 `NOT_CONFIGURED`。
- 页面不存在未授权工厂、客户、认证、检测或疗效表述。
- 免费素材具有来源与许可记录，且未被呈现为真实工厂证据。

### 14.4 工程质量

- `pnpm.cmd lint` 退出码为 0。
- `pnpm.cmd typecheck` 退出码为 0。
- `pnpm.cmd test` 退出码为 0。
- `pnpm.cmd test:e2e` 退出码为 0。
- `pnpm.cmd build` 退出码为 0。
- 视觉复核不存在未解决的 P0/P1 问题。

## 15. 实施顺序

1. 建立共享 B2B 导航、页脚与内容契约。
2. 搭建 Products 页面并接入八种剂型能力数据。
3. 搭建 OEM/ODM 页面及流程、质量与 FAQ 数据。
4. 搭建 Insights Hub、模块化 Article Template 与首批 3 篇内容。
5. 搭建 Contact 前端状态。
6. 更新首页导航与内部链接。
7. 排除旧路由的导航与 Sitemap 暴露。
8. 完成全量测试、构建和视觉验收。
9. 用户确认后再创建 Git 提交并推送部署。
