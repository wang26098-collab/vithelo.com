# VITHELO 首页第四屏定制能力星图设计规范

日期：2026-09-06  
状态：视觉方向已确认

## 目标

将首页第四屏从“软糖图片 + 六个文字卡片”改为以包装和多剂型元素为核心的定制能力星图。参考用户提供图片的构图机制：左侧品牌主张、中央悬浮产品组合、四周能力节点、底部能力条；不复制参考图中的品牌、具体素材或未经核实的商业承诺。

本次只修改第四屏及其直接关联的内容、图片、动效与测试。Hero、第二屏、第三屏、第五屏及其他已确认页面结构保持不变。

## 核心概念

名称：`Customization Constellation`

第四屏回答：“VITHELO 可以围绕一个品牌概念定制哪些部分？”

中央包装是项目核心，配方、剂型、口味与包装四项能力围绕它形成可读关系。画面不是产品零售广告，而是面向品牌方的 OEM / ODM 能力说明。

## 桌面构图

- 整屏使用冷象牙底色、石墨文字和克制的钛金属线条。
- 左侧约占 34%，包含章节标识、主标题、说明与行动入口。
- 中央及右侧约占 66%，以一只白色 `VITHELO` 包装瓶作为主视觉，瓶身略向右倾斜并悬浮。
- 包装瓶周围分布粉末、胶囊、软糖、片剂和软胶囊，以轻微大小和虚实差建立空间层次。
- 四个能力节点分布在主视觉周围：左上 `Formula`、左下 `Dosage Form`、右上 `Flavor & Taste`、右下 `Packaging`。
- 节点使用圆形图标、小标题与两至四行关键词，不做统一白色卡片墙。
- 底部使用一条横向能力带，四项内容等距排列，末端提供 `/oem-odm` 深入入口。

## 页面内容

章节标识：`04 · CUSTOMIZATION`

主标题：`Tailored to Your Brand.`

说明：`From formula and format to taste and packaging, VITHELO coordinates the key decisions behind a distinctive nutrition product.`

主行动：`Start Your Customization →`，链接 `/contact`。

四个能力节点：

1. `Formula` — `Ingredients · Serving · Product brief`
2. `Dosage Form` — `Gummies · Capsules · Tablets · Powders · Liquids`
3. `Flavor & Taste` — `Flavor · Sweetness · Texture · Color`
4. `Packaging` — `Bottles · Pouches · Boxes · Labels`

底部能力带：

1. `OEM / ODM` — `Flexible development routes`
2. `Flexible MOQ` — `Based on formula and packaging`
3. `Multi-format Production` — `One coordinated manufacturing system`
4. `Packaging Coordination` — `From container to finished presentation`

深入入口：`Explore Customization →`，链接 `/oem-odm`。

不展示具体功效、剂量、价格、数字 MOQ、采样速度、保密承诺、认证或法规状态。

## 中央视觉资产

新建一张横向、透明背景或可自然融入冷象牙背景的高分辨率产品组合图，公开品牌只出现 `VITHELO`。

画面要求：

- 主体为一只无具体产品功效和剂量声明的白色营养品包装瓶。
- 瓶身只保留 `VITHELO`、`CUSTOM NUTRITION` 和克制的装饰线，不出现 `YOUR BRAND` 或第三方品牌。
- 周围包括一只半透明胶囊、一颗软胶囊、一颗圆片剂、一只软糖以及少量暖珊瑚色粉末扩散。
- 材质真实、光线柔和、阴影克制，风格接近高端营养品静物摄影与精致 3D 产品渲染之间。
- 主体边缘完整，预留四周节点区域，不把文字、节点或底部信息直接生成进图片。
- 禁止复制参考图瓶型、构图细节、图标、文字和颜色关系；参考图仅用于理解“中央核心 + 周边能力”的结构。

图片进入 `public/media/b2b/`，使用不暴露生成来源或内部治理信息的英文文件名与英文替代文本。网页中的能力文字仍由 HTML 渲染，不能烘焙进图片。

## 动效

动效意图为 `EXPLAIN`，用于解释“一个项目核心如何展开成四类定制决策”。

进入第四屏时：

1. 左侧标题与说明从下方轻量渐显。
2. 中央瓶身由 `translateY(18px) + rotate(2deg)` 进入最终位置。
3. 周围剂型元素从瓶身附近向各自位置展开，时间错开但总时长控制在约 900ms 内。
4. 四个能力节点按 Formula、Dosage Form、Flavor & Taste、Packaging 的阅读顺序出现。
5. 底部能力带最后整体揭示。

桌面指针悬停时：

- 节点边框和图标轻微加深，关联引导线提高可见度。
- 中央产品组合只进行不超过 6px 的轻微景深偏移，不进行持续旋转、追随光标或夸张弹跳。
- CTA 箭头水平移动约 4px。

不使用滚动劫持、自动轮播、循环漂浮、粒子系统或持续消耗资源的动画。

Reduced Motion 下直接显示最终状态，取消位移、旋转、缩放和分步延迟；所有内容在不触发动效时仍完整可见。

## 响应式

- 1280px 以上：左侧文案、右侧星图、底部能力带在一个桌面视口内完成主要信息表达。
- 901–1279px：标题移至顶部，中央视觉居中，四个节点围绕图片形成两列，底部能力带保持两列或四列。
- 760px 以下：按标题、中央图片、四个能力节点、底部能力带顺序纵向排列，不保留绝对定位环绕，避免文字压图。
- 手机不使用横向滑轨；图片、节点和行动目标不得造成横向溢出。

## 无障碍

- 第四屏使用语义化 section、heading、article 与链接。
- 中央组合图提供描述性英文 alt；装饰引导线和图标对读屏隐藏。
- 行动目标不小于 44px，并保留清晰的 `:focus-visible` 状态。
- 内容阅读顺序与 DOM 顺序一致，不依赖绝对定位决定语义顺序。

## 验收标准

- 第一眼能够看到 `VITHELO` 包装和多剂型元素，明确理解这是定制能力而不是单一软糖展示。
- 布局机制接近用户参考图，但视觉仍属于 VITHELO 的冷象牙、石墨与钛金属体系。
- Formula、Dosage Form、Flavor & Taste、Packaging 四项能力均清晰可读。
- 桌面主要内容在一屏内形成完整构图；手机自然纵向浏览且无横向溢出。
- 图片和动效承担解释任务，不遮挡文字，不取代 HTML 内容。
- 不出现第三方品牌、`YOUR BRAND`、价格、数字 MOQ、Fast Sampling、Confidential、认证或未经核实的能力承诺。
- `/contact` 与 `/oem-odm` 链接可用，Reduced Motion 内容完整。
- 第三屏和第五屏不因本次实现被重新设计。
