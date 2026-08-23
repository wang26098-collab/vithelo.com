import { expect, test } from "@playwright/test";

test("Home exposes both inquiry channels without inventing targets", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#human-rhythms")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Professional partnership" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tell us what you are building." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Email Inquiry" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "WhatsApp" }).first()).toBeDisabled();
  await expect(page.getByText("Email inquiry address not configured").first()).toBeVisible();
  await expect(page.getByText("WhatsApp number not configured").first()).toBeVisible();
});

test("Start a Project collects local context without submission", async ({ page }) => {
  await page.goto(
    "/contact?world=aesthetic-technology&subject=Demo%20Precision%20Device",
  );
  await page.getByRole("button", { name: "Private Label" }).click();
  await expect(page.getByLabel("Product world")).toHaveValue("Aesthetic Technology");
  await expect(page.getByLabel("Project summary")).toHaveValue("Demo Precision Device");
  await page.getByLabel("Country or market").fill("Singapore");
  const intake = page.getByRole("main");
  await expect(intake.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  await expect(intake.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
  await expect(page.getByText(/no information is transmitted/i)).toBeVisible();
});

test("mobile inquiry bar activates after Home hero and pauses for overlays", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 768, "Mobile inquiry-bar check");

  await page.goto("/");
  await expect(page.locator("#nutrition-hero")).toBeVisible();
  const inquiryBar = page.getByLabel("Inquiry channels");
  await expect(inquiryBar).toBeHidden();
  await page.locator("#nutrition-hero").evaluate((hero) => {
    window.scrollTo(0, (hero as HTMLElement).offsetTop + (hero as HTMLElement).offsetHeight + 1);
  });
  await expect(inquiryBar).toBeVisible();

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: /site navigation/i })).toBeVisible();
  await expect(inquiryBar).toBeHidden();
});

test("mobile inquiry bar yields to the Contact intake", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Private Label" }).click();
  await page.getByLabel("Country or market").focus();
  await expect(page.getByLabel("Inquiry channels")).toBeHidden();
});
