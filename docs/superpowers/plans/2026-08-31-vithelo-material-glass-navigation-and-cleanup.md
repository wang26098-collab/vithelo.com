# VITHELO Material Glass Navigation and Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the homepage navigation inside the Hero, add the approved material-glass top/scrolled/mobile states, preserve stable internal-page navigation, and conservatively archive or remove obsolete workspace material.

**Architecture:** `VitheloB2BSiteFrame` receives an explicit `variant="home"` prop and delegates navigation state to a focused client component. The component observes `#hero` with `IntersectionObserver`, exposes semantic data attributes, and leaves internal routes on the existing stable treatment. Repository cleanup occurs only after all application checks pass; historical material is moved into `docs/archive` while reproducible output is deleted by exact path.

**Tech Stack:** Next.js 16 App Router, React 19, CSS Modules, Vitest and Testing Library, Playwright, PowerShell, Git.

---

## File Structure

- Create `src/components/core/vithelo-b2b-navigation.tsx`: client-only navigation state and desktop/mobile markup.
- Modify `src/components/core/vithelo-b2b-site-frame.tsx`: explicit frame variant, disclosure placement, and delegation to the navigation component.
- Modify `src/components/core/vithelo-b2b-site-frame.module.css`: top, scrolled, internal, mobile, focus, and Reduced Motion states.
- Modify `src/app/page.tsx`: pass `variant="home"` only on the homepage.
- Modify `src/content/demo/vithelo-b2b-site.ts`: change the navigation CTA label from `Request Quote` to the approved `Start a Project` while preserving `/contact`.
- Create `tests/unit/vithelo-b2b-site-frame.test.tsx`: structural and fallback behavior.
- Modify `tests/e2e/accessibility.spec.ts`: focus, target-size, mobile menu, and Reduced Motion assertions.
- Modify `tests/e2e/responsive.spec.ts`: Hero origin, top/scrolled navigation, mobile capsule, and overflow assertions.
- Modify `tests/e2e/vithelo-premium-ui.spec.ts`: approved material-glass state contract.
- Create `docs/archive/README.md`: archive authority notice.
- Move historical assets into `docs/archive/legacy-homepage-preview/`, `docs/archive/source-briefs/`, `docs/archive/legacy-design-system/`, `docs/archive/project-history/`, and `docs/archive/plans/`.
- Update links in `README.md`, `AGENTS.md`, and active `docs/*.md` files only where moved paths are referenced.

### Task 1: Lock the homepage frame contract with failing tests

**Files:**
- Create: `tests/unit/vithelo-b2b-site-frame.test.tsx`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/vithelo-premium-ui.spec.ts`

- [ ] **Step 1: Write the frame unit tests**

Add tests that render the frame with and without the homepage variant:

```tsx
import { render, screen } from "@testing-library/react";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

it("marks the homepage frame and omits the full-width disclosure", () => {
  render(
    <VitheloB2BSiteFrame content={vitheloB2BSite} variant="home">
      <main><section id="hero">Hero</section></main>
    </VitheloB2BSiteFrame>,
  );
  expect(screen.getByRole("banner")).toHaveAttribute("data-navigation-variant", "home");
  expect(document.querySelector("[data-site-disclosure='top']")).not.toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toHaveTextContent(vitheloB2BSite.disclosure);
});

it("keeps the stable internal frame and top disclosure", () => {
  render(
    <VitheloB2BSiteFrame content={vitheloB2BSite}>
      <main>Internal page</main>
    </VitheloB2BSiteFrame>,
  );
  expect(screen.getByRole("banner")).toHaveAttribute("data-navigation-variant", "internal");
  expect(document.querySelector("[data-site-disclosure='top']")).toBeInTheDocument();
});
```

- [ ] **Step 2: Add browser contract assertions**

In `tests/e2e/responsive.spec.ts`, replace the old expectation that Hero starts after the header with:

```ts
const headerBox = await page.locator("header").first().boundingBox();
const heroBox = await page.locator("#hero").boundingBox();
expect(headerBox?.y).toBe(0);
expect(heroBox?.y).toBe(0);
expect(headerBox?.height).toBeLessThanOrEqual(heroBox?.height ?? 0);
```

In `tests/e2e/vithelo-premium-ui.spec.ts`, add:

```ts
await expect(page.locator("header")).toHaveAttribute("data-navigation-variant", "home");
await expect(page.locator("header")).toHaveAttribute("data-navigation-state", "top");
await expect(page.locator("[data-site-disclosure='top']")).toHaveCount(0);
```

- [ ] **Step 3: Run the tests and verify red state**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-site-frame.test.tsx
pnpm.cmd test:e2e -- tests/e2e/vithelo-premium-ui.spec.ts
```

