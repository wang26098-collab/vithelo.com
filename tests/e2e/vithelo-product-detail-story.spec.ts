import { expect, test, type Locator, type Page } from "@playwright/test";

const targetRoute = "/products/gummies?product=gummies-concept-01";
const referenceBrand = ["Se", "ed"].join("");
const storyHeadings = [
  "Plant-Based Gummies Concept 01 for Private Label Nutrition",
  "Shape the product around your brief.",
  "Decisions that build into a manufacturable brief.",
  "One gummy concept. Four connected decisions.",
  "Project review at a glance.",
  "Presented as one coherent shelf system.",
  "A clearer review path before commitment.",
  "Questions? Start with the project.",
  "Bring the brief. We’ll review the route.",
] as const;
const faqLabels = [
  "What information should I prepare?",
  "Which elements can be customized?",
  "How is manufacturing fit reviewed?",
  "Which packaging routes can be discussed?",
] as const;

async function expectItemEdgesVisible(
  page: Page,
  testId: string,
  firstText: string,
  lastText: string,
) {
  const items = page.getByTestId(testId);
  await expect(items.first()).toBeVisible();
  await expect(items.first()).toContainText(firstText);
  await expect(items.last()).toBeVisible();
  await expect(items.last()).toContainText(lastText);
}

async function expectStorySectionsVisible(page: Page) {
  await expect(page.locator('main[data-pdp-layout="vithelo-project-story"]')).toBeVisible();
  await expect(page.getByTestId("pdp-story-hero")).toBeVisible();

  for (const heading of storyHeadings) {
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

  await expectItemEdgesVisible(
    page,
    "pdp-capability-item",
    "Formula Direction",
    "Pack + Count",
  );
  await expectItemEdgesVisible(
    page,
    "pdp-project-stage",
    "Define the intended product experience",
    "Connect the product and the pack",
  );
  await expectItemEdgesVisible(page, "pdp-decision", "Formula", "Packaging");
  await expectItemEdgesVisible(page, "pdp-review-row", "Dosage format", "Pack + count");
  await expectItemEdgesVisible(
    page,
    "pdp-packaging-item",
    "Bottle direction",
    "Product detail",
  );
  await expectItemEdgesVisible(
    page,
    "pdp-quality-item",
    "Manufacturing feasibility",
    "Finished-product documents",
  );

  for (const label of faqLabels) {
    await expect(page.getByRole("button", { name: label, exact: true })).toBeVisible();
  }

  const inquiryLinks = [
    page
      .getByTestId("pdp-story-hero")
      .getByRole("link", { name: "Start a Project", exact: true }),
    page
      .locator('main[data-pdp-layout="vithelo-project-story"]')
      .getByRole("link", { name: "Discuss Concept 01", exact: true }),
  ];
  for (const inquiryLink of inquiryLinks) {
    await expect(inquiryLink).toBeVisible();
    await expect(inquiryLink).toHaveAttribute("href", "/contact");
    const colors = await inquiryLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        background: style.backgroundColor,
        foreground: style.color,
      };
    });
    expect(colors.foreground).not.toBe(colors.background);
  }
}

async function expectVisibleKeyboardFocus(locator: Locator) {
  await expect(locator).toBeFocused();
  const focusPresentation = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      focusVisible: element.matches(":focus-visible"),
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });

  expect(focusPresentation.focusVisible).toBe(true);
  expect(focusPresentation.outlineStyle).not.toBe("none");
  expect(focusPresentation.outlineWidth).toBeGreaterThanOrEqual(2);
}

