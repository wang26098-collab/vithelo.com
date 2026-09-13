# VITHELO Reference Scroll Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace homepage screen five with a near-full-width sequence of rounded moving windows that reveal only their own viewport-fixed scene images, matching the supplied reference video's scroll grammar.

**Architecture:** Keep the existing validated `market` content boundary, add one explicit outro field, and replace the old sticky-switcher DOM with an intro, three independent scene articles, and an outro. CSS alone provides desktop/tablet fixed-image clipping; mobile, Reduced Motion, unsupported CSS, and no-JavaScript paths render the same content as a normal vertical stack.

**Tech Stack:** Next.js 16 App Router, React, TypeScript, CSS Modules, Zod, Vitest, Testing Library, Playwright.

---

## File map

- Modify `src/content/schema.ts`: extend the validated fifth-screen content contract with its closing bridge.
- Modify `src/content/demo/vithelo-b2b-home.ts`: provide the approved non-claim bridge and align the three scene labels/order with the design spec.
- Modify `src/components/patterns/vithelo-market-stage.tsx`: replace the sticky-switcher markup with the reference scene stack.
- Modify `src/components/patterns/vithelo-b2b-home.module.css`: remove the old card/switcher rules for screen five and define the reference clipping geometry plus fallbacks.
- Modify `tests/unit/vithelo-b2b-home-content.test.ts`: lock the fifth-screen content sequence and bridge at the schema boundary.
- Modify `tests/unit/vithelo-market-stage.test.tsx`: lock the new semantic DOM and removal of the old scroll track.
- Modify `tests/unit/vithelo-b2b-home.test.tsx`: lock the homepage integration layout name.
- Modify `tests/e2e/vithelo-home-layered-scroll.spec.ts`: measure fixed-image/moving-window behavior, near-full-width geometry, layer intersection, and fallback behavior.
- Modify `tests/e2e/accessibility.spec.ts`: update the fifth-screen layout contract without touching unrelated product-page assertions.
- Read only `tests/unit/vithelo-home-geometry-contract.test.ts`: confirm all non-fifth-screen geometry remains locked; do not change its hash.

### Task 1: Lock the fifth-screen content contract

**Files:**
- Modify: `tests/unit/vithelo-b2b-home-content.test.ts:108-123`
- Modify: `src/content/schema.ts:280-291`
- Modify: `src/content/demo/vithelo-b2b-home.ts:114-157`

- [ ] **Step 1: Write the failing content-contract test**

Replace the market assertions in `defines three routine-led directions and eight equal format options` with:

```ts
expect(parsed.market.title).toBe(
  "Begin with the routine, not the ingredient list.",
);
expect(parsed.market.stories.map((story) => story.title)).toEqual([
  "Evening Routines",
  "Everyday Wellness",
  "Active Days",
]);
expect(parsed.market.outro).toBe("From routine to format.");
expect(new Set(parsed.market.stories.map((story) => story.media.src)).size).toBe(3);
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts
```

Expected: FAIL because `market.outro` is absent and the second and third story titles still use the old labels.

- [ ] **Step 3: Extend the Zod contract minimally**

Change the `market` object in `src/content/schema.ts` to:

```ts
market: z.object({
  kicker: z.literal("05 · PRODUCT DIRECTION"),
  title: z.literal("Begin with the routine, not the ingredient list."),
  intro: z.string().min(1),
  stories: z
    .array(
      B2BLabelCopySchema.extend({
        media: B2BRequiredMediaSchema,
      }),
    )
    .length(3),
  outro: z.literal("From routine to format."),
}),
```

- [ ] **Step 4: Update only the approved fifth-screen demo content**

Keep story one unchanged. Reorder the existing second and third story meanings and media so `market` ends with:

```ts
stories: [
  {
    title: "Evening Routines",
    copy: "Define the moment, frequency and desired product experience before deciding how the concept should be delivered.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/nutrition-ritual.png",
      label: "Hand reaching for a glass of water in a quiet daily routine",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
  },
  {
    title: "Everyday Wellness",
    copy: "Start with a clearly defined audience and use context, then turn that understanding into a focused development brief.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/vithelo-womens-gummy-hero-desktop.png",
      label: "Woman beside a VITHELO gummy concept in a bright daily setting",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
  },
  {
    title: "Active Days",
    copy: "Consider where the product is carried, prepared and used before shaping portability and presentation.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/home-membrane.png",
      label: "Abstract flowing material suggesting an active product direction",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
  },
],
outro: "From routine to format.",
```

