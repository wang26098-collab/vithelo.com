# VITHELO 首页采购决策链与中度层叠设计

## 决策结论

用户已确认：首页保留八屏和现有 Hero，重新设计第二至第八屏的内容职责，以“采购决策链”作为新的首页叙事主线，并使用中度页面板层叠表达章节推进。

完整链路为：

> 认识 VITHELO → 判断制造可信度 → 找到合作起点 → 定义产品 → 确定消费场景 → 选择剂型 → 理解项目路径 → 发起询盘

本规范取代 `2026-09-12-vithelo-home-medium-layering-design.md` 中“只验证前三屏”的范围，也取代 `2026-09-11-vithelo-home-narrative-motion-design.md` 中第二至第八屏的旧内容职责。Hero 锁定、八屏数量、几何基线、公开身份、证据治理和可访问性要求继续有效。

## 真实问题

当前首页的问题不是缺少内容，而是多个屏幕重复讲产品方向、剂型、定制和制造能力，导致采购方看到了很多信息，却不容易理解下一步应该判断什么。

新的首页必须让每次滚动都完成一个新的采购判断。每屏只回答一个问题；某项信息一旦在一屏完整解释，后续屏幕只能引用其结论，不得重新展开。

## SLC 范围

### Must

- Hero 的素材、尺寸、定位、文案布局和静止状态不变。
- 首页继续保持八屏，不新增第九屏，也不把多个职责塞入同一屏。
- 第二至第八屏形成连续的 B2B 采购决策链。
- 每屏拥有唯一问题、唯一内容任务和明确的下一步逻辑。
- 使用中度整屏层叠，不把屏内内容做成连续吸顶卡片。
- 公开文案不得新增未经核验的认证、功效、剂量、产能、MOQ、交期、价格或市场合规结论。
- Email、WhatsApp 和本地询盘编辑器继续作为最终行动入口。

### Should

- 页面板覆盖强度随叙事节奏变化，而不是七次完全相同。
- 每屏最多设置一个主要 CTA；第五屏产品方向可以不设 CTA。
- 桌面、平板和手机保持相同的信息顺序与内容职责。
- 层叠边缘只负责章节转换，不承载标签、编号或卖点。

### Could

- 页面板上沿可使用极轻的钛金属高光，帮助相邻表面分离。
- 第二屏与第八屏可以成为首尾两个较强的视觉节点。

### Won't

- 不重新设计 Hero。
- 不恢复历史设备目录、购物、价格、支付或站内提交。
- 不复制参考站的建筑素材、暖棕滤镜、字体和作品集结构。
- 不使用滚动劫持、Hero 视差、连续吸顶堆叠或整屏缩放。
- 不让第三屏和第五屏再次使用相同的 Sleep、Active、Women’s Health 分类。
- 本设计阶段不修改代码、生成图片、推送或部署。

## 八屏叙事总览

| 屏幕 | 采购方问题 | 唯一任务 | 下一屏逻辑 |
| --- | --- | --- | --- |
| 01 Hero | 你们是谁？ | 品牌与业务定位 | 我知道你是谁，但你能否支撑项目？ |
| 02 制造系统 | 你们如何支撑一个项目？ | 建立制造可信度 | 能承接，那么我的项目从哪里开始？ |
| 03 合作起点 | 我的项目属于哪一种？ | 区分三种项目起点 | 找到起点后，需要定义哪些产品内容？ |
| 04 产品定义 | 一个产品需要决定什么？ | 展示四个相互关联的定制维度 | 定义产品前，要理解真实使用场景 |
| 05 产品方向 | 产品服务于什么日常情境？ | 从使用场景形成产品 brief | 有了方向，应该采用什么产品形态？ |
| 06 产品剂型 | 产品可以落在哪种表达？ | 完整展示八种剂型 | 剂型确定后，项目怎样推进？ |
| 07 项目路径 | 合作过程如何进行？ | 解释六步推进方式 | 已理解流程，如何开始第一次沟通？ |
| 08 询盘收口 | 第一次联系需要提供什么？ | 降低询盘门槛并提供直接行动 | Email / WhatsApp |

## 01｜Hero：品牌定位

### 保留内容

- Eyebrow：`NUTRITION OEM / ODM MANUFACTURING`
- Title：`VITHELO — Nutrition OEM / ODM Manufacturer`
- 现有正文、主 CTA、次 CTA 和背景素材保持不变。

