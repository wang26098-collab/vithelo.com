# VITHELO Product Formats 2.5D Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Home screen six from basic reveal motion to a Lusion-inspired 2.5D motion system while preserving the approved format-wall layout, content, images, links, and native scrolling.

**Architecture:** Keep the semantic format wall server-rendered. Add one isolated client enhancer that observes the section and its eight projects, computes clamped scroll velocity and pointer position, and writes motion state through `data-*` attributes and CSS custom properties. CSS owns all visual transitions; unsupported and Reduced Motion environments render the stable final state.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, IntersectionObserver, requestAnimationFrame, Vitest, Testing Library, Playwright.

---

## File map

- Create `src/components/motion/vithelo-format-wall-motion.tsx`: pure decode/velocity helpers and the client-only observer, scroll, pointer, and cleanup logic.
- Create `tests/unit/vithelo-format-wall-motion.test.tsx`: deterministic helper, enhancement, Reduced Motion, observer, pointer, and cleanup tests.
- Modify `src/components/patterns/vithelo-b2b-home.tsx`: add stable split-title markup, media plane, decode target, and the enhancer mount.
- Modify `src/components/patterns/vithelo-b2b-home.module.css`: replace basic view-timeline fading with character reveal, directional project entry, velocity deformation, pointer parallax, and static fallbacks.
- Modify `tests/unit/vithelo-b2b-home.test.tsx`: lock the eight media planes, stable accessible names, and motion hook attributes.
- Modify `tests/e2e/accessibility.spec.ts`: verify Reduced Motion final state.
- Modify `tests/e2e/responsive.spec.ts`: verify desktop pointer variables, mobile single-column behavior, and no overflow.
- Modify `tests/e2e/vithelo-premium-ui.spec.ts`: verify directional entry and settled state.

### Task 1: Lock the semantic motion hooks

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`

- [ ] **Step 1: Write the failing structure test**

Extend the format-wall test with:

```tsx
const title = within(dosage).getByRole("heading", {
  name: "One system. Eight expressions.",
});
expect(title).toHaveAttribute("data-format-title");
expect(title.querySelectorAll("[data-format-char]")).toHaveLength(
  Array.from("One system. Eight expressions.").length,
);
expect(within(dosage).getAllByTestId("format-media-plane")).toHaveLength(8);
expect(dosage.querySelectorAll("[data-format-label]")).toHaveLength(8);
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL because title characters, media planes, and decode targets do not exist.

- [ ] **Step 3: Add stable split-title and media-plane markup**

Render the heading with a stable accessible label and decorative character wrappers:

```tsx
<h2
  aria-label={content.dosage.title}
  className={styles.title}
  data-format-title
  id="dosage-title"
>
  {Array.from(content.dosage.title).map((character, index) => (
    <span aria-hidden="true" className={styles.formatCharClip} key={`${character}-${index}`}>
      <span
        className={styles.formatChar}
        data-format-char
        style={{ "--format-char-index": index } as React.CSSProperties}
      >
        {character === " " ? "\u00a0" : character}
      </span>
    </span>
  ))}
</h2>
```

Wrap each `Image` in `<span className={styles.formatMediaPlane} data-testid="format-media-plane">`. Add `aria-label={item.name}` and `data-format-label={item.name}` to each visible `h3`. Mount `<VitheloFormatWallMotion />` once inside the section.

- [ ] **Step 4: Run the test and verify GREEN**

Run the Step 2 command. Expected: PASS.

### Task 2: Implement deterministic motion behavior

**Files:**
- Create: `tests/unit/vithelo-format-wall-motion.test.tsx`
- Create: `src/components/motion/vithelo-format-wall-motion.tsx`

- [ ] **Step 1: Write failing helper and lifecycle tests**

Test these public pure functions and component effects:

```tsx
expect(clampFormatVelocity(80)).toBe(1);
expect(clampFormatVelocity(-80)).toBe(-1);
expect(clampFormatVelocity(0)).toBe(0);
expect(buildDecodedLabel("Gummies", 0, 0)).not.toBe("Gummies");
expect(buildDecodedLabel("Gummies", 7, 4)).toBe("Gummies");
```

