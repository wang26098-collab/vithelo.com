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

test("public routes hydrate without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of routes) {
    await page.goto(route);
    await page.locator("main").waitFor();
  }

  expect(errors).toEqual([]);
});

test("primary visual routes avoid Next Image configuration warnings", async ({ page }) => {
  const warnings: string[] = [];
  let currentRoute = "";
  page.on("console", (message) => {
    if (message.type() === "warning") warnings.push(`${currentRoute}: ${message.text()}`);
  });

  for (const route of routes) {
    currentRoute = route;
    await page.goto(route);
    await page.locator("main").waitFor();
    await page.waitForLoadState("networkidle");
  }

  expect(warnings.filter((warning) => /Image with src|Largest Contentful Paint/.test(warning))).toEqual([]);
});

test("home hero and shared navigation route into the B2B site", async ({ page, viewport }) => {
  await page.goto("/");

  await expect(page.locator("#hero").getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
  await expect(page.locator("#hero").getByRole("link", { name: "Explore Formats" })).toHaveAttribute(
    "href",
    "/products",
  );

  if (viewport && viewport.width >= 1024) {
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation.getByRole("link", { name: "Products", exact: true })).toHaveAttribute("href", "/products");
    await expect(navigation.getByRole("link", { name: "OEM / ODM", exact: true })).toHaveAttribute("href", "/oem-odm");
    await expect(navigation.getByRole("link", { name: "Insights", exact: true })).toHaveAttribute("href", "/insights");
    await expect(navigation.getByRole("link", { name: "Contact", exact: true })).toHaveAttribute("href", "/contact");
  }
});

test("home retains the approved B2B product and manufacturing stages", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("#gummy-stage")).toBeVisible();
  await expect(page.locator("#dosage-forms").getByRole("heading", { name: "One factory. Eight product formats." })).toBeVisible();
  await expect(page.locator("#manufacturing")).toBeVisible();
  await expect(page.locator("#quality")).toBeVisible();
});

test("legacy public routes permanently redirect into the B2B structure", async ({ request }) => {
  for (const [source, destination] of [
    ["/nutrition/demo-daily-formula", "/products"],
    ["/aesthetic-technology/demo-precision-device", "/products"],
    ["/science", "/insights"],
    ["/learn", "/insights"],
    ["/professional", "/oem-odm"],
    ["/support", "/contact"],
    ["/cart", "/contact"],
    ["/checkout", "/contact"],
    ["/account", "/contact"],
    ["/search", "/insights"],
  ] as const) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
});