- [ ] **Step 5: Verify GREEN and commit**

Run the same focused unit test. Expected: PASS.

```powershell
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts tests/unit/vithelo-b2b-home-content.test.ts
git commit -m "feat: define reference scene narrative"
```

### Task 2: Replace the old switcher DOM with independent scene windows

**Files:**
- Modify: `tests/unit/vithelo-market-stage.test.tsx`
- Modify: `tests/unit/vithelo-b2b-home.test.tsx:83-96`
- Modify: `src/components/patterns/vithelo-market-stage.tsx`

- [ ] **Step 1: Write the failing component tests**

Replace `tests/unit/vithelo-market-stage.test.tsx` with:

```tsx
import { render, screen, within } from "@testing-library/react";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

it("renders the reference scene stack without switcher controls", () => {
  render(<VitheloMarketStage market={vitheloB2BHome.market} />);

  const stage = screen.getByTestId("market-stage");
  const scenes = screen.getAllByTestId("market-scene");
  const images = screen.getAllByTestId("market-scene-image");

  expect(stage).toHaveAttribute("data-layout", "reference-scene-stack");
  expect(stage).toHaveAttribute("data-motion-intent", "RELATE");
  expect(screen.getByTestId("market-intro")).toBeInTheDocument();
  expect(screen.getByTestId("market-outro")).toHaveTextContent("From routine to format.");
  expect(scenes).toHaveLength(3);
  expect(images).toHaveLength(3);
  for (const image of images) {
    expect(image.querySelector("img")).toHaveAttribute("loading", "eager");
  }
  for (const scene of scenes) {
    expect(within(scene).getByRole("heading", { level: 3 })).toBeVisible();
  }
  expect(screen.queryByTestId("market-step")).not.toBeInTheDocument();
  expect(within(stage).queryByRole("button")).not.toBeInTheDocument();
  expect(stage).not.toHaveTextContent(/\d{2} \/ \d{2}/);
});
```

Update the homepage integration expectation to:

```ts
expect(directions).toHaveAttribute("data-layout", "reference-scene-stack");
expect(within(directions!).getAllByTestId("market-scene")).toHaveLength(3);
expect(within(directions!).getAllByTestId("market-scene-image")).toHaveLength(3);
expect(within(directions!).queryByTestId("market-step")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run both tests and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home.test.tsx
```

Expected: FAIL because the component still exposes `moving-mask-fixed-images`, `market-story`, and `market-step`.

- [ ] **Step 3: Replace `VitheloMarketStage` with the new semantic structure**

Use this complete component body and remove the unused `CSSProperties` import:

```tsx
function VitheloMarketStage({ market }: VitheloMarketStageProps) {
  return (
    <section
      aria-labelledby="solutions-title"
      className={`${styles.section} ${styles.marketStage}`}
      data-layout="reference-scene-stack"
      data-motion-fallback="stacked"
      data-motion-intent="RELATE"
      data-narrative-role="routine-to-brief"
      data-testid="market-stage"
      id="solutions"
    >
      <header className={styles.marketIntro} data-testid="market-intro">
        <p className={styles.kicker}>{market.kicker}</p>
        <h2 className={styles.title} id="solutions-title">{market.title}</h2>
        <p className={styles.marketIntroCopy}>{market.intro}</p>
      </header>

      <div className={styles.marketSceneStack}>
        {market.stories.map((story, index) => (
          <article
            className={styles.marketScene}
            data-media-status={story.media.status}
            data-scene={index + 1}
            data-testid="market-scene"
            key={story.title}
          >
            <div
              aria-label={`${story.media.label}; ${story.media.width} by ${story.media.height} ${story.media.format}`}
              className={styles.marketSceneVisual}
              data-testid="market-scene-image"
              role="img"
            >
              <Image
                alt=""
                aria-hidden="true"
                className={styles.marketSceneImage}
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 96vw"
                src={story.media.src ?? "/media/b2b/gummies-pexels-14027295.jpg"}
              />
              <span aria-hidden="true" className={styles.marketSceneShade} />
            </div>

            <div className={styles.marketSceneCopy}>
              <span className={styles.marketSceneIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.marketOutro} data-testid="market-outro">
        <p>{market.outro}</p>
      </footer>
    </section>
  );
}
```

- [ ] **Step 4: Verify GREEN and commit**

Run the focused unit command again. Expected: PASS.

