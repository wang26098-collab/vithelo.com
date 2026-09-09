# VITHELO Product 左侧双重筛选设计

## 目标

让 B2B 用户快速找到适合的剂型与健康市场方向，并进入对应剂型详情页，再从详情页发起 OEM / ODM 询盘。

Product 页的职责是发现与缩小范围，不承担支付、服务端表单提交或未经核实的产品承诺。

## 已确认的筛选逻辑

### 筛选维度

- Format：单选。候选为 Gummies、Jelly、Capsules、Tablets、Powders、Softgels、Liquid Drops、Oral Films、Other。
- Health direction：复选，可多选。候选为 Sports Performance、Women’s Health、Sleep & Rest、Cognitive Focus、Beauty From Within、Pet Health。

### 组合规则

- 可以只选择 Format。
- 可以只选择一个或多个 Health direction。
- 可以同时选择一个 Format 与一个或多个 Health direction。
- 未选择任何条件时展示默认结果集。
- 结果使用 AND 逻辑：已选 Format 与已选方向同时存在时才进入精确匹配；只选一个维度时按该维度过滤。
- 无匹配时展示清晰空状态，并提供 Clear all filters。
- 所有筛选条件均可通过键盘操作，动态结果使用 `aria-live="polite"` 更新。

## 页面结构

### 1. Hero

英文公开文案保持 B2B、探索导向，不写功效、认证、产能、MOQ、交期或法规承诺。

需要图片时预留：`Format still life / product scene`，优先匹配现有剂型素材；缺失时保持明确图片占位，不伪造产品能力。

### 2. 左侧筛选栏（桌面端）

- 标题：Refine your route
- Format 使用单选下拉或单选按钮组。
- Health direction 使用原生 checkbox。
- 展示当前已选路径摘要。
- 提供 Clear all filters。
- 桌面端保持左侧视觉锚点；页面较长时可使用 sticky，但不能遮挡关键内容或询盘入口。

### 3. 右侧结果区

- 结果标题、结果数量、状态边界。
- 已选条件以可移除的轻量标签展示。
- 结果以编辑型产品卡片展示：图片、剂型、健康方向、`DEMO_ONLY` 状态、Explore format。
- 卡片进入对应 `/products/[slug]` 详情页。
- Jelly 对应新增 `/products/jelly`，第一版内容允许为 `DEMO_ONLY`，但路由必须稳定。

### 4. 询盘收口

结果区底部保留 OEM / ODM inquiry 入口。直接询盘渠道继续使用已配置的 Email 与 WhatsApp，不新增服务端表单、CRM、分析或数据保存。

### 5. 移动端

桌面端左侧筛选栏在移动端改为顶部筛选区域或筛选抽屉；结果卡片单列排列。筛选逻辑与桌面端保持一致，触控目标不小于 44px。

## 内容与数据边界

- 所有产品方向与 Format / Health direction 的关联第一版均为 `DEMO_ONLY`，通过现有 Zod 内容契约和本地 adapter 进入页面。
- 不把 Seed 或其他参考网站的素材、品牌、文案、产品逻辑复制到 VITHELO。
- 图片素材优先使用 `public/media/` 中已存在且可归属 VITHELO 的资产；缺失图片必须通过占位说明用途。
- 公共页面只使用 VITHELO 身份，不暴露来源公司名称或原始品牌。

## 验收标准

- 桌面端明显呈现“左侧筛选、右侧结果”。
- 只选 Format、只选 Health direction、组合选择三种状态均可工作。
- 多选方向不会覆盖已选值，清除筛选可恢复默认结果。
- 结果卡片进入正确剂型详情页，包含 Jelly 独立路由。
- 空状态、键盘操作、可见焦点、Reduced Motion 和移动端布局完整。
- 不新增未经用户确认的产品事实或生产承诺。

## 当前明确不做

- 不把 Product 页改成横向轮播或页码式浏览。
- 不在 Product 页加入价格、MOQ、交期、认证、剂量或疗效宣称。
- 不替换首页锁定屏幕，不重做全站导航。
- 不在第一版接入服务端表单、CRM、支付、分析或 CMS。
