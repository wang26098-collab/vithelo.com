# VITHELO Homepage Screen Design

> 版本：2026-09-06  
> 阶段：Phase 3 — Homepage Screen Design  
> 状态：待审核，不进入 UI 实现  
> 设计基础：[VITHELO Visual Direction System](VITHELO_VISUAL_DIRECTION_SYSTEM.md)、[Homepage Structure Design](HOMEPAGE_STRUCTURE_DESIGN.md)

## 0. 设计总纲

本方案将首页设计成一段 **Editorial Manufacturing Narrative**，而不是 8 个同构组件的堆叠。每个 Section 先回答一个买家问题，再选择最适合这个问题的画面、版式和节奏。

```text
Brand meaning
   → image / material experience
   → capability understanding
   → decision support
   → project conversation
```

Evidence Governance 仍然约束事实、图片和公开文案，但 Evidence 是支撑层，不是客户视觉主角。客户不应在首页主要看到 `Evidence required`、`Pending`、`Not configured`、状态标签、审核编号、数据仪表盘或灰色占位。

### 首页视觉权重

| 权重 | Section | 作用 |
| --- | --- | --- |
| 高 | 01 Hero | 建立 VITHELO 的品牌角色与第一印象 |
| 高 | 03 Manufacturing | 用真实环境建立制造可信感 |
| 高 | 05 Product Directions | 让买家以产品机会而不是 SKU 进入浏览 |
| 高 | 07 OEM Journey | 把品牌想法连接到合作路径 |
| 中 | 02 Product Intent | 让买家感到 VITHELO 理解产品任务 |
| 中 | 04 Capability | 将能力翻译成匹配判断 |
| 中 | 06 Formats | 帮助买家理解剂型体系 |
| 收口 | 08 Conversation | 把兴趣转成合格询盘 |

## 1. 全局视觉规则

### 1.1 Typography scale

- Hero Display：全站最大标题，负责唯一的品牌定位或核心承诺；
- Section Statement：约为 Hero Display 的 0.55–0.70，表达商业主题；
- Supporting Heading：约为 Section Statement 的 0.55–0.70，表达产品方向、剂型或路径节点；
- Body：每段 1–3 句，优先说明“对买家意味着什么”；
- Utility / Evidence Note：低权重、小字号、可读，不与商业主张竞争。

字号关系是层级规则，不等同于当前实现值；进入 Phase 4 时再映射到 tokens。

### 1.2 Color continuity

全首页共享 Cold Ivory、Graphite、Titanium 与克制的 Optical Light。不同 Section 通过明暗、图片材质和空间节奏区分，而不是为每一屏创建新色板。

- Ivory：主要呼吸空间与品牌底色；
- Graphite：标题、正文和主要 CTA；
- Titanium：细线、分隔和低权重辅助信息；
- Optical Light：焦点和交互反馈；
- 真实材料中的颜色只能作为局部图像色，不形成绿色营养频道或状态色系统。

### 1.3 Image treatment

图像优先近距离、真实、具有材料触感的摄影。图片要承担“证明环境、解释产品、传递项目语境”中的至少一个任务；如果只用于填充空间，应删除或改为留白。

### 1.4 Motion baseline

动效只承担 ORIENT、RELATE、EXPLAIN、FOCUS 或 CONFIRM。图片尤其是 Hero 和制造证据画面尽量静止。所有重要文字与事实在 Reduced Motion 下直接完整可见。

---

## 2. 01 — The Partner Behind the Product

### Section Identity

- 对应首页模块：01 The Partner Behind the Product
- 节奏角色：Arrival
- 视觉权重：高
- 主要判断：VITHELO 是否是我正在寻找的营养品 OEM/ODM 合作伙伴？

### Business Purpose

在首屏清楚建立 VITHELO 的身份、服务对象和合作价值，让访客先理解“这是一个为营养品品牌和项目团队服务的制造伙伴”，再决定是否继续查看能力。

### Buyer Psychology

