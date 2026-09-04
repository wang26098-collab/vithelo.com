# Codex Desktop × Hermes Controller Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个只服务 VITHELO、由 Codex Desktop 通过本地 MCP 控制、由隔离 Hermes Worker 执行的受控半自动网站开发系统。

**Architecture:** Controller 作为 Windows 普通用户进程提供窄 MCP 工具、状态机、策略、审批、审计和 Kill Switch；Hermes 与测试浏览器按任务运行在 WSL2/Docker 中。实施分六个可独立验收的阶段，上一阶段 Gate 通过后才进入下一阶段。

**Tech Stack:** Node.js 20、TypeScript 5.9、MCP SDK 1.30、Zod 4.4、Vitest 4.1、SQLite、Docker Compose、Playwright、PowerShell。

---

## 0. 计划边界与目录

Controller 作为仓库内独立工具包存在，不加入根应用依赖，不改变 Hostinger 构建入口：

```text
tools/hermes-controller/
  package.json
  pnpm-lock.yaml
  tsconfig.json
  vitest.config.ts
  src/
  tests/
  docker/
  policies/
  scripts/
  docs/
```

统一命令从仓库根执行：

```powershell
pnpm.cmd --dir tools/hermes-controller install --frozen-lockfile
pnpm.cmd --dir tools/hermes-controller lint
pnpm.cmd --dir tools/hermes-controller typecheck
pnpm.cmd --dir tools/hermes-controller test
pnpm.cmd --dir tools/hermes-controller build
```

## 1. 阶段文件

1. [阶段 A：Controller 骨架](2026-09-04-codex-hermes-phase-a-controller-core.md)
2. [阶段 B：隔离 Worker](2026-09-04-codex-hermes-phase-b-worker-isolation.md)
3. [阶段 C：受控工具](2026-09-04-codex-hermes-phase-c-controlled-tools.md)
4. [阶段 D：审批与安全](2026-09-04-codex-hermes-phase-d-security-approval.md)
5. [阶段 E：证据与验收](2026-09-04-codex-hermes-phase-e-evidence-acceptance.md)
6. [阶段 F：对抗与试运行](2026-09-04-codex-hermes-phase-f-adversarial-rollout.md)

## 2. 阶段 Gate

| 阶段 | 入口 | 出口 |
|---|---|---|
| A | 设计规范已确认 | MCP 只读闭环、状态持久化、审计可用 |
| B | A 通过 | Worker 非 root、无网、限额、可完全终止 |
| C | B 通过 | 补丁、白名单命令、预览和临时浏览器受控可用 |
| D | C 通过 | L0-L3、审批、防重放、脱敏、Kill Switch 通过 |
| E | D 通过 | Evidence Bundle 与 VITHELO 六视口验收闭环通过 |
| F | E 通过 | Gate 0-3 达标，才允许日常 L0/L1 使用 |

## 3. 总体验证

- [ ] `git diff --check` 无错误。
- [ ] Controller 的 lint、typecheck、unit、integration、security 测试全部通过。
- [ ] VITHELO 原有 `pnpm.cmd lint/typecheck/test/test:e2e/build` 全部通过。
- [ ] 项目外读写、未知网络出口、明文秘密、无法停止 Worker 均为零。
- [ ] 文档、安装、运维、Kill Switch 和恢复演练齐全。
- [ ] 只提交 `tools/hermes-controller/**`、本计划和经批准的项目策略文件。

