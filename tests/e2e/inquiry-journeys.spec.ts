import { expect, test } from "@playwright/test";

test("Home exposes the editorial inquiry close and both approved channels", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toHaveAttribute("data-layout", "editorial-channel-split");
  await expect(contact.getByRole("link", { name: "Email wang26098@gmail.com" })).toHaveAttribute("href", /mailto:wang26098@gmail\.com/);
  await expect(contact.getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toHaveAttribute("href", /https:\/\/wa\.me\/8618273669556/);
  await expect(contact.getByRole("form", { name: "Prepare a project inquiry" })).toBeVisible();
  await expect(contact.getByText("Made for what comes next.")).toBeVisible();
  await expect(contact.getByText("Target timing")).toHaveCount(0);
});

test("Contact preserves bounded project context without enabling submission", async ({ page }) => {
  await page.goto("/contact?format=Gummies&subject=New%20gummy%20project");

  await expect(page.getByLabel("Dosage format")).toHaveValue("Gummies");
  await expect(page.getByLabel("Project brief")).toHaveValue("New gummy project");
  await expect(page.locator("fieldset")).toHaveAttribute("disabled", "");
  await expect(page.getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
  await expect(page.getByText(/Email and WhatsApp are available/i)).toBeVisible();
});

test("product and article calls to action preserve project context", async ({ page }) => {
  await page.goto("/products");
  await expect(page.getByRole("link", { name: "Start a Project" }).last()).toHaveAttribute(
    "href",
    "/contact",
  );

  await page.goto("/insights/gummy-development-guide");
  await expect(page.getByRole("link", { name: "Start a Project" }).last()).toHaveAttribute(
    "href",
    "/contact?subject=Gummy%20Development%3A%20Formula%2C%20Texture%2C%20Shape%20and%20Packaging",
  );
});
