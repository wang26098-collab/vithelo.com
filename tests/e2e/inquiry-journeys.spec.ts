import { expect, test } from "@playwright/test";

test("Home exposes both inquiry channels without inventing targets", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toHaveAttribute("data-contact-state", "NOT_CONFIGURED");
  await expect(contact.getByRole("link", { name: "Email" })).toHaveAttribute("href", "#contact-pending");
  await expect(contact.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "#contact-pending");
  await expect(contact.getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
});

test("Contact preserves bounded project context without enabling submission", async ({ page }) => {
  await page.goto("/contact?format=Gummies&subject=New%20gummy%20project");

  await expect(page.getByLabel("Dosage format")).toHaveValue("Gummies");
  await expect(page.getByLabel("Project brief")).toHaveValue("New gummy project");
  await expect(page.locator("fieldset")).toHaveAttribute("disabled", "");
  await expect(page.getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
  await expect(page.getByText(/inquiry submission are not configured/i)).toBeVisible();
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
