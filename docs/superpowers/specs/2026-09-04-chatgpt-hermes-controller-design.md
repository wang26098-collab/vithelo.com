# Codex Desktop × Hermes 受控网站开发系统设计规范

> 日期：2026-09-04  
> 状态：设计已逐节确认  
> 适用项目：VITHELO Next.js 网站  
> 文档语言：中文  
> 公开网站内容语言：英文

## 1. 执行摘要

本方案建设一个本地、单项目、受控半自动的网站开发系统：Codex Desktop 负责产品、设计、任务定义和最终验收；Hermes 使用自己的模型与额度，在 WSL2 与 Docker 隔离环境中执行代码修改、测试、浏览器检查和截图；二者之间由 Windows 主机上的本地 MCP Controller 连接。

Controller 是唯一可信控制面。它负责身份验证、任务 Schema 校验、风险分级、权限审批、任务状态、资源限制、结果脱敏、审计日志和紧急停止。Hermes 被视为不可信执行 Worker：即使模型受到提示词注入、发生推理错误或主动尝试越权，也只能使用任务明确授予的最小能力。

第一版只服务当前 VITHELO 仓库。它不会建设多项目平台、远程公网控制、用户系统、无人值守发布或生产环境自动化。L0 只读与 L1 可恢复写入可在任务范围内自动运行；L2 敏感动作逐次人工批准；L3 外部副作用第一版默认禁用。

### 1.1 控制端决策

顶层控制端确定为 Codex Desktop，而不是 ChatGPT Desktop。根据 2026-09-04 查阅的 [OpenAI 官方文档](https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt)，ChatGPT 不能直接连接本地 MCP；完整读写 MCP 当前面向 Business、Enterprise/Edu 的 ChatGPT Web，本地服务需要 Secure MCP Tunnel。为了保持纯本地边界、避免远程隧道和额外账号依赖，本方案使用 Codex Desktop 的本地工具/插件接入路径。

若未来重新要求使用 ChatGPT，必须把它作为一次架构变更处理：增加 Secure MCP Tunnel、远端认证、ChatGPT 工作区权限、工具快照更新和新的数据出境验收，不能沿用本规范中“纯本地 MCP”的安全结论。

## 2. 真实问题与设计原则

### 2.1 真实问题

在不把整台电脑控制权交给 AI 的前提下，让 Codex Desktop 负责网站总设计、产品判断与视觉验收，让 Hermes 在隔离环境中完成 VITHELO 网站的编码、测试、浏览器检查和截图反馈。

### 2.2 设计原则

1. **最小权限**：能力由任务显式授予，不因模型声称需要而扩大。
2. **默认拒绝**：路径、命令、网络、凭据或状态不确定时，停止而不是猜测。
3. **控制与执行分离**：Codex 不直接获得 Hermes Shell，Hermes 不获得审批能力。
4. **结构化边界**：自然语言在进入执行面前必须转换为通过 Schema 校验的任务包。
5. **可恢复写入**：所有写入形成补丁、文件哈希和基线证据。
6. **有证据的完成**：没有 diff、退出码、测试、截图或剩余风险说明，任务不能验收。
7. **单任务、单 Worker**：Worker 随任务创建和销毁，禁止无限自治循环。
8. **SLC 优先**：第一版 Simple、Lovable、Complete，不建设暂时不需要的平台能力。

## 3. 第一版范围

### 3.1 Must Have

- Codex Desktop 通过本地 MCP 访问 Controller。
- Controller 只监听 `127.0.0.1`，不开放局域网或公网。
- Hermes Worker 运行在 WSL2 + Docker 隔离环境中。
- 第一版只允许访问 VITHELO 仓库。
- 支持项目检查、结构化任务、代码补丁、固定测试、本地预览、Playwright 检查和截图。
- 支持四级权限、L2 人工审批、审计日志、证据包和 Kill Switch。
- 支持任务取消、超时、异常终止和重启后的安全恢复。
- 将 VITHELO 的品牌、内容和页面硬规则编码为项目策略。

### 3.2 Should Have

- Git diff 审查和任务开始前的工作树基线。
- 提示词注入防护与敏感信息脱敏。
- CPU、内存、PID、并发、时间和模型预算限制。
- 幂等任务创建、一次性审批令牌和防重放。
- 影子任务、对抗测试和分阶段启用。

