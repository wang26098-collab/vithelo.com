# Nutrition × Aesthetic Technology 品牌网站设计规范

日期：2026-08-16  
状态：已由用户确认，等待书面规范复核  
主规范：`D:\办公\独立站\独立站.docx`（V6.1）

## 1. 目标

在空仓库中建立一个可扩展的高端 Nutrition × Aesthetic Technology 品牌网站前端基础与响应式高保真核心原型。网站不是“营养品商城 + 美容器械目录”的拼接，而是 Brand Flagship、Commerce、Trust/Knowledge 与 Professional 组成的统一数字平台。

当前没有最终品牌名、Logo、真实 SKU、产品图、合法 Claims、认证、设备参数、首发 Market 或 Commerce/CMS 选型。因此首版是可点击、可测试的高保真 Demo，不是可直接上线的生产站。

## 2. 成功标准

1. 项目可运行，并通过 build、lint、typecheck 和关键测试。
2. Design Tokens、Motion Tokens、Core Components 和 Motion Primitives 可复用。
3. 完成 Home、Nutrition Landing、Aesthetic Technology Landing、Nutrition PDP、Device PDP、Science、Professional 七个响应式高保真核心页面。
4. 建立基础 Search、Cart、Checkout、Account、Support 路由和关键状态，使 Wave 01 核心路径可导航。
5. 关键页面在 1440、1280、1024、768、390、375px 下重新构图并保持任务完整。
6. Keyboard、Focus、语义、44px 触控目标、对比度和 Reduced Motion 满足基础可访问性门槛。
7. 所有假数据明确标记 `DEMO_ONLY`，不被误认为真实产品事实、Claims、认证、政策或参数。
8. 不复制 Seed 的品牌资产、文案、绿色微生物视觉、具体布局、动效或代码。

## 3. SLC 范围

### Must

- Next.js App Router + TypeScript 工程基线。
- Design Tokens、Motion Tokens、全局布局和响应式系统。
- Header、Mega Menu、Mobile Drawer、Button、Form、Disclosure、Feedback、Search、Sticky 等 Core Components。
- Product、Formula、Ingredient、Technology、Evidence、Safety、Capability 等结构化 Schema。
- 七个高保真核心页面及关键 Utility 路由。
- Loading、Empty、Error、Loaded/Success、Disabled、Missing Configuration 状态。
- Reduced Motion、基础 Accessibility 和 Performance 约束。
- build、lint、typecheck、组件测试和关键 Journey smoke tests。

### Should

- Formula / Technology 的 Text ↔ Visual Coupling。
- Home 的一次 Membrane Reveal。
- 代表性的 Scale Shift。
- Mobile Sticky Commerce。
- Evidence progressive disclosure。
- Professional 多步骤 Project Intake。

### Could

- 更完整的 Account、Checkout、Solution 和 Support 内容。
- 扩展 Journal、Ingredients、Technologies 和 Product Reference 深页。

### Won't

- 真实支付、真实询盘发送、生产部署。
- 虚构品牌、SKU 事实、功效、认证、法规、设备机制或市场政策。
- 3D Viewer、Subscription、AI Advisor、复杂个性化和高级账户系统。
- Unlimited Page Builder 或逐页重复开发。

## 4. 技术架构

采用 Next.js App Router + TypeScript。CSS Design Tokens 是视觉数值的单一来源；Tailwind 只消费 Token，不允许页面散落随机间距、颜色、圆角和动画数值。

`shadcn/ui` 只承担 Drawer、Dialog、Accordion、Form 等无品牌倾向的基础交互和可访问性行为。所有默认视觉必须改写为 A-Prime，不保留通用 SaaS 模板感。

依赖方向：

`Design/Motion Tokens → Core Components → Domain Components → Page Patterns → DEMO_ONLY Data`

页面使用受控 Section Pool。PDP 由 Schema 驱动；Home 和 Landing 使用受控模块池。Product、Formula、Technology、Evidence、Safety、Professional 和 Media 独立维护，页面只引用数据，不拥有产品事实。

