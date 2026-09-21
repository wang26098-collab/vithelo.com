import { expect, test } from "@playwright/test";

test("Insights keeps the hero-to-paper overlap and ten-story runway", async ({
  page,
  viewport,
}) => {
  if (!viewport) throw new Error("Configured viewport required");
  await page.goto("/insights");

  const hero = page.getByTestId("insights-hero");
  const paper = page.getByTestId("insights-paper");
  const stories = page.getByTestId("insight-story");
  await expect(stories).toHaveCount(10);
  await expect(page.locator('[data-media-status="DEMO_ONLY"]')).toHaveCount(10);

  const [heroBox, paperBox] = await Promise.all([
    hero.boundingBox(),
    paper.boundingBox(),
  ]);
  expect(heroBox).not.toBeNull();
  expect(paperBox).not.toBeNull();
  if (heroBox && paperBox) {
    expect(paperBox.y).toBeLessThan(heroBox.y + heroBox.height);
    expect(paperBox.y).toBeGreaterThan(heroBox.y + heroBox.height - 90);
  }

  const [headerBox, firstTopicBox] = await Promise.all([
    page.locator('header [class*="headerInner"]').boundingBox(),
    page.getByTestId("insight-topic").first().boundingBox(),
  ]);
  expect(headerBox).not.toBeNull();
  expect(firstTopicBox).not.toBeNull();
  if (headerBox && firstTopicBox) {
    expect(firstTopicBox.x).toBeCloseTo(headerBox.x, 0);
  }

  const firstStory = stories.first();
  await firstStory.scrollIntoViewIfNeeded();
  const layout = await firstStory.evaluate((element) => ({
    clientWidth: element.clientWidth,
    columns: getComputedStyle(element)
      .gridTemplateColumns.split(" ")
      .filter(Boolean).length,
    scrollWidth: element.scrollWidth,
  }));
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
  expect(layout.columns).toBe(viewport.width <= 760 ? 1 : 2);

  const pageWidth = await page.locator("main").evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(pageWidth.scrollWidth).toBeLessThanOrEqual(pageWidth.clientWidth + 1);
});

test("Insights keeps one accessible link and image per article", async ({ page }) => {
  await page.goto("/insights");

  await expect(page.locator('main a[href^="/insights/"]')).toHaveCount(10);
  const images = page.getByTestId("insight-story").getByRole("img");
  await expect(images).toHaveCount(10);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("alt", /\S+/);
  }
});

test("Insights disables narrative movement for Reduced Motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/insights");

  const heroAnimation = await page
    .getByTestId("insights-hero")
    .evaluate((element) => getComputedStyle(element, "::before").animationName);
  const storyAnimation = await page
    .getByTestId("insight-story")
    .first()
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(heroAnimation).toBe("none");
  expect(storyAnimation).toBe("none");
});

test("Insights reuses the homepage hero and second-screen type scale", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width <= 1200, "Desktop homepage scale only");
  await page.goto("/insights");

  const metrics = await page.evaluate(() => {
    const hero = document.querySelector('[data-testid="insights-hero"]');
    const heroTitle = hero?.querySelector("h1");
    const heroLede = hero?.querySelector('[class*="heroLede"]');
    const storyTitle = document.querySelector('[data-testid="insight-story"] h2');

    return {
      heroHeight: hero ? hero.getBoundingClientRect().height : 0,
      heroInset: heroTitle ? heroTitle.getBoundingClientRect().x : 0,
      heroTitleSize: heroTitle ? Number.parseFloat(getComputedStyle(heroTitle).fontSize) : 0,
      heroLedeSize: heroLede ? Number.parseFloat(getComputedStyle(heroLede).fontSize) : 0,
      storyTitleSize: storyTitle ? Number.parseFloat(getComputedStyle(storyTitle).fontSize) : 0,
    };
  });

  expect(metrics.heroHeight).toBeCloseTo(1180, 0);
  expect(metrics.heroInset).toBeCloseTo(190, 0);
  expect(metrics.heroTitleSize).toBeCloseTo(48, 0);
  expect(metrics.heroLedeSize).toBeCloseTo(16, 0);
  expect(metrics.storyTitleSize).toBeGreaterThan(40);
  expect(metrics.storyTitleSize).toBeLessThanOrEqual(48);
});