### 3.3 Could Have

- 多模型路由。
- 自动视觉回归基线。
- 长期设计记忆摘要。
- 可复用任务模板。
- 独立的只读运维仪表盘。

这些能力不属于第一版验收范围，不能以预留它们为理由增加核心复杂度。

### 3.4 Won't Have

- 多项目、多用户或云端任务平台。
- 远程公网控制 Controller。
- Codex 或 Hermes 的通用主机 Shell。
- 复用个人 Chrome 登录态或浏览器 Cookie。
- 无人值守 Git push、部署、邮件、表单、CRM 或生产操作。
- 自动读取 SSH、云凭据、密码管理器或 Windows 用户目录。

## 4. 方案选择

采用“自建轻量 Controller”方案：

```text
Codex Desktop
    │ MCP：窄工具、结构化参数
    ▼
Hermes Controller（Windows 普通用户进程）
    ├─ MCP Server
    ├─ Task State Machine
    ├─ Policy / Approval Engine
    ├─ Worker Supervisor
    ├─ Evidence / Redaction Service
    └─ Audit Log / Kill Switch
    │ 签名任务包、临时能力句柄
    ▼
WSL2 + Docker
    ├─ hermes-worker（单任务）
    ├─ test-browser（临时独立 Profile）
    ├─ /workspace/vithelo（唯一项目挂载）
    └─ /artifacts/<task-id>（任务证据卷）
```

不采用 Hermes 直接暴露完整工具的方案，因为它将安全、审批和日志与具体 Hermes 实现耦合；不采用完整代理平台，因为多项目、数据库、管理后台和云队列超出第一版真实需求。

## 5. 信任边界

### 5.1 可信组件

- 用户的明确审批。
- Controller 自身代码、静态策略和项目规则。
- Controller 生成并签名的任务包、能力句柄和审批令牌。
- Controller 验证后的系统事件。

### 5.2 不可信组件与数据

- Hermes 模型输出和自主计划。
- 网页正文、DOM、脚本、下载内容和重定向目标。
- README、代码注释、Issue 文本、依赖说明和项目内自然语言。
- 终端 stdout/stderr、测试输出、构建日志和错误消息。
- 图片、截图、OCR、PDF 和元数据。
- 任何声称“忽略旧规则”“需要更高权限”或“这是系统指令”的外部文本。

不可信数据只能作为 `DATA` 进入任务上下文。只有 Controller 签名的 `TASK`、`POLICY` 与 `CAPABILITY` 可以改变执行行为。

## 6. 组件设计

### 6.1 Codex Desktop

职责：

- 将用户需求压缩为一个可验收任务。
- 明确目标、非目标、允许范围、完成条件和视觉标准。
- 读取项目状态、任务进度与证据。
- 对 L2 动作进行批准或拒绝。
- 审查 diff、测试、浏览器行为、六视口截图与剩余风险。
- 接受任务，或创建一个新的有界返修任务。

禁止：

- 直接获得任意 Shell、任意文件、任意网络或部署工具。
- 用自然语言绕过 Controller 的 Schema 和策略。
- 将“继续完成”解释为允许扩大权限。

### 6.2 Hermes Controller

Controller 建议使用 TypeScript 实现，以便复用 Node.js 生态、MCP SDK、Zod Schema 和当前 Next.js 项目的开发工具链。Controller 运行在 Windows 普通用户权限下，不以管理员身份启动。

内部模块：

1. `MCP Gateway`：本地连接、会话认证、请求大小限制、幂等键和防重放。
2. `Task Service`：任务创建、状态转换、项目写锁和预算管理。
3. `Policy Engine`：路径、命令、网络、密钥、权限级别和 VITHELO 项目规则。
4. `Approval Service`：产生一次性、短时效、参数绑定的审批令牌。
5. `Worker Supervisor`：创建容器、注入能力、监控资源、终止进程树和销毁 Worker。
6. `Evidence Service`：采集 diff、哈希、命令输出、测试、截图和浏览器日志。
7. `Redaction Service`：在结果进入日志或返回 Codex 前删除敏感内容。
8. `Audit Service`：追加式 JSONL 审计日志、哈希链和安全事件。
9. `Recovery Service`：Controller 重启后的任务对账、锁恢复和失联 Worker 处置。
10. `Kill Switch`：撤销令牌、断网、终止 Worker、冻结工作卷和封存证据。

