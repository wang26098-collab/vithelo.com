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
    name: "Nutrition formats, built for private-label growth.",
  });
  const action = hero.getByRole("link", { name: "Start a Project" });

  await expect(title).toBeVisible();
  await expect(action).toBeVisible();
  await expect
    .poll(() => hero.evaluate((element) => getComputedStyle(element, "::before").backgroundImage))
    .not.toBe("none");

  const [heroBox, actionBox] = await Promise.all([hero.boundingBox(), action.boundingBox()]);
  expect(heroBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  if (heroBox && actionBox) {
    const expectedHeroHeight = Math.min((viewport?.height ?? 0) - 56, 900);
    expect(
      Math.abs(heroBox.height - expectedHeroHeight),
    ).toBeLessThanOrEqual(1);
    expect(actionBox.y + actionBox.height).toBeLessThanOrEqual(heroBox.y + heroBox.height + 1);
  }

  if (viewport && viewport.width >= 1024) {
    const copyBox = await hero.getByTestId("hero-copy").boundingBox();
    expect(copyBox).not.toBeNull();
    if (copyBox) expect(copyBox.width).toBeLessThanOrEqual(viewport.width - 64);
  }
});

test("desktop navigation overlays the hero and fits inside a short viewport", async ({ page, viewport }) => {
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
    expect(headerBox.y).toBe(0);
    expect(heroBox.y).toBe(0);
    expect(headerBox.height).toBeLessThan(heroBox.height);
    expect(heroBox.y + heroBox.height).toBeLessThanOrEqual(721);
  }
});

test("homepage navigation changes state at the hero boundary and internal navigation shares the same states", async ({ page }) => {
  await page.goto("/");

  const header = page.locator("header").first();
  await expect(header).toHaveAttribute("data-navigation-variant", "home");
  await expect(header).toHaveAttribute("data-navigation-state", "top");
  await expect(page.locator("[data-site-disclosure='top']")).toHaveCount(0);

  await page.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-navigation-state", "scrolled");

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-navigation-state", "top");

  await page.goto("/products");
  await expect(page.locator("header").first()).toHaveAttribute(
    "data-navigation-variant",
    "internal",
  );
  await expect(page.locator("[data-site-disclosure='top']")).toHaveCount(0);
  await expect(page.locator("[data-site-disclosure='footer']")).toHaveCount(1);
});

test("mobile homepage uses one navigation group without overflow", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 900, "Mobile navigation structure");
  await page.goto("/");

  await expect(page.locator("[data-mobile-navigation-group]")).toHaveCount(1);
  await expect(page.locator("[data-mobile-navigation-group]")).toBeVisible();
  const dimensions = await page.locator("header").evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});

test("homepage headings use the approved editorial scale", async ({ page, viewport }) => {
  await page.goto("/");

  const heroSize = await page.locator("#hero h1").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  const customizationSize = await page.locator("#gummy-stage h2").evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );

  expect(heroSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 44 : 48);
  expect(customizationSize).toBeLessThanOrEqual(viewport && viewport.width <= 760 ? 56 : 86);

  const supportingSizes = await page.locator("main h3").evaluateAll((elements) =>
    elements
      .filter((element) => !element.closest("#solutions"))
      .map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
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
    "#proof": 1800,
    "#gummy-stage": 1050,
    "#project-runway": 840,
    "#contact": 1930,
  } as const;

  for (const [selector, maximumHeight] of Object.entries(limits)) {
    const height = await page.locator(selector).evaluate((element) =>
      Math.round(element.getBoundingClientRect().height),
    );
    expect(height, `${selector} is ${height}px tall`).toBeLessThanOrEqual(maximumHeight);
  }
});