### 唯一职责

说明 VITHELO 是面向营养品牌的 OEM / ODM 制造合作伙伴。

### 禁止承载

制造证明、剂型枚举、产品方向、定制解释、项目流程和具体询盘字段。

## 02｜制造系统：为什么值得继续了解

### 采购问题

VITHELO 如何支撑一个营养产品项目？

### 公开文案

**Kicker**

`02 · MANUFACTURING SYSTEM`

**Title**

`Built to connect development with production.`

**Body**

`VITHELO brings the core workstreams of a nutrition project into one manufacturing conversation — from product definition and production planning to quality documentation and finished presentation.`

**Workstream 01**

- Title：`Product Development`
- Copy：`Translate a commercial idea into clear development requirements.`

**Workstream 02**

- Title：`Manufacturing Planning`
- Copy：`Align the product brief with an appropriate production route.`

**Workstream 03**

- Title：`Quality Documentation`
- Copy：`Review records and requirements around the needs of the project.`

**Workstream 04**

- Title：`Packaging Coordination`
- Copy：`Connect the product with its container, label and finished presentation.`

**CTA**

`Explore Manufacturing →`

### 内容结构

- 左侧承载主张和正文。
- 右侧承载真实制造场景。
- 四个工作面沿屏幕底部组成一条制造底盘，不拆成四张悬浮卡。
- 不显示尚未核验的认证标志。
- `2008`、`5,000+`、`50+` 等来源事实在完成主体、范围和公开授权核验前，不进入该屏公开文案。

### 本屏不讲

具体剂型、消费方向、项目步骤、MOQ、交期和详细定制选项。

## 03｜合作起点：客户从哪里进入

### 采购问题

我的项目应该从哪一种合作状态开始？

### 公开文案

**Kicker**

`03 · WAYS TO START`

**Title**

`Start from where your product is today.`

**Body**

`Not every project begins at the same point. The right route depends on what has already been decided — and what still needs to be shaped.`

**Route 01**

- Title：`Private Label`
- Copy：`For projects beginning with an established product direction and a defined brand presentation.`

**Route 02**

- Title：`Adapt & Differentiate`
- Copy：`For projects refining selected parts of the formula direction, sensory experience, format or pack.`

**Route 03**

- Title：`Custom Development`
- Copy：`For projects beginning with an audience, a use case and a commercial brief.`

**CTA**

`Find Your Starting Route →`

### 内容结构

- 用三个有层次的项目入口取代现有三款 Sleep Health、Active Nutrition 和 Women’s Health 产品卡。
- 三个入口只解释不同起点，不保证未核验的现成配方、库存、MOQ 或开发时长。
- 视觉可以分别表达“已有方向”“局部调整”“从 brief 开始”，不得借此伪造真实客户项目。

### 本屏不讲

消费者类别、八种剂型和六步项目流程。

## 04｜产品定义：四个决定如何形成一个产品

### 采购问题

一个产品在进入开发前，需要共同定义哪些内容？

### 公开文案

**Kicker**

`04 · PRODUCT DEFINITION`

**Title**

`Four decisions shape one finished product.`

**Body**

`A product becomes distinctive when formula, delivery experience, sensory direction and packaging are developed as one connected brief.`

**Node 01**

- Title：`Formula`
- Copy：`What should the product brief contain?`

**Node 02**

- Title：`Dosage Form`
- Copy：`How should the product be experienced and used?`

**Node 03**

- Title：`Sensory Direction`
- Copy：`What should taste, texture, color and use feel like?`

**Node 04**

- Title：`Packaging`
- Copy：`How should the product be protected, presented and recognised?`

**CTA**

`Explore OEM / ODM →`

### 内容结构

- 保留 VITHELO 包装作为星图中心。
- 四个节点表达相互依赖的产品决策，而不是四项互不相关的服务。
- `Dosage Form` 只作为决策维度出现，不在这里重复八种剂型名称。

### 本屏不讲

消费方向、完整剂型列表、项目步骤和制造数字。

## 05｜产品方向：从日常场景形成 brief

### 采购问题

这个产品将在怎样的日常情境中被使用？

### 公开文案

**Kicker**

`05 · PRODUCT DIRECTION`

**Title**

`Begin with the routine, not the ingredient list.`

**Intro**