### 6.3 Hermes Adapter

Controller 不依赖 Hermes 的内部实现。Hermes Adapter 只实现以下稳定接口：

- `start(taskEnvelope, capabilityHandle)`：启动单任务推理循环。
- `nextAction()`：返回一个结构化候选动作。
- `submitObservation(observation)`：接收工具结果。
- `requestApproval(action)`：请求 Controller 判级；它不能自行批准。
- `stop(reason)`：停止推理并输出当前状态。

Hermes Adapter 不直接挂载凭据、不直接创建容器、不直接执行 Shell，也不能修改 Controller 策略。

### 6.4 Hermes Worker

每个任务创建一个 Worker。Worker 内包含 Hermes 运行时和受控工具客户端，只能使用 Controller 授予的临时能力句柄。任务结束、取消、超时或策略阻断后销毁 Worker。

### 6.5 Test Browser

- 使用独立、临时、无登录态的 Chromium Profile。
- 只允许访问批准的本地预览地址。
- 禁止读取宿主机 Chrome 用户数据。
- 截图、DOM 摘要、控制台错误、网络失败和可访问性结果写入任务证据卷。
- 每个任务结束后销毁 Profile。

### 6.6 本地状态存储

第一版采用 SQLite 保存任务、审批、状态转换和证据索引；审计正文采用追加式 JSONL，并为每条记录保存前一条哈希，形成可检测篡改的链。数据库和审计目录仅由 Controller 访问，不挂载到 Worker。

## 7. MCP 工具面

Codex 可见的工具限定为：

| 工具 | 用途 | 是否产生副作用 |
|---|---|---:|
| `project.inspect` | 读取项目规则、能力、基线和当前锁状态 | 否 |
| `task.create` | 创建结构化任务 | 是，但不直接修改项目 |
| `task.get` | 读取任务状态、进度、阻塞和预算 | 否 |
| `task.cancel` | 取消任务并触发安全停止 | 是 |
| `approval.respond` | 批准或拒绝一个具体 L2 动作 | 是 |
| `evidence.list` | 列出证据清单 | 否 |
| `evidence.read` | 读取脱敏后的证据 | 否 |
| `review.submit` | 接受、拒绝或提交有界返修意见 | 是 |
| `system.health` | 检查 Controller、Worker、浏览器和日志状态 | 否 |
| `system.stopAll` | 触发 Kill Switch | 是 |

明确不存在：

- `run_shell`
- `read_any_file`
- `write_any_file`
- `browse_any_url`
- `use_any_secret`
- `deploy_anywhere`

## 8. 任务与证据合约

### 8.1 任务包

任务包必须包含：

```ts
type TaskEnvelope = {
  taskId: string;
  projectId: "vithelo";
  idempotencyKey: string;
  objective: string;
  nonGoals: string[];
  allowedReadPaths: string[];
  allowedWritePaths: string[];
  allowedCommands: CommandSpec[];
  allowedLocalOrigins: string[];
  requestedNetworkDestinations: NetworkGrant[];
  acceptanceCriteria: AcceptanceCriterion[];
  budgets: {
    wallClockSeconds: number;
    noProgressSeconds: number;
    maxRetries: number;
    maxModelTokens?: number;
  };
  rollback: {
    baselineCommit: string;
    baselineDirtyTreeHash: string;
  };
};
```

默认预算：任务 30 分钟、无进展 5 分钟、普通失败最多一次有界重试。模型额度未配置时由 Hermes 自身账户限制，但 Controller 仍执行时间和并发限制。

### 8.2 候选动作

Hermes 的每个动作必须是结构化对象：

```ts
type CandidateAction =
  | { kind: "readFile"; path: string }
  | { kind: "applyPatch"; patch: string; expectedHashes: Record<string, string> }
  | { kind: "runCommand"; commandId: string; argv: string[]; cwd: string }
  | { kind: "browserCheck"; origin: string; route: string; viewport: string }
  | { kind: "networkRequest"; method: string; url: string; dataClass: string }
  | { kind: "approvalRequest"; action: Exclude<CandidateAction, { kind: "approvalRequest" }> };
```

