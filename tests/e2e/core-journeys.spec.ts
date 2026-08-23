import { expect, test } from "@playwright/test";

test("home hydrates without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await page.locator("#nutrition-hero-title").waitFor();

  expect(errors).toEqual([]);
});

test("primary visual routes avoid Next Image configuration warnings", async ({ page }) => {
  const warnings: string[] = [];
  let currentRoute = "";
  page.on("console", (message) => {
    if (message.type() === "warning") warnings.push(`${currentRoute}: ${message.text()}`);
  });

  for (const route of [
    "/",
    "/nutrition",
    "/aesthetic-technology",
    "/nutrition/demo-daily-formula",
    "/aesthetic-technology/demo-precision-device",
  ]) {
    currentRoute = route;
    await page.goto(route);
    await page.locator("main").waitFor();
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }));
  }

  expect(warnings.filter((warning) => /Image with src|Largest Contentful Paint/.test(warning))).toEqual([]);
});

test("home hero navigation follows the approved first-screen routes", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width < 1024, "Desktop hero-navigation check");

  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Hero navigation" });

  await expect(navigation.getByRole("link", { name: "Our approach", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Sleep health", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Women’s health", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Journal", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "About", exact: true })).toBeVisible();
});

test("nutrition discovery and health knowledge retain disclosed category routes", async ({ page }) => {
  await page.goto("/nutrition#sleep-health");
  await expect(page.locator("#sleep-health")).toBeVisible();
  await expect(page.locator("#womens-health")).toBeVisible();
  await expect(page.locator("#daily-essential")).toBeVisible();

  await page.goto("/learn");
  await expect(page.getByRole("heading", { name: "Health Knowledge" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sleep Health", exact: true })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  await expect(page.getByRole("main").getByRole("link", { name: "Science", exact: true })).toHaveAttribute(
    "href",
    "/science",
  );
  await expect(page.getByRole("main").getByRole("link", { name: "Support", exact: true })).toHaveAttribute(
    "href",
    "/support",
  );
});

test("nutrition home retains the approved capsule and gummy stages", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#nutrition-manifesto")).toBeVisible();
  await expect(
    page.locator("#capsule-science").getByRole("heading", {
      name: "Precision inside every capsule.",
    }),
  ).toBeVisible();
  await expect(page.locator("#gummy-science").getByRole("heading", { name: "Gummy form study" })).toBeVisible();
  await expect(page.locator("#human-rhythms").getByRole("heading", { name: "Your health moves with your rhythms." })).toBeVisible();
});

test("both product decisions keep commerce and safety visible", async ({ page }) => {
  await page.goto("/nutrition/demo-daily-formula");
  await expect(page.getByRole("heading", { name: "Demo Daily Formula" })).toBeVisible();
  await expect(page.getByText("Price not configured", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Add to cart" })).toBeDisabled();
  await expect(page.getByRole("heading", { name: "Quality and safety" })).toBeVisible();

  await page.goto("/aesthetic-technology/demo-precision-device");
  await expect(page.getByRole("heading", { name: "Demo Precision Device" })).toBeVisible();
  await expect(page.getByText("Price not configured", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Start inquiry" })).toBeDisabled();
  await expect(page.getByRole("heading", { name: "Safety", exact: true })).toBeVisible();
});

test("science provides a clear return to support", async ({ page }) => {
  await page.goto("/science");

  const supportLink = page.getByRole("link", { name: "Continue to Support" });
  await expect(supportLink).toBeVisible();
  await expect(supportLink).toHaveAttribute("href", "/support");
});

test("professional routes into the shared project intake", async ({ page }) => {
  await page.goto("/professional");

  await expect(
    page.getByRole("main").getByRole("link", { name: "Start a Project", exact: true }),
  ).toHaveAttribute("href", "/contact");

  await page.goto("/contact");

  await page.getByRole("button", { name: "Develop a product" }).click();
  await expect(page.getByRole("heading", { name: "Project basics" })).toBeVisible();
  await expect(page.getByLabel("Product world")).toBeVisible();
  await expect(page.getByLabel("Project summary")).toBeVisible();

  await page.getByRole("button", { name: "Change intent" }).click();
  await page.getByRole("button", { name: "Private Label" }).click();
  await expect(page.getByText("Selected intent: Private Label", { exact: true })).toBeVisible();

  await page.getByRole("button", { name: "Change intent" }).click();
  await page.getByRole("button", { name: "OEM / ODM" }).click();
  await expect(page.getByText("Selected intent: OEM / ODM", { exact: true })).toBeVisible();
});

test("search and cart preserve task clarity", async ({ page }) => {
  await page.goto("/search");
  await expect(page.getByRole("heading", { name: "Search", exact: true })).toBeVisible();
  for (const heading of [
    "Product",
    "Ingredient and Technology",
    "Professional",
    "Support",
    "Journal",
  ]) {
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

  await page.goto("/cart");
  await expect(page.getByRole("heading", { name: "Your cart is empty" })).toBeVisible();
  await expect(page.getByText("One related demo item", { exact: true })).toBeVisible();
});
