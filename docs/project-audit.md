# vithelo.com 当前仓库审计报告

审计日期：2026-08-21  
审计范围：当前本地工作区、Git 历史、Next.js 源码、组件、内容模型、文档、单元测试、Playwright 测试和构建配置。  
审计原则：首次接管只分析，不重建项目，不删除已有页面、组件、设计系统或测试体系。

## 1. 执行摘要

当前项目是一个完成度较高的 Next.js V6.1 高保真 Demo，已实现统一主品牌下的 Nutrition 和 Aesthetic Technology 两个产品世界。页面结构、设计 Token、内容 Schema、适配器边界、核心组件、动效、响应式验收和数据安全边界基本完整。

当前项目仍不是生产站，原因不是页面原型缺失，而是 GitHub 接管、远程配置、生产输入、真实 Provider 和部署治理尚未完成。

当前最高优先级风险：

1. 远程 `main` 与本地 `master` 没有共同祖先，不能直接合并或覆盖。
2. 当前本地分支为 `master`，执行规范要求目标分支为 `main`，但两者不是同一条历史。
3. 远程 `main` 只有 3 个基础提交和两个文件，无法代表当前高保真 Demo。
4. `README.md`、`.github/`、`docs/project-audit.md` 在首次审计时尚不存在。
5. `AGENTS.md` 和多份项目文档处于未跟踪状态，尚未进入本地 Git 历史。
6. 本次 Playwright 测试实例显示 75 个通过、3 个预期跳过，但 WebServer teardown 未正常返回，进程被终止，因此不能把本次命令记为干净的 exit 0。

## 2. 项目定位

项目：`vithelo.com`

品牌公式：`HUMAN × MATERIAL × PRECISION`

一个主品牌承载两个产品世界：

- Nutrition
- Aesthetic Technology

网站职责不是普通营养品商城，也不是传统医美器械目录，而是由品牌定向、Commerce、Science / Trust、Professional 和 Utility / Recovery 组成的统一数字平台。

当前阶段是可持续维护、可测试、可部署方向的高保真 Demo。真实品牌身份、产品事实、功效、认证、设备参数、市场、政策和供应商尚未获得，因此统一保留 `DEMO_ONLY` 和 `NOT_CONFIGURED`。

## 2.1 GitHub 远程核对结果

已连接远程：`https://github.com/wang26098-collab/vithelo.com.git`

远程 `main` 当前只有以下 3 个提交：

- `1e26d67` Initial commit
- `b19fade` Create package.json
- `660555a` Update package.json

远程 `main` 当前仅包含：

- `README.md`
- `package.json`

本地 `master` 包含完整 V6.1 Demo 历史，当前领先远程 20 个提交；远程另有 3 个提交。两条历史没有共同祖先，直接 merge 会形成一次大规模无关历史合并，直接 reset 或 force-push 则会删除远程原有历史或本地项目成果。

审计结论：当前不能把“master 对齐 main”理解为普通重命名或快进。必须先确认仓库实际权威来源和迁移策略，再进行任何分支写入操作。

## 3. 技术架构

- Next.js 16.3.1 App Router
- React 19.2.8
- TypeScript 5.9.3
- Tailwind CSS 4.3.3
- Radix UI 和定制 shadcn 基础封装
- Motion
- Zod
- Vitest、Testing Library、Playwright

依赖方向：

```text
Tokens -> Core Components -> Domain Components -> Page Patterns -> Validated DEMO_ONLY Data
```

主要目录：

- `src/app/`：路由、Metadata、Loading、Error、Not Found
- `src/styles/`：设计和动效 Token
- `src/components/core/`：导航、按钮、状态、披露、Sticky
- `src/components/ui/`：Radix / shadcn 基础交互
- `src/components/domain/`：产品、Commerce、Formula、Technology、Evidence、Safety、Professional
- `src/components/motion/`：Reveal、MembraneReveal、ScaleShift、VisualSwitcher
- `src/components/patterns/`：Home、Landing、PDP、Science、Professional、Utility
- `src/content/`：Zod Schema 和 Demo Fixtures
- `src/lib/adapters/`：内容和 Commerce Provider 边界
- `tests/unit/`：组件、Schema、Token、状态和交互测试
- `tests/e2e/`：旅程、无障碍、响应式和数据完整性测试
- `docs/`：设计、内容治理、验收和视觉 QA 文档

## 4. 页面完成情况

| 路由 | 职责 | 状态 |
|---|---|---|
| `/` | 品牌定向、两个产品世界、Professional 入口 | 已完成 |
| `/nutrition` | Nutrition 发现和产品探索 | 已完成 |
| `/aesthetic-technology` | 设备、应用、工程和专业场景探索 | 已完成 |
| `/nutrition/[slug]` | Nutrition PDP、Commerce、Formula、Safety | 已完成 |
| `/aesthetic-technology/[slug]` | Device PDP、Technology、Safety、Ownership | 已完成 |
| `/science` | Evidence、Source Boundary、Limitations | 已完成 |
| `/professional` | Business Intent、Capability、Project Intake | 已完成 |
| `/search` | 搜索未配置状态和分组导航 | 已完成 |
| `/cart` | 空购物车和未配置交易状态 | 已完成 |
| `/checkout` | Payment / Order 未配置状态 | 已完成 |
| `/account` | Identity、Orders、Saved、Support 状态 | 已完成 |
| `/support` | 六类支持任务和 Provider 状态 | 已完成 |

