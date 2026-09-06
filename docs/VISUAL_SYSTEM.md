# VITHELO Visual System 2.0

> 视觉系统服务于 SEO / GEO 信息层级。Global Navigation 属于冻结区域，不继承会改变其外观的全局改造。

## 视觉目标

International B2B supplement manufacturing brand：Premium、Editorial、Manufacturing、Technical、Evidence-led、Clean、Quiet、Confident。

视觉高级感来自比例、字体、真实证据、留白、构图、页面节奏和信息层级；不使用霓虹、粒子、重玻璃、3D 漂浮、自动播放重视频或伪实验室视觉。

## 基础系统

| 维度 | 当前规则 |
| --- | --- |
| 色彩 | Cold Ivory、Graphite、Titanium、restrained Optical light；Nutrition 不单独变成绿色通道 |
| 色彩比例 | Neutral / White 65–75%；Soft background 15–25%；Brand primary 5–10%；Accent 极少 |
| 字体 | 沿用现有 precision neo-grotesk；Display、UI、Body 统一语言；Navigation 单独冻结 |
| 容器 | 沿用 token-led container；标准约 82rem，阅读宽度约 44rem，表单约 38rem |
| 间距 | 使用现有 token scale；新增数值前先写入 `src/styles/tokens.css` |
| 圆角 | 低圆角为默认；大圆角只用于明确的媒体容器，不把所有内容做成卡片 |
| 边框 | 细 hairline、统一中性颜色与透明度；普通内容不依赖厚阴影 |
| 阴影 | 仅 overlay 使用轻阴影；普通 card 依赖 surface、border、contrast |
| 图片 | 真实产品 / 生产 / R&D / Quality 画面优先；尺寸、宽高比和 loading 策略明确 |
| Caption | 使用具体场景名，如 Gummy Manufacturing、Powder Blending、QC Documentation；不得制造未核验能力 |

## 页面构图

- Home：9 屏各自承担单一采购任务；允许左右交替、非对称、全宽 evidence、media-led 和 editorial composition。
- Products / Dosage：突出剂型属性、材质、包装和项目关联，不做 8 个相同瓶子排排站。
- Manufacturing：突出 Reality、Scale、Operations、Production、Evidence；不使用工厂外部图片。
- Quality：突出 Precision、Documentation、Inspection；没有真实 evidence 时宁缺毋滥。
- OEM / ODM：形成 Idea → Development → Sample → Scale 的项目开发关系，不做 SaaS 流程图。
- Insights：Technical Journal / Editorial Library 节奏；文章首部保留 direct answer。
- Contact：Project Start Center；Email、WhatsApp、What to Prepare、What Happens Next 清晰可见。

## 动效与响应式

- 动效只承担 orientation、hierarchy、process understanding、feedback 或 focus。
- 优先 opacity / transform / CSS；禁止 scroll-jacking、large parallax、3D rotate、无限自动循环和重视频。
- `prefers-reduced-motion` 下移除非必要运动，信息和事实仍完整显示。
- Mobile 逐屏重新判断顺序、CTA 位置、图片裁切、密度和高度；不得让 H1 变成 6–8 行、CTA 被推远、Email 或 WhatsApp 消失。
- Tablet 768–1024 单独检查，不把它当作缩小版 desktop。

## 实施边界

依赖方向保持：Tokens → Core Components → Domain Components → Page Patterns → validated content。

所有产品、制造、质量、认证、产能、MOQ、客户和市场事实必须来自内容层并保留来源与状态；不在 page pattern 中硬编码。