`A stronger brief begins with a clear moment of use, a defined audience and the role the product should play in everyday life.`

**Story 01**

- Title：`Evening Routines`
- Copy：`Define the moment, frequency and desired product experience before deciding how the concept should be delivered.`

**Story 02**

- Title：`Active Routines`
- Copy：`Consider where the product is carried, prepared and used before shaping portability and presentation.`

**Story 03**

- Title：`Life-stage Routines`
- Copy：`Start with a clearly defined audience and use context, then turn that understanding into a focused development brief.`

### 内容结构

- 保留原生纵向滚动和三个连续场景。
- 一次只完整显示一个方向；上一故事退出后，下一故事再进入。
- 场景素材只表达使用情境，不证明功效、适用性或真实产品结果。
- 本屏不设置主要 CTA，让用户完成方向理解后自然进入剂型选择。

### 本屏不讲

具体配方、功效、完整剂型清单和生产步骤。

## 06｜产品剂型：产品采用什么表达

### 采购问题

产品 brief 可以落在哪种剂型上？

### 公开文案

**Kicker**

`06 · PRODUCT FORMATS`

**Title**

`One brief. Eight ways to deliver it.`

**Body**

`Format selection depends on the formula direction, intended experience, packaging requirements and project review.`

**Formats**

1. `Gummies`
2. `Hard Capsules`
3. `Softgels`
4. `Tablets`
5. `Powders`
6. `Liquids`
7. `Functional Gum`
8. `Oral Films`

**Item CTA**

`Explore Format →`

### 内容结构

- 八种剂型继续属于同一个完整内容区。
- 每项只展示剂型名称、独立视觉和详情入口。
- Oral Films 与其他剂型使用同等层级，不被孤立。
- 首页不解释功效、适用人群、MOQ、交期或详细生产参数。

### 本屏不讲

消费方向、定制四要素和项目流程。

## 07｜项目路径：合作怎样推进

### 采购问题

从第一次 brief 到完成项目审查，会经过哪些阶段？

### 公开文案

**Kicker**

`07 · PROJECT PATH`

**Title**

`A clear path from first brief to finished-project review.`

**Body**

`Each stage resolves a different set of decisions. Requirements remain project-specific until they are reviewed and confirmed.`

**Stage 01**

- Title：`Align`
- Copy：`Clarify the product direction, intended market, preferred format and expected volume.`

**Stage 02**

- Title：`Develop`
- Copy：`Translate the brief into formula, sensory and manufacturing requirements.`

**Stage 03**

- Title：`Sample`
- Copy：`Review the sample and identify the adjustments still required.`

**Stage 04**

- Title：`Confirm`
- Copy：`Confirm the agreed product and packaging specifications.`

**Stage 05**

- Title：`Produce`
- Copy：`Move the approved project into its coordinated production stage.`

**Stage 06**

- Title：`Review & Release`
- Copy：`Review the required finished-product records and coordinate the next delivery step.`

**CTA**

`See the OEM / ODM Process →`

### 内容结构

- 六个阶段沿一条清晰路径展开，不使用六张悬浮卡。
- 每个阶段只回答“此时解决什么问题”，不重复第二屏的制造工作面。
- 所有要求和结果继续保持项目特定，不承诺固定周期、MOQ 或交付范围。

### 本屏不讲

剂型列表、消费方向和定制菜单。

## 08｜询盘收口：开始第一次有效沟通

### 采购问题

第一次联系需要准备什么？

### 公开文案

**Kicker**

`08 · START A PROJECT`

**Title**

`Turn your idea into a useful first conversation.`

**Body**

`Share what you already know. Product direction, preferred format, customization priorities and expected volume are enough to begin — details can remain open.`

**Preparation prompts**

- `Product direction`
- `Preferred format`
- `Customization priorities`
- `Expected volume and target market`

**Direct actions**

- `Email the Project Team`
- `Start on WhatsApp`

**Closing line**

`Made for what comes next.`

### 内容结构

- 保留已通过定向验收的 VITHELO 字标到场景揭示。
- 四项准备提示只总结用户刚完成的决策，不重新解释前面各屏内容。
- 本地询盘编辑器只整理信息并生成预填 Email / WhatsApp。
- 不暗示站内提交、CRM 保存、自动报价、自动回复或确认 MOQ。

## 层叠动效叙事

