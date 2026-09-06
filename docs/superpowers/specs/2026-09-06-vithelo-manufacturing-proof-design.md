# VITHELO 首页第二屏制造实力设计规范

日期：2026-09-06  
状态：视觉方向已确认（A 方案）

## 目标

把首页第二屏从抽象说明改为可快速建立信任的制造实力总览。版式遵循用户提供的参考图所体现的结构机制：左侧信息与数据、右侧真实工厂影像、底部四项制造能力。只修改第二屏，Hero 与其余已确认屏幕保持不变。

## 桌面构图

- 第二屏使用冷象牙白背景和石墨色文字，延续 VITHELO 现有视觉系统。
- 主体上半部为约 `48 / 52` 的左右分栏，整体宽度沿用首页内容容器。
- 左栏依次为章节标识、两行主标题、简短说明、四项关键数字和主按钮。
- 右栏展示用户资料中的真实生产线照片，采用大面积裁切，不添加来源公司的标识、墙面标语或虚构文字。
- 下半部为横向四列能力栏，以线性图标、能力名称和一句说明组成；细分隔线替代卡片、圆角与阴影。

## 内容

章节标识：`02 · MANUFACTURING CAPABILITY`

主标题：`From Formula to Finished Product`

说明：`A manufacturing partner for nutrition products, bringing development, multi-format production and delivery into one coordinated system.`

关键数字：

1. `2008` — Established
2. `5,000+` — Customers served
3. `50+` — Countries & regions
4. `7` — Production categories

主按钮：`Explore Our Factory`，链接 `/manufacturing`。

底部能力：

1. `R&D Support` — Formula development and sample coordination
2. `Multi-format Production` — Gummies, capsules, tablets, powders and liquids
3. `Quality Control` — Process control, batch inspection and traceability
4. `OEM / ODM Delivery` — Packaging coordination and production delivery

上述数据和能力均来自 `独立站内容/99-内部敏感/企业资料与证照/森酷企业介绍(2).pdf`。公开页面只呈现 VITHELO 品牌；来源企业名称和 Logo 不进入页面、图片文字、替代文本或元数据。

## 影像

- 首选素材：`独立站内容/01-工厂实力/室内现场/工厂实力-室内现场-05.jpg`，对应真实洁净生产环境。该图在视觉检查中未发现来源公司名称或 Logo；原定设备图含可见设备品牌，因此不用于公开页面。
- 实施时复制为语义化英文文件名到 `public/media/b2b/`，源文件保持不动。
- 图片使用 `object-fit: cover`，桌面端保留生产线纵深和瓶体传送带；移动端优先保留设备与产品，不裁到任何来源品牌标识。
- 替代文本只描述可见场景，不加入认证、产能或所有权推断。

## 交互与动效

- 不使用滚动劫持，不在本屏内切换页面。
- 入场只做一次轻量 `EXPLAIN`：左侧内容、数据、右侧图片和底部能力按阅读顺序渐显并轻微上移。
- 按钮具有明确的 hover、focus-visible 和 active 状态，触控目标不小于 44px。
- Reduced Motion 下所有内容直接处于最终可见状态。

## 响应式

- 桌面：左右分栏，四项数字单行，底部四列。
- 平板：左右分栏可收窄；数字保持两列或四列，避免标题与图片互相挤压。
- 手机：按文字、数据、图片、能力栏顺序纵向排列；数字两列，能力项单列或两列；不产生横向滚动。

## 验收标准

- 第二屏一眼可识别为制造实力，而不是通用品牌卡片。
- 页面结构与参考图一致，但不复制参考网站的品牌、文案、代码或装饰细节。
- 真实工厂图清晰可见，四项关键数字和四项能力完整显示。
- 页面不出现来源公司名称、Logo、认证 Logo、`NOT_CONFIGURED`、`DEMO_ONLY` 或内部治理说明。
- `/manufacturing` 链接、键盘焦点、Reduced Motion 和移动端布局正常。
- 只改变第二屏及其直接关联的内容、样式、素材和测试。