```powershell
git add -- src/components/patterns/vithelo-market-stage.tsx tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home.test.tsx
git commit -m "feat: rebuild product direction scene stack"
```

### Task 3: Implement the desktop/tablet reference clipping geometry

**Files:**
- Modify: `tests/e2e/vithelo-home-layered-scroll.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts:107-118`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:711-903,944-1014`

- [ ] **Step 1: Replace the old motion E2E with the stricter reference test**

Use the following assertions for widths above 760px:

```ts
test("scene windows move over their own fixed near-full-width images", async ({ page, viewport }) => {
  if (!viewport || viewport.width <= 760) test.skip();
  await page.goto("/");

  const result = await page.locator("#solutions").evaluate((section) => {
    const scenes = Array.from(section.querySelectorAll<HTMLElement>("[data-scene]"));
    const first = scenes[0];
    const second = scenes[1];
    if (!first || !second) throw new Error("Reference scenes are missing");
    const firstImage = first.querySelector<HTMLElement>("[data-testid='market-scene-image']");
    if (!firstImage) throw new Error("Reference scene image is missing");

    const firstTop = first.getBoundingClientRect().top + scrollY;
    scrollTo({ top: firstTop + 120, behavior: "instant" });
    const beforeScene = first.getBoundingClientRect().top;
    const beforeImage = firstImage.getBoundingClientRect().top;
    scrollBy({ top: 180, behavior: "instant" });

    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();
    return {
      layout: section.getAttribute("data-layout"),
      sceneWidthRatio: firstRect.width / innerWidth,
      radius: Number.parseFloat(getComputedStyle(first).borderTopLeftRadius),
      clip: getComputedStyle(first).clipPath,
      imagePosition: getComputedStyle(firstImage).position,
      sceneTravel: Math.round(beforeScene - firstRect.top),
      imageTravel: Math.round(beforeImage - firstImage.getBoundingClientRect().top),
      gap: Math.round(secondRect.top - firstRect.bottom),
      uniqueImages: new Set(
        scenes.map((scene) => scene.querySelector<HTMLImageElement>("img")?.currentSrc),
      ).size,
    };
  });

  expect(result.layout).toBe("reference-scene-stack");
  expect(result.sceneWidthRatio).toBeGreaterThanOrEqual(0.93);
  expect(result.radius).toBeGreaterThanOrEqual(viewport.width <= 1100 ? 24 : 32);
  expect(result.clip).not.toBe("none");
  expect(result.imagePosition).toBe("fixed");
  expect(result.sceneTravel).toBeGreaterThanOrEqual(179);
  expect(Math.abs(result.imageTravel)).toBeLessThanOrEqual(1);
  expect(result.gap).toBeLessThanOrEqual(0);
  expect(result.uniqueImages).toBe(3);
});
```

Update the accessibility layout assertion to expect `reference-scene-stack`.

- [ ] **Step 2: Run the desktop project and verify RED**

```powershell
$env:E2E_EXTERNAL_SERVER='1'
& '.\node_modules\.bin\playwright.CMD' test tests/e2e/vithelo-home-layered-scroll.spec.ts --project=desktop-1440
```

Expected: FAIL because the new component has no production CSS for near-full-width clipped scenes.

- [ ] **Step 3: Remove the obsolete fifth-screen switcher/card rules**

Delete selectors used only by the removed DOM: `.marketStickyStage`, `.marketStories`, `.marketStory`, `.marketStoryVisual`, `.marketStoryImage`, `.marketStoryShade`, `.marketStoryTitle`, `.marketStoryMark`, `.marketStoryCaption`, `.marketStoryIndex`, `.marketScrollTrack`, and `.marketStep`, including their hover and animation-timeline variants. Do not alter selectors for any other screen.

- [ ] **Step 4: Add the base reference-scene styles**

Insert this fifth-screen block in the former market-style location. Keep geometry declarations on selector lines where needed so the existing non-target geometry hash remains unchanged.

```css
.marketStage { min-height: auto; padding-block: 0; padding-inline: 0;
  position: relative;
  z-index: 5;
  margin-top: calc(var(--home-overlap-05) * -1);
  overflow: visible;
  background: var(--paper);
  color: var(--ink);
}

.marketIntro { min-height: 92svh; padding: clamp(6rem, 11vw, 10rem) max(var(--home-frame-gutter), calc((100vw - var(--home-frame-width)) / 2));
  display: grid;
  align-content: center;
  grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr);
  gap: clamp(2rem, 8vw, 8rem);
}

