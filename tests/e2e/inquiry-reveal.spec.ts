import { expect, test } from "@playwright/test";

test("inquiry wordmark reveals the channels with native scrolling", async ({ page }, testInfo) => {
  await page.goto("/");
  const reveal = page.locator("[data-inquiry-reveal]");
  await expect(reveal).toHaveAttribute("data-reveal-mode", "scroll");
  const bounds = await reveal.evaluate((element) => ({
    top: element.getBoundingClientRect().top + window.scrollY,
    distance: element.clientHeight - (element.firstElementChild as HTMLElement).offsetHeight,
  }));
  await page.evaluate((top) => window.scrollTo(0, top), bounds.top);
  await expect(reveal).toHaveAttribute("data-reveal-complete", "false");
  await page.screenshot({ path: testInfo.outputPath("inquiry-start.png") });
  await page.evaluate((top) => window.scrollTo(0, top), bounds.top + bounds.distance * 0.5);
  await expect.poll(() => reveal.evaluate((element) => Number(element.style.getPropertyValue("--reveal-scale")))).toBeGreaterThan(3);
  await page.screenshot({ path: testInfo.outputPath("inquiry-middle.png") });
  await page.evaluate((top) => window.scrollTo(0, top), bounds.top + bounds.distance * 0.75);
  await expect(reveal).toHaveAttribute("data-reveal-complete", "true");
  await expect
    .poll(() => reveal.evaluate((element) => Number(element.style.getPropertyValue("--reveal-copy-opacity"))))
    .toBe(1);
  await expect(reveal.getByRole("link", { name: "Email wang26098@gmail.com" })).toBeInViewport();
  await page.evaluate((top) => window.scrollTo(0, top), bounds.top + bounds.distance);
  await expect(reveal).toHaveAttribute("data-reveal-complete", "true");
  const email = reveal.getByRole("link", { name: "Email wang26098@gmail.com" });
  await expect(email).toBeInViewport();
  await expect(email).toHaveAttribute("href", /^mailto:/);
  await expect(reveal.getByRole("link", { name: /^WhatsApp/ })).toBeInViewport();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("inquiry-complete.png") });
  await page.evaluate((top) => window.scrollTo(0, top), bounds.top);
  await expect(reveal).toHaveAttribute("data-reveal-complete", "false");
});

test("contact anchor and keyboard focus bypass the decorative reveal", async ({ page }) => {
  await page.goto("/#contact");
  const reveal = page.locator("[data-inquiry-reveal]");
  await expect(reveal).toHaveAttribute("data-reveal-complete", "true");
  await expect(reveal.getByRole("link", { name: /^Email/ })).toBeInViewport();
  await page.goto("/");
  await reveal.getByRole("link", { name: /^Email/ }).focus();
  await expect(reveal).toHaveAttribute("data-reveal-complete", "true");
  await expect(reveal.getByRole("link", { name: /^Email/ })).toBeFocused();
  await expect(reveal.getByRole("link", { name: /^Email/ })).toBeInViewport();
});

test("reduced motion exposes channels immediately and responds to preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  const reveal = page.locator("[data-inquiry-reveal]");
  await expect(reveal).toHaveAttribute("data-reveal-mode", "static");
  await expect(reveal.getByRole("link", { name: /^Email/ })).toBeInViewport();
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(reveal).toHaveAttribute("data-reveal-mode", "scroll");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(reveal).toHaveAttribute("data-reveal-mode", "static");
});

test("inquiry channels remain usable without JavaScript", async ({ browser, baseURL, viewport }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  await page.goto(`${baseURL}/#contact`);
  const email = page.getByRole("link", { name: /^Email/ });
  await email.scrollIntoViewIfNeeded();
  await expect(email).toBeInViewport();
  await expect(email).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByRole("link", { name: /^WhatsApp/ })).toHaveAttribute("href", /^https:\/\/wa.me\//);
  await context.close();
});