Render a fixture section containing `[data-format-project]`, `[data-format-media]`, and `[data-format-label]`. Assert that normal motion sets `data-format-motion="enhanced"`, Reduced Motion sets `data-format-motion="static"`, an intersecting project receives `data-format-visible="true"`, pointer movement writes `--format-pointer-x` and `--format-pointer-y`, and unmount disconnects observers and removes listeners.

- [ ] **Step 2: Run the new test and verify RED**

```powershell
pnpm.cmd test -- tests/unit/vithelo-format-wall-motion.test.tsx
```

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement pure helpers**

Use a deterministic glyph set and reveal count:

```ts
const FORMAT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function clampFormatVelocity(delta: number) {
  return Math.max(-1, Math.min(1, delta / 48));
}

function buildDecodedLabel(label: string, revealed: number, frame: number) {
  return Array.from(label)
    .map((character, index) => {
      if (character === " " || index < revealed) return character;
      return FORMAT_GLYPHS[(index * 11 + frame * 7) % FORMAT_GLYPHS.length];
    })
    .join("");
}
```

- [ ] **Step 4: Implement the client enhancer**

The effect must:

1. Find `#dosage-forms`; return if absent.
2. Check `prefers-reduced-motion`; set static state and return before attaching motion listeners.
3. Set `data-format-motion="enhanced"`.
4. Observe the intro and each project. On first intersection, set `data-format-intro-visible` or `data-format-visible="true"`; unobserve entry targets after reveal.
5. Decode each visible `[data-format-label]` for no more than 600ms, restoring the exact label at completion.
6. Track one scroll position and timestamp, clamp velocity through `clampFormatVelocity`, smooth it, and write `--format-scroll-velocity` plus per-project `--format-view-progress` during `requestAnimationFrame`.
7. On fine-pointer media movement, write normalized `--format-pointer-x` and `--format-pointer-y`; reset both to `0` on leave.
8. Disconnect observers, cancel animation frames, cancel decode frames, and remove all listeners during cleanup.

- [ ] **Step 5: Run the test and verify GREEN**

Run the Step 2 command. Expected: PASS.

### Task 3: Replace the basic reveal with the approved 2.5D grammar

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Remove the conflicting format view-timeline rules**

Delete `@supports (animation-timeline: view())` rules for `.formatProject` and `.formatFigure img`, plus `format-project-reveal` and `format-media-progress`. These rules are the root cause of the current fade-and-slide result.

- [ ] **Step 2: Add title clipping and staggered character reveal**

```css
.formatCharClip { display: inline-block; overflow: hidden; vertical-align: bottom; }
.formatChar { display: inline-block; transform: translate3d(0, 105%, 0) rotate(10deg); transform-origin: 0 100%; }
.dosageSection[data-format-intro-visible="true"] .formatChar {
  transform: none;
  transition: transform 1s cubic-bezier(.16, 1, .3, 1);
  transition-delay: calc(var(--format-char-index) * 22ms);
}
.formatQualifier > span { display: block; overflow: hidden; }
.formatQualifier > span > span { display: block; transform: translate3d(0, 110%, 0); }
.dosageSection[data-format-intro-visible="true"] .formatQualifier > span > span {
  transform: none;
  transition: transform 900ms cubic-bezier(.16, 1, .3, 1) 160ms;
}
```

- [ ] **Step 3: Add opposite-direction project entry**

```css
.homepage[data-motion-mode="enhanced"] .formatProject {
  --format-entry-x: -8vw;
  opacity: 1;
  transform: translate3d(var(--format-entry-x), 56px, 0) rotate(-2.6deg);
  transform-origin: 50% 50%;
  transition: transform 1.35s cubic-bezier(.16, 1, .3, 1);
}
.homepage[data-motion-mode="enhanced"] .formatProject:nth-child(even) {
  --format-entry-x: 8vw;
  transform: translate3d(var(--format-entry-x), 56px, 0) rotate(2.6deg);
}
.homepage[data-motion-mode="enhanced"] .formatProject[data-format-visible="true"] {
  transform: none;
}
```