为未来 CMS、Commerce、Search 和 CRM 定义 adapter 边界，但 Demo 阶段只使用本地 fixtures，不锁定供应商。

## 5. 信息架构

Primary Navigation 固定为：

- Nutrition
- Aesthetic Technology
- By Need
- Science
- Professional

Secondary Navigation：Journal、About。  
Utility：Search、Account、Cart、Checkout、Support。

页面职责：

- Home：Orientation。
- Landing：Discovery。
- PDP：Decision。
- Science：Explanation 与 Evidence。
- Professional：Business Fit 与 Project Intake。
- Utility：完成任务与恢复状态。

## 6. 视觉系统

视觉母方向为 A-Prime / Scientific Material Humanism，公式为 `HUMAN × MATERIAL × PRECISION`。

- 基础色：Ivory、Graphite、Titanium。
- Optical 只作为 Light、Edge、Focus、Selected 行为，不作为大面积蓝色色块。
- Precision Sans 主导 UI；Editorial Serif 仅少量用于 Human/Journal 层。
- 圆角以 0–8px 为主，12px 极少使用。
- 普通 Card 不依赖阴影；浮层可以使用克制阴影。
- 以网格、细线、材质、留白、真实比例和信息层级建立高级感。
- Nutrition 不等于绿色；Aesthetic Technology 不等于蓝色科技主题。
- 临时 Wordmark 保持中性且可替换，不自行创造正式品牌名称。

视觉真实性遵循 Reality Gradient：Brand/Campaign 可用 A0 抽象材质；Landing 使用 A1 产品代表视觉；PDP 使用明确标注的 Demo 产品样机；Science、Safety、Manufacturing 只展示结构和事实占位，不制造伪证据。

## 7. 页面设计

### Home / Brand Density 3

依次承担 Brand Promise、Two Product Worlds、Explore by Need、Signature Method、Featured Products、Science & Proof、Professional Gateway。最多一个 Immersive Motion 和两个 Narrative/Relational Motion。品牌抽象必须在短时间内让位于产品、需求和 Proof。

### Nutrition Landing / Brand Density 2

采用 Soft Glass、Bio Material、Daily Humanity 和 Formulation Precision。使用 Editorial Product Rhythm，不复制其他页面构图。内容包括 Hero、Explore by Need、Featured Nutrition、Formula/Ingredient Preview、Human Routine、Quality 和 Continue。

### Aesthetic Technology Landing / Brand Density 2

采用 Titanium、Skin Interface、完整设备与 Engineering Rhythm。Hero、Mega Menu 和完整设备视觉必须快速说明这里包含可购买设备与专业系统。内容包括 Application、Devices、Technology/Engineering、Human Interface、Safety/Professional 和 Continue。

### Nutrition PDP / Brand Density 1

Commerce First。首屏优先 Product、Name、Price、Variant、Key Facts 和 Add to Cart。之后是 At a Glance、Formula、Form/Human Use、How to Use、Evidence、Quality/Safety、Reviews/Continue。Mobile 将 How to Use 前移。

### Device PDP / Brand Density 1

首屏优先完整设备、Name、Application/Technology、Price/Inquiry 和 CTA。之后是 What It Does、Technology、Engineering、Human Interface、How to Use、Modes、Safety、Specs/Ownership、Evidence/Continue。Safety 和使用方式不等待用户读完深层技术。

### Science / Brand Density 0.5–1

Explain First，Archive Later。以阅读、搜索、Diagram、Evidence、Scope、来源和限制为核心，不做蓝色实验室或证书墙。深层内容拥有清晰 Return Loop 回到 Product、Solution 或 Professional。

### Professional / Brand Density 0.5–1

以 Business Intent、Capability、Process、Proof、Commercial Fit 和 Inquiry 为核心。四条路径为 OEM/ODM、Private Label、Distribution、Professional Aesthetic。Hero 不使用工厂数字；Project Intake 先做 Minimum Qualification。

## 8. Behavior / Motion