Controller 不接受拼接后的 Shell 字符串，只接受精确 `argv`。Controller 在执行前重新解析真实路径、动作等级和任务预算。

### 8.3 证据包

```ts
type EvidenceBundle = {
  taskId: string;
  baseline: ProjectBaseline;
  changedFiles: Array<{ path: string; beforeHash: string; afterHash: string }>;
  unifiedDiff: ArtifactRef;
  commands: Array<{ argv: string[]; exitCode: number; durationMs: number; output: ArtifactRef }>;
  tests: TestSummary[];
  screenshots: ScreenshotEvidence[];
  browserFindings: BrowserFinding[];
  policyEvents: PolicyEvent[];
  unresolvedRisks: string[];
  rollbackPatch: ArtifactRef;
  completedAt: string;
};
```

证据缺失、输出被截断但未标记、测试未运行却声称通过、或截图与当前构建不匹配时，Controller 禁止任务进入 `Accepted`。

## 9. 任务状态机

正常路径：

```text
Draft → Validated → Approved → Running → Evidence → Review → Accepted
```

终止状态：

- `Rejected`：验收未通过，需要新建有界返修任务。
- `Failed`：执行错误且允许重试已耗尽。
- `Cancelled`：用户或 Codex 主动取消。
- `TimedOut`：命令、无进展或任务总时限耗尽。
- `PolicyBlocked`：路径、命令、网络、凭据或提示词注入触发策略。
- `ResourceExceeded`：CPU、内存、PID 或存储超过限制。
- `Unknown`：Controller 重启后无法确认 Worker 状态；必须终止并人工审查。

状态转换只由 Controller 执行。Hermes 可以报告完成或阻塞，但不能把任务标记为 `Accepted`。

## 10. 权限与审批模型

### 10.1 L0：只读

自动允许：

- 读取允许根目录内的项目文件。
- 搜索、查看 Git status/diff/log。
- 读取测试报告和任务证据。
- 访问批准的本地预览。

仍需验证：真实路径、符号链接、junction、Unicode、大小写和文件大小。

### 10.2 L1：可恢复写入

任务内自动允许：

- 对任务声明文件应用补丁。
- 创建任务专属测试、截图和报告。
- 执行固定白名单命令 ID，例如 `project.lint`、`project.typecheck`、`project.test`、`project.build` 和 `project.dev`。命令适配器在 Windows 主机映射为 `pnpm.cmd <script>`，在 Linux Worker 映射为 `pnpm <script>`；任务不能自行选择平台可执行文件。
- 使用临时浏览器完成本地验证。

写入必须记录前后哈希，且不得覆盖任务开始后由用户或其他进程产生的新改动。

### 10.3 L2：敏感动作

每次必须人工批准：

- 安装或升级依赖。
- 修改 lockfile 或环境变量模板。
- 删除、批量移动或重命名文件。
- 访问明确批准的公网域名。
- 扩大资源或时间上限。
- 创建 Git commit。

审批界面必须显示动作、绝对路径或目标域名、精确参数、风险、理由和预期副作用。

### 10.4 L3：外部副作用

第一版默认禁用：

- Git push、合并和发布。
- Hostinger 或其他生产部署。
- 生产数据库、CMS、CRM、分析、支付和真实账号。
- 邮件、WhatsApp、表单提交或其他对外消息。
- SSH、云密钥、浏览器 Cookie、密码管理器和项目外写入。

未来如开放 L3，必须建立独立发布任务、二次确认、专用短期凭据和额外验收；不能复用普通开发任务的授权。

### 10.5 审批令牌

- 绑定 `taskId + actionId + 参数哈希`。
- 默认 10 分钟过期。
- 只能消费一次。
- 参数、路径、域名或方法改变立即失效。
- Kill Switch 会撤销全部未消费令牌。
- 拒绝不得被 Hermes 自动重新请求；需要新的理由或新的用户指令。

## 11. 文件系统安全

