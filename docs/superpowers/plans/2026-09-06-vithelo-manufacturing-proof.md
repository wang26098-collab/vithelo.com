# VITHELO Manufacturing Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild only the homepage second screen as the approved editorial manufacturing-proof split with source-provided facts, a real screened factory image, and four capability summaries.

**Architecture:** Keep the section inside the existing `VitheloB2BHome` page pattern and keep all copy in the validated homepage content record. Extend only the `proof` content contract, render the section with semantic HTML and `next/image`, and scope all new styling to the existing CSS module.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules, Zod, Vitest, Testing Library, Playwright.

---

## File map

- `src/content/schema.ts`: validated contract for manufacturing metrics, capabilities, CTA, and media.
- `src/content/demo/vithelo-b2b-home.ts`: English public content sourced from the provided company-profile PDF.
- `src/components/patterns/vithelo-b2b-home.tsx`: semantic second-screen markup and line icons.
- `src/components/patterns/vithelo-b2b-home.module.css`: desktop, tablet, mobile, focus, and motion styling.
- `public/media/b2b/sanitized-factory-production-line.jpg`: public copy of the screened indoor factory photograph.
- `tests/unit/vithelo-b2b-home-content.test.ts`: contract and source-bound content checks.
- `tests/unit/vithelo-b2b-home.test.tsx`: rendered structure, image, links, public-copy, and motion checks.

### Task 1: Lock the approved content and structure with failing tests

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`

- [ ] **Step 1: Replace the stale proof expectations with the approved content expectations**

```ts
expect(vitheloB2BHome.proof.title).toBe("From Formula to Finished Product");
expect(vitheloB2BHome.proof.metrics).toEqual([
  { value: "2008", label: "Established" },
  { value: "5,000+", label: "Customers served" },
  { value: "50+", label: "Countries & regions" },
  { value: "7", label: "Production categories" },
]);
expect(vitheloB2BHome.proof.capabilities).toHaveLength(4);
expect(vitheloB2BHome.proof.action).toEqual({
  label: "Explore Our Factory",
  href: "/manufacturing",
});
expect(vitheloB2BHome.proof.media.src).toBe(
  "/media/b2b/sanitized-factory-production-line.jpg",
);
```

- [ ] **Step 2: Assert the rendered design contract**

```tsx
const proof = document.getElementById("proof")!;
expect(proof).toHaveAttribute("data-layout", "manufacturing-editorial-split");
expect(within(proof).getByTestId("manufacturing-scene")).toBeVisible();
expect(within(proof).getAllByTestId("manufacturing-metric")).toHaveLength(4);
expect(within(proof).getAllByTestId("manufacturing-capability")).toHaveLength(4);
expect(within(proof).getByRole("link", { name: "Explore Our Factory" })).toHaveAttribute("href", "/manufacturing");
expect(proof).not.toHaveTextContent(/NOT_CONFIGURED|DEMO_ONLY|森酷|Sencool|GMP|HACCP|Halal|ISO|FDA/i);
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx`

Expected: FAIL because the new proof contract, title, metrics, capability rail, image, layout marker, and CTA are absent.

### Task 2: Extend the content contract and add the approved PDF-backed record

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`

- [ ] **Step 1: Replace the generic proof fields with explicit fields**

```ts
proof: z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
  action: z.object({ label: z.string().min(1), href: z.string().startsWith("/") }),
  media: B2BRequiredMediaSchema,
  metrics: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).length(4),
  capabilities: z.array(z.object({ title: z.string().min(1), copy: z.string().min(1) })).length(4),
}),
```

- [ ] **Step 2: Populate the proof record with the approved English content**

```ts
proof: {
  kicker: "02 · Manufacturing Capability",
  title: "From Formula to Finished Product",
  copy: "A manufacturing partner for nutrition products, bringing development, multi-format production and delivery into one coordinated system.",
  action: { label: "Explore Our Factory", href: "/manufacturing" },
  media: {
    status: "FREE_COMMERCIAL_OR_REAL",
    src: "/media/b2b/sanitized-factory-production-line.jpg",
    label: "Clean indoor nutrition production line",
    width: 960,
    height: 1280,
    format: "JPEG",
  },
  metrics: [
    { value: "2008", label: "Established" },
    { value: "5,000+", label: "Customers served" },
    { value: "50+", label: "Countries & regions" },
    { value: "7", label: "Production categories" },
  ],
  capabilities: [
    { title: "R&D Support", copy: "Formula development and sample coordination" },
    { title: "Multi-format Production", copy: "Gummies, capsules, tablets, powders and liquids" },
    { title: "Quality Control", copy: "Process control, batch inspection and traceability" },
    { title: "OEM / ODM Delivery", copy: "Packaging coordination and production delivery" },
  ],
},
```

- [ ] **Step 3: Run the content test**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts`

Expected: PASS for the content contract; component tests remain RED.

### Task 3: Add the screened public factory asset

**Files:**
- Create: `public/media/b2b/sanitized-factory-production-line.jpg`

- [ ] **Step 1: Copy the screened indoor image without altering the original**

```powershell
Copy-Item -LiteralPath '独立站内容\01-工厂实力\室内现场\微信图片_202609052155406725_8.jpg' -Destination 'public\media\b2b\sanitized-factory-production-line.jpg'
```

- [ ] **Step 2: Verify the output**

Run: `Get-Item 'public\media\b2b\sanitized-factory-production-line.jpg'`

Expected: one non-empty 960×1280 JPEG. Visual inspection shows a clean indoor line without source-company name or Logo.

### Task 4: Implement the semantic editorial split

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`

