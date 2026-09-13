import { expect, test, type Page } from "@playwright/test";

const panelIds = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "contact",
] as const;

function expectedPositions(width: number) {
  if (width <= 760) return Array(8).fill("relative");
  return ["sticky", "sticky", "sticky", "sticky", "relative", "relative", "sticky", "relative"];
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

test("homepage uses straight full-width layers and only pins short narrative screens", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");
  const actual = await readPanels(page);
  expect(actual.radii).toEqual(Array(7).fill(0));
  expect(actual.margins).toEqual(Array(7).fill(0));
  expect(actual.positions).toEqual(expectedPositions(viewport.width));
  expect(actual.zIndices).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  expect(actual.heroTransform).toBe("none");
});

test("the next screen visibly covers the pinned previous screen while scrolling", async ({
  page,
  viewport,
}) => {
  if (!viewport || viewport.width <= 760) test.skip();
  await page.goto("/");
  const transitions = [
    ["hero", "proof"],
    ["proof", "capacity-boundary"],
    ["capacity-boundary", "gummy-stage"],
    ["gummy-stage", "solutions"],
    ["project-runway", "contact"],
  ];

  for (const [previousId, nextId] of transitions) {
    const stack = await page.locator("main[data-vithelo-home]").evaluate(
      (main, ids) => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const previous = main.querySelector<HTMLElement>(`#${ids[0]}`);
        const next = main.querySelector<HTMLElement>(`#${ids[1]}`);
        if (!previous || !next) throw new Error("Stacking panels are missing");
        window.scrollTo({ top: next.offsetTop - window.innerHeight * 0.58, behavior: "instant" });
        const previousRect = previous.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        return {
          previousTop: Math.round(previousRect.top),
          nextTop: Math.round(nextRect.top),
          visibleOverlap: Math.round(previousRect.bottom - nextRect.top),
          viewportHeight: window.innerHeight,
        };
      },
      [previousId, nextId],
    );

    expect(Math.abs(stack.previousTop)).toBeLessThanOrEqual(1);
    expect(stack.nextTop).toBeGreaterThan(stack.viewportHeight * 0.45);
    expect(stack.nextTop).toBeLessThan(stack.viewportHeight * 0.7);
    expect(stack.visibleOverlap).toBeGreaterThan(80);
  }
});

test("reduced motion preserves static overlap and all content", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");
  const panels = await readPanels(page);
  expect(panels.positions).toEqual(Array(8).fill("relative"));
  expect(panels.radii).toEqual(Array(7).fill(0));
  expect(panels.margins).toEqual(Array(7).fill(0));
  await expect(page.locator("#contact").getByRole("link", { name: /^Email/ })).toBeVisible();
});

test("CSS overlap survives without JavaScript", async ({ browser, baseURL, viewport }) => {
  if (!baseURL || !viewport) throw new Error("baseURL and viewport required");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  const panels = await readPanels(page);
  expect(panels.margins).toEqual(Array(7).fill(0));
  expect(panels.positions).toEqual(expectedPositions(viewport.width));
  await expect(page.getByRole("link", { name: /^Email/ })).toBeVisible();
  await context.close();
});
