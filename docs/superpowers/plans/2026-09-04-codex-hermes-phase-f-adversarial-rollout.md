# Phase F Adversarial Testing and Rollout Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用对抗、故障、影子和真实低风险任务证明系统达到 Gate 0-3。

**Architecture:** 测试按不可跳过 Gate 顺序执行；任何项目外读写、泄密、未记录副作用或无法停止 Worker 都使写能力降级到只读。

**Tech Stack:** Vitest、Docker、Playwright、PowerShell、审计报告。

---

### Task F1: Gate 0 静态安全

**Files:**
- Create: `tools/hermes-controller/scripts/verify-gate-0.ps1`
- Create: `tools/hermes-controller/docs/gate-0-report.md`

- [ ] 执行 lint、typecheck、unit、integration、security、镜像扫描和依赖审计。
- [ ] 验证 Controller 仅监听 loopback，容器基线与策略快照一致。
- [ ] 记录 P0/P1；任一不为零即失败。
- [ ] Commit：`test: complete Hermes gate zero`。

### Task F2: Gate 1 对抗测试

**Files:**
- Create: `tools/hermes-controller/tests/adversarial/path-escape.test.ts`
- Create: `tools/hermes-controller/tests/adversarial/command-injection.test.ts`
- Create: `tools/hermes-controller/tests/adversarial/network-bypass.test.ts`
- Create: `tools/hermes-controller/tests/adversarial/prompt-injection.test.ts`
- Create: `tools/hermes-controller/tests/adversarial/secret-leak.test.ts`
- Create: `tools/hermes-controller/docs/gate-1-report.md`

- [ ] 实现规范列出的全部攻击样本，包含 README 读 SSH、链接逃逸和 Shell 元字符。
- [ ] 每个攻击必须断言动作被阻断、无副作用且有审计事件。
- [ ] Kill Switch 和 Controller 重启故障注入各演练一次。
- [ ] Commit：`test: complete adversarial isolation gate`。

### Task F3: Gate 2 影子任务

**Files:**
- Create: `tools/hermes-controller/docs/gate-2-shadow-runbook.md`
- Create: `tools/hermes-controller/docs/gate-2-results.md`

- [ ] 创建仓库复制工作区，不挂载真实写路径。
- [ ] 完成 10 个任务：项目检查 2、测试诊断 2、截图 2、只读设计审查 2、故障恢复 2。
- [ ] 要求零越权、零未记录副作用、零无法停止 Worker、证据完整率 100%。
- [ ] 用户审阅结果后 Commit：`test: complete ten shadow tasks`。

### Task F4: Gate 3 受控写入

**Files:**
- Create: `tools/hermes-controller/docs/gate-3-controlled-write-runbook.md`
- Create: `tools/hermes-controller/docs/gate-3-results.md`

- [ ] 选择 20 个低风险任务，只允许文档、测试、小型局部样式；每个任务单独批准范围。
- [ ] 每个任务检查最小 diff、项目测试、六视口、回滚补丁和用户验收。
- [ ] 达成成功率 ≥90%、P0/P1=0、项目外读写=0、泄密=0、停止率=100%。
- [ ] 用户签收后 Commit：`test: complete controlled write gate`。

### Task F5: 日常运维交付

**Files:**
- Create: `tools/hermes-controller/docs/operations.md`
- Create: `tools/hermes-controller/docs/recovery.md`
- Create: `tools/hermes-controller/docs/security-incident.md`

- [ ] 文档化安装、启动、停止、健康检查、日志、升级和回滚。
- [ ] 实际演练 SQLite 恢复、项目锁恢复、残留容器清理和凭据泄露处置。
- [ ] 配置每月权限/失败样本复审与每季度 Kill Switch 演练。
- [ ] 最终只开放 L0/L1，L2 逐次审批，L3 继续禁用。
- [ ] Commit：`docs: complete Hermes operations handoff`。

