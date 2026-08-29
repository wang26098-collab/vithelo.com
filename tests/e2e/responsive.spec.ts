import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/insights/choose-the-right-supplement-format",
  "/insights/prepare-for-an-oem-odm-project",
  "/insights/gummy-development-guide",
  "/contact",
] as const;

test("B2B hero keeps its decision content inside the hero stage", async ({
  page,
  viewport,
}) => {
  await page.goto("/");

  const hero = page.locator("#hero");
  const title = hero.getByRole("heading", {
    name: "Your nutrition product, from first brief to finished batch.",
  });
  const action = hero.getByRole("link", { name: "Start a Project" });

  await expect(title).toBeVisible();
  await expect(action).toBeVisible();
  await expect
    .poll(() => hero.evaluate((element) => getComputedStyle(element).backgroundImage))
    .not.toBe("none");

  const [heroBox, actionBox] = await Promise.all([hero.boundingBox(), action.boundingBox()]);
  expect(heroBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  if (heroBox && actionBox) {
    expect(actionBox.y + actionBox.height).toBeLessThanOrEqual(heroBox.y + heroBox.height + 1);
  }

  if (viewport && viewport.width >= 1024) {
    const copyBox = await hero.getByTestId("hero-copy").boundingBox();
    expect(copyBox).not.toBeNull();
    if (copyBox) expect(copyBox.width).toBeLessThanOrEqual(viewport.width - 64);
  }
});

test("desktop navigation and hero fit inside a short viewport", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width < 1024, "Desktop hero height check");

  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/");

  const header = page.locator("header").first();
  const hero = page.locator("#hero");
  await expect(header).toBeVisible();
  await expect(hero).toBeVisible();
  const [headerBox, heroBox] = await Promise.all([header.boundingBox(), hero.boundingBox()]);

  expect(headerBox).not.toBeNull();
  expect(heroBox).not.toBeNull();
  if (headerBox && heroBox) {
    expect(heroBox.y).toBeCloseTo(headerBox.y + headerBox.height, 0);
    expect(heroBox.y + heroBox.height).toBeLessThanOrEqual(721);
  }
});

test("homepage headings use the approved editorial scale", async ({ page, viewport }) => {
  await page.goto("/");

  const heroSize = await page.locator("#hero h1").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  const sectionSize = await page.locator("#gummy-stage h2").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );

  expect(heroSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 44 : 48);
  expect(sectionSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 36 : 48);

  const supportingSizes = await page.locator("main h3").evaluateAll((elements) =>
    elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
  );
  const paragraphSizes = await page.locator("main p").evaluateAll((elements) =>
    elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
  );

  expect(Math.max(...supportingSizes)).toBeLessThanOrEqual(
    viewport && viewport.width <= 760 ? 30 : 40,
  );
  expect(Math.max(...paragraphSizes)).toBeLessThanOrEqual(
    viewport && viewport.width <= 760 ? 16 : 18,
  );
});

test("content-heavy homepage sections stay within the approved desktop height range", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width < 1024, "Desktop section height check");

  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/");

  const limits = {
    "#gummy-stage": 1050,
    "#solutions": 800,
    "#custom-development": 820,
    "#manufacturing": 1050,
    "#quality": 800,
    "#project-runway": 800,
    "#company-fit": 900,
    "#contact": 800,
  } as const;

  for (const [selector, maximumHeight] of Object.entries(limits)) {
    const height = await page.locator(selector).evaluate((element) =>
      Math.round(element.getBoundingClientRect().height),
    );
    expect(height, `${selector} is ${height}px tall`).toBeLessThanOrEqual(maximumHeight);
  }
});

test("dosage spectrum uses four desktop columns and two mobile columns without overflow", async ({ page, viewport }) => {
  await page.goto("/");

  const grid = page.getByTestId("dosage-grid");
  await grid.scrollIntoViewIfNeeded();
  const layout = await grid.evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns
      .split(" ")
      .filter(Boolean).length;
    return { columns, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth };
  });

  expect(layout.columns).toBe(viewport && viewport.width <= 760 ? 2 : 4);
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
});

test("core routes do not overflow the viewport", async ({ page }, testInfo) => {
  test.setTimeout(60_000);

  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(
      dimensions.scrollWidth,
      `${route} overflowed by ${dimensions.scrollWidth - dimensions.clientWidth}px`,
    ).toBeLessThanOrEqual(dimensions.clientWidth + 1);

    const bodyWidth = await page.locator("body").evaluate((body) => ({
      clientWidth: body.clientWidth,
      scrollWidth: body.scrollWidth,
    }));
    expect(bodyWidth.scrollWidth, `${route} body overflowed`).toBe(bodyWidth.clientWidth);
  }

  await page.goto("/");
  await page.waitForTimeout(1_000);
  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath("home-final.png"),
  });

  for (const [name, route] of [
    ["contact", "/contact"],
    ["products", "/products"],
    ["oem-odm", "/oem-odm"],
    ["insights", "/insights"],
  ] as const) {
    await page.goto(route);
    await page.waitForTimeout(1_000);
    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath(`${name}-final.png`),
    });
  }

  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.dataset.theme = "dark";
  });
  await page.waitForTimeout(1_000);
  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath("home-dark-final.png"),
  });
});

test("mobile market stories remain sequential and never capture document layout", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width > 760, "Mobile market-stage check");

  await page.goto("/");

  const stories = page.getByTestId("market-story");
  await expect(stories).toHaveCount(6);
  for (let index = 0; index < 6; index += 1) {
    await expect(stories.nth(index)).toBeVisible();
  }

  const positions = await stories.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().top + window.scrollY),
  );
  expect(positions).toEqual([...positions].sort((a, b) => a - b));
});
