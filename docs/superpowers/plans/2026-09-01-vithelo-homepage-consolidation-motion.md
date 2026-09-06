# VITHELO Homepage Consolidation and Motion Implementation Plan

**状态：已实施并完成自动化验证。** 2026-09-01 后的第二屏单屏重做是新的独立任务，不属于本计划范围。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the homepage, remove misleading controls and dead form UI, and add restrained semantic motion without changing the hero artwork.

**Architecture:** Keep validated content and existing page components. Change only the Home composition, its CSS, the market-stage controls, and directly affected tests; do not invent production data or refactor unrelated routes.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Motion, Vitest, Playwright.

---

### Task 1: Lock the new homepage contract

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`

- [x] Assert the seven retained section IDs in order.
- [x] Assert the Home contact has no form or disabled submission button.
- [x] Assert market pagination and horizontal controls are absent.
- [x] Run the focused tests and confirm they fail for the removed behavior.

### Task 2: Consolidate content and controls

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-market-stage.tsx`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [x] Remove standalone development, manufacturing, quality, and customer-network sections from Home.
- [x] Expand the retained project runway with bounded development, production, quality, and delivery steps.
- [x] Remove the homepage form and retain direct contact preparation guidance.
- [x] Remove market page count and left/right controls while preserving native vertical scroll behavior.

### Task 3: Correct layout and semantic motion

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `src/components/patterns/vithelo-market-stage.module.css`

- [x] Keep the hero image static.
- [x] Add one-time reveal to gummy/dosage content and progressive runway steps.
- [x] Keep proof and evidence content static.
- [x] Make the eight-format grid balanced so Oral Films has no unintended full-row emphasis.
- [x] Preserve the Reduced Motion static fallback.

### Task 4: Verify

**Files:**
- Modify only files directly implicated by a verified regression.

- [x] Run focused unit tests.
- [x] Run lint and typecheck.
- [x] Run the complete E2E suite.
- [x] Capture desktop and mobile screenshots and visually confirm no P0/P1 defect in the consolidation scope.

## 最终验证记录

- Unit：30 个测试文件、96 项测试通过。
- Lint：通过。
- Typecheck：通过。
- E2E：225 项通过，15 项按视口条件跳过。
- 动效行为测试覆盖桌面与移动端进入视口触发。
- 用户随后重新打开视觉质量评审，当前只推进第二屏，不撤销本计划已完成的结构收口。
