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
  if (width <= 760) return { radius: 20, overlaps: [20, 16, 14, 12, 12, 16, 16, 16] };
  if (width <= 1100) return { radius: 32, overlaps: [32, 24, 22, 20, 20, 24, 24, 24] };
  return { radius: 40, overlaps: [40, 32, 28, 24, 24, 32, 32, 32] };
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
  expect(actual.radii).toEqual(Array(8).fill(expected.radius));
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
  expect(panels.radii).toEqual(Array(8).fill(expected.radius));
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