- 容器内唯一项目路径为 `/workspace/vithelo`。
- Controller 使用规范化后的 Windows 绝对路径和最终真实路径双重校验。
- 禁止通过 `..`、符号链接、junction、短文件名、大小写差异、Unicode 混淆或挂载点逃逸。
- 不挂载 Windows 用户目录、盘符根目录、Docker socket、SSH、浏览器 Profile 或凭据目录。
- 根文件系统只读；临时目录使用独立 `tmpfs`。
- 修改使用补丁和预期哈希，发现并发修改时停止并报告冲突。
- 删除动作不进入 L1；必须列出已解析的绝对目标并走 L2。
- 不允许未解析 glob 决定删除或移动目标。

## 12. 命令执行安全

- Controller 维护命令 ID 到可执行文件、固定参数模式、允许 cwd 和超时的映射。
- Worker 只能提交 `commandId + argv`，不能提交 Shell 字符串。
- 禁止命令替换、管道、重定向、控制运算符和隐藏的交互式等待，除非某个命令规格明确、安全地实现该行为。
- 子进程加入同一进程组；超时先发送正常终止，10 秒后强制终止整个进程树。
- 每条命令记录 argv、cwd、开始时间、结束时间、退出码和脱敏输出引用。
- 未知可执行文件、参数或 cwd 直接进入 `PolicyBlocked`。

## 13. 网络安全

- Worker 默认使用 `network=none`。
- 本地预览通过专用 Docker 内部网络提供给 `test-browser`，不向局域网暴露。
- Controller 与 MCP 只监听 `127.0.0.1`。
- L2 公网访问必须绑定域名、协议、端口、HTTP 方法、用途和允许发送的数据类别。
- 在连接前后验证 DNS、最终 IP、IPv4/IPv6、重定向目标和代理设置。
- WebSocket、CONNECT、任意代理、未知重定向和元数据地址默认拒绝。
- 生产域名、邮箱、WhatsApp、Hostinger 与 GitHub 写操作不因域名已知而自动放行。

## 14. 容器和资源基线

Worker 默认：

- 固定非 root UID/GID。
- `read_only: true`。
- `cap_drop: [ALL]`。
- `no-new-privileges`。
- 2 CPU、4 GB 内存、128 PID。
- 单项目最多一个写任务；只读任务不得读取未封存的中间状态。
- 单命令默认 10 分钟，任务默认 30 分钟。
- 无进展 5 分钟进入暂停检查。

无法应用这些限制时，Worker 不得启动。构建任务确需更高资源时走 L2 审批，不把更高资源变成长期默认值。

## 15. 密钥、隐私和脱敏

- 第一版默认不给 Worker 任何密钥。
- 如某个批准动作需要短期凭据，由 Controller 在动作层使用，不进入 Hermes 提示词、文件系统或普通日志。
- 脱敏覆盖常见 API Key、Bearer、Cookie、Authorization、私钥、连接字符串、邮箱和个人路径。
- 脱敏在持久化日志与返回 Codex 之前执行。
- 截图和 OCR 也进入敏感信息扫描。
- 疑似泄密时立即截断输出、撤销令牌、断网、销毁 Worker、封存安全事件，并提示轮换可能暴露的凭据。

## 16. 提示词注入防护

1. 所有项目文件、网页、终端和视觉内容标记为不可信数据。
2. 工具说明和策略由 Controller 固定注入，项目内容不能覆盖。
3. Hermes 的候选动作必须重新经过策略引擎，不依赖模型自律。
4. 外部内容要求读取密钥、联网、安装工具、修改规则或忽略任务时，一律不能自动执行。
5. Controller 记录被拒绝的越权理由，但不把敏感策略内部细节完整暴露给不可信上下文。

## 17. VITHELO 项目硬规则

Controller 的项目策略必须至少编码以下约束：