全局 Loading、Error、Not Found 状态已实现。动态 PDP 已配置 Demo 静态参数，并在生产构建中成功生成。

## 5. 组件与数据能力

Core 组件已覆盖：

- SiteHeader、MegaMenu、MobileMenu
- Button
- DemoDisclosure
- StatePanel
- StickyResource

Domain 组件已覆盖：

- ProductCard、ProductCommerce
- FormulaSnapshot、TechnologyStory
- EvidenceCard、SafetyPanel
- CapabilityCard、ProjectIntake

内容通过 Zod Schema 验证，再由 `localContentAdapter` 提供给页面。当前没有连接真实 Commerce、Payment、CMS、CRM、Search、Identity 或 Analytics Provider。

数据安全边界正确：未配置的价格、Safety、证据、市场、政策、Warranty、MOQ、Lead Time 和交易操作均未被伪造。

## 6. 文档状态

已进入 Git 的核心文档：

- `docs/superpowers/specs/2026-08-16-nutrition-aesthetic-brand-site-design.md`
- `docs/superpowers/plans/2026-08-16-brand-site-implementation.md`
- `docs/visual-qa.md`

审计时工作区存在但未跟踪的文档：

- `AGENTS.md`
- `docs/acceptance.md`
- `docs/brand-system.md`
- `docs/content-model.md`
- `docs/data-governance.md`
- `docs/design-system.md`
- `docs/missing-production-inputs.md`
- `docs/motion-system.md`
- `docs/page-patterns.md`

审计时缺少：

- `README.md`
- `.github/` 工作流和协作模板

## 7. 测试与构建状态

本次只读验证结果：

| 检查 | 结果 |
|---|---|
| ESLint | 通过 |
| TypeScript | 通过 |
| Vitest | 10 个文件，35 个测试通过 |
| Next production build | 通过 |
| 静态页面 | 14 个页面生成成功 |
| Playwright 测试实例 | 75 个通过，3 个预期跳过 |

Playwright 本次运行在所有测试实例完成后停留在 Next WebServer teardown 阶段，未返回正常退出码。为避免残留测试进程，审计过程中终止了该进程。因此 Playwright 需要在阶段 2 重新运行并取得干净的 exit 0。

浏览器还提示 Aesthetic Technology 首屏图片可考虑设置 `loading="eager"` 以改善 LCP。这是优化建议，不是当前功能失败。

## 8. 视觉 QA

已有视觉 QA 记录覆盖 7 条核心路线、5 个主要宽度和 35 张正式截图：

- P0：0
- P1：0
- 横向溢出：0 / 35
- 应用 Console 错误：0 / 35
- 视觉评分：9.1 / 10

已修复 Science 搜索区域裁切，以及 Mobile Sticky 与 Drawer、Safety 的边界问题。详见 `docs/visual-qa.md`。

## 9. 风险清单

### R1：GitHub 分支历史不一致

远程已配置为 `https://github.com/wang26098-collab/vithelo.com.git`，但远程 `main` 只有基础骨架，和本地高保真 Demo 没有共同祖先。不能直接 merge、reset 或 force-push。需要先确认保留本地 Demo 作为主线，还是把远程骨架作为新的基线。

### R1：Playwright teardown 不稳定

测试断言没有显示失败，但本地 WebServer 清理阶段不稳定，可能影响 CI。

### R1：生产输入缺失

正式品牌、真实 SKU、设备规格、Claims、认证、市场、政策、媒体、Commerce、CMS、CRM、Search、Identity 和 Support Provider 均未完成确认。

### R2：协作文档未跟踪

`AGENTS.md` 和多份 `docs/*.md` 目前还未进入 Git 历史。

### R2：部署治理缺失

当前没有 README、GitHub Actions、CI 检查记录、Vercel 绑定证据和正式环境变量清单。

## 10. 后续优化计划

### 阶段 1：GitHub 接管与仓库对齐

1. 已确认并配置既有仓库 URL。
2. 已获取远程 `main`，完成提交和文件树比较。
3. 在用户确认权威基线前，不执行 merge、reset、force-push 或分支覆盖。
4. 若保留本地 Demo，应以本地 Demo 为内容基线，另建迁移提交将其安全接入远程 `main`。
5. 确认未跟踪文档的纳入范围。

### 阶段 2：部署环境修复

1. 修复 Playwright WebServer teardown，取得完整 exit 0。
2. 补充 README 和最小部署说明。
3. 增加 GitHub Actions 的 install、lint、typecheck、unit、build 和 E2E 检查。
4. 核对 Node 20.x、Vercel Root Directory 和 Build Command。
5. 复核图片 LCP、静态资源和缓存策略。
6. 建立真实环境变量清单，不填入虚构值。

### 阶段 3：生产数据接入准备

在获得真实资料后，再接入品牌身份、产品、设备、Evidence、Safety、Market、Commerce、CMS、CRM、Search 和 Identity。所有值必须具备来源、负责人、市场上下文、审批状态、Schema 映射和验收证据。

### 阶段 4：生产功能优化

建议优先级：Commerce、Search、Professional Inquiry、Account / Identity，最后扩展 Journal、Ingredients 和 Technologies 深页。

## 11. 当前审计结论

当前 Demo 的核心架构和页面实现不需要重建。下一步应优先解决仓库连接、分支对齐、文档纳入 Git、CI / Vercel 部署验证和 Playwright teardown，而不是继续扩展页面数量。

审计完成后暂停，等待 GitHub URL 和阶段 2 执行确认。