中度层叠必须表达决策推进，而不是装饰性的卡片堆积：

1. Hero → 制造系统：从品牌印象进入制造可信度，第一次覆盖最明确。
2. 制造系统 → 合作起点：从“能否承接”进入“如何开始”，保持中等覆盖。
3. 合作起点 → 产品定义：从项目类型进入产品决策，覆盖强度收敛。
4. 产品定义 → 产品方向：从制造变量进入真实使用场景，以材质和场景反差为主。
5. 产品方向 → 产品剂型：从需求进入产品表达，保持稳定而不抢内容。
6. 产品剂型 → 项目路径：从选择进入执行，深石墨页面板形成一次明确停顿。
7. 项目路径 → 询盘：从理解进入行动，由既有字标揭示完成最终收口。

### 动效边界

- 页面板随原生文档流滚动，不长时间吸顶。
- 上一屏不缩放、不模糊、不降低透明度。
- 层叠边缘不放文字、编号、进度或操作按钮。
- 第五屏保留自己的内部纵向故事逻辑，但不与整屏进入同时制造强运动。
- 第八屏已有揭示是全页最强动效，前面各屏不得与其争夺结尾注意力。
- Reduced Motion 下保留静态层级与内容顺序，取消非必要的位移、透明度和跟随滚动效果。

## 内容唯一性矩阵

| 内容 | 唯一归属屏 | 后续允许引用 | 禁止重复 |
| --- | --- | --- | --- |
| 制造工作面与质量文档 | 02 | 07 可引用“manufacturing requirements” | 再次完整列出四项能力 |
| 三种项目起点 | 03 | 08 可提示用户说明起点 | 在流程屏重新解释三种路线 |
| Formula / Dosage Form / Sensory / Packaging | 04 | 08 可引用 customization priorities | 在其他屏重新列四项 |
| Evening / Active / Life-stage routines | 05 | 08 可引用 product direction | 在第三屏恢复同类产品卡 |
| 八种剂型 | 06 | 08 可引用 preferred format | 在第二、四屏再次完整枚举 |
| 六个项目阶段 | 07 | 08 不重复，只进入行动 | 在第二、三屏提前展示流程 |
| Email / WhatsApp / 准备提示 | 08 | 无 | 在中段屏幕反复展示联系模块 |

## 响应式原则

### 桌面

- 每屏保持一个主视觉和一个主要内容结构。
- 页面板覆盖关系最完整，但不把所有内容压缩到卡片中。

### 平板

- 内容顺序与桌面一致。
- 三种项目起点和八种剂型可以按照现有响应式网格换列，不改变语义顺序。

### 手机

- 页面板圆角和覆盖距离继续收敛。
- 三种项目起点、四个定义节点、八种剂型和六个阶段全部改为自然纵向阅读。
- 不隐藏关键信息，不依赖横向滑动完成内容。

## 验收标准

- Hero 与当前锁定基线一致，无素材、位置、尺寸、缩放、位移或视差变化。
- 首页保持八屏，第二至第八屏严格按照采购决策链排列。
- 每屏可以用一句不同的采购问题概括，不出现两个屏幕承担相同任务。
- 第三屏不再展示 Sleep Health、Active Nutrition 和 Women’s Health 三款方向产品。
- 第五屏只通过 Evening、Active 和 Life-stage 三类场景建立 brief，不承担成品展示。
- 第四屏不列八种剂型；第六屏是唯一完整剂型列表。
- 第二屏不展示未核验认证；缺少证据时不使用数字强化可信度。
- 第七屏是唯一完整流程；第二屏只说明制造工作面。
- 第八屏保留 Email、WhatsApp、无 JavaScript、锚点直达、键盘焦点和 Reduced Motion 能力。
- 六个验收视口无横向溢出、内容裁切、层级穿帮、圆角露底、焦点遮挡或 P0/P1 缺陷。
- 用户视觉判断应为“连续、清晰、克制、每屏都在推进”，而不是“内容很多但重复、卡片很多或动画抢内容”。

## 后续闸门

本文件只锁定内容架构、公开文案方向和层叠叙事。用户审阅通过后，下一步应重新编写覆盖第二至第八屏的实施计划；此前的 `2026-09-12-vithelo-home-medium-layering.md` 三屏实施计划不再执行。实施必须按屏拆分、逐屏验证，不得一次性无验收地重做整个首页。
