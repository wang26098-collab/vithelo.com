import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/insights/choose-the-right-supplement-format",
  "/insights/prepare-for-an-oem-odm-project",
  "/insights/gummy-development-guide",
  "/insights/how-to-evaluate-a-supplement-manufacturer",
  "/insights/private-label-vs-custom-formulation",
  "/insights/how-supplement-sampling-works",
  "/insights/gummies-vs-hard-capsules",
  "/insights/what-documents-buyers-should-ask-for",
  "/insights/what-information-to-include-in-an-rfq",
  "/insights/how-packaging-affects-moq-and-lead-time",
  "/contact",
] as const;

const insightSlugs = [
  "choose-the-right-supplement-format",
  "prepare-for-an-oem-odm-project",
  "gummy-development-guide",
  "how-to-evaluate-a-supplement-manufacturer",
  "private-label-vs-custom-formulation",
  "how-supplement-sampling-works",
  "gummies-vs-hard-capsules",
  "what-documents-buyers-should-ask-for",
  "what-information-to-include-in-an-rfq",
  "how-packaging-affects-moq-and-lead-time",
] as const;

test("shared navigation reaches every primary B2B destination", async ({ page, viewport }) => {
  await page.goto("/");
  await expect(page.locator("#hero")).toBeVisible();
  await expect(page.locator("#solutions")).toBeVisible();
  await expect(page.locator("#dosage-forms")).toBeVisible();

  const navigation =
    viewport && viewport.width <= 1200
      ? page.getByRole("navigation", { name: "Mobile primary navigation" })
      : page.getByRole("navigation", { name: "Primary navigation" });

  if (viewport && viewport.width <= 1200) {
    await page.getByText("Menu", { exact: true }).click();
  }

  for (const [label, href] of [
    ["Products", "/products"],
    ["OEM / ODM", "/oem-odm"],
    ["Insights", "/insights"],
  ] as const) {
    await expect(navigation.getByRole("link", { name: label, exact: true })).toHaveAttribute(
      "href",
      href,
    );
  }

  if (viewport && viewport.width > 1200) {
    await expect(
      page
        .getByRole("navigation", { name: "Inquiry navigation" })
        .getByRole("link", { name: "Contact", exact: true }),
    ).toHaveAttribute("href", "/contact");
  } else {
    await expect(
      navigation.getByRole("link", { name: "Contact", exact: true }),
    ).toHaveAttribute("href", "/contact");
  }
});

test("Products exposes eight visible format rows without horizontal overflow", async ({ page }) => {
  await page.goto("/products");
  const rows = page.getByTestId("format-ledger").locator(":scope > article");
  await expect(rows).toHaveCount(8);
  for (let index = 0; index < 8; index += 1) await expect(rows.nth(index)).toBeVisible();

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("primary B2B pages use the premium visual shell", async ({ page }) => {
  for (const [route, stage] of [
    ["/products", "products-premium-catalog"],
    ["/oem-odm", "oem-premium-process"],
    ["/contact", "contact-premium-brief"],
  ] as const) {
    await page.goto(route);
    await expect(page.locator("main")).toHaveAttribute("data-ui-stage", stage);
    await expect(page.locator("main section").first()).toHaveCSS("position", "relative");
  }

});

test("OEM and ODM exposes the six-step path and four quality checkpoints", async ({ page }) => {
  await page.goto("/oem-odm");
  await expect(page.getByTestId("oem-steps").locator(":scope > article")).toHaveCount(6);
  await expect(page.getByTestId("quality-path").locator(":scope > article")).toHaveCount(4);
});

test("Insights publishes ten working articles and preserves the 404 state", async ({ page }) => {
  await page.goto("/insights");
  const articleLinks = page.locator('main a[href^="/insights/"]');
  await expect(articleLinks).toHaveCount(10);

  for (const slug of insightSlugs) {
    await page.goto(`/insights/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
  }

  await page.goto("/insights/not-a-published-article");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("Contact exposes direct channels while project brief submission stays unavailable", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("fieldset input, fieldset select, fieldset textarea")).toHaveCount(8);
  await expect(page.getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
  await expect(page.locator('a[href^="mailto:wang26098@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('a[href^="https://wa.me/8618273669556"]')).toHaveCount(1);
});

test("public copy and free imagery preserve evidence boundaries", async ({ page }) => {
  const forbiddenCopy = /\b(?:american|united states|u\.s\.)\b|fda approved|certified|clinically proven|guaranteed/i;

  for (const route of publicRoutes) {
    await page.goto(route);
    const visibleText = await page.locator("body").innerText();
    expect(visibleText, `${route} contains restricted market or claim wording`).not.toMatch(forbiddenCopy);
    expect(visibleText, `${route} contains a forbidden dash character`).not.toMatch(/[\u2013\u2014]/);

    const freeImages = page.locator("figure img");
    for (let index = 0; index < (await freeImages.count()); index += 1) {
      const image = freeImages.nth(index);
      await expect(image).not.toHaveAttribute("alt", "");
      await expect(image.locator("xpath=ancestor::figure[1]")).not.toContainText(/VITHELO factory/i);
    }
  }
});