This selector must outrank the existing generic `[data-motion-role="collection-item"]` reveal without changing the generic behavior used by screen three.

- [ ] **Step 4: Add the media-plane transform stack**

```css
.formatMediaPlane {
  position: absolute;
  inset: -4%;
  display: block;
  transform:
    perspective(1000px)
    translate3d(
      calc(var(--format-pointer-x, 0) * -12px),
      calc((var(--format-pointer-y, 0) * -8px) + (var(--format-scroll-velocity, 0) * 12px)),
      0
    )
    rotateX(calc(var(--format-pointer-y, 0) * 1.2deg))
    rotateY(calc(var(--format-pointer-x, 0) * -1.5deg))
    rotateZ(calc(var(--format-scroll-velocity, 0) * .8deg))
    scaleY(calc(1 + (var(--format-scroll-velocity-abs, 0) * .015)));
  transition: transform 160ms linear;
  will-change: transform;
}
.formatMediaPlane img {
  object-fit: cover;
  scale: 1.06;
  translate: 0 calc((var(--format-view-progress, .5) - .5) * -8%);
}
```

Add a low-opacity radial highlight driven by pointer variables through `.formatFigure::after`. Do not add card shadows or rounded containers.

- [ ] **Step 5: Add responsive and Reduced Motion overrides**

Below 760px, switch directional entry to `translateY(48px)`, cap velocity transforms at half strength through a CSS multiplier, and disable pointer rotation. Under `prefers-reduced-motion: reduce`, set all characters, qualifier lines, projects, media planes, and images directly to their final transform and transition state.

- [ ] **Step 6: Run unit and targeted lint checks**

```powershell
pnpm.cmd test -- tests/unit/vithelo-format-wall-motion.test.tsx tests/unit/vithelo-b2b-home.test.tsx
node node_modules/eslint/bin/eslint.js src/components/motion/vithelo-format-wall-motion.tsx src/components/patterns/vithelo-b2b-home.tsx tests/unit/vithelo-format-wall-motion.test.tsx tests/unit/vithelo-b2b-home.test.tsx
```

Expected: both commands exit 0.

### Task 4: Verify real interaction and accessibility

**Files:**
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/vithelo-premium-ui.spec.ts`

- [ ] **Step 1: Add failing E2E assertions**

Cover these observable contracts:

```ts
await expect(page.locator("#dosage-forms")).toHaveAttribute("data-format-motion", "enhanced");
await expect(page.locator("#dosage-forms [data-format-project]").first()).toHaveAttribute("data-format-visible", "true");
await expect(page.locator("#dosage-forms [data-format-label]").first()).toHaveText("Gummies");
```

For desktop, move the pointer between opposite corners of the first media and assert that `--format-pointer-x` changes sign. For Reduced Motion, assert `data-format-motion="static"` and exact final names. At every viewport, assert `document.documentElement.scrollWidth === window.innerWidth`.

- [ ] **Step 2: Run focused E2E and verify behavior**

```powershell
$env:E2E_EXTERNAL_SERVER='1'
$env:E2E_BASE_URL='http://127.0.0.1:3000'
node node_modules/@playwright/test/cli.js test tests/e2e/accessibility.spec.ts tests/e2e/responsive.spec.ts tests/e2e/vithelo-premium-ui.spec.ts --grep="format wall|Product Formats|reduced motion"
```

Expected before the final implementation: FAIL on new motion contracts. Expected after Tasks 1–3: PASS.

- [ ] **Step 3: Perform six-viewport visual QA**

Inspect 1440, 1280, 1024, 768, 390, and 375 widths at the intro, first row, mid-wall, and final row. Confirm title characters do not clip in their final state, opposite-direction entry does not cause horizontal document overflow, images stay inside media frames, sticky navigation does not obscure headings, and Oral Films keeps equal visual weight.

- [ ] **Step 4: Run final static verification**

```powershell
pnpm.cmd test
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: all unit tests, typecheck, and build pass. Record the local Node 24 engine warning without presenting it as Node 20 deployment proof.

