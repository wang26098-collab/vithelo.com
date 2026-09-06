# VITHELO 全站 Header 一致性修复

2026-09-05。本轮仅统一 Header、滚动状态、前景对比度及必要的首屏避让，未修改导航 IA、文案、SEO、询盘流程或首页内容。

原始分歧有两层：首页与 Products 等内页共用 `VitheloB2BNavigation`，但内页被固定为 scrolled，glass CSS 又限定首页；Manufacturing、Quality、About、剂型详情通过 `RouteShell` 使用历史 `SiteHeader`。

现在上述十类公开页面均复用 `VitheloB2BNavigation`。现有页面级 `VitheloB2BSiteFrame` 保留；原先遗漏的四类路由由 `RouteShell` 接入同一 Frame，内容来自根布局的已验证 adapter。历史 Header 只保留在既有历史路由分支，未创建新的内页 Header。

- 顶部为 fixed 透明导航；滚动后使用首页原有两个 glass containers，颜色、间距、CTA、圆角、阴影和 220ms 过渡沿用现状。
- 有 Hero 时沿用首页 8% Hero 高度的阈值；文章及文字首屏为 64px。改为共享 scroll/resize 监听，避免高于视口的 Hero 在顶部就进入 sticky 状态；路由变化重新绑定并关闭菜单。
- `dark-hero` 用于首页与 OEM / ODM；`light-hero` 用于文章、剂型详情、Manufacturing、Quality、About；`split-hero` 用于左暗右亮的 Products、Insights、Contact，仅改变右侧 Contact / Menu 前景色。滚动后全部统一为深色前景。
- top/scrolled 使用同一批导航 DOM；仅保留既有 desktop/mobile 两种响应式结构，共用同一菜单数据。产品详情和文章详情分别继承 Products、Insights active state。
- 1200px 及以下使用现有 Menu 模式，避免完整七项导航与 CTA 在平板宽度相互挤压。保留键盘操作，补充 Escape 关闭并返回焦点、焦点离开关闭、点击链接关闭；可见目标达到 44px。
- 内页顶部内容留出 7rem，Header 不再占据白色整行。内页锚点避让为 6rem；首页已有锚点规则保持。滚动切换不会改变 main 文档坐标。
- DEMO 提示此前没有环境控制。本轮不猜测生产是否可以移除，将原文作为页面末尾独立提示保留，未删除事实边界。
- 添加 `-webkit-backdrop-filter` 及不支持 blur 时的浅色背景 fallback。Chromium 已验证；本机没有 WebKit/Safari，未声称完成 Safari 实机测试。

验证结果：

- `pnpm.cmd test`：33 个文件，114 项通过。
- `pnpm.cmd lint`、`pnpm.cmd typecheck`、`pnpm.cmd build`：通过。
- 六档视口 Header 与既有导航相关 E2E：261 通过，15 按视口跳过；余下事实提示、询盘、首页序列 E2E 在生产构建上执行，42 通过。全套合计 303 通过，15 跳过。
- 新增 Header 回归覆盖 `/`、`/products`、`/products/gummies`、`/oem-odm`、`/manufacturing`、`/quality`、`/insights`、一篇文章、`/about`、`/contact` 的顶部与滚动状态，以及 active、焦点、Escape、44px、溢出、锚点、Reduced Motion 和客户端路由切换。
- 生产构建在 1440 / 900 / 390 下额外截图，覆盖 Home、Products、Manufacturing、文章的顶部/滚动，共 24 张及一张菜单展开图。对比页：`tmp/header-qa/index.html`；复现脚本：`tmp/header-qa.mjs`；本地生产预览：`http://127.0.0.1:3201/products`。

构建使用本机 Node 24.16.0 / pnpm 10.34.5；Hostinger 的 Node 20 环境未在本轮复核，配置未修改。没有提交、推送或部署。技术验证完成，最终视觉签收仍由用户确认。