数字行为语言为 `SCALE × REVEAL × RESPONSE`。动画必须明确承担 Orient、Relate、Explain、Focus 或 Confirm 之一，否则删除。

Motion Tokens：

- Fast：120–180ms。
- Standard：180–280ms。
- Narrative：400–600ms。
- Immersive：700–1000ms，只用于 Home/Campaign 的极少数时刻。

Motion Primitives：Reveal、Media Reveal、Visual Switcher、Scale Shift，可选 Sticky Story。

代表性交互：

- Home：一次 Membrane Reveal，将材料抽象过渡到两个产品世界。
- Nutrition PDP：Formula Text ↔ Visual Coupling。
- Device PDP：Technology 与设备部位联动。
- Evidence：从通俗摘要逐层展开 Source、Scope、Supports 和 Limitations。

禁止 Scroll-jacking。动画不能承载唯一事实，不能遮挡 Commerce 或 Safety。移动端将 Hover/Sticky 改为 Tap、Swipe 或顺序静态内容。`prefers-reduced-motion` 下关闭 Parallax、Scale Shift、大位移、Sticky Narrative 和持续漂移，但保留 Focus、State 和 Confirm 反馈。

## 9. 数据与状态

fixtures 全部位于明确的 Demo 数据目录，顶层和记录级均标记 `DEMO_ONLY`。字段允许显示“Not configured”或中性占位，不补写真实 Claim、认证、剂量、设备参数、Warranty、MOQ、Lead Time 或政策。

Product、Variant、Formula、Market Configuration 分离。Consumer View 和 Business View 可共享 Product Truth，但不得共享商业表达。

远程数据和用户输入组件必须覆盖 Loading、Empty、Error、Loaded/Success、Disabled 与 Missing Configuration。错误信息必须具体、可恢复，不能只依赖颜色。

## 10. Accessibility 与 Performance

- Keyboard Operation、Visible Focus、Logical Focus Order、Semantic Labels、Error Association、Screen Reader 结构、Contrast、Text Resize 和 44px Touch Target 属于组件完成标准。
- Critical Safety、Price、CTA、Key Facts、How-to Summary、Evidence Source 和 Order Total 不得被移动端 Accordion 隐藏。
- Home/Landing 首屏最多一个主要重媒体；PDP 的 Product Hero 是首要媒体。
- 常规动画优先 transform/opacity；避免大面积 blur/filter 和 layout thrashing。
- 关闭 JavaScript、Reduced Motion 或媒体加载失败时，Product、Safety、Evidence 和任务路径仍然成立。

## 11. 测试与验收

验收宽度：1440、1280、1024、768、390、375px。

自动验证：

- build、lint、typecheck。
- Core Component 的状态和键盘行为。
- 关键 Journey smoke tests：Home 定向、双世界 Discovery、双 PDP 决策、Science Return Loop、Professional Intake、Search/Cart 基础路径。
- Reduced Motion 与移动端降级。
- Demo 数据标识和事实红线检查。

人工视觉验证：

- Logo-off 仍具品牌识别。
- Nutrition 和 Aesthetic Technology 中段可区分。
- Home、Landing、PDP 不使用同一套左文右图加三卡模板。
- PDP 首屏不被品牌抽象抢走 Commerce。
- Science 与 Professional 不同构。
- Membrane、Card、阴影和 Motion 不泛滥。
- Mobile Sticky 不与 Drawer、Keyboard、Cookie 或其他固定层冲突。

完成门槛：P0 = 0，P1 = 0；否则不视为核心原型完成。

## 12. 后续真实输入

生产化前仍需：最终品牌名/Wordmark/Logo、字体与 Optical 色、真实 Nutrition SKU、真实 Device 规格与 Manual、首发 Market/Locale、Commerce/CMS/CRM 决策、真实产品/人物/工厂资产、Approved Science/Claims/Certification，以及 Shipping/Returns/Warranty 政策。

这些缺失项不是设计失败；在获得前保持可替换 Token、Adapter、Schema 和明确 Demo 状态。
