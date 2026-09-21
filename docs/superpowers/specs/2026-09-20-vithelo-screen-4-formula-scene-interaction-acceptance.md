# VITHELO 首页第 4 屏 Formula 场景交互验收

日期：2026-09-20  
范围：首页第 4 屏 `04 · PRODUCT DEFINITION`，仅 Formula 节点。第 2、3、5–9 屏不在本次改动范围。

## 验收结论

- Formula 场景功能完成，待用户最终视觉确认。
- Formula 单项 P0：0。
- Formula 单项 P1：0（独立复审后更新）。
- 另外三个节点继续保持静态，文案与内容任务未改变。

## 已实现行为

- 默认显示中央瓶体总览。
- 桌面鼠标移入 Formula 后，主图以柔和整图交叉淡化切换到配方定制场景；移出恢复总览。
- 触屏点击 Formula 激活；再次点击或点击 Formula 外部恢复。
- 键盘聚焦可激活，`Escape` 可恢复；鼠标、键盘、触屏交替使用时不会遗留旧状态。
- 离开该屏可视区域后自动恢复总览。
- 激活画面同时显示三条 HTML 说明：Ingredient Direction、Serving Brief、Feasibility Review。
- Reduced Motion 下取消过渡，但保留可见的最终状态与说明。

## 新增影像素材

- 工作区路径：`public/media/b2b/vithelo-formula-customization-atmospheric.png`
- 规格：1536 × 1024，PNG，`DEMO_ONLY`
- 内容边界：无成品包装、无品牌、无认证标志、无功效/剂量宣称、无可读配方文字。

## 响应式与视觉复核

- 已复核：1440 × 900、1280 × 800、1024 × 768、768 × 1024、390 × 844、375 × 812、360 宽。
- 1280 × 800 已增加自动化不重叠检查；Formula 说明与 Dosage Form / Packaging 节点交叠面积均为 0。
- 390 宽触屏画面使用克制的深色半透明说明底，提高浅色纸张区域上的可读性。
- 交叉淡化：opacity 500ms；景深 transform 650ms。
- 未发现横向溢出、裁切、节点遮挡或 Formula 场景引起的跨屏修改。

## 自动化验证

- Formula / 首页相关定向单元测试：4 个文件，37/37 通过。
- Formula 定向 E2E：12 通过、18 按项目条件跳过、0 失败。
- 覆盖真实触屏 `tap()`、二次 tap、外部 tap、touch → Escape、keyboard → 双 tap、hover → focus → Escape、实际 opacity / visibility、Reduced Motion、1280 × 800 不重叠。
- ESLint 全量：通过。
- `git diff --check`：无空白错误；仅工作区既有 CRLF 提示。

## 当前工作区的非 Formula 阻塞

- 全量单元测试：162/163 通过；唯一失败为首页几何哈希契约。该哈希在本任务开始前已经与当前并行首页 CSS 不一致，本次未更新哈希掩盖并行变化。
- 最新生产构建在 TypeScript 阶段被并行新增的 `tests/unit/vithelo-about-content.test.ts` 阻塞：该测试读取尚不存在的 `hero.meta`。Formula 变更此前的 `typecheck` 与生产构建均通过；当前失败不位于 Formula 相关文件。
- 当前工作区同时存在 OEM / ODM、Insights、About、产品页等并行未提交改动；本次未替用户整理、覆盖或提交这些文件。

## 最终确认

- 用户视觉确认：待确认。
- 生产数据状态：Formula 场景继续明确标记为 `DEMO_ONLY`，未替换为生产证据。
