import {
  B2BContactPageSchema,
  B2BInsightArticleSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";
import {
  vitheloB2BContactPage,
  vitheloB2BInsightsPage,
  vitheloB2BOemOdmPage,
  vitheloB2BProductsPage,
  vitheloB2BSite,
} from "@/content/demo/vithelo-b2b-site";

it("validates the compact B2B site records", () => {
  expect(B2BSiteContentSchema.parse(vitheloB2BSite).navigation).toEqual([
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]);
  expect(B2BProductsPageSchema.parse(vitheloB2BProductsPage).formats).toHaveLength(10);
  expect(B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage).steps).toHaveLength(10);
  expect(B2BInsightsPageSchema.parse(vitheloB2BInsightsPage).articles).toHaveLength(10);
  expect(B2BContactPageSchema.parse(vitheloB2BContactPage).status).toBe("NOT_CONFIGURED");
});

it("publishes one unified image-led OEM ODM story", () => {
  const page = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);

  expect(page.hero).toMatchObject({
    kicker: "OEM / ODM PROJECT DEVELOPMENT",
    title: "From product direction to a production-ready brief.",
  });
  expect(page.introduction).toMatchObject({
    eyebrow: "CUSTOM DEVELOPMENT",
    title: "From brief to finished product.",
    actions: [
      { label: "Start a Project", href: "/contact" },
      { label: "Explore Formats", href: "/products" },
    ],
  });
  expect(page.developmentStories.map(({ eyebrow, title }) => ({ eyebrow, title }))).toEqual([
    { eyebrow: "01 · SAMPLE DEVELOPMENT", title: "Start with a sample." },
    { eyebrow: "02 · FORMULA DIRECTION", title: "Shape the formula direction." },
    { eyebrow: "03 · DOSAGE FORM", title: "Choose the right dosage form." },
  ]);
  expect(page.packagingIntroduction.eyebrow).toBe("PACKAGING DEVELOPMENT");
  expect(page.formats).toHaveLength(8);
  expect(page.formats.every(({ media }) => media.status === "DEMO_ONLY")).toBe(true);
  expect(page.steps).toHaveLength(10);
  expect(page.commercialVariables.map(({ title }) => title)).toEqual([
    "What shapes MOQ",
    "What shapes lead time",
  ]);
  expect(page.packaging).toHaveLength(4);
  expect(page.quality.items).toHaveLength(4);
  expect(page.quoteStories).toHaveLength(3);
  expect(page.checklist).toHaveLength(6);
  expect(page.relatedLinks).toHaveLength(3);
  expect(page).not.toHaveProperty("identity");
  expect(page).not.toHaveProperty("customization");
  expect(page).not.toHaveProperty("production");
});

it("keeps OEM ODM commercial claims conditional and evidence bounded", () => {
  const page = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);
  const serialized = JSON.stringify(page);

  expect(page.dataStatus).toBe("DEMO_ONLY");
  expect(serialized).not.toMatch(
    /FDA approved|certified facility|guaranteed|\b\d+\s*(?:days?|units?)\b/i,
  );
  expect(serialized).not.toMatch(/\b(?:GMP|HACCP|HALAL|BRC|FSSC)\b/);
  expect(serialized).toMatch(/depends|review|confirmed|project/i);
});

it("publishes eight format groups with ten demo products each", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);

  expect(products.discovery.formats.map(({ slug }) => slug)).toEqual([
    "gummies",
    "jelly",
    "hard-capsules",
    "tablets",
    "powders",
    "softgels",
    "liquids",
    "oral-films",
  ]);
  expect(products.discovery.items).toHaveLength(80);

  for (const format of products.discovery.formats) {
    expect(
      products.discovery.items.filter((item) => item.formatSlug === format.slug),
    ).toHaveLength(10);
  }

  expect(products.discovery).not.toHaveProperty("healthDirections");
  expect(products.discovery.items[0].media?.default.status).toBe("DEMO_ONLY");
  expect(products.discovery.items[0].media?.default.alt).not.toBe("");
  expect(products.discovery.items[0].media?.hover.status).toBe("DEMO_ONLY");
  expect(
    new Set(
      products.discovery.items.filter((item) => item.formatSlug === "gummies").map((item) => item.media?.default.src ?? ""),
    ),
  ).toEqual(new Set(["/media/products/beauty-gummies/beauty-gummies-default.webp"]));
  expect(products.discovery.items.filter((item) => item.formatSlug !== "gummies").every((item) => !item.media)).toBe(true);
  expect(products.discovery.items.every((item) => item.pdpStory)).toBe(true);
  expect(products.discovery.items.find((item) => item.id === "gummies-concept-02")?.pdpStory).toMatchObject({
    kicker: "GUMMIES · CONCEPT 02",
    inquiry: { href: "/contact" },
  });
  expect(
    new Set(
      products.discovery.items.filter((item) => item.formatSlug === "gummies").map((item) => item.media?.hover.src ?? ""),
    ),
  ).toEqual(
    new Set([
      "/media/products/beauty-gummies/beauty-gummies-detail.webp",
      "/media/products/beauty-gummies/beauty-gummies-hand.webp",
      "/media/products/beauty-gummies/beauty-gummies-closeup.webp",
      "/media/products/beauty-gummies/beauty-gummies-routine.webp",
      "/media/products/beauty-gummies/beauty-gummies-motion.webp",
    ]),
  );
});

it("keeps only approved MOQ values and global English positioning", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
  expect(new Set(products.formats.map(({ moq }) => moq))).toEqual(
    new Set([
      "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
      "DEMO_ONLY · MOQ requires approved project inputs.",
    ]),
  );
  expect(JSON.stringify(products.formats)).not.toMatch(/\d[\d,.]*(?:\s|-)*(?:bottles|capsules|softgels|tablets|kg|metric tons)/i);
  expect(JSON.stringify({ products, site: vitheloB2BSite })).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("publishes valid article records without configured media claims", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
  for (const article of insights.articles) {
    expect(B2BInsightArticleSchema.parse(article).published).toBe(true);
    expect(article.blocks.length).toBeGreaterThanOrEqual(4);
  }
});

it("publishes an editorial intro and demo media for every insight", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);

  expect(insights.intro).toEqual({
    kicker: "THE KNOWLEDGE EDIT",
    title: "Manufacturing knowledge, made practical.",
    copy:
      "Ten decision guides connect product format, development, packaging, manufacturing review and project preparation.",
  });
  expect(insights.articles).toHaveLength(10);

  for (const article of insights.articles) {
    expect(article.media.status).toBe("DEMO_ONLY");
    expect(article.media.src).toMatch(/^\/media\//);
    expect(article.media.alt).not.toBe("");
    expect(article.media.width).toBeGreaterThan(0);
    expect(article.media.height).toBeGreaterThan(0);
  }
});
