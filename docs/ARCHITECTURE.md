# VITHELO 架构摘要

- 页面层：`src/app/` App Router 路由与 metadata。
- 组合层：`src/components/patterns/` 页面模式；`src/components/core/` 导航、壳层和询盘原语。
- 内容层：`src/content/schema.ts` 定义 Zod 合同；`src/content/demo/` 提供明确的 `DEMO_ONLY` 记录。
- 适配层：`src/lib/content.ts` 提供本地内容读取；页面不直接内嵌业务事实。
- 样式层：`src/styles/tokens.css` 与组件 CSS modules。
- 动效层：`src/components/motion/` 只处理语义进入和询盘字形转场；页面内容仍由服务端组件与内容合同提供。询盘转场使用原生滚动、sticky 和 `requestAnimationFrame`，不接管滚轮。
- 验证层：Vitest 单测、Playwright E2E、lint、typecheck、build。

依赖方向保持为 Tokens → Core → Domain → Patterns → Validated Content。

首页询盘数据流：`VitheloB2BHomeContentSchema` → 本地内容 adapter → `VitheloB2BHome` → `VitheloInquiryReveal`。场景图保持 `DEMO_ONLY`，Email 与 WhatsApp URL 由询盘工具生成；站内不保存表单内容。
