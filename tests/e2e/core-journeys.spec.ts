import { expect, test, type Page } from "@playwright/test";

async function primaryNavigation(page: Page) {
  const desktopNavigation = page.getByRole("navigation", { name: "Primary navigation" });

  if (await desktopNavigation.isVisible()) return desktopNavigation;

  await page.getByRole("button", { name: "Open menu" }).click();
  return page.getByRole("navigation", { name: "Mobile primary navigation" });
}

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

test("brand orientation reaches nutrition, science, knowledge, and professional partnership", async ({ page }) => {
  await page.goto("/");
  const navigation = await primaryNavigation(page);

  await expect(navigation.getByRole("link", { name: "Products", exact: true })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Science", exact: true })).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Health Knowledge", exact: true }),
  ).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Professional Partnership", exact: true }),
  ).toBeVisible();
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
  await expect(page.locator("#capsule-science").getByRole("heading", { name: "Capsule form study" })).toBeVisible();
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
