import { expect, test, type Page } from "@playwright/test";

const panelIds = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "brand-statement",
  "contact",
] as const;

function expectedFor(width: number) {
  if (width <= 760) return { radii: [32, 20, 20, 20, 20, 20, 20, 20], overlaps: [20, 16, 14, 34, 12, 16, 16, 16] };
  if (width <= 1100) return { radii: [48, 32, 32, 32, 32, 32, 32, 32], overlaps: [32, 24, 22, 54, 20, 24, 24, 24] };
  return { radii: [64, 40, 40, 40, 40, 40, 40, 40], overlaps: [40, 32, 28, 68, 24, 32, 32, 32] };
}

async function readPanels(page: Page) {
  return page.locator("main[data-vithelo-home]").evaluate((main, ids) => {
    const panels = ids.map((id) => main.querySelector<HTMLElement>(`#${id}`));
    if (panels.some((panel) => !panel)) throw new Error("A homepage panel is missing");
    const elements = panels as HTMLElement[];
    return {
      radii: elements.slice(1).map((panel) =>
        Math.round(Number.parseFloat(getComputedStyle(panel).borderTopLeftRadius)),
      ),
      positions: elements.map((panel) => getComputedStyle(panel).position),
      margins: elements.slice(1).map((panel) =>
        Math.round(Number.parseFloat(getComputedStyle(panel).marginTop)),
      ),
      zIndices: elements.map((panel) => getComputedStyle(panel).zIndex),
      heroTransform: getComputedStyle(elements[0], "::before").transform,
    };
  }, panelIds);
}

test("homepage keeps rounded responsive panel overlaps without pinning whole screens", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");
  const actual = await readPanels(page);
  const expected = expectedFor(viewport.width);
  expect(actual.radii).toEqual(expected.radii);
  expect(actual.margins).toEqual(expected.overlaps.map((value) => -value));
  expect(actual.positions).toEqual(Array(9).fill("relative"));
  expect(actual.zIndices).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  expect(actual.heroTransform).toBe("none");
});

test("reduced motion preserves static overlap and all content", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");
  const panels = await readPanels(page);
  const expected = expectedFor(viewport.width);
  expect(panels.positions).toEqual(Array(9).fill("relative"));
  expect(panels.radii).toEqual(expected.radii);
  expect(panels.margins).toEqual(expected.overlaps.map((value) => -value));
  await expect(page.getByTestId("market-scene")).toHaveCount(3);
  await expect(page.getByTestId("market-intro")).toHaveCount(0);
  await expect(page.locator("#contact").getByRole("link", { name: /^Email/ })).toBeVisible();
});

test("product direction scenes keep full-width image layers", async ({ page, viewport }) => {
  if (!viewport || viewport.width <= 760) test.skip();
  await page.goto("/");

  const inset = await page.getByTestId("market-scene-image").first().evaluate((element) => {
    const style = getComputedStyle(element);
    return { left: style.left, right: style.right };
  });

  expect(inset).toEqual({ left: "0px", right: "0px" });
});

test("product direction scenes use a 600px desktop and tablet window height", async ({
  page,
  viewport,
}) => {
  if (!viewport || viewport.width <= 760) test.skip();
  await page.goto("/");

  const heights = await page.getByTestId("market-scene").evaluateAll((scenes) =>
    scenes.map((scene) => Math.round(scene.getBoundingClientRect().height)),
  );

  expect(heights).toEqual([600, 600, 600]);
});