采购商担心网站只是普通供应商模板，或者只会展示产品和工厂，却没有理解品牌项目的能力。他需要快速确认：VITHELO 是否面向专业品牌、私人标签公司、产品经理和采购团队。

### Visual Intent

建立“产品最终要成为一个品牌对象”的第一印象，而不是把访客一开始就推入工厂数据。首屏要有自信、空间感和高级产品世界。

### Layout Design

**Desktop：** 采用锁定 Hero artwork 的 **layered hero composition**。主图占据首屏主要视觉区域，定位文字落在自然留白或明确的对比区域，CTA 放在标题之后形成单一路径。文字与图像不是左右两栏拼接，而是同一画面中的品牌关系。保留宽阔上、下留白，不添加数据条或能力徽章。

**Mobile：** 采用定位 → 主图 → CTA 的单列结构。主图不被缩放到失去主体，不做视差或裁切实验。

### Image Direction

使用已锁定的 Hero 主图。图片存在的原因是让买家先看到产品、材料与品牌表达的关系；它不是制造证据，也不应被加上未经核验的产能、认证或客户说明。

### Typography Hierarchy

- Hero Display：一条清晰的品牌定位或商业主张；
- Supporting line：一句解释服务对象或项目入口；
- CTA label：一个主要行动，一个低权重次级行动；
- 不在 Hero 放证据脚注墙、密集标签或多个同级卖点。

### Color Direction

Cold Ivory 与锁定 Hero 图像共同构成首屏基底；Graphite 负责标题和正文对比；CTA 使用 Graphite 或现有品牌高对比样式。不得新增高饱和色。

### Spacing & Height

首屏应具有“进入一个品牌世界”的高度感，接近一个完整视口但不强制用户等待动画。内容密度低，留白比例高，主图和标题拥有明显呼吸区。

### Motion Direction

仅允许轻微的标题与 CTA reveal，用于 ORIENT。Hero 图片保持静止，不使用视差、缩放循环或自动轮播。Reduced Motion 直接显示最终状态。

### Mobile Adaptation

保持主张优先，主图其次，CTA 紧随其后；正文不超过短段落。直接联系入口不在 Hero 里竞争主 CTA，避免首屏变成操作面板。

---

## 3. 02 — Built Around Product Intent

### Section Identity

- 对应首页模块：02 Built Around Product Intent
- 节奏角色：Trust / Immersion
- 视觉权重：中
- 主要判断：这家制造伙伴是否理解我的产品任务，而不只是接受一个订单？

### Business Purpose

在制造能力之前建立产品理解感，让 VITHELO 看起来像能参与产品方向讨论的合作伙伴，而不是只等待采购规格的工厂。

### Buyer Psychology

买家担心自己需要重复解释品牌定位、消费场景和产品机会；也担心制造商只会给出标准 SKU。此处需要确认 VITHELO 是否尊重产品意图，并能把意图翻译成可讨论的方向。

### Visual Intent

把产品意图变成可感知的品牌场景：材料、样品、包装和研发动作共同形成一个“产品正在被想清楚”的瞬间。

### Layout Design

**Desktop：** 采用 **image-led statement**。上方或中部为一张宽幅材料/研发图，标题以较窄阅读列穿入画面节奏；文字不做左文右图，而是让图像横向展开、标题落在视觉留白中。底部可用一条轻量基线承接下一段，不做卡片。

**Mobile：** 主张 → 图像 → 解释。图像在文本之后出现，避免访客先看到无法解释的装饰画面。

### Image Direction

优先 R&D scene、Packaging scene 或 Product photography。图片存在的原因是展示产品意图如何通过材料、样品、包装或协作被具体化；不承担未经确认的功效和制造能力结论。

### Typography Hierarchy

- Section Statement：表达“围绕产品意图协作”的商业主题；
- Supporting Heading：最多 1 个，用于引出产品、材料或品牌任务；
- Body：1–2 个短段落，说明为什么产品方向先于规格堆叠；
- 不使用多组同级标签或小字说明制造“系统密度”。

### Color Direction

