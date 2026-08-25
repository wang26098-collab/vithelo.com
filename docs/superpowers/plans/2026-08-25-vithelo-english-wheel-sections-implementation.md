# VITHELO English Wheel Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the independent VITHELO full-homepage preview to English and replace the two rejected product displays with an accessible center-capture market stage and a vertical eight-format catalogue.

**Architecture:** Keep the current single-file HTML preview so the user can review it without a build step. Isolate the new behavior in a small `MarketStage` JavaScript module embedded in the preview; progressive HTML remains complete without JavaScript, while CSS switches between the desktop stage and mobile vertical flow.

**Tech Stack:** Semantic HTML, CSS custom properties and media queries, vanilla JavaScript, Node.js built-in test runner.

---

## File map

- Modify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html` — visible English content, market stage, vertical dosage catalogue, responsive and accessibility behavior.
- Create: `vithelo-homepage-work/market-stage-logic.mjs` — pure pointer-zone and state-boundary decision helper shared by tests and the preview module.
- Modify: `vithelo-homepage-work/tests/full-preview-contract.test.mjs` — language, section structure, MOQ, fallback, and non-configured contact contracts.
- Create: `vithelo-homepage-work/tests/market-stage-behavior.test.mjs` — pure state-transition tests for the wheel decision logic.
- Preserve unchanged: `vithelo-homepage-work/VITHELO_Homepage_V2.1_footer_scroll_frames.html` and `E:\CodexWorkspace\8-23独立站\website\VITHELO_Homepage_V2.1_footer_scroll_frames.html`.

### Task 1: Lock the English and vertical-layout contracts

**Files:**
- Modify: `vithelo-homepage-work/tests/full-preview-contract.test.mjs`

- [ ] **Step 1: Add failing English-content tests**

Add tests that extract the visible preview before `.legacy-preview` and assert the approved headings and absence of common Chinese characters:

```js
test('uses English for all visible homepage content', () => {
  assert.match(visibleHtml, /Market-Led Concepts, Ready to Build\./);
  assert.match(visibleHtml, /Eight Formats\. One Manufacturing System\./);
  assert.doesNotMatch(visibleHtml, /[\u3400-\u9fff]/);
  assert.doesNotMatch(visibleHtml, /United States|U\.S\. market|American market/i);
});
```

- [ ] **Step 2: Add failing section-structure tests**

```js
test('renders six vertical market stories and eight vertical dosage chapters', () => {
  assert.equal((visibleHtml.match(/data-market-story=/g) || []).length, 6);
  assert.equal((visibleHtml.match(/data-dosage-chapter=/g) || []).length, 8);
  assert.doesNotMatch(visibleHtml, /class="vp-spectrum"/);
  assert.doesNotMatch(visibleHtml, /overflow-x\s*:\s*auto/);
});

test('keeps approved MOQ copy without turning it into a universal promise', () => {
  for (const text of ['500 bottles', '60,000–100,000', '300,000', '100,000', '100 kg', '2 metric tons']) {
    assert.match(visibleHtml, new RegExp(text));
  }
  assert.match(visibleHtml, /Flexible MOQ based on formula and packaging\./);
  assert.match(visibleHtml, /Contact us for MOQ/);
});
```

- [ ] **Step 3: Run the contract test and verify red state**

Run:

```powershell
& 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\full-preview-contract.test.mjs
```

Expected: the new English and vertical-layout assertions fail against the current Chinese/horizontal preview.

- [ ] **Step 4: Record the frozen preview hash**

Run:

```powershell
Get-FileHash .\VITHELO_Homepage_V2.1_footer_scroll_frames.html -Algorithm SHA256
```

Expected: `E1AF5C645282F4CB3932815E4814D95C396E7402F0A9311FDAB577F5D0AACCA5`.

### Task 2: Convert all visible content to English

**Files:**
- Modify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`

- [ ] **Step 1: Replace every visible Chinese heading, description, label, form field, and footer statement**

Use concise B2B English. The market section must begin with:

