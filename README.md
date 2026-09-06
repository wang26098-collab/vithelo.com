# vithelo.com

VITHELO 英文 B2B 营养健康产品独立站，面向 OEM / ODM、私人标签、产品剂型浏览和项目询盘。当前公开结构包含 Home、Products、OEM / ODM、Insights 与 Contact。

当前项目进度、已确认设计决策和上线阻塞项统一记录在 [项目当前状态](docs/current-status.md)。历史 V6.1 规范保留为过程资料，不再代表当前公开路由或首页结构。

## Current boundary

未经生产核验的本地内容保持 `DEMO_ONLY`、来源说明或 `NOT_CONFIGURED`。不得用推测替代缺失的产品、产能、认证、法规、市场、政策或公司主体信息。

Email `wang26098@gmail.com` 与 WhatsApp `+86 182 7366 9556` 已作为直接询盘路径配置。网站仍不连接支付、CMS、CRM、搜索、身份、分析或站内表单提交；这些集成需要明确的供应商、责任人和验收证据。

公开品牌只使用 `VITHELO`。`独立站内容/` 中的资料可作为来源，但不得公开其中的公司名称、原品牌标识或未经核验的认证。

## Stack

- Next.js 16.3.1 App Router
- React 19 and TypeScript
- Tailwind CSS 4, Radix UI, and Motion
- Zod-validated content adapters
- Vitest and Testing Library
- Playwright across six acceptance viewports

## Local setup

正式验收使用 Node 20.x。Node 24 可以用于临时本地预览，但不能替代 Hostinger 的 Node 20 干净构建证据。

```powershell
corepack enable
pnpm.cmd install
pnpm.cmd dev
```

The fallback npm scripts are equivalent when pnpm is unavailable:

```powershell
npm install
npm run dev
```

## Quality commands

Run from the repository root:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Playwright starts its own Next.js server on `127.0.0.1:3100`. Do not start a second server on that port while `test:e2e` is running. The acceptance matrix covers 1440, 1280, 1024, 768, 390, and 375px widths.

## Deployment

The current deployment platform is Hostinger. See [VITHELO Deployment](docs/deployment.md) before changing domain, hosting, build, Node, or package-manager settings.

- Framework: `Next.js`
- Root Directory: `./`
- Build Command: `pnpm build`
- Output Directory: Hostinger default for Next.js
- Node.js: `20.x`
- Package manager: `pnpm@10.34.5`
- Production branch: `main`
- Formal domain: `vithelo.com`

The current demonstration requires no environment variables. Do not add placeholder secrets. Future provider variables must be approved, documented, and supplied through the deployment secret store.

## Repository structure

- `src/app/`: App Router routes and global states
- `src/components/`: core, UI, domain, motion, and page patterns
- `src/content/`: Zod contracts and `DEMO_ONLY` fixtures
- `src/lib/adapters/`: provider-neutral content and Commerce boundaries
- `tests/unit/`: unit and component tests
- `tests/e2e/`: journey, accessibility, responsive, and data-integrity tests
- `docs/`: design, data governance, deployment, acceptance, audit, and visual QA records

See [current status](docs/current-status.md), [deployment notes](docs/deployment.md), [the repository audit](docs/project-audit.md), [acceptance checklist](docs/acceptance.md), and [visual QA record](docs/visual-qa.md) before changing architecture, hosting, or production services.