test("Concept 01 exposes the complete VITHELO project story without horizontal overflow", async ({
  page,
}) => {
  await page.goto(targetRoute);

  await expect(page.locator("main")).toHaveAttribute(
    "data-pdp-layout",
    "vithelo-project-story",
  );
  await expectStorySectionsVisible(page);
  await expect(page.getByTestId("pdp-capability-item")).toHaveCount(4);
  await expect(page.getByTestId("pdp-project-stage")).toHaveCount(4);
  await expect(page.getByTestId("pdp-decision")).toHaveCount(4);
  await expect(page.getByTestId("pdp-review-row")).toHaveCount(4);
  await expect(page.getByTestId("pdp-packaging-item")).toHaveCount(3);
  await expect(page.getByTestId("pdp-quality-item")).toHaveCount(3);
  const hero = page.getByTestId("pdp-story-hero");
  await expect(
    hero.getByText(
      "A demonstration concept for aligning formula direction, sensory experience, shape and packaging before project review.",
      { exact: true },
    ),
  ).toHaveCount(0);
  await expect(
    hero.getByText(
      "DEMO_ONLY · Product parameters and production feasibility remain pending production verification.",
      { exact: true },
    ),
  ).toHaveCount(0);
  await expect(
    hero.getByText(
      "Price, MOQ, lead time and production claims are not configured on this demonstration page.",
      { exact: true },
    ),
  ).toHaveCount(0);

  const publicTextSurfaces = await page.evaluate(() => ({
    bodyText: document.body.textContent ?? "",
    description:
      document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "",
    labelledAttributes: Array.from(
      document.querySelectorAll<HTMLElement>("[alt], [aria-label], [title]"),
    )
      .flatMap((element) =>
        ["alt", "aria-label", "title"].map(
          (attribute) => element.getAttribute(attribute) ?? "",
        ),
      )
      .join(" "),
    title: document.title,
  }));
  const referenceBrandPattern = new RegExp(referenceBrand, "i");
  for (const [surface, value] of Object.entries(publicTextSurfaces)) {
    expect(value, `${surface} exposes the structural reference brand`).not.toMatch(
      referenceBrandPattern,
    );
  }

  const width = await page.evaluate(() => ({
    background: getComputedStyle(
      document.querySelector<HTMLElement>(
        'main[data-pdp-layout="vithelo-project-story"]',
      )!,
    ).backgroundColor,
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.background).toBe("rgb(255, 255, 255)");
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("large desktop aligns the hero to the navigation frame and caps the main image", async (
  { page },
  testInfo,
) => {
  test.skip(
    testInfo.project.name !== "desktop-1440",
    "One large-desktop geometry check is sufficient.",
  );

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(targetRoute);

  const geometry = await page.evaluate(() => {
    const headerInner = document.querySelector<HTMLElement>(
      "header > div",
    );
    const scene = document.querySelector<HTMLElement>(
      'section[aria-labelledby="capability-title"]',
    );
    const gallery = document.querySelector<HTMLElement>(
      '[data-testid="pdp-story-gallery"]',
    );
    const brief = document.querySelector<HTMLElement>(
      '[data-testid="pdp-story-hero"] article',
    );
    const heroAction = brief?.querySelector<HTMLElement>("a");

    if (!headerInner || !scene || !gallery || !brief || !heroAction) {
      return null;
    }

    const headerBox = headerInner.getBoundingClientRect();
    const sceneBox = scene.getBoundingClientRect();
    const galleryBox = gallery.getBoundingClientRect();
    const briefBox = brief.getBoundingClientRect();
    const heroActionBox = heroAction.getBoundingClientRect();
    const galleryImage = gallery.querySelector<HTMLElement>("img");
    const thumbnailButton = gallery.querySelector<HTMLElement>(
      '[aria-label="Product image"] button',
    );
    const thumbnailStrip = gallery.querySelector<HTMLElement>(
      '[aria-label="Product image"]',
    );
    if (!thumbnailStrip) return null;
    const thumbnailStyles = thumbnailButton
      ? getComputedStyle(thumbnailButton)
      : null;
    const thumbnailStripBox = thumbnailStrip.getBoundingClientRect();

    return {
      headerLeft: headerBox.left,
      headerRight: headerBox.right,
      sceneLeft: sceneBox.left,
      sceneRight: sceneBox.right,
      galleryLeft: galleryBox.left,
      galleryBackground: getComputedStyle(gallery).backgroundColor,
      galleryHeight: galleryBox.height,
      galleryImageFit: galleryImage
        ? getComputedStyle(galleryImage).objectFit
        : null,
      thumbnailBackground: thumbnailStyles?.backgroundColor ?? null,
      thumbnailBottom: thumbnailStripBox.bottom,
      thumbnailShadow: thumbnailStyles?.boxShadow ?? null,
      briefRight: briefBox.right,
      heroActionBottom: heroActionBox.bottom,
      galleryBottom: galleryBox.bottom,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry!.galleryLeft).toBeCloseTo(geometry!.headerLeft, 0);
  expect(geometry!.briefRight).toBeCloseTo(geometry!.headerRight, 0);
  expect(geometry!.sceneLeft).toBeCloseTo(geometry!.headerLeft, 0);
  expect(geometry!.sceneRight).toBeCloseTo(geometry!.headerRight, 0);
  expect(geometry!.galleryHeight).toBeLessThanOrEqual(800);
  expect(geometry!.galleryBackground).toBe("rgb(255, 255, 255)");
  expect(geometry!.galleryImageFit).toBe("contain");
  expect(geometry!.thumbnailBackground).toBe("rgb(255, 255, 255)");
  expect(geometry!.thumbnailShadow).toBe("none");
  expect(geometry!.heroActionBottom).toBeCloseTo(geometry!.thumbnailBottom, 0);
});

test("short desktop keeps breathing room above the hero action without overflowing the brief", async (
  { page },
  testInfo,
) => {
  test.skip(
    testInfo.project.name !== "desktop-1440",
    "One short-desktop geometry check is sufficient.",
  );

  await page.setViewportSize({ width: 2243, height: 842 });
  await page.goto(targetRoute);

  const geometry = await page.evaluate(() => {
    const brief = document.querySelector<HTMLElement>(
      '[data-testid="pdp-story-hero"] article',
    );
    const gallery = document.querySelector<HTMLElement>(
      '[data-testid="pdp-story-gallery"]',
    );
    const thumbnailStrip = gallery?.querySelector<HTMLElement>(
      '[aria-label="Product image"]',
    );
    const panels = brief?.querySelector<HTMLElement>(
      'div[class*="briefPanels"]',
    );
    const action = brief?.querySelector<HTMLElement>("a");

    if (!brief || !gallery || !thumbnailStrip || !panels || !action) return null;

    const briefBox = brief.getBoundingClientRect();
    const galleryBox = gallery.getBoundingClientRect();
    const thumbnailStripBox = thumbnailStrip.getBoundingClientRect();
    const panelsBox = panels.getBoundingClientRect();
    const actionBox = action.getBoundingClientRect();

    return {
      actionBottom: actionBox.bottom,
      actionGap: actionBox.top - panelsBox.bottom,
      briefBottom: briefBox.bottom,
      galleryBottom: galleryBox.bottom,
      thumbnailBottom: thumbnailStripBox.bottom,
    };
  });

  expect(geometry).not.toBeNull();
  expect(geometry!.actionGap).toBeGreaterThanOrEqual(24);
  expect(geometry!.actionBottom).toBeLessThanOrEqual(geometry!.briefBottom + 1);
  expect(geometry!.actionBottom).toBeCloseTo(geometry!.thumbnailBottom, 0);
});

test("Concept 02 keeps the generic gallery-info detail", async ({ page }) => {
  await page.goto("/products/gummies?product=gummies-concept-02");

  await expect(page.locator("main")).toHaveAttribute("data-pdp-layout", "gallery-info");
  await expect(page.getByTestId("pdp-capability-item")).toHaveCount(0);
});

test("story disclosures follow keyboard order, expose focus, and keep 44px targets", async ({
  page,
}) => {
  await page.goto(targetRoute);

  const heroAction = page
    .getByTestId("pdp-story-hero")
    .getByRole("link", { name: "Start a Project", exact: true });
  const firstDisclosure = page.getByRole("button", {
    name: "Project parameters",
    exact: true,
  });
  const secondDisclosure = page.getByRole("button", {
    name: "Customization options",
    exact: true,
  });
  const thirdDisclosure = page.getByRole("button", {
    name: "Manufacturing review",
    exact: true,
  });

  await firstDisclosure.focus();
  await expectVisibleKeyboardFocus(firstDisclosure);
  await expect(firstDisclosure).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Enter");
  await expect(firstDisclosure).toHaveAttribute("aria-expanded", "false");
  await expectVisibleKeyboardFocus(firstDisclosure);
  await page.keyboard.press("Space");
  await expect(firstDisclosure).toHaveAttribute("aria-expanded", "true");
  await expectVisibleKeyboardFocus(firstDisclosure);

  await page.keyboard.press("Tab");
  await expect(secondDisclosure).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(thirdDisclosure).toBeFocused();
  await page.keyboard.press("Tab");
  await expectVisibleKeyboardFocus(heroAction);
  await page.keyboard.press("Tab");

  const firstFaq = page.getByRole("button", { name: faqLabels[0], exact: true });
  const secondFaq = page.getByRole("button", { name: faqLabels[1], exact: true });
  await expectVisibleKeyboardFocus(firstFaq);
  await page.keyboard.press("Tab");
  await expectVisibleKeyboardFocus(secondFaq);
  await expect(secondFaq).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Space");
  await expect(secondFaq).toHaveAttribute("aria-expanded", "true");
  await expectVisibleKeyboardFocus(secondFaq);

  const undersized = await page.locator("main a, main button").evaluateAll((elements) =>
    elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return (
          element.checkVisibility() &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity) > 0 &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width < 44 || rect.height < 44;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          height: Math.round(rect.height),
          label:
            element.getAttribute("aria-label") ??
            element.textContent?.trim() ??
            element.tagName,
          width: Math.round(rect.width),
        };
      }),
  );

  expect(
    undersized,
    `Concept 01 has undersized visible targets: ${JSON.stringify(undersized)}`,
  ).toEqual([]);
});

test("Reduced Motion exposes every meaningful section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(targetRoute);

  await expectStorySectionsVisible(page);
  await expect(page.getByText("DEMO_ONLY · PRODUCT VISUAL", { exact: true })).toBeVisible();
  await expect(page.getByTestId("pdp-packaging-item")).toHaveCount(3);
  await expect(page.getByTestId("pdp-quality-item")).toHaveCount(3);
  await expect(page.getByRole("button", { name: faqLabels[0], exact: true })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
});