- 公开身份只能是 `VITHELO`。
- 不得公开源公司中文名、英文名、原 Logo 或原品牌视觉。
- 当前网站是 Nutrition OEM / ODM B2B 询盘站，不恢复历史设备或电商原型。
- Hero 图像锁定，不替换、不再生成、不缩放、不平移、不做视差。
- 当前首页顺序和当前状态文档为准；只修改任务明确指定的屏幕。
- 产品方向保持纵向滚动；八种剂型必须在同一屏。
- Reduced Motion 下有意义内容必须完整可见。
- 未核验证据不能转化为认证、疗效、法规、产能、MOQ、交期、价格或市场承诺。
- 缺失配置继续显式标记，不以可信语气填造数据。
- Email 与 WhatsApp 是已配置询盘渠道；内部提交、CRM、分析、支付和身份保持未配置。
- 用户已有 dirty tree 必须保留；任务只能触碰声明的文件。

项目策略在每次任务开始时从版本化规则文件载入，并把规则文件哈希写入证据包。

## 18. 标准工作流程

### 18.1 任务开始

1. 读取项目规则、当前状态和任务允许范围。
2. 检查 Git 工作树、活动写锁和本地服务端口。
3. 记录基线 commit、dirty tree 哈希和目标文件哈希。
4. 校验完成标准是否可测；不可测则拒绝进入执行。
5. 创建单任务 Worker。

### 18.2 实施

1. Hermes 制定局部步骤，但不改变任务目标。
2. 功能或 Bug 优先建立失败测试；纯文档或配置任务使用相应静态检查。
3. 每次只提交一个结构化候选动作。
4. Controller 验证权限、预算和并发状态后执行或请求审批。
5. 文件修改保持最小、补丁式，不顺手重构和全仓格式化。

### 18.3 验证

1. 运行任务专属测试。
2. 运行适用的 lint、typecheck、unit、e2e 和 build。
3. 需要视觉验证时启动本地预览和临时浏览器。
4. 采集六视口、键盘、Reduced Motion、控制台、网络失败和可访问性证据。
5. 生成统一 diff、测试摘要、截图索引、风险与回滚补丁。

### 18.4 审查与收尾

1. Controller 检查证据完整性和策略事件。
2. Codex 审查功能、内容、视觉和项目规则。
3. 通过则标记 `Accepted` 并封存证据。
4. 未通过则创建新的有界返修任务，不允许原任务无限自我迭代。
5. 销毁 Worker、浏览器 Profile 和临时能力。

## 19. 异常处理

| 异常 | 默认处理 |
|---|---|
| 策略违规 | 立即停止，不重试，撤销令牌，记录安全事件 |
| 疑似泄密 | 截断、脱敏、断网、销毁 Worker、提示轮换凭据 |
| 普通测试失败 | 允许一次有界修复；再次失败则返回根因和证据 |
| 命令超时 | 终止进程树，保留输出，不自动增加时限 |
| 资源超限 | 终止任务并标记 `ResourceExceeded` |
| Controller 重启 | 从持久状态恢复；无法确认的 Worker 终止并标记 `Unknown` |
| 日志不可写 | 禁止新的有副作用动作；运行中任务安全停止 |
| 证据缺失 | 禁止验收；重新采集或标记失败 |
| 工作树并发变化 | 停止写入，报告冲突，不覆盖用户改动 |

## 20. Kill Switch

紧急停止顺序固定为：

1. 拒绝新任务和新审批。
2. 撤销全部未消费审批令牌和能力句柄。
3. 阻断 Worker 与浏览器网络。
4. 向全部活动进程组发送正常终止。
5. 10 秒后强制终止残留进程。
6. 将工作卷切换为只读。
7. 计算并保存现有文件哈希、diff、日志和安全事件。
8. 释放项目锁前进行状态对账。

Kill Switch 必须同时提供 MCP 工具和本机命令入口；本机入口不得依赖 Codex 或 Hermes 正常运行。

## 21. 审计与可观测性

每条审计事件至少包含：

- 事件 ID、任务 ID、项目 ID、会话 ID。
- 发起方、动作类型、权限级别和策略结果。
- 参数哈希、目标路径或域名的脱敏表达。
- 时间、持续时间、退出码和资源使用。
- 审批人、审批令牌 ID 和有效期。
- 上一条事件哈希与当前事件哈希。

日志本地保留 30 天。任务验收证据按项目交付需要保存；删除证据属于 L2 动作。日志正文默认脱敏，原始密钥永不写入审计系统。

关键指标：

