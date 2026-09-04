# Phase B Worker Isolation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建非 root、默认断网、资源受限且可完全终止的单任务 Hermes Worker。

**Architecture:** Controller 通过明确 argv 调用 Docker CLI；不挂载 Docker socket。每个任务创建私有内部网络、工作区挂载和证据卷。

**Tech Stack:** Docker Desktop/WSL2、Docker Compose、Node 20、Vitest。

---

### Task B1: Worker 镜像

**Files:**
- Create: `tools/hermes-controller/docker/worker.Dockerfile`
- Create: `tools/hermes-controller/docker/entrypoint.sh`
- Test: `tools/hermes-controller/tests/security/container-baseline.test.ts`

- [ ] **Step 1: 写安全失败测试**，检查运行用户不是 root、根目录只读、无 `CAP_SYS_ADMIN`、无 Docker socket。
- [ ] **Step 2: 创建固定 Node 20 镜像**，创建 UID/GID 10001，只复制 Hermes Adapter 运行产物；入口不使用 Shell 拼接。
- [ ] **Step 3: 构建** `docker build -f tools/hermes-controller/docker/worker.Dockerfile -t vithelo-hermes-worker:test tools/hermes-controller`。
- [ ] **Step 4: 运行安全测试**，Expected: PASS。
- [ ] **Step 5: Commit** `git commit -m "feat: add hardened Hermes worker image"`。

### Task B2: Worker Supervisor

**Files:**
- Create: `tools/hermes-controller/src/worker/docker-client.ts`
- Create: `tools/hermes-controller/src/worker/supervisor.ts`
- Test: `tools/hermes-controller/tests/integration/worker-lifecycle.test.ts`

- [ ] **Step 1: 写失败测试**，验证参数包含 `--read-only --cap-drop ALL --security-opt no-new-privileges --network none --cpus 2 --memory 4g --pids-limit 128`。
- [ ] **Step 2: 实现 `spawn("docker", argv, { shell: false })`**，禁止字符串命令。
- [ ] **Step 3: 实现 30 分钟任务、5 分钟无进展、10 秒强制终止和任务结束删除容器。
- [ ] **Step 4: 模拟卡死子进程，验证容器和全部子进程消失。
- [ ] **Step 5: Commit** `git commit -m "feat: supervise isolated task workers"`。

### Task B3: 挂载和项目写锁

**Files:**
- Create: `tools/hermes-controller/src/worker/mount-policy.ts`
- Create: `tools/hermes-controller/src/services/project-lock.ts`
- Test: `tools/hermes-controller/tests/security/mount-policy.test.ts`

- [ ] **Step 1: 写路径逃逸测试**，覆盖 `..`、symlink、junction、Unicode 和大小写。
- [ ] **Step 2: 实现最终真实路径校验，只允许仓库映射到 `/workspace/vithelo`，证据目录映射到 `/artifacts/<taskId>`。
- [ ] **Step 3: 实现单项目一个写锁；Controller 重启时不确认的锁进入人工恢复。
- [ ] **Step 4: 运行 Gate B：无网、限额、挂载、停止与锁测试全部 PASS。
- [ ] **Step 5: Commit** `git commit -m "feat: enforce worker mounts and project locking"`。

