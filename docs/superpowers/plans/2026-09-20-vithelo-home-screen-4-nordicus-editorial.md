# VITHELO Home Screen 4 Nordicus Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only Home screen 4 with the user-approved Nordicus-inspired editorial composition while preserving the existing Formula disclosure, accessibility, responsive behavior, and the other eight Home sections.

**Architecture:** Keep `VitheloB2BHome` as the section owner and keep Formula state inside `VitheloFormulaConstellation`. Reshape the client component into a media frame plus a four-item editorial decision row, then use the existing Home CSS module to place the intro, image, and decision row on the same gutter, type scale, and vertical rhythm already used by accepted Home screens. Keep copy and media references in the validated content fixture.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Vitest/Testing Library, Playwright.

---

### Task 1: Lock the approved content and semantic structure

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/unit/vithelo-formula-constellation.test.tsx`
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-formula-constellation.tsx`

- [ ] **Step 1: Write failing structure tests**

Add assertions that screen 4 renders the approved title, one concise paragraph, the OEM/ODM link, one 4:3 editorial media frame, and a four-item decision row without orbit or icon decoration:

```tsx
expect(within(stage).getByRole("heading", {
  name: "Four decisions. One coherent product.",
})).toBeInTheDocument();
expect(within(stage).getByTestId("customization-media-frame")).toBeInTheDocument();
expect(within(stage).getByTestId("customization-decision-grid")).toBeInTheDocument();
expect(within(stage).getAllByTestId("customization-node")).toHaveLength(4);
expect(within(stage).queryByTestId("customization-orbit")).not.toBeInTheDocument();
expect(within(stage).queryByTestId("customization-node-icon")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused unit tests and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-formula-constellation.test.tsx
```

Expected: FAIL because the approved heading and editorial structure are not rendered yet.

- [ ] **Step 3: Implement the minimal semantic structure**

Update the content record to:

```ts
kicker: "PRODUCT DEFINITION",
title: "Four decisions. One coherent product.",
copy: "Formula, dosage form, sensory direction and packaging are considered together—so the product brief begins as one connected system.",
```

Use `/media/b2b/vithelo-formula-customization-atmospheric.png` as the default editorial image. In `VitheloFormulaConstellation`, wrap the figures and Formula details in `customizationMediaFrame`, render the four decisions inside `customizationDecisionGrid`, remove the orbit and icon markup, and retain the Formula button's pointer, keyboard, Escape, and off-screen reset behavior.

- [ ] **Step 4: Run the focused unit tests and verify GREEN**

Run the command from Step 2. Expected: both files pass.

### Task 2: Reproduce the approved Nordicus spatial system

**Files:**
- Modify: `tests/unit/vithelo-home-geometry-contract.test.ts`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Write a failing geometry contract**

Assert that the screen-four stylesheet contains the approved white sheet, fluid Nordicus desktop gutter, responsive asymmetric columns, 4:3 media frame, 20px media radius, and a borderless four-column decision row:

```ts
expect(css).toMatch(/\.homepage \.customizationSection[\s\S]*background:\s*#fbfbfb/);
expect(css).toMatch(/\.homepage \.customizationSection[\s\S]*padding-inline:[^;]*var\(--home-frame-gutter\)/);
expect(css).toMatch(/\.customizationLayout[\s\S]*grid-template-columns:[^;]*minmax\(0,\s*0\.96fr\)[^;]*minmax\(360px,\s*1\.04fr\)/);
expect(css).toMatch(/\.customizationMediaFrame[\s\S]*aspect-ratio:\s*4\s*\/\s*3/);
expect(css).toMatch(/\.customizationMediaFrame[\s\S]*border-radius:\s*20px/);
expect(css).toMatch(/\.customizationDecisionGrid[\s\S]*grid-template-columns:\s*repeat\(4/);
```

- [ ] **Step 2: Run the geometry contract and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: FAIL because the current dark constellation layout uses radial gradients, orbit decoration, and an oversized split.

- [ ] **Step 3: Implement the approved responsive CSS**

Apply these visual rules only to screen 4:

```css
.homepage .customizationSection { background: #fbfbfb; color: var(--ink); }
.customizationLayout {
  display: grid;
  grid-template-columns: minmax(0, 1.16fr) minmax(320px, 0.92fr);
  column-gap: clamp(64px, 6.95vw, 133px);
}
.customizationMediaFrame { aspect-ratio: 4 / 3; border-radius: 20px; }
.customizationDecisionGrid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
```

The desktop section reuses the accepted Home `--home-frame-gutter` (190px at desktop) and 80px vertical section rhythm, while keeping Nordicus's white-sheet treatment. It keeps a serif headline constrained to two lines, a black pill CTA, no decorative rules, no cards, and no node icons. At tablet and mobile widths, stack intro, image, and decisions in source order; keep all targets at least 44px and preserve visible focus.

- [ ] **Step 4: Run the geometry and focused component tests**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-home-geometry-contract.test.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-formula-constellation.test.tsx
```

Expected: PASS.

### Task 3: Verify interaction and visual parity

**Files:**
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Create: `tmp/vithelo-home-screen-04-1440.png`
- Create: `tmp/vithelo-home-screen-04-390.png`

- [ ] **Step 1: Update the screen-four E2E contract**

Keep the existing Formula hover/tap/keyboard assertions, replace old orbit/image-opacity expectations with checks for the editorial media frame and disclosure state, and assert that the four decisions remain visible in both overview and Formula states.

- [ ] **Step 2: Run focused E2E checks**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts
```

Expected: PASS at the configured desktop and mobile projects.

- [ ] **Step 3: Run static verification**

Run:

```powershell
pnpm.cmd typecheck
pnpm.cmd lint
```

Expected: both commands exit 0.

- [ ] **Step 4: Capture and inspect the section**

Capture `#gummy-stage` at 1920×1080, 1440×1000, 1280×800, and 390×844. Confirm: near-white matte sheet, proportional side whitespace, title no more than two desktop lines, one paragraph, 4:3 image, no extra lines/icons/cards, four readable decisions, no clipping or horizontal overflow, and Formula remains keyboard/touch operable.

- [ ] **Step 5: Preserve shared-worktree changes**

Do not run broad staging or formatting commands. Review only the touched screen-four hunks with:

```powershell
git diff -- src/components/patterns/vithelo-b2b-home.tsx src/components/patterns/vithelo-formula-constellation.tsx src/components/patterns/vithelo-b2b-home.module.css src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-formula-constellation.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts tests/e2e/nutrition-home-sequence.spec.ts
```

Expected: every changed hunk maps directly to the approved screen-four design.
