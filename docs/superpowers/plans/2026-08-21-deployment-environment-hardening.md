# Deployment Environment Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Make the existing vithelo.com V6.1 Demo reproducibly verifiable and deployable from GitHub `main` without changing its product architecture or inventing production configuration.

**Architecture:** Keep the current Next.js App Router, token-led UI, validated DEMO_ONLY content, and six-viewport Playwright matrix. Add only repository governance and deployment checks around the existing app; future integrations remain NOT_CONFIGURED.

**Tech Stack:** Next.js 16.3.1, React 19, TypeScript, pnpm/npm scripts, GitHub Actions, Playwright, Vitest, ESLint.

---

### Task 1: Replace the remote placeholder README

**Files:**
- Modify: `README.md`
- Test: documented commands and `package.json` scripts

- [ ] **Step 1: Document purpose and boundary**

Add the unified Nutrition and Aesthetic Technology purpose, `HUMAN × MATERIAL × PRECISION`, temporary `A PRIME` identity, and explicit `DEMO_ONLY` / `NOT_CONFIGURED` limitation.

- [ ] **Step 2: Document setup and quality commands**

Document Node 20.x, `pnpm.cmd install` or `npm install`, `lint`, `typecheck`, `test`, `test:e2e`, and `build`. State that Playwright owns port 3100.

- [ ] **Step 3: Document Vercel settings**

Document Framework `Next.js`, Root Directory `.`, Build Command `npm run build`, and blank Output Directory. State that the current Demo requires no environment variables.

- [ ] **Step 4: Verify and commit**

Run `git diff --check` and verify README contains `DEMO_ONLY`, `NOT_CONFIGURED`, `npm run build`, and `Node 20`. Commit with `docs: add deployment and contributor guidance`.

### Task 2: Add GitHub Actions quality gates

**Files:**
- Create: `.github/workflows/quality.yml`

- [ ] **Step 1: Add Node 20 app-quality job**

Use `actions/checkout@v4`, `actions/setup-node@v4`, `corepack enable`, `pnpm install --frozen-lockfile`, then run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.

- [ ] **Step 2: Add E2E job**

Install Chromium with `pnpm exec playwright install --with-deps chromium`, then run `pnpm test:e2e`. Keep all six projects and assertions unchanged. Do not add retries or remove viewports.

- [ ] **Step 3: Validate and commit**

Run `git diff --check` and verify the workflow contains Node 20, lint, typecheck, unit, build, and E2E commands. Commit with `ci: add main branch quality gates`.

### Task 3: Stabilize repository-level Git transport settings

**Files:**
- Modify: `.git/config` through `git config --local` only
- Test: remote and branch tracking

- [ ] **Step 1: Verify remote contract**

Run `git remote get-url origin` and `git branch -vv`. Expect `https://github.com/wang26098-collab/vithelo.com.git` and local `main` tracking `origin/main`.

- [ ] **Step 2: Preserve verified TLS setting**

Keep repository-local `http.sslBackend=openssl`. Do not change global Git configuration or store credentials in the repository.

- [ ] **Step 3: Verify read-only remote access**

Run `git -c http.sslBackend=openssl ls-remote origin refs/heads/main` and compare the SHA with local `HEAD` after push.

### Task 4: Run and record the complete acceptance gate

**Files:**
- Modify: `docs/acceptance.md` only if facts change
- Modify: `docs/project-audit.md` only to record verified deployment outcomes

- [ ] **Step 1: Run application gates**

Run `pnpm.cmd lint`, `pnpm.cmd typecheck`, `pnpm.cmd test`, and `pnpm.cmd build`. Expect exit 0, 35/35 unit tests, and 14 static pages.

- [ ] **Step 2: Run Playwright**

Run `pnpm.cmd test:e2e`. Expect 75 passed, 3 expected skips, exit 0. If Windows teardown hangs, use the approved elevated terminal and repository-local OpenSSL setting; never weaken assertions.

- [ ] **Step 3: Inspect and commit**

Run `git status --short` and `git diff --check`. Do not stage `.superpowers/`, the source DOCX, or unrelated pre-existing untracked docs. Push with ordinary `git push origin main`; never use force-push.

## Scope exclusions

- No page or component rebuild.
- No Commerce, CMS, CRM, Search, Identity, Payment, Analytics, or Vercel secret integration.
- No replacement of `DEMO_ONLY` or `NOT_CONFIGURED` values.
- No visual redesign or deletion of existing pages, tests, media, or design documents.
