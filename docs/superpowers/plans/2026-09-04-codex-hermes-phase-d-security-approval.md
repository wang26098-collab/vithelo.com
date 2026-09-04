# Phase D Security and Approval Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 L0-L3、一次性审批、网络默认拒绝、脱敏、提示词注入防护和 Kill Switch。

**Architecture:** Policy Engine 独立于 Hermes；动作执行前后均校验。审批令牌使用 HMAC，绑定任务、动作和参数哈希。

**Tech Stack:** Node crypto、Zod、Vitest、Docker network controls。

---

### Task D1: 权限策略

**Files:**
- Create: `tools/hermes-controller/src/policy/action-policy.ts`
- Create: `tools/hermes-controller/policies/vithelo.policy.json`
- Test: `tools/hermes-controller/tests/unit/action-policy.test.ts`

- [ ] 写表驱动测试覆盖规范中所有 L0-L3 动作。
- [ ] 实现判级函数；未知动作默认 L3/deny，Hermes 不能传入等级。
- [ ] 把 VITHELO 品牌、Hero、内容与未配置功能硬规则写入版本化策略。
- [ ] 运行测试并 Commit：`feat: enforce action and VITHELO policies`。

### Task D2: 一次性审批

**Files:**
- Create: `tools/hermes-controller/src/approval/approval-service.ts`
- Test: `tools/hermes-controller/tests/security/approval-token.test.ts`

- [ ] 写失败测试：重放、过期、参数改变、跨任务使用、撤销后使用全部失败。
- [ ] 令牌 payload 固定为 `{taskId, actionId, paramsHash, expiresAt, nonce}`，HMAC key 只在 Controller 内存与受限配置中。
- [ ] 消费令牌与动作落库使用同一事务。
- [ ] 运行测试并 Commit：`feat: add single-use scoped approvals`。

### Task D3: 脱敏与提示词边界

**Files:**
- Create: `tools/hermes-controller/src/security/redactor.ts`
- Create: `tools/hermes-controller/src/security/context-labeler.ts`
- Test: `tools/hermes-controller/tests/security/redaction.test.ts`

- [ ] 写 API Key、Bearer、Cookie、私钥、连接串、邮箱、Windows 用户路径和 OCR 文本测试。
- [ ] 所有外部内容包装为 `DATA`，Controller 指令包装为签名 `TASK/POLICY/CAPABILITY`。
- [ ] 日志持久化与 MCP 返回前分别执行脱敏，避免只保护一个出口。
- [ ] 运行测试并 Commit：`feat: isolate untrusted context and redact secrets`。

### Task D4: Kill Switch

**Files:**
- Create: `tools/hermes-controller/src/security/kill-switch.ts`
- Create: `tools/hermes-controller/scripts/stop-all.ps1`
- Test: `tools/hermes-controller/tests/integration/kill-switch.test.ts`

- [ ] 测试顺序：拒绝新任务→撤销令牌→断网→终止进程→工作卷只读→封存证据。
- [ ] 提供 `system.stopAll` 和独立 PowerShell 入口；后者不依赖 MCP 正常。
- [ ] 演练卡死 Worker，10 秒内完全终止。
- [ ] Gate D 通过并 Commit：`feat: add controller kill switch`。