```html
<section id="solutions" class="vp-section market-stage" aria-labelledby="solutions-title">
  <p class="vp-kicker">04 · Market-Ready Solutions</p>
  <h2 id="solutions-title" class="vp-title">Market-Led Concepts, Ready to Build.</h2>
</section>
```

The dosage section must begin with:

```html
<section id="dosage-forms" class="vp-section" aria-labelledby="dosage-title">
  <p class="vp-kicker">05 · Dosage Form Spectrum</p>
  <h2 id="dosage-title" class="vp-title">Eight Formats. One Manufacturing System.</h2>
  <p class="vp-copy">Flexible MOQ based on formula and packaging. Contact us for MOQ.</p>
</section>
```

Contact controls remain explicitly non-operational:

```html
<section id="contact" data-contact-state="NOT_CONFIGURED">
  <button type="button" disabled>Inquiry submission not configured</button>
  <p id="contact-pending">Contact details pending approval · NOT_CONFIGURED</p>
</section>
```

- [ ] **Step 2: Run the language contract test**

Run the Task 1 Node command.

Expected: the English-language assertion passes; interaction and vertical-layout assertions may still fail.

### Task 3: Implement the center-capture market stage

**Files:**
- Modify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`
- Create: `vithelo-homepage-work/tests/market-stage-behavior.test.mjs`

- [ ] **Step 1: Write failing pure-behavior tests**

Create a test file that imports the decision helper from an exported test hook and verifies center, gutter, first, and last behavior:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { decideMarketStageAction } from '../market-stage-logic.mjs';

test('center advances one story while gutters release page scroll', () => {
  assert.deepEqual(decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: .5 }), { type: 'advance', index: 3 });
  assert.deepEqual(decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: .05 }), { type: 'release' });
  assert.deepEqual(decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: .95 }), { type: 'release' });
});

test('first-up and last-down gestures release page scroll', () => {
  assert.deepEqual(decideMarketStageAction({ index: 0, count: 6, direction: -1, pointerRatio: .5 }), { type: 'release' });
  assert.deepEqual(decideMarketStageAction({ index: 5, count: 6, direction: 1, pointerRatio: .5 }), { type: 'release' });
});
```

- [ ] **Step 2: Run the behavior test and verify it fails**

Run:

```powershell
& 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\market-stage-behavior.test.mjs
```

Expected: FAIL because `market-stage-logic.mjs` does not exist.

- [ ] **Step 3: Create the minimal decision helper**

Create `vithelo-homepage-work/market-stage-logic.mjs`:

```js
export function decideMarketStageAction({ index, count, direction, pointerRatio }) {
  if (pointerRatio < 0.12 || pointerRatio > 0.88) return { type: 'release' };
  const next = index + direction;
  if (next < 0 || next >= count) return { type: 'release' };
  return { type: 'advance', index: next };
}
```

- [ ] **Step 4: Add semantic story markup**

Render six `.market-story` elements in approved order with `data-market-story`, a heading, description, index, and visual placeholder. Add visible Previous and Next buttons with 44px minimum targets and an `aria-live="polite"` progress label.

- [ ] **Step 5: Add bounded desktop wheel handling**

In the preview module:

```js
stage.addEventListener('wheel', (event) => {
  if (!desktop.matches || reducedMotion.matches || transitionLocked) return;
  const ratio = (event.clientX - stage.getBoundingClientRect().left) / stage.clientWidth;
  const action = decideMarketStageAction({
    index: activeIndex,
    count: stories.length,
    direction: event.deltaY > 0 ? 1 : -1,
    pointerRatio: ratio,
  });
  if (action.type === 'release') return;
  event.preventDefault();
  showStory(action.index);
}, { passive: false });
```

Lock only for the declared transition duration. Previous/Next buttons and ArrowUp/ArrowDown call `showStory`; Escape blurs the focused control. Do not attach wheel handlers to `window` or `document`.

- [ ] **Step 6: Add responsive and Reduced Motion CSS**

