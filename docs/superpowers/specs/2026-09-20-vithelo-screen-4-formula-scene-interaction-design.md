# VITHELO 首页第 4 屏 Formula 场景交互设计

## 目标

在不改变第 4 屏内容任务、中央瓶体总览和四个决策节点结构的前提下，为 `Formula` 增加一层可逆的详细定制场景。用户通过桌面悬停、键盘聚焦或移动端点击，从“一个成品由四项决策共同塑造”的总览进入 Formula 细节；退出交互后自动回到原有中央瓶体总览。

本阶段只实现 `Formula`。`Dosage Form`、`Sensory Direction` 和 `Packaging` 保持当前静态状态，不提前制作其详细场景。

## 核心体验

### 默认状态

- 保留当前暖暗中央 VITHELO 概念瓶体图片。
- 保留现有星环、四个 HTML 节点、标题、正文和 CTA。
- `Formula` 与其他三个节点保持相同的基础视觉层级，但提供明确的 hover、focus-visible 和 active 反馈。

### Formula 激活状态

- 整张主图由中央瓶体总览交叉淡化为 Formula 定制场景。
- 切换采用用户批准的 A 方案：柔和整图交叉淡化，不使用横向轮播、翻页或强烈遮罩扩散。
- 默认图轻微淡出并最多放大约 1.02；Formula 场景由约 1.02 缩放回 1，建立很轻的景深推进。
- 星环可以降低不透明度并轻微放大，但不得旋转、循环闪烁或成为视觉主角。
- Formula 节点进入强调状态，其他三个节点仍可见但不响应为详细场景。

### Formula 场景信息

Formula 场景内以 HTML 呈现三条简短说明，不把文字烘焙进图片：

1. `INGREDIENT DIRECTION` — `What belongs in the brief`
2. `SERVING BRIEF` — `How the concept should be framed`
3. `FEASIBILITY REVIEW` — `How the direction fits production`

这些文字只解释项目定义过程，不构成配方、功效、剂量、认证、监管或生产承诺。第 4 屏现有公开标题、正文、CTA 和节点文案保持不变。

## 输入与状态规则

组件只需要两个视觉状态：

- `overview`：当前中央瓶体总览。
- `formula`：Formula 详细定制场景。

不引入多节点状态机、轮播索引、自动播放或计时器。

### 桌面鼠标

- `pointerenter` Formula：进入 `formula`。
- `pointerleave` Formula：恢复 `overview`。
- 指针离开节点后不保持选择。

### 键盘

- Formula 必须是原生可聚焦控件。
- `focus` 或键盘激活：进入 `formula`。
- `blur` 或 `Escape`：恢复 `overview`。
- 使用清晰的 `focus-visible` 样式，不只依赖颜色表达当前状态。

### 触屏

- 第一次点击 Formula：进入 `formula`。
- 再次点击 Formula：恢复 `overview`。
- 点击第 4 屏内 Formula 控件之外的区域：恢复 `overview`。
- 滚动离开第 4 屏时恢复 `overview`，避免用户返回时停留在无上下文状态。

## 组件与数据边界

- 在第 4 屏局部组件内维护 `overview | formula` 状态，不提升到页面级状态。
- Formula 节点从纯展示结构变为语义按钮；其他三个节点保持当前结构和顺序。
- 默认图片继续使用现有 `customization.media`。
- Formula 新图片通过内容 schema 与 fixture 登记，状态必须为 `DEMO_ONLY`，包含路径、准确替代文本、尺寸和格式。
- 两张图片同时存在于同一视觉容器中，以 opacity 和轻微 transform 切换；不在 hover 时才发起动态 import 或网络请求。
- Formula 场景的三条说明保存在内容层，组件只负责渲染和状态切换。

## Formula 图片方向

新图片延续第 4 屏的暖暗 Atmospheric Cinema：可可灰低曝光空间、暖象牙纸张、克制蜂蜜色高光、配方工作台、无品牌的简化资料层、粉末或抽象原料材质。画面需要为底部三条 HTML 信息预留安全区域。

禁止出现：

- 可读配方、具体成分表、剂量或功效；
- GMP、HACCP、ISO、FDA 等认证或监管标志；
- 其他品牌、包装矩阵、药品或医疗场景；
- 冷蓝实验室、绿色草本频道、霓虹科技界面；
- 烘焙进图片的标题、标签或节点文字。

## 动效参数

- 主图交叉淡化：约 480–560ms。
- 轻微景深缩放：约 620–720ms。
- 三条 HTML 说明：在主图切换开始后约 140–180ms 进入，移动距离不超过 8px。
- easing 复用项目现有 narrative/standard motion token，不新增页面局部任意时长变量。
- 不使用循环动画、视差、滚动劫持或鼠标跟随。

## Reduced Motion

当 `prefers-reduced-motion: reduce`：

- 取消缩放、位移和延迟；
- 状态切换立即完成，或仅保留极短的不透明度变化；
- Formula 图片和三条说明在激活后必须直接处于最终可见状态；
- 用户退出后必须立即恢复总览。

## 可访问性

- Formula 使用原生 `button`，点击目标不小于 44×44px。
- 控件使用 `aria-pressed` 表达触屏/点击激活状态，并通过 `aria-controls` 关联 Formula 说明区域。
- Formula 场景图片使用准确但克制的 alt；装饰性的星环和遮罩保持 `aria-hidden`。
- 三条说明在 DOM 中保持正常阅读顺序，不依赖图片中的文字。
- 键盘、鼠标和触屏均可进入与退出，不制造只能 hover 才能看到的必要信息。

## 响应式

- 桌面与平板横向构图保留中央视觉和四节点关系。
- 手机继续使用当前顺序节点清单；点击 Formula 后切换同一视觉容器，不弹出模态框、不创建横向滑动层。
- Formula 场景必须在六个验收视口保留主要资料和材质主体，三条说明不得溢出、遮挡节点或低于可读对比度。

## 测试与验收

### 单元测试

- Formula 媒体为 `DEMO_ONLY` 且路径、尺寸、格式有效。
- 初始状态为 `overview`。
- pointer enter/leave、focus/blur、Escape、点击切换和外部点击恢复符合规则。
- Formula 激活时三条说明出现；恢复后不再处于可见状态。
- 其他三个节点数量、标题和文案不变。

### E2E

- 桌面 hover Formula：主图进入 Formula 状态；移出后恢复。
- 键盘 Tab 聚焦 Formula：进入；Escape 恢复；焦点样式可见。
- 手机点击 Formula：进入；再次点击和点击空白区域均恢复。
- Reduced Motion 下状态可达且没有等待动画才能读取的内容。
- 1440×1000、1280×800、1024×1366、768×1024、390×844、360×800 无裁切、重叠或横向溢出。

## 不在本阶段范围

- 不制作另外三个节点的详细场景。
- 不改变第 4 屏公开文案、CTA、屏高或节点顺序。
- 不修改 Hero、导航或第 2、3、5–9 屏。
- 不增加后端、CMS、分析事件或自动播放。