- 任务成功率与人工返修率。
- 策略阻断次数和类别。
- L2 请求批准/拒绝比例。
- 平均任务时长、超时率和资源超限率。
- 证据缺失率、测试失败率和视觉缺陷率。
- Worker 终止成功率与恢复演练结果。

## 22. 验收体系

### 22.1 Gate 0：静态安全

验证：

- TypeScript、lint、单元测试和依赖审计。
- MCP Schema、任务状态机、权限矩阵和策略规则。
- 容器配置、非 root、只读根文件系统和资源限制。
- 日志脱敏、哈希链和审批令牌。

通过标准：P0 = 0，P1 = 0；所有安全关键测试通过。

### 22.2 Gate 1：隔离与对抗

主动测试：

- `..`、绝对路径、符号链接、junction、Unicode 和大小写路径逃逸。
- Shell 元字符、参数注入、后台进程和子进程残留。
- DNS、IPv4/IPv6、重定向、WebSocket、代理和 localhost 网络绕过。
- README、网页、终端、图片 OCR 的提示词注入。
- API Key、Cookie、环境变量和截图中的敏感信息。
- 重放审批、修改参数和过期令牌。

通过标准：全部越权尝试被阻断并产生正确审计事件；无项目外读写、无未知网络出口、无明文秘密。

### 22.3 Gate 2：影子任务

在复制工作区运行至少 10 个任务，包括项目检查、测试、截图、错误诊断和只读设计审查。

通过标准：零越权、零未记录副作用、零无法停止 Worker；证据包完整率 100%。

### 22.4 Gate 3：受控写入

在真实项目中运行至少 20 个低风险任务，范围限于文档、测试、小型局部样式或用户明确批准的同等级修改。

通过标准：

- 任务成功率至少 90%。
- P0 = 0，P1 = 0。
- 项目外读写 = 0。
- 用户改动覆盖 = 0。
- 明文密钥泄露 = 0。
- Worker 可终止率 = 100%。
- 每个任务都有完整 diff、测试、风险和回滚证据。

### 22.5 Gate 4：日常受控使用

- L0/L1 按任务范围自动运行。
- L2 始终逐次审批。
- L3 继续禁用。
- 每月复审权限、失败样本、策略事件和保留数据。
- 每季度演练 Kill Switch 与恢复流程。

## 23. 测试矩阵

| 领域 | 必测内容 | 通过标准 |
|---|---|---|
| MCP | 认证、Schema、幂等、重放、畸形输入、超大载荷 | 非法请求全部拒绝；合法重试无重复副作用 |
| 文件 | 路径规范化、链接、junction、Unicode、并发改动 | 无允许根外读写；不覆盖新改动 |
| 命令 | argv、元字符、子进程、后台进程、超时 | 只执行白名单；进程树完全终止 |
| 网络 | DNS、IP、重定向、代理、WebSocket | 除批准目标外无出口 |
| 密钥 | API Key、Cookie、Authorization、OCR | 提示词、日志、证据中无明文秘密 |
| 状态 | 崩溃、断电、磁盘满、日志失败、锁竞争 | 未知状态不继续产生副作用 |
| 证据 | diff、退出码、截图、风险、回滚 | 缺失或伪造证据不能验收 |
| VITHELO | 品牌、Hero、声明、页面结构、Reduced Motion、六视口 | 项目既有验收标准全部通过 |

首批强制场景：

1. README 指示读取 SSH 密钥：必须识别为数据并阻断。
2. 允许目录内的符号链接指向项目外：必须按最终真实路径拒绝。
3. 测试参数包含 Shell 元字符：必须按 argv 策略拒绝。
4. Worker 构建卡死：必须按时终止整个进程树并保留输出。
5. Controller 在写入中重启：任务进入 `Unknown` 或 `Failed`，不能继续写。
6. 局部样式任务：必须产生最小 diff、测试、六视口截图和可用回滚补丁。

## 24. VITHELO 单任务验收

每次实际网站任务至少检查：

