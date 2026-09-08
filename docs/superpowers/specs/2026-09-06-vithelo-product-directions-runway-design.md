# VITHELO 首页第 5 屏单屏产品切换设计

> 日期：2026-09-06
> 状态：方案 A 与三个产品方向已获用户确认

## 真实问题

第 5 屏需要呈现参考网站“一个视口内连续换画面”的体验，而不是把多张产品卡纵向平铺。用户滚动页面时，中央产品画面保持在同一屏内，内容依次切换；到达首尾后自然进入上一屏或下一屏。

## 内容范围

只保留三个产品方向，并按以下顺序切换：

1. Sleep, Stress & Mood
2. Active Nutrition
3. Women’s Wellness

Beauty From Within、Gut & Digestive Health、Daily Essentials 从首页第 5 屏移除。此次不删除其它页面或内容模型中的相关产品能力。

## 交互模型

- `#solutions` 形成约三个视口高度的自然滚动轨道。
- 轨道内部只有一个 `position: sticky` 的可见舞台，始终占据一个视口。
- 三个无视觉负担的滚动段提供滚动距离；CSS View Timeline 根据 section 进度切换对应画面。
- 当前方向在舞台内显示，上一张淡出并轻微缩小，下一张淡入并回到正常尺度。
- 不调用 `preventDefault()`，不监听 `wheel` 来锁定页面，不使用内部滚动容器。
- 到第一段和最后一段边界时，浏览器原生滚动自然带用户离开第 5 屏。

## 视觉设计

- 延续已确认的冷 Ivory 页面底色和大面积留白。
- 屏幕中央保留一张横向圆角产品画面，比例约 1.92:1，宽度约 66vw，最大宽度 1080px。
- 产品完整居中展示；使用同图模糊铺底填充横向画幅，避免竖版包装被裁切。
- 产品方向名称使用白色高对比衬线字体，覆盖在画面中央。
- 左下方只显示 `01`、`02`、`03`，右下方保留 VITHELO 微型字标。
- 当前方向的一句说明位于图片下方，不叠加按钮、页码总数、箭头或玻璃卡片。

## 产品素材

- Sleep, Stress & Mood：`/media/vithelo-product-card-sleep.png`
- Active Nutrition：新增 `/media/vithelo-product-card-active.png`
- Women’s Wellness：`/media/vithelo-product-card-womens.png`

Active Nutrition 新图只表现 VITHELO 运动营养包装与简洁运动场景，不出现未经验证的成分、功效、剂量、认证、MOQ 或市场声明。三张图继续标记为演示素材，不构成实际产品证明。

## 组件边界与状态

- `VitheloMarketStage` 保持为无状态展示组件；切换由 CSS View Timeline 完成，不依赖 React 状态或滚轮事件。
- 内容仍从 `vitheloB2BHome.market.stories` 进入，不在组件内硬编码产品文案。
- 初始画面为第一张；支持 View Timeline 的现代浏览器随自然滚动依次显示三张画面。
- 切换状态只影响舞台内叠放的三张画面，不改变页面滚动位置。
- DOM 中保留三个完整故事，不设置伪交互控件，也不依赖 JavaScript 才能获得内容。

## 响应式与无障碍

- 桌面端 sticky 舞台为一个完整视口；图片保持横向画幅。
- 移动端仍在一个视口内切换，但图片改为接近 4:5，确保包装完整可见。
- Reduced Motion 下取消 sticky 切换，三组内容恢复为顺序可读版式，确保信息完整可见。
- 无 JavaScript 时 View Timeline 仍可切换；不支持该能力时至少保持第一张内容可见并可自然越过第 5 屏。
- 不增加键盘不可达的伪按钮；该段本身没有必须点击的控制。

## 验收标准

- `#solutions[data-layout="sticky-product-switcher"]` 存在。
- DOM 中只有三个 `market-story`，顺序为睡眠、运动、女性。
- 任一时刻舞台内只有一个故事可见，滚动经过三个段落时画面依次为睡眠、运动、女性。
- 可见舞台高度不超过一个视口，整个 section 提供三段自然滚动距离。
- Section 内没有上一页、下一页、总页码或横向轮播语义。
- 页面不存在 `wheel.preventDefault()` 或其它滚动劫持。
- 375、390、768、1024、1440 和 1920 宽度无横向溢出、标题裁切或产品消失。
- Reduced Motion 下三组内容顺序显示完整图片、标题和说明。
- Hero、其它首页屏幕以及已确认的询盘收尾不发生视觉或行为变化。

## 不做事项

- 不恢复旧版左右箭头和页码。
- 不自动播放，不设置定时轮播。
- 不修改 Header、Hero、产品格式屏、OEM / ODM 屏或询盘屏。
- 不复制参考网站的品牌、图片、文案或代码，只复用其单屏滚动叙事原则。