Expected: FAIL because `variant`, navigation data attributes, and homepage overlay behavior do not exist.

- [ ] **Step 4: Commit the red tests**

```powershell
git add tests/unit/vithelo-b2b-site-frame.test.tsx tests/e2e/responsive.spec.ts tests/e2e/vithelo-premium-ui.spec.ts
git commit -m "test: define material glass navigation contract"
```

### Task 2: Add the explicit homepage frame variant

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/core/vithelo-b2b-site-frame.tsx`
- Test: `tests/unit/vithelo-b2b-site-frame.test.tsx`

- [ ] **Step 1: Add the explicit frame type and disclosure behavior**

Use this interface and branching structure:

```tsx
type VitheloB2BSiteFrameProps = {
  children: ReactNode;
  content: B2BSiteContent;
  variant?: "home" | "internal";
};

export function VitheloB2BSiteFrame({
  children,
  content,
  variant = "internal",
}: VitheloB2BSiteFrameProps) {
  const isHome = variant === "home";
  return (
    <div className={styles.site} data-content-status={content.dataStatus} data-frame-variant={variant}>
      {!isHome ? <div className={styles.disclosure} data-site-disclosure="top">{content.disclosure}</div> : null}
      <VitheloB2BNavigation content={content} variant={variant} />
      {children}
      <footer className={styles.footer}>
        <div>
          <strong>VITHELO</strong>
          <p>{content.identity}</p>
        </div>
        <nav aria-label="Footer navigation">
          <NavigationLinks items={content.footerLinks} />
        </nav>
        <small>{content.disclosure}</small>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Mark only the homepage as home**

Update `src/app/page.tsx`:

```tsx
<VitheloB2BSiteFrame content={site} variant="home">
  <VitheloB2BHome content={content} />
</VitheloB2BSiteFrame>
```

Do not change frame calls in Products, OEM / ODM, Insights, articles, or Contact.

Update the validated demo site record in `src/content/demo/vithelo-b2b-site.ts`:

```ts
requestQuote: { label: "Start a Project", href: "/contact" },
```

- [ ] **Step 3: Run the unit contract**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-site-frame.test.tsx
```

Expected: homepage/internal structural tests pass after the navigation component is stubbed or added in Task 3.

- [ ] **Step 4: Commit the explicit variant**

```powershell
git add src/app/page.tsx src/components/core/vithelo-b2b-site-frame.tsx src/content/demo/vithelo-b2b-site.ts tests/unit/vithelo-b2b-site-frame.test.tsx
git commit -m "feat: add explicit homepage frame variant"
```

### Task 3: Implement focused navigation state and accessible markup

**Files:**
- Create: `src/components/core/vithelo-b2b-navigation.tsx`
- Modify: `src/components/core/vithelo-b2b-site-frame.tsx`
- Test: `tests/unit/vithelo-b2b-site-frame.test.tsx`

- [ ] **Step 1: Write an observer-state unit test**

Mock `IntersectionObserver`, capture its callback, and assert state changes:

```tsx
let observerCallback: IntersectionObserverCallback;
class ObserverMock {
  constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "0px";
  thresholds = [0];
}
vi.stubGlobal("IntersectionObserver", ObserverMock);

render(<VitheloB2BNavigation content={vitheloB2BSite} variant="home" />);
expect(screen.getByRole("banner")).toHaveAttribute("data-navigation-state", "top");
act(() => observerCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
expect(screen.getByRole("banner")).toHaveAttribute("data-navigation-state", "scrolled");
```

- [ ] **Step 2: Implement the client component**

Create a client component with one responsibility:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./vithelo-b2b-site-frame.module.css";
import type { B2BSiteContent } from "@/content/schema";

type Props = { content: B2BSiteContent; variant: "home" | "internal" };

export function VitheloB2BNavigation({ content, variant }: Props) {
  const [state, setState] = useState<"top" | "scrolled">(
    variant === "home" ? "top" : "scrolled",
  );

  useEffect(() => {
    if (variant !== "home") return;
    const hero = document.getElementById("hero");
    if (!hero || !("IntersectionObserver" in window)) {
      setState("scrolled");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setState(entry.isIntersecting ? "top" : "scrolled"),
      { rootMargin: "-80px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [variant]);

  const browseItems = content.navigation.filter((item) => item.label !== "Contact");
  const contact = content.navigation.find((item) => item.label === "Contact");

  return (
    <header className={styles.header} data-navigation-state={state} data-navigation-variant={variant}>
      <div className={styles.headerInner}>
        <div className={`${styles.navigationGroup} ${styles.browseGroup}`}>
          <Link aria-label="VITHELO home" className={styles.brand} href="/">VITHELO</Link>
          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            {browseItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div className={`${styles.navigationGroup} ${styles.conversionGroup}`}>
          {contact ? <Link className={styles.contactLink} href={contact.href}>{contact.label}</Link> : null}
          <Link className={styles.quote} href={content.requestQuote.href}>{content.requestQuote.label}</Link>
        </div>
        <div className={`${styles.navigationGroup} ${styles.mobileGroup}`} data-mobile-navigation-group>
          <Link aria-label="VITHELO home" className={styles.brand} href="/">VITHELO</Link>
          <details className={styles.mobileMenu}>
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              {content.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            </nav>
          </details>
          <Link aria-label="Start a Project" className={styles.mobileQuote} href={content.requestQuote.href}>Start</Link>
        </div>
      </div>
    </header>
  );
}
```

Preserve all current hrefs. Desktop left group is brand plus Products, OEM / ODM, and Insights. Desktop right group is Contact plus the existing request-quote action. Mobile scrolled group contains brand, Menu, and a visible `Start` label with `aria-label="Start a Project"`.

- [ ] **Step 3: Run focused unit tests**

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-site-frame.test.tsx
```

Expected: PASS for top, scrolled, internal fallback, disclosure, and footer assertions.

- [ ] **Step 4: Commit the state component**

```powershell
git add src/components/core/vithelo-b2b-navigation.tsx src/components/core/vithelo-b2b-site-frame.tsx tests/unit/vithelo-b2b-site-frame.test.tsx
git commit -m "feat: add homepage navigation state"
```

### Task 4: Apply the approved material-glass visual system

**Files:**
- Modify: `src/components/core/vithelo-b2b-site-frame.module.css`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`

- [ ] **Step 1: Add state-driven CSS**

Implement these exact design constraints in the existing CSS Module:

```css
.site[data-frame-variant="home"] { position: relative; }

.header[data-navigation-variant="home"] {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  border: 0;
  background: transparent;
  pointer-events: none;
}

.header[data-navigation-variant="home"] a,
.header[data-navigation-variant="home"] summary { pointer-events: auto; }

.header[data-navigation-variant="home"][data-navigation-state="top"] {
  color: #f3f0e8;
}

.header[data-navigation-variant="home"][data-navigation-state="scrolled"] .navigationGroup {
  min-height: 52px;
  border: 1px solid rgb(255 255 255 / 55%);
  border-radius: 999px;
  background: rgb(225 223 216 / 48%);
  box-shadow: 0 12px 30px rgb(15 18 16 / 9%);
  backdrop-filter: blur(16px);
}

.quote {
  background: #a9503c;
  color: #fff !important;
}
```

Use CSS custom properties for the approved warm brown and titanium glass values within `.site`. Keep the internal header's stable Paper treatment. Do not add a full-width scrolled background.

- [ ] **Step 2: Add quiet transition and Reduced Motion rules**

```css
.navigationGroup {
  transition: background-color 220ms ease-out, border-color 220ms ease-out,
    transform 220ms ease-out, padding 220ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .navigationGroup { transition: none; }
}
```

Do not animate blur continuously and do not introduce spring motion.

- [ ] **Step 3: Implement mobile single-capsule behavior**

At `max-width: 900px`, hide desktop groups. At homepage top, render brand and Menu with no background. In the scrolled state, give the mobile group the same 52px light titanium capsule. Keep the opened menu on a readable Paper panel, preserve 44px rows, and prevent viewport overflow at 375px.

- [ ] **Step 4: Update browser assertions**

Add checks:

```ts
await page.goto("/");
await expect(page.locator("header")).toHaveAttribute("data-navigation-state", "top");
await page.locator("#proof").scrollIntoViewIfNeeded();
await expect(page.locator("header")).toHaveAttribute("data-navigation-state", "scrolled");
await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
await expect(page.locator("header")).toHaveAttribute("data-navigation-state", "top");
```

For internal routes, assert `data-navigation-variant="internal"`. For mobile viewports, assert one visible `[data-mobile-navigation-group]` and no horizontal overflow.

- [ ] **Step 5: Run navigation E2E tests**

```powershell
pnpm.cmd test:e2e -- tests/e2e/responsive.spec.ts
pnpm.cmd test:e2e -- tests/e2e/accessibility.spec.ts
pnpm.cmd test:e2e -- tests/e2e/vithelo-premium-ui.spec.ts
```

Expected: PASS at all configured viewports; viewport-dependent tests may be skipped only by their existing explicit conditions.

- [ ] **Step 6: Commit the visual system**

```powershell
git add src/components/core/vithelo-b2b-site-frame.module.css tests/e2e/responsive.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/vithelo-premium-ui.spec.ts
git commit -m "style: add material glass navigation"
```

### Task 5: Archive historical material without changing contents

**Files:**
- Create: `docs/archive/README.md`
- Move: exact targets listed below
- Modify: active Markdown files only when they contain moved links

- [ ] **Step 1: Record file hashes before moving historical assets**

Run PowerShell and save the output temporarily under `.tmp/archive-hashes-before.txt`:

```powershell
$targets = @(
  "vithelo-homepage-work",
  "营养品与医疗美容器械高端品牌网站_整体方案_V6.0_Codex执行整合版.docx",
  "design-system/a-prime-brand-site",
  "AI_CHANGELOG.md", "IMPLEMENTATION_PLAN.md", "PROJECT_AUDIT.md",
  "SAVEPOINT-2026-08-23.md", "UI_HANDOFF.md"
)
$targets | ForEach-Object {
  if (Test-Path -LiteralPath $_) {
    Get-ChildItem -LiteralPath $_ -Recurse -File -ErrorAction SilentlyContinue |
      Get-FileHash -Algorithm SHA256
  }
} | Sort-Object Path | Format-Table -AutoSize | Out-File ".tmp/archive-hashes-before.txt"
```

- [ ] **Step 2: Create the archive index**

Create `docs/archive/README.md` with:

```md
# VITHELO Project Archive

Files in this directory are historical references. They are not authoritative for current design, content, deployment, or production claims.

Current authorities remain `AGENTS.md`, `README.md`, `docs/deployment.md`, the focused documents in `docs/`, and the latest approved specification in `docs/superpowers/specs/`.
```

- [ ] **Step 3: Move exact historical targets**

Use `Move-Item -LiteralPath` with resolved paths confined to the repository:

```powershell
Move-Item -LiteralPath "vithelo-homepage-work" -Destination "docs/archive/legacy-homepage-preview"
Move-Item -LiteralPath "营养品与医疗美容器械高端品牌网站_整体方案_V6.0_Codex执行整合版.docx" -Destination "docs/archive/source-briefs/"
Move-Item -LiteralPath "design-system/a-prime-brand-site" -Destination "docs/archive/legacy-design-system/a-prime-brand-site"
Move-Item -LiteralPath "AI_CHANGELOG.md","IMPLEMENTATION_PLAN.md","PROJECT_AUDIT.md","SAVEPOINT-2026-08-23.md","UI_HANDOFF.md" -Destination "docs/archive/project-history/"
```

Move superseded plans dated 2026-08-16 through 2026-08-27, `2026-08-21-deployment-environment-hardening.md`, and `2026-08-30-vithelo-premium-ui-phase-1.md` into `docs/archive/plans/`. Keep `2026-08-30-vithelo-operational-launch.md` active.

- [ ] **Step 4: Update active links and verify hashes**

Search active Markdown:

```powershell
Get-ChildItem -Path . -Recurse -Filter *.md |
  Where-Object { $_.FullName -notmatch "docs\\archive" } |
  Select-String -Pattern "AI_CHANGELOG|IMPLEMENTATION_PLAN|PROJECT_AUDIT|SAVEPOINT|UI_HANDOFF|deployment-environment-hardening|premium-ui-phase-1"
```

Update only links that now point into `docs/archive/`. Recalculate SHA256 hashes for moved historical content and confirm the hash sets match.

- [ ] **Step 5: Commit the archive move**

```powershell
git add -A -- docs/archive vithelo-homepage-work design-system AI_CHANGELOG.md IMPLEMENTATION_PLAN.md PROJECT_AUDIT.md SAVEPOINT-2026-08-23.md UI_HANDOFF.md docs/superpowers/plans README.md AGENTS.md docs
git commit -m "chore: archive superseded project material"
```

### Task 6: Validate the deployable application before generated cleanup

**Files:**
- Modify only files required by failures caused by Tasks 1–5

- [ ] **Step 1: Run static and unit checks**

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
```

Expected: all commands exit 0; unit suite retains at least the current 91 passing tests plus the new frame tests.

- [ ] **Step 2: Run the production build**

```powershell
pnpm.cmd build
```

Expected: Next.js production build exits 0 and generates all current public routes.

- [ ] **Step 3: Run complete browser acceptance**

```powershell
pnpm.cmd test:e2e
```

Expected: all applicable tests pass across desktop 1440, desktop 1280, tablet 1024, tablet 768, mobile 390, and mobile 375; only explicit viewport skips remain.

- [ ] **Step 4: Inspect the working tree**

```powershell
git status --short
git diff --check
```

Expected: no whitespace errors and no unrelated user-owned changes modified or removed.

- [ ] **Step 5: Commit validation-driven fixes if any**

```powershell
git add src/components/core/vithelo-b2b-navigation.tsx src/components/core/vithelo-b2b-site-frame.tsx src/components/core/vithelo-b2b-site-frame.module.css src/app/page.tsx src/content/demo/vithelo-b2b-site.ts tests
git commit -m "fix: satisfy navigation acceptance"
```

Skip this commit when no validation fix is necessary.

### Task 7: Delete only reproducible and obsolete local output

**Files:**
- Delete: `.next/`, `.pnpm-store/`, `playwright-report/`, `test-results/`, `tsconfig.tsbuildinfo`, empty `.tmp/`, `.vercel/`, completed `.superpowers/brainstorm/` sessions

- [ ] **Step 1: Resolve and verify cleanup targets**

Use explicit paths and confirm each resolves below the repository root:

```powershell
$projectRoot = (Resolve-Path -LiteralPath ".").Path
$cleanupTargets = @(
  ".next", ".pnpm-store", "playwright-report", "test-results",
  "tsconfig.tsbuildinfo", ".tmp", ".vercel", ".superpowers/brainstorm"
)
$resolvedTargets = foreach ($target in $cleanupTargets) {
  if (Test-Path -LiteralPath $target) {
    $resolved = (Resolve-Path -LiteralPath $target).Path
    if (-not $resolved.StartsWith($projectRoot + [IO.Path]::DirectorySeparatorChar)) {
      throw "Cleanup target escaped project root: $resolved"
    }
    $resolved
  }
}
$resolvedTargets
```

- [ ] **Step 2: Remove the verified targets**

```powershell
foreach ($resolved in $resolvedTargets) {
  Remove-Item -LiteralPath $resolved -Recurse -Force
}
```

Do not delete `node_modules`, `.env.local`, source files, tests, active docs, or Git data.

- [ ] **Step 3: Verify the compact root and recoverability**

```powershell
Get-ChildItem -Force | Select-Object Name,Mode
Test-Path -LiteralPath "docs/archive/legacy-homepage-preview"
Test-Path -LiteralPath "docs/deployment.md"
Test-Path -LiteralPath "src/app/page.tsx"
Test-Path -LiteralPath "node_modules"
```

Expected: all four `Test-Path` checks return `True`; cleanup targets are absent.

- [ ] **Step 4: Report cleanup results**

Report which directories were removed, which historical materials moved, that archive moves are recoverable through Git, and that generated output can be recreated with the documented pnpm commands.