以 Ivory 为主，局部使用图像中的材料色。Graphite 标题保持强对比，Titanium 只用于节奏线。整体应比 Hero 更有沉浸感，但不切换为新频道色。

### Spacing & Height

中等偏高的内容高度，图像占主要垂直空间，文字密度低。此 Section 是 Hero 与制造现场之间的呼吸层，不应塞入产品目录或证据表。

### Motion Direction

允许图像与标题的顺序 reveal，用于 RELATE；不允许图像漂移、持续缩放或文字逐字打字。Reduced Motion 保留完整图文关系。

### Mobile Adaptation

图片必须保留材料或样品主体；正文收缩为一个主要观点。若有次级入口，置于解释之后，用文本链接而非第二个高权重按钮。

---

## 4. 03 — Manufacturing You Can Enter

### Section Identity

- 对应首页模块：03 Manufacturing You Can Enter
- 节奏角色：Trust → Capability
- 视觉权重：高
- 主要判断：这里是否存在一个真实、专业、值得继续尽调的制造环境？

### Business Purpose

把品牌信任连接到真实制造现场，用环境、操作和过程质感建立可信感，而不是用状态字段或认证 Logo 证明一切。

### Buyer Psychology

采购商担心图片只是素材库、工厂不是实际生产地点，或信息过度营销。他需要看到足够真实的环境线索，并知道下一步可以去 Manufacturing / OEM/ODM 页面继续调查。

### Visual Intent

不是“展示一张工厂照片”，而是让买家感到自己正在进入一个真实、受控、专业的工作环境。

### Layout Design

**Desktop：** 采用 **full-width visual with editorial captioning**。真实制造画面横向展开，占据 Section 的主要视觉重量；标题和短说明不作为压图卡片，而是沿画面边缘或下方基线布局。可使用一处局部放大的设备/手部/材料细节作为第二视线，但不形成多卡片网格。

**Mobile：** 先呈现完整场景，再呈现标题、说明和继续了解入口。场景高度控制在能辨识动作与空间关系的范围，不裁成抽象灰色纹理。

### Image Direction

优先 Manufacturing scene，其次为 R&D scene。关注真实生产空间、设备局部、人员操作、材料流动和包装过程；避免厂房外观、证书墙、握手和通用流水线图库。

图片存在的原因是让“制造可信感”可被看见。每张图片仍需逐图核验源品牌、反光、人员、设备标识、来源与授权。

### Typography Hierarchy

- Section Statement：表达制造现实与可进入感，例如 “Manufacturing, made visible.” 一类的主题；
- Body：解释场景对产品项目的意义；
- Evidence Note：如需说明来源或范围，置于画面下方或正文之后，以低权重可读文字出现；
- 禁止将 `Evidence required`、`Pending`、`Not configured` 或审核编号放在主标题、图片角标或主要视觉位置。

### Color Direction

Ivory 作为文字区与留白基底，真实图片负责局部色彩和材质对比。Graphite 负责主张，Titanium 负责边界。不得使用蓝色医疗滤镜、绿色“营养能力”滤镜或过度冷灰处理把现场变成审计报告。

### Spacing & Height

高视觉权重、低信息密度。图片可形成宽阔的横向停顿，文字保持短而有力。Section 高度不必与其他模块相同，应让真实场景拥有足够存在感。

### Motion Direction

图片静止。允许标题、规则线和说明做一次性 reveal，用于 FOCUS；不做数字计数、不做扫描线、不做设备模拟、不做滚动视差。Reduced Motion 立即显示场景与文字。

### Mobile Adaptation

移动端优先完整识别场景，再读说明；CTA 放在说明之后。图片说明不得依赖 hover 或点击热点，来源边界不遮挡主要场景。

---

## 5. 04 — Capability, In Context

### Section Identity

- 对应首页模块：04 Capability, In Context
- 节奏角色：Capability / Orientation
- 视觉权重：中
- 主要判断：制造能力是否与我的产品方向和剂型需求相关？

### Business Purpose

把制造能力从抽象概念翻译成买家可以匹配的能力景观，包括剂型、材料、包装或项目协作方向。

### Buyer Psychology