.marketIntro .kicker { grid-column: 1 / -1; margin: 0; }
.marketIntro .title { max-width: 12ch; margin: 0; font-size: clamp(3.75rem, 7vw, 7.5rem); line-height: 0.92; }
.marketIntroCopy { max-width: 39ch; margin: auto 0 0; color: var(--muted); line-height: 1.6; }
.marketSceneStack { position: relative; }

.marketScene { min-height: 100svh; padding: 0;
  position: relative;
  width: calc(100% - (2 * var(--home-frame-gutter)));
  margin-inline: var(--home-frame-gutter);
  margin-top: calc(var(--home-layer-radius) * -0.55);
  overflow: clip;
  border-radius: var(--home-layer-radius);
  clip-path: inset(0 round var(--home-layer-radius));
  isolation: isolate;
}

.marketScene:first-child { margin-top: 0; }
.marketSceneVisual { height: auto;
  position: fixed;
  inset: 0 var(--home-frame-gutter);
  overflow: hidden;
  border-radius: var(--home-layer-radius);
  background: #d8d2c8;
}
.marketSceneImage { object-fit: cover; object-position: center; }
.marketScene[data-scene="1"] .marketSceneImage { object-position: 68% center; }
.marketScene[data-scene="2"] .marketSceneImage { object-position: 62% center; }
.marketScene[data-scene="3"] .marketSceneImage { object-position: 58% center; }
.marketSceneShade { position: absolute; inset: 0; background: linear-gradient(90deg, rgb(10 12 11 / 58%), rgb(10 12 11 / 10%) 64%); }

.marketSceneCopy {
  position: absolute;
  left: clamp(1.5rem, 4vw, 4.5rem);
  bottom: clamp(1.75rem, 5vw, 5rem);
  z-index: 2;
  width: min(620px, 58vw);
  color: #fffaf0;
}
.marketSceneIndex { display: block; margin-bottom: 1rem; font-size: 0.68rem; letter-spacing: 0.18em; }
.marketSceneCopy h3 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(2.75rem, 5.6vw, 6rem); font-weight: 400; letter-spacing: -0.05em; line-height: 0.94; }
.marketSceneCopy p { max-width: 52ch; margin: 1.25rem 0 0; color: rgb(255 250 240 / 82%); line-height: 1.55; }

.marketOutro { min-height: 62svh; padding: clamp(5rem, 10vw, 9rem) max(var(--home-frame-gutter), calc((100vw - var(--home-frame-width)) / 2));
  display: grid;
  place-items: center;
  text-align: center;
}
.marketOutro p { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: clamp(3rem, 6vw, 6.5rem); letter-spacing: -0.05em; line-height: 0.95; }
```

- [ ] **Step 5: Verify GREEN on desktop and tablet, then commit**

```powershell
$env:E2E_EXTERNAL_SERVER='1'
& '.\node_modules\.bin\playwright.CMD' test tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/accessibility.spec.ts --project=desktop-1440 --project=desktop-1280 --project=tablet-1024 --project=tablet-768
```

Expected: the reference scene tests and accessibility layout check pass at all four enhanced-motion viewports.

Stage only the fifth-screen hunk from `tests/e2e/accessibility.spec.ts` because that file contains unrelated user product-page work.

```powershell
git add -- src/components/patterns/vithelo-b2b-home.module.css tests/e2e/vithelo-home-layered-scroll.spec.ts
git add -p -- tests/e2e/accessibility.spec.ts
git commit -m "feat: match reference fixed-image scene scroll"
```

### Task 4: Add mobile, Reduced Motion, unsupported-CSS, and no-JavaScript fallbacks

**Files:**
- Modify: `tests/e2e/vithelo-home-layered-scroll.spec.ts`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css:1740-1900,1930-2005`

- [ ] **Step 1: Add failing fallback assertions**

For mobile, assert all three images and headings are visible and the image layer is `position: absolute` inside its naturally scrolling scene. For Reduced Motion at every configured viewport, assert the same non-fixed behavior. Keep the existing no-JavaScript home-panel test and add:

```ts
await expect(page.getByTestId("market-scene")).toHaveCount(3);
await expect(page.getByTestId("market-scene-image").first()).toHaveCSS("position", "absolute");
await expect(page.getByTestId("market-outro")).toContainText("From routine to format.");
```

