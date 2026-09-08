# VITHELO 首页第三屏主打产品验收记录

日期：2026-09-06
状态：实现完成，等待用户视觉确认

## 实现结果

- 第三屏已由抽象能力边界改为 Editorial Product Runway。
- 仅展示 Sleep Health、Active Nutrition、Women’s Health 三款主打产品。
- Sleep 使用更宽的主卡比例，三张 VITHELO 产品图片均直接作为卡片主体画面，没有引入 Seed 品牌、绿色主题或零售购买逻辑。
- 桌面顶部保留标题、说明与 `View All Products`，三张卡均提供 `Discuss This Product` 询盘入口。
- 桌面 1440×900 可在一屏内看到完整标题区、三款产品和卡片行动区。
- 平板为两列且 Sleep 跨两列；手机为单列自然纵向浏览。
- 保留 `#capacity-boundary` 锚点，第二屏制造证明与第五屏纵向产品方向不作重新设计。

## 内容与证据边界

- 未展示价格、剂量、功效、认证、数字 MOQ 或 `Shop Now`。
- 三张图片均只公开 VITHELO 标识。
- 产品说明保持方向性和 B2B 项目语境，不把演示包装转化为未经核实的产品声明。

## 验证结果

- 单元测试：115 passed，0 failed。
- 第三屏响应式、首页序列与动效定向 E2E：21 passed，3 skipped（非桌面条件跳过）。
- Reduced Motion 定向 E2E：6 passed。
- `pnpm.cmd typecheck`：通过。
- `pnpm.cmd build`：通过，运行环境为本地 Node 24.16.0；尚不构成 Hostinger Node 20.x 生产证明。
- 375、390、768、1024、1280、1440 六个验收宽度下，第三屏产品网格无横向溢出。

## 视觉证据

- 桌面：`tmp/featured-products-desktop-final.png`
- 手机：`tmp/featured-products-mobile-final.png`

用户视觉确认前，本记录不声明第三屏 P0/P1 已清零。