买家不需要看一个漂亮但无意义的 KPI 面板；他需要知道“这与你的产品有什么关系”。如果能力不能对应到产品选择，他就无法判断是否值得继续联系。

### Visual Intent

建立一张开放的 **capability landscape**：能力彼此有关系，但不是进度、状态或统计仪表盘。

### Layout Design

**Desktop：** 采用 **asymmetric landscape**。一侧为较大的能力主题或材料图像，另一侧为纵向能力索引；能力项以基线、短句和空间关系组织，不使用统一高度卡片。可让一条连续规则线连接“format → material → packaging → project”关系，规则线只做阅读引导。

**Mobile：** 变为图像 → 能力主题 → 纵向索引。每项短标题和一句解释自然堆叠，不使用横向滑动或展开状态才能获得内容。

### Image Direction

使用一张能承载多种关系的 Manufacturing scene、Product photography 或 Material field。图片存在的原因是把能力落到设备、材料、产品或包装细节，而不是为每一项能力配一张装饰图。

### Typography Hierarchy

- Section Statement：一句“能力如何服务项目”的主题；
- Capability headings：短而具体，承担分类与扫描；
- Body：解释能力与买家项目之间的关系；
- 数字如需出现，必须和明确商业语境绑定，不做孤立 KPI。

### Color Direction

沿用 Ivory / Graphite / Titanium。Optical Light 只用于一条焦点关系或交互反馈。禁止用颜色表示能力完成度、审核状态或可信等级。

### Spacing & Height

中等高度、较高可扫描度。能力项之间留出足够空间，让页面像一个开放的编辑索引，而不是密集的控制台。

### Motion Direction

允许能力关系按顺序 reveal，用于 EXPLAIN；禁止进度条、雷达图、数值滚动、环形图和实时状态动效。关键能力默认静态可见。

### Mobile Adaptation

索引顺序按买家最可能的判断路径排列：产品/剂型 → 材料/过程 → 包装/项目入口。总 CTA 置于索引之后，不为每一项能力配置按钮。

---

## 6. 05 — Product Directions for Modern Nutrition

### Section Identity

- 对应首页模块：05 Product Directions for Modern Nutrition
- 节奏角色：Product Understanding / Immersion
- 视觉权重：高
- 主要判断：哪些营养品方向值得我与 VITHELO 继续讨论？

### Business Purpose

让买家按产品机会和使用语境发现方向，而不是直接面对完整 SKU、规格或白底缩略图目录。

### Buyer Psychology

品牌方和产品经理通常先有一个市场机会、消费场景或产品方向，再决定剂型和规格。他们需要被启发并快速筛选，而不是在首页阅读一份供应商库存表。

### Visual Intent

建立“产品机会探索”的节奏，让每个方向成为一个值得停留的视觉与商业语境。

### Layout Design

**Desktop：** 采用 **vertical editorial sequence**，每个方向占据一段独立的视觉行：大图、方向标题和一句解释沿不同基线交替出现。图像比例不统一，允许一张宽幅图、一个近景细节和一个包装场景形成节奏。方向之间用空间而非重复卡片分隔。

**Mobile：** 按方向纵向排列，每个方向保持“图像 → 标题 → 解释”的单元感，但不包裹成统一卡片墙。

### Image Direction

优先 Product photography、Packaging scene 和 Material field。图片存在的原因是让买家感知不同产品方向的形态、材料和品牌表达；不使用空泛健康生活方式人物图来替代产品语境。

### Typography Hierarchy

- Section Statement：明确“从产品机会开始”的主题；
- Direction heading：每个方向一个清晰标题；
- Body：每个方向一条短解释，说明项目语境而非功效；
- Utility link：使用 `Explore direction` 或同等低权重入口，不让 CTA 淹没图像与主题。

### Color Direction

Ivory 主底，产品和材料图片提供局部层次。Graphite 保持标题稳定，Titanium 可作为方向之间的微弱分隔。禁止为不同产品方向使用一组彩色状态标签。

### Spacing & Height