- [ ] **Step 2: Run mobile and Reduced Motion paths and verify RED**

```powershell
$env:E2E_EXTERNAL_SERVER='1'
& '.\node_modules\.bin\playwright.CMD' test tests/e2e/vithelo-home-layered-scroll.spec.ts --project=mobile-390 --project=mobile-375
```

Expected: FAIL because the desktop fixed positioning still applies to the new scene visuals.

- [ ] **Step 3: Add explicit fallback CSS**

Place this in the existing `max-width: 760px` block:

```css
.marketIntro { min-height: auto; padding: clamp(5rem, 18vw, 7rem) 1.375rem; display: block; }
.marketIntro .title { max-width: 12ch; margin-top: 1.25rem; font-size: clamp(3rem, 14vw, 4.5rem); }
.marketIntroCopy { margin-top: 1.5rem; }
.marketScene { min-height: 82svh; width: calc(100% - 2rem); margin-inline: 1rem; }
.marketSceneVisual { position: absolute; inset: 0; border-radius: inherit; }
.marketSceneCopy { left: 1.25rem; right: 1.25rem; bottom: 1.5rem; width: auto; }
.marketSceneCopy h3 { font-size: clamp(2.5rem, 12vw, 4rem); }
.marketOutro { min-height: 52svh; padding: 5rem 1.375rem; }
```

Place the same static positioning rule in both the existing Reduced Motion block and an `@supports not (clip-path: inset(0 round 1px))` fallback:

```css
.marketSceneVisual { position: absolute; inset: 0; }
.marketScene { clip-path: none; }
```

The images stay inside their scene articles and all content remains readable without animation support.

- [ ] **Step 4: Run all six viewport variants and verify GREEN**

```powershell
$env:E2E_EXTERNAL_SERVER='1'
& '.\node_modules\.bin\playwright.CMD' test tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/accessibility.spec.ts
```

Expected: all applicable checks pass; only tests explicitly limited to widths above 760px are skipped on the two mobile projects.

- [ ] **Step 5: Commit the fallbacks**

```powershell
git add -- src/components/patterns/vithelo-b2b-home.module.css tests/e2e/vithelo-home-layered-scroll.spec.ts
git commit -m "fix: preserve static reference scenes in fallbacks"
```

### Task 5: Regression checks and visual handoff

**Files:**
- Verify: all task files above
- Do not modify: `next-env.d.ts`
- Do not update acceptance status until the user visually approves the screen

- [ ] **Step 1: Run the focused unit suite**

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-geometry-contract.test.ts
```

Expected: PASS, including the unchanged homepage geometry hash.

- [ ] **Step 2: Run type, lint, formatting, and production checks**

```powershell
pnpm.cmd typecheck
& '.\node_modules\.bin\eslint.CMD' src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-market-stage.tsx tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home.test.tsx tests/e2e/vithelo-home-layered-scroll.spec.ts tests/e2e/accessibility.spec.ts
git diff --check
pnpm.cmd build
```

Expected: all commands exit with code 0. Note the repository's existing Node 24 versus required deployment Node 20 warning without describing it as Hostinger proof.

- [ ] **Step 3: Perform browser visual QA at three scroll positions**

At desktop 1440×1000, capture and inspect:

1. white intro transitioning into scene one;
2. scene one leaving while scene two enters, with two different matching images visible only inside their own rounded windows;
3. scene three transitioning into the white outro and then screen six.

Reject the implementation if it shows a centered card, broad white gaps between scenes, a picture outside its window, more than one picture inside one window, clipped copy, horizontal overflow, or any change to the Hero artwork.

- [ ] **Step 4: Leave the browser at the scene-one/scene-two overlap**

Mark that preview as deliverable so the user opens directly on the defining interaction instead of at the page top.

- [ ] **Step 5: Commit only task-owned final adjustments**

```powershell
git status --short
git add -- src/content/schema.ts src/content/demo/vithelo-b2b-home.ts src/components/patterns/vithelo-market-stage.tsx src/components/patterns/vithelo-b2b-home.module.css tests/unit/vithelo-b2b-home-content.test.ts tests/unit/vithelo-market-stage.test.tsx tests/unit/vithelo-b2b-home.test.tsx tests/e2e/vithelo-home-layered-scroll.spec.ts
git commit -m "test: verify reference scroll screen"
```

If no final task-owned adjustments remain, skip this empty commit. Do not stage unrelated dirty-worktree files.