Desktop uses one sticky editorial stage. At `max-width: 760px`, all six stories return to normal document flow with `min-height: 82svh`; no story is absolutely positioned and touch scrolling is native. Under `prefers-reduced-motion: reduce`, remove transforms and transition durations.

- [ ] **Step 7: Run behavior and contract tests**

Run both Node test files.

Expected: all market-stage tests pass.

### Task 4: Replace the horizontal dosage rail with eight vertical chapters

**Files:**
- Modify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`

- [ ] **Step 1: Remove `.vp-spectrum`, `.vp-dose`, and horizontal overflow rules**

Delete the horizontal rail markup and its `display:flex`, fixed flex-basis, and `overflow-x:auto` declarations.

- [ ] **Step 2: Add eight semantic dosage chapters**

Use this repeated structure with the eight approved records:

```html
<article class="dosage-chapter" data-dosage-chapter>
  <div class="dosage-visual" aria-hidden="true">Product asset · transparent PNG or factory photography</div>
  <div class="dosage-copy">
    <span class="vp-index">01 / 08</span>
    <h3>Gummies</h3>
    <p>Custom shapes, flavors, colors, textures, and packaging.</p>
    <p class="dosage-moq">Custom projects from 500 bottles</p>
  </div>
</article>
```

Repeat in approved order for Hard Capsules, Softgels, Tablets, Powders, Functional Gum, Liquids, and Oral Films, with the MOQ text from the design specification.

- [ ] **Step 3: Add vertical editorial styling**

Use a two-column row with a thin top rule, alternating visual/copy order on desktop, generous vertical space, and natural one-column stacking on mobile. Do not use rounded cards, shadows, a horizontal scrollbar, or carousel controls.

- [ ] **Step 4: Run all preview tests**

Run:

```powershell
& 'C:\Users\admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\full-preview-contract.test.mjs tests\market-stage-behavior.test.mjs tests\homepage-contract.test.mjs
```

Expected: all tests pass.

### Task 5: Browser verification and preservation check

**Files:**
- Verify: `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`
- Verify unchanged: `vithelo-homepage-work/VITHELO_Homepage_V2.1_footer_scroll_frames.html`

- [ ] **Step 1: Open the independent preview**

Open `http://localhost:8080/VITHELO_Homepage_FullPreview_V1.html` at desktop width.

- [ ] **Step 2: Verify the desktop interaction manually**

Check center advancement, one-story throttling, both gutter releases, first-up exit, last-down exit, Previous/Next controls, Arrow keys, Escape, focus visibility, and absence of page-wide scroll interception.

- [ ] **Step 3: Verify mobile and Reduced Motion**

At 390px width, confirm all six market stories and eight dosage chapters appear in vertical DOM order with no horizontal overflow. Enable Reduced Motion and confirm transitions are removed without hiding information.

- [ ] **Step 4: Verify frozen-preview integrity**

Run:

```powershell
Get-FileHash .\VITHELO_Homepage_V2.1_footer_scroll_frames.html -Algorithm SHA256
```

Expected: `E1AF5C645282F4CB3932815E4814D95C396E7402F0A9311FDAB577F5D0AACCA5`.

- [ ] **Step 5: Commit only the independent preview changes**

```powershell
git add -- vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html vithelo-homepage-work/market-stage-logic.mjs vithelo-homepage-work/tests/full-preview-contract.test.mjs vithelo-homepage-work/tests/market-stage-behavior.test.mjs
git commit -m "feat: revise VITHELO English product sections"
```

If `.git` remains read-only, report the permission block and leave the verified working files uncommitted; do not alter repository permissions.

## Plan self-review

- Spec coverage: language conversion, neutral market title, six-story center interaction, gutter release, exit boundaries, mobile fallback, keyboard, Reduced Motion, vertical eight-format display, MOQ qualification, contact state, and preview preservation are each mapped to a task.
- Placeholder scan: no implementation step depends on `TBD`, `TODO`, invented content, or an unspecified error path.
- Type consistency: the decision helper uses the same `{ index, count, direction, pointerRatio }` input and `{ type, index? }` output in tests and browser integration.
