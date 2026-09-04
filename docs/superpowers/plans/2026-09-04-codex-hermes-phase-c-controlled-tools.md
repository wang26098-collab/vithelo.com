# Phase C Controlled Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 提供文件补丁、固定命令、本地预览和临时浏览器四类受控工具。

**Architecture:** Hermes 只能提交结构化 CandidateAction；Controller 重新判定真实路径、argv、端口和预算后执行。

**Tech Stack:** TypeScript、Git、pnpm、Playwright、Docker internal network。

---

### Task C1: 文件读取与补丁

**Files:**
- Create: `tools/hermes-controller/src/tools/files.ts`
- Create: `tools/hermes-controller/src/policy/path-policy.ts`
- Test: `tools/hermes-controller/tests/security/file-tools.test.ts`

- [ ] 写失败测试：项目外读、链接逃逸、超大文件、哈希冲突、未允许写路径全部拒绝。
- [ ] 实现 `readFile` 上限 1 MiB；二进制只返回元数据。
- [ ] 实现 `applyPatch` 前检查 `expectedHashes`，写后记录哈希和 unified diff。
- [ ] 运行测试，Expected: PASS。
- [ ] Commit：`feat: add hash-guarded file tools`。

### Task C2: 命令注册表

**Files:**
- Create: `tools/hermes-controller/src/tools/command-registry.ts`
- Create: `tools/hermes-controller/policies/commands.vithelo.json`
- Test: `tools/hermes-controller/tests/security/command-policy.test.ts`

- [ ] 写失败测试：未知 commandId、cwd 越界、额外参数、Shell 元字符和后台进程全部拒绝。
- [ ] 注册 `project.lint/typecheck/test/testE2e/build/dev`；Windows 映射 `pnpm.cmd`，Linux 映射 `pnpm`。
- [ ] 使用 `spawn(executable, args, { shell: false, cwd })`，保存退出码、持续时间和脱敏输出。
- [ ] 验证 `test:e2e` 不与第二个 3100 端口服务并行。
- [ ] Commit：`feat: add exact-argv command registry`。

### Task C3: 本地预览与临时浏览器

**Files:**
- Create: `tools/hermes-controller/src/browser/browser-runner.ts`
- Create: `tools/hermes-controller/src/browser/viewport-matrix.ts`
- Test: `tools/hermes-controller/tests/integration/browser-runner.test.ts`

- [ ] 写失败测试：外部 URL、非批准端口、持久化 Profile 和跨任务复用全部拒绝。
- [ ] 实现临时 Chromium Profile、控制台/网络错误采集和六视口截图。
- [ ] 固定只允许任务的本地 origin；Reduced Motion 使用浏览器上下文设置。
- [ ] 任务结束删除 Profile，截图写只读证据卷。
- [ ] Gate C 全部通过后 Commit：`feat: add isolated local browser evidence`。