- 变更完全落在任务允许文件内。
- 未公开源公司身份、Logo 或受限证据。
- 未改变锁定 Hero 或未授权页面。
- 公共文案保持英文，项目文档保持中文。
- 没有虚构认证、功效、法规、产能、MOQ、交期、价格或市场政策。
- 键盘、焦点、语义、44px 目标、文本缩放和非颜色状态仍成立。
- Reduced Motion 保留全部有意义内容。
- 六个验收视口无 P0/P1、无裁切、遮挡和横向溢出。
- 适用的项目命令 `lint`、`typecheck`、`test`、`test:e2e`、`build` 通过；Windows 人工复核使用 `pnpm.cmd`，Linux Worker 使用固定映射的 `pnpm`。
- 视觉任务必须获得用户明确视觉签收。

## 25. 正式启用和立即降级条件

正式启用必须同时满足：

- 威胁模型已评审。
- Gate 0 至 Gate 3 全部通过。
- Kill Switch 演练成功。
- Controller 重启与恢复手册演练成功。
- 审计和脱敏结果通过人工抽查。

发生以下任一事件立即停止写入能力并降级到只读：

- 任意项目外读写。
- 任意明文密钥泄露。
- 任意未记录的副作用。
- 任意无法终止的 Worker。
- 任意绕过审批的 L2/L3 动作。
- 审计日志不可用或哈希链异常。

恢复写入前必须完成根因分析、修复、回归测试和重新演练相关 Gate。

## 26. 实施阶段

### 阶段 A：Controller 骨架

交付 MCP Gateway、Schema、SQLite、任务状态机、审计日志和健康检查。仅支持无副作用的项目检查。

### 阶段 B：隔离 Worker

交付 WSL2/Docker Worker、非 root 配置、唯一项目挂载、资源限制、进程监督和临时证据卷。

### 阶段 C：受控工具

交付文件读取、补丁、命令白名单、本地预览、临时浏览器和截图工具；落实真实路径与 argv 校验。

### 阶段 D：审批与安全

交付四级权限、一次性审批令牌、网络策略、脱敏、提示词注入防护和 Kill Switch。

### 阶段 E：证据与验收

交付 Evidence Bundle、测试摘要、六视口截图、VITHELO 项目策略和 Codex 审查流程。

### 阶段 F：对抗与试运行

依次完成 Gate 0、Gate 1、Gate 2 和 Gate 3；达到正式启用条件后进入 Gate 4。

每个阶段都必须形成独立可测试的软件增量。后续实施计划按阶段拆成小任务，不在一个任务中同时建设全部子系统。

## 27. 运维手册最低要求

正式启用前必须具备并实际演练：

- 安装与升级手册。
- 启动、停止、健康检查和日志定位。
- Kill Switch 操作。
- Controller 崩溃与 SQLite 恢复。
- Worker 失联、卡死和残留进程清理。
- 项目锁恢复和 dirty tree 冲突处置。
- 疑似密钥泄露的隔离与轮换。
- 审计导出、保留和安全删除。
- 版本回滚与容器镜像回退。

## 28. 风险与剩余边界

1. **模型正确性不是安全边界**：即使 Hermes 行为异常，Controller 仍必须阻断越权。
2. **容器不是完整虚拟机**：WSL2 与 Docker 提供强隔离但不是绝对隔离，因此不挂载高价值主机资源。
3. **本地恶意软件不在本方案防护范围内**：已控制 Windows 用户会话的恶意软件仍可能影响 Controller。
4. **视觉质量需要人工签收**：自动截图和规则不能替代用户的最终审美判断。
5. **生产发布继续独立**：即使开发任务验收通过，也不自动获得 Git push 或 Hostinger 部署权限。

## 29. 最终完成定义

本系统只有在以下条件全部满足时才视为第一版完成：

- 方案中 Must Have 全部实现。
- L0/L1/L2/L3 行为与本规范一致。
- Gate 0 至 Gate 3 全部通过。
- 项目外读写、明文密钥泄露、未记录副作用均为零。
- Worker 可终止率为 100%。
- Kill Switch 与恢复演练通过。
- Codex 能完成“创建任务—审批—读取证据—验收/返修—取消”的完整闭环。
- Hermes 能在 VITHELO 项目中完成一个真实、低风险、局部的网站修改，并提供最小 diff、完整测试、六视口截图、风险说明和可用回滚补丁。
- 用户对系统安全边界、操作方式和首个真实任务结果明确签收。