这是首页的高权重长节奏模块，但不追求密集。每个方向需要足够的垂直停留空间；方向数量以已确认内容为准，不用空白卡片补齐视觉数量。

### Motion Direction

允许图像与标题按滚动进入视口做轻微 reveal，用于 RELATE；不使用轮播、页码、左右箭头或滚动劫持。Reduced Motion 下所有方向完整呈现。

### Mobile Adaptation

方向顺序先呈现最具代表性的机会，再进入其他方向；每个单元只保留最小判断信息。总入口置于方向序列末尾，进入 Products，不为每个方向加入强销售 CTA。

---

## 7. 06 — Formats That Shape the Product

### Section Identity

- 对应首页模块：06 Formats That Shape the Product
- 节奏角色：Product Understanding / Orientation
- 视觉权重：中
- 主要判断：哪些剂型能够支持我的产品表达与项目讨论？

### Business Purpose

帮助买家理解剂型体系及其对产品表达的影响，完成从“产品方向”到“剂型选择”的自然过渡。

### Buyer Psychology

买家担心剂型展示只是一个产品清单，无法帮助他比较和选择。他需要看到剂型之间的关系，以及哪些内容应该进入下一次项目沟通。

### Visual Intent

表现“剂型如何塑造产品”，而不是展示 8 个孤立商品。视觉重点是材料差异、使用表达和项目选择关系。

### Layout Design

**Desktop：** 采用 **material-led format system**。一张较大的剂型/材料主视觉作为锚点，旁边或下方是完整剂型索引，索引按阅读关系排列而非统一商品卡。可以使用字号、间距和短线表达分类，避免八张重复图片同时争夺焦点。

**Mobile：** 主视觉 → 剂型体系标题 → 八种剂型纵向索引。每一项保留名称和最小判断说明，无横向滚动。

### Image Direction

优先 Product photography 与 Material field，必要时使用统一光线下的剂型细节。图片存在的原因是让片剂、胶囊、软糖、口溶膜等形式的触感和差异可被理解，而不是为每个项目制造一张电商商品图。

### Typography Hierarchy

- Section Statement：说明剂型与产品表达的关系；
- Format name：清晰可扫描，八种剂型保持同一语义层级；
- Supporting note：每项一句短说明，避免规格堆叠；
- CTA：整体 `Explore formats`，不为每种剂型重复设置销售按钮。

### Color Direction

仍以 Ivory、Graphite、Titanium 为主，真实材料提供色彩变化。不得给每种剂型分配不同颜色，不以颜色表示推荐、完成或状态。

### Spacing & Height

中等高度、清晰索引。主视觉和完整剂型体系需要共同存在；不因八项数量而压缩为密集网格，也不将口溶膜单独放到最后一行。

### Motion Direction

允许主视觉与剂型索引分批 reveal，用于 EXPLAIN；禁止自动轮播、横向拖动、数字计数和“选择后才显示名称”。Reduced Motion 下八种剂型完整可见。

### Mobile Adaptation

所有剂型名称和基本说明无需交互即可看到。若设计需要触控入口，使用至少 44px 的整行区域；CTA 位于完整体系之后。

---

## 8. 07 — From Product Idea to Market-Ready Direction

### Section Identity

- 对应首页模块：07 From Product Idea to Market-Ready Direction
- 节奏角色：Cooperation Path / Invitation
- 视觉权重：高
- 主要判断：如果我现在只有一个产品想法，如何开始与 VITHELO 合作？

### Business Purpose

建立“想法可以进入合作”的信心，将产品方向、剂型、配方、包装与制造连接成一条可理解的故事，但不替代 OEM/ODM 详细页。

### Buyer Psychology

买家担心联系制造商后才发现缺少信息、项目无法推进，或需要先理解复杂内部流程。他需要看到一条清楚但不压迫的合作入口。

### Visual Intent

把 OEM/ODM 表现成品牌想法被逐步具体化的过程，而不是项目管理看板或完成度报告。

### Layout Design