test("desktop product directions switch inside one sticky viewport", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width < 1024, "Desktop product direction check");

  await page.setViewportSize({ width: 1440, height: 720 });
  await page.goto("/");

  const stage = page.locator("#solutions");
  const stories = stage.getByTestId("market-story");
  await expect(stories).toHaveCount(3);
  await expect(stage).toHaveAttribute("data-layout", "sticky-product-switcher");
  await expect(stage.getByRole("button")).toHaveCount(0);

  const layout = await stage.evaluate((element) => {
    const stories = Array.from(element.querySelectorAll<HTMLElement>("[data-testid='market-story']"));
    return {
      height: Math.round(element.getBoundingClientRect().height),
      storyTops: stories.map((story) => story.offsetTop),
      stickyPosition: getComputedStyle(element.children[1]).position,
      top: element.getBoundingClientRect().top + window.scrollY,
    };
  });
  expect(layout.height).toBe(2160);
  expect(new Set(layout.storyTops).size).toBe(1);
  expect(layout.stickyPosition).toBe("sticky");

  for (let step = 0; step <= 1440; step += 72) {
    await page.evaluate(
      ({ stageTop, offset }) => window.scrollTo({ top: stageTop + offset, behavior: "instant" }),
      { stageTop: layout.top, offset: step },
    );
    const visibleStories = await stories.evaluateAll((elements) =>
      elements.filter((element) => Number.parseFloat(getComputedStyle(element).opacity) > 0.05).length,
    );
    expect(visibleStories, `overlap at market scroll offset ${step}`).toBeLessThanOrEqual(1);
  }

  for (let index = 0; index < 3; index += 1) {
    await page.evaluate(
      ({ stageTop, step }) => window.scrollTo({ top: stageTop + step, behavior: "instant" }),
      { stageTop: layout.top, step: index * 720 },
    );
    await expect
      .poll(() =>
        stories.evaluateAll((elements) =>
          elements.findIndex((element) => {
            const style = getComputedStyle(element);
            return style.visibility === "visible" && Number.parseFloat(style.opacity) > 0.9;
          }),
        ),
      )
      .toBe(index);
  }
});

test("featured products form three, two and one column layouts without overflow", async ({ page, viewport }) => {
  await page.goto("/");

  const grid = page.getByTestId("featured-product-grid");
  await grid.scrollIntoViewIfNeeded();
  const layout = await grid.evaluate((element) => ({
    columns: getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean).length,
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));

  const expectedColumns = viewport && viewport.width <= 760 ? 1 : viewport && viewport.width <= 900 ? 2 : 3;
  expect(layout.columns).toBe(expectedColumns);
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
});

test("customization constellation adapts without leaving the viewport", async ({ page, viewport }) => {
  await page.goto("/");

  const customization = page.locator("#gummy-stage");
  await customization.evaluate((element) => element.scrollIntoView({ block: "start" }));
  await expect(customization).toHaveAttribute("data-layout", "customization-constellation");

  const layout = await customization.evaluate((element) => {
    const visual = element.querySelector<HTMLElement>("[data-testid='customization-visual']");
    const firstNode = element.querySelector<HTMLElement>("[data-testid='customization-node']");
    const benefits = Array.from(
      element.querySelectorAll<HTMLElement>("[data-testid='customization-benefit']"),
    );
    return {
      benefitBottom: Math.max(...benefits.map((benefit) => benefit.getBoundingClientRect().bottom)),
      clientWidth: element.clientWidth,
      firstNodePosition: firstNode ? getComputedStyle(firstNode).position : "missing",
      scrollWidth: element.scrollWidth,
      visualPosition: visual ? getComputedStyle(visual).position : "missing",
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  if (viewport && viewport.width >= 1200) {
    expect(layout.benefitBottom).toBeLessThanOrEqual(layout.viewportHeight + 1);
  } else if (viewport && viewport.width <= 760) {
    expect(layout.firstNodePosition).toBe("relative");
    expect(layout.visualPosition).toBe("relative");
  }
});

test("desktop featured product cards fit inside one viewport", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width < 1024, "Desktop featured product composition");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const runway = page.locator("#capacity-boundary");
  await runway.evaluate((element) => element.scrollIntoView({ block: "start" }));
  await expect(runway).toHaveAttribute("data-motion-state", "visible");

  const layout = await runway.evaluate((element) => {
    const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-testid='featured-product-card']"));
    return {
      background: getComputedStyle(element).backgroundColor,
      cardBottom: Math.max(...cards.map((card) => card.getBoundingClientRect().bottom)),
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.background).toBe("rgb(23, 27, 25)");
  expect(layout.cardBottom).toBeLessThanOrEqual(layout.viewportHeight + 1);
});

test("format wall preserves its two-column desktop and one-column mobile layout", async ({ page, viewport }) => {
  await page.goto("/");

  const grid = page.getByTestId("format-wall");
  await grid.scrollIntoViewIfNeeded();
  const layout = await grid.evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns
      .split(" ")
      .filter(Boolean).length;
    return { columns, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth };
  });

  expect(layout.columns).toBe(viewport && viewport.width <= 760 ? 1 : 2);
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

test("mobile market stories switch inside one sticky viewport", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width > 760, "Mobile market-stage check");

  await page.goto("/");

  const stage = page.getByTestId("market-stage");
  const stories = stage.getByTestId("market-story");
  await expect(stories).toHaveCount(3);
  await expect(stage.getByTestId("market-step")).toHaveCount(3);
  await expect(stage).toHaveAttribute("data-layout", "sticky-product-switcher");
  await expect
    .poll(() =>
      stories.evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).visibility),
      ),
    )
    .toEqual(["visible", "hidden", "hidden"]);
});
