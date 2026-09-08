# 询盘字形转场验收记录

日期：2026-09-06。状态：本地实现完成，等待用户视觉验收；已包含在本地 `main` 提交 `a58a4a6` 中，尚未推送或部署。

## 本次实现
- 首页最后一屏：VITHELO 字形遮罩、原生纵向滚动放大、产品场景与询盘内容显现。
- 使用内容合同中的软糖示意图，`DEMO_ONLY` 边界保留在数据与 DOM。
- 原有预填 Email、WhatsApp 和询盘草稿保持可用。
- 六视口截图检查完成；竖屏字体保持比例；Reduced Motion、锚点和键盘可以跳过装饰转场。
- 发现原有全站 loading 边界在无 JavaScript 时不会退出，因此给 loading 增加仅在无 JavaScript 时出现的已有 InquiryActionPair。正常页面布局不变。

## 验证结果
- 新增转场与原有询盘 E2E：42 项通过，覆盖六视口（24 转场/静态访问 + 18 询盘路径）。日志：`tmp/inquiry-focused-e2e.log`。
- 最新生产构建通过：`tmp/inquiry-build.log`。本地运行时 Node 24.16.0，非 Hostinger Node 20 最终环境证明。
- `pnpm.cmd typecheck` 通过；最终构建中的类型检查再次通过。
- 本次修改的 TS/TSX 文件定向 ESLint 通过。
- 全量单测：111 通过、5 失败；移除本次组件的对照文件仍复现相同 5 项失败，涉及制造区、产品方向、图片元数据和旧 motion 断言。对照日志：`tmp/inquiry-baseline-tests.log`。
- 全量 ESLint 未通过：扫描下载的参考站脚本等非本次内容，424 errors / 19208 warnings。
- 全站 E2E：271 通过、50 失败、15 跳过；失败集中在制造区、产品方向、Hero、证据边界与旧首页结构断言。日志：`tmp/inquiry-full-e2e.log`。不能据此宣称全站通过验收。

## 视觉证据与预览
- `tmp/inquiry-final-visuals/` 保存六视口起始、过程与完成截图。
- 本地 `http://localhost:3000/#project-runway`，继续向下滚动查看转场。
- `http://localhost:3000/#contact` 直接显示联系方式，按设计跳过转场。

## 待确认
用户对最后一屏实际画面和滚动节奏的视觉验收。其他屏幕和全站历史检查问题未在本次修改范围内修复。