**Desktop：** 采用 **process runway**。一条开放的视觉路径横跨 Section，节点不是状态圆点，而是由不同图像/材料片段和短标题组成的连续叙事：产品方向 → 剂型 → 配方/包装讨论 → 制造协作 → 上市准备。主视觉可由一张从样品到包装的连续画面承担，文字节点沿路径错落排布。

**Mobile：** 将路径改为纵向故事：每个节点一段短文和一个局部图像，按自然顺序阅读，不显示进度比例、完成状态或横向拖动。

### Image Direction

优先 Partnership scene、R&D scene、Packaging scene，或材料到成品的连续视觉。图片存在的原因是表现协作如何把想法推进成产品方向，而不是用抽象箭头和流程图填充空间。

### Typography Hierarchy

- Section Statement：表达从想法到产品方向的主张；
- Journey node heading：使用动作或项目语言，例如 Concept、Format、Refine、Prepare；
- Body：每个节点最多一句解释；
- CTA：`Discuss your project` 或同等语气，指向 OEM/ODM；次级入口指向 Contact。

### Color Direction

以 Ivory 为主，通过 Graphite 路径文字和 Titanium 连接线建立秩序；图片承担少量材料色。禁止用绿/黄/红表示项目阶段状态，禁止使用 SaaS 进度色。

### Spacing & Height

高权重、宽节奏。节点之间要有足够留白，让访客感到这是一个可以进入的合作故事，而不是被压缩的流程表。移动端高度自然增长，不为桌面路径强行保留空白。

### Motion Direction

允许路径和节点依次 reveal，用于 EXPLAIN；不允许节点计数、进度条、自动推进或滚动劫持。Reduced Motion 下路径和全部节点静态完整呈现。

### Mobile Adaptation

每一步先显示商业动作，再显示一句解释；主 CTA 放在完整路径之后。不要把“准备资料”做成表单或审查清单，详细准备内容进入 OEM/ODM 与 Contact。

---

## 9. 08 — Start With the Right Conversation

### Section Identity

- 对应首页模块：08 Start With the Right Conversation
- 节奏角色：Conversation / Close
- 视觉权重：收口
- 主要判断：我是否已经准备好开始一次有效的合作沟通？

### Business Purpose

把前面建立的品牌信任、能力理解和项目路径转成清晰询盘，降低专业买家开始联系的心理和信息成本。

### Buyer Psychology

买家担心联系后需要反复补充背景，或不知道该联系谁、准备什么。此处需要明确下一步，但不能像 CRM 表单、后台工单或强制销售弹窗。

### Visual Intent

让“开始沟通”成为一个有具体项目语境的邀请，而不是页面底部的通用按钮集合。

### Layout Design

**Desktop：** 采用 **quiet closing composition**。一侧为包装/样品/协作场景的图像，另一侧为短标题、准备信息和 CTA；与前面不对称的内容形成安静收束。Email、WhatsApp 和 Contact 作为清晰的行动层级出现，不使用输入框墙。

**Mobile：** 先标题与一句邀请，再显示准备信息，最后按主次排列 Contact、Email、WhatsApp。图像可放在标题之后或作为底部收口影像，避免遮挡行动入口。

### Image Direction

优先 Partnership scene、Packaging scene 或 Product photography。图片存在的原因是把询盘转换成具体的项目启动场景，例如样品、包装或团队协作，而不是重复前面的大工厂画面。

### Typography Hierarchy

- Section Statement：一句明确的项目邀请；
- Supporting copy：说明买家可以准备的最小信息，如剂型、产品方向、包装、数量背景和目标市场/时间；
- CTA：一个主行动，直接指向现有 Contact 流程；Email 与 WhatsApp 作为清晰的直接渠道；
- 不在收口出现治理状态或内部配置语言。

### Color Direction

使用全站 Graphite 与 Ivory 的稳定高对比。可以让图像形成较深的局部视觉锚点，但不额外创建“转化色”。按钮、链接和焦点状态沿用现有品牌系统。

### Spacing & Height

中等高度、低密度、强行动清晰度。收口需要足够留白让 CTA 有重量，但不能让访客误以为页面还在等待加载或配置。

