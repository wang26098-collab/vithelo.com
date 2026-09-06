# VITHELO Home Capability and Inquiry Expansion Implementation Plan

> **For agentic workers:** Execute inline with TDD. Do not commit overlapping implementation files because they contained user changes before this task.

**Goal:** 升级制造证明、剂型交互、询盘生成器、品牌签名与 Hero 高度，同时保持七屏结构和内容边界。

**Architecture:** 内容事实继续由 Zod 内容层提供；新增客户端询盘生成器只组合现有 URL 工具，不发送或存储数据。首页组件只负责语义结构，CSS Modules 负责响应式布局、hover/focus 和 Reduced Motion。

**Tech Stack:** Next.js 16、React、TypeScript、CSS Modules、Zod、Vitest、Testing Library、Playwright。

---

### Task 1: 内容契约与制造证明

**Files:** `src/content/schema.ts`、`src/content/demo/vithelo-b2b-home.ts`、`tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] 先写失败测试，断言四项批准数字、来源边界和辅助说明。
- [ ] 扩展 `proof` 为包含 `kicker/title/copy/summary/sourceBoundary/items` 的对象。
- [ ] 写入批准文本，不加入 audited、认证或逐年趋势。
- [ ] 运行 `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`。

### Task 2: 询盘 URL 组合契约

**Files:** `src/components/patterns/vithelo-home-inquiry-composer.tsx`、`tests/unit/vithelo-home-inquiry-composer.test.tsx`

- [ ] 先写失败测试，填写五个字段并断言 Email/WhatsApp 链接包含输入值。
- [ ] 实现受控字段与动态链接，不调用 fetch，不持久化数据。
- [ ] 断言隐私说明可见且没有 submit button。
- [ ] 运行定向测试并确认通过。

### Task 3: 首页结构

**Files:** `src/components/patterns/vithelo-b2b-home.tsx`、`tests/unit/vithelo-b2b-home.test.tsx`

- [ ] 先写失败测试，断言制造证明标题、来源边界、询盘生成器、签名和七屏顺序。
- [ ] 重构 proof DOM，挂载询盘生成器并在 Contact 内加入品牌签名。
- [ ] 把剂型名称改成可聚焦 `/products` 链接。
- [ ] 运行定向单测。

### Task 4: 视觉与交互

**Files:** `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] Hero 调整为 `min-height: clamp(640px, 88svh, 860px)`，背景保持 `transform: none`。
- [ ] 建立第二屏 58/42 编辑式布局和四项底部账本；移动端改为单列正文和两列数字。
- [ ] 剂型 hover/focus 增强当前单元和形态，触屏与 Reduced Motion 回退。
- [ ] 询盘生成器采用现有 Graphite/Ivory/Titanium 语言，不复制绿色卡片。
- [ ] Contact 内加入低动画品牌签名收尾。

### Task 5: 上线提醒与验证

**Files:** `docs/current-status.md`、`docs/missing-production-inputs.md`、`tests/e2e/nutrition-home-sequence.spec.ts`、`tests/e2e/accessibility.spec.ts`

- [ ] 记录方案 3 的上线升级门槛。
- [ ] 增加 Hero 高度、七屏、八剂型、无内部提交和 Reduced Motion 的浏览器断言。
- [ ] 运行 lint、typecheck、unit、E2E、build 和一次 Impeccable 检测。
- [ ] 在六个验收视口做一轮视觉检查，修复 P0/P1 后最多确认一次。