test("product direction uses relative Nordicus-style panels over viewport-fixed backgrounds", async ({
  page,
  viewport,
}) => {
  if (!viewport || viewport.width <= 760) test.skip();
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "enhanced");

  const geometry = await page.getByTestId("market-scene").evaluateAll((scenes) =>
    scenes.map((scene) => {
      const visual = scene.querySelector<HTMLElement>("[data-testid='market-scene-image']");
      if (!visual) throw new Error("Market scene image is missing");
      const style = getComputedStyle(scene);
      return {
        backgroundAttachment: style.backgroundAttachment,
        backgroundImage: style.backgroundImage,
        height: Math.round(scene.getBoundingClientRect().height),
        scenePosition: style.position,
        visualOpacity: getComputedStyle(visual).opacity,
        visualPosition: getComputedStyle(visual).position,
      };
    }),
  );

  const movement = await page.getByTestId("market-scene").first().evaluate((scene) => {
    const visual = scene.querySelector<HTMLElement>("[data-testid='market-scene-image']");
    if (!visual) throw new Error("Market scene image is missing");
    window.scrollTo({ top: scene.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    const before = {
      sceneTop: scene.getBoundingClientRect().top,
      visualTop: visual.getBoundingClientRect().top,
    };
    window.scrollBy({ top: 160, behavior: "instant" });
    return {
      sceneDelta: Math.round(scene.getBoundingClientRect().top - before.sceneTop),
      visualDelta: Math.round(visual.getBoundingClientRect().top - before.visualTop),
    };
  });

  expect(geometry).toEqual(
    Array(3).fill({
      backgroundAttachment: "fixed",
      backgroundImage: expect.not.stringMatching(/^none$/),
      height: 600,
      scenePosition: "relative",
      visualOpacity: "0",
      visualPosition: "absolute",
    }),
  );
  expect(movement.sceneDelta).toBe(-160);
  expect(movement.visualDelta).toBe(-160);
});

test("product direction overlaps expose only the preceding image behind rounded corners", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  if (viewport.width <= 760) test.skip();
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "enhanced");

  const geometry = await page.locator("#solutions").evaluate((stage) => {
    const scenes = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-testid='market-scene']"),
    );
    const previousSection = stage.previousElementSibling as HTMLElement | null;
    if (scenes.length !== 3 || !previousSection) throw new Error("Market stack is incomplete");
    const rects = scenes.map((scene) => scene.getBoundingClientRect());
    const previousRect = previousSection.getBoundingClientRect();
    return {
      backings: stage.querySelectorAll("[data-testid='market-scene-backing']").length,
      borderRadii: scenes.map((scene) => getComputedStyle(scene).borderRadius),
      firstOverlap: Math.round(previousRect.bottom - rects[0].top),
      internalOverlaps: [
        Math.round(rects[0].bottom - rects[1].top),
        Math.round(rects[1].bottom - rects[2].top),
      ],
      stageBackground: getComputedStyle(stage).backgroundColor,
    };
  });

  const radius = viewport.width <= 1100 ? 32 : 40;
  const overlap = Math.round(radius * 1.7);
  expect(geometry).toEqual({
    backings: 0,
    borderRadii: Array(3).fill(`${radius}px ${radius}px 0px 0px`),
    firstOverlap: overlap,
    internalOverlaps: [overlap, overlap],
    stageBackground: "rgba(0, 0, 0, 0)",
  });
});

test("CSS overlap survives without JavaScript", async ({ browser, baseURL, viewport }) => {
  if (!baseURL || !viewport) throw new Error("baseURL and viewport required");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  const panels = await readPanels(page);
  const expected = expectedFor(viewport.width);
  expect(panels.margins).toEqual(expected.overlaps.map((value) => -value));
  expect(panels.positions).toEqual(Array(9).fill("relative"));
  await expect(page.getByTestId("market-scene")).toHaveCount(3);
  await expect(page.getByTestId("market-intro")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /^Email/ })).toBeVisible();
  await context.close();
});

test("product direction copy has no numbers and respects responsive line rules", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");

  const stage = page.locator("#solutions");
  await expect(stage.getByText(/^(01|02|03)$/)).toHaveCount(0);

  const layout = await page.getByTestId("market-scene").evaluateAll((scenes) =>
    scenes.map((scene) => {
      const heading = scene.querySelector<HTMLElement>("h3");
      const copy = scene.querySelector<HTMLElement>("p");
      if (!heading || !copy) throw new Error("Market scene copy is missing");
      return {
        headingWhiteSpace: getComputedStyle(heading).whiteSpace,
        copyWhiteSpace: getComputedStyle(copy).whiteSpace,
        headingFits: heading.scrollWidth <= heading.clientWidth + 1,
        copyFits: copy.scrollWidth <= copy.clientWidth + 1,
        sceneFits: scene.scrollWidth <= scene.clientWidth + 1,
      };
    }),
  );

  if (viewport.width <= 760) {
    expect(layout.every((item) => item.headingWhiteSpace === "normal")).toBe(true);
    expect(layout.every((item) => item.copyWhiteSpace === "normal")).toBe(true);
    expect(layout.every((item) => item.sceneFits)).toBe(true);
    return;
  }

  expect(layout.every((item) => item.headingWhiteSpace === "nowrap")).toBe(true);
  expect(layout.every((item) => item.copyWhiteSpace === "nowrap")).toBe(true);
  expect(layout.every((item) => item.headingFits && item.copyFits && item.sceneFits)).toBe(true);
});
