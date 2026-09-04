# Phase A Controller Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付只读 MCP Controller、任务状态机、SQLite 持久化和哈希链审计。

**Architecture:** 独立 TypeScript 包；业务层不依赖 MCP transport，便于单元测试。第一阶段不启动 Hermes、不写项目文件、不访问公网。

**Tech Stack:** Node 20、TypeScript、MCP SDK、Zod、better-sqlite3、Vitest。

---

### Task A1: 建立独立工具包

**Files:**
- Create: `tools/hermes-controller/package.json`
- Create: `tools/hermes-controller/tsconfig.json`
- Create: `tools/hermes-controller/vitest.config.ts`
- Create: `tools/hermes-controller/src/index.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "@vithelo/hermes-controller",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20.9 <21" },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "1.30.0",
    "better-sqlite3": "13.0.3",
    "zod": "4.4.3"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.13",
    "@types/node": "24.0.0",
    "typescript": "5.9.3",
    "vitest": "4.1.10"
  }
}
```

- [ ] **Step 2: 安装并锁定依赖**

Run: `pnpm.cmd --dir tools/hermes-controller install`  
Expected: 生成 `tools/hermes-controller/pnpm-lock.yaml`，退出码 0。

- [ ] **Step 3: 建立严格 TypeScript 配置并验证空入口**

Run: `pnpm.cmd --dir tools/hermes-controller typecheck`  
Expected: PASS。

- [ ] **Step 4: Commit**

```powershell
git add tools/hermes-controller/package.json tools/hermes-controller/pnpm-lock.yaml tools/hermes-controller/tsconfig.json tools/hermes-controller/vitest.config.ts tools/hermes-controller/src/index.ts
git commit -m "build: scaffold Hermes controller"
```

### Task A2: 定义领域 Schema 和状态机

**Files:**
- Create: `tools/hermes-controller/src/domain/task-schema.ts`
- Create: `tools/hermes-controller/src/domain/task-state.ts`
- Test: `tools/hermes-controller/tests/unit/task-state.test.ts`

- [ ] **Step 1: 写失败测试**，覆盖正常路径、终止状态、`Accepted` 只能从 `Review` 进入、终态不可继续转换。
- [ ] **Step 2: 运行** `pnpm.cmd --dir tools/hermes-controller test -- task-state.test.ts`，确认 FAIL。
- [ ] **Step 3: 实现固定转换表**

```ts
export const transitions = {
  Draft: ["Validated", "Rejected"],
  Validated: ["Approved", "PolicyBlocked", "Rejected"],
  Approved: ["Running", "Cancelled"],
  Running: ["Evidence", "Failed", "TimedOut", "PolicyBlocked", "ResourceExceeded", "Cancelled", "Unknown"],
  Evidence: ["Review", "Failed"],
  Review: ["Accepted", "Rejected"],
  Accepted: [], Rejected: [], Failed: [], TimedOut: [], PolicyBlocked: [], ResourceExceeded: [], Cancelled: [], Unknown: []
} as const;
```

- [ ] **Step 4: 重跑测试**，Expected: PASS。
- [ ] **Step 5: Commit** `git commit -m "feat: add task contracts and state machine"`。

### Task A3: SQLite 与审计哈希链

**Files:**
- Create: `tools/hermes-controller/src/storage/database.ts`
- Create: `tools/hermes-controller/src/audit/audit-log.ts`
- Test: `tools/hermes-controller/tests/unit/audit-log.test.ts`

- [ ] **Step 1: 写失败测试**，验证任务重启后恢复、审计事件追加、前一哈希被篡改后校验失败。
- [ ] **Step 2: 实现迁移**：`tasks`、`approvals`、`evidence_index`、`schema_migrations` 四张表；启用 WAL 与 foreign keys。
- [ ] **Step 3: 实现事件哈希**

```ts
const hash = createHash("sha256")
  .update(`${previousHash}\n${canonicalJson(event)}`)
  .digest("hex");
```

- [ ] **Step 4: 运行测试**，Expected: PASS。
- [ ] **Step 5: Commit** `git commit -m "feat: persist tasks and tamper-evident audit"`。

### Task A4: 只读 MCP 闭环

**Files:**
- Create: `tools/hermes-controller/src/mcp/server.ts`
- Create: `tools/hermes-controller/src/services/project-inspector.ts`
- Test: `tools/hermes-controller/tests/integration/mcp-readonly.test.ts`

- [ ] **Step 1: 写失败测试**，只允许 `project.inspect`、`task.get`、`system.health`，未知工具返回标准 MCP 错误。
- [ ] **Step 2: 实现 stdio MCP transport**，工具输入全部用 Zod `.strict()`。
- [ ] **Step 3: `project.inspect` 只返回规则哈希、Git 基线、dirty 文件名和能力清单，不返回项目外内容。
- [ ] **Step 4: 运行全部测试与 typecheck**，Expected: PASS。
- [ ] **Step 5: Gate A 验收并 Commit** `git commit -m "feat: expose read-only controller MCP"`。

