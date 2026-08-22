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
  await page.getByRole("heading", { name: "Precision for what comes next." }).waitFor();

  expect(errors).toEqual([]);
});

test("brand orientation reaches both product worlds and professional", async ({ page }) => {
  await page.goto("/");
  const navigation = await primaryNavigation(page);

  await expect(navigation.getByRole("link", { name: "Nutrition", exact: true })).toBeVisible();
  await expect(
    navigation.getByRole("link", { name: "Aesthetic Technology", exact: true }),
  ).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Professional", exact: true })).toBeVisible();
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

test("professional intake branches on the first question", async ({ page }) => {
  await page.goto("/professional#project-intake");

  await page.getByRole("button", { name: "Develop a product" }).click();
  await expect(page.getByRole("heading", { name: "Project basics" })).toBeVisible();
  await expect(
    page.getByLabel("What product world and early brief should we understand?"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Change intent" }).click();
  await page.getByRole("button", { name: "Private Label" }).click();
  await expect(
    page.getByLabel("What approved product category and brand scope should be considered?"),
  ).toBeVisible();

  await page.getByRole("button", { name: "Change intent" }).click();
  await page.getByRole("button", { name: "OEM / ODM" }).click();
  await expect(
    page.getByLabel("What concept and development ownership model should be considered?"),
  ).toBeVisible();
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
