# Phase E Evidence and Acceptance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 生成不可混淆的任务证据包，并完成 Codex 审查与 VITHELO 验收闭环。

**Architecture:** Evidence Service 只引用本任务生成的哈希化 artifact；Controller 验证完整性后才允许进入 Review。

**Tech Stack:** TypeScript、Git diff、Playwright、Vitest、JSON Schema。

---

### Task E1: Evidence Bundle

**Files:**
- Create: `tools/hermes-controller/src/evidence/evidence-schema.ts`
- Create: `tools/hermes-controller/src/evidence/evidence-service.ts`
- Test: `tools/hermes-controller/tests/unit/evidence-service.test.ts`

- [ ] 写失败测试：缺 diff、退出码、截图哈希、风险或回滚补丁时不能进入 Review。
- [ ] 实现 changedFiles、unifiedDiff、commands、tests、screenshots、browserFindings、policyEvents、unresolvedRisks、rollbackPatch。
- [ ] artifact 引用绑定 taskId、SHA-256、MIME、字节数和创建时间。
- [ ] 测试通过并 Commit：`feat: build verifiable task evidence bundles`。

### Task E2: Codex 审查工具

**Files:**
- Modify: `tools/hermes-controller/src/mcp/server.ts`
- Create: `tools/hermes-controller/src/services/review-service.ts`
- Test: `tools/hermes-controller/tests/integration/review-flow.test.ts`

- [ ] 写完整闭环测试：create→run→evidence→review→accepted/rejected。
- [ ] 实现 `evidence.list/read` 与 `review.submit`；`Accepted` 只允许从 Review 且证据完整。
- [ ] 返修必须创建新 taskId，不复活终态任务。
- [ ] 测试通过并 Commit：`feat: close the Codex review loop`。

### Task E3: VITHELO 验收器

**Files:**
- Create: `tools/hermes-controller/src/acceptance/vithelo-acceptance.ts`
- Create: `tools/hermes-controller/policies/viewports.vithelo.json`
- Test: `tools/hermes-controller/tests/integration/vithelo-acceptance.test.ts`

- [ ] 固定六视口、Reduced Motion、键盘、控制台错误、横向溢出与 P0/P1 规则。
- [ ] 执行项目 lint/typecheck/test/test:e2e/build，并记录环境版本。
- [ ] 检查公开身份、锁定 Hero、禁用声明和任务允许页面范围。
- [ ] Gate E 通过并 Commit：`feat: automate VITHELO acceptance evidence`。

