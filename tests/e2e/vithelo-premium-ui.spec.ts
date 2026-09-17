import { expect, test } from "@playwright/test";

test.describe("VITHELO premium UI phase 1", () => {
  test("homepage master sections use premium image-led structure", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero");
    const dosageForms = page.locator("#dosage-forms");

    await expect(hero).toHaveAttribute("data-ui-stage", "image-led-hero");
    await expect(page.locator("#solutions")).toHaveAttribute("data-layout", "reference-scene-stack");
    await expect(page.getByTestId("market-intro")).toHaveCount(0);
    await expect(dosageForms).toHaveAttribute("data-ui-stage", "featured-format-wall");
  });

  test("hero keeps the full background image without an empty glass block", async ({ page }) => {
    await page.goto("/");

    const hero = page.locator("#hero");

    await expect(hero.locator("[data-testid='hero-glass-layer']")).toHaveCount(0);
  });

  test("homepage navigation uses the approved material glass state contract", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header").first();

    await expect(header).toHaveAttribute("data-navigation-variant", "home");
    await expect(header).toHaveAttribute("data-navigation-state", "top");
    await expect(page.locator("[data-site-disclosure='top']")).toHaveCount(0);

    await page.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-navigation-state", "scrolled");
  });

  test("customization section uses the approved product constellation", async ({ page }) => {
    await page.goto("/");

    const customization = page.locator("#gummy-stage");
    await expect(customization).toHaveAttribute("data-ui-stage", "customization-constellation");
    await expect(customization.getByTestId("customization-visual")).toBeVisible();
    await expect(customization.getByTestId("customization-node")).toHaveCount(4);
    await expect(customization.locator("[data-testid='media-requirement']")).toHaveCount(0);
    await expect(page.locator("#manufacturing")).toHaveCount(0);
  });

  test("retained homepage sections declare semantic motion intent", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#gummy-stage")).toHaveAttribute("data-motion-intent", "EXPLAIN");
    await expect(page.locator("#dosage-forms")).toHaveAttribute("data-motion-intent", "RELATE");
    await expect(page.locator("#project-runway")).toHaveAttribute("data-motion-intent", "EXPLAIN");
    await expect(page.locator("#custom-development, #quality, #company-fit")).toHaveCount(0);
  });

  test("selected homepage sections visibly reveal when they enter the viewport", async ({ page }) => {
    await page.goto("/");

    const dosageForms = page.locator("#dosage-forms");
    await dosageForms.scrollIntoViewIfNeeded();
    await expect(dosageForms).toHaveAttribute("data-motion-state", "visible");
    await expect(dosageForms.locator("[data-testid='dosage-item']").first()).toHaveCSS(
      "opacity",
      "1",
    );
  });

  test("eight product formats remain one section without horizontal slider semantics", async ({ page }) => {
    await page.goto("/");

    const dosageForms = page.locator("#dosage-forms");
    const dosageItems = dosageForms.locator("[data-testid='dosage-item']");

    await expect(dosageForms).toHaveCount(1);
    await expect(dosageItems).toHaveCount(8);
    await expect(dosageForms.locator("[role='tablist']")).toHaveCount(0);
    await expect(dosageForms.locator("[aria-roledescription*='carousel']")).toHaveCount(0);
  });

  test("product format wall uses directional motion and pointer-responsive media", async ({ page }) => {
    await page.goto("/#dosage-forms");

    const dosageForms = page.locator("#dosage-forms");
    const firstProject = dosageForms.locator("[data-format-project]").first();
    const firstMedia = firstProject.locator("[data-format-media]");

    await expect(dosageForms).toHaveAttribute("data-format-motion", "enhanced");
    await expect(dosageForms).toHaveAttribute("data-format-intro-visible", "true");
    await firstProject.scrollIntoViewIfNeeded();
    await expect(firstProject).toHaveAttribute("data-format-visible", "true");
    await firstMedia.hover({ position: { x: 80, y: 80 } });
    await expect
      .poll(() =>
        firstProject.evaluate((element) =>
          element.style.getPropertyValue("--format-pointer-x"),
        ),
      )
      .not.toBe("0");
    await expect(firstProject.locator("[data-format-label]")).toHaveText("Gummies");
  });

  test("product format wall exposes its final state with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#dosage-forms");

    const dosageForms = page.locator("#dosage-forms");
    await expect(dosageForms).toHaveAttribute("data-format-motion", "static");
    await expect(dosageForms.locator("[data-format-visible='true']")).toHaveCount(8);
    await expect(dosageForms.getByRole("heading", { name: "One system. Eight expressions." })).toBeVisible();
  });

  test("homepage copy stays English and does not name a single target country", async ({ page }) => {
    await page.goto("/");

    const bodyText = await page.locator("body").innerText();

    expect(bodyText).not.toMatch(/[\u4e00-\u9fff]/);
    expect(bodyText).not.toMatch(/\bUnited States\b/i);
    expect(bodyText).not.toMatch(/\bUS market\b/i);
    expect(bodyText).not.toMatch(/\bU\.S\. market\b/i);
  });

  test("signal orange never becomes a full-width section background", async ({ page }) => {
    await page.goto("/");

    const contactBackground = await page.locator("#contact").evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );

    expect(contactBackground).not.toBe("rgb(236, 91, 50)");
  });
});
