import { expect, test } from "@playwright/test";

const targetSections = [
  "capacity-boundary",
  "gummy-stage",
  "dosage-forms",
  "project-runway",
  "brand-statement",
] as const;

test("selected Home copy starts exactly 190px from each desktop viewport edge", async ({ page }) => {
  for (const width of [1280, 1920, 2560]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");

    const positions = await page.evaluate((ids) =>
      ids.map((id) => {
        const section = document.getElementById(id);
        const heading = section?.querySelector("h2");
        if (!section || !heading) throw new Error(`Missing Home heading: ${id}`);
        const rect = section.getBoundingClientRect();
        const style = getComputedStyle(section);
        return {
          id,
          paddingLeft: Number.parseFloat(style.paddingLeft),
          paddingRight: Number.parseFloat(style.paddingRight),
          headingLeft: heading.getBoundingClientRect().left - rect.left,
          supportingLeft:
            id === "project-runway"
              ? section.querySelector<HTMLElement>("[class*='runwayCopy']")?.getBoundingClientRect().left
              : id === "brand-statement"
                ? section.querySelector("p")?.getBoundingClientRect().left
                : undefined,
          actionLeft:
            id === "project-runway"
              ? section.querySelector<HTMLElement>("[class*='runwayAction']")?.getBoundingClientRect().left
              : undefined,
        };
      }),
      targetSections,
    );

    for (const position of positions) {
      expect(position.paddingLeft, `${width}px ${position.id} left gutter`).toBe(190);
      expect(position.paddingRight, `${width}px ${position.id} right gutter`).toBe(190);
      expect(position.headingLeft, `${width}px ${position.id} heading`).toBe(190);
      if (position.supportingLeft !== undefined) {
        expect(position.supportingLeft, `${width}px ${position.id} supporting copy`).toBe(190);
      }
      if (position.actionLeft !== undefined) {
        expect(position.actionLeft, `${width}px ${position.id} action`).toBe(190);
      }
    }
  }
});

test("tablet and mobile keep their existing compact gutters", async ({ page }) => {
  for (const [width, expectedGutter] of [[1024, 48], [768, 48], [390, 22]]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");

    const paddings = await page.evaluate((ids) =>
      ids.map((id) => {
        const section = document.getElementById(id);
        if (!section) throw new Error(`Missing Home section: ${id}`);
        const style = getComputedStyle(section);
        return [Number.parseFloat(style.paddingLeft), Number.parseFloat(style.paddingRight)];
      }),
      targetSections,
    );

    for (const padding of paddings) expect(padding).toEqual([expectedGutter, expectedGutter]);
  }
});
