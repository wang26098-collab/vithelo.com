# VITHELO 首页第三屏主打产品设计规范

日期：2026-09-06  
状态：视觉方向已确认

## 目标

将首页第三屏从抽象的能力边界说明改为三个主要产品方向的主打产品陈列。参考 Seed 截图的结构机制：顶部三段式信息区、下方连续产品卡、首卡重点突出；不复制 Seed 的绿色、品牌、产品命名、购买逻辑或代码。

只修改第三屏及其直接关联的数据、样式和测试。已确认的第二屏保持不变。

## 与第五屏的职责区别

- 第三屏回答“VITHELO 当前主推什么”：以具体包装和产品卡建立产品感，并把访客导向询盘。
- 第五屏回答“这些方向服务什么消费场景”：继续保留睡眠、运动、女性三个方向在一屏内随纵向滚动切换的故事体验。
- 两屏可以使用同一组方向与包装资产，但不重复长文案、版式或交互任务。

## 桌面构图

- 使用深石墨色整屏背景，不使用 Seed 绿色。
- 顶部为三栏：左侧主标题，中间一句说明，右侧 `View All Products →`。
- 下方三张连续产品卡占据主体视野。睡眠卡约占 `1.15fr`，运动和女性各占 `1fr`。
- 卡片不用悬浮阴影；通过轻微明度差、细边框、产品图比例和留白建立层级。
- 每张卡由方向标签、产品名称、产品图、B2B 说明、`Discuss This Product →` 组成。

## 内容

章节标识：`03 · FEATURED PRODUCTS`

主标题：`Three directions. Built into flagship products.`

说明：`A focused starting range for brands developing daily nutrition products across distinct consumer routines.`

顶部入口：`View All Products →`，链接 `/products`。

三张产品卡：

1. `Sleep Health` — `Evening-format concepts shaped around a clear daily routine.`
2. `Active Nutrition` — `Portable product concepts for energy, hydration and recovery routines.`
3. `Women’s Health` — `Daily nutrition concepts developed around a defined life-stage or wellness brief.`

每张卡的主行动为 `Discuss This Product →`，链接 `/contact`。不展示零售价格、疗效、剂量、数字 MOQ 或购买按钮。

## 图片

- 睡眠：`/media/vithelo-product-card-sleep.png`
- 运动：`/media/vithelo-product-card-active.png`
- 女性：`/media/vithelo-product-card-womens.png`
- 图片仅展示 VITHELO 品牌，不引入 Seed 资产。
- 卡片裁切优先保证包装主体和 VITHELO 字标完整；不把已有海报缩小后再套一层卡片边框。

## 交互与动效

- 第三屏随正常页面滚动进入，不使用滚动劫持、自动轮播或强制横向滚动。
- 三张卡按阅读顺序轻量渐显。
- 桌面悬停时：卡片背景轻微提亮，图片缓慢放大约 `1.02`，箭头水平移动；卡片不做夸张倾斜。
- 键盘焦点清晰，所有行动目标不小于 44px。
- Reduced Motion 下直接显示最终状态，取消图片缩放和位移动画。

## 响应式

- 桌面：三卡横排，睡眠卡略宽。
- 平板：三卡等宽或睡眠卡跨两列，按可读性决定，不产生内容挤压。
- 手机：三卡纵向排列，每张卡完整展示；不使用横向滑轨。

## 验收标准

- 第三屏第一眼呈现三个具体 VITHELO 主打产品，而不是抽象能力模块。
- 结构参考 Seed，但视觉仍属于 VITHELO 的石墨、象牙和钛金属体系。
- 睡眠、运动、女性三张产品图均清晰出现，睡眠卡具有明确但克制的主卡层级。
- 不出现 Seed 品牌、绿色主题、价格、Shop Now、认证、疗效、数字 MOQ 或内部治理说明。
- `/products` 与 `/contact` 链接可用；桌面、平板、手机无裁切、重叠或横向溢出。
- 第二屏和第五屏不因本次实现被重新设计。