### Motion Direction

仅允许 CTA 与准备信息轻微 reveal，用于 CONFIRM / FOCUS。Email、WhatsApp 和 Contact 的可用状态不能依赖动画。Reduced Motion 直接显示完整行动区。

### Mobile Adaptation

行动入口纵向排列，保证 44px 以上触控目标和明显焦点。不要加入强制表单，不改变现有浏览器预填 Email / WhatsApp 流程，不让固定资源层覆盖 CTA。

---

## 10. Section-to-section transition system

首页各 Section 不使用统一的卡片间距或同一过渡模板，而通过以下方式建立连贯性：

| Transition | 视觉处理 | 叙事作用 |
| --- | --- | --- |
| Hero → Product Intent | 从产品主图的品牌感知进入材料/研发近景 | 把“产品对象”转成“产品意图” |
| Product Intent → Manufacturing | 从近距离材料进入宽幅真实现场 | 把品牌理解连接到制造现实 |
| Manufacturing → Capability | 从沉浸式场景转为开放能力索引 | 把信任转成匹配判断 |
| Capability → Product Directions | 从能力关系转为产品机会序列 | 让能力服务于产品，而不是自我展示 |
| Product Directions → Formats | 从产品语境收束到剂型材料 | 进入具体选择，但不变成目录 |
| Formats → OEM Journey | 从静态剂型体系转为连续合作路径 | 解释如何开始项目 |
| OEM Journey → Conversation | 从路径叙事减噪并留下一个行动 | 把理解转成询盘 |

## 11. Evidence and content boundary

- Hero artwork 继续锁定，保持静止；
- Manufacturing 图片只使用完成来源、脱敏、主体、范围和授权检查的真实素材；
- 未核验数字、认证、客户覆盖、产能、MOQ、交期、法规和质量结论不得通过排版或图像包装成确认事实；
- `REVIEW`、`IMAGE_REQUIRED`、`NOT_CONFIGURED` 是内容治理状态，不是公开首页的主视觉；
- 如果一个 Section 缺少具体证据但仍有明确商业判断贡献，用不承载具体事实的材料/过程表达，或保留结构缺口供后续输入，不生成虚构证据；
- 公开文案使用 capability、formats、product direction、manufacturing environment、project path 等客户语言；
- 所有内容最终仍需从验证后的内容合同与 adapter 进入页面，本文不授权修改数据模型。

## 12. Phase 3 acceptance checklist

在进入 Phase 4 UI Implementation 前，必须确认：

- 8 个 Section 均有唯一商业目的和唯一主要视觉任务；
- 首页节奏清楚经过 Arrival → Trust → Capability → Product Understanding → Cooperation Path → Conversation；
- 01、03、05、07 具有高视觉权重，02、04、06 具有中等权重，08 负责收口；
- 版式至少包含 layered hero、image-led statement、full-width visual、asymmetric landscape、vertical editorial sequence、material-led format system、process runway 和 quiet closing composition 的差异；
- 没有连续三卡片、四宫格、Icon 列表、Dashboard、状态卡、灰色 placeholder 墙或 Amazon 产品列表；
- Section 03 不向客户展示内部治理状态；
- Section 04 不使用 dashboard、radar chart、progress bar 或 data wall；
- Section 05 表达产品机会，不表达 SKU 目录；
- Section 06 表达剂型体系，八种剂型完整且不孤立 Oral Films；
- Section 07 表达合作故事，不表达项目管理状态；
- 所有图片都能回答“为什么存在”；
- Desktop 与 Mobile 都能完成从主张到行动的阅读路径；
- Reduced Motion 下所有重要信息直接可见；
- 不修改 Header、Navigation、URL、SEO、Contact、Email、WhatsApp 或 Evidence Governance。

## 13. 阶段边界

本文件完成后停止在 Phase 3。下一步只有在用户审核并确认本逐屏视觉方案后，才进入 Phase 4 Homepage UI Implementation。当前不修改任何代码、React、CSS、Header、Navigation、URL、SEO 配置或询盘逻辑。

