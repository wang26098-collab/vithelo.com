# VITHELO 询盘转场实施计划

目标：在现有首页询盘区实现已确认的字形穿越，保留原有渠道和草稿功能。

架构：独立客户端 motion 组件接收服务端询盘内容；SVG 反向字形遮罩、原生 sticky 与 requestAnimationFrame 更新进度。产品示意图由 Zod 内容合同和 adapter 传入。新增视觉值进入 tokens。

- [x] 新增询盘 scene 内容字段和独立 motion 组件及样式；将现有 contactIntroGrid 放入组件，草稿保持其后。
- [x] 监听原生 scroll/resize，使用 `progress = clamp(-top / (height - stickyHeight))`，不拦截滚轮。字体遮罩放大后消退，文本在后半程出现。
- [x] 无 JS 和 Reduced Motion 默认静态；焦点进入及 `#contact` 跳转直接显示完整内容。
- [x] 添加 E2E：真实滚动起止状态、焦点可用、运行时 Reduced Motion、移动端布局、锚点跳转。
- [x] 运行 `pnpm.cmd lint`、`pnpm.cmd typecheck`、`pnpm.cmd test`、`pnpm.cmd test:e2e`、`pnpm.cmd build`；区分工作区原有失败和本次回归。
- [x] 检查六视口画面，提供本地预览，记录尚待用户视觉验收。

当前工作区存在大量用户未提交改动，仅保留本次局部文件变更，不打包提交已有工作。

验证详情见同日期 inquiry-reveal-acceptance.md；执行检查已完成，全站原有失败已记录，用户视觉签收仍待完成。
