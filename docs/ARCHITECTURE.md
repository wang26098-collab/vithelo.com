# VITHELO 架构摘要

- 页面层：`src/app/` App Router 路由与 metadata。
- 组合层：`src/components/patterns/` 页面模式；`src/components/core/` 导航、壳层和询盘原语。
- 内容层：`src/content/schema.ts` 定义 Zod 合同；`src/content/demo/` 提供明确的 `DEMO_ONLY` 记录。
- 适配层：`src/lib/content.ts` 提供本地内容读取；页面不直接内嵌业务事实。
- 样式层：`src/styles/tokens.css` 与组件 CSS modules。
- 验证层：Vitest 单测、Playwright E2E、lint、typecheck、build。

依赖方向保持为 Tokens → Core → Domain → Patterns → Validated Content。
