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

function expectedFor(width: number) {
  if (width <= 760) return { radius: 20, overlaps: [20, 16, 14, 12, 12, 16, 16] };
  if (width <= 1100) return { radius: 32, overlaps: [32, 24, 22, 20, 20, 24, 24] };
  return { radius: 40, overlaps: [40, 32, 28, 24, 24, 32, 32] };
}

async function readPanels(page: Page) {
  return page.locator("main[data-vithelo-home]").evaluate((main, ids) => {
    const panels = ids.map((id) => main.querySelector<HTMLElement>(`#${id}`));
    if (panels.some((panel) => !panel)) throw new Error("A homepage panel is missing");
    const elements = panels as HTMLElement[];
    return {
      overlaps: elements.slice(1).map((panel, index) => {
        const previous = elements[index];
        return Math.round(
          previous.getBoundingClientRect().bottom - panel.getBoundingClientRect().top,
        );
      }),
      radii: elements.slice(1).map((panel) =>
        Math.round(Number.parseFloat(getComputedStyle(panel).borderTopLeftRadius)),
      ),
      positions: elements.slice(1).map((panel) => getComputedStyle(panel).position),
      margins: elements.slice(1).map((panel) =>
        Math.round(Number.parseFloat(getComputedStyle(panel).marginTop)),
      ),
      zIndices: elements.map((panel) => getComputedStyle(panel).zIndex),
      heroTransform: getComputedStyle(elements[0], "::before").transform,
    };
  }, panelIds);
}

test("all seven transitions use responsive native-scroll overlap", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/");
  const actual = await readPanels(page);
  const expected = expectedFor(viewport.width);
  expect(actual.overlaps).toEqual(expected.overlaps);
  expect(actual.radii).toEqual(Array(7).fill(expected.radius));
  expect(actual.positions).toEqual(Array(7).fill("relative"));
  expect(actual.zIndices).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  expect(actual.heroTransform).toBe("none");
});

test("reduced motion preserves static overlap and all content", async ({ page, viewport }) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-vithelo-home]")).toHaveAttribute("data-motion-mode", "static");
  expect((await readPanels(page)).overlaps).toEqual(expectedFor(viewport.width).overlaps);
  await expect(page.locator("#contact").getByRole("link", { name: /^Email/ })).toBeVisible();
});

test("CSS overlap survives without JavaScript", async ({ browser, baseURL, viewport }) => {
  if (!baseURL || !viewport) throw new Error("baseURL and viewport required");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  const expected = expectedFor(viewport.width);
  expect((await readPanels(page)).margins).toEqual(expected.overlaps.map((value) => -value));
  await expect(page.getByRole("link", { name: /^Email/ })).toBeVisible();
  await context.close();
});