- [ ] **Step 1: Read the installed Next.js image guide**

Run: `Get-ChildItem 'node_modules\next\dist\docs' -Recurse -File | Where-Object Name -Match 'image' | Select-Object -First 5 FullName`

Expected: locate and read the installed-version documentation before importing `next/image`.

- [ ] **Step 2: Import `Image`, add the decorative icon component, and replace only the current `#proof` markup**

```tsx
function ProofCapabilityIcon({ index }: { index: number }) {
  const paths = [
    <><path d="M9 3v6l-5 9a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5-9V3" /><path d="M8 14h8" /></>,
    <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    <><path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  ];
  return <svg aria-hidden="true" className={styles.proofCapabilityIcon} fill="none" viewBox="0 0 24 24">{paths[index]}</svg>;
}

<section aria-labelledby="proof-title" className={styles.proof} data-layout="manufacturing-editorial-split" data-motion-intent="EXPLAIN" id="proof">
  <div className={styles.proofPrimary}>
    <div className={styles.proofNarrative}>
      <p className={styles.kicker}>{content.proof.kicker}</p>
      <h2 className={styles.title} id="proof-title">{content.proof.title}</h2>
      <p className={styles.copy}>{content.proof.copy}</p>
      <div className={styles.proofMetrics}>
        {content.proof.metrics.map((metric) => (
          <article data-motion-role="proof-value" data-testid="manufacturing-metric" key={metric.label}>
            <strong>{metric.value}</strong><span>{metric.label}</span>
          </article>
        ))}
      </div>
      <Link className={styles.proofAction} href={content.proof.action.href}>{content.proof.action.label}<span aria-hidden="true">→</span></Link>
    </div>
    <figure className={styles.proofVisual} data-motion-role="media" data-testid="manufacturing-scene">
      <Image alt={content.proof.media.label} fill sizes="(max-width: 760px) 100vw, 52vw" src={content.proof.media.src!} />
      <figcaption>Nutrition manufacturing · OEM / ODM</figcaption>
    </figure>
  </div>
  <div className={styles.proofCapabilities} data-motion-role="proof-ledger">
    {content.proof.capabilities.map((capability, index) => (
      <article data-motion-role="proof-value" data-testid="manufacturing-capability" key={capability.title}>
        <ProofCapabilityIcon index={index} />
        <div><h3>{capability.title}</h3><p>{capability.copy}</p></div>
      </article>
    ))}
  </div>
</section>
```

Metrics use semantic articles with `data-motion-role="proof-value"` and `data-testid="manufacturing-metric"`. Icons are decorative SVGs with `aria-hidden="true"`; the capability headings provide accessible names.

- [ ] **Step 3: Run the component test**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx`

Expected: structure and content checks pass; visual styling remains to be reviewed.

### Task 5: Implement the approved responsive visual system

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Replace obsolete proof styles with section-scoped styles**

```css
.proof { min-height: 100svh; padding: clamp(4.5rem, 7vw, 7rem) clamp(1.375rem, 5vw, 5.5rem) clamp(1.5rem, 3vw, 3rem); background: var(--ivory); color: var(--ink); }
.proofPrimary { width: min(100%, 1440px); margin-inline: auto; display: grid; grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr); }
.proofNarrative { padding: clamp(1rem, 3vw, 3rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem) 0; display: flex; flex-direction: column; }
.proofVisual { position: relative; min-height: clamp(32rem, 58vw, 48rem); margin: 0; overflow: hidden; }
.proofVisual img { object-fit: cover; object-position: 50% 55%; }
.proofMetrics { margin-top: clamp(2.5rem, 5vw, 4.5rem); display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.proofCapabilities { width: min(100%, 1440px); margin-inline: auto; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block: 1px solid var(--line); }
```

Use fine dividers, no elevated cards, a graphite CTA with arrow response, and restrained typography matching the reference hierarchy.

- [ ] **Step 2: Add tablet and phone adaptations**

At `max-width: 900px`, collapse the primary split to one column and use a wide image crop. At `max-width: 760px`, use two metric columns and one capability column, preserve 44px targets, and prevent horizontal overflow.

- [ ] **Step 3: Connect existing motion behavior**

Use `proof-value` motion roles for metrics and capabilities. Keep all meaningful content visible inside the existing `prefers-reduced-motion: reduce` final-state block.

- [ ] **Step 4: Run focused verification**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-b2b-home.test.tsx
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: all commands exit 0. Report known unrelated full-suite failures separately.

### Task 6: Visual QA the second screen

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Open the local homepage and inspect `#proof` at 1440×900 and 390×844**

Expected: approved split, deliberate image crop, readable metrics, capability rail, visible CTA focus state, and clean transitions to screens one and three.

- [ ] **Step 2: Check overflow and Reduced Motion**

Expected: no clipping, overlap, or horizontal scroll; all facts remain visible with Reduced Motion.

- [ ] **Step 3: Run the focused homepage E2E if it does not conflict with the active server**

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts`

Expected: focused homepage checks pass; do not claim the known unrelated full E2E suite is green.

- [ ] **Step 4: Review the final diff**

Run: `git diff --check`

Expected: every changed line traces to the second-screen request; no source identity or unrelated screen change appears.
