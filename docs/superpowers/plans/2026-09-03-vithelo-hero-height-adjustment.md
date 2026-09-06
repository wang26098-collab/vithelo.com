# VITHELO Hero Height Adjustment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页 Hero 提高到接近完整视口，同时保持锁定背景图和其他首页布局不变。

**Architecture:** 仅修改首页 CSS 中 Hero 的桌面与移动端高度规则。使用现有 Playwright 响应式测试读取真实渲染高度，确保规则在桌面和移动视口生效。

**Tech Stack:** Next.js 16、CSS Modules、Playwright、Vitest、TypeScript

---

### Task 1: 锁定 Hero 真实渲染高度

**Files:**
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [x] **Step 1: 添加失败的真实浏览器高度断言**

在首页响应式测试中读取 `#hero` 的边界框，并断言其高度等于 `Math.min(viewportHeight - 24, 900)`，允许 2px 渲染误差。

```ts
const heroBox = await page.locator("#hero").boundingBox();
expect(heroBox).not.toBeNull();
expect(heroBox!.height).toBeCloseTo(
  Math.min(testInfo.project.use.viewport!.height - 24, 900),
  -0.3,
);
```

- [x] **Step 2: 运行测试并确认旧规则失败**

Run: `pnpm.cmd test:e2e -- tests/e2e/responsive.spec.ts`

Expected: Hero 高度断言失败，因为当前仍使用 `88svh`。

- [x] **Step 3: 实施最小 CSS 调整**

将桌面规则改为：

```css
.hero {
  min-height: min(calc(100svh - 24px), 900px);
}
```

将移动端原有独立高度覆盖改为相同规则：

```css
.hero {
  min-height: min(calc(100svh - 24px), 900px);
  align-items: flex-start;
}
```

- [x] **Step 4: 运行针对性验证**

Run: `pnpm.cmd test:e2e -- tests/e2e/responsive.spec.ts`

Expected: 响应式测试通过，桌面和移动端 Hero 高度符合公式。

- [x] **Step 5: 运行静态验证**

Run: `pnpm.cmd lint`

Expected: exit code 0。

Run: `pnpm.cmd typecheck`

Expected: exit code 0。

- [x] **Step 6: 检查实际预览**

打开 `http://127.0.0.1:3200/`，确认 Hero 明显提高、文字和按钮未裁切、背景图没有缩放或位移、页面无横向溢出。
